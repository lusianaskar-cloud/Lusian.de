"use client";

import { useCallback, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { consultationTypes } from "@/lib/scheduling/consultations";
import type {
  AvailabilityResult,
  BookingResult,
  ConsultationType,
  PracticeId,
  Slot,
} from "@/lib/scheduling/types";
import { contactChannels } from "@/lib/content/site";
import { useContent, useIntlLocale } from "@/lib/i18n/context";
import { format } from "@/lib/i18n/format";
import { ActionButton } from "@/components/primitives/ActionLink";
import { TextLink } from "@/components/primitives/ActionLink";
import { Arrow } from "@/components/primitives/Arrow";
import { EASE } from "@/lib/motion";
import { cn, ordinal } from "@/lib/utils";
import { useIsClient } from "@/lib/useIsClient";
import { TextArea, TextField } from "../Field";
import { Calendar } from "./Calendar";
import {
  TIMEZONES,
  dayKey,
  detectTimeZone,
  formatLongDate,
  formatTime,
  zoneAbbreviation,
} from "./time";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * The booking interface is Lusian's; only the truth about time comes from
 * elsewhere. Availability is fetched live, and if no scheduling backend is
 * configured the flow says so plainly rather than showing times that do not
 * exist — and it never reports a booking that did not happen.
 */
export function BookingFlow() {
  const { speak, ui } = useContent();
  const copy = speak.book;
  const intl = useIntlLocale();
  const practices = copy.practices as { id: PracticeId; label: string; body: string }[];
  const reduced = useSafeReducedMotion();
  const [step, setStep] = useState<Step>(0);
  const [practice, setPractice] = useState<PracticeId | null>(null);
  const [typeId, setTypeId] = useState<string | null>(null);
  // Derived rather than assigned in an effect: the server and the first client
  // render agree on the fallback, then the real zone takes over after mount.
  const mounted = useIsClient();
  const [zoneOverride, setZoneOverride] = useState<string | null>(null);
  const timeZone = zoneOverride ?? (mounted ? detectTimeZone() : "Europe/Berlin");
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getUTCFullYear(), month: now.getUTCMonth() };
  });
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({ name: "", email: "", company: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);

  const type = useMemo(
    () => consultationTypes.find((t) => t.id === typeId) ?? null,
    [typeId],
  );
  const options = useMemo(
    () => consultationTypes.filter((t) => t.practice === practice),
    [practice],
  );

  /**
   * `forType` is passed explicitly by the step that selects a conversation:
   * at that moment the state update has not re-rendered yet, so the `type`
   * derived above is still the previous value.
   */
  const loadAvailability = useCallback(
    async (
      range: { year: number; month: number } = cursor,
      zoneName: string = timeZone,
      forType: ConsultationType | null = null,
    ) => {
    const active = forType ?? type;
    if (!active) return;
    setLoading(true);
    const from = new Date(Date.UTC(range.year, range.month, 1));
    const to = new Date(Date.UTC(range.year, range.month + 1, 0, 23, 59, 59));
    const now = new Date();
    const start = from < now ? now : from;

    try {
      const params = new URLSearchParams({
        type: active.id,
        from: start.toISOString(),
        to: to.toISOString(),
        timeZone: zoneName,
      });
      const response = await fetch(`/api/scheduling/availability?${params}`, {
        cache: "no-store",
      });
      setAvailability((await response.json()) as AvailabilityResult);
    } catch {
      setAvailability({ status: "error", message: "unreachable" });
    } finally {
      setLoading(false);
    }
  },
    [cursor, timeZone, type],
  );

  const slots = useMemo(
    () => (availability?.status === "ok" ? availability.slots : []),
    [availability],
  );
  const availableDays = useMemo(() => {
    const set = new Set<string>();
    for (const s of slots) set.add(dayKey(s.start, timeZone));
    return set;
  }, [slots, timeZone]);
  const daySlots = useMemo(
    () => (day ? slots.filter((s) => dayKey(s.start, timeZone) === day) : []),
    [day, slots, timeZone],
  );

  const goTo = (next: Step, forType: ConsultationType | null = null) => {
    setStep(next);
    if (next === 2) void loadAvailability(cursor, timeZone, forType);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const changeMonth = (delta: number) => {
    setDay(null);
    setSlot(null);
    const next = new Date(Date.UTC(cursor.year, cursor.month + delta, 1));
    const moved = { year: next.getUTCFullYear(), month: next.getUTCMonth() };
    setCursor(moved);
    void loadAvailability(moved, timeZone);
  };

  const changeTimeZone = (next: string) => {
    setZoneOverride(next);
    setDay(null);
    setSlot(null);
    void loadAvailability(cursor, next);
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!type || !slot) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/scheduling/book", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ typeId: type.id, start: slot.start, timeZone, ...details }),
      });
      setResult((await response.json()) as BookingResult);
      if (response.ok) goTo(5);
    } catch {
      setResult({ status: "error", message: "unreachable" });
    } finally {
      setSubmitting(false);
    }
  }

  const zone = `${timeZone.replace(/_/g, " ")} · ${zoneAbbreviation(timeZone, intl)}`;

  return (
    <div>
      {/* Progress */}
      {step < 5 ? (
        <ol className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-current/15 pb-6">
          {copy.steps.map((label, i) => (
            <li key={label} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={cn(
                  "block h-px transition-all duration-500",
                  i === step ? "w-8 bg-[color:var(--tone-accent)]" : "w-4 bg-current/25",
                )}
              />
              <span
                className={cn(
                  "label-mono transition-opacity duration-500",
                  i === step ? "opacity-100" : i < step ? "opacity-55" : "opacity-30",
                )}
                aria-current={i === step ? "step" : undefined}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      <p
        ref={headingRef}
        tabIndex={-1}
        className="sr-only scroll-mt-40"
        aria-live="polite"
      >
        {step < 5
          ? format(copy.stepAnnouncement, {
              current: step + 1,
              total: copy.steps.length,
              name: copy.steps[step] ?? "",
            })
          : copy.confirmedAnnouncement}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE.expo }}
          className="pt-12"
        >
          {/* 01 — Practice */}
          {step === 0 ? (
            <div>
              <h2 className="font-display text-heading leading-tight">
                {copy.practiceQuestion}
              </h2>
              <div className="mt-10 grid gap-px bg-current/12 sm:grid-cols-2">
                {practices.map((option, i) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setPractice(option.id);
                      setTypeId(null);
                      goTo(1);
                    }}
                    className="group flex flex-col items-start bg-[color:var(--tone-bg)] p-8 text-start transition-colors duration-500 hover:bg-current/5 lg:p-10"
                  >
                    <span className="label-mono text-tone-muted">{ordinal(i)}</span>
                    <span className="mt-6 font-display text-[1.6rem] leading-tight tracking-tight">
                      {option.label}
                    </span>
                    <span className="mt-4 text-[0.875rem] leading-relaxed text-tone-muted">
                      {option.body}
                    </span>
                    <Arrow className="mt-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:rtl:-translate-x-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* 02 — Conversation */}
          {step === 1 ? (
            <div>
              <h2 className="font-display text-heading leading-tight">
                {copy.conversationQuestion}
              </h2>
              <div className="mt-10">
                {options.map((option, i) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setTypeId(option.id);
                      setDay(null);
                      setSlot(null);
                      goTo(2, option);
                    }}
                    className="group grid w-full gap-3 border-t border-current/15 py-8 text-start last:border-b lg:grid-cols-12 lg:gap-8"
                  >
                    <span className="label-mono text-tone-muted lg:col-span-1">
                      {ordinal(i)}
                    </span>
                    <span className="lg:col-span-4">
                      <span className="block font-display text-[1.5rem] leading-tight tracking-tight">
                        {copy.consultations[option.id].name}
                      </span>
                      <span className="mt-2 block label-mono text-accent">
                        {copy.consultations[option.id].duration}
                      </span>
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-tone-muted lg:col-span-6 lg:col-start-6">
                      {copy.consultations[option.id].body}
                    </span>
                    <Arrow className="hidden self-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:rtl:-translate-x-2 lg:col-span-1 lg:block" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(0)}
                className="mt-10 label-mono text-tone-muted underline-offset-4 hover:underline"
              >
                {ui.back}
              </button>
            </div>
          ) : null}

          {/* 03 — When */}
          {step === 2 ? (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-heading leading-tight">{copy.chooseTime}</h2>
                <label className="flex items-center gap-3 label-mono text-tone-muted">
                  <span className="sr-only sm:not-sr-only">{copy.timesShownIn}</span>
                  <select
                    value={timeZone}
                    onChange={(e) => changeTimeZone(e.target.value)}
                    className="border-b border-current/25 bg-transparent pb-1 label-mono focus:border-current/60 focus:outline-none"
                  >
                    {[timeZone, ...TIMEZONES.filter((t) => t !== timeZone)].map((tz) => (
                      <option key={tz} value={tz} className="bg-ivory text-ink">
                        {tz.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {availability?.status === "not_configured" ? (
                <div className="mt-10 border border-current/25 p-8 lg:p-10">
                  <span className="label-mono text-accent">{copy.notConnected.label}</span>
                  <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-tone-muted">
                    {copy.notConnected.body}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
                    <TextLink href="/speak/ask" transitionLabel={speak.ask.eyebrow}>
                      {copy.notConnected.writeInstead}
                    </TextLink>
                    <a
                      href={`mailto:${contactChannels.email}`}
                      dir="ltr"
                      className="inline-block label-mono text-tone-muted underline-offset-4 hover:underline"
                    >
                      {contactChannels.email}
                    </a>
                  </div>
                </div>
              ) : availability?.status === "error" ? (
                <div className="mt-10 border border-current/25 p-8">
                  <span className="label-mono text-accent">{copy.unavailableLabel}</span>
                  <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-tone-muted">
                    {copy.unavailableBody}
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadAvailability()}
                    className="mt-6 label-mono underline underline-offset-4"
                  >
                    {ui.tryAgain}
                  </button>
                </div>
              ) : (
                <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <Calendar
                      year={cursor.year}
                      month={cursor.month}
                      availableDays={availableDays}
                      selected={day}
                      onSelect={(d) => {
                        setDay(d);
                        setSlot(null);
                      }}
                      onStep={changeMonth}
                      canStepBack={
                        cursor.year > new Date().getUTCFullYear() ||
                        cursor.month > new Date().getUTCMonth()
                      }
                      loading={loading}
                    />
                  </div>

                  <div className="lg:col-span-4 lg:col-start-9">
                    {day ? (
                      <>
                        <h3 className="label-mono text-tone-muted">
                          {formatLongDate(`${day}T12:00:00Z`, "UTC", intl)}
                        </h3>
                        {daySlots.length === 0 ? (
                          <p className="mt-6 text-[0.9375rem] text-tone-muted">
                            {copy.nothingThisDay}
                          </p>
                        ) : (
                          <ul className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-1">
                            {daySlots.map((s) => (
                              <li key={s.start}>
                                <button
                                  type="button"
                                  onClick={() => setSlot(s)}
                                  aria-pressed={slot?.start === s.start}
                                  className={cn(
                                    "w-full border px-4 py-4 text-[0.9375rem] tabular-nums transition-colors duration-300",
                                    slot?.start === s.start
                                      ? "border-current bg-[color:var(--tone-fg)] text-[color:var(--tone-bg)]"
                                      : "border-current/20 hover:border-current/60",
                                  )}
                                >
                                  {formatTime(s.start, timeZone, intl)}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                        {loading
                          ? copy.checking
                          : availableDays.size === 0
                            ? copy.noneThisMonth
                            : copy.chooseDay}
                      </p>
                    )}

                    <p className="mt-8 label-mono text-tone-muted">
                      {format(copy.allTimesIn, { zone })}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-12 flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="label-mono text-tone-muted underline-offset-4 hover:underline"
                >
                  {ui.back}
                </button>
                {slot ? (
                  <ActionButton type="button" onClick={() => goTo(3)}>
                    {ui.continueLabel}
                  </ActionButton>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* 04 — Details */}
          {step === 3 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goTo(4);
              }}
              className="space-y-12"
            >
              <h2 className="font-display text-heading leading-tight">{copy.detailsHeading}</h2>
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                <TextField
                  id="b-name"
                  name="name"
                  label={copy.fields.name}
                  required
                  autoComplete="name"
                  value={details.name}
                  onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
                />
                <TextField
                  id="b-email"
                  name="email"
                  label={copy.fields.email}
                  type="email"
                  required
                  autoComplete="email"
                  value={details.email}
                  onChange={(v) => setDetails((d) => ({ ...d, email: v }))}
                />
                {practice === "aviation" ? (
                  <TextField
                    id="b-company"
                    name="company"
                    label={copy.fields.company}
                    autoComplete="organization"
                    value={details.company}
                    onChange={(v) => setDetails((d) => ({ ...d, company: v }))}
                  />
                ) : null}
                <TextField
                  id="b-phone"
                  name="phone"
                  label={copy.fields.phone}
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                />
              </div>
              <TextArea
                id="b-notes"
                name="notes"
                label={copy.fields.notes}
                rows={4}
                placeholder={copy.notesPlaceholder}
                value={details.notes}
                onChange={(v) => setDetails((d) => ({ ...d, notes: v }))}
              />
              <div className="flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  className="label-mono text-tone-muted underline-offset-4 hover:underline"
                >
                  {ui.back}
                </button>
                <ActionButton>{ui.review}</ActionButton>
              </div>
            </form>
          ) : null}

          {/* 05 — Review */}
          {step === 4 && type && slot ? (
            <form onSubmit={submit} className="space-y-10">
              <h2 className="font-display text-heading leading-tight">
                {copy.reviewHeading}
              </h2>
              <dl className="border-t border-current/15">
                {[
                  [
                    copy.summary.practice,
                    practices.find((p) => p.id === practice)?.label ?? "",
                  ],
                  [
                    copy.summary.conversation,
                    `${copy.consultations[type.id].name} · ${copy.consultations[type.id].duration}`,
                  ],
                  [copy.summary.date, formatLongDate(slot.start, timeZone, intl)],
                  [copy.summary.time, `${formatTime(slot.start, timeZone, intl)} · ${zone}`],
                  [copy.summary.name, details.name],
                  [copy.summary.email, details.email],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-current/15 py-4 sm:grid-cols-3"
                  >
                    <dt className="label-mono text-tone-muted">{label}</dt>
                    <dd className="sm:col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>

              {result && result.status !== "booked" ? (
                <p role="alert" className="max-w-lg text-[0.875rem] leading-relaxed text-tone-muted">
                  {result.status === "not_configured"
                    ? copy.errors.notConfigured
                    : result.status === "unavailable"
                      ? copy.errors.taken
                      : copy.errors.failed}{" "}
                  {speak.ask.writeTo}{" "}
                  <a
                    href={`mailto:${contactChannels.email}`}
                    dir="ltr"
                    className="inline-block text-accent underline underline-offset-4"
                  >
                    {contactChannels.email}
                  </a>
                  .
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => goTo(3)}
                  className="label-mono text-tone-muted underline-offset-4 hover:underline"
                >
                  {ui.back}
                </button>
                <ActionButton disabled={submitting}>
                  {submitting ? ui.confirming : ui.confirm}
                </ActionButton>
              </div>
            </form>
          ) : null}

          {/* 06 — Confirmation */}
          {step === 5 && result?.status === "booked" && type ? (
            <div>
              <span className="label-mono text-accent">{copy.confirmedLabel}</span>
              <h2 className="mt-6 max-w-[16ch] font-display text-title leading-tight">
                {copy.confirmedHeading}
              </h2>
              <dl className="mt-12 border-t border-current/15">
                {[
                  [
                    copy.summary.conversation,
                    `${copy.consultations[type.id].name} · ${copy.consultations[type.id].duration}`,
                  ],
                  [copy.summary.date, formatLongDate(result.start, result.timeZone, intl)],
                  [
                    copy.summary.time,
                    `${formatTime(result.start, result.timeZone, intl)} · ${result.timeZone.replace(/_/g, " ")}`,
                  ],
                  [copy.summary.reference, result.reference],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-1 border-b border-current/15 py-4 sm:grid-cols-3"
                  >
                    <dt className="label-mono text-tone-muted">{label}</dt>
                    <dd className="sm:col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                {result.confirmationEmailSent ? copy.emailSent : copy.keepReference}
              </p>
              {result.manageUrl ? (
                <p className="mt-4">
                  <a
                    href={result.manageUrl}
                    className="label-mono text-accent underline underline-offset-4"
                  >
                    {copy.manage}
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

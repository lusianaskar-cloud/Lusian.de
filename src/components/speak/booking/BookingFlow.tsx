"use client";

import { useCallback, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { consultationTypes } from "@/lib/scheduling/consultations";
import type { AvailabilityResult, BookingResult, PracticeId, Slot } from "@/lib/scheduling/types";
import { contactChannels } from "@/lib/content/site";
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
const STEPS = ["Practice", "Conversation", "When", "Details", "Review"] as const;

const practices: { id: PracticeId; label: string; body: string }[] = [
  {
    id: "aviation",
    label: "Aviation Advisory",
    body: "Airlines, airports, ground handling, investors, infrastructure and public-sector aviation.",
  },
  {
    id: "private",
    label: "Private Advisory",
    body: "Relocation and establishment across the Gulf, for individuals, families and their businesses.",
  },
];

/**
 * The booking interface is Lusian's; only the truth about time comes from
 * elsewhere. Availability is fetched live, and if no scheduling backend is
 * configured the flow says so plainly rather than showing times that do not
 * exist — and it never reports a booking that did not happen.
 */
export function BookingFlow() {
  const reduced = useReducedMotion();
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

  const loadAvailability = useCallback(
    async (
      range: { year: number; month: number } = cursor,
      zoneName: string = timeZone,
    ) => {
    if (!type) return;
    setLoading(true);
    const from = new Date(Date.UTC(range.year, range.month, 1));
    const to = new Date(Date.UTC(range.year, range.month + 1, 0, 23, 59, 59));
    const now = new Date();
    const start = from < now ? now : from;

    try {
      const params = new URLSearchParams({
        type: type.id,
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

  const goTo = (next: Step) => {
    setStep(next);
    if (next === 2) void loadAvailability();
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

  const zone = `${timeZone.replace(/_/g, " ")} · ${zoneAbbreviation(timeZone)}`;

  return (
    <div>
      {/* Progress */}
      {step < 5 ? (
        <ol className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-current/15 pb-6">
          {STEPS.map((label, i) => (
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

      <p ref={headingRef} tabIndex={-1} className="sr-only" aria-live="polite">
        {step < 5 ? `Step ${step + 1} of ${STEPS.length}: ${STEPS[step as 0]}` : "Booking confirmed"}
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
                Which practice is this about?
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
                    className="group flex flex-col items-start bg-[color:var(--tone-bg)] p-8 text-left transition-colors duration-500 hover:bg-current/5 lg:p-10"
                  >
                    <span className="label-mono text-tone-muted">{ordinal(i)}</span>
                    <span className="mt-6 font-display text-[1.6rem] leading-tight tracking-tight">
                      {option.label}
                    </span>
                    <span className="mt-4 text-[0.875rem] leading-relaxed text-tone-muted">
                      {option.body}
                    </span>
                    <Arrow className="mt-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* 02 — Conversation */}
          {step === 1 ? (
            <div>
              <h2 className="font-display text-heading leading-tight">
                What kind of conversation?
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
                      goTo(2);
                    }}
                    className="group grid w-full gap-3 border-t border-current/15 py-8 text-left last:border-b lg:grid-cols-12 lg:gap-8"
                  >
                    <span className="label-mono text-tone-muted lg:col-span-1">
                      {ordinal(i)}
                    </span>
                    <span className="lg:col-span-4">
                      <span className="block font-display text-[1.5rem] leading-tight tracking-tight">
                        {option.name}
                      </span>
                      <span className="mt-2 block label-mono text-accent">
                        {option.duration}
                      </span>
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-tone-muted lg:col-span-6 lg:col-start-6">
                      {option.body}
                    </span>
                    <Arrow className="hidden self-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 lg:col-span-1 lg:block" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => goTo(0)}
                className="mt-10 label-mono text-tone-muted underline-offset-4 hover:underline"
              >
                Back
              </button>
            </div>
          ) : null}

          {/* 03 — When */}
          {step === 2 ? (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-heading leading-tight">Choose a time</h2>
                <label className="flex items-center gap-3 label-mono text-tone-muted">
                  <span className="sr-only sm:not-sr-only">Times shown in</span>
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
                  <span className="label-mono text-accent">Booking not yet connected</span>
                  <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-tone-muted">
                    Scheduling is not live on this site yet, so there are no times to
                    show. Rather than display availability that does not exist, we would
                    rather you wrote to us — a reply will come with times in it.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
                    <TextLink href="/speak/ask" transitionLabel="Ask a question">
                      Write to us instead
                    </TextLink>
                    <a
                      href={`mailto:${contactChannels.email}`}
                      className="label-mono text-tone-muted underline-offset-4 hover:underline"
                    >
                      {contactChannels.email}
                    </a>
                  </div>
                </div>
              ) : availability?.status === "error" ? (
                <div className="mt-10 border border-current/25 p-8">
                  <span className="label-mono text-accent">Availability unavailable</span>
                  <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-tone-muted">
                    We could not reach the calendar just now.
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadAvailability()}
                    className="mt-6 label-mono underline underline-offset-4"
                  >
                    Try again
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
                          {formatLongDate(`${day}T12:00:00Z`, "UTC")}
                        </h3>
                        {daySlots.length === 0 ? (
                          <p className="mt-6 text-[0.9375rem] text-tone-muted">
                            Nothing free on this day.
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
                                  {formatTime(s.start, timeZone)}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                        {loading
                          ? "Checking the calendar…"
                          : availableDays.size === 0
                            ? "No availability in this month. Try the next one."
                            : "Choose a day to see the times that are free."}
                      </p>
                    )}

                    <p className="mt-8 label-mono text-tone-muted">All times in {zone}</p>
                  </div>
                </div>
              )}

              <div className="mt-12 flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="label-mono text-tone-muted underline-offset-4 hover:underline"
                >
                  Back
                </button>
                {slot ? (
                  <ActionButton type="button" onClick={() => goTo(3)}>
                    Continue
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
              <h2 className="font-display text-heading leading-tight">Your details</h2>
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                <TextField
                  id="b-name"
                  name="name"
                  label="Name"
                  required
                  autoComplete="name"
                  value={details.name}
                  onChange={(v) => setDetails((d) => ({ ...d, name: v }))}
                />
                <TextField
                  id="b-email"
                  name="email"
                  label="Email"
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
                    label="Organisation"
                    autoComplete="organization"
                    value={details.company}
                    onChange={(v) => setDetails((d) => ({ ...d, company: v }))}
                  />
                ) : null}
                <TextField
                  id="b-phone"
                  name="phone"
                  label="Telephone"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(v) => setDetails((d) => ({ ...d, phone: v }))}
                />
              </div>
              <TextArea
                id="b-notes"
                name="notes"
                label="Anything useful before we speak"
                rows={4}
                placeholder="A sentence or two is plenty."
                value={details.notes}
                onChange={(v) => setDetails((d) => ({ ...d, notes: v }))}
              />
              <div className="flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  className="label-mono text-tone-muted underline-offset-4 hover:underline"
                >
                  Back
                </button>
                <ActionButton>Review</ActionButton>
              </div>
            </form>
          ) : null}

          {/* 05 — Review */}
          {step === 4 && type && slot ? (
            <form onSubmit={submit} className="space-y-10">
              <h2 className="font-display text-heading leading-tight">
                Before we hold the time
              </h2>
              <dl className="border-t border-current/15">
                {[
                  ["Practice", practices.find((p) => p.id === practice)?.label ?? ""],
                  ["Conversation", `${type.name} · ${type.duration}`],
                  ["Date", formatLongDate(slot.start, timeZone)],
                  ["Time", `${formatTime(slot.start, timeZone)} · ${zone}`],
                  ["Name", details.name],
                  ["Email", details.email],
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
                    ? "Scheduling is not connected yet, so nothing has been booked."
                    : result.status === "unavailable"
                      ? "That time was taken while you were filling this in. Choose another."
                      : "The booking could not be completed just now."}{" "}
                  Please write to{" "}
                  <a
                    href={`mailto:${contactChannels.email}`}
                    className="text-accent underline underline-offset-4"
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
                  Back
                </button>
                <ActionButton disabled={submitting}>
                  {submitting ? "Confirming" : "Confirm"}
                </ActionButton>
              </div>
            </form>
          ) : null}

          {/* 06 — Confirmation */}
          {step === 5 && result?.status === "booked" && type ? (
            <div>
              <span className="label-mono text-accent">Confirmed</span>
              <h2 className="mt-6 max-w-[16ch] font-display text-title leading-tight">
                The time is held.
              </h2>
              <dl className="mt-12 border-t border-current/15">
                {[
                  ["Conversation", `${type.name} · ${type.duration}`],
                  ["Date", formatLongDate(result.start, result.timeZone)],
                  ["Time", `${formatTime(result.start, result.timeZone)} · ${result.timeZone.replace(/_/g, " ")}`],
                  ["Reference", result.reference],
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
                {result.confirmationEmailSent
                  ? "A confirmation is on its way from our scheduling system, with the details and a link to change the time."
                  : "Keep the reference above. If you need to move the time, write to us and we will."}
              </p>
              {result.manageUrl ? (
                <p className="mt-4">
                  <a
                    href={result.manageUrl}
                    className="label-mono text-accent underline underline-offset-4"
                  >
                    Reschedule or cancel
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

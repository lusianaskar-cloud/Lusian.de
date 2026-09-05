"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { markets } from "@/lib/content/markets";
import { contactChannels } from "@/lib/content/site";
import { useContent } from "@/lib/i18n/context";
import { ActionButton } from "@/components/primitives/ActionLink";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SelectField, TextArea, TextField } from "./Field";

type Practice = "aviation" | "private" | "general";
type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

/**
 * A question, not a support ticket.
 *
 * The first screen asks four things. Everything else sits behind one quiet
 * disclosure, so someone with a simple question is never made to walk past
 * twenty fields — and someone with a complicated situation can give us the
 * whole picture in one go. Optional fields are genuinely optional.
 *
 * Every label, option and legend is read from the active locale. The values
 * posted to the intake are therefore in the reader's own language, which is
 * the honest thing to send: it is what they actually chose.
 */
export function AskFlow() {
  const { speak, ui, markets: marketCopy } = useContent();
  const copy = speak.ask;

  const [practice, setPractice] = useState<Practice>("private");
  const [method, setMethod] = useState(copy.contactMethods[0]);
  const [detail, setDetail] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const reduced = useSafeReducedMotion();
  const methodName = useId();

  const destinations = [
    ...markets.map((market) => marketCopy.entries[market.id].name),
    copy.undecided,
  ];
  // The first method is the default; the others need a number to call.
  const wantsPhone = method !== copy.contactMethods[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const areas = data.getAll("supportAreas").join(", ");
    const payload = Object.fromEntries(data.entries());
    setStatus("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          practice,
          preferredContact: method,
          supportAreas: areas,
        }),
      });
      if (response.ok) {
        setStatus("sent");
        form.reset();
      } else if (response.status === 503) {
        setStatus("unconfigured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.expo }}
        role="status"
        className="border-t border-current/20 pt-10"
      >
        <span className="type-voice text-[0.8125rem] text-accent">{copy.sent.label}</span>
        <p className="mt-6 max-w-lg type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">
          {copy.sent.headline}
        </p>
        <p className="mt-5 max-w-md type-voice text-[0.9375rem] text-tone-muted">
          {copy.sent.body}{" "}
          <a
            href={`mailto:${contactChannels.email}`}
            dir="ltr"
            className="inline-block underline underline-offset-4"
          >
            {contactChannels.email}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-14">
      <fieldset>
        <legend className="type-voice text-[0.8125rem] text-tone-muted">{copy.practiceLegend}</legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {copy.practices.map((option) => {
            const selected = practice === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPractice(option.id as Practice)}
                aria-pressed={selected}
                className={cn(
                  "group relative flex flex-col items-start overflow-hidden border p-5 text-start transition-colors duration-500",
                  selected ? "border-current/60" : "border-current/15 hover:border-current/40",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="practice-marker"
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-[color:var(--tone-accent)]"
                    transition={{ duration: 0.5, ease: EASE.expo }}
                  />
                ) : null}
                <span
                  className={cn(
                    "block text-[0.9375rem] tracking-tight transition-opacity duration-500",
                    selected ? "opacity-100" : "opacity-65",
                  )}
                >
                  {option.label}
                </span>
                <span className="mt-2 block min-h-[2.6em] type-voice text-[0.75rem] text-tone-muted">
                  {option.note}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <TextArea
        id="message"
        name="message"
        label={copy.fields.message}
        required
        rows={5}
        placeholder={copy.messagePlaceholder}
      />

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        <TextField id="name" name="name" label={copy.fields.name} required autoComplete="name" />
        <TextField
          id="email"
          name="email"
          label={copy.fields.email}
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <fieldset>
        <legend className="type-voice text-[0.8125rem] text-tone-muted">{copy.contactMethodLegend}</legend>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {copy.contactMethods.map((option) => (
            <label key={option} className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem]">
              <input
                type="radio"
                name={methodName}
                value={option}
                checked={method === option}
                onChange={() => setMethod(option)}
                className="size-3.5 accent-[color:var(--tone-accent)]"
              />
              {option}
            </label>
          ))}
        </div>
        <AnimatePresence initial={false}>
          {wantsPhone ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE.expo }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                <TextField
                  id="phone"
                  name="phone"
                  label={copy.fields.phone}
                  autoComplete="tel"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </fieldset>

      {/* Everything below is optional, and stays out of the way until asked for. */}
      {practice !== "general" ? (
        <div className="border-t border-current/15 pt-8">
          <button
            type="button"
            onClick={() => setDetail((v) => !v)}
            aria-expanded={detail}
            className="group flex w-full items-center justify-between gap-6 text-start"
          >
            <span>
              <span className="block text-[1.0625rem] tracking-tight">{copy.addContext}</span>
              <span className="mt-1.5 block text-[0.8125rem] text-tone-muted">
                {copy.addContextNote}
              </span>
            </span>
            <span aria-hidden className="relative block size-3.5 shrink-0">
              <span className="absolute inset-x-0 top-1/2 block h-px bg-current" />
              <span
                className={cn(
                  "absolute inset-y-0 left-1/2 block w-px bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  detail && "rotate-90",
                )}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {detail ? (
              <motion.div
                initial={reduced ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduced ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE.expo }}
                className="overflow-hidden"
              >
                <div className="grid gap-x-10 gap-y-12 pt-12 sm:grid-cols-2">
                  {practice === "private" ? (
                    <>
                      <TextField
                        id="currentCountry"
                        name="currentCountry"
                        label={copy.fields.currentCountry}
                        autoComplete="country-name"
                      />
                      <SelectField
                        id="destination"
                        name="destination"
                        label={copy.fields.destination}
                        options={destinations}
                      />
                      <SelectField
                        id="party"
                        name="party"
                        label={copy.fields.party}
                        options={copy.partySizes}
                      />
                      <SelectField
                        id="timeframe"
                        name="timeframe"
                        label={copy.fields.timeframe}
                        options={copy.timeframes}
                      />
                      <fieldset className="sm:col-span-2">
                        <legend className="type-voice text-[0.8125rem] text-tone-muted">
                          {copy.supportLegend}
                        </legend>
                        <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {copy.supportAreas.map((area) => (
                            <label
                              key={area}
                              className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-snug"
                            >
                              <input
                                type="checkbox"
                                name="supportAreas"
                                value={area}
                                className="mt-1 size-3.5 shrink-0 accent-[color:var(--tone-accent)]"
                              />
                              {area}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </>
                  ) : (
                    <>
                      <TextField
                        id="company"
                        name="company"
                        label={copy.fields.company}
                        autoComplete="organization"
                      />
                      <TextField
                        id="role"
                        name="role"
                        label={copy.fields.role}
                        autoComplete="organization-title"
                      />
                      <SelectField
                        id="orgType"
                        name="orgType"
                        label={copy.fields.orgType}
                        options={copy.orgTypes}
                      />
                      <TextField
                        id="geography"
                        name="geography"
                        label={copy.fields.geography}
                      />
                      <SelectField
                        id="projectType"
                        name="projectType"
                        label={copy.fields.projectType}
                        options={copy.projectTypes}
                      />
                      <SelectField
                        id="timeframe"
                        name="timeframe"
                        label={copy.fields.timeframe}
                        options={copy.timeframes}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}

      {/* Never shown, never focusable. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">{copy.honeypot}</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-4 border-t border-current/15 pt-8">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 accent-[color:var(--tone-accent)]"
        />
        <label htmlFor="consent" className="type-voice text-[0.8125rem] text-tone-muted">
          {copy.consent}
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <ActionButton disabled={status === "sending"}>
          {status === "sending" ? ui.sending : ui.send}
        </ActionButton>

        <AnimatePresence>
          {status === "unconfigured" || status === "error" ? (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE.expo }}
              role="alert"
              className="max-w-sm type-voice text-[0.8125rem] text-tone-muted"
            >
              {status === "unconfigured" ? copy.unconfigured : copy.failed}{" "}
              {copy.writeTo}{" "}
              <a
                href={`mailto:${contactChannels.email}`}
                dir="ltr"
                className="inline-block text-accent underline underline-offset-4"
              >
                {contactChannels.email}
              </a>
              .
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

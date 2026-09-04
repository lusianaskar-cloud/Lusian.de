"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { markets } from "@/lib/content/markets";
import { contactChannels } from "@/lib/content/site";
import { ActionButton } from "@/components/primitives/ActionLink";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SelectField, TextArea, TextField } from "./Field";

type Division = "aviation" | "gulf" | "other";
type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

const divisionOptions: { id: Division; label: string; note: string }[] = [
  { id: "aviation", label: "Aviation Advisory", note: "Airlines, airports, handling, investment" },
  { id: "gulf", label: "Private Gulf Advisory", note: "Relocation and establishment" },
  { id: "other", label: "Something else", note: "Press, partnership, general" },
];

const projectTypes = [
  "Assessment or review",
  "Operational improvement",
  "Development or transition programme",
  "Due diligence or investment support",
  "Regulatory or organisational",
  "Not yet defined",
];

const partySizes = ["Individual", "Family", "Business", "Family and business"];

const timeframes = [
  "Within three months",
  "Three to six months",
  "Six to twelve months",
  "Beyond twelve months",
  "Exploring only",
];

const destinations = [...markets.map((m) => m.name), "Undecided"];

/**
 * Enquiry, not a contact form.
 *
 * The division chosen changes which questions are asked, so nobody is made to
 * scroll past fields that do not concern them. The reveal is animated because
 * the change is worth noticing — not for decoration.
 */
export function ConsultationForm() {
  const [division, setDivision] = useState<Division>("aviation");
  const [status, setStatus] = useState<Status>("idle");
  const reduced = useReducedMotion();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, division }),
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
        className="border border-current/15 p-10 lg:p-14"
      >
        <span className="label-mono text-accent">Received</span>
        <p className="mt-6 font-display text-heading leading-tight">
          Thank you. Your note has reached us.
        </p>
        <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
          A principal will read it and reply directly. If the matter is time-critical,
          write to{" "}
          <a href={`mailto:${contactChannels.email}`} className="underline underline-offset-4">
            {contactChannels.email}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-12">
      {/* Division */}
      <fieldset>
        <legend className="label-mono text-tone-muted">What is this about</legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {divisionOptions.map((option) => {
            const selected = division === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setDivision(option.id)}
                aria-pressed={selected}
                className={cn(
                  "group relative overflow-hidden border p-5 text-left transition-colors duration-500",
                  selected
                    ? "border-current/60"
                    : "border-current/15 hover:border-current/40",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="division-marker"
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
                <span className="mt-2 block text-[0.75rem] leading-relaxed text-tone-muted">
                  {option.note}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        <TextField id="name" name="name" label="Name" required autoComplete="name" />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={division}
          initial={reduced ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduced ? undefined : { opacity: 0, height: 0 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: EASE.expo }}
          className="overflow-hidden"
        >
          {division === "aviation" ? (
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              <TextField
                id="company"
                name="company"
                label="Company or organisation"
                autoComplete="organization"
              />
              <TextField id="role" name="role" label="Role" autoComplete="organization-title" />
              <SelectField
                id="projectType"
                name="projectType"
                label="Project type"
                options={projectTypes}
                className="sm:col-span-2"
              />
            </div>
          ) : null}

          {division === "gulf" ? (
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              <TextField
                id="currentCountry"
                name="currentCountry"
                label="Current country"
                autoComplete="country-name"
              />
              <SelectField
                id="destination"
                name="destination"
                label="Preferred destination"
                options={destinations}
              />
              <SelectField id="party" name="party" label="Moving as" options={partySizes} />
              <SelectField
                id="timeframe"
                name="timeframe"
                label="Approximate timeframe"
                options={timeframes}
              />
            </div>
          ) : null}

          {division === "other" ? (
            <TextField id="subject" name="subject" label="Subject" />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <TextArea
        id="message"
        name="message"
        label="What you would like to discuss"
        required
        rows={5}
        placeholder="A few lines is enough."
      />

      {/* Honeypot — never shown, never focusable. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
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
        <label htmlFor="consent" className="text-[0.8125rem] leading-relaxed text-tone-muted">
          I agree that Lusian may hold and use the details above solely to respond to
          this enquiry. They are not shared with any third party without instruction.
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <ActionButton disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send privately"}
        </ActionButton>

        <AnimatePresence>
          {status === "unconfigured" || status === "error" ? (
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE.expo }}
              role="status"
              className="max-w-sm text-[0.8125rem] leading-relaxed text-tone-muted"
            >
              {status === "unconfigured"
                ? "This form is not yet connected to the firm's intake system, so your message has not been sent."
                : "The message could not be sent just now."}{" "}
              Please write to{" "}
              <a
                href={`mailto:${contactChannels.email}`}
                className="text-accent underline underline-offset-4"
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

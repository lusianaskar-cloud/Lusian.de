"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { markets } from "@/lib/content/markets";
import { contactChannels } from "@/lib/content/site";
import { ActionButton } from "@/components/primitives/ActionLink";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SelectField, TextArea, TextField } from "./Field";

type Practice = "aviation" | "private" | "general";
type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

const practices: { id: Practice; label: string; note: string }[] = [
  { id: "aviation", label: "Aviation Advisory", note: "Airlines, airports, handling, investment" },
  { id: "private", label: "Private Advisory", note: "Relocation and establishment" },
  { id: "general", label: "Something else", note: "Press, partnership, general" },
];

const contactMethods = ["Email", "Phone", "Either"] as const;

const timeframes = [
  "Within three months",
  "Three to six months",
  "Six to twelve months",
  "Beyond twelve months",
  "Exploring only",
];

const partySizes = ["Individual", "Couple", "Family", "Business", "Family and business"];
const destinations = [...markets.map((m) => m.name), "Undecided"];
const supportAreas = [
  "Choosing a market",
  "Residency coordination",
  "Business establishment",
  "Property",
  "Schools and education",
  "Banking",
  "Healthcare",
  "Arrival and settling in",
];

const orgTypes = [
  "Airline",
  "Airport or terminal operator",
  "Ground handling or aviation services",
  "Investor or lender",
  "Infrastructure developer",
  "Aviation technology",
  "Public sector or authority",
  "Other",
];

const projectTypes = [
  "Assessment or review",
  "Operational improvement",
  "Development or transition programme",
  "Due diligence or investment support",
  "Regulatory or organisational",
  "Not yet defined",
];

/**
 * A question, not a support ticket.
 *
 * The first screen asks four things. Everything else sits behind one quiet
 * disclosure, so someone with a simple question is never made to walk past
 * twenty fields — and someone with a complicated situation can give us the
 * whole picture in one go. Optional fields are genuinely optional.
 */
export function AskFlow() {
  const [practice, setPractice] = useState<Practice>("private");
  const [method, setMethod] = useState<(typeof contactMethods)[number]>("Email");
  const [detail, setDetail] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const reduced = useReducedMotion();
  const methodName = useId();

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
        <span className="label-mono text-accent">Received</span>
        <p className="mt-6 max-w-lg font-display text-heading leading-tight">
          Thank you — your note has reached us.
        </p>
        <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
          You will get a reply from a person, at{" "}
          <a href={`mailto:${contactChannels.email}`} className="underline underline-offset-4">
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
        <legend className="label-mono text-tone-muted">What is this about</legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {practices.map((option) => {
            const selected = practice === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPractice(option.id)}
                aria-pressed={selected}
                className={cn(
                  "group relative flex flex-col items-start overflow-hidden border p-5 text-left transition-colors duration-500",
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
                <span className="mt-2 block min-h-[2.6em] text-[0.75rem] leading-relaxed text-tone-muted">
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
        label="Your question, or the situation"
        required
        rows={5}
        placeholder="In your own words. A few lines is plenty."
      />

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        <TextField id="name" name="name" label="Name" required autoComplete="name" />
        <TextField id="email" name="email" label="Email" type="email" required autoComplete="email" />
      </div>

      <fieldset>
        <legend className="label-mono text-tone-muted">How should we reply</legend>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {contactMethods.map((option) => (
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
          {method !== "Email" ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE.expo }}
              className="overflow-hidden"
            >
              <div className="pt-8">
                <TextField id="phone" name="phone" label="Telephone" autoComplete="tel" />
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
            className="group flex w-full items-center justify-between gap-6 text-left"
          >
            <span>
              <span className="block text-[1.0625rem] tracking-tight">
                Add context
              </span>
              <span className="mt-1.5 block text-[0.8125rem] text-tone-muted">
                Optional. It makes the first reply more useful.
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
                        label="Where you are now"
                        autoComplete="country-name"
                      />
                      <SelectField
                        id="destination"
                        name="destination"
                        label="Market you are considering"
                        options={destinations}
                      />
                      <SelectField id="party" name="party" label="Moving as" options={partySizes} />
                      <SelectField
                        id="timeframe"
                        name="timeframe"
                        label="Approximate timing"
                        options={timeframes}
                      />
                      <fieldset className="sm:col-span-2">
                        <legend className="label-mono text-tone-muted">
                          Where you expect to need support
                        </legend>
                        <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {supportAreas.map((area) => (
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
                        label="Organisation"
                        autoComplete="organization"
                      />
                      <TextField
                        id="role"
                        name="role"
                        label="Role"
                        autoComplete="organization-title"
                      />
                      <SelectField
                        id="orgType"
                        name="orgType"
                        label="Type of organisation"
                        options={orgTypes}
                      />
                      <TextField id="geography" name="geography" label="Where the work sits" />
                      <SelectField
                        id="projectType"
                        name="projectType"
                        label="Nature of the project"
                        options={projectTypes}
                      />
                      <SelectField
                        id="timeframe"
                        name="timeframe"
                        label="Approximate timing"
                        options={timeframes}
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
          I agree that Lusian may hold these details in order to reply. They are not
          shared with anyone else without my instruction, and not used for anything
          other than this conversation.
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
              role="alert"
              className="max-w-sm text-[0.8125rem] leading-relaxed text-tone-muted"
            >
              {status === "unconfigured"
                ? "This form is not yet connected to the firm's intake, so your message has not been sent."
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

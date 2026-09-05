"use client";

import { contactChannels } from "@/lib/content/site";
import { useContent } from "@/lib/i18n/context";
import { Section, Container } from "@/components/primitives/Section";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Surface } from "@/components/light/Surface";

/**
 * The invitation at the foot of every page.
 *
 * Lit by `terminator` — one volume between a cold opening and a warm interior
 * — which is the condition the homepage closes on and the picture of the firm
 * both divisions belong to. Whichever page the reader has just finished, they
 * arrive back at the same room.
 *
 * The giant ghosted wordmark that used to sit behind it is gone. It was a
 * watermark, and a watermark is what a page reaches for when the type is not
 * carrying the frame on its own.
 */
export function ConsultCta({
  eyebrow,
  lines,
  body,
  ctaLabel,
  ctaHref = "/speak",
}: {
  /** Falls back to the section's own name rather than an invented label. */
  eyebrow?: string;
  lines: string[];
  body: string;
  ctaLabel: string;
  ctaHref?: string;
}) {
  const { speak } = useContent();

  return (
    <Section tone="dark" className="relative overflow-hidden bg-obsidian" aria-labelledby="cta-heading">
      <Surface preset="terminator" still={0.62} />

      <Container className="relative py-28 lg:py-44">
        <Reveal>
          <p className="type-voice text-[0.9375rem] text-tone-muted">
            {eyebrow ?? speak.eyebrow}
          </p>
        </Reveal>

        <h2
          id="cta-heading"
          className="type-structure mt-9 max-w-[15ch] text-[calc(clamp(2.4rem,6.4vw,5rem)*var(--ar-struct))]"
        >
          <LineReveal
            stagger={0.1}
            lines={lines.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          />
        </h2>

        <div className="mt-14 max-w-md lg:mt-20">
          <Reveal delay={0.12}>
            <p className="type-voice text-[0.9375rem] text-tone-muted">{body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              <ActionLink href={ctaHref} transitionLabel={speak.eyebrow}>
                {ctaLabel}
              </ActionLink>
              <a
                href={`mailto:${contactChannels.email}`}
                dir="ltr"
                className="type-voice text-[0.8125rem] tracking-[0.04em] text-ivory/40 underline-offset-8 transition-colors duration-500 hover:text-champagne hover:underline"
              >
                {contactChannels.email}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

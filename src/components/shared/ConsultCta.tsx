"use client";

import { contactChannels } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { Mark } from "@/components/chrome/Mark";

export function ConsultCta({
  eyebrow = "Private consultation",
  lines,
  body,
  ctaLabel = "Request a consultation",
  ctaHref = "/speak",
}: {
  eyebrow?: string;
  lines: string[];
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Section tone="dark" grain className="overflow-hidden bg-ink" aria-labelledby="cta-heading">
      <Mark
        className="pointer-events-none absolute -right-[12%] top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 text-ivory/[0.045]"
      />

      <Container className="py-28 lg:py-44">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 id="cta-heading" className="font-display text-display lg:col-span-7">
            <LineReveal
              stagger={0.1}
              lines={lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            />
          </h2>

          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {body}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <ActionLink href={ctaHref} transitionLabel="Private consultation">
                  {ctaLabel}
                </ActionLink>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <p className="mt-8 label-mono text-ivory/35">
                <a
                  href={`mailto:${contactChannels.email}`}
                  className="underline-offset-4 transition-colors duration-500 hover:text-champagne"
                >
                  {contactChannels.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

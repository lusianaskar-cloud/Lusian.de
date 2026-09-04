"use client";

import { gulfServices } from "@/lib/content/gulf";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { ordinal } from "@/lib/utils";

/**
 * The private practice, in a warm dark register — closed rather than bright.
 * Breadth is shown as a quiet ledger rather than a grid of cards: the point is
 * that one party holds all of it.
 */
export function GulfFeature() {
  return (
    <Section tone="dark" grain className="bg-umber" aria-labelledby="gulf-heading">
      {/* Low warm light, set behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] opacity-70"
        style={{
          background:
            "radial-gradient(70% 100% at 78% 0%, color-mix(in oklab, var(--color-champagne) 20%, transparent), transparent)",
        }}
      />

      <Container className="py-28 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <Eyebrow>Division 02 — Gulf Private Advisory</Eyebrow>
            </Reveal>
            <h2 id="gulf-heading" className="mt-8 font-display text-title">
              <LineReveal
                lines={[
                  <span key="1">Arriving well</span>,
                  <span key="2">
                    is a <em className="font-normal text-champagne">project</em>.
                  </span>,
                ]}
              />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lead text-tone-muted">
                Relocating a family, a business, or both is not a decision. It is several
                hundred decisions, taken in sequence, in an unfamiliar system, usually
                against a date.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                Most are small. A few are difficult to undo. We hold the sequence — and
                you should have to explain your situation once.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <TextLink
                href="/private-advisory"
                transitionLabel="Gulf Private Advisory"
                className="mt-10"
              >
                The private practice
              </TextLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="label-mono text-ivory/35">Scope held under one engagement</p>
            </Reveal>
            <RevealGroup stagger={0.05} className="mt-8 border-t border-ivory/12">
              {gulfServices.map((service, i) => (
                <RevealItem key={service.title} distance={14}>
                  <div className="group flex items-baseline gap-5 border-b border-ivory/12 py-4">
                    <span className="label-mono w-6 shrink-0 text-champagne/50">
                      {ordinal(i)}
                    </span>
                    <span className="flex-1 text-[1.0625rem] tracking-tight text-ivory/90">
                      {service.title}
                    </span>
                    <span
                      aria-hidden
                      className="hidden max-w-[20rem] flex-1 text-[0.8125rem] leading-relaxed text-ivory/40 line-clamp-2 xl:block"
                    >
                      {service.body.split(".")[0]}.
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}

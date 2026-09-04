"use client";

import { differentiators } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { ordinal } from "@/lib/utils";

/**
 * The argument, set as an editorial ledger rather than a card grid: an
 * oversized numeral, the claim, and the substantiation, separated by
 * hairlines. Nothing here is boxed — on this site a border means something is
 * outstanding.
 */
export function WhyUs() {
  return (
    <Section tone="light" className="bg-paper" aria-labelledby="why-heading">
      <Container className="py-28 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Why clients engage us</Eyebrow>
            </Reveal>
            <h2 id="why-heading" className="mt-8 font-display text-title">
              <LineReveal
                lines={[
                  <span key="1">Four things</span>,
                  <span key="2">we do not</span>,
                  <span key="3">
                    <em className="font-normal text-brass">compromise</em>.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
              We publish no client names, no case studies and no numbers we cannot
              stand behind. What follows is the whole of the argument.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 lg:mt-28">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} wide>
              <div className="grid items-baseline gap-x-10 gap-y-4 border-t border-ink/12 py-10 lg:grid-cols-12 lg:py-14">
                <span
                  aria-hidden
                  className="font-display text-[clamp(2.25rem,4.4vw,4rem)] leading-none tracking-tight text-ink/15 lg:col-span-1"
                >
                  {ordinal(i)}
                </span>
                <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.5rem)] leading-tight tracking-tight lg:col-span-5 lg:col-start-3">
                  {item.title}
                </h3>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-tone-muted lg:col-span-4 lg:col-start-9 lg:text-base">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
          <span className="block border-t border-ink/12" />
        </div>
      </Container>
    </Section>
  );
}

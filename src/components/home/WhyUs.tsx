"use client";

import { differentiators } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { ordinal } from "@/lib/utils";

export function WhyUs() {
  return (
    <Section tone="light" className="bg-paper" aria-labelledby="why-heading">
      <Container className="py-28 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
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

        <RevealGroup className="mt-20 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:mt-28">
          {differentiators.map((item, i) => (
            <RevealItem key={item.title} className="relative bg-paper">
              <div className="relative h-full overflow-hidden p-8 lg:p-12">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] leading-none text-ink/[0.05]"
                >
                  {ordinal(i)}
                </span>
                <h3 className="relative font-display text-heading leading-tight">
                  {item.title}
                </h3>
                <p className="relative mt-5 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

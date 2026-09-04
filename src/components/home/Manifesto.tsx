"use client";

import { manifesto } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { Rule } from "@/components/primitives/Rule";

export function Manifesto() {
  return (
    <Section tone="dark" grain className="bg-ink" aria-labelledby="manifesto-heading">
      <Container className="py-28 lg:py-44">
        <Reveal>
          <Eyebrow>{manifesto.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <h2
            id="manifesto-heading"
            className="font-display text-display lg:col-span-7 lg:pr-8"
          >
            <LineReveal
              stagger={0.1}
              lines={[
                <span key="1">We work in the distance</span>,
                <span key="2">between a decision</span>,
                <span key="3">
                  and its <em className="font-normal text-champagne">execution</em>.
                </span>,
              ]}
            />
          </h2>

          <div className="lg:col-span-4 lg:col-start-9">
            <Rule className="text-ivory" />
            <div className="mt-8 space-y-6">
              {manifesto.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-[0.9375rem] leading-relaxed text-tone-muted lg:text-base">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <p className="font-display text-subhead italic text-champagne">
                  {manifesto.signature}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

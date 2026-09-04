"use client";

import { reach } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { GulfConstellation } from "@/components/gulf/GulfConstellation";

export function Reach() {
  return (
    <Section tone="dark" grain className="bg-ink" aria-labelledby="reach-heading">
      <Container className="py-28 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{reach.eyebrow}</Eyebrow>
            </Reveal>
            <h2 id="reach-heading" className="mt-8 font-display text-title">
              <LineReveal
                lines={[
                  <span key="1">In market, on site,</span>,
                  <span key="2">or wherever the</span>,
                  <span key="3">
                    <em className="font-normal text-champagne">file</em> requires.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.1}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {reach.body}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {reach.secondary.map((item) => (
                  <li key={item} className="label-mono text-ivory/40">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <GulfConstellation variant="compact" />
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-ivory/35">{reach.note}</p>
          <TextLink href="/destinations" transitionLabel="Destinations">
            All six markets
          </TextLink>
        </div>
      </Container>
    </Section>
  );
}

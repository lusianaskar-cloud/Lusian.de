"use client";

import { useContent } from "@/lib/i18n/context";
import { Section, Container } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { LitGround } from "@/components/light/LitGround";

/**
 * THE ARGUMENT — the ground between Scene V and Scene VI.
 *
 * Everything either side of this is pinned, scrubbed and moving. This is the
 * one place on the homepage that holds still and asks to be read, so it is
 * built the opposite way round: no scrubbing, no camera, no instrument, and
 * the only motion is the settling reveal the reduced-motion fallback uses
 * everywhere else.
 *
 * It is lit rather than white. `plaster` is the daylight side of Scene I
 * returning — the page's only other light-toned moment — which makes this a
 * reprise instead of a section that happens to have a different background.
 *
 * What it deliberately is not: an eyebrow, a rule, a ghosted numeral and a
 * twelve-column ledger. The four commitments carry their own weight in type
 * and in space. A hairline between them would only be admitting they do not.
 */
export function Argument() {
  const { argument } = useContent().home;

  return (
    <Section tone="light" className="bg-paper" aria-labelledby="why-heading">
      <LitGround preset="plaster" still={0.42} dim={0.3} />
      <Container className="pb-24 pt-28 lg:pb-32 lg:pt-40">
        <div className="max-w-4xl">
          <Reveal>
            <p className="type-voice text-[0.9375rem] text-tone-muted">
              {argument.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="why-heading"
              className="type-structure mt-8 text-[calc(clamp(2.6rem,7vw,5.5rem)*var(--ar-struct))]"
            >
              {argument.headlineLines.join(" ")}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="type-voice mt-10 max-w-[46ch] text-[0.9375rem] text-tone-muted lg:text-base">
              {argument.note}
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-x-16 gap-y-16 lg:mt-32 lg:grid-cols-2 lg:gap-y-20">
          {argument.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.08} wide>
              <h3 className="type-structure max-w-[18ch] text-[calc(clamp(1.5rem,2.8vw,2.25rem)*var(--ar-struct))]">
                {item.title}
              </h3>
              <p className="type-voice mt-6 max-w-[42ch] text-[0.9375rem] text-tone-muted lg:text-base">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

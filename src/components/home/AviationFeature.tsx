"use client";

import { aviationCapabilities } from "@/lib/content/aviation";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { ordinal } from "@/lib/utils";

/**
 * Aviation, drawn rather than photographed: hairline ink on ivory, mono
 * annotation, a network plotted like a technical sheet. It reads as an
 * engineering drawing, which is the register the division actually works in.
 */
export function AviationFeature() {
  return (
    <Section tone="light" className="bg-ivory" aria-labelledby="aviation-heading">
      <Container className="py-28 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Division 01 — Aviation Advisory</Eyebrow>
            </Reveal>
            <h2 id="aviation-heading" className="mt-8 font-display text-title">
              <LineReveal
                lines={[
                  <span key="1">The operation</span>,
                  <span key="2">
                    is the <em className="font-normal text-brass">strategy</em>.
                  </span>,
                ]}
              />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lead text-tone-muted">
                An airline&apos;s margin is settled in fifteen-minute increments on a
                stand. An airport&apos;s reputation is settled in a queue.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                We advise on the layer where strategy becomes throughput — and we are
                comfortable being measured there.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <TextLink
                href="/aviation"
                transitionLabel="Aviation Advisory"
                className="mt-10"
              >
                The aviation practice
              </TextLink>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal wide className="relative">
              <div className="relative aspect-[4/3] w-full border border-ink/15 sm:aspect-[16/10]">
                <RouteNetwork color="#14181A" accent="#9C7F52" opacity={0.62} graticule />
                {/* Drawing-sheet corner ticks */}
                {(
                  [
                    "left-0 top-0 border-l border-t",
                    "right-0 top-0 border-r border-t",
                    "left-0 bottom-0 border-l border-b",
                    "right-0 bottom-0 border-r border-b",
                  ] as const
                ).map((position) => (
                  <span
                    key={position}
                    aria-hidden
                    className={`absolute size-4 border-ink/45 ${position}`}
                  />
                ))}
                <span className="label-mono absolute left-6 top-5 text-ink/40">
                  Network — schematic
                </span>
                <span className="label-mono absolute bottom-5 right-6 text-ink/40">
                  Illustrative only
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-20 grid gap-x-10 gap-y-10 border-t border-ink/12 pt-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-5">
          {aviationCapabilities.map((group, i) => (
            <RevealItem key={group.group}>
              <span className="label-mono text-ink/35">{ordinal(i)}</span>
              <h3 className="mt-4 text-[1rem] tracking-tight">{group.group}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.slice(0, 4).map((item) => (
                  <li key={item} className="text-[0.8125rem] leading-[1.6] text-tone-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

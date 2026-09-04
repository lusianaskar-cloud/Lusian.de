import type { Metadata } from "next";
import {
  aviationCapabilities,
  aviationEngagements,
  aviationHero,
  aviationPositioning,
  aviationPrinciples,
  aviationSectors,
} from "@/lib/content/aviation";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { plates } from "@/lib/content/plates";
import { ordinal } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Aviation Advisory",
  description:
    "Operations, development, investment and regulatory counsel for airlines, airports, ground handlers, aviation investors and public-sector aviation bodies.",
  alternates: { canonical: "/aviation" },
};

export default function AviationPage() {
  return (
    <>
      <PageHero
        tone="dark"
        className="bg-petrol"
        eyebrow={`${aviationHero.eyebrow} — ${aviationHero.title}`}
        titleLines={[
          <span key="1">The operation</span>,
          <span key="2">
            is the <em className="font-normal text-ice">strategy</em>.
          </span>,
        ]}
        standfirst={aviationHero.standfirst}
        meta="Airlines · Airports · Ground handling · Investors · Infrastructure · Public sector"
        visual={
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
            <RouteNetwork color="#A0B8C2" accent="#C6AD82" opacity={0.55} />
          </div>
        }
      />

      <Section tone="light" className="bg-ivory" aria-labelledby="position-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{aviationPositioning.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <h2
              id="position-heading"
              className="font-display text-title leading-[1.06] lg:col-span-7"
            >
              <LineReveal
                lines={[
                  <span key="1">Aviation rewards precision</span>,
                  <span key="2">more than ambition.</span>,
                ]}
              />
            </h2>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              <Reveal>
                <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                  {aviationPositioning.statement}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                  {aviationPositioning.support}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark" grain className="bg-petrol" aria-labelledby="onsite-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4 lg:self-center">
              <Reveal>
                <Eyebrow>On site</Eyebrow>
              </Reveal>
              <h2 id="onsite-heading" className="mt-8 font-display text-heading leading-snug">
                <LineReveal
                  lines={[
                    <span key="1">Findings that cannot be</span>,
                    <span key="2">recognised on the ramp</span>,
                    <span key="3">
                      are not <em className="font-normal text-ice">findings</em>.
                    </span>,
                  ]}
                />
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                  Work begins where the operation is, at the hour it is under pressure.
                  Everything afterwards is written against what was seen there.
                </p>
              </Reveal>
            </div>
            <Reveal wide className="lg:col-span-7 lg:col-start-6">
              <EditorialImage
                plate={plates.aviationApron}
                ratio="aspect-[4/3] lg:aspect-[3/2]"
                tone="dark"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper" aria-labelledby="capabilities-heading">
        <Container className="py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>Capabilities</Eyebrow>
              </Reveal>
              <h2 id="capabilities-heading" className="mt-8 font-display text-title">
                <LineReveal lines={[<span key="1">Where we are engaged.</span>]} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                Engagements are usually a combination of these rather than one of them.
                Scope is set in writing before work begins.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 lg:mt-24">
            {aviationCapabilities.map((group, i) => (
              <Reveal key={group.group} wide>
                <div className="grid gap-6 border-t border-ink/12 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10">
                  <div className="flex items-baseline gap-5 lg:col-span-4">
                    <span className="label-mono text-ink/35">{ordinal(i)}</span>
                    <h3 className="font-display text-heading leading-tight">{group.group}</h3>
                  </div>
                  <ul className="grid gap-x-10 gap-y-3 lg:col-span-7 lg:col-start-6 lg:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.9375rem] leading-relaxed text-tone-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.6em] block size-1 shrink-0 rounded-full bg-brass"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <span className="block border-t border-ink/12" />
          </div>
        </Container>
      </Section>

      <Section tone="dark" grain className="bg-petrol" aria-labelledby="sectors-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>Who we work with</Eyebrow>
          </Reveal>
          <h2 id="sectors-heading" className="mt-8 max-w-3xl font-display text-title">
            <LineReveal
              lines={[
                <span key="1">Operators, owners,</span>,
                <span key="2">
                  and the bodies that <em className="font-normal text-ice">hold them</em>.
                </span>,
              ]}
            />
          </h2>

          <RevealGroup className="mt-16 grid gap-x-10 border-t border-ivory/12 sm:grid-cols-2 lg:mt-24">
            {aviationSectors.map((sector) => (
              <RevealItem key={sector.name} distance={16}>
                <div className="border-b border-ivory/12 py-6">
                  <h3 className="text-[1.0625rem] tracking-tight">{sector.name}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ivory/45">
                    {sector.note}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="light" className="bg-ivory" aria-labelledby="approach-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Approach</Eyebrow>
              </Reveal>
              <h2 id="approach-heading" className="mt-8 font-display text-title">
                <LineReveal
                  lines={[
                    <span key="1">Three habits</span>,
                    <span key="2">
                      we do not <em className="font-normal text-brass">drop</em>.
                    </span>,
                  ]}
                />
              </h2>
            </div>
            <RevealGroup className="lg:col-span-7 lg:col-start-6">
              {aviationPrinciples.map((principle, i) => (
                <RevealItem key={principle.title}>
                  <div className="border-t border-ink/12 py-8">
                    <span className="label-mono text-ink/35">{ordinal(i)}</span>
                    <h3 className="mt-4 font-display text-heading leading-tight">
                      {principle.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-tone-muted">
                      {principle.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
              <span className="block border-t border-ink/12" />
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-dune" aria-labelledby="shapes-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>How projects run</Eyebrow>
          </Reveal>
          <h2 id="shapes-heading" className="mt-8 max-w-2xl font-display text-title">
            <LineReveal lines={[<span key="1">Three shapes of engagement.</span>]} />
          </h2>

          <RevealGroup className="mt-16 grid gap-x-12 gap-y-12 lg:mt-24 lg:grid-cols-3">
            {aviationEngagements.map((shape, i) => (
              <RevealItem key={shape.name}>
                <div className="flex h-full flex-col border-t border-ink/25 pt-7">
                  <span className="label-mono text-ink/45">{ordinal(i)}</span>
                  <h3 className="mt-6 font-display text-heading leading-tight">
                    {shape.name}
                  </h3>
                  <p className="mt-3 label-mono text-brass">{shape.duration}</p>
                  <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                    {shape.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <ConsultCta
        eyebrow="Aviation enquiries"
        lines={["Discuss an", "aviation project."]}
        body="Tell us the operation, the question, and the date it has to be answered by. We will say plainly whether we are the right party."
        ctaLabel="Discuss a project"
      />
    </>
  );
}

import type { Metadata } from "next";
import {
  gulfAssurances,
  gulfHero,
  gulfJourney,
  gulfPositioning,
  gulfServices,
} from "@/lib/content/gulf";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { JourneyRail } from "@/components/gulf/JourneyRail";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { plates } from "@/lib/content/plates";
import { TextLink } from "@/components/primitives/ActionLink";
import { ordinal } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gulf Private Advisory",
  description:
    "Private relocation and establishment across the Gulf — orientation, residency coordination, business establishment, property, schooling, banking and arrival, held under one engagement.",
  alternates: { canonical: "/private-advisory" },
};

export default function PrivateAdvisoryPage() {
  return (
    <>
      <PageHero
        tone="dark"
        className="bg-umber"
        eyebrow={`${gulfHero.eyebrow} — ${gulfHero.title}`}
        titleLines={[
          <span key="1">A move made</span>,
          <span key="2">quietly, and</span>,
          <span key="3">
            made <em className="font-normal text-champagne">once</em>.
          </span>,
        ]}
        standfirst={gulfHero.standfirst}
        meta="United Arab Emirates · Saudi Arabia · Qatar · Bahrain · Oman · Kuwait"
        visual={
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
              style={{
                background:
                  "radial-gradient(60% 80% at 82% 18%, color-mix(in oklab, var(--color-champagne) 22%, transparent), transparent)",
              }}
            />
            <svg
              aria-hidden
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMax slice"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full text-champagne/15"
            >
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path
                  key={i}
                  d={`M -60 ${400 - i * 30} Q 400 ${300 - i * 46} 860 ${400 - i * 30}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </>
        }
      />

      <Section tone="light" className="bg-ivory" aria-labelledby="gulf-position">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <h2
              id="gulf-position"
              className="font-display text-title leading-[1.06] lg:col-span-7"
            >
              <LineReveal
                lines={[
                  <span key="1">A relocation is not</span>,
                  <span key="2">one decision.</span>,
                ]}
              />
            </h2>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              <Reveal>
                <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                  {gulfPositioning.statement}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                  {gulfPositioning.support}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-display text-subhead italic text-brass">
                  {gulfPositioning.emphasis}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper" aria-labelledby="services-heading">
        <Container className="py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>Scope</Eyebrow>
              </Reveal>
              <h2 id="services-heading" className="mt-8 font-display text-title">
                <LineReveal lines={[<span key="1">Ten things, one file.</span>]} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                Engagements are shaped to the situation. Most clients take some of this;
                a few take all of it.
              </p>
            </Reveal>
          </div>

          <RevealGroup stagger={0.05} className="mt-16 lg:mt-24">
            {gulfServices.map((service, i) => (
              <RevealItem key={service.title} distance={16}>
                <div className="grid gap-3 border-t border-ink/12 py-7 lg:grid-cols-12 lg:gap-10 lg:py-9">
                  <div className="flex items-baseline gap-5 lg:col-span-5">
                    <span className="label-mono text-ink/35">{ordinal(i)}</span>
                    <h3 className="font-display text-[1.5rem] leading-tight tracking-tight lg:text-heading">
                      {service.title}
                    </h3>
                  </div>
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-tone-muted lg:col-span-6 lg:col-start-7">
                    {service.body}
                  </p>
                </div>
              </RevealItem>
            ))}
            <span className="block border-t border-ink/12" />
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="dark" className="bg-umber">
        <EditorialImage
          plate={plates.gulfInterior}
          ratio="aspect-[3/4] sm:aspect-[16/9] lg:aspect-[2/1]"
          tone="dark"
          className="bg-umber"
        />
      </Section>

      <Section tone="dark" grain className="bg-umber" aria-labelledby="journey-heading">
        <Container className="py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>The private client experience</Eyebrow>
              </Reveal>
              <h2 id="journey-heading" className="mt-8 font-display text-title">
                <LineReveal
                  lines={[
                    <span key="1">Five stages,</span>,
                    <span key="2">
                      one <em className="font-normal text-champagne">contact</em>.
                    </span>,
                  ]}
                />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                Nothing here requires you to manage a panel of advisors. That is our
                part of the arrangement.
              </p>
            </Reveal>
          </div>

          <div className="mt-20 lg:mt-28">
            <JourneyRail steps={gulfJourney} />
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-dune" aria-labelledby="assurances-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>How we hold your information</Eyebrow>
          </Reveal>
          <h2 id="assurances-heading" className="mt-8 max-w-2xl font-display text-title">
            <LineReveal lines={[<span key="1">Discretion, stated plainly.</span>]} />
          </h2>

          <RevealGroup className="mt-16 grid gap-px border border-ink/12 bg-ink/12 lg:mt-24 lg:grid-cols-3">
            {gulfAssurances.map((item, i) => (
              <RevealItem key={item.title} className="bg-dune">
                <div className="flex h-full flex-col p-8 lg:p-10">
                  <span className="label-mono text-ink/35">{ordinal(i)}</span>
                  <h3 className="mt-6 font-display text-heading leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-tone-muted">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal wide>
            <div className="mt-14 flex flex-col gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-tone-muted">
                Country and city character is set out market by market, without claims
                about rules that change.
              </p>
              <TextLink href="/destinations" transitionLabel="Destinations">
                The six markets
              </TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ConsultCta
        eyebrow="Private enquiries"
        lines={["Speak", "privately."]}
        body="A first conversation is short, confidential and without obligation. No documents are needed to begin."
        ctaLabel="Begin a conversation"
      />
    </>
  );
}

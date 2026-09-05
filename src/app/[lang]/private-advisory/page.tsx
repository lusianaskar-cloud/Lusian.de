import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { JourneyRail } from "@/components/gulf/JourneyRail";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { LitGround } from "@/components/light/LitGround";
import { accentLines, plainLines } from "@/components/shared/AccentLines";
import { TextLink } from "@/components/primitives/ActionLink";
import { plates } from "@/lib/content/plates";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { ordinal } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.gulf.title,
    description: content.seo.gulf.description,
    alternates: alternatesFor(locale, "/private-advisory"),
  };
}

export default async function PrivateAdvisoryPage() {
  const content = await getContent();
  const copy = content.gulf;
  const { boundaries } = content.speak;

  return (
    <div className="voice-warm">
      <PageHero
        tone="dark"
        condition="stone"
        voice="warm"
        still={0.4}
        className="bg-umber"
        eyebrow={`${copy.eyebrow} — ${copy.title}`}
        titleLines={accentLines(copy.headlineLines, "text-champagne")}
        standfirst={copy.standfirst}
        meta={copy.meta}
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

      <Section tone="light" className="relative overflow-hidden bg-ivory" aria-labelledby="gulf-position">
        <LitGround preset="plaster" still={0.34} dim={0.35} />
        <Container className="relative py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <h2
              id="gulf-position"
              className="lg:col-span-7 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]"
            >
              <LineReveal lines={plainLines(copy.positioning.headlineLines)} />
            </h2>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              <Reveal>
                <p className="type-voice text-[0.9375rem] text-tone-muted">
                  {copy.positioning.statement}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="type-voice text-[0.9375rem] text-tone-muted">
                  {copy.positioning.support}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-brass type-structure text-[calc(clamp(1.15rem,1.7vw,1.5rem)*var(--ar-struct))]">
                  {copy.positioning.emphasis}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="relative overflow-hidden bg-ivory" aria-labelledby="services-heading">
        <LitGround preset="plaster" still={0.6} dim={0.4} />
        <Container className="relative py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>{copy.scope.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="services-heading" className="mt-8 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
                <LineReveal lines={plainLines([copy.scope.headline])} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.scope.note}
              </p>
            </Reveal>
          </div>

          {/* Four phases, then the detail beneath each. Phases reference their
              services by id, so a translator can rename a service freely. */}
          <div className="mt-16 lg:mt-24">
            {copy.scope.phases.map((phase, i) => (
              <Reveal key={phase.id} wide>
                <section className="grid gap-8 pb-4 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                    <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40">{ordinal(i)}</span>
                    <h3 className="mt-4 type-structure text-[calc(clamp(1.7rem,3.4vw,2.75rem)*var(--ar-struct))]">
                      {phase.title}
                    </h3>
                    <p className="mt-4 max-w-xs type-voice text-[0.875rem] text-tone-muted">
                      {phase.note}
                    </p>
                  </div>

                  <div className="lg:col-span-7 lg:col-start-6">
                    {phase.services.map((id) => {
                      const service = copy.scope.services[id];
                      if (!service) return null;
                      return (
                        <div
                          key={id}
                          className="pb-7"
                        >
                          <h4 className="text-[1.0625rem] tracking-tight">{service.title}</h4>
                          <p className="mt-2.5 max-w-2xl type-voice text-[0.9375rem] text-tone-muted">
                            {service.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
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

      <Section tone="dark" grain className="relative overflow-hidden bg-umber" aria-labelledby="journey-heading">
        <LitGround preset="stone" still={0.52} dim={0.42} />
        <Container className="relative py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>{copy.journey.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="journey-heading" className="mt-8 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
                <LineReveal lines={plainLines(copy.journey.headlineLines)} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.journey.note}
              </p>
            </Reveal>
          </div>

          <div className="mt-20 lg:mt-28">
            <JourneyRail steps={copy.journey.steps} />
          </div>
        </Container>
      </Section>

      <Section tone="light" className="relative overflow-hidden bg-ivory" aria-labelledby="assurances-heading">
        <LitGround preset="plaster" still={0.28} dim={0.4} />
        <Container className="relative py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{copy.assurances.eyebrow}</Eyebrow>
          </Reveal>
          <h2 id="assurances-heading" className="mt-8 max-w-2xl type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
            <LineReveal lines={plainLines([copy.assurances.headline])} />
          </h2>

          <RevealGroup className="mt-16 grid gap-x-12 gap-y-12 lg:mt-24 lg:grid-cols-3">
            {copy.assurances.items.map((item, i) => (
              <RevealItem key={item.title}>
                <div className="flex h-full flex-col">
                  <span className="type-voice text-[0.8125rem] tabular-nums text-ink/45">{ordinal(i)}</span>
                  <h3 className="mt-6 type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">{item.title}</h3>
                  <p className="mt-5 max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal wide>
            <div className="mt-20 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl type-voice text-[0.8125rem] text-tone-muted">
                {copy.destinationsNote}
              </p>
              <TextLink href="/destinations" transitionLabel={content.markets.eyebrow}>
                {copy.destinationsLink}
              </TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="bg-ivory" aria-labelledby="levels-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{copy.levels.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="levels-heading" className="max-w-2xl type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
              <LineReveal lines={plainLines([copy.levels.headline])} />
            </h2>
            <Reveal delay={0.12}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.levels.note}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 lg:mt-24">
            {copy.levels.items.map((level, i) => (
              <RevealItem key={level.name}>
                <div className="grid items-baseline gap-x-10 gap-y-3 border-t border-ink/8 py-10 first:border-t-0 lg:grid-cols-12 lg:py-14">
                  <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40 lg:col-span-1">{ordinal(i)}</span>
                  <h3 className="lg:col-span-4 lg:col-start-2 type-structure text-[calc(clamp(1.6rem,3vw,2.5rem)*var(--ar-struct))]">
                    {level.name}
                  </h3>
                  <p className="type-voice text-[0.8125rem] text-brass lg:col-span-2 lg:col-start-6">
                    {level.scope}
                  </p>
                  <p className="max-w-xl type-voice text-[0.9375rem] text-tone-muted lg:col-span-4 lg:col-start-9">
                    {level.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal wide>
            <div className="mt-24 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h3 className="type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">
                  {copy.boundaries.heading}
                </h3>
                <p className="mt-5 max-w-sm type-voice text-[0.875rem] text-tone-muted">
                  {boundaries.note}
                </p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
                <div>
                  <span className="type-voice text-[0.8125rem] text-brass">{boundaries.coordinatedLabel}</span>
                  <ul className="mt-5">
                    {boundaries.coordinated.map((item) => (
                      <li
                        key={item}
                        className="py-2 type-voice text-[0.8125rem]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="type-voice text-[0.8125rem] tabular-nums text-ink/45">{boundaries.regulatedLabel}</span>
                  <ul className="mt-5">
                    {boundaries.regulated.map((item) => (
                      <li
                        key={item}
                        className="py-2 type-voice text-[0.8125rem] text-tone-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <ConsultCta
        eyebrow={copy.cta.eyebrow}
        lines={copy.cta.lines}
        body={copy.cta.body}
        ctaLabel={copy.cta.label}
      />
    </div>
  );
}

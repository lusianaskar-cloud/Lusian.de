import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { JourneyRail } from "@/components/gulf/JourneyRail";
import { EditorialImage } from "@/components/shared/EditorialImage";
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
    <>
      <PageHero
        tone="dark"
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

      <Section tone="light" className="bg-ivory" aria-labelledby="gulf-position">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <h2
              id="gulf-position"
              className="font-display text-title leading-[1.06] lg:col-span-7"
            >
              <LineReveal lines={plainLines(copy.positioning.headlineLines)} />
            </h2>
            <div className="space-y-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              <Reveal>
                <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                  {copy.positioning.statement}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[0.9375rem] leading-relaxed text-tone-muted">
                  {copy.positioning.support}
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="font-display text-subhead italic text-brass">
                  {copy.positioning.emphasis}
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
                <Eyebrow>{copy.scope.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="services-heading" className="mt-8 font-display text-title">
                <LineReveal lines={plainLines([copy.scope.headline])} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {copy.scope.note}
              </p>
            </Reveal>
          </div>

          {/* Four phases, then the detail beneath each. Phases reference their
              services by id, so a translator can rename a service freely. */}
          <div className="mt-16 lg:mt-24">
            {copy.scope.phases.map((phase, i) => (
              <Reveal key={phase.id} wide>
                <section className="grid gap-8 border-t border-ink/12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                  <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                    <span className="label-mono text-ink/40">{ordinal(i)}</span>
                    <h3 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.75rem)] leading-tight tracking-tight">
                      {phase.title}
                    </h3>
                    <p className="mt-4 max-w-xs text-[0.875rem] leading-relaxed text-tone-muted">
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
                          className="border-t border-ink/12 py-6 first:border-t-0 first:pt-0"
                        >
                          <h4 className="text-[1.0625rem] tracking-tight">{service.title}</h4>
                          <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-tone-muted">
                            {service.body}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </Reveal>
            ))}
            <span className="block border-t border-ink/12" />
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

      <Section tone="dark" grain className="bg-umber" aria-labelledby="journey-heading">
        <Container className="py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>{copy.journey.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="journey-heading" className="mt-8 font-display text-title">
                <LineReveal lines={plainLines(copy.journey.headlineLines)} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {copy.journey.note}
              </p>
            </Reveal>
          </div>

          <div className="mt-20 lg:mt-28">
            <JourneyRail steps={copy.journey.steps} />
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-dune" aria-labelledby="assurances-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{copy.assurances.eyebrow}</Eyebrow>
          </Reveal>
          <h2 id="assurances-heading" className="mt-8 max-w-2xl font-display text-title">
            <LineReveal lines={plainLines([copy.assurances.headline])} />
          </h2>

          <RevealGroup className="mt-16 grid gap-x-12 gap-y-12 lg:mt-24 lg:grid-cols-3">
            {copy.assurances.items.map((item, i) => (
              <RevealItem key={item.title}>
                <div className="flex h-full flex-col border-t border-ink/25 pt-7">
                  <span className="label-mono text-ink/45">{ordinal(i)}</span>
                  <h3 className="mt-6 font-display text-heading leading-tight">{item.title}</h3>
                  <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal wide>
            <div className="mt-14 flex flex-col gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-tone-muted">
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
            <h2 id="levels-heading" className="max-w-2xl font-display text-title">
              <LineReveal lines={plainLines([copy.levels.headline])} />
            </h2>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {copy.levels.note}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 lg:mt-24">
            {copy.levels.items.map((level, i) => (
              <RevealItem key={level.name}>
                <div className="grid items-baseline gap-x-10 gap-y-3 border-t border-ink/12 py-10 lg:grid-cols-12 lg:py-14">
                  <span className="label-mono text-ink/40 lg:col-span-1">{ordinal(i)}</span>
                  <h3 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-tight tracking-tight lg:col-span-4 lg:col-start-2">
                    {level.name}
                  </h3>
                  <p className="label-mono text-brass lg:col-span-2 lg:col-start-6">
                    {level.scope}
                  </p>
                  <p className="max-w-xl text-[0.9375rem] leading-relaxed text-tone-muted lg:col-span-4 lg:col-start-9">
                    {level.body}
                  </p>
                </div>
              </RevealItem>
            ))}
            <span className="block border-t border-ink/12" />
          </RevealGroup>

          <Reveal wide>
            <div className="mt-20 grid gap-10 border-t border-ink/12 pt-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h3 className="font-display text-heading leading-tight">
                  {copy.boundaries.heading}
                </h3>
                <p className="mt-5 max-w-sm text-[0.875rem] leading-relaxed text-tone-muted">
                  {boundaries.note}
                </p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
                <div>
                  <span className="label-mono text-brass">{boundaries.coordinatedLabel}</span>
                  <ul className="mt-5">
                    {boundaries.coordinated.map((item) => (
                      <li
                        key={item}
                        className="border-t border-ink/12 py-2.5 text-[0.8125rem] leading-relaxed"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="label-mono text-ink/45">{boundaries.regulatedLabel}</span>
                  <ul className="mt-5">
                    {boundaries.regulated.map((item) => (
                      <li
                        key={item}
                        className="border-t border-ink/12 py-2.5 text-[0.8125rem] leading-relaxed text-tone-muted"
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
    </>
  );
}

import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { LitGround } from "@/components/light/LitGround";
import { accentLines, plainLines } from "@/components/shared/AccentLines";
import { plates } from "@/lib/content/plates";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { ordinal } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.aviation.title,
    description: content.seo.aviation.description,
    alternates: alternatesFor(locale, "/aviation"),
  };
}

/**
 * THE AVIATION PRACTICE
 *
 * The page keeps its argument in the order it was written in, and stops
 * presenting that argument as eight stacked rectangles of colour. Sections
 * that belong to one movement now share one ground and one light, and are
 * separated by space and by a change in the size of the type rather than by a
 * new coloured band every time the subject shifts.
 *
 * Three movements: the operation is stated on a plastered wall; the practice
 * is shown on a hangar floor; the method is set down again in daylight. The
 * whole page is `voice-cool`, so every structural heading on it is narrower
 * and heavier than the same heading on the private practice — the division
 * distinction carried by the type itself.
 */
export default async function AviationPage() {
  const content = await getContent();
  const copy = content.aviation;

  return (
    <div className="voice-cool">
      <PageHero
        tone="dark"
        condition="hangar"
        voice="cool"
        still={0.34}
        className="bg-petrol"
        eyebrow={`${copy.eyebrow} — ${copy.title}`}
        titleLines={accentLines(copy.headlineLines, "text-ice")}
        standfirst={copy.standfirst}
        meta={copy.meta}
        visual={
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-55">
            <RouteNetwork color="#A0B8C2" accent="#C6AD82" opacity={0.5} />
          </div>
        }
      />

      {/* Movement one — the position, said plainly, in daylight. */}
      <Section
        tone="light"
        className="relative overflow-hidden bg-ivory"
        aria-labelledby="position-heading"
      >
        <LitGround preset="plaster" still={0.3} dim={0.35} />
        <Container className="relative py-28 lg:py-44">
          <Reveal>
            <p className="type-voice text-[0.9375rem] text-tone-muted">
              {copy.positioning.eyebrow}
            </p>
          </Reveal>

          <h2
            id="position-heading"
            className="type-structure mt-9 max-w-[18ch] text-[calc(clamp(2.2rem,5.4vw,4.25rem)*var(--ar-struct))]"
          >
            <LineReveal lines={plainLines(copy.positioning.headlineLines)} />
          </h2>

          <div className="mt-14 grid max-w-4xl gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="type-voice text-[0.9375rem] text-tone-muted lg:text-base">
                {copy.positioning.statement}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="type-voice text-[0.9375rem] text-tone-muted lg:text-base">
                {copy.positioning.support}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/*
        Movement two — the practice itself, on one floor. What used to be
        three sections in three different colours (on site, capabilities,
        sectors) is one lit space the reader travels through.
      */}
      <Section
        tone="dark"
        className="relative overflow-hidden bg-petrol"
        aria-labelledby="onsite-heading"
      >
        <LitGround preset="hangar" still={0.46} dim={0.5} />
        <span aria-hidden className="grain-layer" />

        <Container className="relative py-28 lg:py-44">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:self-center">
              <Reveal>
                <p className="type-voice text-[0.9375rem] text-tone-muted">
                  {copy.onSite.eyebrow}
                </p>
              </Reveal>
              <h2
                id="onsite-heading"
                className="type-structure mt-8 text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]"
              >
                <LineReveal lines={plainLines(copy.onSite.headlineLines)} />
              </h2>
              <Reveal delay={0.12}>
                <p className="type-voice mt-9 max-w-sm text-[0.9375rem] text-tone-muted">
                  {copy.onSite.body}
                </p>
              </Reveal>
            </div>
            <Reveal wide className="lg:col-span-6 lg:col-start-7">
              <EditorialImage
                plate={plates.aviationApron}
                ratio="aspect-[4/3] lg:aspect-[3/2]"
                tone="dark"
              />
            </Reveal>
          </div>

          {/* Capabilities — no rules. Space and scale do the separating. */}
          <div className="mt-32 lg:mt-48">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <h2
                id="capabilities-heading"
                className="type-structure max-w-[16ch] text-[calc(clamp(2rem,4.8vw,3.75rem)*var(--ar-struct))]"
              >
                <LineReveal lines={plainLines([copy.capabilities.headline])} />
              </h2>
              <Reveal delay={0.12}>
                <p className="type-voice max-w-sm text-[0.9375rem] text-tone-muted">
                  {copy.capabilities.note}
                </p>
              </Reveal>
            </div>

            <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-24">
              {copy.capabilities.groups.map((group, i) => (
                <Reveal key={group.group} wide>
                  <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="flex items-baseline gap-5 lg:col-span-5">
                      <span className="type-voice text-[0.8125rem] tabular-nums text-ivory/35">
                        {ordinal(i)}
                      </span>
                      <h3 className="type-structure text-[calc(clamp(1.6rem,3vw,2.4rem)*var(--ar-struct))]">
                        {group.group}
                      </h3>
                    </div>
                    <ul className="grid gap-x-10 gap-y-3.5 lg:col-span-6 lg:col-start-7 lg:grid-cols-2">
                      {group.items.map((item) => (
                        <li key={item} className="type-voice text-[0.9375rem] text-tone-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sectors — the same floor, one movement later. */}
          <div className="mt-32 lg:mt-48">
            <Reveal>
              <p className="type-voice text-[0.9375rem] text-tone-muted">
                {copy.sectors.eyebrow}
              </p>
            </Reveal>
            <h2
              id="sectors-heading"
              className="type-structure mt-8 max-w-[20ch] text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]"
            >
              <LineReveal lines={plainLines(copy.sectors.headlineLines)} />
            </h2>

            <RevealGroup className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {copy.sectors.items.map((sector) => (
                <RevealItem key={sector.name} distance={16}>
                  <h3 className="type-structure text-[calc(clamp(1.05rem,1.5vw,1.25rem)*var(--ar-struct))]">
                    {sector.name}
                  </h3>
                  <p className="type-voice mt-3 text-[0.875rem] text-ivory/50">{sector.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* Movement three — how the work is done, set down again in daylight. */}
      <Section
        tone="light"
        className="relative overflow-hidden bg-ivory"
        aria-labelledby="approach-heading"
      >
        <LitGround preset="plaster" still={0.62} dim={0.35} />
        <Container className="relative py-28 lg:py-44">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="type-voice text-[0.9375rem] text-tone-muted">
                  {copy.approach.eyebrow}
                </p>
              </Reveal>
              <h2
                id="approach-heading"
                className="type-structure mt-8 text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]"
              >
                <LineReveal lines={plainLines(copy.approach.headlineLines)} />
              </h2>
            </div>
            <RevealGroup className="space-y-14 lg:col-span-7 lg:col-start-6">
              {copy.approach.items.map((principle, i) => (
                <RevealItem key={principle.title}>
                  <span className="type-voice text-[0.8125rem] tabular-nums text-ink/35">
                    {ordinal(i)}
                  </span>
                  <h3 className="type-structure mt-4 text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">
                    {principle.title}
                  </h3>
                  <p className="type-voice mt-4 max-w-xl text-[0.9375rem] text-tone-muted">
                    {principle.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Shapes of engagement — same daylight, no new rectangle. */}
          <div className="mt-32 lg:mt-48">
            <Reveal>
              <p className="type-voice text-[0.9375rem] text-tone-muted">{copy.shapes.eyebrow}</p>
            </Reveal>
            <h2
              id="shapes-heading"
              className="type-structure mt-8 max-w-[20ch] text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]"
            >
              <LineReveal lines={plainLines([copy.shapes.headline])} />
            </h2>

            <RevealGroup className="mt-14 grid gap-x-12 gap-y-14 lg:mt-20 lg:grid-cols-3">
              {copy.shapes.items.map((shape, i) => (
                <RevealItem key={shape.name}>
                  <span className="type-voice text-[0.8125rem] tabular-nums text-ink/35">
                    {ordinal(i)}
                  </span>
                  <h3 className="type-structure mt-5 text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">
                    {shape.name}
                  </h3>
                  <p className="type-voice mt-3 text-[0.875rem] text-brass">{shape.duration}</p>
                  <p className="type-voice mt-6 max-w-sm text-[0.9375rem] text-tone-muted">
                    {shape.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
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

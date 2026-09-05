import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { EditorialImage } from "@/components/shared/EditorialImage";
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

export default async function AviationPage() {
  const content = await getContent();
  const copy = content.aviation;

  return (
    <>
      <PageHero
        tone="dark"
        className="bg-petrol"
        eyebrow={`${copy.eyebrow} — ${copy.title}`}
        titleLines={accentLines(copy.headlineLines, "text-ice")}
        standfirst={copy.standfirst}
        meta={copy.meta}
        visual={
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
            <RouteNetwork color="#A0B8C2" accent="#C6AD82" opacity={0.55} />
          </div>
        }
      />

      <Section tone="light" className="bg-ivory" aria-labelledby="position-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{copy.positioning.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <h2
              id="position-heading"
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
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="dark" grain className="bg-petrol" aria-labelledby="onsite-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4 lg:self-center">
              <Reveal>
                <Eyebrow>{copy.onSite.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="onsite-heading" className="mt-8 font-display text-heading leading-snug">
                <LineReveal lines={plainLines(copy.onSite.headlineLines)} />
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                  {copy.onSite.body}
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
                <Eyebrow>{copy.capabilities.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="capabilities-heading" className="mt-8 font-display text-title">
                <LineReveal lines={plainLines([copy.capabilities.headline])} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {copy.capabilities.note}
              </p>
            </Reveal>
          </div>

          <div className="mt-16 lg:mt-24">
            {copy.capabilities.groups.map((group, i) => (
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
            <Eyebrow>{copy.sectors.eyebrow}</Eyebrow>
          </Reveal>
          <h2 id="sectors-heading" className="mt-8 max-w-3xl font-display text-title">
            <LineReveal lines={plainLines(copy.sectors.headlineLines)} />
          </h2>

          <RevealGroup className="mt-16 grid gap-x-10 border-t border-ivory/12 sm:grid-cols-2 lg:mt-24">
            {copy.sectors.items.map((sector) => (
              <RevealItem key={sector.name} distance={16}>
                <div className="border-b border-ivory/12 py-6">
                  <h3 className="text-[1.0625rem] tracking-tight">{sector.name}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ivory/45">
                    {sector.body}
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
                <Eyebrow>{copy.approach.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="approach-heading" className="mt-8 font-display text-title">
                <LineReveal lines={plainLines(copy.approach.headlineLines)} />
              </h2>
            </div>
            <RevealGroup className="lg:col-span-7 lg:col-start-6">
              {copy.approach.items.map((principle, i) => (
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
            <Eyebrow>{copy.shapes.eyebrow}</Eyebrow>
          </Reveal>
          <h2 id="shapes-heading" className="mt-8 max-w-2xl font-display text-title">
            <LineReveal lines={plainLines([copy.shapes.headline])} />
          </h2>

          <RevealGroup className="mt-16 grid gap-x-12 gap-y-12 lg:mt-24 lg:grid-cols-3">
            {copy.shapes.items.map((shape, i) => (
              <RevealItem key={shape.name}>
                <div className="flex h-full flex-col border-t border-ink/25 pt-7">
                  <span className="label-mono text-ink/45">{ordinal(i)}</span>
                  <h3 className="mt-6 font-display text-heading leading-tight">{shape.name}</h3>
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
        eyebrow={copy.cta.eyebrow}
        lines={copy.cta.lines}
        body={copy.cta.body}
        ctaLabel={copy.cta.label}
      />
    </>
  );
}

import type { Metadata } from "next";

import { markets } from "@/lib/content/markets";
import { Section, Container } from "@/components/primitives/Section";
import { LitGround } from "@/components/light/LitGround";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { plainLines } from "@/components/shared/AccentLines";
import { MarketExplorer } from "@/components/gulf/MarketExplorer";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { format } from "@/lib/i18n/format";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.markets.title,
    description: content.seo.markets.description,
    alternates: alternatesFor(locale, "/destinations"),
  };
}

export default async function DestinationsPage() {
  const content = await getContent();
  const copy = content.markets;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        condition="stone"
        voice="warm"
        tone="dark"
        still={0.4}
        dim={0.3}
        className="bg-umber"
        titleLines={plainLines(copy.titleLines)}
        standfirst={copy.standfirst}
        meta={copy.meta}
      />

      <Section tone="dark" grain className="relative overflow-hidden bg-ink" aria-labelledby="explorer-heading">
        <LitGround preset="stone" still={0.55} dim={0.55} />
        <Container className="py-20 lg:py-32">
          <div className="flex flex-col gap-6 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
            <div>
              <Reveal>
                <Eyebrow>{copy.explorer.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="explorer-heading" className="mt-8 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
                <LineReveal lines={plainLines([copy.explorer.headline])} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.explorer.note}
              </p>
            </Reveal>
          </div>

          <MarketExplorer />
        </Container>
      </Section>

      {/* Deliberate omissions — the reason this page will not age badly. */}
      <Section tone="light" className="relative overflow-hidden bg-ivory">
        <LitGround preset="plaster" still={0.34} dim={0.4} />
        <Container className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">
                {copy.omissions.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-2xl type-voice text-[0.9375rem] text-tone-muted">
                {copy.omissions.body}
              </p>
              <p className="mt-6 max-w-2xl type-voice text-[0.8125rem] text-tone-muted">
                {format(copy.omissions.covered, {
                  list: markets.map((m) => copy.entries[m.id].name).join(", "),
                })}
              </p>
            </Reveal>
          </div>
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

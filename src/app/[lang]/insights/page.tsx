import type { Metadata } from "next";

import { insights } from "@/lib/content/insights";
import { Section, Container } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { plainLines } from "@/components/shared/AccentLines";
import { InsightsIndex } from "@/components/insights/InsightsIndex";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.insights.title,
    description: content.seo.insights.description,
    alternates: alternatesFor(locale, "/insights"),
    robots: { index: false, follow: true },
  };
}

export default async function InsightsPage() {
  const content = await getContent();
  const copy = content.insights;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        className="bg-ivory"
        titleLines={plainLines(copy.titleLines)}
        standfirst={copy.standfirst}
      />

      <Section tone="light" className="bg-ivory">
        <Container className="pb-24 lg:pb-36">
          {/* Honest framing — nothing below is published research. */}
          <Reveal eager>
            <div className="mb-14 flex flex-col gap-4 border border-brass/35 bg-brass/[0.06] p-6 sm:flex-row sm:items-center sm:gap-8 lg:mb-20 lg:p-8">
              <span className="label-mono shrink-0 text-brass">{copy.notice.label}</span>
              <p className="text-[0.875rem] leading-relaxed text-tone-muted">
                {copy.notice.body}
              </p>
            </div>
          </Reveal>

          <InsightsIndex insights={insights} />
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

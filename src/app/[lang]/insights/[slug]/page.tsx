import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getInsight, insights } from "@/lib/content/insights";
import { Section, Container } from "@/components/primitives/Section";
import { Reveal, LineReveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { Arrow } from "@/components/primitives/Arrow";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { format } from "@/lib/i18n/format";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  const copy = content.insights.entries[insight.slug];

  return {
    title: format(content.insights.demoTitle, { title: copy.title }),
    description: copy.standfirst,
    alternates: alternatesFor(locale, `/insights/${insight.slug}`),
    // Placeholder editorial must never be indexed as published research.
    robots: { index: false, follow: false },
  };
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const content = await getContent();
  const section = content.insights;
  const copy = section.entries[insight.slug];
  const others = insights.filter((i) => i.slug !== insight.slug).slice(0, 2);

  return (
    <>
      <Section tone="light" className="bg-ivory">
        <Container narrow className="pb-16 pt-36 lg:pb-24 lg:pt-44">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="type-voice text-[0.8125rem] text-brass">
                {section.categories[insight.category]}
              </span>
              <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40">{copy.readingTime}</span>
              <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40">{copy.date}</span>
            </div>
          </Reveal>

          <h1 className="mt-10 type-structure text-[calc(clamp(2.2rem,5.6vw,4.5rem)*var(--ar-struct))]">
            <LineReveal immediate delay={0.15} lines={[<span key="t">{copy.title}</span>]} />
          </h1>

          <Reveal eager delay={0.25}>
            <p className="mt-8 max-w-2xl type-voice text-[clamp(1rem,1.25vw,1.15rem)] text-tone-muted">{copy.standfirst}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper">
        <Container narrow className="py-16 lg:py-24">
          {/* Unmissable, and required: this is not published research. */}
          <div className="border border-brass/40 bg-brass/[0.07] p-6 lg:p-8">
            <span className="type-voice text-[0.8125rem] text-brass">{section.articleNotice.label}</span>
            <p className="mt-4 type-voice text-[0.9375rem] text-tone-muted">
              {section.articleNotice.body}
            </p>
          </div>

          <article className="mt-16 lg:mt-24">
            {copy.sections.map((part, i) => (
              <Reveal key={part.heading} delay={i * 0.04} wide>
                <section className="mb-14 lg:mb-20">
                  <h2 className="type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">{part.heading}</h2>
                  <div className="mt-6 space-y-5">
                    {part.paragraphs.map((paragraph, j) => (
                      <p
                        key={j}
                        className="max-w-2xl text-[1.0625rem] leading-[1.75] text-graphite"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </article>

          <Reveal wide>
            <div className="border-t border-ink/12 pt-8">
              <TextLink href="/insights" transitionLabel={section.eyebrow}>
                {section.allInsights}
              </TextLink>
            </div>
          </Reveal>

          <Reveal wide>
            <div className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-2">
              {others.map((other) => (
                <TransitionLink
                  key={other.slug}
                  href={`/insights/${other.slug}`}
                  transitionLabel={section.categories[other.category]}
                  className="group flex flex-col justify-between gap-8 bg-paper p-8 transition-colors duration-700 hover:bg-dune/60"
                >
                  <span className="type-voice text-[0.8125rem] text-brass">
                    {section.categories[other.category]}
                  </span>
                  <span className="flex items-end justify-between gap-6">
                    <span className="type-structure text-[calc(1.35rem*var(--ar-struct))]">
                      {section.entries[other.slug].title}
                    </span>
                    <Arrow className="mb-1.5 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:rtl:-translate-x-2" />
                  </span>
                </TransitionLink>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <ConsultCta
        eyebrow={section.cta.eyebrow}
        lines={section.cta.lines}
        body={section.cta.body}
        ctaLabel={section.cta.label}
      />
    </>
  );
}

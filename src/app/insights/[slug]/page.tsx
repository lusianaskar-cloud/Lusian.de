import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/lib/content/insights";
import { Section, Container } from "@/components/primitives/Section";
import { Reveal, LineReveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { Arrow } from "@/components/primitives/Arrow";
import { ConsultCta } from "@/components/shared/ConsultCta";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};

  return {
    title: `${insight.title} (demonstration)`,
    description: insight.standfirst,
    alternates: { canonical: `/insights/${insight.slug}` },
    // Placeholder editorial must never be indexed as published research.
    robots: { index: false, follow: false },
  };
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const others = insights.filter((i) => i.slug !== insight.slug).slice(0, 2);

  return (
    <>
      <Section tone="light" className="bg-ivory">
        <Container narrow className="pb-16 pt-36 lg:pb-24 lg:pt-44">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="label-mono text-brass">{insight.category}</span>
              <span className="label-mono text-ink/40">{insight.readingTime}</span>
              <span className="label-mono text-ink/40">{insight.date}</span>
            </div>
          </Reveal>

          <h1 className="mt-10 font-display text-[clamp(2.2rem,5.6vw,4.5rem)] leading-[1.04] tracking-[-0.028em]">
            <LineReveal immediate delay={0.15} lines={[<span key="t">{insight.title}</span>]} />
          </h1>

          <Reveal delay={0.25}>
            <p className="mt-8 max-w-2xl text-lead text-tone-muted">{insight.standfirst}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper">
        <Container narrow className="py-16 lg:py-24">
          {/* Unmissable, and required: this is not published research. */}
          <div className="border border-brass/40 bg-brass/[0.07] p-6 lg:p-8">
            <span className="label-mono text-brass">Demonstration article</span>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-tone-muted">
              This entry exists to demonstrate the article layout. The text below is
              placeholder copy — it is not research, it is not sourced, and it does not
              represent the firm&apos;s view on the subject. It will be replaced in full
              before the Insights section is published.
            </p>
          </div>

          <article className="mt-16 lg:mt-24">
            {insight.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 0.04} wide>
                <section className="mb-14 lg:mb-20">
                  <h2 className="font-display text-heading leading-tight">
                    {section.heading}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {section.paragraphs.map((paragraph, j) => (
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
              <TextLink href="/insights" transitionLabel="Insights">
                All insights
              </TextLink>
            </div>
          </Reveal>

          <Reveal wide>
            <div className="mt-16 grid gap-px bg-ink/10 sm:grid-cols-2">
              {others.map((other) => (
                <TransitionLink
                  key={other.slug}
                  href={`/insights/${other.slug}`}
                  transitionLabel={other.category}
                  className="group flex flex-col justify-between gap-8 bg-paper p-8 transition-colors duration-700 hover:bg-dune/60"
                >
                  <span className="label-mono text-brass">{other.category}</span>
                  <span className="flex items-end justify-between gap-6">
                    <span className="font-display text-[1.35rem] leading-tight tracking-tight">
                      {other.title}
                    </span>
                    <Arrow className="mb-1.5 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
                  </span>
                </TransitionLink>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <ConsultCta
        eyebrow="Enquiries"
        lines={["Ask about", "your own case."]}
        body="Published notes are general by nature. What matters in your situation is usually not."
        ctaLabel="Begin a conversation"
      />
    </>
  );
}

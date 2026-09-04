import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/lib/content/legal";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.standfirst,
    alternates: { canonical: `/legal/${page.slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <Section tone="light" className="bg-ivory">
      <Container narrow className="pb-28 pt-36 lg:pb-40 lg:pt-44">
        <Reveal>
          <Eyebrow>{page.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-10 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.04] tracking-[-0.028em]">
          <LineReveal immediate delay={0.15} lines={[<span key="t">{page.title}</span>]} />
        </h1>

        <Reveal delay={0.24}>
          <p className="mt-8 max-w-2xl text-lead text-tone-muted">{page.standfirst}</p>
        </Reveal>

        {/* Unmissable: this document is not finished and is not legal advice. */}
        <Reveal delay={0.3}>
          <div className="mt-12 border border-brass/40 bg-brass/[0.07] p-6 lg:p-8">
            <span className="label-mono text-brass">Document outstanding</span>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-tone-muted">
              This page is a prepared structure, not a published legal document. It has
              not been drafted or reviewed by a lawyer, and the fields listed below have
              not been supplied. It must be completed and reviewed by a qualified
              professional in the relevant jurisdiction before this site goes live.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          {page.sections.map((section, i) => (
            <Reveal key={section.heading} wide delay={i * 0.03}>
              <section className="border-t border-ink/12 py-10">
                <h2 className="font-display text-heading leading-tight">
                  {section.heading}
                </h2>
                {section.body ? (
                  <p className="mt-5 max-w-2xl text-[1rem] leading-[1.75] text-graphite">
                    {section.body}
                  </p>
                ) : null}
                {section.required ? (
                  <div className="mt-7">
                    <span className="label-mono text-brass">To be supplied</span>
                    <ul className="mt-4 space-y-2.5">
                      {section.required.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed text-tone-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.62em] block size-1 shrink-0 bg-brass"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            </Reveal>
          ))}
          <span className="block border-t border-ink/12" />
        </div>

        <Reveal wide>
          <nav aria-label="Legal pages" className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            {legalPages
              .filter((other) => other.slug !== page.slug)
              .map((other) => (
                <TextLink
                  key={other.slug}
                  href={`/legal/${other.slug}`}
                  transitionLabel={other.title}
                >
                  {other.title}
                </TextLink>
              ))}
          </nav>
        </Reveal>
      </Container>
    </Section>
  );
}

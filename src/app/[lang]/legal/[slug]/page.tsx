import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLegalSlug, legalSlugs } from "@/lib/content/legal";
import { Section, Container } from "@/components/primitives/Section";
import { LitGround } from "@/components/light/LitGround";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return {};

  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  const page = content.legal.pages[slug];

  return {
    title: page.title,
    description: page.standfirst,
    alternates: alternatesFor(locale, `/legal/${slug}`),
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  const content = await getContent();
  const copy = content.legal;
  const page = copy.pages[slug];

  return (
    <Section tone="light" className="relative overflow-hidden bg-ivory">
      <LitGround preset="plaster" still={0.5} dim={0.4} />
      <Container narrow className="pb-28 pt-36 lg:pb-40 lg:pt-44">
        <Reveal>
          <Eyebrow>{page.eyebrow}</Eyebrow>
        </Reveal>

        <h1 className="mt-10 type-structure text-[calc(clamp(2.2rem,5vw,4rem)*var(--ar-struct))]">
          <LineReveal immediate delay={0.15} lines={[<span key="t">{page.title}</span>]} />
        </h1>

        <Reveal eager delay={0.24}>
          <p className="mt-8 max-w-2xl type-voice text-[clamp(1rem,1.25vw,1.15rem)] text-tone-muted">{page.standfirst}</p>
        </Reveal>

        {/* Unmissable: this document is not finished and is not legal advice. */}
        <Reveal eager delay={0.3}>
          <div className="mt-12 border border-brass/40 bg-brass/[0.07] p-6 lg:p-8">
            <span className="type-voice text-[0.8125rem] text-brass">{copy.outstanding.label}</span>
            <p className="mt-4 type-voice text-[0.9375rem] text-tone-muted">
              {copy.outstanding.body}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          {page.sections.map((section, i) => (
            <Reveal key={section.heading} wide delay={i * 0.03}>
              <section className="border-t border-ink/12 py-10">
                <h2 className="type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">{section.heading}</h2>
                {section.body ? (
                  <p className="mt-5 max-w-2xl text-[1rem] leading-[1.75] text-graphite">
                    {section.body}
                  </p>
                ) : null}
                {section.required ? (
                  <div className="mt-7">
                    <span className="type-voice text-[0.8125rem] text-brass">{copy.toBeSupplied}</span>
                    <ul className="mt-4 space-y-2.5">
                      {section.required.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 type-voice text-[0.9375rem] text-tone-muted"
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
          <nav aria-label={copy.otherPages} className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
            {legalSlugs
              .filter((other) => other !== slug)
              .map((other) => (
                <TextLink
                  key={other}
                  href={`/legal/${other}`}
                  transitionLabel={copy.pages[other].title}
                >
                  {copy.pages[other].title}
                </TextLink>
              ))}
          </nav>
        </Reveal>
      </Container>
    </Section>
  );
}

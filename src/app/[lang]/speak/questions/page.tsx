import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { plainLines } from "@/components/shared/AccentLines";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { ordinal } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.questions.title,
    description: content.seo.questions.description,
    alternates: alternatesFor(locale, "/speak/questions"),
  };
}

/**
 * Native <details> rather than a scripted accordion: keyboard and screen
 * reader behaviour is correct for free, it works before hydration, and the
 * page costs nothing to render.
 */
export default async function QuestionsPage() {
  const content = await getContent();
  const copy = content.speak.questions;

  return (
    <>
      <Section tone="light" className="bg-ivory">
        <Container className="pb-16 pt-36 lg:pb-24 lg:pt-44">
          <Reveal eager>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-10 max-w-[16ch] font-display text-[clamp(2.3rem,6vw,5rem)] leading-[1.03] tracking-[-0.03em] lg:mt-14">
            <LineReveal immediate delay={0.15} lines={plainLines([copy.headline])} />
          </h1>
          <Reveal eager delay={0.28}>
            <p className="mt-9 max-w-xl text-lead text-tone-muted">{copy.standfirst}</p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper">
        <Container className="py-20 lg:py-28">
          {copy.categories.map((category, i) => (
            <Reveal key={category.id} wide>
              <section className="grid gap-8 border-t border-ink/12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                  <span className="label-mono text-ink/40">{ordinal(i)}</span>
                  <h2 className="mt-4 font-display text-heading leading-tight">
                    {category.title}
                  </h2>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  {category.questions.map((item) => (
                    <details
                      key={item.q}
                      className="group border-b border-ink/12 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] leading-snug tracking-tight transition-colors duration-500 hover:text-brass">
                        {item.q}
                        <span aria-hidden className="relative mt-2.5 block size-3 shrink-0">
                          <span className="absolute inset-x-0 top-1/2 block h-px bg-current" />
                          <span className="absolute inset-y-0 left-1/2 block w-px bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-90" />
                        </span>
                      </summary>
                      <p className="max-w-xl pb-6 text-[0.9375rem] leading-relaxed text-tone-muted">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal wide>
            <div className="flex flex-col gap-6 border-t border-ink/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                {copy.disclaimer}
              </p>
              <TextLink href="/speak/ask" transitionLabel={content.speak.ask.eyebrow}>
                {copy.askSomething}
              </TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { plainLines } from "@/components/shared/AccentLines";
import { AskFlow } from "@/components/speak/AskFlow";
import { contactChannels } from "@/lib/content/site";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.ask.title,
    description: content.seo.ask.description,
    alternates: alternatesFor(locale, "/speak/ask"),
  };
}

export default async function AskPage() {
  const content = await getContent();
  const copy = content.speak.ask;

  return (
    <>
      <Section tone="light" className="bg-ivory">
        <Container className="grid gap-16 pb-24 pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-44">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <Reveal eager>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="mt-9 font-display text-[clamp(2.2rem,4.6vw,3.75rem)] leading-[1.04] tracking-[-0.028em] lg:mt-12">
              <LineReveal immediate delay={0.15} lines={plainLines([copy.headline])} />
            </h1>
            <Reveal eager delay={0.26}>
              <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                {copy.standfirst}
              </p>
            </Reveal>

            <Reveal eager delay={0.34}>
              <ul className="mt-12 border-t border-ink/12">
                {copy.assurances.map((item) => (
                  <li key={item.title} className="border-b border-ink/12 py-5">
                    <h2 className="text-[0.9375rem] tracking-tight">{item.title}</h2>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-tone-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal eager delay={0.42}>
              <div className="mt-10 space-y-4">
                <a
                  href={`mailto:${contactChannels.email}`}
                  dir="ltr"
                  className="block text-[1.0625rem] tracking-tight underline-offset-8 transition-colors duration-500 hover:text-brass hover:underline rtl:text-end"
                >
                  {contactChannels.email}
                </a>
                <TextLink href="/speak/book" transitionLabel={content.speak.book.eyebrow}>
                  {copy.ratherBook}
                </TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal eager delay={0.2}>
              <AskFlow />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper">
        <Container className="py-14">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-tone-muted">
            {content.legal.notice}
          </p>
        </Container>
      </Section>
    </>
  );
}

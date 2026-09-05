import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { LitGround } from "@/components/light/LitGround";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { plainLines } from "@/components/shared/AccentLines";
import { BookingFlow } from "@/components/speak/booking/BookingFlow";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.book.title,
    description: content.seo.book.description,
    alternates: alternatesFor(locale, "/speak/book"),
  };
}

export default async function BookPage() {
  const content = await getContent();
  const copy = content.speak.book;

  return (
    <>
      <Section tone="light" className="relative overflow-hidden bg-ivory">
        <LitGround preset="plaster" still={0.48} dim={0.4} />
        <Container className="pb-14 pt-36 lg:pb-20 lg:pt-44">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal eager>
                <Eyebrow>{copy.eyebrow}</Eyebrow>
              </Reveal>
              <h1 className="mt-9 max-w-[15ch] lg:mt-12 type-structure text-[calc(clamp(2.2rem,5vw,4.25rem)*var(--ar-struct))]">
                <LineReveal immediate delay={0.15} lines={plainLines([copy.headline])} />
              </h1>
            </div>
            <Reveal eager delay={0.26}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.standfirst}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper">
        <Container className="pb-24 pt-14 lg:pb-36 lg:pt-16">
          <BookingFlow />
          <div className="mt-20 flex flex-col gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl type-voice text-[0.8125rem] text-tone-muted">
              {content.legal.notice}
            </p>
            <TextLink href="/speak/ask" transitionLabel={content.speak.ask.eyebrow}>
              {copy.askInstead}
            </TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { LitGround } from "@/components/light/LitGround";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { TextLink } from "@/components/primitives/ActionLink";
import { Arrow } from "@/components/primitives/Arrow";
import { plainLines } from "@/components/shared/AccentLines";
import { contactChannels } from "@/lib/content/site";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.speak.title,
    description: content.seo.speak.description,
    alternates: alternatesFor(locale, "/speak"),
  };
}

export default async function SpeakPage() {
  const content = await getContent();
  const copy = content.speak;
  const { boundaries } = copy;

  return (
    <>
      <Section tone="dark" className="relative overflow-hidden bg-obsidian">
        <LitGround preset="terminator" still={0.5} dim={0.25} />
        <Container className="relative pb-20 pt-36 lg:pb-28 lg:pt-44">
          <Reveal eager>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="mt-10 max-w-[13ch] lg:mt-14 type-structure text-[calc(clamp(2.4rem,6.4vw,5.5rem)*var(--ar-struct))]">
            <LineReveal
              immediate
              delay={0.15}
              stagger={0.1}
              lines={plainLines(copy.titleLines)}
            />
          </h1>
          <Reveal eager delay={0.3}>
            <p className="mt-9 max-w-xl type-voice text-[clamp(1rem,1.25vw,1.15rem)] text-tone-muted">{copy.standfirst}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Two intentions. Asymmetric on purpose — these are not equivalent
          choices. The asymmetry is expressed with logical properties, so in
          Arabic it leans the other way rather than fighting the page. */}
      <Section tone="light" className="bg-ivory">
        <Container className="py-8 lg:py-12">
          {copy.intents.map((intent, i) => (
            <Reveal key={intent.href} wide>
              <TransitionLink
                href={intent.href}
                transitionLabel={intent.title.replace(/[.。]$/, "")}
                className={cn(
                  "group grid gap-6 border-t border-ink/12 py-16 transition-colors duration-700 hover:bg-paper lg:grid-cols-12 lg:gap-10 lg:py-24",
                  i === 1 && "lg:text-end",
                )}
              >
                <span
                  className={cn(
                    "type-voice text-[0.8125rem] tabular-nums text-ink/40",
                    i === 0 ? "lg:col-span-1" : "lg:order-2 lg:col-span-1 lg:col-start-12",
                  )}
                >
                  {intent.index}
                </span>
                <div
                  className={cn(
                    i === 0
                      ? "lg:col-span-8 lg:col-start-3"
                      : "lg:order-1 lg:col-span-8 lg:col-start-3",
                  )}
                >
                  <h2 className="type-structure text-[calc(clamp(2.2rem,6.6vw,5rem)*var(--ar-struct))]">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px] rtl:bg-right-bottom">
                      {intent.title}
                    </span>
                  </h2>
                  <p
                    className={cn(
                      "mt-7 max-w-md type-voice text-[clamp(1rem,1.25vw,1.15rem)] text-tone-muted",
                      i === 1 && "lg:ms-auto",
                    )}
                  >
                    {intent.body}
                  </p>
                  <span
                    className={cn(
                      "label-ui mt-9 inline-flex items-center gap-3",
                      i === 1 && "lg:flex-row-reverse",
                    )}
                  >
                    {intent.cta}
                    <Arrow
                      className={cn(
                        "transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === 1
                          ? "rotate-180 group-hover:-translate-x-2 group-hover:rtl:translate-x-2"
                          : "group-hover:translate-x-2 group-hover:rtl:-translate-x-2",
                      )}
                    />
                  </span>
                </div>
              </TransitionLink>
            </Reveal>
          ))}

          <Reveal wide>
            <div className="flex flex-col gap-6 border-t border-ink/12 py-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md type-voice text-[0.9375rem] text-tone-muted">
                {copy.questionsTeaser.body}
              </p>
              <TextLink href="/speak/questions" transitionLabel={copy.questions.eyebrow}>
                {copy.questionsTeaser.link}
              </TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* What we coordinate, and what licensed professionals provide. */}
      <Section tone="light" className="bg-ivory" aria-labelledby="boundaries-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{boundaries.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="boundaries-heading" className="mt-8 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
                <LineReveal lines={plainLines(boundaries.headlineLines)} />
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-8 max-w-md type-voice text-[0.9375rem] text-tone-muted">
                  {boundaries.note}
                </p>
              </Reveal>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <h3 className="type-voice text-[0.8125rem] text-brass">{boundaries.coordinatedLabel}</h3>
                <ul className="mt-6">
                  {boundaries.coordinated.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ink/12 py-3 type-voice text-[0.875rem]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08}>
                <h3 className="type-voice text-[0.8125rem] tabular-nums text-ink/45">{boundaries.regulatedLabel}</h3>
                <ul className="mt-6">
                  {boundaries.regulated.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ink/12 py-3 type-voice text-[0.875rem] text-tone-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <Reveal wide>
            <div className="mt-20 flex flex-col gap-6 border-t border-ink/12 pt-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <a
                  href={`mailto:${contactChannels.email}`}
                  dir="ltr"
                  className="inline-block text-lg tracking-tight underline-offset-8 transition-colors duration-500 hover:text-brass hover:underline rtl:text-end"
                >
                  {contactChannels.email}
                </a>
                {/* TODO(client): real line, or delete. */}
                <p dir="ltr" className="mt-2 type-voice text-[0.8125rem] tabular-nums text-ink/40 rtl:text-end">
                  {contactChannels.phone}
                </p>
              </div>
              <p className="max-w-lg type-voice text-[0.8125rem] text-tone-muted">
                {content.legal.notice}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

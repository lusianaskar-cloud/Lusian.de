import type { Metadata } from "next";

import { Section, Container } from "@/components/primitives/Section";
import { LitGround } from "@/components/light/LitGround";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { PlaceholderBlock } from "@/components/shared/PlaceholderBlock";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { plainLines } from "@/components/shared/AccentLines";
import { ClientRecognition } from "@/components/about/ClientRecognition";
import { founder } from "@/lib/content/founder";
import { getContent, getLocale } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { ordinal } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const [content, locale] = await Promise.all([getContent(), getLocale()]);
  return {
    title: content.seo.about.title,
    description: content.seo.about.description,
    alternates: alternatesFor(locale, "/about"),
  };
}

/**
 * NOTE — this page states only what is structurally true of the offer, plus
 * background supplied by the principal. It invents no history, headcount,
 * offices, credentials, clients or track record, in any of the three
 * languages. See src/lib/content/founder.ts for the truthfulness rules, and
 * docs/CONTENT-TODO.md for what is still open.
 */
export default async function AboutPage() {
  const content = await getContent();
  const copy = content.about;
  const principal = copy.founder;

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        condition="plaster"
        still={0.36}
        className="bg-ivory"
        titleLines={plainLines(copy.titleLines)}
        standfirst={copy.standfirst}
        meta={copy.meta}
      />

      {/* Why the firm exists — specific, or not worth saying. */}
      <Section tone="dark" grain className="relative overflow-hidden bg-ink" aria-labelledby="raison-heading">
        <LitGround preset="terminator" still={0.44} dim={0.4} />
        <Container className="py-24 lg:py-40">
          <Reveal>
            <Eyebrow>{copy.raison.eyebrow}</Eyebrow>
          </Reveal>
          <h2
            id="raison-heading"
            className="mt-10 max-w-[15ch] type-structure text-[calc(clamp(2.2rem,6vw,5rem)*var(--ar-struct))]"
          >
            <LineReveal lines={plainLines([copy.raison.headline])} />
          </h2>
          <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
            {copy.raison.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06} className="lg:col-span-4">
                <p className="max-w-md type-voice text-[0.9375rem] text-tone-muted lg:text-base">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The principal. */}
      <Section tone="light" className="bg-ivory" aria-labelledby="principal-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{principal.role}</Eyebrow>
              </Reveal>
              <h2
                id="principal-heading"
                className="mt-9 max-w-[16ch] type-structure text-[calc(clamp(1.9rem,4.4vw,3.5rem)*var(--ar-struct))]"
              >
                <LineReveal lines={plainLines([principal.opening])} />
              </h2>

              {/* Reserved: portrait and name. Neither inferred nor generated. */}
              <Reveal delay={0.12}>
                <div className="mt-12 flex items-center gap-6 border-t border-ink/12 pt-8">
                  <span
                    aria-hidden
                    className="relative grid size-24 shrink-0 place-items-center border border-ink/20"
                  >
                    <span
                      className="absolute inset-0 opacity-[0.09]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 12px)",
                      }}
                    />
                    <span className="type-voice relative text-[0.8125rem] text-ink/40">{content.ui.portrait}</span>
                  </span>
                  <div>
                    <p className="text-[1.0625rem] tracking-tight">
                      {founder.name ?? principal.nameFallback}
                    </p>
                    <p className="mt-1.5 type-voice text-[0.8125rem] text-brass">{principal.nameNote}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <RevealGroup className="space-y-6">
                {principal.statement.map((paragraph, i) => (
                  <RevealItem key={i}>
                    <p className="max-w-2xl type-voice text-[clamp(1rem,1.25vw,1.15rem)] text-graphite">{paragraph}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>

          {/* Trajectory — plainly, without a CV table. */}
          <RevealGroup stagger={0.05} className="mt-20 lg:mt-28">
            {principal.trajectory.map((entry, i) => (
              <RevealItem key={entry.title} distance={16}>
                <div className="grid gap-2 border-t border-ink/12 py-6 lg:grid-cols-12 lg:gap-10">
                  <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40 lg:col-span-1">{ordinal(i)}</span>
                  <h3 className="text-[1.0625rem] tracking-tight lg:col-span-4 lg:col-start-2">
                    {entry.title}
                  </h3>
                  <p className="max-w-2xl type-voice text-[0.9375rem] text-tone-muted lg:col-span-6 lg:col-start-7">
                    {entry.body}
                  </p>
                </div>
              </RevealItem>
            ))}
            <span className="block border-t border-ink/12" />
          </RevealGroup>

          <Reveal wide>
            <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40">{principal.languagesLabel}</span>
              {principal.languages.map((language) => (
                <span key={language} className="text-[1.0625rem] tracking-tight">
                  {language}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Definition. */}
      <Section tone="dark" grain className="relative overflow-hidden bg-petrol" aria-labelledby="definition-heading">
        <LitGround preset="hangar" still={0.5} dim={0.5} />
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{copy.definition.eyebrow}</Eyebrow>
          </Reveal>
          <h2 id="definition-heading" className="mt-8 max-w-3xl type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
            <LineReveal lines={plainLines(copy.definition.headlineLines)} />
          </h2>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <span className="type-voice text-[0.8125rem] text-ice">{copy.definition.areLabel}</span>
                <ul className="mt-7">
                  {copy.definition.are.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ivory/12 py-4 type-voice text-[0.9375rem] text-ivory/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="type-voice text-[0.8125rem] text-ivory/45">{copy.definition.areNotLabel}</span>
                <ul className="mt-7">
                  {copy.definition.areNot.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ivory/12 py-4 type-voice text-[0.9375rem] text-ivory/50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Who we work with. */}
      <Section tone="light" className="bg-ivory">
        <Container className="py-24 lg:py-36">
          <ClientRecognition />
        </Container>
      </Section>

      {/* Commitments. */}
      <Section tone="light" className="bg-ivory" aria-labelledby="commitments-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>{copy.commitments.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="commitments-heading" className="mt-8 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
                <LineReveal lines={plainLines(copy.commitments.headlineLines)} />
              </h2>
            </div>
            <RevealGroup className="lg:col-span-7 lg:col-start-6">
              {copy.commitments.items.map((item, i) => (
                <RevealItem key={item.title}>
                  <div className="border-t border-ink/12 py-8">
                    <span className="type-voice text-[0.8125rem] tabular-nums text-ink/40">{ordinal(i)}</span>
                    <h3 className="mt-4 type-structure text-[calc(clamp(1.4rem,2.4vw,1.9rem)*var(--ar-struct))]">{item.title}</h3>
                    <p className="mt-4 max-w-xl type-voice text-[0.9375rem] text-tone-muted">
                      {item.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
              <span className="block border-t border-ink/12" />
            </RevealGroup>
          </div>
        </Container>
      </Section>

      {/* How an engagement runs — moved here from the homepage, where it was
          redundant with the private-client sequence. */}
      <Section tone="light" className="bg-ivory" aria-labelledby="engagement-heading">
        <Container className="py-24 lg:py-36">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal>
                <Eyebrow>{copy.engagement.eyebrow}</Eyebrow>
              </Reveal>
              <h2 id="engagement-heading" className="mt-8 type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
                <LineReveal lines={plainLines([copy.engagement.headline])} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.engagement.note}
              </p>
            </Reveal>
          </div>
          <ProcessSteps steps={copy.engagement.steps} className="mt-20 lg:mt-28" />
        </Container>
      </Section>

      {/* Reserved — factual content the business must supply. */}
      <Section tone="light" className="bg-ivory" aria-labelledby="reserved-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>{copy.reserved.eyebrow}</Eyebrow>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="reserved-heading" className="max-w-2xl type-structure text-[calc(clamp(1.9rem,4vw,3.1rem)*var(--ar-struct))]">
              <LineReveal lines={plainLines([copy.reserved.headline])} />
            </h2>
            <Reveal delay={0.12}>
              <p className="max-w-sm type-voice text-[0.9375rem] text-tone-muted">
                {copy.reserved.note}
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {[...principal.outstanding, ...copy.reserved.items].map((item) => (
              <RevealItem key={item.title}>
                <PlaceholderBlock title={item.title} description={item.description} />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal wide>
            <p className="mt-16 max-w-3xl border-t border-ink/12 pt-8 type-voice text-[0.8125rem] text-tone-muted">
              {content.legal.notice}
            </p>
          </Reveal>
        </Container>
      </Section>

      <ConsultCta
        lines={copy.cta.lines}
        body={copy.cta.body}
        ctaLabel={copy.cta.label}
      />
    </>
  );
}

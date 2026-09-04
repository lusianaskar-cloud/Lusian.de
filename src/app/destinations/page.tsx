import type { Metadata } from "next";
import { markets } from "@/lib/content/markets";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { GulfConstellation } from "@/components/gulf/GulfConstellation";
import { ordinal } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "The six Gulf markets we advise across — the United Arab Emirates, Saudi Arabia, Qatar, Bahrain, Oman and Kuwait — described by business and lifestyle character.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        className="bg-ivory"
        titleLines={[
          <span key="1">Six markets,</span>,
          <span key="2">
            six different <em className="font-normal text-brass">lives</em>.
          </span>,
        ]}
        standfirst="The Gulf is not one place, and choosing between its markets is the first decision of any move. What follows is character — how each country actually reads to someone living and working there."
        meta="Character and positioning only — no statements about rules that change"
      />

      <Section tone="dark" grain className="bg-ink" aria-labelledby="plot-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>The region, plotted</Eyebrow>
          </Reveal>
          <h2 id="plot-heading" className="mt-8 max-w-2xl font-display text-title">
            <LineReveal lines={[<span key="1">Select a market.</span>]} />
          </h2>
          <div className="mt-16 lg:mt-24">
            <GulfConstellation variant="full" />
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-ivory" aria-labelledby="markets-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>Market by market</Eyebrow>
          </Reveal>
          <h2 id="markets-heading" className="sr-only">
            The six Gulf markets in detail
          </h2>

          <div className="mt-16 lg:mt-20">
            {markets.map((market, i) => (
              <Reveal key={market.id} wide>
                <article className="relative grid gap-8 border-t border-ink/12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-2 right-0 font-display text-[7rem] leading-none text-ink/[0.045] lg:text-[10rem]"
                  >
                    {ordinal(i)}
                  </span>

                  <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
                    <span className="label-mono text-ink/35">
                      {market.code} · {market.hub}
                    </span>
                    <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tight">
                      {market.name}
                    </h3>
                    <p className="mt-5 max-w-md font-display text-subhead italic leading-snug text-brass">
                      {market.line}
                    </p>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7">
                    <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-tone-muted lg:text-base">
                      {market.body}
                    </p>

                    <ul className="mt-9 space-y-3">
                      {market.character.map((item) => (
                        <li
                          key={item}
                          className="flex gap-4 border-t border-ink/12 pt-3 text-[0.875rem] leading-relaxed"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.55em] block size-1 shrink-0 rounded-full bg-brass"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="label-mono text-ink/35">Principal locations</span>
                        <p className="mt-2 max-w-sm text-[0.875rem] text-tone-muted">
                          {market.cities.join(" · ")}
                        </p>
                      </div>
                      <p className="max-w-[16rem] font-display text-[1.0625rem] italic leading-snug text-tone-muted sm:text-right">
                        {market.suits}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
            <span className="block border-t border-ink/12" />
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-dune">
        <Container className="py-20 lg:py-28">
          <RevealGroup className="grid gap-10 lg:grid-cols-3">
            <RevealItem>
              <h2 className="font-display text-heading leading-tight">
                What this page deliberately omits
              </h2>
            </RevealItem>
            <RevealItem className="lg:col-span-2">
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-tone-muted">
                Nothing above describes visa categories, residency criteria, ownership
                rules, tax treatment or minimum thresholds. Those change, they differ by
                circumstance, and they are matters for licensed professionals in each
                jurisdiction. We identify what applies to your situation during an
                engagement and coordinate the advisors who are qualified to act on it.
              </p>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      <ConsultCta
        eyebrow="Market orientation"
        lines={["Choose the", "right market."]}
        body="Most clients arrive with two or three in mind. A first conversation is usually enough to narrow it, and to say what a proper look would involve."
        ctaLabel="Plan your move"
      />
    </>
  );
}

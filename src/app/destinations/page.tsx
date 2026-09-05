import type { Metadata } from "next";
import { markets } from "@/lib/content/markets";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { MarketExplorer } from "@/components/gulf/MarketExplorer";

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
          <span key="2">six different lives.</span>,
        ]}
        standfirst="The Gulf is not one place, and choosing between its markets is the first decision of any move. What follows is character — how each country actually reads to someone living and working there."
        meta="Character and positioning only — no statements about rules that change"
      />

      <Section tone="dark" grain className="bg-ink" aria-labelledby="explorer-heading">
        <Container className="py-20 lg:py-32">
          <div className="flex flex-col gap-6 pb-12 lg:flex-row lg:items-end lg:justify-between lg:pb-16">
            <div>
              <Reveal>
                <Eyebrow>The region, plotted</Eyebrow>
              </Reveal>
              <h2 id="explorer-heading" className="mt-8 font-display text-title">
                <LineReveal lines={[<span key="1">Select a market.</span>]} />
              </h2>
            </div>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                Positions are plotted from each market&apos;s principal hub. One market
                at a time, so the differences are actually visible.
              </p>
            </Reveal>
          </div>

          <MarketExplorer />
        </Container>
      </Section>

      {/* Deliberate omissions — the reason this page will not age badly. */}
      <Section tone="light" className="bg-dune">
        <Container className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="font-display text-heading leading-tight">
                What this page deliberately omits
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-tone-muted">
                Nothing above describes visa categories, residency criteria, ownership
                rules, tax treatment or minimum thresholds. Those change, they differ by
                circumstance, and they are matters for licensed professionals in each
                jurisdiction. We identify what applies to your situation during an
                engagement and coordinate the advisors qualified to act on it.
              </p>
              <p className="mt-6 max-w-2xl text-[0.8125rem] leading-relaxed text-tone-muted">
                Markets covered: {markets.map((m) => m.name).join(", ")}.
              </p>
            </Reveal>
          </div>
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

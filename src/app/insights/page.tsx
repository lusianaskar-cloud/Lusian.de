import type { Metadata } from "next";
import { insights } from "@/lib/content/insights";
import { Section, Container } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { InsightsIndex } from "@/components/insights/InsightsIndex";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes on aviation operations, Gulf markets, mobility and private establishment. The editorial section is in preparation; entries currently shown are demonstrations.",
  alternates: { canonical: "/insights" },
  robots: { index: false, follow: true },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        className="bg-ivory"
        titleLines={[
          <span key="1">Written from</span>,
          <span key="2">
            the work.
          </span>,
        ]}
        standfirst="Short pieces on aviation operations, Gulf markets and the practical business of moving a life or a company across borders. Published only when there is something to say."
      />

      <Section tone="light" className="bg-ivory">
        <Container className="pb-24 lg:pb-36">
          {/* Honest framing — nothing below is published research. */}
          <Reveal eager>
            <div className="mb-14 flex flex-col gap-4 border border-brass/35 bg-brass/[0.06] p-6 sm:flex-row sm:items-center sm:gap-8 lg:mb-20 lg:p-8">
              <span className="label-mono shrink-0 text-brass">Section in preparation</span>
              <p className="text-[0.875rem] leading-relaxed text-tone-muted">
                Every entry below is a demonstration placeholder used to review layout
                and typography. None is published research, none is sourced, and none
                should be read as the firm&apos;s position.
              </p>
            </div>
          </Reveal>

          <InsightsIndex insights={insights} />
        </Container>
      </Section>

      <ConsultCta
        eyebrow="Enquiries"
        lines={["Rather ask", "directly?"]}
        body="Most useful answers are specific to a situation, and are better given in a conversation than published."
        ctaLabel="Begin a conversation"
      />
    </>
  );
}

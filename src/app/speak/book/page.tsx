import type { Metadata } from "next";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TextLink } from "@/components/primitives/ActionLink";
import { BookingFlow } from "@/components/speak/booking/BookingFlow";
import { legalNotice } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Choose a practice, a conversation and a time in your own timezone. Thirty or sixty minutes, confidential, and without obligation.",
  alternates: { canonical: "/speak/book" },
};

export default function BookPage() {
  return (
    <>
      <Section tone="light" className="bg-ivory">
        <Container className="pb-14 pt-36 lg:pb-20 lg:pt-44">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Reveal eager>
                <Eyebrow>Book a consultation</Eyebrow>
              </Reveal>
              <h1 className="mt-9 max-w-[15ch] font-display text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.04] tracking-[-0.028em] lg:mt-12">
                <LineReveal
                  immediate
                  delay={0.15}
                  lines={[<span key="1">Take thirty minutes.</span>]}
                />
              </h1>
            </div>
            <Reveal eager delay={0.26}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                A first conversation costs nothing and commits you to nothing. Times
                are shown in your own timezone.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-paper">
        <Container className="pb-24 pt-14 lg:pb-36 lg:pt-16">
          <BookingFlow />
          <div className="mt-20 flex flex-col gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-tone-muted">
              {legalNotice}
            </p>
            <TextLink href="/speak/ask" transitionLabel="Ask a question">
              Ask instead
            </TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

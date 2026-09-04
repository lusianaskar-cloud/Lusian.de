import type { Metadata } from "next";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ConsultCta } from "@/components/shared/ConsultCta";
import { PlaceholderBlock } from "@/components/shared/PlaceholderBlock";
import { legalNotice } from "@/lib/content/site";
import { ordinal } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lusian is an advisory and coordination practice with two disciplines — aviation, and private establishment in the Gulf — and one way of working.",
  alternates: { canonical: "/about" },
};

/**
 * NOTE — this page states only what is structurally true of the offer.
 * It invents no history, headcount, offices, credentials or track record.
 * Factual sections are reserved as PlaceholderBlocks; see docs/CONTENT-TODO.md.
 */
const weAre = [
  "An advisory and coordination practice, engaged directly by principals.",
  "Accountable for the sequence of a piece of work, not only its recommendation.",
  "Comfortable operating between disciplines, jurisdictions and time zones.",
  "Selective — a small number of concurrent engagements, by design.",
];

const weAreNot = [
  "A law firm, tax practice, immigration agency, licensed financial adviser or brokerage.",
  "A referral network paid by the schools, banks, agents or providers we introduce.",
  "A volume business, and not built to become one.",
  "In the business of publishing our clients.",
];

const commitments = [
  {
    title: "We say no",
    body: "If we are not the right party for a piece of work, we say so early — and, where we can, name who is.",
  },
  {
    title: "We write it down",
    body: "Scope, sequence, responsibilities and what a good outcome looks like are agreed in writing before work begins.",
  },
  {
    title: "We do not publish you",
    body: "No client names, no case studies, no logo walls. Confidence is easier to keep than to rebuild.",
  },
  {
    title: "We use qualified people",
    body: "Regulated matters go to professionals licensed to handle them in the jurisdiction concerned. We coordinate; they advise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The firm"
        className="bg-ivory"
        titleLines={[
          <span key="1">Built narrow,</span>,
          <span key="2">
            on <em className="font-normal text-brass">purpose</em>.
          </span>,
        ]}
        standfirst="Lusian is an advisory practice with two disciplines and one way of working. It is deliberately small, and it is intended to stay that way."
        meta="Aviation Advisory · Gulf Private Advisory"
      />

      <Section tone="dark" grain className="bg-ink" aria-labelledby="definition-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>Definition</Eyebrow>
          </Reveal>
          <h2 id="definition-heading" className="mt-8 max-w-3xl font-display text-title">
            <LineReveal
              lines={[
                <span key="1">The clearest thing we can</span>,
                <span key="2">
                  say is what we are <em className="font-normal text-champagne">not</em>.
                </span>,
              ]}
            />
          </h2>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <span className="label-mono text-champagne">What we are</span>
                <ul className="mt-7">
                  {weAre.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ivory/12 py-4 text-[0.9375rem] leading-relaxed text-ivory/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="label-mono text-ivory/40">What we are not</span>
                <ul className="mt-7">
                  {weAreNot.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ivory/12 py-4 text-[0.9375rem] leading-relaxed text-ivory/45"
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

      <Section tone="light" className="bg-ivory" aria-labelledby="commitments-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Operating commitments</Eyebrow>
              </Reveal>
              <h2 id="commitments-heading" className="mt-8 font-display text-title">
                <LineReveal
                  lines={[
                    <span key="1">Four rules</span>,
                    <span key="2">
                      we hold <em className="font-normal text-brass">ourselves</em> to.
                    </span>,
                  ]}
                />
              </h2>
            </div>
            <RevealGroup className="lg:col-span-7 lg:col-start-6">
              {commitments.map((item, i) => (
                <RevealItem key={item.title}>
                  <div className="border-t border-ink/12 py-8">
                    <span className="label-mono text-ink/35">{ordinal(i)}</span>
                    <h3 className="mt-4 font-display text-heading leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-tone-muted">
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

      {/* ------------------------------------------------------------------
          RESERVED — factual content the business must supply before launch.
          Delete each PlaceholderBlock as its real content is written.
          ------------------------------------------------------------------ */}
      <Section tone="light" className="bg-paper" aria-labelledby="reserved-heading">
        <Container className="py-24 lg:py-36">
          <Reveal>
            <Eyebrow>Firm information</Eyebrow>
          </Reveal>
          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="reserved-heading" className="max-w-2xl font-display text-title">
              <LineReveal lines={[<span key="1">Reserved for the record.</span>]} />
            </h2>
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
                These sections are held open deliberately. Nothing about the firm&apos;s
                history, people or credentials has been written in their place.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            <RevealItem>
              <PlaceholderBlock
                title="Founding and background"
                description="When the practice was established, the professional background it came out of, and why these two disciplines sit together."
              />
            </RevealItem>
            <RevealItem>
              <PlaceholderBlock
                title="Leadership"
                description="Named principal or principals, with genuine career history. Portraits and biographies to be supplied."
              />
            </RevealItem>
            <RevealItem>
              <PlaceholderBlock
                title="Credentials and memberships"
                description="Qualifications, industry memberships and any regulatory registrations that can be evidenced."
              />
            </RevealItem>
            <RevealItem>
              <PlaceholderBlock
                title="Registered company details"
                description="Legal entity name, company registration number, VAT identification and registered address. Also required on the legal notice."
              />
            </RevealItem>
            <RevealItem>
              <PlaceholderBlock
                title="Languages and coverage"
                description="Working languages, and the markets in which the practice can act directly rather than through partners."
              />
            </RevealItem>
            <RevealItem>
              <PlaceholderBlock
                title="Professional network"
                description="How third-party specialists are selected and reviewed — stated in general terms, without naming firms."
              />
            </RevealItem>
          </RevealGroup>

          <Reveal wide>
            <p className="mt-16 max-w-3xl border-t border-ink/12 pt-8 text-[0.8125rem] leading-relaxed text-tone-muted">
              {legalNotice}
            </p>
          </Reveal>
        </Container>
      </Section>

      <ConsultCta
        lines={["A short", "conversation."]}
        body="If your situation is unusual, that is usually a good sign that it is worth a call rather than a form."
        ctaLabel="Begin a conversation"
      />
    </>
  );
}

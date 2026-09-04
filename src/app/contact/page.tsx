import type { Metadata } from "next";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { contactChannels, legalNotice } from "@/lib/content/site";
import { Mark } from "@/components/chrome/Mark";

export const metadata: Metadata = {
  title: "Request a Private Consultation",
  description:
    "A short, confidential first conversation — aviation advisory, private Gulf establishment, or something else. Enquiries are read by a principal.",
  alternates: { canonical: "/contact" },
};

const assurances = [
  {
    title: "Read by a principal",
    body: "Enquiries are not triaged by an assistant or an inbox rule.",
  },
  {
    title: "Held, not circulated",
    body: "What you write stays with us unless you ask us to share it.",
  },
  {
    title: "No obligation",
    body: "A first conversation costs nothing and commits you to nothing.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section tone="dark" grain className="overflow-hidden bg-ink">
        <Mark
          className="pointer-events-none absolute -left-[18%] top-[8%] h-[34rem] w-[34rem] text-ivory/[0.04]"
        />

        <Container className="relative grid gap-16 pb-24 pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-44">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Private consultation</Eyebrow>
            </Reveal>

            <h1 className="mt-10 font-display text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1.03] tracking-[-0.028em] lg:mt-14">
              <LineReveal
                immediate
                delay={0.2}
                stagger={0.1}
                lines={[
                  <span key="1">Begin a</span>,
                  <span key="2">
                    <em className="font-normal text-champagne">conversation</em>.
                  </span>,
                ]}
              />
            </h1>

            <Reveal eager delay={0.34}>
              <p className="mt-9 max-w-md text-lead text-tone-muted">
                Tell us what you are trying to achieve and roughly when. If we are not
                the right party, we will say so — and, where we can, tell you who is.
              </p>
            </Reveal>

            <Reveal eager delay={0.42}>
              <ul className="mt-14 border-t border-ivory/12">
                {assurances.map((item) => (
                  <li key={item.title} className="border-b border-ivory/12 py-5">
                    <h2 className="text-[0.9375rem] tracking-tight">{item.title}</h2>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-tone-muted">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal eager delay={0.5}>
              <div className="mt-12 space-y-2">
                <a
                  href={`mailto:${contactChannels.email}`}
                  className="block text-lg tracking-tight underline-offset-8 transition-colors duration-500 hover:text-champagne hover:underline"
                >
                  {contactChannels.email}
                </a>
                {/* TODO(client): replace with the real line, or delete. */}
                <p className="label-mono text-ivory/35">{contactChannels.phone}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal eager delay={0.2}>
              <ConsultationForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="light" className="bg-ivory">
        <Container className="py-16 lg:py-20">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-tone-muted">
            {legalNotice}
          </p>
        </Container>
      </Section>
    </>
  );
}

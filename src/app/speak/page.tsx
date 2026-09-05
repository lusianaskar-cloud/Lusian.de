import type { Metadata } from "next";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { TransitionLink } from "@/components/primitives/TransitionLink";
import { TextLink } from "@/components/primitives/ActionLink";
import { Arrow } from "@/components/primitives/Arrow";
import { Mark } from "@/components/chrome/Mark";
import { speakIntents, boundaries } from "@/lib/content/speak";
import { contactChannels, legalNotice } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Speak with Lusian",
  description:
    "Ask a question or book a conversation — aviation advisory, or private establishment in the Gulf. Confidential, and without obligation.",
  alternates: { canonical: "/speak" },
};

export default function SpeakPage() {
  return (
    <>
      <Section tone="dark" grain className="overflow-hidden bg-ink">
        <Mark className="pointer-events-none absolute -left-[16%] top-[6%] h-[30rem] w-[30rem] text-ivory/[0.04]" />
        <Container className="relative pb-20 pt-36 lg:pb-28 lg:pt-44">
          <Reveal eager>
            <Eyebrow>Speak with Lusian</Eyebrow>
          </Reveal>
          <h1 className="mt-10 max-w-[13ch] font-display text-[clamp(2.4rem,6.4vw,5.5rem)] leading-[1.03] tracking-[-0.03em] lg:mt-14">
            <LineReveal
              immediate
              delay={0.15}
              stagger={0.1}
              lines={[
                <span key="1">Two ways to</span>,
                <span key="2">start, both quiet.</span>,
              ]}
            />
          </h1>
          <Reveal eager delay={0.3}>
            <p className="mt-9 max-w-xl text-lead text-tone-muted">
              Nothing you write here is circulated, and a first conversation commits
              you to nothing. If we are not the right party, we will say so.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Two intentions. Asymmetric on purpose — these are not equivalent choices. */}
      <Section tone="light" className="bg-ivory">
        <Container className="py-8 lg:py-12">
          {speakIntents.map((intent, i) => (
            <Reveal key={intent.href} wide>
              <TransitionLink
                href={intent.href}
                transitionLabel={intent.title.replace(".", "")}
                className={cn(
                  "group grid gap-6 border-t border-ink/12 py-16 transition-colors duration-700 hover:bg-paper lg:grid-cols-12 lg:gap-10 lg:py-24",
                  i === 1 && "lg:text-right",
                )}
              >
                <span
                  className={cn(
                    "label-mono text-ink/40",
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
                  <h2 className="font-display text-[clamp(2.2rem,6.6vw,5rem)] leading-[1.02] tracking-[-0.03em]">
                    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_1px]">
                      {intent.title}
                    </span>
                  </h2>
                  <p
                    className={cn(
                      "mt-7 max-w-md text-lead text-tone-muted",
                      i === 1 && "lg:ml-auto",
                    )}
                  >
                    {intent.body}
                  </p>
                  <span
                    className={cn(
                      "mt-9 inline-flex items-center gap-3 label-mono",
                      i === 1 && "lg:flex-row-reverse",
                    )}
                  >
                    {intent.cta}
                    <Arrow
                      className={cn(
                        "transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === 1
                          ? "rotate-180 group-hover:-translate-x-2"
                          : "group-hover:translate-x-2",
                      )}
                    />
                  </span>
                </div>
              </TransitionLink>
            </Reveal>
          ))}

          <Reveal wide>
            <div className="flex flex-col gap-6 border-t border-ink/12 py-10 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                Some of it may already be answered.
              </p>
              <TextLink href="/speak/questions" transitionLabel="Common questions">
                Common questions
              </TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* What we coordinate, and what licensed professionals provide. */}
      <Section tone="light" className="bg-paper" aria-labelledby="boundaries-heading">
        <Container className="py-24 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Where the line sits</Eyebrow>
              </Reveal>
              <h2 id="boundaries-heading" className="mt-8 font-display text-title">
                <LineReveal
                  lines={[
                    <span key="1">What we coordinate,</span>,
                    <span key="2">and what we do not.</span>,
                  ]}
                />
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-8 max-w-md text-[0.9375rem] leading-relaxed text-tone-muted">
                  {boundaries.note}
                </p>
              </Reveal>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <h3 className="label-mono text-brass">Lusian coordinates</h3>
                <ul className="mt-6">
                  {boundaries.coordinated.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ink/12 py-3 text-[0.875rem] leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.08}>
                <h3 className="label-mono text-ink/45">Licensed professionals provide</h3>
                <ul className="mt-6">
                  {boundaries.regulated.map((item) => (
                    <li
                      key={item}
                      className="border-t border-ink/12 py-3 text-[0.875rem] leading-relaxed text-tone-muted"
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
                  className="text-lg tracking-tight underline-offset-8 transition-colors duration-500 hover:text-brass hover:underline"
                >
                  {contactChannels.email}
                </a>
                {/* TODO(client): real line, or delete. */}
                <p className="mt-2 label-mono text-ink/40">{contactChannels.phone}</p>
              </div>
              <p className="max-w-lg text-[0.8125rem] leading-relaxed text-tone-muted">
                {legalNotice}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

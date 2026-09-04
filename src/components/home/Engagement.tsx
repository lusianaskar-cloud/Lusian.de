"use client";

import { engagementSteps } from "@/lib/content/site";
import { Section, Container } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LineReveal, Reveal } from "@/components/primitives/Reveal";
import { ProcessSteps } from "@/components/shared/ProcessSteps";

export function Engagement() {
  return (
    <Section tone="light" className="bg-dune" aria-labelledby="engagement-heading">
      <Container className="py-28 lg:py-40">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>How an engagement runs</Eyebrow>
            </Reveal>
            <h2 id="engagement-heading" className="mt-8 font-display text-title">
              <LineReveal
                lines={[
                  <span key="1">Four stages.</span>,
                  <span key="2">
                    No <em className="font-normal text-brass">handover</em>.
                  </span>,
                ]}
              />
            </h2>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-tone-muted">
              The same sequence governs an airport programme and a family&apos;s move.
              Only the specialists change.
            </p>
          </Reveal>
        </div>

        <ProcessSteps steps={engagementSteps} className="mt-20 lg:mt-28" />
      </Container>
    </Section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/primitives/Reveal";
import { ordinal } from "@/lib/utils";

type Step = { title: string; body: string };

/**
 * The private-client journey, run down a rail that fills as the section is
 * read. Each stage lights its marker as the fill reaches it, so the sequence
 * is felt rather than numbered.
 */
export function JourneyRail({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "end 0.62"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* Rail */}
      <div
        aria-hidden
        className="absolute bottom-0 left-[7px] top-0 w-px bg-current/12 sm:left-[9px]"
      >
        <motion.span
          className="block h-full w-full origin-top bg-[color:var(--tone-accent)]"
          style={{ scaleY: reduced ? 1 : scaleY }}
        />
      </div>

      <ol className="space-y-14 lg:space-y-20">
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-10 sm:pl-14">
            <span
              aria-hidden
              className="absolute left-0 top-[0.55em] block size-[15px] rounded-full border border-current/25 bg-[color:var(--tone-bg)] sm:size-[19px]"
            >
              <span className="absolute inset-[4px] rounded-full bg-[color:var(--tone-accent)] opacity-90" />
            </span>

            <Reveal wide delay={0.04}>
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <span className="label-mono text-tone-muted">{ordinal(i)}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-tight tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-tone-muted lg:col-span-6 lg:col-start-7 lg:self-center lg:text-base">
                  {step.body}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

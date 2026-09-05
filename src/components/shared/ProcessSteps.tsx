"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RevealGroup, RevealItem } from "@/components/primitives/Reveal";
import { cn, ordinal } from "@/lib/utils";

type Step = { title: string; body: string };

/**
 * A process laid on a rule that fills as the section is read. Shared by the
 * firm-level engagement sequence and the private-client journey.
 */
export function ProcessSteps({
  steps,
  className,
  columns,
}: {
  steps: readonly Step[];
  className?: string;
  columns?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={className}>
      <div className="relative h-px w-full bg-current/12">
        <motion.span
          aria-hidden
          className="absolute inset-y-0 start-0 block bg-[color:var(--tone-accent)]"
          style={{ width: reduced ? "100%" : width }}
        />
      </div>

      <RevealGroup
        stagger={0.09}
        className={cn(
          "grid gap-x-8 gap-y-12 pt-8",
          columns ?? "sm:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {steps.map((step, i) => (
          <RevealItem key={step.title} className="relative">
            <span
              aria-hidden
              className="absolute -top-8 start-0 block size-1.5 -translate-y-1/2 rounded-full bg-[color:var(--tone-accent)]"
            />
            <span className="type-voice text-[0.8125rem] tabular-nums text-tone-muted">
              {ordinal(i)}
            </span>
            <h3 className="type-structure mt-4 text-[calc(clamp(1.35rem,1.9vw,1.75rem)*var(--ar-struct))]">
              {step.title}
            </h3>
            <p className="type-voice mt-4 text-[0.875rem] text-tone-muted">{step.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Section, Container } from "@/components/primitives/Section";
import { LineReveal } from "@/components/primitives/Reveal";
import { useIntroReady } from "@/components/chrome/intro";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Interior page opening. Same reveal language as the homepage hero at a
 * calmer scale — the page is not the front door, so it does not shout.
 */
export function PageHero({
  eyebrow,
  titleLines,
  standfirst,
  meta,
  tone = "light",
  className,
  visual,
  children,
}: {
  eyebrow: string;
  titleLines: ReactNode[];
  standfirst?: string;
  meta?: string;
  tone?: "light" | "dark";
  className?: string;
  visual?: ReactNode;
  children?: ReactNode;
}) {
  const ready = useIntroReady();

  return (
    <Section
      tone={tone}
      grain={tone === "dark"}
      className={cn("relative overflow-hidden", className)}
      aria-labelledby="page-title"
    >
      {visual}

      <Container className="relative flex min-h-[74lvh] flex-col justify-end pb-16 pt-36 lg:min-h-[80lvh] lg:pb-24 lg:pt-44">
        <LineReveal
          immediate
          play={ready}
          delay={0.1}
          lines={[
            <span key="e" className="inline-flex items-center gap-3">
              <span aria-hidden className="inline-block h-px w-8 bg-current opacity-50" />
              {eyebrow}
            </span>,
          ]}
          className="label-mono text-tone-muted"
        />

        <h1
          id="page-title"
          className="mt-10 max-w-[16ch] font-display text-[clamp(2.4rem,7vw,6rem)] leading-[1.02] tracking-[-0.028em] lg:mt-14"
        >
          <LineReveal immediate play={ready} delay={0.26} stagger={0.1} lines={titleLines} />
        </h1>

        {standfirst ? (
          <motion.p
            className="mt-9 max-w-xl text-lead text-tone-muted lg:mt-12"
            initial={{ y: 20 }}
            animate={ready ? { y: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE.expo, delay: 0.6 }}
          >
            {standfirst}
          </motion.p>
        ) : null}

        {children}

        {meta ? (
          <motion.p
            className="mt-14 label-mono text-tone-muted lg:mt-20"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 1.2, ease: EASE.expo, delay: 0.85 }}
          >
            {meta}
          </motion.p>
        ) : null}
      </Container>
    </Section>
  );
}

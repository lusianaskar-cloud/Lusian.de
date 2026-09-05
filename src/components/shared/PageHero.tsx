"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Section, Container } from "@/components/primitives/Section";
import { LineReveal } from "@/components/primitives/Reveal";
import { LitGround } from "@/components/light/LitGround";
import { useIntroReady } from "@/components/chrome/intro";
import { type PresetName } from "@/components/light/model";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The opening of an interior page.
 *
 * Every page now arrives in a lit space rather than on a flat rectangle, and
 * declares which space that is. The conditions are the homepage's — a page is
 * not a different site — but each division gets the one that belongs to it, so
 * the aviation practice opens on a hangar floor and the private practice on a
 * quiet stone room. Neutral pages open on the plastered wall the homepage
 * opens on.
 *
 * The title is the page's one STATEMENT. Everything below it is VOICE. There
 * is no monospace eyebrow and no tick hairline: the page announces itself by
 * being lit and by the size of its sentence.
 */
export function PageHero({
  eyebrow,
  titleLines,
  standfirst,
  meta,
  tone = "light",
  condition,
  voice,
  still = 0.42,
  dim,
  className,
  visual,
  children,
}: {
  eyebrow: string;
  titleLines: ReactNode[];
  standfirst?: string;
  meta?: string;
  tone?: "light" | "dark";
  /** The lighting condition this page opens in. */
  condition?: PresetName;
  /** The division voice its structural type inherits. */
  voice?: "cool" | "warm";
  /** Where the source sits; the hero does not scrub, so it is stated. */
  still?: number;
  /** Held back where the title would otherwise be read against the source. */
  dim?: number;
  className?: string;
  visual?: ReactNode;
  children?: ReactNode;
}) {
  const ready = useIntroReady();

  return (
    <Section
      tone={tone}
      className={cn(
        "relative overflow-hidden",
        voice === "cool" && "voice-cool",
        voice === "warm" && "voice-warm",
        className,
      )}
      aria-labelledby="page-title"
    >
      {condition ? <LitGround preset={condition} still={still} dim={dim} /> : null}
      {visual}

      <Container className="relative flex min-h-[74lvh] flex-col justify-end pb-16 pt-36 lg:min-h-[80lvh] lg:pb-24 lg:pt-44">
        <LineReveal
          immediate
          play={ready}
          delay={0.1}
          lines={[<span key="e">{eyebrow}</span>]}
          className="type-voice text-[0.9375rem] text-tone-muted"
        />

        <h1
          id="page-title"
          className="type-statement mt-9 max-w-[16ch] text-[calc(clamp(2.4rem,7vw,6rem)*var(--ar-state))] [&:lang(ar)]:max-w-[21ch] lg:mt-12"
        >
          <LineReveal immediate play={ready} delay={0.26} stagger={0.1} lines={titleLines} />
        </h1>

        {standfirst ? (
          <motion.p
            className="type-voice mt-9 max-w-xl text-[clamp(1rem,1.25vw,1.15rem)] text-tone-muted lg:mt-12"
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
            className="type-voice mt-14 text-[0.875rem] text-tone-muted lg:mt-20"
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

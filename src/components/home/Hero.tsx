"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { heroResolve, heroStandfirst, site } from "@/lib/content/site";
import { LineReveal } from "@/components/primitives/Reveal";
import { useIntroReady } from "@/components/chrome/intro";
import { EASE } from "@/lib/motion";
import { HairlineGrid } from "./HairlineGrid";

/**
 * SIGNATURE MOMENT — the horizon.
 *
 * The hero is split by a horizon line at 38% from the foot of the viewport.
 * The headline is rendered twice at identical coordinates: once dark on ivory,
 * once ivory inside the ink plate. The plate rises as the page scrolls, so the
 * statement inverts through the horizon rather than fading — the brand mark,
 * drawn at page scale, and the handover into the dark sections below.
 */
function HeroBody({ inverted = false }: { inverted?: boolean }) {
  const ready = useIntroReady();

  return (
    <div className="absolute inset-x-0 bottom-0 h-[100lvh]">
      <HairlineGrid />

      <div className="container-editorial relative flex h-full flex-col pb-9 pt-28 sm:pb-11 sm:pt-32 lg:pt-40">
        <LineReveal
          immediate
          play={ready}
          delay={0.15}
          lines={[<span key="e">{site.descriptorShort}</span>]}
          className="label-mono text-current/60"
        />

        <div className="flex-1" />

        <h1 className="font-display text-[clamp(2.35rem,8.6vw,5.75rem)] leading-[1.04] tracking-[-0.028em]">
          <LineReveal
            immediate
            play={ready}
            delay={0.32}
            stagger={0.11}
            lines={[
              <span key="l1">Some moves are operational.</span>,
              <span key="l2">
                Some are entirely <em className="font-normal">personal</em>.
              </span>,
            ]}
          />
        </h1>

        <motion.p
          className="mt-7 font-display text-[clamp(1.15rem,2.1vw,1.7rem)] italic leading-snug text-current/75 sm:mt-9"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE.expo, delay: 0.72 }}
        >
          {heroResolve}
        </motion.p>

        <motion.p
          className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-current/65 sm:mt-8 sm:text-base"
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.1, ease: EASE.expo, delay: 0.86 }}
        >
          {heroStandfirst}
        </motion.p>

        <motion.div
          className="mt-10 flex items-end justify-between gap-6 sm:mt-14"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE.expo, delay: 1.05 }}
        >
          <span className="label-mono flex items-center gap-3 text-current/60">
            <span aria-hidden className="relative block h-8 w-px overflow-hidden bg-current/25">
              <span
                className={
                  inverted
                    ? "absolute inset-x-0 top-0 block h-3 bg-champagne motion-safe:animate-[scrollcue_2.6s_cubic-bezier(0.65,0,0.35,1)_infinite]"
                    : "absolute inset-x-0 top-0 block h-3 bg-brass motion-safe:animate-[scrollcue_2.6s_cubic-bezier(0.65,0,0.35,1)_infinite]"
                }
              />
            </span>
            Scroll
          </span>
          <span className="label-mono hidden text-right text-current/60 sm:block">
            {site.positioning}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const plateHeight = useTransform(scrollYProgress, [0, 0.9], ["38%", "100%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      data-tone="light"
      className="tone-light relative h-[100lvh] min-h-[36rem] overflow-hidden bg-ivory"
      aria-label="Introduction"
    >
      {/* Warm cast in the upper field */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 -top-1/3 h-[85%] w-[70%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-champagne) 30%, transparent), transparent)",
        }}
      />

      {/* Base layer — dark on ivory */}
      <motion.div className="absolute inset-0" style={{ y: reduced ? 0 : contentY }}>
        <HeroBody />
      </motion.div>

      {/* Ink plate — rises through the statement */}
      <motion.div
        className="grain absolute inset-x-0 bottom-0 z-10 overflow-hidden bg-ink tone-dark"
        style={{ height: reduced ? "38%" : plateHeight }}
      >
        <span aria-hidden className="grain-layer" />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[100lvh]"
          style={{ y: reduced ? 0 : contentY }}
        >
          <HeroBody inverted />
        </motion.div>
      </motion.div>
    </section>
  );
}

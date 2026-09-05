"use client";

import type { ElementType, ReactNode } from "react";
import { motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { EASE, VIEWPORT, VIEWPORT_WIDE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. Kept small — this should read as settling. */
  distance?: number;
  as?: ElementType;
  wide?: boolean;
  /**
   * For content that is above the fold on load.
   *
   * Plays on mount rather than on scroll, and rises **without** fading —
   * an element that starts at `opacity: 0` is not counted as painted, so a
   * fade here would push Largest Contentful Paint out by the whole delay.
   */
  eager?: boolean;
};

/** Opacity + short rise. The workhorse reveal for body copy and blocks. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  as = "div",
  wide = false,
  eager = false,
}: RevealProps) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as "div"];

  if (eager) {
    return (
      <MotionTag
        className={className}
        initial={reduced ? { y: 0 } : { y: distance }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, ease: EASE.expo, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={wide ? VIEWPORT_WIDE : VIEWPORT}
      transition={{ duration: 1.05, ease: EASE.expo, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children of a container using the same reveal curve. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
}) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_WIDE}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  distance = 22,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: ElementType;
}) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration: 1.05, ease: EASE.expo } },
      }}
    >
      {children}
    </MotionTag>
  );
}

type LineRevealProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: ElementType;
  /** Play immediately rather than on scroll — used by the hero. */
  immediate?: boolean;
  play?: boolean;
};

/**
 * Mask-and-rise, line by line. The signature text reveal of the site:
 * each line sits inside an overflow clip and travels up from beneath it.
 */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  as = "div",
  immediate = false,
  play = true,
}: LineRevealProps) {
  const reduced = useSafeReducedMotion();
  const MotionTag = motion[as as "div"];

  const animateProps = immediate
    ? { animate: play ? "visible" : "hidden" }
    : { whileInView: "visible" as const, viewport: VIEWPORT };

  return (
    <MotionTag className={className} initial="hidden" {...animateProps}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: reduced ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 1 },
              visible: {
                y: "0%",
                transition: {
                  duration: 1.25,
                  ease: EASE.expo,
                  delay: reduced ? 0 : delay + i * stagger,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

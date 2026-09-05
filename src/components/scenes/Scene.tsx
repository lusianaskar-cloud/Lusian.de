"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useRange } from "@/lib/useRange";
import { cn } from "@/lib/utils";

/**
 * A pinned, scroll-scrubbed stage.
 *
 * ── Why sticky rather than a pinning library ────────────────────────────
 * The section is `length × 100svh` tall and its only child is
 * `sticky top-0 h-[100svh]`. The browser holds the child in place for
 * exactly `(length − 1) × 100svh` of scroll, and `useScroll` reports 0→1
 * across that same distance. No pin-spacer is injected, no element is
 * switched to `position: fixed`, and nothing has to be recalculated on
 * resize — which removes the whole class of pin jumps, Safari flicker and
 * refresh-inside-scene bugs that come with library pinning. Cleanup is
 * React unmount.
 *
 * ── Heights are CSS, not JavaScript ─────────────────────────────────────
 * Phone and desktop lengths are two custom properties resolved by a media
 * query, so the section height is correct on the very first paint. Reading
 * a breakpoint in JS would change the height after hydration and cost CLS.
 *
 * ── Reduced motion ──────────────────────────────────────────────────────
 * The scene un-pins: the section takes its natural height and every Beat
 * renders as an ordinary block in flow. Same DOM, same copy, no pinning,
 * no scrubbing.
 */
export type SceneRenderProps = {
  progress: MotionValue<number>;
  reduced: boolean;
};

export function Scene({
  children,
  className,
  stageClassName,
  tone = "dark",
  length = 2.4,
  mobileLength,
  id,
  label,
}: {
  children: (props: SceneRenderProps) => ReactNode;
  /** Applied to BOTH section and stage so a retracting URL bar reveals the same ground. */
  className?: string;
  stageClassName?: string;
  tone?: "light" | "dark";
  /** Multiples of the viewport. 2.4 → 140svh of pinned travel. */
  length?: number;
  mobileLength?: number;
  id?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      data-tone={tone}
      data-scene=""
      className={cn(
        "relative",
        tone === "dark" ? "tone-dark" : "tone-light",
        !reduced && "h-[calc(var(--scene-m)*100svh)] lg:h-[calc(var(--scene-d)*100svh)]",
        className,
      )}
      style={
        {
          "--scene-d": length,
          "--scene-m": mobileLength ?? Math.max(1.6, length * 0.7),
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          reduced
            ? "relative py-24"
            : "sticky top-0 h-[100lvh] overflow-hidden",
          className,
          stageClassName,
        )}
      >
        {children({ progress: scrollYProgress, reduced })}
      </div>
    </section>
  );
}

type Range = [number, number, number, number] | [number, number];

/** Scroll progress is 0–1; a transform offset outside that range is invalid. */
function clampRange(values: number[]) {
  const out: number[] = [];
  let previous = -Infinity;
  for (const value of values) {
    const clamped = Math.min(1, Math.max(0, value));
    // Strictly increasing, or useTransform cannot interpolate across it.
    const next = clamped > previous ? clamped : Math.min(1, previous + 0.0001);
    out.push(next);
    previous = next;
  }
  return out;
}

/**
 * One moment inside a scene.
 *
 * `range` is [enter, held, leaves, gone] in scene progress. A two-value range
 * holds to the end of the scene — expressed as a two-point transform rather
 * than by inventing exit keyframes past 1, which is not a legal offset.
 *
 * Animated beats stack absolutely on the stage; under reduced motion they
 * become ordinary blocks in normal flow.
 */
export function Beat({
  progress,
  reduced,
  range,
  children,
  className,
  rise = 28,
  fall,
  scaleFrom,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  range: Range;
  children: ReactNode;
  className?: string;
  /** px travelled on entry; the beat leaves by the same distance upward. */
  rise?: number;
  fall?: number;
  scaleFrom?: number;
}) {
  const holds = range.length === 2;
  const exit = fall ?? rise;

  const input = clampRange(holds ? [range[0], range[1]] : [...range]);
  const opacityOutput = holds ? [0, 1] : [0, 1, 1, 0];
  const yOutput = holds ? [rise, 0] : [rise, 0, 0, -exit];
  const scaleOutput = holds
    ? [scaleFrom ?? 1, 1]
    : [scaleFrom ?? 1, 1, 1, scaleFrom ? 1 : 1];

  // useRange, not the array form of useTransform — see src/lib/useRange.ts.
  const opacity = useRange(progress, input, opacityOutput);
  const y = useRange(progress, input, yOutput);
  const scale = useRange(progress, input, scaleOutput);

  if (reduced) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <motion.div
      style={{ opacity, y, ...(scaleFrom ? { scale } : {}) }}
      className={cn("absolute inset-0 will-change-[transform,opacity]", className)}
    >
      {children}
    </motion.div>
  );
}

/** Standard inset for stage content: clear of the fixed header, comfortable at the foot. */
export function StageFrame({
  children,
  className,
  align = "center",
}: {
  children: ReactNode;
  className?: string;
  align?: "center" | "end" | "start";
}) {
  return (
    <div
      className={cn(
        "container-editorial flex h-full flex-col pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[6.5rem] lg:pb-16 lg:pt-[8.5rem]",
        align === "center" && "justify-center",
        align === "end" && "justify-end",
        align === "start" && "justify-start",
        className,
      )}
    >
      {children}
    </div>
  );
}

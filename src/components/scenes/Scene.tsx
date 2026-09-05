"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
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

/**
 * A scene's shoulders.
 *
 * A pinned scene releases by scrolling away, so for exactly one viewport at
 * every boundary the screen is two stages divided by a horizontal line. If
 * the two sides differ in value or hue the line reads as a tear — which is
 * the one thing this whole art direction is trying not to look like.
 *
 * So a scene may close down onto the ground its successor opens on, and open
 * up from the ground its predecessor closed on. The light goes out at the end
 * of a movement and comes up at the start of the next, the seam falls between
 * two frames of the same colour, and there is nothing to see. It is exposure,
 * not a cross-fade: the type is already gone by then, and what is being taken
 * away is the light.
 *
 * It stops short of opaque. A shoulder taken all the way to a flat colour
 * hides the seam but replaces it with a dead frame, and a boundary viewport
 * is a full viewport of scrolling — a long time to spend on nothing, and
 * longer still on a tall tablet in portrait. At 0.72 both the field and
 * whatever the instrument is doing survive the boundary, so the seam reads as
 * the darkest part of the room rather than as a painted rectangle.
 *
 * Painted at z-10, above the field and the beats but below anything a scene
 * marks z-20 — navigation has to survive its own scene ending.
 */
const SHOULDER = 0.72;
function Shoulder({
  progress,
  colour,
  at,
}: {
  progress: MotionValue<number>;
  colour: string;
  at: "open" | "close";
}) {
  const opacity = useRange(
    progress,
    at === "open" ? [0, 0.09] : [0.9, 1],
    at === "open" ? [SHOULDER, 0] : [0, SHOULDER],
  );

  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 block"
      style={{ opacity, backgroundColor: colour }}
    />
  );
}

export function Scene({
  children,
  className,
  stageClassName,
  tone = "dark",
  length = 2.4,
  mobileLength,
  tabletLength,
  id,
  label,
  openFrom,
  closeTo,
}: {
  children: (props: SceneRenderProps) => ReactNode;
  /** Applied to BOTH section and stage so a retracting URL bar reveals the same ground. */
  className?: string;
  stageClassName?: string;
  tone?: "light" | "dark";
  /** Multiples of the viewport. 2.4 → 140svh of pinned travel. */
  length?: number;
  mobileLength?: number;
  /**
   * Tablets are a target in their own right, not a narrow desktop. A portrait
   * iPad is 1366 tall, so a scene given its desktop length there is half as
   * long again in pixels as the same scene on a laptop — which turns a paced
   * sequence into a slog. Defaults to the midpoint of the two.
   */
  tabletLength?: number;
  id?: string;
  label?: string;
  /** Ground the previous scene ended on. The light comes up from it. */
  openFrom?: string;
  /** Ground the next scene begins on. The light goes down onto it. */
  closeTo?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion() ?? false;
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
        !reduced &&
          "h-[calc(var(--scene-m)*100svh)] md:h-[calc(var(--scene-t)*100svh)] xl:h-[calc(var(--scene-d)*100svh)]",
        className,
      )}
      style={
        {
          "--scene-d": length,
          "--scene-m": mobileLength ?? Math.max(1.6, length * 0.7),
          "--scene-t": tabletLength ?? (length + (mobileLength ?? length * 0.7)) / 2,
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
        {reduced || !openFrom ? null : (
          <Shoulder progress={scrollYProgress} colour={openFrom} at="open" />
        )}
        {reduced || !closeTo ? null : (
          <Shoulder progress={scrollYProgress} colour={closeTo} at="close" />
        )}
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

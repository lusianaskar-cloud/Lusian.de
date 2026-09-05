"use client";

import { useEffect, useRef } from "react";
import { type MotionValue } from "motion/react";

import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { PRESETS, paint, type PresetName } from "./model";
import { cn } from "@/lib/utils";

/**
 * A lit surface.
 *
 * Renders one of the conditions in `model.ts` at roughly a quarter of device
 * resolution and lets the browser scale it up — light of this kind carries no
 * high-frequency detail, so the upscale is free softening and a full-bleed
 * field costs about a millisecond a frame.
 *
 * It repaints only when the value driving it actually changes, pauses
 * entirely when off screen, and under reduced motion paints a single frame at
 * the position the scene settles on.
 */
export function Surface({
  preset,
  progress,
  /** Where the light sits when there is no scroll driving it. */
  still = 0.5,
  /** How far the source drifts across the surface over the scene. */
  travel = 0,
  className,
}: {
  preset: PresetName;
  progress?: MotionValue<number>;
  still?: number;
  travel?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useSafeReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const config = PRESETS[preset];
    let image: ImageData | null = null;
    let frame = 0;
    let visible = true;
    let last = -1;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      // A quarter of CSS pixels, capped: the field has no fine detail.
      const w = Math.max(2, Math.min(480, Math.round(rect.width / 4)));
      const h = Math.max(2, Math.min(320, Math.round(rect.height / 4)));
      /*
       * `!image` matters as much as the dimension check. In development the
       * effect is invoked twice; the second pass finds the canvas already
       * sized by the first, skips allocation, and is left holding a null
       * buffer — so every draw returns at the guard and the field freezes on
       * whatever the first pass painted. Which is a single frame at t = 0.
       */
      if (canvas.width !== w || canvas.height !== h || !image) {
        canvas.width = w;
        canvas.height = h;
        image = ctx.createImageData(w, h);
        last = -1;
      }
      return true;
    };

    const draw = (t: number) => {
      if (!image || !size()) return;
      paint(image, config, t, (t - 0.5) * travel);
      ctx.putImageData(image, 0, 0);
      last = t;
    };

    if (!size()) return;

    if (reduced) {
      draw(still);
      return;
    }

    /*
     * The driving value is read inside the frame, not pushed in by a
     * subscription. A scroll-linked MotionValue does not reliably emit
     * "change" to a plain listener — it is read by its consumers on the frame
     * — so subscribing left every canvas on the site painted once at t = 0
     * and never again: the whole lighting system was a still image.
     */
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      const t = progress ? progress.get() : still;
      // Repaint only on a change the eye could see.
      if (Math.abs(t - last) < 0.0025) return;
      draw(t);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    observer.observe(canvas);

    const onResize = () => {
      if (size()) draw(progress ? progress.get() : still);
    };
    window.addEventListener("resize", onResize, { passive: true });

    draw(progress ? progress.get() : still);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [preset, progress, reduced, still, travel]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      /* The condition, in the DOM, so the intent survives a code review. */
      data-condition={PRESETS[preset].condition}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}

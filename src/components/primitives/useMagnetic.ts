"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Pointer attraction. The element leans toward the cursor by a fraction of the
 * offset and springs back on exit. Fine pointers only — never on touch.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28, radius = 0.7) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 17, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 170, damping: 17, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const reach = Math.max(rect.width, rect.height) * (1 + radius);

      if (Math.hypot(dx, dy) > reach) {
        x.set(0);
        y.set(0);
        return;
      }
      x.set(dx * strength);
      y.set(dy * strength);
    };

    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onLeave);
    };
  }, [radius, reduced, strength, x, y]);

  return { ref, x: sx, y: sy };
}

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type CursorState = "default" | "action" | "label";

/**
 * A trailing ring on fine pointers only.
 *
 * Rendered in `mix-blend-difference` so it stays legible on ivory and on ink
 * without tracking section tonality. Disabled entirely for coarse pointers and
 * reduced motion, where the native cursor is left alone.
 */
export function PrecisionCursor() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.55 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("precision-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      const marker = target?.closest?.("[data-cursor]") as HTMLElement | null;

      if (!marker) {
        const interactive = target?.closest?.(
          "a, button, input, textarea, select, [role='button'], [role='tab']",
        );
        setState(interactive ? "action" : "default");
        setLabel("");
        return;
      }

      const mode = marker.dataset.cursor;
      if (mode === "label" && marker.dataset.cursorLabel) {
        setState("label");
        setLabel(marker.dataset.cursorLabel);
      } else {
        setState("action");
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("precision-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state === "label" ? 92 : state === "action" ? 52 : 26;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] mix-blend-difference"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-white/70"
        style={{ marginLeft: -size / 2, marginTop: -size / 2 }}
        animate={{
          width: size,
          height: size,
          backgroundColor:
            state === "label" ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.6 }}
      >
        {state === "label" ? (
          <motion.span
            className="label-mono select-none text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {label}
          </motion.span>
        ) : (
          <motion.span
            className="block rounded-full bg-white"
            animate={{ width: state === "action" ? 0 : 3, height: state === "action" ? 0 : 3 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

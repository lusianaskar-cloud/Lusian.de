"use client";

import { useEffect, useState } from "react";
import { useIsClient } from "@/lib/useIsClient";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/content/site";
import { useContent } from "@/lib/i18n/context";
import { EASE } from "@/lib/motion";
import { Mark } from "./Mark";
import { getLenis } from "./SmoothScroll";
import { markIntroReady } from "./intro";

type Phase = "playing" | "parting" | "done";

const SESSION_KEY = "lusian:intro";

/**
 * Decided once per page load and cached, so it is stable across renders and
 * safe to read while rendering. The flag itself is written in the effect.
 */
let introDecision: boolean | null = null;
function shouldPlayIntro() {
  if (introDecision !== null) return introDecision;
  try {
    introDecision = !sessionStorage.getItem(SESSION_KEY);
  } catch {
    introDecision = false;
  }
  return introDecision;
}

/**
 * Opening sequence. The mark draws its horizon, the wordmark rises, and the
 * plate then parts along that same horizon — the brand mark opening to reveal
 * the page. Shown once per session, never under reduced motion.
 */
export function Preloader() {
  const { meta } = useContent();
  const reduced = useReducedMotion();
  const mounted = useIsClient();
  const [phase, setPhase] = useState<Phase | null>(null);
  const [count, setCount] = useState(0);

  // Derived rather than assigned in an effect: the server and the first client
  // render agree on "done", and the sequence only exists once mounted.
  const shouldPlay = mounted && !reduced && shouldPlayIntro();
  const state: Phase = phase ?? (shouldPlay ? "playing" : "done");

  useEffect(() => {
    if (!mounted) return;
    if (!shouldPlay) {
      markIntroReady();
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private browsing — the intro simply plays again next time.
    }

    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const start = performance.now();
    const span = 1500;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / span);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const part = window.setTimeout(() => setPhase("parting"), 1750);
    const finish = window.setTimeout(() => {
      setPhase("done");
      markIntroReady();
      document.documentElement.style.overflow = "";
      lenis?.start();
    }, 2650);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(part);
      window.clearTimeout(finish);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [mounted, shouldPlay]);

  const visible = state === "playing" || state === "parting";
  const parting = state === "parting";

  const plate = (
    <div className="pointer-events-none absolute inset-0">
      {/* The mark is placed so its own horizon lands exactly on the split,
          which is the line the plate later parts along. 0.60625 is the chord's
          position within the glyph; the mark is 2.75rem tall. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
        style={{ marginTop: "-1.667rem" }}
      >
        <Mark className="h-11 w-11 text-champagne" animated />
      </div>

      {/* The wordmark is Latin and letter-spaced in every language, so it is
          laid out left to right regardless of the page direction. */}
      <span
        lang="en"
        dir="ltr"
        className="absolute left-1/2 top-1/2 mt-9 flex -translate-x-1/2 overflow-hidden pl-[0.5em]"
      >
        {site.wordmark.split("").map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className="block font-sans text-[0.95rem] font-medium tracking-[0.5em] text-ivory"
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE.expo, delay: 0.55 + i * 0.05 }}
          >
            {letter}
          </motion.span>
        ))}
      </span>

      <div className="absolute inset-x-0 bottom-10 flex items-end justify-between px-(--spacing-gutter)">
        <span className="type-voice text-[0.8125rem] text-ivory/40">{meta.descriptorShort}</span>
        <span className="label-mono tabular-nums text-ivory/40">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {visible ? (
        <div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[200] overflow-hidden"
        >
          <motion.div
            className="grain absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-ink"
            initial={{ y: "0%" }}
            animate={{ y: parting ? "-100%" : "0%" }}
            transition={{ duration: 1.1, ease: EASE.drape }}
          >
            <span aria-hidden className="grain-layer" />
            <div className="absolute inset-x-0 top-0 h-[200%]">{plate}</div>
          </motion.div>

          <motion.div
            className="grain absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-ink"
            initial={{ y: "0%" }}
            animate={{ y: parting ? "100%" : "0%" }}
            transition={{ duration: 1.1, ease: EASE.drape }}
          >
            <span aria-hidden className="grain-layer" />
            <div className="absolute inset-x-0 bottom-0 h-[200%]">{plate}</div>
          </motion.div>

          <motion.span
            className="absolute inset-x-0 top-1/2 z-10 h-px origin-left rtl:origin-right rtl:origin-left bg-champagne/60"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: parting ? 0 : 1 }}
            transition={{
              scaleX: { duration: 1.4, ease: EASE.expo, delay: 0.4 },
              opacity: { duration: 0.6, ease: EASE.soft },
            }}
          />
        </div>
      ) : null}
    </AnimatePresence>
  );
}

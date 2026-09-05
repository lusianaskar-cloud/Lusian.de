"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    /**
     * The live scroll instance. Exposed deliberately: Lenis owns the scroll
     * position, so `window.scrollTo` is reverted on the next frame — anything
     * that needs to move the page programmatically (including automated
     * verification of the pinned scenes) has to go through this.
     */
    __lusianScroll?: Lenis;
  }
}

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

/** Jump to top without an animated flight — used behind the page curtain. */
export function scrollToTopImmediate() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true });
  }
  window.scrollTo(0, 0);
}

/**
 * Weighted, inertial scrolling. This is what makes the page feel like it has
 * mass. Disabled entirely under `prefers-reduced-motion`, and left to native
 * momentum on touch devices where the OS already does it better.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.4),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    });

    lenisInstance = lenis;
    window.__lusianScroll = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
      window.__lusianScroll = undefined;
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Tone = "light" | "dark";

/**
 * Reports the tonality of whatever section currently sits under the header,
 * so the header can invert itself as the page moves beneath it.
 *
 * Measured once per layout change and read from a cached region table on
 * scroll — no layout reads in the scroll handler.
 */
export function useHeaderTone(probeOffset = 34) {
  const pathname = usePathname();
  const [tone, setTone] = useState<Tone>("light");

  useEffect(() => {
    let regions: { top: number; bottom: number; tone: Tone }[] = [];
    let ticking = false;

    const resolve = () => {
      const y = window.scrollY + probeOffset;
      let next: Tone = "light";
      for (const region of regions) {
        if (y >= region.top && y < region.bottom) next = region.tone;
      }
      setTone((current) => (current === next ? current : next));
    };

    const measure = () => {
      regions = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]")).map(
        (el) => {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          return {
            top,
            bottom: top + rect.height,
            tone: (el.dataset.tone === "dark" ? "dark" : "light") as Tone,
          };
        },
      );
      resolve();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        resolve();
        ticking = false;
      });
    };

    measure();
    const remeasure = window.setTimeout(measure, 350);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.clearTimeout(remeasure);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [pathname, probeOffset]);

  return tone;
}

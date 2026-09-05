"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { markets } from "@/lib/content/markets";
import { useContent } from "@/lib/i18n/context";
import { MarketPlot } from "./MarketPlot";
import { EASE } from "@/lib/motion";
import { cn, ordinal } from "@/lib/utils";

/**
 * The six markets, one at a time.
 *
 * Replaces six full-height blocks with a single instrument the reader steers.
 * Desktop keeps the plot and the index side by side; a phone gets a compact
 * snapping rail rather than a shrunken desktop list or a dropdown, and the
 * plot stays a fixed, legible size beneath it.
 *
 * The index buttons are the accessible control. Arrow keys move between
 * markets, matching the visual order.
 */
export function MarketExplorer() {
  const [index, setIndex] = useState(0);
  const reduced = useSafeReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { entries, plot } = useContent().markets;
  const active = markets[index];
  const copy = entries[active.id];

  const select = (next: number) => {
    const clamped = (next + markets.length) % markets.length;
    setIndex(clamped);
    const rail = railRef.current;
    const button = rail?.querySelector<HTMLElement>(`[data-market="${clamped}"]`);
    button?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    // Left and right follow the visual order, which reverses in Arabic.
    const rtl =
      typeof document !== "undefined" && document.documentElement.dir === "rtl";
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";

    if (event.key === forward || event.key === "ArrowDown") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === back || event.key === "ArrowUp") {
      event.preventDefault();
      select(index - 1);
    }
  };

  return (
    <div>
      {/* Phone: a compact rail that snaps. */}
      <div
        ref={railRef}
        role="tablist"
        aria-label={plot.markets}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="no-scrollbar -mx-(--spacing-gutter) flex snap-x snap-mandatory gap-2 overflow-x-auto px-(--spacing-gutter) pb-1 lg:hidden"
      >
        {markets.map((market, i) => (
          <button
            key={market.id}
            type="button"
            role="tab"
            id={`market-tab-${market.id}`}
            data-market={i}
            aria-selected={i === index}
            aria-controls={`market-panel-${market.id}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "shrink-0 snap-center whitespace-nowrap border px-5 py-3.5 text-[0.9375rem] tracking-tight transition-colors duration-500",
              i === index
                ? "border-current/60 text-[color:var(--tone-fg)]"
                : "border-current/15 text-tone-muted",
            )}
          >
            {entries[market.id].short}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-12 lg:mt-0 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <MarketPlot activeIndex={index} onSelect={setIndex} labels />
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          {/* Desktop: the index sits with the detail. */}
          <ul
            role="tablist"
            aria-label={plot.markets}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="hidden border-t border-tone lg:block"
          >
            {markets.map((market, i) => (
              <li key={market.id} className="border-b border-tone">
                <button
                  type="button"
                  role="tab"
                  id={`market-tab-lg-${market.id}`}
                  aria-selected={i === index}
                  aria-controls={`market-panel-${market.id}`}
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className="group flex w-full items-center gap-4 py-3.5 text-start"
                >
                  <span
                    className={cn(
                      "label-mono transition-colors duration-500",
                      i === index ? "text-accent" : "text-tone-muted",
                    )}
                  >
                    {ordinal(i)}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-[1.0625rem] tracking-tight transition-all duration-500",
                      i === index
                        ? "translate-x-1 rtl:-translate-x-1 opacity-100"
                        : "opacity-55 group-hover:translate-x-1 group-hover:rtl:-translate-x-1 group-hover:opacity-100",
                    )}
                  >
                    {entries[market.id].name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="relative lg:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                id={`market-panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`market-tab-${active.id}`}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: EASE.expo }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="label-mono text-accent">{ordinal(index)}</span>
                  <span className="label-mono text-tone-muted" dir="ltr">
                    {active.code}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.9rem,4vw,2.75rem)] leading-tight tracking-tight lg:hidden">
                  {copy.name}
                </h3>
                <p className="mt-4 font-display text-subhead italic leading-snug text-accent">
                  {copy.line}
                </p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-tone-muted">
                  {copy.body}
                </p>

                <ul className="mt-8">
                  {copy.character.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-t border-tone py-3 text-[0.875rem] leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6em] block size-1 shrink-0 rounded-full bg-[color:var(--tone-accent)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4 border-t border-tone pt-6">
                  <div>
                    <span className="label-mono text-tone-muted">
                      {plot.principalLocations}
                    </span>
                    <p className="mt-2 text-[0.875rem] text-tone-muted">
                      {copy.cities.join(" · ")}
                    </p>
                  </div>
                  <p className="font-display text-[1.0625rem] italic leading-snug">
                    {copy.suits}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

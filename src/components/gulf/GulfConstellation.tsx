"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { markets, type Market } from "@/lib/content/markets";
import { EASE } from "@/lib/motion";
import { cn, ordinal } from "@/lib/utils";

/**
 * The six Gulf markets as a coordinate constellation.
 *
 * Deliberately not a rendered map: markers sit at true relative positions
 * derived from their hub coordinates, over an abstract graticule. It reads as
 * a considered instrument rather than a stock map of the region — and it
 * cannot become geographically wrong.
 *
 * Accessible control is the index list. The plotted markers are a pointer
 * affordance over the same state.
 */
const BOUNDS = { west: 44.5, east: 60.5, south: 22, north: 31 };
const VIEW = { w: 1000, h: 625 };

function project(market: Market) {
  const x = ((market.lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w;
  const y = ((BOUNDS.north - market.lat) / (BOUNDS.north - BOUNDS.south)) * VIEW.h;
  return { x, y };
}

export function GulfConstellation({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const [activeId, setActiveId] = useState(markets[0].id);
  const reduced = useReducedMotion();

  const points = useMemo(
    () => markets.map((market) => ({ market, ...project(market) })),
    [],
  );
  const active = points.find((p) => p.market.id === activeId) ?? points[0];

  const lngLines = [46, 48, 50, 52, 54, 56, 58, 60];
  const latLines = [23, 25, 27, 29];

  return (
    <div className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", className)}>
      {/* Index — the accessible control */}
      <div className="lg:col-span-4">
        <ul className="border-t border-tone">
          {points.map(({ market }, i) => {
            const selected = market.id === activeId;
            return (
              <li key={market.id} className="border-b border-tone">
                <button
                  type="button"
                  onClick={() => setActiveId(market.id)}
                  aria-pressed={selected}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className={cn(
                      "label-mono transition-colors duration-500",
                      selected ? "text-accent" : "text-tone-muted",
                    )}
                  >
                    {ordinal(i)}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-[1.0625rem] tracking-tight transition-all duration-500",
                      selected
                        ? "translate-x-1 opacity-100"
                        : "opacity-55 group-hover:translate-x-1 group-hover:opacity-100",
                    )}
                  >
                    {market.name}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "block size-1.5 rounded-full transition-all duration-500",
                      selected ? "scale-100 bg-[color:var(--tone-accent)]" : "scale-0 bg-current",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 max-w-sm">
          <AnimatePresence mode="wait">
            <motion.p
              key={`suits-${active.market.id}`}
              className="font-display text-[1.0625rem] italic leading-snug text-tone-muted"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE.expo }}
            >
              {active.market.suits}
            </motion.p>
          </AnimatePresence>

          {variant === "full" ? (
            <p className="mt-6 text-[0.8125rem] leading-relaxed text-tone-muted">
              Positions are plotted from the coordinates of each market&apos;s principal
              hub. Descriptions cover business and lifestyle character only.
            </p>
          ) : null}
        </div>
      </div>

      {/* Plot + detail */}
      <div className="lg:col-span-8">
        <div className="relative w-full overflow-hidden rounded-sm border border-tone">
          <div className="relative aspect-[16/10] w-full">
            <svg
              viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
                {lngLines.map((lng) => {
                  const x =
                    ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w;
                  return (
                    <line key={`lng-${lng}`} x1={x} y1={0} x2={x} y2={VIEW.h} opacity={0.07} />
                  );
                })}
                {latLines.map((lat) => {
                  const y =
                    ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * VIEW.h;
                  return (
                    <line key={`lat-${lat}`} x1={0} y1={y} x2={VIEW.w} y2={y} opacity={0.07} />
                  );
                })}
              </g>

              {/* Bearings from the selected market to the others */}
              <g>
                {points
                  .filter((p) => p.market.id !== activeId)
                  .map((p) => (
                    <motion.line
                      key={`link-${p.market.id}`}
                      x1={active.x}
                      y1={active.y}
                      x2={p.x}
                      y2={p.y}
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.18 }}
                      transition={{
                        duration: reduced ? 0 : 0.9,
                        ease: EASE.expo,
                      }}
                    />
                  ))}
              </g>

              {/* Range rings on the selected market */}
              {[26, 52, 84].map((r, i) => (
                <motion.circle
                  key={`ring-${r}`}
                  cx={active.x}
                  cy={active.y}
                  r={r}
                  fill="none"
                  stroke="var(--tone-accent)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 - i * 0.14 }}
                  style={{ transformOrigin: `${active.x}px ${active.y}px` }}
                  transition={{
                    duration: reduced ? 0 : 1,
                    ease: EASE.expo,
                    delay: reduced ? 0 : i * 0.07,
                  }}
                />
              ))}

            </svg>

            {/* Pointer affordance over the same state */}
            <div className="absolute inset-0" aria-hidden>
              {points.map((p) => (
                <button
                  key={`hit-${p.market.id}`}
                  type="button"
                  tabIndex={-1}
                  onClick={() => setActiveId(p.market.id)}
                  data-cursor="label"
                  data-cursor-label={p.market.short}
                  style={{
                    left: `${(p.x / VIEW.w) * 100}%`,
                    top: `${(p.y / VIEW.h) * 100}%`,
                  }}
                  className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                >
                  <span className="sr-only">{p.market.name}</span>
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-500",
                      p.market.id === activeId
                        ? "size-2.5 bg-[color:var(--tone-accent)]"
                        : "size-1.5 bg-current opacity-40",
                    )}
                  />
                  <span
                    className={cn(
                      "label-mono absolute left-full top-1/2 hidden -translate-y-1/2 whitespace-nowrap transition-colors duration-500 sm:block",
                      p.market.id === activeId ? "text-accent" : "text-tone-muted",
                    )}
                  >
                    {p.market.short}
                  </span>
                </button>
              ))}

              <span
                className="label-mono absolute bottom-4 left-4 hidden text-tone-muted sm:block"
                aria-hidden
              >
                {active.market.hub}
              </span>
              <span
                className="label-mono absolute bottom-4 right-4 tabular-nums text-tone-muted"
                aria-hidden
              >
                {active.market.lat.toFixed(2)}°N {active.market.lng.toFixed(2)}°E
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-10 min-h-[13rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.market.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.6, ease: EASE.expo }}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h3 className="font-display text-heading">{active.market.name}</h3>
                <span className="label-mono text-tone-muted">{active.market.code}</span>
              </div>
              <p className="mt-4 max-w-2xl font-display text-subhead italic leading-snug text-accent">
                {active.market.line}
              </p>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-tone-muted">
                {active.market.body}
              </p>

              {variant === "full" ? (
                <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {active.market.character.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-t border-tone pt-3 text-[0.875rem] leading-relaxed"
                    >
                      <span aria-hidden className="mt-2 block size-1 shrink-0 rounded-full bg-current opacity-40" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

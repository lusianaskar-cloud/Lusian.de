"use client";

import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { markets, type Market } from "@/lib/content/markets";
import { useContent } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * The six Gulf markets as a coordinate instrument.
 *
 * Deliberately not a rendered map: markers sit at true relative positions
 * derived from their hub coordinates over an abstract graticule, so it reads
 * as a considered instrument and cannot become geographically wrong.
 *
 * Presentational only — the caller owns which market is active, so the same
 * instrument serves the pinned homepage scene (index driven by scroll) and
 * the destinations page (driven by an accessible index list).
 *
 * ── It does not mirror in Arabic ────────────────────────────────────────
 * The rest of the site flips with `dir`, and should. This does not: the
 * markers sit at true relative positions derived from real coordinates, and
 * a Gulf with Oman on the left and the Emirates on the right would simply be
 * wrong. The instrument is therefore pinned to `dir="ltr"` and every position
 * inside it stays physical. Only the label text is read in the page's
 * language, which is why the labels carry `dir="auto"`.
 */
const BOUNDS = { west: 44.5, east: 60.5, south: 22, north: 31 };
const VIEW = { w: 1000, h: 625 };
const LNG_LINES = [46, 48, 50, 52, 54, 56, 58, 60];
const LAT_LINES = [23, 25, 27, 29];

export function project(market: Market) {
  return {
    x: ((market.lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w,
    y: ((BOUNDS.north - market.lat) / (BOUNDS.north - BOUNDS.south)) * VIEW.h,
  };
}

export const marketPoints = markets.map((market) => ({ market, ...project(market) }));

export function MarketPlot({
  activeIndex,
  onSelect,
  labels = true,
  className,
}: {
  activeIndex: number;
  /** Omit for a non-interactive instrument (the pinned scene). */
  onSelect?: (index: number) => void;
  labels?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { entries, plot } = useContent().markets;
  const active = marketPoints[Math.max(0, Math.min(marketPoints.length - 1, activeIndex))];
  const activeCopy = entries[active.market.id];

  const spring = useMemo(
    () => (reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 90, damping: 20, mass: 1 }),
    [reduced],
  );

  // The coordinate readout counts to the new position rather than cutting.
  const latRaw = useMotionValue(active.market.lat);
  const lngRaw = useMotionValue(active.market.lng);
  const lat = useSpring(latRaw, { stiffness: 80, damping: 20 });
  const lng = useSpring(lngRaw, { stiffness: 80, damping: 20 });
  const latText = useTransform(lat, (v) => v.toFixed(2));
  const lngText = useTransform(lng, (v) => v.toFixed(2));
  const readout = useMotionTemplate`${latText}°N ${lngText}°E`;

  useEffect(() => {
    if (reduced) {
      latRaw.jump(active.market.lat);
      lngRaw.jump(active.market.lng);
      return;
    }
    latRaw.set(active.market.lat);
    lngRaw.set(active.market.lng);
  }, [active.market.lat, active.market.lng, latRaw, lngRaw, reduced]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-sm border border-tone",
        className,
      )}
    >
      <div dir="ltr" className="relative aspect-[16/10] w-full">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity={0.07}>
            {LNG_LINES.map((lngLine) => {
              const x = ((lngLine - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w;
              return <line key={`x${lngLine}`} x1={x} y1={0} x2={x} y2={VIEW.h} />;
            })}
            {LAT_LINES.map((latLine) => {
              const y = ((BOUNDS.north - latLine) / (BOUNDS.north - BOUNDS.south)) * VIEW.h;
              return <line key={`y${latLine}`} x1={0} y1={y} x2={VIEW.w} y2={y} />;
            })}
          </g>

          {/* Bearings, redrawn from wherever the origin now sits. */}
          <g>
            {marketPoints.map((p, i) => (
              <motion.line
                key={`bearing-${p.market.id}`}
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{
                  x1: active.x,
                  y1: active.y,
                  opacity: i === activeIndex ? 0 : 0.18,
                }}
                transition={spring}
              />
            ))}
          </g>

          {/* Range rings re-centre on the active market. */}
          {[26, 52, 84].map((r, i) => (
            <motion.circle
              key={`ring-${r}`}
              r={r}
              fill="none"
              stroke="var(--tone-accent)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ cx: active.x, cy: active.y, opacity: 0.5 - i * 0.14 }}
              transition={spring}
            />
          ))}
        </svg>

        {/* Markers live in the HTML layer so they hold a real size on a phone. */}
        <div className="absolute inset-0" aria-hidden>
          {marketPoints.map((p, i) => {
            const isActive = i === activeIndex;
            const Tag = onSelect ? "button" : "span";
            return (
              <Tag
                key={`marker-${p.market.id}`}
                {...(onSelect
                  ? { type: "button" as const, tabIndex: -1, onClick: () => onSelect(i) }
                  : {})}
                data-cursor={onSelect ? "label" : undefined}
                data-cursor-label={onSelect ? entries[p.market.id].short : undefined}
                style={{
                  left: `${(p.x / VIEW.w) * 100}%`,
                  top: `${(p.y / VIEW.h) * 100}%`,
                }}
                className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              >
                <span className="sr-only">{entries[p.market.id].name}</span>
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500",
                    isActive
                      ? "size-2.5 bg-[color:var(--tone-accent)]"
                      : "size-1.5 bg-current opacity-40",
                  )}
                />
                {labels ? (
                  <span
                    dir="auto"
                    className={cn(
                      "label-mono absolute left-full top-1/2 hidden -translate-y-1/2 whitespace-nowrap ps-1 transition-colors duration-500 sm:block",
                      isActive ? "text-accent" : "text-tone-muted",
                    )}
                  >
                    {entries[p.market.id].short}
                  </span>
                ) : null}
              </Tag>
            );
          })}

          <span
            dir="auto"
            className="label-mono absolute bottom-4 left-4 hidden text-tone-muted sm:block"
          >
            {activeCopy.hub}
          </span>
          {/* A coordinate reads left to right in every language. */}
          <motion.span
            dir="ltr"
            aria-label={plot.markets}
            className="label-mono absolute bottom-4 right-4 tabular-nums text-tone-muted"
          >
            {readout}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

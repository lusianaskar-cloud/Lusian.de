"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  type MotionValue,
} from "motion/react";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useRange } from "@/lib/useRange";
import { heroResolve, heroStandfirst, site } from "@/lib/content/site";
import { LineReveal } from "@/components/primitives/Reveal";
import { HairlineGrid } from "@/components/home/HairlineGrid";
import { useIntroReady } from "@/components/chrome/intro";
import { setStageTone } from "@/components/chrome/stageTone";
import { cn } from "@/lib/utils";

const INK = "#14181A";
const IVORY = "#F4F0E8";
const CHAMPAGNE = "#C6AD82";
const BRASS = "#7A6039";

/**
 * SCENE 01 — HORIZON
 *
 * The opening statement is rendered twice at identical coordinates: dark on
 * ivory, and ivory inside the ink plate. The plate climbs with scroll, so the
 * sentence inverts *through* the horizon rather than fading — the brand mark
 * drawn at page scale.
 *
 * Because both copies share one set of MotionValues they cannot drift apart,
 * and because the plate is `bottom-0` with a growing height, the copy inside
 * it needs no compensating offset.
 *
 * Only the first copy carries the <h1>; the inverted one is aria-hidden, so
 * the sentence is announced once.
 */
function Statement({
  progress,
  reduced,
  inverted,
  ready,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  inverted?: boolean;
  ready: boolean;
}) {
  const rest = inverted ? IVORY : INK;
  const glow = inverted ? CHAMPAGNE : BRASS;

  // One word, one moment — as the horizon passes it.
  const accent = useRange(progress, [0.3, 0.42, 0.5, 0.6], [rest, glow, glow, rest]);

  const Heading = inverted ? "p" : "h1";

  return (
    <Heading
      aria-hidden={inverted || undefined}
      className="font-display text-[clamp(2.35rem,8.4vw,6.25rem)] leading-[1.04] tracking-[-0.03em]"
    >
      <LineReveal
        as="span"
        className="block"
        immediate
        play={ready}
        delay={0.3}
        stagger={0.12}
        lines={[
          <span key="1">Some moves are operational.</span>,
          <span key="2">
            Some are entirely{" "}
            {reduced ? (
              <em className={cn("font-normal", inverted ? "text-champagne" : "text-brass")}>
                personal
              </em>
            ) : (
              <motion.em className="font-normal" style={{ color: accent }}>
                personal
              </motion.em>
            )}
            .
          </span>,
        ]}
      />
    </Heading>
  );
}

/**
 * A motion wrapper that steps out of the way entirely under reduced motion.
 *
 * Swapping the *element* matters: when a style prop changes from a MotionValue
 * to a static number, Motion keeps its existing binding and the last value it
 * wrote stays on the node. Rendering a plain element instead makes React
 * unmount the managed one, so nothing is left behind.
 */
function Moved({
  reduced,
  style,
  className,
  as = "div",
  children,
  ...rest
}: {
  reduced: boolean;
  style?: Record<string, MotionValue<number> | MotionValue<string>>;
  className?: string;
  as?: "div" | "p" | "span";
  children: ReactNode;
} & Record<string, unknown>) {
  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  const M = as === "p" ? motion.p : as === "span" ? motion.span : motion.div;
  return (
    <M className={className} style={style} {...rest}>
      {children}
    </M>
  );
}

function Layer({
  progress,
  reduced,
  inverted,
  ready,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  inverted?: boolean;
  ready: boolean;
}) {
  // Each moment owns the stage in turn. Nothing shares the centre, and every
  // beat is fully gone before the next arrives — one dominant idea per
  // viewport is the whole discipline of this scene.
  const statementScale = useRange(progress, [0.46, 0.68], [1, 0.86]);
  const statementY = useRange(progress, [0.46, 0.72], ["0%", "-13%"]);
  const statementOpacity = useRange(progress, [0.6, 0.71], [1, 0]);

  const chromeOpacity = useRange(progress, [0.08, 0.26], [1, 0]);
  const gridOpacity = useRange(progress, [0.38, 0.7], [1, 0.3]);

  const resolveOpacity = useRange(progress, [0.63, 0.72, 0.79, 0.86], [0, 1, 1, 0]);
  const resolveY = useRange(progress, [0.63, 0.72, 0.79, 0.86], [30, 0, 0, -30]);

  const closeOpacity = useRange(progress, [0.85, 0.95], [0, 1]);
  const closeY = useRange(progress, [0.85, 0.95], [40, 0]);

  return (
    <div className="absolute inset-x-0 bottom-0 h-[100lvh]">
      <Moved reduced={reduced} style={{ opacity: gridOpacity }}>
        <HairlineGrid />
      </Moved>

      <div
        className={cn(
          "container-editorial relative h-full",
          reduced && "flex flex-col justify-center gap-16 py-32",
        )}
      >
        <Moved
          reduced={reduced}
          as="p"
          className={cn(
            "label-mono text-current/60",
            !reduced && "absolute left-(--spacing-gutter) top-28 lg:top-36",
          )}
          style={{ opacity: chromeOpacity }}
        >
          {site.descriptorShort}
        </Moved>

        {/* Beat one — the statement. */}
        <Moved
          reduced={reduced}
          className={cn(
            "origin-left",
            !reduced && "absolute inset-x-(--spacing-gutter) top-1/2 -translate-y-1/2",
          )}
          style={{ scale: statementScale, y: statementY, opacity: statementOpacity }}
        >
          <Statement progress={progress} reduced={reduced} inverted={inverted} ready={ready} />
        </Moved>

        {/* Beat two — the resolution, in the space the statement vacates. */}
        <Moved
          reduced={reduced}
          as="p"
          className={cn(
            "max-w-3xl font-display text-[clamp(1.5rem,4.4vw,3.5rem)] italic leading-[1.12]",
            !reduced && "absolute inset-x-(--spacing-gutter) top-1/2 -translate-y-1/2",
          )}
          style={{ opacity: resolveOpacity, y: resolveY }}
          aria-hidden={inverted || undefined}
        >
          {heroResolve}
        </Moved>

        {/* Beat three — why the firm exists. The old manifesto section, folded
            into the opening where it actually belongs. */}
        <Moved
          reduced={reduced}
          className={cn(
            !reduced && "absolute inset-x-(--spacing-gutter) top-1/2 -translate-y-1/2",
          )}
          style={{ opacity: closeOpacity, y: closeY }}
          aria-hidden={inverted || undefined}
        >
          <p className="max-w-[18ch] font-display text-[clamp(2rem,5.6vw,4.5rem)] leading-[1.05] tracking-[-0.028em]">
            We work in the distance between a decision and its execution.
          </p>
          <p className="mt-10 max-w-md text-[0.9375rem] leading-relaxed text-current/60 lg:text-base">
            {heroStandfirst}
          </p>
        </Moved>

        {reduced ? null : (
          <motion.span
            className="label-mono absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] left-(--spacing-gutter) flex items-center gap-3 text-current/55"
            style={{ opacity: chromeOpacity }}
            aria-hidden
          >
            <span className="relative block h-8 w-px overflow-hidden bg-current/25">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 block h-3 motion-safe:animate-[scrollcue_2.6s_cubic-bezier(0.65,0,0.35,1)_infinite]",
                  inverted ? "bg-champagne" : "bg-brass",
                )}
              />
            </span>
            Scroll
          </motion.span>
        )}
      </div>
    </div>
  );
}

export function Scene01Horizon() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSafeReducedMotion() ?? false;
  const ready = useIntroReady();
  const inView = useInView(ref, { amount: 0.05 });
  const [dark, setDark] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const plateHeight = useRange(scrollYProgress, [0.2, 0.58], ["38%", "100%"]);

  // Tell the header when the horizon has passed beneath it.
  useEffect(() => {
    if (reduced) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setDark((current) => (current === v > 0.5 ? current : v > 0.5));
    });
    return unsubscribe;
  }, [reduced, scrollYProgress]);

  useEffect(() => {
    if (!inView) return;
    setStageTone(dark ? "dark" : "light");
    return () => setStageTone(null);
  }, [inView, dark]);

  return (
    <section
      ref={ref}
      data-tone={dark ? "dark" : "light"}
      aria-label="Opening"
      className={cn(
        "relative bg-ivory",
        !reduced && "h-[calc(var(--scene-m)*100svh)] lg:h-[calc(var(--scene-d)*100svh)]",
      )}
      style={{ "--scene-d": 2.3, "--scene-m": 1.8 } as React.CSSProperties}
    >
      <div
        className={cn(
          "bg-ivory",
          reduced ? "relative" : "sticky top-0 h-[100svh] overflow-hidden",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-1/4 -top-1/3 h-[85%] w-[70%] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--color-champagne) 30%, transparent), transparent)",
          }}
        />

        {/* Base — dark on ivory */}
        <div className={cn("tone-light", reduced ? "relative" : "absolute inset-0")}>
          <Layer progress={scrollYProgress} reduced={reduced} ready={ready} />
        </div>

        {/* Plate — ivory on ink, revealed as the horizon climbs */}
        {reduced ? null : (
          <motion.div
            className="tone-dark grain absolute inset-x-0 bottom-0 z-10 overflow-hidden bg-ink"
            style={{ height: plateHeight }}
          >
            <span aria-hidden className="grain-layer" />
            <Layer progress={scrollYProgress} reduced={false} inverted ready={ready} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

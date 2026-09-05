"use client";

import { useEffect, useState } from "react";
import { motion, type MotionValue } from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { MarketPlot } from "@/components/gulf/MarketPlot";
import { TextLink } from "@/components/primitives/ActionLink";
import { markets } from "@/lib/content/markets";
import { ordinal } from "@/lib/utils";

/**
 * SCENE 07 — SIX MARKETS
 *
 * The instrument holds; the information changes around it. Rather than six
 * full screens of near-identical blocks, one pinned scene where the marker
 * travels, the bearings redraw, the rings re-centre and the coordinate
 * readout counts to the new position.
 *
 * The active market is derived as a discrete index so the plot animates
 * between six known states on a spring — smoother, and far cheaper, than
 * interpolating geometry every frame.
 */
const FIRST = 0.1;
const LAST = 0.96;
const COUNT = markets.length;
const SPAN = (LAST - FIRST) / COUNT;

function useScrollIndex(progress: MotionValue<number>, enabled: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const resolve = (v: number) => {
      const next = Math.min(COUNT - 1, Math.max(0, Math.floor((v - FIRST) / SPAN)));
      setIndex((current) => (current === next ? current : next));
    };
    resolve(progress.get());
    return progress.on("change", resolve);
  }, [enabled, progress]);

  return index;
}

function Plot({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const opacity = useRange(progress, [0.02, 0.1], [0, 1]);
  const y = useRange(progress, [0.02, 0.1], [24, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="container-editorial pointer-events-none absolute inset-x-0 top-[6rem] lg:top-1/2 lg:-translate-y-1/2"
    >
      <div className="lg:w-7/12">
        <MarketPlot activeIndex={index} labels />
      </div>
    </motion.div>
  );
}

export function Scene07Markets() {
  return (
    <Scene
      tone="dark"
      length={3.4}
      mobileLength={2.4}
      className="bg-ink"
      stageClassName="grain"
      label="Gulf markets"
    >
      {({ progress, reduced }) => <Markets progress={progress} reduced={reduced} />}
    </Scene>
  );
}

function Markets({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const index = useScrollIndex(progress, !reduced);

  return (
    <>
      {reduced ? null : (
        <>
          <span aria-hidden className="grain-layer" />
          <Plot progress={progress} index={index} />
        </>
      )}

      <Beat
        progress={progress}
        reduced={reduced}
        range={[0, 0.02, 0.06, 0.11]}
        className="container-editorial flex items-center"
      >
        <h2 className="max-w-[15ch] font-display text-[clamp(2.1rem,6vw,4.75rem)] leading-[1.05] tracking-[-0.028em]">
          Six markets, six different{" "}
          <em className="font-normal text-champagne">lives</em>.
        </h2>
      </Beat>

      {markets.map((market, i) => {
        const start = FIRST + i * SPAN;
        return (
          <Beat
            key={market.id}
            progress={progress}
            reduced={reduced}
            range={[start - 0.015, start + 0.03, start + SPAN - 0.035, start + SPAN + 0.01]}
            rise={24}
            className="container-editorial flex items-end pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:items-center lg:pb-0"
          >
            <div className="w-full lg:ml-auto lg:w-4/12">
              <div className="flex items-baseline gap-4">
                <span className="label-mono text-champagne/70">{ordinal(i)}</span>
                <span className="label-mono text-ivory/40">{market.code}</span>
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.06] tracking-[-0.026em]">
                {market.name}
              </h3>
              <p className="mt-4 font-display text-[clamp(1.05rem,1.8vw,1.4rem)] italic leading-snug text-champagne">
                {market.line}
              </p>
              <p className="mt-5 max-w-md text-[0.875rem] leading-relaxed text-ivory/60 lg:text-[0.9375rem]">
                {market.body}
              </p>
            </div>
          </Beat>
        );
      })}

      {reduced ? null : (
        <div className="container-editorial pointer-events-none absolute inset-x-0 bottom-[max(2.5rem,env(safe-area-inset-bottom))] hidden items-end justify-between lg:flex">
          <span className="label-mono text-ivory/35">
            Character and positioning only
          </span>
          <span className="pointer-events-auto">
            <TextLink href="/destinations" transitionLabel="Destinations">
              All six markets
            </TextLink>
          </span>
        </div>
      )}
    </>
  );
}

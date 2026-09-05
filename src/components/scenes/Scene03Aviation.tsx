"use client";

import { motion, type MotionValue } from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { TextLink } from "@/components/primitives/ActionLink";
import { aviationCapabilities } from "@/lib/content/aviation";
import { ordinal } from "@/lib/utils";

/**
 * SCENE 03 — AVIATION INSTRUMENT
 *
 * The network is the stage and never leaves. Five concepts take the centre
 * one at a time, and each changes what the instrument is doing behind it:
 * trunk routes, then local ones, then new stations arriving at the edges,
 * then the graticule, then accelerated traffic.
 *
 * This replaces the five capability columns that used to arrive at once.
 * One idea per viewport.
 */
const FIRST = 0.2;
const LAST = 0.94;
const COUNT = aviationCapabilities.length;
const SPAN = (LAST - FIRST) / COUNT;

function RailTick({
  emphasis,
  index,
  label,
}: {
  emphasis: MotionValue<number>;
  index: number;
  label: string;
}) {
  const active = useRange(emphasis, [index - 0.7, index, index + 0.7], [0.22, 1, 0.22]);

  return (
    <li className="flex items-center gap-3 lg:gap-4">
      <motion.span
        aria-hidden
        className="block h-px w-5 bg-current lg:w-8"
        style={{ opacity: active }}
      />
      <motion.span className="label-mono whitespace-nowrap" style={{ opacity: active }}>
        {label}
      </motion.span>
    </li>
  );
}

function Instrument({ progress }: { progress: MotionValue<number> }) {
  // The network arrives already built — it carried over from Scene 02.
  const draw = useRange(progress, [0, 0.06], [0.9, 1]);
  const emphasis = useRange(progress, [FIRST, LAST], [0, COUNT - 1]);
  const opacity = useRange(progress, [0, 0.08, 0.9, 1], [0.5, 1, 1, 0.7]);
  const railOpacity = useRange(progress, [0.1, 0.2], [0, 1]);

  return (
    <>
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity }}>
        <RouteNetwork
          progress={draw}
          emphasis={emphasis}
          color="#A0B8C2"
          accent="#C6AD82"
          opacity={0.62}
        />
      </motion.div>

      {/* On a phone the copy has nowhere to sit clear of the network, so the
          ground is lifted behind it rather than dimming the instrument. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-[58%] -translate-y-1/2 bg-[linear-gradient(to_bottom,transparent,var(--color-petrol)_18%,var(--color-petrol)_82%,transparent)] opacity-85 lg:hidden"
      />

      {/* Position through the system. */}
      <motion.ul
        aria-hidden
        className="absolute bottom-[max(2.25rem,env(safe-area-inset-bottom))] left-(--spacing-gutter) flex flex-wrap gap-x-5 gap-y-2 text-ice lg:bottom-auto lg:top-1/2 lg:block lg:-translate-y-1/2 lg:space-y-5"
        style={{ opacity: railOpacity }}
      >
        {aviationCapabilities.map((group, i) => (
          <RailTick key={group.group} emphasis={emphasis} index={i} label={ordinal(i)} />
        ))}
      </motion.ul>
    </>
  );
}

export function Scene03Aviation() {
  return (
    <Scene
      tone="dark"
      length={3.4}
      mobileLength={2.4}
      className="bg-petrol"
      label="Aviation Advisory"
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : <Instrument progress={progress} />}

          {/* Carried over from Scene 02, then reduced to a label. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0, 0.02, 0.1, 0.17]}
            className="container-editorial flex items-center"
          >
            <h2 className="max-w-[13ch] font-display text-[clamp(2.2rem,6.4vw,5.25rem)] leading-[1.03] tracking-[-0.028em]">
              The operation is the strategy.
            </h2>
          </Beat>

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.15, 0.22]}
            rise={12}
            className="container-editorial pointer-events-none pt-[6.5rem] lg:pt-[8.5rem]"
          >
            <span className="label-mono text-ice/60">
              Division 01 — where we are engaged
            </span>
          </Beat>

          {aviationCapabilities.map((group, i) => {
            const start = FIRST + i * SPAN;
            return (
              <Beat
                key={group.group}
                progress={progress}
                reduced={reduced}
                range={[
                  start - 0.03,
                  start + 0.025,
                  start + SPAN - 0.045,
                  start + SPAN + 0.005,
                ]}
                rise={30}
                className="container-editorial flex items-center"
              >
                <div className="max-w-2xl lg:pl-24">
                  <span className="label-mono text-ice/60">{ordinal(i)}</span>
                  <h3 className="mt-6 font-display text-[clamp(2.1rem,5.6vw,4.5rem)] leading-[1.04] tracking-[-0.028em]">
                    {group.group}
                  </h3>
                  <ul className="mt-8 space-y-3">
                    {group.items.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 text-[0.9375rem] leading-relaxed text-ivory/65 lg:text-lead"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.62em] block size-1 shrink-0 rounded-full bg-ice"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Beat>
            );
          })}

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.93, 0.98]}
            rise={14}
            className="container-editorial flex items-end justify-end pb-[max(2.25rem,env(safe-area-inset-bottom))] lg:pb-16"
          >
            <TextLink href="/aviation" transitionLabel="Aviation Advisory">
              The aviation practice
            </TextLink>
          </Beat>
        </>
      )}
    </Scene>
  );
}

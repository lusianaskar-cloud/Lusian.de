"use client";

import { motion, type MotionValue } from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { gulfJourney } from "@/lib/content/gulf";
import { TextLink } from "@/components/primitives/ActionLink";
import { ordinal } from "@/lib/utils";

/**
 * SCENE 06 — THE SEQUENCE
 *
 * Five stages, one at a time, without the viewport moving away. The stage
 * names hold their position throughout; only contrast and scale change, so
 * the reader can see where they are in the sequence at every moment.
 *
 * On a phone the same scene runs with the index laid horizontally at the top
 * — not a shrunken version of the desktop rail, and not five cards.
 */
const FIRST = 0.12;
const LAST = 0.92;
const COUNT = gulfJourney.length;
const SPAN = (LAST - FIRST) / COUNT;

function StageName({
  active,
  index,
  title,
}: {
  active: MotionValue<number>;
  index: number;
  title: string;
}) {
  const opacity = useRange(active, [index - 0.9, index, index + 0.9], [0.22, 1, 0.22]);
  const x = useRange(active, [index - 0.9, index, index + 0.9], [0, 10, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-baseline gap-4 font-display text-[clamp(1.15rem,2.4vw,1.9rem)] leading-tight tracking-tight"
    >
      <span className="label-mono shrink-0 opacity-60">{ordinal(index)}</span>
      <span>{title}</span>
    </motion.li>
  );
}

function StageTick({ active, index }: { active: MotionValue<number>; index: number }) {
  const opacity = useRange(active, [index - 0.8, index, index + 0.8], [0.2, 1, 0.2]);
  return (
    <motion.span
      aria-hidden
      style={{ opacity }}
      className="h-px flex-1 bg-[color:var(--tone-accent)]"
    />
  );
}

function Index({ progress }: { progress: MotionValue<number> }) {
  const active = useRange(progress, [FIRST + SPAN / 2, LAST - SPAN / 2], [0, COUNT - 1]);
  const fill = useRange(progress, [FIRST, LAST], [0, 1]);
  const opacity = useRange(progress, [0.04, 0.12], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="container-editorial pointer-events-none absolute inset-x-0 top-[6.25rem] lg:top-1/2 lg:-translate-y-1/2"
    >
      {/* Phone: a horizontal index across the top. */}
      <div className="flex items-center gap-2 lg:hidden">
        {gulfJourney.map((step, i) => (
          <StageTick key={step.title} active={active} index={i} />
        ))}
      </div>

      {/* Desktop: the names hold position; only contrast moves. */}
      <div className="hidden lg:flex lg:gap-8">
        <div className="relative w-px shrink-0 bg-current/15">
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 block h-full origin-top bg-[color:var(--tone-accent)]"
            style={{ scaleY: fill }}
          />
        </div>
        <ul className="space-y-5">
          {gulfJourney.map((step, i) => (
            <StageName key={step.title} active={active} index={i} title={step.title} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Scene06Sequence() {
  return (
    <Scene
      tone="dark"
      length={3.0}
      mobileLength={2.2}
      className="bg-umber"
      stageClassName="grain"
      label="The private client sequence"
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : (
            <>
              <span aria-hidden className="grain-layer" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(65% 70% at 78% 40%, color-mix(in oklab, var(--color-champagne) 16%, transparent), transparent)",
                }}
              />
              <Index progress={progress} />
            </>
          )}

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0, 0.02, 0.08, 0.13]}
            className="container-editorial flex items-center"
          >
            <h2 className="max-w-[14ch] font-display text-[clamp(2.1rem,6vw,4.75rem)] leading-[1.05] tracking-[-0.028em]">
              Five stages, one{" "}
              <em className="font-normal text-champagne">contact</em>.
            </h2>
          </Beat>

          {gulfJourney.map((step, i) => {
            const start = FIRST + i * SPAN;
            return (
              <Beat
                key={step.title}
                progress={progress}
                reduced={reduced}
                range={[start - 0.02, start + 0.03, start + SPAN - 0.04, start + SPAN + 0.01]}
                rise={26}
                className="container-editorial flex items-center"
              >
                <div className="max-w-2xl pt-16 lg:ml-auto lg:w-6/12 lg:max-w-none lg:pt-0">
                  <span className="label-mono text-champagne/70 lg:hidden">
                    {ordinal(i)}
                  </span>
                  <h3 className="mt-5 font-display text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.04] tracking-[-0.028em] lg:mt-0">
                    {step.title}
                  </h3>
                  <p className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-ivory/65 lg:text-lead">
                    {step.body}
                  </p>
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
            <TextLink href="/private-advisory" transitionLabel="Gulf Private Advisory">
              The private practice
            </TextLink>
          </Beat>
        </>
      )}
    </Scene>
  );
}

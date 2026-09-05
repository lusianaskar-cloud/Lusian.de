"use client";

import { motion, type MotionValue } from "motion/react";

import { useRange } from "@/lib/useRange";
import { useContent } from "@/lib/i18n/context";
import { Surface } from "@/components/light/Surface";
import { Scene, Beat } from "./Scene";

/**
 * SCENE II — TWO WORLDS
 *
 * One volume, lit from two sides. Not two panels: the previous version tiled
 * a cool rectangle beside a warm one, which states the division but not the
 * relationship. Here a cold opening on one side and a warm interior on the
 * other fall on the same surface, and the terminator between them travels
 * with the scroll — so the reader watches one firm change character rather
 * than watching two firms sit next to each other.
 *
 * The type carries the same idea. Aviation takes the structural face narrow
 * and heavy; the private practice takes it wide and light. Same family, two
 * physical temperaments.
 */
export function Scene02TwoWorlds() {
  const { twoWorlds } = useContent().home;

  return (
    <Scene
      tone="dark"
      length={2.9}
      mobileLength={2.1}
      className="bg-obsidian"
      openFrom="var(--color-obsidian)"
      closeTo="var(--color-petrol)"
      label={twoWorlds.labelShort}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : (
            <>
              <Surface preset="terminator" progress={progress} />
              <span aria-hidden className="grain-layer" />
            </>
          )}

          {/* The proposition, before either side has taken the frame. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0, 0.03, 0.13, 0.2]}
            className="container-editorial flex items-center"
          >
            <h2 className="max-w-[15ch]">
              <span className="type-structure block text-[calc(clamp(2.6rem,7.6vw,6.25rem)*var(--ar-struct))]">
                {twoWorlds.headlineLarge}
              </span>
              <span className="type-voice mt-5 block max-w-[26ch] text-[clamp(1rem,1.6vw,1.35rem)] text-ivory/55">
                {twoWorlds.headlineSmall}
              </span>
            </h2>
          </Beat>

          {/* 01, on the cold side. Compressed, dense, quick. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.2, 0.29, 0.46, 0.54]}
            rise={22}
            className="container-editorial voice-cool flex items-center"
          >
            <div className="max-w-xl">
              <span className="type-voice text-[0.9375rem] text-ice/75">
                {twoWorlds.aviation.index}
              </span>
              <p className="type-structure mt-5 text-[calc(clamp(2.2rem,5.6vw,4.5rem)*var(--ar-struct))]">
                {twoWorlds.aviation.line}
              </p>
              <ul className="mt-8 space-y-2">
                {twoWorlds.aviation.points.map((line) => (
                  <li
                    key={line}
                    className="type-voice max-w-md text-[0.9375rem] text-ivory/60"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Beat>

          {/* 02, on the warm side. Open, unhurried, and given more room. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.56, 0.65, 0.83, 0.9]}
            rise={22}
            className="container-editorial voice-warm flex items-center"
          >
            {/*
              Both beats occupy the same place in the frame. Putting 01 on the
              cold side and 02 on the warm side would be two panels, which is
              the thing this scene exists not to be — and it also sets ivory
              type on the brightest part of the warm pool. The reader stands
              in the same spot; the light around them changes.
            */}
            <div className="max-w-xl">
              <span className="type-voice text-[0.9375rem] text-champagne/80">
                {twoWorlds.privateAdvisory.index}
              </span>
              <p className="type-structure mt-5 text-[calc(clamp(2.1rem,5.2vw,4.25rem)*var(--ar-struct))]">
                {twoWorlds.privateAdvisory.line}
              </p>
              <ul className="mt-8 space-y-2">
                {twoWorlds.privateAdvisory.points.map((line) => (
                  <li
                    key={line}
                    className="type-voice max-w-md text-[0.9375rem] text-ivory/60"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Beat>

          {/* Both lights, one volume. */}
          <Settle progress={progress} reduced={reduced} label={twoWorlds.settle} />
        </>
      )}
    </Scene>
  );
}

function Settle({
  progress,
  reduced,
  label,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  label: string;
}) {
  const opacity = useRange(progress, [0.9, 0.97], [0, 1]);
  const width = useRange(progress, [0.9, 1], ["0%", "100%"]);

  if (reduced) {
    return (
      <p className="container-editorial type-voice mt-10 text-ivory/70">{label}</p>
    );
  }

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-[max(3rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-4"
    >
      <motion.span
        aria-hidden
        style={{ width }}
        className="block h-px max-w-[42vw] bg-ivory/25"
      />
      <p className="type-voice text-[0.9375rem] text-ivory/70">
        {label}
      </p>
    </motion.div>
  );
}

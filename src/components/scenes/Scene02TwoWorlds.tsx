"use client";

import {
  motion,
  useMotionTemplate,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useContent, useDirection } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

/**
 * SCENE 02 — TWO WORLDS
 *
 * One firm resolving into two disciplines. A cool field takes the viewport,
 * then yields it as a warm one enters from the opposite side, and both settle
 * into a composed split.
 *
 * The fields are revealed with `clip-path` insets rather than animated width,
 * so nothing reflows — the layers are always full-bleed and only their
 * visible region changes. On a phone the same choreography runs vertically,
 * because a 50/50 vertical split at 393px is not a composition.
 *
 * The horizontal choreography mirrors in Arabic. It has to: 01 is introduced
 * first and 02 answers it, so 01 belongs on the side the reader starts from.
 * A composition where the copy flips and the colour field does not is simply
 * two halves disagreeing.
 *
 * The network's draw is scrubbed to this scene's progress: scrolling builds
 * it. As the balance shifts it begins to morph and warm, which is what Scene
 * 04 completes.
 */
function Fields({ progress }: { progress: MotionValue<number> }) {
  const wide = useMediaQuery("(min-width: 1024px)");
  const rtl = useDirection() === "rtl";

  // Visible extent of each field, as an inset percentage.
  const petrol = useTransform(
    progress,
    [0.14, 0.34, 0.46, 0.62, 0.8, 0.92],
    [100, 14, 14, 66, 66, 50],
  );
  const umber = useRange(progress, [0.44, 0.62, 0.8, 0.92], [100, 34, 34, 50]);

  // Both directions are built unconditionally — a hook cannot sit in a branch.
  const petrolLeft = useMotionTemplate`inset(0% ${petrol}% 0% 0%)`;
  const petrolRight = useMotionTemplate`inset(0% 0% 0% ${petrol}%)`;
  const petrolV = useMotionTemplate`inset(0% 0% ${petrol}% 0%)`;
  const umberRight = useMotionTemplate`inset(0% 0% 0% ${umber}%)`;
  const umberLeft = useMotionTemplate`inset(0% ${umber}% 0% 0%)`;
  const umberV = useMotionTemplate`inset(${umber}% 0% 0% 0%)`;

  const petrolH = rtl ? petrolRight : petrolLeft;
  const umberH = rtl ? umberLeft : umberRight;

  // Hoisted: these feed the join hairline and must not sit inside a branch.
  const joinPosition = useMotionTemplate`calc(100% - ${petrol}%)`;
  const joinOpacity = useRange(progress, [0.82, 0.94], [0, 1]);

  const netDraw = useRange(progress, [0.16, 0.46], [0, 1]);
  const netMorph = useRange(progress, [0.48, 0.78], [0, 0.5]);
  const netOpacity = useRange(progress, [0.16, 0.3, 0.62, 0.86], [0, 1, 1, 0.35]);

  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-petrol"
        style={{ clipPath: wide ? petrolH : petrolV }}
      >
        <motion.div className="absolute inset-0" style={{ opacity: netOpacity }}>
          <RouteNetwork
            progress={netDraw}
            morph={netMorph}
            color="#A0B8C2"
            accent="#C6AD82"
            opacity={0.6}
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="grain absolute inset-0 bg-umber"
        style={{ clipPath: wide ? umberH : umberV }}
      >
        <span className="grain-layer" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 85% at 70% 30%, color-mix(in oklab, var(--color-champagne) 20%, transparent), transparent)",
          }}
        />
        <svg
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-champagne/20"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M -60 ${430 - i * 34} Q 400 ${330 - i * 50} 860 ${430 - i * 34}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </motion.div>

      {/* The join between the two disciplines. */}
      <motion.span
        aria-hidden
        className={cn(
          "absolute bg-ivory/25",
          wide ? "inset-y-0 w-px" : "inset-x-0 h-px",
        )}
        style={
          wide
            ? rtl
              ? { right: joinPosition, opacity: joinOpacity }
              : { left: joinPosition, opacity: joinOpacity }
            : { top: joinPosition, opacity: joinOpacity }
        }
      />
    </>
  );
}

export function Scene02TwoWorlds() {
  const { twoWorlds } = useContent().home;

  return (
    <Scene
      tone="dark"
      length={3.0}
      mobileLength={2.2}
      className="bg-obsidian"
      label={twoWorlds.labelShort}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : <Fields progress={progress} />}

          {/* Opening statement, then its own reduction to a corner label. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0, 0.04, 0.14, 0.22]}
            className="container-editorial flex items-center"
          >
            <h2 className="max-w-[18ch] font-display leading-[1.04] tracking-[-0.028em]">
              <span className="block text-[clamp(2.4rem,7.4vw,6rem)]">
                {twoWorlds.headlineLarge}
              </span>
              <span className="mt-3 block text-[clamp(1.3rem,3vw,2.4rem)] text-ivory/55">
                {twoWorlds.headlineSmall}
              </span>
            </h2>
          </Beat>

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.2, 0.28]}
            rise={12}
            className="container-editorial pointer-events-none pt-[6.5rem] lg:pt-[8.5rem]"
          >
            <span className="label-mono text-ivory/45">
              <span className="lg:hidden">{twoWorlds.labelShort}</span>
              <span className="hidden lg:inline">{twoWorlds.labelLong}</span>
            </span>
          </Beat>

          {/* 01 — Aviation takes the field. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.26, 0.36, 0.5, 0.58]}
            className="container-editorial flex flex-col justify-start pb-16 pt-[7.5rem] lg:justify-end lg:pt-[8.5rem]"
          >
            <div className="max-w-xl">
              <span className="label-mono text-ice/70">{twoWorlds.aviation.index}</span>
              <p className="mt-6 font-display text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.04] tracking-[-0.028em]">
                {twoWorlds.aviation.line}
              </p>
              <ul className="mt-8 space-y-2.5">
                {twoWorlds.aviation.points.map((line) => (
                  <li key={line} className="max-w-md text-[0.9375rem] leading-relaxed text-ivory/60">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Beat>

          {/* 02 — the warm field takes over. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.58, 0.68, 0.82, 0.9]}
            className="container-editorial flex flex-col justify-end pb-16 pt-[7.5rem] lg:pt-[8.5rem]"
          >
            <div className="max-w-xl lg:ms-auto lg:text-end">
              <span className="label-mono text-champagne/70">
                {twoWorlds.privateAdvisory.index}
              </span>
              <p className="mt-6 font-display text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.04] tracking-[-0.028em]">
                {twoWorlds.privateAdvisory.line}
              </p>
              <ul className="mt-8 space-y-2.5 lg:ms-auto">
                {twoWorlds.privateAdvisory.points.map((line) => (
                  <li
                    key={line}
                    className="max-w-md text-[0.9375rem] leading-relaxed text-ivory/60 lg:ms-auto"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Beat>

          {/* Both settle. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.88, 0.96]}
            rise={16}
            className="pointer-events-none flex items-end justify-center pb-[max(3rem,env(safe-area-inset-bottom))]"
          >
            <p className="label-mono text-ivory/70">{twoWorlds.settle}</p>
          </Beat>
        </>
      )}
    </Scene>
  );
}

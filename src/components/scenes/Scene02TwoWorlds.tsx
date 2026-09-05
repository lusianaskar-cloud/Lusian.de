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
 * The network's draw is scrubbed to this scene's progress: scrolling builds
 * it. As the balance shifts it begins to morph and warm, which is what Scene
 * 04 completes.
 */
const aviationLines = [
  "Counsel for airlines, airports, handlers and the public bodies that hold them to standard.",
  "Engaged where a plan has to survive contact with an operation.",
];

const privateLines = [
  "Private establishment across the Gulf, coordinated end to end.",
  "One file. One point of contact. Held in sequence.",
];

function Fields({ progress }: { progress: MotionValue<number> }) {
  const wide = useMediaQuery("(min-width: 1024px)");

  // Visible extent of each field, as an inset percentage.
  const petrol = useTransform(
    progress,
    [0.14, 0.34, 0.46, 0.62, 0.8, 0.92],
    [100, 14, 14, 66, 66, 50],
  );
  const umber = useRange(progress, [0.44, 0.62, 0.8, 0.92], [100, 34, 34, 50]);

  const petrolH = useMotionTemplate`inset(0% ${petrol}% 0% 0%)`;
  const petrolV = useMotionTemplate`inset(0% 0% ${petrol}% 0%)`;
  const umberH = useMotionTemplate`inset(0% 0% 0% ${umber}%)`;
  const umberV = useMotionTemplate`inset(${umber}% 0% 0% 0%)`;

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
            ? { left: joinPosition, opacity: joinOpacity }
            : { top: joinPosition, opacity: joinOpacity }
        }
      />
    </>
  );
}

export function Scene02TwoWorlds() {
  return (
    <Scene
      tone="dark"
      length={3.0}
      mobileLength={2.2}
      className="bg-obsidian"
      label="Two divisions"
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
            <h2 className="max-w-[16ch] font-display text-[clamp(2.1rem,6vw,4.75rem)] leading-[1.06] tracking-[-0.028em]">
              Two disciplines.
              <br />
              One standard of{" "}
              <em className="font-normal text-champagne">execution</em>.
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
              Two disciplines · One standard of execution
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
              <span className="label-mono text-ice/70">01 — Aviation Advisory</span>
              <p className="mt-6 font-display text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.04] tracking-[-0.028em]">
                The operation is the strategy.
              </p>
              <ul className="mt-8 space-y-2.5">
                {aviationLines.map((line) => (
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
            <div className="max-w-xl lg:ml-auto lg:text-right">
              <span className="label-mono text-champagne/70">
                02 — Gulf Private Advisory
              </span>
              <p className="mt-6 font-display text-[clamp(2rem,5.2vw,4.25rem)] leading-[1.04] tracking-[-0.028em]">
                A move made quietly, and made once.
              </p>
              <ul className="mt-8 space-y-2.5 lg:ml-auto">
                {privateLines.map((line) => (
                  <li
                    key={line}
                    className="max-w-md text-[0.9375rem] leading-relaxed text-ivory/60 lg:ml-auto"
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
            <p className="label-mono text-ivory/70">One firm</p>
          </Beat>
        </>
      )}
    </Scene>
  );
}

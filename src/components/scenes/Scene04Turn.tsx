"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";

/**
 * SCENE 04 — THE TURN
 *
 * The one connective moment between the two practices. The route network is
 * not cross-faded out with a new graphic faded in; the same nodes travel to
 * horizon bands, the arcs flatten, the palette warms, and what was a route
 * map resolves into architectural contour. One geometry, one transformation
 * — which is what makes the two businesses read as a single system.
 */
function TurnGround({ progress }: { progress: MotionValue<number> }) {
  const morph = useRange(progress, [0.04, 0.74], [0, 1]);
  const drawn = useMotionValue(1);
  const ground = useTransform(
    progress,
    [0.02, 0.62],
    ["rgb(11,26,33)", "rgb(31,23,19)"],
  );
  const netOpacity = useRange(progress, [0, 0.1, 0.86, 1], [0.7, 1, 1, 0.55]);

  return (
    <>
      <motion.div aria-hidden className="absolute inset-0" style={{ backgroundColor: ground }} />
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity: netOpacity }}>
        <RouteNetwork
          progress={drawn}
          morph={morph}
          color="#A0B8C2"
          accent="#C6AD82"
          warm="#C6AD82"
          opacity={0.62}
          traffic={false}
        />
      </motion.div>
    </>
  );
}

export function Scene04Turn() {
  return (
    <Scene
      tone="dark"
      length={2.0}
      mobileLength={1.5}
      className="bg-umber"
      label="Between the practices"
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? (
            <div aria-hidden className="absolute inset-0 bg-umber" />
          ) : (
            <TurnGround progress={progress} />
          )}

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.46, 0.6, 0.9, 0.99]}
            rise={34}
            className="container-editorial flex items-center"
          >
            <p className="max-w-[15ch] font-display text-[clamp(2.2rem,6.4vw,5.25rem)] leading-[1.04] tracking-[-0.028em]">
              Precision, turned <em className="font-normal text-champagne">inward</em>.
            </p>
          </Beat>
        </>
      )}
    </Scene>
  );
}

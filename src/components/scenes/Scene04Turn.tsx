"use client";

import { motion, useMotionValue } from "motion/react";

import { useRange } from "@/lib/useRange";
import { useContent } from "@/lib/i18n/context";
import { Surface } from "@/components/light/Surface";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { Scene, Beat } from "./Scene";

/**
 * SCENE IV — THE TURN
 *
 * The one connective moment, and the most important transition on the page.
 * Nothing is cross-faded out and replaced: the same geometry travels to
 * horizon bands, the arcs flatten, the palette warms, and the cold light
 * gives way to a warm opening underneath it. One system, changing character
 * — which is the whole argument of the firm, made physically.
 *
 * It is also where the instrument earns the right to go quiet. The network
 * fades to almost nothing by the end of this scene and does not return until
 * the markets, because the private practice needs stillness more than it
 * needs continuity.
 */
export function Scene04Turn() {
  const { turn } = useContent().home;

  return (
    <Scene
      tone="dark"
      length={2.2}
      mobileLength={1.6}
      className="bg-umber"
      openFrom="var(--color-petrol)"
      closeTo="var(--color-umber)"
      stageClassName="voice-warm"
      label={turn.line}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? (
            <div aria-hidden className="absolute inset-0 bg-umber" />
          ) : (
            <Turning progress={progress} />
          )}

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.42, 0.56, 0.88, 0.99]}
            rise={30}
            className="container-editorial flex items-center"
          >
            <p className="type-structure max-w-[13ch] text-[calc(clamp(2.4rem,6.6vw,5.75rem)*var(--ar-struct))]">
              {turn.line}
            </p>
          </Beat>
        </>
      )}
    </Scene>
  );
}

function Turning({ progress }: { progress: import("motion/react").MotionValue<number> }) {
  const morph = useRange(progress, [0.05, 0.72], [0, 1]);
  const drawn = useMotionValue(1);
  // The system withdraws rather than being switched off.
  const netOpacity = useRange(progress, [0, 0.12, 0.62, 0.92], [0.75, 0.95, 0.7, 0.06]);
  // The cold field gives way to the warm one underneath it.
  const cold = useRange(progress, [0.08, 0.6], [1, 0]);

  return (
    <>
      <Surface preset="aperture" progress={progress} />
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity: cold }}>
        <Surface preset="terminator" progress={progress} still={0.2} />
      </motion.div>
      <motion.div aria-hidden className="absolute inset-0" style={{ opacity: netOpacity }}>
        <RouteNetwork
          progress={drawn}
          morph={morph}
          color="#A8C6D2"
          accent="#C6AD82"
          warm="#C6AD82"
          opacity={0.6}
          traffic={false}
        />
      </motion.div>
      <span aria-hidden className="grain-layer" />
    </>
  );
}

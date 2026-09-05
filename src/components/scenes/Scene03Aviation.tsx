"use client";

import { motion, type MotionValue } from "motion/react";

import { useRange } from "@/lib/useRange";
import { useContent } from "@/lib/i18n/context";
import { Surface } from "@/components/light/Surface";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { TextLink } from "@/components/primitives/ActionLink";
import { Scene, Beat } from "./Scene";

/**
 * SCENE III — THE OPERATION
 *
 * The first proof that the redesign is not abstract. A floor, lit low and
 * hard from one side, with the operational system drawn over it — so the
 * network has something to sit on rather than floating in a void, which is
 * what made it read as decoration before.
 *
 * The capabilities arrive one at a time as structural type, deliberately
 * large enough to be cropped by the frame, and the field behind reorganises
 * around each. What it does not do is present five columns at once, which is
 * a document, not a scene.
 */
const FIRST = 0.22;
const LAST = 0.95;

function Field({
  progress,
  count,
}: {
  progress: MotionValue<number>;
  count: number;
}) {
  const draw = useRange(progress, [0, 0.1], [0.72, 1]);
  const emphasis = useRange(progress, [FIRST, LAST], [0, count - 1]);
  const opacity = useRange(progress, [0, 0.12, 0.86, 1], [0.3, 0.9, 0.9, 0.5]);
  // Camera: the frame pushes slowly into the system across the scene.
  const scale = useRange(progress, [0, 1], [1, 1.16]);
  const drift = useRange(progress, [0, 1], ["0%", "-4%"]);

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 origin-[70%_60%]"
      style={{ opacity, scale, x: drift }}
    >
      <RouteNetwork
        progress={draw}
        emphasis={emphasis}
        color="#A8C6D2"
        accent="#C6AD82"
        opacity={0.72}
      />
    </motion.div>
  );
}

export function Scene03Aviation() {
  const content = useContent();
  const { capabilities, title } = content.aviation;
  const scene = content.home.aviationScene;
  const groups = capabilities.groups;
  const span = (LAST - FIRST) / groups.length;

  return (
    <Scene
      tone="dark"
      length={3.6}
      mobileLength={2.5}
      className="bg-petrol"
      closeTo="var(--color-petrol)"
      stageClassName="voice-cool"
      label={title}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : (
            <>
              <Surface preset="hangar" progress={progress} travel={0.34} />
              <Field progress={progress} count={groups.length} />
              <span aria-hidden className="grain-layer" />
            </>
          )}

          {/* Carried over from the previous scene, then reduced to a label. */}
          <Beat
            progress={progress}
            reduced={reduced}
            range={[0, 0.02, 0.11, 0.18]}
            className="container-editorial flex items-center"
          >
            <h2 className="type-structure max-w-[12ch] text-[calc(clamp(2.6rem,7.4vw,6.5rem)*var(--ar-struct))]">
              {scene.opening}
            </h2>
          </Beat>

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.16, 0.23]}
            rise={10}
            className="container-editorial pointer-events-none pt-[6.5rem] lg:pt-[8.5rem]"
          >
            <span className="type-voice text-[0.875rem] tracking-[0.03em] text-ice/70">
              {scene.eyebrow}
            </span>
          </Beat>

          {groups.map((group, i) => {
            const start = FIRST + i * span;
            return (
              <Beat
                key={group.group}
                progress={progress}
                reduced={reduced}
                /*
                  Each capability is gone before the next arrives. Overlapping
                  the ranges cross-fades two five-word headings through each
                  other, which at tablet sizes reads as one unparseable
                  heading rather than as a transition.
                */
                range={[
                  start - 0.025,
                  start + 0.03,
                  start + span - 0.06,
                  start + span - 0.03,
                ]}
                rise={26}
                className="container-editorial flex items-center"
              >
                <div className="max-w-[22ch]">
                  {/*
                    Set large enough that the longest of these runs past the
                    frame edge. A capability that fits comfortably in a column
                    reads as a list item; one that is cropped reads as scale.
                  */}
                  <h3 className="type-structure text-[calc(clamp(2.4rem,6.4vw,5.5rem)*var(--ar-struct))]">
                    {group.group}
                  </h3>
                  <ul className="mt-9 space-y-2.5">
                    {group.items.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="type-voice max-w-md text-[0.9375rem] text-ivory/60"
                      >
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
            range={[0.8, 0.85, 0.92, 0.96]}
            rise={12}
            className="container-editorial z-20 flex items-end justify-end pb-[max(2.25rem,env(safe-area-inset-bottom))] lg:pb-16"
          >
            <TextLink href="/aviation" transitionLabel={title}>
              {scene.link}
            </TextLink>
          </Beat>
        </>
      )}
    </Scene>
  );
}

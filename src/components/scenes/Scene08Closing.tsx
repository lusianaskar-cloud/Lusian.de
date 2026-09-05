"use client";

import { motion, type MotionValue } from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { ActionLink } from "@/components/primitives/ActionLink";
import { contactChannels } from "@/lib/content/site";
import { useContent } from "@/lib/i18n/context";

/**
 * SCENE 08 — CLOSING
 *
 * The page strips itself back. A single hairline horizon — the geometry the
 * site opened on — draws across an empty field, the closing line straddles
 * it, then the line retracts to a point and only the invitation remains.
 *
 * Deliberately the stillest scene on the site. After seven scenes of
 * movement, restraint is the argument.
 */
function Horizon({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useRange(progress, [0.05, 0.4, 0.62, 0.82], [0, 1, 1, 0.02]);
  const opacity = useRange(progress, [0.05, 0.2, 0.78, 0.9], [0, 1, 1, 0.35]);

  return (
    <motion.span
      aria-hidden
      className="absolute inset-x-(--spacing-gutter) top-1/2 block h-px origin-center bg-champagne"
      style={{ scaleX, opacity }}
    />
  );
}

export function Scene08Closing() {
  const { closing } = useContent().home;

  return (
    <Scene
      tone="dark"
      length={1.9}
      mobileLength={1.5}
      className="bg-ink"
      stageClassName="grain"
      label={closing.headline}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : (
            <>
              <span aria-hidden className="grain-layer" />
              <Horizon progress={progress} />
            </>
          )}

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.2, 0.36, 0.72, 0.86]}
            rise={40}
            className="container-editorial flex items-center"
          >
            <h2 className="max-w-[12ch] font-display text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.98] tracking-[-0.032em]">
              {closing.headline}
            </h2>
          </Beat>

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.74, 0.86]}
            rise={26}
            className="container-editorial flex flex-col justify-center gap-10"
          >
            <p className="max-w-md text-lead text-ivory/60">{closing.body}</p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              <ActionLink href="/speak" transitionLabel={closing.cta}>
                {closing.cta}
              </ActionLink>
              <a
                href={`mailto:${contactChannels.email}`}
                dir="ltr"
                className="label-mono text-ivory/40 underline-offset-8 transition-colors duration-500 hover:text-champagne hover:underline"
              >
                {contactChannels.email}
              </a>
            </div>
          </Beat>
        </>
      )}
    </Scene>
  );
}

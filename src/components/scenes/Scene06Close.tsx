"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

import { useRange } from "@/lib/useRange";
import { useContent } from "@/lib/i18n/context";
import { Surface } from "@/components/light/Surface";
import { RouteNetwork } from "@/components/aviation/RouteNetwork";
import { ActionLink } from "@/components/primitives/ActionLink";
import { contactChannels } from "@/lib/content/site";
import { Scene } from "./Scene";

/**
 * SCENE VI — THE CLOSE
 *
 * Almost nothing happens, which is the point. Three events, spaced far
 * enough apart that each one is alone in the frame, and then a long
 * stillness that the rest of the page has paid for.
 *
 * 1. The instrument returns for the last time and resolves into a point.
 *    It is the same geometry the site has carried since Scene II, retracting
 *    its own draw and collapsing on its centre — not a new graphic, and not
 *    a decoration switched off. Then it is gone, and it does not come back.
 * 2. The light settles. `terminator` is the condition Scene II was lit by —
 *    one volume between a cold opening and a warm interior — so the page
 *    ends on the picture of the firm it began arguing for. It is dimmed by
 *    exposure rather than covered by a gradient.
 * 3. The invitation. The statement dims to a low tone as the call arrives,
 *    so the two never compete for the same light. Nothing else is on screen:
 *    no eyebrow, no rule, no index, no scroll cue.
 *
 * The final quarter of the scene is deliberately without any event at all.
 */
function Settling({ progress }: { progress: MotionValue<number> }) {
  // The instrument retracts its own draw, then collapses to a point.
  const draw = useRange(progress, [0.02, 0.32], [0.9, 0]);
  const morph = useMotionValue(1);
  const scale = useRange(progress, [0.05, 0.38], [1, 0.03]);
  const netOpacity = useRange(progress, [0, 0.16, 0.3, 0.42], [0.6, 0.62, 0.5, 0]);

  /*
   * Exposure closing down, not a gradient laid over the top. It starts part
   * closed: this scene opens on a room already going dark, which is what lets
   * the collapsing instrument read against it instead of washing out.
   */
  const dusk = useRange(progress, [0, 0.2, 0.7], [0.25, 0.5, 0.7]);

  return (
    <>
      <Surface preset="terminator" progress={progress} travel={-0.16} />
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-center"
        style={{ opacity: netOpacity, scale }}
      >
        <RouteNetwork
          progress={draw}
          morph={morph}
          color="#A8C6D2"
          warm="#C6AD82"
          accent="#C6AD82"
          opacity={0.62}
          traffic={false}
        />
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-obsidian"
        style={{ opacity: dusk }}
      />
    </>
  );
}

export function Scene06Close() {
  const { closing } = useContent().home;

  return (
    <Scene
      tone="dark"
      length={2.4}
      mobileLength={1.7}
      className="bg-obsidian"
      label={closing.headline}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? null : <Settling progress={progress} />}
          <Invitation progress={progress} reduced={reduced} />
        </>
      )}
    </Scene>
  );
}

function Invitation({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const { closing } = useContent().home;

  /*
   * The statement does not leave; it stops being the lit thing. Competition
   * is resolved by light, which is how it is resolved everywhere else on
   * this page, rather than by blanking the screen.
   */
  const headOpacity = useRange(progress, [0.3, 0.46, 0.6, 0.74], [0, 1, 1, 0.3]);
  const headY = useRange(progress, [0.3, 0.46], [38, 0]);
  const callOpacity = useRange(progress, [0.66, 0.82], [0, 1]);
  const callY = useRange(progress, [0.66, 0.82], [28, 0]);
  const pointerEvents = useTransform(progress, (v) => (v > 0.72 ? "auto" : "none"));
  const visibility = useTransform(progress, (v) => (v > 0.66 ? "visible" : "hidden"));

  return (
    <div
      className={
        reduced
          ? "container-editorial relative flex flex-col justify-center gap-14"
          : "container-editorial absolute inset-0 flex flex-col justify-center gap-12 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[6.5rem] lg:gap-14 lg:pb-16 lg:pt-[8.5rem]"
      }
    >
      <motion.div style={reduced ? undefined : { opacity: headOpacity, y: headY }}>
        <h2 className="type-statement max-w-[12ch] text-[calc(clamp(2.4rem,7.6vw,6rem)*var(--ar-state))] [&:lang(ar)]:text-[clamp(2.6rem,8vw,6.4rem)]">
          {closing.headline}
        </h2>
      </motion.div>

      <motion.div
        className="flex flex-col gap-9"
        style={
          reduced
            ? undefined
            : { opacity: callOpacity, y: callY, pointerEvents, visibility }
        }
      >
        <p className="type-voice max-w-md text-[0.9375rem] text-ivory/55">
          {closing.body}
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <ActionLink href="/speak" transitionLabel={closing.cta}>
            {closing.cta}
          </ActionLink>
          <a
            href={`mailto:${contactChannels.email}`}
            dir="ltr"
            className="type-voice text-[0.8125rem] tracking-[0.04em] text-ivory/40 underline-offset-8 transition-colors duration-500 hover:text-champagne hover:underline"
          >
            {contactChannels.email}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

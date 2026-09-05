"use client";

import { motion, useMotionTemplate, useTransform, type MotionValue } from "motion/react";

import { useRange } from "@/lib/useRange";
import { useContent, useDirection } from "@/lib/i18n/context";
import { Surface } from "@/components/light/Surface";
import { TextLink } from "@/components/primitives/ActionLink";
import { markets } from "@/lib/content/markets";
import { Scene } from "./Scene";
import { cn } from "@/lib/utils";

/**
 * SCENE V — ARRIVAL
 *
 * The emotional high point, and the slowest thing on the page. Where the
 * aviation scene pushes the camera into a system, this one barely moves: a
 * room, an opening, and light crossing it for a long time.
 *
 * Three movements, each owning its own frames:
 *
 * · **The opening.** A horizontal slot of late light widens until it is the
 *   whole room. The statement is inside the slot, so it is revealed by the
 *   light rather than faded in over it. Cool and vertical in Scene I; warm
 *   and horizontal here — the same physics, a different space.
 * · **The ledger.** Four fragments scattered through the room at different
 *   depths converge into a single column. That is the private practice's
 *   entire argument — hundreds of decisions, held in sequence — enacted
 *   rather than described. Four things become one thing, and then the one
 *   thing leaves as one thing.
 * · **Possibility.** Six places, named and nothing more. No plot, no bodies,
 *   no six near-identical blocks: the geography belongs to the destinations
 *   page, and what belongs here is the fact that there is a choice.
 *
 * The instrument does not appear. It withdrew during the turn and stays gone
 * until the close, because this scene is about a person's life and technical
 * geometry has nothing useful to say about it.
 */

/** Softness of the aperture edge, as a percentage of the stage. */
const SOFT = 9;

/**
 * Where each fragment sits in the room before it converges.
 *
 * `x` is measured inward from the reading edge and flipped for RTL, so the
 * spread is the same shape in Arabic as in English. The outward excursions
 * are kept inside the gutter: a fragment that leaves the frame is cropped by
 * the stage, and a cropped first letter of a four-word line reads as a
 * clipping bug rather than as depth.
 */
const SCATTER = [
  { x: -4, y: -21, scale: 1.85 },
  { x: 28, y: 11, scale: 0.62 },
  { x: 14, y: 28, scale: 1.24 },
  { x: -3, y: -7, scale: 0.8 },
];

function Room({
  progress,
  children,
}: {
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  /*
   * The aperture. `top` and `bottom` are the outer edges of the opening; the
   * mask is fully opaque SOFT inside each of them, so the boundary is always
   * a shoulder of light and never a cut. The initial slot is wider than two
   * shoulders, or the stops would collapse into each other.
   */
  const top = useRange(progress, [0.02, 0.3], [38, -SOFT]);
  const bottom = useRange(progress, [0.02, 0.3], [62, 100 + SOFT]);
  const mask = useMotionTemplate`linear-gradient(to bottom, transparent ${top}%, #000 calc(${top}% + ${SOFT}%), #000 calc(${bottom}% - ${SOFT}%), transparent ${bottom}%)`;

  // The room breathes. Slower than any camera move on the page.
  const scale = useRange(progress, [0, 1], [1, 1.05]);

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Surface preset="stone" progress={progress} travel={0.7} />
      </motion.div>
      {children}
    </motion.div>
  );
}

function Fragment({
  progress,
  index,
  flip,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  flip: number;
  children: React.ReactNode;
}) {
  const from = SCATTER[index % SCATTER.length];
  const enter = 0.42 + index * 0.02;
  const settled = 0.6;
  /*
   * `--scatter` is how far the room is, and it is set by the ledger's own
   * container. A phone is not a small desktop: at 393px the desktop spread
   * throws four-word fragments past both edges, so there the movement is
   * mostly an accumulation — the lines arrive one after another and stay —
   * with just enough displacement left to read as depth rather than as a
   * list appearing.
   */

  const opacity = useRange(
    progress,
    [enter, enter + 0.05, 0.66, 0.72],
    [0, 0.5, 1, 0],
  );
  const xv = useRange(progress, [enter, settled], [from.x * flip, 0]);
  const x = useMotionTemplate`calc(${xv}vw * var(--scatter))`;
  const depth = useRange(progress, [enter, settled], [from.scale - 1, 0]);
  const scale = useMotionTemplate`calc(1 + ${depth} * var(--scatter))`;
  /*
   * One `y`, not a scatter offset plus a separate lift: they are the same
   * transform, and setting both leaves whichever Motion writes last.
   * The column, having become one object, leaves as one object.
   */
  const yv = useRange(progress, [enter, settled, 0.66, 0.72], [from.y, 0, 0, -6]);
  const y = useMotionTemplate`calc(${yv}vh * var(--scatter))`;

  return (
    <motion.span
      /* Scaled from the reading edge, not the centre: a full-width block
         grown from its middle carries start-aligned text off the frame. */
      className="type-structure block origin-left text-[calc(clamp(1.15rem,4.4vw,3.6rem)*var(--ar-struct))] rtl:origin-right"
      style={{ opacity, x, y, scale }}
    >
      {children}
    </motion.span>
  );
}

function Place({
  progress,
  index,
  name,
  code,
}: {
  progress: MotionValue<number>;
  index: number;
  name: string;
  code: string;
}) {
  const enter = 0.8 + index * 0.015;
  const opacity = useRange(progress, [enter, enter + 0.045, 0.97, 1], [0, 1, 1, 0]);
  const y = useRange(progress, [enter, enter + 0.045], [14, 0]);

  return (
    <motion.li style={{ opacity, y }} className="flex items-baseline gap-2.5">
      <span className="type-voice text-[calc(clamp(1.05rem,2vw,1.5rem)*var(--ar-struct))] text-ivory/90">
        {name}
      </span>
      <span dir="ltr" className="type-voice text-[0.75rem] tracking-[0.14em] text-brass/70">
        {code}
      </span>
    </motion.li>
  );
}

export function Scene05Arrival() {
  const content = useContent();
  const { arrival, sequence } = content.home;
  const scene = content.home.markets;
  const dir = useDirection();
  const flip = dir === "rtl" ? -1 : 1;

  return (
    <Scene
      tone="dark"
      length={4.2}
      mobileLength={2.8}
      className="bg-umber"
      openFrom="var(--color-umber)"
      stageClassName="voice-warm"
      label={arrival.headline}
    >
      {({ progress, reduced }) =>
        reduced ? (
          <Still />
        ) : (
          <>
            <Room progress={progress}>
              <Statement progress={progress} headline={arrival.headline} />
            </Room>

            {/* The ledger. One statement, drawn as four fragments in a room. */}
            <p className="container-editorial absolute inset-0 flex flex-col justify-center gap-2 [--scatter:0.34] md:[--scatter:0.62] xl:[--scatter:1]">
              {arrival.closing.map((line, i) => (
                <Fragment key={line} progress={progress} index={i} flip={flip}>
                  {line}
                </Fragment>
              ))}
            </p>

            <Possibility progress={progress} />

            <Wayfinding
              progress={progress}
              sequenceLink={sequence.link}
              marketsLink={scene.link}
              privateTitle={content.gulf.title}
              marketsTitle={content.markets.eyebrow}
            />
          </>
        )
      }
    </Scene>
  );
}

function Statement({
  progress,
  headline,
}: {
  progress: MotionValue<number>;
  headline: string;
}) {
  // Lit by the opening, not faded over it: it resolves as the slot widens.
  const opacity = useRange(progress, [0.1, 0.24, 0.34, 0.4], [0, 1, 1, 0]);
  const y = useRange(progress, [0.1, 0.24, 0.34, 0.4], [22, 0, 0, -26]);

  return (
    <motion.h2
      style={{ opacity, y }}
      className={cn(
        "container-editorial absolute inset-0 flex items-center",
        "type-statement",
      )}
    >
      <span className="block max-w-[15ch] text-[calc(clamp(2.2rem,6.6vw,5.5rem)*var(--ar-state))]">
        {headline}
      </span>
    </motion.h2>
  );
}

function Possibility({ progress }: { progress: MotionValue<number> }) {
  const content = useContent();
  const { entries } = content.markets;
  const scene = content.home.markets;

  /*
   * It leaves exactly as the stage releases. A pinned scene that still has
   * type in it when it un-pins gets that type cut by the section edge, and a
   * bisected headline is indistinguishable from a layout bug in a still.
   */
  const opacity = useRange(progress, [0.72, 0.79, 0.97, 1], [0, 1, 1, 0]);
  const y = useRange(progress, [0.72, 0.79], [26, 0]);

  return (
    <div className="container-editorial absolute inset-0 flex flex-col justify-center">
      <motion.h3
        style={{ opacity, y }}
        className="type-structure max-w-[16ch] text-[calc(clamp(1.8rem,4.4vw,3.6rem)*var(--ar-struct))]"
      >
        {scene.headline}
      </motion.h3>
      <ul className="mt-12 flex max-w-2xl flex-wrap gap-x-9 gap-y-3.5 lg:mt-14">
        {markets.map((market, i) => (
          <Place
            key={market.id}
            progress={progress}
            index={i}
            name={entries[market.id].name}
            code={market.code}
          />
        ))}
      </ul>
    </div>
  );
}

function Wayfinding({
  progress,
  sequenceLink,
  marketsLink,
  privateTitle,
  marketsTitle,
}: {
  progress: MotionValue<number>;
  sequenceLink: string;
  marketsLink: string;
  privateTitle: string;
  marketsTitle: string;
}) {
  const opacity = useRange(progress, [0.9, 0.95], [0, 1]);
  // Links that have not arrived yet must not be clickable or focusable.
  const pointerEvents = useTransform(progress, (v) => (v > 0.91 ? "auto" : "none"));
  const visibility = useTransform(progress, (v) => (v > 0.9 ? "visible" : "hidden"));

  return (
    <motion.div
      style={{ opacity, pointerEvents, visibility }}
      className="container-editorial absolute inset-x-0 z-20 bottom-[max(2.25rem,env(safe-area-inset-bottom))] flex flex-wrap items-center gap-x-10 gap-y-3 lg:bottom-16"
    >
      <TextLink href="/private-advisory" transitionLabel={privateTitle}>
        {sequenceLink}
      </TextLink>
      <TextLink href="/destinations" transitionLabel={marketsTitle}>
        {marketsLink}
      </TextLink>
    </motion.div>
  );
}

/**
 * Reduced motion. Same room, same words, same order — held still, with the
 * light painted once at the position the scene settles on.
 */
function Still() {
  const content = useContent();
  const { arrival, sequence } = content.home;
  const scene = content.home.markets;
  const { entries } = content.markets;

  return (
    <div className="relative">
      <Surface preset="stone" still={0.62} className="opacity-70" />
      <div className="container-editorial relative flex flex-col gap-16">
        <h2 className="type-statement max-w-[15ch] text-[calc(clamp(2.2rem,6.6vw,4.5rem)*var(--ar-state))]">
          {arrival.headline}
        </h2>
        <p className="flex flex-col gap-2">
          {arrival.closing.map((line) => (
            <span key={line} className="type-structure block text-[calc(clamp(1.45rem,3.6vw,2.5rem)*var(--ar-struct))]">
              {line}
            </span>
          ))}
        </p>
        <div>
          <h3 className="type-structure max-w-[16ch] text-[calc(clamp(1.8rem,4.4vw,3rem)*var(--ar-struct))]">
            {scene.headline}
          </h3>
          <ul className="mt-9 flex max-w-2xl flex-wrap gap-x-9 gap-y-3.5">
            {markets.map((market) => (
              <li key={market.id} className="flex items-baseline gap-2.5">
                <span className="type-voice text-[1.0625rem] text-ivory/85">
                  {entries[market.id].name}
                </span>
                <span dir="ltr" className="type-voice text-[0.75rem] tracking-[0.14em] text-brass/70">
                  {market.code}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          <TextLink href="/private-advisory" transitionLabel={content.gulf.title}>
            {sequence.link}
          </TextLink>
          <TextLink href="/destinations" transitionLabel={content.markets.eyebrow}>
            {scene.link}
          </TextLink>
        </div>
      </div>
    </div>
  );
}

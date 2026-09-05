"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useMotionTemplate, type MotionValue } from "motion/react";

import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import { useRange } from "@/lib/useRange";
import { useContent } from "@/lib/i18n/context";
import { splitAccent } from "@/lib/i18n/format";
import { Surface } from "@/components/light/Surface";
import { useIntroReady } from "@/components/chrome/intro";
import { setStageTone } from "@/components/chrome/stageTone";
import { cn } from "@/lib/utils";

/**
 * SCENE I — HORIZON
 *
 * ── Why this is a mask and not a plate ──────────────────────────────────
 * The previous version raised a hard-edged rectangle through the sentence.
 * Moving, it read as an inversion; paused — which is how most people meet a
 * scroll animation, and how every screenshot meets it — it read as a
 * clipping bug, because a straight edge cutting a glyph in half is exactly
 * what a broken layout looks like.
 *
 * So the horizon is now a light terminator with a real penumbra: a soft band
 * roughly a fifth of the viewport deep, applied as a mask to both the dark
 * ground and the inverted copy of the sentence. A glyph is never half-cut;
 * it is lit, or in shadow, or in the gradient between the two — which is a
 * condition, not an artefact. There is no scroll position at which the frame
 * can look accidental.
 *
 * The sentence is drawn twice at identical coordinates — dark on the lit
 * wall, ivory inside the shadow — sharing one set of MotionValues so the two
 * copies cannot drift. Only the first carries the <h1>.
 */

/** Depth of the penumbra, as a percentage of the stage. */
const PENUMBRA = 19;

function Statement({
  reduced,
  inverted,
  ready,
}: {
  reduced: boolean;
  inverted?: boolean;
  ready: boolean;
}) {
  const { hero } = useContent().home;
  const Heading = inverted ? "p" : "h1";

  return (
    <Heading
      aria-hidden={inverted || undefined}
      className={cn(
        "type-statement text-[calc(clamp(2.5rem,8.2vw,6.75rem)*var(--ar-state))]",
      )}
    >
      {hero.lines.map((line, i) => {
        const part = splitAccent(line.text, line.accent);
        return (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={reduced ? false : { y: "115%" }}
              animate={ready ? { y: "0%" } : undefined}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.14 }}
            >
              {part.before}
              {part.accent ? (
                <em
                  className={cn(
                    "font-normal not-italic",
                    inverted ? "text-champagne" : "text-brass",
                  )}
                >
                  {part.accent}
                </em>
              ) : null}
              {part.after}
            </motion.span>
          </span>
        );
      })}
    </Heading>
  );
}

/**
 * One of the two worlds. Both are drawn at the same coordinates; the shadow
 * copy is revealed by the terminator mask.
 */
function World({
  reduced,
  inverted,
  ready,
  scale,
  lift,
  resolve,
  resolveLift,
  close,
  closeLift,
}: {
  reduced: boolean;
  inverted?: boolean;
  ready: boolean;
  scale: MotionValue<number>;
  lift: MotionValue<string>;
  resolve: MotionValue<number>;
  resolveLift: MotionValue<string>;
  close: MotionValue<number>;
  closeLift: MotionValue<string>;
}) {
  const { home, meta, ui } = useContent();

  return (
    <div className="absolute inset-0 h-[100lvh]">
      <div
        className={cn(
          "container-editorial relative h-full",
          reduced && "flex flex-col justify-center gap-14 py-28",
        )}
      >
        <p
          className={cn(
            "type-voice text-[0.8125rem] tracking-[0.02em] text-current/55",
            !reduced && "absolute start-(--spacing-gutter) top-28 lg:top-36",
          )}
        >
          {meta.descriptorShort}
        </p>

        {/*
          The sentence is the one persistent object in this scene. The camera
          pulls back from it rather than fading it out, so the room it sits in
          becomes visible and the space below it is vacated for what follows.
        */}
        <motion.div
          className={cn(
            "origin-top",
            !reduced && "absolute inset-x-(--spacing-gutter) top-[42%] -translate-y-1/2",
          )}
          style={reduced ? undefined : { scale, y: lift }}
        >
          <Statement reduced={reduced} inverted={inverted} ready={ready} />
        </motion.div>

        {/* Beat two, in the space the pull-back opened. */}
        <motion.p
          className={cn(
            "type-structure max-w-[19ch] text-[calc(clamp(1.6rem,3.4vw,2.9rem)*var(--ar-struct))]",
            !reduced && "absolute inset-x-(--spacing-gutter) top-[58%]",
          )}
          style={reduced ? { marginTop: "2rem" } : { opacity: resolve, y: resolveLift }}
          aria-hidden={inverted || undefined}
        >
          {home.hero.resolve}
        </motion.p>

        {/* Beat three — why the firm exists, arriving as the room settles. */}
        <motion.p
          className={cn(
            "type-structure max-w-[17ch] text-[calc(clamp(1.75rem,4vw,3.4rem)*var(--ar-struct))]",
            !reduced && "absolute inset-x-(--spacing-gutter) top-[56%]",
          )}
          style={reduced ? { marginTop: "2rem" } : { opacity: close, y: closeLift }}
          aria-hidden={inverted || undefined}
        >
          {home.manifesto.headline}
        </motion.p>

        {reduced ? null : (
          <span
            aria-hidden
            className="type-voice absolute bottom-[max(2.25rem,env(safe-area-inset-bottom))] start-(--spacing-gutter) flex items-center gap-3 text-[0.8125rem] text-current/45"
          >
            <span className="relative block h-8 w-px overflow-hidden bg-current/25">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 block h-3 motion-safe:animate-[scrollcue_2.8s_cubic-bezier(0.65,0,0.35,1)_infinite]",
                  inverted ? "bg-champagne" : "bg-brass",
                )}
              />
            </span>
            {ui.scroll}
          </span>
        )}
      </div>
    </div>
  );
}

export function Scene01Horizon() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useSafeReducedMotion() ?? false;
  const ready = useIntroReady();
  const inView = useInView(ref, { amount: 0.05 });
  const [dark, setDark] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /*
   * The terminator. `edge` is where the shadow becomes total; the mask runs
   * from transparent to opaque across PENUMBRA above it, so the boundary is
   * always a gradient the depth of a shoulder rather than a line.
   */
  const edge = useRange(scrollYProgress, [0.02, 0.5], [118, -PENUMBRA]);
  const mask = useMotionTemplate`linear-gradient(to bottom, transparent ${edge}%, #000 calc(${edge}% + ${PENUMBRA}%))`;

  /*
   * Camera. The sentence is not faded out and replaced; the frame withdraws
   * from it, which is what turns a headline into an object in a room. Half
   * the size by the end, and lifted, so the lower half of the stage is
   * genuinely vacated rather than merely emptier.
   */
  const scale = useRange(scrollYProgress, [0.16, 0.72], [1, 0.5]);
  const lift = useRange(scrollYProgress, [0.16, 0.72], ["0%", "-16%"]);

  const resolve = useRange(scrollYProgress, [0.44, 0.56, 0.7, 0.78], [0, 1, 1, 0]);
  const resolveLift = useRange(scrollYProgress, [0.44, 0.56, 0.7, 0.78], ["2.5rem", "0rem", "0rem", "-2rem"]);
  const close = useRange(scrollYProgress, [0.78, 0.9], [0, 1]);
  const closeLift = useRange(scrollYProgress, [0.78, 0.9], ["2.5rem", "0rem"]);

  // Tell the header what is beneath it.
  useEffect(() => {
    if (reduced) return;
    return scrollYProgress.on("change", (v) => {
      setDark((current) => (current === v > 0.42 ? current : v > 0.42));
    });
  }, [reduced, scrollYProgress]);

  useEffect(() => {
    if (!inView) return;
    setStageTone(dark ? "dark" : "light");
    return () => setStageTone(null);
  }, [inView, dark]);

  return (
    <section
      ref={ref}
      data-tone={dark ? "dark" : "light"}
      aria-label="Opening"
      className={cn(
        "relative bg-ivory",
        !reduced &&
          "h-[calc(var(--scene-m)*100svh)] md:h-[calc(var(--scene-t)*100svh)] xl:h-[calc(var(--scene-d)*100svh)]",
      )}
      style={{ "--scene-d": 2.6, "--scene-t": 2.2, "--scene-m": 1.9 } as React.CSSProperties}
    >
      <div
        className={cn(
          "bg-ivory",
          reduced ? "relative" : "sticky top-0 h-[100svh] overflow-hidden",
        )}
      >
        {/* The lit wall. */}
        {reduced ? null : <Surface preset="plaster" progress={scrollYProgress} travel={0.22} />}

        {/* Daylight side. */}
        <div className={cn("tone-light", reduced ? "relative" : "absolute inset-0")}>
          <World
            reduced={reduced}
            ready={ready}
            scale={scale}
            lift={lift}
            resolve={resolve}
            resolveLift={resolveLift}
            close={close}
            closeLift={closeLift}
          />
        </div>

        {/* Shadow side, revealed by the terminator rather than cut by a plate. */}
        {reduced ? null : (
          <motion.div
            className="tone-dark grain absolute inset-0 z-10 overflow-hidden bg-obsidian"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          >
            <Surface preset="hangar" progress={scrollYProgress} travel={0.3} />
            <span aria-hidden className="grain-layer" />
            <World
              reduced={false}
              inverted
              ready={ready}
              scale={scale}
              lift={lift}
              resolve={resolve}
              resolveLift={resolveLift}
              close={close}
              closeLift={closeLift}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}

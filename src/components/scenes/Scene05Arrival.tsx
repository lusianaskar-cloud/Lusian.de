"use client";

import { motion, type MotionValue } from "motion/react";
import { useRange } from "@/lib/useRange";
import { Scene, Beat } from "./Scene";
import { EditorialImage } from "@/components/shared/EditorialImage";
import { plates } from "@/lib/content/plates";
import { useContent } from "@/lib/i18n/context";

/**
 * SCENE 05 — ARRIVAL
 *
 * The one exceptional visual on the homepage, and the only place the site
 * slows to a stop. The crop opens as the statement arrives, so the image is
 * doing something rather than sitting there.
 *
 * Until production photography is supplied this renders the reserved frame,
 * which crops and settles exactly as the photograph will.
 */
function Plate({ progress }: { progress: MotionValue<number> }) {
  // The crop opens: 1.18 → 1.00 across the whole scene.
  const scale = useRange(progress, [0, 0.5, 1], [1.18, 1.06, 1]);
  const vignette = useRange(progress, [0.1, 0.55], [0.72, 0.34]);

  return (
    <>
      <EditorialImage
        plate={plates.gulfInterior}
        tone="dark"
        fill
        caption={false}
        scale={scale}
        className="bg-umber"
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent,var(--color-obsidian))]"
        style={{ opacity: vignette }}
      />
    </>
  );
}

export function Scene05Arrival() {
  const { arrival } = useContent().home;
  const closing = arrival.closing;

  return (
    <Scene
      tone="dark"
      length={2.5}
      mobileLength={1.8}
      className="bg-umber"
      label={arrival.headline}
    >
      {({ progress, reduced }) => (
        <>
          {reduced ? (
            <EditorialImage
              plate={plates.gulfInterior}
              tone="dark"
              ratio="aspect-[4/5] sm:aspect-[16/9]"
              className="bg-umber"
            />
          ) : (
            <Plate progress={progress} />
          )}

          <Beat
            progress={progress}
            reduced={reduced}
            range={[0.14, 0.28, 0.44, 0.54]}
            rise={38}
            className="container-editorial flex items-center"
          >
            <h2 className="max-w-[15ch] font-display text-[clamp(2.2rem,6.6vw,5.5rem)] leading-[1.03] tracking-[-0.03em]">
              {arrival.headline}
            </h2>
          </Beat>

          {closing.map((line, i) => {
            const start = 0.58 + i * 0.085;
            return (
              <Beat
                key={line}
                progress={progress}
                reduced={reduced}
                range={[start, start + 0.05, 0.94, 0.995]}
                rise={22}
                className="container-editorial flex items-end justify-end pb-[max(2.5rem,env(safe-area-inset-bottom))] lg:pb-20"
              >
                <p
                  className="font-display text-[clamp(1.35rem,3.2vw,2.75rem)] leading-tight tracking-tight"
                  style={reduced ? undefined : { marginBottom: `${(closing.length - 1 - i) * 1.5}em` }}
                >
                  {line}
                </p>
              </Beat>
            );
          })}
        </>
      )}
    </Scene>
  );
}

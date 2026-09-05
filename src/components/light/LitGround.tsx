"use client";

import { Surface } from "./Surface";
import { type PresetName } from "./model";
import { cn } from "@/lib/utils";

/**
 * A lit ground for a section that is taller than the viewport.
 *
 * `Surface` paints a room: a source at a stated depth, a horizon, a floor that
 * recedes. Stretching that canvas over a four-thousand-pixel section destroys
 * the geometry it is built on — the horizon lands somewhere arbitrary, the
 * pool becomes a soft wash the height of several screens, and small type ends
 * up set on the brightest part of it. Which is what happened: the sector list
 * on the aviation page was barely legible against its own light.
 *
 * So the field is one viewport tall and sticks. The room stays a room, and the
 * page moves through it. `dim` is there because a reading section is not lit
 * the way a scene is: you read away from the window.
 */
export function LitGround({
  preset,
  still = 0.5,
  dim,
  className,
}: {
  preset: PresetName;
  still?: number;
  /** 0–1. Reading sections take about 0.5; a scene takes none. */
  dim?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="sticky top-0 h-[100lvh] w-full">
        <Surface preset={preset} still={still} />
        {dim ? (
          <span
            className="absolute inset-0 block bg-[color:var(--tone-bg)]"
            style={{ opacity: dim }}
          />
        ) : null}
      </div>
    </div>
  );
}

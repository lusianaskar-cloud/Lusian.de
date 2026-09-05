/**
 * A small lighting model.
 *
 * Not a gradient generator. Every field this renders has an implied light
 * source, an implied surface and an implied occluder, and the maths follows
 * from that: light falls off with distance, dims as it rakes across a surface
 * at a grazing angle, and its shadow edge softens the further it travels from
 * whatever cast it. Those three behaviours are what the eye reads as "light on
 * a material" rather than "a coloured blur", and they are the reason this
 * exists instead of a CSS gradient.
 *
 * Presets are named after the conditions they describe, because a preset that
 * cannot be described as a real place is the point at which this would become
 * decoration.
 */

export type Rgb = [number, number, number];

export type Preset = {
  /** What this is a picture of. Presets without an answer do not belong here. */
  readonly condition: string;
  /** Where the light comes from, in surface coordinates. */
  light: { x: number; depth: number };
  /** Colour of the light itself, and of everything it fails to reach. */
  lit: Rgb;
  shadow: Rgb;
  /** How fast the pool decays. Higher is a harder, smaller pool. */
  falloff: number;
  /** Elongation of the pool: >1 stretches across, <1 stretches away. */
  anisotropy: number;
  /** How much the surface tilts away — 0 is a wall, 1 is a floor seen flat. */
  grazing: number;
  /** Where the surface meets the horizon, 0 (top) to 1 (bottom). */
  horizon: number;
  ambient: number;
  intensity: number;
  /**
   * The surface itself. `grain` is how much the material breaks the light up,
   * `stretch` how far that structure is smeared along the direction the light
   * travels — high on wet concrete and brushed metal, low on plaster. Without
   * this the field is a gradient; with it, it is a surface.
   */
  material: { grain: number; stretch: number };
  /**
   * A second source, opposite in colour, meeting the first at a soft
   * terminator. One volume lit from two sides — which is what the two
   * practices are.
   */
  opposite?: { lit: Rgb; shadow: Rgb; x: number; boundary: number };
  /** An edge that interrupts the light, and how soft its shadow starts. */
  occluder?: {
    kind: "band" | "aperture";
    /** Position of the edge along the axis it cuts. */
    at: number;
    /** Contact-hardening: the shadow starts this sharp and softens with distance. */
    penumbra: number;
  };
};

const rgb = (hex: string): Rgb => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

/**
 * The conditions this site is lit by. Two cool, two warm, one neutral —
 * matching the two practices and the ground between them.
 */
export const PRESETS = {
  /** Dawn through a hangar opening: a tall raking band across the floor. */
  hangar: {
    condition: "Low dawn light through a hangar opening",
    light: { x: 0.78, depth: 0.04 },
    lit: rgb("#8FA9B6"),
    shadow: rgb("#050D12"),
    falloff: 4.4,
    anisotropy: 0.78,
    grazing: 0.86,
    /*
     * The opening is low and the light lands on the floor, not in the air.
     * Putting the horizon in the lower half keeps the wall above it dark,
     * which is where type has to sit and stay legible.
     */
    horizon: 0.3,
    ambient: 0.014,
    intensity: 1.0,
    material: { grain: 0.08, stretch: 28 },
  },

  /** Late sun through a high architectural opening onto stone. */
  aperture: {
    condition: "Late sun through a high opening, falling on stone",
    light: { x: 0.62, depth: 0.34 },
    lit: rgb("#E8D4B4"),
    shadow: rgb("#150F0C"),
    falloff: 1.35,
    anisotropy: 1.25,
    grazing: 0.55,
    horizon: 0.24,
    ambient: 0.075,
    intensity: 1.08,
    material: { grain: 0.055, stretch: 9 },
    occluder: { kind: "aperture", at: 0.42, penumbra: 0.05 },
  },

  /**
   * One volume between two openings — cold daylight on one side, a warm
   * interior on the other, meeting where neither reaches. This is the
   * physical form of the two practices, and the terminator between them
   * moves with the scroll.
   */
  terminator: {
    condition: "One volume between a cold opening and a warm interior",
    light: { x: 0.12, depth: 0.42 },
    lit: rgb("#A8C6D2"),
    shadow: rgb("#08141A"),
    falloff: 1.5,
    anisotropy: 1.15,
    grazing: 0.6,
    horizon: 0.2,
    ambient: 0.05,
    intensity: 1.02,
    material: { grain: 0.085, stretch: 17 },
    opposite: {
      lit: rgb("#E5CFA8"),
      shadow: rgb("#170F0B"),
      x: 0.88,
      boundary: 0.5,
    },
  },

  /**
   * The quiet condition. Where `aperture` is a shaft with a hard edge, this
   * is the same room an hour later: the sun has left the wall and what is
   * left is fill — a slow, wide, evenly carried warmth with the stone's own
   * grain still visible in it. Low intensity and high ambient rather than a
   * warm version of a cold preset, because the difference between the two
   * practices has to be a difference in condition, not in hue.
   */
  stone: {
    condition: "Daylight filling a stone room long after the sun has left the wall",
    light: { x: 0.36, depth: 0.72 },
    lit: rgb("#D8C3A2"),
    shadow: rgb("#241A14"),
    falloff: 0.95,
    anisotropy: 2.1,
    grazing: 0.28,
    horizon: 0.06,
    ambient: 0.16,
    intensity: 0.82,
    material: { grain: 0.09, stretch: 5 },
    /*
     * A room needs a junction. Without an interrupted edge a lit surface is
     * a field of light rather than a place, and this is the one condition on
     * the site with no instrument drawn over it to supply that structure.
     * A deep soffit across the top of the frame: the shadow the band casts
     * falls on everything above it, so `at` is where the room comes out from
     * under the overhang, not where the shade begins.
     */
    occluder: { kind: "band", at: 0.26, penumbra: 0.1 },
  },

  /** A plastered ivory wall, lit from the upper left. Barely an event. */
  plaster: {
    condition: "Daylight across a plastered wall",
    light: { x: 0.22, depth: 0.86 },
    lit: rgb("#FFFDF9"),
    shadow: rgb("#D6CBB8"),
    falloff: 1.45,
    anisotropy: 1.7,
    grazing: 0.34,
    horizon: 0.0,
    ambient: 0.2,
    intensity: 1.05,
    material: { grain: 0.035, stretch: 8 },
  },
} satisfies Record<string, Preset>;

export type PresetName = keyof typeof PRESETS;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Cheap deterministic value noise. Not for texture in the decorative sense —
 * it is the surface's own irregularity, which is what makes light landing on
 * it read as landing on something.
 */
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return mix(mix(a, b, u), mix(c, d, u), v);
}

/** Smooth step, for penumbrae that have no visible seam. */
function smooth(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1e-6));
  return t * t * (3 - 2 * t);
}

/**
 * Paints one frame of a lit surface into an ImageData buffer.
 *
 * Written to run at roughly a quarter of device resolution and be scaled up
 * by the browser: light of this kind has no high-frequency detail, the
 * upscale is free softening, and it keeps a full-screen field at about a
 * millisecond a frame.
 */
export function paint(
  image: ImageData,
  preset: Preset,
  /** 0–1. Moves the source and opens the occluder; this is the scroll. */
  t: number,
  /** Drift of the light along its own axis, in surface units. */
  travel = 0,
) {
  const { width: w, height: h, data } = image;
  const { light, lit, shadow, occluder } = preset;

  const lx = light.x + travel;
  const ld = light.depth;

  for (let py = 0; py < h; py += 1) {
    const v = py / (h - 1);

    /*
     * Perspective, and it has to be monotonic. Depth increases the whole way
     * up the frame: 0 at the bottom edge, where the floor is closest, to 1 at
     * the horizon, with everything above the horizon a far wall beyond it.
     *
     * Treating the wall as a second surface whose depth grows upward from
     * the horizon — the obvious reading of "distance from the horizon" — puts
     * the light source's depth in two places at once and paints a symmetric
     * band floating across the middle of the frame. That is fog, not a room.
     */
    const below = v >= preset.horizon;
    const depth = below
      ? Math.pow(1 - (v - preset.horizon) / (1 - preset.horizon || 1e-6), 2.1)
      : 1 + ((preset.horizon - v) / (preset.horizon || 1e-6)) * 0.4;

    // Light rakes across a receding surface; a wall faces it square on.
    const incidence = below ? mix(1, 1 - depth * 0.82, preset.grazing) : 0.72;

    for (let px = 0; px < w; px += 1) {
      const u = px / (w - 1);

      const dx = (u - lx) * preset.anisotropy;
      const dy = depth - ld;
      const r2 = dx * dx + dy * dy;

      // Inverse-square with a floor, which is what stops it going to infinity.
      let L = preset.intensity / (1 + preset.falloff * r2 * 6);
      L *= incidence;

      if (occluder) {
        /*
         * Contact hardening: a shadow is sharp where the occluder touches the
         * surface and softens as it travels. This one detail is most of the
         * difference between a shadow and a blur.
         */
        if (occluder.kind === "band") {
          const dist = Math.abs(v - occluder.at);
          const soft = occluder.penumbra + dist * 0.55;
          L *= mix(0.16, 1, smooth(occluder.at - soft, occluder.at + soft, v));
        } else if (occluder.kind === "aperture") {
          // A rectangle of light, thrown at an angle and opening with t.
          const open = mix(0.16, 0.52, t);
          const skew = (v - 0.5) * 0.42;
          const edge = Math.abs(u - (occluder.at + skew)) - open;
          const soft = occluder.penumbra + Math.abs(v - 0.5) * 0.2;
          L *= mix(0.12, 1, 1 - smooth(-soft, soft, edge));
        }
      }

      /*
       * The surface. Structure is smeared along the direction of travel and
       * compressed toward the horizon, so it foreshortens the way a real
       * floor does — and it modulates the light rather than being laid over
       * it, because a material changes what light does, it does not sit on
       * top of it.
       */
      const { grain, stretch } = preset.material;
      if (grain > 0) {
        const compress = below ? 1 / (1 - depth * 0.72) : 1;
        const n = noise(u * stretch, (below ? depth : v) * stretch * 5.5 * compress);
        L *= 1 + (n - 0.5) * grain * 2;
      }

      L = clamp01(preset.ambient + L);

      /*
       * Colour temperature separates with intensity, which is what real
       * light does: the lit part takes the colour of the source and the
       * shadow keeps the colour of the ambient bounce. A single-hue ramp is
       * what makes a CSS gradient look like plastic.
       */
      const e = L * L * (3 - 2 * L);
      const i = (py * w + px) * 4;

      const other = preset.opposite;
      if (other) {
        // The second source, computed on the same surface.
        const ox = (u - other.x) * preset.anisotropy;
        const or2 = ox * ox + dy * dy;
        let L2 = (preset.intensity / (1 + preset.falloff * or2 * 6)) * incidence;
        if (preset.material.grain > 0) {
          const compress = below ? 1 / (1 - depth * 0.72) : 1;
          const n = noise(
            u * preset.material.stretch + 31.7,
            (below ? depth : v) * preset.material.stretch * 5.5 * compress,
          );
          L2 *= 1 + (n - 0.5) * preset.material.grain * 2;
        }
        L2 = clamp01(preset.ambient + L2);
        const e2 = L2 * L2 * (3 - 2 * L2);

        /*
         * Where the two meet. The boundary travels with the scroll and its
         * softness is what makes this a terminator rather than a seam — the
         * two worlds are lit differently, not tiled next to each other.
         */
        /*
         * Cold first, warm last: the volume is read left to right and the
         * scene it lights argues the operation before the private practice.
         * The sweep starts and ends outside the frame so the crossover
         * actually crosses it — a boundary that only travels from 0.76 to
         * 0.24 never reaches the edge the type is set against, and the type
         * never changes the light it is standing in.
         */
        const at = mix(1.2, -0.2, t);
        const side = smooth(at - 0.26, at + 0.26, u);
        data[i] = mix(mix(shadow[0], lit[0], e), mix(other.shadow[0], other.lit[0], e2), side);
        data[i + 1] = mix(mix(shadow[1], lit[1], e), mix(other.shadow[1], other.lit[1], e2), side);
        data[i + 2] = mix(mix(shadow[2], lit[2], e), mix(other.shadow[2], other.lit[2], e2), side);
        data[i + 3] = 255;
        continue;
      }

      data[i] = mix(shadow[0], lit[0], e);
      data[i + 1] = mix(shadow[1], lit[1], e);
      data[i + 2] = mix(shadow[2], lit[2], e);
      data[i + 3] = 255;
    }
  }
}

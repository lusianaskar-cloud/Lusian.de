/**
 * Photography slots — structure only.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * The site is designed to be complete without photography — typography,
 * geometry and generated visuals carry it. These three plates are the places
 * where a photograph would genuinely add something, and only those.
 *
 * Alt text, the brief and the caption are translated and live in the locale
 * bundles keyed by these ids.
 *
 * TODO(client): supply licensed production photography and set `src` on each
 * plate below (a path under /public, or a remote URL whose host is added to
 * `images.remotePatterns` in next.config.ts). Until `src` is set, each plate
 * renders as a designed reserved frame carrying its own brief — the layout is
 * finished either way. Full briefs in docs/ASSETS.md.
 * ─────────────────────────────────────────────────────────────────────────
 */
export type PlateId = "interlude" | "aviationApron" | "gulfInterior";

export type Plate = {
  /** Key into `content.plates`, and the plate's own identity. */
  key: PlateId;
  /** Plate number, as printed on the reserved frame. */
  id: string;
  /** Set this to publish a real photograph in the slot. */
  src?: string;
};

export const plates = {
  interlude: { key: "interlude", id: "PL-01", src: undefined },
  aviationApron: { key: "aviationApron", id: "PL-02", src: undefined },
  gulfInterior: { key: "gulfInterior", id: "PL-03", src: undefined },
} satisfies Record<PlateId, Plate>;

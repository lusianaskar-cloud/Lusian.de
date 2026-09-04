/**
 * Photography slots.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * The site is designed to be complete without photography — typography,
 * geometry and generated visuals carry it. These three plates are the places
 * where a photograph would genuinely add something, and only those.
 *
 * TODO(client): supply licensed production photography and set `src` on each
 * plate below (a path under /public, or a remote URL whose host is added to
 * `images.remotePatterns` in next.config.ts). Until `src` is set, each plate
 * renders as a designed reserved frame carrying its own brief — the layout is
 * finished either way. Full briefs in docs/ASSETS.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Plate = {
  id: string;
  /** Set this to publish a real photograph in the slot. */
  src?: string;
  alt: string;
  brief: string;
  caption: string;
};

export const plates = {
  interlude: {
    id: "PL-01",
    src: undefined,
    alt: "Daylight falling through an architectural threshold",
    brief:
      "Interior daylight at an architectural threshold. Stone, glass, deep shadow. No people, no recognisable building, no skyline.",
    caption: "Between the two practices",
  },
  aviationApron: {
    id: "PL-02",
    src: undefined,
    alt: "Apron markings and terminal structure at first light",
    brief:
      "Operational environment at first light — apron geometry, stand markings, structure. No aircraft livery, no crew faces, no branding.",
    caption: "Where the work happens",
  },
  gulfInterior: {
    id: "PL-03",
    src: undefined,
    alt: "A quiet residential interior in late afternoon light",
    brief:
      "A quiet residential interior, late afternoon. Restraint over opulence. No faces, no identifiable address, no styling cliché.",
    caption: "Arrival",
  },
} satisfies Record<string, Plate>;

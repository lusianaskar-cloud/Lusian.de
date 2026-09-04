# Photography

## Position

The site is designed to be finished **without** photography. Typography,
whitespace, the hairline grid, the drawn route network and the Gulf
constellation carry it. Photography is used in three places only, where an image
adds something the drawing cannot.

This is deliberate. Filling a premium site with stock aviation and skyline
imagery is the fastest way to make it look like every other advisory site.

## How the slots work

`src/lib/content/plates.ts` defines three plates. Each renders through
`EditorialImage`:

- **With `src` set** — the photograph, with a slow crossing parallax and a tonal
  wash that keeps it inside the palette.
- **Without `src`** — a designed reserved frame: crop marks, plate number and
  the brief for the shot. Intentional, not broken.

To publish a photograph, set `src` on the plate. Local files go under `/public`.
Remote hosts must be added to `images.remotePatterns` in `next.config.ts`
(`images.unsplash.com` is pre-configured so temporary development imagery can be
dropped in without a config change).

## Briefs

### PL-01 · Homepage interlude — 21:9

The hinge between the two practices. Interior daylight at an architectural
threshold: stone, glass, deep shadow, one strong direction of light.

**Avoid:** people, recognisable buildings, any skyline, sunset gold.

### PL-02 · Aviation — 3:2

Operational environment at first light. Apron geometry, stand markings, ground
equipment, structural repetition. It should look like somewhere work is done,
not somewhere a photograph was taken.

**Avoid:** aircraft in identifiable livery, aircraft as hero subject, crew
faces, terminal branding, tarmac-at-sunset clichés.

### PL-03 · Private advisory — 2:1

A quiet residential interior, late afternoon. Restraint over opulence — texture,
proportion and light rather than furnishing.

**Avoid:** faces, identifiable addresses, marble-and-gold styling, anything that
reads as a property listing.

## Licensing

Production photography must be licensed for commercial use with a record kept of
the licence. Do not hotlink images from a source that has not been licensed.

## Technical

- Delivered at 2× the largest rendered width (PL-01 up to ~3000px wide).
- Next.js handles AVIF/WebP negotiation and responsive sizing.
- Colour: cool and low-saturation for aviation, warm and low-saturation for the
  private practice. Nothing should out-saturate the champagne accent.
- Every plate has a real `alt` in `plates.ts`. Update it with the photograph.

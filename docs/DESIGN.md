# Design system

One identity, two atmospheres. The divisions differ by **temperature**, not by
brightness — the same grid, the same type, the same motion, run cool for
aviation and warm for the private practice.

---

## Palette

Tokens are declared in `@theme` in `src/app/globals.css`.

**Light grounds** — `paper #FBF9F5` · `ivory #F4F0E8` · `dune #E9E2D5` · `pumice #D3CABA`
**Neutrals** — `ash #8B857A` · `graphite #4A4A46` · `ink #14181A` · `obsidian #0A0D0E`
**Aviation, cool** — `petrol #0B1A21` · `hangar #14313D` · `ice #A0B8C2`
**Private, warm** — `umber #1F1713`
**Accent** — `brass #9C7F52` (on light) · `champagne #C6AD82` (on dark)

No pure black and no pure white anywhere. The accent is a muted brass, never a
shiny gold, and never used as a fill behind body text.

### Tonality

Sections declare their tonality rather than their colours:

```tsx
<Section tone="dark" className="bg-umber">
```

`tone-dark` / `tone-light` set `--tone-fg`, `--tone-bg`, `--tone-rule` and
`--tone-accent`. Components then use `text-tone-muted`, `border-tone` and
`text-accent`, so the same component is correct on ivory and on ink without a
variant prop.

The header reads `data-tone` from whichever section is beneath it and inverts
itself to match (`useHeaderTone`). Regions are measured on layout change and
read from a cached table on scroll — no layout reads in the scroll handler.

### Rhythm

Tone alternates deliberately down each page. The homepage runs:

> ivory → ink → obsidian (split) → ivory → umber → plate → paper → ink →
> dune → ink

---

## Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Newsreader** (variable, 200–500 + italic) | headlines, section titles, numerals. Weight 300, tracking −0.022em |
| Interface & body | **Geist Sans** | self-hosted via the `geist` package |
| Labels & data | **Geist Mono** | 11px, uppercase, 0.2em tracking — the `label-mono` utility |

The italic is used as punctuation, not decoration: one word per headline, on the
word that carries the meaning, in the accent colour.

Scale is fluid (`--text-hero` … `--text-label`), so tablet is a real
composition rather than an interpolation between two designs.

---

## Motion

Shared curves in `src/lib/motion.ts`. Nothing bounces and nothing is faster than
it needs to be.

- `EASE.expo` `cubic-bezier(0.16, 1, 0.3, 1)` — reveals
- `EASE.soft` `cubic-bezier(0.22, 1, 0.36, 1)` — state changes
- `EASE.drape` `cubic-bezier(0.65, 0, 0.35, 1)` — curtains and plates
- Springs only where something is being *pushed* — magnetic CTAs, the split.

`LineReveal` is the primitive: text sits in an overflow clip and travels up from
beneath it, line by line, at 1.25s with a 0.09s stagger.

**Reduced motion** is honoured everywhere, not globally suppressed: `useReducedMotion`
is read in every animated component, Lenis does not initialise, the preloader
does not play, the precision cursor does not mount, parallax returns a static
wrapper, and scroll-linked fills render complete.

---

## Signature interactions

Five, not fifty.

1. **The horizon** (`components/home/Hero.tsx`) — the hero is split by a horizon
   at 38% from the foot. The headline is rendered twice at identical
   coordinates: dark on ivory, and ivory inside the ink plate. The plate rises
   with scroll, so the statement inverts *through* the horizon rather than
   fading. It is the brand mark drawn at page scale, and the handover into the
   dark sections below.
2. **The divide** (`components/home/DivisionSplit.tsx`) — two plates, one
   hairline. Attention to either side is answered physically: the attended plate
   takes space from the other on a spring and its ground intensifies. Both are
   dark; the difference between them is temperature. Nothing depends on hover —
   on touch both plates are simply presented at rest.
3. **The route network** (`components/aviation/RouteNetwork.tsx`) — an abstract
   network on canvas. Arcs draw themselves in sequence, then carry a slow
   traffic pulse; hubs get survey ticks and a breathing ring. One paint for
   twenty arcs, paused when off-screen, static under reduced motion. Drawn as
   ink-on-ivory it becomes a technical sheet; as ice-on-petrol, an instrument.
4. **The constellation** (`components/gulf/GulfConstellation.tsx`) — the six
   markets at true relative positions from their hub coordinates, over an
   abstract graticule, with bearings and range rings from the selected market.
   Deliberately not a rendered map: it cannot become geographically wrong, and
   it avoids the skyline cliché entirely. The accessible control is the index
   list; the plotted markers are a pointer affordance over the same state.
5. **The curtain** (`components/chrome/TransitionProvider.tsx` and `Preloader.tsx`)
   — routes hand over behind a two-layer plate that sweeps upward carrying the
   destination's name; the route push is issued as it closes, so latency is felt
   as intent. On a session's first load the plate instead *parts along the
   horizon* of the brand mark.

Plus: magnetic CTAs on fine pointers, a `mix-blend-difference` precision cursor
that stays legible on any ground without tracking tonality, and a header that
inverts against the section beneath it.

---

## Layout

- `container-editorial` — max 96rem with a fluid `--spacing-gutter`
  (`clamp(1.25rem, 4.5vw, 5rem)`); `container-narrow` at 68rem for reading.
- A 12-column grid on desktop, 4 on mobile. `HairlineGrid` draws it in the hero.
- Hairlines are `currentColor` at 12–15% — never a fixed grey.
- Large flat fields carry a `grain` layer so they do not read as flat CSS.

## Accessibility

- Semantic landmarks; every section labelled by its own heading.
- Skip link; visible focus rings via `:focus-visible`.
- The mobile menu traps focus, closes on Escape and on history navigation, and
  restores scroll.
- Hover is never the only route to information.
- Native cursor is hidden only while the precision ring is actually running, and
  never over form controls.
- Decorative canvas and SVG are `aria-hidden`; the plotted markers are
  `tabIndex={-1}` beside a real accessible control.

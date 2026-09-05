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
**Accent** — `brass #7A6039` (on light) · `champagne #C6AD82` (on dark)

The accent is a muted bronze rather than a gold. `brass` is tuned so that
11px mono labels clear 4.5:1 against ivory, paper *and* dune — the accent is
used at label size often enough that it has to hold there, not only in
display type. If you lighten it, re-run the contrast check.

No pure black and no pure white anywhere, and the accent is never used as a
fill behind body text.

Every text colour on every page was measured against its composited background
at desktop and phone widths; all of it meets WCAG AA (4.5:1 for body and label
sizes, 3:1 for display).

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

Tone alternates deliberately, and the homepage now alternates *between scenes*
rather than between sections:

> ivory → ink (the horizon rises through it) → obsidian → petrol → petrol/umber
> (the turn) → umber → umber → paper (the argument, unpinned) → ink → ink

---

## The homepage is scenes, not sections

Eight scenes. Seven pinned. One deliberately not.

| | Scene | Length | What happens |
|---|---|---|---|
| 01 | Horizon | 2.3× | The statement, the horizon climbing through it, the resolution, then why the firm exists |
| 02 | Two worlds | 3.0× | A cool field takes the viewport and yields it to a warm one; both settle into a composed split |
| 03 | Aviation instrument | 3.4× | Five capabilities, one at a time, each changing what the network does behind it |
| 04 | The turn | 2.0× | Routes resolve into architectural contour — one geometry, not a cross-fade |
| 05 | Arrival | 2.5× | The crop opens as the statement arrives; four lines follow, one per beat |
| 06 | The sequence | 3.0× | Five stages; only contrast and scale move |
| — | The argument | — | **Not pinned.** After seven pinned scenes the reader needs ground that does not move |
| 07 | Six markets | 3.4× | The instrument holds; the information changes around it |
| 08 | Closing | 1.9× | Strip back to one hairline and one invitation |

### How a scene works

`components/scenes/Scene.tsx`. The section is `length × 100svh` tall and its
only child is `sticky top-0 h-[100lvh]`. The browser holds the child for
exactly `(length − 1)` viewports of scroll and `useScroll` reports 0→1 across
that same distance.

**Native sticky, not a pinning library.** No pin-spacer is injected, nothing
switches to `position: fixed`, and nothing recalculates on resize — which
removes the pin jumps, the Safari flicker, the refresh-inside-scene flash and
the orientation-change breakage that come with library pinning. Cleanup is
React unmount.

The stage is `100lvh` while sections are measured in `svh`, so a retracting
mobile URL bar can never reveal a seam beneath the pinned stage.

Lengths are two CSS custom properties resolved by a media query, so the height
is correct on the first paint. Reading a breakpoint in JavaScript would change
the height after hydration and cost CLS.

### Two rules that are easy to get wrong

**Scroll-linked values must stay in JavaScript.** Given input/output arrays,
Motion may hand a standalone animatable property — `opacity` above all — to a
native scroll-driven animation using the input array as keyframe offsets, while
`scale` and `y` fold into `transform` and stay in JS. The two paths do not
agree, so a beat's fade and its movement end up reading different progress.
`lib/useRange.ts` maps through a function transformer instead. Use it, not the
array form of `useTransform`, for anything driven by scroll.

**The reduced-motion preference cannot be read on the server.** Motion's
`useReducedMotion` returns false there and true on the client, so anything
that renders a different tree — or even a different `initial` style — fails to
hydrate. Use `lib/useSafeReducedMotion.ts`, which reports false until mount.
And when the preference changes what is animated, swap the *element* rather
than dropping the style prop: removing a style prop leaves whatever Motion
last wrote on the node.

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

1. **The horizon** (`components/scenes/Scene01Horizon.tsx`) — the opening is
   split by a horizon at 38% from the foot. The statement is rendered twice at
   identical coordinates: dark on ivory, and ivory inside the ink plate. The
   plate climbs with scroll, so the sentence inverts *through* the horizon
   rather than fading, and one word holds champagne as it passes. It is the
   brand mark drawn at page scale.
2. **The two worlds** (`components/scenes/Scene02TwoWorlds.tsx`) — a cool field
   wipes in and takes the viewport, then yields it as a warm one enters from
   the opposite side; both settle into a composed split. The fields are
   revealed with `clip-path` insets, never animated width, so nothing reflows.
   On a phone the same choreography runs vertically. Nothing depends on hover.
3. **The route network** (`components/aviation/RouteNetwork.tsx`) — one canvas,
   three modes. Autonomous: it draws itself once and carries traffic. Scrubbed:
   the draw is tied to scroll, so scrolling builds it. Morphing: the same nodes
   travel to horizon bands, the arcs flatten and the palette warms, so routes
   resolve into architectural contour as one continuous geometry rather than
   two graphics cross-fading. That morph is the turn between the two practices.
4. **The constellation** (`components/gulf/GulfConstellation.tsx`) — the six
   markets at true relative positions from their hub coordinates, over an
   abstract graticule, with bearings and range rings from the selected market.
   Deliberately not a rendered map: it cannot become geographically wrong, and
   it avoids the skyline cliché entirely. The accessible control is the index
   list; the plotted markers are a pointer affordance over the same state.
5. **The curtain** (`components/chrome/TransitionProvider.tsx` and `Preloader.tsx`)
   — routes hand over behind a two-layer plate that sweeps upward carrying the
   destination's name. The route is pushed only once the screen is covered, so
   the incoming page is never glimpsed climbing in behind it. On a session's
   first load the plate instead *parts along the horizon* of the brand mark.

Plus: magnetic CTAs on fine pointers, a `mix-blend-difference` precision cursor
that stays legible on any ground without tracking tonality, and a header that
inverts against the section beneath it.

---

## Layout

- Scroll position belongs to Lenis: `window.scrollTo` is reverted on the next
  frame. Anything that moves the page programmatically goes through
  `window.__lusianScroll`.
- `container-editorial` — max 96rem with a fluid `--spacing-gutter`
  (`clamp(1.25rem, 4.5vw, 5rem)`); `container-narrow` at 68rem for reading.
- A 12-column grid on desktop, 4 on mobile. `HairlineGrid` draws it in the hero.
- Hairlines are `currentColor` at 12–15% — never a fixed grey.
- **A border means something is outstanding.** Boxed blocks are reserved for
  content the firm has yet to supply (`PlaceholderBlock`, the legal and
  Insights notices) and for framed instruments (the route-network plate, the
  constellation, photography plates). Ordinary content is separated by
  hairlines and whitespace, never enclosed — which is also what keeps the
  page from reading as a grid of cards.
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

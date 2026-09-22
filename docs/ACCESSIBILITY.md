# Contrast, and how to measure it here

This site is ink on ivory with a canvas light field behind much of the text.
That combination defeats every contrast tool that reads colours from the DOM,
because the thing behind the text is painted, not declared. What follows is
the method that works, the traps that wasted a day, and what is still open.

## The method

One render per scroll position. For each text node:

1. **Resolve the foreground through a canvas swatch**, not by parsing
   `getComputedStyle().color`. This project's computed colours come back as
   `oklab(...)`; scraping the three numbers out of that string and treating
   them as sRGB reads ivory as near-black and invents a site-wide failure.
   Painting the declared colour into a 1×1 canvas and reading the pixel back
   handles `oklab`, `color-mix` and anything else CSS grows next.
2. **Composite the alpha chain** — the colour's own alpha times every
   ancestor's `opacity` — over the background, then compare. Reporting the
   token's raw RGB makes correct measurements look impossible.
3. **Take the background as the modal colour of the glyph run.** Not the
   element box: a full-width paragraph whose text occupies its left third
   would otherwise be sampled mostly over empty space. Use `Range` rects.
4. **Rank the clusters and skip the text's own.** At 88px the glyphs cover
   more of their line box than the background does, so the plain mode returns
   the ink and the node scores 1:1 against itself.
5. **Hit-test before believing the box.** A collapsed scene keeps its text in
   the DOM with a real bounding box while an ancestor clips it away.

### Traps

- **Do not hide the text to expose the background.** The obvious two-pass
  trick — `* { color: transparent }`, screenshot, sample — cannot be used
  here. This site derives its tone backgrounds from `currentColor`, so that
  rule paints the entire page black and every node scores as dark-on-dark.
- **Wait for the preloader.** It parts at 1750ms. Measuring before it clears
  samples the curtain and reports all 99 frames as failures.
- **Scroll.** Measuring only the first viewport is how the footer went
  unchecked — and the footer held the weakest text on the site.

`scratchpad/contrast.mjs` in the working session implements all of this.

## What was wrong, and what it is now

| | Before | After |
| --- | --- | --- |
| Header nav, homepage, `prefers-reduced-motion` | **1.06:1** | 4.5+ |
| `text-tone-muted` body on a lit field | 2.90–3.52:1 | 4.5+ |
| Booking stepper, steps not yet reached | 1.94:1 | 4.5+ |
| Language switcher, inactive locales | 2.77:1 | 4.5+ |
| Footer and mobile menu small text | ~2.4:1 | 4.5+ |
| `/speak` numerals (`text-ink/40`) | 2.48:1 | 4.5+ |
| Call to action, every page | 1.53–1.85:1 | improved, see below |

### The header bug worth remembering

Under `prefers-reduced-motion`, Scene I collapses to **zero height**, so the
section beneath the header is Scene II — which is dark. `useHeaderTone`
measured that correctly. But the collapsed Scene I went on calling
`setStageTone("light")`, and a declared tone outranks a measured one, so the
header rendered dark ink on the dark stage at **1.06:1**. The entire primary
navigation was invisible, and only for the readers who had asked for the
accommodation.

Two rules came out of it, both now in the code:

- Reporting a colour is not motion. `Scene01Horizon` subscribes to its own
  progress under reduced motion too.
- **A section with no height is not beneath anything, and says nothing.** A
  declaration that outranks a measurement has to be worth more than one.

## Still open

The scroll-aware sweep reports **101 distinct nodes** below threshold, down
from 138 before the call-to-action scrim. They are not yet resolved, and the
honest reason is that the instrument cannot currently separate two cases:

- text genuinely sitting on a bright part of a light field, and
- text captured mid-reveal at an arbitrary scroll position, where the field is
  at a brightness the reader never actually stops on.

One sample in the current run reports a pure black background during a
transition, which is the shape of the problem. Resolving this needs a probe
that settles the scene before sampling — waits for scroll-driven values to
come to rest — rather than screenshotting wherever the scroll happens to land.

Also open: two brass labels on `/legal/imprint` measure 4.45:1 and 4.46:1
against a 4.5 target. That is inside this instrument's own error, and fixing
it means darkening a brand colour, so it is recorded rather than changed.

## The legibility floor

`LitGround`'s `dim` and `PageHero`'s `dim` are legibility floors, not taste
settings, and both are documented in the components themselves. Ivory body
copy on an undimmed field measures about 2:1 — visible, and not readable. The
pages that failed were the ones that passed `0.25`, `0.35`, or nothing at all.
Where a preset is bright, `0.5` is still not enough, and the value is derived
from the measurement rather than chosen.

# Lusian — art direction

The whole site. Everything here is implemented; nothing is aspirational. The
homepage was built first and signed off; the system has since been rolled
across every interior page.

---

## 1. What was wrong

The previous site was competent and generic. A census of the old homepage found
the same five moves repeated in every section: a tiny tracked-out monospace
eyebrow, an editorial serif headline, a paragraph of restrained grey body copy,
a large empty area, a hairline, next section. Two-column grids. Flat rectangles
of beige, black, petrol and brown stacked vertically. Faint abstract line
drawings floating in voids. Everything faded and rose by twenty-four pixels.

It read as an architecture studio, an annual report, or a design-school project
— and, more damningly, as something assembled from a pattern library rather than
authored. The typography was doing all the work and the page had no physical
existence: no light, no material, no depth, no scale, no camera. Whitespace
surrounded nothing.

The engineering underneath was sound and is preserved intact.

---

## 2. The three principles

**Light before graphics.** Every field on the page is a picture of a real
lighting condition — a source, a surface, an occluder — and not a gradient.
If a composition cannot be described as illumination interacting with a
material, it is cut. Two presets were cut on exactly this test (`apron` became
a lens flare; `courtyard` became a kaleidoscope).

**The camera moves, not the content.** A headline that fades out is a slide. A
headline the frame withdraws from is an object in a room. Scenes are built from
camera, reveal and material, and fade-and-rise is demoted to a fallback.

**One dominant object per frame.** At any scroll position, one thing is the
subject. Everything else is the room it is in.

---

## 3. Typography

Three roles. Not three fonts used loosely — three named behaviours, each with a
job, each implemented as a utility in `globals.css`.

| Role | Face | Where it is used | Why |
| --- | --- | --- | --- |
| **STATEMENT** | Newsreader (Latin) / Amiri (Arabic) | The opening sentence, the arrival, the close | Three times on the page. The serif is now an event, not the page's voice. |
| **STRUCTURE** | Archivo (Latin) / IBM Plex Sans Arabic | Every other headline: the two disciplines, the capabilities, the turn, the ledger, the argument | Carries the weight the serif used to carry, at a scale the serif could not survive. |
| **VOICE** | Archivo / Plex Arabic | Standfirsts, points, captions, and — at interface scale, as `label-ui` — every action | Reading text and interface text in one family. |

`label-mono` survives only for genuine machine values: codes, booking
references, timestamps, coordinates. Monospaced small capitals now mean
"this is a machine value", which is the only thing they ever honestly meant.

### Archivo was tested, not assumed

Specimens were rendered at the real sizes beside the LUSIAN wordmark, beside
Newsreader, beside the Arabic faces and against real German copy before it was
adopted. It sits with the wordmark because both are geometric and level; it does
not read as a fashion label because it is never set in tracked capitals; it does
not read as a Swiss studio because it is never set flush-both-edges in a grid.

### The width axis is the division voice

Archivo is variable on `wdth`, and that axis carries the difference between the
two practices without changing typeface:

```
voice-cool   wdth 88   weight 600   tracking -0.035em   leading 0.92
voice-warm   wdth 108  weight 400   tracking -0.02em    leading 1.02
```

Aviation is narrow, heavy and tight — compressed, technical, dense. The private
practice is wide, light and open. A scene sets the voice; every structural
heading inside it inherits it. The same word looks like a different firm.

Arabic has no width tradition, so the same distinction is carried there by
weight and leading instead (600/1.34 cool, 400/1.44 warm) — stated explicitly
rather than left to the variable axis to fail silently.

### Arabic optical scale

`--ar-struct: 0.84` and `--ar-state: 0.8` multiply every headline size under
`:lang(ar)`, and reset to 1 for a Latin run inside Arabic. Arabic set at a Latin
headline's numerical size carries more visual mass, so an Arabic screen came out
heavier than the English one it was supposed to equal. The multiplier is applied
**at the call site, in the same declaration as the size** — the earlier attempt
to correct this in a `:lang(ar)` rule set `font-size` in `em`, which resolves
against the parent and threw the stated size away. Every Arabic headline on the
site was rendering at about 13px. See `docs/LOCALISATION.md`.

---

## 4. Light and material

`src/components/light/model.ts`. Not a gradient generator. Each preset declares
a `condition` in plain words — a preset that cannot be described as a real place
does not belong in the file.

The maths follows from the description: inverse-square falloff with a floor;
grazing incidence on a receding plane, so a floor dims as it recedes and a wall
does not; contact-hardening penumbrae, so a shadow is sharp where its occluder
touches the surface and softens as it travels; separate colour temperatures for
lit and shadow; and value noise that **modulates** the light rather than being
overlaid on it, which is the difference between a surface and a gradient with
grain on top.

| Preset | Condition | Used by |
| --- | --- | --- |
| `hangar` | Low dawn light through a hangar opening | Scene I (shadow side), Scene III |
| `plaster` | Daylight across a plastered wall | Scene I (daylight side), the argument |
| `terminator` | One volume between a cold opening and a warm interior | Scene II, Scene IV, Scene VI |
| `aperture` | Late sun through a high opening, falling on stone | Scene IV |
| `stone` | Daylight filling a stone room long after the sun has left the wall | Scene V |

`aperture` and `stone` are both warm and both belong to the private practice,
and they are deliberately different *conditions*, not the same condition in two
tints: `aperture` is a hard shaft with an occluder edge, `stone` is fill — low
intensity, high ambient, a soffit shadow across the top, and the stone's own
courses visible in it. Turning petrol into umber was the failure mode named in
the brief, and this is the answer to it.

Each field renders at a quarter of device resolution and is upscaled by the
browser (light of this kind has no high-frequency detail), repaints only when
the driving value changes by more than 0.0025, pauses entirely when off screen,
and paints one static frame under reduced motion.

---

## 5. The instrument

The route network is a **motif, not a rule**. It is drawn in Scene III, travels
into Scene IV where it morphs from route arcs to horizon contour, withdraws to
almost nothing as the turn completes, is absent for the whole of the private
practice, and returns once in Scene VI to retract its own draw and collapse to a
point before disappearing.

It goes silent through Scene V on purpose. The private practice is about a
person's life and technical geometry has nothing useful to say about it.

---

## 6. The six scenes

| | Scene | Length (desktop / tablet / phone) | The event |
| --- | --- | --- | --- |
| I | Horizon | 2.6 / 2.2 / 1.9 | A light terminator crosses the opening sentence; the camera withdraws to half size and vacates the lower frame for two structural beats |
| II | Two Worlds | 2.9 / 2.5 / 2.1 | One volume, lit cold from one side and warm from the other, the boundary sweeping across it while the type changes voice in place |
| III | The Operation | 3.6 / 3.05 / 2.5 | A lit floor with the network over it; the camera pushes in; capabilities take the frame one at a time, set large enough to be cropped |
| IV | The Turn | 2.2 / 1.9 / 1.6 | The cold field gives way to a warm opening beneath it; the arcs flatten to contour; the instrument withdraws |
| V | Arrival | 4.2 / 3.5 / 2.8 | An aperture opens from a slot of light to a whole room; four fragments scattered in depth converge into one column; six places named |
| VI | The Close | 2.4 / 2.05 / 1.7 | The instrument retracts and collapses to a point; exposure closes down; the statement dims as the invitation arrives |

Between V and VI, **the argument** sits on ground that does not move. After five
pinned scenes the reader has earned something to stand on, and the four
commitments are the one place on the homepage that wants to be read rather than
experienced.

### Scene lengths are CSS, not JavaScript

`--scene-d` / `--scene-t` / `--scene-m` are resolved by media query, so the
section height is correct on the first paint and costs no layout shift.

### Scene shoulders

A pinned scene releases by scrolling away, so for exactly one viewport at every
boundary the screen is two stages divided by a horizontal line. If the two sides
differ in value or hue, that line reads as a tear — the precise failure the whole
direction is trying to avoid. So a scene may close down onto the ground its
successor opens on, and open up from the ground its predecessor closed on.

The shoulder stops at 0.72 opacity, not 1. Taken all the way to a flat colour it
hides the seam but replaces it with a dead frame, and a boundary viewport is a
long time to spend on nothing — longer still on a tall tablet in portrait.

---

## 7. Motion roles

**CAMERA** — the frame moves relative to a larger world. Scene I withdraws from
the sentence; Scene III pushes into the network; Scene V drifts 5% across four
viewports, the slowest move on the page.

**REVEAL** — masking. Scene I's terminator has a 19% penumbra, so a glyph is
never half-cut: it is lit, in shadow, or in the gradient between, which is a
condition rather than an artefact. Scene V's aperture opens from a horizontal
slot to the full frame, warm and horizontal against Scene I's cold and vertical.

**MATERIAL** — light, weight and tone change without anything moving. The
terminator sweep in Scene II; the exposure closing down in Scene VI; the width
axis shifting between voices.

**Fade-and-rise** is now secondary: interface content, small utility
transitions, the argument's settling reveal, and the reduced-motion fallback.

**Stillness is part of the choreography.** The last fifth of Scene VI has no
event at all.

---

## 8. Whitespace, and the tension that justifies it

| Where | The tension |
| --- | --- |
| Scene I, lower frame after the pull-back | The sentence has shrunk and left a space. Something is going to be said in it. |
| Scene II → III boundary | Both disciplines have been named and neither has been proved. |
| Scene III → IV boundary | The aviation practice has finished speaking and the page has not yet turned. The held breath before the turn. |
| Scene V, the room around the ledger | The room is larger than the four lines in it, which is the point: hundreds of decisions, and only four things to say about them. |
| Scene VI, the lower half before the CTA | The invitation has been made and the answer has not arrived. |

---

## 9. Desktop, tablet, phone

**Desktop (≥1280px).** Full scene lengths, the widest type, the largest camera
moves.

**Tablet (768–1279px), a primary target.** Its own length tier, because a
portrait iPad is 1366 tall: a scene given its desktop length there is half as
long again in pixels as the same scene on a laptop, which turns a paced sequence
into a slog. Layout switches that used to fire at `lg` (1024px) and cramped
iPad portrait have been moved or removed.

**Phone (<768px).** A separate choreography, not compressed desktop lengths. No
scene exceeds 2.8 viewports. Scene V's ledger is the clearest case: on desktop
four fragments are scattered through the room in depth and converge; on a phone
the same four lines mostly accumulate — arriving one after another and staying —
because a 393px frame cannot hold a scatter without throwing the text past both
edges. One CSS custom property, `--scatter`, carries that difference.

**Reduced motion.** Scenes un-pin and take their natural height; every beat
becomes an ordinary block in normal flow; each light field paints one static
frame at the position its scene settles on. Same DOM, same copy, same order.

---

## 10. The interior pages

The homepage is six scenes. An interior page is a document, and it is built the
other way round: it holds still, it is read rather than experienced, and its
authority comes from type and light rather than from choreography.

**One ground per movement, not one per section.** The aviation page used to be
eight stacked rectangles — petrol, ivory, petrol, paper, petrol, ivory, dune —
each announcing a new subject with a new colour. It is now three movements: the
position stated in daylight, the practice shown on a hangar floor, the method
set down in daylight again. Sections that belong together share a ground and
are separated by space and by a change in the size of the type. Every page
follows the same rule, and adjacent light sections were collapsed onto one
ivory rather than alternating paper and dune.

**The light is a room, not a wash.** `LitGround` renders the field one viewport
tall and sticky, because a `Surface` stretched over a four-thousand-pixel
section loses the geometry it is built on: the horizon lands somewhere
arbitrary, the pool becomes a soft smear several screens high, and small type
ends up set on the brightest part of it. That happened — the sector list on the
aviation page was barely legible against its own light. A reading section also
takes a `dim`, because you read away from the window.

**Each page opens in the condition that belongs to its subject.** Aviation on a
hangar floor in `voice-cool`; the private practice and the destinations in a
quiet stone room in `voice-warm`; the firm, the journal and the legal pages on
the plastered wall; `speak` on the terminator, which is the volume both
divisions share. The closing invitation is the same room on every page.

**What was removed.** The monospace eyebrow with its tick hairline, at the head
of every section on the site. The italicised accent word in every page title.
The hairline rules used as section boundaries and as list separators — kept
only where a list is genuinely tabular. The two giant ghosted wordmarks used as
watermarks behind the speak hero and the closing call. `label-mono` now appears
in seven places, and every one of them is a machine value: plate references,
IANA timezone identifiers, market codes, coordinate readouts, and a loading
counter.

## 11. Photography

The design is complete without photography and becomes extraordinary with it.
Every intended position is specified in `docs/PHOTOGRAPHY.md` — subject,
framing, focal point, orientation, light direction, crop, emotional function,
movement, desktop composition and mobile crop, for each. No image host was
reachable from the build environment, so nothing is hotlinked and nothing is
placeholder-shaped: the light system stands on its own until real photography
replaces or sits beneath it.

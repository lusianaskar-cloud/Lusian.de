# Lusian — photography

The design is complete without photography and becomes extraordinary with it.

No image host was reachable from the build environment, so nothing on the site
is hotlinked and no position is a grey rectangle waiting to be filled. Each
position below is currently carried by the light system in
`src/components/light/model.ts`, and each is specified so that a commissioned or
licensed photograph can be dropped in without redesigning the scene.

## What every position must be shot to

Ten things, for each frame:

1. **Subject** — the one thing in the picture.
2. **Framing** — how much of it, and how close.
3. **Focal point** — where the eye lands, and what is soft.
4. **Orientation** — landscape, portrait, or both, and which is primary.
5. **Light direction** — where the source is, relative to the subject and the camera.
6. **Approximate crop** — what the site will use, versus what should be shot.
7. **Emotional function** — what the reader should feel, which is not the same as what they should see.
8. **Movement** — how the frame behaves under scroll.
9. **Desktop composition** — where the subject sits in a 16:9-ish frame with type over it.
10. **Mobile crop strategy** — what survives when the frame becomes 9:19.5.

## Rules for all of them

**Prefer:** real operational environments; hard directional daylight; one light
source with a describable origin; long lenses and compression; deep shadow that
holds detail; surfaces with grain — concrete, painted metal, stone, plaster,
glass; people at a distance and in scale, doing something.

**Avoid:** stock-library gloss; wide-angle hero shots of aircraft on stands at
sunset; anything with lens flare; HDR; composites; blue-hour airports with
motion-blurred vehicles; smiling advisers in glass boxes; hands on tablets;
skylines shot from a helicopter; anything that could be mistaken for a bank's
brochure or a business-class advertisement; recognisable client aircraft,
liveries or logos; recognisable private residences; identifiable faces without
a release.

**Never:** an image that implies a client, a project, a jurisdiction, an
approval or an outcome the firm cannot evidence.

---

## P1 · Scene I, shadow side — the hangar floor

| | |
| --- | --- |
| **Subject** | A hangar floor at dawn, empty, with the opening out of frame to the right. |
| **Framing** | Wide, low camera, floor filling the lower two-thirds, the far wall in shadow above. |
| **Focal point** | The pool of light where it meets the floor. Everything above the horizon soft. |
| **Orientation** | Landscape primary; a portrait variant shot at the same time. |
| **Light direction** | Low, raking, from the right at roughly 15° above the floor plane. |
| **Crop** | Shoot 30% wider than needed on all sides; the site crops to the lower two-thirds. |
| **Emotional function** | Scale, and the fact that work happens here before anyone else is awake. |
| **Movement** | The frame holds; a light terminator crosses it as a mask. The photograph does not move. |
| **Desktop** | The pool sits right of centre, low. The opening sentence sits upper-left, over the shadow. |
| **Mobile** | Crop to the pool and the floor. Lose the far wall entirely. |

## P2 · Scene I, daylight side — the plastered wall

| | |
| --- | --- |
| **Subject** | A plastered interior wall, nothing on it, lit from a window out of frame upper-left. |
| **Framing** | Flat to the wall, no perspective, no corner in shot. |
| **Focal point** | None. This is a surface, not a subject. Even focus. |
| **Orientation** | Both, shot square and cropped. |
| **Light direction** | Diffuse, upper-left, a very slow falloff to the lower-right. |
| **Crop** | Any. It must tile-crop without a visible feature. |
| **Emotional function** | Calm, and enough texture that the page does not feel like a screen. |
| **Movement** | None. It is the ground the opening sentence is set on. |
| **Desktop** | Full bleed behind the sentence. Contrast must stay under 8% across the frame. |
| **Mobile** | Same, cropped anywhere. |

## P3 · Scene III — the operation

| | |
| --- | --- |
| **Subject** | An apron or maintenance floor at working distance: markings, a service vehicle, structure. No hero aircraft. |
| **Framing** | Long lens, compressed, shot across the space rather than into it. |
| **Focal point** | A single piece of ground equipment or a floor marking, mid-frame. The rest falls off. |
| **Orientation** | Landscape primary. |
| **Light direction** | Hard, from one side, industrial or early morning. Shadows must be legible as shapes. |
| **Crop** | Shoot for a 2.4:1 crop with 20% margin; the camera pushes in 16% over the scene. |
| **Emotional function** | This is a real operation with real constraints, and someone understands it. |
| **Movement** | Camera push, `scale` 1 → 1.16 with a 4% lateral drift. Must survive a 16% enlargement, so shoot at full resolution. |
| **Desktop** | Subject right of centre; capability headings occupy the left two-fifths at large size. |
| **Mobile** | Crop to the subject and one shadow. The network overlay reduces to a fragment. |

## P4 · Scene IV — the turn

| | |
| --- | --- |
| **Subject** | A structural opening — a doorway, a reveal, a gap between two volumes — with cold light on one side and warm on the other. |
| **Framing** | Square to the opening, the edge of the aperture in frame. |
| **Focal point** | The edge itself, where the two temperatures meet. |
| **Orientation** | Landscape primary; portrait variant essential, this is the scene that suffers most on a phone. |
| **Light direction** | Two sources: daylight beyond, warm interior light on the near side. |
| **Crop** | The edge must be able to sit anywhere between 35% and 65% of the frame width. |
| **Emotional function** | Transition, deliberately made rather than merely happening. |
| **Movement** | The cold field fades away over the warm one. Two exposures of the same frame would be ideal — one cold, one warm, cross-faded. |
| **Desktop** | The opening right of centre; *Precision, turned inward* sits left, in the shade. |
| **Mobile** | Crop to the edge. Lose both extremes. |

## P5 · Scene V — arrival

The most important photograph on the site, and the one it is worth commissioning.

| | |
| --- | --- |
| **Subject** | A quiet interior — stone or plaster, one aperture, late light. Not a lobby, not a villa, not a view. A room a person could arrive in. |
| **Framing** | Static, level, one-point. The room is the subject; no furniture in focus. |
| **Focal point** | The far wall where the light lands. Foreground soft and empty. |
| **Orientation** | Landscape primary; a portrait frame of the same room, same hour, is required. |
| **Light direction** | High and to one side, an hour after the sun has left the wall. Fill, not shaft. |
| **Crop** | The scene opens a horizontal slot from 38–62% to full frame; the picture must be legible at both. |
| **Emotional function** | Arrival. Relief. The sense that a long, complicated thing has finished. Not luxury. |
| **Movement** | Held; the aperture mask opens over it, and the frame drifts 5% across four viewports. |
| **Desktop** | Light landing right of centre; the statement and then the ledger set left, in the quieter half. |
| **Mobile** | Crop to the aperture and the wall it lights. The ledger accumulates over the darker lower half. |

## P6 · Scene VI — the close

| | |
| --- | --- |
| **Subject** | The same volume as P4, at last light. Optional: the page may close on light alone. |
| **Framing** | Wider than P4, the opening small in the frame. |
| **Focal point** | Deliberately none — this frame is a value, not a subject. |
| **Orientation** | Landscape primary. |
| **Light direction** | Whatever is left of it. |
| **Crop** | Any; exposure closes down to 0.7 over the scene. |
| **Emotional function** | Rest. The end of something. |
| **Movement** | None. The instrument collapses to a point over it and disappears. |
| **Desktop** | Nothing competes with the CTA. If the photograph draws the eye at all, it is the wrong photograph. |
| **Mobile** | Same. |

---

## Licensing

Every image must be either commissioned with a full transfer, or licensed under
terms that permit commercial use on the firm's website in all three language
editions, with the licence recorded in `docs/ASSETS.md` alongside the file. No
hotlinking, ever — including from hosts that permit it.

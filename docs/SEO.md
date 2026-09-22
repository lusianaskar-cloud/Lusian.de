# What the site tells machines

Two things on this site are written for software rather than for a reader: the
social card a link unfurls into, and the JSON-LD that says what the firm is.
Both are assertions, and both are held to the copy's standard — with one extra
rule, because a reader can see the hedging around a sentence and a crawler
cannot.

## The rule

**Structured data may only contain what the site already substantiates.**

A placeholder stops looking like a placeholder the moment a crawler quotes it.
`contactChannels` in `src/lib/content/site.ts` holds deliberately obvious
placeholders — `enquiries@example-placeholder.com`, `+00 000 000 0000` — and
they are exactly the kind of thing that must never reach a machine-readable
block, where the obviousness is lost.

So `src/lib/seo/structuredData.ts` carries the name, the domain, the two
divisions, the six markets and the languages, and deliberately carries no
postal address, telephone, email, logo, founder, founding date, headcount,
rating, review, award or price. There is a test for this in the verification
sweep: the served JSON-LD is grepped for each of those keys in all three
languages, and finding one is a failure.

Anything added here later needs a source in the repository first.

## The social card

`src/app/[lang]/opengraph-image.tsx`, one per language, 1200×630.

The site declared `twitter:card: summary_large_image` and shipped no image —
the worst of both, because every share rendered an empty frame where a large
image had been promised. The card carries the wordmark, the two divisions and
the domain. Nothing else, for the reason above.

Satori draws it, and Satori is not a browser. Four limits shaped the result,
and three of them **fail silently** — the build passes, every check passes, and
the card is quietly wrong. They are written down because nothing else will
catch them:

| Limit | What happens | What to do |
| --- | --- | --- |
| `inset: 0` is not understood | The layer collapses to nothing, the gradient never paints, and you get a flat card that builds cleanly | Set `top`, `left`, `width`, `height` explicitly |
| Words are laid out left to right whatever `direction` says | Arabic comes back correctly *shaped* and in the wrong *order* — it looks like real text and says the sentence backwards | Reverse the words (`order()`), and only for runs that are wholly Arabic |
| No canvas | `light/model.ts` cannot be used | The light is rebuilt from radial gradients |
| Arabic shaping is partial | **This one fails loudly.** Amiri and Noto Sans Arabic both abort the build with `lookupType: 5 - substFormat: 3 is not yet supported` — Satori's shaper does not implement contextual substitution format 3 | Use IBM Plex Sans Arabic, which shapes cleanly and is the face the site already uses for Arabic |

The light is mirrored for Arabic. `light/model.ts` sets the crossover cold
first and warm last because the volume is read left to right; read right to
left, that ordering has to swap or the card makes the argument backwards.

Fonts are vendored in `assets/fonts/` rather than fetched, because a build must
not depend on a third-party host being reachable and Satori needs raw bytes —
it cannot take the `next/font` handles the site itself uses, and it cannot read
woff2. See `assets/fonts/README.md` for the licences.

## Verifying it

The card is prerendered, so the artefacts are on disk after a build:

```
.next/server/app/{en,de,ar}/opengraph-image.body
```

Those are the PNGs. **Look at them.** Three of the four failures above produce
a file of the right size and type that is wrong in a way only the eye catches —
a flat card, or a sentence running backwards.

Over HTTP the card is served at the hashed URL in the page's own `og:image`
tag, not at the bare path:

```bash
curl -s http://localhost:PORT/ar \
  | grep -oP '<meta property="og:image" content="\K[^"]+'
```

> **A warning that cost an afternoon.** `next start` fails with `EADDRINUSE`
> if anything still holds the port, and then a *stale server from a previous
> build* answers instead — serving an old `.next` with no hydration and no new
> routes. It looks like a 404 on a route that exists, or a page that scrolls at
> a suspiciously perfect 60fps because no JavaScript is running. Always confirm
> `Ready` appears in the new server's own log before trusting a single number
> measured against it.

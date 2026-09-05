# Product notes

Architecture notes for work that is deliberately **not** built yet, plus two
things that are: what the trilingual layer actually turned out to be, and one
measured accessibility gap that is a design decision rather than a bug.

---

## Case studies

The design supports anonymised cases:

- **Aviation** — project type, region, challenge, scope, outcome
- **Private** — client profile, destination, scope coordinated, timeline, outcome

**Nothing is published until real engagements exist.** No invented clients, no
invented results, no fabricated metrics, no logo wall. Until then there is no
route and no navigation entry — an empty, honest gap is better than a
plausible fiction, and a fiction here would be the single fastest way to lose
the trust the rest of the site is built to earn.

When real cases exist, add `src/lib/content/cases.ts` alongside the other
content models and a `/work/[slug]` route. Reuse the Insights article shell.

## Known: the faint end of the muted ramp fails AA

Measured across `en`, `de` and `ar` at 1512 and 393, with colours resolved
through a canvas (the palette uses `color-mix()`, which a hand-rolled `rgb()`
parser reads as noise) and every fixed overlay and faded scene beat excluded:

| Colour | Ratio | Where | Count |
| --- | --- | --- | --- |
| `text-ivory/35` on the dark grounds | 2.99:1 | small labels in the pinned scenes and the footer | 432 |
| `text-ivory/40` | 3.51:1 | the scope-of-services notice in the footer | 66 |
| `text-ink/40` | 2.48:1 | the ordinal numerals — `01`, `02` … | 40 |
| `text-ink/45` | 2.87:1 | reading times on the Insights cards | 6 |
| `text-ivory/45` | 4.08:1 | phase labels on the private-advisory page | 6 |

The numbers are identical in all three languages — this is a property of the
palette, not of any translation.

To clear 4.5:1, **ivory needs ≥ 48% alpha on the dark grounds and ink needs
≥ 62% on the light ones** (measured against the lightest and darkest each is
actually used on). `--tone-fg-muted` was raised to 65% on `tone-light` for
exactly this reason and now clears everywhere; the values in the table are
inline utilities rather than tokens, and raising them changes the quiet
hierarchy the design leans on.

That is a design decision rather than a bug fix, so it is recorded here rather
than taken unilaterally. The smallest honest change is to lift the label ramp
to `/50` on dark and `/65` on light and leave the display type alone.

## Internationalisation — done

The site is published in English, German and Arabic. What was planned here has
been built; this section is kept as the record of what the shape actually is.

- **One contract.** `SiteContent` in `src/lib/i18n/types.ts` declares every
  string. Each bundle in `src/lib/content/locales/` satisfies it, so a missing
  or renamed string is a type error rather than an English word surfacing in a
  German page.
- **Structure is not translated.** Ids, slugs, hrefs, market coordinates,
  insight categories and scheduling provider keys stay in
  `src/lib/content/*`; the bundles carry only what a translator rewrites, and
  anything keyed by id is keyed by the same id in all three.
- **One locale reaches the client.** The server layout resolves the bundle
  through `next/root-params` and hands it to a client provider, so a page
  ships one language rather than three.
- **Routing.** `src/proxy.ts` (the Next 16 name for what was `middleware.ts`)
  negotiates `Accept-Language` against a stored preference and redirects to a
  locale prefix. Internal links are written without one and pick it up in
  `TransitionLink`, so navigation never round-trips the redirect.
- **Arabic is a second type system, not a fallback.** Amiri answers
  Newsreader, IBM Plex Sans Arabic answers Geist, tracking is switched off
  wherever the text is Arabic, and the display leading has its own floor.
- **The plot does not mirror.** Everything else does.

What is still open:

- The German and Arabic legal pages need a lawyer in each jurisdiction, not a
  translation of the English structure. See `docs/CONTENT-TODO.md`.
- A fourth language would want the bundles split per page; at three they are
  still comfortably readable end to end.

## A future private client area

An authenticated area could eventually hold, per engagement: the roadmap,
outstanding tasks, documents, appointments, providers, deadlines, status and
notes.

It is a different product with different obligations — authentication, data
residency, retention, access control, and a materially larger privacy policy.
It should not be grafted onto the public site, and nothing in the current
codebase assumes it.

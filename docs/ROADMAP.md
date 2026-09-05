# Product notes

Architecture notes for work that is deliberately **not** built yet. None of
this is wired into the site; it is recorded so the current implementation does
not make it harder later.

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

## Internationalisation — English, German, Arabic

The site is single-locale today. Two decisions already keep the door open:

1. **All copy lives in `src/lib/content/`,** never inline in components. A
   locale layer is a change to how those modules are resolved, not a rewrite
   of every page.
2. **Layout is logical, not physical** in most places — the codebase uses
   `inset-x`, `gap`, flex and grid rather than hard-coded left/right offsets.

What remains to be done properly:

- Adopt the App Router's `[locale]` segment and move the current tree beneath
  it. Set `lang` and `dir` on `<html>` from the segment.
- **Arabic must be genuine RTL**, not English composition with translated text
  poured in. That means auditing every remaining directional utility
  (`text-right`, `origin-left`, `-translate-x`, the scene clip-path directions
  in Scene 02, the Gulf constellation's label side) and mirroring where
  mirroring is correct. Some things must *not* mirror: the coordinate plot is
  geographic and stays as it is.
- Newsreader has no Arabic. An Arabic display face has to be chosen and paired
  deliberately — this is a type decision, not a fallback.
- Translations must be written, not machine-generated. A private-client
  audience will notice.

Do not add an i18n dependency before there is a second locale to serve.

## A future private client area

An authenticated area could eventually hold, per engagement: the roadmap,
outstanding tasks, documents, appointments, providers, deadlines, status and
notes.

It is a different product with different obligations — authentication, data
residency, retention, access control, and a materially larger privacy policy.
It should not be grafted onto the public site, and nothing in the current
codebase assumes it.

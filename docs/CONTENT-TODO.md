# Outstanding content

Everything the business must supply before this site is published. Each item is
also marked `TODO(client)` at its location in the source.

Nothing on this site invents company history, headcount, offices, credentials,
clients, results, statistics, testimonials or awards. Where a fact was unknown,
the slot was left open rather than filled.

**This holds in all three languages.** Anything outstanding in English is
outstanding in German and Arabic; nothing was quietly resolved in translation.
Where an item below names a locale bundle, it has to be supplied in each of
`src/lib/content/locales/{en,de,ar}.ts` — and the legal documents in
particular need a qualified lawyer per jurisdiction, not a translation of the
English structure.

---

## 1 — Blocking. The site must not go live without these.

| Item | Where |
|---|---|
| Legal entity name, legal form, registered address | `locales/*.ts` → `contact.addressLines`; `locales/*.ts` → `legal.pages.imprint` |
| Company registration number and VAT identification | `locales/*.ts` → `legal.pages.imprint` and `footer.registration` |
| Name of the person or persons representing the company | `locales/*.ts` → `legal.pages.imprint` |
| Real enquiry email address | `src/lib/content/site.ts` → `contactChannels.email` (currently `enquiries@example-placeholder.com`) — one value, all languages |
| Real telephone number, or delete the line | `src/lib/content/site.ts` → `contactChannels.phone`; used in the footer and on `/speak` |
| Production domain | `src/lib/content/site.ts` → `site.url` (drives canonical URLs, hreflang alternates, sitemap and Open Graph) |
| **Legal notice / Impressum** — drafted and reviewed by a lawyer | `locales/*.ts` → `legal.pages.imprint` — **once per jurisdiction, per language** |
| **Privacy policy** — must match what the deployed site actually does | `locales/*.ts` → `legal.pages.privacy` — **once per jurisdiction, per language** |
| **Website terms** | `locales/*.ts` → `legal.pages.terms` — **once per jurisdiction, per language** |
| **Disclaimer** — review the drafted scope-of-service wording | `locales/*.ts` → `legal.pages.disclaimer` — **once per jurisdiction, per language** |
| `ENQUIRY_WEBHOOK_URL` in the deployment environment | `src/app/api/enquiry/route.ts` |
| Scheduling provider credentials, if booking is to go live | `docs/SCHEDULING.md` |
| **The principal's name** — deliberately not inferred from anything | `src/lib/content/founder.ts` → `founder.name` — one value, all languages |
| **An editorial portrait of the principal** | `/about`, reserved slot |
| Exact awarded title of the Georgian qualification | `locales/*.ts` → `about.founder.trajectory` |
| Whether to publish a response-time or "read personally" promise | `locales/*.ts` → `contact.responsePromise` (null = claims nothing, in every language) |
| Confirmation of the three engagement-depth names | `locales/*.ts` → `gulf.levels.items` |

> The four legal pages are **prepared structures, not documents**. They list the
> sections such a document normally contains and mark every factual field as
> outstanding. Each page states this to the visitor in a visible notice. They
> must be written or reviewed by a qualified lawyer in the relevant jurisdiction.

## 2 — The principal

The background is carried exactly as supplied and nothing beyond it, in
`locales/*.ts` → `about.founder`. **Read the truthfulness rules at the top of
`src/lib/content/founder.ts` before editing any of it — they govern all three
languages, and a claim that is too large in Arabic is as wrong as one in
English.** In particular the principal is not described as an airline or
airport executive, a senior aviation consultant, a licensed commercial pilot,
an immigration expert, a lawyer, a tax adviser or an investment adviser, and no
duration, employer, degree title or result is claimed that was not given.

Outstanding, and visibly reserved on `/about`:

- Full name and an editorial portrait
- Exact awarded qualification titles, and expected completion of the ongoing
  Aviation Management programme
- Any professional membership or registration that can be evidenced
- Registered company details
- Coverage — markets the practice can act in directly rather than via partners
- How third-party specialists are selected and reviewed

If the name is added, set `founder.name`; the page falls back to "The
principal" until then.

## 3 — Insights

**Every entry is a demonstration placeholder, in all three languages** — the
slugs in `src/lib/content/insights.ts`, the text in `locales/*.ts` →
`insights.entries`. They exist so the layout, typography and routing can be
reviewed at realistic length. They are not research and are not sourced.

Protections currently in place — remove them only when real editorial replaces
the placeholders:

- a visible "Section in preparation" notice on `/insights`
- a `Demo` tag on every card
- a visible "Demonstration article" notice on every article page
- `robots: noindex` on `/insights` and on every article
- `/*/insights*` disallowed in `robots.ts`, for every locale
- articles excluded from `sitemap.ts`

## 4 — Photography

Three slots, briefed in `docs/ASSETS.md`. The `src` is set in
`src/lib/content/plates.ts`; the alt text, the on-frame brief and the caption
are translated, in `locales/*.ts` → `plates`. Until a `src` is set each renders
as a designed reserved frame carrying its own brief — **the layout is complete
without them**.

## 5 — Copy review

All copy is written to be defensible. Two rules were applied throughout and
should be held to in any edit:

1. **No promises about third-party decisions.** Nothing claims or implies an
   outcome for a visa, residency, licence, approval, transaction or investment.
2. **Regulated work is named as third-party work.** Legal, tax, immigration,
   investment and financial advice is described as provided by qualified
   professionals licensed in the relevant jurisdiction, coordinated by Lusian.

Both rules were applied to the German and Arabic separately rather than
carried across by translation, and they bind any future edit in any language.

The market descriptions on `/destinations` deliberately contain no statements
about visa categories, residency criteria, ownership rules, tax treatment or
thresholds, so that they cannot age into inaccuracy. Keep it that way.

## 6 — Not built, on purpose

`docs/ROADMAP.md` records what is deliberately left out — case studies
(nothing published until real engagements exist) and a future private client
area — together with one measured accessibility gap in the faint end of the
muted colour ramp, which is a design decision rather than a bug.

## 7 — Indicative commercial terms

`locales/*.ts` → `aviation.shapes.items` carries indicative durations
("2–6 weeks", "3–18 months"). Confirm or replace them, in each language.

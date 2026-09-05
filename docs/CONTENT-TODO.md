# Outstanding content

Everything the business must supply before this site is published. Each item is
also marked `TODO(client)` at its location in the source.

Nothing on this site invents company history, headcount, offices, credentials,
clients, results, statistics, testimonials or awards. Where a fact was unknown,
the slot was left open rather than filled.

---

## 1 — Blocking. The site must not go live without these.

| Item | Where |
|---|---|
| Legal entity name, legal form, registered address | `src/lib/content/site.ts` → `contactChannels.addressLines`; `src/lib/content/legal.ts` → `imprint` |
| Company registration number and VAT identification | `legal.ts` → `imprint`; footer strip in `src/components/chrome/SiteFooter.tsx` |
| Name of the person or persons representing the company | `legal.ts` → `imprint` |
| Real enquiry email address | `site.ts` → `contactChannels.email` (currently `enquiries@example-placeholder.com`) |
| Real telephone number, or delete the line | `site.ts` → `contactChannels.phone`; used in the footer and on `/contact` |
| Production domain | `site.ts` → `site.url` (drives canonical URLs, sitemap and Open Graph) |
| **Legal notice / Impressum** — drafted and reviewed by a lawyer | `legal.ts` → `imprint` |
| **Privacy policy** — must match what the deployed site actually does | `legal.ts` → `privacy` |
| **Website terms** | `legal.ts` → `terms` |
| **Disclaimer** — review the drafted scope-of-service wording | `legal.ts` → `disclaimer` |
| `ENQUIRY_WEBHOOK_URL` in the deployment environment | `src/app/api/enquiry/route.ts` |
| Scheduling provider credentials, if booking is to go live | `docs/SCHEDULING.md` |
| **The principal's name** — deliberately not inferred from anything | `src/lib/content/founder.ts` → `founder.name` |
| **An editorial portrait of the principal** | `/about`, reserved slot |
| Exact awarded title of the Georgian qualification | `founder.ts` → `trajectory` |
| Whether to publish a response-time or "read personally" promise | `site.ts` → `contactChannels.responsePromise` (null = claims nothing) |
| Confirmation of the three engagement-depth names | `src/lib/content/speak.ts` → `engagementLevels` |

> The four legal pages are **prepared structures, not documents**. They list the
> sections such a document normally contains and mark every factual field as
> outstanding. Each page states this to the visitor in a visible notice. They
> must be written or reviewed by a qualified lawyer in the relevant jurisdiction.

## 2 — The principal

`src/lib/content/founder.ts` carries the background exactly as supplied and
nothing beyond it. **Read the truthfulness rules at the top of that file before
editing it.** In particular the principal is not described as an airline or
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

**Every entry in `src/lib/content/insights.ts` is a demonstration placeholder.**
They exist so the layout, typography and routing can be reviewed at realistic
length. They are not research and are not sourced.

Protections currently in place — remove them only when real editorial replaces
the placeholders:

- a visible "Section in preparation" notice on `/insights`
- a `Demo` tag on every card
- a visible "Demonstration article" notice on every article page
- `robots: noindex` on `/insights` and on every article
- `/insights*` disallowed in `robots.ts`
- articles excluded from `sitemap.ts`

## 4 — Photography

Three slots, briefed in `docs/ASSETS.md`, configured in
`src/lib/content/plates.ts`. Until a `src` is set each renders as a designed
reserved frame carrying its own brief — **the layout is complete without them**.

## 5 — Copy review

All copy is written to be defensible. Two rules were applied throughout and
should be held to in any edit:

1. **No promises about third-party decisions.** Nothing claims or implies an
   outcome for a visa, residency, licence, approval, transaction or investment.
2. **Regulated work is named as third-party work.** Legal, tax, immigration,
   investment and financial advice is described as provided by qualified
   professionals licensed in the relevant jurisdiction, coordinated by Lusian.

The market descriptions on `/destinations` deliberately contain no statements
about visa categories, residency criteria, ownership rules, tax treatment or
thresholds, so that they cannot age into inaccuracy. Keep it that way.

## 6 — Not built, on purpose

`docs/ROADMAP.md` records three things deliberately left out: case studies
(nothing published until real engagements exist), the English/German/Arabic
locale architecture, and a future private client area. None is wired into the
site.

## 7 — Indicative commercial terms

`aviationEngagements` in `src/lib/content/aviation.ts` carries indicative
durations ("2–6 weeks", "3–18 months"). Confirm or replace them.

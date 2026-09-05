# Lusian

Corporate site for a two-division advisory practice — **Aviation Advisory** and
**Gulf Private Advisory** — published in English, German and Arabic.

Built as a static-first Next.js application: every marketing route is
prerendered in all three languages, motion is client-side and reduced-motion
aware, and no page depends on a runtime service except the enquiry endpoint.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 — tokens declared in `src/app/globals.css` |
| Motion | `motion` (Framer Motion 13) |
| Scrolling | `lenis` |
| Type | Newsreader (display) via `next/font/google`; Geist Sans + Geist Mono (self-hosted via the `geist` package) |
| Arabic type | Amiri (display) + IBM Plex Sans Arabic (interface), loaded only for `ar` |
| Languages | `en` · `de` · `ar` — routed by `src/proxy.ts`, contract in `src/lib/i18n/` |

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Structure

```
proxy.ts                   Accept-Language negotiation → /{locale}
src/
  app/
    robots.ts sitemap.ts   both cover all three languages
    api/                   enquiry + scheduling; outside the locale scheme
    [lang]/                every page, prerendered per language
      aviation/            Division 01
      private-advisory/    Division 02
      destinations/        the six Gulf markets, as one instrument
      about/               why the firm exists, and the principal
      speak/               ask · book · questions   (/contact redirects here)
      insights/  legal/[slug]/
      [...rest]/           anything unmatched, 404'd inside the locale
      dev-scene/[id]/      one scene alone, for review. 404s in production.
  components/
    scenes/                the pinned homepage scenes + Scene/Beat primitives
    chrome/                header, mobile menu, footer, preloader,
                           page-transition curtain, precision cursor, Lenis
    primitives/            Section, Reveal, LineReveal, ActionLink, Parallax…
    aviation/ gulf/ about/ speak/ insights/ home/ shared/
  lib/
    i18n/                  the translation contract, dictionary and provider
    content/
      locales/             en · de · ar — ALL copy lives here
      *.ts                 structure only: ids, slugs, coordinates, keys
    scheduling/            provider contract + Cal.com adapter
    motion.ts              shared easing curves and durations
    useRange.ts            scroll mapping that stays in JS (see the file)
    useSafeReducedMotion.ts  the preference, without a hydration mismatch
```

## The homepage is scenes, not sections

Eight scenes, seven of them pinned: the viewport holds while the composition
transforms with scroll. `components/scenes/Scene.tsx` documents how the
pinning, the lengths and the reduced-motion fallback work, and why it uses
native `position: sticky` rather than a pinning library.

`docs/DESIGN.md` has the full scroll story and the motion rules.

## Three languages, one contract

`src/lib/i18n/types.ts` declares `SiteContent` — every string on the site.
Each bundle in `src/lib/content/locales/` is written `satisfies SiteContent`,
so a missing or renamed string is a type error at build time rather than an
English word surfacing in a German page.

Two rules keep it workable:

1. **Nothing in the contract is a function.** The active bundle is handed from
   the server layout to a client provider, so it has to survive serialisation.
   A string that needs a value carries a `{token}` and is resolved with
   `format()`. That is also why a page ships one language, not three.
2. **Nothing in the contract is structural.** Ids, slugs, hrefs, coordinates
   and provider keys stay in `src/lib/content/*.ts`; the bundles carry only
   what a translator would rewrite, keyed by the same ids in all three.

| File | Holds |
|---|---|
| `locales/en.ts` `de.ts` `ar.ts` | every string, in that language |
| `site.ts` | the name, the domain, the enquiry channels |
| `markets.ts` | the six market ids, ISO codes and hub coordinates |
| `insights.ts` | slugs, categories — **every entry is a demonstration placeholder** |
| `founder.ts` | the principal's name — **read the truthfulness rules at the top** |
| `legal.ts` | the four legal slugs — **structures only, no drafted text** |
| `plates.ts` | the three photography slots |

Server components read copy with `getContent()` (which resolves the locale
through `next/root-params`); client components read it with `useContent()`.
Internal links are written without a locale prefix — `TransitionLink` adds it.

## Arabic

Arabic is a second type system rather than a translated one. Amiri answers
Newsreader and IBM Plex Sans Arabic answers Geist; both are declared ahead of
their Latin counterparts, so a mixed line still renders Latin fragments in the
site's own faces. Tracking is switched off wherever the text is Arabic —
letter-spacing breaks a joined script — and the display type has its own
leading floor. A Latin run that declares `lang="en"` keeps the Latin system.

The layout mirrors: directional utilities are logical, arrows point in the
reading direction, and Scene 02's two colour fields swap sides with the copy
they belong to. **The market plot does not mirror** — it plots real
coordinates, and a flipped Gulf would be wrong.

## Configuration

| Variable | Purpose |
|---|---|
| `ENQUIRY_WEBHOOK_URL` | Where `/api/enquiry` forwards submissions (CRM intake, mail provider, internal handler). **Until this is set the form tells the visitor it is not connected and offers the email address — it never pretends to have sent anything.** |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional bearer token sent with the forward. |
| `SCHEDULING_PROVIDER` | `calcom` to enable booking, or unset. See `docs/SCHEDULING.md`. |
| `CALCOM_API_KEY` + four event-type ids | Required when the provider is `calcom`. |

Review the booking interface end to end with synthetic availability:

```bash
SCHEDULING_PROVIDER=demo npm run dev
```

That provider is refused when `NODE_ENV` is production, so it cannot reach a
live site.

## Before this goes live

`docs/CONTENT-TODO.md` is the complete list of outstanding factual content —
company details, legal documents, photography and the enquiry endpoint. Every
item is also marked `TODO(client)` in the source, and anything outstanding in
English is outstanding in all three languages: the legal pages in particular
need a lawyer per jurisdiction, not a translation of the English structure.

`docs/ROADMAP.md` records one measured accessibility gap in the faint end of
the muted colour ramp, with the numbers and the smallest honest fix.

Design system reference: `docs/DESIGN.md`. Photography briefs: `docs/ASSETS.md`.

# Lusian

Corporate site for a two-division advisory practice — **Aviation Advisory** and
**Gulf Private Advisory**.

Built as a static-first Next.js application: every marketing route is
prerendered, motion is client-side and reduced-motion aware, and no page depends
on a runtime service except the enquiry endpoint.

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
src/
  app/                     routes, metadata, sitemap, robots, APIs
    aviation/              Division 01
    private-advisory/      Division 02
    destinations/          the six Gulf markets, as one instrument
    about/                 why the firm exists, and the principal
    speak/                 ask · book · questions   (/contact redirects here)
    insights/  legal/[slug]/
    dev-scene/[id]/        one scene alone, for review. 404s in production.
  components/
    scenes/                the pinned homepage scenes + Scene/Beat primitives
    chrome/                header, mobile menu, footer, preloader,
                           page-transition curtain, precision cursor, Lenis
    primitives/            Section, Reveal, LineReveal, ActionLink, Parallax…
    aviation/ gulf/ about/ speak/ insights/ home/ shared/
  lib/
    content/               ALL copy and data lives here — see below
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

### Content model

Every piece of copy and data on the site is in `src/lib/content/`. Nothing is
hard-coded in a page component. Files:

| File | Holds |
|---|---|
| `site.ts` | brand, navigation, hero copy, manifesto, differentiators, engagement, reach, legal notice |
| `aviation.ts` | Division 01 — positioning, capabilities, sectors, principles, engagement shapes |
| `gulf.ts` | Division 02 — positioning, services, journey, assurances |
| `markets.ts` | the six Gulf markets, including hub coordinates for the constellation |
| `insights.ts` | editorial scaffold — **all entries are demonstration placeholders** |
| `founder.ts` | the principal — **read the truthfulness rules at the top** |
| `speak.ts` | intents, common questions, engagement depth, regulatory boundaries |
| `legal.ts` | legal-page scaffolds — **structures only, no drafted text** |
| `plates.ts` | the three photography slots |

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
item is also marked `TODO(client)` in the source.

Design system reference: `docs/DESIGN.md`. Photography briefs: `docs/ASSETS.md`.

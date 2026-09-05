/**
 * The translation contract.
 *
 * Every locale bundle must satisfy this exactly, so a missing or renamed
 * string is a type error rather than an English word appearing in a German
 * or Arabic page. Add nothing to a page that is not declared here.
 *
 * ── Two rules that keep this workable ───────────────────────────────────
 *
 * 1. Nothing here is a function. The active locale's bundle is handed from
 *    the server layout to a client provider, so it has to survive
 *    serialisation. Where a string needs a value interpolated it carries a
 *    `{token}` and is resolved with `format()`.
 *
 * 2. Nothing here is structural. Ids, slugs, hrefs, coordinates, provider
 *    keys and ordering live in `src/lib/content/*`; this file carries only
 *    what a translator would rewrite. Anything keyed by id is keyed by the
 *    same id in all three bundles, which is how a market, an insight or a
 *    legal page keeps its identity across languages.
 */

/**
 * A headline line, optionally with one word set in the accent colour.
 *
 * The accent is a substring of `text`, not an index, because the emphasised
 * word lands in a different position in every language — and if a translator
 * drops it, the line simply renders without emphasis rather than breaking.
 */
export type Line = { text: string; accent?: string };

export type Entry = { title: string; body: string };
export type Named = { name: string; body: string };
export type NavItem = { label: string; href: string };

export interface SiteContent {
  meta: {
    descriptor: string;
    /** Fits a phone without wrapping. */
    descriptorShort: string;
    positioning: string;
    description: string;
    keywords: string[];
  };

  /**
   * Document titles and meta descriptions, keyed by route.
   * Separate from the on-page `meta` lines, which are visible typography.
   */
  seo: Record<string, { title: string; description: string }>;

  nav: NavItem[];
  speakNav: NavItem[];

  footer: {
    tagline: string;
    /** Shown until company registration details are supplied. */
    registration: string;
    columns: { title: string; links: NavItem[] }[];
  };

  contact: {
    addressLines: string[];
    /** Published only if the firm actually keeps the promise; null otherwise. */
    responsePromise: string | null;
    emailLabel: string;
  };

  ui: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
    siteMenu: string;
    /** `{name}` — the firm. */
    homeAria: string;
    headerCta: string;
    menuCta: string;
    scroll: string;
    language: string;
    languageShort: string;
    back: string;
    continueLabel: string;
    review: string;
    confirm: string;
    confirming: string;
    sending: string;
    send: string;
    optional: string;
    select: string;
    tryAgain: string;
    demo: string;
    toBeSupplied: string;
    /** `{id}` — the plate number. */
    plateReserved: string;
    portrait: string;
    previousMonth: string;
    nextMonth: string;
  };

  home: {
    hero: { lines: Line[]; resolve: string };
    manifesto: { headline: string; standfirst: string };
    twoWorlds: {
      labelShort: string;
      labelLong: string;
      headlineLarge: string;
      headlineSmall: string;
      settle: string;
      aviation: { index: string; line: string; points: string[] };
      privateAdvisory: { index: string; line: string; points: string[] };
    };
    aviationScene: { eyebrow: string; opening: string; link: string };
    turn: { line: string };
    arrival: { headline: string; closing: string[] };
    sequence: { headline: string; link: string };
    markets: { headline: string; note: string; link: string };
    argument: {
      eyebrow: string;
      headlineLines: string[];
      note: string;
      items: Entry[];
    };
    closing: { headline: string; body: string; cta: string };
  };

  aviation: {
    eyebrow: string;
    title: string;
    headlineLines: Line[];
    standfirst: string;
    meta: string;
    positioning: {
      eyebrow: string;
      headlineLines: string[];
      statement: string;
      support: string;
    };
    onSite: { eyebrow: string; headlineLines: string[]; body: string };
    capabilities: {
      eyebrow: string;
      headline: string;
      note: string;
      /** Order is the order they are read in, on the page and in Scene 03. */
      groups: { group: string; items: string[] }[];
    };
    sectors: { eyebrow: string; headlineLines: string[]; items: Named[] };
    approach: { eyebrow: string; headlineLines: string[]; items: Entry[] };
    shapes: {
      eyebrow: string;
      headline: string;
      items: { name: string; duration: string; body: string }[];
    };
    cta: { eyebrow: string; lines: string[]; body: string; label: string };
  };

  gulf: {
    eyebrow: string;
    title: string;
    headlineLines: Line[];
    standfirst: string;
    meta: string;
    positioning: {
      headlineLines: string[];
      statement: string;
      support: string;
      emphasis: string;
    };
    scope: {
      eyebrow: string;
      headline: string;
      note: string;
      /** `services` holds service ids, resolved against `scope.services`. */
      phases: { id: string; title: string; note: string; services: string[] }[];
      services: Record<string, Entry>;
    };
    journey: { eyebrow: string; headlineLines: string[]; note: string; steps: Entry[] };
    levels: {
      eyebrow: string;
      headline: string;
      note: string;
      items: { name: string; scope: string; body: string }[];
    };
    assurances: { eyebrow: string; headline: string; items: Entry[] };
    boundaries: { heading: string };
    destinationsNote: string;
    destinationsLink: string;
    cta: { eyebrow: string; lines: string[]; body: string; label: string };
  };

  markets: {
    eyebrow: string;
    titleLines: string[];
    standfirst: string;
    meta: string;
    explorer: { eyebrow: string; headline: string; note: string };
    /** `covered` carries `{list}`. */
    omissions: { heading: string; body: string; covered: string };
    cta: { eyebrow: string; lines: string[]; body: string; label: string };
    plot: { principalLocations: string; markets: string };
    entries: Record<
      string,
      {
        name: string;
        short: string;
        hub: string;
        cities: string[];
        line: string;
        body: string;
        character: string[];
        suits: string;
      }
    >;
  };

  about: {
    eyebrow: string;
    titleLines: string[];
    standfirst: string;
    meta: string;
    raison: { eyebrow: string; headline: string; body: string[] };
    founder: {
      role: string;
      opening: string;
      statement: string[];
      trajectory: Entry[];
      languagesLabel: string;
      languages: string[];
      nameFallback: string;
      nameNote: string;
      outstanding: { title: string; description: string }[];
    };
    definition: {
      eyebrow: string;
      headlineLines: string[];
      areLabel: string;
      areNotLabel: string;
      are: string[];
      areNot: string[];
    };
    recognition: {
      eyebrow: string;
      headline: string;
      aviationLabel: string;
      privateLabel: string;
      aviation: string[];
      privateAdvisory: string[];
    };
    commitments: { eyebrow: string; headlineLines: string[]; items: Entry[] };
    engagement: { eyebrow: string; headline: string; note: string; steps: Entry[] };
    reserved: {
      eyebrow: string;
      headline: string;
      note: string;
      items: { title: string; description: string }[];
    };
    cta: { lines: string[]; body: string; label: string };
  };

  speak: {
    eyebrow: string;
    titleLines: string[];
    standfirst: string;
    intents: { index: string; title: string; body: string; href: string; cta: string }[];
    questionsTeaser: { body: string; link: string };
    boundaries: {
      eyebrow: string;
      headlineLines: string[];
      note: string;
      coordinatedLabel: string;
      regulatedLabel: string;
      coordinated: string[];
      regulated: string[];
    };
    ask: {
      eyebrow: string;
      headline: string;
      standfirst: string;
      assurances: Entry[];
      ratherBook: string;
      practiceLegend: string;
      practices: { id: string; label: string; note: string }[];
      fields: Record<string, string>;
      messagePlaceholder: string;
      contactMethodLegend: string;
      /** Order matters: the first is the default and hides the phone field. */
      contactMethods: string[];
      addContext: string;
      addContextNote: string;
      supportLegend: string;
      supportAreas: string[];
      partySizes: string[];
      timeframes: string[];
      orgTypes: string[];
      projectTypes: string[];
      undecided: string;
      honeypot: string;
      consent: string;
      sent: { label: string; headline: string; body: string };
      unconfigured: string;
      failed: string;
      writeTo: string;
    };
    book: {
      eyebrow: string;
      headline: string;
      standfirst: string;
      steps: string[];
      /** `{current}`, `{total}`, `{name}`. */
      stepAnnouncement: string;
      confirmedAnnouncement: string;
      practiceQuestion: string;
      practices: { id: string; label: string; body: string }[];
      conversationQuestion: string;
      chooseTime: string;
      timesShownIn: string;
      /** `{zone}`. */
      allTimesIn: string;
      chooseDay: string;
      checking: string;
      noneThisMonth: string;
      nothingThisDay: string;
      detailsHeading: string;
      reviewHeading: string;
      confirmedLabel: string;
      confirmedHeading: string;
      fields: Record<string, string>;
      notesPlaceholder: string;
      summary: Record<string, string>;
      notConnected: { label: string; body: string; writeInstead: string };
      unavailableLabel: string;
      unavailableBody: string;
      errors: { notConfigured: string; taken: string; failed: string };
      emailSent: string;
      keepReference: string;
      manage: string;
      askInstead: string;
      consultations: Record<string, { name: string; duration: string; body: string }>;
    };
    questions: {
      eyebrow: string;
      headline: string;
      standfirst: string;
      disclaimer: string;
      askSomething: string;
      categories: { id: string; title: string; questions: { q: string; a: string }[] }[];
    };
  };

  insights: {
    eyebrow: string;
    titleLines: string[];
    standfirst: string;
    notice: { label: string; body: string };
    filter: string;
    all: string;
    /** Keyed by the category ids in src/lib/content/insights.ts. */
    categories: Record<string, string>;
    empty: string;
    articleNotice: { label: string; body: string };
    allInsights: string;
    /** `{title}` — appended to a demonstration article's document title. */
    demoTitle: string;
    cta: { eyebrow: string; lines: string[]; body: string; label: string };
    entries: Record<
      string,
      {
        title: string;
        standfirst: string;
        readingTime: string;
        /** Placeholder in place of a publication date. */
        date: string;
        sections: { heading: string; paragraphs: string[] }[];
      }
    >;
  };

  legal: {
    /** The scope-of-services notice, published in several places. */
    notice: string;
    outstanding: { label: string; body: string };
    toBeSupplied: string;
    otherPages: string;
    pages: Record<
      string,
      {
        title: string;
        eyebrow: string;
        standfirst: string;
        sections: { heading: string; body?: string; required?: string[] }[];
      }
    >;
  };

  notFound: { eyebrow: string; headline: string; body: string; home: string };

  plates: Record<string, { alt: string; brief: string; caption: string }>;
}

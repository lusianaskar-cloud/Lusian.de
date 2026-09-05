/**
 * Insights — EDITORIAL SCAFFOLD, structure only.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVERY ENTRY IS A DEMONSTRATION PLACEHOLDER, IN ALL THREE LANGUAGES.
 * These are not published research, not sourced, and must not be presented as
 * such. They exist so the layout, typography and routing can be reviewed with
 * realistic shapes. The demonstration marker is rendered visibly on every card
 * and article, and every one of these routes is noindex.
 *
 * Titles, standfirsts, section headings and body copy live in the locale
 * bundles keyed by these slugs.
 *
 * TODO(client): replace with real editorial. Delete any entry not replaced
 * before the site goes live — see docs/CONTENT-TODO.md.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const insightCategories = [
  "aviation",
  "gulf-markets",
  "mobility",
  "investment-environment",
  "operations",
  "relocation",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type Insight = {
  slug: string;
  category: InsightCategory;
  isDemo: true;
};

export const insights: Insight[] = [
  { slug: "the-fifteen-minute-margin", category: "aviation", isDemo: true },
  { slug: "reading-a-gulf-city", category: "gulf-markets", isDemo: true },
  { slug: "the-sequence-problem", category: "relocation", isDemo: true },
  {
    slug: "operational-readiness-before-the-ribbon",
    category: "operations",
    isDemo: true,
  },
  {
    slug: "capital-programmes-and-the-people-question",
    category: "investment-environment",
    isDemo: true,
  },
  { slug: "moving-a-business-and-a-family-at-once", category: "mobility", isDemo: true },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

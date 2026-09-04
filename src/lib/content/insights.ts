/**
 * Insights — EDITORIAL SCAFFOLD.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVERY ENTRY BELOW IS A DEMONSTRATION PLACEHOLDER.
 * These are not published research, not sourced, and must not be presented as
 * such. They exist so the layout, typography and routing can be reviewed with
 * realistic shapes. `isDemo` is rendered visibly on every card and article.
 *
 * TODO(client): replace with real editorial. Delete any entry not replaced
 * before the site goes live — see docs/CONTENT-TODO.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Insight = {
  slug: string;
  title: string;
  standfirst: string;
  category: InsightCategory;
  readingTime: string;
  /** Placeholder date — replace with real publication date. */
  date: string;
  isDemo: true;
  sections: { heading: string; paragraphs: string[] }[];
};

export const insightCategories = [
  "Aviation",
  "Gulf Markets",
  "Mobility",
  "Investment Environment",
  "Operations",
  "Relocation",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

const placeholderBody = [
  "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
  "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
];

export const insights: Insight[] = [
  {
    slug: "the-fifteen-minute-margin",
    title: "The fifteen-minute margin",
    standfirst:
      "Why turnaround discipline decides more of an airline's commercial position than its network plan.",
    category: "Aviation",
    readingTime: "6 min",
    date: "Sample entry",
    isDemo: true,
    sections: [
      { heading: "The premise", paragraphs: placeholderBody },
      { heading: "Where it breaks", paragraphs: placeholderBody },
      { heading: "What holds", paragraphs: placeholderBody },
    ],
  },
  {
    slug: "reading-a-gulf-city",
    title: "Reading a Gulf city before you commit to it",
    standfirst:
      "Six questions worth answering on the ground, and the order in which they should be asked.",
    category: "Gulf Markets",
    readingTime: "8 min",
    date: "Sample entry",
    isDemo: true,
    sections: [
      { heading: "Arriving with a brief", paragraphs: placeholderBody },
      { heading: "The questions", paragraphs: placeholderBody },
    ],
  },
  {
    slug: "the-sequence-problem",
    title: "The sequence problem",
    standfirst:
      "Most relocations fail on ordering, not on effort. A note on dependencies, and the two that are usually left too late.",
    category: "Relocation",
    readingTime: "5 min",
    date: "Sample entry",
    isDemo: true,
    sections: [
      { heading: "Dependencies", paragraphs: placeholderBody },
      { heading: "School places and banking", paragraphs: placeholderBody },
    ],
  },
  {
    slug: "operational-readiness-before-the-ribbon",
    title: "Operational readiness, long before the ribbon",
    standfirst:
      "What separates a terminal that opens well from one that merely opens on time.",
    category: "Operations",
    readingTime: "7 min",
    date: "Sample entry",
    isDemo: true,
    sections: [
      { heading: "Trials are not rehearsals", paragraphs: placeholderBody },
      { heading: "The second week", paragraphs: placeholderBody },
    ],
  },
  {
    slug: "capital-programmes-and-the-people-question",
    title: "Capital programmes and the people question",
    standfirst:
      "Regional infrastructure ambition is rarely constrained by funding. It is constrained by competent hands.",
    category: "Investment Environment",
    readingTime: "6 min",
    date: "Sample entry",
    isDemo: true,
    sections: [
      { heading: "The constraint", paragraphs: placeholderBody },
      { heading: "Consequences for sequencing", paragraphs: placeholderBody },
    ],
  },
  {
    slug: "moving-a-business-and-a-family-at-once",
    title: "Moving a business and a family at once",
    standfirst:
      "The two timelines pull against each other. A view on which one should set the pace.",
    category: "Mobility",
    readingTime: "5 min",
    date: "Sample entry",
    isDemo: true,
    sections: [
      { heading: "Two clocks", paragraphs: placeholderBody },
      { heading: "Which one leads", paragraphs: placeholderBody },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

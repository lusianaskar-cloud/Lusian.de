/**
 * Legal pages — SCAFFOLD ONLY, structure here and text in the bundles.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * NOTHING IN ANY LANGUAGE IS LEGAL ADVICE, AND NOTHING IS COMPLETE.
 * Each page sets out the sections a document of this kind normally contains
 * and marks every factual field as outstanding. The finished text must be
 * written or reviewed by a qualified lawyer in the relevant jurisdiction
 * before the site is published — and separately for each language it is
 * published in. See docs/CONTENT-TODO.md.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const legalSlugs = ["imprint", "privacy", "terms", "disclaimer"] as const;

export type LegalSlug = (typeof legalSlugs)[number];

export function isLegalSlug(value: string): value is LegalSlug {
  return (legalSlugs as readonly string[]).includes(value);
}

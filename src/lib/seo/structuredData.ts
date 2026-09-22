import { markets } from "@/lib/content/markets";
import { site } from "@/lib/content/site";
import { localeMeta, locales, type Locale } from "@/lib/i18n/config";
import { contentFor } from "@/lib/i18n/dictionary";

/**
 * The machine-readable description of the firm.
 *
 * Every page shipped without any structured data at all, which for a
 * professional-services firm is the one omission a search engine actually
 * notices: nothing told it what kind of business this is, what it does, or
 * where it does it.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHAT THIS IS ALLOWED TO SAY
 *
 * JSON-LD is an assertion in a form that machines quote back, so it is held
 * to the same standard as the page copy, and a stricter one than usual: a
 * reader can see the hedging around a sentence, a crawler cannot.
 *
 * It therefore carries only what the site already substantiates — the name,
 * the domain, the two divisions, the six markets, and the languages. It
 * deliberately carries NO:
 *
 *   - postal address, telephone or email. `contactChannels` holds obvious
 *     placeholders, and a placeholder published as structured data stops
 *     looking like a placeholder the moment a crawler quotes it.
 *   - logo or image, because no such asset exists yet.
 *   - founder, foundingDate, numberOfEmployees, or any history.
 *   - aggregateRating, review, award or priceRange. There are no clients to
 *     rate the firm and no prices to quote.
 *
 * Anything added here later needs a source in the repository first.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Strips the "01 — " that the division labels carry for display. */
function divisionName(label: string) {
  const at = label.indexOf("—");
  return at === -1 ? label.trim() : label.slice(at + 1).trim();
}

export function structuredData(locale: Locale) {
  const content = contentFor(locale);
  const base = `${site.url}/${locale}`;
  const { aviation, privateAdvisory } = content.home.twoWorlds;

  const entries = content.markets.entries as Record<string, { name: string }>;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: base,
        description: content.meta.description,
        knowsLanguage: locales.map((l) => localeMeta[l].tag),
        areaServed: markets.map((market) => ({
          "@type": "Country",
          name: entries[market.id]?.name ?? market.code,
          identifier: market.code,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: site.name,
          itemListElement: [aviation, privateAdvisory].map((division) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: divisionName(division.index),
              description: division.line,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: base,
        name: site.name,
        inLanguage: localeMeta[locale].tag,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };
}

/**
 * Serialised for a `<script type="application/ld+json">`.
 *
 * `<` is escaped so a stray angle bracket in translated copy cannot close the
 * script element early, which is the documented injection route out of a
 * JSON-LD block.
 */
export function structuredDataJson(locale: Locale) {
  return JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c");
}

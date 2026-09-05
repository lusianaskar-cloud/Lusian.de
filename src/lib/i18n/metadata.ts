import { defaultLocale, localeMeta, locales, type Locale } from "./config";

/**
 * Canonical and hreflang alternates for one page.
 *
 * Every page exists in all three languages at the same path under a different
 * prefix, so the alternate set is derivable rather than declared per page.
 * `x-default` points at English, which is also where an unnegotiated request
 * lands.
 */
export function alternatesFor(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path;

  return {
    canonical: `/${locale}${clean}`,
    languages: {
      ...Object.fromEntries(
        locales.map((other) => [localeMeta[other].tag, `/${other}${clean}`]),
      ),
      "x-default": `/${defaultLocale}${clean}`,
    },
  };
}

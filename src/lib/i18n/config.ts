/**
 * Locales.
 *
 * English is the source language. German and Arabic are full translations,
 * not machine output poured into the English composition — Arabic in
 * particular gets genuine right-to-left layout and its own typefaces.
 */
export const locales = ["en", "de", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  {
    /** As written in that language, which is how a switcher should read. */
    label: string;
    /** For the `lang` attribute and hreflang. */
    tag: string;
    dir: "ltr" | "rtl";
    /** Locale for Intl date and number formatting. */
    intl: string;
  }
> = {
  en: { label: "English", tag: "en-GB", dir: "ltr", intl: "en-GB" },
  de: { label: "Deutsch", tag: "de-DE", dir: "ltr", intl: "de-DE" },
  ar: { label: "العربية", tag: "ar", dir: "rtl", intl: "ar-u-nu-latn" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale) {
  return localeMeta[locale].dir;
}

/** Prefixes a site-relative path with the locale. */
export function localePath(locale: Locale, path: string) {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}` || `/${locale}`;
}

/** Strips a leading locale segment, returning the path without it. */
export function stripLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && isLocale(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

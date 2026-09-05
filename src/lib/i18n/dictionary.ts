import { lang } from "next/root-params";
import { notFound } from "next/navigation";

import { en } from "@/lib/content/locales/en";
import { de } from "@/lib/content/locales/de";
import { ar } from "@/lib/content/locales/ar";
import { isLocale, type Locale } from "./config";
import type { SiteContent } from "./types";

/**
 * The locale bundles, resolved on the server.
 *
 * This module imports all three, which is why nothing in a Client Component
 * may import it: `next/root-params` fails the build there, and that failure
 * is the guard rail. The active bundle reaches the client once, as a prop on
 * the provider in the root layout — so a page ships one language, not three.
 */
const bundles: Record<Locale, SiteContent> = { en, de, ar };

export function contentFor(locale: Locale) {
  return bundles[locale];
}

/**
 * The locale of the current request.
 *
 * `lang()` is the root parameter getter generated from `app/[lang]`, so any
 * server component or server utility can ask for it without prop drilling.
 * An unrecognised segment is a 404 rather than a silent fall back to English —
 * `/fr/aviation` should not quietly serve an English page under a French URL.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!value || !isLocale(value)) notFound();
  return value;
}

export async function getContent(): Promise<SiteContent> {
  return bundles[await getLocale()];
}

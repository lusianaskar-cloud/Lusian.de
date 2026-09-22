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
/**
 * Binds the last two words of a sentence so a paragraph cannot end on a lone
 * short word.
 *
 * `text-wrap: pretty` is set on every paragraph and does not settle this.
 * Chromium's implementation improves the rag of the closing lines but makes
 * no guarantee about the last one, and it was leaving "klar." alone on 49px
 * of a 405px measure. A no-break space is the typesetter's answer and the
 * only one that actually holds.
 *
 * It is deliberately narrow:
 *
 *  - only prose, over 60 characters, so labels and machine values are never
 *    touched;
 *  - only when the closing pair is short enough to fit a narrow column —
 *    German compounds run to thirty characters and binding one to its
 *    neighbour would trade a widow for an overflow;
 *  - only on a plain space, so a pair already bound stays as it is.
 *
 * Applied here rather than in the components because there is one dictionary
 * and a great many places that render a sentence from it.
 */
const WIDOW_MIN = 60;
const WIDOW_MAX_PAIR = 22;

function bindLastWords(value: string): string {
  if (value.length < WIDOW_MIN) return value;
  const at = value.lastIndexOf(" ");
  if (at < 1) return value;
  const tail = value.slice(at + 1);
  const before = value.lastIndexOf(" ", at - 1);
  const pair = value.slice(before + 1);
  if (pair.length > WIDOW_MAX_PAIR || tail.includes("\u00a0")) return value;
  return `${value.slice(0, at)}\u00a0${tail}`;
}

/** Walks a bundle once, binding the closing pair of every sentence in it. */
function typeset<T>(node: T): T {
  if (typeof node === "string") return bindLastWords(node) as T;
  if (Array.isArray(node)) return node.map(typeset) as T;
  if (node && typeof node === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) out[k] = typeset(v);
    return out as T;
  }
  return node;
}

const bundles: Record<Locale, SiteContent> = {
  en: typeset(en),
  de: typeset(de),
  ar: typeset(ar),
};

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

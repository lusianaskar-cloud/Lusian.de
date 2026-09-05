import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { LOCALE_COOKIE } from "@/lib/i18n/cookie";

/**
 * Locale routing.
 *
 * Every page lives under `/{locale}`, so a request without one is negotiated
 * and redirected. A stored preference wins over the browser's header — a
 * reader who has chosen Arabic should not be sent back to German by their
 * operating system on the next visit.
 *
 * `middleware.ts` is deprecated in this version of Next; the file is now
 * `proxy.ts` and the exported function is `proxy`.
 */
/**
 * Accept-Language, by hand.
 *
 * The header is small and the grammar is simple, and a negotiation library
 * would be a dependency on the edge for a twenty-line parse. Region subtags
 * are dropped before matching, so `de-AT` and `ar-AE` both resolve.
 */
function fromHeader(header: string | null): Locale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      const quality = q === undefined ? 1 : Number.parseFloat(q);
      return {
        tag: tag.trim().toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .filter((entry) => entry.tag && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    if (tag === "*") return defaultLocale;
    const primary = tag.split("-")[0];
    const match = locales.find((locale) => locale === primary);
    if (match) return match;
  }

  return null;
}

function negotiate(request: NextRequest): Locale {
  const stored = request.cookies.get(LOCALE_COOKIE)?.value;
  if (stored && isLocale(stored)) return stored;
  return fromHeader(request.headers.get("accept-language")) ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (isLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${negotiate(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  /**
   * Everything except the API, Next's own assets, and any path with a file
   * extension — which keeps /robots.txt, /sitemap.xml and everything in
   * /public out of the locale scheme, where they belong.
   */
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

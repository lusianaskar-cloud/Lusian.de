"use client";

import { usePathname } from "next/navigation";

import { locales, localeMeta, stripLocale, type Locale } from "@/lib/i18n/config";
import { useContent, useLocale } from "@/lib/i18n/context";
import { LOCALE_COOKIE } from "@/lib/i18n/cookie";
import { cn } from "@/lib/utils";

/**
 * Three languages, set inline.
 *
 * No globe, no dropdown, no flags — a flag is a country and Arabic is not a
 * country. With only three languages the whole set fits, each written in its
 * own language, and the current one simply holds full contrast.
 *
 * These are real anchors rather than transition links, deliberately. Changing
 * language changes the document's `lang` and `dir` and swaps the typefaces, so
 * a full navigation is both the honest behaviour and the one that cannot leave
 * a right-to-left page wearing a left-to-right layout.
 */
/**
 * Stores the reader's choice for a year, so it outlives their browser's
 * Accept-Language on the next visit. Module scope, not the component body:
 * writing to `document` while rendering is exactly what the compiler's
 * immutability rule is there to catch.
 */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({
  className,
  layout = "inline",
}: {
  className?: string;
  layout?: "inline" | "stacked";
}) {
  const active = useLocale();
  const content = useContent();
  const pathname = usePathname();
  const rest = stripLocale(pathname ?? "/");

  return (
    <nav
      aria-label={content.ui.language}
      className={cn(
        "flex items-center",
        layout === "inline" ? "gap-3" : "gap-5",
        className,
      )}
    >
      {locales.map((locale, i) => {
        const current = locale === active;
        return (
          <span key={locale} className="flex items-center gap-3">
            {i > 0 ? (
              <span aria-hidden className="block h-3 w-px bg-current/25" />
            ) : null}
            <a
              href={`/${locale}${rest === "/" ? "" : rest}`}
              hrefLang={localeMeta[locale].tag}
              lang={localeMeta[locale].tag}
              aria-current={current ? "true" : undefined}
              onClick={() => rememberLocale(locale)}
              className={cn(
                "label-ui text-[0.8125rem] transition-opacity duration-500",
                current ? "opacity-100" : "opacity-45 hover:opacity-100",
              )}
            >
              {localeMeta[locale].label}
            </a>
          </span>
        );
      })}
    </nav>
  );
}

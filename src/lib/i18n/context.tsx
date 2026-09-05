"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import { localeMeta, localePath, type Locale } from "./config";
import type { SiteContent } from "./types";

type LocaleValue = {
  locale: Locale;
  content: SiteContent;
  dir: "ltr" | "rtl";
  /** Tag for Intl date and number formatting. */
  intl: string;
};

const LocaleContext = createContext<LocaleValue | null>(null);

/**
 * Carries the active locale and its bundle to every client component.
 *
 * The bundle is passed in from the server layout rather than imported here,
 * so only the language being read is serialised into the page. Scenes, flows
 * and chrome then read copy the same way a server page does, which is why
 * nothing on this site prop-drills strings through eight scene components.
 */
export function LocaleProvider({
  locale,
  content,
  children,
}: {
  locale: Locale;
  content: SiteContent;
  children: ReactNode;
}) {
  const value = useMemo<LocaleValue>(
    () => ({
      locale,
      content,
      dir: localeMeta[locale].dir,
      intl: localeMeta[locale].intl,
    }),
    [locale, content],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function useLocaleContext() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useContent must be used inside LocaleProvider");
  }
  return value;
}

export function useContent() {
  return useLocaleContext().content;
}

export function useLocale() {
  return useLocaleContext().locale;
}

export function useDirection() {
  return useLocaleContext().dir;
}

export function useIntlLocale() {
  return useLocaleContext().intl;
}

/** Prefixes a site-relative path with the active locale. */
export function useLocalePath() {
  const { locale } = useLocaleContext();
  return useMemo(() => (path: string) => localePath(locale, path), [locale]);
}

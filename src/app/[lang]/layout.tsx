import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader, Amiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { notFound } from "next/navigation";

import "../globals.css";

import { site } from "@/lib/content/site";
import { isLocale, locales, localeMeta } from "@/lib/i18n/config";
import { contentFor } from "@/lib/i18n/dictionary";
import { alternatesFor } from "@/lib/i18n/metadata";
import { LocaleProvider } from "@/lib/i18n/context";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { Preloader } from "@/components/chrome/Preloader";
import { PrecisionCursor } from "@/components/chrome/PrecisionCursor";
import { TransitionProvider } from "@/components/chrome/TransitionProvider";

/**
 * STRUCTURE — the architectural voice.
 *
 * Archivo is here for its width axis, which does real work rather than
 * decorating: aviation sets it narrow and heavy (88/600) so the type reads
 * compressed, fast and technical, and the private practice sets it wide and
 * light (108/400) so it reads open and calm. One family, two physical
 * characters — which is how the two divisions differ in more than colour.
 *
 * It also solves German. A long compound at display size fits the narrow
 * axis without the size having to drop.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
  weight: "variable",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
});

/**
 * Arabic typography.
 *
 * Amiri answers Newsreader — a Naskh with the same editorial temperature as
 * the Latin display face — and IBM Plex Sans Arabic answers Geist for
 * interface text. Both are declared ahead of their Latin counterparts in the
 * Arabic font stacks, so an Arabic page renders Arabic glyphs from the Arabic
 * face and Latin fragments (TH Wildau, ORAT, an email address) from the same
 * faces the rest of the site uses.
 *
 * `preload: false` because a font imported by this layout would otherwise be
 * preloaded on every page in every language. English and German readers never
 * see these faces; Arabic readers get them on first paint through `swap`.
 */
const amiri = Amiri({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-amiri",
  weight: ["400", "700"],
  preload: false,
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-plex-arabic",
  weight: ["300", "400", "500"],
  preload: false,
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const content = contentFor(lang);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: content.seo.home.title,
      template: `%s — ${site.name}`,
    },
    description: content.meta.description,
    applicationName: site.name,
    keywords: content.meta.keywords,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: content.seo.home.title,
      description: content.meta.description,
      url: `${site.url}/${lang}`,
      locale: localeMeta[lang].tag.replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.home.title,
      description: content.meta.description,
    },
    robots: { index: true, follow: true },
    alternates: alternatesFor(lang, "/"),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#14181A" },
  ],
  colorScheme: "light",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const content = contentFor(lang);
  const { tag, dir } = localeMeta[lang];

  return (
    <html
      lang={tag}
      dir={dir}
      className={[
        GeistSans.variable,
        GeistMono.variable,
        archivo.variable,
        newsreader.variable,
        // Arabic faces are declared only where they are read.
        lang === "ar" ? `${amiri.variable} ${plexArabic.variable}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-full border border-ink px-6 py-3 label-ui focus:not-sr-only focus:fixed focus:start-6 focus:top-6 focus:z-[300] focus:bg-ivory focus:text-ink"
        >
          {content.ui.skipToContent}
        </a>

        <LocaleProvider locale={lang} content={content}>
          <SmoothScroll />
          <PrecisionCursor />

          <TransitionProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </TransitionProvider>

          <Preloader />
        </LocaleProvider>
      </body>
    </html>
  );
}

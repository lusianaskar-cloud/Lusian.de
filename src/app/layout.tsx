import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

import { site } from "@/lib/content/site";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { Preloader } from "@/components/chrome/Preloader";
import { PrecisionCursor } from "@/components/chrome/PrecisionCursor";
import { TransitionProvider } from "@/components/chrome/TransitionProvider";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  applicationName: site.name,
  keywords: [
    "aviation advisory",
    "airline consulting",
    "airport operations advisory",
    "ground handling optimisation",
    "Gulf relocation advisory",
    "private relocation UAE",
    "Saudi Arabia relocation",
    "private office Gulf",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.descriptor}`,
    description: site.metaDescription,
    url: site.url,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.descriptor}`,
    description: site.metaDescription,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#14181A" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-full border border-ink px-6 py-3 label-mono focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[300] focus:bg-ivory focus:text-ink"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <PrecisionCursor />

        <TransitionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </TransitionProvider>

        <Preloader />
      </body>
    </html>
  );
}

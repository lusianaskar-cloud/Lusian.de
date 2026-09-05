import type { MetadataRoute } from "next";

import { site } from "@/lib/content/site";
import { legalSlugs } from "@/lib/content/legal";
import { defaultLocale, localeMeta, locales } from "@/lib/i18n/config";

/**
 * Every page, in every language.
 *
 * Each entry carries its own `alternates.languages` set so a crawler can see
 * the three versions of a page as one page rather than three thin ones.
 *
 * Demonstration insight articles are deliberately absent — they are also
 * marked noindex until real editorial replaces them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/aviation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/private-advisory", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/destinations", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/speak", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/speak/ask", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/speak/book", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/speak/questions", priority: 0.6, changeFrequency: "monthly" as const },
    ...legalSlugs.map((slug) => ({
      path: `/legal/${slug}`,
      priority: 0.2,
      changeFrequency: "yearly" as const,
    })),
  ];

  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((other) => [
              localeMeta[other].tag,
              `${site.url}/${other}${route.path}`,
            ]),
          ),
          "x-default": `${site.url}/${defaultLocale}${route.path}`,
        },
      },
    })),
  );
}

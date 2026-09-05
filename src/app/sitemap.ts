import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { legalPages } from "@/lib/content/legal";

/**
 * Demonstration insight articles are deliberately absent — they are also
 * marked noindex until real editorial replaces them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/aviation", priority: 0.9 },
    { path: "/private-advisory", priority: 0.9 },
    { path: "/destinations", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/speak", priority: 0.9 },
    { path: "/speak/ask", priority: 0.7 },
    { path: "/speak/book", priority: 0.7 },
    { path: "/speak/questions", priority: 0.6 },
  ];

  const lastModified = new Date();

  return [
    ...routes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...legalPages.map((page) => ({
      url: `${site.url}/legal/${page.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}

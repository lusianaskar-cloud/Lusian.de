import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /**
       * Placeholder editorial must not be indexed as published research, and
       * the paths are per-locale now — so the patterns are too.
       */
      disallow: ["/*/insights", "/*/insights/", "/api/", "/*/dev-scene/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

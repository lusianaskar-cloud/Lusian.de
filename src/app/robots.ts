import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Placeholder editorial must not be indexed as published research.
      disallow: ["/insights", "/insights/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}

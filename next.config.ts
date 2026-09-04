import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formats first; Next negotiates per request.
    formats: ["image/avif", "image/webp"],
    /**
     * TODO(client): production photography should be served from your own
     * origin or CDN — add its host here. The Unsplash entry is left in place
     * so temporary development imagery can be dropped straight into
     * src/lib/content/plates.ts without a config change.
     */
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

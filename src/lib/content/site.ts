/**
 * Firm-level facts.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * Everything a translator would rewrite now lives in the locale bundles under
 * src/lib/content/locales/. What is left here is the same in every language:
 * the name, the domain, and the channels the firm can actually be reached on.
 *
 * PLACEHOLDER POLICY
 * Anything marked TODO(client) is a factual detail that must be supplied by
 * the business before launch. Nothing in this file invents history, headcount,
 * offices, credentials, clients or results.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const site = {
  name: "Lusian",
  wordmark: "LUSIAN",
  // TODO(client): confirm the production domain before launch.
  url: "https://www.lusian.de",
} as const;

export const contactChannels = {
  // TODO(client): supply the real enquiry address and telephone line. These
  // are deliberately obvious placeholders.
  email: "enquiries@example-placeholder.com",
  phone: "+00 000 000 0000",
} as const;

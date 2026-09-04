/**
 * Firm-level content.
 *
 * ─────────────────────────────────────────────────────────────────────────
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
  descriptor: "Aviation Advisory · Gulf Private Advisory",
  /** Fits a phone without wrapping. */
  descriptorShort: "Aviation · Gulf Private Advisory",
  positioning: "Two disciplines. One standard of execution.",
  metaDescription:
    "Lusian advises aviation businesses and private clients establishing themselves in the Gulf — operations, strategy and private establishment, coordinated through a single point of contact.",
} as const;

export const nav = [
  { label: "Aviation", href: "/aviation" },
  { label: "Private Advisory", href: "/private-advisory" },
  { label: "Destinations", href: "/destinations" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export const contactChannels = {
  // TODO(client): supply the real enquiry address, telephone line and postal
  // address. These are deliberately obvious placeholders.
  email: "enquiries@example-placeholder.com",
  phone: "+00 000 000 0000",
  addressLines: ["Registered office", "To be supplied"],
  responseNote: "Enquiries are read by a principal, not a queue.",
} as const;

export const heroLines = [
  "Some moves are",
  "operational.",
  "Some are entirely",
  "personal.",
] as const;

export const heroResolve = "Both are held to the same standard.";

export const heroStandfirst =
  "Lusian advises aviation businesses, and private clients establishing themselves in the Gulf. One point of contact, from the first question to the last detail.";

export const manifesto = {
  eyebrow: "The firm",
  headline: "We work in the distance between a decision and its execution.",
  body: [
    "Most advisory concludes with a recommendation. Ours tends to begin there.",
    "Whether the subject is an airport's ground operation or a family's first year in Riyadh, the difficulty is rarely the strategy. It is the several hundred decisions that follow it — taken in the right order, with the right people, without noise.",
  ],
  signature: "That is the whole of the offer.",
} as const;

export const divisions = [
  {
    id: "aviation",
    index: "01",
    label: "Aviation Advisory",
    href: "/aviation",
    line: "The operation is the strategy.",
    summary:
      "Counsel for airlines, airports, handlers, investors and the public bodies that hold them to standard.",
    keywords: ["Operations", "Development", "Investment", "Regulatory"],
    cta: "Discuss an aviation project",
  },
  {
    id: "gulf",
    index: "02",
    label: "Gulf Private Advisory",
    href: "/private-advisory",
    line: "Arriving well is a project.",
    summary:
      "Private establishment across the Gulf, coordinated end to end for individuals, families and the businesses that move with them.",
    keywords: ["Relocation", "Residency", "Establishment", "Continuity"],
    cta: "Speak privately",
  },
] as const;

export const differentiators = [
  {
    title: "One principal, throughout",
    body: "The person you first speak to stays with the engagement to its close. Work is not handed down a bench.",
  },
  {
    title: "An operator's judgement",
    body: "Advice shaped by how things actually run — stands, rosters, licences, landlords, lead times — rather than how they present in a deck.",
  },
  {
    title: "Discretion as method",
    body: "A small number of concurrent engagements. Restrained communication. We do not publish client names, and we do not ask to.",
  },
  {
    title: "Regulated matters, properly placed",
    body: "Legal, tax, immigration and financial advice is provided by qualified professionals licensed in the relevant jurisdiction. We coordinate them. We do not pretend to be them.",
  },
] as const;

export const engagementSteps = [
  {
    title: "Enquiry",
    body: "A short private conversation. What you are trying to achieve, the constraints around it, and by when.",
  },
  {
    title: "Definition",
    body: "Scope, sequence, responsibilities and what a good outcome looks like — agreed in writing before any work begins.",
  },
  {
    title: "Execution",
    body: "The work itself, with whatever specialists it requires, coordinated through a single point of contact.",
  },
  {
    title: "Continuity",
    body: "The relationship does not close at handover. We remain reachable for what follows.",
  },
] as const;

export const reach = {
  eyebrow: "Where the work happens",
  headline: "In market, on site, or wherever the file requires.",
  body: "Engagements are delivered where they need to be delivered. The Gulf practice is necessarily on the ground; aviation work follows the operation.",
  // TODO(client): if and when physical offices exist, replace this framing.
  // Until then this section describes markets served, not premises held.
  primary: [
    "United Arab Emirates",
    "Saudi Arabia",
    "Qatar",
    "Bahrain",
    "Oman",
    "Kuwait",
  ],
  secondary: ["Europe", "Wider MENA", "Remote engagement worldwide"],
  note: "Markets we work across — not a statement of premises held.",
} as const;

export const legalNotice =
  "Lusian provides advisory and coordination services. It does not provide legal, tax, immigration, investment or financial advice, and makes no representation as to the outcome of any application, approval or transaction determined by a third party or public authority. Regulated matters are referred to, or coordinated with, appropriately qualified professionals in the relevant jurisdiction.";

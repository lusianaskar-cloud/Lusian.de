/**
 * Legal pages — SCAFFOLD ONLY.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * NOTHING HERE IS LEGAL ADVICE, AND NOTHING HERE IS COMPLETE.
 * Each page sets out the sections a document of this kind normally contains
 * and marks every factual field as outstanding. The finished text must be
 * written or reviewed by a qualified lawyer in the relevant jurisdiction
 * before the site is published. See docs/CONTENT-TODO.md.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type LegalSection = {
  heading: string;
  body?: string;
  /** Fields the business must supply. Rendered as an outstanding-items list. */
  required?: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  eyebrow: string;
  standfirst: string;
  sections: LegalSection[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "imprint",
    title: "Legal notice",
    eyebrow: "Impressum",
    standfirst:
      "A German-facing site is normally required to publish provider identification. This page is prepared as a structure; the details themselves have not been written.",
    sections: [
      {
        heading: "Provider identification",
        required: [
          "Legal entity name and legal form",
          "Registered address (no post-office box)",
          "Represented by — name of the managing person or persons",
          "Commercial register and registration number, if registered",
          "VAT identification number, if issued",
        ],
      },
      {
        heading: "Contact",
        required: [
          "Enquiry email address",
          "Telephone number",
          "Any further contact channel offered",
        ],
      },
      {
        heading: "Regulated professions and supervisory bodies",
        body: "Where any part of the service is a regulated activity, the responsible chamber, the professional title, the state in which it was awarded and the applicable professional rules are usually stated.",
        required: [
          "Whether any regulated activity is carried out at all",
          "Supervisory authority, if applicable",
          "Professional indemnity insurer and territorial scope, if applicable",
        ],
      },
      {
        heading: "Responsibility for content",
        required: ["Name and address of the person responsible for editorial content"],
      },
      {
        heading: "Dispute resolution",
        body: "A statement of whether the provider is willing or obliged to take part in dispute resolution proceedings before a consumer arbitration board is normally included.",
        required: ["Position on consumer dispute resolution"],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    eyebrow: "Data protection",
    standfirst:
      "How enquiry data is handled matters more than usual in a practice built on discretion. This page is prepared as a structure and must be completed against what the deployed site actually does.",
    sections: [
      {
        heading: "Controller",
        required: [
          "Identity and contact details of the controller",
          "Data protection officer, where one is appointed",
        ],
      },
      {
        heading: "What is collected",
        body: "The enquiry form on this site collects the fields a visitor chooses to complete, together with the division they select. No account is created and no profile is built.",
        required: [
          "Whether server access logs are retained, and for how long",
          "Whether any analytics or performance measurement is used",
          "Whether any third-party embed sets cookies",
        ],
      },
      {
        heading: "Purpose and legal basis",
        body: "Enquiry details are used to respond to the enquiry and, where an engagement follows, to carry it out.",
        required: [
          "Legal basis relied on for each processing purpose",
          "Any legitimate-interest assessment relied on",
        ],
      },
      {
        heading: "Recipients and transfers",
        body: "Where an engagement requires coordination with third-party professionals, information is shared only on instruction and only to the extent required.",
        required: [
          "Hosting and infrastructure providers, and their locations",
          "Any transfer outside the EEA, and the safeguard relied on",
        ],
      },
      {
        heading: "Retention",
        required: ["Retention period for enquiries that do not become engagements"],
      },
      {
        heading: "Rights",
        body: "Access, rectification, erasure, restriction, portability, objection, and the right to complain to a supervisory authority.",
        required: ["Address for exercising these rights", "Competent supervisory authority"],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    eyebrow: "Website terms",
    standfirst:
      "Terms governing use of this website, distinct from any engagement letter agreed with a client.",
    sections: [
      {
        heading: "Scope",
        body: "These terms would govern use of the website only. Advisory work is governed by a separate written engagement agreed with the client before work begins.",
        required: ["Confirmation of the relationship between these terms and engagement letters"],
      },
      {
        heading: "Use of the site",
        body: "The site is provided for information. Nothing on it constitutes an offer, an engagement, or advice on any specific matter.",
      },
      {
        heading: "Intellectual property",
        required: ["Ownership statement for site content, marks and photography"],
      },
      {
        heading: "Liability",
        required: [
          "Limitation of liability, drafted to the applicable law",
          "Position on external links",
        ],
      },
      {
        heading: "Governing law",
        required: ["Governing law and jurisdiction"],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    eyebrow: "Scope of services",
    standfirst:
      "The boundary between what this practice does and what qualified professionals do — stated here so that it is not left to inference.",
    sections: [
      {
        heading: "Advisory and coordination only",
        body: "Lusian provides advisory and coordination services. It does not provide legal, tax, immigration, investment or financial advice, and it is not a law firm, tax practice, immigration agency, licensed financial adviser or brokerage.",
      },
      {
        heading: "Regulated matters",
        body: "Where a matter requires regulated advice or a regulated filing, it is referred to, or coordinated with, professionals appropriately qualified and licensed in the relevant jurisdiction. Those professionals are responsible for their own advice.",
      },
      {
        heading: "No assurance of outcome",
        body: "No representation is made as to the outcome of any application, approval, licence, registration or transaction that is determined by a third party or by a public authority. Requirements and processes change, and they differ by individual circumstance.",
      },
      {
        heading: "Country information",
        body: "Market descriptions on this site cover business and lifestyle character. They deliberately do not describe visa categories, residency criteria, ownership rules, tax treatment or thresholds, and must not be relied on as if they did.",
      },
      {
        heading: "Independence of introductions",
        body: "Introductions to schools, banks, agents, providers and professionals are made on the merits. Where any commercial arrangement exists with an introduced party, it is disclosed before the introduction is made.",
        required: ["Confirmation of the firm's position on referral commissions"],
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}

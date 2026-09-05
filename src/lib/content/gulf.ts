/**
 * Gulf Private Advisory — division content.
 *
 * Copy discipline: no promises about visas, residency approvals, tax
 * treatment, investment returns or any decision made by a public authority.
 * Where a regulated activity is described, the third-party professional
 * relationship is stated explicitly.
 */

export const gulfHero = {
  eyebrow: "Division 02",
  title: "Gulf Private Advisory",
  headline: ["A move made", "quietly, and", "made once."],
  standfirst:
    "Private establishment across the Gulf — planned, sequenced and coordinated end to end, through one person who knows the whole file.",
} as const;

export const gulfPositioning = {
  statement:
    "Relocating a family, a business, or both is not a decision. It is several hundred decisions, taken in sequence, in an unfamiliar system, usually against a date.",
  support:
    "Most of them are small. A few are difficult to undo. Our role is to hold the sequence — to know what must happen before what, who is genuinely worth engaging, and which questions you have not been asked yet.",
  emphasis: "You should have to explain your situation once.",
} as const;

export const gulfPhases = [
  {
    id: "before",
    title: "Before the move",
    note: "Deciding where, and in what order.",
    services: ["Orientation", "Relocation planning"],
  },
  {
    id: "establishment",
    title: "The establishment",
    note: "The part with the most dependencies, and the most ways to lose time.",
    services: [
      "Residency coordination",
      "Business establishment",
      "Property",
      "Banking coordination",
    ],
  },
  {
    id: "arrival",
    title: "Arrival",
    note: "The first ninety days, which decide how the move feels.",
    services: ["Family & education", "Healthcare", "Arrival"],
  },
  {
    id: "after",
    title: "Continuity",
    note: "What follows, at whatever cadence suits you.",
    services: ["Continuity"],
  },
] as const;

export const gulfServices = [
  {
    title: "Orientation",
    body: "Country and city selection, considered against how you actually intend to live and work. Time on the ground before commitments are made.",
  },
  {
    title: "Relocation planning",
    body: "A written sequence with dates, dependencies and owners. The plan the rest of the engagement is run against.",
  },
  {
    title: "Residency coordination",
    body: "We map the routes that may apply to your circumstances and prepare what is required. Filings are handled by licensed advisors and approved channels; decisions rest with the authorities.",
  },
  {
    title: "Business establishment",
    body: "Structure, jurisdiction and licensing options set out with qualified corporate and legal advisors, then coordinated through to operating status.",
  },
  {
    title: "Property",
    body: "Search coordination for lease or purchase — brief, shortlist, viewings, and the local counsel and agents required to transact properly.",
  },
  {
    title: "Family & education",
    body: "School landscape by city and curriculum, application timing, and introductions. Sequenced early, because places are the real constraint.",
  },
  {
    title: "Banking coordination",
    body: "Introductions to appropriate personal and corporate banking relationships, and coordination of onboarding requirements. Account decisions are made by the institution.",
  },
  {
    title: "Healthcare",
    body: "Provider and cover orientation, continuity for existing conditions, and introductions to appropriate practitioners before you need them.",
  },
  {
    title: "Arrival",
    body: "The first ninety days: utilities, connectivity, transport, staff, registrations and the many small items that decide how the move feels.",
  },
  {
    title: "Continuity",
    body: "A standing point of contact afterwards — renewals, expansions, a second city, a change of plan.",
  },
] as const;

export const gulfJourney = [
  {
    title: "Discovery",
    body: "A private conversation about objectives, family, business interests, preferred way of living and the timeline you are working to. No documents required.",
  },
  {
    title: "Strategy",
    body: "A tailored establishment roadmap: market, sequence, structure, dependencies and the professionals who will be required at each stage.",
  },
  {
    title: "Coordination",
    body: "We engage and manage the appropriate local specialists, providers and processes, and keep the file in one place.",
  },
  {
    title: "Arrival",
    body: "Support through the transition itself and the settlement period that follows. Presence where presence helps.",
  },
  {
    title: "Continuity",
    body: "We remain available for what comes next, at whatever cadence suits you.",
  },
] as const;

export const gulfAssurances = [
  {
    title: "Confidentiality",
    body: "Engagements are not discussed, published or referenced. Information is shared with third parties only where you have asked us to, and only to the extent required.",
  },
  {
    title: "Independence",
    body: "We are not paid by the schools, agents, banks or providers we introduce. Where any arrangement exists, it is disclosed before an introduction is made.",
  },
  {
    title: "Boundaries",
    body: "We do not give legal, tax, immigration or investment advice. We identify what is required, and coordinate the qualified professionals who provide it.",
  },
] as const;

/** Aviation Advisory — division content. No client names, results or metrics. */

export const aviationHero = {
  eyebrow: "Division 01",
  title: "Aviation Advisory",
  headline: ["The operation", "is the strategy."],
  standfirst:
    "An airline's margin is settled in fifteen-minute increments on a stand. An airport's reputation is settled in a queue. We advise on the layer where strategy becomes throughput — and we are comfortable being measured there.",
} as const;

export const aviationPositioning = {
  eyebrow: "Position",
  statement:
    "Aviation rewards precision more than ambition. Networks, terminals, handling contracts and capital programmes all fail in the same place: the join between what was planned and what happens at 05:40 on a Tuesday.",
  support:
    "Our work sits on that join. We are engaged when a plan has to survive contact with an operation — a new terminal opening, a handling contract renegotiated, a route network rebuilt, an asset assessed before capital is committed.",
} as const;

export const aviationCapabilities = [
  {
    group: "Strategy & investment",
    items: [
      "Network, fleet and schedule strategy",
      "Market-entry and route-case assessment",
      "Commercial due diligence support",
      "Aviation asset and infrastructure review",
      "Investment-case development and challenge",
    ],
  },
  {
    group: "Operations",
    items: [
      "Ground handling review and optimisation",
      "Turnaround, resource and roster planning",
      "Terminal capacity and passenger flow",
      "Operational readiness and transition (ORAT)",
      "Service level design and contract performance",
    ],
  },
  {
    group: "Development & delivery",
    items: [
      "Airport and infrastructure development advisory",
      "Programme and project management",
      "Procurement, tender and bid support",
      "Partner, supplier and concession selection",
      "Commissioning and opening readiness",
    ],
  },
  {
    group: "Organisation & regulation",
    items: [
      "Regulatory and compliance interface",
      "Safety and quality management alignment",
      "Organisational design and workforce planning",
      "Training and competency frameworks",
      "Operational governance and reporting lines",
    ],
  },
  {
    group: "Technology & data",
    items: [
      "Aviation technology assessment and selection",
      "Operational data, KPI and reporting design",
      "Digital initiative scoping and sequencing",
      "Innovation and pilot programme structuring",
      "Systems integration advisory",
    ],
  },
] as const;

export const aviationSectors = [
  { name: "Airlines", note: "Full service, low cost, regional, charter and cargo." },
  { name: "Airports & terminal operators", note: "From single-terminal regional to multi-runway hubs." },
  { name: "Ground handling & aviation services", note: "Handlers, fuellers, caterers, MRO and support providers." },
  { name: "Investors & lenders", note: "Funds, family offices and financiers assessing aviation exposure." },
  { name: "Infrastructure developers", note: "Airport city, terminal, cargo and support-estate programmes." },
  { name: "Aviation technology companies", note: "Operational software, hardware and data platforms." },
  { name: "Public-sector & regulatory bodies", note: "Authorities, ministries and state holdings." },
  { name: "Private & business aviation", note: "Operators, FBOs, terminals and owner representatives." },
] as const;

export const aviationPrinciples = [
  {
    title: "We start airside",
    body: "Before the data room, the ramp. Findings that cannot be recognised by the people doing the work are not findings.",
  },
  {
    title: "We write for the user",
    body: "Deliverables are made to be used by a duty manager at shift change, not admired in a board pack. Both audiences get what they need.",
  },
  {
    title: "We stay until it holds",
    body: "A recommendation is not an outcome. We remain through the part where a process has to survive its second week.",
  },
] as const;

/**
 * Indicative engagement shapes only.
 * TODO(client): confirm durations and commercial models before launch.
 */
export const aviationEngagements = [
  {
    name: "Assessment",
    duration: "Indicative: 2–6 weeks",
    body: "A defined question, answered. An operation, an asset, a business case or a supplier — reviewed and reported with a clear position.",
  },
  {
    name: "Programme",
    duration: "Indicative: 3–18 months",
    body: "Delivery alongside your team. Development, transition, readiness or optimisation, with accountability for the sequence.",
  },
  {
    name: "Standing counsel",
    duration: "Indicative: ongoing",
    body: "A retained line for leadership. Available for the decisions that arrive without notice, and the ones that arrive too early.",
  },
] as const;

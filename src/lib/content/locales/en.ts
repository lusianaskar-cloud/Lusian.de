import type { SiteContent } from "@/lib/i18n/types";

/**
 * English — the source language.
 *
 * Every other bundle is a translation of this one. The placeholder policy
 * holds in all three: nothing here invents history, headcount, offices,
 * credentials, clients or results, and anything a translator finds marked as
 * outstanding must stay outstanding in their language too.
 */
export const en = {
  seo: {
    home: {
      title: "Lusian — Aviation Advisory · Gulf Private Advisory",
      description:
        "Lusian advises aviation businesses and private clients establishing themselves in the Gulf — operations, strategy and private establishment, coordinated through a single point of contact.",
    },
    aviation: {
      title: "Aviation Advisory",
      description:
        "Operations, development, investment and regulatory counsel for airlines, airports, ground handlers, aviation investors and public-sector aviation bodies.",
    },
    gulf: {
      title: "Gulf Private Advisory",
      description:
        "Private relocation and establishment across the Gulf — orientation, residency coordination, business establishment, property, schooling, banking and arrival, held under one engagement.",
    },
    markets: {
      title: "Destinations",
      description:
        "The six Gulf markets we advise across — the United Arab Emirates, Saudi Arabia, Qatar, Bahrain, Oman and Kuwait — described by business and lifestyle character.",
    },
    about: {
      title: "About",
      description:
        "Why Lusian exists, who is behind it, and where the practice's responsibility ends and a licensed professional's begins.",
    },
    speak: {
      title: "Speak with Lusian",
      description:
        "Ask a question or book a conversation — aviation advisory, or private establishment in the Gulf. Confidential, and without obligation.",
    },
    ask: {
      title: "Ask a question",
      description:
        "A specific question about an aviation project or a move to the Gulf, answered by a person. Confidential, and without obligation.",
    },
    book: {
      title: "Book a consultation",
      description:
        "Choose a practice, a conversation and a time in your own timezone. Thirty or sixty minutes, confidential, and without obligation.",
    },
    questions: {
      title: "Common questions",
      description:
        "Questions raised often enough to be worth answering in public — how the practice works, choosing a Gulf market, family and education, business establishment, and aviation engagements.",
    },
    insights: {
      title: "Insights",
      description:
        "Notes on aviation operations, Gulf markets, mobility and private establishment. The editorial section is in preparation; entries currently shown are demonstrations.",
    },
  },

  meta: {
    descriptor: "Aviation Advisory · Gulf Private Advisory",
    descriptorShort: "Aviation · Gulf Private Advisory",
    positioning: "Two disciplines. One standard of execution.",
    description:
      "Lusian advises aviation businesses and private clients establishing themselves in the Gulf — operations, strategy and private establishment, coordinated through a single point of contact.",
    keywords: [
      "aviation advisory",
      "airline consulting",
      "airport operations advisory",
      "ground handling optimisation",
      "Gulf relocation advisory",
      "private relocation UAE",
      "Saudi Arabia relocation",
      "private office Gulf",
    ],
  },

  nav: [
    { label: "Aviation", href: "/aviation" },
    { label: "Private Advisory", href: "/private-advisory" },
    { label: "Destinations", href: "/destinations" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
  ],

  speakNav: [
    { label: "Ask a question", href: "/speak/ask" },
    { label: "Book a consultation", href: "/speak/book" },
    { label: "Common questions", href: "/speak/questions" },
  ],

  footer: {
    tagline:
      "Aviation Advisory and Gulf Private Advisory. Advised through a single point of contact.",
    registration: "Company registration details to be supplied",
    columns: [
      {
        title: "Divisions",
        links: [
          { label: "Aviation Advisory", href: "/aviation" },
          { label: "Gulf Private Advisory", href: "/private-advisory" },
          { label: "Destinations", href: "/destinations" },
        ],
      },
      {
        title: "Firm",
        links: [
          { label: "About", href: "/about" },
          { label: "Insights", href: "/insights" },
        ],
      },
      {
        title: "Speak with Lusian",
        links: [
          { label: "Ask a question", href: "/speak/ask" },
          { label: "Book a consultation", href: "/speak/book" },
          { label: "Common questions", href: "/speak/questions" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Legal notice", href: "/legal/imprint" },
          { label: "Privacy", href: "/legal/privacy" },
          { label: "Terms", href: "/legal/terms" },
          { label: "Disclaimer", href: "/legal/disclaimer" },
        ],
      },
    ],
  },

  contact: {
    addressLines: ["Registered office", "To be supplied"],
    responsePromise: null,
    emailLabel: "Email",
  },

  ui: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    siteMenu: "Site menu",
    homeAria: "{name} — home",
    headerCta: "Speak with us",
    menuCta: "Request a private consultation",
    scroll: "Scroll",
    language: "Language",
    languageShort: "EN",
    back: "Back",
    continueLabel: "Continue",
    review: "Review",
    confirm: "Confirm",
    confirming: "Confirming",
    sending: "Sending",
    send: "Send privately",
    optional: "{label} (optional)",
    select: "Select",
    tryAgain: "Try again",
    demo: "Demo",
    toBeSupplied: "To be supplied",
    plateReserved: "Plate {id} — photography to be supplied",
    portrait: "Portrait",
    previousMonth: "Previous month",
    nextMonth: "Next month",
  },

  home: {
    hero: {
      lines: [
        { text: "Some moves are operational." },
        { text: "Some are entirely personal.", accent: "personal" },
      ],
      resolve: "Both are held to the same standard.",
    },
    manifesto: {
      headline: "We work in the distance between a decision and its execution.",
      standfirst:
        "Lusian advises aviation businesses, and private clients establishing themselves in the Gulf. One point of contact, from the first question to the last detail.",
    },
    twoWorlds: {
      labelShort: "Two disciplines",
      labelLong: "Two disciplines · One standard of execution",
      headlineLarge: "Two disciplines.",
      headlineSmall: "One standard of execution.",
      settle: "One firm",
      aviation: {
        index: "01 — Aviation Advisory",
        line: "The operation is the strategy.",
        points: [
          "Counsel for airlines, airports, handlers and the public bodies that hold them to standard.",
          "Engaged where a plan has to survive contact with an operation.",
        ],
      },
      privateAdvisory: {
        index: "02 — Gulf Private Advisory",
        line: "A move made quietly, and made once.",
        points: [
          "Private establishment across the Gulf, coordinated end to end.",
          "One file. One point of contact. Held in sequence.",
        ],
      },
    },
    aviationScene: {
      eyebrow: "Division 01 — where we are engaged",
      opening: "The operation is the strategy.",
      link: "The aviation practice",
    },
    turn: { line: "Precision, turned inward." },
    arrival: {
      headline: "A move made quietly, and made once.",
      closing: [
        "One file.",
        "One point of contact.",
        "Hundreds of decisions,",
        "held in sequence.",
      ],
    },
    sequence: {
      headline: "Five stages, one contact.",
      link: "The private practice",
    },
    markets: {
      headline: "Six markets, six different lives.",
      note: "Character and positioning only",
      link: "All six markets",
    },
    argument: {
      eyebrow: "Why clients engage us",
      headlineLines: ["Four things", "we do not compromise."],
      note: "We publish no client names, no case studies and no numbers we cannot stand behind. What follows is the whole of the argument.",
      items: [
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
      ],
    },
    closing: {
      headline: "Begin a conversation.",
      body: "Tell us what you are trying to achieve and by when. If we are not the right party, we will say so.",
      cta: "Speak with Lusian",
    },
  },

  aviation: {
    eyebrow: "Division 01",
    title: "Aviation Advisory",
    headlineLines: [
      { text: "The operation" },
      { text: "is the strategy.", accent: "strategy" },
    ],
    standfirst:
      "An airline's margin is settled in fifteen-minute increments on a stand. An airport's reputation is settled in a queue. We advise on the layer where strategy becomes throughput — and we are comfortable being measured there.",
    meta: "Airlines · Airports · Ground handling · Investors · Infrastructure · Public sector",
    positioning: {
      eyebrow: "Position",
      headlineLines: ["Aviation rewards precision", "more than ambition."],
      statement:
        "Aviation rewards precision more than ambition. Networks, terminals, handling contracts and capital programmes all fail in the same place: the join between what was planned and what happens at 05:40 on a Tuesday.",
      support:
        "Our work sits on that join. We are engaged when a plan has to survive contact with an operation — a new terminal opening, a handling contract renegotiated, a route network rebuilt, an asset assessed before capital is committed.",
    },
    onSite: {
      eyebrow: "On site",
      headlineLines: [
        "Findings that cannot be",
        "recognised on the ramp",
        "are not findings.",
      ],
      body: "Work begins where the operation is, at the hour it is under pressure. Everything afterwards is written against what was seen there.",
    },
    capabilities: {
      eyebrow: "Capabilities",
      headline: "Where we are engaged.",
      note: "Engagements are usually a combination of these rather than one of them. Scope is set in writing before work begins.",
      groups: [
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
      ],
    },
    sectors: {
      eyebrow: "Who we work with",
      headlineLines: ["Operators, owners,", "and the bodies that hold them."],
      items: [
        { name: "Airlines", body: "Full service, low cost, regional, charter and cargo." },
        {
          name: "Airports & terminal operators",
          body: "From single-terminal regional to multi-runway hubs.",
        },
        {
          name: "Ground handling & aviation services",
          body: "Handlers, fuellers, caterers, MRO and support providers.",
        },
        {
          name: "Investors & lenders",
          body: "Funds, family offices and financiers assessing aviation exposure.",
        },
        {
          name: "Infrastructure developers",
          body: "Airport city, terminal, cargo and support-estate programmes.",
        },
        {
          name: "Aviation technology companies",
          body: "Operational software, hardware and data platforms.",
        },
        {
          name: "Public-sector & regulatory bodies",
          body: "Authorities, ministries and state holdings.",
        },
        {
          name: "Private & business aviation",
          body: "Operators, FBOs, terminals and owner representatives.",
        },
      ],
    },
    approach: {
      eyebrow: "Approach",
      headlineLines: ["Three habits", "we do not drop."],
      items: [
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
      ],
    },
    shapes: {
      eyebrow: "How projects run",
      headline: "Three shapes of engagement.",
      items: [
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
      ],
    },
    cta: {
      eyebrow: "Aviation enquiries",
      lines: ["Discuss an", "aviation project."],
      body: "Tell us the operation, the question, and the date it has to be answered by. We will say plainly whether we are the right party.",
      label: "Discuss a project",
    },
  },

  gulf: {
    eyebrow: "Division 02",
    title: "Gulf Private Advisory",
    headlineLines: [
      { text: "A move made" },
      { text: "quietly, and" },
      { text: "made once.", accent: "once" },
    ],
    standfirst:
      "Private establishment across the Gulf — planned, sequenced and coordinated end to end, through one person who knows the whole file.",
    meta: "United Arab Emirates · Saudi Arabia · Qatar · Bahrain · Oman · Kuwait",
    positioning: {
      headlineLines: ["A relocation is not", "one decision."],
      statement:
        "Relocating a family, a business, or both is not a decision. It is several hundred decisions, taken in sequence, in an unfamiliar system, usually against a date.",
      support:
        "Most of them are small. A few are difficult to undo. Our role is to hold the sequence — to know what must happen before what, who is genuinely worth engaging, and which questions you have not been asked yet.",
      emphasis: "You should have to explain your situation once.",
    },
    scope: {
      eyebrow: "Scope",
      headline: "Ten things, one file.",
      note: "Grouped by when they happen, because the order is the difficult part. Most clients take some of this; a few take all of it.",
      phases: [
        {
          id: "before",
          title: "Before the move",
          note: "Deciding where, and in what order.",
          services: ["orientation", "planning"],
        },
        {
          id: "establishment",
          title: "The establishment",
          note: "The part with the most dependencies, and the most ways to lose time.",
          services: ["residency", "business", "property", "banking"],
        },
        {
          id: "arrival",
          title: "Arrival",
          note: "The first ninety days, which decide how the move feels.",
          services: ["education", "healthcare", "arrival"],
        },
        {
          id: "after",
          title: "Continuity",
          note: "What follows, at whatever cadence suits you.",
          services: ["continuity"],
        },
      ],
      services: {
        orientation: {
          title: "Orientation",
          body: "Country and city selection, considered against how you actually intend to live and work. Time on the ground before commitments are made.",
        },
        planning: {
          title: "Relocation planning",
          body: "A written sequence with dates, dependencies and owners. The plan the rest of the engagement is run against.",
        },
        residency: {
          title: "Residency coordination",
          body: "We map the routes that may apply to your circumstances and prepare what is required. Filings are handled by licensed advisors and approved channels; decisions rest with the authorities.",
        },
        business: {
          title: "Business establishment",
          body: "Structure, jurisdiction and licensing options set out with qualified corporate and legal advisors, then coordinated through to operating status.",
        },
        property: {
          title: "Property",
          body: "Search coordination for lease or purchase — brief, shortlist, viewings, and the local counsel and agents required to transact properly.",
        },
        education: {
          title: "Family & education",
          body: "School landscape by city and curriculum, application timing, and introductions. Sequenced early, because places are the real constraint.",
        },
        banking: {
          title: "Banking coordination",
          body: "Introductions to appropriate personal and corporate banking relationships, and coordination of onboarding requirements. Account decisions are made by the institution.",
        },
        healthcare: {
          title: "Healthcare",
          body: "Provider and cover orientation, continuity for existing conditions, and introductions to appropriate practitioners before you need them.",
        },
        arrival: {
          title: "Arrival",
          body: "The first ninety days: utilities, connectivity, transport, staff, registrations and the many small items that decide how the move feels.",
        },
        continuity: {
          title: "Continuity",
          body: "A standing point of contact afterwards — renewals, expansions, a second city, a change of plan.",
        },
      },
    },
    journey: {
      eyebrow: "The private client experience",
      headlineLines: ["Five stages,", "one contact."],
      note: "Nothing here requires you to manage a panel of advisors. That is our part of the arrangement.",
      steps: [
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
      ],
    },
    levels: {
      eyebrow: "Depth of engagement",
      headline: "How far in you want us.",
      note: "Not packages. Three depths of involvement, and it is normal to move between them as a move takes shape.",
      items: [
        {
          name: "Advisory",
          scope: "A defined question",
          body: "A focused engagement with a clear boundary. A market to assess, a structure to think through, a decision to test before it is made. It ends with a position you can act on.",
        },
        {
          name: "Relocation management",
          scope: "The establishment itself",
          body: "We run the sequence: the written plan, the specialists at each stage, the dependencies between them, and the first ninety days after arrival. One point of contact for all of it.",
        },
        {
          name: "Standing arrangement",
          scope: "Ongoing coordination",
          body: "For clients whose requirements do not stop at arrival — a second base, a business added, schooling changed, renewals falling due. A retained line rather than a project.",
        },
      ],
    },
    assurances: {
      eyebrow: "How we hold your information",
      headline: "Discretion, stated plainly.",
      items: [
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
      ],
    },
    boundaries: { heading: "What we coordinate, and what we do not" },
    destinationsNote:
      "Country and city character is set out market by market, without claims about rules that change.",
    destinationsLink: "The six markets",
    cta: {
      eyebrow: "Private enquiries",
      lines: ["Speak", "privately."],
      body: "A first conversation is short, confidential and without obligation. No documents are needed to begin.",
      label: "Begin a conversation",
    },
  },

  markets: {
    eyebrow: "Destinations",
    titleLines: ["Six markets,", "six different lives."],
    standfirst:
      "The Gulf is not one place, and choosing between its markets is the first decision of any move. What follows is character — how each country actually reads to someone living and working there.",
    meta: "Character and positioning only — no statements about rules that change",
    explorer: {
      eyebrow: "The region, plotted",
      headline: "Select a market.",
      note: "Positions are plotted from each market's principal hub. One market at a time, so the differences are actually visible.",
    },
    omissions: {
      heading: "What this page deliberately omits",
      body: "Nothing above describes visa categories, residency criteria, ownership rules, tax treatment or minimum thresholds. Those change, they differ by circumstance, and they are matters for licensed professionals in each jurisdiction. We identify what applies to your situation during an engagement and coordinate the advisors qualified to act on it.",
      covered: "Markets covered: {list}.",
    },
    cta: {
      eyebrow: "Market orientation",
      lines: ["Choose the", "right market."],
      body: "Most clients arrive with two or three in mind. A first conversation is usually enough to narrow it, and to say what a proper look would involve.",
      label: "Plan your move",
    },
    plot: { principalLocations: "Principal locations", markets: "Gulf markets" },
    entries: {
      uae: {
        name: "United Arab Emirates",
        short: "UAE",
        hub: "Dubai · Abu Dhabi",
        cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
        line: "The region's default entry point, and still its most liquid.",
        body: "Two very different city cultures within an hour of one another: one built for velocity and international exchange, the other for institutions, culture and a slower domestic register. Depth of international schooling, healthcare and professional services is the practical advantage — most requirements can be met without leaving the country.",
        character: [
          "Deepest international school and healthcare provision in the Gulf",
          "Dense professional-services and banking market",
          "Strongest onward connectivity for those who still travel constantly",
        ],
        suits: "Those who want optionality, and want it immediately.",
      },
      "saudi-arabia": {
        name: "Saudi Arabia",
        short: "Saudi Arabia",
        hub: "Riyadh",
        cities: ["Riyadh", "Jeddah", "Dhahran & the Eastern Province", "Red Sea coast"],
        line: "The largest economy in the region, and the one changing fastest.",
        body: "The scale of capital programmes and corporate relocation has changed what living here looks like, and continues to. Riyadh is the centre of gravity for business; Jeddah keeps a distinct coastal and mercantile character; the Eastern Province is its own industrial and professional world. This is a market where being early still counts for something.",
        character: [
          "Concentration of capital programmes and corporate headquarters",
          "Rapidly expanding cultural, sporting and leisure calendar",
          "Distinct city cultures with genuinely different daily lives",
        ],
        suits: "Those building something with a long horizon.",
      },
      qatar: {
        name: "Qatar",
        short: "Qatar",
        hub: "Doha",
        cities: ["Doha", "Lusail", "Al Wakrah"],
        line: "Compact, well-ordered, and unusually easy to live in.",
        body: "Short distances and low friction define daily life. A strong institutional, academic and cultural presence gives the country a quieter, more deliberate register than its larger neighbours, and a small population makes the professional community genuinely legible.",
        character: [
          "Short commutes and a highly navigable single-city market",
          "Substantial academic, medical and cultural institutions",
          "A quieter social register than the regional average",
        ],
        suits: "Those who value order over intensity.",
      },
      bahrain: {
        name: "Bahrain",
        short: "Bahrain",
        hub: "Manama",
        cities: ["Manama", "Riffa", "Amwaj"],
        line: "The Gulf's oldest financial community, at a smaller scale.",
        body: "A long-established banking and insurance sector, a lower cost base, and a familiarity to daily life that longer-standing residents tend to cite first. The causeway relationship with the Eastern Province makes it a practical base for those whose work sits in Saudi Arabia but whose family life does not need to.",
        character: [
          "Mature banking, insurance and financial-services community",
          "Established causeway relationship with the Eastern Province",
          "Lower cost base and a settled, familiar rhythm",
        ],
        suits: "Those who want proximity without immersion.",
      },
      oman: {
        name: "Oman",
        short: "Oman",
        hub: "Muscat",
        cities: ["Muscat", "Sohar", "Salalah"],
        line: "The most understated address in the region.",
        body: "Landscape is the primary draw here — mountains, coastline and a built environment that has been unusually careful with itself. The pace is measured, the expatriate community long-settled, and the country tends to appeal to people who want the region without its volume.",
        character: [
          "Coastline, mountain and desert within a short drive of the capital",
          "Long-settled international community and a measured pace",
          "Strict architectural character preserved in the capital",
        ],
        suits: "Those who want the region turned down.",
      },
      kuwait: {
        name: "Kuwait",
        short: "Kuwait",
        hub: "Kuwait City",
        cities: ["Kuwait City", "Salmiya", "Hawalli"],
        line: "A mature, family-centred market with deep private capital.",
        body: "Long-standing merchant families and substantial private wealth give Kuwait a domestic-first business culture that rewards those with a specific reason to be there. It is less oriented toward the arriving international professional than its neighbours, and more interesting to those with an existing relationship to the market.",
        character: [
          "Established merchant families and significant private capital",
          "Domestic-first commercial culture",
          "Strong family and community orientation",
        ],
        suits: "Those arriving with a reason, not a search.",
      },
    },
  },

  about: {
    eyebrow: "The firm",
    titleLines: ["Built narrow, on purpose."],
    standfirst:
      "Lusian is an advisory practice with two disciplines and one way of working. It is deliberately small, and it is intended to stay that way.",
    meta: "Aviation Advisory · Gulf Private Advisory",
    raison: {
      eyebrow: "Why Lusian exists",
      headline: "Almost nothing fails at the decision.",
      body: [
        "Ask why a terminal opened badly, or why a family's first year in a new country was harder than it needed to be, and the answer is almost never that the goal was wrong. The goal was usually clear from the start.",
        "What went wrong sits in the distance between the decision and the result: the specialist engaged too late, the dependency nobody owned, the form that needed the other form first, the school place gone by the time anyone asked.",
        "That distance is not a gap in knowledge. It is a gap in sequence and accountability — and it is the only thing this firm does.",
      ],
    },
    founder: {
      role: "Founder",
      opening: "I came to this from the ramp, not from a consultancy.",
      statement: [
        "Aviation teaches one thing before it teaches anything else. Complex operations do not succeed because somebody knew the destination. They succeed because the sequence held — who does what, in which order, and which dependency had to be cleared before the next one could start.",
        "Moving a family, or a business, across borders has an unfamiliar surface and a very familiar structure. Many specialists. Many deadlines. One outcome. The failure is rarely ignorance of the goal; it is the order of operations coming apart quietly, weeks before anyone notices.",
        "That is the whole of why these two practices sit under one name.",
      ],
      trajectory: [
        {
          title: "Aviation engineering and aircraft maintenance",
          body: "An engineering and aircraft-maintenance background, studied at Georgian Aviation University.",
        },
        {
          title: "Airport operations",
          body: "Practical experience at Tbilisi International Airport, across gate and passenger handling, ramp operations and technical aviation environments.",
        },
        {
          title: "Maintenance practice",
          body: "Hands-on aircraft maintenance experience, including a technical placement in Athens.",
        },
        {
          title: "Aviation management — ongoing",
          body: "Currently studying Aviation Management at TH Wildau, in Germany.",
        },
        {
          title: "Flying",
          body: "Private pilot training and general aviation flying experience.",
        },
        {
          title: "Languages, professionally",
          body: "Works as a freelance interpreter and translator — a decade's habit of carrying meaning accurately between people who do not share a language.",
        },
      ],
      languagesLabel: "Working languages",
      languages: ["German", "English", "Arabic", "Assyrian (Aramaic)"],
      nameFallback: "The principal",
      nameNote: "Name and portrait to be supplied",
      outstanding: [
        {
          title: "Name and portrait",
          description:
            "The principal's full name and a considered editorial portrait. Neither has been inferred or generated.",
        },
        {
          title: "Formal qualification titles",
          description:
            "The exact awarded title of the Georgian qualification, and the expected completion of the Aviation Management programme.",
        },
        {
          title: "Professional memberships",
          description:
            "Any industry membership, registration or accreditation that can be evidenced.",
        },
      ],
    },
    definition: {
      eyebrow: "Definition",
      headlineLines: ["The clearest thing we can", "say is what we are not."],
      areLabel: "What we are",
      areNotLabel: "What we are not",
      are: [
        "An advisory and coordination practice, engaged directly by principals.",
        "Accountable for the sequence of a piece of work, not only its recommendation.",
        "Comfortable operating between disciplines, jurisdictions and time zones.",
        "Selective — a small number of concurrent engagements, by design.",
      ],
      areNot: [
        "A law firm, tax practice, immigration agency, licensed financial adviser or brokerage.",
        "A referral network paid by the schools, banks, agents or providers we introduce.",
        "A volume business, and not built to become one.",
        "In the business of publishing our clients.",
      ],
    },
    recognition: {
      eyebrow: "Who we work with",
      headline: "You will know if this is for you.",
      aviationLabel: "01 — Aviation",
      privateLabel: "02 — Private",
      aviation: [
        "An airline losing margin on the ground",
        "An airport opening something new",
        "A handler renegotiating a contract",
        "An investor looking at an aviation asset",
        "A developer building an airport estate",
        "A technology business selling into operations",
        "An authority holding others to standard",
      ],
      privateAdvisory: [
        "A family moving together",
        "An entrepreneur taking the business too",
        "An executive relocating with a role",
        "An investor establishing a second base",
        "A family office coordinating a move",
        "A company relocating senior people",
      ],
    },
    commitments: {
      eyebrow: "Operating commitments",
      headlineLines: ["Four rules we hold", "ourselves to."],
      items: [
        {
          title: "We say no",
          body: "If we are not the right party for a piece of work, we say so early — and, where we can, name who is.",
        },
        {
          title: "We write it down",
          body: "Scope, sequence, responsibilities and what a good outcome looks like are agreed in writing before work begins.",
        },
        {
          title: "We do not publish you",
          body: "No client names, no case studies, no logo walls. Confidence is easier to keep than to rebuild.",
        },
        {
          title: "We use qualified people",
          body: "Regulated matters go to professionals licensed to handle them in the jurisdiction concerned. We coordinate; they advise.",
        },
      ],
    },
    engagement: {
      eyebrow: "How an engagement runs",
      headline: "Four stages. No handover.",
      note: "The same sequence governs an airport programme and a family's move. Only the specialists change.",
      steps: [
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
      ],
    },
    reserved: {
      eyebrow: "Firm information",
      headline: "Reserved for the record.",
      note: "Held open deliberately. Nothing about the firm's history, people or credentials has been written in their place.",
      items: [
        {
          title: "Registered company details",
          description:
            "Legal entity name, company registration number, VAT identification and registered address. Also required on the legal notice.",
        },
        {
          title: "Coverage",
          description:
            "The markets in which the practice can act directly rather than through partners.",
        },
        {
          title: "Professional network",
          description:
            "How third-party specialists are selected and reviewed — in general terms, without naming firms.",
        },
      ],
    },
    cta: {
      lines: ["A short", "conversation."],
      body: "If your situation is unusual, that is usually a good sign that it is worth a call rather than a form.",
      label: "Speak with Lusian",
    },
  },

  speak: {
    eyebrow: "Speak with Lusian",
    titleLines: ["Two ways to", "start, both quiet."],
    standfirst:
      "Nothing you write here is circulated, and a first conversation commits you to nothing. If we are not the right party, we will say so.",
    intents: [
      {
        index: "01",
        title: "Ask a question.",
        body: "A specific situation deserves a specific answer. Write in your own words — there is no form to decode.",
        href: "/speak/ask",
        cta: "Write to us",
      },
      {
        index: "02",
        title: "Book a conversation.",
        body: "Thirty or sixty minutes, in your own timezone. Aviation or private, and without obligation either way.",
        href: "/speak/book",
        cta: "Choose a time",
      },
    ],
    questionsTeaser: {
      body: "Some of it may already be answered.",
      link: "Common questions",
    },
    boundaries: {
      eyebrow: "Where the line sits",
      headlineLines: ["What we coordinate,", "and what we do not."],
      note: "The second column is not a limitation we work around — it is how the work is done properly. We identify what is required, engage professionals qualified in the relevant jurisdiction, and remain accountable for the sequence they sit inside.",
      coordinatedLabel: "Lusian coordinates",
      regulatedLabel: "Licensed professionals provide",
      coordinated: [
        "Relocation strategy and market orientation",
        "The written sequence, and the dependencies within it",
        "Introductions to appropriate specialists and providers",
        "Business-establishment workflow and its coordination",
        "Property search coordination",
        "School and healthcare orientation",
        "Timelines, deadlines and arrival logistics",
        "Ongoing coordination after the move",
      ],
      regulated: [
        "Legal advice, and any filing that requires a licensed representative",
        "Tax advice and tax residency positions",
        "Immigration assessment, eligibility and applications",
        "Regulated investment and financial advice",
        "Formal property transaction and conveyancing advice",
        "Audit, accounting and statutory reporting",
      ],
    },
    ask: {
      eyebrow: "Ask a question",
      headline: "Write in your own words.",
      standfirst:
        "Four fields to begin. Everything else is optional, and only worth filling in if it makes the first reply more useful to you.",
      assurances: [
        {
          title: "Held, not circulated",
          body: "What you write stays with us. Nothing is shared with a third party unless you ask us to.",
        },
        {
          title: "No obligation",
          body: "A question is a question. It does not begin anything.",
        },
        {
          title: "An honest answer",
          body: "If the right answer is a licensed professional rather than us, that is what you will be told.",
        },
      ],
      ratherBook: "Rather book a time",
      practiceLegend: "What is this about",
      practices: [
        {
          id: "aviation",
          label: "Aviation Advisory",
          note: "Airlines, airports, handling, investment",
        },
        {
          id: "private",
          label: "Private Advisory",
          note: "Relocation and establishment",
        },
        { id: "general", label: "Something else", note: "Press, partnership, general" },
      ],
      fields: {
        message: "Your question, or the situation",
        name: "Name",
        email: "Email",
        phone: "Telephone",
        currentCountry: "Where you are now",
        destination: "Market you are considering",
        party: "Moving as",
        timeframe: "Approximate timing",
        company: "Organisation",
        role: "Role",
        orgType: "Type of organisation",
        geography: "Where the work sits",
        projectType: "Nature of the project",
      },
      messagePlaceholder: "In your own words. A few lines is plenty.",
      contactMethodLegend: "How should we reply",
      contactMethods: ["Email", "Phone", "Either"],
      addContext: "Add context",
      addContextNote: "Optional. It makes the first reply more useful.",
      supportLegend: "Where you expect to need support",
      supportAreas: [
        "Choosing a market",
        "Residency coordination",
        "Business establishment",
        "Property",
        "Schools and education",
        "Banking",
        "Healthcare",
        "Arrival and settling in",
      ],
      partySizes: ["Individual", "Couple", "Family", "Business", "Family and business"],
      timeframes: [
        "Within three months",
        "Three to six months",
        "Six to twelve months",
        "Beyond twelve months",
        "Exploring only",
      ],
      orgTypes: [
        "Airline",
        "Airport or terminal operator",
        "Ground handling or aviation services",
        "Investor or lender",
        "Infrastructure developer",
        "Aviation technology",
        "Public sector or authority",
        "Other",
      ],
      projectTypes: [
        "Assessment or review",
        "Operational improvement",
        "Development or transition programme",
        "Due diligence or investment support",
        "Regulatory or organisational",
        "Not yet defined",
      ],
      undecided: "Undecided",
      honeypot: "Leave this field empty",
      consent:
        "I agree that Lusian may hold these details in order to reply. They are not shared with anyone else without my instruction, and not used for anything other than this conversation.",
      sent: {
        label: "Received",
        headline: "Thank you — your note has reached us.",
        body: "You will get a reply from a person, at",
      },
      unconfigured:
        "This form is not yet connected to the firm's intake, so your message has not been sent.",
      failed: "The message could not be sent just now.",
      writeTo: "Please write to",
    },
    book: {
      eyebrow: "Book a consultation",
      headline: "Take thirty minutes.",
      standfirst:
        "A first conversation costs nothing and commits you to nothing. Times are shown in your own timezone.",
      steps: ["Practice", "Conversation", "When", "Details", "Review"],
      stepAnnouncement: "Step {current} of {total}: {name}",
      confirmedAnnouncement: "Booking confirmed",
      practiceQuestion: "Which practice is this about?",
      practices: [
        {
          id: "aviation",
          label: "Aviation Advisory",
          body: "Airlines, airports, ground handling, investors, infrastructure and public-sector aviation.",
        },
        {
          id: "private",
          label: "Private Advisory",
          body: "Relocation and establishment across the Gulf, for individuals, families and their businesses.",
        },
      ],
      conversationQuestion: "What kind of conversation?",
      chooseTime: "Choose a time",
      timesShownIn: "Times shown in",
      allTimesIn: "All times in {zone}",
      chooseDay: "Choose a day to see the times that are free.",
      checking: "Checking the calendar…",
      noneThisMonth: "No availability in this month. Try the next one.",
      nothingThisDay: "Nothing free on this day.",
      detailsHeading: "Your details",
      reviewHeading: "Before we hold the time",
      confirmedLabel: "Confirmed",
      confirmedHeading: "The time is held.",
      fields: {
        name: "Name",
        email: "Email",
        company: "Organisation",
        phone: "Telephone",
        notes: "Anything useful before we speak",
      },
      notesPlaceholder: "A sentence or two is plenty.",
      summary: {
        practice: "Practice",
        conversation: "Conversation",
        date: "Date",
        time: "Time",
        name: "Name",
        email: "Email",
        reference: "Reference",
      },
      notConnected: {
        label: "Booking not yet connected",
        body: "Scheduling is not live on this site yet, so there are no times to show. Rather than display availability that does not exist, we would rather you wrote to us — a reply will come with times in it.",
        writeInstead: "Write to us instead",
      },
      unavailableLabel: "Availability unavailable",
      unavailableBody: "We could not reach the calendar just now.",
      errors: {
        notConfigured: "Scheduling is not connected yet, so nothing has been booked.",
        taken: "That time was taken while you were filling this in. Choose another.",
        failed: "The booking could not be completed just now.",
      },
      emailSent:
        "A confirmation is on its way from our scheduling system, with the details and a link to change the time.",
      keepReference:
        "Keep the reference above. If you need to move the time, write to us and we will.",
      manage: "Reschedule or cancel",
      askInstead: "Ask instead",
      consultations: {
        "aviation-initial": {
          name: "Initial conversation",
          duration: "30 minutes",
          body: "A first call to establish whether there is a fit. What you are trying to achieve, the constraints, and the date it has to be answered by.",
        },
        "aviation-project": {
          name: "Project discussion",
          duration: "60 minutes",
          body: "For a defined piece of work — an operation, an asset, a programme or a supplier. Bring the question; we will tell you what a proper look would involve.",
        },
        "private-initial": {
          name: "Initial conversation",
          duration: "30 minutes",
          body: "A short, confidential first conversation. No documents, no obligation, and nothing shared with anyone.",
        },
        "private-relocation": {
          name: "Relocation consultation",
          duration: "60 minutes",
          body: "For those already some way into a decision. Market, sequence, dependencies and the specialists a move of this shape would require.",
        },
      },
    },
    questions: {
      eyebrow: "Common questions",
      headline: "Asked often enough to answer in public.",
      standfirst:
        "A short list, written properly, rather than forty written quickly. What is genuinely specific to your situation is better asked directly.",
      disclaimer:
        "Nothing above is legal, tax or immigration advice, and none of it replaces a licensed professional in the relevant jurisdiction.",
      askSomething: "Ask something specific",
      categories: [
        {
          id: "how-we-work",
          title: "How Lusian works",
          questions: [
            {
              q: "What does Lusian actually do?",
              a: "We hold the sequence of a complex piece of work. That means deciding what has to happen before what, engaging the specialists each stage requires, and staying accountable for the order rather than only the recommendation.",
            },
            {
              q: "Are you a law firm, or an immigration agency?",
              a: "Neither. Lusian is an advisory and coordination practice. Where a matter requires regulated advice or a regulated filing, it goes to a professional licensed in that jurisdiction, and we coordinate them.",
            },
            {
              q: "How does an engagement usually begin?",
              a: "A short conversation, then a written scope. Nothing is billed and no work starts before both parties have agreed what the work is and what a good outcome looks like.",
            },
            {
              q: "Do you publish your clients?",
              a: "No. No names, no case studies, no logo wall. If discretion matters to you, it is easier to keep it than to rebuild it.",
            },
          ],
        },
        {
          id: "choosing",
          title: "Choosing a destination",
          questions: [
            {
              q: "How do people usually narrow six markets down to one?",
              a: "By how they intend to live rather than by comparison tables. Schooling and healthcare depth, how often you actually need to fly, whether your work needs you in the room, and how much intensity you want in daily life will settle it faster than any ranking.",
            },
            {
              q: "Should we visit before deciding?",
              a: "Almost always, and with a brief rather than as tourists. A week spent on specific questions — commutes at the hour you would really do them, schools in session, neighbourhoods on a weekday — is worth more than months of research.",
            },
            {
              q: "Can you tell us which visa or residency route we qualify for?",
              a: "No, and anyone answering that confidently before seeing your circumstances should be treated carefully. We map the routes that may be relevant and bring in licensed advisors to assess and file. The decision rests with the authorities.",
            },
          ],
        },
        {
          id: "family",
          title: "Family and education",
          questions: [
            {
              q: "When should we start on schools?",
              a: "Earlier than feels necessary. Places, not paperwork, are usually the real constraint on a move — for popular year groups and curricula, availability can decide both the city and the timing.",
            },
            {
              q: "Do you place children in schools?",
              a: "No. We map the landscape by city and curriculum, get the timing right, and make introductions. Admission is the school's decision.",
            },
          ],
        },
        {
          id: "establishment",
          title: "Business establishment",
          questions: [
            {
              q: "Can you set up our company?",
              a: "We coordinate it. Structure, jurisdiction and licensing are set out with qualified corporate and legal advisors, and we run the process through to operating status so you are not managing a panel of firms yourself.",
            },
            {
              q: "Will you introduce us to banks?",
              a: "We make introductions to appropriate relationships and coordinate what onboarding requires. Whether an account is opened is the institution's decision, not ours — and we are not paid by the banks we introduce.",
            },
          ],
        },
        {
          id: "aviation-engagement",
          title: "Aviation engagements",
          questions: [
            {
              q: "What size of organisation do you work with?",
              a: "The question matters more than the size. A single-terminal regional airport with a handling problem is a better fit than a large operator looking for a document.",
            },
            {
              q: "What does a first engagement typically look like?",
              a: "Most begin as a defined assessment: one question, answered, with a clear position. Programme work tends to follow from that rather than start there.",
            },
            {
              q: "Will you work alongside our existing advisors?",
              a: "Yes, and often that is the point. We are frequently engaged to hold the join between parties who each own a piece of the problem.",
            },
          ],
        },
      ],
    },
  },

  insights: {
    eyebrow: "Insights",
    titleLines: ["Written from", "the work."],
    standfirst:
      "Short pieces on aviation operations, Gulf markets and the practical business of moving a life or a company across borders. Published only when there is something to say.",
    notice: {
      label: "Section in preparation",
      body: "Every entry below is a demonstration placeholder used to review layout and typography. None is published research, none is sourced, and none should be read as the firm's position.",
    },
    filter: "Filter",
    all: "All",
    categories: {
      aviation: "Aviation",
      "gulf-markets": "Gulf Markets",
      mobility: "Mobility",
      "investment-environment": "Investment Environment",
      operations: "Operations",
      relocation: "Relocation",
    },
    empty: "Nothing published in this category yet.",
    articleNotice: {
      label: "Demonstration article",
      body: "This entry exists to demonstrate the article layout. The text below is placeholder copy — it is not research, it is not sourced, and it does not represent the firm's view on the subject. It will be replaced in full before the Insights section is published.",
    },
    allInsights: "All insights",
    demoTitle: "{title} (demonstration)",
    cta: {
      eyebrow: "Enquiries",
      lines: ["Rather ask", "directly?"],
      body: "Most useful answers are specific to a situation, and are better given in a conversation than published.",
      label: "Begin a conversation",
    },
    entries: {
      "the-fifteen-minute-margin": {
        title: "The fifteen-minute margin",
        standfirst:
          "Why turnaround discipline decides more of an airline's commercial position than its network plan.",
        readingTime: "6 min",
        date: "Sample entry",
        sections: [
          {
            heading: "The premise",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "Where it breaks",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "What holds",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
        ],
      },
      "reading-a-gulf-city": {
        title: "Reading a Gulf city before you commit to it",
        standfirst:
          "Six questions worth answering on the ground, and the order in which they should be asked.",
        readingTime: "8 min",
        date: "Sample entry",
        sections: [
          {
            heading: "Arriving with a brief",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "The questions",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
        ],
      },
      "the-sequence-problem": {
        title: "The sequence problem",
        standfirst:
          "Most relocations fail on ordering, not on effort. A note on dependencies, and the two that are usually left too late.",
        readingTime: "5 min",
        date: "Sample entry",
        sections: [
          {
            heading: "Dependencies",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "School places and banking",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
        ],
      },
      "operational-readiness-before-the-ribbon": {
        title: "Operational readiness, long before the ribbon",
        standfirst:
          "What separates a terminal that opens well from one that merely opens on time.",
        readingTime: "7 min",
        date: "Sample entry",
        sections: [
          {
            heading: "Trials are not rehearsals",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "The second week",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
        ],
      },
      "capital-programmes-and-the-people-question": {
        title: "Capital programmes and the people question",
        standfirst:
          "Regional infrastructure ambition is rarely constrained by funding. It is constrained by competent hands.",
        readingTime: "6 min",
        date: "Sample entry",
        sections: [
          {
            heading: "The constraint",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "Consequences for sequencing",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
        ],
      },
      "moving-a-business-and-a-family-at-once": {
        title: "Moving a business and a family at once",
        standfirst:
          "The two timelines pull against each other. A view on which one should set the pace.",
        readingTime: "5 min",
        date: "Sample entry",
        sections: [
          {
            heading: "Two clocks",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
          {
            heading: "Which one leads",
            paragraphs: [
              "This is placeholder body copy for an unpublished article. It exists to demonstrate measure, rhythm and typographic hierarchy at realistic length, and will be replaced in full before publication.",
              "Editorial published under this section will be first-hand and specific: written from engagements, attributed where attribution is appropriate, and dated. Nothing will be published here that has not been checked.",
            ],
          },
        ],
      },
    },
  },

  legal: {
    notice:
      "Lusian provides advisory and coordination services. It does not provide legal, tax, immigration, investment or financial advice, and makes no representation as to the outcome of any application, approval or transaction determined by a third party or public authority. Regulated matters are referred to, or coordinated with, appropriately qualified professionals in the relevant jurisdiction.",
    outstanding: {
      label: "Document outstanding",
      body: "This page is a prepared structure, not a published legal document. It has not been drafted or reviewed by a lawyer, and the fields listed below have not been supplied. It must be completed and reviewed by a qualified professional in the relevant jurisdiction before this site goes live.",
    },
    toBeSupplied: "To be supplied",
    otherPages: "Legal pages",
    pages: {
      imprint: {
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
            required: [
              "Name and address of the person responsible for editorial content",
            ],
          },
          {
            heading: "Dispute resolution",
            body: "A statement of whether the provider is willing or obliged to take part in dispute resolution proceedings before a consumer arbitration board is normally included.",
            required: ["Position on consumer dispute resolution"],
          },
        ],
      },
      privacy: {
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
            required: [
              "Retention period for enquiries that do not become engagements",
            ],
          },
          {
            heading: "Rights",
            body: "Access, rectification, erasure, restriction, portability, objection, and the right to complain to a supervisory authority.",
            required: [
              "Address for exercising these rights",
              "Competent supervisory authority",
            ],
          },
        ],
      },
      terms: {
        title: "Terms",
        eyebrow: "Website terms",
        standfirst:
          "Terms governing use of this website, distinct from any engagement letter agreed with a client.",
        sections: [
          {
            heading: "Scope",
            body: "These terms would govern use of the website only. Advisory work is governed by a separate written engagement agreed with the client before work begins.",
            required: [
              "Confirmation of the relationship between these terms and engagement letters",
            ],
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
      disclaimer: {
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
    },
  },

  notFound: {
    eyebrow: "Error 404",
    headline: "This page is not where it was.",
    body: "The address may have changed, or it may never have existed. Either way, the two divisions are a click away.",
    home: "Return home",
  },

  plates: {
    interlude: {
      alt: "Daylight falling through an architectural threshold",
      brief:
        "Interior daylight at an architectural threshold. Stone, glass, deep shadow. No people, no recognisable building, no skyline.",
      caption: "Between the two practices",
    },
    aviationApron: {
      alt: "Apron markings and terminal structure at first light",
      brief:
        "Operational environment at first light — apron geometry, stand markings, structure. No aircraft livery, no crew faces, no branding.",
      caption: "Where the work happens",
    },
    gulfInterior: {
      alt: "A quiet residential interior in late afternoon light",
      brief:
        "A quiet residential interior, late afternoon. Restraint over opulence. No faces, no identifiable address, no styling cliché.",
      caption: "Arrival",
    },
  },
} satisfies SiteContent;

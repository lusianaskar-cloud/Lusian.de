/**
 * Speaking with the firm — intents, common questions, engagement depth and
 * the boundary between what Lusian coordinates and what regulated
 * professionals provide.
 *
 * Copy discipline as elsewhere: nothing here promises an outcome decided by a
 * third party or an authority, and no answer below is offered as legal, tax,
 * immigration or investment advice.
 */

export const speakIntents = [
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
] as const;

export type QuestionCategory = {
  id: string;
  practice: "aviation" | "private" | "firm";
  title: string;
  questions: { q: string; a: string }[];
};

export const questionCategories: QuestionCategory[] = [
  {
    id: "how-we-work",
    practice: "firm",
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
    practice: "private",
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
    practice: "private",
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
    practice: "private",
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
    practice: "aviation",
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
];

/**
 * Depth of engagement, not price tiers.
 * TODO(client): confirm naming and commercial model before launch.
 */
export const engagementLevels = [
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
] as const;

/** Where the practice ends and licensed professionals begin. */
export const boundaries = {
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
  note: "The second column is not a limitation we work around — it is how the work is done properly. We identify what is required, engage professionals qualified in the relevant jurisdiction, and remain accountable for the sequence they sit inside.",
} as const;

/**
 * Who each practice is built for.
 *
 * Written as situations rather than a taxonomy: the question a reader is
 * actually asking here is "is this for someone like me", and a list of sector
 * labels answers that badly. The formal sector list lives on /aviation, where
 * it belongs.
 */
export const clientProfiles = {
  aviation: [
    "An airline losing margin on the ground",
    "An airport opening something new",
    "A handler renegotiating a contract",
    "An investor looking at an aviation asset",
    "A developer building an airport estate",
    "A technology business selling into operations",
    "An authority holding others to standard",
  ],
  private: [
    "A family moving together",
    "An entrepreneur taking the business too",
    "An executive relocating with a role",
    "An investor establishing a second base",
    "A family office coordinating a move",
    "A company relocating senior people",
  ],
} as const;

/**
 * The principal.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TRUTHFULNESS RULES FOR THIS FILE
 *
 * Everything below is either supplied by the founder or structurally true of
 * the offer. Nothing here claims a title, an employer, a duration, a result
 * or a qualification that has not been confirmed.
 *
 * In particular the principal is NOT described as an airline or airport
 * executive, a senior aviation consultant, a licensed commercial pilot, an
 * immigration expert, a lawyer, a tax adviser or an investment adviser. Where
 * the exact formal title of a qualification is not confirmed, the wording is
 * deliberately broad. Do not "improve" any of this by making it sound larger.
 *
 * TODO(client): supply the items in `outstanding` below.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const founder = {
  /** TODO(client): the principal's full name. Deliberately not inferred. */
  name: null as string | null,
  nameFallback: "The principal",

  /** TODO(client): role wording, once settled. */
  role: "Founder",

  opening: "I came to this from the ramp, not from a consultancy.",

  statement: [
    "Aviation teaches one thing before it teaches anything else. Complex operations do not succeed because somebody knew the destination. They succeed because the sequence held — who does what, in which order, and which dependency had to be cleared before the next one could start.",
    "Moving a family, or a business, across borders has an unfamiliar surface and a very familiar structure. Many specialists. Many deadlines. One outcome. The failure is rarely ignorance of the goal; it is the order of operations coming apart quietly, weeks before anyone notices.",
    "That is the whole of why these two practices sit under one name.",
  ],

  /**
   * Factual background, as supplied. No dates, no employers beyond those
   * named, no claimed seniority.
   */
  trajectory: [
    {
      title: "Aviation engineering and aircraft maintenance",
      body: "An engineering and aircraft-maintenance background, studied at Georgian Aviation University.",
      // TODO(client): formal degree title, once confirmed.
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

  languages: ["German", "English", "Arabic", "Assyrian (Aramaic)"],

  /** Held open until supplied — rendered as visible reserved slots. */
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
} as const;

/** Why the firm exists. Specific, or it is not worth saying. */
export const raison = {
  eyebrow: "Why Lusian exists",
  headline: "Almost nothing fails at the decision.",
  body: [
    "Ask why a terminal opened badly, or why a family's first year in a new country was harder than it needed to be, and the answer is almost never that the goal was wrong. The goal was usually clear from the start.",
    "What went wrong sits in the distance between the decision and the result: the specialist engaged too late, the dependency nobody owned, the form that needed the other form first, the school place gone by the time anyone asked.",
    "That distance is not a gap in knowledge. It is a gap in sequence and accountability — and it is the only thing this firm does.",
  ],
} as const;

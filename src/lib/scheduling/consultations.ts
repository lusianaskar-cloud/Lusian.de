import type { ConsultationType } from "./types";

/**
 * The conversations Lusian offers.
 *
 * No prices. Durations describe the conversation, not a product tier.
 *
 * TODO(client): each entry needs its scheduling-provider event type id in the
 * environment variable named by `providerKey` — see docs/SCHEDULING.md.
 */
export const consultationTypes: ConsultationType[] = [
  {
    id: "aviation-initial",
    practice: "aviation",
    name: "Initial conversation",
    duration: "30 minutes",
    body: "A first call to establish whether there is a fit. What you are trying to achieve, the constraints, and the date it has to be answered by.",
    providerKey: "SCHEDULING_EVENT_AVIATION_INITIAL",
  },
  {
    id: "aviation-project",
    practice: "aviation",
    name: "Project discussion",
    duration: "60 minutes",
    body: "For a defined piece of work — an operation, an asset, a programme or a supplier. Bring the question; we will tell you what a proper look would involve.",
    providerKey: "SCHEDULING_EVENT_AVIATION_PROJECT",
  },
  {
    id: "private-initial",
    practice: "private",
    name: "Initial conversation",
    duration: "30 minutes",
    body: "A short, confidential first conversation. No documents, no obligation, and nothing shared with anyone.",
    providerKey: "SCHEDULING_EVENT_PRIVATE_INITIAL",
  },
  {
    id: "private-relocation",
    practice: "private",
    name: "Relocation consultation",
    duration: "60 minutes",
    body: "For those already some way into a decision. Market, sequence, dependencies and the specialists a move of this shape would require.",
    providerKey: "SCHEDULING_EVENT_PRIVATE_RELOCATION",
  },
];

export function getConsultationType(id: string) {
  return consultationTypes.find((type) => type.id === id);
}

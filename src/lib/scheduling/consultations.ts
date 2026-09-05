import type { ConsultationType } from "./types";

/**
 * The conversations Lusian offers — structure only.
 *
 * No prices. The displayed name, duration and description are translated and
 * live in the locale bundles keyed by these ids; `name` here is an internal
 * reference passed to the scheduling provider as booking metadata, and is not
 * rendered anywhere.
 *
 * TODO(client): each entry needs its scheduling-provider event type id in the
 * environment variable named by `providerKey` — see docs/SCHEDULING.md.
 */
export const consultationTypes: ConsultationType[] = [
  {
    id: "aviation-initial",
    practice: "aviation",
    name: "Aviation — initial conversation",
    minutes: 30,
    providerKey: "SCHEDULING_EVENT_AVIATION_INITIAL",
  },
  {
    id: "aviation-project",
    practice: "aviation",
    name: "Aviation — project discussion",
    minutes: 60,
    providerKey: "SCHEDULING_EVENT_AVIATION_PROJECT",
  },
  {
    id: "private-initial",
    practice: "private",
    name: "Private — initial conversation",
    minutes: 30,
    providerKey: "SCHEDULING_EVENT_PRIVATE_INITIAL",
  },
  {
    id: "private-relocation",
    practice: "private",
    name: "Private — relocation consultation",
    minutes: 60,
    providerKey: "SCHEDULING_EVENT_PRIVATE_RELOCATION",
  },
];

export function getConsultationType(id: string) {
  return consultationTypes.find((type) => type.id === id);
}

/** Shared scheduling contract. Server and client both speak this shape. */

export type PracticeId = "aviation" | "private";

export type ConsultationType = {
  id: string;
  practice: PracticeId;
  name: string;
  duration: string;
  body: string;
  /** Env var holding this type's id in the scheduling provider. */
  providerKey: string;
};

export type Slot = {
  /** ISO 8601 instant, always with an offset. */
  start: string;
  /** Minutes. */
  duration: number;
};

export type AvailabilityResult =
  | { status: "ok"; timeZone: string; slots: Slot[] }
  | { status: "not_configured" }
  | { status: "error"; message: string };

export type BookingRequest = {
  typeId: string;
  start: string;
  timeZone: string;
  name: string;
  email: string;
  notes?: string;
  company?: string;
  phone?: string;
};

export type BookingResult =
  | {
      status: "booked";
      reference: string;
      start: string;
      timeZone: string;
      /** Only set when the provider actually reports having sent one. */
      confirmationEmailSent: boolean;
      manageUrl?: string;
    }
  | { status: "not_configured" }
  | { status: "unavailable" }
  | { status: "error"; message: string };

/**
 * A scheduling backend.
 *
 * The visual experience is entirely Lusian's; a provider supplies only truth
 * about time. Implementations must never invent availability, and must never
 * report a booking that did not happen.
 */
export interface SchedulingProvider {
  readonly name: string;
  listSlots(input: {
    type: ConsultationType;
    from: string;
    to: string;
    timeZone: string;
  }): Promise<AvailabilityResult>;
  createBooking(input: {
    type: ConsultationType;
    request: BookingRequest;
  }): Promise<BookingResult>;
}

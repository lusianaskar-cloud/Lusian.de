import type {
  AvailabilityResult,
  BookingResult,
  ConsultationType,
  SchedulingProvider,
  Slot,
} from "./types";

/**
 * Cal.com adapter.
 *
 * Lusian owns the booking interface; Cal.com owns the truth about time. This
 * talks to the API directly rather than embedding a booking widget, so the
 * experience stays native to the site.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TODO(client): verify the request/response shape against the Cal.com API
 * version you enable before launch — the API version headers below are
 * configurable precisely so this can be pinned without a code change. The
 * parsers are written tolerantly, but a version change can still move fields.
 * ─────────────────────────────────────────────────────────────────────────
 */
const BASE = process.env.CALCOM_API_BASE ?? "https://api.cal.com/v2";
const SLOTS_VERSION = process.env.CALCOM_SLOTS_API_VERSION ?? "2024-09-04";
const BOOKINGS_VERSION = process.env.CALCOM_BOOKINGS_API_VERSION ?? "2024-08-13";

function eventTypeId(type: ConsultationType) {
  const raw = process.env[type.providerKey];
  return raw && raw.trim() ? raw.trim() : null;
}

/** Cal.com has returned slots as an object keyed by date and as a flat array. */
function parseSlots(payload: unknown): Slot[] {
  const data =
    (payload as { data?: unknown })?.data ?? (payload as { slots?: unknown })?.slots;
  if (!data) return [];

  const rows: unknown[] = Array.isArray(data)
    ? data
    : Object.values(data as Record<string, unknown>).flatMap((v) =>
        Array.isArray(v) ? v : [],
      );

  const slots: Slot[] = [];
  for (const row of rows) {
    const r = row as { start?: string; time?: string; duration?: number };
    const start = r.start ?? r.time;
    if (typeof start !== "string") continue;
    slots.push({ start, duration: typeof r.duration === "number" ? r.duration : 0 });
  }
  return slots.sort((a, b) => a.start.localeCompare(b.start));
}

export function createCalComProvider(apiKey: string): SchedulingProvider {
  const headers = (version: string) => ({
    authorization: `Bearer ${apiKey}`,
    "cal-api-version": version,
    "content-type": "application/json",
  });

  return {
    name: "cal.com",

    async listSlots({ type, from, to, timeZone }): Promise<AvailabilityResult> {
      const id = eventTypeId(type);
      if (!id) return { status: "not_configured" };

      const url = new URL(`${BASE}/slots`);
      url.searchParams.set("eventTypeId", id);
      url.searchParams.set("start", from);
      url.searchParams.set("end", to);
      url.searchParams.set("timeZone", timeZone);

      try {
        const response = await fetch(url, {
          headers: headers(SLOTS_VERSION),
          // Availability is live truth; never serve it from a cache.
          cache: "no-store",
        });
        if (!response.ok) {
          return { status: "error", message: `availability_${response.status}` };
        }
        return { status: "ok", timeZone, slots: parseSlots(await response.json()) };
      } catch {
        return { status: "error", message: "availability_unreachable" };
      }
    },

    async createBooking({ type, request }): Promise<BookingResult> {
      const id = eventTypeId(type);
      if (!id) return { status: "not_configured" };

      try {
        const response = await fetch(`${BASE}/bookings`, {
          method: "POST",
          headers: headers(BOOKINGS_VERSION),
          body: JSON.stringify({
            start: request.start,
            eventTypeId: Number.isNaN(Number(id)) ? id : Number(id),
            attendee: {
              name: request.name,
              email: request.email,
              timeZone: request.timeZone,
              language: "en",
              ...(request.phone ? { phoneNumber: request.phone } : {}),
            },
            metadata: {
              practice: type.practice,
              consultation: type.name,
              ...(request.company ? { organisation: request.company } : {}),
            },
            ...(request.notes ? { bookingFieldsResponses: { notes: request.notes } } : {}),
          }),
        });

        if (response.status === 409 || response.status === 422) {
          return { status: "unavailable" };
        }
        if (!response.ok) {
          return { status: "error", message: `booking_${response.status}` };
        }

        const payload = (await response.json()) as {
          data?: {
            uid?: string;
            id?: number | string;
            start?: string;
            attendees?: { timeZone?: string }[];
          };
        };
        const data = payload.data ?? {};
        const reference = String(data.uid ?? data.id ?? "");
        if (!reference) return { status: "error", message: "booking_unconfirmed" };

        return {
          status: "booked",
          reference,
          start: data.start ?? request.start,
          timeZone: data.attendees?.[0]?.timeZone ?? request.timeZone,
          // Cal.com sends its own confirmation. Stated only because the
          // provider owns that behaviour — never asserted speculatively.
          confirmationEmailSent: true,
          manageUrl: process.env.CALCOM_BOOKING_MANAGE_BASE
            ? `${process.env.CALCOM_BOOKING_MANAGE_BASE}/${reference}`
            : undefined,
        };
      } catch {
        return { status: "error", message: "booking_unreachable" };
      }
    },
  };
}

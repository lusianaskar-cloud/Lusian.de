import type { AvailabilityResult, BookingResult, SchedulingProvider } from "./types";

/**
 * Synthetic availability, for reviewing the booking interface only.
 *
 * `getSchedulingProvider` refuses to return this when NODE_ENV is production,
 * so it cannot reach a live site through configuration. It exists because the
 * alternative — hard-coding placeholder slots into the UI — is exactly the
 * trap of showing people times that do not exist.
 */
const WEEKDAY_HOURS = [9, 10, 11, 14, 15, 16];

export function createDemoProvider(): SchedulingProvider {
  return {
    name: "demo",

    async listSlots({ from, to, timeZone }): Promise<AvailabilityResult> {
      const start = new Date(from);
      const end = new Date(to);
      const slots = [];

      for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
        const day = d.getUTCDay();
        if (day === 0 || day === 6) continue;
        // A plausible, uneven pattern rather than a full grid.
        const offered = WEEKDAY_HOURS.filter((h) => (d.getUTCDate() + h) % 3 !== 0);
        for (const hour of offered) {
          const at = new Date(
            Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), hour, 0, 0),
          );
          if (at < new Date()) continue;
          slots.push({ start: at.toISOString(), duration: 30 });
        }
      }

      return { status: "ok", timeZone, slots };
    },

    async createBooking({ request }): Promise<BookingResult> {
      return {
        status: "booked",
        reference: `demo-${Date.now().toString(36)}`,
        start: request.start,
        timeZone: request.timeZone,
        // Nothing was actually sent.
        confirmationEmailSent: false,
      };
    },
  };
}

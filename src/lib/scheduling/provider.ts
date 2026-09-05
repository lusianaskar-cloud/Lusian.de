import { createCalComProvider } from "./calcom";
import { createDemoProvider } from "./demo";
import type { SchedulingProvider } from "./types";

/**
 * Resolves the configured scheduling backend, or null.
 *
 * Null is a first-class state: the booking interface renders completely and
 * says plainly that scheduling is not yet connected. It never invents a slot
 * and never reports a booking that did not happen.
 */
export function getSchedulingProvider(): SchedulingProvider | null {
  const provider = (process.env.SCHEDULING_PROVIDER ?? "").trim().toLowerCase();
  if (!provider || provider === "none") return null;

  if (provider === "calcom") {
    const key = process.env.CALCOM_API_KEY?.trim();
    return key ? createCalComProvider(key) : null;
  }

  // Synthetic availability for reviewing the interface. Hard-gated on
  // NODE_ENV so it cannot be switched on in production by configuration.
  if (provider === "demo" && process.env.NODE_ENV !== "production") {
    return createDemoProvider();
  }

  return null;
}

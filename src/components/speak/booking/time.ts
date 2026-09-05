/** Timezone-correct date helpers for the booking interface. */

export const TIMEZONES = [
  "Europe/Berlin",
  "Europe/London",
  "Asia/Dubai",
  "Asia/Riyadh",
  "Asia/Qatar",
  "Asia/Bahrain",
  "Asia/Muscat",
  "Asia/Kuwait",
  "Asia/Singapore",
  "America/New_York",
];

export function detectTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Berlin";
  } catch {
    return "Europe/Berlin";
  }
}

/** YYYY-MM-DD as it reads in the given zone — the key slots are grouped by. */
export function dayKey(instant: string | Date, timeZone: string) {
  const date = typeof instant === "string" ? new Date(instant) : instant;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatTime(instant: string, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(instant));
}

export function formatLongDate(instant: string | Date, timeZone: string) {
  const date = typeof instant === "string" ? new Date(instant) : instant;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function zoneAbbreviation(timeZone: string, at = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      timeZoneName: "shortOffset",
    }).formatToParts(at);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
  } catch {
    return "";
  }
}

/** The calendar grid for a month, Monday-first, padded to whole weeks. */
export function monthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1));
  const startPad = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const cells: { key: string; day: number; inMonth: boolean }[] = [];
  for (let i = 0; i < startPad; i += 1) cells.push({ key: `pad-${i}`, day: 0, inMonth: false });
  for (let d = 1; d <= daysInMonth; d += 1) {
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ key, day: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) cells.push({ key: `tail-${cells.length}`, day: 0, inMonth: false });
  return cells;
}

export function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    new Date(Date.UTC(year, month, 1)),
  );
}

export const WEEKDAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

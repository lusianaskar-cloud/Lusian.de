/**
 * Timezone-correct date helpers for the booking interface.
 *
 * Every display formatter takes the reader's locale, so a German reader sees
 * "Donnerstag, 4. Juni 2026" and an Arabic reader sees the month in Arabic —
 * from Intl, not from a translated month table that would drift.
 *
 * The one formatter that does *not* take a locale is `dayKey`: it is an
 * identifier, not a label, and must produce the same YYYY-MM-DD in every
 * language or slots would stop grouping.
 */

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

export function formatTime(instant: string, timeZone: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(instant));
}

export function formatLongDate(
  instant: string | Date,
  timeZone: string,
  locale: string,
) {
  const date = typeof instant === "string" ? new Date(instant) : instant;
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function zoneAbbreviation(timeZone: string, locale: string, at = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat(locale, {
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

export function monthLabel(year: number, month: number, locale: string) {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    new Date(Date.UTC(year, month, 1)),
  );
}

/**
 * Monday-first weekday initials, from the locale rather than a hard-coded
 * ["M","T","W",…] — which would read as English in a German or Arabic month.
 * 2024-01-01 was a Monday, so seven days from there gives the week in order.
 */
export function weekdayLabels(locale: string) {
  const format = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(Date.UTC(2024, 0, 1 + i))),
  );
}

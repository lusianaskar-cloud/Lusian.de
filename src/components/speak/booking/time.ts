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

/**
 * The first day of the week, from the locale rather than from habit.
 *
 * A Monday-first grid is correct in Germany and Britain and wrong in the
 * Gulf, where the week begins on Saturday. CLDR knows this; `weekInfo`
 * reports it as 1–7 for Monday–Sunday, which `% 7` turns into the 0–6 that
 * `Date.getUTCDay` speaks. Older engines have neither accessor, so the
 * fallback is Monday.
 */
export function firstDayOfWeek(locale: string) {
  try {
    const l = new Intl.Locale(locale) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number };
      weekInfo?: { firstDay: number };
    };
    const first = (l.getWeekInfo ? l.getWeekInfo() : l.weekInfo)?.firstDay;
    if (typeof first === "number" && first >= 1 && first <= 7) return first % 7;
  } catch {
    /* fall through */
  }
  return 1;
}

/** The calendar grid for a month, padded to whole weeks from `firstDay`. */
export function monthGrid(year: number, month: number, firstDay = 1) {
  const first = new Date(Date.UTC(year, month, 1));
  const startPad = (first.getUTCDay() - firstDay + 7) % 7;
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
 * Weekday column headings, from the locale rather than a hard-coded
 * ["M","T","W",…] — which would read as English in a German or Arabic month.
 *
 * The narrow form is the first choice, because the column is one character
 * wide. But narrow German is "M D M D F S S": Montag and Mittwoch collapse,
 * so do Dienstag and Donnerstag, and Samstag and Sonntag — four of seven
 * headings tell you nothing, and no German calendar is set that way. So when
 * the narrow set repeats itself, the short form is used instead, provided it
 * still fits the column. German short is "Mo Di Mi Do Fr Sa So" and fits.
 * English short is "Mon Tue Wed …" and does not, so English keeps its narrow
 * letters — which is the English convention anyway. Arabic narrow is
 * "ن ث ر خ ج س ح", seven distinct letters, and is kept.
 *
 * 2024-01-01 was a Monday, so `firstDay` days on from there starts the week
 * where the locale starts it.
 */
export function weekdayLabels(locale: string, firstDay = 1) {
  const on = (format: Intl.DateTimeFormat) =>
    Array.from({ length: 7 }, (_, i) =>
      format.format(new Date(Date.UTC(2024, 0, 1 + firstDay - 1 + i))),
    );

  const narrow = on(new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" }));
  if (new Set(narrow).size === 7) return narrow;

  const short = on(new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }));
  return short.every((s) => s.length <= 2) ? short : narrow;
}

/**
 * Wraps a run of Latin text so it survives inside an Arabic sentence.
 *
 * "Asia/Dubai" set in the middle of "جميع الأوقات بتوقيت …" is a left-to-right
 * island in a right-to-left paragraph, and the bidirectional algorithm will
 * drag the neighbouring punctuation into it unless the run is isolated.
 * U+2068 and U+2069 are that isolation, and they are invisible in a
 * left-to-right page, so the string is built the same way in every language.
 */
export function isolate(value: string) {
  return `⁨${value}⁩`;
}

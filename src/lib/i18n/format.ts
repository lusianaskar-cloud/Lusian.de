/**
 * Token interpolation for translated strings.
 *
 * Bundles have to survive the server-to-client boundary, so a string that
 * needs a value carries `{token}` rather than being a function. An unknown
 * token is left as it is written, which makes a mistake visible in the page
 * instead of silently rendering "undefined".
 */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}

/**
 * Splits a headline line around its accent word.
 *
 * Returns the three parts a renderer needs. If the accent is absent — or a
 * translator has rewritten the line past it — the whole line comes back as
 * `before`, and it simply renders without emphasis.
 */
export function splitAccent(text: string, accent?: string) {
  if (!accent) return { before: text, accent: "", after: "" };
  const at = text.indexOf(accent);
  if (at === -1) return { before: text, accent: "", after: "" };
  return {
    before: text.slice(0, at),
    accent,
    after: text.slice(at + accent.length),
  };
}

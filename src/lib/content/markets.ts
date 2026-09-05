/**
 * Gulf markets — structure only.
 *
 * Names, character and positioning are translated, and live in the locale
 * bundles keyed by these ids. What stays here is what does not change with
 * language: the id, the ISO country code, and the coordinates of the
 * principal hub that the constellation plots from.
 *
 * Note for the RTL layout: these coordinates are geographic. The plot must
 * not mirror in Arabic — a flipped Gulf would simply be wrong.
 */
export type Market = {
  id: string;
  code: string;
  /** Approximate coordinates of the principal hub. */
  lat: number;
  lng: number;
};

export const markets: Market[] = [
  { id: "uae", code: "AE", lat: 25.2, lng: 55.27 },
  { id: "saudi-arabia", code: "SA", lat: 24.71, lng: 46.68 },
  { id: "qatar", code: "QA", lat: 25.29, lng: 51.53 },
  { id: "bahrain", code: "BH", lat: 26.23, lng: 50.59 },
  { id: "oman", code: "OM", lat: 23.59, lng: 58.41 },
  { id: "kuwait", code: "KW", lat: 29.38, lng: 47.98 },
];

export function getMarket(id: string) {
  return markets.find((m) => m.id === id);
}

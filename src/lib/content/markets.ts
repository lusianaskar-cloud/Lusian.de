/**
 * Gulf markets.
 *
 * Descriptions are positioning and lifestyle character only. They contain no
 * statements about visa categories, residency rules, tax treatment, ownership
 * law or any other matter that changes by regulation — deliberately, so the
 * page does not age into inaccuracy.
 */

export type Market = {
  id: string;
  name: string;
  short: string;
  code: string;
  hub: string;
  cities: string[];
  /** Approximate coordinates of the principal hub, for the constellation. */
  lat: number;
  lng: number;
  line: string;
  body: string;
  character: string[];
  suits: string;
};

export const markets: Market[] = [
  {
    id: "uae",
    name: "United Arab Emirates",
    short: "UAE",
    code: "AE",
    hub: "Dubai · Abu Dhabi",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al Khaimah"],
    lat: 25.2,
    lng: 55.27,
    line: "The region's default entry point, and still its most liquid.",
    body: "Two very different city cultures within an hour of one another: one built for velocity and international exchange, the other for institutions, culture and a slower domestic register. Depth of international schooling, healthcare and professional services is the practical advantage — most requirements can be met without leaving the country.",
    character: [
      "Deepest international school and healthcare provision in the Gulf",
      "Dense professional-services and banking market",
      "Strongest onward connectivity for those who still travel constantly",
    ],
    suits: "Those who want optionality, and want it immediately.",
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    short: "Saudi Arabia",
    code: "SA",
    hub: "Riyadh",
    cities: ["Riyadh", "Jeddah", "Dhahran & the Eastern Province", "Red Sea coast"],
    lat: 24.71,
    lng: 46.68,
    line: "The largest economy in the region, and the one changing fastest.",
    body: "The scale of capital programmes and corporate relocation has changed what living here looks like, and continues to. Riyadh is the centre of gravity for business; Jeddah keeps a distinct coastal and mercantile character; the Eastern Province is its own industrial and professional world. This is a market where being early still counts for something.",
    character: [
      "Concentration of capital programmes and corporate headquarters",
      "Rapidly expanding cultural, sporting and leisure calendar",
      "Distinct city cultures with genuinely different daily lives",
    ],
    suits: "Those building something with a long horizon.",
  },
  {
    id: "qatar",
    name: "Qatar",
    short: "Qatar",
    code: "QA",
    hub: "Doha",
    cities: ["Doha", "Lusail", "Al Wakrah"],
    lat: 25.29,
    lng: 51.53,
    line: "Compact, well-ordered, and unusually easy to live in.",
    body: "Short distances and low friction define daily life. A strong institutional, academic and cultural presence gives the country a quieter, more deliberate register than its larger neighbours, and a small population makes the professional community genuinely legible.",
    character: [
      "Short commutes and a highly navigable single-city market",
      "Substantial academic, medical and cultural institutions",
      "A quieter social register than the regional average",
    ],
    suits: "Those who value order over intensity.",
  },
  {
    id: "bahrain",
    name: "Bahrain",
    short: "Bahrain",
    code: "BH",
    hub: "Manama",
    cities: ["Manama", "Riffa", "Amwaj"],
    lat: 26.23,
    lng: 50.59,
    line: "The Gulf's oldest financial community, at a smaller scale.",
    body: "A long-established banking and insurance sector, a lower cost base, and a familiarity to daily life that longer-standing residents tend to cite first. The causeway relationship with the Eastern Province makes it a practical base for those whose work sits in Saudi Arabia but whose family life does not need to.",
    character: [
      "Mature banking, insurance and financial-services community",
      "Established causeway relationship with the Eastern Province",
      "Lower cost base and a settled, familiar rhythm",
    ],
    suits: "Those who want proximity without immersion.",
  },
  {
    id: "oman",
    name: "Oman",
    short: "Oman",
    code: "OM",
    hub: "Muscat",
    cities: ["Muscat", "Sohar", "Salalah"],
    lat: 23.59,
    lng: 58.41,
    line: "The most understated address in the region.",
    body: "Landscape is the primary draw here — mountains, coastline and a built environment that has been unusually careful with itself. The pace is measured, the expatriate community long-settled, and the country tends to appeal to people who want the region without its volume.",
    character: [
      "Coastline, mountain and desert within a short drive of the capital",
      "Long-settled international community and a measured pace",
      "Strict architectural character preserved in the capital",
    ],
    suits: "Those who want the region turned down.",
  },
  {
    id: "kuwait",
    name: "Kuwait",
    short: "Kuwait",
    code: "KW",
    hub: "Kuwait City",
    cities: ["Kuwait City", "Salmiya", "Hawalli"],
    lat: 29.38,
    lng: 47.98,
    line: "A mature, family-centred market with deep private capital.",
    body: "Long-standing merchant families and substantial private wealth give Kuwait a domestic-first business culture that rewards those with a specific reason to be there. It is less oriented toward the arriving international professional than its neighbours, and more interesting to those with an existing relationship to the market.",
    character: [
      "Established merchant families and significant private capital",
      "Domestic-first commercial culture",
      "Strong family and community orientation",
    ],
    suits: "Those arriving with a reason, not a search.",
  },
];

export function getMarket(id: string) {
  return markets.find((m) => m.id === id);
}

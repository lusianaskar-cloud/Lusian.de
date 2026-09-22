import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { isLocale, locales, localeMeta } from "@/lib/i18n/config";
import { contentFor } from "@/lib/i18n/dictionary";
import { site } from "@/lib/content/site";

/**
 * The card a link to Lusian unfurls into.
 *
 * The site declared `twitter:card: summary_large_image` and shipped no image,
 * which is the worst of both: every share rendered an empty frame where a
 * large image had been promised. This is that image, in each language.
 *
 * It asserts nothing the site does not already substantiate — the wordmark,
 * the two divisions, and the domain. No claims, no numbers, no credentials.
 *
 * Satori has no canvas, so the light is built from gradients rather than from
 * `light/model.ts`: a cold source at the left, a warm one at the right, and
 * the crossover between them held in the middle. It is the argument Scene II
 * makes, reduced to something a social preview can carry.
 *
 * Two Satori limits shape the code below, and both fail silently rather than
 * loudly, which is why they are written down here:
 *
 *  - `inset: 0` is not understood. A layer written that way collapses to
 *    nothing and the gradient never paints, leaving a flat card that still
 *    builds and still passes every check. The light layers therefore set
 *    `top`, `left`, `width` and `height` explicitly.
 *  - Words are laid out left to right whatever `direction` says, so an Arabic
 *    phrase comes back correctly shaped and in the wrong order. See `order`.
 *
 * The light itself is mirrored for Arabic. `model.ts` sets the crossover cold
 * first and warm last because the volume is read left to right; read right to
 * left, that ordering has to swap or the card makes the argument backwards.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/*
 * Read once, at module scope, so three cards do not read the same two files
 * three times. Satori needs raw bytes; it cannot take the `next/font` handles
 * the site itself uses, and it cannot read woff2.
 */
const fonts = join(process.cwd(), "assets/fonts");
const [archivo, plexArabic] = await Promise.all([
  readFile(join(fonts, "Archivo.ttf")),
  readFile(join(fonts, "IBM_Plex_Sans_Arabic.ttf")),
]);

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const content = contentFor(locale);
  const rtl = localeMeta[locale].dir === "rtl";

  /*
   * The two divisions, in the reader's language, from the same strings Scene
   * II sets. They arrive as "01 — Aviation Advisory": a Latin number, an
   * em-dash and a name that may be Arabic. Satori's bidi is not strong enough
   * to be trusted with that mix, so the parts are split here and the visual
   * order is set explicitly by the flex direction.
   */
  const split = (s: string) => {
    const at = s.indexOf("—");
    return at === -1
      ? { index: "", name: s.trim() }
      : { index: s.slice(0, at).trim(), name: s.slice(at + 1).trim() };
  };
  const { aviation, privateAdvisory } = content.home.twoWorlds;
  const rows = [split(aviation.index), split(privateAdvisory.index)];

  const body = rtl ? "PlexArabic" : "Archivo";

  /*
   * Satori lays words out left to right whatever `direction` says, so an
   * Arabic phrase comes back correctly shaped and in the wrong order. The
   * words are therefore reversed here and set as one run: joining is the
   * font's business and stays intact, word order becomes ours, and the
   * spacing between them is the font's own rather than a flex gap guessing
   * at it. Safe only because these two strings are wholly Arabic — a mixed
   * run would need real bidi, which is why nothing else goes through here.
   */
  const order = (text: string) =>
    rtl ? text.split(/\s+/).reverse().join(" ") : text;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#14181A",
          color: "#F4F0E8",
          fontFamily: body,
          position: "relative",
        }}
      >
        {/* The cold opening: first in the reading order, so it swaps in Arabic. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              `radial-gradient(120% 90% at ${rtl ? 94 : 6}% 62%, rgba(150,178,192,0.42) 0%, rgba(150,178,192,0.12) 38%, rgba(20,24,26,0) 68%)`,
          }}
        />
        {/* The warm interior: last in the reading order. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              `radial-gradient(120% 90% at ${rtl ? 4 : 96}% 70%, rgba(206,170,116,0.40) 0%, rgba(206,170,116,0.11) 40%, rgba(20,24,26,0) 70%)`,
          }}
        />
        {/* The floor the light rakes across. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(to top, rgba(20,24,26,0.72) 0%, rgba(20,24,26,0) 42%)",
          }}
        />

        <div
          style={{
            display: "flex",
            position: "relative",
            justifyContent: rtl ? "flex-end" : "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: "Archivo",
              fontSize: 32,
              letterSpacing: 17,
              color: "#F4F0E8",
            }}
          >
            {site.wordmark}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: rtl ? "flex-end" : "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 132,
              height: 1,
              background: "rgba(244,240,232,0.30)",
              marginBottom: 36,
            }}
          />
          {rows.map((row, i) => (
            <div
              key={row.name}
              style={{
                display: "flex",
                flexDirection: rtl ? "row-reverse" : "row",
                alignItems: "baseline",
                gap: 24,
                marginTop: i === 0 ? 0 : 18,
              }}
            >
              <span
                style={{ fontFamily: "Archivo", fontSize: 22, color: "#CEAA74" }}
              >
                {row.index}
              </span>
              <span style={{ fontSize: 44, color: "#F4F0E8" }}>
                {order(row.name)}
              </span>
            </div>
          ))}
          <span
            style={{
              fontFamily: "Archivo",
              fontSize: 19,
              color: "rgba(244,240,232,0.52)",
              letterSpacing: 4,
              marginTop: 46,
            }}
          >
            {site.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, style: "normal", weight: 500 },
        { name: "PlexArabic", data: plexArabic, style: "normal", weight: 400 },
      ],
    },
  );
}

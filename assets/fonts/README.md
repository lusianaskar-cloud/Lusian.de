# Fonts vendored for the social card

These two files are read at build time by `src/app/[lang]/opengraph-image.tsx`
and embedded in the generated Open Graph image. They are **not** served to the
browser — the site itself loads its webfonts through `next/font/google` in
`src/app/[lang]/layout.tsx`, and nothing here changes that.

They are vendored rather than fetched because a build must not depend on a
third-party host being reachable, and because Satori needs the raw bytes.

| File | Family | Why it is here |
| --- | --- | --- |
| `Archivo.ttf` | Archivo 500 | The STRUCTURE role. Carries the wordmark and the Latin division names. |
| `IBM_Plex_Sans_Arabic.ttf` | IBM Plex Sans Arabic 400 | Arabic shaping, and the face the site already uses for Arabic. Satori's fallback cannot shape Arabic at all. Amiri and Noto Sans Arabic were tried first and both fail the build with `lookupType: 5 - substFormat: 3 is not yet supported`: Satori's OpenType shaper does not implement contextual substitution format 3, which those faces rely on. Plex shapes cleanly. |

## Licence

Both families are released under the SIL Open Font License, Version 1.1, which
permits redistribution of the font files, bundled or not, provided they are not
sold on their own and the licence travels with them.

- Archivo — Copyright (c) Omnibus-Type. <https://fonts.google.com/specimen/Archivo/license>
- IBM Plex Sans Arabic — Copyright (c) IBM Corp. <https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic/license>

Full licence text: <https://openfontlicense.org/open-font-license-official-text/>

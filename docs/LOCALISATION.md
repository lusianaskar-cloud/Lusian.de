# Lusian — localisation

Three languages, three native voices. Not one voice translated twice.

The standard: **international English**, **German written for Germany**,
**Modern Standard Arabic for an educated Gulf and international Arab
readership**. If a sentence sounds translated, it is rewritten. Meaning is
localised, not word order.

A translation bug is a design bug and is launch-blocking.

---

## 1. Where the words live

`src/lib/content/locales/{en,de,ar}.ts`, each a bundle satisfying the
`SiteContent` contract in `src/lib/i18n/types.ts`.

Two rules hold that contract together:

- **Nothing in it is a function.** One locale bundle crosses the RSC boundary,
  so templates carry `{token}` placeholders and are filled by `format()`.
- **Nothing in it is structural.** Ids, slugs, hrefs and coordinates live in
  `src/lib/content/*` and never change with language. A flipped Gulf would
  simply be wrong.

Emphasis is carried as a substring (`Line = { text, accent }`), not as a word
index, so the emphasised word can sit anywhere in any language's sentence.

---

## 2. German glossary

These are decisions, not defaults. Each replaces something that read as a
calque, as Denglisch, or as Behördenstil.

| English | German | Rejected, and why |
| --- | --- | --- |
| Gulf Private Advisory | **Private Begleitung in der Golfregion** (short: *Private Begleitung*) | *Private Beratung Golf* — a word-for-word calque with no German grammar. *Begleitung* is what the division actually does, and it keeps *Beratung* for the aviation practice. |
| Aviation Advisory | **Luftfahrtberatung** | — |
| Destinations | **Standorte** | *Destinationen* is tour-operator German. The page is about where you would establish yourself. |
| markets (in prose) | **Märkte** | Kept distinct from *Standorte*, exactly as English keeps *markets* distinct from *Destinations*. |
| Insights | **Perspektiven** | *Einblicke* is weak; *Insights* is Denglisch. |
| Book a consultation | **Gespräch vereinbaren** | *Beratungstermin buchen* is transactional. A German professional *vereinbart ein Gespräch*. |
| Ask a question | **Eine Frage stellen** | — |
| engagement | **Mandat** | *Engagement* in German means commitment or involvement, not a professional instruction. |
| principal | **Verantwortlicher** | Not *Principal*, which is not a German role. |
| client | **Klient** | *Mandant* is specifically legal/tax. |
| private clients | **Privatpersonen** | *Privatklienten* leans banking-Denglisch; these are people. |
| ground handlers | **Bodenabfertiger** | Precise, and readable. |
| stands | **Standplätze** | — |
| rosters | **Dienstpläne** | — |
| lead times | **Vorlaufzeiten** | — |
| one point of contact | **Ein Ansprechpartner** | — |
| file (the client's) | **Dossier** | *Akte* carries a bureaucratic ring. |
| held in sequence | **eine nach der anderen** | *In geordneter Reihenfolge* is procedural. |
| one firm | **Ein Haus** | *Ein Büro* claims an office the firm does not have. |
| standard of execution | **Maßstab in der Umsetzung** | — |
| we do not compromise | **keine Abstriche machen** | *Nicht nachgeben* is combative; *Abstriche machen* is the idiom. |
| regulated matters, properly placed | **Regulierte Fragen, in den richtigen Händen** | *Richtig platziert* is a calque. |

### German headlines, as rewritten

| Was | Now | Why |
| --- | --- | --- |
| Manche Vorhaben sind operativ. | **Manche Vorhaben sind rein operativ.** | *rein* / *zutiefst* is a real rhetorical pair, and it makes *operativ* work as a predicate. |
| Wir arbeiten in der Distanz zwischen einer Entscheidung und ihrer Umsetzung. | **Zwischen einer Entscheidung und ihrer Umsetzung liegt unsere Arbeit.** | *In der Distanz arbeiten* is not German. The inversion is. |
| Ein Umzug, still vollzogen – und nur einmal. | **Ein Umzug, still vollzogen. Und nur einmal.** | The full stop gives it the two-beat rhythm the English has. |
| Fünf Stufen, ein Ansprechpartner. | **Fünf Etappen, ein Ansprechpartner.** | *Stufen* are tiers; *Etappen* are stages of a journey. |
| Wer Sie zuerst spricht … | **Wen Sie zuerst sprechen, der bleibt …** | The original was ungrammatical. |
| Ein Gespräch beginnen. | **Beginnen wir ein Gespräch.** | An invitation, not an infinitive instruction. |
| Was folgt, ist das ganze Argument. | **Was folgt, ist alles, was für uns spricht.** | *Das ganze Argument* is a calque. |

Every German headline is read aloud for rhythm before it is committed. Long
noun chains are broken. *Beratung* is used where it is the right word and not as
filler — the homepage now uses it three times, not eleven.

---

## 3. Arabic glossary

| English | Arabic | Rejected, and why |
| --- | --- | --- |
| Gulf Private Advisory | **الاستشارات الخاصة في منطقة الخليج** | *لمنطقة الخليج* reads as a dative attached to a title; *في* is how the practice is actually described. |
| Aviation Advisory | **استشارات الطيران** | — |
| two disciplines | **تخصصان** | *تخصصان اثنان* — the dual already carries "two"; the extra numeral is a machine-translation tic. |
| one firm | **جهة واحدة** | *مكتب واحد* claims an office the firm does not have. |
| engagement | **مهمة** | *ارتباط* means a bond or a commitment, not a professional instruction. It was a machine-translation artefact. |
| stands (aircraft) | **مواقف الطائرات** | *المواقف* alone is ambiguous. |
| lead times | **مُهَل التنفيذ** | *مُهَل التوريد* is supply-specific. |
| restrained communication | **تواصل مُقتضَب** | *مقتصد* means frugal. |
| held in sequence | **كلٌّ في أوانه** | *محفوظة بترتيبها* is procedural. |
| hold them to standard | **تُلزمها بالمعايير** | *تحاسبها على المعيار* reads as punishment. |
| discretion | **الكتمان** | — |
| one point of contact | **جهة اتصال واحدة** | — |

### Arabic headlines, as rewritten

| Was | Now | Why |
| --- | --- | --- |
| نعمل في المسافة بين القرار وتنفيذه. | **بين القرار وتنفيذه مسافة، وفيها نعمل.** | You do not work *inside a distance* in Arabic. The nominal sentence is natural and keeps the image. |
| انتقال يتم بهدوء، ولمرة واحدة. | **انتقال يتم بهدوء، ولا يتكرر.** | Carries the promise — you do this once — instead of counting. |
| ابدأ محادثة. | **لنبدأ الحديث.** | An invitation. *محادثة* is closer to a chat than a conversation. |
| خذ ثلاثين دقيقة. | **ثلاثون دقيقة تكفي للبداية.** | A literal imperative reads like an instruction from a manual, not an invitation to a premium consultation. |
| ملف واحد … محفوظة بترتيبها. | **… كلٌّ في أوانه.** | — |

No dialect. Not excessively classical. No English syntax in Arabic words, no
unnatural passives, no government-document tone, no Western luxury phrases
translated literally, and no transliteration where an Arabic word exists.

---

## 4. Arabic is not mirrored English

**Typography is its own system.** Amiri answers Newsreader for the statement
role; IBM Plex Sans Arabic answers Archivo for structure and voice. Arabic is
never tracked — a joined script whose letter-spacing is increased stops being
words — so tracking is switched off wherever the text is Arabic, using
`*:lang(ar)` rather than `*` so that a declared Latin run keeps the tracking it
was designed with.

**Optical equivalence, not numerical parity.** `--ar-struct: 0.84` and
`--ar-state: 0.8` scale every Arabic headline. They are applied at the call
site, in the same declaration as the size:

```
text-[calc(clamp(2.6rem,7.4vw,6.5rem)*var(--ar-struct))]
```

They must not be applied in a `:lang(ar)` rule as `font-size: 0.82em` — `em`
resolves against the parent, not against the size the element was given, and the
stated size is silently discarded. That mistake was live and put every Arabic
headline on the site at roughly 13px.

**Composition is audited, not mirrored.** Where a line is shorter in Arabic than
in English, it is set larger rather than left lighter — the closing statement is
the current example, and it carries its own clamp. Scatter offsets in Scene V
are measured inward from the reading edge and flipped for RTL, so the same
composition survives the mirror without throwing text off the frame.

**Latin runs keep Latin typography.** LUSIAN, UTC, ENGLISH, DEUTSCH, email
addresses, booking references and airport codes are marked `lang="en"` and/or
`dir="ltr"`, which restores the Latin font stack and the Latin tracking inside
an Arabic page.

**Numerals.** Western Arabic numerals throughout, set by
`localeMeta.ar.intl = "ar-u-nu-latn"`. Chosen deliberately: this readership
reads prices, dates, flight numbers and booking references in Latin digits every
day, and mixing numeral systems between a calendar and a booking reference is
worse than picking one.

---

## 5. Still open

- Interior pages (`/aviation`, `/private-advisory`, `/destinations`, `/about`,
  `/speak/*`) carry the previous German and Arabic copy. The terminology
  decisions above have been applied across the whole bundle, but the sentence-
  level rewrite has so far been done for the homepage only.
- An independent native review of both languages has not happened. It should,
  before launch, and by a person.
- The booking calendar's month names, weekday abbreviations, direction arrows
  and timezone wording were localised in the earlier i18n pass and have not been
  re-audited against the rewritten copy.

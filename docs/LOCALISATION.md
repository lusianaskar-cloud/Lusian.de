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

- The sentence-level rewrite now covers the interior pages as well as the
  homepage, in both languages. See §6 for what that pass changed.
- An independent native review by a person has still not happened. It should,
  before launch. Everything here is one writer's judgement.
- An independent native review of both languages has not happened. It should,
  before launch, and by a person.
- The booking calendar's month names, weekday abbreviations, direction arrows
  and timezone wording were localised in the earlier i18n pass and have not been
  re-audited against the rewritten copy.

---

## 6. The interior-page rewrite

The terminology pass fixed vocabulary. This pass fixed **rhythm** — the places
where a German or Arabic sentence still had an English skeleton under it.

### What a calque looked like here

| Was | Now | The tell |
| --- | --- | --- |
| `Luftfahrt belohnt Präzision mehr als Ambition.` | **Präzision bringt hier weiter als jeder Ehrgeiz.** | An abstract subject that "rewards" is English rhetoric; *Ambition* is a false friend for *Ehrgeiz*. |
| `an der Naht zwischen dem, was geplant war, und…` | **dort, wo der Plan auf den Dienstagmorgen um 05:40 trifft** | "At the seam between" is an English image carried word for word. |
| `Ein Umzug ist nicht eine Entscheidung.` | **Ein Umzug ist keine Entscheidung.** | German negates with *kein*, not *nicht ein*. |
| `Eine Familie zu verlegen` | **Mit einer Familie umzuziehen** | *Verlegen* moves departments and objects, not families. |
| `meist gegen ein Datum` | **meist mit einem Stichtag im Nacken** | "Against a deadline" is not a German preposition. |
| `Ein Markt zur Zeit` | **Ein Markt nach dem anderen** | *Zur Zeit* means "currently" — an outright mistranslation. |
| `eine feste Leitung für die Führung` | **ein offener Draht zur Geschäftsführung** | *Feste Leitung* is a telephone landline. |
| `الطيران يكافئ الدقة أكثر مما يكافئ الطموح` | **في الطيران، الدقة تسبق الطموح** | Same English "rewards" construction, transliterated. |
| `عند الوصلة بين ما خُطِّط له` | **حيث يلتقي المخطَّط بما يحدث فعلًا** | الوصلة is a physical coupling; the English seam metaphor does not carry. |
| `في فترات من خمس عشرة دقيقة` | **في أرباع الساعة** | Arabic has a word for this. |
| `النتائج التي لا يعرفها من يعمل على الساحة` | **ملاحظة لا يعرفها أهل الساحة** | نتائج is *results*, not *findings*. |
| `له سطح غير مألوف وبنية مألوفة` | **يبدو غريبًا من الخارج، ومألوف البنية من الداخل** | Surface/structure as a literal pair. |
| `في مواجهة موعد` | **تحت ضغط موعد** | "Against a deadline" again. |

Body copy also stopped repeating its own headline in the first sentence, which
is an English editorial habit and reads as padding in both languages.

### Damage from the earlier bulk replace, repaired

Swapping `ارتباط` → `مهمة` sitewide was a vocabulary fix that broke grammar,
because the two words differ in gender. Every site was found and corrected:

- **Agreement:** `يجمع المهمة` → `تجمع المهمة`; `يسير` → `تسير`; `يبدأ` → `تبدأ`;
  `يتطلب` → `تتطلب`; `مهمة مركّز` → `مهمة مركّزة`.
- **A destroyed technical term:** `ملفات الارتباط` is the Arabic for *browser
  cookies*. The replace turned the privacy policy's cookie clause into
  "important files". Restored.
- **A destroyed legal term:** an *engagement letter* is `خطاب تكليف`, not
  `خطاب مهمة`; `مهمة مكتوب` was not grammatical at all.
- **A malformed word:** `مهمةًا` carried two accusative endings. Gone.

The lesson is recorded here because it will recur: a find-and-replace across a
locale bundle is a grammar change in an inflected language, not a substitution.

### Punctuation

Six instances of `؛ و` were normalised to `، و`. The Arabic semicolon is real
punctuation, but semicolon-plus-*waw* is the English semicolon habit wearing
Arabic clothes — the *waw* already joins the clauses.

---

## 7. The philological pass

A line-by-line reading of all 907 Arabic strings and the full German bundle,
looking for grammar rather than register. What it found was not more calques —
it was outright errors, several of which said the opposite of what was meant.

### Errors of sense

| Language | Was | Why it was wrong |
| --- | --- | --- |
| DE | `Sie scheitert an fähigen Händen.` | Says regional infrastructure fails **because of** capable hands. Now `am Mangel an fähigen Händen`. |
| AR | `بل تقيّده الأيدي الكفؤة.` | The identical inversion in the Arabic edition. Now `بل يقيّده نقص الأيدي الكفؤة`. |
| DE | `Beide bekommen, was sie brauchen.` | After "we write for the shift manager, not for the board's binder" — the two referents were a manager and a binder. Now `beide Seiten`. |
| AR | `وكلاهما يحصل على ما يحتاجه.` | The same dangling dual. Now `ويحصل الطرفان على ما يحتاجانه`. |

### Errors of grammar

**German.** `ein Terminal, das gut eröffnet` — *eröffnen* is transitive; a
terminal is opened, it does not open (two places). `Eine Familie verlegen` —
*verlegen* moves departments and cables, not families. `abgewogen daran` —
*abwägen* governs *gegen*, never *an*. `der Plan, gegen den die Arbeit läuft` —
*gegen etwas laufen* means to oppose it; work is measured *an* a plan.
`eine Entscheidung, die geprüft gehört` — the *gehört* + participle
construction is South German colloquial, not standard. `die es lohnt zu
beantworten` — missing both the reflexive and the comma before the extended
infinitive. A serial comma before *und* in three enumerations, which German
does not take.

**Arabic.** `شبكة خطوط تُعاد بناؤها` — the نائب فاعل is بناء, masculine, so the
verb must be `يُعاد`. `ما زال للحضور المبكر فيه قيمة` — قيمة is the ism of
ما زال and feminine: `ما زالت`. `واثنان منها` for a feminine plural: `واثنتان`,
with the verb to match. `بيئة عمرانية عُنيت بنفسها` — a passive cannot also be
reflexive. `ولم يُصغها محامٍ` — a passive verb cannot take a stated agent.
`إن كانت الإجابة الصحيحة مهنيًا مرخّصًا لا نحن` — an accusative and a nominative
in apposition. `المراكز متعددة المدارج` — a definite noun takes a definite
adjective.

### Errors of lexis

`Rechtsraum` is a legal *area* (europäischer Rechtsraum), not a jurisdiction.
`eine Beratung` is a consultation, not a consulting firm. `Anwender` is a
software user. `Vorstellung bei Bankverbindungen` — one is introduced to a
bank, not to a banking relationship (the same error stood in Arabic:
`التعريف بعلاقات مصرفية`). `مشهد المدارس` is the school *scene*, not its map.
`الملكيات الحكومية` reads as government *monarchies*. `الموقع` is a place or a
website, not a market position. `مطاري` is not an Arabic nisba.

### Typography

Every parenthetical dash in the German bundle was an em-dash (—). Duden sets
the Gedankenstrich as the **Halbgeviertstrich** (–); the em-dash is English and
American practice. 68 were converted. Ranges (`2–6 Wochen`) already used the
correct Bis-Strich and were left alone. German compounds in the SEO keywords
were standing unjoined (`Airline Beratung`), which is not German at any
register.

### One distinction worth keeping

`محادثة` and `حديث` are not interchangeable and were not collapsed: `محادثة` is
a **scheduled** conversation and stays throughout the booking flow; `حديث` is
the act of talking, which is what an invitation invites you to. Likewise
`على الأرض` was left standing on the aviation page, where it means literally
*on the ground* as opposed to in the air — the one place the phrase is not a
calque.


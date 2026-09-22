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


## 8. The calendar

The booking calendar is the one place on the site where the words are not
ours. Month names, weekday headings and long dates come from `Intl`, so they
are as correct as CLDR is, and they never drift out of step with a translated
month table. But `Intl` answers the question you ask it, and three of the
questions were wrong.

### The week does not start on Monday

`monthGrid` padded to a Monday-first week and `weekdayLabels` counted from a
Monday, in every language. That is right in Berlin and London and wrong in the
Gulf, where the week begins on **Saturday** — which is what CLDR says for `ar`,
and what the site's own readers use. Both now take a `firstDay` from
`firstDayOfWeek(locale)`, which reads `Intl.Locale`'s `weekInfo` and falls back
to Monday on engines that do not carry it. The Arabic calendar now reads
`س ح ن ث ر خ ج`, Saturday first.

### "M D M D F S S"

The weekday headings asked `Intl` for the **narrow** form, which is one
character — the right width for the column. In German that is
`M D M D F S S`: Montag and Mittwoch collapse, so do Dienstag and Donnerstag,
and Samstag and Sonntag. Four of the seven headings carried no information,
and no German calendar has ever been set that way.

`weekdayLabels` now prefers narrow, and falls back to the **short** form when
the narrow set repeats itself *and* the short form still fits a one-to-two
character column. German gets `Mo Di Mi Do Fr Sa So`. English keeps
`M T W T F S S` — its narrow form is ambiguous too, but its short form is
`Mon Tue Wed`, too wide for the column, and single letters are the English
convention in any case. Arabic narrow is seven distinct letters and is kept.
The rule is stated once, in the locale, rather than as a table of exceptions.

### Latin inside an Arabic sentence

IANA zone names are Latin in every language. Set inside
`جميع الأوقات بتوقيت …`, `Asia/Dubai` is a left-to-right island in a
right-to-left paragraph, and the bidirectional algorithm drags the neighbouring
middle dots and the UTC offset into it. `isolate()` wraps such a run in U+2068
and U+2069 before it is interpolated; the characters are invisible in a
left-to-right page, so one string serves all three languages. The timezone
`<select>`, which lists nothing but Latin identifiers, is marked `dir="ltr"`.

### What was already right

The arrows. `Arrow` mirrors itself under `rtl:-scale-x-100`, and the previous
month button adds `rotate-180`; the two compose to a right-pointing arrow in
Arabic, which is backwards in a right-to-left page — correct. The day buttons
carry a full localised date as their `aria-label` and the heading row is
`aria-hidden`, so an Arabic screen reader hears `الخميس، 17 سبتمبر 2026`
rather than a bare letter. `dayKey` stays `en-CA` in every language, because it
is an identifier and not a label.

### Copy

Read again at this level, the booking copy still held errors of the kind §7
catalogues. German: `Zeiten angezeigt in` was a participle with nothing to
hang on; `während Sie ausgefüllt haben` left a transitive verb without its
object; `Lieber als X zu tun, hätten wir Y` is not a German construction; and
the apposition after `für eine klar umrissene Arbeit` stood in the nominative
where the accusative was governed. The flow reserved a *Zeit* in three places
and confirmed a *Termin* in a fourth — German reserves the appointment, so all
four now say Termin.

Arabic: `احجز استشارة` is an imperative, correct on a button and wrong on a
page title and an eyebrow, which take the verbal noun (`حجز استشارة`);
`أي مجال يخصّ هذا الحجز` had the subject and object the wrong way round;
`أي نوع من المحادثة` needed the plural after the partitive; the tamyīz after
`ثلاثون` and `ستون` was missing its accusative (`دقيقةً`); `تحتاج الجواب`
wanted `إلى`, as it has everywhere else in the bundle; and `تعذّر عرض الإتاحة`
used a coinage where `المواعيد` was meant. `tryAgain` was the only button in
the Arabic bundle written as an imperative — and in the masculine singular,
which addresses half the readership — while `رجوع`, `متابعة`, `مراجعة` and
`تأكيد` are all verbal nouns. It is now `إعادة المحاولة`.

One word was examined and deliberately left: `الجهة` for the organisation
field. It reads bureaucratic in isolation, but it is the one Arabic word that
covers a company, an authority and a government body at once, which is exactly
the mix the aviation practice writes to.

## 9. The fourth pass: orthography and micro-typography

§7 read for sense, grammar, lexis and typography. §8 read the calendar. This
pass read for the things a reader does not consciously notice and a native
speaker cannot unsee: whether the same word is spelled the same way twice.

### The method

Mechanical, because this is the one layer where a script beats a careful
reader. Every string literal in the three bundles was extracted and checked
for: placeholder parity, quotation-mark inventory, ASCII characters standing
in for typographic ones, German abbreviation spacing, and — the productive
one — **words that appear in more than one spelling once tatweel, harakat,
alif forms, alif maqsura and taa marbuta are normalised away**.

That last check found 36 variant groups in Arabic, 28 of them differing only
by diacritics. Each was then read in context. **None was fixed by find and
replace**, because most of them were not errors at all.

### The house style it revealed

The bundle vocalises the passive and leaves the active bare — `يُنشر` against
`ينشر`, `نُكلَّف` against `نكلّف`. That is not an inconsistency, it is the
correct convention: unvocalised Arabic cannot otherwise distinguish the two,
and `مكتب ينشر عملاءه` ("an office that publishes its clients") is a different
sentence from one about being published. Twenty of the twenty-eight groups
were this distinction working properly, and they were left alone.

### What was actually wrong

| Where | Was | Is | Why |
| --- | --- | --- | --- |
| `ar:245` | `والملاك` | `والمُلّاك` | The line lists what an operation actually runs on — stands, rosters, permits, **landlords**, lead times. Unpointed, `الملاك` reads as *al-malak*: the angel. |
| `ar:471` | `تحدد` | `تحدّد` | Form II ḥaddada; without the shadda it is a different verb. |
| `ar:516`, `ar:1191` | `التنقل` | `التنقّل` | *tanaqqul*, mobility — form V, and the shadda carries it. |
| `ar:1173` | `يتفق` | `يتّفق` | Form VIII *ittafaqa*: the shadda is on the tāʾ. |
| `ar:703`, `ar:706` | `موجّهة` | `موجَّهة` | A shadda alone leaves *muwajjiha* (directing) and *muwajjaha* (directed) identical. The fatḥa decides it, and the line means directed. |
| `ar:966` | `مهنيّ` | `مهني` | The other four occurrences in the bundle write it bare. |
| `en` ×19 | `'` | `’` | ASCII apostrophes in `An operator's judgement` and the rest. English, not Arabic, but the same standard. |

### What was checked and found clean

- **Placeholder parity.** Every `{name}`, `{current}`, `{total}`, `{zone}`
  appears the same number of times in all three bundles. None translated.
- **German orthography.** No Deppenapostroph. No spaced hyphen standing in for
  a dash — the §7 en-dash conversion held. No double spaces. `muss` and `dass`
  are correct post-1996 and are not `ß` errors.
- **German abbreviations.** There are none: no `z. B.`, no `d. h.`, no `u. a.`
  The register writes them out, which is why the spacing rule never arises.
- **German terminology.** `Beratung` and `Begleitung` split 19/15, which is the
  two divisions, not drift. `Praxis` once ("für die Praxis"), `Auftrag` twice
  ("mit einem Auftrag ankommen") and `Beauftragung` once (the legal
  disclaimer) are distinct senses, not competing renderings of one term.
- **Reflow.** No horizontal overflow at 320px or 390px in either language, on
  any route. German's long compounds — `Umsatzsteuer-Identifikationsnummer`,
  `Verbraucherschlichtungsstelle` — all sit at small sizes in legal copy and
  fit. There is no `hyphens: auto` anywhere; nothing currently needs it, and
  adding it would change the rag across the German site, so it is recorded
  here rather than imposed.
- **Prose.** The display lines hold up. `Zwischen einer Entscheidung und ihrer
  Umsetzung liegt unsere Arbeit` fronts the phrase and keeps the verb second,
  which is German rhetoric rather than English word order; `Ein Haus` for "One
  firm" is the idiom. `بين القرار وتنفيذه مسافة، وفيها نعمل` is a fronted
  adverbial nominal sentence, and the waw opening `ومعيار واحد في التنفيذ`
  binds it to the line above as Arabic cohesion wants.

### The rule this pass exists to enforce

Normalise, group, then **read every group in context before touching one
character**. The 28 diacritic variants looked like 28 errors and were seven.
A bulk replace over that list would have turned twenty correct passives into
actives and broken the sense of the pages they sit on — which is exactly the
damage §7 records from the last time a find-and-replace was trusted here.

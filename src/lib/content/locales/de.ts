import type { SiteContent } from "@/lib/i18n/types";

/**
 * German.
 *
 * Register: Sie-Form throughout, editorial rather than corporate, and short.
 * German runs roughly a fifth longer than English, so headlines are rewritten
 * to the same rhythm rather than translated word for word — a display line
 * that wraps to three is a broken composition, not a longer sentence.
 *
 * The placeholder policy is not translated away: anything outstanding in
 * English is outstanding here, and no claim has been added that the English
 * does not make.
 */
export const de = {
  seo: {
    home: {
      title: "Lusian — Luftfahrtberatung · Private Begleitung in der Golfregion",
      description:
        "Lusian berät Luftfahrtunternehmen sowie Privatpersonen, die sich in der Golfregion niederlassen — Betrieb, Strategie und private Etablierung, koordiniert über einen einzigen Ansprechpartner.",
    },
    aviation: {
      title: "Luftfahrtberatung",
      description:
        "Beratung zu Betrieb, Entwicklung, Investition und Regulierung für Fluggesellschaften, Flughäfen, Abfertiger, Investoren und öffentliche Stellen der Luftfahrt.",
    },
    gulf: {
      title: "Private Begleitung in der Golfregion",
      description:
        "Privater Umzug und Etablierung in der Golfregion — Orientierung, Koordination der Aufenthaltsverfahren, Firmengründung, Immobilie, Schule, Bankverbindung und Ankunft, gehalten in einem Mandat.",
    },
    markets: {
      title: "Standorte",
      description:
        "Die sechs Golfmärkte, in denen wir beraten — Vereinigte Arabische Emirate, Saudi-Arabien, Katar, Bahrain, Oman und Kuwait — beschrieben nach wirtschaftlichem und alltäglichem Charakter.",
    },
    about: {
      title: "Über uns",
      description:
        "Warum es Lusian gibt, wer dahintersteht und wo die Verantwortung dieses Büros endet und die einer zugelassenen Fachperson beginnt.",
    },
    speak: {
      title: "Sprechen Sie mit Lusian",
      description:
        "Stellen Sie eine Frage oder vereinbaren Sie ein Gespräch — Luftfahrtberatung oder private Etablierung in der Golfregion. Vertraulich und unverbindlich.",
    },
    ask: {
      title: "Eine Frage stellen",
      description:
        "Eine konkrete Frage zu einem Luftfahrtprojekt oder einem Umzug in die Golfregion, beantwortet von einem Menschen. Vertraulich und unverbindlich.",
    },
    book: {
      title: "Gespräch vereinbaren",
      description:
        "Wählen Sie Bereich, Gesprächsform und Zeit in Ihrer eigenen Zeitzone. Dreißig oder sechzig Minuten, vertraulich und unverbindlich.",
    },
    questions: {
      title: "Häufige Fragen",
      description:
        "Fragen, die oft genug gestellt werden, um sie öffentlich zu beantworten — wie wir arbeiten, die Wahl eines Golfmarktes, Familie und Schule, Firmengründung und Luftfahrtmandate.",
    },
    insights: {
      title: "Perspektiven",
      description:
        "Notizen zu Luftfahrtbetrieb, Golfmärkten, Mobilität und privater Etablierung. Der redaktionelle Bereich ist in Vorbereitung; die derzeit gezeigten Beiträge sind Demonstrationen.",
    },
  },

  meta: {
    descriptor: "Luftfahrtberatung · Private Begleitung in der Golfregion",
    descriptorShort: "Luftfahrt · Private Begleitung",
    positioning: "Zwei Disziplinen. Ein Maßstab in der Umsetzung.",
    description:
      "Lusian berät Luftfahrtunternehmen sowie Privatpersonen, die sich in der Golfregion niederlassen — Betrieb, Strategie und private Etablierung, koordiniert über einen einzigen Ansprechpartner.",
    keywords: [
      "Luftfahrtberatung",
      "Airline Beratung",
      "Flughafenbetrieb Beratung",
      "Bodenabfertigung Optimierung",
      "Umzug Golfregion Beratung",
      "Privater Umzug VAE",
      "Umzug Saudi-Arabien",
      "Private Begleitung Golfregion",
    ],
  },

  nav: [
    { label: "Luftfahrt", href: "/aviation" },
    { label: "Private Begleitung", href: "/private-advisory" },
    { label: "Standorte", href: "/destinations" },
    { label: "Über uns", href: "/about" },
    { label: "Perspektiven", href: "/insights" },
  ],

  speakNav: [
    { label: "Eine Frage stellen", href: "/speak/ask" },
    { label: "Gespräch vereinbaren", href: "/speak/book" },
    { label: "Häufige Fragen", href: "/speak/questions" },
  ],

  footer: {
    tagline:
      "Luftfahrtberatung und private Begleitung in der Golfregion. Betreut über einen einzigen Ansprechpartner.",
    registration: "Handelsregisterangaben folgen",
    columns: [
      {
        title: "Bereiche",
        links: [
          { label: "Luftfahrtberatung", href: "/aviation" },
          { label: "Private Begleitung in der Golfregion", href: "/private-advisory" },
          { label: "Standorte", href: "/destinations" },
        ],
      },
      {
        title: "Das Büro",
        links: [
          { label: "Über uns", href: "/about" },
          { label: "Perspektiven", href: "/insights" },
        ],
      },
      {
        title: "Sprechen Sie mit Lusian",
        links: [
          { label: "Eine Frage stellen", href: "/speak/ask" },
          { label: "Gespräch vereinbaren", href: "/speak/book" },
          { label: "Häufige Fragen", href: "/speak/questions" },
        ],
      },
      {
        title: "Rechtliches",
        links: [
          { label: "Impressum", href: "/legal/imprint" },
          { label: "Datenschutz", href: "/legal/privacy" },
          { label: "Nutzungsbedingungen", href: "/legal/terms" },
          { label: "Haftungsausschluss", href: "/legal/disclaimer" },
        ],
      },
    ],
  },

  contact: {
    addressLines: ["Geschäftssitz", "Folgt"],
    responsePromise: null,
    emailLabel: "E-Mail",
  },

  ui: {
    skipToContent: "Zum Inhalt springen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    primaryNav: "Hauptnavigation",
    siteMenu: "Seitenmenü",
    homeAria: "{name} — Startseite",
    headerCta: "Sprechen Sie mit uns",
    menuCta: "Vertrauliches Gespräch anfragen",
    scroll: "Scrollen",
    language: "Sprache",
    languageShort: "DE",
    back: "Zurück",
    continueLabel: "Weiter",
    review: "Prüfen",
    confirm: "Bestätigen",
    confirming: "Wird bestätigt",
    sending: "Wird gesendet",
    send: "Vertraulich senden",
    optional: "{label} (optional)",
    select: "Bitte wählen",
    tryAgain: "Erneut versuchen",
    demo: "Demo",
    toBeSupplied: "Folgt",
    plateReserved: "Tafel {id} — Fotografie folgt",
    portrait: "Porträt",
    previousMonth: "Vorheriger Monat",
    nextMonth: "Nächster Monat",
  },

  home: {
    hero: {
      lines: [
        { text: "Manche Vorhaben sind rein operativ." },
        { text: "Manche sind zutiefst persönlich.", accent: "persönlich" },
      ],
      resolve: "Für beide gilt derselbe Maßstab.",
    },
    manifesto: {
      headline:
        "Zwischen einer Entscheidung und ihrer Umsetzung liegt unsere Arbeit.",
      standfirst:
        "Lusian berät Luftfahrtunternehmen und Privatpersonen, die sich in der Golfregion niederlassen. Ein Ansprechpartner, von der ersten Frage bis zum letzten Detail.",
    },
    twoWorlds: {
      labelShort: "Zwei Disziplinen",
      labelLong: "Zwei Disziplinen · Ein Maßstab in der Umsetzung",
      headlineLarge: "Zwei Disziplinen.",
      headlineSmall: "Ein Maßstab in der Umsetzung.",
      settle: "Ein Haus",
      aviation: {
        index: "01 — Luftfahrtberatung",
        line: "Der Betrieb ist die Strategie.",
        points: [
          "Wir beraten Fluggesellschaften, Flughäfen, Bodenabfertiger und die öffentlichen Stellen, die sie in die Pflicht nehmen.",
          "Beauftragt dort, wo ein Plan dem laufenden Betrieb standhalten muss.",
        ],
      },
      privateAdvisory: {
        index: "02 — Private Begleitung in der Golfregion",
        line: "Ein Umzug, still vollzogen. Und nur einmal.",
        points: [
          "Ein privater Neuanfang in der Golfregion, durchgehend koordiniert.",
          "Ein Dossier. Ein Ansprechpartner. Alles in seiner Reihenfolge.",
        ],
      },
    },
    aviationScene: {
      eyebrow: "Bereich 01 — wo wir beauftragt werden",
      opening: "Der Betrieb ist die Strategie.",
      link: "Die Luftfahrtberatung",
    },
    turn: { line: "Präzision, nach innen gewendet." },
    arrival: {
      headline: "Ein Umzug, still vollzogen. Und nur einmal.",
      closing: [
        "Ein Dossier.",
        "Ein Ansprechpartner.",
        "Hunderte Entscheidungen,",
        "eine nach der anderen.",
      ],
    },
    sequence: {
      headline: "Fünf Etappen, ein Ansprechpartner.",
      link: "Die private Begleitung",
    },
    markets: {
      headline: "Sechs Märkte, sechs verschiedene Leben.",
      note: "Nur Charakter und Positionierung",
      link: "Alle sechs Märkte",
    },
    argument: {
      eyebrow: "Warum Klienten uns beauftragen",
      headlineLines: ["Vier Dinge, bei denen wir", "keine Abstriche machen."],
      note: "Wir veröffentlichen keine Klientennamen, keine Fallstudien und keine Zahlen, für die wir nicht einstehen können. Was folgt, ist alles, was für uns spricht.",
      items: [
        {
          title: "Ein Verantwortlicher, durchgehend",
          body: "Wen Sie zuerst sprechen, der bleibt bis zum Abschluss zuständig. Die Arbeit wird nicht nach unten weitergereicht.",
        },
        {
          title: "Das Urteil eines Praktikers",
          body: "Beratung, die sich daran orientiert, wie Dinge tatsächlich laufen — Standplätze, Dienstpläne, Genehmigungen, Vermieter, Vorlaufzeiten — und nicht daran, wie sie in einer Präsentation aussehen.",
        },
        {
          title: "Diskretion als Methode",
          body: "Wenige Mandate zur gleichen Zeit. Zurückhaltende Kommunikation. Wir veröffentlichen keine Klientennamen und bitten auch nicht darum.",
        },
        {
          title: "Regulierte Fragen, in den richtigen Händen",
          body: "Rechts-, Steuer-, Aufenthalts- und Finanzberatung erbringen qualifizierte Fachleute mit Zulassung in der jeweiligen Rechtsordnung. Wir koordinieren sie. Wir geben nicht vor, sie zu sein.",
        },
      ],
    },
    closing: {
      headline: "Beginnen wir ein Gespräch.",
      body: "Sagen Sie uns, was Sie erreichen wollen — und bis wann. Sind wir nicht die Richtigen, sagen wir es Ihnen.",
      cta: "Sprechen Sie mit Lusian",
    },
  },
  aviation: {
    eyebrow: "Bereich 01",
    title: "Luftfahrtberatung",
    headlineLines: [
      { text: "Der Betrieb" },
      { text: "ist die Strategie.", accent: "Strategie" },
    ],
    standfirst:
      "Die Marge einer Fluggesellschaft entscheidet sich in Viertelstunden am Standplatz. Der Ruf eines Flughafens entscheidet sich in einer Warteschlange. Wir beraten auf der Ebene, auf der Strategie zu Durchsatz wird — und lassen uns dort auch messen.",
    meta: "Airlines · Flughäfen · Bodenabfertigung · Investoren · Infrastruktur · Öffentliche Hand",
    positioning: {
      eyebrow: "Position",
      headlineLines: ["Luftfahrt belohnt Präzision", "mehr als Ambition."],
      statement:
        "Luftfahrt belohnt Präzision mehr als Ambition. Netze, Terminals, Abfertigungsverträge und Investitionsprogramme scheitern alle an derselben Stelle: an der Naht zwischen dem, was geplant war, und dem, was dienstags um 05:40 tatsächlich geschieht.",
      support:
        "Unsere Arbeit liegt auf dieser Naht. Wir werden beauftragt, wenn ein Plan dem laufenden Betrieb standhalten muss — die Eröffnung eines neuen Terminals, ein neu verhandelter Abfertigungsvertrag, ein umgebautes Streckennetz, die Prüfung einer Anlage, bevor Kapital gebunden wird.",
    },
    onSite: {
      eyebrow: "Vor Ort",
      headlineLines: [
        "Befunde, die auf dem Vorfeld",
        "niemand wiedererkennt,",
        "sind keine Befunde.",
      ],
      body: "Die Arbeit beginnt dort, wo der Betrieb ist, zu der Stunde, in der er unter Druck steht. Alles Weitere wird gegen das geschrieben, was dort gesehen wurde.",
    },
    capabilities: {
      eyebrow: "Leistungen",
      headline: "Wo wir beauftragt werden.",
      note: "Mandate verbinden diese Felder meist, statt sich auf eines zu beschränken. Der Umfang wird schriftlich festgelegt, bevor die Arbeit beginnt.",
      groups: [
        {
          group: "Strategie & Investition",
          items: [
            "Netz-, Flotten- und Flugplanstrategie",
            "Markteintritt und Streckenbewertung",
            "Unterstützung der Commercial Due Diligence",
            "Prüfung von Luftfahrtanlagen und Infrastruktur",
            "Aufbau und kritische Prüfung des Investment Case",
          ],
        },
        {
          group: "Betrieb",
          items: [
            "Prüfung und Optimierung der Bodenabfertigung",
            "Umlauf-, Ressourcen- und Dienstplanung",
            "Terminalkapazität und Passagierfluss",
            "Betriebsbereitschaft und Inbetriebnahme (ORAT)",
            "Gestaltung von Service Levels und Vertragsleistung",
          ],
        },
        {
          group: "Entwicklung & Umsetzung",
          items: [
            "Beratung zur Flughafen- und Infrastrukturentwicklung",
            "Programm- und Projektsteuerung",
            "Beschaffung, Ausschreibung und Angebotsbegleitung",
            "Auswahl von Partnern, Lieferanten und Konzessionären",
            "Inbetriebnahme und Eröffnungsbereitschaft",
          ],
        },
        {
          group: "Organisation & Regulierung",
          items: [
            "Schnittstelle zu Aufsicht und Compliance",
            "Abstimmung von Sicherheits- und Qualitätsmanagement",
            "Organisationsdesign und Personalplanung",
            "Schulungs- und Kompetenzrahmen",
            "Betriebliche Governance und Berichtswege",
          ],
        },
        {
          group: "Technologie & Daten",
          items: [
            "Bewertung und Auswahl von Luftfahrttechnologie",
            "Betriebsdaten, Kennzahlen und Berichtswesen",
            "Zuschnitt und Reihenfolge digitaler Vorhaben",
            "Struktur von Innovations- und Pilotprogrammen",
            "Beratung zur Systemintegration",
          ],
        },
      ],
    },
    sectors: {
      eyebrow: "Mit wem wir arbeiten",
      headlineLines: ["Betreiber, Eigentümer", "und die Stellen, die sie prüfen."],
      items: [
        {
          name: "Fluggesellschaften",
          body: "Full Service, Low Cost, Regional, Charter und Fracht.",
        },
        {
          name: "Flughäfen & Terminalbetreiber",
          body: "Vom regionalen Ein-Terminal-Flughafen bis zum Drehkreuz mit mehreren Bahnen.",
        },
        {
          name: "Bodenabfertigung & Luftfahrtdienste",
          body: "Abfertiger, Betankung, Catering, MRO und Zulieferer.",
        },
        {
          name: "Investoren & Finanzierer",
          body: "Fonds, Family Offices und Finanzierer, die Luftfahrtengagements prüfen.",
        },
        {
          name: "Infrastrukturentwickler",
          body: "Airport-City-, Terminal-, Fracht- und Nebenflächenprogramme.",
        },
        {
          name: "Luftfahrttechnologie",
          body: "Betriebssoftware, Hardware und Datenplattformen.",
        },
        {
          name: "Öffentliche Hand & Aufsicht",
          body: "Behörden, Ministerien und staatliche Beteiligungen.",
        },
        {
          name: "Privat- & Geschäftsluftfahrt",
          body: "Betreiber, FBOs, Terminals und Eigentümervertreter.",
        },
      ],
    },
    approach: {
      eyebrow: "Arbeitsweise",
      headlineLines: ["Drei Gewohnheiten,", "die wir nicht aufgeben."],
      items: [
        {
          title: "Wir beginnen auf der Luftseite",
          body: "Vor dem Datenraum das Vorfeld. Befunde, die die Menschen vor Ort nicht wiedererkennen, sind keine Befunde.",
        },
        {
          title: "Wir schreiben für den Anwender",
          body: "Ergebnisse entstehen für den Dienstleiter beim Schichtwechsel, nicht zur Bewunderung im Vorstandsordner. Beide Seiten bekommen, was sie brauchen.",
        },
        {
          title: "Wir bleiben, bis es trägt",
          body: "Eine Empfehlung ist kein Ergebnis. Wir bleiben bis zu dem Punkt, an dem ein Prozess seine zweite Woche übersteht.",
        },
      ],
    },
    shapes: {
      eyebrow: "Wie Projekte laufen",
      headline: "Drei Formen der Zusammenarbeit.",
      items: [
        {
          name: "Bewertung",
          duration: "Richtwert: 2–6 Wochen",
          body: "Eine klar gestellte Frage, beantwortet. Ein Betrieb, eine Anlage, ein Geschäftsmodell oder ein Anbieter — geprüft und mit klarer Position berichtet.",
        },
        {
          name: "Programm",
          duration: "Richtwert: 3–18 Monate",
          body: "Umsetzung an der Seite Ihres Teams. Entwicklung, Übergang, Betriebsbereitschaft oder Optimierung, mit Verantwortung für die Reihenfolge.",
        },
        {
          name: "Ständige Beratung",
          duration: "Richtwert: laufend",
          body: "Eine feste Leitung für die Führung. Verfügbar für die Entscheidungen, die ohne Vorwarnung kommen, und für die, die zu früh kommen.",
        },
      ],
    },
    cta: {
      eyebrow: "Anfragen Luftfahrt",
      lines: ["Ein Luftfahrtprojekt", "besprechen."],
      body: "Nennen Sie uns den Betrieb, die Frage und das Datum, bis zu dem sie beantwortet sein muss. Wir sagen Ihnen offen, ob wir die Richtigen sind.",
      label: "Projekt besprechen",
    },
  },

  gulf: {
    eyebrow: "Bereich 02",
    title: "Private Begleitung in der Golfregion",
    headlineLines: [
      { text: "Ein Umzug," },
      { text: "still vollzogen –" },
      { text: "und nur einmal.", accent: "einmal" },
    ],
    standfirst:
      "Private Etablierung in der Golfregion — geplant, in Reihenfolge gebracht und durchgehend koordiniert, durch eine Person, die die ganze Akte kennt.",
    meta: "Vereinigte Arabische Emirate · Saudi-Arabien · Katar · Bahrain · Oman · Kuwait",
    positioning: {
      headlineLines: ["Ein Umzug ist nicht", "eine Entscheidung."],
      statement:
        "Eine Familie zu verlegen, ein Unternehmen oder beides, ist keine Entscheidung. Es sind mehrere hundert Entscheidungen, in Reihenfolge getroffen, in einem fremden System, meist gegen ein Datum.",
      support:
        "Die meisten davon sind klein. Einige lassen sich schwer rückgängig machen. Unsere Aufgabe ist es, die Reihenfolge zu halten — zu wissen, was vor was geschehen muss, wen es wirklich lohnt zu beauftragen und welche Frage Ihnen noch niemand gestellt hat.",
      emphasis: "Sie sollten Ihre Lage nur einmal erklären müssen.",
    },
    scope: {
      eyebrow: "Leistungsumfang",
      headline: "Zehn Dinge, eine Akte.",
      note: "Gruppiert danach, wann sie anfallen, denn die Reihenfolge ist der schwierige Teil. Die meisten Klienten nehmen einen Teil davon; einige alles.",
      phases: [
        {
          id: "before",
          title: "Vor dem Umzug",
          note: "Entscheiden, wohin — und in welcher Reihenfolge.",
          services: ["orientation", "planning"],
        },
        {
          id: "establishment",
          title: "Die Etablierung",
          note: "Der Teil mit den meisten Abhängigkeiten und den meisten Wegen, Zeit zu verlieren.",
          services: ["residency", "business", "property", "banking"],
        },
        {
          id: "arrival",
          title: "Ankunft",
          note: "Die ersten neunzig Tage, die darüber entscheiden, wie sich der Umzug anfühlt.",
          services: ["education", "healthcare", "arrival"],
        },
        {
          id: "after",
          title: "Kontinuität",
          note: "Was danach kommt, in dem Takt, der Ihnen passt.",
          services: ["continuity"],
        },
      ],
      services: {
        orientation: {
          title: "Orientierung",
          body: "Auswahl von Land und Stadt, abgewogen daran, wie Sie tatsächlich leben und arbeiten wollen. Zeit vor Ort, bevor Sie sich binden.",
        },
        planning: {
          title: "Umzugsplanung",
          body: "Eine schriftliche Abfolge mit Terminen, Abhängigkeiten und Zuständigkeiten. Der Plan, gegen den die weitere Zusammenarbeit läuft.",
        },
        residency: {
          title: "Koordination der Aufenthaltsverfahren",
          body: "Wir zeigen die Wege auf, die für Ihre Umstände in Frage kommen, und bereiten das Erforderliche vor. Anträge stellen zugelassene Berater über die dafür vorgesehenen Kanäle; die Entscheidung liegt bei den Behörden.",
        },
        business: {
          title: "Firmengründung",
          body: "Struktur, Rechtsraum und Lizenzoptionen werden mit qualifizierten Gesellschafts- und Rechtsberatern erarbeitet und dann bis zur Betriebsfähigkeit koordiniert.",
        },
        property: {
          title: "Immobilie",
          body: "Koordination der Suche für Miete oder Kauf — Briefing, engere Auswahl, Besichtigungen sowie die örtlichen Berater und Makler, die für einen sauberen Abschluss nötig sind.",
        },
        education: {
          title: "Familie & Schule",
          body: "Schullandschaft nach Stadt und Lehrplan, Bewerbungszeitpunkte und Vorstellungen. Früh eingeplant, denn die Plätze sind der eigentliche Engpass.",
        },
        banking: {
          title: "Koordination der Bankverbindungen",
          body: "Vorstellung bei geeigneten privaten und geschäftlichen Bankverbindungen und Koordination der Eröffnungsanforderungen. Über ein Konto entscheidet das Institut.",
        },
        healthcare: {
          title: "Gesundheitsversorgung",
          body: "Orientierung zu Anbietern und Versicherungsschutz, Fortführung bestehender Behandlungen und Vorstellung bei passenden Ärzten, bevor Sie sie brauchen.",
        },
        arrival: {
          title: "Ankunft",
          body: "Die ersten neunzig Tage: Versorgung, Anschlüsse, Mobilität, Personal, Anmeldungen und die vielen kleinen Punkte, die darüber entscheiden, wie sich der Umzug anfühlt.",
        },
        continuity: {
          title: "Kontinuität",
          body: "Ein fester Ansprechpartner danach — Verlängerungen, Erweiterungen, eine zweite Stadt, eine geänderte Planung.",
        },
      },
    },
    journey: {
      eyebrow: "Der Weg für Privatpersonen",
      headlineLines: ["Fünf Stufen,", "ein Ansprechpartner."],
      note: "Nichts hiervon verlangt von Ihnen, ein Beratergremium zu führen. Das ist unser Teil der Abmachung.",
      steps: [
        {
          title: "Erstgespräch",
          body: "Ein vertrauliches Gespräch über Ziele, Familie, geschäftliche Interessen, die bevorzugte Art zu leben und den Zeitrahmen, in dem Sie arbeiten. Unterlagen sind nicht erforderlich.",
        },
        {
          title: "Strategie",
          body: "Ein maßgeschneiderter Fahrplan zur Etablierung: Markt, Reihenfolge, Struktur, Abhängigkeiten und die Fachleute, die auf jeder Stufe gebraucht werden.",
        },
        {
          title: "Koordination",
          body: "Wir beauftragen und steuern die passenden örtlichen Spezialisten, Anbieter und Verfahren und halten die Akte an einem Ort.",
        },
        {
          title: "Ankunft",
          body: "Begleitung durch den Übergang selbst und die Eingewöhnung danach. Anwesenheit dort, wo Anwesenheit hilft.",
        },
        {
          title: "Kontinuität",
          body: "Wir bleiben verfügbar für das, was folgt, in dem Takt, der Ihnen passt.",
        },
      ],
    },
    levels: {
      eyebrow: "Tiefe der Zusammenarbeit",
      headline: "Wie weit Sie uns hineinlassen.",
      note: "Keine Pakete. Drei Tiefen der Beteiligung — und es ist normal, zwischen ihnen zu wechseln, während ein Umzug Gestalt annimmt.",
      items: [
        {
          name: "Beratung",
          scope: "Eine klar gestellte Frage",
          body: "Ein eng gefasstes Mandat mit klarer Grenze. Ein Markt, der zu bewerten ist, eine Struktur, die durchdacht werden muss, eine Entscheidung, die vor dem Treffen geprüft gehört. Am Ende steht eine Position, mit der Sie arbeiten können.",
        },
        {
          name: "Umzugssteuerung",
          scope: "Die Etablierung selbst",
          body: "Wir führen die Abfolge: den schriftlichen Plan, die Fachleute auf jeder Stufe, die Abhängigkeiten dazwischen und die ersten neunzig Tage nach der Ankunft. Ein Ansprechpartner für all das.",
        },
        {
          name: "Feste Vereinbarung",
          scope: "Laufende Koordination",
          body: "Für Klienten, deren Anliegen mit der Ankunft nicht enden — ein zweiter Standort, ein Unternehmen dazu, ein Schulwechsel, fällige Verlängerungen. Eine feste Leitung statt eines Projekts.",
        },
      ],
    },
    assurances: {
      eyebrow: "Wie wir mit Ihren Informationen umgehen",
      headline: "Diskretion, klar gesagt.",
      items: [
        {
          title: "Vertraulichkeit",
          body: "Mandate werden nicht besprochen, veröffentlicht oder erwähnt. Informationen gehen an Dritte nur dann, wenn Sie uns darum bitten, und nur im erforderlichen Umfang.",
        },
        {
          title: "Unabhängigkeit",
          body: "Wir werden nicht von den Schulen, Maklern, Banken oder Anbietern bezahlt, die wir vorstellen. Besteht dennoch eine Vereinbarung, legen wir sie vor der Vorstellung offen.",
        },
        {
          title: "Grenzen",
          body: "Wir erteilen keine Rechts-, Steuer-, Aufenthalts- oder Anlageberatung. Wir bestimmen, was erforderlich ist, und koordinieren die qualifizierten Fachleute, die es erbringen.",
        },
      ],
    },
    boundaries: { heading: "Was wir koordinieren – und was nicht" },
    destinationsNote:
      "Charakter von Land und Stadt, Markt für Markt dargestellt, ohne Aussagen über Regeln, die sich ändern.",
    destinationsLink: "Die sechs Märkte",
    cta: {
      eyebrow: "Private Anfragen",
      lines: ["Vertraulich", "sprechen."],
      body: "Ein erstes Gespräch ist kurz, vertraulich und unverbindlich. Für den Anfang brauchen Sie keine Unterlagen.",
      label: "Ein Gespräch beginnen",
    },
  },

  markets: {
    eyebrow: "Standorte",
    titleLines: ["Sechs Märkte,", "sechs verschiedene Leben."],
    standfirst:
      "Der Golf ist nicht ein Ort, und die Wahl zwischen seinen Märkten ist die erste Entscheidung jedes Umzugs. Was folgt, ist Charakter — wie sich jedes Land für jemanden liest, der dort lebt und arbeitet.",
    meta: "Nur Charakter und Positionierung — keine Aussagen über Regeln, die sich ändern",
    explorer: {
      eyebrow: "Die Region, kartiert",
      headline: "Wählen Sie einen Markt.",
      note: "Die Positionen sind vom jeweiligen Hauptzentrum aus eingetragen. Ein Markt zur Zeit, damit die Unterschiede tatsächlich sichtbar werden.",
    },
    omissions: {
      heading: "Was diese Seite bewusst auslässt",
      body: "Nichts oben beschreibt Visakategorien, Aufenthaltsvoraussetzungen, Eigentumsregeln, steuerliche Behandlung oder Mindestschwellen. Diese ändern sich, sie unterscheiden sich nach Einzelfall, und sie sind Sache zugelassener Fachleute in der jeweiligen Rechtsordnung. Was für Ihre Lage gilt, klären wir im Rahmen eines Mandats und koordinieren die Berater, die dafür qualifiziert sind.",
      covered: "Abgedeckte Märkte: {list}.",
    },
    cta: {
      eyebrow: "Marktorientierung",
      lines: ["Den richtigen", "Markt wählen."],
      body: "Die meisten Klienten kommen mit zwei oder drei im Sinn. Ein erstes Gespräch genügt meist, um einzugrenzen und zu sagen, was eine ernsthafte Prüfung umfassen würde.",
      label: "Ihren Umzug planen",
    },
    plot: { principalLocations: "Wichtigste Orte", markets: "Golfmärkte" },
    entries: {
      uae: {
        name: "Vereinigte Arabische Emirate",
        short: "VAE",
        hub: "Dubai · Abu Dhabi",
        cities: ["Dubai", "Abu Dhabi", "Schardscha", "Ras al-Chaima"],
        line: "Der übliche Einstieg in die Region – und noch immer der beweglichste.",
        body: "Zwei sehr verschiedene Stadtkulturen, eine Stunde voneinander entfernt: die eine gebaut für Tempo und internationalen Austausch, die andere für Institutionen, Kultur und einen ruhigeren, heimischeren Ton. Der praktische Vorteil ist die Dichte an internationalen Schulen, Medizin und Dienstleistern — die meisten Anforderungen lassen sich erfüllen, ohne das Land zu verlassen.",
        character: [
          "Dichteste Versorgung mit internationalen Schulen und Medizin am Golf",
          "Ausgeprägter Markt für Dienstleistungen und Banken",
          "Beste Weiterverbindungen für alle, die weiterhin ständig reisen",
        ],
        suits: "Für alle, die Wahlmöglichkeiten wollen – und zwar sofort.",
      },
      "saudi-arabia": {
        name: "Saudi-Arabien",
        short: "Saudi-Arabien",
        hub: "Riad",
        cities: ["Riad", "Dschidda", "Dhahran & Ostprovinz", "Rotmeerküste"],
        line: "Die größte Volkswirtschaft der Region – und die sich am schnellsten wandelt.",
        body: "Der Umfang der Investitionsprogramme und der Unternehmensverlagerungen hat verändert, wie das Leben hier aussieht, und tut es weiter. Riad ist der Schwerpunkt für Geschäfte; Dschidda bewahrt einen eigenen küstennahen und kaufmännischen Charakter; die Ostprovinz ist eine eigene industrielle und berufliche Welt. Ein Markt, in dem es noch etwas zählt, früh da zu sein.",
        character: [
          "Ballung von Investitionsprogrammen und Unternehmenszentralen",
          "Rasch wachsendes Angebot an Kultur, Sport und Freizeit",
          "Eigenständige Stadtkulturen mit wirklich unterschiedlichem Alltag",
        ],
        suits: "Für alle, die etwas mit langem Horizont aufbauen.",
      },
      qatar: {
        name: "Katar",
        short: "Katar",
        hub: "Doha",
        cities: ["Doha", "Lusail", "Al Wakra"],
        line: "Kompakt, wohlgeordnet und ungewöhnlich leicht zu bewohnen.",
        body: "Kurze Wege und wenig Reibung prägen den Alltag. Eine starke institutionelle, akademische und kulturelle Präsenz gibt dem Land einen ruhigeren, bedachteren Ton als seinen größeren Nachbarn, und die kleine Bevölkerung macht die berufliche Gemeinschaft wirklich überschaubar.",
        character: [
          "Kurze Wege und ein gut überschaubarer Ein-Stadt-Markt",
          "Bedeutende akademische, medizinische und kulturelle Einrichtungen",
          "Ein leiserer gesellschaftlicher Ton als im regionalen Durchschnitt",
        ],
        suits: "Für alle, denen Ordnung mehr gilt als Intensität.",
      },
      bahrain: {
        name: "Bahrain",
        short: "Bahrain",
        hub: "Manama",
        cities: ["Manama", "Riffa", "Amwadsch"],
        line: "Die älteste Finanzgemeinde am Golf, in kleinerem Maßstab.",
        body: "Ein lange gewachsener Banken- und Versicherungssektor, ein niedrigeres Kostenniveau und eine Vertrautheit des Alltags, die länger Ansässige zuerst nennen. Die Dammverbindung zur Ostprovinz macht das Land zu einer praktischen Basis für alle, deren Arbeit in Saudi-Arabien liegt, deren Familienleben aber nicht dort liegen muss.",
        character: [
          "Reifer Banken-, Versicherungs- und Finanzdienstleistungssektor",
          "Etablierte Dammverbindung zur Ostprovinz",
          "Niedrigeres Kostenniveau und ein eingespielter, vertrauter Rhythmus",
        ],
        suits: "Für alle, die Nähe wollen, ohne ganz einzutauchen.",
      },
      oman: {
        name: "Oman",
        short: "Oman",
        hub: "Maskat",
        cities: ["Maskat", "Sohar", "Salala"],
        line: "Die zurückhaltendste Adresse der Region.",
        body: "Die Landschaft ist hier der erste Anziehungspunkt — Berge, Küste und eine gebaute Umgebung, die ungewöhnlich sorgsam mit sich umgegangen ist. Das Tempo ist gemessen, die internationale Gemeinschaft lange ansässig, und das Land spricht Menschen an, die die Region ohne ihre Lautstärke wollen.",
        character: [
          "Küste, Gebirge und Wüste in kurzer Fahrt von der Hauptstadt",
          "Lange ansässige internationale Gemeinschaft und ein gemessenes Tempo",
          "In der Hauptstadt streng bewahrter architektonischer Charakter",
        ],
        suits: "Für alle, die die Region leiser gestellt wollen.",
      },
      kuwait: {
        name: "Kuwait",
        short: "Kuwait",
        hub: "Kuwait-Stadt",
        cities: ["Kuwait-Stadt", "Salmiya", "Hawalli"],
        line: "Ein reifer, familiengeprägter Markt mit tiefem Privatvermögen.",
        body: "Alteingesessene Kaufmannsfamilien und erhebliches Privatvermögen geben Kuwait eine nach innen gerichtete Geschäftskultur, die jenen entgegenkommt, die einen bestimmten Grund haben, dort zu sein. Das Land ist weniger auf ankommende internationale Fachkräfte ausgerichtet als seine Nachbarn und für jene interessanter, die bereits eine Beziehung zum Markt haben.",
        character: [
          "Etablierte Kaufmannsfamilien und bedeutendes Privatvermögen",
          "Nach innen gerichtete Geschäftskultur",
          "Starke Ausrichtung auf Familie und Gemeinschaft",
        ],
        suits: "Für alle, die mit einem Grund kommen, nicht auf der Suche.",
      },
    },
  },

  about: {
    eyebrow: "Das Büro",
    titleLines: ["Bewusst schmal gebaut."],
    standfirst:
      "Lusian ist ein Beratungsbüro mit zwei Disziplinen und einer Arbeitsweise. Es ist bewusst klein und soll es bleiben.",
    meta: "Luftfahrtberatung · Private Begleitung in der Golfregion",
    raison: {
      eyebrow: "Warum es Lusian gibt",
      headline: "Fast nichts scheitert an der Entscheidung.",
      body: [
        "Fragen Sie, warum ein Terminal schlecht eröffnet hat oder warum das erste Jahr einer Familie in einem neuen Land schwerer war als nötig, und die Antwort ist fast nie, dass das Ziel falsch war. Das Ziel war meist von Anfang an klar.",
        "Was schiefging, liegt in der Distanz zwischen der Entscheidung und dem Ergebnis: der zu spät beauftragte Spezialist, die Abhängigkeit, für die niemand zuständig war, das Formular, das erst das andere Formular brauchte, der Schulplatz, der weg war, als endlich jemand fragte.",
        "Diese Distanz ist keine Wissenslücke. Sie ist eine Lücke in Reihenfolge und Zuständigkeit — und sie ist das Einzige, womit sich dieses Büro befasst.",
      ],
    },
    founder: {
      role: "Gründer",
      opening: "Ich komme vom Vorfeld, nicht aus einer Beratung.",
      statement: [
        "Die Luftfahrt lehrt eines, bevor sie irgendetwas anderes lehrt. Komplexe Abläufe gelingen nicht, weil jemand das Ziel kannte. Sie gelingen, weil die Reihenfolge gehalten hat — wer was tut, in welcher Folge, und welche Abhängigkeit erledigt sein musste, bevor die nächste beginnen konnte.",
        "Eine Familie oder ein Unternehmen über Grenzen zu verlegen, hat eine ungewohnte Oberfläche und eine sehr vertraute Struktur. Viele Spezialisten. Viele Fristen. Ein Ergebnis. Es scheitert selten am Unwissen über das Ziel; es scheitert daran, dass die Reihenfolge still auseinanderfällt, Wochen bevor es jemand bemerkt.",
        "Das ist der ganze Grund, warum diese beiden Bereiche unter einem Namen stehen.",
      ],
      trajectory: [
        {
          title: "Luftfahrttechnik und Flugzeugwartung",
          body: "Ein technischer Hintergrund in Luftfahrttechnik und Flugzeugwartung, studiert an der Georgian Aviation University.",
        },
        {
          title: "Flughafenbetrieb",
          body: "Praktische Erfahrung am Internationalen Flughafen Tiflis, in Gate- und Passagierabfertigung, im Vorfeldbetrieb und in technischen Bereichen der Luftfahrt.",
        },
        {
          title: "Wartungspraxis",
          body: "Praktische Erfahrung in der Flugzeugwartung, einschließlich eines technischen Einsatzes in Athen.",
        },
        {
          title: "Aviation Management — laufend",
          body: "Derzeit Studium des Aviation Management an der TH Wildau in Deutschland.",
        },
        {
          title: "Fliegen",
          body: "Privatpilotenausbildung und Flugerfahrung in der Allgemeinen Luftfahrt.",
        },
        {
          title: "Sprachen, beruflich",
          body: "Tätig als freiberuflicher Dolmetscher und Übersetzer — ein Jahrzehnt Übung darin, Bedeutung genau zwischen Menschen zu tragen, die keine gemeinsame Sprache haben.",
        },
      ],
      languagesLabel: "Arbeitssprachen",
      languages: ["Deutsch", "Englisch", "Arabisch", "Assyrisch (Aramäisch)"],
      nameFallback: "Der Gründer",
      nameNote: "Name und Porträt folgen",
      outstanding: [
        {
          title: "Name und Porträt",
          description:
            "Der vollständige Name des Gründers und ein sorgfältig gemachtes redaktionelles Porträt. Beides wurde weder abgeleitet noch erzeugt.",
        },
        {
          title: "Genaue Abschlussbezeichnungen",
          description:
            "Die genaue verliehene Bezeichnung des georgischen Abschlusses und der erwartete Abschluss des Studiums Aviation Management.",
        },
        {
          title: "Berufliche Mitgliedschaften",
          description:
            "Jede Mitgliedschaft, Registrierung oder Akkreditierung, die sich belegen lässt.",
        },
      ],
    },
    definition: {
      eyebrow: "Abgrenzung",
      headlineLines: ["Am klarsten lässt sich sagen,", "was wir nicht sind."],
      areLabel: "Was wir sind",
      areNotLabel: "Was wir nicht sind",
      are: [
        "Ein Beratungs- und Koordinationsbüro, unmittelbar von Entscheidern beauftragt.",
        "Verantwortlich für die Reihenfolge einer Arbeit, nicht nur für ihre Empfehlung.",
        "Sicher im Arbeiten zwischen Disziplinen, Rechtsordnungen und Zeitzonen.",
        "Auswählend — bewusst wenige Mandate zur selben Zeit.",
      ],
      areNot: [
        "Eine Anwaltskanzlei, Steuerkanzlei, Aufenthaltsagentur, zugelassene Finanzberatung oder Vermittlung.",
        "Ein Empfehlungsnetz, das von den vorgestellten Schulen, Banken, Maklern oder Anbietern bezahlt wird.",
        "Ein Mengengeschäft — und nicht darauf angelegt, eines zu werden.",
        "Ein Büro, das seine Klienten veröffentlicht.",
      ],
    },
    recognition: {
      eyebrow: "Mit wem wir arbeiten",
      headline: "Sie werden merken, ob das für Sie gemacht ist.",
      aviationLabel: "01 — Luftfahrt",
      privateLabel: "02 — Privat",
      aviation: [
        "Eine Airline, die am Boden Marge verliert",
        "Ein Flughafen, der etwas Neues eröffnet",
        "Ein Abfertiger, der einen Vertrag neu verhandelt",
        "Ein Investor, der eine Luftfahrtanlage prüft",
        "Ein Entwickler, der ein Flughafenareal baut",
        "Ein Technologieunternehmen, das in den Betrieb verkauft",
        "Eine Behörde, die andere in die Pflicht nimmt",
      ],
      privateAdvisory: [
        "Eine Familie, die gemeinsam umzieht",
        "Ein Unternehmer, der das Geschäft mitnimmt",
        "Eine Führungskraft, die mit einer Rolle wechselt",
        "Ein Investor, der eine zweite Basis aufbaut",
        "Ein Family Office, das einen Umzug koordiniert",
        "Ein Unternehmen, das Führungskräfte verlegt",
      ],
    },
    commitments: {
      eyebrow: "Verbindliche Grundsätze",
      headlineLines: ["Vier Regeln, an die", "wir uns halten."],
      items: [
        {
          title: "Wir sagen Nein",
          body: "Sind wir für eine Arbeit nicht die Richtigen, sagen wir es früh — und nennen, wo wir können, wer es ist.",
        },
        {
          title: "Wir schreiben es auf",
          body: "Umfang, Reihenfolge, Zuständigkeiten und ein gutes Ergebnis werden schriftlich vereinbart, bevor die Arbeit beginnt.",
        },
        {
          title: "Wir veröffentlichen Sie nicht",
          body: "Keine Klientennamen, keine Fallstudien, keine Logowände. Vertrauen lässt sich leichter halten als wiederaufbauen.",
        },
        {
          title: "Wir setzen qualifizierte Leute ein",
          body: "Regulierte Fragen gehen an Fachleute mit Zulassung in der betreffenden Rechtsordnung. Wir koordinieren; sie beraten.",
        },
      ],
    },
    engagement: {
      eyebrow: "Wie eine Zusammenarbeit verläuft",
      headline: "Vier Stufen. Keine Übergabe.",
      note: "Dieselbe Abfolge regelt ein Flughafenprogramm und den Umzug einer Familie. Nur die Spezialisten wechseln.",
      steps: [
        {
          title: "Anfrage",
          body: "Ein kurzes vertrauliches Gespräch. Was Sie erreichen wollen, die Randbedingungen und bis wann.",
        },
        {
          title: "Festlegung",
          body: "Umfang, Reihenfolge, Zuständigkeiten und ein gutes Ergebnis — schriftlich vereinbart, bevor irgendeine Arbeit beginnt.",
        },
        {
          title: "Umsetzung",
          body: "Die Arbeit selbst, mit den Spezialisten, die sie erfordert, koordiniert über einen einzigen Ansprechpartner.",
        },
        {
          title: "Kontinuität",
          body: "Die Beziehung endet nicht mit der Übergabe. Wir bleiben erreichbar für das, was folgt.",
        },
      ],
    },
    reserved: {
      eyebrow: "Angaben zum Büro",
      headline: "Für die Akten freigehalten.",
      note: "Bewusst offengelassen. Zur Geschichte, zu den Menschen oder zu den Qualifikationen des Büros wurde nichts an ihre Stelle geschrieben.",
      items: [
        {
          title: "Handelsregisterangaben",
          description:
            "Firmenname, Handelsregisternummer, Umsatzsteuer-Identifikationsnummer und Geschäftssitz. Auch für das Impressum erforderlich.",
        },
        {
          title: "Reichweite",
          description:
            "Die Märkte, in denen das Büro unmittelbar tätig werden kann und nicht über Partner.",
        },
        {
          title: "Fachliches Netzwerk",
          description:
            "Wie externe Spezialisten ausgewählt und überprüft werden — allgemein beschrieben, ohne Namen von Kanzleien.",
        },
      ],
    },
    cta: {
      lines: ["Ein kurzes", "Gespräch."],
      body: "Ist Ihre Lage ungewöhnlich, spricht das meist dafür, dass ein Anruf besser passt als ein Formular.",
      label: "Sprechen Sie mit Lusian",
    },
  },

  speak: {
    eyebrow: "Sprechen Sie mit Lusian",
    titleLines: ["Zwei Wege zu beginnen,", "beide leise."],
    standfirst:
      "Nichts, was Sie hier schreiben, wird herumgereicht, und ein erstes Gespräch verpflichtet Sie zu nichts. Sind wir nicht die Richtigen, sagen wir es Ihnen.",
    intents: [
      {
        index: "01",
        title: "Eine Frage stellen.",
        body: "Eine bestimmte Lage verdient eine bestimmte Antwort. Schreiben Sie in Ihren eigenen Worten — es gibt kein Formular zu entschlüsseln.",
        href: "/speak/ask",
        cta: "Schreiben Sie uns",
      },
      {
        index: "02",
        title: "Ein Gespräch vereinbaren.",
        body: "Dreißig oder sechzig Minuten, in Ihrer eigenen Zeitzone. Luftfahrt oder privat — in beiden Fällen unverbindlich.",
        href: "/speak/book",
        cta: "Zeit wählen",
      },
    ],
    questionsTeaser: {
      body: "Manches davon ist vielleicht schon beantwortet.",
      link: "Häufige Fragen",
    },
    boundaries: {
      eyebrow: "Wo die Grenze verläuft",
      headlineLines: ["Was wir koordinieren –", "und was nicht."],
      note: "Die zweite Spalte ist keine Einschränkung, um die wir herumarbeiten — sie ist die Art, wie diese Arbeit sauber gemacht wird. Wir bestimmen, was erforderlich ist, beauftragen in der jeweiligen Rechtsordnung qualifizierte Fachleute und bleiben für die Abfolge verantwortlich, in der sie stehen.",
      coordinatedLabel: "Lusian koordiniert",
      regulatedLabel: "Zugelassene Fachleute erbringen",
      coordinated: [
        "Umzugsstrategie und Marktorientierung",
        "Die schriftliche Abfolge und die Abhängigkeiten darin",
        "Vorstellung bei passenden Spezialisten und Anbietern",
        "Ablauf der Firmengründung und dessen Koordination",
        "Koordination der Immobiliensuche",
        "Orientierung zu Schule und Gesundheitsversorgung",
        "Zeitpläne, Fristen und Ankunftslogistik",
        "Laufende Koordination nach dem Umzug",
      ],
      regulated: [
        "Rechtsberatung und jede Eingabe, die eine zugelassene Vertretung erfordert",
        "Steuerberatung und steuerliche Ansässigkeit",
        "Prüfung, Voraussetzungen und Anträge im Aufenthaltsrecht",
        "Regulierte Anlage- und Finanzberatung",
        "Förmliche Beratung zu Immobilientransaktion und Beurkundung",
        "Prüfung, Buchführung und gesetzliche Rechnungslegung",
      ],
    },
    ask: {
      eyebrow: "Eine Frage stellen",
      headline: "Schreiben Sie in Ihren eigenen Worten.",
      standfirst:
        "Vier Felder für den Anfang. Alles Weitere ist freiwillig und nur dann sinnvoll, wenn es die erste Antwort für Sie brauchbarer macht.",
      assurances: [
        {
          title: "Gehalten, nicht herumgereicht",
          body: "Was Sie schreiben, bleibt bei uns. Nichts geht an Dritte, sofern Sie uns nicht darum bitten.",
        },
        {
          title: "Unverbindlich",
          body: "Eine Frage ist eine Frage. Sie beginnt nichts.",
        },
        {
          title: "Eine ehrliche Antwort",
          body: "Ist die richtige Antwort eine zugelassene Fachperson und nicht wir, dann sagen wir Ihnen genau das.",
        },
      ],
      ratherBook: "Lieber einen Termin wählen",
      practiceLegend: "Worum geht es",
      practices: [
        {
          id: "aviation",
          label: "Luftfahrtberatung",
          note: "Airlines, Flughäfen, Abfertigung, Investition",
        },
        {
          id: "private",
          label: "Private Begleitung",
          note: "Umzug und Etablierung",
        },
        {
          id: "general",
          label: "Etwas anderes",
          note: "Presse, Partnerschaft, Allgemeines",
        },
      ],
      fields: {
        message: "Ihre Frage oder Ihre Lage",
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        currentCountry: "Wo Sie jetzt sind",
        destination: "Markt, den Sie erwägen",
        party: "Sie ziehen um als",
        timeframe: "Ungefährer Zeitrahmen",
        company: "Organisation",
        role: "Funktion",
        orgType: "Art der Organisation",
        geography: "Wo die Arbeit liegt",
        projectType: "Art des Vorhabens",
      },
      messagePlaceholder: "In Ihren eigenen Worten. Ein paar Zeilen genügen.",
      contactMethodLegend: "Wie sollen wir antworten",
      contactMethods: ["E-Mail", "Telefon", "Beides recht"],
      addContext: "Kontext hinzufügen",
      addContextNote: "Freiwillig. Es macht die erste Antwort brauchbarer.",
      supportLegend: "Wo Sie Unterstützung erwarten",
      supportAreas: [
        "Wahl des Marktes",
        "Koordination der Aufenthaltsverfahren",
        "Firmengründung",
        "Immobilie",
        "Schule und Ausbildung",
        "Bankverbindung",
        "Gesundheitsversorgung",
        "Ankunft und Eingewöhnung",
      ],
      partySizes: [
        "Einzelperson",
        "Paar",
        "Familie",
        "Unternehmen",
        "Familie und Unternehmen",
      ],
      timeframes: [
        "Innerhalb von drei Monaten",
        "Drei bis sechs Monate",
        "Sechs bis zwölf Monate",
        "Später als zwölf Monate",
        "Nur zur Orientierung",
      ],
      orgTypes: [
        "Fluggesellschaft",
        "Flughafen oder Terminalbetreiber",
        "Bodenabfertigung oder Luftfahrtdienste",
        "Investor oder Finanzierer",
        "Infrastrukturentwickler",
        "Luftfahrttechnologie",
        "Öffentliche Hand oder Behörde",
        "Sonstiges",
      ],
      projectTypes: [
        "Bewertung oder Prüfung",
        "Verbesserung des Betriebs",
        "Entwicklungs- oder Übergangsprogramm",
        "Due Diligence oder Investitionsbegleitung",
        "Regulatorisch oder organisatorisch",
        "Noch nicht festgelegt",
      ],
      undecided: "Noch offen",
      honeypot: "Dieses Feld bitte leer lassen",
      consent:
        "Ich bin damit einverstanden, dass Lusian diese Angaben speichert, um zu antworten. Sie werden ohne meine Weisung an niemanden weitergegeben und für nichts anderes als dieses Gespräch verwendet.",
      sent: {
        label: "Eingegangen",
        headline: "Danke — Ihre Nachricht hat uns erreicht.",
        body: "Sie erhalten eine Antwort von einem Menschen, unter",
      },
      unconfigured:
        "Dieses Formular ist noch nicht an die Eingangsstelle des Büros angebunden, Ihre Nachricht wurde daher nicht gesendet.",
      failed: "Die Nachricht konnte gerade nicht gesendet werden.",
      writeTo: "Bitte schreiben Sie an",
    },
    book: {
      eyebrow: "Gespräch vereinbaren",
      headline: "Nehmen Sie sich dreißig Minuten.",
      standfirst:
        "Ein erstes Gespräch kostet nichts und verpflichtet Sie zu nichts. Die Zeiten erscheinen in Ihrer eigenen Zeitzone.",
      steps: ["Bereich", "Gespräch", "Wann", "Angaben", "Prüfen"],
      stepAnnouncement: "Schritt {current} von {total}: {name}",
      confirmedAnnouncement: "Termin bestätigt",
      practiceQuestion: "Um welchen Bereich geht es?",
      practices: [
        {
          id: "aviation",
          label: "Luftfahrtberatung",
          body: "Fluggesellschaften, Flughäfen, Bodenabfertigung, Investoren, Infrastruktur und öffentliche Luftfahrt.",
        },
        {
          id: "private",
          label: "Private Begleitung",
          body: "Umzug und Etablierung in der Golfregion, für Einzelpersonen, Familien und ihre Unternehmen.",
        },
      ],
      conversationQuestion: "Welche Art von Gespräch?",
      chooseTime: "Zeit wählen",
      timesShownIn: "Zeiten angezeigt in",
      allTimesIn: "Alle Zeiten in {zone}",
      chooseDay: "Wählen Sie einen Tag, um die freien Zeiten zu sehen.",
      checking: "Kalender wird geprüft …",
      noneThisMonth: "In diesem Monat nichts frei. Versuchen Sie den nächsten.",
      nothingThisDay: "An diesem Tag ist nichts frei.",
      detailsHeading: "Ihre Angaben",
      reviewHeading: "Bevor wir die Zeit reservieren",
      confirmedLabel: "Bestätigt",
      confirmedHeading: "Die Zeit ist reserviert.",
      fields: {
        name: "Name",
        email: "E-Mail",
        company: "Organisation",
        phone: "Telefon",
        notes: "Was vorab nützlich ist",
      },
      notesPlaceholder: "Ein oder zwei Sätze genügen.",
      summary: {
        practice: "Bereich",
        conversation: "Gespräch",
        date: "Datum",
        time: "Uhrzeit",
        name: "Name",
        email: "E-Mail",
        reference: "Referenz",
      },
      notConnected: {
        label: "Buchung noch nicht angebunden",
        body: "Die Terminvergabe ist auf dieser Seite noch nicht aktiv, es gibt daher keine Zeiten zu zeigen. Statt Verfügbarkeiten anzuzeigen, die es nicht gibt, ist uns lieber, Sie schreiben uns — die Antwort enthält Terminvorschläge.",
        writeInstead: "Schreiben Sie uns stattdessen",
      },
      unavailableLabel: "Verfügbarkeit nicht abrufbar",
      unavailableBody: "Wir konnten den Kalender gerade nicht erreichen.",
      errors: {
        notConfigured:
          "Die Terminvergabe ist noch nicht angebunden, es wurde daher nichts gebucht.",
        taken: "Diese Zeit wurde vergeben, während Sie ausgefüllt haben. Bitte wählen Sie eine andere.",
        failed: "Die Buchung konnte gerade nicht abgeschlossen werden.",
      },
      emailSent:
        "Eine Bestätigung ist aus unserem Terminsystem unterwegs, mit den Angaben und einem Link zum Ändern der Zeit.",
      keepReference:
        "Bewahren Sie die Referenz oben auf. Wenn Sie die Zeit verschieben müssen, schreiben Sie uns, und wir erledigen es.",
      manage: "Verschieben oder absagen",
      askInstead: "Lieber fragen",
      consultations: {
        "aviation-initial": {
          name: "Erstgespräch",
          duration: "30 Minuten",
          body: "Ein erstes Gespräch, um zu klären, ob es passt. Was Sie erreichen wollen, die Randbedingungen und das Datum, bis zu dem es beantwortet sein muss.",
        },
        "aviation-project": {
          name: "Projektgespräch",
          duration: "60 Minuten",
          body: "Für eine klar umrissene Arbeit — ein Betrieb, eine Anlage, ein Programm oder ein Anbieter. Bringen Sie die Frage mit; wir sagen Ihnen, was eine ernsthafte Prüfung umfassen würde.",
        },
        "private-initial": {
          name: "Erstgespräch",
          duration: "30 Minuten",
          body: "Ein kurzes, vertrauliches erstes Gespräch. Keine Unterlagen, keine Verpflichtung, und nichts wird weitergegeben.",
        },
        "private-relocation": {
          name: "Umzugsberatung",
          duration: "60 Minuten",
          body: "Für alle, die in einer Entscheidung schon weiter sind. Markt, Reihenfolge, Abhängigkeiten und die Fachleute, die ein Umzug dieser Art erfordern würde.",
        },
      },
    },
    questions: {
      eyebrow: "Häufige Fragen",
      headline: "Oft genug gefragt, um sie öffentlich zu beantworten.",
      standfirst:
        "Eine kurze Liste, sorgfältig geschrieben, statt vierzig schnell geschriebener Antworten. Was wirklich Ihre Lage betrifft, fragen Sie besser unmittelbar.",
      disclaimer:
        "Nichts hiervon ist Rechts-, Steuer- oder Aufenthaltsberatung, und nichts davon ersetzt eine zugelassene Fachperson in der jeweiligen Rechtsordnung.",
      askSomething: "Etwas Konkretes fragen",
      categories: [
        {
          id: "how-we-work",
          title: "Wie Lusian arbeitet",
          questions: [
            {
              q: "Was macht Lusian eigentlich?",
              a: "Wir halten die Reihenfolge einer komplexen Arbeit. Das heißt: entscheiden, was vor was geschehen muss, die Spezialisten für jede Stufe beauftragen und für die Reihenfolge geradestehen, nicht nur für die Empfehlung.",
            },
            {
              q: "Sind Sie eine Anwaltskanzlei oder eine Aufenthaltsagentur?",
              a: "Weder noch. Lusian ist ein Beratungs- und Koordinationsbüro. Erfordert eine Sache regulierte Beratung oder eine regulierte Eingabe, geht sie an eine in dieser Rechtsordnung zugelassene Fachperson, und wir koordinieren sie.",
            },
            {
              q: "Wie beginnt eine Zusammenarbeit üblicherweise?",
              a: "Ein kurzes Gespräch, dann ein schriftlicher Umfang. Es wird nichts berechnet und keine Arbeit begonnen, bevor beide Seiten sich einig sind, worin die Arbeit besteht und was ein gutes Ergebnis wäre.",
            },
            {
              q: "Veröffentlichen Sie Ihre Klienten?",
              a: "Nein. Keine Namen, keine Fallstudien, keine Logowand. Wenn Ihnen Diskretion wichtig ist: sie zu halten ist leichter, als sie wiederaufzubauen.",
            },
          ],
        },
        {
          id: "choosing",
          title: "Die Wahl der Destination",
          questions: [
            {
              q: "Wie engen Menschen sechs Märkte üblicherweise auf einen ein?",
              a: "Danach, wie sie leben wollen, und nicht anhand von Vergleichstabellen. Dichte an Schulen und Medizin, wie oft Sie tatsächlich fliegen müssen, ob Ihre Arbeit Sie im Raum braucht und wie viel Intensität Sie im Alltag wollen — das entscheidet schneller als jedes Ranking.",
            },
            {
              q: "Sollten wir vor der Entscheidung hinreisen?",
              a: "Fast immer, und mit einem Auftrag statt als Touristen. Eine Woche mit konkreten Fragen — Wege zu der Stunde, zu der Sie sie wirklich zurücklegen würden, Schulen im Betrieb, Viertel an einem Werktag — ist mehr wert als Monate Recherche.",
            },
            {
              q: "Können Sie uns sagen, für welches Visum oder welchen Aufenthaltsweg wir in Frage kommen?",
              a: "Nein — und wer das ohne Kenntnis Ihrer Umstände selbstsicher beantwortet, ist mit Vorsicht zu behandeln. Wir zeigen die möglicherweise passenden Wege auf und ziehen zugelassene Berater für Prüfung und Antrag hinzu. Die Entscheidung liegt bei den Behörden.",
            },
          ],
        },
        {
          id: "family",
          title: "Familie und Schule",
          questions: [
            {
              q: "Wann sollten wir mit den Schulen beginnen?",
              a: "Früher, als es sich nötig anfühlt. Der eigentliche Engpass eines Umzugs sind die Plätze, nicht die Formalitäten — bei gefragten Jahrgängen und Lehrplänen kann die Verfügbarkeit sowohl die Stadt als auch den Zeitpunkt entscheiden.",
            },
            {
              q: "Vermitteln Sie Schulplätze für Kinder?",
              a: "Nein. Wir stellen die Landschaft nach Stadt und Lehrplan dar, bringen den Zeitpunkt in Ordnung und stellen vor. Über die Aufnahme entscheidet die Schule.",
            },
          ],
        },
        {
          id: "establishment",
          title: "Firmengründung",
          questions: [
            {
              q: "Können Sie unsere Gesellschaft gründen?",
              a: "Wir koordinieren es. Struktur, Rechtsraum und Lizenzierung werden mit qualifizierten Gesellschafts- und Rechtsberatern erarbeitet, und wir führen den Vorgang bis zur Betriebsfähigkeit, damit Sie nicht selbst ein Gremium von Kanzleien steuern müssen.",
            },
            {
              q: "Stellen Sie uns Banken vor?",
              a: "Wir stellen passende Verbindungen her und koordinieren, was die Eröffnung erfordert. Ob ein Konto eröffnet wird, entscheidet das Institut, nicht wir — und wir werden von den vorgestellten Banken nicht bezahlt.",
            },
          ],
        },
        {
          id: "aviation-engagement",
          title: "Mandate in der Luftfahrt",
          questions: [
            {
              q: "Mit welcher Unternehmensgröße arbeiten Sie?",
              a: "Die Frage zählt mehr als die Größe. Ein regionaler Flughafen mit einem Terminal und einem Abfertigungsproblem passt besser als ein großer Betreiber, der ein Dokument sucht.",
            },
            {
              q: "Wie sieht ein erstes Mandat typischerweise aus?",
              a: "Meist beginnt es als klar umrissene Bewertung: eine Frage, beantwortet, mit klarer Position. Programmarbeit folgt eher daraus, als dort zu beginnen.",
            },
            {
              q: "Arbeiten Sie mit unseren bestehenden Beratern zusammen?",
              a: "Ja, und oft ist genau das der Punkt. Wir werden häufig beauftragt, die Naht zwischen Parteien zu halten, die jeweils ein Stück des Problems besitzen.",
            },
          ],
        },
      ],
    },
  },

  insights: {
    eyebrow: "Perspektiven",
    titleLines: ["Aus der Arbeit", "geschrieben."],
    standfirst:
      "Kurze Texte zum Luftfahrtbetrieb, zu den Golfmärkten und zur praktischen Seite davon, ein Leben oder ein Unternehmen über Grenzen zu bewegen. Veröffentlicht nur, wenn es etwas zu sagen gibt.",
    notice: {
      label: "Bereich in Vorbereitung",
      body: "Jeder Beitrag unten ist ein Platzhalter zur Prüfung von Layout und Typografie. Keiner ist veröffentlichte Recherche, keiner ist belegt, und keiner ist als Position des Büros zu lesen.",
    },
    filter: "Filter",
    all: "Alle",
    categories: {
      aviation: "Luftfahrt",
      "gulf-markets": "Golfmärkte",
      mobility: "Mobilität",
      "investment-environment": "Investitionsumfeld",
      operations: "Betrieb",
      relocation: "Umzug",
    },
    empty: "In dieser Kategorie ist noch nichts veröffentlicht.",
    articleNotice: {
      label: "Beispielbeitrag",
      body: "Dieser Beitrag existiert, um das Artikellayout zu zeigen. Der Text unten ist Platzhaltertext — er ist keine Recherche, er ist nicht belegt, und er gibt nicht die Auffassung des Büros zum Thema wieder. Er wird vollständig ersetzt, bevor der Bereich Perspektiven veröffentlicht wird.",
    },
    allInsights: "Alle Perspektiven",
    demoTitle: "{title} (Beispiel)",
    cta: {
      eyebrow: "Anfragen",
      lines: ["Lieber direkt", "fragen?"],
      body: "Die nützlichsten Antworten hängen an einer bestimmten Lage und gehören eher in ein Gespräch als in eine Veröffentlichung.",
      label: "Ein Gespräch beginnen",
    },
    entries: {
      "the-fifteen-minute-margin": {
        title: "Die Marge der fünfzehn Minuten",
        standfirst:
          "Warum die Disziplin beim Umlauf mehr über die kommerzielle Lage einer Airline entscheidet als ihr Netzplan.",
        readingTime: "6 Min.",
        date: "Beispieleintrag",
        sections: [
          {
            heading: "Die Ausgangslage",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Wo es bricht",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Was trägt",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
        ],
      },
      "reading-a-gulf-city": {
        title: "Eine Golfstadt lesen, bevor Sie sich binden",
        standfirst:
          "Sechs Fragen, die es lohnt vor Ort zu beantworten – und die Reihenfolge, in der sie zu stellen sind.",
        readingTime: "8 Min.",
        date: "Beispieleintrag",
        sections: [
          {
            heading: "Mit einem Auftrag ankommen",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Die Fragen",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
        ],
      },
      "the-sequence-problem": {
        title: "Das Problem der Reihenfolge",
        standfirst:
          "Die meisten Umzüge scheitern an der Reihenfolge, nicht am Aufwand. Eine Notiz zu Abhängigkeiten und den zwei, die meist zu spät kommen.",
        readingTime: "5 Min.",
        date: "Beispieleintrag",
        sections: [
          {
            heading: "Abhängigkeiten",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Schulplätze und Bankverbindungen",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
        ],
      },
      "operational-readiness-before-the-ribbon": {
        title: "Betriebsbereitschaft, lange vor dem Band",
        standfirst:
          "Was ein Terminal, das gut eröffnet, von einem unterscheidet, das lediglich pünktlich eröffnet.",
        readingTime: "7 Min.",
        date: "Beispieleintrag",
        sections: [
          {
            heading: "Tests sind keine Proben",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Die zweite Woche",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
        ],
      },
      "capital-programmes-and-the-people-question": {
        title: "Investitionsprogramme und die Personalfrage",
        standfirst:
          "Regionale Infrastrukturambition scheitert selten am Geld. Sie scheitert an fähigen Händen.",
        readingTime: "6 Min.",
        date: "Beispieleintrag",
        sections: [
          {
            heading: "Der Engpass",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Folgen für die Reihenfolge",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
        ],
      },
      "moving-a-business-and-a-family-at-once": {
        title: "Ein Unternehmen und eine Familie zugleich verlegen",
        standfirst:
          "Die beiden Zeitpläne ziehen gegeneinander. Eine Auffassung dazu, welcher das Tempo vorgeben sollte.",
        readingTime: "5 Min.",
        date: "Beispieleintrag",
        sections: [
          {
            heading: "Zwei Uhren",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
          {
            heading: "Welche führt",
            paragraphs: [
              "Dies ist Platzhaltertext für einen unveröffentlichten Beitrag. Er zeigt Satzbreite, Rhythmus und typografische Hierarchie in realistischer Länge und wird vor der Veröffentlichung vollständig ersetzt.",
              "Was in diesem Bereich erscheint, wird aus erster Hand und konkret sein: aus Mandaten geschrieben, wo angebracht mit Quelle, und datiert. Hier wird nichts veröffentlicht, was nicht geprüft ist.",
            ],
          },
        ],
      },
    },
  },

  legal: {
    notice:
      "Lusian erbringt Beratungs- und Koordinationsleistungen. Es erbringt keine Rechts-, Steuer-, Aufenthalts-, Anlage- oder Finanzberatung und sagt nichts über den Ausgang eines Antrags, einer Genehmigung oder einer Transaktion zu, über die ein Dritter oder eine Behörde entscheidet. Regulierte Fragen werden an entsprechend qualifizierte Fachleute in der jeweiligen Rechtsordnung verwiesen oder mit ihnen koordiniert.",
    outstanding: {
      label: "Dokument ausstehend",
      body: "Diese Seite ist eine vorbereitete Struktur, kein veröffentlichtes Rechtsdokument. Sie wurde nicht von einer Juristin oder einem Juristen verfasst oder geprüft, und die unten aufgeführten Angaben liegen nicht vor. Sie muss vor der Veröffentlichung dieser Website von einer qualifizierten Fachperson in der jeweiligen Rechtsordnung vervollständigt und geprüft werden.",
    },
    toBeSupplied: "Folgt",
    otherPages: "Rechtliche Seiten",
    pages: {
      imprint: {
        title: "Impressum",
        eyebrow: "Rechtliche Angaben",
        standfirst:
          "Eine an Deutschland gerichtete Website muss in der Regel eine Anbieterkennzeichnung veröffentlichen. Diese Seite ist als Struktur vorbereitet; die Angaben selbst wurden nicht geschrieben.",
        sections: [
          {
            heading: "Anbieterkennzeichnung",
            required: [
              "Firmenname und Rechtsform",
              "Geschäftsanschrift (kein Postfach)",
              "Vertreten durch — Name der vertretungsberechtigten Person oder Personen",
              "Registergericht und Registernummer, sofern eingetragen",
              "Umsatzsteuer-Identifikationsnummer, sofern erteilt",
            ],
          },
          {
            heading: "Kontakt",
            required: [
              "E-Mail-Adresse für Anfragen",
              "Telefonnummer",
              "Jeder weitere angebotene Kontaktweg",
            ],
          },
          {
            heading: "Reglementierte Berufe und Aufsichtsbehörden",
            body: "Soweit ein Teil der Leistung eine reglementierte Tätigkeit ist, werden üblicherweise die zuständige Kammer, die Berufsbezeichnung, der Staat der Verleihung und die geltenden berufsrechtlichen Regelungen angegeben.",
            required: [
              "Ob überhaupt eine reglementierte Tätigkeit ausgeübt wird",
              "Aufsichtsbehörde, sofern zutreffend",
              "Berufshaftpflichtversicherer und räumlicher Geltungsbereich, sofern zutreffend",
            ],
          },
          {
            heading: "Verantwortlich für den Inhalt",
            required: [
              "Name und Anschrift der für den redaktionellen Inhalt verantwortlichen Person",
            ],
          },
          {
            heading: "Streitbeilegung",
            body: "Üblicherweise wird angegeben, ob der Anbieter bereit oder verpflichtet ist, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
            required: ["Haltung zur Verbraucherstreitbeilegung"],
          },
        ],
      },
      privacy: {
        title: "Datenschutz",
        eyebrow: "Datenschutz",
        standfirst:
          "Wie mit Anfragedaten umgegangen wird, wiegt in einem Büro, das auf Diskretion gebaut ist, schwerer als sonst. Diese Seite ist als Struktur vorbereitet und muss danach vervollständigt werden, was die veröffentlichte Website tatsächlich tut.",
        sections: [
          {
            heading: "Verantwortlicher",
            required: [
              "Identität und Kontaktdaten des Verantwortlichen",
              "Datenschutzbeauftragter, sofern bestellt",
            ],
          },
          {
            heading: "Was erhoben wird",
            body: "Das Anfrageformular dieser Website erhebt die Felder, die eine Besucherin oder ein Besucher ausfüllt, samt dem gewählten Bereich. Es wird kein Konto angelegt und kein Profil gebildet.",
            required: [
              "Ob Server-Zugriffsprotokolle gespeichert werden und wie lange",
              "Ob eine Analyse oder Leistungsmessung eingesetzt wird",
              "Ob eine Einbindung Dritter Cookies setzt",
            ],
          },
          {
            heading: "Zweck und Rechtsgrundlage",
            body: "Angaben aus Anfragen werden verwendet, um die Anfrage zu beantworten und, falls eine Zusammenarbeit folgt, um sie durchzuführen.",
            required: [
              "Für jeden Verarbeitungszweck herangezogene Rechtsgrundlage",
              "Jede herangezogene Abwägung berechtigter Interessen",
            ],
          },
          {
            heading: "Empfänger und Übermittlungen",
            body: "Erfordert eine Zusammenarbeit die Abstimmung mit externen Fachleuten, werden Informationen nur auf Weisung und nur im erforderlichen Umfang geteilt.",
            required: [
              "Hosting- und Infrastrukturanbieter und deren Standorte",
              "Jede Übermittlung außerhalb des EWR und die herangezogene Garantie",
            ],
          },
          {
            heading: "Speicherdauer",
            required: [
              "Speicherdauer für Anfragen, aus denen keine Zusammenarbeit wird",
            ],
          },
          {
            heading: "Rechte",
            body: "Auskunft, Berichtigung, Löschung, Einschränkung, Übertragbarkeit, Widerspruch sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.",
            required: [
              "Anschrift für die Ausübung dieser Rechte",
              "Zuständige Aufsichtsbehörde",
            ],
          },
        ],
      },
      terms: {
        title: "Nutzungsbedingungen",
        eyebrow: "Bedingungen der Website",
        standfirst:
          "Bedingungen für die Nutzung dieser Website, getrennt von jeder mit einem Klienten vereinbarten Mandatsvereinbarung.",
        sections: [
          {
            heading: "Geltungsbereich",
            body: "Diese Bedingungen würden allein die Nutzung der Website regeln. Beratungsarbeit richtet sich nach einer gesonderten schriftlichen Vereinbarung, die vor Beginn der Arbeit mit dem Klienten getroffen wird.",
            required: [
              "Bestätigung des Verhältnisses zwischen diesen Bedingungen und Mandatsvereinbarungen",
            ],
          },
          {
            heading: "Nutzung der Website",
            body: "Die Website dient der Information. Nichts auf ihr stellt ein Angebot, eine Beauftragung oder eine Beratung zu einer bestimmten Angelegenheit dar.",
          },
          {
            heading: "Geistiges Eigentum",
            required: [
              "Erklärung zur Inhaberschaft an Inhalten, Zeichen und Fotografien der Website",
            ],
          },
          {
            heading: "Haftung",
            required: [
              "Haftungsbeschränkung, nach dem anwendbaren Recht formuliert",
              "Haltung zu externen Links",
            ],
          },
          {
            heading: "Anwendbares Recht",
            required: ["Anwendbares Recht und Gerichtsstand"],
          },
        ],
      },
      disclaimer: {
        title: "Haftungsausschluss",
        eyebrow: "Umfang der Leistungen",
        standfirst:
          "Die Grenze zwischen dem, was dieses Büro tut, und dem, was qualifizierte Fachleute tun — hier ausgesprochen, damit sie nicht der Auslegung überlassen bleibt.",
        sections: [
          {
            heading: "Nur Beratung und Koordination",
            body: "Lusian erbringt Beratungs- und Koordinationsleistungen. Es erbringt keine Rechts-, Steuer-, Aufenthalts-, Anlage- oder Finanzberatung und ist weder Anwaltskanzlei noch Steuerkanzlei, Aufenthaltsagentur, zugelassene Finanzberatung oder Vermittlung.",
          },
          {
            heading: "Regulierte Fragen",
            body: "Erfordert eine Angelegenheit regulierte Beratung oder eine regulierte Eingabe, wird sie an entsprechend qualifizierte und in der jeweiligen Rechtsordnung zugelassene Fachleute verwiesen oder mit ihnen koordiniert. Diese Fachleute verantworten ihre eigene Beratung.",
          },
          {
            heading: "Keine Zusage zum Ergebnis",
            body: "Es wird nichts über den Ausgang eines Antrags, einer Genehmigung, einer Lizenz, einer Eintragung oder einer Transaktion zugesagt, über die ein Dritter oder eine Behörde entscheidet. Anforderungen und Verfahren ändern sich und unterscheiden sich nach den Umständen des Einzelfalls.",
          },
          {
            heading: "Länderinformationen",
            body: "Marktbeschreibungen auf dieser Website behandeln wirtschaftlichen und alltäglichen Charakter. Sie beschreiben bewusst keine Visakategorien, Aufenthaltsvoraussetzungen, Eigentumsregeln, steuerliche Behandlung oder Schwellenwerte und dürfen nicht so verstanden werden.",
          },
          {
            heading: "Unabhängigkeit der Vorstellungen",
            body: "Vorstellungen bei Schulen, Banken, Maklern, Anbietern und Fachleuten erfolgen nach Eignung. Besteht mit einer vorgestellten Partei eine geschäftliche Vereinbarung, wird sie vor der Vorstellung offengelegt.",
            required: [
              "Bestätigung der Haltung des Büros zu Vermittlungsprovisionen",
            ],
          },
        ],
      },
    },
  },

  notFound: {
    eyebrow: "Fehler 404",
    headline: "Diese Seite ist nicht dort, wo sie war.",
    body: "Die Adresse hat sich vielleicht geändert, oder es gab sie nie. So oder so sind die beiden Bereiche einen Klick entfernt.",
    home: "Zur Startseite",
  },

  plates: {
    interlude: {
      alt: "Tageslicht, das durch eine architektonische Schwelle fällt",
      brief:
        "Innenraum mit Tageslicht an einer architektonischen Schwelle. Stein, Glas, tiefer Schatten. Keine Menschen, kein erkennbares Gebäude, keine Skyline.",
      caption: "Zwischen den beiden Bereichen",
    },
    aviationApron: {
      alt: "Vorfeldmarkierungen und Terminalstruktur im ersten Licht",
      brief:
        "Betriebsumgebung im ersten Licht — Geometrie des Vorfelds, Standplatzmarkierungen, Struktur. Keine Flugzeuglackierung, keine Gesichter, keine Marken.",
      caption: "Wo die Arbeit geschieht",
    },
    gulfInterior: {
      alt: "Ein ruhiger Wohnraum im späten Nachmittagslicht",
      brief:
        "Ein ruhiger Wohnraum am späten Nachmittag. Zurückhaltung statt Opulenz. Keine Gesichter, keine erkennbare Adresse, kein Einrichtungsklischee.",
      caption: "Ankunft",
    },
  },
} satisfies SiteContent;

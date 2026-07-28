/**
 * Deep chapter content overrides for LF1, LF4 and key LF5 topics.
 * Loaded after data.js; replaces template fullContent with curated material.
 */

function mkVocab(de, pt, explanation, example) {
  return { de, pt, explanation, example };
}

function mkEx(question, answer, explanation = answer) {
  return { question, answer, explanation };
}

function buildDeepFullContent(chapter, spec) {
  return {
    studyTime: spec.studyTime || "55-70 Minuten",
    difficulty: spec.difficulty || "Medium",
    importance: {
      stars: spec.stars || "★★★★☆",
      explanation: spec.importance || [chapter.description, chapter.summary]
    },
    objectives: spec.objectives,
    introduction: spec.introduction,
    explanation: spec.explanation,
    realWorldExamples: spec.realWorldExamples,
    practicalExamples: spec.practicalExamples,
    ihkFocus: chapter.ihk,
    commonMistakes: spec.commonMistakes,
    vocabulary: spec.vocabulary,
    summary: spec.summary,
    mindMap: spec.mindMap,
    exercises: spec.exercises,
    related: spec.related,
    revisionChecklist: spec.revisionChecklist
  };
}

const DEEP_CHAPTER_SPECS = {
  "duales-system": {
    studyTime: "55-65 Minuten",
    stars: "★★★★★",
    objectives: [
      "Erklaeren Sie das duale Ausbildungssystem mit Betrieb und Berufsschule.",
      "Nennen Sie zentrale Beteiligte: IHK, Azubi, Ausbilder, Berufsschule.",
      "Unterscheiden Sie Ausbildungsvertrag, Ausbildungsordnung und Rahmenlehrplan."
    ],
    introduction: [
      "In Deutschland lernt ein Azubi nicht nur in der Firma und nicht nur in der Schule. Beides gehoert zusammen. Das nennt man duales System.",
      "Fuer AP1 ist dieses Kapitel wichtig, weil viele Aufgaben nach Rollen, Pflichten und Ablauf der Ausbildung fragen."
    ],
    explanation: [
      {
        title: "Zwei Lernorte",
        paragraphs: [
          "Im Ausbildungsbetrieb lernst du praktische Arbeit: Kunden, Tickets, Projekte, Dokumentation.",
          "In der Berufsschule lernst du Grundlagen: Wirtschaft, Recht, Fachinhalte nach Rahmenlehrplan.",
          "Beide Orte ergaenzen sich. Fehlt einer, ist die Ausbildung unvollstaendig."
        ]
      },
      {
        title: "Wichtige Dokumente",
        paragraphs: [
          "Ausbildungsvertrag: regelt Dauer, Verguetung, Probezeit zwischen Azubi und Betrieb.",
          "Ausbildungsordnung: beschreibt pruefungsrelevante Ziele der Ausbildung.",
          "Rahmenlehrplan: strukturiert den Unterricht in der Berufsschule.",
          "Ausbildungsnachweis: dokumentiert regelmaessig, was du im Betrieb gelernt hast."
        ]
      }
    ],
    realWorldExamples: [
      "Montag bis Donnerstag im Systemhaus im Support, freitags Berufsschule mit LF1-Themen.",
      "Die IHK meldet den Azubi an und ist an Zwischen- und Abschlusspruefung beteiligt."
    ],
    practicalExamples: [{
      title: "JIKU: Azubi-Start",
      paragraphs: ["Ein neuer Azubi unterschreibt den Ausbildungsvertrag und bekommt einen Ausbildungsplan mit Betrieb und Berufsschule."],
      steps: ["Vertrag pruefen.", "Lernorte eintragen.", "Ausbildungsnachweis starten.", "Erste Lernziele mit Ausbilder besprechen."]
    }],
    vocabulary: [
      mkVocab("Ausbildungsbetrieb", "empresa formadora", "Firma, in der die praktische Ausbildung stattfindet.", "JIKU IT-Solutions ist der Ausbildungsbetrieb."),
      mkVocab("Berufsschule", "escola profissional", "Schule fuer Theorie und Lernfelder.", "LF1 wird in der Berufsschule unterrichtet."),
      mkVocab("IHK", "camara de industria e comercio", "Prueft und organisiert viele Ausbildungen.", "Die IHK meldet den Azubi an."),
      mkVocab("Ausbildungsvertrag", "contrato de formacao", "Vertrag zwischen Azubi und Betrieb.", "Dauer und Verguetung stehen im Vertrag."),
      mkVocab("Ausbildungsordnung", "regulamento da formacao", "Offizielle Ziele der Ausbildung.", "AP1 orientiert sich an der Ordnung."),
      mkVocab("Rahmenlehrplan", "plano curricular", "Struktur des Berufsschulunterrichts.", "LF1 bis LF5 kommen aus dem Lehrplan."),
      mkVocab("Ausbildungsnachweis", "relatorio de formacao", "Dokumentation des Lernfortschritts.", "Woechentlich Eintraege im Betrieb."),
      mkVocab("Duales System", "sistema dual", "Kombination aus Betrieb und Berufsschule.", "Kernmodell der deutschen Ausbildung.")
    ],
    summary: [
      "Duales System = Betrieb + Berufsschule.",
      "IHK, Vertrag, Ordnung und Nachweis sind pruefungsrelevant.",
      "Azubi lernt praktisch und theoretisch parallel."
    ],
    mindMap: "Duales System → Betrieb + Berufsschule → IHK → Vertrag/Ordnung/Nachweis",
    exercises: {
      easy: [
        mkEx("Was bedeutet duales Ausbildungssystem?", "Ausbildung findet im Betrieb und in der Berufsschule statt."),
        mkEx("Nennen Sie zwei Lernorte.", "Ausbildungsbetrieb und Berufsschule."),
        mkEx("Welche Rolle hat die IHK?", "Anmeldung, Ueberwachung und Pruefungen der Ausbildung.")
      ],
      intermediate: [
        mkEx("Unterscheiden Sie Ausbildungsvertrag und Ausbildungsordnung.", "Vertrag zwischen Azubi und Betrieb; Ordnung beschreibt Ausbildungsziele allgemein."),
        mkEx("Warum ist der Ausbildungsnachweis wichtig?", "Er dokumentiert den Lernfortschritt im Betrieb."),
        mkEx("Beschreiben Sie einen typischen Woche-Rhythmus eines Azubi.", "Mehrere Tage Betrieb, Berufsschultage, Nachweis fuehren.")
      ],
      ap1Style: [
        mkEx("AP1: Welche Aussage zum dualen System ist falsch? Begruenden Sie.", "Nur Betrieb oder nur Schule reicht nicht — beide Lernorte sind Pflicht."),
        mkEx("AP1: Ordne IHK, Berufsschule und Betrieb ihrer Hauptaufgabe zu.", "IHK=Pruefung/Anmeldung, Schule=Theorie, Betrieb=Praxis."),
        mkEx("AP1: Erklaeren Sie den Ausbildungsnachweis in einem Satz.", "Regelmaessige schriftliche Dokumentation des Gelernten im Betrieb.")
      ]
    },
    commonMistakes: ["IHK mit Betrieb verwechseln.", "Berufsschule als optional betrachten."],
    revisionChecklist: ["Ich kann beide Lernorte erklaeren.", "Ich kenne Vertrag, Ordnung, Lehrplan, Nachweis.", "Ich kann ein Beispiel aus JIKU nennen."],
    related: ["Ausbildungsbetrieb", "Berufsschule", "IHK", "Ausbildungsnachweis"]
  },

  "rechte-pflichten": {
    studyTime: "50-60 Minuten",
    stars: "★★★★★",
    objectives: [
      "Unterscheiden Sie Rechte und Pflichten von Azubi und Betrieb.",
      "Erklaeren Sie Probezeit, Verguetung und Kuendigung auf AP1-Niveau.",
      "Beschreiben Sie den Ausbildungsnachweis als Pflicht."
    ],
    introduction: [
      "Ausbildung ist kein freiwilliges Praktikum. Rechte und Pflichten sind gesetzlich geregelt, vor allem im BBiG.",
      "In AP1 muessen Sie Aussagen als richtig oder falsch beurteilen koennen."
    ],
    explanation: [
      {
        title: "Rechte des Azubi",
        paragraphs: [
          "Anspruch auf Ausbildung, Verguetung, Berufssschulbesuch und Ausbildungsmittel.",
          "Recht auf Urlaub nach gesetzlichen Regeln.",
          "Schutz durch Arbeitsschutz und Jugendarbeitsschutz wo anwendbar."
        ]
      },
      {
        title: "Pflichten des Azubi",
        paragraphs: [
          "Lernbereitschaft, Puenktlichkeit, Sorgfalt, Geheimhaltung.",
          "Ausbildungsnachweis regelmaessig fuehren.",
          "Anweisungen im Rahmen der Ausbildung befolgen."
        ]
      }
    ],
    realWorldExamples: ["Azubi bekommt Arbeitsmittel vom Betrieb, muss Nachweis bis Freitag abgeben."],
    practicalExamples: [{ title: "Nachweis-Frist", paragraphs: ["Der Ausbilder erinnert: ohne Nachweis keine ordnungsgemaesse Dokumentation."], steps: ["Nachweis oeffnen.", "Woche dokumentieren.", "Unterschrift einholen."] }],
    vocabulary: [
      mkVocab("BBiG", "lei da formacao profissional", "Bundesgesetz das Ausbildung regelt.", "Rechte und Pflichten stehen im BBiG."),
      mkVocab("Ausbildungsnachweis", "relatorio de formacao", "Pflichtdokument des Azubi.", "Woechentliche Eintraege."),
      mkVocab("Probezeit", "periodo probatorio", "Erste Monate mit kuendigungsfreier Probe.", "Oft 1–3 Monate."),
      mkVocab("Verguetung", "remuneracao", "Gehalt des Azubi.", "Steigt oft jaehrlich."),
      mkVocab("Kuendigung", "rescisao", "Beendigung des Arbeitsverhaeltnisses.", "Besondere Regeln in Probezeit."),
      mkVocab("Ausbildungsmittel", "materiais de formacao", "Was der Betrieb stellen muss.", "z.B. Laptop, Zugang, Tools."),
      mkVocab("Berufsschule", "escola profissional", "Besuch ist verpflichtend.", "Fehlen muss begruendet sein."),
      mkVocab("Lernpflicht", "dever de aprender", "Azubi muss aktiv lernen.", "Gehoert zu den Pflichten.")
    ],
    summary: ["Azubi hat Rechte auf Ausbildung und Verguetung.", "Azubi muss Nachweis fuehren und sorgfaeltig arbeiten.", "BBiG ist die rechtliche Basis."],
    mindMap: "BBiG → Rechte Azubi → Pflichten Azubi → Nachweis/Verguetung/Probezeit",
    exercises: {
      easy: [
        mkEx("Nennen Sie eine Pflicht des Azubi.", "Ausbildungsnachweis fuehren."),
        mkEx("Nennen Sie ein Recht des Azubi.", "Anspruch auf Verguetung."),
        mkEx("Was ist die Probezeit?", "Anfangsphase mit besonderen Kuendigungsregeln.")
      ],
      intermediate: [
        mkEx("Unterscheiden Sie Recht und Pflicht beim Nachweis.", "Recht auf Ausbildung; Pflicht, den Nachweis zu fuehren."),
        mkEx("Muss der Betrieb Berufsschule bezahlen?", "Azubi hat Anspruch auf Besuch; Betrieb muss Ausbildung ermoeglichen."),
        mkEx("Was passiert bei fehlendem Nachweis?", "Unvollstaendige Dokumentation — wichtig fuer Pruefung und Bewertung.")
      ],
      ap1Style: [
        mkEx("AP1: Ist diese Aussage richtig? 'Der Azubi kann die Berufsschule optional besuchen.'", "Falsch — Berufsschule ist verpflichtender Teil."),
        mkEx("AP1: Ordnen Sie Verguetung, Probezeit und BBiG.", "BBiG=Gesetz; Verguetung=Gehalt; Probezeit=Anfangsphase."),
        mkEx("AP1: Nennen Sie zwei Pflichten des Betriebs.", "Ausbildung ermoeglichen, Verguetung zahlen, Mittel bereitstellen.")
      ]
    },
    commonMistakes: ["Probezeit mit Gesamt-ausbildung verwechseln.", "Nachweis als optional sehen."],
    revisionChecklist: ["Rechte und Pflichten getrennt nennen.", "BBiG als Basis kennen.", "Nachweis erklaeren."],
    related: ["BBiG", "Ausbildungsnachweis", "Probezeit", "Verguetung"]
  },

  "informationssicherheit": {
    studyTime: "60-75 Minuten",
    stars: "★★★★★",
    objectives: [
      "Definieren Sie Informationssicherheit mit CIA-Triade.",
      "Erklaeren Sie Schutzziele Verfuegbarkeit, Integritaet, Vertraulichkeit.",
      "Verbinden Sie Risiken mit einfachen Massnahmen."
    ],
    introduction: [
      "Informationssicherheit schuetzt Daten und Systeme vor Schaden. In IT-Betrieben ist das Alltag — nicht nur Theorie.",
      "AP1 fragt oft nach Begriffen, Schutzzielen und einfachen Massnahmen."
    ],
    explanation: [
      {
        title: "CIA-Triade",
        paragraphs: [
          "Verfuegbarkeit: Systeme und Daten sind bei Bedarf nutzbar.",
          "Integritaet: Daten sind vollstaendig und unveraendert (sofern gewollt).",
          "Vertraulichkeit: Nur Berechtigte sehen die Information."
        ]
      },
      {
        title: "Typische Bedrohungen",
        paragraphs: [
          "Malware, Phishing, schwache Passwoerter, fehlende Updates, menschliche Fehler.",
          "Massnahmen: Backups, Patches, Schulung, Least Privilege, Firewall, Antivirus."
        ]
      }
    ],
    realWorldExamples: ["Ransomware blockiert Dateien — Verfuegbarkeit und Integritaet betroffen."],
    practicalExamples: [{ title: "JIKU: Server-Wartung", paragraphs: ["Update fenster planen, Backup pruefen, Verfuegbarkeit dokumentieren."], steps: ["Backup.", "Patch.", "Test.", "Freigabe."] }],
    vocabulary: [
      mkVocab("Verfuegbarkeit", "disponibilidade", "System ist nutzbar wenn noetig.", "Server online fuer Kunden."),
      mkVocab("Integritaet", "integridade", "Daten sind korrekt und unmanipuliert.", "Hash prueft Integritaet."),
      mkVocab("Vertraulichkeit", "confidencialidade", "Nur Berechtigte haben Zugriff.", "Verschluesselung schuetzt Vertraulichkeit."),
      mkVocab("Informationssicherheit", "seguranca da informacao", "Schutz von Information und IT.", "Ziel der CIA-Triade."),
      mkVocab("Risiko", "risco", "Eintrittswahrscheinlichkeit mal Schaden.", "Schwaches Passwort = hohes Risiko."),
      mkVocab("Massnahme", "medida", "Konkrete Schutzaktion.", "Patch, Backup, Firewall."),
      mkVocab("Malware", "software maliciosa", "Schadsoftware.", "Virus, Trojaner, Ransomware."),
      mkVocab("Backup", "copia de seguranca", "Sicherungskopie fuer Wiederherstellung.", "Taegliches Server-Backup.")
    ],
    summary: ["CIA = Verfuegbarkeit, Integritaet, Vertraulichkeit.", "Risiken brauchen Massnahmen.", "Menschliche Fehler sind haeufig."],
    mindMap: "InfoSec → CIA → Bedrohungen → Massnahmen → Backup/Patch/Schulung",
    exercises: {
      easy: [
        mkEx("Was bedeutet Vertraulichkeit?", "Nur Berechtigte duerfen Information sehen."),
        mkEx("Nennen Sie die drei Schutzziele der CIA-Triade.", "Verfuegbarkeit, Integritaet, Vertraulichkeit."),
        mkEx("Was ist ein Backup?", "Sicherungskopie zur Wiederherstellung.")
      ],
      intermediate: [
        mkEx("Welches Schutzziel verletzt Ransomware?", "Verfuegbarkeit und oft Integritaet."),
        mkEx("Nennen Sie drei Massnahmen fuer Informationssicherheit.", "Backup, Updates, Schulung, Firewall."),
        mkEx("Erklaeren Sie Risiko in einfachen Worten.", "Wahrscheinlichkeit mal Schaden eines Ereignisses.")
      ],
      ap1Style: [
        mkEx("AP1: Ordne Massnahme und Schutzziel — Verschluesselung.", "Vertraulichkeit."),
        mkEx("AP1: Ist 'Integritaet = schneller Internetzugang' richtig?", "Falsch — Integritaet = Unveraendertheit/Korrektheit."),
        mkEx("AP1: Begruenden Sie warum Updates wichtig sind.", "Schliessen Schwachstellen, reduzieren Risiko.")
      ]
    },
    commonMistakes: ["Verfuegbarkeit mit Vertraulichkeit verwechseln.", "Security nur als Technik sehen."],
    revisionChecklist: ["CIA auswendig.", "Beispiel Bedrohung + Massnahme.", "Praxisbeispiel JIKU."],
    related: ["Verfuegbarkeit", "Integritaet", "Vertraulichkeit", "Backup"]
  },

  "banco-de-dados": {
    studyTime: "60-75 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie DBMS, Tabelle, Datensatz und Feld.",
      "Unterscheiden Sie relationale und NoSQL-Datenbanken auf AP1-Niveau.",
      "Beschreiben Sie Primary Key und Foreign Key."
    ],
    introduction: [
      "Datenbanken speichern strukturierte Information dauerhaft. Fast jede Anwendung nutzt eine Datenbank.",
      "Fuer AP1 muessen Sie Grundbegriffe und einfache Beziehungen erklaeren koennen."
    ],
    explanation: [
      {
        title: "Grundstruktur",
        paragraphs: [
          "Datenbank (DB): Sammlung strukturierter Daten.",
          "DBMS: Software zur Verwaltung (z.B. MySQL, PostgreSQL, SQLite).",
          "Tabelle: Zeilen (Datensaetze) und Spalten (Felder).",
          "Primary Key: eindeutige Identifikation einer Zeile."
        ]
      },
      {
        title: "Beziehungen",
        paragraphs: [
          "Foreign Key verweist auf Primary Key einer anderen Tabelle.",
          "1:n Beziehung: ein Kunde — viele Bestellungen.",
          "Normalisierung reduziert Redundanz (AP1: Grundidee reicht)."
        ]
      }
    ],
    realWorldExamples: ["Ticket-System speichert Kunden, Tickets und Mitarbeiter in relationalen Tabellen."],
    practicalExamples: [{ title: "JIKU: Kundendatenbank", paragraphs: ["Kunde hat viele Geraete — zwei Tabellen mit Fremdschluessel."], steps: ["Entitaeten finden.", "Keys definieren.", "Beziehung modellieren."] }],
    vocabulary: [
      mkVocab("Datenbank", "banco de dados", "Strukturierte persistente Datensammlung.", "Kundendatenbank."),
      mkVocab("DBMS", "sistema gerenciador de BD", "Software zur DB-Verwaltung.", "MySQL, SQLite."),
      mkVocab("Tabelle", "tabela", "Struktur aus Zeilen und Spalten.", "Tabelle Kunde."),
      mkVocab("Primaerschluessel", "chave primaria", "Eindeutige ID einer Zeile.", "Kundennummer."),
      mkVocab("Fremdschluessel", "chave estrangeira", "Verweis auf andere Tabelle.", "Kunden_ID in Bestellung."),
      mkVocab("Datensatz", "registro", "Eine Zeile in der Tabelle.", "Ein Kunde = ein Datensatz."),
      mkVocab("Feld", "campo", "Eine Spalte.", "Feld Name, Feld Email."),
      mkVocab("SQL", "linguagem SQL", "Sprache fuer Abfragen und Aenderungen.", "SELECT * FROM Kunde;")
    ],
    summary: ["DBMS verwaltet Tabellen mit Datensaetzen.", "Primary/Foreign Key modellieren Beziehungen.", "SQL ist Standardsprache fuer Abfragen."],
    mindMap: "DB → DBMS → Tabelle → PK/FK → SQL",
    exercises: {
      easy: [
        mkEx("Was ist ein Primaerschluessel?", "Eindeutige Identifikation eines Datensatzes."),
        mkEx("Was macht ein DBMS?", "Verwaltet Datenbanken."),
        mkEx("Was ist SQL?", "Sprache fuer Datenbankabfragen.")
      ],
      intermediate: [
        mkEx("Erklaeren Sie 1:n Beziehung Kunde-Bestellung.", "Ein Kunde hat viele Bestellungen; FK in Bestellung."),
        mkEx("Unterscheiden Sie Feld und Datensatz.", "Feld=Spalte; Datensatz=Zeile."),
        mkEx("Warum Foreign Key?", "Verknuepft Tabellen konsistent.")
      ],
      ap1Style: [
        mkEx("AP1: Welche Aussage zu Primary Key ist richtig?", "Muss eindeutig sein, darf nicht null sein."),
        mkEx("AP1: Nennen Sie Vorteil relationaler DB.", "Strukturierte Beziehungen, SQL, Konsistenz."),
        mkEx("AP1: Erklaeren Sie DBMS in einem Satz.", "Software die Speicherung und Abfrage von Daten organisiert.")
      ]
    },
    commonMistakes: ["Tabelle mit Datei verwechseln.", "PK und FK vertauschen."],
    revisionChecklist: ["PK/FK erklaeren.", "SQL als Abfragesprache.", "Praxisbeispiel nennen."],
    related: ["Datenbank", "SQL", "Primaerschluessel", "Fremdschluessel"]
  },

  "sql": {
    studyTime: "55-70 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Lesen Sie einfache SELECT-Abfragen.",
      "Erklaeren Sie WHERE, ORDER BY und INSERT auf AP1-Niveau.",
      "Unterscheiden Sie DDL und DML grundlegend."
    ],
    introduction: [
      "SQL ist die Standardsprache fuer relationale Datenbanken. AP1 verlangt oft das Verstehen einfacher Befehle, nicht komplexes Tuning.",
      "Focus: SELECT lesen, filtern, sortieren; Grundidee von INSERT/UPDATE."
    ],
    explanation: [
      {
        title: "SELECT",
        paragraphs: [
          "SELECT spalten FROM tabelle WHERE bedingung ORDER BY spalte;",
          "WHERE filtert Zeilen. ORDER BY sortiert.",
          "JOIN verbindet Tabellen (AP1: Grundidee)."
        ]
      },
      {
        title: "DML vs DDL",
        paragraphs: [
          "DML: SELECT, INSERT, UPDATE, DELETE — arbeitet mit Daten.",
          "DDL: CREATE, ALTER, DROP — definiert Struktur.",
          "AP1: Begriffe zuordnen koennen reicht oft."
        ]
      }
    ],
    realWorldExamples: ["Support sucht alle offenen Tickets: SELECT * FROM Ticket WHERE Status='offen';"],
    practicalExamples: [{ title: "JIKU: Kundenliste", paragraphs: ["SELECT Name, Email FROM Kunde ORDER BY Name;"], steps: ["Tabelle waehlen.", "Spalten waehlen.", "Filter setzen."] }],
    vocabulary: [
      mkVocab("SELECT", "consultar", "Daten abfragen.", "SELECT * FROM Kunde;"),
      mkVocab("WHERE", "onde/filtro", "Bedingung fuer Zeilen.", "WHERE Status='offen'"),
      mkVocab("INSERT", "inserir", "Neue Zeile einfuegen.", "INSERT INTO Kunde ..."),
      mkVocab("UPDATE", "atualizar", "Daten aendern.", "UPDATE Kunde SET ..."),
      mkVocab("DELETE", "excluir", "Daten loeschen.", "DELETE FROM ... WHERE ..."),
      mkVocab("JOIN", "uniao", "Tabellen verbinden.", "INNER JOIN Bestellung ON ..."),
      mkVocab("DML", "manipulacao de dados", "Daten bearbeiten.", "SELECT, INSERT, UPDATE, DELETE."),
      mkVocab("DDL", "definicao de dados", "Struktur definieren.", "CREATE TABLE.")
    ],
    summary: ["SELECT liest Daten mit Filter und Sortierung.", "DML aendert Daten, DDL Struktur.", "JOIN verknuepft Tabellen."],
    mindMap: "SQL → SELECT/WHERE/ORDER → DML/DDL → JOIN",
    exercises: {
      easy: [
        mkEx("Was macht SELECT?", "Liest Daten aus einer Tabelle."),
        mkEx("Wofuer ist WHERE?", "Filtert Zeilen nach Bedingung."),
        mkEx("Nennen Sie einen DML-Befehl.", "INSERT oder UPDATE oder DELETE.")
      ],
      intermediate: [
        mkEx("Lesen Sie: SELECT Name FROM Kunde WHERE Stadt='Berlin';", "Namen aller Kunden aus Berlin."),
        mkEx("Unterscheiden Sie INSERT und UPDATE.", "INSERT neu; UPDATE bestehend aendern."),
        mkEx("Was ist DDL?", "Definiert Tabellenstruktur, z.B. CREATE TABLE.")
      ],
      ap1Style: [
        mkEx("AP1: Welcher Befehl loescht Daten?", "DELETE (nicht DROP — das loescht Struktur)."),
        mkEx("AP1: Ordnen Sie SELECT und INSERT.", "SELECT=lesen; INSERT=einfuegen."),
        mkEx("AP1: Erklaeren Sie ORDER BY.", "Sortiert Ergebnis nach Spalte.")
      ]
    },
    commonMistakes: ["DELETE mit DROP verwechseln.", "WHERE vergessen bei UPDATE/DELETE."],
    revisionChecklist: ["SELECT/WHERE lesen.", "DML vs DDL.", "Ein Beispiel schreiben."],
    related: ["SELECT", "INSERT", "DML", "DDL"]
  }
};

/** Expand remaining LF1/LF4/LF5 ids with shared deep builder from chapter metadata */
const DEEP_CHAPTER_IDS = [
  "mitbestimmung", "berufsplanung", "modellunternehmen-jiku", "betriebsziele",
  "organisation-rechtsformen", "geschaeftsprozesse", "marktumfeld", "praesentation-teamarbeit",
  "datenschutz", "it-grundschutz", "schutzbedarf", "bedrohungen", "social-engineering",
  "tom", "sicherheitskonzept", "seguranca",
  "softwareentwicklung-umfeld", "daten-informationen", "zahlensysteme", "er-modell",
  "python-grundlagen", "softwaretests"
];

function buildMetaDeepSpec(chapter) {
  const terms = (chapter.ihk || chapter.title)
    .split(/[,;:]|\bund\b/g)
    .flatMap((part) => part.match(/[A-ZÄÖÜ][A-Za-zäöüß\-/]+/g) || [])
    .filter((t) => t.length > 2)
    .slice(0, 8);

  const vocabulary = (terms.length ? terms : [chapter.title]).map((term, i) =>
    mkVocab(term, `Conceito: ${term}`, `Fachbegriff zu ${chapter.title}.`, chapter.example)
  );
  while (vocabulary.length < 6) {
    vocabulary.push(mkVocab(`${chapter.title} ${vocabulary.length + 1}`, "termo tecnico", chapter.summary, chapter.example));
  }

  const exercises = {
    easy: [
      mkEx(`Was ist ${chapter.title}?`, chapter.summary),
      mkEx(`Nennen Sie zwei Fachwoerter zu ${chapter.title}.`, terms.slice(0, 2).join(", ") || chapter.title),
      mkEx("Warum ist das Thema fuer AP1 wichtig?", chapter.ihk || chapter.description)
    ],
    intermediate: [
      mkEx(`Erklaeren Sie ${chapter.title} fuer einen Kunden.`, chapter.summary),
      mkEx("Beschreiben Sie ein Praxisbeispiel.", chapter.example),
      mkEx("Welche Fehler sollte man vermeiden?", "Begriffe verwechseln; keine Beispiele nennen.")
    ],
    ap1Style: [
      mkEx(`AP1: Beurteilen Sie eine Aussage zu ${chapter.title}.`, chapter.summary),
      mkEx(`AP1: Ordnen Sie Fachbegriffe dem Thema zu.`, terms.slice(0, 3).join(", ")),
      mkEx(`AP1: Erklaeren Sie ${chapter.title} mit Signalwort 'beschreiben'.`, chapter.summary)
    ]
  };

  return {
    studyTime: "50-65 Minuten",
    stars: "★★★★☆",
    objectives: [
      `Erklaeren Sie ${chapter.title} in eigenen Worten.`,
      "Nennen Sie zentrale Fachbegriffe auf Deutsch.",
      "Verbinden Sie Theorie mit einem beruflichen Beispiel.",
      "Beantworten Sie AP1-nahe Kurzfragen."
    ],
    introduction: [chapter.description, chapter.summary, `Portuguese support: ${chapter.summary}`],
    explanation: [
      { title: `Kernidee: ${chapter.title}`, paragraphs: [chapter.description, chapter.summary] },
      { title: "Berufliche Anwendung bei JIKU", paragraphs: [chapter.example, chapter.ihk || ""] },
      {
        title: "AP1-Fokus",
        paragraphs: [
          "Antworten kurz, mit Fachbegriffen und Beispiel.",
          "Signalwoerter beachten: erklaeren, nennen, zuordnen, begruenden."
        ]
      }
    ],
    realWorldExamples: [chapter.example, `Bei JIKU IT-Solutions taucht ${chapter.title} in Kundenprojekten auf.`],
    practicalExamples: [{
      title: "Praxisfall",
      paragraphs: [chapter.example, chapter.description],
      steps: ["Situation verstehen.", "Begriffe zuordnen.", "Loesung begruenden.", "Ergebnis dokumentieren."]
    }],
    vocabulary,
    summary: [chapter.summary, chapter.ihk || "", chapter.description],
    mindMap: `${chapter.title} → Begriffe → Praxis → AP1`,
    exercises,
    commonMistakes: ["Nur auswendig lernen ohne Beispiel.", "Deutsche Fachbegriffe nicht aktiv koennen."],
    revisionChecklist: [
      `Ich kann ${chapter.title} erklaeren.`,
      "Ich kenne mindestens 5 Fachwoerter.",
      "Ich habe ein Praxisbeispiel.",
      "Ich habe Uebungen trainiert."
    ],
    related: terms.slice(0, 4)
  };
}

function applyDeepChapterContent(data) {
  if (!data?.chapters) return;

  const byId = new Map(data.chapters.map((chapter) => [chapter.id, chapter]));

  Object.entries(DEEP_CHAPTER_SPECS).forEach(([id, spec]) => {
    const chapter = byId.get(id);
    if (!chapter) return;
    chapter.fullContent = buildDeepFullContent(chapter, spec);
    chapter.studyTime = chapter.fullContent.studyTime;
    chapter.difficulty = chapter.fullContent.difficulty;
    chapter.exercises = [
      ...spec.exercises.easy.slice(0, 2),
      ...spec.exercises.intermediate.slice(0, 2),
      ...spec.exercises.ap1Style.slice(0, 1)
    ];
    chapter.text = [
      `${chapter.title}: conteudo aprofundado para estudo guiado AP1.`,
      chapter.description,
      chapter.summary
    ];
  });

  DEEP_CHAPTER_IDS.forEach((id) => {
    if (DEEP_CHAPTER_SPECS[id]) return;
    const chapter = byId.get(id);
    if (!chapter) return;
    const spec = buildMetaDeepSpec(chapter);
    chapter.fullContent = buildDeepFullContent(chapter, spec);
    chapter.studyTime = chapter.fullContent.studyTime;
    chapter.exercises = [
      ...spec.exercises.easy.slice(0, 2),
      ...spec.exercises.intermediate.slice(0, 1),
      ...spec.exercises.ap1Style.slice(0, 1)
    ];
  });

  const glossaryMap = new Map((data.glossary || []).map((term) => [term.word.toLowerCase(), term]));
  data.chapters.forEach((chapter) => {
    (chapter.fullContent?.vocabulary || []).forEach((row) => {
      const key = row.de.toLowerCase();
      if (!glossaryMap.has(key)) {
        glossaryMap.set(key, { word: row.de, translation: row.pt, explanation: row.explanation });
      }
    });
  });
  data.glossary = [...glossaryMap.values()];
}

if (typeof window !== "undefined" && window.AZUBIFORGE_DATA) {
  applyDeepChapterContent(window.AZUBIFORGE_DATA);
}

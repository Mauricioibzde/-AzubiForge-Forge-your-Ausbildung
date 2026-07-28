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

function curatedExercises(easy, intermediate, ap1Style) {
  return { easy, intermediate, ap1Style };
}

function buildLf1Lf4CuratedSpecs() {
  return {
    mitbestimmung: {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie Mitbestimmung und Interessenvertretung.", "Nennen Sie Aufgaben von Betriebsrat und Jugendvertretung.", "Beschreiben Sie Beteiligung von Auszubildenden."],
      introduction: ["Mitbestimmung regelt die Beteiligung der Belegschaft an betrieblichen Entscheidungen.", "AP1 fragt nach Betriebsrat, Jugend- und Auszubildendenvertretung (JAV)."],
      explanation: [
        { title: "Betriebsrat", paragraphs: ["Vertritt Interessen aller Mitarbeitenden.", "Mitbestimmung bei Sozialangelegenheiten, Personalfragen (in Grenzen), Betriebsaenderungen.", "Kein Ersatz fuer Management — kooperatives Gremium."] },
        { title: "Jugend- und Auszubildendenvertretung", paragraphs: ["JAV vertritt Interessen der Auszubildenden.", "Sammelt Anliegen, spricht mit Ausbilder und Betriebsrat.", "Azubi kann sich an JAV wenden bei Problemen in der Ausbildung."] }
      ],
      realWorldExamples: ["JAV spricht Thema Berufsschulzeiten und Ausbildungsmittel an."],
      practicalExamples: [{ title: "JIKU: JAV", paragraphs: ["Azubi meldet fehlende Lerngelegenheit — JAV vermittelt mit Ausbilder."], steps: ["Anliegen sammeln.", "Gespraech.", "Loesung.", "Nachverfolgen."] }],
      vocabulary: [mkVocab("Mitbestimmung", "cogestao", "Beteiligung der Belegschaft.", "Betriebsrat."), mkVocab("Betriebsrat", "conselho de empresa", "Interessenvertretung der Mitarbeiter.", "BR."), mkVocab("Jugendvertretung", "representacao juvenil", "Vertretung junger Arbeitnehmer.", "JAV fuer Azubi."), mkVocab("Interessenvertretung", "representacao de interesses", "Schutz der Rechte.", "BR und JAV."), mkVocab("Sozialangelegenheiten", "assuntos sociais", "Mitbestimmungsthema.", "Arbeitszeit, Urlaub."), mkVocab("Azubi", "aprendiz", "Auszubildender.", "Hat Recht auf JAV."), mkVocab("Beteiligung", "participacao", "Einbeziehung in Entscheidungen.", "Mitbestimmung."), mkVocab("Kooperation", "cooperacao", "Zusammenarbeit BR und Betrieb.", "Nicht Gegnerschaft.")],
      summary: ["Mitbestimmung = geregelte Beteiligung.", "Betriebsrat + JAV wichtig fuer Azubi.", "JAV vertritt Auszubildende."],
      mindMap: "Mitbestimmung → Betriebsrat → JAV → Beteiligung",
      exercises: curatedExercises(
        [mkEx("Was ist Mitbestimmung?", "Beteiligung der Belegschaft an betrieblichen Entscheidungen."), mkEx("Wofuer JAV?", "Interessen der Auszubildenden vertreten."), mkEx("Betriebsrat fuer wen?", "Alle Mitarbeitenden.")],
        [mkEx("Unterschied BR und JAV?", "BR=alle MA; JAV=nur Auszubildende."), mkEx("Beispiel Mitbestimmung?", "Arbeitszeitregelung mit BR besprechen.")],
        [mkEx("AP1: BR ersetzt Geschaeftsfuehrung?", "Falsch — Mitbestimmung, nicht alleinige Leitung.")]
      ),
      commonMistakes: ["Betriebsrat mit IHK verwechseln.", "JAV als optional sehen."],
      revisionChecklist: ["BR und JAV erklaeren.", "Beispiel nennen.", "Mitbestimmung definieren."],
      related: ["Betriebsrat", "Jugendvertretung", "Mitbestimmung"]
    },

    berufsplanung: {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie Berufs- und Lebensplanung in der Ausbildung.", "Verbinden Sie Selbst- und Lernkompetenz.", "Planen Sie Lernschritte und Reflexion."],
      introduction: ["Berufsplanung heisst: Ausbildung aktiv steuern, nicht passiv abwarten.", "AP1 verbindet Kompetenzen, Feedback und berufliche Entwicklung."],
      explanation: [
        { title: "Aktive Ausbildung", paragraphs: ["Ziele setzen: Was will ich nach LF1 koennen?", "Kompetenzen pruefen: Was sicher, was unsicher?", "Feedback einholen und dokumentieren."] },
        { title: "Reflexion", paragraphs: ["Nach Lernfeld: Was gelernt? Was offen? Naechster Schritt?", "Lernkompetenz: effektiv lernen. Selbstkompetenz: Verantwortung uebernehmen."] }
      ],
      realWorldExamples: ["Azubi fuehrt Lernjournal: LF3 Netzwerk — OSI sicher, Subnetting ueben."],
      practicalExamples: [{ title: "Lernplan", paragraphs: ["Woechentlich: 3 Kapitel, 1 Review, 1 Uebung AP1."], steps: ["Stand.", "Ziel.", "Schritte.", "Review."] }],
      vocabulary: [mkVocab("Berufsplanung", "planejamento de carreira", "Aktive Steuerung der Ausbildung.", "Ziele setzen."), mkVocab("Selbstkompetenz", "autocompetencia", "Verantwortung fuer sich.", "Aktiv lernen."), mkVocab("Lernkompetenz", "competencia de aprendizagem", "Effektiv lernen.", "Methoden."), mkVocab("Feedback", "feedback", "Rueckmeldung zum Lernen.", "Ausbilder."), mkVocab("Reflexion", "reflexao", "Nachdenken ueber Ergebnis.", "Was lief gut?"), mkVocab("Lernziel", "objetivo de aprendizagem", "Konkretes Ziel.", "Subnetting koennen."), mkVocab("Kompetenz", "competencia", "Faehigkeit + Wissen.", "Fachlich und sozial."), mkVocab("Entwicklung", "desenvolvimento", "Fortschritt ueber Zeit.", "Vom Azubi zum Fachkraft.")],
      summary: ["Aktiv planen, nicht warten.", "Selbst- und Lernkompetenz.", "Reflexion nach Lernfeld."],
      mindMap: "Berufsplanung → Ziele → Feedback → Reflexion",
      exercises: curatedExercises(
        [mkEx("Was ist Berufsplanung?", "Aktive Steuerung der Ausbildung und Entwicklung."), mkEx("Selbstkompetenz?", "Verantwortung und Selbstorganisation."), mkEx("Warum Feedback?", "Lernen verbessern.")],
        [mkEx("Reflexion nach LF — was?", "Was sicher, was offen, naechster Schritt."), mkEx("Lernkompetenz Beispiel?", "Effektive Lernmethoden nutzen.")],
        [mkEx("AP1: Azubi muss nicht reflektieren?", "Falsch — Reflexion ist Teil beruflicher Handlung.")]
      ),
      commonMistakes: ["Nur auf Pruefung warten.", "Feedback ignorieren."],
      revisionChecklist: ["Selbst/Lernkompetenz.", "Reflexion erklaeren.", "Eigenes Lernziel."],
      related: ["Selbstkompetenz", "Lernkompetenz", "Feedback"]
    },

    "modellunternehmen-jiku": {
      studyTime: "45-55 Minuten", stars: "★★★☆☆",
      objectives: ["Erklaeren Sie das Modellunternehmen JIKU IT-Solutions.", "Verbinden Sie Lerneinheiten mit Unternehmenskontext.", "Beschreiben Sie IT-Systemhaus-Leistungen."],
      introduction: ["Westermann nutzt JIKU als fiktives Systemhaus fuer realistische Aufgaben.", "Jede Lerneinheit soll in Kunde — Leistung — Prozess gedacht werden."],
      explanation: [
        { title: "JIKU als Rahmen", paragraphs: ["IT-Systemhaus: Beratung, Beschaffung, Installation, Support, Entwicklung.", "Kunde hat Bedarf → JIKU analysiert → Angebot → Umsetzung → Abnahme.", "Azubi handelt im Unternehmenskontext, nicht abstrakt."] }
      ],
      realWorldExamples: ["Kunde braucht 20 Arbeitsplaetze — JIKU: Analyse, Angebot, Lieferung, Einrichtung."],
      practicalExamples: [{ title: "Kundenauftrag", paragraphs: ["Bedarf klaeren, IPERKA anwenden, dokumentieren."], steps: ["Kunde.", "Leistung.", "Prozess.", "Ergebnis."] }],
      vocabulary: [mkVocab("Modellunternehmen", "empresa modelo", "Fiktives Lernunternehmen.", "JIKU."), mkVocab("Systemhaus", "empresa de TI", "IT-Dienstleister.", "JIKU IT-Solutions."), mkVocab("IT-Service", "servico de TI", "Dienstleistung.", "Support, Hosting."), mkVocab("Kunde", "cliente", "Auftraggeber.", "Nutzt Leistung."), mkVocab("Leistungsportfolio", "portfolio de servicos", "Angebot des Hauses.", "Beratung bis Cloud."), mkVocab("IT-Loesung", "solucao de TI", "Gesamtpaket.", "Hardware + Service."), mkVocab("Beratung", "consultoria", "Analyse und Empfehlung.", "Erster Schritt."), mkVocab("Support", "suporte", "Hilfe nach Lieferung.", "Helpdesk.")],
      summary: ["JIKU = Lernrahmen Systemhaus.", "Kunde — Leistung — Prozess.", "Praxisbezug in jeder Aufgabe."],
      mindMap: "JIKU → Systemhaus → Kunde → Leistung → Prozess",
      exercises: curatedExercises(
        [mkEx("Was ist JIKU?", "Modellunternehmen IT-Systemhaus in Westermann."), mkEx("Was macht ein Systemhaus?", "IT-Beratung, Beschaffung, Support, Entwicklung."), mkEx("Warum Modellunternehmen?", "Theorie in berufliche Situation.")],
        [mkEx("Kunde — Leistung — Prozess?", "Bedarf → IT-Loesung → Ablauf bis Abnahme."), mkEx("Beispiel JIKU-Auftrag?", "Arbeitsplaetze ausstatten.")],
        [mkEx("AP1: JIKU ist echte Firma in Pruefung?", "Modell — aber Denkrahmen realistisch.")]
      ),
      commonMistakes: ["JIKU als optionaler Hintergrund.", "Nur Technik ohne Kundenkontext."],
      revisionChecklist: ["JIKU erklaeren.", "Leistungsportfolio.", "Praxisbeispiel."],
      related: ["Systemhaus", "Kunde", "IT-Service"]
    },

    betriebsziele: {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Unterscheiden Sie Betrieb und Unternehmen.", "Nennen Sie Sach-, Formal- und Sozialziele.", "Verbinden Sie oekologische und wirtschaftliche Ziele."],
      introduction: ["Unternehmen verfolgen mehr als Gewinn — Qualitaet, Kundenzufriedenheit, Nachhaltigkeit.", "AP1: Zielarten zuordnen und Entscheidungen begruenden."],
      explanation: [
        { title: "Zielarten", paragraphs: ["Sachziele: Produkt/Qualitaet (z.B. zuverlaessige IT).", "Formalziele: wirtschaftlich (Gewinn, Liquiditaet).", "Sozialziele: Mitarbeiter, Image. Oekologie: Umwelt, Nachhaltigkeit."] },
        { title: "Betrieb vs Unternehmen", paragraphs: ["Betrieb: produziert Leistungen. Unternehmen: rechtliche/wirtschaftliche Einheit mit Zielen.", "IT-Entscheidung immer auch wirtschaftlich: TCO, Support, Energie."] }
      ],
      realWorldExamples: ["Guenstiger PC — Formalziel ja, aber schlechter Support schadet Sachziel Qualitaet."],
      practicalExamples: [{ title: "Notebook-Wahl", paragraphs: ["Nicht nur Preis — Garantie, Energie, Lebensdauer."], steps: ["Ziele.", "Optionen.", "Abwaegung.", "Begruendung."] }],
      vocabulary: [mkVocab("Betrieb", "operacao", "Erstellt Leistungen.", "Produktion/Service."), mkVocab("Unternehmen", "empresa", "Wirtschaftliche Einheit.", "Mit Zielen."), mkVocab("Sachziel", "objetivo material", "Qualitaet, Produkt.", "Zuverlaessige IT."), mkVocab("Formalziel", "objetivo formal", "Gewinn, Kosten.", "Wirtschaftlichkeit."), mkVocab("Sozialziel", "objetivo social", "Mitarbeiter, Image.", "Gute Ausbildung."), mkVocab("Nachhaltigkeit", "sustentabilidade", "Oekologisch/sozial.", "Green IT."), mkVocab("Gewinn", "lucro", "Erlös minus Kosten.", "Formalziel."), mkVocab("Kundenzufriedenheit", "satisfacao do cliente", "Soziales/marktliches Ziel.", "Guter Service.")],
      summary: ["Sach-, Formal-, Sozialziele.", "Betrieb vs Unternehmen.", "Entscheidungen mehrdimensional."],
      mindMap: "Unternehmen → Sach/Formal/Sozial → Nachhaltigkeit",
      exercises: curatedExercises(
        [mkEx("Sachziel Beispiel?", "Hohe Qualitaet der IT-Loesung."), mkEx("Formalziel?", "Gewinn erzielen, Kosten senken."), mkEx("Betrieb vs Unternehmen?", "Betrieb=Leistung; Unternehmen=Gesamteinheit.")],
        [mkEx("Nachhaltigkeit in IT?", "Green IT, Energie, Recycling."), mkEx("Nur guenstigster Preis?", "Nicht immer — TCO und Qualitaet.")],
        [mkEx("AP1: Sozialziel = Gewinnmaximierung?", "Falsch — Sozialziel = MA/Kunde/Image.")]
      ),
      commonMistakes: ["Nur Formalziele sehen.", "Betrieb und Unternehmen gleichsetzen."],
      revisionChecklist: ["Drei Zielarten.", "Beispiel je Ziel.", "IT-Entscheidung begruenden."],
      related: ["Sachziel", "Formalziel", "Nachhaltigkeit"]
    },

    "organisation-rechtsformen": {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Lesen Sie ein Organigramm.", "Erklaeren Sie Abteilung, Stelle, Verantwortung.", "Nennen Sie Rechtsformen wie GmbH und Einzelunternehmen."],
      introduction: ["Organisation klaert Zustaendigkeiten. Rechtsform klaert Haftung und Kapital.", "AP1: Organigramm und GmbH auf Grundniveau."],
      explanation: [
        { title: "Aufbauorganisation", paragraphs: ["Organigramm: Stellen, Abteilungen, Hierarchie.", "Helpdesk, Vertrieb, Entwicklung — getrennte Verantwortung.", "Klare Zustaendigkeit vermeidet Chaos."] },
        { title: "Rechtsformen", paragraphs: ["Einzelunternehmen: eine Person, volle Haftung.", "GmbH: Gesellschaft mit beschraenkter Haftung — Kapital, Haftung begrenzt.", "Rechtsform beeinflusst Haftung, Kapital, Vertretung."] }
      ],
      realWorldExamples: ["Ticket geht an Helpdesk — nicht an Vertrieb — wegen Organigramm."],
      practicalExamples: [{ title: "Organigramm lesen", paragraphs: ["Wer ist Vorgesetzter Helpdesk? Wer entscheidet Einkauf?"], steps: ["Abteilung finden.", "Stelle.", "Verantwortung.", "Ansprechpartner."] }],
      vocabulary: [mkVocab("Organigramm", "organograma", "Darstellung der Organisation.", "Abteilungen."), mkVocab("Abteilung", "departamento", "Organisationseinheit.", "Helpdesk."), mkVocab("Stelle", "cargo", "Position im Betrieb.", "IT-Techniker."), mkVocab("GmbH", "sociedade limitada", "Haftung beschraenkt.", "Kapital erforderlich."), mkVocab("Einzelunternehmen", "empresa individual", "Eine Person.", "Volle Haftung."), mkVocab("Haftung", "responsabilidade legal", "Rechtliche Verantwortung.", "GmbH begrenzt."), mkVocab("Vertretung", "representacao legal", "Wer darf unterschreiben.", "Geschaeftsfuehrer."), mkVocab("Verantwortung", "responsabilidade", "Zustaendigkeit.", "Klare Aufgaben.")],
      summary: ["Organigramm = Wer macht was.", "Rechtsform = Haftung/Kapital.", "GmbH vs Einzelunternehmen."],
      mindMap: "Organisation → Organigramm → Rechtsform → Haftung",
      exercises: curatedExercises(
        [mkEx("Organigramm?", "Grafische Darstellung der Organisation."), mkEx("GmbH — Haftung?", "Beschraenkt auf Gesellschaft."), mkEx("Abteilung Beispiel?", "Helpdesk, Vertrieb.")],
        [mkEx("Einzelunternehmen Haftung?", "Unbeschraenkt mit Privatvermoegen."), mkEx("Warum Organisation wichtig?", "Klare Zustaendigkeiten.")],
        [mkEx("AP1: GmbH = keine Kapitalanforderung?", "Falsch — Stammkapital erforderlich.")]
      ),
      commonMistakes: ["Organigramm mit Prozess verwechseln.", "Haftung bei GmbH unbegrenzt annehmen."],
      revisionChecklist: ["Organigramm lesen.", "GmbH erklaeren.", "Haftung vergleichen."],
      related: ["Organigramm", "GmbH", "Haftung"]
    },

    geschaeftsprozesse: {
      studyTime: "55-65 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie Geschaeftsprozess und Wertschoepfung.", "Unterscheiden Sie Kern-, Unterstuetzungs- und Fuehrungsprozess.", "Beschreiben Sie Input und Output."],
      introduction: ["Prozesse sind wiederholbare Ablaeufe mit Ziel und Ergebnis — nicht nur Task-Listen.", "AP1: Prozessarten und Kundennutzen."],
      explanation: [
        { title: "Prozessarten", paragraphs: ["Kernprozess: direkt Kundennutzen (Auftrag bearbeiten).", "Unterstuetzungsprozess: ermoeglicht Kern (Buchhaltung, IT).", "Fuehrungsprozess: Steuerung, Strategie."] },
        { title: "Input — Output", paragraphs: ["Input: Ausloeser, Daten, Material. Output: Ergebnis fuer Kunden.", "Wertschoepfung wenn Output Nutzen fuer Kunden schafft."] }
      ],
      realWorldExamples: ["Notebook-Auftrag: Beratung → Angebot → Beschaffung → Installation → Abnahme."],
      practicalExamples: [{ title: "Kernprozess JIKU", paragraphs: ["Kundenauftrag IT-Arbeitsplatz von Anfrage bis Uebergabe."], steps: ["Input.", "Schritte.", "Output.", "Kundennutzen."] }],
      vocabulary: [mkVocab("Geschaeftsprozess", "processo de negocio", "Wiederholbarer Ablauf.", "Mit Ziel."), mkVocab("Kernprozess", "processo core", "Direkt Kundennutzen.", "Auftrag."), mkVocab("Unterstuetzungsprozess", "processo de apoio", "Unterstuetzt Kern.", "HR, IT intern."), mkVocab("Fuehrungsprozess", "processo de gestao", "Steuerung.", "Planung."), mkVocab("Input", "entrada", "Eingabe des Prozesses.", "Kundenanfrage."), mkVocab("Output", "saida", "Ergebnis.", "Installierter PC."), mkVocab("Wertschoepfung", "criacao de valor", "Nutzen fuer Kunde.", "Funktionierender Arbeitsplatz."), mkVocab("Kundennutzen", "beneficio ao cliente", "Mehrwert.", "Zeitersparnis.")],
      summary: ["Kern/Unterstuetzung/Fuehrung.", "Input → Prozess → Output.", "Wertschoepfung = Kundennutzen."],
      mindMap: "Prozess → Kern/Support/Fuehrung → Input/Output",
      exercises: curatedExercises(
        [mkEx("Kernprozess?", "Direkt am Kundennutzen."), mkEx("Input/Output?", "Eingabe und Ergebnis eines Prozesses."), mkEx("Wertschoepfung?", "Nutzen fuer Kunden schaffen.")],
        [mkEx("Buchhaltung — Prozessart?", "Unterstuetzungsprozess."), mkEx("Beispiel Kernprozess JIKU?", "Kundenauftrag bearbeiten.")],
        [mkEx("AP1: Prozess = einmalige Aktion?", "Falsch — wiederholbarer Ablauf.")]
      ),
      commonMistakes: ["Prozess mit Projekt verwechseln.", "Nur Kernprozesse zaehlen lassen."],
      revisionChecklist: ["Drei Prozessarten.", "Input/Output Beispiel.", "Wertschoepfung."],
      related: ["Kernprozess", "Input", "Output", "Wertschoepfung"]
    },

    marktumfeld: {
      studyTime: "50-60 Minuten", stars: "★★★☆☆",
      objectives: ["Erklaeren Sie Markt, Angebot und Nachfrage.", "Beschreiben Sie Wettbewerb und Lieferanten.", "Verbinden Sie Markt mit IT-Angeboten."],
      introduction: ["IT-Entscheidungen entstehen im Marktumfeld — Preis, Verfuegbarkeit, Wettbewerb.", "AP1: einfache Marktbegriffe im Systemhauskontext."],
      explanation: [
        { title: "Marktgrundlagen", paragraphs: ["Angebot: was Anbieter bieten. Nachfrage: was Kunden wollen.", "Wettbewerb: mehrere Anbieter — Preis und Qualitaet variieren.", "Lieferant: liefert Produkte an JIKU."] }
      ],
      realWorldExamples: ["Laptop knapp — JIKU bietet Alternative mit aehnlicher Leistung."],
      practicalExamples: [{ title: "Angebotsvergleich", paragraphs: ["Marktpreis pruefen, Lieferzeit vergleichen."], steps: ["Angebot.", "Nachfrage.", "Alternative.", "Entscheidung."] }],
      vocabulary: [mkVocab("Markt", "mercado", "Ort der Angebot-Nachfrage-Beziehung.", "IT-Markt."), mkVocab("Angebot", "oferta", "Was angeboten wird.", "Notebooks."), mkVocab("Nachfrage", "demanda", "Bedarf der Kunden.", "Viele Laptops."), mkVocab("Wettbewerb", "concorrencia", "Konkurrenz.", "Mehrere Systemhaeuser."), mkVocab("Lieferant", "fornecedor", "Liefert an Betrieb.", "Grosshaendler."), mkVocab("Marktform", "forma de mercado", "Struktur des Marktes.", "Polypol, Monopol."), mkVocab("Preis", "preco", "Marktpreis.", "Beeinflusst Angebot."), mkVocab("Verfuegbarkeit", "disponibilidade", "Lieferbarkeit.", "Lagerbestand.")],
      summary: ["Angebot/Nachfrage/Wettbewerb.", "Lieferanten wichtig fuer JIKU.", "Markt beeinflusst IT-Angebote."],
      mindMap: "Markt → Angebot/Nachfrage → Wettbewerb → Lieferant",
      exercises: curatedExercises(
        [mkEx("Angebot vs Nachfrage?", "Anbieter vs Kundenbedarf."), mkEx("Lieferant?", "Liefert Waren an Betrieb."), mkEx("Wettbewerb?", "Mehrere Anbieter am Markt.")],
        [mkEx("Knappheit — Folge?", "Preis steigt oder Alternative noetig."), mkEx("Markt und IT-Angebot?", "Preis und Verfuegbarkeit beeinflussen Angebot.")],
        [mkEx("AP1: Monopol — viele Anbieter?", "Falsch — ein Anbieter dominiert.")]
      ),
      commonMistakes: ["Markt nur als Preis sehen.", "Lieferant und Kunde verwechseln."],
      revisionChecklist: ["Angebot/Nachfrage.", "Wettbewerb Beispiel.", "Lieferant."],
      related: ["Angebot", "Nachfrage", "Wettbewerb"]
    },

    "praesentation-teamarbeit": {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Planen Sie Praesentationen zielgruppengerecht.", "Erklaeren Sie Rollen in der Teamarbeit.", "Erstellen Sie Protokoll und Reflexion."],
      introduction: ["Praesentation und Teamarbeit sind Handlungsprodukte in LF1.", "AP1: Aufbau, Zielgruppe, Rollen, Feedback."],
      explanation: [
        { title: "Praesentation", paragraphs: ["Zielgruppe bestimmt Inhalt — Azubi-Kollegen vs Kunde.", "Aufbau: Einleitung — Hauptteil — Schluss. Weniger ist mehr.", "Ergebnisprotokoll dokumentiert Ergebnis."] },
        { title: "Teamarbeit", paragraphs: ["Rollen: Moderator, Protokoll, Zeitwachter, Fachbeitrag.", "Reflexion: Was lief gut? Was verbessern?"] }
      ],
      realWorldExamples: ["Team stellt JIKU in 5 Folien vor — danach Reflexion ueber Rollen."],
      practicalExamples: [{ title: "Team-Praesentation", paragraphs: ["Rollen verteilen, 10 Min, Protokoll, Feedback."], steps: ["Planen.", "Rollen.", "Praesentieren.", "Reflektieren."] }],
      vocabulary: [mkVocab("Praesentation", "apresentacao", "Vortrag vor Publikum.", "Zielgruppe."), mkVocab("Teamarbeit", "trabalho em equipe", "Gemeinsame Aufgabe.", "Rollen."), mkVocab("Zielgruppe", "publico-alvo", "Fuer wen Praesentation.", "Kunden vs Kollegen."), mkVocab("Protokoll", "protocolo", "Schriftliche Ergebnisdoku.", "Handlungsprodukt."), mkVocab("Reflexion", "reflexao", "Rueckblick auf Ablauf.", "Verbesserung."), mkVocab("Moderator", "moderador", "Leitet Diskussion.", "Teamrolle."), mkVocab("Feedback", "feedback", "Rueckmeldung.", "Konstruktiv."), mkVocab("Ergebnisprotokoll", "protocolo de resultados", "Dokumentiert Ergebnis.", "AP1 Produkt.")],
      summary: ["Zielgruppe bestimmt Inhalt.", "Teamrollen und Protokoll.", "Reflexion abschliessen."],
      mindMap: "Praesentation → Zielgruppe → Team → Protokoll → Reflexion",
      exercises: curatedExercises(
        [mkEx("Zielgruppe wichtig warum?", "Inhalt und Sprache anpassen."), mkEx("Protokoll?", "Dokumentiert Ergebnis der Arbeit."), mkEx("Teamrolle Beispiel?", "Moderator, Protokollfuehrer.")],
        [mkEx("Gute Praesentation?", "Klar, strukturiert, passend zur Zielgruppe."), mkEx("Reflexion Inhalt?", "Ablauf, Rollen, Verbesserung.")],
        [mkEx("AP1: Alles in Praesentation?", "Falsch — Wesentliches fuer Zielgruppe.")]
      ),
      commonMistakes: ["Zu viel Text auf Folien.", "Reflexion weglassen."],
      revisionChecklist: ["Zielgruppe.", "Teamrollen.", "Protokoll/Reflexion."],
      related: ["Praesentation", "Teamarbeit", "Protokoll"]
    },

    datenschutz: {
      studyTime: "55-65 Minuten", stars: "★★★★★",
      objectives: ["Unterscheiden Sie Datenschutz und Datensicherheit.", "Erklaeren Sie personenbezogene Daten und DSGVO-Grundideen.", "Nennen Sie Zweckbindung und Loeschung."],
      introduction: ["Datenschutz schuetzt Personen — nicht nur Systeme.", "AP1: DSGVO, personenbezogene Daten, Zweckbindung."],
      explanation: [
        { title: "Datenschutz vs Datensicherheit", paragraphs: ["Datenschutz: Recht auf Schutz personenbezogener Daten (DSGVO).", "Datensicherheit: technischer Schutz aller Daten/Systeme (CIA).", "Beides wichtig — unterschiedliche Fragestellung."] },
        { title: "Grundprinzipien", paragraphs: ["Zweckbindung: nur fuer festgelegten Zweck nutzen.", "Datenminimierung: nur noetige Daten.", "Loeschung wenn nicht mehr noetig. Einwilligung wo erforderlich."] }
      ],
      realWorldExamples: ["Helpdesk sieht Kundendaten nur fuer Ticket — nicht fuer Privatzwecke."],
      practicalExamples: [{ title: "Support-Ticket", paragraphs: ["Nur noetige Kundendaten oeffnen, danach nicht speichern."], steps: ["Zweck pruefen.", "Minimieren.", "Zugriff.", "Loeschen."] }],
      vocabulary: [mkVocab("Datenschutz", "protecao de dados", "Schutz personenbezogener Daten.", "DSGVO."), mkVocab("personenbezogene Daten", "dados pessoais", "Daten identifizierbarer Person.", "Name, E-Mail."), mkVocab("DSGVO", "RGPD", "EU-Datenschutzverordnung.", "Rechtliche Basis."), mkVocab("Zweckbindung", "limitacao de finalidade", "Nur fuer festen Zweck.", "Supportfall."), mkVocab("Loeschung", "eliminacao", "Daten entfernen wenn unnoetig.", "Aufbewahrungsfrist."), mkVocab("Einwilligung", "consentimento", "Zustimmung der Person.", "Newsletter."), mkVocab("Datensicherheit", "seguranca de dados", "Technischer Schutz.", "Verschluesselung."), mkVocab("Datenminimierung", "minimizacao de dados", "Nur noetige Daten.", "Weniger ist mehr.")],
      summary: ["Datenschutz = Personen/DSGVO.", "Datensicherheit = Technik/CIA.", "Zweckbindung und Loeschung."],
      mindMap: "Datenschutz → personenbezogen → DSGVO → Zweckbindung",
      exercises: curatedExercises(
        [mkEx("Datenschutz vs Datensicherheit?", "Recht/Person vs Technik/System."), mkEx("personenbezogene Daten?", "Daten zu identifizierbarer Person."), mkEx("Zweckbindung?", "Nur fuer festgelegten Zweck nutzen.")],
        [mkEx("Helpdesk sieht Kundendaten — wann ok?", "Nur wenn fuer Ticket noetig."), mkEx("DSGVO?", "Datenschutz-Grundverordnung EU.")],
        [mkEx("AP1: Datensicherheit = Datenschutz?", "Falsch — verwandt aber unterschiedlich.")]
      ),
      commonMistakes: ["Datenschutz und Security gleichsetzen.", "Daten unbegrenzt speichern."],
      revisionChecklist: ["Unterschied Datenschutz/Sicherheit.", "DSGVO Grundideen.", "Zweckbindung Beispiel."],
      related: ["DSGVO", "personenbezogene Daten", "Zweckbindung"]
    },

    "it-grundschutz": {
      studyTime: "55-65 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie IT-Grundschutz als systematischen Ansatz.", "Nennen Sie Sicherheitsleitlinie und Sicherheitsprozess.", "Beschreiben Sie Massnahmen und Kontrolle."],
      introduction: ["IT-Grundschutz (BSI) strukturiert Informationssicherheit im Unternehmen.", "AP1: Grundidee — kein BSI-Expertenwissen."],
      explanation: [
        { title: "Sicherheitsprozess", paragraphs: ["Leitlinie: Sicherheitsziele der Unternehmensleitung.", "Schutzbedarf feststellen → Massnahmen waehlen → umsetzen → kontrollieren.", "Dauerhafter Prozess, kein einmaliges Projekt."] }
      ],
      realWorldExamples: ["Unternehmen definiert Leitlinie, prueft Schutzbedarf fuer Server und Clients."],
      practicalExamples: [{ title: "Grundschutz-Zyklus", paragraphs: ["Leitlinie → Analyse → Massnahme → Kontrolle → verbessern."], steps: ["Leitlinie.", "Schutzbedarf.", "Massnahme.", "Audit."] }],
      vocabulary: [mkVocab("IT-Grundschutz", "IT-Grundschutz BSI", "Systematischer Sicherheitsansatz.", "BSI Standard."), mkVocab("Sicherheitsleitlinie", "politica de seguranca", "Vorgabe der Leitung.", "Sicherheitsziele."), mkVocab("Sicherheitsprozess", "processo de seguranca", "Dauerhafter Zyklus.", "Plan-Do-Check."), mkVocab("Massnahme", "medida", "Konkrete Schutzaktion.", "Patch, Backup."), mkVocab("Kontrolle", "controle", "Pruefen ob wirksam.", "Audit."), mkVocab("BSI", "BSI", "Bundesamt fuer Sicherheit.", "IT-Grundschutz Herausgeber."), mkVocab("Standard", "padrao", "Vorgehensweise.", "Grundschutz-Katalog."), mkVocab("Organisation", "organizacao", "Prozesse und Rollen.", "Nicht nur Technik.")],
      summary: ["IT-Grundschutz = systematisch.", "Leitlinie → Schutzbedarf → Massnahme → Kontrolle.", "Dauerhafter Prozess."],
      mindMap: "Grundschutz → Leitlinie → Schutzbedarf → Massnahme → Kontrolle",
      exercises: curatedExercises(
        [mkEx("IT-Grundschutz?", "Systematischer Ansatz fuer Informationssicherheit."), mkEx("Sicherheitsleitlinie?", "Vorgaben der Unternehmensleitung."), mkEx("Sicherheitsprozess?", "Dauerhafter Zyklus von Analyse bis Kontrolle.")],
        [mkEx("Einmalige Massnahme reicht?", "Nein — dauerhafter Prozess."), mkEx("BSI?", "Bundesamt fuer Sicherheit in der Informationstechnik.")],
        [mkEx("AP1: Grundschutz nur Technik?", "Falsch — Organisation und Prozesse auch.")]
      ),
      commonMistakes: ["Grundschutz als einmaliges Projekt.", "Nur Firewall = Grundschutz."],
      revisionChecklist: ["Prozess erklaeren.", "Leitlinie.", "Massnahme + Kontrolle."],
      related: ["IT-Grundschutz", "Sicherheitsleitlinie", "Schutzbedarf"]
    },

    schutzbedarf: {
      studyTime: "55-65 Minuten", stars: "★★★★★",
      objectives: ["Erklaeren Sie Schutzbedarfsfeststellung.", "Ordne normal, hoch, sehr hoch ein.", "Bewerten Sie CIA-Schutzziele."],
      introduction: ["Schutzbedarf = wie schlimm waere Schaden — nicht Wahrscheinlichkeit.", "AP1: Kundendatenbank hoher Schutzbedarf Vertraulichkeit."],
      explanation: [
        { title: "Feststellung", paragraphs: ["Bewertung pro Anwendung/System: Vertraulichkeit, Integritaet, Verfuegbarkeit.", "Stufen: normal, hoch, sehr hoch.", "Hoher Schutzbedarf → staerkere Massnahmen."] }
      ],
      realWorldExamples: ["Kundendatenbank: Vertraulichkeit sehr hoch — Verschluesselung, Zugriffskontrolle."],
      practicalExamples: [{ title: "Schutzbedarf Server", paragraphs: ["Webserver oeffentlich vs Intranet-Server mit Personaldaten."], steps: ["Asset.", "CIA bewerten.", "Stufe.", "Massnahme."] }],
      vocabulary: [mkVocab("Schutzbedarf", "necessidade de protecao", "Moegliche Schadenshoehe.", "normal/hoch/sehr hoch."), mkVocab("Schutzbedarfsfeststellung", "determinacao de protecao", "Methodische Bewertung.", "Grundschutz."), mkVocab("normal", "normal", "Standard-Schutzniveau.", "Buero-PC."), mkVocab("hoch", "alto", "Erhoehter Schutz.", "Kundendaten."), mkVocab("sehr hoch", "muito alto", "Maximaler Schutz.", "Personaldaten, Gesundheit."), mkVocab("Schadensauswirkung", "impacto do dano", "Folge eines Schadens.", "Image, Geld, Recht."), mkVocab("Asset", "ativo", "Zu schuetzendes Objekt.", "Server, DB."), mkVocab("CIA", "triade CIA", "Vertraulichkeit, Integritaet, Verfuegbarkeit.", "Bewertungsdimension.")],
      summary: ["Schutzbedarf = Schadenshoehe.", "CIA je Asset bewerten.", "Stufe bestimmt Massnahmen."],
      mindMap: "Schutzbedarf → CIA → normal/hoch/sehr hoch → Massnahme",
      exercises: curatedExercises(
        [mkEx("Schutzbedarf misst?", "Schadenshoehe, nicht Wahrscheinlichkeit."), mkEx("Stufen?", "normal, hoch, sehr hoch."), mkEx("Kundendaten Vertraulichkeit?", "Oft hoch oder sehr hoch.")],
        [mkEx("Schutzbedarf vs Risiko?", "Schutzbedarf=Schaden; Risiko=Wahrscheinlichkeit x Schaden."), mkEx("Verfuegbarkeit Server Produktion?", "Oft hoch — Ausfall teuer.")],
        [mkEx("AP1: normal = keine Massnahmen?", "Falsch — Standardmassnahmen trotzdem.")]
      ),
      commonMistakes: ["Schutzbedarf mit Risiko verwechseln.", "Alles 'hoch' einstufen ohne Begruendung."],
      revisionChecklist: ["Schutzbedarf definieren.", "CIA Bewertung.", "Stufen."],
      related: ["Schutzbedarf", "CIA", "Massnahme"]
    },

    bedrohungen: {
      studyTime: "55-65 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie Bedrohung, Schwachstelle und Risiko.", "Nennen Sie technische und menschliche Bedrohungen.", "Verbinden Sie mit Massnahmen."],
      introduction: ["Risiko entsteht wenn Bedrohung Schwachstelle ausnutzt und Schaden moeglich ist.", "AP1: Malware, ungepatcht, menschlicher Fehler."],
      explanation: [
        { title: "Risikomodell", paragraphs: ["Bedrohung: z.B. Malware, Diebstahl, Feuer, Insider.", "Schwachstelle: ungepatchter Server, schwaches Passwort.", "Risiko = Eintritt x Schaden. Massnahme reduziert Risiko."] }
      ],
      realWorldExamples: ["Ungepatchter Server + Ransomware-Bedrohung = hohes Risiko."],
      practicalExamples: [{ title: "Risikoanalyse", paragraphs: ["Bedrohung identifizieren, Schwachstelle schliessen, Massnahme dokumentieren."], steps: ["Asset.", "Bedrohung.", "Schwachstelle.", "Massnahme."] }],
      vocabulary: [mkVocab("Bedrohung", "ameaca", "Potenzielle Gefahr.", "Malware, Diebstahl."), mkVocab("Schwachstelle", "vulnerabilidade", "Schwache Stelle.", "Ungepatcht."), mkVocab("Risiko", "risco", "Eintritt x Schaden.", "Bewertbar."), mkVocab("Schaden", "dano", "Folge eines Ereignisses.", "Datenverlust."), mkVocab("Massnahme", "medida", "Risiko reduzieren.", "Patch, Backup."), mkVocab("Malware", "malware", "Schadsoftware.", "Ransomware."), mkVocab("Insider", "insider", "Bedrohung von innen.", "Mitarbeiter."), mkVocab("Schadensszenario", "cenario de dano", "Moeglicher Schadensablauf.", "Was passiert wenn...")],
      summary: ["Bedrohung + Schwachstelle = Risiko.", "Massnahmen reduzieren Risiko.", "Technisch und menschlich."],
      mindMap: "Bedrohung → Schwachstelle → Risiko → Massnahme",
      exercises: curatedExercises(
        [mkEx("Bedrohung vs Schwachstelle?", "Gefahr vs schwache Stelle im System."), mkEx("Risiko?", "Eintrittswahrscheinlichkeit und Schaden."), mkEx("Massnahme Beispiel?", "Patch, Backup, Schulung.")],
        [mkEx("Ungepatchter Server?", "Schwachstelle."), mkEx("Ransomware?", "Bedrohung.")],
        [mkEx("AP1: Risiko = nur Technik?", "Falsch — auch organisatorisch/menschlich.")]
      ),
      commonMistakes: ["Bedrohung und Schwachstelle verwechseln.", "Risiko ignorieren."],
      revisionChecklist: ["Drei Begriffe.", "Beispielkette.", "Massnahme."],
      related: ["Bedrohung", "Schwachstelle", "Risiko"]
    },

    "social-engineering": {
      studyTime: "50-60 Minuten", stars: "★★★★★",
      objectives: ["Erklaeren Sie Social Engineering und Phishing.", "Nennen Sie Erkennungsmerkmale und Gegenmassnahmen.", "Beschreiben Sie MFA und Sensibilisierung."],
      introduction: ["Nicht jeder Angriff ist technisch — Taeuschung nutzt Vertrauen.", "AP1: Phishing, Anrufer als Admin, Gegenmassnahmen."],
      explanation: [
        { title: "Methoden", paragraphs: ["Phishing: gefaelschte E-Mail/Link. Vishing: Telefon.", "Pretexting: erfundene Geschichte. Druck und Autoritaet.", "Identitaetsdiebstahl: Daten stehlen, sich ausgeben."] },
        { title: "Gegenmassnahmen", paragraphs: ["Schulung, Skepsis bei Druck, keine Passwoerter am Telefon.", "MFA, klare Prozesse, Meldeweg fuer Verdacht."] }
      ],
      realWorldExamples: ["Anrufer als 'IT-Admin' fragt Passwort — immer verifizieren, nie geben."],
      practicalExamples: [{ title: "Phishing-Mail", paragraphs: ["Link pruefen, Absender, Druck erkennen, melden."], steps: ["Verdaechtig?", "Nicht klicken.", "Melden.", "Schulen."] }],
      vocabulary: [mkVocab("Social Engineering", "engenharia social", "Manipulation von Menschen.", "Vertrauen ausnutzen."), mkVocab("Phishing", "phishing", "Gefaelschte Nachrichten.", "E-Mail mit Link."), mkVocab("Identitaetsdiebstahl", "roubo de identidade", "Identitaet stehlen/nutzen.", "Gefaehrlich."), mkVocab("MFA", "autenticacao multifator", "Mehrfaktor-Authentifizierung.", "Zusatzsicherheit."), mkVocab("Sensibilisierung", "conscientizacao", "Schulung der Mitarbeiter.", "Awareness."), mkVocab("Vishing", "vishing", "Phishing per Telefon.", "Anruf."), mkVocab("Verifikation", "verificacao", "Identitaet pruefen.", "Zurueckrufen."), mkVocab("Meldeprozess", "processo de reporte", "Verdaechtiges melden.", "IT-Security.")],
      summary: ["Social Engineering = menschliche Schwachstelle.", "Phishing erkennen.", "MFA + Schulung + Prozesse."],
      mindMap: "Social Engineering → Phishing → MFA → Schulung",
      exercises: curatedExercises(
        [mkEx("Social Engineering?", "Manipulation von Menschen statt Technik."), mkEx("Phishing?", "Gefaelschte Nachricht zum Datendiebstahl."), mkEx("MFA?", "Mehrfaktor-Authentifizierung.")],
        [mkEx("'Admin ruft an, will Passwort'?", "Verweigern und offiziell verifizieren."), mkEx("Gegenmassnahme?", "Schulung, MFA, Meldeprozess.")],
        [mkEx("AP1: Passwort am Telefon ok wenn nett?", "Falsch — nie Passwoerter weitergeben.")]
      ),
      commonMistakes: ["Nur technische Schutzmechanismen.", "Phishing-Link klicken aus Neugier."],
      revisionChecklist: ["Phishing erkennen.", "MFA erklaeren.", "Reaktion auf Anruf."],
      related: ["Phishing", "MFA", "Sensibilisierung"]
    },

    tom: {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie technisch-organisatorische Massnahmen (TOM).", "Ordne Zugriffskontrolle, Verschluesselung, Backup zu.", "Verbinden Sie Technik und Organisation."],
      introduction: ["TOM sind konkrete Schutzmassnahmen — technisch UND organisatorisch.", "AP1: Beispiele zuordnen."],
      explanation: [
        { title: "TOM-Beispiele", paragraphs: ["Technisch: Verschluesselung, Firewall, Backup, Protokollierung.", "Organisatorisch: Schulung, Richtlinien, Zutrittskontrolle, Rollen.", "Beides zusammen wirksam."] }
      ],
      realWorldExamples: ["Dateiablage: Berechtigungen + Backup + Anweisung fuer Mitarbeiter."],
      practicalExamples: [{ title: "TOM-Liste", paragraphs: ["Fuer Laptop: BitLocker, Passwort, Schulung, Diebstahl melden."], steps: ["Asset.", "TOM technisch.", "TOM organisatorisch.", "Doku."] }],
      vocabulary: [mkVocab("TOM", "medidas tecnicas e organizacionais", "Technisch-organisatorische Massnahmen.", "DSGVO-Begriff."), mkVocab("Zugriffskontrolle", "controle de acesso", "Wer darf zugreifen.", "Least Privilege."), mkVocab("Verschluesselung", "criptografia", "Daten unlesbar ohne Schluessel.", "BitLocker."), mkVocab("Protokollierung", "registro/log", "Aktivitaeten aufzeichnen.", "Audit."), mkVocab("Zutrittskontrolle", "controle de acesso fisico", "Physischer Zugang.", "Serverraum."), mkVocab("Schulung", "treinamento", "Organisatorische Massnahme.", "Awareness."), mkVocab("Backup", "backup", "Technische Massnahme.", "Wiederherstellung."), mkVocab("Richtlinie", "politica", "Organisatorische Vorgabe.", "Passwortrichtlinie.")],
      summary: ["TOM = technisch + organisatorisch.", "Beispiele zuordnen.", "Technik allein reicht nicht."],
      mindMap: "TOM → technisch → organisatorisch → Backup/Schulung",
      exercises: curatedExercises(
        [mkEx("TOM?", "Technisch-organisatorische Massnahmen."), mkEx("Technisches TOM?", "Verschluesselung, Firewall, Backup."), mkEx("Organisatorisches TOM?", "Schulung, Richtlinie, Zutritt.")],
        [mkEx("Nur Firewall reicht?", "Nein — auch Organisation."), mkEx("Protokollierung wofuer?", "Nachvollziehbarkeit, Audit.")],
        [mkEx("AP1: Schulung ist TOM?", "Ja — organisatorische Massnahme.")]
      ),
      commonMistakes: ["TOM nur technisch.", "Backup ohne Test."],
      revisionChecklist: ["TOM definieren.", "Je 2 Beispiele tech/org.", "Asset zuordnen."],
      related: ["TOM", "Verschluesselung", "Zugriffskontrolle"]
    },

    sicherheitskonzept: {
      studyTime: "55-65 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie Aufbau eines Sicherheitskonzepts.", "Verbinden Sie Schutzbedarf, Risiken und Massnahmen.", "Beschreiben Sie Verantwortlichkeiten und Kontrolle."],
      introduction: ["Sicherheitskonzept dokumentiert Ziele, Schutzbedarf, Risiken und Massnahmen.", "AP1: Zusammenhang verstehen, nicht nur Begriffe."],
      explanation: [
        { title: "Inhalte", paragraphs: ["Schutzbedarf je System, Risikoanalyse, Massnahmenplan.", "Verantwortliche, Kontrollen, Review-Datum.", "Lebendes Dokument — regelmaessig aktualisieren."] }
      ],
      realWorldExamples: ["Mobile Datentraeger: Verschluesselung, Ausgabeprozess, Verlustmeldung im Konzept."],
      practicalExamples: [{ title: "Konzept-Skizze", paragraphs: ["Asset → Schutzbedarf → Risiko → Massnahme → Verantwortlicher."], steps: ["Scope.", "Analyse.", "Massnahmen.", "Kontrolle."] }],
      vocabulary: [mkVocab("Sicherheitskonzept", "conceito de seguranca", "Dokumentiert Sicherheitsmassnahmen.", "Gesamtplan."), mkVocab("Massnahmenplan", "plano de medidas", "Konkrete Massnahmen.", "Umsetzung."), mkVocab("Verantwortlichkeit", "responsabilidade", "Wer ist zustaendig.", "CISO, IT-Leiter."), mkVocab("Kontrolle", "controle", "Wirksamkeit pruefen.", "Audit."), mkVocab("Risikoanalyse", "analise de risco", "Teil des Konzepts.", "Bedrohungen."), mkVocab("Review", "revisao", "Regelmaessige Pruefung.", "Jaehrlich."), mkVocab("Scope", "escopo", "Was ist abgedeckt.", "Server, Clients."), mkVocab("Dokumentation", "documentacao", "Nachvollziehbarkeit.", "Pflicht.")],
      summary: ["Konzept = Schutzbedarf + Risiko + Massnahmen.", "Verantwortliche und Kontrolle.", "Dokumentieren und pflegen."],
      mindMap: "Konzept → Schutzbedarf → Risiko → Massnahme → Kontrolle",
      exercises: curatedExercises(
        [mkEx("Sicherheitskonzept?", "Dokument mit Zielen, Schutzbedarf, Massnahmen."), mkEx("Warum dokumentieren?", "Nachvollziehbar, pruefbar, Verantwortung."), mkEx("Verantwortlichkeit?", "Klare Zustaendigkeit fuer Massnahmen.")],
        [mkEx("Konzept einmal schreiben reicht?", "Nein — regelmaessig aktualisieren."), mkEx("Schutzbedarf im Konzept?", "Ja — Basis fuer Massnahmen.")],
        [mkEx("AP1: Konzept ohne Kontrolle?", "Unvollstaendig — Kontrolle ist Pflicht.")]
      ),
      commonMistakes: ["Konzept als Formular ohne Inhalt.", "Keine Verantwortlichen."],
      revisionChecklist: ["Konzept-Inhalte.", "Schutzbedarf-Risiko-Massnahme Kette.", "Kontrolle."],
      related: ["Sicherheitskonzept", "Schutzbedarf", "Massnahmenplan"]
    },

    seguranca: {
      studyTime: "50-60 Minuten", stars: "★★★★☆",
      objectives: ["Erklaeren Sie CIA-Triade auf AP1-Niveau.", "Unterscheiden Sie Authentifizierung und Autorisierung.", "Nennen Sie typische Schutzmassnahmen."],
      introduction: ["Seguranca da informacao — Vertraulichkeit, Integridade, Disponibilidade.", "AP1 module: Authentifizierung vs Autorisierung."],
      explanation: [
        { title: "CIA und Zugang", paragraphs: ["Vertraulichkeit: nur Berechtigte. Integritaet: unveraendert. Verfuegbarkeit: nutzbar.", "Authentifizierung: Wer bist du? (Login). Autorisierung: Was darfst du? (Rechte).", "Massnahmen: Passwort, MFA, Firewall, Backup, Updates, Schulung."] }
      ],
      realWorldExamples: ["Login korrekt (Auth) aber keine Admin-Rechte (Autorisierung verweigert)."],
      practicalExamples: [{ title: "Helpdesk-Zugang", paragraphs: ["Auth per AD, Autorisierung nur Ticket-System — kein Lohnbereich."], steps: ["Login.", "Rechte pruefen.", "Least Privilege.", "Log."] }],
      vocabulary: [mkVocab("Vertraulichkeit", "confidencialidade", "Nur Berechtigte.", "CIA."), mkVocab("Integritaet", "integridade", "Daten korrekt.", "CIA."), mkVocab("Verfuegbarkeit", "disponibilidade", "System nutzbar.", "CIA."), mkVocab("Authentifizierung", "autenticacao", "Identitaet pruefen.", "Login."), mkVocab("Autorisierung", "autorizacao", "Rechte pruefen.", "Zugriff erlaubt?"), mkVocab("Firewall", "firewall", "Netzwerkfilter.", "Schutz."), mkVocab("Least Privilege", "minimo privilegio", "Nur noetige Rechte.", "Sicherheitsprinzip."), mkVocab("Verschluesselung", "criptografia", "Vertraulichkeit schuetzen.", "TLS, BitLocker.")],
      summary: ["CIA = Kern der Seguranca.", "Auth vs Autorisierung.", "Technik + Mensch + Prozesse."],
      mindMap: "Seguranca → CIA → Auth/Autorisierung → Massnahmen",
      exercises: curatedExercises(
        [mkEx("CIA?", "Vertraulichkeit, Integritaet, Verfuegbarkeit."), mkEx("Authentifizierung vs Autorisierung?", "Wer vs Was darf."), mkEx("Firewall?", "Filtert Netzwerkverkehr.")],
        [mkEx("Ransomware — welches Schutzziel?", "Verfuegbarkeit und Integritaet."), mkEx("Least Privilege?", "Minimale noetige Rechte.")],
        [mkEx("AP1: Authentifizierung = Autorisierung?", "Falsch — Login vs Rechte.")]
      ),
      commonMistakes: ["Auth und Autorisierung verwechseln.", "Nur Technik ohne Schulung."],
      revisionChecklist: ["CIA.", "Auth vs Autorisierung.", "3 Massnahmen."],
      related: ["Vertraulichkeit", "Authentifizierung", "Autorisierung"]
    },

    "softwareentwicklung-umfeld": {
      studyTime: "50-60 Minuten", stars: "★★★☆☆",
      objectives: ["Beschreiben Sie Phasen und Rollen in Softwareprojekten.", "Unterscheiden Sie Neuentwicklung und Anpassung.", "Erklaeren Sie Teamarbeit in der Entwicklung."],
      introduction: ["Softwareentwicklung ist mehr als Code — Analyse, Test, Doku, Kommunikation.", "AP1: Projekt, Rollen, Anpassung vs Neubau."],
      explanation: [
        { title: "Projekt und Rollen", paragraphs: ["Phasen: Analyse, Entwurf, Implementierung, Test, Einfuehrung, Wartung.", "Rollen: Entwickler, Tester, Fachkraft, Projektleitung.", "Anpassung: bestehende Software erweitern. Neuentwicklung: von Grund auf."] }
      ],
      realWorldExamples: ["Kunde braucht neue Auswertung — Entwickler passt bestehende App an."],
      practicalExamples: [{ title: "Anpassungsprojekt", paragraphs: ["Anforderung klaeren, Code aendern, testen, dokumentieren."], steps: ["Analyse.", "Entwurf.", "Code.", "Test."] }],
      vocabulary: [mkVocab("Softwareentwicklung", "desenvolvimento de software", "Erstellung und Pflege von Software.", "Ganzheitlich."), mkVocab("Projekt", "projeto", "Zeitlich begrenzte Aufgabe.", "Mit Ziel."), mkVocab("Anpassung", "adaptacao", "Bestehende Software aendern.", "Erweiterung."), mkVocab("Neuentwicklung", "novo desenvolvimento", "Software von Grund auf.", "Greenfield."), mkVocab("Entwickler", "desenvolvedor", "Programmiert und entwirft.", "Rolle."), mkVocab("Tester", "testador", "Prueft Software.", "QA."), mkVocab("Wartung", "manutencao", "Phase nach Einfuehrung.", "Bugfixes."), mkVocab("Dokumentation", "documentacao", "Teil der Entwicklung.", "Nicht optional.")],
      summary: ["Entwicklung = ganzer Prozess.", "Anpassung vs Neuentwicklung.", "Team und Rollen."],
      mindMap: "SW-Entwicklung → Phasen → Rollen → Anpassung/Neu",
      exercises: curatedExercises(
        [mkEx("Softwareentwicklung nur Code?", "Nein — Analyse, Test, Doku auch."), mkEx("Anpassung?", "Bestehende Software erweitern."), mkEx("Tester Rolle?", "Qualitaet pruefen.")],
        [mkEx("Phasen nennen?", "Analyse, Entwurf, Implementierung, Test, Wartung."), mkEx("Neuentwicklung vs Anpassung?", "Neu=von Grund; Anpassung=bestehend.")],
        [mkEx("AP1: Doku erst am Ende?", "Schlecht — frueh mitdenken.")]
      ),
      commonMistakes: ["Nur Programmieren zaehlen.", "Test vernachlaessigen."],
      revisionChecklist: ["Phasen.", "Rollen.", "Anpassung Beispiel."],
      related: ["Softwareentwicklung", "Projekt", "Test"]
    },

    "daten-informationen": {
      studyTime: "45-55 Minuten", stars: "★★★★☆",
      objectives: ["Unterscheiden Sie Daten und Informationen.", "Erklaeren Sie Kontext und Bedeutung.", "Verbinden Sie mit Datenbanken und Datenschutz."],
      introduction: ["Daten sind rohe Zeichen — Information entsteht durch Kontext.", "AP1: 42 vs 42 Monitore Lagerbestand."],
      explanation: [
        { title: "Unterschied", paragraphs: ["Datum: Zeichen oder Wert ohne Kontext (42, A, 1010).", "Information: Daten mit Bedeutung im Kontext (42 Monitore auf Lager).", "Wichtig fuer DB, Auswertung, Datenschutz — was bedeutet das Feld?"] }
      ],
      realWorldExamples: ["CSV-Spalte 'Wert' — erst Kontext (Preis? Anzahl?) macht Information."],
      practicalExamples: [{ title: "Lagerbestand", paragraphs: ["42 = Datum. '42 Stueck Monitor Modell X' = Information."], steps: ["Rohwert.", "Kontext.", "Information.", "Entscheidung."] }],
      vocabulary: [mkVocab("Daten", "dados", "Zeichen/Werte ohne Kontext.", "42, ABC."), mkVocab("Information", "informacao", "Daten mit Bedeutung.", "42 Monitore."), mkVocab("Kontext", "contexto", "Macht Bedeutung.", "Lager, Preis."), mkVocab("Auswertung", "analise", "Information nutzen.", "Report."), mkVocab("Datenqualitaet", "qualidade dos dados", "Korrektheit/Vollstaendigkeit.", "Wichtig."), mkVocab("Metadaten", "metadados", "Daten ueber Daten.", "Erstellungsdatum."), mkVocab("Strukturiert", "estruturado", "In Feldern/Tabellen.", "DB."), mkVocab("Bedeutung", "significado", "Semantik der Information.", "Kontext.")],
      summary: ["Daten + Kontext = Information.", "Fuer DB und Datenschutz wichtig.", "Qualitaet und Bedeutung."],
      mindMap: "Daten → Kontext → Information → Auswertung",
      exercises: curatedExercises(
        [mkEx("Daten vs Information?", "Roh vs mit Bedeutung."), mkEx("42 als Datum?", "Ja — ohne Kontext."), mkEx("Kontext?", "Macht aus Daten Information.")],
        [mkEx("1010 binaer?", "Daten — Information: dezimal 10."), mkEx("Warum wichtig in DB?", "Felder muessen Bedeutung haben.")],
        [mkEx("AP1: Alle Daten sind Information?", "Falsch — erst mit Kontext.")]
      ),
      commonMistakes: ["Daten und Information gleichsetzen.", "Kontext ignorieren."],
      revisionChecklist: ["Unterschied erklaeren.", "Beispiel 42.", "DB-Bezug."],
      related: ["Daten", "Information", "Kontext"]
    },

    zahlensysteme: {
      studyTime: "55-70 Minuten", stars: "★★★★☆",
      objectives: ["Rechnen Sie einfache Binaer- und Hex-Zahlen.", "Erklaeren Sie Bit, Byte und Oktett.", "Verbinden Sie mit IPv4 und Speicher."],
      introduction: ["Computer arbeiten binaer — Menschen nutzen dezimal und hex.", "AP1: 1010 binaer = 10 dezimal; Bit/Byte; IPv4-Oktette."],
      explanation: [
        { title: "Systeme", paragraphs: ["Binaer: Basis 2 (0,1). Dezimal: Basis 10. Hex: Basis 16 (0-9,A-F).", "Bit = kleinste Einheit. Byte = 8 Bit. 1024 Byte = 1 KiB (often 1000 in Marketing).", "IPv4: vier Oktette dezimal — jede 0-255 (= 8 Bit)."] },
        { title: "Umrechnung", paragraphs: ["Binaer 1010: 1×8 + 0×4 + 1×2 + 0×1 = 10 dezimal.", "Hex FF = 255 dezimal = 11111111 binaer.", "AP1: kleine Umrechnungen und Zuordnung."] }
      ],
      realWorldExamples: ["MAC-Adresse oft hex. IPv4 Oktett 192 = 11000000 binaer."],
      practicalExamples: [{ title: "Binaer ueben", paragraphs: ["1010 → 10. 1111 → 15. 10000000 → 128."], steps: ["Stellenwerte.", "Summieren.", "Pruefen.", "Hex optional."] }],
      vocabulary: [mkVocab("Bit", "bit", "Kleinste Dateneinheit.", "0 oder 1."), mkVocab("Byte", "byte", "8 Bit.", "Speichereinheit."), mkVocab("binaer", "binario", "Basis 2.", "1010."), mkVocab("dezimal", "decimal", "Basis 10.", "Alltag."), mkVocab("hexadezimal", "hexadecimal", "Basis 16.", "FF, A0."), mkVocab("Oktett", "octeto", "8 Bit — ein IPv4-Teil.", "192."), mkVocab("Stellenwert", "valor posicional", "Position bestimmt Wert.", "Binaer 8-4-2-1."), mkVocab("Umrechnung", "conversao", "Zwischen Systemen.", "Binaer→Dezimal.")],
      summary: ["Binaer/Dezimal/Hex.", "Bit, Byte, Oktett.", "Einfache Umrechnung AP1."],
      mindMap: "Zahlensysteme → Binaer → Bit/Byte → IPv4 Oktett",
      exercises: curatedExercises(
        [mkEx("Wie viele Bit in Byte?", "8."), mkEx("1010 binaer dezimal?", "10."), mkEx("IPv4 Oktett Bits?", "8 (= 0-255).")],
        [mkEx("1111 binaer?", "15."), mkEx("Hex FF dezimal?", "255."), mkEx("Bit vs Byte?", "Bit kleinste; Byte 8 Bit.")],
        [mkEx("AP1: 256 in einem Oktett?", "Falsch — max 255.")]
      ),
      commonMistakes: ["Bit und Byte verwechseln.", "Stellenwerte falsch summieren."],
      revisionChecklist: ["1010=10.", "Bit/Byte.", "Oktett IPv4."],
      related: ["Bit", "Byte", "binaer", "hexadezimal"]
    }
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
  },

  "python-grundlagen": {
    studyTime: "55-70 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Lesen und erklaeren Sie einfache Python-Programme.",
      "Unterscheiden Sie Variable, Datentyp, Eingabe und Ausgabe.",
      "Erkennen Sie Operatoren, Kommentare und typische Fehlermeldungen."
    ],
    introduction: [
      "Python ist im Lernfeld 5 die Einstiegssprache fuer algorithmisches Denken und Datenverarbeitung.",
      "AP1 prueft oft Code-Leseaufgaben: Was passiert, welche Ausgabe entsteht, wo ist der Fehler?"
    ],
    explanation: [
      {
        title: "Grundbausteine",
        paragraphs: [
          "Variable speichert einen Wert: name = 'Anna'. Datentypen: int, float, str, bool.",
          "Eingabe: eingabe = input('Name: '). Ausgabe: print('Hallo', name).",
          "Operatoren: +, -, *, /, //, %, ==, !=, <, >. Kommentar beginnt mit #."
        ]
      },
      {
        title: "Beispielprogramm",
        paragraphs: [
          "name = input('Dein Name: ')",
          "alter = int(input('Dein Alter: '))",
          "print('Hallo', name + ', du bist', alter, 'Jahre alt.')",
          "int() wandelt Text in Ganzzahl. Ohne int() waere alter ein String."
        ]
      }
    ],
    realWorldExamples: [
      "JIKU-Skript liest CSV-Zeilen ein und zaehlt offene Support-Tickets.",
      "Azubi liest Benutzereingaben fuer eine kleine Kalkulations-App."
    ],
    practicalExamples: [{
      title: "JIKU: Begruessung",
      paragraphs: ["Kleines Python-Programm fuer Schulungs-Check-in."],
      steps: ["Variable anlegen.", "input() lesen.", "print() ausgeben.", "Typ mit int() pruefen."]
    }],
    vocabulary: [
      mkVocab("Variable", "variavel", "Speicher fuer einen Wert.", "name = 'Anna'"),
      mkVocab("Datentyp", "tipo de dado", "Art des Werts: int, str, bool.", "alter = 25 ist int."),
      mkVocab("input", "entrada", "Liest Benutzereingabe als Text.", "name = input('Name: ')"),
      mkVocab("print", "saida", "Gibt Werte auf der Konsole aus.", "print('Hallo')"),
      mkVocab("Operator", "operador", "Rechen- oder Vergleichszeichen.", "5 + 3, a == b"),
      mkVocab("Kommentar", "comentario", "Erklaerung im Code, wird ignoriert.", "# Dies ist ein Kommentar"),
      mkVocab("int", "inteiro", "Ganzzahl-Datentyp.", "alter = int('25')"),
      mkVocab("Syntaxfehler", "erro de sintaxe", "Code verletzt Sprachregeln.", "Fehlende Klammer oder Anfuehrungszeichen.")
    ],
    summary: ["Python nutzt Variablen, Typen, input und print.", "AP1 verlangt Code verstehen, nicht nur schreiben.", "int() wandelt Eingabe-Text in Zahlen."],
    mindMap: "Python → Variable/Typ → input/print → Operatoren → Fehler lesen",
    exercises: {
      easy: [
        mkEx("Was macht print('Hallo')?", "Gibt Hallo auf der Konsole aus."),
        mkEx("Was speichert eine Variable?", "Einen Wert zur spaeteren Nutzung."),
        mkEx("Wofuer ist # in Python?", "Beginnt einen Kommentar.")
      ],
      intermediate: [
        mkEx("Was gibt aus: x = 3; y = 4; print(x + y)?", "7"),
        mkEx("Warum int(input(...))?", "input liefert Text; int wandelt in Zahl."),
        mkEx("Erklaeren Sie name = 'Anna'.", "Variable name speichert String Anna.")
      ],
      ap1Style: [
        mkEx("AP1: Was passiert bei print(2 + '3')?", "Fehler — int und str nicht direkt addierbar."),
        mkEx("AP1: Lesen Sie: a=10; b=3; print(a // b).", "3 (Ganzzahldivision)."),
        mkEx("AP1: Nennen Sie zwei Datentypen.", "int und str (oder float, bool).")
      ]
    },
    commonMistakes: ["input ohne int bei Zahlen.", "Einrueckung ignorieren (spaeter bei if/for wichtig)."],
    revisionChecklist: ["Variable und Typ erklaeren.", "input/print Beispiel lesen.", "Einen Fehler in Code finden."],
    related: ["Variable", "Datentyp", "input", "print"]
  },

  "python-kontrollstrukturen": {
    studyTime: "60-75 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Lesen Sie if/else-Verzweigungen und erklaeren Sie die Ausgabe.",
      "Verstehen Sie for- und while-Schleifen mit Listen.",
      "Erkennen Sie Einrueckung als Strukturelement in Python."
    ],
    introduction: [
      "Kontrollstrukturen steuern den Programmablauf: Entscheidungen und Wiederholungen.",
      "AP1 zeigt oft kurze Codeausschnitte mit if, for, while und Listen."
    ],
    explanation: [
      {
        title: "Verzweigung if/else",
        paragraphs: [
          "if bedingung: — Block wird nur ausgefuehrt wenn True.",
          "else: — Alternative wenn Bedingung False.",
          "Einrueckung (4 Spaces) gehoert zum Block — ohne Einrueckung Syntaxfehler."
        ]
      },
      {
        title: "Schleifen und Listen",
        paragraphs: [
          "for element in liste: — jedes Element einmal durchlaufen.",
          "while bedingung: — wiederholt solange True (Vorsicht Endlosschleife).",
          "preise = [10, 20, 30]; summe = 0; for p in preise: summe += p → summe = 60."
        ]
      }
    ],
    realWorldExamples: ["Schleife summiert alle Rechnungsbetraege in einer Liste.", "if prueft ob Passwort laenger als 8 Zeichen ist."],
    practicalExamples: [{
      title: "JIKU: Bestellungen summieren",
      paragraphs: ["preise = [49.99, 12.50, 8.00]", "summe = 0", "for preis in preise:", "    summe += preis", "print(summe)  # 70.49"],
      steps: ["Liste anlegen.", "for-Schleife.", "summe erhoehen.", "Ergebnis pruefen."]
    }],
    vocabulary: [
      mkVocab("if", "se", "Verzweigung bei wahrer Bedingung.", "if alter >= 18:"),
      mkVocab("else", "senao", "Alternative zum if.", "else: print('Nein')"),
      mkVocab("for", "para (loop)", "Schleife ueber Iterable.", "for x in liste:"),
      mkVocab("while", "enquanto", "Schleife solange Bedingung True.", "while zaehler < 10:"),
      mkVocab("Liste", "lista", "Geordnete Sammlung von Werten.", "noten = [1, 2, 3, 4]"),
      mkVocab("Einrueckung", "indentacao", "Definiert Code-Bloecke in Python.", "4 Leerzeichen unter if."),
      mkVocab("Bedingung", "condicao", "Ausdruck True oder False.", "preis > 100"),
      mkVocab("Iteration", "iteracao", "Ein Durchlauf einer Schleife.", "Jedes Element der Liste.")
    ],
    summary: ["if/else fuer Entscheidungen.", "for/while fuer Wiederholungen.", "Listen speichern mehrere Werte; Einrueckung ist Pflicht."],
    mindMap: "Kontrolle → if/else → for/while → Liste → Einrueckung",
    exercises: {
      easy: [
        mkEx("Wofuer nutzt man if?", "Um Code nur bei erfuellter Bedingung auszufuehren."),
        mkEx("Was macht for x in liste?", "Fuehrt Block fuer jedes Element aus."),
        mkEx("Was ist eine Liste?", "Geordnete Sammlung, z.B. [1,2,3].")
      ],
      intermediate: [
        mkEx("Ausgabe: for i in [1,2,3]: print(i*2)", "2, 4, 6 (je Zeile)."),
        mkEx("if alter >= 18: print('Ja') else: print('Nein') — alter=16?", "Nein"),
        mkEx("Summe von [5,10,15] mit for?", "30")
      ],
      ap1Style: [
        mkEx("AP1: Fehler finden — if x > 5 print('gross')", "Fehlende Einrueckung und Doppelpunkt fehlt nach Bedingung."),
        mkEx("AP1: Was gibt len([4,8,12])?", "3"),
        mkEx("AP1: while True: print('x') — Problem?", "Endlosschleife, Programm haengt.")
      ]
    },
    commonMistakes: ["Doppelpunkt nach if/for vergessen.", "Einrueckung inkonsistent."],
    revisionChecklist: ["if und for Code lesen.", "Listensumme berechnen.", "Einrueckung erklaeren."],
    related: ["if", "for", "Liste", "while"]
  },

  "programacao": {
    studyTime: "50-65 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Variablen, Bedingungen, Schleifen und Funktionen.",
      "Lesen Sie Pseudocode und einfachen Programmfluss.",
      "Erkennen Sie typische Logikfehler auf AP1-Niveau."
    ],
    introduction: [
      "Programmieren bedeutet, Probleme in klare, testbare Schritte zu uebersetzen.",
      "AP1 fragt nach Ablauf, nicht nach komplexen Frameworks."
    ],
    explanation: [
      {
        title: "Grundkonzepte",
        paragraphs: [
          "Variable: benannter Speicher. Bedingung: if waehlt Pfad. Schleife: wiederholt Schritte.",
          "Funktion: benannter Block mit Parametern und Rueckgabewert.",
          "Algorithmus: geordnete Schritte zum Ziel — Eingabe → Verarbeitung → Ausgabe."
        ]
      },
      {
        title: "Fluss lesen",
        paragraphs: [
          "Sequenz: Schritte nacheinander. Verzweigung: if/else. Wiederholung: for/while.",
          "Beispiel: Summe aller Noten — Schleife, Akkumulator, am Ende Durchschnitt."
        ]
      }
    ],
    realWorldExamples: ["Ticket-System zaehlt offene Faele mit Schleife.", "Rabattfunktion berechnet Endpreis nach Bedingung."],
    practicalExamples: [{
      title: "Durchschnitt berechnen",
      paragraphs: ["noten = [2, 3, 1, 2]; summe = 0; for n in noten: summe += n; print(summe / len(noten))"],
      steps: ["Liste.", "Summe in Schleife.", "Durch len(noten) teilen.", "Ergebnis pruefen."]
    }],
    vocabulary: [
      mkVocab("Algorithmus", "algoritmo", "Geordnete Problemloesungsschritte.", "Sortieren, Suchen, Summieren."),
      mkVocab("Variable", "variavel", "Speicher fuer Werte.", "zaehler = 0"),
      mkVocab("Schleife", "loop", "Wiederholt Anweisungen.", "for, while"),
      mkVocab("Bedingung", "condicao", "Entscheidet Verzweigung.", "if x > 0"),
      mkVocab("Funktion", "funcao", "Wiederverwendbarer Codeblock.", "def berechne(x): return x*2"),
      mkVocab("Parameter", "parametro", "Eingabe einer Funktion.", "def gruss(name):"),
      mkVocab("Rueckgabewert", "valor de retorno", "Ergebnis der Funktion.", "return summe"),
      mkVocab("Pseudocode", "pseudocodigo", "Plattformneutrale Beschreibung.", "WENN x>0 DANN ...")
    ],
    summary: ["Programm = Daten + Logik + Ablauf.", "if, Schleifen, Funktionen sind Kernwerkzeuge.", "AP1: Code lesen und Ausgabe vorhersagen."],
    mindMap: "Programm → Variable → if/Schleife → Funktion → Algorithmus",
    exercises: {
      easy: [
        mkEx("Wann nutzt man eine Schleife?", "Wenn Schritte wiederholt werden."),
        mkEx("Was ist eine Funktion?", "Benannter wiederverwendbarer Codeblock."),
        mkEx("Was ist ein Algorithmus?", "Geordnete Schritte zur Loesung.")
      ],
      intermediate: [
        mkEx("Erklaeren Sie if in einem Satz.", "Fuehrt Code nur bei erfuellter Bedingung aus."),
        mkEx("Unterschied Parameter und Variable?", "Parameter = Funktionseingabe; Variable = allgemeiner Speicher."),
        mkEx("Pseudocode: WENN note>=4 DANN bestanden — note=3?", "Nicht bestanden.")
      ],
      ap1Style: [
        mkEx("AP1: Off-by-one — for i in range(5): zaehlt?", "0 bis 4, fuenf Durchlaeufe."),
        mkEx("AP1: Funktion def doppelt(n): return n*2; doppelt(5)?", "10"),
        mkEx("AP1: Signalwort 'beschreiben' — Algorithmus Summe?", "Alle Werte addieren, Ergebnis ausgeben.")
      ]
    },
    commonMistakes: ["Endlosschleife bei while.", "Return vergessen in Funktion."],
    revisionChecklist: ["if/Schleife erklaeren.", "Code-Ausgabe vorhersagen.", "Funktion mit return."],
    related: ["Algorithmus", "Schleife", "Funktion", "Variable"]
  },

  "uml": {
    studyTime: "55-65 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Lesen Sie Klassen-, Anwendungsfall- und Sequenzdiagramme.",
      "Erklaeren Sie Assoziation, Vererbung und Multiplizitaet.",
      "Verbinden Sie UML mit Softwareentwurf vor Implementierung."
    ],
    introduction: [
      "UML visualisiert Struktur und Verhalten von Systemen vor oder waehrend der Entwicklung.",
      "AP1 verlangt Diagramme lesen, nicht komplex zeichnen."
    ],
    explanation: [
      {
        title: "Klassendiagramm",
        paragraphs: [
          "Klasse: Rechteck mit Name, Attributen, Methoden.",
          "Vererbung: Pfeil mit hohler Spitze (Subklasse erbt von Superklasse).",
          "Assoziation: Linie zwischen Klassen. Multiplizitaet: 1, *, 0..1 an Enden."
        ]
      },
      {
        title: "Weitere Diagramme",
        paragraphs: [
          "Anwendungsfall: Akteure und Funktionen des Systems.",
          "Sequenzdiagramm: Nachrichten zwischen Objekten ueber Zeit.",
          "Aktivitaetsdiagramm: Ablauf mit Entscheidungen (aehnlich Flussdiagramm)."
        ]
      }
    ],
    realWorldExamples: ["Klasse Kunde mit Attributen name, email und Methode registrieren().", "Sequenz: Login → AuthService → Datenbank."],
    practicalExamples: [{
      title: "JIKU: Ticket-System",
      paragraphs: ["Klasse Ticket mit status, titel; Klasse Mitarbeiter bearbeitet Ticket; 1 Mitarbeiter — * Tickets."],
      steps: ["Klassen identifizieren.", "Attribute notieren.", "Beziehung und Multiplizitaet.", "Methoden zuordnen."]
    }],
    vocabulary: [
      mkVocab("UML", "linguagem de modelagem", "Unified Modeling Language.", "Standard fuer Softwarediagramme."),
      mkVocab("Klassendiagramm", "diagrama de classes", "Zeigt Klassen, Attribute, Methoden.", "Strukturmodell."),
      mkVocab("Attribut", "atributo", "Eigenschaft einer Klasse.", "name: String"),
      mkVocab("Methode", "metodo", "Verhalten/Funktion der Klasse.", "speichern()"),
      mkVocab("Vererbung", "heranca", "Subklasse erbt von Superklasse.", "Pfeil mit hohler Spitze."),
      mkVocab("Assoziation", "associacao", "Beziehung zwischen Klassen.", "Kunde — Bestellung."),
      mkVocab("Multiplizitaet", "multiplicidade", "Anzahl an Beziehungsende.", "1 zu *"),
      mkVocab("Anwendungsfall", "caso de uso", "Funktion aus Nutzersicht.", "Ticket anlegen.")
    ],
    summary: ["UML kommuniziert Entwurf visuell.", "Klassendiagramm: Struktur; Sequenz: Ablauf.", "Multiplizitaet und Vererbung sind AP1-Klassiker."],
    mindMap: "UML → Klassendiagramm → Vererbung/Assoziation → Sequenz/Anwendungsfall",
    exercises: {
      easy: [
        mkEx("Wofuer dient UML?", "Visuelle Modellierung von Software."),
        mkEx("Was zeigt ein Klassendiagramm?", "Klassen, Attribute, Methoden, Beziehungen."),
        mkEx("Was ist Vererbung?", "Subklasse uebernimmt Eigenschaften der Superklasse.")
      ],
      intermediate: [
        mkEx("Multiplizitaet 1 zu * bei Kunde-Bestellung?", "Ein Kunde, viele Bestellungen."),
        mkEx("Unterschied Attribut und Methode?", "Attribut = Daten; Methode = Verhalten."),
        mkEx("Wofuer Sequenzdiagramm?", "Zeigt Nachrichten zwischen Objekten ueber Zeit.")
      ],
      ap1Style: [
        mkEx("AP1: Klasse Auto erbt von Fahrzeug — welches Symbol?", "Vererbungspfeil hohle Spitze zu Fahrzeug."),
        mkEx("AP1: 0..1 zu * bedeutet?", "Optional eins, viele auf anderer Seite."),
        mkEx("AP1: Anwendungsfall vs Klassendiagramm?", "Anwendungsfall=Funktionen; Klasse=Struktur.")
      ]
    },
    commonMistakes: ["Vererbung mit Assoziation verwechseln.", "Multiplizitaet falsch lesen."],
    revisionChecklist: ["Klassendiagramm lesen.", "Vererbung und Multiplizitaet.", "Ein Diagrammtyp erklaeren."],
    related: ["Klassendiagramm", "Vererbung", "Assoziation", "Multiplizitaet"]
  },

  "er-modell": {
    studyTime: "55-70 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Entitaet, Attribut und Beziehung im ER-Modell.",
      "Lesen Sie Kardinalitaeten 1:1, 1:n, n:m.",
      "Ueberfuehren Sie ER-Modell gedanklich in relationale Tabellen."
    ],
    introduction: [
      "Das Entity-Relationship-Modell beschreibt Daten fachlich, bevor Tabellen entstehen.",
      "AP1 fragt haeufig nach Entitaet, Attribut, Beziehung und Kardinalitaet."
    ],
    explanation: [
      {
        title: "Bausteine",
        paragraphs: [
          "Entitaet: fachliches Objekt, z.B. Kunde, Bestellung, Produkt.",
          "Attribut: Eigenschaft der Entitaet, z.B. Name, Preis, Datum.",
          "Beziehung: Verbindung zwischen Entitaeten, z.B. Kunde bestellt Produkt."
        ]
      },
      {
        title: "Kardinalitaet",
        paragraphs: [
          "1:1 — genau ein Partner (z.B. Person — Personalausweis).",
          "1:n — ein Kunde, viele Bestellungen.",
          "n:m — viele Studenten, viele Kurse → oft Zwischentabelle."
        ]
      }
    ],
    realWorldExamples: ["Kunde (1) — (*) Bestellung — (*) Produkt ist n:m ueber Bestellposition."],
    practicalExamples: [{
      title: "JIKU: Kunde und Geraet",
      paragraphs: ["Entitaet Kunde, Geraet; Beziehung besitzt; 1 Kunde — * Geraete."],
      steps: ["Entitaeten zeichnen.", "Attribute eintragen.", "Beziehung mit Kardinalitaet.", "Primaerschluessel markieren."]
    }],
    vocabulary: [
      mkVocab("Entitaet", "entidade", "Fachliches Objekt im Modell.", "Kunde, Ticket."),
      mkVocab("Attribut", "atributo", "Eigenschaft einer Entitaet.", "Name, Email."),
      mkVocab("Beziehung", "relacionamento", "Verbindung zwischen Entitaeten.", "bestellt, gehoert zu."),
      mkVocab("Kardinalitaet", "cardinalidade", "Anzahl moeglicher Verknuepfungen.", "1:n, n:m."),
      mkVocab("ER-Modell", "modelo ER", "Entity-Relationship-Modell.", "Konzeptionelles Datenmodell."),
      mkVocab("Primaerschluessel", "chave primaria", "Eindeutige ID der Entitaet.", "Kundennummer."),
      mkVocab("Schwacher Schluessel", "chave fraca", "Abhaengig von anderer Entitaet.", "Position in Bestellung."),
      mkVocab("Relation", "relacao", "Umgesetzte Tabelle im relationalen Modell.", "Tabelle Kunde.")
    ],
    summary: ["ER = Entitaeten + Attribute + Beziehungen.", "Kardinalitaet bestimmt Tabellenstruktur.", "n:m braucht oft Zwischentabelle."],
    mindMap: "ER → Entitaet/Attribut → Beziehung → Kardinalitaet → Tabelle",
    exercises: {
      easy: [
        mkEx("Was ist eine Entitaet?", "Fachliches Objekt, z.B. Kunde."),
        mkEx("Was ist ein Attribut?", "Eigenschaft einer Entitaet."),
        mkEx("1:n Beispiel?", "Ein Kunde — viele Bestellungen.")
      ],
      intermediate: [
        mkEx("n:m Beispiel Student-Kurs?", "Viele Studenten in vielen Kursen; Zwischentabelle noetig."),
        mkEx("Primaerschluessel im ER?", "Eindeutiges Attribut pro Entitaet."),
        mkEx("ER zu Tabelle Kunde-Bestellung?", "Zwei Tabellen; FK KundenID in Bestellung.")
      ],
      ap1Style: [
        mkEx("AP1: 1:1 Person-Ausweis — Tabellen?", "Eine Tabelle oder zwei mit FK."),
        mkEx("AP1: Kardinalitaet falsch: 1 Kunde 1 Bestellung immer?", "Falsch — meist 1:n."),
        mkEx("AP1: Entitaet vs Attribut — Email?", "Attribut der Entitaet Kunde/Person.")
      ]
    },
    commonMistakes: ["Entitaet und Attribut verwechseln.", "n:m ohne Zwischentabelle modellieren."],
    revisionChecklist: ["Entitaet/Attribut/Beziehung.", "1:n und n:m Beispiele.", "ER zu Tabellen uebersetzen."],
    related: ["Entitaet", "Kardinalitaet", "Primaerschluessel", "Relation"]
  },

  "relationales-modell": {
    studyTime: "55-65 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Tabelle, Datensatz, Attribut, Primaer- und Fremdschluessel.",
      "Beschreiben Sie 1:n und n:m im relationalen Modell.",
      "Verbinden Sie ER-Modell mit SQL-Tabellen."
    ],
    introduction: [
      "Das relationale Modell speichert Daten in Tabellen mit eindeutigen Schluesseln und Beziehungen ueber Fremdschluessel.",
      "AP1 erwartet saubere Zuordnung von Begriffen und einfache Modellierung."
    ],
    explanation: [
      {
        title: "Tabellenstruktur",
        paragraphs: [
          "Tabelle (Relation): Spalten = Attribute, Zeilen = Datensaetze.",
          "Primaerschluessel (PK): eindeutig, nicht null — identifiziert Zeile.",
          "Fremdschluessel (FK): verweist auf PK anderer Tabelle — realisiert Beziehung."
        ]
      },
      {
        title: "Beziehungen umsetzen",
        paragraphs: [
          "1:n: FK in der 'vielen'-Tabelle (Bestellung.KundenID → Kunde.KundenID).",
          "n:m: Zwischentabelle mit zwei FKs (StudentKurs: StudentID, KursID).",
          "Normalisierung: Redundanz reduzieren — AP1 Grundidee reicht."
        ]
      }
    ],
    realWorldExamples: ["Tabelle Ticket mit FK auf Kunde und Mitarbeiter."],
    practicalExamples: [{
      title: "JIKU: Bestellung",
      paragraphs: ["Kunde(KundenID PK, Name); Bestellung(BestellID PK, KundenID FK, Datum, Betrag)."],
      steps: ["PK je Tabelle.", "FK fuer 1:n.", "SQL CREATE TABLE gedanklich.", "JOIN zum Abfragen."]
    }],
    vocabulary: [
      mkVocab("Relation", "relacao/tabela", "Tabelle im relationalen Modell.", "Tabelle Kunde."),
      mkVocab("Datensatz", "registro/tupla", "Eine Zeile.", "Ein Kunde."),
      mkVocab("Attribut", "atributo/coluna", "Spalte der Tabelle.", "Name, Email."),
      mkVocab("Primaerschluessel", "chave primaria", "Eindeutige Zeilen-ID.", "KundenID."),
      mkVocab("Fremdschluessel", "chave estrangeira", "Verweis auf andere Tabelle.", "KundenID in Bestellung."),
      mkVocab("Normalisierung", "normalizacao", "Redundanz vermeiden.", "Daten in passende Tabellen."),
      mkVocab("JOIN", "uniao SQL", "Tabellen verknuepfen.", "Kunde JOIN Bestellung ON ..."),
      mkVocab("Integritaet", "integridade", "Konsistente Beziehungen.", "FK muss existierenden PK referenzieren.")
    ],
    summary: ["Relational = Tabellen + PK/FK.", "1:n via FK; n:m via Zwischentabelle.", "Basis fuer SQL-Abfragen."],
    mindMap: "Relational → Tabelle → PK/FK → 1:n/n:m → SQL",
    exercises: {
      easy: [
        mkEx("Was ist ein Fremdschluessel?", "Verweis auf PK einer anderen Tabelle."),
        mkEx("Was ist ein Datensatz?", "Eine Zeile in der Tabelle."),
        mkEx("PK-Eigenschaften?", "Eindeutig und nicht null.")
      ],
      intermediate: [
        mkEx("1:n Kunde-Bestellung — wo FK?", "In Tabelle Bestellung (KundenID)."),
        mkEx("n:m Produkt-Bestellung?", "Zwischentabelle Bestellposition mit zwei FKs."),
        mkEx("JOIN Zweck?", "Daten aus verknuepften Tabellen kombinieren.")
      ],
      ap1Style: [
        mkEx("AP1: FK ohne passenden PK — Problem?", "Referentielle Integritaet verletzt."),
        mkEx("AP1: Attribut vs Datensatz?", "Attribut=Spalte; Datensatz=Zeile."),
        mkEx("AP1: ER 1:n zu relational?", "FK in der n-Tabelle.")
      ]
    },
    commonMistakes: ["PK und FK vertauschen.", "n:m ohne Zwischentabelle."],
    revisionChecklist: ["PK/FK erklaeren.", "1:n modellieren.", "Mit SQL verbinden."],
    related: ["Primaerschluessel", "Fremdschluessel", "JOIN", "ER-Modell"]
  },

  "sqlite-python": {
    studyTime: "60-75 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Verbindung, Cursor, SQL und commit in Python.",
      "Lesen Sie einfache SQLite-Skripte.",
      "Verbinden Sie Python-Datenverarbeitung mit lokaler Datenbank."
    ],
    introduction: [
      "SQLite ist eine leichtgewichtige relationale Datenbank in einer Datei — ideal fuer Lernprojekte.",
      "Python nutzt sqlite3-Modul: connect, cursor, execute, fetchall, commit."
    ],
    explanation: [
      {
        title: "Grundablauf",
        paragraphs: [
          "import sqlite3",
          "conn = sqlite3.connect('azubi.db')",
          "cursor = conn.cursor()",
          "cursor.execute('SELECT * FROM kapitel')",
          "rows = cursor.fetchall(); conn.commit(); conn.close()"
        ]
      },
      {
        title: "INSERT und Parameter",
        paragraphs: [
          "cursor.execute('INSERT INTO kapitel (titel) VALUES (?)', ('LF5',))",
          "Platzhalter ? verhindert SQL-Injection — Werte als Tuple uebergeben.",
          "commit() speichert Aenderungen dauerhaft."
        ]
      }
    ],
    realWorldExamples: ["AzubiForge speichert Lernfortschritt lokal in SQLite."],
    practicalExamples: [{
      title: "JIKU: Fortschritt speichern",
      paragraphs: [
        "cursor.execute('CREATE TABLE IF NOT EXISTS progress (id INTEGER PRIMARY KEY, chapter TEXT, done INTEGER)')",
        "cursor.execute('INSERT INTO progress (chapter, done) VALUES (?, ?)', ('sql', 1))"
      ],
      steps: ["connect.", "CREATE TABLE.", "INSERT mit ?.", "commit und close."]
    }],
    vocabulary: [
      mkVocab("SQLite", "banco SQLite", "Dateibasierte relationale DB.", "azubi.db"),
      mkVocab("connect", "conectar", "Oeffnet DB-Verbindung.", "sqlite3.connect('db')"),
      mkVocab("Cursor", "cursor", "Fuehrt SQL-Befehle aus.", "conn.cursor()"),
      mkVocab("execute", "executar", "SQL ausfuehren.", "cursor.execute('SELECT ...')"),
      mkVocab("fetchall", "buscar todos", "Alle Ergebniszeilen holen.", "rows = cursor.fetchall()"),
      mkVocab("commit", "confirmar", "Aenderungen speichern.", "conn.commit()"),
      mkVocab("Platzhalter", "placeholder", "Sichere Parameter (?).", "VALUES (?, ?)"),
      mkVocab("SQL-Injection", "injecao SQL", "Angriff durch unsichere Strings.", "? verhindert das.")
    ],
    summary: ["SQLite + Python: connect → cursor → execute → commit.", "Platzhalter ? fuer sichere Werte.", "Ideal fuer lokale Lern-Apps."],
    mindMap: "SQLite → connect → cursor → execute → fetchall → commit",
    exercises: {
      easy: [
        mkEx("Was macht sqlite3.connect?", "Oeffnet Verbindung zur DB-Datei."),
        mkEx("Wofuer commit?", "Speichert Aenderungen dauerhaft."),
        mkEx("Was liefert fetchall?", "Alle Zeilen der Abfrage.")
      ],
      intermediate: [
        mkEx("Warum ? statt String-Konkatenation?", "Schutz vor SQL-Injection."),
        mkEx("Reihenfolge: execute INSERT ohne commit — gespeichert?", "Nein, erst nach commit."),
        mkEx("cursor.execute('SELECT name FROM kunde') — naechster Schritt?", "fetchall() oder fetchone().")
      ],
      ap1Style: [
        mkEx("AP1: conn.close() vergessen — Problem?", "Ressourcen leak; Aenderungen evtl. nicht gesichert."),
        mkEx("AP1: CREATE TABLE gehoert zu?", "DDL — definiert Struktur."),
        mkEx("AP1: Tuple ('Anna',) bei execute — warum Komma?", "Ein-Element-Tuple in Python.")
      ]
    },
    commonMistakes: ["commit vergessen.", "SQL-Strings mit Nutzerinput ohne Platzhalter."],
    revisionChecklist: ["connect/cursor/execute kennen.", "INSERT mit ?.", "commit erklaeren."],
    related: ["SQLite", "SQL", "Cursor", "commit"]
  },

  "softwaretests": {
    studyTime: "55-65 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Testfall, Testdaten, Soll- und Ist-Ergebnis.",
      "Unterscheiden Sie manuelle und automatisierte Tests auf AP1-Niveau.",
      "Dokumentieren Sie Fehler nachvollziehbar."
    ],
    introduction: [
      "Tests pruefen, ob Software das erwartete Verhalten liefert — Qualitaetssicherung, nicht Misstrauen.",
      "AP1 fragt nach Testfallaufbau und Fehlerdokumentation."
    ],
    explanation: [
      {
        title: "Testfall-Struktur",
        paragraphs: [
          "Testfall: konkrete Pruefung mit Eingabe, erwartetem und tatsaechlichem Ergebnis.",
          "Testdaten: Werte fuer die Pruefung (z.B. Nettopreis 100, MwSt 19%).",
          "Soll-Ergebnis: erwartet. Ist-Ergebnis: gemessen. Abweichung = Fehler."
        ]
      },
      {
        title: "Testarten (Grundniveau)",
        paragraphs: [
          "Modultest: einzelne Funktion/Klasse.",
          "Integrationstest: Zusammenspiel mehrerer Teile.",
          "Abnahmetest: Kunde prueft Anforderungen.",
          "Regressionstest: nach Aenderung erneut pruefen."
        ]
      }
    ],
    realWorldExamples: ["Test: brutto(100, 19) muss 119 liefern — Ist 118.90 = Fehler."],
    practicalExamples: [{
      title: "JIKU: Preisberechnung",
      paragraphs: ["Eingabe: netto=50, mwst=19. Erwartet: 59.50. Funktion liefert 59.50 → bestanden."],
      steps: ["Anforderung lesen.", "Testdaten waehlen.", "Ausfuehren.", "Soll/Ist vergleichen.", "Fehler dokumentieren."]
    }],
    vocabulary: [
      mkVocab("Testfall", "caso de teste", "Konkrete Pruefung mit Erwartung.", "Eingabe + Soll-Ergebnis."),
      mkVocab("Testdaten", "dados de teste", "Werte fuer den Test.", "netto=100"),
      mkVocab("Soll-Ergebnis", "resultado esperado", "Erwartetes Verhalten.", "119.00"),
      mkVocab("Ist-Ergebnis", "resultado obtido", "Tatsaechliches Ergebnis.", "118.90"),
      mkVocab("Fehler", "defeito/bug", "Abweichung Soll/Ist.", "Falsche Rundung."),
      mkVocab("Modultest", "teste de modulo", "Test einer Einheit.", "Eine Funktion."),
      mkVocab("Regressionstest", "teste de regressao", "Erneut testen nach Aenderung.", "Alte Funktionen noch OK?"),
      mkVocab("Testprotokoll", "protocolo de teste", "Dokumentation der Tests.", "Datum, Ergebnis, Tester.")
    ],
    summary: ["Testfall = Eingabe + Soll vs Ist.", "Fehler dokumentieren mit Schritten.", "Tests frueh spart Kosten."],
    mindMap: "Test → Testfall → Soll/Ist → Fehler → Modul/Integration",
    exercises: {
      easy: [
        mkEx("Was ist ein Testfall?", "Konkrete Pruefung mit erwartetem Ergebnis."),
        mkEx("Soll vs Ist?", "Erwartet vs tatsaechlich gemessen."),
        mkEx("Warum testen?", "Fehler frueh finden, Qualitaet sichern.")
      ],
      intermediate: [
        mkEx("Test: login('admin','falsch') → Zugriff verweigert. Ist: Zugriff erlaubt?", "Fehler — Test nicht bestanden."),
        mkEx("Modultest vs Integrationstest?", "Modul=einzeln; Integration=Zusammenspiel."),
        mkEx("Was gehoert in Fehlerbericht?", "Schritte, Soll/Ist, Umgebung, Datum.")
      ],
      ap1Style: [
        mkEx("AP1: 'Testen ist optional' — richtig?", "Falsch — Qualitaetssicherung ist Teil des Prozesses."),
        mkEx("AP1: Regressionstest nach Bugfix?", "Ja — pruefen ob Fix wirkt und nichts anderes bricht."),
        mkEx("AP1: Testdaten Grenzwert 0 und -1 fuer Alter?", "Grenzwerttests — gueltig/ungueltig pruefen.")
      ]
    },
    commonMistakes: ["Nur Happy Path testen.", "Fehler ohne Reproduktionsschritte dokumentieren."],
    revisionChecklist: ["Testfall-Struktur.", "Soll/Ist erklaeren.", "Einen Fehlerbericht skizzieren."],
    related: ["Testfall", "Soll-Ergebnis", "Modultest", "TDD"]
  },

  "tdd": {
    studyTime: "45-55 Minuten",
    stars: "★★★☆☆",
    objectives: [
      "Erklaeren Sie die Grundidee Testgetriebene Entwicklung (TDD).",
      "Beschreiben Sie den Zyklus Rot-Grün-Refactor.",
      "Verbinden Sie TDD mit klaren Anforderungen."
    ],
    introduction: [
      "TDD bedeutet: zuerst Test schreiben, dann minimalen Code, dann verbessern (Refactoring).",
      "AP1 erwartet die Grundidee, kein komplexes Test-Framework."
    ],
    explanation: [
      {
        title: "Rot-Grün-Refactor",
        paragraphs: [
          "Rot: Test schreiben — schlaegt fehl, weil Funktion noch fehlt.",
          "Gruen: minimaler Code, damit Test besteht.",
          "Refactor: Code verbessern, Tests muessen weiter gruen sein."
        ]
      },
      {
        title: "Vorteile",
        paragraphs: [
          "Erwartetes Verhalten wird vor Implementierung klar.",
          "Regressionstests entstehen nebenbei.",
          "Kleine Schritte reduzieren Risiko."
        ]
      }
    ],
    realWorldExamples: ["Vor Rabattfunktion Test: rabatt(100, 10) == 90."],
    practicalExamples: [{
      title: "JIKU: Rabatt",
      paragraphs: ["1) Test: assert brutto(100,19)==119. 2) Funktion implementieren. 3) Code vereinfachen."],
      steps: ["Test zuerst.", "Minimal implementieren.", "Refactoring.", "Alle Tests gruen."]
    }],
    vocabulary: [
      mkVocab("TDD", "desenvolvimento guiado por testes", "Test-Driven Development.", "Test vor Code."),
      mkVocab("Rot-Gruen-Refactor", "vermelho-verde-refatorar", "TDD-Zyklus.", "Fail → Pass → Improve."),
      mkVocab("Refactoring", "refatoracao", "Struktur verbessern ohne Verhalten aendern.", "Code aufraeumen."),
      mkVocab("Unit-Test", "teste unitario", "Automatisierter Modultest.", "assert equal."),
      mkVocab("Assert", "asserção", "Prueft Bedingung im Test.", "assert x == 5"),
      mkVocab("Minimalimplementierung", "implementacao minima", "Gerade genug fuer gruen.", "Einfachster Code."),
      mkVocab("Regression", "regressao", "Alte Funktion bricht.", "Tests verhindern das."),
      mkVocab("Test First", "teste primeiro", "Kernprinzip von TDD.", "Anforderung als Test.")
    ],
    summary: ["TDD: Test → Code → Refactor.", "Rot-Grün-Refactor ist der Zyklus.", "Klares erwartetes Verhalten zuerst."],
    mindMap: "TDD → Test zuerst → Rot/Gruen → Refactor → Qualitaet",
    exercises: {
      easy: [
        mkEx("Was bedeutet TDD?", "Testgetriebene Entwicklung — Test vor Code."),
        mkEx("Rot-Gruen-Refactor — Reihenfolge?", "Erst fehlender Test, dann gruen, dann refactor."),
        mkEx("Was ist Refactoring?", "Verbessern ohne Funktion aendern.")
      ],
      intermediate: [
        mkEx("Vorteil Test zuerst?", "Anforderung wird explizit und pruefbar."),
        mkEx("Refactor bei rotem Test?", "Nein — erst wieder gruen machen."),
        mkEx("TDD vs nachtraeglich testen?", "TDD integriert Tests von Anfang an.")
      ],
      ap1Style: [
        mkEx("AP1: TDD = keine Dokumentation noetig?", "Falsch — Tests ersetzen Doku nicht vollstaendig."),
        mkEx("AP1: Minimalcode bei gruen — warum?", "Nicht ueber-engineeren; Schritt fuer Schritt."),
        mkEx("AP1: assert in Test — Zweck?", "Automatischer Vergleich Soll/Ist.")
      ]
    },
    commonMistakes: ["TDD mit 'nur am Ende testen' verwechseln.", "Refactoring mit neuer Funktion verwechseln."],
    revisionChecklist: ["Rot-Gruen-Refactor erklaeren.", "Beispiel mit Rabatt/Test.", "Vorteil in einem Satz."],
    related: ["TDD", "Refactoring", "Unit-Test", "Softwaretests"]
  },

  "eva-prinzip": {
    studyTime: "45-55 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Eingabe, Verarbeitung und Ausgabe (EVA).",
      "Ordnen Sie Hardware und Peripherie dem EVA-Prinzip zu.",
      "Wenden Sie EVA auf einfache IT-Szenarien an."
    ],
    introduction: [
      "Das EVA-Prinzip (Eingabe-Verarbeitung-Ausgabe) ordnet grundlegende Datenverarbeitung.",
      "AP1 nutzt EVA, um Computerfunktionen und Peripherie zu erklaeren."
    ],
    explanation: [
      {
        title: "Die drei Schritte",
        paragraphs: [
          "Eingabe (E): Daten kommen ins System — Tastatur, Maus, Scanner, Mikrofon.",
          "Verarbeitung (V): CPU und RAM bearbeiten Daten — Rechnen, Vergleichen, Speichern.",
          "Ausgabe (A): Ergebnis wird sichtbar/hoerbar — Monitor, Drucker, Lautsprecher."
        ]
      },
      {
        title: "Speicherung",
        paragraphs: [
          "Speicher (SSD/HDD) haelt Daten dauerhaft — kein EVA-Schritt, aber wichtig.",
          "RAM ist Arbeitsspeicher waehrend der Verarbeitung.",
          "Beispiel: Tastatur(E) → CPU/RAM(V) → Monitor(A); Datei speichern auf SSD."
        ]
      }
    ],
    realWorldExamples: ["Barcode-Scanner(E) → Kasse berechnet(V) → Bon druckt(A)."],
    practicalExamples: [{
      title: "JIKU: Arbeitsplatz",
      paragraphs: ["Azubi tippt Ticketnummer(E), System sucht(V), Monitor zeigt Ticket(A)."],
      steps: ["Eingabegeraet nennen.", "Verarbeitung.", "Ausgabegeraet.", "Optional Speicher."]
    }],
    vocabulary: [
      mkVocab("Eingabe", "entrada", "Daten ins System.", "Tastatur, Maus."),
      mkVocab("Verarbeitung", "processamento", "CPU/RAM bearbeiten.", "Berechnung, Suche."),
      mkVocab("Ausgabe", "saida", "Ergebnis praesentieren.", "Monitor, Drucker."),
      mkVocab("EVA-Prinzip", "principio EVA", "Eingabe-Verarbeitung-Ausgabe.", "Grundmodell."),
      mkVocab("Peripherie", "periferico", "Ein-/Ausgabegeraete.", "Tastatur, Monitor."),
      mkVocab("CPU", "processador", "Zentrale Verarbeitung.", "Rechenwerk."),
      mkVocab("RAM", "memoria RAM", "Arbeitsspeicher.", "Temporaer waehrend V."),
      mkVocab("Speicher", "armazenamento", "Dauerhafte Ablage.", "SSD, HDD.")
    ],
    summary: ["EVA = Eingabe → Verarbeitung → Ausgabe.", "Peripherie liefert E und A.", "Speicher ergaenzt das Modell."],
    mindMap: "EVA → Eingabe → Verarbeitung → Ausgabe → Speicher",
    exercises: {
      easy: [
        mkEx("Was bedeutet EVA?", "Eingabe, Verarbeitung, Ausgabe."),
        mkEx("Monitor — E, V oder A?", "Ausgabe."),
        mkEx("Tastatur — E, V oder A?", "Eingabe.")
      ],
      intermediate: [
        mkEx("CPU gehoert zu?", "Verarbeitung."),
        mkEx("SSD primaer EVA?", "Speicherung, nicht E/V/A direkt."),
        mkEx("Drucker im EVA?", "Ausgabe.")
      ],
      ap1Style: [
        mkEx("AP1: Scanner + CPU + Monitor — ordnen.", "E, V, A."),
        mkEx("AP1: 'RAM ist Ausgabe' — richtig?", "Falsch — RAM ist Arbeitsspeicher fuer Verarbeitung."),
        mkEx("AP1: EVA bei Online-Bestellung?", "E=Eingabe Artikel, V=System, A=Bestaetigung/Bildschirm.")
      ]
    },
    commonMistakes: ["Speicher als Ausgabe sehen.", "Netzteil dem EVA zuordnen wollen."],
    revisionChecklist: ["EVA erklaeren.", "3 Geraete zuordnen.", "JIKU-Beispiel."],
    related: ["Eingabe", "Verarbeitung", "Ausgabe", "Peripherie"]
  },

  "kundenanforderungen": {
    studyTime: "50-60 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Unterscheiden Sie Muss-, Soll- und Kann-Anforderungen.",
      "Erklaeren Sie technische, wirtschaftliche und organisatorische Anforderungen.",
      "Dokumentieren Sie Kundenwuensche pruefbar."
    ],
    introduction: [
      "Ohne klare Anforderungen entsteht die falsche IT-Loesung. Professionelle Arbeit beginnt mit Fragen stellen.",
      "AP1 prueft Prioritaeten und saubere Formulierung."
    ],
    explanation: [
      {
        title: "Anforderungstypen",
        paragraphs: [
          "Muss: zwingend — ohne geht die Loesung nicht (z.B. DSGVO-konform).",
          "Soll: wichtig, aber verhandelbar (z.B. leiser PC).",
          "Kann: optional, Nice-to-have (z.B. RGB-Tastatur)."
        ]
      },
      {
        title: "Dimensionen",
        paragraphs: [
          "Technisch: Leistung, Speicher, Sicherheit, Kompatibilitaet.",
          "Wirtschaftlich: Budget, TCO, Lieferzeit.",
          "Organisatorisch: Schulung, Support, Wartungsfenster."
        ]
      }
    ],
    realWorldExamples: ["Kunde sagt 'schneller PC' — Azubi klaert Programme, Budget, Mobilitaet."],
    practicalExamples: [{
      title: "JIKU: Notebook-Bedarf",
      paragraphs: ["Muss: Windows 11, VPN. Soll: 16 GB RAM. Kann: Dockingstation."],
      steps: ["Wuensche sammeln.", "Prioritaet setzen.", "Messbar formulieren.", "Dokumentieren."]
    }],
    vocabulary: [
      mkVocab("Kundenanforderung", "requisito do cliente", "Was der Kunde braucht.", "Leistungsanforderung."),
      mkVocab("Muss-Anforderung", "requisito obrigatorio", "Zwingend erfuellt.", "Sicherheit, Budget-Max."),
      mkVocab("Soll-Anforderung", "requisito desejavel", "Wichtig, verhandelbar.", "Leiser Betrieb."),
      mkVocab("Kann-Anforderung", "requisito opcional", "Optional.", "Zusaetzliches Zubehoer."),
      mkVocab("Leistungsprozess", "processo de servico", "Ablauf der Leistungserbringung.", "Vom Bedarf zur Uebergabe."),
      mkVocab("Ist-Zustand", "estado atual", "Aktuelle Situation.", "Alte PCs, langsam."),
      mkVocab("Soll-Zustand", "estado desejado", "Zielzustand.", "Neue Arbeitsplaetze."),
      mkVocab("Anforderungsdokument", "documento de requisitos", "Schriftliche Festhaltung.", "Anforderungsliste.")
    ],
    summary: ["Muss/Soll/Kann priorisieren.", "Technisch + wirtschaftlich + organisatorisch.", "Vage Wuensche praezisieren."],
    mindMap: "Anforderung → Muss/Soll/Kann → technisch/wirtschaftlich → Dokument",
    exercises: {
      easy: [
        mkEx("Muss vs Soll?", "Muss=zwingend; Soll=wichtig aber verhandelbar."),
        mkEx("Warum Anforderungen dokumentieren?", "Missverstaendnisse vermeiden, Loesung pruefbar."),
        mkEx("Beispiel Muss-Anforderung?", "Budget max 800 Euro oder DSGVO-konform.")
      ],
      intermediate: [
        mkEx("'Schneller PC' praezisieren?", "CPU-Typ, RAM, SSD, Anwendungen nennen."),
        mkEx("Technische vs wirtschaftliche Anforderung?", "Technisch=Leistung; wirtschaftlich=Preis/TCO."),
        mkEx("Kann-Beispiel?", "Zusaetzlicher Monitor.")
      ],
      ap1Style: [
        mkEx("AP1: Muss in Soll aendern um Kosten zu sparen — ohne Kunde?", "Falsch — Muss bleibt oder Kunde aendert."),
        mkEx("AP1: Anforderung messbar: 'sehr schnell'?", "Schlecht — besser: 'Start unter 10 Sekunden'."),
        mkEx("AP1: Leistungsprozess erklaeren.", "Vom Kundenbedarf bis zur erbrachten Leistung.")
      ]
    },
    commonMistakes: ["Vage Formulierungen.", "Muss/Soll verwechseln."],
    revisionChecklist: ["Muss/Soll/Kann.", "Ein Beispiel praezisieren.", "Drei Dimensionen."],
    related: ["Muss-Anforderung", "Anforderungsanalyse", "Lastenheft"]
  },

  "anforderungsanalyse": {
    studyTime: "55-65 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie Bedarf, Ist-Zustand und Soll-Zustand.",
      "Beschreiben Sie Schritte der Anforderungsanalyse.",
      "Formulieren Sie pruefbare Anforderungen."
    ],
    introduction: [
      "Anforderungsanalyse uebersetzt Kundenbedarf in klare, testbare Kriterien.",
      "AP1 verlangt strukturiertes Vorgehen und Fachbegriffe."
    ],
    explanation: [
      {
        title: "Vom Bedarf zur Anforderung",
        paragraphs: [
          "Bedarf: Problem oder Ziel ('wir brauchen mobile Arbeitsplaetze').",
          "Ist-Zustand: Was ist heute? Soll-Zustand: Was soll erreicht werden?",
          "Anforderung: pruefbares Kriterium ('Notebook max 1,5 kg, 8h Akku')."
        ]
      },
      {
        title: "Analyse-Schritte",
        paragraphs: [
          "Stakeholder und Zielgruppe identifizieren.",
          "Ist erheben, Soll definieren, Luecken analysieren.",
          "Prioritaeten, Risiken, Rahmenbedingungen dokumentieren."
        ]
      }
    ],
    realWorldExamples: ["10 Laptops: Anzahl, Software, Budget, Liefertermin, Sicherheit dokumentieren."],
    practicalExamples: [{
      title: "JIKU: Laptop-Rollout",
      paragraphs: ["Ist: 5 Jahre alte PCs. Soll: 20 neue Notebooks mit VPN. Anforderungen liste erstellen."],
      steps: ["Ist erheben.", "Soll definieren.", "Anforderungen formulieren.", "Priorisieren."]
    }],
    vocabulary: [
      mkVocab("Bedarf", "necessidade", "Grundlegendes Problem/Ziel.", "Mobiles Arbeiten."),
      mkVocab("Anforderung", "requisito", "Praezises, pruefbares Kriterium.", "16 GB RAM."),
      mkVocab("Ist-Zustand", "estado atual", "Heutige Situation.", "Alte Hardware."),
      mkVocab("Soll-Zustand", "estado alvo", "Zielbild.", "Neue Arbeitsplaetze."),
      mkVocab("Stakeholder", "parte interessada", "Betroffene Personen/Gruppen.", "IT, Einkauf, Nutzer."),
      mkVocab("Prioritaet", "prioridade", "Wichtigkeit/Reihenfolge.", "Muss vor Kann."),
      mkVocab("Rahmenbedingung", "condicao restritiva", "Einschraenkungen.", "Budget, Frist."),
      mkVocab("Risiko", "risco", "Moegliches Problem.", "Lieferverzoegerung.")
    ],
    summary: ["Bedarf → Ist/Soll → pruefbare Anforderungen.", "Stakeholder und Prioritaeten.", "Dokumentation ist Pflicht."],
    mindMap: "Analyse → Bedarf → Ist/Soll → Anforderung → Prioritaet",
    exercises: {
      easy: [
        mkEx("Bedarf vs Anforderung?", "Bedarf=Problem; Anforderung=pruefbares Kriterium."),
        mkEx("Was ist Ist-Zustand?", "Aktuelle Situation."),
        mkEx("Warum Stakeholder?", "Alle Betroffenen einbeziehen.")
      ],
      intermediate: [
        mkEx("Soll: 'bessere IT' — verbessern?", "Soll: messbare Ziele wie Ausfallzeit < 1h/Monat."),
        mkEx("Risiko bei Beschaffung?", "Lieferverzoegerung, Budgetueberschreitung."),
        mkEx("Analyse-Schritte nennen?", "Ist erheben, Soll definieren, Anforderungen dokumentieren.")
      ],
      ap1Style: [
        mkEx("AP1: Anforderung 'benutzerfreundlich' ohne Kriterium?", "Unzureichend — nicht pruefbar."),
        mkEx("AP1: Ist/Soll verwechselt?", "Ist=heute; Soll=Ziel — nicht vertauschen."),
        mkEx("AP1: Signalwort 'ermitteln' — was tun?", "Informationen sammeln und strukturieren.")
      ]
    },
    commonMistakes: ["Bedarf als Anforderung schreiben.", "Ist und Soll verwechseln."],
    revisionChecklist: ["Bedarf/Anforderung.", "Ist/Soll Beispiel.", "Pruefbare Formulierung."],
    related: ["Bedarf", "Ist-Zustand", "Soll-Zustand", "Kundenanforderungen"]
  },

  "pflichtenheft": {
    studyTime: "50-60 Minuten",
    stars: "★★★★★",
    objectives: [
      "Unterscheiden Sie Lastenheft und Pflichtenheft.",
      "Erklaeren Sie Auftraggeber und Auftragnehmer-Perspektive.",
      "Beschreiben Sie typische Inhalte beider Dokumente."
    ],
    introduction: [
      "Lastenheft und Pflichtenheft sind Klassiker in AP1: Was will der Kunde, wie setzt der Anbieter um?",
      "Saubere Unterscheidung verhindert Missverstaendnisse in Projekten."
    ],
    explanation: [
      {
        title: "Lastenheft",
        paragraphs: [
          "Sicht des Auftraggebers (Kunde): Was soll erreicht werden?",
          "Enthaelt Ziele, Anforderungen, Rahmenbedingungen aus Kundensicht.",
          "Frage: WAS und WOFUER?"
        ]
      },
      {
        title: "Pflichtenheft",
        paragraphs: [
          "Sicht des Auftragnehmers (Anbieter/JIKU): Wie wird umgesetzt?",
          "Enthaelt Loesungskonzept, Technik, Schnittstellen, Planung.",
          "Frage: WIE und WOMIT?"
        ]
      }
    ],
    realWorldExamples: ["Lastenheft: sichere mobile Arbeitsplaetze. Pflichtenheft: Notebookmodell, VPN, Verschluesselung."],
    practicalExamples: [{
      title: "JIKU: Mobile Arbeitsplaetze",
      paragraphs: ["Lastenheft: 20 Nutzer, Homeoffice, DSGVO. Pflichtenheft: Lenovo X, Intune, AES-256."],
      steps: ["Lastenheft lesen (Kunde).", "Loesung planen.", "Pflichtenheft schreiben.", "Abstimmen."]
    }],
    vocabulary: [
      mkVocab("Lastenheft", "documento de requisitos (cliente)", "Kundensicht — Was.", "Anforderungen Auftraggeber."),
      mkVocab("Pflichtenheft", "documento de solucao (fornecedor)", "Anbietersicht — Wie.", "Umsetzungskonzept."),
      mkVocab("Auftraggeber", "contratante", "Gibt Auftrag.", "Kunde."),
      mkVocab("Auftragnehmer", "contratado", "Erbringt Leistung.", "JIKU IT-Solutions."),
      mkVocab("Anforderung", "requisito", "In Lastenheft zentral.", "Funktionale Anforderung."),
      mkVocab("Loesungskonzept", "conceito de solucao", "In Pflichtenheft.", "Technische Umsetzung."),
      mkVocab("Schnittstelle", "interface", "Verbindung zwischen Systemen.", "API, VPN."),
      mkVocab("Abnahme", "aceitacao", "Kunde prueft Ergebnis.", "Nach Pflichtenheft-Umsetzung.")
    ],
    summary: ["Lastenheft = Kunde/WAS. Pflichtenheft = Anbieter/WIE.", "Beide dokumentieren Projekt.", "AP1: Zuordnung ist Pflicht."],
    mindMap: "Lastenheft (Kunde/WAS) ↔ Pflichtenheft (Anbieter/WIE)",
    exercises: {
      easy: [
        mkEx("Lastenheft — wessen Sicht?", "Auftraggeber/Kunde."),
        mkEx("Pflichtenheft — wessen Sicht?", "Auftragnehmer/Anbieter."),
        mkEx("Lastenheft fragt?", "WAS und WOFUER.")
      ],
      intermediate: [
        mkEx("Notebook-Modell — Lasten- oder Pflichtenheft?", "Pflichtenheft — technische Umsetzung."),
        mkEx("'20 sichere Arbeitsplaetze' — wo?", "Lastenheft — Kundenanforderung."),
        mkEx("Warum beide Dokumente?", "Klarheit zwischen Wunsch und Umsetzung.")
      ],
      ap1Style: [
        mkEx("AP1: Pflichtenheft vom Kunden geschrieben — richtig?", "Falsch — Kunde schreibt Lastenheft."),
        mkEx("AP1: Lastenheft enthaelt Quellcode?", "Falsch — das waere Pflichtenheft/Implementierung."),
        mkEx("AP1: Ordnen Sie Lastenheft, Pflichtenheft, Abnahme.", "Plan → Umsetzung → Pruefung durch Kunde.")
      ]
    },
    commonMistakes: ["Lasten- und Pflichtenheft vertauschen.", "Technische Details ins Lastenheft."],
    revisionChecklist: ["Lasten vs Pflicht.", "Auftraggeber vs Auftragnehmer.", "JIKU-Beispiel."],
    related: ["Lastenheft", "Pflichtenheft", "Anforderungsanalyse"]
  },

  "projektmanagement-iperka": {
    studyTime: "50-60 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Nennen Sie die sechs Phasen von IPERKA.",
      "Erklaeren Sie berufliches Vorgehen statt impulsives Handeln.",
      "Wenden Sie IPERKA auf IT-Aufgaben an."
    ],
    introduction: [
      "IPERKA strukturiert vollstaendige berufliche Handlungen: Informieren, Planen, Entscheiden, Realisieren, Kontrollieren, Auswerten.",
      "In der Ausbildung und AP1 ist planvolles Arbeiten zentral."
    ],
    explanation: [
      {
        title: "Die sechs Phasen",
        paragraphs: [
          "I — Informieren: Informationen sammeln, Auftrag verstehen.",
          "P — Planen: Ablauf, Material, Zeit, Rollen planen.",
          "E — Entscheiden: Optionen abwaegen, Loesung waehlen.",
          "R — Realisieren: Plan ausfuehren.",
          "K — Kontrollieren: Ergebnis gegen Anforderung pruefen.",
          "A — Auswerten: Reflektieren, verbessern, dokumentieren."
        ]
      },
      {
        title: "IT-Beispiel",
        paragraphs: [
          "Arbeitsplatzinstallation: Anforderungen lesen(I), Schritte planen(P), Konfiguration waehlen(E), einrichten(R), testen(K), Protokoll(A).",
          "Nicht sofort loslegen — erst verstehen und planen."
        ]
      }
    ],
    realWorldExamples: ["Ticket loesen ohne Kontrolle → Fehler bleibt — IPERKA verhindert das."],
    practicalExamples: [{
      title: "JIKU: PC-Einrichtung",
      paragraphs: ["I: Kundenwunsch. P: Checkliste. E: Windows vs Linux. R: Installation. K: Login-Test. A: Protokoll."],
      steps: ["IPERKA auf Aufgabe mappen.", "Jede Phase benennen.", "Ergebnis dokumentieren."]
    }],
    vocabulary: [
      mkVocab("IPERKA", "metodo IPERKA", "Informieren-Planen-Entscheiden-Realisieren-Kontrollieren-Auswerten.", "Handlungsmodell."),
      mkVocab("Informieren", "informar", "Informationen beschaffen.", "Erste Phase."),
      mkVocab("Planen", "planejar", "Vorgehen strukturieren.", "Checkliste, Zeitplan."),
      mkVocab("Entscheiden", "decidir", "Loesung waehlen.", "Option A oder B."),
      mkVocab("Realisieren", "realizar", "Umsetzen.", "Installation durchfuehren."),
      mkVocab("Kontrollieren", "controlar", "Ergebnis pruefen.", "Funktionstest."),
      mkVocab("Auswerten", "avaliar", "Reflektieren und lernen.", "Was lief gut?"),
      mkVocab("Handlungsprodukt", "produto da acao", "Ergebnis der Aufgabe.", "Protokoll, Angebot.")
    ],
    summary: ["IPERKA = 6 Phasen strukturiert.", "Kontrollieren und Auswerten nicht vergessen.", "Planen vor Realisieren."],
    mindMap: "IPERKA → I → P → E → R → K → A",
    exercises: {
      easy: [
        mkEx("Was bedeutet I in IPERKA?", "Informieren."),
        mkEx("Letzte Phase IPERKA?", "Auswerten."),
        mkEx("Warum Planen?", "Strukturiertes, nachvollziehbares Vorgehen.")
      ],
      intermediate: [
        mkEx("Kontrollieren vs Auswerten?", "Kontrolle=Ergebnis ok?; Auswerten=Reflexion/Lernen."),
        mkEx("Entscheiden — Beispiel?", "Welches Notebookmodell bei Budget X."),
        mkEx("IPERKA bei Ticket?", "I=Symptom lesen, P=Schritte, R=Fix, K=Test, A=Doku.")
      ],
      ap1Style: [
        mkEx("AP1: Sofort installieren ohne Plan — IPERKA?", "Fehlt I, P, E — unprofessionell."),
        mkEx("AP1: Reihenfolge R vor P?", "Falsch — Realisieren nach Planen."),
        mkEx("AP1: Handlungsprodukt nennen.", "Protokoll, Angebot, Testbericht.")
      ]
    },
    commonMistakes: ["K und A ueberspringen.", "IPERKA mit Projektmanagement-Software verwechseln."],
    revisionChecklist: ["6 Phasen auswendig.", "IT-Beispiel durch IPERKA.", "K vs A erklaeren."],
    related: ["IPERKA", "Planen", "Kontrollieren", "Handlungsprodukt"]
  },

  "kalkulation": {
    studyTime: "55-70 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Berechnen Sie einfache Angebote mit Material und Arbeitszeit.",
      "Unterscheiden Sie Netto, Brutto, Umsatzsteuer und Stundensatz.",
      "Erklaeren Sie Gewinn und Wirtschaftlichkeit auf AP1-Niveau."
    ],
    introduction: [
      "IT-Leistungen kosten Hardware plus Arbeitszeit plus Overhead. Kalkulation macht Preise nachvollziehbar.",
      "AP1 kann einfache Rechenaufgaben und Begriffe abfragen."
    ],
    explanation: [
      {
        title: "Angebotsbestandteile",
        paragraphs: [
          "Materialkosten: Hardware, Lizenzen.",
          "Lohnkosten: Stunden × Stundensatz.",
          "Gemeinkosten/Zuschlag: Overhead des Betriebs.",
          "Gewinnaufschlag: Marge des Unternehmens."
        ]
      },
      {
        title: "Netto und Brutto",
        paragraphs: [
          "Netto: ohne Umsatzsteuer (MwSt). Brutto: inkl. MwSt.",
          "Brutto = Netto × (1 + MwSt/100). In DE oft 19% MwSt.",
          "Beispiel: 100 € netto + 19% = 119 € brutto."
        ]
      }
    ],
    realWorldExamples: ["3h Installation à 85 €/h + PC 600 € netto → Angebot kalkulieren."],
    practicalExamples: [{
      title: "JIKU: Angebot",
      paragraphs: ["PC 600 € + 2h × 90 € = 780 € netto. Brutto 780 × 1,19 = 928,20 €."],
      steps: ["Material.", "Stunden × Satz.", "Summe netto.", "MwSt addieren."]
    }],
    vocabulary: [
      mkVocab("Kalkulation", "calculo/orcamento", "Preisermittlung.", "Angebot erstellen."),
      mkVocab("Stundensatz", "taxa horaria", "Preis pro Arbeitsstunde.", "85 €/h."),
      mkVocab("Netto", "liquido (sem IVA)", "Ohne MwSt.", "100 € netto."),
      mkVocab("Brutto", "bruto (com IVA)", "Mit MwSt.", "119 € brutto."),
      mkVocab("Umsatzsteuer", "IVA", "Mehrwertsteuer.", "19% in DE."),
      mkVocab("Gewinn", "lucro", "Ueberschuss.", "Preis minus Kosten."),
      mkVocab("Gemeinkosten", "custos indiretos", "Betriebskosten-Zuschlag.", "Miete, Verwaltung."),
      mkVocab("Angebotspreis", "preco da proposta", "Endpreis fuer Kunde.", "Brutto in Angebot.")
    ],
    summary: ["Material + Arbeitszeit + Zuschlag = Angebot.", "Netto + MwSt = Brutto.", "Sauber rechnen und begruenden."],
    mindMap: "Kalkulation → Material + Stunden → Netto → MwSt → Brutto",
    exercises: {
      easy: [
        mkEx("Netto vs Brutto?", "Netto ohne MwSt; Brutto mit MwSt."),
        mkEx("2h à 50 €/h?", "100 €."),
        mkEx("MwSt 19% auf 100 € netto?", "19 € — brutto 119 €.")
      ],
      intermediate: [
        mkEx("PC 500 € + 3h × 80 € netto?", "500 + 240 = 740 € netto."),
        mkEx("Brutto 119 € — netto bei 19%?", "100 € netto."),
        mkEx("Warum Stundensatz?", "Arbeitszeit bewerten und verrechnen.")
      ],
      ap1Style: [
        mkEx("AP1: Angebot nur Hardware — fehlt?", "Arbeitszeit/Support-Kosten."),
        mkEx("AP1: 100 € brutto = 100 € netto?", "Falsch — brutto ist hoeher bei MwSt."),
        mkEx("AP1: Gewinn erklaeren.", "Erlös minus Kosten — Ueberschuss fuer Betrieb.")
      ]
    },
    commonMistakes: ["Netto/Brutto verwechseln.", "Arbeitszeit vergessen."],
    revisionChecklist: ["Netto/Brutto rechnen.", "Stundensatz anwenden.", "Angebotssumme."],
    related: ["Stundensatz", "Netto", "Brutto", "Angebot"]
  },

  "osi": {
    studyTime: "60-75 Minuten",
    stars: "★★★★★",
    objectives: [
      "Nennen Sie die sieben OSI-Schichten in Reihenfolge.",
      "Ordnen Sie Geraete und Protokolle den Schichten zu.",
      "Nutzen Sie OSI zur strukturierten Fehlersuche."
    ],
    introduction: [
      "Das OSI-Modell teilt Netzwerkkommunikation in 7 Schichten — konzeptionell, aber AP1-relevant.",
      "Switch = Schicht 2, Router = Schicht 3, TCP/UDP = 4, HTTP/DNS = 7."
    ],
    explanation: [
      {
        title: "Die 7 Schichten (Merksatz: AllPeopleSeemToNeedDataProcessing)",
        paragraphs: [
          "7 Anwendung — HTTP, DNS, SMTP. 6 Darstellung — Kodierung, Verschluesselung.",
          "5 Sitzung — Session-Management. 4 Transport — TCP, UDP.",
          "3 Vermittlung — IP, Router. 2 Sicherung — MAC, Switch.",
          "1 Bituebertragung — Kabel, Funk, Bits."
        ]
      },
      {
        title: "Praxis",
        paragraphs: [
          "OSI ist Referenzmodell — TCP/IP ist praxisnaeher mit 4 Schichten.",
          "Fehlersuche von unten: Kabel(1) → Link(2) → IP(3) → Transport(4) → DNS(7)."
        ]
      }
    ],
    realWorldExamples: ["IP ok, Name nicht → Verdacht Schicht 7 (DNS) oder 4."],
    practicalExamples: [{
      title: "JIKU: Fehlersuche",
      paragraphs: ["Kein Netz: Schicht 1 Kabel? Schicht 2 Link? Schicht 3 IP/Gateway? Schicht 7 DNS?"],
      steps: ["Symptom.", "Schicht zuordnen.", "Test pro Schicht.", "Dokumentieren."]
    }],
    vocabulary: [
      mkVocab("OSI-Modell", "modelo OSI", "7-Schichten-Referenzmodell.", "Open Systems Interconnection."),
      mkVocab("Schicht", "camada", "Ebene mit Aufgabe.", "Layer 1-7."),
      mkVocab("Bituebertragungsschicht", "camada fisica", "Schicht 1.", "Kabel, Hub."),
      mkVocab("Sicherungsschicht", "camada de enlace", "Schicht 2.", "MAC, Switch."),
      mkVocab("Vermittlungsschicht", "camada de rede", "Schicht 3.", "IP, Router."),
      mkVocab("Transportschicht", "camada de transporte", "Schicht 4.", "TCP, UDP."),
      mkVocab("Anwendungsschicht", "camada de aplicacao", "Schicht 7.", "HTTP, DNS."),
      mkVocab("Protokoll", "protocolo", "Regeln der Kommunikation.", "TCP, IP, HTTP.")
    ],
    summary: ["7 Schichten von Bits bis Anwendung.", "Geraete/Protokolle zuordnen.", "Fehlersuche bottom-up."],
    mindMap: "OSI → 1-Physical → 2-Data → 3-Network → 4-Transport → 5-7-App",
    exercises: {
      easy: [
        mkEx("Wie viele OSI-Schichten?", "7."),
        mkEx("Router — welche Schicht?", "Schicht 3 (Vermittlung)."),
        mkEx("Switch — welche Schicht?", "Schicht 2 (Sicherung).")
      ],
      intermediate: [
        mkEx("TCP — Schicht?", "4 Transport."),
        mkEx("HTTP — Schicht?", "7 Anwendung."),
        mkEx("Cabo desconectado — Schicht?", "1 Bituebertragung.")
      ],
      ap1Style: [
        mkEx("AP1: DNS — Schicht?", "7 Anwendung (Namensaufloesung fuer Apps)."),
        mkEx("AP1: OSI vs TCP/IP?", "OSI=7 Schichten Referenz; TCP/IP=4 Schichten Praxis."),
        mkEx("AP1: IP falsch — Schicht?", "3 Vermittlung.")
      ]
    },
    commonMistakes: ["Schichtennummern verwechseln.", "OSI mit TCP/IP identisch sehen."],
    revisionChecklist: ["7 Schichten nennen.", "Switch/Router/TCP/DNS zuordnen.", "Fehlersuche-Beispiel."],
    related: ["Schicht", "Router", "Switch", "TCP"]
  },

  "tcp": {
    studyTime: "50-60 Minuten",
    stars: "★★★★☆",
    objectives: [
      "Erklaeren Sie TCP als verbindungsorientiertes, zuverlaessiges Protokoll.",
      "Unterscheiden Sie TCP und UDP.",
      "Ordnen Sie TCP der OSI-Schicht 4 zu."
    ],
    introduction: [
      "TCP (Transmission Control Protocol) garantiert Reihenfolge, Bestaetigung und erneute Uebertragung.",
      "HTTPS und viele Anwendungen nutzen TCP wegen Zuverlaessigkeit."
    ],
    explanation: [
      {
        title: "Eigenschaften",
        paragraphs: [
          "Verbindungsaufbau: 3-Way-Handshake (SYN, SYN-ACK, ACK).",
          "Quell- und Zielport identifizieren Anwendung (z.B. 443 HTTPS).",
          "Fehlerhafte Pakete werden erneut gesendet — zuverlaessig aber langsamer als UDP."
        ]
      }
    ],
    realWorldExamples: ["Webseite laden per HTTPS — TCP Port 443."],
    practicalExamples: [{ title: "JIKU: Webserver", paragraphs: ["TCP 443 zwischen Client und Server — Reihenfolge der HTTP-Daten garantiert."], steps: ["Port 443.", "Handshake.", "Datenuebertragung.", "Verbindung beenden."] }],
    vocabulary: [
      mkVocab("TCP", "protocolo TCP", "Transmission Control Protocol.", "Zuverlaessig, verbindungsorientiert."),
      mkVocab("Port", "porta", "Service-Identifikator.", "443 HTTPS."),
      mkVocab("Handshake", "handshake", "Verbindungsaufbau.", "SYN, SYN-ACK, ACK."),
      mkVocab("Bestaetigung", "confirmacao", "ACK bestaetigt Empfang.", "Zuverlaessigkeit."),
      mkVocab("Reihenfolge", "ordem", "Pakete in richtiger Order.", "TCP garantiert."),
      mkVocab("Transportschicht", "camada 4", "OSI Layer 4.", "TCP und UDP."),
      mkVocab("Verbindungsorientiert", "orientado a conexao", "Erst Verbindung, dann Daten.", "Gegenteil: UDP."),
      mkVocab("Paket", "pacote", "Dateneinheit der Vermittlung.", "Wird von TCP segmentiert.")
    ],
    summary: ["TCP = zuverlaessig, Schicht 4.", "Ports fuer Dienste.", "HTTPS nutzt TCP."],
    mindMap: "TCP → Schicht 4 → Port → Handshake → Zuverlaessig",
    exercises: {
      easy: [mkEx("TCP — OSI-Schicht?", "4."), mkEx("TCP vs UDP — zuverlaessig?", "TCP."), mkEx("HTTPS Port?", "443.")],
      intermediate: [mkEx("3-Way-Handshake Zweck?", "Verbindung aufbauen."), mkEx("Warum TCP fuer Web?", "Daten muessen vollstaendig und geordnet ankommen."), mkEx("Port vs IP?", "IP=Host; Port=Service auf Host.")],
      ap1Style: [mkEx("AP1: TCP ohne Verbindungsaufbau?", "Falsch — verbindungsorientiert."), mkEx("AP1: UDP fuer E-Mail?", "Unueblich — E-Mail nutzt meist TCP (SMTP)."), mkEx("AP1: TCP Schicht 7?", "Falsch — Schicht 4.")]
    },
    commonMistakes: ["TCP mit IP verwechseln.", "Port mit IP verwechseln."],
    revisionChecklist: ["TCP Eigenschaften.", "Schicht 4.", "TCP vs UDP."],
    related: ["UDP", "Port", "Transportschicht", "HTTPS"]
  },

  "udp": {
    studyTime: "45-55 Minuten",
    stars: "★★★☆☆",
    objectives: ["Erklaeren Sie UDP als verbindungslos und schnell.", "Nennen Sie Einsatzfaelle Streaming/VoIP.", "Unterscheiden Sie TCP und UDP."],
    introduction: ["UDP sendet ohne Garantie — schneller, weniger Overhead.", "AP1: Geschwindigkeit vs Zuverlaessigkeit."],
    explanation: [{ title: "Eigenschaften", paragraphs: ["Kein Handshake, keine Bestaetigung, keine Reihenfolgegarantie.", "Gut fuer Echtzeit: VoIP, Streaming, DNS-Anfragen (kurz).", "Packet loss moeglich — Anwendung muss ggf. tolerieren."] }],
    realWorldExamples: ["Video-Stream — einzelne verlorene Frames weniger kritisch als Stopp."],
    practicalExamples: [{ title: "DNS per UDP", paragraphs: ["DNS-Anfrage oft UDP Port 53 — schnelle Antwort, kleine Daten."], steps: ["Anfrage senden.", "Antwort empfangen.", "Bei Timeout erneut oder TCP."] }],
    vocabulary: [
      mkVocab("UDP", "protocolo UDP", "User Datagram Protocol.", "Verbindungslos."),
      mkVocab("Verbindungslos", "sem conexao", "Kein Handshake.", "Sofort senden."),
      mkVocab("Echtzeit", "tempo real", "Niedrige Latenz wichtig.", "VoIP, Gaming."),
      mkVocab("Packet Loss", "perda de pacotes", "Daten kommen nicht an.", "Bei UDP moeglich."),
      mkVocab("Overhead", "sobrecarga", "Zusaetzlicher Protokollaufwand.", "TCP hat mehr Overhead."),
      mkVocab("Streaming", "streaming", "Kontinuierliche Medien.", "Oft UDP."),
      mkVocab("DNS", "DNS", "Namensaufloesung.", "Oft UDP 53."),
      mkVocab("Latenz", "latencia", "Verzoegerung.", "UDP oft niedriger.")
    ],
    summary: ["UDP = schnell, unzuverlaessig, Schicht 4.", "TCP vs UDP: Zuverlaessigkeit vs Geschwindigkeit."],
    mindMap: "UDP → Schicht 4 → schnell → Streaming/DNS",
    exercises: {
      easy: [mkEx("UDP verbindungsorientiert?", "Nein — verbindungslos."), mkEx("UDP Schicht?", "4."), mkEx("TCP vs UDP Geschwindigkeit?", "UDP oft schneller.")],
      intermediate: [mkEx("VoIP — TCP oder UDP?", "Oft UDP — Latenz wichtig."), mkEx("Nachteil UDP?", "Keine Liefergarantie."), mkEx("DNS Port?", "53.")],
      ap1Style: [mkEx("AP1: UDP fuer Bankueberweisung?", "Unpassend — TCP wegen Zuverlaessigkeit."), mkEx("AP1: UDP garantiert Reihenfolge?", "Nein."), mkEx("AP1: Beide Schicht 4?", "Ja — TCP und UDP sind Transportprotokolle.")]
    },
    commonMistakes: ["UDP als 'schlecht' ohne Kontext.", "DNS nur UDP — kann auch TCP."],
    revisionChecklist: ["UDP Eigenschaften.", "Anwendungsfall.", "TCP Vergleich."],
    related: ["TCP", "Port", "DNS", "Latenz"]
  },

  "ipv4": {
    studyTime: "55-70 Minuten",
    stars: "★★★★★",
    objectives: ["Erklaeren Sie IPv4-Adresse und Subnetzmaske.", "Berechnen Sie Netzwerk und Hostbereich auf AP1-Niveau.", "Unterscheiden Sie private und oeffentliche Adressen."],
    introduction: ["IPv4: 32 Bit, vier Oktette (z.B. 192.168.1.10). Maske trennt Netz- und Hostteil.", "AP1: IP, Maske, Gateway, Broadcast."],
    explanation: [
      { title: "Adresse und Maske", paragraphs: ["IP identifiziert Host. Subnetzmaske (z.B. 255.255.255.0 = /24) definiert Netz.", "Gleiche Netzadresse = gleiches Subnetz — direkte Kommunikation.", "Standardgateway: Router-IP fuer andere Netze."] },
      { title: "Private Bereiche", paragraphs: ["10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — nicht routbar im Internet.", "NAT uebersetzt privat → oeffentlich."] }
    ],
    realWorldExamples: ["192.168.1.10/24 — Netz 192.168.1.0, Hosts .1-.254, Gateway oft .1."],
    practicalExamples: [{ title: "JIKU: Buero-LAN", paragraphs: ["PC 192.168.10.5, Maske 255.255.255.0, Gateway 192.168.10.1."], steps: ["IP pruefen.", "Maske.", "Gateway ping.", "Erreichbarkeit Server."] }],
    vocabulary: [
      mkVocab("IPv4", "endereco IPv4", "32-Bit-Adresse.", "192.168.1.10"),
      mkVocab("Subnetzmaske", "mascara de sub-rede", "Trennt Netz und Host.", "255.255.255.0"),
      mkVocab("Standardgateway", "gateway padrao", "Router ins andere Netz.", "192.168.1.1"),
      mkVocab("Broadcastadresse", "endereco broadcast", "Alle Hosts im Netz.", "192.168.1.255"),
      mkVocab("Netzwerkadresse", "endereco de rede", "Erste Adresse des Netzes.", "192.168.1.0"),
      mkVocab("private Adresse", "endereco privado", "Nicht internetroutbar.", "192.168.x.x"),
      mkVocab("Oktett", "octeto", "Ein Byte der IP.", "Vier Oktette."),
      mkVocab("/24", "CIDR /24", "24 Bit Netzanteil.", "255.255.255.0")
    ],
    summary: ["IP + Maske = Netz und Host.", "Gateway fuer Routing.", "Private IPs + NAT."],
    mindMap: "IPv4 → Maske → Netz/Host → Gateway → privat/oeffentlich",
    exercises: {
      easy: [mkEx("Wofuer Subnetzmaske?", "Trennt Netz- und Hostteil."), mkEx("Gateway Zweck?", "Route in andere Netze."), mkEx("Private IP Beispiel?", "192.168.1.10")],
      intermediate: [mkEx("192.168.1.10/24 — Netz?", "192.168.1.0"), mkEx("Gleiches Netz bei /24?", "Erste drei Oktette gleich."), mkEx("Broadcast 192.168.1.0/24?", "192.168.1.255")],
      ap1Style: [mkEx("AP1: IP 192.168.1.10, Maske 255.255.255.0, Server 192.168.2.5 — Problem?", "Anderes Netz — braucht Router/Gateway."), mkEx("AP1: 169.254.x.x?", "APIPA — DHCP fehlgeschlagen."), mkEx("AP1: /24 entspricht Maske?", "255.255.255.0")]
    },
    commonMistakes: ["Gateway vergessen.", "Netz- und Hostteil verwechseln."],
    revisionChecklist: ["IP/Maske erklaeren.", "Netz berechnen.", "Gateway und privat."],
    related: ["Subnetzmaske", "Gateway", "NAT", "DHCP"]
  },

  "nat": {
    studyTime: "45-55 Minuten",
    stars: "★★★★☆",
    objectives: ["Erklaeren Sie NAT als Uebersetzung privater in oeffentliche IPs.", "Beschreiben Sie Heimrouter-Szenario.", "Verbinden Sie NAT mit IPv4-Adressknappheit."],
    introduction: ["NAT (Network Address Translation) — Router uebersetzt interne IPs nach extern.", "Typisch: viele Geraete, eine oeffentliche IP."],
    explanation: [{ title: "Funktion", paragraphs: ["Intern: 192.168.x.x privat. Extern: eine oeffentliche IP des Routers.", "NAT-Tabelle mappt interne Port/IP auf externe.", "Ermoeglicht Internetzugang ohne oeffentliche IP pro Geraet."] }],
    realWorldExamples: ["Heim-WLAN: Handy, PC, TV teilen eine oeffentliche IP des Routers."],
    practicalExamples: [{ title: "JIKU: Buero", paragraphs: ["Mitarbeiter-PCs privat, Firewall/Router mit NAT ins Internet."], steps: ["Private IPs.", "Router NAT.", "Oeffentliche IP.", "Rueckuebersetzung."] }],
    vocabulary: [
      mkVocab("NAT", "NAT", "Network Address Translation.", "IP-Uebersetzung."),
      mkVocab("private IP", "IP privada", "Internes Netz.", "192.168.1.5"),
      mkVocab("oeffentliche IP", "IP publica", "Internet-routbar.", "Vom ISP."),
      mkVocab("Router", "roteador", "Fuehrt NAT oft aus.", "Heimrouter."),
      mkVocab("Portweiterleitung", "encaminhamento de porta", "Spezifischer Dienst nach innen.", "Port 443 → Server."),
      mkVocab("NAT-Tabelle", "tabela NAT", "Zuordnung intern/extern.", "Session tracking."),
      mkVocab("ISP", "provedor", "Internet Service Provider.", "Vergibt oeffentliche IP."),
      mkVocab("Firewall", "firewall", "Oft mit NAT kombiniert.", "Filtert und uebersetzt.")
    ],
    summary: ["NAT = privat → oeffentlich.", "Heimrouter klassisches Beispiel.", "Spart oeffentliche IPv4-Adressen."],
    mindMap: "NAT → private IP → Router → oeffentliche IP",
    exercises: {
      easy: [mkEx("Was macht NAT?", "Uebersetzt IP-Adressen zwischen Netzen."), mkEx("Warum NAT zuhause?", "Eine oeffentliche IP fuer viele Geraete."), mkEx("NAT wo?", "Router/Firewall.")],
      intermediate: [mkEx("NAT und private Adressen?", "Private IPs brauchen NAT fuer Internet."), mkEx("Portweiterleitung?", "Externer Port → interner Host."), mkEx("NAT Sicherheit?", "Versteckt interne Struktur — kein Ersatz fuer Firewall.")],
      ap1Style: [mkEx("AP1: Jedes Geraet braucht oeffentliche IP?", "Nein — NAT erlaubt Sharing."), mkEx("AP1: NAT auf Schicht 3?", "Ja — Vermittlung/Routing-Ebene."), mkEx("AP1: NAT = Verschluesselung?", "Falsch — nur Adressuebersetzung.")]
    },
    commonMistakes: ["NAT mit VPN verwechseln.", "NAT als Sicherheitsfeature allein."],
    revisionChecklist: ["NAT erklaeren.", "Heimrouter Beispiel.", "privat/oeffentlich."],
    related: ["IPv4", "Router", "private Adresse", "Firewall"]
  },

  "vpn": {
    studyTime: "50-60 Minuten",
    stars: "★★★★☆",
    objectives: ["Erklaeren Sie VPN als verschluesselten Tunnel.", "Beschreiben Sie Remote Access.", "Unterscheiden Sie VPN und NAT."],
    introduction: ["VPN (Virtual Private Network) — sichere Verbindung ueber unsicheres Netz (Internet).", "Homeoffice: Mitarbeiter → VPN → Firmennetz."],
    explanation: [{ title: "Funktion", paragraphs: ["Tunnel verschluesselt Daten zwischen Client und VPN-Gateway.", "Remote Access: externer Nutzer erhaelt Zugang wie im Buero.", "Site-to-Site: verbindet zwei Standorte."] }],
    realWorldExamples: ["Azubi arbeitet von zuhause, verbindet VPN, erreicht interne Server."],
    practicalExamples: [{ title: "JIKU: Homeoffice", paragraphs: ["VPN-Client, Firmenzertifikat, Tunnel zu JIKU-Gateway, interne Tools erreichbar."], steps: ["VPN starten.", "Authentifizieren.", "Tunnel pruefen.", "Interne Dienste nutzen."] }],
    vocabulary: [
      mkVocab("VPN", "VPN", "Virtual Private Network.", "Verschluesselter Tunnel."),
      mkVocab("Tunnel", "tunel", "Virtuelle Verbindung.", "Ueber Internet."),
      mkVocab("Verschluesselung", "criptografia", "Schutz der Daten.", "IPSec, SSL-VPN."),
      mkVocab("Remote Access", "acesso remoto", "Zugang von aussen.", "Homeoffice."),
      mkVocab("VPN-Gateway", "gateway VPN", "Serverseite des VPN.", "Firmen-Firewall."),
      mkVocab("Authentifizierung", "autenticacao", "Nutzer nachweisen.", "Benutzer/Passwort, Zertifikat."),
      mkVocab("Split Tunneling", "split tunneling", "Nur Firmen-Traffic durch VPN.", "Rest direkt Internet."),
      mkVocab("Site-to-Site", "site-to-site", "Standort verbindet Standort.", "Filialen vernetzen.")
    ],
    summary: ["VPN = sicherer Tunnel ueber Internet.", "Remote Access fuer Homeoffice.", "Nicht verwechseln mit NAT."],
    mindMap: "VPN → Tunnel → Verschluesselung → Remote Access",
    exercises: {
      easy: [mkEx("Wofuer VPN?", "Sicherer Fernzugriff auf Firmennetz."), mkEx("VPN ueber welches Netz?", "Oft oeffentliches Internet."), mkEx("VPN = physisches Kabel?", "Nein — virtuell.")],
      intermediate: [mkEx("VPN vs NAT?", "NAT=Adressuebersetzung; VPN=verschluesselter Tunnel."), mkEx("Warum Verschluesselung?", "Daten auf oeffentlichem Weg schuetzen."), mkEx("VPN-Client?", "Software auf Endgeraet.")],
      ap1Style: [mkEx("AP1: VPN ohne Authentifizierung?", "Unsicher — Identitaet pruefen."), mkEx("AP1: VPN ersetzt Firewall?", "Nein — ergaenzt Sicherheit."), mkEx("AP1: Remote Access Beispiel?", "Homeoffice Mitarbeiter → Firmen-Intranet.")]
    },
    commonMistakes: ["VPN mit Proxy verwechseln.", "VPN allein = totale Sicherheit."],
    revisionChecklist: ["VPN erklaeren.", "Homeoffice Beispiel.", "VPN vs NAT."],
    related: ["Verschluesselung", "Remote Access", "Firewall", "NAT"]
  },

  "dns": {
    studyTime: "55-65 Minuten",
    stars: "★★★★★",
    objectives: ["Erklaeren Sie DNS als Namensaufloesung.", "Nennen Sie A, CNAME, MX auf Grundniveau.", "Fehlersuche: IP ok, Name nicht."],
    introduction: ["DNS uebersetzt Namen (www.example.com) in IP-Adressen.", "AP1: DNS-Server, Cache, Resolver, FQDN."],
    explanation: [
      { title: "Ablauf", paragraphs: ["Client fragt DNS-Server (Resolver).", "Rekursiv oder iterativ bis autoritative Antwort.", "Antwort wird gecacht — TTL begrenzt Gueltigkeit."] },
      { title: "Record-Typen", paragraphs: ["A: Name → IPv4. AAAA: IPv6. CNAME: Alias. MX: Mail-Server.", "FQDN: vollqualifizierter Domainname."] }
    ],
    realWorldExamples: ["Browser www.jiku.de — DNS liefert IP — dann HTTP-Verbindung."],
    practicalExamples: [{ title: "JIKU: Intranet", paragraphs: ["intranet.jiku.local loest nicht auf — nslookup pruefen, DNS-Eintrag fehlt."], steps: ["nslookup.", "DNS-Server pruefen.", "Eintrag pruefen.", "Cache leeren testen."] }],
    vocabulary: [
      mkVocab("DNS", "DNS", "Domain Name System.", "Name zu IP."),
      mkVocab("DNS-Server", "servidor DNS", "Beantwortet Anfragen.", "8.8.8.8 Google."),
      mkVocab("Resolver", "resolvedor", "Loest Namen auf.", "Client oder lokal."),
      mkVocab("A-Record", "registro A", "Hostname → IPv4.", "www → 93.184.216.34"),
      mkVocab("CNAME", "CNAME", "Alias auf anderen Namen.", "shop → www."),
      mkVocab("FQDN", "FQDN", "Vollqualifizierter Name.", "server1.jiku.de."),
      mkVocab("TTL", "TTL", "Time to Live im Cache.", "Sekunden gueltig."),
      mkVocab("nslookup", "nslookup", "DNS-Abfrage-Tool.", "Fehlersuche.")
    ],
    summary: ["DNS: Name → IP.", "IP erreichbar, Name nicht → DNS-Verdacht.", "A, CNAME, MX Grundbegriffe."],
    mindMap: "DNS → Resolver → A/CNAME/MX → Cache → nslookup",
    exercises: {
      easy: [mkEx("DNS Hauptaufgabe?", "Namen in IP-Adressen aufloesen."), mkEx("A-Record?", "Name zu IPv4."), mkEx("Tool DNS testen?", "nslookup oder dig.")],
      intermediate: [mkEx("IP geht, Name nicht?", "DNS-Problem wahrscheinlich."), mkEx("CNAME?", "Alias auf anderen Hostnamen."), mkEx("DNS bei DHCP?", "DHCP liefert oft DNS-Server-Adresse.")],
      ap1Style: [mkEx("AP1: DNS Schicht 7?", "Ja — Anwendungsprotokoll."), mkEx("AP1: DNS ersetzt IP?", "Nein — ergaenzt fuer Menschen lesbare Namen."), mkEx("AP1: MX-Record?", "Mail-Exchange fuer E-Mail.")]
    },
    commonMistakes: ["DNS mit DHCP verwechseln.", "Browser-Cache vs DNS-Cache."],
    revisionChecklist: ["DNS Ablauf.", "A-Record.", "IP ok Name nicht."],
    related: ["IP-Adresse", "DHCP", "nslookup", "HTTP"]
  },

  "dhcp": {
    studyTime: "50-60 Minuten",
    stars: "★★★★☆",
    objectives: ["Erklaeren Sie DHCP als automatische IP-Konfiguration.", "Nennen Sie Lease, Gateway, DNS aus DHCP.", "Erkennen Sie 169.254.x.x APIPA."],
    introduction: ["DHCP verteilt IP, Maske, Gateway, DNS automatisch an Clients.", "Ohne DHCP: manuelle Konfiguration noetig."],
    explanation: [
      { title: "DHCP-Ablauf", paragraphs: ["DISCOVER → OFFER → REQUEST → ACK (DORA).", "Lease: IP ist zeitlich geliehen — Renewal vor Ablauf.", "DHCP-Server kann im Router oder Windows Server laufen."] },
      { title: "Fehler", paragraphs: ["Kein DHCP: APIPA 169.254.x.x — Link-Local, kein Gateway.", "Konflikt: zwei Geraete gleiche IP — Netz stoert."] }
    ],
    realWorldExamples: ["Notebook ins WLAN — erhaelt automatisch IP, Maske, Gateway, DNS."],
    practicalExamples: [{ title: "JIKU: Buero", paragraphs: ["Neuer PC: DHCP aktiv — ipconfig zeigt IPv4, Gateway, DNS-Server."], steps: ["DHCP aktiv?", "ipconfig /all.", "Lease pruefen.", "Reservierung fuer Server."] }],
    vocabulary: [
      mkVocab("DHCP", "DHCP", "Dynamic Host Configuration Protocol.", "Automatische IP-Vergabe."),
      mkVocab("Lease", "locacao/concessao", "Mietdauer der IP.", "Erneuerung vor Ablauf."),
      mkVocab("DHCP-Server", "servidor DHCP", "Verteilt Konfiguration.", "Im Router."),
      mkVocab("APIPA", "APIPA", "169.254.x.x ohne DHCP.", "Link-Local."),
      mkVocab("Reservierung", "reserva", "Feste IP fuer MAC.", "Server immer gleiche IP."),
      mkVocab("Scope", "escopo", "IP-Bereich des DHCP.", "192.168.1.100-200"),
      mkVocab("Standardgateway", "gateway", "Wird mit DHCP verteilt.", "Router-IP."),
      mkVocab("ipconfig", "ipconfig", "Windows IP-Konfiguration.", "DHCP-Status anzeigen.")
    ],
    summary: ["DHCP: IP + Maske + Gateway + DNS automatisch.", "Lease und Renewal.", "169.254 = kein DHCP."],
    mindMap: "DHCP → DORA → Lease → Gateway/DNS → APIPA",
    exercises: {
      easy: [mkEx("Was verteilt DHCP?", "IP, Maske, Gateway, DNS, Lease."), mkEx("APIPA Adresse?", "169.254.x.x"), mkEx("DHCP Vorteil?", "Keine manuelle Konfiguration pro Client.")],
      intermediate: [mkEx("DORA?", "Discover, Offer, Request, Ack."), mkEx("Lease abgelaufen?", "Client fordert Erneuerung oder neue IP."), mkEx("Reservierung wofuer?", "Feste IP fuer bestimmtes Geraet (Server).")],
      ap1Style: [mkEx("AP1: DHCP und DNS?", "DHCP kann DNS-Server-Adresse mitgeben."), mkEx("AP1: Statische IP fuer Drucker?", "Moeglich — Reservation oder manuell."), mkEx("AP1: 169.254 — Ursache?", "DHCP nicht erreichbar.")]
    },
    commonMistakes: ["DHCP mit DNS verwechseln.", "APIPA als normales Netz sehen."],
    revisionChecklist: ["DHCP Parameter.", "DORA.", "APIPA erkennen."],
    related: ["IPv4", "DNS", "Gateway", "ipconfig"]
  },

  "osi-camada-1": {
    studyTime: "35-45 Minuten", stars: "★★★☆☆",
    objectives: ["Beschreiben Sie Schicht 1 — Bituebertragung.", "Nennen Sie Kabel, Funk, Hub.", "Erkennen Sie physische Fehler."],
    introduction: ["Schicht 1: Bits auf dem Medium — elektrisch, optisch oder Funk."],
    explanation: [{ title: "Schicht 1", paragraphs: ["Physikalische Uebertragung: Twisted Pair, Glasfaser, WLAN-Funk.", "Hub (legacy) — alles auf Schicht 1, keine Intelligenz.", "Fehler: Kabel defekt, Stecker lose, Dämpfung."] }],
    realWorldExamples: ["Netzwerkkabel nicht eingesteckt — klassischer Layer-1-Fehler."],
    practicalExamples: [{ title: "Kabel pruefen", paragraphs: ["Link-LED am Port? Kabel tauschen?"], steps: ["LED.", "Kabel.", "Stecker.", "Medienwahl."] }],
    vocabulary: [mkVocab("Bituebertragungsschicht", "camada fisica", "OSI Layer 1.", "Bits auf Medium."), mkVocab("Twisted Pair", "par trancado", "Kupferkabel.", "Cat6."), mkVocab("Glasfaser", "fibra optica", "Licht ueber Faser.", "Lange Distanz."), mkVocab("Hub", "hub", "Legacy Schicht 1.", "Alle Ports gleich."), mkVocab("Signal", "sinal", "Physische Repraesentation.", "Spannung/Licht."), mkVocab("Daempfung", "atenuacao", "Signal schwaecher.", "Lange Kabel.")],
    summary: ["Layer 1 = physisches Medium.", "Kabel/Funk/Stecker.", "Erste Stelle bei 'kein Link'."],
    mindMap: "L1 → Kabel/Funk → Bits → Hub",
    exercises: { easy: [mkEx("Schicht 1 Aufgabe?", "Bituebertragung."), mkEx("Switch Schicht 1?", "Nein — Switch ist Schicht 2."), mkEx("Glasfaser Schicht?", "1")], intermediate: [mkEx("Hub vs Switch?", "Hub L1; Switch L2."), mkEx("WLAN Schicht?", "1 (Funk medium).")], ap1Style: [mkEx("AP1: IP-Konfiguration korrekt, kein Link?", "Verdacht Schicht 1/2 — physische Verbindung.")] },
    commonMistakes: ["Switch als Schicht 1.", "Layer 1 mit Layer 3 verwechseln."],
    revisionChecklist: ["L1 definieren.", "Medien nennen.", "Fehlerbeispiel."],
    related: ["OSI", "Verkabelung", "Netzwerkmedien"]
  },

  "osi-camada-2": {
    studyTime: "40-50 Minuten", stars: "★★★★☆",
    objectives: ["Erklaeren Sie Schicht 2 — MAC, Frames, Switch.", "Unterscheiden Sie Schicht 2 und 3."],
    introduction: ["Schicht 2 (Sicherung): Frames, MAC-Adressen, Switching im LAN."],
    explanation: [{ title: "Schicht 2", paragraphs: ["MAC-Adresse: hardwarebezogen, 48 Bit.", "Switch lernt MAC-Tabelle — leitet Frames gezielt.", "VLAN (Grundidee): logische Trennung auf L2."] }],
    realWorldExamples: ["Switch leitet Frame nur an Port mit Ziel-MAC."],
    practicalExamples: [{ title: "MAC-Tabelle", paragraphs: ["Switch speichert welche MAC an welchem Port."], steps: ["Frame empfangen.", "MAC lernen.", "Ziel-MAC lookup.", "Weiterleiten."] }],
    vocabulary: [mkVocab("Sicherungsschicht", "camada de enlace", "OSI Layer 2.", "Frames/MAC."), mkVocab("MAC-Adresse", "endereco MAC", "Hardware-Adresse.", "AA:BB:CC:DD:EE:FF"), mkVocab("Frame", "quadro", "L2-Dateneinheit.", "Mit MAC-Header."), mkVocab("Switch", "switch", "L2-Weiterleitung.", "MAC-Tabelle."), mkVocab("VLAN", "VLAN", "Logisches LAN.", "Trennung."), mkVocab("Broadcast-Domain", "dominio broadcast", "L2-Bereich.", "Switch-Port.")],
    summary: ["L2 = MAC + Switch.", "LAN-Weiterleitung.", "Nicht IP — das ist L3."],
    mindMap: "L2 → MAC → Frame → Switch",
    exercises: { easy: [mkEx("Switch Schicht?", "2"), mkEx("MAC vs IP?", "MAC=L2 Hardware; IP=L3 logisch."), mkEx("Frame?", "L2-Paket.")], intermediate: [mkEx("Router auf L2?", "Nein — Router L3."), mkEx("Switch auf L2?", "Ja.")], ap1Style: [mkEx("AP1: Gleiche MAC auf zwei Ports?", "Switch lernt Port-Wechsel — kurz Stoerung moeglich.")] },
    commonMistakes: ["MAC mit IP verwechseln.", "Switch als Router."],
    revisionChecklist: ["L2/MAC/Switch.", "MAC vs IP.", "Frame."],
    related: ["Switch", "MAC-Adresse", "OSI", "LAN"]
  },

  "osi-camada-3": {
    studyTime: "45-55 Minuten", stars: "★★★★☆",
    objectives: ["Erklaeren Sie Schicht 3 — IP, Routing.", "Beschreiben Sie Router-Funktion."],
    introduction: ["Schicht 3 (Vermittlung): logische Adressierung (IP), Routing zwischen Netzen."],
    explanation: [{ title: "Schicht 3", paragraphs: ["IP-Pakete werden zwischen Netzen geroutet.", "Router entscheidet naechsten Hop via Routing-Tabelle.", "Subnetze und Gateway gehoeren zu L3."] }],
    realWorldExamples: ["Paket von 192.168.1.5 zu Server in anderem Subnetz — Router noetig."],
    practicalExamples: [{ title: "Routing", paragraphs: ["Default Route 0.0.0.0/0 → Gateway."], steps: ["Ziel-IP.", "Lokal oder remote?", "Routing-Tabelle.", "Weiterleiten."] }],
    vocabulary: [mkVocab("Vermittlungsschicht", "camada de rede", "OSI Layer 3.", "IP/Routing."), mkVocab("Router", "roteador", "L3-Geraet.", "Zwischen Netzen."), mkVocab("Routing", "roteamento", "Pfadwahl.", "Routing-Tabelle."), mkVocab("Hop", "salto", "Zwischenstation.", "Next hop."), mkVocab("Paket", "pacote", "L3-Einheit.", "Mit IP-Header."), mkVocab("Subnetz", "sub-rede", "IP-Bereich.", "/24")],
    summary: ["L3 = IP + Router.", "Netze verbinden.", "Subnetz und Gateway."],
    mindMap: "L3 → IP → Router → Routing",
    exercises: { easy: [mkEx("Router Schicht?", "3"), mkEx("IP Schicht?", "3"), mkEx("Routing?", "Pakete zwischen Netzen leiten.")], intermediate: [mkEx("Gleiches Subnetz — Router?", "Nein — direkt L2."), mkEx("Default Gateway?", "Router fuer unbekannte Netze.")], ap1Style: [mkEx("AP1: Switch routet zwischen VLANs ohne L3?", "Braucht L3-Switch oder Router.")] },
    commonMistakes: ["Router auf L2.", "Routing mit Switching verwechseln."],
    revisionChecklist: ["L3/Router/IP.", "Subnetz.", "Gateway."],
    related: ["Router", "IPv4", "Subnetz", "NAT"]
  },

  "osi-camada-4": {
    studyTime: "45-55 Minuten", stars: "★★★★☆",
    objectives: ["Erklaeren Sie Schicht 4 — TCP/UDP, Ports.", "Verbinden Sie End-zu-End-Transport mit Anwendungen."],
    introduction: ["Schicht 4 (Transport): TCP/UDP, Portnummern, End-zu-End-Kommunikation."],
    explanation: [{ title: "Schicht 4", paragraphs: ["TCP/UDP segmentieren und liefern an Anwendungen via Port.", "Port 80 HTTP, 443 HTTPS, 53 DNS, 25 SMTP.", "Firewall filtert oft auf L4 (Port/IP)."] }],
    realWorldExamples: ["192.168.1.10:443 — IP L3, Port 443 L4 HTTPS."],
    practicalExamples: [{ title: "Port pruefen", paragraphs: ["telnet server 443 oder Test-Netzwerk — Port offen?"], steps: ["IP erreichen.", "Port testen.", "Dienst identifizieren."] }],
    vocabulary: [mkVocab("Transportschicht", "camada de transporte", "OSI Layer 4.", "TCP/UDP."), mkVocab("Port", "porta", "Dienst auf Host.", "443"), mkVocab("Segment", "segmento", "L4-Einheit TCP.", "Mit Port."), mkVocab("End-zu-End", "ponta a ponta", "Vollstaendiger Transport.", "TCP."), mkVocab("Multiplexing", "multiplexacao", "Mehrere Dienste eine IP.", "Verschiedene Ports.")],
    summary: ["L4 = TCP/UDP + Ports.", "Anwendungen erreichen via Port.", "Firewall L3/L4."],
    mindMap: "L4 → TCP/UDP → Port → Segment",
    exercises: { easy: [mkEx("TCP Schicht?", "4"), mkEx("Port 443?", "HTTPS."), mkEx("UDP Schicht?", "4")], intermediate: [mkEx("IP und Port zusammen?", "Host + Dienst."), mkEx("HTTP Port?", "80")], ap1Style: [mkEx("AP1: Block Port 443 — Auswirkung?", "HTTPS nicht erreichbar — L4 Filter.")] },
    commonMistakes: ["Port mit IP verwechseln.", "TCP als L7 sehen."],
    revisionChecklist: ["L4/TCP/UDP/Port.", "Port 80/443/53.", "Segment."],
    related: ["TCP", "UDP", "Port", "Firewall"]
  },

  "osi-camada-5": {
    studyTime: "35-45 Minuten", stars: "★★★☆☆",
    objectives: ["Beschreiben Sie Schicht 5 — Sitzung/Session.", "Erklaeren Sie Session-Management auf Konzeptebene."],
    introduction: ["Schicht 5 (Sitzung): aufbauen, halten, beenden von Kommunikationssitzungen."],
    explanation: [{ title: "Schicht 5", paragraphs: ["Koordiniert Dialog zwischen Anwendungen.", "Login-Session, RPC-Sitzungen — konzeptionell.", "In TCP/IP oft in Anwendungsschicht integriert — OSI bleibt Lehrmodell."] }],
    realWorldExamples: ["Authentifizierte Web-Session — Cookie/Token haelt Sitzung."],
    practicalExamples: [{ title: "Session Timeout", paragraphs: ["Nach 30 Min Inaktivität — Session beendet, erneut Login."], steps: ["Session start.", "Aktivitaet.", "Timeout.", "Neu anmelden."] }],
    vocabulary: [mkVocab("Sitzungsschicht", "camada de sessao", "OSI Layer 5.", "Session."), mkVocab("Session", "sessao", "Kommunikationsphase.", "Login bis Logout."), mkVocab("Dialog", "dialogo", "Zweiseitige Kommunikation.", "Client-Server."), mkVocab("Synchronisation", "sincronizacao", "Session-Koordination.", "Checkpoint.")],
    summary: ["L5 = Session-Management.", "Lehrmodell — praktisch oft in L7.", "Login-Session als Beispiel."],
    mindMap: "L5 → Session → Dialog → Timeout",
    exercises: { easy: [mkEx("Schicht 5 Name?", "Sitzungsschicht."), mkEx("Session Beispiel?", "Eingeloggter Web-Nutzer."), mkEx("Schicht 5 in TCP/IP?", "Oft in Anwendung integriert.")], intermediate: [mkEx("Session vs Verbindung TCP?", "TCP=L4 Verbindung; Session=L5 Anwendungskontext.")], ap1Style: [mkEx("AP1: Session Timeout Sicherheit?", "Reduziert Risiko offener Sessions.")] },
    commonMistakes: ["L5 mit TCP-Verbindung identisch.", "L5 praktisch ignorieren — aber AP1 kann fragen."],
    revisionChecklist: ["L5 Session.", "Beispiel.", "OSI Lehrmodell."],
    related: ["OSI", "Session", "Anwendungsschicht"]
  },

  "osi-camada-6": {
    studyTime: "35-45 Minuten", stars: "★★★☆☆",
    objectives: ["Beschreiben Sie Schicht 6 — Darstellung/Praesentation.", "Nennen Sie Kodierung und Verschluesselung."],
    introduction: ["Schicht 6 (Darstellung): Format, Kodierung, Kompression, Verschluesselung fuer Anwendung."],
    explanation: [{ title: "Schicht 6", paragraphs: ["UTF-8 fuer Text, JPEG fuer Bild — Daten verstaendlich machen.", "SSL/TLS Verschluesselung konzeptionell hier oder L7 diskutiert.", "AP1: Grundidee — Format wandelt Daten."] }],
    realWorldExamples: ["HTTPS — TLS verschluesselt HTTP-Daten (Darstellung/Sicherheit)."],
    practicalExamples: [{ title: "UTF-8", paragraphs: ["Textdatei mit Umlauten — UTF-8 Kodierung noetig."], steps: ["Zeichen.", "Kodierung waehlen.", "Speichern.", "Lesen pruefen."] }],
    vocabulary: [mkVocab("Darstellungsschicht", "camada de apresentacao", "OSI Layer 6.", "Format/Kodierung."), mkVocab("Kodierung", "codificacao", "Zeichen zu Bytes.", "UTF-8."), mkVocab("Verschluesselung", "criptografia", "Daten unlesbar ohne Schluessel.", "TLS."), mkVocab("Kompression", "compressao", "Daten verkleinern.", "gzip."), mkVocab("TLS", "TLS", "Transport Layer Security.", "HTTPS.")],
    summary: ["L6 = Format/Kodierung/Verschluesselung.", "UTF-8, TLS Beispiele.", "Lehrmodell."],
    mindMap: "L6 → Kodierung → TLS → Format",
    exercises: { easy: [mkEx("Schicht 6 Aufgabe?", "Darstellung — Format/Kodierung."), mkEx("UTF-8?", "Zeichenkodierung."), mkEx("HTTPS Verschluesselung?", "TLS — konzeptionell L6/L7.")], intermediate: [mkEx("JPEG Schicht 6?", "Bildformat — Darstellung.")], ap1Style: [mkEx("AP1: Klartext-Passwort — welche Schicht hilft?", "Verschluesselung (TLS) — L6/7 Konzept.")] },
    commonMistakes: ["L6 mit L7 identisch.", "Verschluesselung nur L6 — oft L4/L7 diskutiert."],
    revisionChecklist: ["L6 Darstellung.", "UTF-8/TLS.", "Beispiel."],
    related: ["Verschluesselung", "UTF-8", "HTTPS", "OSI"]
  },

  "osi-camada-7": {
    studyTime: "45-55 Minuten", stars: "★★★★☆",
    objectives: ["Nennen Sie Protokolle der Anwendungsschicht.", "Erklaeren Sie HTTP, DNS, SMTP auf AP1-Niveau."],
    introduction: ["Schicht 7 (Anwendung): Protokolle nahe am Nutzer — HTTP, DNS, SMTP, FTP."],
    explanation: [{ title: "Schicht 7", paragraphs: ["HTTP/HTTPS — Web. DNS — Namen. SMTP — E-Mail senden. IMAP/POP3 — E-Mail abholen.", "Nutzer interagiert mit Anwendungen — darunter liegen L4-L1.", "Fehler 'Webseite nicht erreichbar' — oft L7 oder darunter DNS(L7)/Netz."] }],
    realWorldExamples: ["Browser nutzt HTTP(S) auf L7, darunter TCP L4, IP L3."],
    practicalExamples: [{ title: "Web und DNS", paragraphs: ["URL eingeben → DNS(L7) → TCP(L4) → HTTP(L7)."], steps: ["URL.", "DNS Aufloesung.", "TCP Verbindung.", "HTTP Request."] }],
    vocabulary: [mkVocab("Anwendungsschicht", "camada de aplicacao", "OSI Layer 7.", "HTTP, DNS."), mkVocab("HTTP", "HTTP", "Hypertext Transfer Protocol.", "Web."), mkVocab("HTTPS", "HTTPS", "HTTP mit TLS.", "Sicher Web."), mkVocab("SMTP", "SMTP", "E-Mail versenden.", "Port 25/587."), mkVocab("FTP", "FTP", "Dateiuebertragung.", "Port 21."), mkVocab("API", "API", "Schnittstelle fuer Anwendungen.", "REST JSON.")],
    summary: ["L7 = HTTP, DNS, SMTP, FTP.", "Nutzer-sichtbare Dienste.", "Fehlersuche: DNS/HTTP zuerst pruefen."],
    mindMap: "L7 → HTTP → DNS → SMTP → API",
    exercises: { easy: [mkEx("HTTP Schicht?", "7"), mkEx("DNS Schicht?", "7"), mkEx("Web-Protokoll?", "HTTP/HTTPS")], intermediate: [mkEx("SMTP Zweck?", "E-Mail senden."), mkEx("HTTPS vs HTTP?", "HTTPS verschluesselt.")], ap1Style: [mkEx("AP1: ping ok, Browser nein?", "Verdacht L7 Dienst oder DNS/HTTP Konfiguration."), mkEx("AP1: Port 80?", "HTTP.")] },
    commonMistakes: ["HTTP als L4.", "Alle Apps nur L7 ohne Transport."],
    revisionChecklist: ["L7 Protokolle.", "HTTP/DNS/SMTP.", "Stack Beispiel."],
    related: ["HTTP", "DNS", "SMTP", "TCP"]
  },

  ...buildLf1Lf4CuratedSpecs()
};

/** Expand remaining LF1/LF4/LF5 ids with shared deep builder from chapter metadata */
const DEEP_CHAPTER_IDS = [];

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

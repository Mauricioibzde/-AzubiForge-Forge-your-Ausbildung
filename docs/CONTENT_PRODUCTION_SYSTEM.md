# AzubiForge AP1 FIAE Content Production System

Version: 1.0  
Scope: AP1 FIAE only  
Purpose: Create a consistent, premium, exam-oriented offline study course for Ausbildung students.

This document defines how every AzubiForge AP1 chapter must be planned, written, reviewed and published.

AzubiForge is a digital study book. The product quality depends primarily on educational content quality.

---

## 01. Content Standard

### Purpose

Every chapter must help the student pass the AP1. Content is accepted only if it improves understanding, exam readiness and technical vocabulary.

### Writing Style

- Main language: German.
- German level: B1/B2.
- Sentences should be clear, direct and not unnecessarily academic.
- Use technical German terms, but explain them immediately.
- Prefer short paragraphs.
- Introduce one concept at a time.
- Avoid unexplained abbreviations.
- Avoid vague sentences such as "This is important" without explaining why.
- Use Portuguese only as support for difficult ideas, not as the main teaching language.

### German Level

The German must be realistic for an Ausbildung beginner:

- B1 for core explanations.
- B2 for technical vocabulary and AP1-style wording.
- IHK vocabulary must be included and repeated.
- Long compound words must be explained.

Examples:

- Use: "Der Arbeitsspeicher speichert Daten nur vorübergehend."
- Avoid: "Flüchtige Hauptspeicherarchitekturen dienen der temporären Datenhaltung innerhalb prozessnaher Laufzeitkontexte."

### Portuguese Support

Portuguese is allowed when it helps understanding:

- After difficult German explanations.
- In vocabulary tables.
- In summaries.
- For conceptual clarification.

Portuguese must not replace German. The student must become comfortable with German AP1 language.

### Minimum Chapter Length

A production chapter must contain:

- At least 1,500-2,500 words for normal topics.
- At least 2,500-4,000 words for large topics such as Netzwerk, Betriebssysteme, Datenbanken or Sicherheit.
- At least 15 exercises.
- At least 8 vocabulary terms.
- At least 1 diagram when the topic has structure, flow, layers, components or relationships.

Shorter chapters are allowed only for very narrow topics, but they must still teach completely.

### Explanation Quality

Every concept must be explained from zero:

1. What is it?
2. Why does it exist?
3. Where is it used?
4. How does it work?
5. What must the student remember for AP1?
6. What is commonly confused with it?

No chapter may assume previous IT knowledge unless that knowledge was already taught in an earlier chapter.

### Examples

Each chapter must include:

- Real-world company examples.
- Practical step-by-step scenarios.
- At least one AP1-style situation.

Examples must be simple, realistic and connected to Ausbildung work.

### Exercises

Every production chapter must contain at least:

- 5 Easy exercises.
- 5 Intermediate exercises.
- 5 AP1-style exercises.

Every answer must include:

- Correct answer.
- Explanation.
- Why the answer is correct.
- What common mistake the student should avoid when relevant.

### Vocabulary

Every chapter must include a vocabulary table with:

- German term.
- Portuguese translation.
- German explanation.
- Example sentence.

Vocabulary must include terms that are likely to appear in AP1 tasks.

### Summaries

Every chapter must include:

- German one-page review.
- Portuguese support summary when helpful.
- Key AP1 takeaways.

The summary must help revision, not merely repeat the introduction.

### Diagrams

Use diagrams whenever a concept has:

- Components.
- Layers.
- Flow.
- Cause and effect.
- Comparison.
- Process steps.

Preferred format: Mermaid.

Acceptable diagram types:

- Flowchart.
- Mind map.
- Sequence diagram.
- Layer diagram.
- Component relationship diagram.

### Revision Process

Every chapter must contain:

- Revision checklist.
- Exercise answers.
- Summary.
- Vocabulary.
- Common mistakes.

The student must be able to revise the chapter without rereading the entire explanation.

### Publication Requirements

A chapter is publishable only when:

- It follows the official chapter template.
- German is understandable at B1/B2.
- Portuguese support exists where useful.
- AP1 focus is explicit.
- Exercises and answers are complete.
- Vocabulary is complete.
- Diagrams are present when useful.
- Related chapters are defined.
- The revision checklist is complete.
- The chapter passed quality control.

---

## 02. Editorial Guide

### How to Introduce a Topic

Start with the learner's problem, not with a definition.

Good structure:

1. Simple real-world situation.
2. Name of the concept.
3. Basic definition.
4. Why it matters in IT.
5. Why it matters in AP1.

Example:

"Ein Computer kann viele Programme öffnen. Aber wenn zu wenig Arbeitsspeicher vorhanden ist, wird er langsam. Deshalb müssen wir verstehen, was RAM ist."

### How to Explain Concepts

Use layered explanation:

1. Everyday analogy.
2. Technical explanation.
3. AP1 wording.
4. Example.
5. Common mistake.

Never introduce three new technical terms in one sentence without explaining them.

### How to Teach Beginners

Assume the student:

- Knows how to use a computer.
- Does not yet know how computers work internally.
- May understand the concept in Portuguese but not in German.
- Needs repetition and examples.

Use repetition intentionally:

- First explanation: simple.
- Second explanation: technical.
- Third explanation: exam-oriented.

### How to Explain Difficult Concepts

For difficult topics:

- Split into small parts.
- Explain the role of each part.
- Show a diagram.
- Give a concrete scenario.
- Ask exercises immediately after.

Example for TCP:

1. Why transport protocols exist.
2. What reliability means.
3. What connection-oriented means.
4. Where TCP is used.
5. Difference to UDP.

### How to Avoid Unnecessary Complexity

Do not include advanced details unless they help AP1.

Reject:

- Deep kernel internals.
- Enterprise architecture beyond AP1.
- University-level theory.
- Vendor-specific trivia.
- Tool-specific configuration unless AP1-relevant.

Include:

- Definitions.
- Practical use.
- Comparison.
- Exam traps.
- Vocabulary.

### How to Write AP1-Oriented Content

Every chapter must answer:

- What could the IHK ask?
- What wording could appear in German?
- What mistakes do students make?
- Which concepts are often confused?
- Which detail is enough for AP1?

Use AP1-style verbs:

- nennen
- beschreiben
- erklären
- begründen
- vergleichen
- zuordnen
- berechnen when relevant
- beurteilen when relevant

### How to Create Examples

Examples must be:

- Company-related.
- Simple.
- Realistic.
- Connected to the topic.
- Useful for exam thinking.

Bad example:

"RAM is like a table."

Better example:

"Ein Mitarbeiter öffnet Browser, Teams und eine Entwicklungsumgebung. Der PC wird langsam, weil viele Programme gleichzeitig Daten im Arbeitsspeicher halten."

### How to Create AP1 Exercises

AP1-style exercises should include:

- A short scenario.
- Relevant data.
- A clear task verb.
- A required decision, explanation or comparison.

Example:

"Ein Unternehmen möchte alte HDDs in Büro-PCs durch SSDs ersetzen. Nennen Sie zwei Vorteile und begründen Sie, warum die Maßnahme die Arbeitsgeschwindigkeit verbessern kann."

---

## 03. AP1 Roadmap

This roadmap defines the intended AP1 FIAE learning progression.

The order is based on dependency: students first learn how computers work, then operating systems, then networks, then software/data/security topics.

### Module 1: Grundlagen der Informatik und Hardware

Goal: Understand the physical and conceptual base of computers.

Recommended chapters:

1. Einführung in AP1 und Lernstrategie
2. Was ist Hardware?
3. CPU
4. RAM / Arbeitsspeicher
5. Speicher: SSD, HDD und Massenspeicher
6. Mainboard
7. Netzteil
8. GPU
9. Peripheriegeräte
10. EVA-Prinzip
11. Binärsystem, Bits und Bytes
12. Maßeinheiten: Bit, Byte, KB, MB, GB, TB

### Module 2: Betriebssysteme

Goal: Understand how software uses hardware through the operating system.

Recommended chapters:

1. Was ist ein Betriebssystem?
2. Kernel
3. Boot-Prozess
4. Dateisysteme
5. Prozesse
6. Threads
7. Speicherverwaltung
8. Benutzer und Gruppen
9. Rechte und Berechtigungen
10. CLI und GUI basics
11. Updates und Patches

### Module 3: Netzwerke

Goal: Understand basic communication between systems.

Recommended chapters:

1. Was ist ein Netzwerk?
2. LAN
3. WAN
4. WLAN
5. Switch
6. Router
7. Firewall
8. IP-Adressen
9. Subnetze basics
10. DNS
11. DHCP
12. NAT
13. VPN
14. Ports
15. TCP
16. UDP

### Module 4: OSI-Modell

Goal: Understand network communication through layers.

Recommended chapters:

1. Warum gibt es das OSI-Modell?
2. Schicht 1: Bitübertragungsschicht
3. Schicht 2: Sicherungsschicht
4. Schicht 3: Vermittlungsschicht
5. Schicht 4: Transportschicht
6. Schicht 5: Sitzungsschicht
7. Schicht 6: Darstellungsschicht
8. Schicht 7: Anwendungsschicht
9. OSI Troubleshooting
10. OSI vs TCP/IP Modell

### Module 5: IT-Sicherheit

Goal: Understand basic protection goals, threats and measures.

Recommended chapters:

1. Grundlagen der Informationssicherheit
2. Vertraulichkeit, Integrität, Verfügbarkeit
3. Authentifizierung und Autorisierung
4. Passwörter und MFA
5. Malware und Phishing
6. Firewall basics
7. Verschlüsselung basics
8. Datenschutz basics
9. Backup vs RAID
10. Sicherheitsmaßnahmen im Unternehmen

### Module 6: Datenbanken und SQL

Goal: Understand relational data and basic SQL.

Recommended chapters:

1. Was ist eine Datenbank?
2. Tabellen, Datensätze und Attribute
3. Primärschlüssel
4. Fremdschlüssel
5. Beziehungen
6. Normalisierung basics
7. SQL SELECT
8. WHERE, ORDER BY
9. JOIN basics
10. INSERT, UPDATE, DELETE
11. SQL AP1 practice

### Module 7: Programmierung und Algorithmen

Goal: Understand basic programming logic for AP1.

Recommended chapters:

1. Was ist Programmierung?
2. Variablen und Datentypen
3. Operatoren
4. Bedingungen
5. Schleifen
6. Funktionen / Methoden
7. Arrays / Listen
8. Pseudocode lesen
9. Fehler finden
10. Algorithmisches Denken

### Module 8: UML und Modellierung

Goal: Understand basic system modeling.

Recommended chapters:

1. Warum modellieren?
2. UML Überblick
3. Use-Case-Diagramm
4. Klassendiagramm
5. Attribute und Methoden
6. Beziehungen und Multiplizitäten
7. Aktivitätsdiagramm
8. Sequenzdiagramm basics

### Module 9: Projekt, Wirtschaft und Berufsalltag

Goal: Understand AP1-relevant non-code professional topics.

Recommended chapters:

1. IT-Projekt basics
2. Lastenheft und Pflichtenheft
3. Projektphasen
4. Aufwand und Kosten basics
5. Datenschutz und DSGVO basics
6. Dokumentation
7. Kommunikation mit Kunden
8. Qualitätssicherung basics

### Module 10: AP1 Prüfungstraining

Goal: Practice integrated AP1 thinking.

Recommended chapters:

1. Wie liest man AP1-Aufgaben?
2. Signalwörter verstehen
3. Tabellen und Diagramme auswerten
4. Technische Entscheidungen begründen
5. Mixed practice: Hardware + OS
6. Mixed practice: Network + Security
7. Mixed practice: Database + SQL
8. Mixed practice: Programming + UML

---

## 04. Chapter Production Pipeline

Every chapter must move through the same workflow.

### 1. Planning

Define:

- Chapter title.
- Module.
- Prerequisites.
- Learning objectives.
- AP1 relevance.
- Related chapters.

Output: chapter plan.

### 2. Research

Verify:

- Technical accuracy.
- IHK relevance.
- Correct German terms.
- Common AP1 question patterns.

Output: source notes and term list.

### 3. Writing

Write the core chapter:

- Introduction.
- Full explanation.
- Examples.
- AP1 focus.
- Common mistakes.

Output: complete draft.

### 4. Technical Review

Check:

- Is the technical explanation correct?
- Are simplifications still accurate?
- Are comparisons valid?
- Are examples realistic?

Output: corrected draft.

### 5. German Review

Check:

- B1/B2 readability.
- Correct technical German.
- Clear sentences.
- No overcomplicated grammar.

Output: language-approved draft.

### 6. Portuguese Support Review

Check:

- Portuguese helps understanding.
- Portuguese does not replace German.
- Translations are accurate.

Output: bilingual support approved.

### 7. Examples

Add:

- Company examples.
- Practical scenarios.
- Step-by-step cases.

Output: example-complete chapter.

### 8. Diagrams

Add Mermaid diagrams where useful.

Check:

- Diagram supports understanding.
- Diagram is not decorative.
- Diagram is simple enough for beginners.

Output: diagram-complete chapter.

### 9. Exercises

Create:

- 5 Easy.
- 5 Intermediate.
- 5 AP1-style.

Every answer must include explanation.

Output: exercise-complete chapter.

### 10. Final Review

Run the chapter checklist.

Reject if any critical requirement is missing.

Output: publishable chapter.

### 11. Publication

Publish only after all checks pass.

Update:

- Content matrix.
- Related chapter links.
- Completion status.

---

## 05. Chapter Checklist

Before publication, every answer must be YES.

### Structure

- [ ] Does the chapter follow the official template exactly?
- [ ] Is the title clear?
- [ ] Is estimated study time defined?
- [ ] Is difficulty defined?
- [ ] Is AP1 importance defined with explanation?
- [ ] Are related chapters defined?

### Learning

- [ ] Are learning objectives clear and measurable?
- [ ] Does the chapter teach from zero?
- [ ] Are intermediate concepts explained?
- [ ] Does the chapter avoid unexplained terms?
- [ ] Does the student know what to do after reading?

### Language

- [ ] Is German the main language?
- [ ] Is German B1/B2 readable?
- [ ] Is Portuguese support available for difficult concepts?
- [ ] Are translations accurate?

### AP1 Focus

- [ ] Does the chapter explain what appears in AP1?
- [ ] Does it include common exam mistakes?
- [ ] Does it include frequently confused concepts?
- [ ] Does it include important vocabulary?

### Examples

- [ ] Does it contain real-world examples?
- [ ] Does it contain practical step-by-step examples?
- [ ] Are examples realistic for an Ausbildung student?

### Diagrams

- [ ] Does it contain diagrams when useful?
- [ ] Are diagrams simple and educational?
- [ ] Are diagrams connected to the explanation?

### Vocabulary

- [ ] Does it contain a vocabulary table?
- [ ] Does the table include German, Portuguese, explanation and example sentence?
- [ ] Are AP1-relevant words included?

### Exercises

- [ ] Are there at least 5 easy exercises?
- [ ] Are there at least 5 intermediate exercises?
- [ ] Are there at least 5 AP1-style exercises?
- [ ] Are all answers explained?
- [ ] Do exercises test understanding, not only memory?

### Revision

- [ ] Is there a one-page summary?
- [ ] Is there a mind map?
- [ ] Is there a revision checklist?
- [ ] Can the student revise without rereading the whole chapter?

### Publication

- [ ] Has the chapter passed technical review?
- [ ] Has the chapter passed German review?
- [ ] Has the chapter passed AP1 relevance review?
- [ ] Is the chapter ready to be used as primary study material?

---

## 06. Content Matrix

Status values:

- Not started
- Planned
- Draft
- In review
- Needs revision
- Ready

Completion percentage:

- 0%: Not started.
- 20%: Planned.
- 40%: Draft explanation.
- 60%: Examples, diagrams and vocabulary added.
- 80%: Exercises and answers added.
- 100%: Reviewed and ready.

| Topic | Status | Content | Exercises | Diagrams | Vocabulary | Reviewed | Ready | Completion |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Einführung in AP1 und Lernstrategie | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Was ist Hardware? | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| CPU | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| RAM / Arbeitsspeicher | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Speicher: SSD, HDD und Massenspeicher | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Mainboard | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Netzteil | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| GPU | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Peripheriegeräte | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Was ist ein Betriebssystem? | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Kernel | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Boot-Prozess | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Dateisysteme | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Prozesse | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Threads | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Speicherverwaltung | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Benutzer und Gruppen | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Rechte und Berechtigungen | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Netzwerke Grundlagen | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| LAN | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| WAN | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| WLAN | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Switch | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Router | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| Firewall | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| IP-Adressen | Draft | No | No | No | No | No | No | 20% |
| DNS | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| DHCP | Ready | Yes | Yes | Yes | Yes | Yes | Yes | 100% |
| NAT | Draft | No | No | No | No | No | No | 20% |
| VPN | Draft | No | No | No | No | No | No | 20% |
| Ports | Draft | No | No | No | No | No | No | 20% |
| TCP | Draft | No | No | No | No | No | No | 20% |
| UDP | Draft | No | No | No | No | No | No | 20% |
| OSI Überblick | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 1 | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 2 | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 3 | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 4 | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 5 | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 6 | Draft | No | No | No | No | No | No | 20% |
| OSI Schicht 7 | Draft | No | No | No | No | No | No | 20% |
| IT-Sicherheit Grundlagen | Planned | No | No | No | No | No | No | 0% |
| Datenbanken Grundlagen | Planned | No | No | No | No | No | No | 0% |
| SQL Grundlagen | Planned | No | No | No | No | No | No | 0% |
| Programmierung Grundlagen | Planned | No | No | No | No | No | No | 0% |
| UML Grundlagen | Planned | No | No | No | No | No | No | 0% |

---

## 07. Official Chapter Template

Every chapter must use this structure exactly.

```text
1. Title

2. Estimated study time

3. Difficulty
   Easy / Medium / Hard

4. Importance for AP1
   ★★★★★
   Explain why.

5. Learning objectives
   After this chapter the student will be able to...

6. Introduction

7. Complete explanation
   Explain every concept step by step.

8. Real-world examples
   Explain where companies use this.

9. Practical examples
   Simple scenarios.
   Step by step.

10. Visual diagrams
    Mermaid diagrams when useful.

11. IHK Exam Focus
    - What usually appears in AP1
    - Common mistakes
    - Important details
    - Frequently confused concepts
    - Vocabulary

12. Common mistakes

13. German vocabulary
    Table:
    - German
    - Portuguese
    - Explanation
    - Example sentence

14. Summary
    One-page review.

15. Mind map

16. Exercises
    - 5 Easy
    - 5 Intermediate
    - 5 AP1 Style

17. Answers
    Explain every answer.

18. Related chapters
    Previous chapter
    Next chapter

19. Revision checklist
    ☐ I understand
    ☐ I can explain
    ☐ I can solve AP1 questions
    ☐ Ready
```

---

## 08. Learning Standard

After reading a chapter, the student should not merely remember words.

The student must be able to:

- Explain the concept in simple German.
- Recognize the German term in an AP1 task.
- Give a practical example from a company.
- Compare the concept with a similar concept.
- Identify common mistakes.
- Solve basic and AP1-style questions.
- Explain why an answer is correct.

Understanding means:

- The student can use the concept in a new situation.
- The student can describe cause and effect.
- The student can connect the concept to previous chapters.
- The student can answer in German using correct technical vocabulary.

Portuguese support is successful when:

- It removes confusion.
- It helps the student return to German.
- It does not become the main learning path.

---

## 09. Quality Control

### Automatic Rejection Rules

Reject a chapter if:

- It is too short for the topic.
- It only gives definitions.
- It has no real-world examples.
- It has no practical examples.
- It has no AP1 focus.
- It has no common mistakes.
- It has no vocabulary table.
- It has fewer than 15 exercises.
- Answers are not explained.
- German is too advanced for B1/B2.
- Portuguese replaces German instead of supporting it.
- Diagrams are missing when the topic needs visual structure.

### Quality Questions

Before publication ask:

- Would a beginner understand this?
- Would this help in an AP1 exam?
- Can the student explain the concept after reading?
- Does the chapter reduce fear and confusion?
- Are examples realistic?
- Are exercises strong enough?
- Is the German useful for the actual exam?

### Premium Standard

A chapter is premium only if it feels like:

- A textbook explanation.
- A trainer's classroom guidance.
- An AP1 preparation guide.
- A revision sheet.
- A practice workbook.

All in one chapter.

---

## 10. Course Completion Strategy

### Core Rule

Finish one chapter completely before starting another.

Do not write random chapters.

Do not skip difficult topics.

Do not create broad superficial chapters.

### Production Order

Use this order:

1. Complete Module 1.
2. Complete Module 2.
3. Complete Module 3.
4. Complete Module 4.
5. Complete Security.
6. Complete Databases and SQL.
7. Complete Programming.
8. Complete UML.
9. Complete professional/project topics.
10. Complete integrated AP1 practice.

### Chapter Completion Definition

A chapter is complete only when:

- Content is complete.
- Exercises are complete.
- Answers are complete.
- Vocabulary is complete.
- Diagrams are complete.
- AP1 focus is complete.
- Checklist is complete.
- Quality control passed.

### Publishing Rhythm

Recommended rhythm:

1. Plan one chapter.
2. Write one chapter.
3. Review one chapter.
4. Publish one chapter.
5. Update content matrix.
6. Move to next chapter.

### Current Next Chapter

The next chapter after this system is:

**Was ist Hardware?**

Reason:

It is the first technical foundation after the introduction. Every later hardware chapter depends on the student understanding what hardware means and how physical components work together.

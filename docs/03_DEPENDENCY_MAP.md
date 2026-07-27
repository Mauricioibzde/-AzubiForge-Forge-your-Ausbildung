# AP1 FIAE Dependency Map

Purpose: Guarantee the best learning order and avoid requiring knowledge that has not been taught.

---

## Core Principle

No chapter should require a concept that has not already been introduced.

If a chapter needs a concept from a later topic, either:

- move the chapter later,
- introduce the prerequisite earlier,
- or add a short beginner explanation.

---

## High-Level Dependency Flow

```text
Module 0: Learning and AP1 orientation
  ↓
IT foundations
  ↓
Hardware
  ↓
Operating systems
  ↓
Networks
  ↓
OSI and troubleshooting
  ↓
Security
  ↓
Databases and SQL
  ↓
Programming logic
  ↓
UML and modeling
  ↓
Project / professional topics
  ↓
Integrated AP1 practice
```

---

## Detailed Dependency Map

### Module 0: Learning Preparation

Must come before all content.

Dependencies:

- None.

Prepares for:

- Reading technical German.
- Understanding AP1 questions.
- Using exercises and revision.

---

### IT Foundations

Depends on:

- Module 0.

Chapters:

- EVA-Prinzip.
- Bits and bytes.
- Units.

Prepares for:

- Hardware.
- Storage.
- Network speeds.
- Data sizes.

---

### Hardware

Depends on:

- Basic understanding of input, processing, storage and output.

Internal order:

```text
Was ist Hardware?
  ↓
CPU
  ↓
RAM
  ↓
Storage: SSD/HDD
  ↓
Mainboard
  ↓
Netzteil
  ↓
GPU
  ↓
Peripheriegeräte
```

Prepares for:

- Operating systems.
- Performance problems.
- Storage and file systems.
- Security measures involving physical devices.

---

### Operating Systems

Depends on:

- Hardware.
- CPU.
- RAM.
- Storage.

Internal order:

```text
Was ist ein Betriebssystem?
  ↓
Kernel
  ↓
Boot-Prozess
  ↓
Dateisysteme
  ↓
Prozesse
  ↓
Threads
  ↓
Speicherverwaltung
  ↓
Benutzer und Gruppen
  ↓
Rechte und Berechtigungen
```

Prepares for:

- Security permissions.
- Application runtime.
- File access.
- User management.

---

### Networks

Depends on:

- Basic computer components.
- Operating system basics.

Internal order:

```text
Was ist ein Netzwerk?
  ↓
LAN / WAN / WLAN
  ↓
Switch
  ↓
Router
  ↓
IP-Adressen
  ↓
Subnetze basics
  ↓
DNS
  ↓
DHCP
  ↓
NAT
  ↓
VPN
  ↓
Ports
  ↓
TCP
  ↓
UDP
```

Prepares for:

- OSI model.
- Firewall.
- Security.
- Web applications.

---

### OSI Model

Depends on:

- Network basics.
- Switch.
- Router.
- IP addresses.
- Ports.
- TCP/UDP.
- DNS basics.

Internal order:

```text
Warum OSI?
  ↓
Schicht 1
  ↓
Schicht 2
  ↓
Schicht 3
  ↓
Schicht 4
  ↓
Schicht 5
  ↓
Schicht 6
  ↓
Schicht 7
  ↓
Troubleshooting
  ↓
OSI vs TCP/IP
```

Prepares for:

- Network troubleshooting.
- Security.
- AP1 layer assignment tasks.

---

### Security

Depends on:

- Operating system users and permissions.
- Network basics.
- Storage and backup basics.

Internal order:

```text
Informationssicherheit
  ↓
Vertraulichkeit / Integrität / Verfügbarkeit
  ↓
Authentifizierung / Autorisierung
  ↓
Passwörter / MFA
  ↓
Malware / Phishing
  ↓
Firewall
  ↓
Verschlüsselung
  ↓
Datenschutz
  ↓
Backup vs RAID
```

Prepares for:

- Professional scenarios.
- Project decisions.
- AP1 security tasks.

---

### Databases And SQL

Depends on:

- Basic data understanding.
- Storage basics.
- Application context.

Internal order:

```text
Was ist eine Datenbank?
  ↓
Tabellen / Datensätze / Attribute
  ↓
Primärschlüssel
  ↓
Fremdschlüssel
  ↓
Beziehungen
  ↓
Normalisierung basics
  ↓
SQL SELECT
  ↓
WHERE / ORDER BY
  ↓
JOIN
  ↓
INSERT / UPDATE / DELETE
```

Prepares for:

- Programming.
- Application development.
- Data modeling.

---

### Programming Logic

Depends on:

- Basic data concepts.
- Problem-solving mindset.

Internal order:

```text
Was ist Programmierung?
  ↓
Variablen / Datentypen
  ↓
Operatoren
  ↓
Bedingungen
  ↓
Schleifen
  ↓
Funktionen / Methoden
  ↓
Arrays / Listen
  ↓
Pseudocode lesen
  ↓
Fehler finden
```

Prepares for:

- UML.
- AP1 pseudocode tasks.
- Application development concepts.

---

### UML And Modeling

Depends on:

- Programming basics.
- Data concepts.
- System thinking.

Internal order:

```text
Warum modellieren?
  ↓
UML Überblick
  ↓
Use-Case-Diagramm
  ↓
Klassendiagramm
  ↓
Attribute / Methoden
  ↓
Beziehungen / Multiplizitäten
  ↓
Aktivitätsdiagramm
  ↓
Sequenzdiagramm basics
```

Prepares for:

- AP1 diagram interpretation.
- Project communication.
- Software design basics.

---

## Dependency Rule For Authors

Before writing a chapter, answer:

- Which concepts does this chapter require?
- Were those concepts already taught?
- If not, should the chapter move later?
- If not, can the prerequisite be explained briefly?

If this cannot be answered clearly, the chapter is not ready for production.


const AZUBIFORGE_DATA = {
  course: {
    id: "ap1-fiae",
    title: "AP1 FIAE",
    description: "Fundamentos essenciais para a primeira parte da Ausbildung como Fachinformatiker Anwendungsentwicklung."
  },
  modules: [
    {
      id: "modulo-1",
      title: "Módulo 1",
      subtitle: "Fundamentos da Computação",
      description: "Base física e conceitual do computador: componentes, função de cada peça e vocabulário técnico.",
      chapterIds: ["introducao", "hardware", "cpu", "ram", "speicher-ssd-hdd", "mainboard", "netzteil", "gpu", "perifericos"]
    },
    {
      id: "modulo-2",
      title: "Módulo 2",
      subtitle: "Betriebssysteme",
      description: "Sistema operacional, kernel, processos, memória, usuários e permissões.",
      chapterIds: ["sistemas-operacionais", "kernel", "boot", "dateisysteme", "prozesse", "threads", "speicherverwaltung", "benutzer", "rechte"]
    },
    {
      id: "modulo-3",
      title: "Módulo 3",
      subtitle: "Netzwerke",
      description: "Conceitos essenciais de redes para AP1: LAN, WAN, WLAN, equipamentos, serviços e protocolos.",
      chapterIds: ["netzwerke-grundlagen", "lan", "wan", "wlan", "switch", "router", "firewall", "dns", "dhcp", "nat", "vpn", "ports", "tcp", "udp"]
    },
    {
      id: "modulo-4",
      title: "Módulo 4",
      subtitle: "OSI",
      description: "As sete camadas do modelo OSI e como elas ajudam a entender comunicação e troubleshooting.",
      chapterIds: ["osi", "osi-camada-1", "osi-camada-2", "osi-camada-3", "osi-camada-4", "osi-camada-5", "osi-camada-6", "osi-camada-7"]
    }
  ],
  chapters: [
    {
      id: "introducao",
      title: "Introdução",
      description: "Como estudar para a AP1 e organizar os fundamentos.",
      text: [
        "A AP1 avalia bases técnicas importantes para a Ausbildung FIAE. O foco não é decorar tudo, mas entender conceitos, palavras-chave em alemão e relações entre os temas.",
        "Use este curso como trilha curta: leia o capítulo, revise o resumo, resolva os exercícios e marque como concluído quando conseguir explicar o assunto com suas próprias palavras."
      ],
      ihk: "Entenda os termos alemães do enunciado. Muitas questões testam interpretação técnica antes de cobrar cálculo ou memorização.",
      summary: "Estude em ciclos pequenos: conceito, exemplo, exercício e revisão. O objetivo é reconhecer padrões de pergunta da IHK.",
      example: "Se uma questão fala em Datenschutz, Datensicherung ou Verfügbarkeit, identifique primeiro se ela trata de segurança, backup ou disponibilidade.",
      exercises: [
        {
          question: "Qual é a melhor forma de usar este material?",
          answer: "Ler ativamente, anotar termos alemães importantes, responder exercícios e revisar capítulos concluídos."
        }
      ],
      studyTime: "45-60 Minuten",
      difficulty: "Easy",
      fullContent: {
        studyTime: "45-60 Minuten",
        difficulty: "Easy",
        importance: {
          stars: "★★★★★",
          explanation: [
            "Dieses Kapitel ist sehr wichtig, weil es erklärt, wie du für die AP1 lernen sollst. Viele Auszubildende verlieren Zeit, weil sie ohne Struktur lernen.",
            "Para entender: este capítulo não ensina ainda um tema técnico profundo. Ele ensina o método de estudo para usar todo o curso de forma correta."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what the AP1 is.",
          "After this chapter the student will be able to organize a simple study routine.",
          "After this chapter the student will be able to distinguish Verstehen from Auswendiglernen.",
          "After this chapter the student will be able to use German technical vocabulary actively.",
          "After this chapter the student will be able to answer exercises with a clear AP1 strategy."
        ],
        introduction: [
          "Die AP1 ist die erste Abschlussprüfung in der Ausbildung. Für FIAE bedeutet das: Du brauchst ein gutes Fundament in IT-Grundlagen, Netzwerken, Betriebssystemen, Datenbanken, Sicherheit und Programmierung.",
          "Die AP1 prüft nicht nur Fakten. Sie prüft, ob du technische Situationen verstehst. Du musst Begriffe erkennen, Zusammenhänge sehen und einfache Entscheidungen begründen.",
          "Wichtig: Du musst nicht alles perfekt wissen. Aber du musst die Grundideen sicher erklären können. Genau dafür ist AzubiForge gedacht.",
          "Português de apoio: a AP1 testa fundamentos. A meta não é decorar frases, mas entender conceitos e reconhecer o vocabulário alemão usado na prova."
        ],
        explanation: [
          {
            title: "Was ist die AP1?",
            paragraphs: [
              "AP1 bedeutet Abschlussprüfung Teil 1. Sie findet während der Ausbildung statt und zählt zur Gesamtbewertung.",
              "In der AP1 bekommst du Aufgaben mit beruflichen Situationen. Zum Beispiel: Ein Unternehmen braucht ein Netzwerk, ein PC hat zu wenig Arbeitsspeicher, ein Backup-Konzept soll bewertet werden oder eine SQL-Abfrage muss verstanden werden.",
              "Die Aufgaben sind oft praxisnah. Das heißt: Du bekommst Informationen und musst daraus eine sinnvolle technische Antwort ableiten."
            ]
          },
          {
            title: "Was bedeutet FIAE?",
            paragraphs: [
              "FIAE bedeutet Fachinformatiker für Anwendungsentwicklung. Der Schwerpunkt liegt auf Softwareentwicklung.",
              "Trotzdem prüft die AP1 viele allgemeine IT-Themen. Auch als Entwickler musst du Hardware, Betriebssysteme, Netzwerke, Sicherheit und Datenbanken verstehen.",
              "Ein Programm läuft nicht isoliert. Es läuft auf Hardware, in einem Betriebssystem, benutzt Speicher, kommuniziert über Netzwerke und speichert Daten."
            ]
          },
          {
            title: "Verstehen ist wichtiger als Auswendiglernen",
            paragraphs: [
              "Auswendiglernen bedeutet: Du merkst dir einen Satz. Verstehen bedeutet: Du kannst den Satz in einer neuen Situation anwenden.",
              "Für die AP1 ist Verstehen wichtiger. Die IHK fragt selten nur: Was ist X? Häufiger fragt sie: Welche Lösung passt in dieser Situation und warum?",
              "Wenn du CPU, RAM und SSD nur als Wörter kennst, reicht das nicht. Du musst wissen, welche Rolle sie im System haben und welche Probleme entstehen können."
            ]
          },
          {
            title: "Wie du ein Kapitel lernen sollst",
            paragraphs: [
              "Lies zuerst den Text langsam. Markiere keine ganzen Absätze, sondern nur Schlüsselbegriffe.",
              "Danach lies den Bereich Wichtig für die IHK. Dort steht, worauf du bei Prüfungsfragen achten musst.",
              "Dann lies die Zusammenfassung auf Portugiesisch, wenn du das Konzept noch nicht sicher verstanden hast.",
              "Zum Schluss löse die Übungen ohne die Antworten zu öffnen. Erst danach vergleichst du deine Antwort mit der Erklärung."
            ],
            steps: [
              "1. Kapitel lesen.",
              "2. Deutsche Fachbegriffe notieren.",
              "3. Beispiel verstehen.",
              "4. Übungen lösen.",
              "5. Fehler notieren.",
              "6. Kapitel erst dann als abgeschlossen markieren."
            ]
          },
          {
            title: "Die Rolle der deutschen Sprache",
            paragraphs: [
              "Die Prüfung ist auf Deutsch. Deshalb ist technisches Deutsch ein Teil des Lernstoffs.",
              "Du musst nicht wie ein Muttersprachler schreiben. Aber du musst Begriffe wie Arbeitsspeicher, Betriebssystem, Datensicherung, Verfügbarkeit oder Berechtigung erkennen.",
              "AzubiForge nutzt deshalb Deutsch als Hauptsprache und Portugiesisch als Unterstützung."
            ]
          }
        ],
        realWorldExamples: [
          "In einer Firma muss ein Azubi erklären, warum ein PC langsam ist. Dafür muss er CPU, RAM und SSD unterscheiden können.",
          "Ein Entwickler muss verstehen, warum eine Webanwendung nicht erreichbar ist. Dafür braucht er Grundlagen zu DNS, Ports, Firewall und TCP/IP.",
          "Ein Team soll entscheiden, ob ein Backup-Konzept sicher ist. Dafür muss man Datensicherung, RAID und Wiederherstellung unterscheiden.",
          "Bei einer SQL-Aufgabe muss man nicht nur Syntax lesen, sondern auch verstehen, welche Daten gesucht werden."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Ein PC ist langsam",
            paragraphs: [
              "Ein Mitarbeiter sagt: Mein Computer ist langsam. Eine schlechte Antwort wäre: Wir kaufen einfach einen neuen PC.",
              "Eine bessere AP1-Antwort ist: Zuerst prüfen wir CPU-Auslastung, RAM-Auslastung, freien Speicherplatz und Autostart-Programme."
            ],
            steps: [
              "Task-Manager öffnen.",
              "CPU-Auslastung prüfen.",
              "RAM-Auslastung prüfen.",
              "SSD/HDD-Auslastung prüfen.",
              "Ursache beschreiben und passende Maßnahme wählen."
            ]
          },
          {
            title: "Szenario 2: Eine Webseite öffnet nicht",
            paragraphs: [
              "Ein Benutzer kann eine Webseite nicht öffnen. Die Ursache kann DNS, Netzwerk, Firewall, Server oder Browser sein.",
              "Für die AP1 ist wichtig: Du sollst strukturiert denken, nicht raten."
            ],
            steps: [
              "Prüfen, ob andere Webseiten funktionieren.",
              "DNS-Auflösung prüfen.",
              "Netzwerkverbindung prüfen.",
              "Firewall-Regeln prüfen.",
              "Fehler eingrenzen."
            ]
          }
        ],
        diagrams: [
          {
            title: "Lernfluss in AzubiForge",
            code: "flowchart TD\n  A[Kapitel lesen] --> B[Fachbegriffe verstehen]\n  B --> C[IHK-Fokus prüfen]\n  C --> D[Beispiele nachvollziehen]\n  D --> E[Übungen lösen]\n  E --> F[Fehler korrigieren]\n  F --> G[Kapitel abschließen]"
          },
          {
            title: "AP1-Denkweise",
            code: "flowchart LR\n  A[Situation] --> B[Informationen erkennen]\n  B --> C[Begriffe verstehen]\n  C --> D[Zusammenhang herstellen]\n  D --> E[Lösung begründen]"
          }
        ],
        ihkFocus: {
          appears: [
            "Berufliche Situationen mit mehreren technischen Informationen.",
            "Grundbegriffe aus Hardware, Betriebssystemen, Netzwerken, Sicherheit und Datenbanken.",
            "Aufgaben, bei denen du eine passende Lösung auswählen und begründen musst.",
            "Tabellen, kurze Texte, Diagramme oder kleine Code-/SQL-Ausschnitte."
          ],
          commonMistakes: [
            "Nur Wörter auswendig lernen, ohne die Funktion zu verstehen.",
            "Die Frage zu schnell lesen und wichtige Hinweise übersehen.",
            "Deutsche Begriffe falsch interpretieren.",
            "Antworten ohne Begründung geben, obwohl die Aufgabe eine Erklärung verlangt."
          ],
          importantDetails: [
            "Achte auf Signalwörter wie begründen, nennen, erklären, vergleichen und zuordnen.",
            "Wenn eine Aufgabe nach zwei Vorteilen fragt, schreibe genau zwei klare Vorteile.",
            "Wenn eine Situation beschrieben wird, nutze die Informationen aus der Situation in deiner Antwort.",
            "Kurze, präzise Antworten sind besser als lange, unklare Texte."
          ],
          confusedConcepts: [
            "Datensicherung und RAID.",
            "Authentifizierung und Autorisierung.",
            "RAM und SSD.",
            "Router und Switch.",
            "DNS und DHCP."
          ],
          vocabulary: [
            "nennen = citar/listar",
            "erklären = explicar",
            "begründen = justificar",
            "zuordnen = associar",
            "vergleichen = comparar"
          ]
        },
        commonMistakes: [
          "Ich lese die Lösung, bevor ich selbst nachdenke.",
          "Ich markiere das Kapitel als abgeschlossen, obwohl ich es nicht erklären kann.",
          "Ich lerne nur auf Portugiesisch und erkenne die deutschen Prüfungsbegriffe nicht.",
          "Ich ignoriere falsche Antworten, statt sie als Lernmaterial zu nutzen.",
          "Ich lerne viele Themen gleichzeitig, ohne Wiederholung."
        ],
        vocabulary: [
          {
            de: "Abschlussprüfung Teil 1",
            pt: "primeira parte do exame final",
            explanation: "Erste große Prüfung während der Ausbildung.",
            example: "Die Abschlussprüfung Teil 1 prüft wichtige Grundlagen."
          },
          {
            de: "Aufgabe",
            pt: "questão/tarefa",
            explanation: "Eine Prüfungsfrage oder Arbeitsanweisung.",
            example: "Lesen Sie die Aufgabe genau."
          },
          {
            de: "begründen",
            pt: "justificar",
            explanation: "Nicht nur antworten, sondern den Grund nennen.",
            example: "Begründen Sie Ihre Entscheidung."
          },
          {
            de: "erklären",
            pt: "explicar",
            explanation: "Einen Begriff oder Zusammenhang verständlich beschreiben.",
            example: "Erklären Sie den Unterschied zwischen RAM und SSD."
          },
          {
            de: "zuordnen",
            pt: "associar",
            explanation: "Ein Element dem passenden Begriff oder Bereich geben.",
            example: "Ordnen Sie die Geräte der richtigen OSI-Schicht zu."
          },
          {
            de: "Fachbegriff",
            pt: "termo técnico",
            explanation: "Ein Wort mit spezieller Bedeutung in der IT.",
            example: "Arbeitsspeicher ist ein wichtiger Fachbegriff."
          },
          {
            de: "Zusammenhang",
            pt: "relação/contexto",
            explanation: "Wie zwei oder mehr Dinge miteinander verbunden sind.",
            example: "Erkennen Sie den Zusammenhang zwischen DNS und IP-Adresse."
          },
          {
            de: "Lösung",
            pt: "solução",
            explanation: "Eine passende Antwort oder technische Maßnahme.",
            example: "Welche Lösung ist für das Unternehmen sinnvoll?"
          }
        ],
        summary: [
          "Die AP1 prüft IT-Grundlagen in beruflichen Situationen. Für FIAE sind nicht nur Programmierung, sondern auch Hardware, Betriebssysteme, Netzwerke, Sicherheit und Datenbanken wichtig.",
          "Der beste Lernweg ist: verstehen, Fachbegriffe erkennen, Beispiele nachvollziehen, Übungen lösen und Fehler bewusst korrigieren.",
          "Português de apoio: use este curso como livro de estudo. Leia em alemão, confirme em português quando necessário e pratique com exercícios antes de ver as respostas."
        ],
        mindMap: {
          title: "Mindmap: AP1 richtig lernen",
          code: "mindmap\n  root((AP1 lernen))\n    Verstehen\n      Begriffe\n      Zusammenhänge\n      Beispiele\n    Prüfung\n      Aufgaben genau lesen\n      Signalwörter erkennen\n      Antwort begründen\n    AzubiForge\n      Kapitel lesen\n      IHK-Fokus\n      Übungen\n      Notizen\n    Wiederholung\n      Fehlerliste\n      Vokabeln\n      Checkliste"
        },
        exercises: {
          easy: [
            {
              question: "Was bedeutet AP1?",
              answer: "AP1 bedeutet Abschlussprüfung Teil 1.",
              explanation: "Es ist die erste große Prüfung in der Ausbildung und prüft wichtige Grundlagen."
            },
            {
              question: "Warum ist technisches Deutsch wichtig?",
              answer: "Weil die Prüfung auf Deutsch ist und viele Aufgaben Fachbegriffe benutzen.",
              explanation: "Auch wenn du das Konzept kennst, musst du den deutschen Begriff in der Aufgabe erkennen."
            },
            {
              question: "Was ist besser für AP1: nur auswendig lernen oder verstehen?",
              answer: "Verstehen ist besser.",
              explanation: "Die AP1 nutzt Situationen. Du musst Wissen anwenden, nicht nur Definitionen wiederholen."
            },
            {
              question: "Wann solltest du ein Kapitel als abgeschlossen markieren?",
              answer: "Wenn du den Inhalt erklären und Übungen lösen kannst.",
              explanation: "Nur Lesen reicht nicht. Abschließen bedeutet: Du kannst aktiv mit dem Wissen arbeiten."
            },
            {
              question: "Nenne zwei wichtige AP1-Themen.",
              answer: "Zum Beispiel Netzwerke und Betriebssysteme.",
              explanation: "Auch Hardware, Datenbanken, Sicherheit und Programmierung sind wichtige AP1-Bereiche."
            }
          ],
          intermediate: [
            {
              question: "Erkläre den Unterschied zwischen Auswendiglernen und Verstehen.",
              answer: "Auswendiglernen heißt, einen Satz zu merken. Verstehen heißt, das Wissen in einer neuen Situation anwenden zu können.",
              explanation: "Die AP1 fragt oft praxisnah. Deshalb ist Anwendung wichtiger als reine Erinnerung."
            },
            {
              question: "Warum sind Notizen beim Lernen hilfreich?",
              answer: "Notizen helfen, schwierige Begriffe, eigene Fehler und wichtige Zusammenhänge festzuhalten.",
              explanation: "Eigene Notizen machen passives Lesen zu aktivem Lernen."
            },
            {
              question: "Was sollst du tun, wenn du eine Übung falsch beantwortest?",
              answer: "Die Erklärung lesen, den Fehler notieren und später wiederholen.",
              explanation: "Fehler zeigen genau, welcher Teil noch nicht sicher verstanden wurde."
            },
            {
              question: "Warum muss ein FIAE auch Netzwerke verstehen?",
              answer: "Weil Anwendungen oft über Netzwerke kommunizieren und Fehler durch DNS, Ports oder Firewall entstehen können.",
              explanation: "Softwareentwicklung hängt in der Praxis stark von Infrastruktur ab."
            },
            {
              question: "Was bedeutet das Signalwort begründen in einer Aufgabe?",
              answer: "Du sollst nicht nur eine Antwort geben, sondern auch den Grund erklären.",
              explanation: "Bei begründen erwartet die IHK eine nachvollziehbare Erklärung."
            }
          ],
          ap1Style: [
            {
              question: "Ein Azubi lernt jeden Tag Definitionen auswendig, kann aber keine Beispiele erklären. Warum ist das für die AP1 problematisch?",
              answer: "Weil die AP1 häufig praxisnahe Situationen prüft. Der Azubi muss Begriffe anwenden und Zusammenhänge erklären können.",
              explanation: "Definitionen helfen, aber ohne Anwendung kann man situative Aufgaben schwer lösen."
            },
            {
              question: "In einer Aufgabe steht: Begründen Sie Ihre Entscheidung. Der Prüfling schreibt nur: SSD ist besser. Warum reicht das nicht?",
              answer: "Die Antwort enthält keine Begründung. Es fehlt zum Beispiel: SSD hat kürzere Zugriffszeiten und startet Programme schneller als HDD.",
              explanation: "Das Signalwort begründen verlangt einen Grund, nicht nur eine Behauptung."
            },
            {
              question: "Eine Prüfungsfrage enthält die Begriffe DNS, IP-Adresse und Server. Welche Lernstrategie hilft hier besonders?",
              answer: "Die Fachbegriffe erkennen, ihre Funktionen erklären und den Zusammenhang herstellen.",
              explanation: "DNS übersetzt Namen in IP-Adressen, damit ein Client einen Server erreichen kann."
            },
            {
              question: "Ein Schüler versteht den Inhalt auf Portugiesisch, aber nicht die deutschen Begriffe. Was sollte er tun?",
              answer: "Er sollte eine Vokabelliste mit deutschen Fachbegriffen, portugiesischer Hilfe und Beispielsätzen lernen.",
              explanation: "Die Prüfungssprache ist Deutsch. Begriffe müssen in Aufgaben schnell erkannt werden."
            },
            {
              question: "Warum ist eine feste Reihenfolge beim Lernen sinnvoll?",
              answer: "Weil Grundlagen aufeinander aufbauen. Hardware hilft beim Verständnis von Betriebssystemen, Netzwerken und Performance.",
              explanation: "Eine gute Lernprogression reduziert Verwirrung und macht komplexere Themen leichter."
            }
          ]
        },
        related: {
          previous: "Kein vorheriges Kapitel",
          next: "Hardware"
        },
        revisionChecklist: [
          "Ich verstehe, was die AP1 prüft.",
          "Ich kann erklären, warum Verstehen wichtiger ist als Auswendiglernen.",
          "Ich kenne die wichtigsten Signalwörter in Aufgaben.",
          "Ich kann AzubiForge als Lernsystem verwenden.",
          "Ich kann Übungen lösen, bevor ich die Antworten lese.",
          "Ich bin bereit für das nächste Kapitel."
        ]
      }
    },
    {
      id: "hardware",
      title: "Was ist Hardware?",
      description: "Grundlagen der physischen Computerteile und wie sie zusammenarbeiten.",
      text: [
        "Hardware sind alle physischen Teile eines Computers oder IT-Systems. Man kann Hardware anfassen: Prozessor, Arbeitsspeicher, SSD, Mainboard, Netzteil, Grafikkarte, Monitor, Tastatur und Maus.",
        "Für die AP1 musst du nicht jedes technische Detail kennen. Du musst verstehen, welche Aufgabe die wichtigsten Komponenten haben und wie sie zusammenarbeiten."
      ],
      ihk: "Hardware ist die physische Grundlage eines IT-Systems. Häufig wichtig: CPU verarbeitet Daten, RAM speichert Daten kurzfristig, SSD/HDD speichert Daten dauerhaft.",
      summary: "Hardware é a parte física do computador. Para AP1, entenda a função de cada componente e como problemas de desempenho podem estar ligados a CPU, RAM, armazenamento ou periféricos.",
      example: "Ein Arbeitsplatz-PC ist langsam. Mögliche Ursachen sind zu wenig RAM, eine alte HDD, hohe CPU-Auslastung oder zu viele Programme im Autostart.",
      exercises: [
        {
          question: "Was bedeutet Hardware?",
          answer: "Hardware sind die physischen Teile eines Computers, zum Beispiel CPU, RAM, SSD, Mainboard und Peripheriegeräte."
        }
      ],
      studyTime: "60-75 Minuten",
      difficulty: "Easy",
      fullContent: {
        studyTime: "60-75 Minuten",
        difficulty: "Easy",
        importance: {
          stars: "★★★★★",
          explanation: [
            "Hardware ist ein Grundthema für die AP1. Viele spätere Themen bauen darauf auf: Betriebssysteme nutzen Hardware, Programme laufen auf Hardware, Netzwerke verbinden Hardware und Sicherheitsmaßnahmen schützen Hardware und Daten.",
            "In der AP1 kommen Hardware-Fragen oft als praktische Situationen vor. Zum Beispiel: Ein PC ist langsam, ein Arbeitsplatz soll modernisiert werden, ein Speichergerät soll ausgewählt werden oder ein Gerät funktioniert nicht.",
            "Português de apoio: Hardware é a base física. Se você não entende CPU, RAM, SSD/HDD, Mainboard e Peripherie, muitos temas posteriores ficam confusos."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain the term Hardware in simple German.",
          "After this chapter the student will be able to distinguish Hardware and Software.",
          "After this chapter the student will be able to name the most important hardware components.",
          "After this chapter the student will be able to explain how CPU, RAM, storage and mainboard work together.",
          "After this chapter the student will be able to connect simple performance problems to possible hardware causes.",
          "After this chapter the student will be able to recognize common AP1 vocabulary about hardware."
        ],
        introduction: [
          "Wenn du einen Computer benutzt, siehst du zuerst Geräte: Bildschirm, Tastatur, Maus, Gehäuse oder Notebook. Im Inneren gibt es weitere Teile: Prozessor, Arbeitsspeicher, Speicherlaufwerk, Mainboard und Netzteil.",
          "Alle diese physischen Teile nennt man Hardware. Hardware ist also alles, was man anfassen kann. Software dagegen sind Programme, Daten und Betriebssysteme. Software kann man nicht anfassen, aber sie läuft auf Hardware.",
          "Für einen FIAE ist Hardware wichtig, obwohl der Schwerpunkt Softwareentwicklung ist. Eine Anwendung läuft nie im leeren Raum. Sie braucht CPU-Zeit, Arbeitsspeicher, Speicherplatz, Netzwerkverbindung und Geräte.",
          "Wenn du später eine langsame Anwendung analysierst, musst du fragen können: Liegt es am Programm? Am Arbeitsspeicher? Am Datenträger? Am Netzwerk? Genau deshalb beginnt AP1 mit Grundlagen."
        ],
        explanation: [
          {
            title: "Hardware und Software",
            paragraphs: [
              "Hardware sind die physischen Bestandteile eines IT-Systems. Beispiele sind CPU, RAM, SSD, HDD, Mainboard, Netzteil, Grafikkarte, Monitor und Drucker.",
              "Software sind Programme und Daten. Beispiele sind Betriebssysteme wie Windows oder Linux, Anwendungen wie ein Browser, Entwicklungsumgebungen, Datenbanken oder Quellcode.",
              "Hardware und Software brauchen einander. Hardware ohne Software kann nichts Sinnvolles ausführen. Software ohne Hardware kann nicht laufen."
            ]
          },
          {
            title: "Das Grundprinzip: Eingabe, Verarbeitung, Ausgabe, Speicherung",
            paragraphs: [
              "Ein Computer arbeitet nach einem einfachen Prinzip: Daten werden eingegeben, verarbeitet, ausgegeben und gespeichert. Dieses Prinzip nennt man oft EVA-Prinzip: Eingabe, Verarbeitung, Ausgabe.",
              "Eingabe bedeutet: Daten kommen in das System. Das kann durch Tastatur, Maus, Scanner, Mikrofon, Netzwerk oder Sensoren passieren.",
              "Verarbeitung bedeutet: Die CPU führt Befehle aus. Programme sagen der CPU, welche Operationen sie mit Daten machen soll.",
              "Ausgabe bedeutet: Das Ergebnis wird sichtbar, hörbar oder nutzbar. Beispiele sind Monitor, Drucker, Lautsprecher oder eine Datei.",
              "Speicherung bedeutet: Daten werden dauerhaft oder kurzfristig abgelegt. RAM speichert kurzfristig während der Arbeit. SSD und HDD speichern dauerhaft."
            ]
          },
          {
            title: "Die wichtigsten Komponenten",
            paragraphs: [
              "Die CPU ist der Prozessor. Sie verarbeitet Befehle und Daten. Man kann sie als Recheneinheit des Computers verstehen.",
              "Der Arbeitsspeicher, also RAM, speichert Daten, die gerade benutzt werden. RAM ist schnell, aber flüchtig. Flüchtig bedeutet: Nach dem Ausschalten sind die Daten weg.",
              "SSD und HDD sind Massenspeicher. Sie speichern Daten dauerhaft. Das Betriebssystem, Programme und Dateien liegen auf SSD oder HDD.",
              "Das Mainboard verbindet die Komponenten. CPU, RAM, SSD, Grafikkarte und viele Anschlüsse sind direkt oder indirekt mit dem Mainboard verbunden.",
              "Das Netzteil versorgt den Computer mit Strom. Ohne passende und stabile Stromversorgung kann das System nicht zuverlässig arbeiten.",
              "Peripheriegeräte sind Geräte am Rand des Systems. Beispiele sind Monitor, Tastatur, Maus, Drucker, Webcam oder Scanner."
            ]
          },
          {
            title: "Wie Hardware zusammenarbeitet",
            paragraphs: [
              "Wenn du ein Programm startest, passiert mehr als nur ein Klick. Das Betriebssystem lädt Programmteile vom Massenspeicher in den Arbeitsspeicher. Danach verarbeitet die CPU die Befehle.",
              "Die CPU braucht Daten sehr schnell. Deshalb arbeitet sie eng mit RAM zusammen. Der Massenspeicher ist größer, aber langsamer als RAM.",
              "Das Mainboard verbindet diese Komponenten. Daten bewegen sich zwischen Speicher, RAM, CPU und Geräten über Leitungen und Schnittstellen.",
              "Wenn ein Teil zu langsam oder zu klein ist, kann ein Engpass entstehen. Ein Engpass bedeutet: Eine Komponente begrenzt die Gesamtleistung."
            ]
          },
          {
            title: "Was ist ein Engpass?",
            paragraphs: [
              "Ein Engpass ist die Stelle im System, die alles langsamer macht. Ein Computer ist nur so schnell wie die schwächste relevante Komponente in einer Situation.",
              "Beispiel: Eine sehr schnelle CPU hilft wenig, wenn zu wenig RAM vorhanden ist und das System ständig Daten auf die SSD auslagern muss.",
              "Beispiel: Viel RAM hilft wenig, wenn das Programm sehr rechenintensiv ist und die CPU dauerhaft bei 100 Prozent Auslastung arbeitet.",
              "Für die AP1 musst du nicht alle Messwerte perfekt interpretieren. Aber du solltest Symptome und mögliche Ursachen verbinden können."
            ]
          },
          {
            title: "Hardware in Unternehmen",
            paragraphs: [
              "Unternehmen kaufen Hardware nicht zufällig. Sie wählen Hardware passend zum Zweck.",
              "Ein Büro-PC braucht oft keine starke Grafikkarte, aber genug RAM und eine schnelle SSD. Ein Entwickler-PC braucht mehr RAM, eine gute CPU und manchmal mehrere Monitore.",
              "Ein Server braucht Zuverlässigkeit, Speicherplatz, Netzwerkleistung und oft Redundanz. Redundanz bedeutet: Eine Komponente kann ausfallen, ohne dass sofort alles stoppt.",
              "Hardware-Entscheidungen haben immer Auswirkungen auf Kosten, Leistung, Wartung und Lebensdauer."
            ]
          }
        ],
        realWorldExamples: [
          "Ein Azubi bekommt einen alten Büro-PC. Der PC startet langsam, weil noch eine HDD eingebaut ist. Eine SSD kann den Start und das Öffnen von Programmen deutlich beschleunigen.",
          "Ein Entwickler nutzt eine IDE, einen Browser, Docker und Teams gleichzeitig. 8 GB RAM reichen nicht mehr aus. Mehr RAM kann helfen, weil weniger Daten ausgelagert werden müssen.",
          "Eine Firma kauft Monitore, Tastaturen und Dockingstations für neue Arbeitsplätze. Diese Geräte sind Peripheriegeräte und müssen mit den vorhandenen Notebooks kompatibel sein.",
          "Ein Server läuft dauerhaft. Deshalb sind zuverlässige Hardware, Kühlung, Stromversorgung und Datensicherung wichtig."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Ein Arbeitsplatz-PC ist langsam",
            paragraphs: [
              "Ein Mitarbeiter meldet: Der PC ist langsam. Eine gute technische Analyse beginnt nicht mit einer sofortigen Kaufentscheidung, sondern mit Beobachtung.",
              "Du prüfst, welche Komponente ausgelastet ist. CPU, RAM und Datenträger sind typische erste Punkte."
            ],
            steps: [
              "Task-Manager öffnen.",
              "CPU-Auslastung prüfen.",
              "RAM-Auslastung prüfen.",
              "Datenträgerauslastung prüfen.",
              "Autostart-Programme prüfen.",
              "Mögliche Ursache notieren.",
              "Passende Maßnahme vorschlagen."
            ]
          },
          {
            title: "Szenario 2: Neuer Ausbildungsplatz",
            paragraphs: [
              "Ein Unternehmen richtet einen neuen Ausbildungsplatz für Anwendungsentwicklung ein. Der Azubi braucht ein Notebook oder einen PC, Monitor, Tastatur, Maus und Netzwerkzugang.",
              "Für FIAE sind genug RAM, eine schnelle SSD und eine zuverlässige CPU wichtiger als eine teure Gaming-GPU."
            ],
            steps: [
              "Anforderungen klären: Welche Programme werden genutzt?",
              "CPU passend zur Entwicklungsarbeit wählen.",
              "Genug RAM einplanen.",
              "SSD als Massenspeicher wählen.",
              "Peripheriegeräte für ergonomisches Arbeiten bereitstellen."
            ]
          }
        ],
        diagrams: [
          {
            title: "Grundaufbau eines Computers",
            code: "flowchart TD\n  E[Eingabe: Tastatur, Maus, Netzwerk] --> CPU[CPU verarbeitet Befehle]\n  CPU <--> RAM[RAM: kurzfristige Daten]\n  RAM <--> SSD[SSD/HDD: dauerhafte Speicherung]\n  CPU --> A[Ausgabe: Monitor, Drucker, Lautsprecher]\n  MB[Mainboard verbindet Komponenten] --- CPU\n  MB --- RAM\n  MB --- SSD\n  NT[Netzteil versorgt mit Strom] --> MB"
          },
          {
            title: "Hardware und Software",
            code: "flowchart LR\n  H[Hardware: physische Teile] --> OS[Betriebssystem]\n  OS --> APP[Anwendungen]\n  APP --> D[Daten]\n  D --> H\n  APP -. braucht .-> CPU[CPU]\n  APP -. nutzt .-> RAM[RAM]\n  APP -. speichert auf .-> S[SSD/HDD]"
          }
        ],
        ihkFocus: {
          appears: [
            "Grundbegriffe wie Hardware, Software, Eingabe, Verarbeitung, Ausgabe und Speicherung.",
            "Zuordnung von Komponenten zu Funktionen.",
            "Einfache Szenarien zu langsamen Computern oder Hardware-Auswahl.",
            "Vergleich von RAM und Massenspeicher.",
            "Unterscheidung zwischen internen Komponenten und Peripheriegeräten."
          ],
          commonMistakes: [
            "Hardware und Software werden vermischt.",
            "RAM wird mit SSD oder HDD verwechselt.",
            "CPU wird als Speicher beschrieben.",
            "Peripheriegeräte werden nicht als Hardware erkannt.",
            "Ein Leistungsproblem wird nur einer Komponente zugeschrieben, ohne die Situation zu prüfen."
          ],
          importantDetails: [
            "Hardware ist physisch.",
            "Software läuft auf Hardware.",
            "RAM ist schnell und flüchtig.",
            "SSD/HDD speichern dauerhaft.",
            "CPU verarbeitet Befehle.",
            "Mainboard verbindet Komponenten.",
            "Ein Engpass kann die Gesamtleistung begrenzen."
          ],
          confusedConcepts: [
            "Hardware vs Software.",
            "RAM vs SSD/HDD.",
            "CPU vs GPU.",
            "Interne Komponenten vs Peripheriegeräte.",
            "Speicherplatz vs Arbeitsspeicher."
          ],
          vocabulary: [
            "Hardware = physische Computerteile.",
            "Software = Programme und Daten.",
            "Arbeitsspeicher = RAM.",
            "Massenspeicher = SSD/HDD.",
            "Peripheriegerät = externes oder angeschlossenes Gerät."
          ]
        },
        commonMistakes: [
          "Zu sagen: RAM speichert Daten dauerhaft. Das ist falsch, weil RAM flüchtig ist.",
          "Zu sagen: Eine SSD macht die CPU schneller. Präziser ist: Eine SSD beschleunigt Zugriffe auf gespeicherte Daten, nicht die Rechenleistung der CPU.",
          "Zu glauben, dass mehr von einer Komponente immer jedes Problem löst. Die Ursache muss zur Maßnahme passen.",
          "Peripheriegeräte zu vergessen, obwohl sie ebenfalls Hardware sind.",
          "Hardware nur als PC-Gehäuse zu verstehen. Auch Server, Router, Switches, Drucker und mobile Geräte sind Hardware."
        ],
        vocabulary: [
          {
            de: "Hardware",
            pt: "hardware / parte física",
            explanation: "Alle physischen Teile eines IT-Systems.",
            example: "CPU, RAM und SSD gehören zur Hardware."
          },
          {
            de: "Software",
            pt: "software / programas",
            explanation: "Programme, Betriebssysteme und Daten, die auf Hardware laufen.",
            example: "Das Betriebssystem ist Software."
          },
          {
            de: "Prozessor",
            pt: "processador",
            explanation: "Die CPU verarbeitet Befehle und Daten.",
            example: "Der Prozessor führt die Befehle eines Programms aus."
          },
          {
            de: "Arbeitsspeicher",
            pt: "memória RAM",
            explanation: "Schneller, flüchtiger Speicher für aktuell genutzte Daten.",
            example: "Zu wenig Arbeitsspeicher kann den Computer langsam machen."
          },
          {
            de: "Massenspeicher",
            pt: "armazenamento",
            explanation: "Dauerhafter Speicher wie SSD oder HDD.",
            example: "Programme und Dateien liegen auf dem Massenspeicher."
          },
          {
            de: "Mainboard",
            pt: "placa-mãe",
            explanation: "Die Hauptplatine, die Komponenten verbindet.",
            example: "CPU und RAM sind mit dem Mainboard verbunden."
          },
          {
            de: "Netzteil",
            pt: "fonte de alimentação",
            explanation: "Versorgt den Computer mit elektrischer Energie.",
            example: "Ein starkes System braucht ein passendes Netzteil."
          },
          {
            de: "Peripheriegerät",
            pt: "periférico",
            explanation: "Ein angeschlossenes Gerät wie Monitor, Tastatur oder Drucker.",
            example: "Eine Maus ist ein Peripheriegerät."
          },
          {
            de: "Engpass",
            pt: "gargalo",
            explanation: "Eine Komponente begrenzt die Leistung des gesamten Systems.",
            example: "Eine alte HDD kann ein Engpass sein."
          },
          {
            de: "flüchtig",
            pt: "volátil",
            explanation: "Daten gehen ohne Strom verloren.",
            example: "RAM ist ein flüchtiger Speicher."
          }
        ],
        summary: [
          "Hardware sind alle physischen Teile eines Computers oder IT-Systems. Dazu gehören interne Komponenten wie CPU, RAM, SSD, HDD, Mainboard und Netzteil sowie Peripheriegeräte wie Monitor, Tastatur, Maus und Drucker.",
          "Software läuft auf Hardware. Ein Programm wird vom Massenspeicher geladen, im RAM bereitgestellt und von der CPU verarbeitet. Das Mainboard verbindet die Komponenten, das Netzteil liefert Strom.",
          "Für AP1 ist besonders wichtig: CPU verarbeitet Befehle, RAM speichert aktuell genutzte Daten kurzfristig, SSD/HDD speichern Daten dauerhaft, Peripheriegeräte dienen Eingabe und Ausgabe.",
          "Português de apoio: entenda a função de cada componente. A prova pode perguntar qual componente causa lentidão, qual upgrade faz sentido ou qual termo alemão corresponde a uma função."
        ],
        mindMap: {
          title: "Mindmap: Hardware",
          code: "mindmap\n  root((Hardware))\n    Physische Teile\n      anfassen\n      Geräte\n      Komponenten\n    Interne Komponenten\n      CPU\n      RAM\n      SSD/HDD\n      Mainboard\n      Netzteil\n      GPU\n    Peripherie\n      Monitor\n      Tastatur\n      Maus\n      Drucker\n    AP1 Fokus\n      Funktionen kennen\n      Begriffe erkennen\n      Engpässe verstehen\n      Hardware vs Software"
        },
        exercises: {
          easy: [
            {
              question: "Was ist Hardware?",
              answer: "Hardware sind alle physischen Teile eines Computers oder IT-Systems.",
              explanation: "Physisch bedeutet: Man kann die Teile anfassen, zum Beispiel CPU, RAM, SSD, Monitor oder Tastatur."
            },
            {
              question: "Nenne drei Beispiele für Hardware.",
              answer: "CPU, RAM und SSD.",
              explanation: "Auch Mainboard, Netzteil, Monitor, Tastatur, Maus oder Drucker wären richtige Beispiele."
            },
            {
              question: "Was ist der Unterschied zwischen Hardware und Software?",
              answer: "Hardware ist physisch. Software sind Programme, Betriebssysteme und Daten.",
              explanation: "Software läuft auf Hardware, aber sie ist selbst kein physisches Gerät."
            },
            {
              question: "Welche Komponente verarbeitet Befehle?",
              answer: "Die CPU beziehungsweise der Prozessor.",
              explanation: "Die CPU führt Programmbefehle aus und verarbeitet Daten."
            },
            {
              question: "Ist eine Tastatur Hardware?",
              answer: "Ja.",
              explanation: "Eine Tastatur ist ein physisches Eingabegerät und damit Hardware."
            }
          ],
          intermediate: [
            {
              question: "Erkläre, warum RAM und SSD nicht dasselbe sind.",
              answer: "RAM ist schneller, flüchtig und für aktuell genutzte Daten. SSD speichert Daten dauerhaft.",
              explanation: "Der wichtigste AP1-Unterschied ist flüchtig vs dauerhaft und Arbeitsspeicher vs Massenspeicher."
            },
            {
              question: "Warum braucht Software Hardware?",
              answer: "Software braucht Hardware, weil Programme irgendwo gespeichert, geladen und von der CPU ausgeführt werden müssen.",
              explanation: "Ohne CPU, RAM und Speicher kann ein Programm nicht praktisch laufen."
            },
            {
              question: "Was bedeutet Engpass bei Hardware?",
              answer: "Ein Engpass ist eine Komponente, die die Gesamtleistung begrenzt.",
              explanation: "Wenn zum Beispiel die HDD sehr langsam ist, kann ein PC trotz guter CPU langsam wirken."
            },
            {
              question: "Warum ist das Mainboard wichtig?",
              answer: "Das Mainboard verbindet die wichtigsten Komponenten miteinander.",
              explanation: "CPU, RAM, Speichergeräte und Anschlüsse kommunizieren über das Mainboard."
            },
            {
              question: "Nenne zwei Peripheriegeräte und erkläre ihre Funktion.",
              answer: "Tastatur für Eingabe und Monitor für Ausgabe.",
              explanation: "Peripheriegeräte erweitern oder ermöglichen die Interaktion mit dem Computer."
            }
          ],
          ap1Style: [
            {
              question: "Ein Büro-PC startet sehr langsam und Programme öffnen langsam. Im PC ist eine alte HDD verbaut. Nennen Sie eine sinnvolle Hardware-Maßnahme und begründen Sie Ihre Antwort.",
              answer: "Eine sinnvolle Maßnahme ist der Austausch der HDD durch eine SSD.",
              explanation: "Eine SSD hat deutlich kürzere Zugriffszeiten als eine HDD. Dadurch starten Betriebssystem und Programme oft schneller."
            },
            {
              question: "Ein Mitarbeiter nutzt viele Programme gleichzeitig. Der PC wird langsam, obwohl die CPU-Auslastung niedrig ist. Der Arbeitsspeicher ist fast voll. Welche Ursache ist wahrscheinlich?",
              answer: "Wahrscheinlich ist zu wenig RAM vorhanden.",
              explanation: "Wenn RAM fast voll ist, muss das System Daten auslagern. Das kann den Computer stark verlangsamen."
            },
            {
              question: "Ordnen Sie zu: CPU, RAM, SSD. Welche Komponente verarbeitet Befehle, welche speichert aktuelle Daten kurzfristig, welche speichert Daten dauerhaft?",
              answer: "CPU verarbeitet Befehle. RAM speichert aktuelle Daten kurzfristig. SSD speichert Daten dauerhaft.",
              explanation: "Diese Zuordnung ist eine typische AP1-Grundlage."
            },
            {
              question: "Ein Auszubildender sagt: Mehr Speicherplatz macht den PC immer schneller. Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist zu allgemein und nicht immer richtig.",
              explanation: "Mehr Speicherplatz hilft, wenn der Datenträger voll ist. Bei CPU- oder RAM-Engpässen löst mehr Speicherplatz das Problem nicht unbedingt."
            },
            {
              question: "Ein Unternehmen richtet neue Arbeitsplätze ein. Nennen Sie zwei Hardware-Komponenten und zwei Peripheriegeräte, die benötigt werden können.",
              answer: "Hardware-Komponenten: CPU und RAM. Peripheriegeräte: Monitor und Tastatur.",
              explanation: "Interne Komponenten arbeiten im Computer. Peripheriegeräte dienen Eingabe, Ausgabe oder zusätzlicher Nutzung."
            }
          ]
        },
        related: {
          previous: "Einführung in AP1 und Lernstrategie",
          next: "CPU"
        },
        revisionChecklist: [
          "Ich kann Hardware und Software unterscheiden.",
          "Ich kann die wichtigsten Hardware-Komponenten nennen.",
          "Ich kann CPU, RAM und SSD/HDD grundlegend erklären.",
          "Ich verstehe das EVA-Prinzip als Grundidee.",
          "Ich kann einen einfachen Hardware-Engpass erklären.",
          "Ich kenne wichtige deutsche Hardware-Begriffe.",
          "Ich kann AP1-Fragen zu Hardware-Grundlagen beantworten."
        ]
      }
    },
    {
      id: "sistemas-operacionais",
      title: "Was ist ein Betriebssystem?",
      description: "Ein Betriebssystem verwaltet Hardware, Software, Dateien, Prozesse, Speicher, Benutzer und Geräte.",
      text: [
        "Ein Betriebssystem ist die grundlegende Software eines Computers. Es sorgt dafür, dass Hardware, Programme und Benutzer sinnvoll zusammenarbeiten.",
        "Für die AP1 musst du die wichtigsten Aufgaben eines Betriebssystems kennen: Prozessverwaltung, Speicherverwaltung, Dateiverwaltung, Geräteverwaltung und Benutzerverwaltung."
      ],
      ihk: "Wichtige AP1-Begriffe: Betriebssystem, Prozessverwaltung, Speicherverwaltung, Dateiverwaltung, Geräteverwaltung, Benutzerverwaltung und Rechte.",
      summary: "Sistema operacional é a base de software que gerencia hardware, programas, memória, arquivos, dispositivos e usuários.",
      example: "Wenn mehrere Programme gleichzeitig laufen, verteilt das Betriebssystem CPU-Zeit und Arbeitsspeicher.",
      exercises: [
        {
          question: "Nenne drei Aufgaben eines Betriebssystems.",
          answer: "Prozessverwaltung, Speicherverwaltung und Dateiverwaltung."
        }
      ],
      studyTime: "90 Minuten",
      difficulty: "Medium",
      fullContent: {
        studyTime: "90 Minuten",
        difficulty: "Medium",
        importance: {
          stars: "★★★★★",
          explanation: [
            "Betriebssysteme sind für AP1 sehr wichtig, weil sie die Verbindung zwischen Hardware und Anwendungen erklären. Fast alle späteren Themen im Modul Betriebssysteme bauen auf diesem Kapitel auf.",
            "Die IHK fragt häufig nach Aufgaben eines Betriebssystems. Besonders wichtig sind Prozessverwaltung, Speicherverwaltung, Dateiverwaltung, Geräteverwaltung und Benutzerverwaltung.",
            "Português de apoio: o sistema operacional é a ponte prática entre hardware, programas e usuário. Sem ele, o usuário teria que controlar hardware e recursos manualmente."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what an operating system is.",
          "After this chapter the student will be able to name important tasks of an operating system.",
          "After this chapter the student will be able to distinguish operating system and application software.",
          "After this chapter the student will be able to explain why resource management is necessary.",
          "After this chapter the student will be able to connect operating systems to hardware, users and programs.",
          "After this chapter the student will be able to answer AP1-style questions about operating system functions."
        ],
        introduction: [
          "Ein Computer besteht aus Hardware: CPU, RAM, Massenspeicher, Mainboard und Peripheriegeräten. Aber Hardware allein ist für Benutzer schwer nutzbar.",
          "Damit Programme gestartet werden können, Dateien gespeichert werden, Geräte funktionieren und Benutzer sich anmelden können, braucht der Computer ein Betriebssystem.",
          "Das Betriebssystem ist die grundlegende Software, die zwischen Hardware, Anwendungsprogrammen und Benutzern vermittelt.",
          "Für AP1 ist wichtig: Du musst nicht jedes Detail eines bestimmten Betriebssystems kennen. Du musst die allgemeinen Aufgaben verstehen."
        ],
        explanation: [
          {
            title: "Was ist ein Betriebssystem?",
            paragraphs: [
              "Ein Betriebssystem ist grundlegende Systemsoftware. Es verwaltet die Ressourcen eines Computers und stellt eine Umgebung bereit, in der Programme laufen können.",
              "Beispiele für Betriebssysteme sind Windows, Linux, macOS, Android und iOS.",
              "Ohne Betriebssystem müsste jedes Programm selbst direkt mit Hardware arbeiten. Das wäre kompliziert, unsicher und unpraktisch."
            ]
          },
          {
            title: "Betriebssystem und Anwendungssoftware",
            paragraphs: [
              "Anwendungssoftware sind Programme, die Benutzer direkt für Aufgaben verwenden. Beispiele sind Browser, Textverarbeitung, Entwicklungsumgebung oder E-Mail-Programm.",
              "Das Betriebssystem ist dagegen die Basis, auf der diese Anwendungen laufen.",
              "Ein Browser nutzt zum Beispiel das Betriebssystem, um Netzwerkzugriff, Dateien, Speicher und Bildausgabe zu verwenden."
            ]
          },
          {
            title: "Prozessverwaltung",
            paragraphs: [
              "Wenn ein Programm läuft, spricht man von einem Prozess. Das Betriebssystem verwaltet diese Prozesse.",
              "Es entscheidet, welcher Prozess CPU-Zeit bekommt. Es startet, pausiert und beendet Prozesse.",
              "Ohne Prozessverwaltung könnte ein Programm den Computer blockieren oder andere Programme stören."
            ]
          },
          {
            title: "Speicherverwaltung",
            paragraphs: [
              "Das Betriebssystem verwaltet den Arbeitsspeicher. Es teilt RAM an Programme zu und schützt Speicherbereiche voneinander.",
              "Wenn viele Programme laufen, muss das Betriebssystem entscheiden, wie Speicher genutzt wird.",
              "Bei knappem RAM kann das Betriebssystem virtuellen Speicher oder Auslagerung verwenden. Das ist langsamer als echter RAM, kann aber helfen, weiterzuarbeiten."
            ]
          },
          {
            title: "Dateiverwaltung",
            paragraphs: [
              "Dateiverwaltung bedeutet: Das Betriebssystem organisiert Dateien und Ordner auf Massenspeichern.",
              "Es stellt Dateisysteme bereit, verwaltet Pfade, Dateinamen, Speicherorte und Zugriffsrechte.",
              "Wenn du eine Datei speicherst oder öffnest, arbeitet das Betriebssystem mit dem Dateisystem und dem Massenspeicher zusammen."
            ]
          },
          {
            title: "Geräteverwaltung",
            paragraphs: [
              "Das Betriebssystem verwaltet Geräte wie Tastatur, Maus, Monitor, Drucker, Netzwerkkarte oder Speichergeräte.",
              "Dafür nutzt es oft Treiber. Ein Treiber ist Software, die die Kommunikation mit einem Gerät ermöglicht.",
              "Wenn ein Gerät nicht funktioniert, kann ein fehlender oder falscher Treiber eine Ursache sein."
            ]
          },
          {
            title: "Benutzerverwaltung und Rechte",
            paragraphs: [
              "In Unternehmen nutzen mehrere Personen IT-Systeme. Das Betriebssystem verwaltet Benutzerkonten, Gruppen und Rechte.",
              "Rechte legen fest, wer Dateien lesen, ändern, ausführen oder löschen darf.",
              "Diese Verwaltung ist wichtig für Sicherheit und Datenschutz. Nicht jeder Benutzer soll alles dürfen."
            ]
          },
          {
            title: "Benutzeroberfläche",
            paragraphs: [
              "Das Betriebssystem bietet eine Benutzeroberfläche. Das kann eine grafische Oberfläche, also GUI, oder eine Kommandozeile, also CLI, sein.",
              "Eine GUI nutzt Fenster, Symbole und Menüs. Eine CLI nutzt Textbefehle.",
              "Für AP1 ist wichtig: Beide sind Wege, mit dem Betriebssystem zu arbeiten."
            ]
          },
          {
            title: "Sicherheit und Updates",
            paragraphs: [
              "Betriebssysteme enthalten Sicherheitsfunktionen wie Benutzerrechte, Zugriffskontrolle, Updates und manchmal integrierte Schutzfunktionen.",
              "Updates schließen Sicherheitslücken, beheben Fehler und verbessern Stabilität.",
              "In Unternehmen ist regelmäßige Aktualisierung wichtig, weil veraltete Systeme ein Sicherheitsrisiko sein können."
            ]
          }
        ],
        realWorldExamples: [
          "Ein Benutzer startet Browser, E-Mail und Office. Das Betriebssystem verwaltet, welche Programme laufen und wie CPU und RAM verteilt werden.",
          "Ein Mitarbeiter darf eine Datei nur lesen, aber nicht ändern. Das Betriebssystem prüft die Rechte.",
          "Ein neuer Drucker funktioniert erst nach Installation des passenden Treibers.",
          "Ein Unternehmen installiert Sicherheitsupdates, um bekannte Schwachstellen im Betriebssystem zu schließen."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Programm reagiert nicht",
            paragraphs: [
              "Ein Programm reagiert nicht mehr. Der Benutzer kann es über den Task-Manager beenden.",
              "Das ist ein Beispiel für Prozessverwaltung. Das Betriebssystem zeigt laufende Prozesse und kann Prozesse beenden."
            ],
            steps: [
              "Task-Manager öffnen.",
              "Nicht reagierendes Programm suchen.",
              "Prozess auswählen.",
              "Prozess beenden.",
              "Prüfen, ob das System wieder normal reagiert."
            ]
          },
          {
            title: "Szenario 2: Zugriff verweigert",
            paragraphs: [
              "Ein Benutzer versucht, eine Datei in einem geschützten Ordner zu ändern. Das System zeigt Zugriff verweigert.",
              "Das Betriebssystem prüft die Berechtigungen des Benutzers. Wenn die Rechte fehlen, wird der Zugriff blockiert."
            ],
            steps: [
              "Benutzerkonto prüfen.",
              "Datei- oder Ordnerrechte prüfen.",
              "Gruppenzugehörigkeit prüfen.",
              "Nur notwendige Rechte vergeben.",
              "Zugriff erneut testen."
            ]
          }
        ],
        diagrams: [
          {
            title: "Rolle des Betriebssystems",
            code: "flowchart TD\n  U[Benutzer] --> APP[Anwendungsprogramme]\n  APP --> OS[Betriebssystem]\n  OS --> CPU[CPU]\n  OS --> RAM[RAM]\n  OS --> FS[Dateisystem / Speicher]\n  OS --> DEV[Geräte und Treiber]\n  OS --> SEC[Benutzer und Rechte]"
          },
          {
            title: "Aufgaben eines Betriebssystems",
            code: "mindmap\n  root((Betriebssystem))\n    Prozessverwaltung\n      Programme starten\n      CPU-Zeit verteilen\n      Prozesse beenden\n    Speicherverwaltung\n      RAM zuteilen\n      Speicher schützen\n      Auslagerung\n    Dateiverwaltung\n      Dateien\n      Ordner\n      Rechte\n    Geräteverwaltung\n      Treiber\n      Peripherie\n      Schnittstellen\n    Benutzerverwaltung\n      Konten\n      Gruppen\n      Berechtigungen"
          }
        ],
        ihkFocus: {
          appears: [
            "Aufgaben eines Betriebssystems nennen oder erklären.",
            "Unterscheidung Betriebssystem und Anwendungssoftware.",
            "Szenarien zu Prozessverwaltung, Speicherverwaltung, Dateiverwaltung oder Benutzerrechten.",
            "Treiber und Geräteverwaltung.",
            "Berechtigungen und Zugriffskontrolle."
          ],
          commonMistakes: [
            "Betriebssystem mit einem normalen Programm verwechseln.",
            "Nur die Benutzeroberfläche als Betriebssystem sehen.",
            "Prozessverwaltung und Speicherverwaltung nicht unterscheiden.",
            "Dateiverwaltung und Datenbank verwechseln.",
            "Rechteverwaltung als reine Benutzerfreundlichkeit statt Sicherheitsfunktion verstehen."
          ],
          importantDetails: [
            "Betriebssystem verwaltet Ressourcen.",
            "Programme laufen auf dem Betriebssystem.",
            "Treiber helfen bei Gerätekommunikation.",
            "Benutzer und Rechte sind Sicherheitsgrundlagen.",
            "Updates sind wichtig für Sicherheit und Stabilität."
          ],
          confusedConcepts: [
            "Betriebssystem vs Anwendung.",
            "GUI vs Betriebssystem.",
            "Prozess vs Programm.",
            "Dateisystem vs Datenbank.",
            "Benutzerkonto vs Berechtigung."
          ],
          vocabulary: [
            "Betriebssystem = grundlegende Systemsoftware.",
            "Prozessverwaltung = Verwaltung laufender Programme.",
            "Speicherverwaltung = Verwaltung von RAM.",
            "Dateiverwaltung = Organisation von Dateien.",
            "Benutzerverwaltung = Verwaltung von Konten und Rechten."
          ]
        },
        commonMistakes: [
          "Zu sagen: Ein Betriebssystem ist nur die Oberfläche. Die Oberfläche ist nur ein Teil.",
          "Betriebssystem und Anwendung zu verwechseln. Word oder Chrome sind Anwendungen, Windows oder Linux sind Betriebssysteme.",
          "Zu glauben, dass jedes Programm direkt mit der Hardware arbeitet. In der Regel nutzt es Dienste des Betriebssystems.",
          "Treiber als Hardware zu beschreiben. Treiber sind Software.",
          "Rechteverwaltung zu ignorieren, obwohl sie für Sicherheit und Datenschutz wichtig ist."
        ],
        vocabulary: [
          {
            de: "Betriebssystem",
            pt: "sistema operacional",
            explanation: "Grundlegende Software, die Hardware, Programme und Benutzer verwaltet.",
            example: "Windows und Linux sind Betriebssysteme."
          },
          {
            de: "Anwendungssoftware",
            pt: "software aplicativo",
            explanation: "Programm, das Benutzer für konkrete Aufgaben verwenden.",
            example: "Ein Browser ist Anwendungssoftware."
          },
          {
            de: "Prozessverwaltung",
            pt: "gerenciamento de processos",
            explanation: "Verwaltung laufender Programme und CPU-Zeit.",
            example: "Das Betriebssystem verwaltet laufende Prozesse."
          },
          {
            de: "Speicherverwaltung",
            pt: "gerenciamento de memória",
            explanation: "Verwaltung des Arbeitsspeichers.",
            example: "Die Speicherverwaltung teilt RAM an Programme zu."
          },
          {
            de: "Dateiverwaltung",
            pt: "gerenciamento de arquivos",
            explanation: "Organisation von Dateien, Ordnern und Speicherorten.",
            example: "Die Dateiverwaltung speichert Dateien in Ordnern."
          },
          {
            de: "Geräteverwaltung",
            pt: "gerenciamento de dispositivos",
            explanation: "Verwaltung angeschlossener Hardware und Treiber.",
            example: "Die Geräteverwaltung nutzt Treiber für Drucker."
          },
          {
            de: "Benutzerverwaltung",
            pt: "gerenciamento de usuários",
            explanation: "Verwaltung von Benutzerkonten und Gruppen.",
            example: "Die Benutzerverwaltung legt Konten für Mitarbeiter an."
          },
          {
            de: "Berechtigung",
            pt: "permissão",
            explanation: "Recht, eine Aktion auszuführen oder auf Daten zuzugreifen.",
            example: "Ohne Berechtigung kann der Benutzer die Datei nicht ändern."
          },
          {
            de: "Treiber",
            pt: "driver",
            explanation: "Software für die Kommunikation mit Hardware.",
            example: "Der Drucker braucht einen passenden Treiber."
          },
          {
            de: "Benutzeroberfläche",
            pt: "interface de usuário",
            explanation: "Art, wie der Benutzer mit dem System interagiert.",
            example: "Eine grafische Benutzeroberfläche nutzt Fenster und Menüs."
          }
        ],
        summary: [
          "Ein Betriebssystem ist grundlegende Systemsoftware. Es verwaltet Hardware, Programme, Dateien, Speicher, Geräte, Benutzer und Rechte.",
          "Programme laufen auf dem Betriebssystem. Das Betriebssystem stellt Dienste bereit, damit Anwendungen nicht direkt jede Hardware selbst steuern müssen.",
          "Für AP1 sind besonders wichtig: Prozessverwaltung, Speicherverwaltung, Dateiverwaltung, Geräteverwaltung und Benutzerverwaltung.",
          "Português de apoio: sistema operacional é a base que coordena recursos. Ele não é apenas a aparência visual; ele gerencia processos, memória, arquivos, dispositivos e permissões."
        ],
        mindMap: {
          title: "Mindmap: Betriebssystem",
          code: "mindmap\n  root((Betriebssystem))\n    Grundlage\n      Systemsoftware\n      zwischen Hardware und Anwendungen\n    Aufgaben\n      Prozessverwaltung\n      Speicherverwaltung\n      Dateiverwaltung\n      Geräteverwaltung\n      Benutzerverwaltung\n    Sicherheit\n      Rechte\n      Benutzer\n      Updates\n    Oberfläche\n      GUI\n      CLI\n    AP1 Fokus\n      Aufgaben nennen\n      Szenarien verstehen\n      Begriffe unterscheiden"
        },
        exercises: {
          easy: [
            {
              question: "Was ist ein Betriebssystem?",
              answer: "Grundlegende Systemsoftware, die Hardware, Programme und Benutzer verwaltet.",
              explanation: "Es bildet die Basis, auf der Anwendungen laufen."
            },
            {
              question: "Nenne zwei Beispiele für Betriebssysteme.",
              answer: "Windows und Linux.",
              explanation: "Auch macOS, Android und iOS sind Betriebssysteme."
            },
            {
              question: "Ist ein Browser ein Betriebssystem?",
              answer: "Nein.",
              explanation: "Ein Browser ist Anwendungssoftware und läuft auf einem Betriebssystem."
            },
            {
              question: "Welche Aufgabe hat die Dateiverwaltung?",
              answer: "Sie organisiert Dateien und Ordner.",
              explanation: "Dazu gehören Speicherorte, Pfade und Zugriffsrechte."
            },
            {
              question: "Was ist ein Treiber?",
              answer: "Software, die die Kommunikation mit Hardware ermöglicht.",
              explanation: "Treiber sind wichtig für Geräte wie Drucker oder Grafikkarten."
            }
          ],
          intermediate: [
            {
              question: "Erkläre den Unterschied zwischen Betriebssystem und Anwendungssoftware.",
              answer: "Das Betriebssystem ist die Basissoftware. Anwendungssoftware sind Programme für Benutzeraufgaben.",
              explanation: "Beispiel: Windows ist Betriebssystem, Chrome ist Anwendung."
            },
            {
              question: "Warum braucht ein Betriebssystem Prozessverwaltung?",
              answer: "Damit mehrere Programme gestartet, ausgeführt und kontrolliert werden können.",
              explanation: "Das Betriebssystem verteilt CPU-Zeit und kann Prozesse beenden."
            },
            {
              question: "Warum ist Speicherverwaltung wichtig?",
              answer: "Weil Programme RAM benötigen und Speicherbereiche geschützt werden müssen.",
              explanation: "Ohne Speicherverwaltung könnten Programme sich gegenseitig stören."
            },
            {
              question: "Warum sind Benutzerrechte wichtig?",
              answer: "Sie schützen Daten und verhindern unerlaubte Aktionen.",
              explanation: "Nicht jeder Benutzer soll jede Datei ändern oder löschen dürfen."
            },
            {
              question: "Warum sind Updates wichtig?",
              answer: "Sie schließen Sicherheitslücken, beheben Fehler und verbessern Stabilität.",
              explanation: "Veraltete Betriebssysteme können ein Sicherheitsrisiko sein."
            }
          ],
          ap1Style: [
            {
              question: "Ein Mitarbeiter kann eine Datei öffnen, aber nicht speichern. Welche Betriebssystemfunktion ist wahrscheinlich beteiligt?",
              answer: "Benutzer- und Rechteverwaltung.",
              explanation: "Der Benutzer hat möglicherweise Leserechte, aber keine Schreibrechte."
            },
            {
              question: "Ein Programm reagiert nicht mehr und soll beendet werden. Welche Aufgabe des Betriebssystems wird genutzt?",
              answer: "Prozessverwaltung.",
              explanation: "Das Betriebssystem verwaltet laufende Prozesse und kann sie beenden."
            },
            {
              question: "Ein neuer Drucker wird angeschlossen, funktioniert aber nicht korrekt. Nennen Sie eine mögliche softwareseitige Ursache.",
              answer: "Ein fehlender oder falscher Treiber.",
              explanation: "Treiber ermöglichen dem Betriebssystem die Kommunikation mit dem Gerät."
            },
            {
              question: "Ordnen Sie zu: Prozessverwaltung, Speicherverwaltung, Dateiverwaltung. Welche Aufgabe verwaltet RAM, welche laufende Programme, welche Dateien?",
              answer: "Speicherverwaltung verwaltet RAM. Prozessverwaltung verwaltet laufende Programme. Dateiverwaltung verwaltet Dateien.",
              explanation: "Diese Zuordnung ist eine typische AP1-Grundlage."
            },
            {
              question: "Ein Azubi sagt: Das Betriebssystem ist nur die grafische Oberfläche. Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist falsch beziehungsweise unvollständig.",
              explanation: "Die Benutzeroberfläche ist nur ein Teil. Das Betriebssystem verwaltet auch Prozesse, Speicher, Dateien, Geräte, Benutzer und Rechte."
            }
          ]
        },
        related: {
          previous: "Peripheriegeräte",
          next: "Kernel"
        },
        revisionChecklist: [
          "Ich kann erklären, was ein Betriebssystem ist.",
          "Ich kann Betriebssystem und Anwendungssoftware unterscheiden.",
          "Ich kenne die wichtigsten Aufgaben eines Betriebssystems.",
          "Ich verstehe Prozessverwaltung, Speicherverwaltung und Dateiverwaltung grundlegend.",
          "Ich kann Geräteverwaltung und Treiber erklären.",
          "Ich verstehe Benutzerverwaltung und Rechte als Sicherheitsgrundlage.",
          "Ich kann AP1-Fragen zu Betriebssystem-Grundlagen beantworten."
        ]
      }
    },
    {
      id: "redes",
      title: "Redes",
      description: "Conceitos centrais de comunicação entre sistemas.",
      text: [
        "Redes permitem que dispositivos troquem dados. Em uma rede, endereços, protocolos, portas e equipamentos trabalham em conjunto para transportar informações.",
        "Para a AP1, domine os fundamentos: cliente e servidor, LAN e WAN, IP, DNS, DHCP, roteamento e segurança básica."
      ],
      ihk: "Leia bem se a questão fala de LAN, WAN, Client-Server, Peer-to-Peer, Protokoll ou Dienst.",
      summary: "Rede é comunicação estruturada entre sistemas. Protocolos definem regras, endereços identificam destinos e equipamentos encaminham dados.",
      example: "Ao abrir um site, o computador consulta DNS, recebe um IP e envia pacotes ao servidor usando protocolos como TCP/IP e HTTPS.",
      exercises: [
        {
          question: "O que é um protocolo de rede?",
          answer: "Um conjunto de regras que define como dados são transmitidos e interpretados."
        }
      ]
    },
    {
      id: "osi",
      title: "OSI",
      description: "Modelo de camadas para entender comunicação em redes.",
      text: [
        "O modelo OSI divide a comunicação de rede em sete camadas: física, enlace, rede, transporte, sessão, apresentação e aplicação.",
        "Ele é um modelo conceitual. Na prática, ajuda a localizar problemas e entender onde protocolos e equipamentos atuam."
      ],
      ihk: "Switch costuma aparecer na camada 2, roteador na camada 3, TCP/UDP na camada 4 e HTTP/DNS na camada 7.",
      summary: "OSI organiza a rede em camadas. Cada camada tem responsabilidades próprias e conversa com as camadas vizinhas.",
      example: "Se o cabo está desconectado, o problema é físico. Se o IP está errado, o problema está mais próximo da camada de rede.",
      exercises: [
        {
          question: "Em qual camada atua um roteador?",
          answer: "Na camada 3, a camada de rede."
        }
      ]
    },
    {
      id: "ipv4",
      title: "IPv4",
      description: "Endereços, máscaras e identificação de redes.",
      text: [
        "IPv4 é um sistema de endereçamento usado para identificar dispositivos em redes. Um endereço IPv4 possui 32 bits, normalmente escrito em quatro octetos.",
        "A máscara de sub-rede separa a parte da rede e a parte do host. Esse conceito é essencial para entender comunicação local e roteamento."
      ],
      ihk: "Saiba reconhecer endereço IP, Subnetzmaske, Netzwerkadresse, Broadcastadresse e Hostbereich.",
      summary: "IPv4 identifica hosts e redes. A máscara define quais dispositivos estão na mesma rede lógica.",
      example: "Com IP 192.168.1.10 e máscara 255.255.255.0, a rede normalmente é 192.168.1.0/24.",
      exercises: [
        {
          question: "Para que serve a máscara de sub-rede?",
          answer: "Para separar a parte de rede e a parte de host de um endereço IP."
        }
      ]
    },
    {
      id: "dns",
      title: "DNS",
      description: "DNS übersetzt lesbare Namen wie example.com in IP-Adressen, damit Geräte Netzwerkziele finden können.",
      text: [
        "DNS bedeutet Domain Name System. Es löst Namen in IP-Adressen auf.",
        "Für die AP1 musst du verstehen, warum DNS nötig ist, wie Namensauflösung grundsätzlich funktioniert und welche typischen DNS-Fehler auftreten."
      ],
      ihk: "Wichtig für AP1: DNS löst Namen zu IP-Adressen auf. Typische Begriffe sind DNS-Server, Resolver, Cache, A, AAAA, CNAME, MX, Domain und FQDN.",
      summary: "DNS transforma nomes legíveis em endereços IP. Se o IP funciona, mas o nome não, DNS é uma causa provável.",
      example: "Wenn du www.example.com im Browser eingibst, fragt dein Gerät zuerst DNS, welche IP-Adresse zu diesem Namen gehört.",
      exercises: [
        {
          question: "Was ist die Hauptaufgabe von DNS?",
          answer: "DNS löst Namen in IP-Adressen auf."
        }
      ],
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      fullContent: {
        studyTime: "90-110 Minuten",
        difficulty: "Medium",
        importance: {
          stars: "★★★★★",
          explanation: [
            "DNS ist für AP1 sehr wichtig, weil fast jede Netzwerkkommunikation mit Namen arbeitet: Webseiten, interne Server, Mailserver und viele Unternehmensdienste.",
            "Die IHK prüft DNS häufig über praktische Fehler: Eine IP-Adresse ist erreichbar, aber der Name nicht; ein falscher DNS-Server ist eingetragen; ein Record zeigt auf die falsche Adresse.",
            "Português de apoio: DNS é como uma lista de nomes. Pessoas usam nomes; computadores precisam de endereços IP."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what DNS is.",
          "After this chapter the student will be able to describe why name resolution is needed.",
          "After this chapter the student will be able to distinguish name, domain, FQDN and IP address.",
          "After this chapter the student will be able to explain DNS records such as A, AAAA, CNAME and MX at AP1 level.",
          "After this chapter the student will be able to understand DNS cache and typical DNS errors.",
          "After this chapter the student will be able to solve AP1-style questions about DNS troubleshooting."
        ],
        introduction: [
          "Menschen merken sich Namen besser als Zahlen. Deshalb geben wir im Browser meistens Namen wie www.example.com ein und keine IP-Adresse.",
          "Computer benötigen für die Kommunikation aber technische Adressen. In IP-Netzwerken sind das IP-Adressen.",
          "DNS verbindet diese beiden Welten: Es übersetzt lesbare Namen in IP-Adressen.",
          "Für AP1 ist DNS besonders wichtig, weil viele Netzwerkprobleme eigentlich Namensauflösungsprobleme sind."
        ],
        explanation: [
          {
            title: "Was ist DNS?",
            paragraphs: [
              "DNS steht für Domain Name System.",
              "DNS ist ein System zur Namensauflösung. Es ordnet Namen IP-Adressen oder anderen Informationen zu.",
              "Ohne DNS müssten Benutzer viele IP-Adressen kennen, statt einfache Namen zu verwenden."
            ]
          },
          {
            title: "Namensauflösung",
            paragraphs: [
              "Namensauflösung bedeutet: Ein Name wird in eine Adresse übersetzt.",
              "Beispiel: Der Name www.example.com wird in eine IP-Adresse übersetzt.",
              "Erst danach kann der Client eine Verbindung zum Zielserver aufbauen."
            ]
          },
          {
            title: "DNS-Server",
            paragraphs: [
              "Ein DNS-Server beantwortet DNS-Anfragen.",
              "Ein Client fragt zum Beispiel: Welche IP-Adresse gehört zu diesem Namen?",
              "Der DNS-Server antwortet mit der passenden Information, wenn er sie kennt oder ermitteln kann."
            ]
          },
          {
            title: "Resolver",
            paragraphs: [
              "Ein Resolver ist die Komponente, die DNS-Anfragen für ein Gerät stellt.",
              "In der Praxis fragt dein Computer oder dein Router einen DNS-Server.",
              "Für AP1 reicht: Der Resolver hilft dem Client, Namen aufzulösen."
            ]
          },
          {
            title: "Domain und FQDN",
            paragraphs: [
              "Eine Domain ist ein Namensbereich, zum Beispiel example.com.",
              "Ein FQDN ist ein vollständig qualifizierter Domainname, zum Beispiel www.example.com.",
              "Der FQDN beschreibt einen vollständigen Namen innerhalb der DNS-Struktur."
            ]
          },
          {
            title: "A-Record und AAAA-Record",
            paragraphs: [
              "Ein A-Record ordnet einen Namen einer IPv4-Adresse zu.",
              "Ein AAAA-Record ordnet einen Namen einer IPv6-Adresse zu.",
              "Für AP1 ist diese Unterscheidung wichtig: A gehört zu IPv4, AAAA gehört zu IPv6."
            ]
          },
          {
            title: "CNAME-Record",
            paragraphs: [
              "Ein CNAME-Record ist ein Alias.",
              "Er verweist einen Namen auf einen anderen Namen.",
              "Beispiel: shop.example.com kann als Alias auf einen anderen Hostnamen zeigen."
            ]
          },
          {
            title: "MX-Record",
            paragraphs: [
              "Ein MX-Record gibt Mailserver für eine Domain an.",
              "Wenn E-Mails an eine Domain zugestellt werden, helfen MX-Records bei der Auswahl des zuständigen Mailservers.",
              "Für AP1 reicht: MX gehört zu E-Mail-Zustellung."
            ]
          },
          {
            title: "DNS-Cache",
            paragraphs: [
              "DNS-Antworten werden oft zwischengespeichert. Das nennt man DNS-Cache.",
              "Caching macht DNS schneller und reduziert Anfragen.",
              "Ein veralteter Cache kann aber auch Probleme verursachen, wenn sich eine IP-Adresse geändert hat."
            ]
          },
          {
            title: "Typische DNS-Probleme",
            paragraphs: [
              "Ein klassisches DNS-Problem lautet: Die IP-Adresse ist erreichbar, aber der Name funktioniert nicht.",
              "Mögliche Ursachen sind falscher DNS-Server, falscher DNS-Record, Cache-Problem oder keine Verbindung zum DNS-Server.",
              "Bei AP1-Fehlersuche ist die Frage wichtig: Funktioniert die Verbindung per IP? Funktioniert die Verbindung per Name?"
            ]
          }
        ],
        realWorldExamples: [
          "Ein Mitarbeiter gibt intranet.firma.local ein und erreicht die interne Firmenwebseite.",
          "Ein Webserver bekommt einen A-Record, damit www.firma.de auf seine IPv4-Adresse zeigt.",
          "Ein Unternehmen nutzt MX-Records, damit E-Mails an die richtigen Mailserver zugestellt werden.",
          "Nach einem Serverumzug zeigt ein alter DNS-Cache noch auf die alte IP-Adresse.",
          "Ein Client hat einen falschen DNS-Server eingetragen und kann Namen nicht auflösen."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: IP funktioniert, Name nicht",
            paragraphs: [
              "Ein Benutzer kann einen Server per IP-Adresse erreichen, aber nicht per Namen.",
              "Das spricht stark für ein DNS-Problem."
            ],
            steps: [
              "Verbindung per IP-Adresse testen.",
              "Verbindung per Namen testen.",
              "DNS-Server-Konfiguration prüfen.",
              "DNS-Record prüfen.",
              "DNS-Cache prüfen oder leeren.",
              "Namensauflösung erneut testen."
            ]
          },
          {
            title: "Szenario 2: Neue Webseite zeigt auf falschen Server",
            paragraphs: [
              "Eine neue interne Webseite wurde eingerichtet, aber der Name führt zum falschen Server.",
              "Wahrscheinlich zeigt der DNS-Record auf eine falsche IP-Adresse oder ein alter Cache wird genutzt."
            ],
            steps: [
              "Gewünschten Namen bestimmen.",
              "DNS-Record prüfen.",
              "IP-Adresse im Record mit Zielserver vergleichen.",
              "TTL und Cache berücksichtigen.",
              "Record korrigieren.",
              "Nach Änderung erneut testen."
            ]
          }
        ],
        diagrams: [
          {
            title: "DNS-Namensauflösung vereinfacht",
            code: "sequenceDiagram\n  participant C as Client\n  participant D as DNS-Server\n  participant W as Webserver\n  C->>D: Welche IP hat www.example.com?\n  D->>C: 203.0.113.10\n  C->>W: Verbindung zur IP-Adresse aufbauen\n  W->>C: Antwort senden"
          },
          {
            title: "DNS-Records",
            code: "flowchart TD\n  NAME[Name: www.example.com] --> A[A-Record: IPv4-Adresse]\n  NAME --> AAAA[AAAA-Record: IPv6-Adresse]\n  ALIAS[Alias: shop.example.com] --> CNAME[CNAME: anderer Name]\n  MAIL[Domain: example.com] --> MX[MX-Record: Mailserver]"
          }
        ],
        ihkFocus: {
          appears: [
            "DNS als Namensauflösung erklären.",
            "Name und IP-Adresse unterscheiden.",
            "DNS-Server und Resolver grob einordnen.",
            "A, AAAA, CNAME und MX unterscheiden.",
            "DNS-Cache als mögliche Fehlerquelle verstehen.",
            "Fehlerfall 'IP funktioniert, Name nicht' analysieren."
          ],
          commonMistakes: [
            "DNS mit DHCP verwechseln.",
            "DNS als Internetverbindung beschreiben.",
            "A-Record und MX-Record verwechseln.",
            "IP-Adresse und Domainname gleichsetzen.",
            "Bei Namensproblemen nur Router oder Firewall prüfen und DNS vergessen."
          ],
          importantDetails: [
            "DNS bedeutet Domain Name System.",
            "DNS löst Namen in IP-Adressen auf.",
            "A steht für IPv4.",
            "AAAA steht für IPv6.",
            "CNAME ist ein Alias.",
            "MX gehört zu Mailservern.",
            "DNS-Cache kann veraltete Antworten enthalten."
          ],
          confusedConcepts: [
            "DNS vs DHCP.",
            "DNS vs Gateway.",
            "Domain vs IP-Adresse.",
            "A vs AAAA.",
            "CNAME vs A-Record.",
            "MX vs Webserver."
          ],
          vocabulary: [
            "DNS = Domain Name System.",
            "Namensauflösung = Name zu Adresse.",
            "DNS-Server = beantwortet DNS-Anfragen.",
            "A-Record = Name zu IPv4.",
            "MX-Record = Mailserver einer Domain."
          ]
        },
        commonMistakes: [
          "Zu sagen: DNS vergibt IP-Adressen. Das ist typischerweise DHCP. DNS löst Namen zu Adressen auf.",
          "DNS mit dem Router gleichzusetzen. Ein Router leitet Pakete weiter; DNS beantwortet Namensanfragen.",
          "A und AAAA zu verwechseln. A gehört zu IPv4, AAAA zu IPv6.",
          "MX als Webserver-Record zu erklären. MX ist für Mailserver zuständig.",
          "Bei 'Webseite nicht erreichbar' sofort den Server zu verdächtigen. Wenn die IP erreichbar ist, kann DNS die Ursache sein."
        ],
        vocabulary: [
          {
            de: "DNS",
            pt: "DNS",
            explanation: "System zur Auflösung von Namen in IP-Adressen.",
            example: "DNS löst www.example.com zu einer IP-Adresse auf."
          },
          {
            de: "Domain Name System",
            pt: "sistema de nomes de domínio",
            explanation: "Langform von DNS.",
            example: "DNS bedeutet Domain Name System."
          },
          {
            de: "Namensauflösung",
            pt: "resolução de nomes",
            explanation: "Übersetzung eines Namens in eine technische Adresse.",
            example: "Die Namensauflösung liefert die IP-Adresse."
          },
          {
            de: "DNS-Server",
            pt: "servidor DNS",
            explanation: "Server, der DNS-Anfragen beantwortet.",
            example: "Der Client fragt den DNS-Server."
          },
          {
            de: "Resolver",
            pt: "resolvedor",
            explanation: "Komponente, die DNS-Anfragen stellt.",
            example: "Der Resolver fragt nach der IP-Adresse."
          },
          {
            de: "Domain",
            pt: "domínio",
            explanation: "Namensbereich im DNS.",
            example: "example.com ist eine Domain."
          },
          {
            de: "FQDN",
            pt: "nome de domínio totalmente qualificado",
            explanation: "Vollständiger Domainname.",
            example: "www.example.com ist ein FQDN."
          },
          {
            de: "A-Record",
            pt: "registro A",
            explanation: "DNS-Eintrag, der einen Namen einer IPv4-Adresse zuordnet.",
            example: "Der A-Record zeigt auf 192.0.2.10."
          },
          {
            de: "AAAA-Record",
            pt: "registro AAAA",
            explanation: "DNS-Eintrag, der einen Namen einer IPv6-Adresse zuordnet.",
            example: "Der AAAA-Record zeigt auf eine IPv6-Adresse."
          },
          {
            de: "MX-Record",
            pt: "registro MX",
            explanation: "DNS-Eintrag für Mailserver einer Domain.",
            example: "Der MX-Record zeigt auf den Mailserver."
          }
        ],
        summary: [
          "DNS steht für Domain Name System und dient der Namensauflösung.",
          "DNS übersetzt lesbare Namen wie www.example.com in IP-Adressen, die Computer zur Kommunikation nutzen.",
          "Ein DNS-Server beantwortet DNS-Anfragen. Ein Resolver stellt solche Anfragen für einen Client.",
          "Wichtige DNS-Records sind A für IPv4, AAAA für IPv6, CNAME für Alias-Namen und MX für Mailserver.",
          "DNS-Cache speichert Antworten vorübergehend. Das macht DNS schneller, kann aber bei veralteten Einträgen Probleme verursachen.",
          "Für AP1 ist der Fehlerfall besonders wichtig: IP funktioniert, Name funktioniert nicht. Dann ist DNS eine wahrscheinliche Ursache."
        ],
        mindMap: {
          title: "Mindmap: DNS",
          code: "mindmap\n  root((DNS))\n    Aufgabe\n      Namen auflösen\n      IP-Adressen finden\n      Dienste lokalisieren\n    Komponenten\n      DNS-Server\n      Resolver\n      Cache\n    Begriffe\n      Domain\n      FQDN\n      Record\n    Records\n      A\n      AAAA\n      CNAME\n      MX\n    AP1 Fokus\n      DNS vs DHCP\n      Name vs IP\n      Fehler analysieren"
        },
        exercises: {
          easy: [
            {
              question: "Wofür steht DNS?",
              answer: "DNS steht für Domain Name System.",
              explanation: "Es ist das System zur Namensauflösung."
            },
            {
              question: "Was ist die Hauptaufgabe von DNS?",
              answer: "DNS löst Namen in IP-Adressen auf.",
              explanation: "Computer brauchen IP-Adressen, Menschen nutzen lieber Namen."
            },
            {
              question: "Was macht ein A-Record?",
              answer: "Er ordnet einen Namen einer IPv4-Adresse zu.",
              explanation: "A ist der typische Record für IPv4."
            },
            {
              question: "Was macht ein AAAA-Record?",
              answer: "Er ordnet einen Namen einer IPv6-Adresse zu.",
              explanation: "AAAA gehört zu IPv6."
            },
            {
              question: "Wofür ist ein MX-Record da?",
              answer: "Für Mailserver einer Domain.",
              explanation: "MX-Records helfen bei der E-Mail-Zustellung."
            }
          ],
          intermediate: [
            {
              question: "Warum brauchen Netzwerke DNS?",
              answer: "Damit Benutzer und Anwendungen Namen statt IP-Adressen verwenden können.",
              explanation: "DNS übersetzt diese Namen in technische Adressen."
            },
            {
              question: "Was ist der Unterschied zwischen DNS und DHCP?",
              answer: "DNS löst Namen auf. DHCP vergibt Netzwerkkonfigurationen wie IP-Adresse und DNS-Server.",
              explanation: "Diese Dienste werden häufig verwechselt."
            },
            {
              question: "Was ist ein CNAME-Record?",
              answer: "Ein Alias, der einen Namen auf einen anderen Namen verweist.",
              explanation: "CNAME speichert normalerweise nicht direkt eine IP-Adresse."
            },
            {
              question: "Warum kann DNS-Cache Probleme verursachen?",
              answer: "Weil veraltete DNS-Antworten zwischengespeichert sein können.",
              explanation: "Dann zeigt ein Name eventuell noch auf eine alte IP-Adresse."
            },
            {
              question: "Was bedeutet FQDN?",
              answer: "Fully Qualified Domain Name, also ein vollständig qualifizierter Domainname.",
              explanation: "Zum Beispiel www.example.com."
            }
          ],
          ap1Style: [
            {
              question: "Ein Client erreicht einen Server per IP-Adresse, aber nicht per Namen. Welche Ursache ist wahrscheinlich?",
              answer: "Ein DNS-Problem.",
              explanation: "Wenn IP funktioniert, aber der Name nicht, liegt die Namensauflösung nahe."
            },
            {
              question: "Ein Azubi sagt: 'DNS vergibt IP-Adressen an Clients.' Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist falsch.",
              explanation: "DHCP vergibt IP-Konfigurationen. DNS löst Namen zu IP-Adressen auf."
            },
            {
              question: "Ordnen Sie zu: A, AAAA, MX. Was gehört zu IPv4, IPv6 und Mailserver?",
              answer: "A = IPv4. AAAA = IPv6. MX = Mailserver.",
              explanation: "Diese Record-Typen sind AP1-relevant."
            },
            {
              question: "Eine Webseite wurde auf einen neuen Server umgezogen, aber manche Clients erreichen noch den alten Server. Nennen Sie eine mögliche DNS-Ursache.",
              answer: "Ein veralteter DNS-Cache.",
              explanation: "Zwischengespeicherte Antworten können noch auf die alte IP-Adresse zeigen."
            },
            {
              question: "Warum ist DNS auch in internen Unternehmensnetzen wichtig?",
              answer: "Damit interne Dienste und Server über Namen erreichbar sind.",
              explanation: "Benutzer und Anwendungen müssen dann nicht interne IP-Adressen kennen."
            }
          ]
        },
        related: {
          previous: "Firewall",
          next: "DHCP"
        },
        revisionChecklist: [
          "Ich kann erklären, was DNS ist.",
          "Ich kann Namensauflösung erklären.",
          "Ich kann DNS und DHCP unterscheiden.",
          "Ich kenne A, AAAA, CNAME und MX auf AP1-Niveau.",
          "Ich verstehe DNS-Cache als mögliche Fehlerquelle.",
          "Ich kann den Fehlerfall IP funktioniert, Name nicht analysieren.",
          "Ich kann AP1-Fragen zu DNS beantworten."
        ]
      }
    },
    {
      id: "dhcp",
      title: "DHCP",
      description: "DHCP vergibt Netzwerkkonfigurationen automatisch an Clients, zum Beispiel IP-Adresse, Subnetzmaske, Gateway und DNS-Server.",
      text: [
        "DHCP bedeutet Dynamic Host Configuration Protocol. Es sorgt dafür, dass Clients automatisch wichtige Netzwerkeinstellungen erhalten.",
        "Für die AP1 musst du verstehen, welche Daten DHCP verteilt, warum das praktisch ist und welche Fehler auftreten können, wenn DHCP nicht funktioniert."
      ],
      ihk: "Wichtig für AP1: DHCP vergibt IP-Konfiguration automatisch. Zentrale Begriffe sind DHCP-Server, Client, Lease, IP-Adresse, Subnetzmaske, Standardgateway und DNS-Server.",
      summary: "DHCP automatiza a configuração de rede. Ele entrega IP, máscara, gateway, DNS e tempo de lease para clientes.",
      example: "Wenn ein Notebook ins WLAN kommt, kann es per DHCP automatisch eine passende IP-Adresse und den DNS-Server erhalten.",
      exercises: [
        {
          question: "Was vergibt DHCP typischerweise?",
          answer: "IP-Adresse, Subnetzmaske, Standardgateway, DNS-Server und Lease-Zeit."
        }
      ],
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      fullContent: {
        studyTime: "90-110 Minuten",
        difficulty: "Medium",
        importance: {
          stars: "★★★★★",
          explanation: [
            "DHCP ist für AP1 sehr wichtig, weil automatische Netzwerkkonfiguration in fast jedem LAN und WLAN vorkommt.",
            "Die IHK prüft DHCP häufig in Fehlersituationen: Ein Client bekommt keine IP-Adresse, hat ein falsches Gateway oder nutzt einen falschen DNS-Server.",
            "Português de apoio: DHCP evita configurar IP manualmente em cada dispositivo. Ele distribui automaticamente os dados básicos da rede."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what DHCP is.",
          "After this chapter the student will be able to name the network settings DHCP can provide.",
          "After this chapter the student will be able to distinguish DHCP and DNS.",
          "After this chapter the student will be able to explain Lease and address pool at AP1 level.",
          "After this chapter the student will be able to describe the DORA process in simple words.",
          "After this chapter the student will be able to solve AP1-style questions about DHCP errors."
        ],
        introduction: [
          "Stell dir vor, ein Unternehmen hat 200 Notebooks. Wenn jede IP-Adresse manuell eingetragen werden müsste, wäre das langsam und fehleranfällig.",
          "DHCP löst dieses Problem. Es verteilt Netzwerkkonfigurationen automatisch.",
          "Ein Client kann dadurch beim Verbinden mit LAN oder WLAN automatisch eine passende IP-Adresse, Subnetzmaske, Gateway und DNS-Server bekommen.",
          "Für AP1 ist DHCP ein Kernthema, weil viele Netzwerkprobleme mit falscher oder fehlender IP-Konfiguration beginnen."
        ],
        explanation: [
          {
            title: "Was ist DHCP?",
            paragraphs: [
              "DHCP steht für Dynamic Host Configuration Protocol.",
              "DHCP ist ein Netzwerkprotokoll, das Clients automatisch Netzwerkeinstellungen zuweist.",
              "Dadurch müssen Administratoren nicht jedes Gerät manuell konfigurieren."
            ]
          },
          {
            title: "Welche Daten verteilt DHCP?",
            paragraphs: [
              "DHCP kann einem Client eine IP-Adresse geben.",
              "Zusätzlich kann DHCP Subnetzmaske, Standardgateway, DNS-Server und weitere Optionen verteilen.",
              "Für AP1 sind IP-Adresse, Subnetzmaske, Gateway, DNS-Server und Lease besonders wichtig."
            ]
          },
          {
            title: "DHCP-Server und DHCP-Client",
            paragraphs: [
              "Der DHCP-Client ist das Gerät, das eine Konfiguration benötigt, zum Beispiel ein Notebook.",
              "Der DHCP-Server stellt passende Netzwerkkonfigurationen bereit.",
              "In kleinen Netzen ist der DHCP-Server oft im Router integriert. In Unternehmen kann es ein eigener Server sein."
            ]
          },
          {
            title: "Adressbereich / Scope",
            paragraphs: [
              "Ein DHCP-Server vergibt Adressen aus einem bestimmten Bereich. Dieser Bereich wird oft Scope oder Adresspool genannt.",
              "Beispiel: Ein DHCP-Server darf Adressen von 192.168.10.100 bis 192.168.10.200 vergeben.",
              "Der Scope muss zum Netzwerk passen, sonst bekommen Clients falsche Adressen."
            ]
          },
          {
            title: "Lease",
            paragraphs: [
              "Eine per DHCP vergebene Adresse wird normalerweise nicht für immer vergeben.",
              "Die Vergabe gilt für eine bestimmte Zeit. Diese Zeit nennt man Lease.",
              "Nach Ablauf oder vor Ablauf kann der Client die Adresse erneuern."
            ]
          },
          {
            title: "DORA-Prozess",
            paragraphs: [
              "Der DHCP-Ablauf wird oft vereinfacht mit DORA erklärt.",
              "DORA steht für Discover, Offer, Request, Acknowledge.",
              "Für AP1 reicht: Client sucht DHCP-Server, Server bietet Adresse an, Client fordert sie an, Server bestätigt."
            ],
            steps: [
              "Discover: Client sucht einen DHCP-Server.",
              "Offer: DHCP-Server bietet eine Konfiguration an.",
              "Request: Client fordert die angebotene Konfiguration an.",
              "Acknowledge: Server bestätigt die Vergabe."
            ]
          },
          {
            title: "DHCP und DNS",
            paragraphs: [
              "DHCP und DNS werden oft verwechselt.",
              "DHCP vergibt Netzwerkkonfiguration, zum Beispiel IP-Adresse und DNS-Server.",
              "DNS löst Namen in IP-Adressen auf. DHCP kann dem Client mitteilen, welchen DNS-Server er nutzen soll."
            ]
          },
          {
            title: "Automatisch vs manuell",
            paragraphs: [
              "Viele Clients erhalten ihre IP-Konfiguration automatisch per DHCP.",
              "Server, Router oder Drucker können manchmal statische IP-Adressen bekommen, damit sie dauerhaft unter derselben Adresse erreichbar sind.",
              "In Unternehmen muss klar dokumentiert sein, welche Adressen automatisch und welche manuell verwendet werden."
            ]
          },
          {
            title: "Reservierung",
            paragraphs: [
              "Eine DHCP-Reservierung bedeutet: Ein bestimmtes Gerät bekommt immer dieselbe IP-Adresse vom DHCP-Server.",
              "Das kann über die MAC-Adresse des Geräts gesteuert werden.",
              "Reservierungen sind nützlich für Drucker oder Geräte, die stabil erreichbar sein sollen, ohne komplett manuell konfiguriert zu werden."
            ]
          },
          {
            title: "Typische DHCP-Probleme",
            paragraphs: [
              "Wenn DHCP nicht funktioniert, bekommt ein Client möglicherweise keine passende IP-Adresse.",
              "Typische Ursachen sind: DHCP-Server nicht erreichbar, Scope voll, falsches VLAN, falsche DHCP-Optionen oder Netzwerkkabel/WLAN-Problem.",
              "Manche Systeme vergeben sich dann automatisch eine Ersatzadresse. In Windows sieht man oft Adressen aus dem Bereich 169.254.x.x. Das ist ein Hinweis auf fehlgeschlagene automatische Konfiguration."
            ]
          }
        ],
        realWorldExamples: [
          "Ein Notebook verbindet sich mit dem Firmen-WLAN und erhält automatisch IP-Adresse, Gateway und DNS-Server.",
          "Ein DHCP-Scope ist voll, deshalb bekommen neue Geräte keine Adresse.",
          "Ein Netzwerkdrucker bekommt eine DHCP-Reservierung, damit er immer dieselbe Adresse erhält.",
          "Ein Client hat eine 169.254.x.x-Adresse und erreicht das Netzwerk nicht richtig.",
          "Ein falsch eingetragener DNS-Server per DHCP führt dazu, dass Namen nicht aufgelöst werden."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Client bekommt keine IP-Adresse",
            paragraphs: [
              "Ein Notebook wird mit dem LAN verbunden, erhält aber keine passende IP-Adresse.",
              "Die Ursache kann DHCP, Verbindung, VLAN oder Scope sein."
            ],
            steps: [
              "Prüfen, ob physische Verbindung oder WLAN besteht.",
              "IP-Konfiguration des Clients anzeigen.",
              "Prüfen, ob eine 169.254.x.x-Adresse vorhanden ist.",
              "DHCP-Server-Erreichbarkeit prüfen.",
              "Scope und freie Adressen prüfen.",
              "Nach Korrektur Lease erneuern."
            ]
          },
          {
            title: "Szenario 2: Falscher DNS-Server per DHCP",
            paragraphs: [
              "Clients bekommen eine IP-Adresse und erreichen IP-Ziele, aber Namen funktionieren nicht.",
              "Eine mögliche Ursache ist eine falsche DNS-Server-Option im DHCP."
            ],
            steps: [
              "IP-Adresse und Gateway prüfen.",
              "DNS-Server-Adresse prüfen.",
              "Namensauflösung testen.",
              "DHCP-Option für DNS-Server kontrollieren.",
              "Option korrigieren.",
              "Client erneuern lassen und erneut testen."
            ]
          }
        ],
        diagrams: [
          {
            title: "DHCP-DORA-Prozess",
            code: "sequenceDiagram\n  participant C as DHCP-Client\n  participant S as DHCP-Server\n  C->>S: Discover - Server suchen\n  S->>C: Offer - Konfiguration anbieten\n  C->>S: Request - Angebot anfordern\n  S->>C: Acknowledge - Vergabe bestätigen"
          },
          {
            title: "DHCP verteilt Netzwerkkonfiguration",
            code: "flowchart TD\n  D[DHCP-Server] --> IP[IP-Adresse]\n  D --> MASK[Subnetzmaske]\n  D --> GW[Standardgateway]\n  D --> DNS[DNS-Server]\n  D --> LEASE[Lease-Zeit]\n  IP --> C[Client]\n  MASK --> C\n  GW --> C\n  DNS --> C\n  LEASE --> C"
          }
        ],
        ihkFocus: {
          appears: [
            "Aufgabe von DHCP erklären.",
            "DHCP und DNS unterscheiden.",
            "IP-Adresse, Subnetzmaske, Gateway und DNS-Server als DHCP-Optionen nennen.",
            "Lease erklären.",
            "DORA-Prozess grob beschreiben.",
            "Fehler bei automatischer IP-Konfiguration analysieren.",
            "169.254.x.x-Adresse als Hinweis auf fehlgeschlagene Konfiguration erkennen."
          ],
          commonMistakes: [
            "DHCP mit DNS verwechseln.",
            "DHCP als Dienst zur Namensauflösung beschreiben.",
            "Standardgateway und DNS-Server gleichsetzen.",
            "Lease als permanente Vergabe verstehen.",
            "Bei fehlender IP-Adresse nur DNS prüfen."
          ],
          importantDetails: [
            "DHCP bedeutet Dynamic Host Configuration Protocol.",
            "DHCP vergibt Netzwerkkonfiguration automatisch.",
            "DHCP kann DNS-Server mitteilen, löst aber keine Namen auf.",
            "Lease ist zeitlich begrenzte Vergabe.",
            "DORA beschreibt den grundlegenden Ablauf.",
            "APIPA/169.254.x.x deutet oft auf DHCP-Problem hin."
          ],
          confusedConcepts: [
            "DHCP vs DNS.",
            "Gateway vs DNS-Server.",
            "Lease vs statische IP.",
            "DHCP-Reservierung vs manuelle IP.",
            "Scope vs Subnetz.",
            "Client vs Server."
          ],
          vocabulary: [
            "DHCP = automatische Netzwerkkonfiguration.",
            "Lease = zeitlich begrenzte Adressvergabe.",
            "Scope = Adressbereich.",
            "Standardgateway = Router nach außen.",
            "DORA = Discover, Offer, Request, Acknowledge."
          ]
        },
        commonMistakes: [
          "Zu sagen: DHCP übersetzt Namen. Das macht DNS; DHCP verteilt Konfiguration.",
          "Zu glauben, eine DHCP-Adresse gilt immer für immer. DHCP arbeitet mit Lease-Zeiten.",
          "Gateway und DNS zu verwechseln. Gateway leitet Pakete nach außen, DNS löst Namen auf.",
          "Bei einer 169.254.x.x-Adresse zu denken, alles sei normal. Diese Adresse zeigt oft, dass keine passende DHCP-Konfiguration erhalten wurde.",
          "Statische IP-Adressen und DHCP-Reservierungen gleichzusetzen. Beides kann zu stabilen Adressen führen, funktioniert aber unterschiedlich."
        ],
        vocabulary: [
          {
            de: "DHCP",
            pt: "DHCP",
            explanation: "Protokoll zur automatischen Vergabe von Netzwerkkonfigurationen.",
            example: "DHCP vergibt dem Notebook eine IP-Adresse."
          },
          {
            de: "Dynamic Host Configuration Protocol",
            pt: "protocolo de configuração dinâmica de host",
            explanation: "Langform von DHCP.",
            example: "DHCP bedeutet Dynamic Host Configuration Protocol."
          },
          {
            de: "DHCP-Server",
            pt: "servidor DHCP",
            explanation: "Server, der Netzwerkkonfigurationen an Clients vergibt.",
            example: "Der DHCP-Server vergibt Adressen aus dem Scope."
          },
          {
            de: "DHCP-Client",
            pt: "cliente DHCP",
            explanation: "Gerät, das eine Konfiguration per DHCP anfordert.",
            example: "Das Notebook ist ein DHCP-Client."
          },
          {
            de: "Lease",
            pt: "concessão / tempo de aluguel",
            explanation: "Zeitlich begrenzte Vergabe einer IP-Konfiguration.",
            example: "Der Client erneuert seinen Lease."
          },
          {
            de: "Scope",
            pt: "escopo / faixa de endereços",
            explanation: "Adressbereich, aus dem DHCP Adressen vergeben darf.",
            example: "Der Scope reicht von 192.168.10.100 bis 192.168.10.200."
          },
          {
            de: "Standardgateway",
            pt: "gateway padrão",
            explanation: "Router für Ziele außerhalb des lokalen Netzwerks.",
            example: "DHCP teilt dem Client das Standardgateway mit."
          },
          {
            de: "DNS-Server",
            pt: "servidor DNS",
            explanation: "Server zur Namensauflösung.",
            example: "DHCP kann die Adresse des DNS-Servers verteilen."
          },
          {
            de: "Reservierung",
            pt: "reserva",
            explanation: "Feste Zuordnung einer IP-Adresse zu einem bestimmten Client im DHCP.",
            example: "Der Drucker hat eine DHCP-Reservierung."
          },
          {
            de: "APIPA",
            pt: "endereçamento automático APIPA",
            explanation: "Automatische Ersatzadressierung, häufig im Bereich 169.254.x.x.",
            example: "Eine 169.254.x.x-Adresse kann auf ein DHCP-Problem hinweisen."
          }
        ],
        summary: [
          "DHCP steht für Dynamic Host Configuration Protocol.",
          "DHCP vergibt Netzwerkkonfigurationen automatisch an Clients. Dazu gehören IP-Adresse, Subnetzmaske, Standardgateway, DNS-Server und Lease-Zeit.",
          "Ein DHCP-Server stellt Konfigurationen bereit. Ein DHCP-Client fordert sie an.",
          "Der DORA-Prozess beschreibt den Grundablauf: Discover, Offer, Request, Acknowledge.",
          "DHCP und DNS dürfen nicht verwechselt werden. DHCP verteilt Konfiguration; DNS löst Namen in IP-Adressen auf.",
          "Für AP1 sind typische Fehler wichtig: keine IP-Adresse, falsches Gateway, falscher DNS-Server, voller Scope oder 169.254.x.x-Adresse."
        ],
        mindMap: {
          title: "Mindmap: DHCP",
          code: "mindmap\n  root((DHCP))\n    Aufgabe\n      automatische Konfiguration\n      IP-Adresse vergeben\n      Gateway mitteilen\n      DNS-Server mitteilen\n    Rollen\n      DHCP-Server\n      DHCP-Client\n    Begriffe\n      Lease\n      Scope\n      Reservierung\n      APIPA\n    Ablauf\n      Discover\n      Offer\n      Request\n      Acknowledge\n    AP1 Fokus\n      DHCP vs DNS\n      Fehler analysieren\n      IP-Konfiguration verstehen"
        },
        exercises: {
          easy: [
            {
              question: "Wofür steht DHCP?",
              answer: "DHCP steht für Dynamic Host Configuration Protocol.",
              explanation: "Es dient der automatischen Netzwerkkonfiguration."
            },
            {
              question: "Was ist die Hauptaufgabe von DHCP?",
              answer: "DHCP vergibt Netzwerkkonfigurationen automatisch.",
              explanation: "Zum Beispiel IP-Adresse, Gateway und DNS-Server."
            },
            {
              question: "Nenne zwei Informationen, die DHCP verteilen kann.",
              answer: "IP-Adresse und Standardgateway.",
              explanation: "Auch Subnetzmaske, DNS-Server und Lease-Zeit sind typisch."
            },
            {
              question: "Was ist ein DHCP-Client?",
              answer: "Ein Gerät, das eine Konfiguration per DHCP anfordert.",
              explanation: "Zum Beispiel ein Notebook im WLAN."
            },
            {
              question: "Was ist ein Lease?",
              answer: "Eine zeitlich begrenzte Vergabe einer IP-Konfiguration.",
              explanation: "Der Client kann den Lease erneuern."
            }
          ],
          intermediate: [
            {
              question: "Erkläre den Unterschied zwischen DHCP und DNS.",
              answer: "DHCP vergibt Netzwerkkonfiguration. DNS löst Namen in IP-Adressen auf.",
              explanation: "DHCP kann dem Client sagen, welchen DNS-Server er nutzen soll."
            },
            {
              question: "Was ist ein DHCP-Scope?",
              answer: "Ein Adressbereich, aus dem der DHCP-Server IP-Adressen vergeben darf.",
              explanation: "Der Scope muss zum Netzwerk passen."
            },
            {
              question: "Warum sind DHCP-Reservierungen nützlich?",
              answer: "Ein bestimmtes Gerät kann immer dieselbe IP-Adresse erhalten.",
              explanation: "Das ist zum Beispiel für Drucker praktisch."
            },
            {
              question: "Was bedeutet DORA bei DHCP?",
              answer: "Discover, Offer, Request, Acknowledge.",
              explanation: "Das beschreibt den grundlegenden DHCP-Ablauf."
            },
            {
              question: "Warum kann ein falscher DNS-Server in DHCP Probleme verursachen?",
              answer: "Clients bekommen dann zwar eine IP, können aber Namen nicht korrekt auflösen.",
              explanation: "Die Verbindung per IP kann funktionieren, während Namen scheitern."
            }
          ],
          ap1Style: [
            {
              question: "Ein Client hat eine Adresse aus dem Bereich 169.254.x.x. Was ist eine wahrscheinliche Ursache?",
              answer: "Der Client hat keine passende DHCP-Konfiguration erhalten.",
              explanation: "Solche Adressen können auf fehlgeschlagene automatische Konfiguration hinweisen."
            },
            {
              question: "Ein Azubi sagt: 'DHCP ist für die Übersetzung von Namen zuständig.' Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist falsch.",
              explanation: "DNS ist für Namensauflösung zuständig. DHCP verteilt Netzwerkkonfiguration."
            },
            {
              question: "Ordnen Sie zu: DHCP, DNS, Gateway. Was vergibt Konfiguration, was löst Namen auf, was leitet nach außen?",
              answer: "DHCP vergibt Konfiguration. DNS löst Namen auf. Gateway leitet nach außen.",
              explanation: "Diese drei Begriffe werden häufig verwechselt."
            },
            {
              question: "Neue Geräte in einem WLAN bekommen keine IP-Adresse. Nennen Sie zwei mögliche DHCP-Ursachen.",
              answer: "DHCP-Server nicht erreichbar oder Scope voll.",
              explanation: "Auch falsches VLAN oder falsche DHCP-Konfiguration können Ursachen sein."
            },
            {
              question: "Warum reduziert DHCP Verwaltungsaufwand in großen Netzwerken?",
              answer: "Weil Netzwerkkonfigurationen automatisch verteilt werden.",
              explanation: "Administratoren müssen nicht jedes Gerät manuell konfigurieren."
            }
          ]
        },
        related: {
          previous: "DNS",
          next: "NAT"
        },
        revisionChecklist: [
          "Ich kann erklären, was DHCP ist.",
          "Ich kann nennen, welche Daten DHCP verteilt.",
          "Ich kann DHCP und DNS unterscheiden.",
          "Ich verstehe Lease, Scope und Reservierung.",
          "Ich kann den DORA-Prozess grob erklären.",
          "Ich kann DHCP-Fehler wie 169.254.x.x einordnen.",
          "Ich kann AP1-Fragen zu DHCP beantworten."
        ]
      }
    },
    {
      id: "router",
      title: "Router",
      description: "Ein Router verbindet unterschiedliche Netzwerke miteinander und leitet IP-Pakete anhand von Zieladressen weiter.",
      text: [
        "Ein Router verbindet Netzwerke. Er entscheidet, wohin IP-Pakete weitergeleitet werden müssen.",
        "Für die AP1 musst du Router von Switches unterscheiden und Begriffe wie IP-Adresse, Routing-Tabelle, Gateway, Standardgateway und OSI-Schicht 3 verstehen."
      ],
      ihk: "Wichtig für AP1: Router verbinden unterschiedliche Netzwerke. Sie arbeiten typischerweise auf OSI-Schicht 3 und leiten Pakete anhand von IP-Adressen weiter.",
      summary: "Router conectam redes diferentes e encaminham pacotes IP. Em uma rede local, o roteador costuma ser o gateway para sair para outras redes ou para a internet.",
      example: "Wenn ein PC eine Webseite im Internet öffnet, sendet er Pakete an das Standardgateway. Das ist meistens der Router.",
      exercises: [
        {
          question: "Welche Hauptaufgabe hat ein Router?",
          answer: "Er verbindet unterschiedliche Netzwerke und leitet Pakete weiter."
        }
      ],
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      fullContent: {
        studyTime: "90-110 Minuten",
        difficulty: "Medium",
        importance: {
          stars: "★★★★★",
          explanation: [
            "Router sind für AP1 sehr wichtig, weil sie erklären, wie Daten ein lokales Netzwerk verlassen und andere Netzwerke erreichen.",
            "Die IHK prüft Router oft in Verbindung mit Switch, LAN, WAN, IP-Adressen, Standardgateway, NAT, DHCP und Internetzugang.",
            "Português de apoio: o switch conecta dispositivos dentro da LAN; o router conecta redes diferentes e encaminha pacotes IP."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what a Router is.",
          "After this chapter the student will be able to distinguish Router and Switch.",
          "After this chapter the student will be able to explain what a Standardgateway is.",
          "After this chapter the student will be able to describe routing at AP1 level.",
          "After this chapter the student will be able to connect Router with OSI layer 3 and IP addresses.",
          "After this chapter the student will be able to solve AP1-style questions about routing and gateways."
        ],
        introduction: [
          "Im Kapitel Switch hast du gelernt: Ein Switch verbindet Geräte innerhalb eines lokalen Netzwerks.",
          "Aber was passiert, wenn ein Gerät Daten an ein anderes Netzwerk senden möchte, zum Beispiel ins Internet oder in eine andere Filiale?",
          "Dann braucht man einen Router. Ein Router verbindet unterschiedliche Netzwerke und entscheidet, wohin IP-Pakete weitergeleitet werden.",
          "Für AP1 ist besonders wichtig: Switch und Router haben unterschiedliche Aufgaben."
        ],
        explanation: [
          {
            title: "Was ist ein Router?",
            paragraphs: [
              "Ein Router ist ein Netzwerkgerät, das unterschiedliche Netzwerke miteinander verbindet.",
              "Er leitet Datenpakete anhand von IP-Adressen weiter.",
              "Typische Beispiele sind die Verbindung eines LANs mit dem Internet oder die Verbindung zweier Unternehmensstandorte."
            ]
          },
          {
            title: "Router und IP-Adressen",
            paragraphs: [
              "Router arbeiten typischerweise auf OSI-Schicht 3, der Vermittlungsschicht.",
              "Auf dieser Ebene sind IP-Adressen wichtig.",
              "Der Router schaut auf die Ziel-IP-Adresse eines Pakets und entscheidet, über welchen Weg das Paket weitergeleitet wird."
            ]
          },
          {
            title: "Routing",
            paragraphs: [
              "Routing bedeutet Wegfindung für Datenpakete zwischen Netzwerken.",
              "Der Router muss entscheiden, welcher nächste Schritt sinnvoll ist, damit ein Paket sein Ziel erreichen kann.",
              "Für AP1 reicht die Grundidee: Routing leitet Pakete von einem Netzwerk in ein anderes Netzwerk."
            ]
          },
          {
            title: "Routing-Tabelle",
            paragraphs: [
              "Eine Routing-Tabelle enthält Informationen darüber, welche Netzwerke über welche Wege erreichbar sind.",
              "Der Router nutzt diese Tabelle, um Weiterleitungsentscheidungen zu treffen.",
              "Du musst für AP1 keine komplexen Routing-Tabellen berechnen. Wichtig ist: Router entscheiden nicht zufällig, sondern anhand von Routing-Informationen."
            ]
          },
          {
            title: "Standardgateway",
            paragraphs: [
              "Das Standardgateway ist der Router, an den ein Gerät Pakete sendet, wenn das Ziel nicht im eigenen lokalen Netzwerk liegt.",
              "Ein PC im LAN nutzt das Standardgateway zum Beispiel, um Internetziele zu erreichen.",
              "Wenn das Standardgateway falsch konfiguriert ist, kann der PC vielleicht lokale Geräte erreichen, aber nicht das Internet."
            ]
          },
          {
            title: "Router vs Switch",
            paragraphs: [
              "Ein Switch verbindet Geräte innerhalb eines LANs und arbeitet typischerweise mit MAC-Adressen.",
              "Ein Router verbindet unterschiedliche Netzwerke und arbeitet typischerweise mit IP-Adressen.",
              "Merksatz für AP1: Switch im lokalen Netzwerk, Router zwischen Netzwerken."
            ]
          },
          {
            title: "Router im Heimnetz und im Unternehmen",
            paragraphs: [
              "Zu Hause ist ein Router oft ein Kombigerät. Es kann Router, Switch, WLAN-Access-Point, DHCP-Server, NAT und Firewall-Funktionen verbinden.",
              "In Unternehmen sind diese Funktionen häufig auf mehrere Geräte oder Systeme verteilt.",
              "Für AP1 ist wichtig, Rollen sauber zu unterscheiden, auch wenn ein physisches Gerät mehrere Rollen übernehmen kann."
            ]
          },
          {
            title: "NAT kurz eingeordnet",
            paragraphs: [
              "NAT bedeutet Network Address Translation. Es übersetzt private interne IP-Adressen in öffentliche Adressen und zurück.",
              "Viele Router nutzen NAT, damit mehrere Geräte im LAN über eine öffentliche IP-Adresse ins Internet gehen können.",
              "NAT wird später genauer behandelt. Hier reicht: Router können NAT als zusätzliche Funktion übernehmen."
            ]
          },
          {
            title: "Router und WAN",
            paragraphs: [
              "Router sind wichtig für WAN-Verbindungen, weil sie lokale Netzwerke mit entfernten Netzwerken verbinden.",
              "Ein Router kann eine Filiale mit der Zentrale, ein LAN mit dem Internet oder ein Netzwerk mit einem Rechenzentrum verbinden.",
              "Damit ist der Router ein zentrales Gerät für Kommunikation außerhalb des lokalen Netzwerks."
            ]
          },
          {
            title: "Typische Router-Probleme",
            paragraphs: [
              "Typische Probleme sind falsches Standardgateway, Providerstörung, falsche Route, NAT-Problem, Firewall-Regel oder defekter Router.",
              "Wenn lokale Kommunikation funktioniert, aber Internet oder andere Netzwerke nicht erreichbar sind, ist der Router oder die Gateway-Konfiguration ein wichtiger Prüfpunkt.",
              "AP1-Aufgaben beschreiben oft genau solche Situationen."
            ]
          }
        ],
        realWorldExamples: [
          "Ein Büro-LAN nutzt einen Router als Gateway zum Internet.",
          "Eine Filiale ist über einen Router mit der Zentrale verbunden.",
          "Ein Heimrouter übernimmt gleichzeitig Routing, WLAN, NAT, DHCP und einfache Firewall-Funktionen.",
          "Ein PC erreicht den lokalen Drucker, aber nicht das Internet, weil das Standardgateway falsch ist.",
          "Ein Unternehmen nutzt Router, um verschiedene Netzbereiche voneinander zu trennen und gezielt zu verbinden."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Lokales LAN funktioniert, Internet nicht",
            paragraphs: [
              "Ein PC kann den lokalen Datei-Server erreichen, aber keine Webseiten öffnen.",
              "Das deutet darauf hin, dass das LAN grundsätzlich funktioniert, aber Gateway, Router, DNS oder Internetverbindung geprüft werden müssen."
            ],
            steps: [
              "Lokale Verbindung zu einem Gerät im LAN testen.",
              "IP-Adresse und Subnetz prüfen.",
              "Standardgateway prüfen.",
              "Router erreichbar testen.",
              "Internetverbindung oder Providerstatus prüfen.",
              "DNS prüfen, wenn IP-Ziele funktionieren, Namen aber nicht."
            ]
          },
          {
            title: "Szenario 2: Falsches Standardgateway",
            paragraphs: [
              "Ein Notebook bekommt eine IP-Adresse, aber das Standardgateway ist falsch eingetragen.",
              "Das Notebook kann möglicherweise lokale Geräte erreichen, aber keine entfernten Netzwerke."
            ],
            steps: [
              "IP-Konfiguration anzeigen.",
              "Standardgateway mit Soll-Konfiguration vergleichen.",
              "Korrekte Gateway-Adresse eintragen oder DHCP prüfen.",
              "Router per IP-Adresse testen.",
              "Verbindung zu externem Ziel testen.",
              "Fehler dokumentieren."
            ]
          }
        ],
        diagrams: [
          {
            title: "Router verbindet Netzwerke",
            code: "flowchart LR\n  LAN1[LAN Büro] --> R[Router]\n  R --> INET[Internet]\n  R --> LAN2[LAN Filiale]\n  LAN1 --> PC[Client]\n  LAN2 --> SRV[Server Filiale]"
          },
          {
            title: "PC nutzt Standardgateway",
            code: "flowchart TD\n  PC[PC im LAN] --> Z{Ziel im eigenen Netz?}\n  Z -->|Ja| SW[Über Switch direkt im LAN]\n  Z -->|Nein| GW[Standardgateway / Router]\n  GW --> NET[Anderes Netzwerk oder Internet]"
          }
        ],
        ihkFocus: {
          appears: [
            "Aufgabe eines Routers erklären.",
            "Router von Switch unterscheiden.",
            "Standardgateway erklären.",
            "Routing als Weiterleitung zwischen Netzwerken beschreiben.",
            "Router als typisches Schicht-3-Gerät einordnen.",
            "Internet- oder Filialverbindungsprobleme analysieren.",
            "NAT, DHCP und Firewall als mögliche Zusatzfunktionen eines Routers grob einordnen."
          ],
          commonMistakes: [
            "Router und Switch gleichsetzen.",
            "Router nur als WLAN-Gerät beschreiben.",
            "Standardgateway mit DNS-Server verwechseln.",
            "MAC-Adressen als Hauptentscheidung eines Routers nennen.",
            "Nicht unterscheiden, ob lokales LAN oder Verbindung zu anderen Netzwerken gestört ist."
          ],
          importantDetails: [
            "Router verbinden Netzwerke.",
            "Router arbeiten typischerweise auf OSI-Schicht 3.",
            "Router nutzen IP-Adressen.",
            "Das Standardgateway ist meist der Router für Ziele außerhalb des eigenen Netzes.",
            "Routing-Tabellen helfen bei Weiterleitungsentscheidungen.",
            "Heimrouter kombinieren oft mehrere Funktionen."
          ],
          confusedConcepts: [
            "Router vs Switch.",
            "Gateway vs DNS.",
            "IP-Adresse vs MAC-Adresse.",
            "Routing vs Switching.",
            "Router vs Access Point.",
            "NAT vs Routing."
          ],
          vocabulary: [
            "Router = verbindet Netzwerke.",
            "Routing = Weiterleitung zwischen Netzwerken.",
            "Standardgateway = Router für Ziele außerhalb des eigenen Netzes.",
            "Routing-Tabelle = Informationen über erreichbare Netze.",
            "Schicht 3 = Vermittlungsschicht."
          ]
        },
        commonMistakes: [
          "Zu sagen: Ein Router verbindet nur Geräte im selben LAN. Das ist die typische Aufgabe eines Switches.",
          "Router nur als WLAN-Gerät zu verstehen. WLAN kann im Heimrouter integriert sein, ist aber eine andere Funktion.",
          "Standardgateway und DNS-Server zu verwechseln. Das Gateway leitet Pakete weiter; DNS löst Namen auf.",
          "Zu glauben, ein Router arbeitet hauptsächlich mit MAC-Adressen wie ein Switch. Router entscheiden auf Basis von IP-Adressen.",
          "Bei Internetproblemen nur den Browser zu prüfen. Gateway, Router, DNS und Provider können beteiligt sein."
        ],
        vocabulary: [
          {
            de: "Router",
            pt: "roteador",
            explanation: "Netzwerkgerät, das unterschiedliche Netzwerke verbindet.",
            example: "Der Router verbindet das LAN mit dem Internet."
          },
          {
            de: "Routing",
            pt: "roteamento",
            explanation: "Weiterleitung von Paketen zwischen Netzwerken.",
            example: "Routing bestimmt den Weg zum Zielnetz."
          },
          {
            de: "Routing-Tabelle",
            pt: "tabela de roteamento",
            explanation: "Tabelle mit Informationen über erreichbare Netzwerke und Wege.",
            example: "Der Router nutzt seine Routing-Tabelle."
          },
          {
            de: "Standardgateway",
            pt: "gateway padrão",
            explanation: "Router, an den ein Gerät Pakete für entfernte Netzwerke sendet.",
            example: "Das Standardgateway ist meistens der Router im LAN."
          },
          {
            de: "Gateway",
            pt: "gateway",
            explanation: "Übergangspunkt zu einem anderen Netzwerk.",
            example: "Der Router dient als Gateway zum Internet."
          },
          {
            de: "Paket",
            pt: "pacote",
            explanation: "Dateneinheit auf Netzwerkebene.",
            example: "Der Router leitet IP-Pakete weiter."
          },
          {
            de: "IP-Adresse",
            pt: "endereço IP",
            explanation: "Logische Adresse eines Geräts in einem IP-Netzwerk.",
            example: "Der Router entscheidet anhand der Ziel-IP-Adresse."
          },
          {
            de: "Schicht 3",
            pt: "camada 3",
            explanation: "Vermittlungsschicht im OSI-Modell.",
            example: "Router arbeiten typischerweise auf Schicht 3."
          },
          {
            de: "NAT",
            pt: "NAT",
            explanation: "Übersetzung von Netzwerkadressen.",
            example: "Viele Router nutzen NAT für den Internetzugang."
          },
          {
            de: "Provider",
            pt: "provedor",
            explanation: "Anbieter für Netzwerk- oder Internetverbindungen.",
            example: "Der Router ist mit dem Provider verbunden."
          }
        ],
        summary: [
          "Ein Router verbindet unterschiedliche Netzwerke miteinander.",
          "Er arbeitet typischerweise auf OSI-Schicht 3 und nutzt IP-Adressen, um Pakete weiterzuleiten.",
          "Routing bedeutet, den Weg von Paketen zwischen Netzwerken zu bestimmen. Router nutzen dafür Routing-Informationen oder Routing-Tabellen.",
          "Das Standardgateway ist der Router, an den ein Gerät Pakete für Ziele außerhalb des eigenen lokalen Netzwerks sendet.",
          "Ein Switch verbindet lokale Geräte im LAN; ein Router verbindet Netzwerke. Diese Unterscheidung ist für AP1 besonders wichtig.",
          "Heimrouter kombinieren oft mehrere Funktionen wie Routing, NAT, DHCP, Firewall und WLAN. In Unternehmen sind diese Rollen häufig getrennt."
        ],
        mindMap: {
          title: "Mindmap: Router",
          code: "mindmap\n  root((Router))\n    Aufgabe\n      Netzwerke verbinden\n      IP-Pakete weiterleiten\n      Gateway bereitstellen\n    Grundlage\n      IP-Adresse\n      Routing\n      Routing-Tabelle\n      Schicht 3\n    Vergleich\n      Switch\n      Access Point\n      DNS\n    Zusatzfunktionen\n      NAT\n      DHCP\n      Firewall\n      VPN\n    AP1 Fokus\n      Standardgateway erklären\n      Fehler eingrenzen\n      LAN vs Internet"
        },
        exercises: {
          easy: [
            {
              question: "Was macht ein Router?",
              answer: "Ein Router verbindet unterschiedliche Netzwerke und leitet Pakete weiter.",
              explanation: "Zum Beispiel verbindet er ein LAN mit dem Internet."
            },
            {
              question: "Auf welcher OSI-Schicht arbeitet ein Router typischerweise?",
              answer: "Auf Schicht 3.",
              explanation: "Schicht 3 ist die Vermittlungsschicht."
            },
            {
              question: "Welche Adresse nutzt ein Router typischerweise für Weiterleitungsentscheidungen?",
              answer: "Die IP-Adresse.",
              explanation: "Router leiten Pakete anhand von Ziel-IP-Adressen weiter."
            },
            {
              question: "Was ist ein Standardgateway?",
              answer: "Der Router, an den ein Gerät Pakete für entfernte Netzwerke sendet.",
              explanation: "Es wird genutzt, wenn das Ziel nicht im eigenen lokalen Netz liegt."
            },
            {
              question: "Was verbindet ein Switch im Unterschied zum Router?",
              answer: "Ein Switch verbindet Geräte innerhalb eines LANs.",
              explanation: "Ein Router verbindet unterschiedliche Netzwerke."
            }
          ],
          intermediate: [
            {
              question: "Warum braucht ein PC ein Standardgateway für Internetzugriff?",
              answer: "Weil Internetziele außerhalb des lokalen Netzwerks liegen.",
              explanation: "Der PC sendet solche Pakete an den Router als Gateway."
            },
            {
              question: "Was enthält eine Routing-Tabelle auf Grundniveau?",
              answer: "Informationen darüber, welche Netzwerke über welche Wege erreichbar sind.",
              explanation: "Der Router nutzt diese Informationen für Weiterleitungsentscheidungen."
            },
            {
              question: "Warum ist ein Router nicht dasselbe wie ein Access Point?",
              answer: "Ein Router verbindet Netzwerke. Ein Access Point stellt drahtlosen Zugang bereit.",
              explanation: "In Heimgeräten können beide Funktionen kombiniert sein."
            },
            {
              question: "Warum kann lokaler Zugriff funktionieren, obwohl Internet nicht funktioniert?",
              answer: "Das LAN kann funktionieren, während Gateway, Router, DNS oder Provider gestört sind.",
              explanation: "Lokale Kommunikation und externe Kommunikation müssen getrennt betrachtet werden."
            },
            {
              question: "Warum sind Router in WAN-Szenarien wichtig?",
              answer: "Weil sie lokale Netzwerke mit entfernten Netzwerken verbinden.",
              explanation: "Zum Beispiel Zentrale, Filiale, Internet oder Rechenzentrum."
            }
          ],
          ap1Style: [
            {
              question: "Ein PC kann den lokalen Drucker erreichen, aber keine Webseiten im Internet öffnen. Nennen Sie zwei mögliche Ursachen.",
              answer: "Falsches Standardgateway oder Router-/Providerproblem.",
              explanation: "Da lokale Kommunikation funktioniert, liegt das Problem wahrscheinlich außerhalb der reinen LAN-Verbindung."
            },
            {
              question: "Ein Azubi sagt: 'Der Router verbindet nur PCs im gleichen LAN.' Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist falsch.",
              explanation: "Das ist die typische Aufgabe eines Switches. Der Router verbindet unterschiedliche Netzwerke."
            },
            {
              question: "Ordnen Sie zu: Switch, Router, Standardgateway. Was verbindet lokale Geräte, was verbindet Netzwerke, was ist der Weg nach außen?",
              answer: "Switch = verbindet lokale Geräte. Router = verbindet Netzwerke. Standardgateway = Weg zu entfernten Netzwerken.",
              explanation: "Diese Unterscheidung ist AP1-Grundwissen."
            },
            {
              question: "Welche Information betrachtet ein Router hauptsächlich, wenn er ein Paket weiterleitet?",
              answer: "Die Ziel-IP-Adresse.",
              explanation: "Router arbeiten typischerweise auf Schicht 3 und nutzen IP-Informationen."
            },
            {
              question: "Ein Heimrouter stellt WLAN, DHCP, NAT und Internetzugang bereit. Warum muss man trotzdem die Rollen unterscheiden?",
              answer: "Weil ein physisches Gerät mehrere Funktionen kombinieren kann.",
              explanation: "Für AP1 müssen die Funktionen fachlich getrennt verstanden werden."
            }
          ]
        },
        related: {
          previous: "Switch",
          next: "Firewall"
        },
        revisionChecklist: [
          "Ich kann erklären, was ein Router ist.",
          "Ich kann Router und Switch unterscheiden.",
          "Ich verstehe Standardgateway und Gateway.",
          "Ich kann Routing auf AP1-Niveau erklären.",
          "Ich weiß, dass Router typischerweise auf Schicht 3 arbeiten.",
          "Ich kann einfache Router- und Gateway-Probleme eingrenzen.",
          "Ich kann AP1-Fragen zu Routern beantworten."
        ]
      }
    },
    {
      id: "switch",
      title: "Switch",
      description: "Ein Switch verbindet Geräte innerhalb eines lokalen Netzwerks und leitet Daten anhand von MAC-Adressen an passende Ports weiter.",
      text: [
        "Ein Switch ist ein zentrales Netzwerkgerät in vielen LANs. Er verbindet PCs, Server, Drucker und Access Points innerhalb eines lokalen Netzwerks.",
        "Für die AP1 musst du verstehen, dass ein Switch meistens auf OSI-Schicht 2 arbeitet und MAC-Adressen nutzt, um Frames an den richtigen Port weiterzuleiten."
      ],
      ihk: "Wichtig für AP1: Switch = verbindet Geräte im LAN. Er arbeitet typischerweise auf Schicht 2, nutzt MAC-Adressen und leitet Frames gezielt an Ports weiter.",
      summary: "Switch conecta dispositivos em uma LAN e encaminha quadros usando endereços MAC. Ele é diferente de roteador e de hub.",
      example: "In einem Büro sind PCs, Server und ein Netzwerkdrucker mit einem Switch verbunden.",
      exercises: [
        {
          question: "Welche Adresse nutzt ein Switch typischerweise zur Weiterleitung?",
          answer: "Die MAC-Adresse."
        }
      ],
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      fullContent: {
        studyTime: "90-110 Minuten",
        difficulty: "Medium",
        importance: {
          stars: "★★★★★",
          explanation: [
            "Switches sind für AP1 sehr wichtig, weil sie zentrale Geräte in lokalen Netzwerken sind. Fast jedes LAN-Szenario enthält indirekt oder direkt einen Switch.",
            "Die IHK prüft häufig den Unterschied zwischen Switch, Router und Hub sowie die Begriffe MAC-Adresse, Port, Frame und OSI-Schicht 2.",
            "Português de apoio: o switch conecta dispositivos dentro da rede local e aprende em qual porta está cada endereço MAC."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what a Switch is.",
          "After this chapter the student will be able to describe how a Switch uses MAC addresses.",
          "After this chapter the student will be able to distinguish Switch, Router and Hub.",
          "After this chapter the student will be able to explain Port and MAC table at AP1 level.",
          "After this chapter the student will be able to connect Switches with LAN and OSI layer 2.",
          "After this chapter the student will be able to solve AP1-style questions about switches."
        ],
        introduction: [
          "In einem LAN müssen viele Geräte miteinander verbunden werden: PCs, Notebooks, Server, Drucker, Access Points und manchmal weitere Switches.",
          "Das zentrale Gerät dafür ist häufig der Switch.",
          "Ein Switch sorgt dafür, dass Daten im lokalen Netzwerk nicht einfach blind an alle Geräte verteilt werden, sondern gezielter an den passenden Anschluss weitergeleitet werden.",
          "Für AP1 ist besonders wichtig: Ein Switch arbeitet typischerweise mit MAC-Adressen und gehört in das Thema lokales Netzwerk."
        ],
        explanation: [
          {
            title: "Was ist ein Switch?",
            paragraphs: [
              "Ein Switch ist ein Netzwerkgerät, das mehrere Geräte innerhalb eines lokalen Netzwerks verbindet.",
              "Jedes angeschlossene Gerät steckt an einem Port des Switches.",
              "Der Switch empfängt Daten und entscheidet, an welchen Port er sie weiterleitet."
            ]
          },
          {
            title: "Switch im LAN",
            paragraphs: [
              "Switches sind typische Geräte in kabelgebundenen LANs.",
              "Ein Büro kann zum Beispiel mehrere PCs und Drucker an einem Switch betreiben.",
              "Der Switch ist dabei nicht automatisch der Zugang zum Internet. Dafür ist normalerweise ein Router zuständig."
            ]
          },
          {
            title: "MAC-Adresse",
            paragraphs: [
              "Eine MAC-Adresse ist eine Hardwareadresse einer Netzwerkschnittstelle.",
              "Switches nutzen MAC-Adressen, um Geräte im lokalen Netzwerk zu unterscheiden.",
              "Für AP1 reicht: MAC-Adressen sind wichtig für die lokale Weiterleitung auf Schicht 2."
            ]
          },
          {
            title: "Frames",
            paragraphs: [
              "Auf Schicht 2 spricht man oft von Frames.",
              "Ein Frame enthält unter anderem Quell-MAC-Adresse und Ziel-MAC-Adresse.",
              "Der Switch liest diese Informationen und entscheidet, wohin der Frame weitergeleitet wird."
            ]
          },
          {
            title: "MAC-Tabelle",
            paragraphs: [
              "Ein Switch lernt, welche MAC-Adresse an welchem Port erreichbar ist.",
              "Diese Zuordnung speichert er in einer MAC-Tabelle.",
              "Wenn ein Frame an eine bekannte Ziel-MAC-Adresse geht, kann der Switch ihn gezielt an den passenden Port senden."
            ],
            steps: [
              "1. Gerät sendet einen Frame.",
              "2. Switch merkt sich die Quell-MAC-Adresse und den Eingangsport.",
              "3. Switch prüft die Ziel-MAC-Adresse.",
              "4. Ist das Ziel bekannt, leitet er gezielt weiter.",
              "5. Ist das Ziel unbekannt, kann er den Frame an mehrere Ports weitergeben."
            ]
          },
          {
            title: "Switch vs Hub",
            paragraphs: [
              "Ein Hub ist ein älteres, einfaches Gerät. Er sendet empfangene Daten an alle angeschlossenen Geräte weiter.",
              "Ein Switch arbeitet intelligenter. Er lernt MAC-Adressen und kann Daten gezielter weiterleiten.",
              "Deshalb reduzieren Switches unnötigen Verkehr im Vergleich zu Hubs."
            ]
          },
          {
            title: "Switch vs Router",
            paragraphs: [
              "Ein Switch verbindet Geräte innerhalb eines lokalen Netzwerks.",
              "Ein Router verbindet unterschiedliche Netzwerke miteinander, zum Beispiel ein LAN mit dem Internet.",
              "Für AP1 ist diese Unterscheidung zentral: Switch im LAN, Router zwischen Netzwerken."
            ]
          },
          {
            title: "Ports am Switch",
            paragraphs: [
              "Ein Port ist ein physischer Anschluss am Switch.",
              "An einem Port kann ein PC, Server, Drucker, Access Point oder ein weiterer Switch angeschlossen sein.",
              "Bei Fehlersuche prüft man oft, ob der richtige Port verbunden ist und ob die Link-LED leuchtet."
            ]
          },
          {
            title: "VLAN kurz erklärt",
            paragraphs: [
              "VLAN bedeutet Virtual LAN. Damit kann ein physischer Switch logisch in mehrere getrennte Netzwerke aufgeteilt werden.",
              "Zum Beispiel können Mitarbeitergeräte und Gäste getrennt werden, obwohl sie über dieselbe Switch-Infrastruktur laufen.",
              "Für AP1 reicht die Grundidee: VLANs trennen Netzbereiche logisch und können Sicherheit und Organisation verbessern."
            ]
          },
          {
            title: "Typische Switch-Probleme",
            paragraphs: [
              "Typische Probleme sind defekte Kabel, falscher Port, deaktivierter Port, falsche VLAN-Zuordnung oder ein ausgefallener Switch.",
              "Wenn nur ein Arbeitsplatz betroffen ist, prüft man zuerst Kabel, Netzwerkdose, Switch-Port und Netzwerkkarte.",
              "Wenn viele Geräte betroffen sind, kann ein zentraler Switch oder Uplink betroffen sein."
            ]
          }
        ],
        realWorldExamples: [
          "Ein Büro-Switch verbindet zwanzig Arbeitsplatz-PCs mit dem lokalen Netzwerk.",
          "Ein Netzwerkdrucker hängt an einem Switch-Port und ist für Mitarbeiter erreichbar.",
          "Ein Access Point ist per Kabel mit einem Switch verbunden und stellt WLAN bereit.",
          "Ein Serverraum nutzt mehrere Switches, um Server, Firewalls und Router zu verbinden.",
          "Ein Gastnetz wird über ein VLAN vom internen Mitarbeiternetz getrennt."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Ein PC hat keine LAN-Verbindung",
            paragraphs: [
              "Ein einzelner PC erreicht das Netzwerk nicht. Andere PCs im Büro funktionieren.",
              "Die Ursache liegt wahrscheinlich beim PC, Kabel, Netzwerkdose oder Switch-Port."
            ],
            steps: [
              "Prüfen, ob das Netzwerkkabel steckt.",
              "Prüfen, ob die Link-LED am PC oder Switch leuchtet.",
              "Anderes Patchkabel testen.",
              "Anderen Switch-Port testen.",
              "IP-Konfiguration prüfen.",
              "Wenn nötig Port-Konfiguration oder VLAN prüfen."
            ]
          },
          {
            title: "Szenario 2: Viele Geräte sind gleichzeitig offline",
            paragraphs: [
              "Mehrere PCs an derselben Etage verlieren gleichzeitig die Verbindung.",
              "Das kann auf einen Switch, Uplink oder eine Stromversorgung hindeuten."
            ],
            steps: [
              "Prüfen, ob alle betroffenen Geräte am selben Switch hängen.",
              "Stromversorgung des Switches prüfen.",
              "Uplink zum restlichen Netzwerk prüfen.",
              "Status-LEDs prüfen.",
              "Andere Etagen oder Bereiche vergleichen.",
              "Störung dokumentieren und eskalieren."
            ]
          }
        ],
        diagrams: [
          {
            title: "Switch verbindet Geräte im LAN",
            code: "flowchart TD\n  PC1[PC 1] --> SW[Switch]\n  PC2[PC 2] --> SW\n  PR[Drucker] --> SW\n  AP[Access Point] --> SW\n  SRV[Server] --> SW\n  SW --> R[Router]"
          },
          {
            title: "MAC-Tabelle vereinfacht",
            code: "flowchart LR\n  A[PC A MAC AA] --> P1[Switch Port 1]\n  B[PC B MAC BB] --> P2[Switch Port 2]\n  P1 --> T[MAC-Tabelle: AA -> Port 1, BB -> Port 2]\n  T --> P2"
          }
        ],
        ihkFocus: {
          appears: [
            "Aufgabe eines Switches im LAN erklären.",
            "MAC-Adresse und MAC-Tabelle auf Grundniveau beschreiben.",
            "Switch von Router und Hub unterscheiden.",
            "Switch als typisches Schicht-2-Gerät einordnen.",
            "Ports und Link-LEDs bei Fehlersuche berücksichtigen.",
            "VLAN-Grundidee verstehen."
          ],
          commonMistakes: [
            "Switch und Router gleichsetzen.",
            "MAC-Adresse und IP-Adresse verwechseln.",
            "Switch als Internetzugang beschreiben.",
            "Hub und Switch nicht unterscheiden.",
            "VLAN zu tief erklären oder als eigenes Kabel verstehen."
          ],
          importantDetails: [
            "Switches verbinden Geräte im LAN.",
            "Switches arbeiten typischerweise auf OSI-Schicht 2.",
            "Switches nutzen MAC-Adressen.",
            "Eine MAC-Tabelle ordnet MAC-Adressen Ports zu.",
            "Router verbinden Netzwerke, Switches Geräte im lokalen Netzwerk.",
            "VLANs trennen Netzbereiche logisch."
          ],
          confusedConcepts: [
            "Switch vs Router.",
            "Switch vs Hub.",
            "MAC-Adresse vs IP-Adresse.",
            "Port am Switch vs TCP/UDP-Port.",
            "VLAN vs WLAN."
          ],
          vocabulary: [
            "Switch = verbindet Geräte im LAN.",
            "MAC-Adresse = Hardwareadresse einer Netzwerkschnittstelle.",
            "Frame = Datenpaket auf Schicht 2.",
            "Port = physischer Anschluss am Switch.",
            "MAC-Tabelle = Zuordnung von MAC-Adressen zu Ports."
          ]
        },
        commonMistakes: [
          "Zu sagen: Der Switch verbindet das LAN mit dem Internet. Das ist normalerweise die Aufgabe eines Routers.",
          "MAC-Adresse und IP-Adresse gleichzusetzen. MAC-Adressen sind für lokale Schicht-2-Kommunikation wichtig; IP-Adressen für logische Netzwerkadressierung.",
          "Port am Switch mit TCP- oder UDP-Port zu verwechseln. Ein Switch-Port ist ein physischer Anschluss.",
          "Einen Switch wie einen Hub zu beschreiben. Ein Switch leitet gezielter weiter und lernt MAC-Adressen.",
          "VLAN als Funknetz zu verstehen. VLAN ist eine logische Trennung in Netzwerken, nicht WLAN."
        ],
        vocabulary: [
          {
            de: "Switch",
            pt: "switch",
            explanation: "Netzwerkgerät, das Geräte innerhalb eines LANs verbindet.",
            example: "Der Switch verbindet PCs, Server und Drucker."
          },
          {
            de: "MAC-Adresse",
            pt: "endereço MAC",
            explanation: "Hardwareadresse einer Netzwerkschnittstelle.",
            example: "Der Switch lernt die MAC-Adresse eines PCs."
          },
          {
            de: "Frame",
            pt: "quadro",
            explanation: "Datenrahmen auf OSI-Schicht 2.",
            example: "Ein Switch leitet Frames weiter."
          },
          {
            de: "Port",
            pt: "porta física",
            explanation: "Physischer Anschluss an einem Switch.",
            example: "Der PC steckt an Port 5 des Switches."
          },
          {
            de: "MAC-Tabelle",
            pt: "tabela MAC",
            explanation: "Tabelle, die MAC-Adressen den Switch-Ports zuordnet.",
            example: "Die MAC-Tabelle zeigt, welche Adresse an welchem Port erreichbar ist."
          },
          {
            de: "Schicht 2",
            pt: "camada 2",
            explanation: "Sicherungsschicht im OSI-Modell.",
            example: "Ein Switch arbeitet typischerweise auf Schicht 2."
          },
          {
            de: "Hub",
            pt: "hub",
            explanation: "Älteres Gerät, das Daten an alle Ports weitergibt.",
            example: "Ein Hub ist weniger intelligent als ein Switch."
          },
          {
            de: "Uplink",
            pt: "uplink",
            explanation: "Verbindung von einem Switch zu einem anderen Netzwerkgerät oder höheren Netzbereich.",
            example: "Der Uplink verbindet den Etagen-Switch mit dem Hauptswitch."
          },
          {
            de: "VLAN",
            pt: "VLAN",
            explanation: "Logisch getrenntes Netzwerk auf gemeinsamer Infrastruktur.",
            example: "Ein VLAN trennt Gäste vom internen Netz."
          },
          {
            de: "Link-LED",
            pt: "LED de link",
            explanation: "Anzeige für eine physische Netzwerkverbindung.",
            example: "Die Link-LED am Switch-Port leuchtet."
          }
        ],
        summary: [
          "Ein Switch verbindet Geräte innerhalb eines lokalen Netzwerks.",
          "Er arbeitet typischerweise auf OSI-Schicht 2 und nutzt MAC-Adressen, um Frames gezielt weiterzuleiten.",
          "Der Switch lernt, welche MAC-Adresse an welchem Port erreichbar ist, und speichert diese Information in einer MAC-Tabelle.",
          "Ein Switch ist nicht dasselbe wie ein Router. Der Switch verbindet lokale Geräte; der Router verbindet unterschiedliche Netzwerke.",
          "Ein Switch ist auch nicht dasselbe wie ein Hub. Ein Hub sendet Daten an alle Ports, ein Switch kann gezielter weiterleiten.",
          "Für AP1 musst du Switch, MAC-Adresse, Port, Frame, MAC-Tabelle, Router-Abgrenzung und einfache Fehlersuche sicher erklären können."
        ],
        mindMap: {
          title: "Mindmap: Switch",
          code: "mindmap\n  root((Switch))\n    Aufgabe\n      Geräte im LAN verbinden\n      Frames weiterleiten\n      Ports nutzen\n    Grundlage\n      MAC-Adresse\n      MAC-Tabelle\n      OSI Schicht 2\n    Vergleich\n      Router\n      Hub\n      Access Point\n    Praxis\n      Link-LED\n      Kabel prüfen\n      Uplink\n      VLAN\n    AP1 Fokus\n      Begriffe unterscheiden\n      Fehler analysieren\n      Szenarien erklären"
        },
        exercises: {
          easy: [
            {
              question: "Was macht ein Switch?",
              answer: "Ein Switch verbindet Geräte innerhalb eines lokalen Netzwerks.",
              explanation: "Zum Beispiel PCs, Server und Drucker in einem LAN."
            },
            {
              question: "Welche Adresse nutzt ein Switch typischerweise?",
              answer: "Die MAC-Adresse.",
              explanation: "Switches nutzen MAC-Adressen zur lokalen Weiterleitung."
            },
            {
              question: "Was ist ein Switch-Port?",
              answer: "Ein physischer Anschluss am Switch.",
              explanation: "Dort wird zum Beispiel ein PC oder Server angeschlossen."
            },
            {
              question: "Auf welcher OSI-Schicht arbeitet ein Switch typischerweise?",
              answer: "Auf Schicht 2.",
              explanation: "Schicht 2 ist die Sicherungsschicht."
            },
            {
              question: "Was verbindet ein Router im Unterschied zum Switch?",
              answer: "Ein Router verbindet unterschiedliche Netzwerke.",
              explanation: "Ein Switch verbindet Geräte im lokalen Netzwerk."
            }
          ],
          intermediate: [
            {
              question: "Was speichert eine MAC-Tabelle?",
              answer: "Sie ordnet MAC-Adressen den Switch-Ports zu.",
              explanation: "Dadurch kann ein Switch Frames gezielter weiterleiten."
            },
            {
              question: "Warum ist ein Switch besser als ein alter Hub?",
              answer: "Ein Switch leitet Daten gezielter weiter, während ein Hub Daten an alle Ports sendet.",
              explanation: "Dadurch entsteht weniger unnötiger Verkehr."
            },
            {
              question: "Warum ist ein Switch nicht automatisch der Internetzugang?",
              answer: "Der Switch verbindet lokale Geräte. Für die Verbindung zu anderen Netzwerken ist ein Router zuständig.",
              explanation: "Switch und Router haben unterschiedliche Rollen."
            },
            {
              question: "Was ist ein VLAN auf Grundniveau?",
              answer: "Ein logisch getrenntes Netzwerk auf gemeinsamer Infrastruktur.",
              explanation: "VLANs können Netzbereiche wie Gäste und Mitarbeiter trennen."
            },
            {
              question: "Welche einfachen Dinge prüfst du, wenn ein PC am Switch keine Verbindung hat?",
              answer: "Kabel, Link-LED, Switch-Port, Netzwerkadapter und IP-Konfiguration.",
              explanation: "Fehlersuche beginnt bei einfachen physischen und lokalen Ursachen."
            }
          ],
          ap1Style: [
            {
              question: "Ein PC ist per Kabel angeschlossen, hat aber keine Netzwerkverbindung. Nennen Sie zwei Prüfungen am Switch oder Anschluss.",
              answer: "Link-LED prüfen und anderen Switch-Port oder anderes Kabel testen.",
              explanation: "Damit kann man physische Verbindungsprobleme eingrenzen."
            },
            {
              question: "Ein Azubi sagt: 'Ein Switch und ein Router sind dasselbe.' Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist falsch.",
              explanation: "Ein Switch verbindet Geräte im LAN. Ein Router verbindet unterschiedliche Netzwerke."
            },
            {
              question: "Welche Information nutzt ein Switch, um Frames im LAN gezielt weiterzuleiten?",
              answer: "MAC-Adressen und die MAC-Tabelle.",
              explanation: "Die MAC-Tabelle ordnet bekannte MAC-Adressen den Ports zu."
            },
            {
              question: "Ordnen Sie zu: Switch-Port, TCP-Port, MAC-Adresse. Was ist physischer Anschluss, was gehört zu Transportdiensten, was ist Hardwareadresse?",
              answer: "Switch-Port = physischer Anschluss. TCP-Port = Dienstadressierung auf Transportebene. MAC-Adresse = Hardwareadresse.",
              explanation: "Diese Begriffe werden häufig verwechselt."
            },
            {
              question: "Ein Unternehmen möchte Gäste logisch vom internen Netzwerk trennen, aber dieselbe Switch-Infrastruktur nutzen. Welches Konzept passt?",
              answer: "VLAN.",
              explanation: "VLANs ermöglichen logische Trennung auf gemeinsamer Infrastruktur."
            }
          ]
        },
        related: {
          previous: "WLAN",
          next: "Router"
        },
        revisionChecklist: [
          "Ich kann erklären, was ein Switch ist.",
          "Ich kann MAC-Adresse und MAC-Tabelle beschreiben.",
          "Ich kann Switch, Router und Hub unterscheiden.",
          "Ich verstehe Ports am Switch.",
          "Ich kann VLAN auf AP1-Grundniveau erklären.",
          "Ich kann einfache Switch-Probleme eingrenzen.",
          "Ich kann AP1-Fragen zu Switches beantworten."
        ]
      }
    },
    {
      id: "firewall",
      title: "Firewall",
      description: "Eine Firewall kontrolliert Netzwerkverkehr anhand von Regeln und hilft, Systeme und Netzwerke vor unerwünschtem Zugriff zu schützen.",
      text: [
        "Eine Firewall prüft Netzwerkverkehr und entscheidet anhand von Regeln, ob Verbindungen erlaubt oder blockiert werden.",
        "Für die AP1 musst du Firewall-Regeln, Ports, Protokolle, eingehenden und ausgehenden Verkehr sowie typische Sicherheitsziele verstehen."
      ],
      ihk: "Wichtig für AP1: Firewalls filtern Verkehr nach Regeln. Wichtige Begriffe sind Quelle, Ziel, Port, Protokoll, inbound, outbound, allow, deny und Regelreihenfolge.",
      summary: "Firewall controla tráfego de rede com regras. Ela pode permitir, bloquear ou registrar conexões para reduzir riscos.",
      example: "Eine Firewall-Regel kann HTTPS auf Port 443 erlauben und externe Zugriffe auf eine Administrationsschnittstelle blockieren.",
      exercises: [
        {
          question: "Was macht eine Firewall?",
          answer: "Sie kontrolliert Netzwerkverkehr anhand von Regeln."
        }
      ],
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      fullContent: {
        studyTime: "90-110 Minuten",
        difficulty: "Medium",
        importance: {
          stars: "★★★★★",
          explanation: [
            "Firewalls sind für AP1 sehr wichtig, weil sie zu den grundlegenden Sicherheitsmaßnahmen in Netzwerken gehören.",
            "Die IHK prüft häufig praktische Regeln: Welche Verbindung soll erlaubt werden? Welche Ports sind betroffen? Handelt es sich um eingehenden oder ausgehenden Verkehr?",
            "Português de apoio: firewall é um filtro de tráfego. Ela não substitui segurança completa, mas controla conexões permitidas e bloqueadas."
          ]
        },
        objectives: [
          "After this chapter the student will be able to explain what a Firewall is.",
          "After this chapter the student will be able to describe firewall rules at AP1 level.",
          "After this chapter the student will be able to distinguish inbound and outbound traffic.",
          "After this chapter the student will be able to explain ports and protocols in firewall scenarios.",
          "After this chapter the student will be able to distinguish Firewall and antivirus.",
          "After this chapter the student will be able to solve AP1-style questions about firewall rules."
        ],
        introduction: [
          "Netzwerke verbinden Systeme. Das ist nützlich, aber es schafft auch Risiken.",
          "Nicht jede Verbindung soll erlaubt sein. Ein Webserver soll vielleicht HTTPS-Anfragen erhalten, aber keine externen Verwaltungszugriffe.",
          "Eine Firewall hilft, Netzwerkverkehr nach Regeln zu kontrollieren.",
          "Für AP1 ist wichtig: Eine Firewall ist kein magischer Komplettschutz. Sie ist ein Regelwerk und ein Kontrollpunkt für Netzwerkverkehr."
        ],
        explanation: [
          {
            title: "Was ist eine Firewall?",
            paragraphs: [
              "Eine Firewall ist ein Sicherheitsmechanismus, der Netzwerkverkehr kontrolliert.",
              "Sie prüft Verbindungen anhand von Regeln und entscheidet, ob Verkehr erlaubt, blockiert oder protokolliert wird.",
              "Firewalls können als Hardware, Software oder Kombination aus beidem vorkommen."
            ]
          },
          {
            title: "Warum braucht man Firewalls?",
            paragraphs: [
              "Ohne Firewall könnten Systeme unnötig viele Verbindungen akzeptieren.",
              "Eine Firewall reduziert die Angriffsfläche, indem sie nur benötigte Kommunikation erlaubt.",
              "Sie unterstützt Sicherheitsziele wie Vertraulichkeit, Integrität und Verfügbarkeit."
            ]
          },
          {
            title: "Firewall-Regeln",
            paragraphs: [
              "Firewall-Regeln beschreiben, welcher Verkehr erlaubt oder blockiert wird.",
              "Eine Regel kann Quelle, Ziel, Port, Protokoll, Richtung und Aktion enthalten.",
              "Beispiel: Erlaube eingehendes TCP auf Port 443 zum Webserver."
            ]
          },
          {
            title: "Quelle und Ziel",
            paragraphs: [
              "Quelle bedeutet: Von wo kommt der Verkehr?",
              "Ziel bedeutet: Wohin soll der Verkehr gehen?",
              "Eine gute Firewall-Regel ist möglichst konkret. Sie erlaubt nicht mehr als nötig."
            ]
          },
          {
            title: "Ports und Protokolle",
            paragraphs: [
              "Ports helfen, Dienste auf einem System zu unterscheiden.",
              "Protokolle wie TCP oder UDP beschreiben, wie Daten transportiert werden.",
              "Beispiele: HTTPS nutzt typischerweise TCP-Port 443, DNS nutzt häufig UDP-Port 53."
            ]
          },
          {
            title: "Inbound und Outbound",
            paragraphs: [
              "Inbound bedeutet eingehender Verkehr, also Verkehr von außen zu einem System oder Netzwerk.",
              "Outbound bedeutet ausgehender Verkehr, also Verkehr von innen nach außen.",
              "Für AP1 ist diese Richtung wichtig, weil Regeln je nach Richtung unterschiedlich wirken."
            ]
          },
          {
            title: "Allow und Deny",
            paragraphs: [
              "Allow bedeutet erlauben. Deny bedeutet verweigern oder blockieren.",
              "Viele Sicherheitskonzepte folgen der Idee: Standardmäßig blockieren, nur notwendige Verbindungen erlauben.",
              "Dieses Prinzip passt zum Gedanken der minimalen Rechte."
            ]
          },
          {
            title: "Regelreihenfolge",
            paragraphs: [
              "Bei vielen Firewalls ist die Reihenfolge der Regeln wichtig.",
              "Regeln werden von oben nach unten geprüft. Die erste passende Regel kann entscheiden.",
              "Eine zu allgemeine Regel an falscher Stelle kann eine speziellere Regel unwirksam machen."
            ]
          },
          {
            title: "Stateful Firewall",
            paragraphs: [
              "Eine stateful Firewall merkt sich den Zustand von Verbindungen.",
              "Wenn ein interner Client eine Verbindung nach außen startet, kann die Antwort dazu wieder hereingelassen werden.",
              "Für AP1 reicht: Stateful bedeutet, dass die Firewall den Zusammenhang von Verbindungen berücksichtigt."
            ]
          },
          {
            title: "Firewall vs Antivirus",
            paragraphs: [
              "Eine Firewall kontrolliert Netzwerkverkehr.",
              "Ein Antivirus untersucht Dateien, Programme oder Prozesse auf Schadsoftware.",
              "Beides sind Sicherheitsmaßnahmen, aber sie haben unterschiedliche Aufgaben."
            ]
          },
          {
            title: "Typische Firewall-Probleme",
            paragraphs: [
              "Wenn ein Dienst nicht erreichbar ist, kann eine Firewall-Regel die Ursache sein.",
              "Typische Fehler sind falscher Port, falsches Protokoll, falsche Richtung, falsche Quelle oder Regel an falscher Position.",
              "Bei Fehlersuche prüft man: Ist der Dienst aktiv? Stimmt die Adresse? Stimmt der Port? Blockiert die Firewall?"
            ]
          }
        ],
        realWorldExamples: [
          "Eine Firewall erlaubt HTTPS-Zugriff auf einen Webserver, blockiert aber SSH aus dem Internet.",
          "Ein Unternehmen erlaubt ausgehenden Webverkehr, blockiert aber unsichere oder unnötige Ports.",
          "Eine lokale Windows-Firewall blockiert eingehende Verbindungen zu einem Entwicklungsserver.",
          "Eine Firewall trennt Gäste-WLAN vom internen Unternehmensnetz.",
          "Ein falsch gesetztes Firewall-Regelwerk verhindert, dass Clients einen Datenbankserver erreichen."
        ],
        practicalExamples: [
          {
            title: "Szenario 1: Webserver soll erreichbar sein",
            paragraphs: [
              "Ein interner Webserver soll per HTTPS erreichbar sein, aber keine anderen externen Dienste anbieten.",
              "Die Firewall-Regel muss gezielt HTTPS erlauben und unnötige Zugriffe blockieren."
            ],
            steps: [
              "Zielsystem bestimmen: Webserver.",
              "Dienst bestimmen: HTTPS.",
              "Port bestimmen: TCP 443.",
              "Richtung bestimmen: eingehend.",
              "Quelle möglichst einschränken, wenn möglich.",
              "Regel testen und protokollieren."
            ]
          },
          {
            title: "Szenario 2: Anwendung funktioniert nach Firewall-Änderung nicht",
            paragraphs: [
              "Nach einer neuen Firewall-Regel kann eine Anwendung nicht mehr mit dem Server kommunizieren.",
              "Die Ursache kann falscher Port, falsches Protokoll oder falsche Regelreihenfolge sein."
            ],
            steps: [
              "Fehlermeldung und betroffenen Dienst prüfen.",
              "Benötigten Port und Protokoll ermitteln.",
              "Firewall-Regeln für Quelle und Ziel prüfen.",
              "Regelreihenfolge prüfen.",
              "Logs auswerten, wenn verfügbar.",
              "Regel gezielt korrigieren und erneut testen."
            ]
          }
        ],
        diagrams: [
          {
            title: "Firewall als Kontrollpunkt",
            code: "flowchart LR\n  INET[Internet] --> FW[Firewall]\n  FW --> LAN[Internes Netzwerk]\n  LAN --> SRV[Server]\n  FW -->|erlaubt TCP 443| SRV\n  FW -->|blockiert Admin-Port| X[Zugriff verweigert]"
          },
          {
            title: "Firewall-Regel vereinfacht",
            code: "flowchart TD\n  R[Regel] --> Q[Quelle]\n  R --> Z[Ziel]\n  R --> P[Port]\n  R --> PR[Protokoll]\n  R --> D[Richtung]\n  R --> A[Aktion: Allow oder Deny]"
          }
        ],
        ihkFocus: {
          appears: [
            "Aufgabe einer Firewall erklären.",
            "Firewall-Regeln mit Quelle, Ziel, Port und Protokoll verstehen.",
            "Inbound und outbound unterscheiden.",
            "Allow und deny anwenden.",
            "Firewall von Antivirus unterscheiden.",
            "Typische blockierte Verbindungen analysieren.",
            "Regelreihenfolge als Fehlerquelle erkennen."
          ],
          commonMistakes: [
            "Firewall als vollständigen Schutz gegen alle Angriffe beschreiben.",
            "Firewall und Antivirus gleichsetzen.",
            "Port und Protokoll vergessen.",
            "Inbound und outbound verwechseln.",
            "Zu breite Regeln wie 'alles erlauben' als sicher ansehen."
          ],
          importantDetails: [
            "Firewalls kontrollieren Netzwerkverkehr.",
            "Regeln sollten möglichst konkret sein.",
            "Ports identifizieren Dienste.",
            "TCP und UDP müssen unterschieden werden.",
            "Regelreihenfolge kann wichtig sein.",
            "Default deny ist oft sicherer als alles offen zu lassen."
          ],
          confusedConcepts: [
            "Firewall vs Antivirus.",
            "Port vs IP-Adresse.",
            "Inbound vs outbound.",
            "Allow vs deny.",
            "TCP vs UDP.",
            "Firewall-Regel vs Benutzerberechtigung."
          ],
          vocabulary: [
            "Firewall = kontrolliert Netzwerkverkehr.",
            "Regel = Bedingung plus Aktion.",
            "Inbound = eingehender Verkehr.",
            "Outbound = ausgehender Verkehr.",
            "Port = Dienstnummer auf einem System."
          ]
        },
        commonMistakes: [
          "Zu sagen: Eine Firewall verhindert alle Sicherheitsprobleme. Sie ist wichtig, aber nur ein Teil eines Sicherheitskonzepts.",
          "Firewall und Antivirus zu verwechseln. Die Firewall filtert Netzwerkverkehr; Antivirus sucht Schadsoftware.",
          "Nur den Port zu nennen und das Protokoll zu vergessen. TCP 443 und UDP 443 sind technisch nicht dasselbe.",
          "Inbound und outbound zu vertauschen. Die Richtung entscheidet, wann eine Regel greift.",
          "Zu allgemeine Regeln zu erstellen. 'Any to any allow' ist bequem, aber meist unsicher."
        ],
        vocabulary: [
          {
            de: "Firewall",
            pt: "firewall",
            explanation: "Sicherheitsmechanismus zur Kontrolle von Netzwerkverkehr.",
            example: "Die Firewall blockiert unerlaubte Verbindungen."
          },
          {
            de: "Firewall-Regel",
            pt: "regra de firewall",
            explanation: "Regel, die beschreibt, welcher Verkehr erlaubt oder blockiert wird.",
            example: "Die Firewall-Regel erlaubt TCP 443 zum Webserver."
          },
          {
            de: "Quelle",
            pt: "origem",
            explanation: "Ausgangspunkt des Netzwerkverkehrs.",
            example: "Die Quelle ist das externe Netzwerk."
          },
          {
            de: "Ziel",
            pt: "destino",
            explanation: "Empfänger des Netzwerkverkehrs.",
            example: "Das Ziel ist der interne Webserver."
          },
          {
            de: "Port",
            pt: "porta",
            explanation: "Nummer zur Unterscheidung von Diensten auf einem System.",
            example: "HTTPS nutzt typischerweise Port 443."
          },
          {
            de: "Protokoll",
            pt: "protocolo",
            explanation: "Regelwerk für Kommunikation, zum Beispiel TCP oder UDP.",
            example: "Die Regel erlaubt TCP."
          },
          {
            de: "Inbound",
            pt: "entrada",
            explanation: "Eingehender Netzwerkverkehr.",
            example: "Inbound-Verkehr kommt von außen zum Server."
          },
          {
            de: "Outbound",
            pt: "saída",
            explanation: "Ausgehender Netzwerkverkehr.",
            example: "Outbound-Verkehr geht vom Client ins Internet."
          },
          {
            de: "Allow",
            pt: "permitir",
            explanation: "Aktion, die Verkehr erlaubt.",
            example: "Allow TCP 443 erlaubt HTTPS."
          },
          {
            de: "Deny",
            pt: "bloquear",
            explanation: "Aktion, die Verkehr blockiert.",
            example: "Deny blockiert die Verbindung."
          }
        ],
        summary: [
          "Eine Firewall kontrolliert Netzwerkverkehr anhand von Regeln.",
          "Firewall-Regeln können Quelle, Ziel, Port, Protokoll, Richtung und Aktion enthalten.",
          "Inbound bedeutet eingehender Verkehr, outbound bedeutet ausgehender Verkehr. Allow erlaubt Verkehr, deny blockiert ihn.",
          "Ports helfen, Dienste zu identifizieren. Protokolle wie TCP oder UDP müssen in Regeln beachtet werden.",
          "Firewalls reduzieren Risiken, ersetzen aber keine vollständige Sicherheitsstrategie. Sie sind nicht dasselbe wie Antivirus.",
          "Für AP1 musst du einfache Firewall-Szenarien lesen, Regeln verstehen und typische Fehler wie falsche Richtung, falschen Port oder falsches Protokoll erkennen können."
        ],
        mindMap: {
          title: "Mindmap: Firewall",
          code: "mindmap\n  root((Firewall))\n    Aufgabe\n      Verkehr kontrollieren\n      erlauben\n      blockieren\n      protokollieren\n    Regeln\n      Quelle\n      Ziel\n      Port\n      Protokoll\n      Richtung\n      Aktion\n    Richtungen\n      Inbound\n      Outbound\n    Sicherheit\n      Default deny\n      minimale Freigaben\n      Angriffsfläche reduzieren\n    AP1 Fokus\n      Regeln verstehen\n      Fehler analysieren\n      Antivirus abgrenzen"
        },
        exercises: {
          easy: [
            {
              question: "Was macht eine Firewall?",
              answer: "Sie kontrolliert Netzwerkverkehr anhand von Regeln.",
              explanation: "Sie kann Verkehr erlauben, blockieren oder protokollieren."
            },
            {
              question: "Was bedeutet inbound?",
              answer: "Eingehender Netzwerkverkehr.",
              explanation: "Zum Beispiel Verkehr von außen zu einem Server."
            },
            {
              question: "Was bedeutet outbound?",
              answer: "Ausgehender Netzwerkverkehr.",
              explanation: "Zum Beispiel Verkehr von einem Client ins Internet."
            },
            {
              question: "Was bedeutet allow in einer Firewall-Regel?",
              answer: "Der Verkehr wird erlaubt.",
              explanation: "Allow ist die Aktion zum Zulassen."
            },
            {
              question: "Was bedeutet deny?",
              answer: "Der Verkehr wird blockiert.",
              explanation: "Deny verweigert die Verbindung."
            }
          ],
          intermediate: [
            {
              question: "Welche Angaben kann eine Firewall-Regel enthalten?",
              answer: "Quelle, Ziel, Port, Protokoll, Richtung und Aktion.",
              explanation: "Diese Angaben bestimmen, wann eine Regel passt."
            },
            {
              question: "Warum ist eine konkrete Firewall-Regel sicherer als eine sehr breite Regel?",
              answer: "Sie erlaubt nur den benötigten Verkehr und reduziert die Angriffsfläche.",
              explanation: "Das entspricht dem Prinzip der minimalen Freigaben."
            },
            {
              question: "Warum ist TCP 443 nicht dasselbe wie UDP 443?",
              answer: "TCP und UDP sind unterschiedliche Transportprotokolle.",
              explanation: "Firewall-Regeln müssen Port und Protokoll berücksichtigen."
            },
            {
              question: "Was ist der Unterschied zwischen Firewall und Antivirus?",
              answer: "Eine Firewall filtert Netzwerkverkehr. Antivirus untersucht Dateien oder Programme auf Schadsoftware.",
              explanation: "Beide sind Sicherheitsmaßnahmen, aber mit unterschiedlichen Aufgaben."
            },
            {
              question: "Warum kann die Regelreihenfolge wichtig sein?",
              answer: "Weil viele Firewalls Regeln von oben nach unten prüfen.",
              explanation: "Eine frühere breite Regel kann spätere spezielle Regeln beeinflussen."
            }
          ],
          ap1Style: [
            {
              question: "Ein Webserver soll aus dem Internet per HTTPS erreichbar sein. Welche Port-/Protokoll-Kombination ist typisch?",
              answer: "TCP Port 443.",
              explanation: "HTTPS nutzt typischerweise TCP 443."
            },
            {
              question: "Ein Azubi sagt: 'Eine Firewall ersetzt Antivirus vollständig.' Beurteilen Sie diese Aussage.",
              answer: "Die Aussage ist falsch.",
              explanation: "Eine Firewall kontrolliert Netzwerkverkehr. Antivirus hat eine andere Aufgabe und prüft Schadsoftware."
            },
            {
              question: "Eine Anwendung funktioniert nach einer Firewall-Änderung nicht mehr. Nennen Sie drei Dinge, die geprüft werden sollten.",
              answer: "Port, Protokoll und Richtung der Regel.",
              explanation: "Auch Quelle, Ziel und Regelreihenfolge können wichtig sein."
            },
            {
              question: "Ordnen Sie zu: Inbound, Outbound, Deny. Was bedeutet eingehend, ausgehend, blockieren?",
              answer: "Inbound = eingehend. Outbound = ausgehend. Deny = blockieren.",
              explanation: "Diese Begriffe sind Grundlage für Firewall-Regeln."
            },
            {
              question: "Warum ist eine Regel 'allow any any' in einem Unternehmen problematisch?",
              answer: "Sie erlaubt zu viel Verkehr und erhöht die Angriffsfläche.",
              explanation: "Firewall-Regeln sollten möglichst nur notwendige Kommunikation erlauben."
            }
          ]
        },
        related: {
          previous: "Router",
          next: "DNS"
        },
        revisionChecklist: [
          "Ich kann erklären, was eine Firewall ist.",
          "Ich kann Quelle, Ziel, Port, Protokoll, Richtung und Aktion erklären.",
          "Ich kann inbound und outbound unterscheiden.",
          "Ich kann allow und deny unterscheiden.",
          "Ich kann Firewall und Antivirus abgrenzen.",
          "Ich kann einfache Firewall-Probleme analysieren.",
          "Ich kann AP1-Fragen zu Firewalls beantworten."
        ]
      }
    },
    {
      id: "raid",
      title: "RAID",
      description: "Combinações de discos para desempenho ou tolerância a falhas.",
      text: [
        "RAID combina múltiplos discos para melhorar desempenho, disponibilidade ou ambos. Níveis comuns incluem RAID 0, RAID 1, RAID 5 e RAID 10.",
        "RAID não substitui backup. Ele ajuda contra falha de disco, mas não protege contra exclusão acidental, ransomware ou incêndio."
      ],
      ihk: "RAID ist kein Backup. RAID 0 melhora desempenho, RAID 1 espelha dados, RAID 5 usa paridade.",
      summary: "RAID aumenta desempenho ou tolerância a falhas, mas backup continua obrigatório.",
      example: "RAID 1 grava os mesmos dados em dois discos; se um falhar, o outro ainda possui os dados.",
      exercises: [
        {
          question: "Por que RAID não é backup?",
          answer: "Porque não protege contra exclusão acidental, corrupção lógica, malware ou perda do sistema inteiro."
        }
      ]
    },
    {
      id: "backup",
      title: "Backup",
      description: "Cópias de segurança e recuperação de dados.",
      text: [
        "Backup é uma cópia de dados criada para recuperação em caso de perda. Estratégias comuns incluem backup completo, incremental e diferencial.",
        "Também é importante testar a restauração. Backup que nunca foi testado pode falhar justamente quando for necessário."
      ],
      ihk: "Conheça Vollbackup, inkrementelles Backup, differentielles Backup e a regra 3-2-1.",
      summary: "Backup protege contra perda de dados e precisa ser planejado, automatizado e testado.",
      example: "Na regra 3-2-1, mantenha três cópias, em dois tipos de mídia, com uma cópia fora do local principal.",
      exercises: [
        {
          question: "Qual é a diferença entre backup incremental e diferencial?",
          answer: "Incremental copia mudanças desde o último backup. Diferencial copia mudanças desde o último backup completo."
        }
      ]
    },
    {
      id: "seguranca",
      title: "Segurança",
      description: "Princípios básicos de proteção da informação.",
      text: [
        "Segurança da informação busca proteger confidencialidade, integridade e disponibilidade. Esses três princípios são frequentemente chamados de CIA triad.",
        "Medidas comuns incluem senhas fortes, atualização, menor privilégio, backup, criptografia, firewall e treinamento de usuários."
      ],
      ihk: "Termos centrais: Vertraulichkeit, Integrität, Verfügbarkeit, Authentifizierung e Autorisierung.",
      summary: "Segurança reduz riscos por meio de controles técnicos, organizacionais e humanos.",
      example: "Autenticação confirma quem é o usuário. Autorização define o que esse usuário pode acessar.",
      exercises: [
        {
          question: "Explique autenticação e autorização.",
          answer: "Autenticação verifica identidade. Autorização verifica permissões."
        }
      ]
    },
    {
      id: "banco-de-dados",
      title: "Banco de Dados",
      description: "Armazenamento estruturado e organização de dados.",
      text: [
        "Bancos de dados armazenam dados de forma organizada. Em bancos relacionais, informações ficam em tabelas com linhas, colunas, chaves e relacionamentos.",
        "Para desenvolvimento, é essencial entender chave primária, chave estrangeira, normalização básica e consultas."
      ],
      ihk: "Atenção a Primärschlüssel, Fremdschlüssel, Tabelle, Datensatz, Attribut e Beziehung.",
      summary: "Banco de dados organiza informações para consulta, manutenção e integridade.",
      example: "Uma tabela Kunden pode ter KundenID como chave primária. Uma tabela Bestellungen pode referenciar KundenID como chave estrangeira.",
      exercises: [
        {
          question: "Para que serve uma chave estrangeira?",
          answer: "Para criar relação entre tabelas e referenciar a chave primária de outra tabela."
        }
      ]
    },
    {
      id: "sql",
      title: "SQL",
      description: "Linguagem para consultar e manipular bancos relacionais.",
      text: [
        "SQL é usada para consultar, inserir, atualizar e apagar dados em bancos relacionais. Comandos importantes incluem SELECT, INSERT, UPDATE e DELETE.",
        "Filtros com WHERE, ordenação com ORDER BY e junções com JOIN aparecem com frequência em contextos práticos."
      ],
      ihk: "SELECT liest Daten. WHERE filtert. JOIN verbindet Tabellen. UPDATE e DELETE precisam de cuidado com condições.",
      summary: "SQL permite trabalhar com dados estruturados em tabelas relacionais.",
      example: "SELECT name FROM kunden WHERE stadt = 'Berlin'; retorna nomes de clientes da cidade Berlin.",
      exercises: [
        {
          question: "Para que serve o WHERE?",
          answer: "Para filtrar registros conforme uma condição."
        }
      ]
    },
    {
      id: "programacao",
      title: "Programação",
      description: "Lógica, estruturas e leitura de código.",
      text: [
        "Programação transforma problemas em instruções executáveis. Conceitos básicos incluem variáveis, tipos, condições, loops, funções e estruturas de dados.",
        "Na AP1, muitas questões pedem leitura de pseudocódigo, identificação de erros simples ou compreensão de fluxo."
      ],
      ihk: "Treine Schleifen, Bedingungen, Variablen, Datentypen, Funktionen e einfache Algorithmen.",
      summary: "Programar é modelar uma solução em passos claros, testáveis e compreensíveis.",
      example: "Um loop pode percorrer uma lista de notas e calcular a média somando valores e dividindo pela quantidade.",
      exercises: [
        {
          question: "Quando usar uma condição if?",
          answer: "Quando o programa precisa escolher caminhos diferentes conforme uma expressão verdadeira ou falsa."
        }
      ]
    },
    {
      id: "uml",
      title: "UML",
      description: "Diagramas para visualizar sistemas e processos.",
      text: [
        "UML é uma linguagem de modelagem visual usada para representar sistemas. Diagramas comuns incluem caso de uso, classe, sequência e atividade.",
        "Para a AP1, foque em ler diagramas e entender relações básicas, como associação, herança e multiplicidade."
      ],
      ihk: "Em Klassendiagramme, observe Klassen, Attribute, Methoden, Vererbung e Multiplizitäten.",
      summary: "UML ajuda a comunicar estrutura e comportamento de sistemas antes ou durante a implementação.",
      example: "Em um diagrama de classes, uma classe Kunde pode ter atributos name e email, além de métodos como registrieren().",
      exercises: [
        {
          question: "Para que serve um diagrama de classes?",
          answer: "Para representar classes, atributos, métodos e relacionamentos entre classes."
        }
      ]
    },
    {
      id: "glossario-capitulo",
      title: "Glossário",
      description: "Como usar termos alemães durante a preparação.",
      text: [
        "O vocabulário técnico em alemão é parte do estudo. Muitas vezes você conhece o conceito, mas perde tempo porque o termo do enunciado parece novo.",
        "Revise o glossário aos poucos e conecte cada palavra a exemplos reais de TI."
      ],
      ihk: "Não traduza palavra por palavra sem contexto. Em provas, Bedeutung im technischen Kontext é essencial.",
      summary: "Glossário acelera leitura, reduz ansiedade e melhora interpretação das questões.",
      example: "Sicherung pode significar proteção ou cópia de segurança dependendo do contexto. Datensicherung normalmente indica backup.",
      exercises: [
        {
          question: "Por que estudar termos alemães técnicos?",
          answer: "Porque a compreensão do enunciado é decisiva para escolher a resposta correta."
        }
      ]
    }
  ],
  glossary: [
    { word: "Ausbildung", translation: "formação profissional", explanation: "Modelo alemão de formação que combina escola profissional e prática em empresa." },
    { word: "Betriebssystem", translation: "sistema operacional", explanation: "Software que gerencia hardware, arquivos, processos e usuários." },
    { word: "Arbeitsspeicher", translation: "memória RAM", explanation: "Memória temporária usada por programas em execução." },
    { word: "Festplatte", translation: "disco rígido", explanation: "Dispositivo de armazenamento persistente; pode ser HDD ou usado genericamente para storage." },
    { word: "Netzwerk", translation: "rede", explanation: "Conjunto de dispositivos conectados para troca de dados." },
    { word: "Protokoll", translation: "protocolo", explanation: "Regras que definem como sistemas se comunicam." },
    { word: "IP-Adresse", translation: "endereço IP", explanation: "Identificador lógico de um dispositivo em uma rede IP." },
    { word: "Subnetzmaske", translation: "máscara de sub-rede", explanation: "Define qual parte do endereço IP representa a rede e qual representa o host." },
    { word: "Gateway", translation: "gateway", explanation: "Ponto de saída usado para alcançar outras redes." },
    { word: "Router", translation: "roteador", explanation: "Equipamento que encaminha pacotes entre redes diferentes." },
    { word: "Switch", translation: "switch", explanation: "Equipamento que conecta dispositivos em uma rede local usando endereços MAC." },
    { word: "Firewall", translation: "firewall", explanation: "Sistema que controla tráfego de rede com base em regras." },
    { word: "Datensicherung", translation: "backup", explanation: "Cópia de segurança criada para restaurar dados em caso de perda." },
    { word: "Verfügbarkeit", translation: "disponibilidade", explanation: "Garantia de que sistemas e dados estejam acessíveis quando necessários." },
    { word: "Vertraulichkeit", translation: "confidencialidade", explanation: "Proteção contra acesso não autorizado a informações." },
    { word: "Integrität", translation: "integridade", explanation: "Garantia de que dados não foram alterados indevidamente." },
    { word: "Primärschlüssel", translation: "chave primária", explanation: "Campo que identifica unicamente um registro em uma tabela." },
    { word: "Fremdschlüssel", translation: "chave estrangeira", explanation: "Campo que cria uma relação com a chave primária de outra tabela." },
    { word: "Abfrage", translation: "consulta", explanation: "Pedido de dados a um banco de dados, normalmente usando SQL." },
    { word: "Schleife", translation: "loop", explanation: "Estrutura que repete instruções enquanto uma condição for atendida." }
  ]
};

window.AZUBIFORGE_DATA = AZUBIFORGE_DATA;

function buildGuidedFullContent(title, description, focus, summary, example, terms = [], options = {}) {
  const studyTime = options.studyTime || "45-60 Minuten";
  const difficulty = options.difficulty || "Medium";
  const baseTerms = terms.length ? terms : title.split(/[\s\-–]+/).filter((part) => part.length > 2).slice(0, 6);
  const vocabulary = baseTerms.map((term, index) => ({
    de: term,
    pt: `Conceito ${index + 1}: ${term}`,
    explanation: `Fachbegriff aus ${title}. ${focus}`,
    example: example || `Im Betrieb: ${term} wird im Kontext von ${title} verwendet.`
  }));

  while (vocabulary.length < 5) {
    vocabulary.push({
      de: `${title} — Kernbegriff ${vocabulary.length + 1}`,
      pt: `Ideia central de ${title}`,
      explanation: summary,
      example
    });
  }

  const mkEx = (question, answer, explanation = summary) => ({ question, answer, explanation });

  return {
    studyTime,
    difficulty,
    importance: {
      stars: "★★★☆☆",
      explanation: [description, summary, `Portuguese support: ${summary}`]
    },
    objectives: [
      `Erklaeren Sie ${title} in eigenen Worten.`,
      `Nennen Sie die wichtigsten Fachbegriffe zu ${title}.`,
      `Beschreiben Sie eine berufliche Situation mit ${title}.`,
      `Beantworten Sie AP1-nahe Fragen zu ${title}.`
    ],
    introduction: [
      description,
      summary,
      `${title} gehoert zur AP1 FIAE. Lerne zuerst die Idee, dann die Fachwoerter und danach die Anwendung im Betrieb.`
    ],
    explanation: [
      { title: `Grundidee: ${title}`, paragraphs: [description, summary] },
      { title: "Berufliche Anwendung", paragraphs: [example, focus] },
      { title: "AP1-Fokus", paragraphs: [focus, "Antworte knapp, nenne Fachbegriffe und begruende mit einem Beispiel aus dem Betrieb."] }
    ],
    realWorldExamples: [
      example,
      `Support-Ticket bei JIKU: Ein Kunde beschreibt ein Problem rund um ${title}. Du musst die naechste Pruefung waehlen und begruenden.`
    ],
    practicalExamples: [{
      title: `Stoerfall: ${title} bei JIKU IT-Solutions`,
      paragraphs: [
        `Kundenmeldung: ${example}`,
        `Dein Teamlead fragt: Was pruefst du zuerst zu ${title} — und warum?`,
        description
      ],
      steps: [
        "Auftrag und Symptom klaeren.",
        `Hypothese zu ${title} bilden.`,
        "Einen konkreten Pruefschritt ausfuehren.",
        "Massnahme kurz begruenden und dokumentieren."
      ]
    }],
    ihkFocus: focus,
    commonMistakes: [
      `Nur die Definition von ${title} nennen, ohne Entscheidung.`,
      "Antwort ohne Bezug zur Kunden-/Betriebssituation.",
      "Fachbegriffe verwechseln oder weglassen."
    ],
    vocabulary: vocabulary.slice(0, 10),
    summary: [summary, focus, description],
    mindMap: `${title} → Begriffe → Entscheidung → AP1-Check`,
    exercises: {
      easy: [
        mkEx(`Was ist ${title} in einem Satz?`, summary),
        mkEx(`Welches Symptom kann auf ein Problem mit ${title} hinweisen?`, example),
        mkEx(`Nennen Sie ein Fachwort zu ${title} und erklaeren Sie es kurz.`, baseTerms[0] ? `${baseTerms[0]}: ${summary}` : summary)
      ],
      intermediate: [
        mkEx(`Kunde meldet: ${example} Welche Pruefung machen Sie zuerst zu ${title}?`, `Zuerst Auftrag klaeren, dann ${title} gezielt pruefen und begruenden.`),
        mkEx(`Wann hilft ${title} — und wann nicht? Nennen Sie je ein Beispiel.`, example),
        mkEx(`Schreiben Sie eine kurze Antwort an den Kunden zu ${title} (2 Saetze).`, summary)
      ],
      ap1Style: [
        mkEx(`AP1 — Situation: ${example} Beurteilen Sie die naechste Massnahme zu ${title}.`, `Massnahme waehlen, mit Fachbegriff begruenden, Bezug zur Situation herstellen.`),
        mkEx(`AP1: Ein Azubi verwechselt Begriffe zu ${title}. Korrigieren Sie und begruenden Sie.`, summary),
        mkEx(`AP1 — Signalwort erklaeren: Erklaeren Sie ${title} mit einem Betriebsbeispiel.`, `${summary} Beispiel: ${example}`)
      ]
    },
    related: baseTerms.slice(0, 4),
    revisionChecklist: [
      `Ich kann ${title} in eigenen Worten erklaeren.`,
      "Ich kann in einem Fall eine Entscheidung begruenden.",
      "Ich kenne die wichtigsten Fachbegriffe.",
      "Ich habe mindestens eine Uebung mit eigener Antwort gemacht.",
      "Ich habe die angewandte Aufgabe schriftlich geloest."
    ]
  };
}

function createAp1Chapter(id, title, description, ihk, summary, example) {
  const fullContent = buildGuidedFullContent(title, description, ihk, summary, example, [], {
    studyTime: "50-65 Minuten",
    difficulty: "Medium"
  });

  return {
    id,
    title,
    description,
    text: [
      `${title} é um tópico central da AP1 FIAE. Estude a ideia, fixe os termos em alemão e treine com exercícios guiados.`,
      description,
      summary
    ],
    ihk,
    summary,
    example,
    studyTime: fullContent.studyTime,
    difficulty: fullContent.difficulty,
    exercises: [
      ...fullContent.exercises.easy.slice(0, 2),
      ...fullContent.exercises.ap1Style.slice(0, 1)
    ],
    fullContent
  };
}

const AZUBIFORGE_NEW_CHAPTERS = [
  {
    id: "cpu",
    title: "CPU",
    description: "Der Prozessor verarbeitet Befehle und ist eine zentrale Komponente für die Leistung eines Computers.",
    text: [
      "Die CPU, also der Prozessor, verarbeitet Befehle eines Programms. Sie ist eine der wichtigsten Komponenten im Computer.",
      "Für die AP1 musst du verstehen, welche Aufgabe die CPU hat, wie sie mit RAM und Software zusammenarbeitet und warum CPU-Leistung nicht nur von einer einzigen Zahl abhängt."
    ],
    ihk: "Wichtige Begriffe: Prozessor, Taktfrequenz, Kerne, Cache, Befehlsverarbeitung und Auslastung.",
    summary: "A CPU é o processador. Ela executa instruções, trabalha com dados vindos da RAM e influencia desempenho, mas não é o único fator de velocidade.",
    example: "Wenn ein Programm viele Berechnungen ausführt, kann die CPU-Auslastung stark steigen. Dann wird die CPU zum möglichen Engpass.",
    exercises: [
      {
        question: "Was ist die Aufgabe der CPU?",
        answer: "Die CPU verarbeitet Befehle und Daten."
      }
    ],
    studyTime: "75-90 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "75-90 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Die CPU ist für die AP1 sehr wichtig, weil sie eine zentrale Rolle im Computer spielt. Viele Aufgaben zu Hardware, Performance und Betriebssystemen setzen voraus, dass du die CPU grundsätzlich verstehst.",
          "In AP1-Aufgaben kann die CPU direkt vorkommen, zum Beispiel bei der Auswahl eines Arbeitsplatz-PCs. Sie kann aber auch indirekt vorkommen, wenn ein System langsam ist oder ein Programm viele Berechnungen ausführt.",
          "Português de apoio: a CPU não é simplesmente 'a velocidade do computador'. Ela é o processador que executa instruções. Desempenho depende também de RAM, SSD/HDD, software e carga de trabalho."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a CPU is.",
        "After this chapter the student will be able to describe the role of the CPU in program execution.",
        "After this chapter the student will be able to explain clock speed, cores and cache at AP1 level.",
        "After this chapter the student will be able to distinguish CPU, RAM and storage.",
        "After this chapter the student will be able to identify simple CPU-related performance problems.",
        "After this chapter the student will be able to answer AP1-style questions about CPU basics."
      ],
      introduction: [
        "Wenn ein Computer ein Programm ausführt, müssen Befehle verarbeitet werden. Diese Aufgabe übernimmt die CPU. CPU bedeutet Central Processing Unit. Auf Deutsch sagt man meistens Prozessor.",
        "Die CPU ist nicht der einzige wichtige Teil eines Computers, aber sie ist zentral. Ohne CPU kann ein Computer keine Programmbefehle ausführen.",
        "Ein häufiger Anfängerfehler ist: 'Eine bessere CPU macht immer alles schneller.' Das ist zu einfach. Eine CPU ist wichtig, aber Leistung hängt immer von der Aufgabe und vom gesamten System ab.",
        "Für AP1 reicht kein Marketing-Wissen. Du musst nicht wissen, welches konkrete Modell das beste ist. Du musst erklären können, was die CPU macht und welche Begriffe bei CPUs wichtig sind."
      ],
      explanation: [
        {
          title: "Was ist eine CPU?",
          paragraphs: [
            "Die CPU ist der Prozessor eines Computers. Sie verarbeitet Befehle, die von Programmen kommen.",
            "Ein Befehl kann zum Beispiel sein: Rechne zwei Zahlen zusammen, vergleiche zwei Werte, lade Daten aus dem Speicher oder springe zu einer anderen Stelle im Programm.",
            "Die CPU arbeitet sehr schnell und führt sehr viele einfache Schritte pro Sekunde aus. Komplexe Programme bestehen aus vielen kleinen Befehlen."
          ]
        },
        {
          title: "CPU, Programm und Betriebssystem",
          paragraphs: [
            "Ein Programm liegt zuerst als Datei auf einem Massenspeicher, zum Beispiel auf einer SSD. Wenn du das Programm startest, lädt das Betriebssystem benötigte Teile in den Arbeitsspeicher.",
            "Die CPU verarbeitet dann die Befehle des Programms. Sie arbeitet dabei eng mit RAM und Betriebssystem zusammen.",
            "Das Betriebssystem verwaltet, welches Programm CPU-Zeit bekommt. Wenn viele Programme gleichzeitig laufen, verteilt das Betriebssystem die Rechenzeit."
          ]
        },
        {
          title: "Der einfache Ablauf: Fetch, Decode, Execute",
          paragraphs: [
            "Die CPU arbeitet vereinfacht in einem Zyklus: Befehl holen, Befehl verstehen, Befehl ausführen.",
            "Fetch bedeutet: Die CPU holt den nächsten Befehl aus dem Speicher.",
            "Decode bedeutet: Die CPU interpretiert, was dieser Befehl bedeutet.",
            "Execute bedeutet: Die CPU führt den Befehl aus, zum Beispiel eine Berechnung oder einen Vergleich.",
            "Für AP1 musst du diesen Ablauf nicht auf Elektronik-Ebene erklären. Wichtig ist: Die CPU verarbeitet Befehle Schritt für Schritt."
          ],
          steps: [
            "1. Befehl aus dem Speicher holen.",
            "2. Befehl interpretieren.",
            "3. Befehl ausführen.",
            "4. Ergebnis speichern oder nächsten Befehl vorbereiten."
          ]
        },
        {
          title: "Taktfrequenz",
          paragraphs: [
            "Die Taktfrequenz beschreibt, wie viele Takte eine CPU pro Sekunde ausführen kann. Sie wird oft in Gigahertz, kurz GHz, angegeben.",
            "Eine höhere Taktfrequenz kann mehr Leistung bedeuten, aber sie ist nicht allein entscheidend. Moderne CPUs unterscheiden sich auch in Architektur, Anzahl der Kerne, Cache und Energieeffizienz.",
            "Für AP1 ist wichtig: GHz ist ein Leistungsmerkmal, aber man darf CPUs nicht nur anhand von GHz vergleichen."
          ]
        },
        {
          title: "Kerne",
          paragraphs: [
            "Ein CPU-Kern kann Befehle verarbeiten. Eine CPU mit mehreren Kernen kann mehrere Aufgaben besser parallel bearbeiten.",
            "Parallel bedeutet: Mehrere Aufgaben werden gleichzeitig oder fast gleichzeitig bearbeitet.",
            "Mehr Kerne helfen besonders, wenn Programme oder das Betriebssystem Arbeit auf mehrere Kerne verteilen können.",
            "Aber auch hier gilt: Mehr Kerne machen nicht automatisch jedes Programm schneller. Manche Programme nutzen nur wenige Kerne gut."
          ]
        },
        {
          title: "Cache",
          paragraphs: [
            "Cache ist ein sehr schneller kleiner Speicher in oder nahe der CPU. Er speichert Daten, die die CPU wahrscheinlich bald wieder braucht.",
            "Der Cache ist viel kleiner als RAM, aber schneller. Er hilft, Wartezeiten zu reduzieren.",
            "Für AP1 reicht: Cache beschleunigt den Zugriff auf häufig benötigte Daten und Befehle."
          ]
        },
        {
          title: "CPU-Auslastung",
          paragraphs: [
            "CPU-Auslastung zeigt, wie stark die CPU gerade beschäftigt ist. Im Task-Manager sieht man oft Prozentwerte.",
            "Wenn die CPU dauerhaft bei 100 Prozent liegt, kann sie ein Engpass sein. Dann reagieren Programme langsam.",
            "Eine hohe CPU-Auslastung ist aber nicht immer schlecht. Bei einer Videokonvertierung oder großen Berechnung ist hohe Auslastung normal.",
            "Wichtig ist der Kontext: Ist die hohe Auslastung erwartet oder verursacht sie ein Problem?"
          ]
        },
        {
          title: "CPU im Zusammenspiel mit RAM und SSD",
          paragraphs: [
            "Die CPU verarbeitet Befehle, aber sie braucht Daten. Diese Daten kommen meist aus dem RAM.",
            "Wenn zu wenig RAM vorhanden ist, muss das System Daten auf den Massenspeicher auslagern. Dann kann der Computer langsam werden, obwohl die CPU nicht das eigentliche Problem ist.",
            "Wenn eine alte HDD verwendet wird, kann das Laden von Programmen langsam sein. Auch dann ist nicht unbedingt die CPU schuld.",
            "AP1-Aufgaben prüfen oft, ob du die richtige Komponente als Ursache erkennst."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Entwickler kompiliert ein großes Projekt. Die CPU muss viele Befehle verarbeiten. Eine stärkere CPU kann die Kompilierzeit reduzieren.",
        "Ein Mitarbeiter nutzt nur Browser und Office. Eine sehr teure High-End-CPU bringt hier oft weniger Nutzen als genug RAM und eine SSD.",
        "Ein Server verarbeitet viele Anfragen. CPU-Leistung kann wichtig sein, aber auch RAM, Netzwerk und Datenbankzugriffe können Engpässe sein.",
        "Eine Firma ersetzt alte PCs. Für normale Büroarbeit wird eine ausgewogene CPU gewählt, nicht unbedingt das teuerste Modell."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: CPU-Auslastung prüfen",
          paragraphs: [
            "Ein PC reagiert langsam. Du öffnest den Task-Manager und siehst: CPU-Auslastung 98 Prozent, RAM-Auslastung 45 Prozent, SSD-Auslastung 10 Prozent.",
            "In diesem Fall ist die CPU wahrscheinlich ein Engpass. Du solltest prüfen, welches Programm die CPU stark nutzt."
          ],
          steps: [
            "Task-Manager öffnen.",
            "CPU-Spalte sortieren.",
            "Programm mit hoher CPU-Nutzung identifizieren.",
            "Prüfen, ob die hohe Nutzung normal ist.",
            "Maßnahme wählen: Programm schließen, Update prüfen oder Hardware-Anforderung bewerten."
          ]
        },
        {
          title: "Szenario 2: CPU nicht vorschnell beschuldigen",
          paragraphs: [
            "Ein PC ist langsam beim Starten. Die CPU-Auslastung ist niedrig, aber die HDD ist dauerhaft stark ausgelastet.",
            "Hier ist die CPU wahrscheinlich nicht die Hauptursache. Der Datenträger kann der Engpass sein."
          ],
          steps: [
            "Symptom genau beschreiben.",
            "CPU, RAM und Datenträger prüfen.",
            "Engpass anhand der Auslastung vermuten.",
            "Passende Maßnahme ableiten.",
            "Nicht automatisch die CPU austauschen."
          ]
        }
      ],
      diagrams: [
        {
          title: "CPU verarbeitet Befehle",
          code: "flowchart LR\n  P[Programm] --> OS[Betriebssystem]\n  OS --> RAM[RAM: Befehle und Daten]\n  RAM --> CPU[CPU]\n  CPU --> R[Ergebnis]\n  R --> RAM\n  R --> A[Ausgabe oder Speicherung]"
        },
        {
          title: "Fetch Decode Execute",
          code: "flowchart TD\n  A[Fetch: Befehl holen] --> B[Decode: Befehl verstehen]\n  B --> C[Execute: Befehl ausführen]\n  C --> D[Ergebnis speichern]\n  D --> A"
        }
      ],
      ihkFocus: {
        appears: [
          "Aufgaben zur Funktion der CPU.",
          "Zuordnung von Komponenten: CPU, RAM, SSD/HDD.",
          "Szenarien zu langsamen Computern und CPU-Auslastung.",
          "Vergleich von Leistungsmerkmalen wie Taktfrequenz und Kerne.",
          "Einfache Begründungen für Hardware-Auswahl."
        ],
        commonMistakes: [
          "GHz als einzigen Leistungsfaktor betrachten.",
          "CPU mit RAM oder Massenspeicher verwechseln.",
          "Jedes Performance-Problem automatisch der CPU zuordnen.",
          "Mehr Kerne als immer besser erklären, ohne Software-Kontext.",
          "CPU-Auslastung ohne Situation interpretieren."
        ],
        importantDetails: [
          "CPU verarbeitet Befehle.",
          "Taktfrequenz ist wichtig, aber nicht allein entscheidend.",
          "Mehrere Kerne helfen bei parallelisierbarer Arbeit.",
          "Cache ist schneller Zwischenspeicher.",
          "CPU arbeitet mit RAM und Betriebssystem zusammen."
        ],
        confusedConcepts: [
          "CPU vs RAM.",
          "CPU vs SSD/HDD.",
          "Taktfrequenz vs Anzahl Kerne.",
          "Auslastung vs Leistungsfähigkeit.",
          "CPU vs GPU."
        ],
        vocabulary: [
          "Prozessor = CPU.",
          "Taktfrequenz = Anzahl der Takte pro Sekunde.",
          "Kern = Verarbeitungseinheit innerhalb der CPU.",
          "Cache = sehr schneller Zwischenspeicher.",
          "Auslastung = aktuelle Nutzung einer Komponente."
        ]
      },
      commonMistakes: [
        "Zu sagen: Eine CPU speichert dauerhaft Daten. Das ist falsch; dauerhaft speichern SSD oder HDD.",
        "Zu sagen: Eine CPU mit mehr GHz ist immer besser. Das ist zu einfach, weil Architektur, Kerne und Cache ebenfalls wichtig sind.",
        "Zu glauben, dass mehr Kerne jedes Programm schneller machen. Manche Programme nutzen wenige Kerne.",
        "CPU-Auslastung nicht im Kontext zu sehen. Hohe Auslastung kann normal sein, wenn eine rechenintensive Aufgabe läuft.",
        "CPU und GPU zu verwechseln. Die CPU ist allgemeiner Prozessor, die GPU ist besonders für Grafik und parallele Aufgaben geeignet."
      ],
      vocabulary: [
        {
          de: "CPU",
          pt: "CPU / processador",
          explanation: "Zentrale Verarbeitungseinheit, die Befehle ausführt.",
          example: "Die CPU verarbeitet die Befehle eines Programms."
        },
        {
          de: "Prozessor",
          pt: "processador",
          explanation: "Deutsches Alltagswort für CPU.",
          example: "Der Prozessor ist eine zentrale Komponente des Computers."
        },
        {
          de: "Befehl",
          pt: "instrução",
          explanation: "Ein einzelner Arbeitsschritt, den die CPU ausführen kann.",
          example: "Die CPU holt den nächsten Befehl aus dem Speicher."
        },
        {
          de: "Taktfrequenz",
          pt: "frequência de clock",
          explanation: "Anzahl der Takte pro Sekunde, oft in GHz angegeben.",
          example: "Die Taktfrequenz allein entscheidet nicht über die gesamte Leistung."
        },
        {
          de: "Kern",
          pt: "núcleo",
          explanation: "Eine Verarbeitungseinheit innerhalb der CPU.",
          example: "Eine CPU mit mehreren Kernen kann mehrere Aufgaben parallel bearbeiten."
        },
        {
          de: "Cache",
          pt: "cache",
          explanation: "Sehr schneller kleiner Speicher für häufig benötigte Daten.",
          example: "Der Cache reduziert Wartezeiten beim Zugriff auf Daten."
        },
        {
          de: "Auslastung",
          pt: "utilização / carga",
          explanation: "Zeigt, wie stark eine Komponente gerade genutzt wird.",
          example: "Die CPU-Auslastung liegt bei 95 Prozent."
        },
        {
          de: "Engpass",
          pt: "gargalo",
          explanation: "Eine Komponente begrenzt die Leistung des Systems.",
          example: "Bei hoher CPU-Auslastung kann die CPU der Engpass sein."
        },
        {
          de: "parallel",
          pt: "paralelo",
          explanation: "Mehrere Aufgaben werden gleichzeitig oder fast gleichzeitig bearbeitet.",
          example: "Mehrere Kerne können Aufgaben parallel ausführen."
        },
        {
          de: "Rechenleistung",
          pt: "capacidade de processamento",
          explanation: "Fähigkeit, Berechnungen und Befehle schnell zu verarbeiten.",
          example: "Für Videobearbeitung braucht man oft hohe Rechenleistung."
        }
      ],
      summary: [
        "Die CPU ist der Prozessor eines Computers. Sie verarbeitet Befehle und Daten. Programme werden vom Betriebssystem gestartet, Daten und Befehle liegen im RAM, und die CPU führt die Befehle aus.",
        "Wichtige Begriffe sind Taktfrequenz, Kerne, Cache und Auslastung. Taktfrequenz beschreibt Takte pro Sekunde. Kerne helfen bei paralleler Arbeit. Cache ist ein sehr schneller Zwischenspeicher. Auslastung zeigt, wie stark die CPU gerade genutzt wird.",
        "Für AP1 ist wichtig: Die CPU ist nicht allein für die gesamte Geschwindigkeit verantwortlich. Ein langsamer PC kann auch durch zu wenig RAM, eine alte HDD, Softwareprobleme oder Netzwerkprobleme langsam sein.",
        "Português de apoio: CPU executa instruções. Não confunda com RAM, que guarda dados temporários em uso, nem com SSD/HDD, que guardam dados permanentemente."
      ],
      mindMap: {
        title: "Mindmap: CPU",
        code: "mindmap\n  root((CPU))\n    Aufgabe\n      Befehle verarbeiten\n      Daten berechnen\n      Programme ausführen\n    Begriffe\n      Taktfrequenz\n      Kerne\n      Cache\n      Auslastung\n    Zusammenarbeit\n      RAM\n      Betriebssystem\n      Programme\n      SSD/HDD\n    AP1 Fokus\n      Funktion erklären\n      Engpass erkennen\n      CPU nicht mit RAM verwechseln\n      Leistungsmerkmale einordnen"
      },
      exercises: {
        easy: [
          {
            question: "Was ist die CPU?",
            answer: "Die CPU ist die zentrale Verarbeitungseinheit eines Computers.",
            explanation: "Sie verarbeitet Befehle und Daten von Programmen."
          },
          {
            question: "Welches deutsche Wort wird oft für CPU verwendet?",
            answer: "Prozessor.",
            explanation: "In vielen AP1-Aufgaben steht eher Prozessor als CPU."
          },
          {
            question: "Was macht die CPU mit Befehlen?",
            answer: "Sie holt, interpretiert und führt Befehle aus.",
            explanation: "Das ist der vereinfachte Fetch-Decode-Execute-Ablauf."
          },
          {
            question: "Ist die CPU ein dauerhafter Speicher?",
            answer: "Nein.",
            explanation: "Dauerhafte Speicherung übernehmen SSD oder HDD. Die CPU verarbeitet."
          },
          {
            question: "Was bedeutet CPU-Auslastung?",
            answer: "Sie zeigt, wie stark die CPU gerade genutzt wird.",
            explanation: "Eine hohe Auslastung kann auf einen CPU-Engpass hinweisen, muss aber im Kontext bewertet werden."
          }
        ],
        intermediate: [
          {
            question: "Warum reicht die Taktfrequenz allein nicht aus, um CPUs vollständig zu vergleichen?",
            answer: "Weil auch Architektur, Kerne, Cache und die konkrete Aufgabe wichtig sind.",
            explanation: "GHz ist nur ein Merkmal. AP1 erwartet, dass man nicht nur eine Zahl betrachtet."
          },
          {
            question: "Erkläre den Unterschied zwischen CPU und RAM.",
            answer: "Die CPU verarbeitet Befehle. RAM speichert aktuell genutzte Daten kurzfristig.",
            explanation: "CPU ist Verarbeitung, RAM ist kurzfristiger Arbeitsspeicher."
          },
          {
            question: "Wann können mehrere CPU-Kerne helfen?",
            answer: "Wenn Aufgaben parallel bearbeitet werden können oder mehrere Programme gleichzeitig aktiv sind.",
            explanation: "Mehr Kerne helfen besonders bei parallelisierbarer Arbeit."
          },
          {
            question: "Was ist Cache und warum ist er nützlich?",
            answer: "Cache ist sehr schneller Zwischenspeicher für häufig benötigte Daten.",
            explanation: "Er reduziert Wartezeiten, weil die CPU nicht immer auf langsameren Speicher warten muss."
          },
          {
            question: "Warum ist eine hohe CPU-Auslastung nicht immer ein Fehler?",
            answer: "Weil rechenintensive Aufgaben die CPU absichtlich stark nutzen können.",
            explanation: "Zum Beispiel Kompilieren oder Videokonvertierung kann hohe Auslastung normal verursachen."
          }
        ],
        ap1Style: [
          {
            question: "Ein PC ist langsam. Der Task-Manager zeigt CPU 98 Prozent, RAM 40 Prozent und SSD 8 Prozent. Welche Komponente ist wahrscheinlich der Engpass? Begründen Sie.",
            answer: "Wahrscheinlich ist die CPU der Engpass.",
            explanation: "Die CPU ist fast vollständig ausgelastet, während RAM und SSD nicht stark ausgelastet sind. Deshalb liegt die Ursache wahrscheinlich bei einer rechenintensiven Aufgabe."
          },
          {
            question: "Ein Auszubildender sagt: Eine CPU mit mehr GHz ist immer schneller. Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist zu allgemein und daher nicht korrekt.",
            explanation: "Taktfrequenz ist wichtig, aber auch Kerne, Cache, Architektur und die konkrete Software beeinflussen die Leistung."
          },
          {
            question: "Ordnen Sie zu: CPU, RAM, SSD. Welche Komponente führt Befehle aus, welche speichert aktuelle Daten, welche speichert dauerhaft?",
            answer: "CPU führt Befehle aus. RAM speichert aktuelle Daten. SSD speichert dauerhaft.",
            explanation: "Diese Unterscheidung ist eine zentrale Hardware-Grundlage für AP1."
          },
          {
            question: "Ein Entwickler-PC kompiliert große Projekte langsam. Nennen Sie ein CPU-Merkmal, das relevant sein kann, und erklären Sie warum.",
            answer: "Die Anzahl der Kerne kann relevant sein, wenn der Compiler parallel arbeiten kann.",
            explanation: "Bei parallelisierbarer Arbeit können mehrere Kerne Aufgaben gleichzeitig bearbeiten und die Laufzeit reduzieren."
          },
          {
            question: "Ein PC startet langsam, aber die CPU-Auslastung ist niedrig. Die HDD-Auslastung ist hoch. Warum wäre ein CPU-Austausch wahrscheinlich nicht die beste erste Maßnahme?",
            answer: "Weil die Messwerte eher auf den Datenträger als Engpass hinweisen.",
            explanation: "Wenn die HDD stark ausgelastet ist und die CPU nicht, passt ein Wechsel zu SSD eher zur Ursache als ein CPU-Tausch."
          }
        ]
      },
      related: {
        previous: "Was ist Hardware?",
        next: "RAM / Arbeitsspeicher"
      },
      revisionChecklist: [
        "Ich kann erklären, was eine CPU ist.",
        "Ich kann CPU und RAM unterscheiden.",
        "Ich kann CPU und SSD/HDD unterscheiden.",
        "Ich verstehe Taktfrequenz, Kerne, Cache und Auslastung auf AP1-Niveau.",
        "Ich kann einen einfachen CPU-Engpass erkennen.",
        "Ich kenne wichtige deutsche CPU-Begriffe.",
        "Ich kann AP1-Fragen zur CPU beantworten."
      ]
    }
  },
  {
    id: "ram",
    title: "RAM / Arbeitsspeicher",
    description: "Arbeitsspeicher speichert aktuell genutzte Daten kurzfristig und ist wichtig für flüssiges Arbeiten.",
    text: [
      "RAM bedeutet Random Access Memory. Auf Deutsch sagt man Arbeitsspeicher. Er speichert Daten und Programmteile, die der Computer gerade benutzt.",
      "RAM ist schnell, aber flüchtig. Flüchtig bedeutet: Wenn der Computer ausgeschaltet wird, gehen die Daten im RAM verloren."
    ],
    ihk: "Für die AP1 wichtig: RAM ist Arbeitsspeicher, schnell und flüchtig. SSD/HDD sind Massenspeicher und speichern dauerhaft.",
    summary: "RAM guarda temporariamente dados em uso. Ele é rápido e volátil. Pouca RAM pode deixar o sistema lento, especialmente com muitos programas abertos.",
    example: "Wenn Browser, Teams, IDE und Datenbank gleichzeitig geöffnet sind, braucht der Computer viel Arbeitsspeicher.",
    exercises: [
      {
        question: "Was ist RAM?",
        answer: "RAM ist der Arbeitsspeicher eines Computers."
      }
    ],
    studyTime: "75-90 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "75-90 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "RAM ist für die AP1 sehr wichtig, weil viele Leistungsprobleme mit Arbeitsspeicher zusammenhängen. Außerdem wird RAM sehr häufig mit SSD oder HDD verwechselt.",
          "Die IHK prüft oft, ob du kurzfristigen Arbeitsspeicher und dauerhaften Massenspeicher unterscheiden kannst. Das ist eine zentrale Hardware-Grundlage.",
          "Português de apoio: RAM não é onde seus arquivos ficam permanentemente. RAM é memória de trabalho temporária enquanto o computador está ligado e usando programas."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what RAM is.",
        "After this chapter the student will be able to explain the German term Arbeitsspeicher.",
        "After this chapter the student will be able to distinguish RAM from SSD/HDD.",
        "After this chapter the student will be able to explain why too little RAM can slow down a computer.",
        "After this chapter the student will be able to explain volatile memory at AP1 level.",
        "After this chapter the student will be able to solve AP1-style scenarios about memory usage."
      ],
      introduction: [
        "Stell dir vor, du arbeitest an einem Schreibtisch. Auf dem Schreibtisch liegen die Unterlagen, die du gerade brauchst. Im Schrank liegen viele weitere Unterlagen, die du später brauchst.",
        "Der Arbeitsspeicher ist wie dieser Schreibtisch. Er enthält Daten, die gerade aktiv benutzt werden. Die SSD oder HDD ist eher wie der Schrank: Dort liegen Daten dauerhaft.",
        "Diese Analogie ist nicht perfekt, aber sie hilft am Anfang. Wichtig ist: RAM ist sehr schnell, aber nicht dauerhaft. SSD/HDD sind dauerhaft, aber im Vergleich zu RAM langsamer.",
        "In der AP1 musst du diese Unterscheidung sicher beherrschen, weil sie in vielen Hardware- und Performance-Aufgaben vorkommt."
      ],
      explanation: [
        {
          title: "Was ist RAM?",
          paragraphs: [
            "RAM bedeutet Random Access Memory. Auf Deutsch heißt RAM meistens Arbeitsspeicher.",
            "Der Arbeitsspeicher speichert Daten und Programmteile, die der Computer gerade verwendet. Wenn du ein Programm startest, werden benötigte Teile vom Massenspeicher in den RAM geladen.",
            "Die CPU kann mit Daten im RAM viel schneller arbeiten als mit Daten, die direkt von SSD oder HDD geladen werden müssen."
          ]
        },
        {
          title: "Warum braucht ein Computer RAM?",
          paragraphs: [
            "Die CPU verarbeitet Befehle sehr schnell. Dafür braucht sie schnellen Zugriff auf Daten. Der Massenspeicher ist für dauerhafte Speicherung gut, aber nicht schnell genug für alle laufenden Arbeitsschritte.",
            "RAM löst dieses Problem. Er stellt aktuell benötigte Daten schnell bereit.",
            "Ohne RAM könnte ein modernes Betriebssystem nicht effizient arbeiten. Programme würden sehr langsam reagieren."
          ]
        },
        {
          title: "Flüchtiger Speicher",
          paragraphs: [
            "RAM ist flüchtig. Flüchtig bedeutet: Die Daten bleiben nur erhalten, solange Strom vorhanden ist.",
            "Wenn du den Computer ausschaltest, werden die Daten im RAM gelöscht. Deshalb müssen Dateien auf SSD, HDD oder einem anderen dauerhaften Speicher gespeichert werden.",
            "Das ist ein wichtiger AP1-Punkt: RAM ist nicht für dauerhafte Speicherung gedacht."
          ]
        },
        {
          title: "RAM und laufende Programme",
          paragraphs: [
            "Jedes laufende Programm braucht Arbeitsspeicher. Ein Browser mit vielen Tabs kann viel RAM nutzen. Eine Entwicklungsumgebung, virtuelle Maschinen oder Datenbanken können ebenfalls viel RAM benötigen.",
            "Auch das Betriebssystem selbst braucht RAM. Wenn zu viele Programme gleichzeitig laufen, kann der Arbeitsspeicher knapp werden.",
            "Dann muss das System Daten auslagern. Das bedeutet: Daten werden vorübergehend auf den Massenspeicher verschoben. Das ist deutlich langsamer als RAM."
          ]
        },
        {
          title: "Auslagerung, Swap und virtuelle Speicherverwaltung",
          paragraphs: [
            "Wenn der RAM nicht ausreicht, kann das Betriebssystem einen Teil des Massenspeichers als Ersatzbereich nutzen. Unter Windows spricht man oft von Auslagerungsdatei. Unter Linux hört man häufig Swap.",
            "Diese Technik verhindert, dass Programme sofort abstürzen, wenn der RAM voll ist. Aber sie macht das System langsamer, weil SSD oder HDD langsamer als RAM sind.",
            "Für AP1 reicht: Auslagerung hilft bei knappem RAM, ist aber kein Ersatz für genügend Arbeitsspeicher."
          ]
        },
        {
          title: "RAM-Kapazität",
          paragraphs: [
            "RAM-Kapazität wird heute meistens in Gigabyte angegeben, zum Beispiel 8 GB, 16 GB oder 32 GB.",
            "Mehr RAM erlaubt mehr gleichzeitig geöffnete Programme oder größere Datenmengen. Aber mehr RAM macht den Computer nicht automatisch schneller, wenn vorher genug RAM vorhanden war.",
            "Die richtige RAM-Größe hängt vom Einsatz ab. Büroarbeit braucht oft weniger RAM als Softwareentwicklung, Virtualisierung oder Bildbearbeitung."
          ]
        },
        {
          title: "RAM-Geschwindigkeit",
          paragraphs: [
            "RAM hat auch eine Geschwindigkeit. Für AP1 ist die genaue technische Geschwindigkeit meist weniger wichtig als die Grundfunktion und Kapazität.",
            "Wichtig ist: RAM ist deutlich schneller als Massenspeicher. Darum werden aktive Daten im RAM gehalten.",
            "In AP1-Aufgaben wird meistens gefragt, wofür RAM da ist, warum zu wenig RAM problematisch ist und wie RAM sich von SSD/HDD unterscheidet."
          ]
        },
        {
          title: "RAM im Zusammenspiel mit CPU und SSD",
          paragraphs: [
            "Die CPU verarbeitet Daten. RAM stellt Daten schnell bereit. SSD oder HDD speichern Daten dauerhaft.",
            "Wenn ein Programm gestartet wird, kommen Daten vom Massenspeicher in den RAM. Die CPU verarbeitet diese Daten. Ergebnisse können wieder im RAM liegen und später dauerhaft gespeichert werden.",
            "Wenn RAM fehlt, muss mehr über den Massenspeicher gearbeitet werden. Das kann den Computer stark verlangsamen."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Azubi öffnet eine IDE, einen Browser mit vielen Tabs, Teams und eine lokale Datenbank. Der Laptop mit 8 GB RAM wird langsam. Ein Upgrade auf 16 GB RAM kann sinnvoll sein.",
        "Ein Büro-PC nutzt nur E-Mail, Browser und Office. Wenn 16 GB RAM vorhanden sind und die Auslastung niedrig ist, bringt ein Upgrade auf 32 GB wahrscheinlich wenig.",
        "Ein Entwickler arbeitet mit virtuellen Maschinen. Jede virtuelle Maschine benötigt eigenen Arbeitsspeicher. Zu wenig RAM führt schnell zu starker Auslagerung.",
        "Ein Server mit Datenbank braucht ausreichend RAM, damit häufig genutzte Daten schnell verfügbar sind."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Viele Programme gleichzeitig",
          paragraphs: [
            "Ein Mitarbeiter meldet, dass sein PC langsam wird, wenn viele Programme geöffnet sind. Die CPU-Auslastung ist niedrig, aber RAM liegt bei 95 Prozent.",
            "In diesem Fall ist zu wenig Arbeitsspeicher eine wahrscheinliche Ursache."
          ],
          steps: [
            "Task-Manager öffnen.",
            "RAM-Auslastung prüfen.",
            "Programme mit hohem Speicherverbrauch identifizieren.",
            "Nicht benötigte Programme schließen.",
            "Prüfen, ob ein RAM-Upgrade sinnvoll ist."
          ]
        },
        {
          title: "Szenario 2: RAM oder SSD?",
          paragraphs: [
            "Ein PC startet langsam, aber nach dem Start laufen Programme flüssig. Hier könnte der Massenspeicher eine größere Rolle spielen als RAM.",
            "Ein anderer PC startet normal, wird aber langsam, wenn viele Programme offen sind. Hier kann RAM die Ursache sein."
          ],
          steps: [
            "Symptom genau beschreiben.",
            "Startzeit und Verhalten während der Arbeit unterscheiden.",
            "RAM-Auslastung prüfen.",
            "Datenträgerauslastung prüfen.",
            "Passende Komponente als mögliche Ursache nennen."
          ]
        }
      ],
      diagrams: [
        {
          title: "Zusammenspiel von SSD, RAM und CPU",
          code: "flowchart LR\n  SSD[SSD/HDD: dauerhafte Daten] --> RAM[RAM: aktuell genutzte Daten]\n  RAM --> CPU[CPU: verarbeitet Befehle]\n  CPU --> RAM\n  RAM --> SSD\n  OS[Betriebssystem] --> RAM\n  OS --> CPU"
        },
        {
          title: "Wenn RAM knapp wird",
          code: "flowchart TD\n  A[Viele Programme geöffnet] --> B[RAM wird voll]\n  B --> C[Betriebssystem lagert Daten aus]\n  C --> D[SSD/HDD wird stärker genutzt]\n  D --> E[System reagiert langsamer]\n  E --> F[Mögliche Maßnahme: Programme schließen oder RAM erweitern]"
        }
      ],
      ihkFocus: {
        appears: [
          "Unterscheidung zwischen RAM und Massenspeicher.",
          "Szenarien mit langsamen Computern und hoher RAM-Auslastung.",
          "Begriffe wie Arbeitsspeicher, flüchtig, Auslagerung und Speicherkapazität.",
          "Hardware-Auswahl für Büro-PCs, Entwickler-PCs oder Server.",
          "Zuordnung von Komponenten zu Funktionen."
        ],
        commonMistakes: [
          "RAM als dauerhaften Speicher beschreiben.",
          "RAM und SSD/HDD verwechseln.",
          "Zu glauben, dass mehr RAM immer schneller macht.",
          "Auslagerung als gleichwertigen Ersatz für RAM verstehen.",
          "Speicherplatz und Arbeitsspeicher verwechseln."
        ],
        importantDetails: [
          "RAM ist schnell.",
          "RAM ist flüchtig.",
          "RAM speichert aktuell genutzte Daten.",
          "SSD/HDD speichern dauerhaft.",
          "Zu wenig RAM kann Auslagerung verursachen.",
          "Auslagerung ist langsamer als echter RAM."
        ],
        confusedConcepts: [
          "RAM vs SSD.",
          "RAM vs HDD.",
          "Arbeitsspeicher vs Speicherplatz.",
          "Auslagerung vs dauerhafte Speicherung.",
          "RAM-Kapazität vs CPU-Leistung."
        ],
        vocabulary: [
          "Arbeitsspeicher = RAM.",
          "flüchtig = Daten gehen ohne Strom verloren.",
          "Auslagerung = Daten werden bei RAM-Mangel auf Massenspeicher verschoben.",
          "Speicherkapazität = Größe des verfügbaren Speichers.",
          "Massenspeicher = SSD oder HDD für dauerhafte Daten."
        ]
      },
      commonMistakes: [
        "Zu sagen: Dateien liegen dauerhaft im RAM. Das ist falsch, weil RAM flüchtig ist.",
        "Zu sagen: Mehr RAM macht immer alles schneller. Wenn genug RAM vorhanden ist, bringt mehr RAM oft keinen großen Vorteil.",
        "Arbeitsspeicher und Speicherplatz zu verwechseln. 16 GB RAM und 512 GB SSD sind verschiedene Dinge.",
        "Auslagerung als gute Dauerlösung zu betrachten. Sie hilft, ist aber langsamer als echter RAM.",
        "Nur RAM zu prüfen, obwohl ein Leistungsproblem auch durch CPU, SSD/HDD, Netzwerk oder Software entstehen kann."
      ],
      vocabulary: [
        {
          de: "RAM",
          pt: "RAM",
          explanation: "Schneller Arbeitsspeicher für aktuell genutzte Daten.",
          example: "Der Browser benötigt RAM für geöffnete Tabs."
        },
        {
          de: "Arbeitsspeicher",
          pt: "memória de trabalho",
          explanation: "Deutsches Wort für RAM.",
          example: "Zu wenig Arbeitsspeicher kann den PC langsam machen."
        },
        {
          de: "flüchtig",
          pt: "volátil",
          explanation: "Daten gehen verloren, wenn kein Strom mehr vorhanden ist.",
          example: "RAM ist ein flüchtiger Speicher."
        },
        {
          de: "Massenspeicher",
          pt: "armazenamento permanente",
          explanation: "Dauerhafter Speicher wie SSD oder HDD.",
          example: "Dateien werden auf dem Massenspeicher gespeichert."
        },
        {
          de: "Auslagerung",
          pt: "paginação / uso de memória virtual",
          explanation: "Daten werden bei knappem RAM auf den Massenspeicher verschoben.",
          example: "Starke Auslagerung kann das System verlangsamen."
        },
        {
          de: "Swap",
          pt: "swap",
          explanation: "Bereich auf dem Massenspeicher, der bei RAM-Mangel genutzt wird.",
          example: "Unter Linux wird häufig der Begriff Swap verwendet."
        },
        {
          de: "Speicherkapazität",
          pt: "capacidade de memória",
          explanation: "Menge des verfügbaren Speichers, zum Beispiel 16 GB RAM.",
          example: "Die Speicherkapazität des Notebooks beträgt 16 GB RAM."
        },
        {
          de: "Speicherplatz",
          pt: "espaço de armazenamento",
          explanation: "Freier Platz auf SSD oder HDD.",
          example: "Auf der SSD ist noch 200 GB Speicherplatz frei."
        },
        {
          de: "Speicherverbrauch",
          pt: "consumo de memória",
          explanation: "Menge an RAM, die ein Programm nutzt.",
          example: "Der Speicherverbrauch des Browsers ist sehr hoch."
        },
        {
          de: "virtueller Speicher",
          pt: "memória virtual",
          explanation: "Speicherverwaltung, bei der Massenspeicher als Ergänzung zu RAM genutzt werden kann.",
          example: "Virtueller Speicher hilft, wenn der Arbeitsspeicher knapp wird."
        }
      ],
      summary: [
        "RAM ist der Arbeitsspeicher eines Computers. Er speichert Daten und Programmteile, die gerade benutzt werden. RAM ist sehr schnell, aber flüchtig.",
        "Flüchtig bedeutet: Daten im RAM gehen verloren, wenn der Computer ausgeschaltet wird. Deshalb werden Dateien dauerhaft auf SSD oder HDD gespeichert.",
        "Wenn zu wenig RAM vorhanden ist, kann das Betriebssystem Daten auslagern. Diese Auslagerung nutzt SSD oder HDD und ist langsamer als echter RAM. Deshalb kann ein Computer bei RAM-Mangel langsam werden.",
        "Für AP1 musst du sicher unterscheiden: CPU verarbeitet, RAM hält aktuelle Daten, SSD/HDD speichern dauerhaft. Verwechsle Arbeitsspeicher nicht mit Speicherplatz."
      ],
      mindMap: {
        title: "Mindmap: RAM / Arbeitsspeicher",
        code: "mindmap\n  root((RAM))\n    Aufgabe\n      aktuelle Daten\n      laufende Programme\n      schneller Zugriff\n    Eigenschaften\n      schnell\n      flüchtig\n      Kapazität in GB\n    Zusammenspiel\n      CPU\n      Betriebssystem\n      SSD/HDD\n    Probleme\n      RAM voll\n      Auslagerung\n      System langsam\n    AP1 Fokus\n      RAM vs SSD\n      Arbeitsspeicher vs Speicherplatz\n      Engpass erkennen"
      },
      exercises: {
        easy: [
          {
            question: "Was bedeutet RAM auf Deutsch?",
            answer: "Arbeitsspeicher.",
            explanation: "In AP1-Aufgaben steht häufig Arbeitsspeicher statt RAM."
          },
          {
            question: "Ist RAM flüchtig oder dauerhaft?",
            answer: "RAM ist flüchtig.",
            explanation: "Daten im RAM gehen verloren, wenn der Computer ausgeschaltet wird."
          },
          {
            question: "Wofür wird RAM benutzt?",
            answer: "Für aktuell genutzte Daten und Programmteile.",
            explanation: "Laufende Programme benötigen RAM, damit die CPU schnell mit Daten arbeiten kann."
          },
          {
            question: "Wo werden Dateien dauerhaft gespeichert?",
            answer: "Auf SSD, HDD oder anderem Massenspeicher.",
            explanation: "RAM ist nicht für dauerhafte Speicherung gedacht."
          },
          {
            question: "Nenne ein Programm, das viel RAM verbrauchen kann.",
            answer: "Zum Beispiel ein Browser mit vielen Tabs oder eine Entwicklungsumgebung.",
            explanation: "Viele gleichzeitig aktive Daten erhöhen den RAM-Verbrauch."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen Arbeitsspeicher und Speicherplatz.",
            answer: "Arbeitsspeicher ist RAM für aktuelle Daten. Speicherplatz ist Platz auf SSD oder HDD für dauerhafte Daten.",
            explanation: "Diese Unterscheidung ist zentral für AP1-Hardwarefragen."
          },
          {
            question: "Warum kann zu wenig RAM einen Computer langsam machen?",
            answer: "Weil das Betriebssystem Daten auslagern muss, wenn RAM knapp wird.",
            explanation: "Auslagerung auf SSD/HDD ist langsamer als Zugriff auf RAM."
          },
          {
            question: "Warum macht mehr RAM nicht immer alles schneller?",
            answer: "Wenn bereits genug RAM vorhanden ist, liegt der Engpass oft woanders.",
            explanation: "Leistung hängt vom gesamten System und der Aufgabe ab."
          },
          {
            question: "Was bedeutet Auslagerung?",
            answer: "Daten werden bei RAM-Mangel vorübergehend auf den Massenspeicher verschoben.",
            explanation: "Das hilft dem System weiterzuarbeiten, ist aber langsamer."
          },
          {
            question: "Wie arbeiten CPU und RAM zusammen?",
            answer: "RAM hält aktuelle Daten bereit, die CPU verarbeitet Befehle und Daten.",
            explanation: "Die CPU braucht schnellen Zugriff auf Daten, deshalb ist RAM wichtig."
          }
        ],
        ap1Style: [
          {
            question: "Ein PC wird langsam, wenn viele Programme geöffnet sind. CPU-Auslastung: 30 Prozent, RAM-Auslastung: 96 Prozent, SSD-Auslastung: 20 Prozent. Welche Ursache ist wahrscheinlich? Begründen Sie.",
            answer: "Wahrscheinlich ist zu wenig RAM die Ursache.",
            explanation: "Die RAM-Auslastung ist sehr hoch, während CPU und SSD nicht stark ausgelastet sind. Das System muss möglicherweise auslagern."
          },
          {
            question: "Ein Auszubildender sagt: Ich brauche mehr Speicherplatz, weil mein Arbeitsspeicher voll ist. Erklären Sie den Fehler.",
            answer: "Er verwechselt Arbeitsspeicher mit Speicherplatz.",
            explanation: "Arbeitsspeicher ist RAM. Speicherplatz befindet sich auf SSD/HDD. Mehr SSD-Speicher ersetzt nicht automatisch RAM."
          },
          {
            question: "Ein Notebook hat 8 GB RAM und eine 512 GB SSD. Erklären Sie beide Angaben.",
            answer: "8 GB RAM ist die Größe des Arbeitsspeichers. 512 GB SSD ist die Größe des dauerhaften Massenspeichers.",
            explanation: "Die Zahlen beziehen sich auf verschiedene Speicherarten mit verschiedenen Aufgaben."
          },
          {
            question: "Warum ist Auslagerung keine gleichwertige Alternative zu ausreichend RAM?",
            answer: "Weil Auslagerung den langsameren Massenspeicher nutzt.",
            explanation: "SSD/HDD sind im Vergleich zu RAM langsamer. Dadurch kann das System deutlich träger reagieren."
          },
          {
            question: "Ein Entwickler möchte virtuelle Maschinen nutzen. Warum sollte bei der Hardware-Auswahl besonders auf RAM geachtet werden?",
            answer: "Virtuelle Maschinen benötigen zusätzlichen Arbeitsspeicher.",
            explanation: "Jede VM braucht RAM für ihr eigenes Betriebssystem und Programme. Zu wenig RAM führt schnell zu Auslagerung und schlechter Leistung."
          }
        ]
      },
      related: {
        previous: "CPU",
        next: "Speicher: SSD, HDD und Massenspeicher"
      },
      revisionChecklist: [
        "Ich kann erklären, was RAM ist.",
        "Ich kenne den deutschen Begriff Arbeitsspeicher.",
        "Ich kann RAM und SSD/HDD unterscheiden.",
        "Ich verstehe, warum RAM flüchtig ist.",
        "Ich kann Auslagerung einfach erklären.",
        "Ich kann typische RAM-Engpässe erkennen.",
        "Ich kann AP1-Fragen zu RAM beantworten."
      ]
    }
  },
  {
    id: "speicher-ssd-hdd",
    title: "Speicher: SSD, HDD und Massenspeicher",
    description: "Massenspeicher speichern Daten dauerhaft. SSD und HDD unterscheiden sich in Technik, Geschwindigkeit, Kosten und Einsatzbereich.",
    text: [
      "Massenspeicher speichern Daten dauerhaft. Dazu gehören SSDs, HDDs, USB-Sticks, Speicherkarten und andere Datenträger.",
      "Für die AP1 sind vor allem SSD und HDD wichtig. Du musst erklären können, warum SSDs meist schneller sind, warum HDDs noch verwendet werden und wie Massenspeicher sich von RAM unterscheiden."
    ],
    ihk: "Wichtig für AP1: RAM ist flüchtig und kurzfristig. SSD/HDD sind dauerhaft. SSD ist schnell und ohne bewegliche Teile. HDD ist mechanisch und oft günstiger pro GB.",
    summary: "Massenspeicher guardam dados permanentemente. SSD é rápida e usa memória flash. HDD usa partes mecânicas e costuma ser mais barata para grande capacidade.",
    example: "Ein alter Büro-PC startet langsam mit HDD. Der Wechsel auf SSD kann Startzeit und Programmstart deutlich verbessern.",
    exercises: [
      {
        question: "Was ist ein Massenspeicher?",
        answer: "Ein Massenspeicher speichert Daten dauerhaft, zum Beispiel SSD oder HDD."
      }
    ],
    studyTime: "75-90 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "75-90 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Massenspeicher sind für AP1 sehr wichtig, weil sie in vielen praktischen Aufgaben vorkommen: PC-Performance, Datenspeicherung, Kosten, Kapazität, Backup und Hardware-Auswahl.",
          "Die IHK prüft häufig, ob du RAM und Massenspeicher unterscheiden kannst. Außerdem musst du SSD und HDD vergleichen können.",
          "Português de apoio: armazenamento permanente é onde ficam sistema operacional, programas e arquivos. Não confunda com RAM, que é temporária."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what Massenspeicher means.",
        "After this chapter the student will be able to distinguish RAM from SSD/HDD.",
        "After this chapter the student will be able to explain how SSD and HDD differ.",
        "After this chapter the student will be able to choose a suitable storage type for simple scenarios.",
        "After this chapter the student will be able to explain access time, capacity and durability at AP1 level.",
        "After this chapter the student will be able to solve AP1-style questions about storage."
      ],
      introduction: [
        "Wenn du eine Datei speicherst, soll sie auch nach dem Ausschalten des Computers noch vorhanden sein. Dafür braucht ein Computer dauerhaften Speicher.",
        "Diesen dauerhaften Speicher nennt man Massenspeicher. Die wichtigsten Beispiele in der AP1 sind SSD und HDD.",
        "RAM und Massenspeicher haben verschiedene Aufgaben. RAM ist sehr schnell und speichert aktuelle Daten nur kurzfristig. SSD und HDD speichern Daten dauerhaft.",
        "Für AP1 ist die zentrale Frage oft nicht: Welche Technik ist moderner? Sondern: Welche Speicherart passt zu welcher Situation und warum?"
      ],
      explanation: [
        {
          title: "Was ist Massenspeicher?",
          paragraphs: [
            "Massenspeicher ist Speicher für große Datenmengen. Er speichert Daten dauerhaft. Dauerhaft bedeutet: Die Daten bleiben erhalten, auch wenn der Computer ausgeschaltet wird.",
            "Auf dem Massenspeicher liegen zum Beispiel das Betriebssystem, Programme, Dokumente, Bilder, Datenbanken und Projektdateien.",
            "Typische Massenspeicher sind SSD, HDD, USB-Stick, Speicherkarte oder externe Festplatte. Für AP1 sind SSD und HDD besonders wichtig."
          ]
        },
        {
          title: "SSD",
          paragraphs: [
            "SSD bedeutet Solid State Drive. Eine SSD speichert Daten elektronisch in Flash-Speicher. Sie hat keine beweglichen mechanischen Teile.",
            "SSDs haben sehr kurze Zugriffszeiten. Das bedeutet: Sie können Daten sehr schnell finden und bereitstellen.",
            "Deshalb starten Betriebssysteme und Programme auf einer SSD oft deutlich schneller als auf einer HDD.",
            "Eine SSD ist besonders sinnvoll für Betriebssystem, Programme und häufig genutzte Daten."
          ]
        },
        {
          title: "HDD",
          paragraphs: [
            "HDD bedeutet Hard Disk Drive. Auf Deutsch sagt man oft Festplatte. Eine HDD speichert Daten magnetisch auf rotierenden Scheiben.",
            "Eine HDD hat bewegliche mechanische Teile: Scheiben drehen sich, und ein Schreib-/Lesekopf bewegt sich.",
            "HDDs sind im Vergleich zu SSDs meist langsamer, aber oft günstiger pro Gigabyte. Deshalb werden sie noch für große Datenmengen genutzt.",
            "Eine HDD kann sinnvoll sein für Archive, Backups oder große Datenbestände, bei denen Geschwindigkeit nicht so wichtig ist."
          ]
        },
        {
          title: "Zugriffszeit und Geschwindigkeit",
          paragraphs: [
            "Zugriffszeit beschreibt, wie lange ein Speicher braucht, um gewünschte Daten zu finden und bereitzustellen.",
            "SSDs haben sehr kurze Zugriffszeiten, weil sie keine mechanischen Bewegungen brauchen.",
            "HDDs sind langsamer, weil der Schreib-/Lesekopf die richtige Position finden muss und die Scheiben rotieren.",
            "Für AP1 ist wichtig: SSDs verbessern oft die gefühlte Geschwindigkeit eines PCs, besonders beim Starten und Öffnen von Programmen."
          ]
        },
        {
          title: "Kapazität und Kosten",
          paragraphs: [
            "Kapazität beschreibt, wie viele Daten gespeichert werden können. Sie wird oft in GB oder TB angegeben.",
            "HDDs bieten häufig viel Speicherplatz zu geringeren Kosten. SSDs sind schneller, aber bei sehr großer Kapazität oft teurer.",
            "Die passende Wahl hängt vom Einsatz ab. Für ein Betriebssystem ist SSD meistens sinnvoll. Für selten genutzte große Datenmengen kann HDD ausreichend sein."
          ]
        },
        {
          title: "SSD/HDD und RAM",
          paragraphs: [
            "RAM speichert aktuelle Daten kurzfristig. SSD und HDD speichern Daten dauerhaft.",
            "Wenn ein Programm gestartet wird, lädt das Betriebssystem Daten vom Massenspeicher in den RAM. Danach verarbeitet die CPU die Daten.",
            "Wenn zu wenig RAM vorhanden ist, kann das Betriebssystem Daten auf SSD/HDD auslagern. Das ist aber langsamer als echter RAM.",
            "AP1-Aufgaben prüfen sehr oft, ob du diese Rollen richtig unterscheiden kannst."
          ]
        },
        {
          title: "Interne und externe Speicher",
          paragraphs: [
            "Interne Speicher sind im Gerät eingebaut, zum Beispiel eine interne SSD in einem Notebook.",
            "Externe Speicher werden angeschlossen, zum Beispiel externe Festplatten oder USB-Sticks.",
            "Externe Speicher sind praktisch für Transport oder Backup. Für dauerhafte Unternehmenssicherung braucht man aber ein durchdachtes Backup-Konzept."
          ]
        },
        {
          title: "Wichtige Entscheidungskriterien",
          paragraphs: [
            "Bei der Auswahl eines Speichers fragt man: Wie schnell muss der Zugriff sein? Wie viel Kapazität wird gebraucht? Wie hoch dürfen die Kosten sein? Wie wichtig sind Robustheit und Energieverbrauch?",
            "Für mobile Geräte sind SSDs vorteilhaft, weil sie keine beweglichen Teile haben und robuster gegen Erschütterung sind.",
            "Für sehr große Datenmengen können HDDs wirtschaftlich sein, wenn Geschwindigkeit weniger wichtig ist."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Unternehmen ersetzt HDDs in Büro-PCs durch SSDs. Die PCs starten schneller, und Programme öffnen sich schneller.",
        "Ein Entwickler-Notebook nutzt eine SSD für Betriebssystem, IDE und Projekte, damit Entwicklungswerkzeuge schnell reagieren.",
        "Ein Archivserver speichert alte Projektdaten auf großen HDDs, weil Kapazität und Kosten wichtiger sind als maximale Geschwindigkeit.",
        "Ein externer Datenträger wird für Sicherungskopien verwendet. Trotzdem braucht die Firma klare Backup-Regeln."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Langsamer PC mit HDD",
          paragraphs: [
            "Ein Büro-PC braucht mehrere Minuten zum Starten. Programme öffnen sehr langsam. Der Task-Manager zeigt hohe Datenträgerauslastung.",
            "Wenn eine alte HDD eingebaut ist, kann ein Wechsel auf SSD eine sinnvolle Maßnahme sein."
          ],
          steps: [
            "Symptom prüfen: langsamer Start und langsames Öffnen von Programmen.",
            "Datenträgerauslastung prüfen.",
            "Speichertyp feststellen: HDD oder SSD.",
            "Wenn HDD der Engpass ist, SSD als Upgrade vorschlagen.",
            "Begründung: geringere Zugriffszeit und höhere Geschwindigkeit."
          ]
        },
        {
          title: "Szenario 2: Speicher für Archivdaten",
          paragraphs: [
            "Eine Firma möchte große Mengen alter Projektdaten speichern. Die Daten werden selten gelesen.",
            "Hier kann eine HDD wirtschaftlich sinnvoll sein, weil viel Kapazität zu geringeren Kosten benötigt wird."
          ],
          steps: [
            "Anforderung klären: Geschwindigkeit oder Kapazität?",
            "Zugriffshäufigkeit prüfen.",
            "Kosten pro GB betrachten.",
            "HDD für selten genutzte große Datenmengen bewerten.",
            "Backup-Konzept separat planen."
          ]
        }
      ],
      diagrams: [
        {
          title: "RAM und Massenspeicher",
          code: "flowchart LR\n  S[SSD/HDD: dauerhafte Speicherung] --> RAM[RAM: aktuelle Daten]\n  RAM --> CPU[CPU verarbeitet]\n  CPU --> RAM\n  RAM --> S\n  A[Datei speichern] --> S"
        },
        {
          title: "SSD vs HDD Entscheidung",
          code: "flowchart TD\n  A[Speicher auswählen] --> B{Schneller Zugriff wichtig?}\n  B -->|Ja| C[SSD]\n  B -->|Nein| D{Sehr große Datenmenge und Kosten wichtig?}\n  D -->|Ja| E[HDD möglich]\n  D -->|Nein| F[SSD oder passende Kombination prüfen]\n  C --> G[Betriebssystem, Programme, Projekte]\n  E --> H[Archiv, große Daten, Backup-Ziel]"
        }
      ],
      ihkFocus: {
        appears: [
          "Vergleich SSD und HDD.",
          "Unterscheidung RAM und Massenspeicher.",
          "Szenarien zu langsamen PCs und Datenträgerauslastung.",
          "Auswahl eines geeigneten Speichers nach Anforderungen.",
          "Begriffe wie Zugriffszeit, Kapazität, dauerhaft, flüchtig und Massenspeicher."
        ],
        commonMistakes: [
          "SSD und RAM verwechseln.",
          "HDD als grundsätzlich falsch betrachten.",
          "Nur Kapazität betrachten und Geschwindigkeit ignorieren.",
          "SSD als Backup-Ersatz verstehen.",
          "Dauerhafte Speicherung und Auslagerung vermischen."
        ],
        importantDetails: [
          "SSD hat keine beweglichen Teile.",
          "HDD hat mechanische Teile.",
          "SSD hat meist kürzere Zugriffszeiten.",
          "HDD kann günstiger pro GB sein.",
          "Massenspeicher speichert dauerhaft.",
          "RAM ist flüchtig und für aktuelle Daten."
        ],
        confusedConcepts: [
          "SSD vs HDD.",
          "RAM vs Massenspeicher.",
          "Speicherplatz vs Arbeitsspeicher.",
          "Backup vs Speicherung.",
          "Geschwindigkeit vs Kapazität."
        ],
        vocabulary: [
          "Massenspeicher = dauerhafter Speicher.",
          "SSD = schneller Flash-Speicher ohne bewegliche Teile.",
          "HDD = magnetischer Speicher mit mechanischen Teilen.",
          "Zugriffszeit = Zeit bis Daten gefunden werden.",
          "Kapazität = speicherbare Datenmenge."
        ]
      },
      commonMistakes: [
        "Zu sagen: SSD ist Arbeitsspeicher. Das ist falsch; SSD ist Massenspeicher.",
        "Zu sagen: HDD ist immer unbrauchbar. HDD kann für große Datenmengen weiterhin sinnvoll sein.",
        "Zu glauben, dass eine SSD jedes Leistungsproblem löst. Wenn RAM oder CPU der Engpass ist, hilft SSD nur begrenzt.",
        "Backup und Massenspeicher zu verwechseln. Eine Datei auf einer SSD ist noch kein Backup.",
        "Nur die Größe des Speichers zu betrachten. Geschwindigkeit, Einsatzzweck und Kosten sind ebenfalls wichtig."
      ],
      vocabulary: [
        {
          de: "Massenspeicher",
          pt: "armazenamento permanente",
          explanation: "Speicher für große Datenmengen, der Daten dauerhaft hält.",
          example: "SSD und HDD sind Massenspeicher."
        },
        {
          de: "SSD",
          pt: "SSD",
          explanation: "Schneller Massenspeicher auf Basis von Flash-Speicher.",
          example: "Eine SSD verkürzt oft die Startzeit eines Computers."
        },
        {
          de: "HDD",
          pt: "HDD / disco rígido",
          explanation: "Magnetischer Massenspeicher mit mechanischen Teilen.",
          example: "Eine HDD kann für große Archivdaten genutzt werden."
        },
        {
          de: "Festplatte",
          pt: "disco rígido / armazenamento",
          explanation: "Umgangssprachlich oft für HDD, manchmal allgemein für Speicherlaufwerk.",
          example: "Die Festplatte hat eine Kapazität von 2 TB."
        },
        {
          de: "Zugriffszeit",
          pt: "tempo de acesso",
          explanation: "Zeit, die benötigt wird, um Daten zu finden und bereitzustellen.",
          example: "SSDs haben eine kurze Zugriffszeit."
        },
        {
          de: "Kapazität",
          pt: "capacidade",
          explanation: "Menge an Daten, die gespeichert werden kann.",
          example: "Die SSD hat eine Kapazität von 1 TB."
        },
        {
          de: "dauerhaft",
          pt: "permanente",
          explanation: "Daten bleiben auch ohne Strom erhalten.",
          example: "Dateien werden dauerhaft auf der SSD gespeichert."
        },
        {
          de: "mechanisch",
          pt: "mecânico",
          explanation: "Mit beweglichen physischen Teilen.",
          example: "Eine HDD arbeitet mechanisch mit rotierenden Scheiben."
        },
        {
          de: "Flash-Speicher",
          pt: "memória flash",
          explanation: "Elektronischer Speicher ohne bewegliche Teile.",
          example: "Eine SSD nutzt Flash-Speicher."
        },
        {
          de: "Datenträger",
          pt: "mídia/dispositivo de armazenamento",
          explanation: "Medium oder Gerät zum Speichern von Daten.",
          example: "Ein USB-Stick ist ein externer Datenträger."
        }
      ],
      summary: [
        "Massenspeicher speichern Daten dauerhaft. SSD und HDD sind die wichtigsten Beispiele für AP1. Auf ihnen liegen Betriebssystem, Programme und Dateien.",
        "Eine SSD nutzt Flash-Speicher und hat keine beweglichen Teile. Sie ist schnell und hat kurze Zugriffszeiten. Deshalb ist sie gut für Betriebssystem, Programme und häufig genutzte Daten.",
        "Eine HDD speichert Daten magnetisch auf rotierenden Scheiben. Sie ist mechanisch und langsamer, kann aber günstiger für große Datenmengen sein.",
        "Für AP1 ist die wichtigste Unterscheidung: RAM ist flüchtiger Arbeitsspeicher für aktuelle Daten. SSD/HDD sind dauerhafte Massenspeicher. Ein Backup ist wiederum etwas anderes als normale Speicherung."
      ],
      mindMap: {
        title: "Mindmap: SSD, HDD und Massenspeicher",
        code: "mindmap\n  root((Massenspeicher))\n    Aufgabe\n      dauerhaft speichern\n      Betriebssystem\n      Programme\n      Dateien\n    SSD\n      Flash-Speicher\n      schnell\n      keine beweglichen Teile\n      kurze Zugriffszeit\n    HDD\n      magnetisch\n      mechanisch\n      große Kapazität\n      günstiger pro GB\n    AP1 Fokus\n      RAM vs Massenspeicher\n      SSD vs HDD\n      Kapazität vs Geschwindigkeit\n      Speicher ist kein Backup"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Massenspeicher?",
            answer: "Ein Speicher, der große Datenmengen dauerhaft speichert.",
            explanation: "Dauerhaft bedeutet: Daten bleiben auch nach dem Ausschalten erhalten."
          },
          {
            question: "Nenne zwei Beispiele für Massenspeicher.",
            answer: "SSD und HDD.",
            explanation: "Auch USB-Sticks oder Speicherkarten sind Massenspeicher, aber AP1 fokussiert oft SSD und HDD."
          },
          {
            question: "Ist eine SSD flüchtig?",
            answer: "Nein.",
            explanation: "Eine SSD speichert Daten dauerhaft. RAM ist flüchtig."
          },
          {
            question: "Welche Speicherart hat bewegliche mechanische Teile: SSD oder HDD?",
            answer: "HDD.",
            explanation: "Eine HDD arbeitet mit rotierenden Scheiben und einem Schreib-/Lesekopf."
          },
          {
            question: "Welche Speicherart ist meistens schneller: SSD oder HDD?",
            answer: "SSD.",
            explanation: "SSDs haben meist kürzere Zugriffszeiten und höhere Geschwindigkeit."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen RAM und Massenspeicher.",
            answer: "RAM speichert aktuelle Daten kurzfristig und ist flüchtig. Massenspeicher speichert Daten dauerhaft.",
            explanation: "Das ist eine der wichtigsten Hardware-Unterscheidungen für AP1."
          },
          {
            question: "Warum startet ein PC mit SSD oft schneller als mit HDD?",
            answer: "Weil eine SSD kürzere Zugriffszeiten hat und Daten schneller bereitstellt.",
            explanation: "Beim Start müssen viele Dateien gelesen werden. SSDs können das schneller als HDDs."
          },
          {
            question: "Wann kann eine HDD sinnvoll sein?",
            answer: "Wenn große Datenmengen günstig gespeichert werden sollen und Geschwindigkeit weniger wichtig ist.",
            explanation: "HDDs können bei Archivdaten oder großen Speichermengen wirtschaftlich sein."
          },
          {
            question: "Warum ist eine Datei auf einer SSD noch kein Backup?",
            answer: "Weil ein Backup eine zusätzliche Sicherungskopie ist.",
            explanation: "Wenn die SSD ausfällt oder Daten gelöscht werden, ist ohne separate Kopie keine Wiederherstellung möglich."
          },
          {
            question: "Welche Kriterien helfen bei der Auswahl eines Speichers?",
            answer: "Geschwindigkeit, Kapazität, Kosten, Robustheit und Einsatzzweck.",
            explanation: "Die beste Wahl hängt von der Situation ab, nicht nur von einem einzelnen Merkmal."
          }
        ],
        ap1Style: [
          {
            question: "Ein Büro-PC mit HDD startet sehr langsam. Nennen Sie eine sinnvolle Maßnahme und begründen Sie diese.",
            answer: "Austausch der HDD durch eine SSD.",
            explanation: "Eine SSD hat kürzere Zugriffszeiten und kann Betriebssystem sowie Programme schneller laden."
          },
          {
            question: "Ein Unternehmen möchte 20 TB alte Projektdaten speichern, auf die selten zugegriffen wird. SSDs sind deutlich teurer. Welche Speicherart kann sinnvoll sein? Begründen Sie.",
            answer: "HDDs können sinnvoll sein.",
            explanation: "Bei selten genutzten großen Datenmengen sind Kapazität und Kosten oft wichtiger als maximale Geschwindigkeit."
          },
          {
            question: "Ein Azubi sagt: Der PC braucht mehr SSD, weil der Arbeitsspeicher voll ist. Erklären Sie den Fehler.",
            answer: "Er verwechselt RAM mit Massenspeicher.",
            explanation: "Wenn der Arbeitsspeicher voll ist, geht es um RAM. Mehr SSD-Speicherplatz ersetzt nicht automatisch RAM."
          },
          {
            question: "Ordnen Sie zu: RAM, SSD, HDD. Welche Speicherart ist flüchtig, welche ist schnell und dauerhaft, welche ist mechanisch und dauerhaft?",
            answer: "RAM ist flüchtig. SSD ist schnell und dauerhaft. HDD ist mechanisch und dauerhaft.",
            explanation: "Diese Zuordnung prüft die Grundunterschiede der Speicherarten."
          },
          {
            question: "Ein Notebook soll mobil genutzt werden. Warum kann eine SSD gegenüber einer HDD vorteilhaft sein?",
            answer: "Eine SSD hat keine beweglichen Teile und ist robuster gegen Erschütterungen.",
            explanation: "Bei mobilen Geräten sind Robustheit, Geschwindigkeit und Energieeffizienz wichtige Vorteile von SSDs."
          }
        ]
      },
      related: {
        previous: "RAM / Arbeitsspeicher",
        next: "Mainboard"
      },
      revisionChecklist: [
        "Ich kann erklären, was Massenspeicher ist.",
        "Ich kann SSD und HDD unterscheiden.",
        "Ich kann RAM und Massenspeicher unterscheiden.",
        "Ich verstehe Zugriffszeit und Kapazität auf AP1-Niveau.",
        "Ich kann passende Speicherarten für einfache Szenarien auswählen.",
        "Ich weiß, dass normale Speicherung kein Backup ersetzt.",
        "Ich kann AP1-Fragen zu SSD, HDD und Massenspeicher beantworten."
      ]
    }
  },
  {
    id: "mainboard",
    title: "Mainboard",
    description: "Das Mainboard ist die Hauptplatine eines Computers und verbindet CPU, RAM, Massenspeicher, Erweiterungskarten und Anschlüsse.",
    text: [
      "Das Mainboard ist die zentrale Platine im Computer. Viele Komponenten sind direkt oder indirekt mit dem Mainboard verbunden.",
      "Für die AP1 musst du verstehen, dass das Mainboard Komponenten verbindet und dass Kompatibilität wichtig ist: CPU-Sockel, RAM-Typ, Anschlüsse und Erweiterungssteckplätze müssen passen."
    ],
    ihk: "Wichtig für AP1: Mainboard verbindet Komponenten. Achte auf Sockel, RAM-Steckplätze, Chipsatz, Anschlüsse, Erweiterungssteckplätze und Kompatibilität.",
    summary: "Mainboard é a placa principal. Ela conecta CPU, RAM, SSD/HDD, GPU, periféricos e fornece interfaces. Compatibilidade é o ponto central para AP1.",
    example: "Eine neue CPU passt nicht in jedes Mainboard. Der Sockel und der Chipsatz müssen kompatibel sein.",
    exercises: [
      {
        question: "Was ist die Aufgabe des Mainboards?",
        answer: "Das Mainboard verbindet die wichtigsten Komponenten eines Computers."
      }
    ],
    studyTime: "60-75 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "60-75 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Das Mainboard ist für die AP1 wichtig, weil es die Verbindung zwischen den Hardware-Komponenten erklärt. Ohne Mainboard können CPU, RAM, Massenspeicher und Peripherie nicht sinnvoll zusammenarbeiten.",
          "Die IHK fragt beim Mainboard selten sehr tiefe Elektronikdetails. Häufiger geht es um Funktion, Anschlüsse, Erweiterungssteckplätze und Kompatibilität.",
          "Português de apoio: a placa-mãe é importante porque define o que pode ser conectado e quais componentes são compatíveis."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Mainboard is.",
        "After this chapter the student will be able to describe the role of the Mainboard in a computer.",
        "After this chapter the student will be able to explain CPU socket, RAM slots and expansion slots at AP1 level.",
        "After this chapter the student will be able to understand why compatibility matters.",
        "After this chapter the student will be able to identify common ports and connectors.",
        "After this chapter the student will be able to solve AP1-style questions about Mainboard compatibility."
      ],
      introduction: [
        "Ein Computer besteht aus mehreren Komponenten: CPU, RAM, SSD, Netzteil, GPU und Peripheriegeräte. Diese Teile müssen miteinander kommunizieren.",
        "Das Mainboard ist die Hauptplatine, auf der viele dieser Komponenten sitzen oder angeschlossen werden. Man kann es als Verbindungssystem des Computers verstehen.",
        "Für Anfänger ist wichtig: Das Mainboard macht den Computer nicht allein schnell. Aber es entscheidet, welche Komponenten eingebaut werden können und wie sie verbunden sind.",
        "In AP1-Aufgaben kann es zum Beispiel darum gehen, warum eine CPU nicht auf ein Mainboard passt oder welche Anschlüsse für Geräte gebraucht werden."
      ],
      explanation: [
        {
          title: "Was ist ein Mainboard?",
          paragraphs: [
            "Das Mainboard ist die Hauptplatine eines Computers. Eine Platine ist eine feste Platte mit elektronischen Leitungen und Anschlüssen.",
            "Auf dem Mainboard befinden sich wichtige Steckplätze und Anschlüsse. Die CPU wird in den CPU-Sockel eingesetzt. RAM-Module werden in RAM-Steckplätze gesteckt. SSDs, Grafikkarten und andere Geräte werden über passende Anschlüsse verbunden.",
            "Das Mainboard verbindet Komponenten, damit Daten und Steuersignale zwischen ihnen fließen können."
          ]
        },
        {
          title: "Mainboard als Verbindungssystem",
          paragraphs: [
            "Die CPU verarbeitet Befehle. Der RAM hält aktuelle Daten bereit. Die SSD speichert Daten dauerhaft. Diese Komponenten müssen miteinander kommunizieren.",
            "Das Mainboard stellt dafür elektrische Verbindungen und Schnittstellen bereit.",
            "Wenn man sagt, das Mainboard ist die Grundlage des Systems, meint man: Viele zentrale Komponenten sind hier verbunden."
          ]
        },
        {
          title: "CPU-Sockel",
          paragraphs: [
            "Der CPU-Sockel ist der Platz auf dem Mainboard, in den die CPU eingesetzt wird.",
            "Nicht jede CPU passt in jeden Sockel. CPU und Mainboard müssen kompatibel sein.",
            "Für AP1 reicht: Der Sockel ist ein wichtiger Kompatibilitätsfaktor. Wenn Sockel und CPU nicht passen, kann die CPU nicht verwendet werden."
          ]
        },
        {
          title: "Chipsatz",
          paragraphs: [
            "Der Chipsatz ist ein wichtiger Bestandteil des Mainboards. Er unterstützt die Kommunikation zwischen CPU, Speicher, Erweiterungen und Anschlüssen.",
            "Der Chipsatz beeinflusst, welche Funktionen ein Mainboard unterstützt. Zum Beispiel können Anzahl und Art von Anschlüssen oder unterstützte CPU-Generationen davon abhängen.",
            "Für AP1 musst du den Chipsatz nicht tief technisch erklären. Wichtig ist: Er gehört zur Mainboard-Funktionalität und beeinflusst Kompatibilität und Ausstattung."
          ]
        },
        {
          title: "RAM-Steckplätze",
          paragraphs: [
            "RAM-Module werden in RAM-Steckplätze eingesetzt. Diese Steckplätze unterstützen bestimmte RAM-Typen, zum Beispiel DDR4 oder DDR5.",
            "DDR4-RAM passt nicht einfach in jedes DDR5-Mainboard. Der RAM-Typ muss zum Mainboard passen.",
            "Auch die maximale RAM-Kapazität hängt vom Mainboard ab."
          ]
        },
        {
          title: "Erweiterungssteckplätze",
          paragraphs: [
            "Erweiterungssteckplätze erlauben zusätzliche Komponenten. Ein häufiges Beispiel ist PCIe für Grafikkarten, Netzwerkkarten oder andere Erweiterungskarten.",
            "Nicht jeder Computer braucht viele Erweiterungskarten. Ein Büro-PC kommt oft mit wenigen Erweiterungen aus. Ein leistungsstarker Desktop kann eine dedizierte Grafikkarte nutzen.",
            "Für AP1 ist wichtig: Erweiterungssteckplätze erweitern die Funktion eines Computers."
          ]
        },
        {
          title: "Anschlüsse und Schnittstellen",
          paragraphs: [
            "Mainboards bieten interne und externe Anschlüsse. Interne Anschlüsse verbinden Komponenten im Gehäuse. Externe Anschlüsse verbinden Geräte außerhalb des Computers.",
            "Beispiele für externe Anschlüsse sind USB, Netzwerkanschluss, Audioanschlüsse, HDMI oder DisplayPort, je nach Mainboard und System.",
            "Beispiele für interne Anschlüsse sind Anschlüsse für SSDs, Lüfter, Stromversorgung oder Front-Panel-Anschlüsse."
          ]
        },
        {
          title: "Formfaktor",
          paragraphs: [
            "Der Formfaktor beschreibt Größe und Bauform des Mainboards. Beispiele sind ATX, Micro-ATX oder Mini-ITX.",
            "Der Formfaktor muss zum Gehäuse passen. Ein großes Mainboard passt nicht in jedes kleine Gehäuse.",
            "Für AP1 ist die Grundidee wichtig: Auch die physische Größe und Bauform sind Kompatibilitätsfaktoren."
          ]
        },
        {
          title: "Warum Kompatibilität wichtig ist",
          paragraphs: [
            "Beim Zusammenstellen oder Aufrüsten eines PCs muss man prüfen, ob Komponenten zusammenpassen.",
            "Eine CPU braucht den passenden Sockel. RAM braucht den passenden RAM-Typ. Eine SSD braucht den passenden Anschluss. Das Netzteil braucht passende Stromanschlüsse.",
            "AP1-Aufgaben können solche Situationen beschreiben und fragen, warum ein Teil nicht kompatibel ist oder was geprüft werden muss."
          ]
        }
      ],
      realWorldExamples: [
        "Eine Firma möchte alte PCs aufrüsten. Neue CPUs können nicht einfach eingebaut werden, weil der CPU-Sockel der alten Mainboards nicht passt.",
        "Ein Azubi bestellt DDR5-RAM, aber das vorhandene Mainboard unterstützt nur DDR4. Der RAM ist nicht kompatibel.",
        "Ein kleines Gehäuse wird für einen kompakten Arbeitsplatz-PC gewählt. Deshalb muss ein passender Mainboard-Formfaktor gewählt werden.",
        "Eine zusätzliche Netzwerkkarte soll eingebaut werden. Dafür muss ein freier Erweiterungssteckplatz vorhanden sein."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: CPU passt nicht",
          paragraphs: [
            "Ein Unternehmen möchte eine neue CPU in einen vorhandenen PC einbauen. Nach Prüfung stellt sich heraus: Der Sockel des Mainboards ist nicht kompatibel.",
            "Die CPU kann deshalb nicht verwendet werden, auch wenn sie technisch leistungsstark ist."
          ],
          steps: [
            "CPU-Modell prüfen.",
            "CPU-Sockel prüfen.",
            "Mainboard-Modell prüfen.",
            "Kompatibilitätsliste oder technische Daten prüfen.",
            "Entscheiden: anderes Mainboard oder andere CPU wählen."
          ]
        },
        {
          title: "Szenario 2: RAM-Erweiterung",
          paragraphs: [
            "Ein PC soll von 8 GB auf 16 GB RAM erweitert werden. Vor dem Kauf muss geprüft werden, welcher RAM-Typ unterstützt wird und ob freie RAM-Steckplätze vorhanden sind.",
            "Wenn der falsche RAM-Typ gekauft wird, kann das Modul nicht eingesetzt oder nicht genutzt werden."
          ],
          steps: [
            "Mainboard-Daten prüfen.",
            "Unterstützten RAM-Typ feststellen.",
            "Freie RAM-Steckplätze prüfen.",
            "Maximale RAM-Kapazität prüfen.",
            "Passendes RAM-Modul auswählen."
          ]
        }
      ],
      diagrams: [
        {
          title: "Mainboard verbindet Komponenten",
          code: "flowchart TD\n  MB[Mainboard]\n  CPU[CPU] --- MB\n  RAM[RAM-Steckplätze] --- MB\n  SSD[SSD/HDD Anschlüsse] --- MB\n  GPU[PCIe / Grafikkarte] --- MB\n  USB[USB / Peripherie] --- MB\n  NET[Netzwerkanschluss] --- MB\n  PSU[Netzteil Stromanschlüsse] --> MB"
        },
        {
          title: "Kompatibilität prüfen",
          code: "flowchart TD\n  A[Neue Komponente kaufen] --> B{Passt zum Mainboard?}\n  B -->|CPU| C[Sockel und Chipsatz prüfen]\n  B -->|RAM| D[DDR-Typ und Kapazität prüfen]\n  B -->|SSD| E[Anschluss und Format prüfen]\n  B -->|GPU| F[PCIe-Steckplatz und Strom prüfen]\n  C --> G[Kompatible Auswahl]\n  D --> G\n  E --> G\n  F --> G"
        }
      ],
      ihkFocus: {
        appears: [
          "Funktion des Mainboards als Verbindung zwischen Komponenten.",
          "Kompatibilitätsfragen zu CPU, RAM und Anschlüssen.",
          "Begriffe wie Sockel, Steckplatz, Chipsatz, Schnittstelle und Formfaktor.",
          "Zuordnung interner und externer Anschlüsse.",
          "Szenarien zu Aufrüstung oder Hardware-Auswahl."
        ],
        commonMistakes: [
          "Mainboard als Komponente zu beschreiben, die selbst Programme ausführt.",
          "CPU-Kompatibilität ohne Sockel zu beachten.",
          "RAM-Typen zu ignorieren.",
          "Formfaktor und Gehäusekompatibilität zu vergessen.",
          "Anschluss und Gerätetyp zu verwechseln."
        ],
        importantDetails: [
          "Das Mainboard verbindet Komponenten.",
          "Der CPU-Sockel muss zur CPU passen.",
          "RAM-Typ und Mainboard müssen kompatibel sein.",
          "Erweiterungssteckplätze ermöglichen zusätzliche Karten.",
          "Formfaktor muss zum Gehäuse passen."
        ],
        confusedConcepts: [
          "Mainboard vs CPU.",
          "Sockel vs Steckplatz.",
          "Anschluss vs Schnittstelle.",
          "Formfaktor vs Leistung.",
          "Chipsatz vs Prozessor."
        ],
        vocabulary: [
          "Mainboard = Hauptplatine.",
          "Sockel = Platz für die CPU.",
          "Steckplatz = Platz für Module oder Erweiterungskarten.",
          "Schnittstelle = Verbindungspunkt oder Kommunikationsstandard.",
          "Formfaktor = Größe und Bauform."
        ]
      },
      commonMistakes: [
        "Zu glauben, dass jede CPU in jedes Mainboard passt. Der Sockel muss kompatibel sein.",
        "Zu glauben, dass jeder RAM auf jedem Mainboard funktioniert. Der RAM-Typ muss unterstützt werden.",
        "Das Mainboard als direkte Recheneinheit zu beschreiben. Rechnen macht die CPU.",
        "Beim Aufrüsten nur Leistung zu betrachten und Kompatibilität zu vergessen.",
        "Formfaktor zu ignorieren. Ein Mainboard muss auch physisch in das Gehäuse passen."
      ],
      vocabulary: [
        {
          de: "Mainboard",
          pt: "placa-mãe",
          explanation: "Hauptplatine, die zentrale Komponenten verbindet.",
          example: "CPU, RAM und SSD sind mit dem Mainboard verbunden."
        },
        {
          de: "Hauptplatine",
          pt: "placa principal",
          explanation: "Deutscher Begriff für Mainboard.",
          example: "Die Hauptplatine enthält viele Anschlüsse."
        },
        {
          de: "Sockel",
          pt: "soquete",
          explanation: "Platz auf dem Mainboard für die CPU.",
          example: "Die CPU passt nur in einen kompatiblen Sockel."
        },
        {
          de: "Chipsatz",
          pt: "chipset",
          explanation: "Mainboard-Komponente, die Funktionen und Kommunikation unterstützt.",
          example: "Der Chipsatz beeinflusst, welche Funktionen das Mainboard bietet."
        },
        {
          de: "Steckplatz",
          pt: "slot",
          explanation: "Platz zum Einsetzen von Modulen oder Erweiterungskarten.",
          example: "RAM-Module werden in Steckplätze eingesetzt."
        },
        {
          de: "Schnittstelle",
          pt: "interface",
          explanation: "Verbindung oder Standard für Kommunikation zwischen Komponenten.",
          example: "USB ist eine Schnittstelle für Peripheriegeräte."
        },
        {
          de: "Anschluss",
          pt: "conector / porta",
          explanation: "Physischer Verbindungspunkt für Kabel oder Geräte.",
          example: "Der Netzwerkanschluss verbindet den PC mit dem LAN."
        },
        {
          de: "Erweiterungskarte",
          pt: "placa de expansão",
          explanation: "Zusätzliche Karte, die eine Funktion erweitert.",
          example: "Eine Netzwerkkarte kann als Erweiterungskarte eingebaut werden."
        },
        {
          de: "Formfaktor",
          pt: "formato físico",
          explanation: "Größe und Bauform eines Mainboards.",
          example: "Der Formfaktor muss zum Gehäuse passen."
        },
        {
          de: "Kompatibilität",
          pt: "compatibilidade",
          explanation: "Fähigkeit von Komponenten, zusammen zu funktionieren.",
          example: "Vor dem Kauf muss die Kompatibilität geprüft werden."
        }
      ],
      summary: [
        "Das Mainboard ist die Hauptplatine eines Computers. Es verbindet zentrale Komponenten wie CPU, RAM, Massenspeicher, Erweiterungskarten und Anschlüsse.",
        "Für AP1 ist besonders wichtig: Das Mainboard verarbeitet nicht selbst Programme. Es stellt Verbindungen, Steckplätze und Schnittstellen bereit.",
        "Kompatibilität ist der wichtigste Lernpunkt. CPU-Sockel, RAM-Typ, Erweiterungssteckplätze, Anschlüsse und Formfaktor müssen passen.",
        "Português de apoio: a placa-mãe não é a CPU. Ela conecta e define compatibilidade. Antes de comprar peças, verifique soquete, tipo de RAM, slots e conectores."
      ],
      mindMap: {
        title: "Mindmap: Mainboard",
        code: "mindmap\n  root((Mainboard))\n    Aufgabe\n      Komponenten verbinden\n      Schnittstellen bereitstellen\n      Kommunikation ermöglichen\n    Wichtige Teile\n      CPU-Sockel\n      RAM-Steckplätze\n      Chipsatz\n      PCIe\n      Anschlüsse\n    Kompatibilität\n      CPU passt zum Sockel\n      RAM-Typ passt\n      Formfaktor passt\n      Anschlüsse vorhanden\n    AP1 Fokus\n      Funktion erklären\n      Aufrüstung prüfen\n      Begriffe kennen"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Mainboard?",
            answer: "Das Mainboard ist die Hauptplatine eines Computers.",
            explanation: "Es verbindet zentrale Hardware-Komponenten miteinander."
          },
          {
            question: "Welche Komponente wird in den CPU-Sockel eingesetzt?",
            answer: "Die CPU.",
            explanation: "Der Sockel ist der Platz auf dem Mainboard für den Prozessor."
          },
          {
            question: "Nenne zwei Komponenten, die mit dem Mainboard verbunden sind.",
            answer: "CPU und RAM.",
            explanation: "Auch SSD, GPU, Netzteilanschlüsse und Peripherieanschlüsse sind möglich."
          },
          {
            question: "Was bedeutet Kompatibilität?",
            answer: "Komponenten passen technisch zusammen und können miteinander funktionieren.",
            explanation: "Zum Beispiel muss eine CPU zum Sockel des Mainboards passen."
          },
          {
            question: "Ist das Mainboard die Komponente, die Programmbefehle ausführt?",
            answer: "Nein.",
            explanation: "Programmbefehle werden von der CPU ausgeführt."
          }
        ],
        intermediate: [
          {
            question: "Warum kann man nicht jede CPU in jedes Mainboard einsetzen?",
            answer: "Weil CPU und Mainboard denselben passenden Sockel und unterstützte Plattform brauchen.",
            explanation: "Der CPU-Sockel ist ein zentraler Kompatibilitätsfaktor."
          },
          {
            question: "Warum muss man beim RAM-Kauf das Mainboard prüfen?",
            answer: "Weil das Mainboard nur bestimmte RAM-Typen und Kapazitäten unterstützt.",
            explanation: "DDR4 und DDR5 sind zum Beispiel nicht beliebig austauschbar."
          },
          {
            question: "Was ist ein Erweiterungssteckplatz?",
            answer: "Ein Steckplatz für zusätzliche Karten, zum Beispiel Grafikkarte oder Netzwerkkarte.",
            explanation: "Erweiterungssteckplätze erweitern die Funktionen des Computers."
          },
          {
            question: "Warum ist der Formfaktor wichtig?",
            answer: "Weil das Mainboard physisch in das Gehäuse passen muss.",
            explanation: "Ein großes ATX-Mainboard passt nicht in jedes kleine Gehäuse."
          },
          {
            question: "Erkläre Mainboard und CPU im Unterschied.",
            answer: "Das Mainboard verbindet Komponenten. Die CPU verarbeitet Befehle.",
            explanation: "Diese Rollen dürfen in AP1 nicht verwechselt werden."
          }
        ],
        ap1Style: [
          {
            question: "Ein Unternehmen möchte eine neue CPU in einen alten PC einbauen. Die CPU passt nicht in den Sockel des Mainboards. Erklären Sie das Problem.",
            answer: "CPU und Mainboard sind nicht kompatibel.",
            explanation: "Der CPU-Sockel muss zur CPU passen. Wenn der Sockel nicht passt, kann die CPU nicht eingebaut werden."
          },
          {
            question: "Ein Azubi kauft DDR5-RAM für einen PC, dessen Mainboard nur DDR4 unterstützt. Beurteilen Sie die Situation.",
            answer: "Der RAM ist nicht kompatibel.",
            explanation: "Das Mainboard muss den RAM-Typ unterstützen. DDR5 kann nicht einfach in DDR4-Steckplätze eingesetzt werden."
          },
          {
            question: "Nennen Sie zwei Kriterien, die vor dem Kauf eines neuen Mainboards geprüft werden sollten.",
            answer: "CPU-Sockel und RAM-Typ.",
            explanation: "Auch Formfaktor, Anschlüsse, Erweiterungssteckplätze und Chipsatz können wichtig sein."
          },
          {
            question: "Ein kleiner Büro-PC soll in ein sehr kompaktes Gehäuse eingebaut werden. Warum ist der Formfaktor relevant?",
            answer: "Der Formfaktor bestimmt Größe und Bauform des Mainboards.",
            explanation: "Das Mainboard muss physisch in das Gehäuse passen."
          },
          {
            question: "Ein PC soll eine zusätzliche Netzwerkkarte erhalten. Was muss am Mainboard geprüft werden?",
            answer: "Ob ein passender freier Erweiterungssteckplatz vorhanden ist.",
            explanation: "Ohne passenden Steckplatz kann die Karte nicht eingebaut werden."
          }
        ]
      },
      related: {
        previous: "Speicher: SSD, HDD und Massenspeicher",
        next: "Netzteil"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Mainboard ist.",
        "Ich kann Mainboard und CPU unterscheiden.",
        "Ich verstehe CPU-Sockel, RAM-Steckplätze und Erweiterungssteckplätze.",
        "Ich kann erklären, warum Kompatibilität wichtig ist.",
        "Ich kenne wichtige Mainboard-Anschlüsse und Schnittstellen.",
        "Ich kann einfache AP1-Szenarien zur Mainboard-Kompatibilität lösen.",
        "Ich kenne wichtige deutsche Mainboard-Begriffe."
      ]
    }
  },
  {
    id: "netzteil",
    title: "Netzteil",
    description: "Das Netzteil versorgt den Computer mit passender und stabiler elektrischer Energie.",
    text: [
      "Das Netzteil versorgt die Komponenten eines Computers mit Strom. Es wandelt die Spannung aus der Steckdose in Spannungen um, die PC-Komponenten nutzen können.",
      "Für die AP1 musst du verstehen, warum Leistung, Effizienz, Stabilität und passende Anschlüsse wichtig sind."
    ],
    ihk: "Wichtig für AP1: Leistung in Watt, stabile Stromversorgung, Effizienz und passende Anschlüsse. Ein zu schwaches oder schlechtes Netzteil kann Probleme verursachen.",
    summary: "Netzteil é a fonte de alimentação. Ela fornece energia adequada e estável para os componentes. Potência, eficiência e conectores precisam combinar com o sistema.",
    example: "Eine leistungsstarke Grafikkarte kann ein stärkeres Netzteil und zusätzliche PCIe-Stromanschlüsse benötigen.",
    exercises: [
      {
        question: "Welche Aufgabe hat ein Netzteil?",
        answer: "Es versorgt die Computerkomponenten mit passender elektrischer Energie."
      }
    ],
    studyTime: "60-75 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "60-75 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Das Netzteil ist für AP1 wichtig, weil es eine Grundkomponente eines PCs ist und oft bei Hardware-Auswahl oder Aufrüstung eine Rolle spielt.",
          "Die IHK fragt beim Netzteil normalerweise keine tiefe Elektrotechnik. Wichtig sind Funktion, Leistung, Effizienz, Stabilität und passende Anschlüsse.",
          "Português de apoio: a fonte não deixa o computador mais rápido diretamente, mas precisa fornecer energia suficiente e estável. Uma fonte inadequada pode causar instabilidade."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Netzteil is.",
        "After this chapter the student will be able to describe why a computer needs a power supply.",
        "After this chapter the student will be able to explain Leistung in Watt at AP1 level.",
        "After this chapter the student will be able to explain why efficiency matters.",
        "After this chapter the student will be able to identify why connectors and compatibility are important.",
        "After this chapter the student will be able to solve AP1-style scenarios about power supply selection."
      ],
      introduction: [
        "Ein Computer braucht elektrische Energie. Diese Energie kommt aus der Steckdose, aber PC-Komponenten können die Spannung aus der Steckdose nicht direkt nutzen.",
        "Das Netzteil übernimmt diese Aufgabe. Es wandelt die elektrische Energie um und verteilt sie an Mainboard, CPU, Laufwerke, Lüfter und manchmal Grafikkarten.",
        "Ein Netzteil ist nicht die Komponente, die Programme schneller ausführt. Aber ohne ausreichende und stabile Stromversorgung kann ein Computer nicht zuverlässig funktionieren.",
        "Für AP1 ist wichtig: Ein Netzteil muss zum System passen. Besonders Leistung in Watt, Effizienz und Anschlüsse sind relevant."
      ],
      explanation: [
        {
          title: "Was ist ein Netzteil?",
          paragraphs: [
            "Das Netzteil ist die Stromversorgung eines Computers. Auf Englisch heißt es Power Supply Unit, kurz PSU.",
            "Es nimmt elektrische Energie aus der Steckdose auf und wandelt sie in Spannungen um, die PC-Komponenten verwenden können.",
            "Das Netzteil versorgt unter anderem Mainboard, CPU, Speicherlaufwerke, Lüfter und Erweiterungskarten."
          ]
        },
        {
          title: "Warum braucht der Computer ein Netzteil?",
          paragraphs: [
            "Die Steckdose liefert Netzspannung. PC-Komponenten benötigen aber bestimmte niedrigere Spannungen und stabile Versorgung.",
            "Das Netzteil stellt diese Versorgung bereit. Es verteilt Strom über verschiedene Kabel und Anschlüsse.",
            "Ohne Netzteil startet der Computer nicht. Mit einem ungeeigneten Netzteil kann der Computer instabil laufen oder sich ausschalten."
          ]
        },
        {
          title: "Leistung in Watt",
          paragraphs: [
            "Die Leistung eines Netzteils wird in Watt angegeben. Watt beschreibt, wie viel elektrische Leistung das Netzteil bereitstellen kann.",
            "Ein Computer mit sparsamen Komponenten braucht weniger Leistung. Ein Computer mit starker CPU und leistungsstarker GPU braucht mehr Leistung.",
            "Für AP1 musst du nicht komplizierte Leistungsberechnungen durchführen. Du solltest aber verstehen: Das Netzteil muss genug Leistung für alle Komponenten liefern."
          ]
        },
        {
          title: "Warum ein zu schwaches Netzteil problematisch ist",
          paragraphs: [
            "Wenn ein Netzteil zu wenig Leistung liefert, kann das System instabil werden. Mögliche Symptome sind Abstürze, Neustarts oder Probleme unter Last.",
            "Unter Last bedeutet: Komponenten arbeiten stark, zum Beispiel beim Spielen, Rendern, Kompilieren oder bei rechenintensiven Aufgaben.",
            "Ein Netzteil sollte nicht dauerhaft am absoluten Limit betrieben werden. Eine passende Reserve ist sinnvoll."
          ]
        },
        {
          title: "Effizienz",
          paragraphs: [
            "Effizienz beschreibt, wie gut das Netzteil elektrische Energie nutzt. Ein Teil der Energie geht immer als Wärme verloren.",
            "Ein effizienteres Netzteil verschwendet weniger Energie und erzeugt oft weniger Wärme.",
            "In der Praxis sieht man häufig Effizienz-Zertifizierungen wie 80 PLUS. Für AP1 reicht: Höhere Effizienz bedeutet weniger Energieverlust."
          ]
        },
        {
          title: "Stabile Stromversorgung",
          paragraphs: [
            "Ein gutes Netzteil liefert nicht nur genug Leistung, sondern auch stabile Spannungen.",
            "Instabile Stromversorgung kann zu schwer zu findenden Fehlern führen. Ein PC kann sich plötzlich ausschalten oder unter Last abstürzen.",
            "Für Unternehmen ist Zuverlässigkeit wichtig. Deshalb sollte man beim Netzteil nicht nur nach dem billigsten Modell entscheiden."
          ]
        },
        {
          title: "Anschlüsse und Kompatibilität",
          paragraphs: [
            "Ein Netzteil braucht passende Anschlüsse. Das Mainboard braucht Stromanschlüsse. Laufwerke brauchen Strom. Leistungsstarke Grafikkarten können zusätzliche PCIe-Stromanschlüsse brauchen.",
            "Wenn die benötigten Anschlüsse fehlen, kann die Hardware nicht korrekt angeschlossen werden.",
            "Bei einer Aufrüstung, zum Beispiel einer neuen GPU, muss geprüft werden, ob Netzteilleistung und Anschlüsse ausreichen."
          ]
        },
        {
          title: "Netzteil und Sicherheit",
          paragraphs: [
            "Das Netzteil arbeitet mit elektrischer Energie. Deshalb sind Qualität und Schutzmechanismen wichtig.",
            "Für AP1 sind Details wie Schutzschaltungen nicht tief nötig. Aber die Grundidee ist wichtig: Ein Netzteil soll Komponenten zuverlässig und sicher versorgen.",
            "Ein schlechtes Netzteil kann ein Risiko für Stabilität und Hardware sein."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Büro-PC mit integrierter Grafik braucht meist kein sehr starkes Netzteil, weil die Komponenten wenig Leistung benötigen.",
        "Ein Entwickler-PC mit leistungsstarker CPU und dedizierter GPU braucht ein Netzteil mit ausreichender Leistung und passenden Anschlüssen.",
        "Ein PC stürzt nur unter hoher Last ab. Eine mögliche Ursache kann ein zu schwaches oder defektes Netzteil sein.",
        "Ein Unternehmen achtet bei vielen PCs auf Effizienz, weil Energieverbrauch und Wärmeentwicklung langfristig Kosten verursachen."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: GPU-Aufrüstung",
          paragraphs: [
            "Ein PC soll eine neue leistungsstarke Grafikkarte bekommen. Vor dem Kauf muss geprüft werden, ob das Netzteil genug Leistung hat und passende PCIe-Stromanschlüsse bietet.",
            "Wenn die Anschlüsse fehlen oder die Leistung zu niedrig ist, ist die Aufrüstung nicht sinnvoll ohne Netzteilwechsel."
          ],
          steps: [
            "Leistungsbedarf der neuen GPU prüfen.",
            "Leistung des vorhandenen Netzteils in Watt prüfen.",
            "Passende Stromanschlüsse prüfen.",
            "Reserve für restliche Komponenten berücksichtigen.",
            "Entscheiden: vorhandenes Netzteil nutzen oder ersetzen."
          ]
        },
        {
          title: "Szenario 2: PC stürzt unter Last ab",
          paragraphs: [
            "Ein PC funktioniert im Leerlauf normal, stürzt aber bei rechenintensiven Aufgaben ab. CPU und GPU werden dabei stark belastet.",
            "Eine mögliche Ursache ist die Stromversorgung. Das Netzteil könnte zu schwach oder defekt sein."
          ],
          steps: [
            "Symptom beobachten: Absturz unter Last.",
            "Temperaturen prüfen, um Überhitzung auszuschließen.",
            "Leistungsbedarf der Komponenten prüfen.",
            "Netzteil-Leistung und Qualität prüfen.",
            "Netzteil als mögliche Ursache bewerten."
          ]
        }
      ],
      diagrams: [
        {
          title: "Netzteil versorgt Komponenten",
          code: "flowchart TD\n  S[Steckdose] --> PSU[Netzteil]\n  PSU --> MB[Mainboard]\n  PSU --> CPU[CPU-Stromversorgung]\n  PSU --> SSD[SSD/HDD]\n  PSU --> GPU[Grafikkarte]\n  PSU --> FAN[Lüfter]\n  MB --> RAM[RAM]\n  MB --> USB[Anschlüsse]"
        },
        {
          title: "Netzteil-Auswahl",
          code: "flowchart TD\n  A[Netzteil auswählen] --> B[Komponenten bestimmen]\n  B --> C[Leistungsbedarf schätzen]\n  C --> D[Passende Watt-Zahl wählen]\n  D --> E[Anschlüsse prüfen]\n  E --> F[Effizienz und Qualität prüfen]\n  F --> G[Geeignetes Netzteil]"
        }
      ],
      ihkFocus: {
        appears: [
          "Funktion des Netzteils.",
          "Leistung in Watt.",
          "Szenarien zu Aufrüstung und Stromversorgung.",
          "Passende Anschlüsse für Komponenten.",
          "Effizienz und Energieverlust.",
          "Instabilität durch unzureichende Stromversorgung."
        ],
        commonMistakes: [
          "Netzteil mit Stromkabel oder Steckdose gleichsetzen.",
          "Nur Watt betrachten und Anschlüsse ignorieren.",
          "Zu glauben, dass mehr Watt den PC automatisch schneller macht.",
          "Effizienz mit Leistung verwechseln.",
          "Netzteil-Probleme bei Abstürzen unter Last nicht berücksichtigen."
        ],
        importantDetails: [
          "Netzteil versorgt Komponenten mit passender Spannung.",
          "Leistung wird in Watt angegeben.",
          "Effizienz bedeutet weniger Energieverlust.",
          "Anschlüsse müssen zur Hardware passen.",
          "Zu schwache Stromversorgung kann Instabilität verursachen."
        ],
        confusedConcepts: [
          "Leistung vs Effizienz.",
          "Netzteil vs Stromkabel.",
          "Watt-Zahl vs Geschwindigkeit.",
          "Stromversorgung vs Datenverbindung.",
          "Netzteilproblem vs Überhitzung."
        ],
        vocabulary: [
          "Netzteil = Stromversorgung des Computers.",
          "Leistung = elektrische Leistung in Watt.",
          "Effizienz = Verhältnis von genutzter zu aufgenommener Energie.",
          "Anschluss = Verbindungspunkt für Stromkabel.",
          "Stabilität = zuverlässiger Betrieb ohne unerwartete Fehler."
        ]
      },
      commonMistakes: [
        "Zu sagen: Ein Netzteil mit mehr Watt macht den Computer schneller. Das ist falsch; es stellt nur mehr mögliche Leistung bereit.",
        "Beim GPU-Upgrade nur die Grafikkarte zu betrachten und Netzteilleistung oder Anschlüsse zu vergessen.",
        "Effizienz als maximale Leistung zu verstehen. Effizienz beschreibt Energieverlust, nicht direkt die maximale Watt-Zahl.",
        "Ein Netzteil dauerhaft am Limit zu betreiben. Das kann Stabilität und Lebensdauer beeinträchtigen.",
        "Abstürze unter Last nur der Software zuzuschreiben, obwohl die Stromversorgung eine mögliche Ursache sein kann."
      ],
      vocabulary: [
        {
          de: "Netzteil",
          pt: "fonte de alimentação",
          explanation: "Komponente, die den Computer mit elektrischer Energie versorgt.",
          example: "Das Netzteil versorgt Mainboard und Laufwerke mit Strom."
        },
        {
          de: "Power Supply Unit",
          pt: "unidade de fonte de alimentação",
          explanation: "Englischer Begriff für Netzteil, oft PSU abgekürzt.",
          example: "Die Power Supply Unit muss genug Leistung liefern."
        },
        {
          de: "Leistung",
          pt: "potência",
          explanation: "Elektrische Leistung, meist in Watt angegeben.",
          example: "Das Netzteil hat eine Leistung von 550 Watt."
        },
        {
          de: "Watt",
          pt: "watt",
          explanation: "Einheit für elektrische Leistung.",
          example: "Eine starke Grafikkarte kann ein Netzteil mit mehr Watt benötigen."
        },
        {
          de: "Effizienz",
          pt: "eficiência",
          explanation: "Wie gut Energie genutzt wird und wie wenig verloren geht.",
          example: "Ein effizientes Netzteil erzeugt weniger Energieverlust."
        },
        {
          de: "Spannung",
          pt: "tensão",
          explanation: "Elektrische Größe, die Komponenten in passender Form benötigen.",
          example: "Das Netzteil liefert passende Spannungen für PC-Komponenten."
        },
        {
          de: "Stromversorgung",
          pt: "alimentação elétrica",
          explanation: "Versorgung eines Geräts mit elektrischer Energie.",
          example: "Eine stabile Stromversorgung ist für zuverlässigen Betrieb wichtig."
        },
        {
          de: "Anschluss",
          pt: "conector",
          explanation: "Physischer Verbindungspunkt für Kabel.",
          example: "Die Grafikkarte benötigt einen zusätzlichen Stromanschluss."
        },
        {
          de: "unter Last",
          pt: "sob carga",
          explanation: "Zustand, in dem Komponenten stark arbeiten.",
          example: "Der PC stürzt unter Last ab."
        },
        {
          de: "Reserve",
          pt: "margem/reserva",
          explanation: "Zusätzliche verfügbare Leistung über dem Mindestbedarf.",
          example: "Eine Leistungsreserve kann für Stabilität sinnvoll sein."
        }
      ],
      summary: [
        "Das Netzteil versorgt den Computer mit elektrischer Energie. Es wandelt Strom aus der Steckdose in passende Spannungen für PC-Komponenten um.",
        "Wichtige AP1-Begriffe sind Leistung in Watt, Effizienz, Anschlüsse, stabile Stromversorgung und Kompatibilität.",
        "Ein Netzteil macht den Computer nicht automatisch schneller. Es muss aber genug Leistung liefern. Ein zu schwaches oder ungeeignetes Netzteil kann zu Abstürzen oder Instabilität führen.",
        "Beim Aufrüsten, besonders bei einer leistungsstarken GPU, müssen Netzteilleistung und Anschlüsse geprüft werden. Effizienz bedeutet weniger Energieverlust, nicht automatisch mehr Geschwindigkeit."
      ],
      mindMap: {
        title: "Mindmap: Netzteil",
        code: "mindmap\n  root((Netzteil))\n    Aufgabe\n      Stromversorgung\n      Spannung umwandeln\n      Komponenten versorgen\n    Kriterien\n      Leistung in Watt\n      Effizienz\n      Anschlüsse\n      Stabilität\n    Szenarien\n      GPU-Aufrüstung\n      Absturz unter Last\n      Büro-PC\n      Entwickler-PC\n    AP1 Fokus\n      Funktion erklären\n      Watt verstehen\n      Effizienz unterscheiden\n      Kompatibilität prüfen"
      },
      exercises: {
        easy: [
          {
            question: "Welche Aufgabe hat ein Netzteil?",
            answer: "Es versorgt die Computerkomponenten mit elektrischer Energie.",
            explanation: "Das Netzteil wandelt und verteilt Strom für die Komponenten."
          },
          {
            question: "In welcher Einheit wird die Leistung eines Netzteils angegeben?",
            answer: "In Watt.",
            explanation: "Watt ist die Einheit für elektrische Leistung."
          },
          {
            question: "Macht ein Netzteil mit mehr Watt den Computer automatisch schneller?",
            answer: "Nein.",
            explanation: "Mehr Watt bedeutet mehr verfügbare Leistung, aber nicht automatisch höhere Rechenleistung."
          },
          {
            question: "Warum sind Anschlüsse beim Netzteil wichtig?",
            answer: "Weil Komponenten passende Stromanschlüsse benötigen.",
            explanation: "Ohne passenden Anschluss kann eine Komponente nicht korrekt versorgt werden."
          },
          {
            question: "Was bedeutet Effizienz beim Netzteil?",
            answer: "Wie gut das Netzteil Energie nutzt und wie wenig Energie verloren geht.",
            explanation: "Weniger Energieverlust bedeutet oft weniger Wärme und geringeren Verbrauch."
          }
        ],
        intermediate: [
          {
            question: "Warum kann ein zu schwaches Netzteil Probleme verursachen?",
            answer: "Es kann die Komponenten nicht ausreichend versorgen, besonders unter Last.",
            explanation: "Mögliche Folgen sind Abstürze, Neustarts oder Instabilität."
          },
          {
            question: "Warum muss man beim Einbau einer neuen GPU das Netzteil prüfen?",
            answer: "Eine leistungsstarke GPU kann mehr Leistung und zusätzliche Stromanschlüsse benötigen.",
            explanation: "Netzteil und GPU müssen elektrisch kompatibel sein."
          },
          {
            question: "Erkläre den Unterschied zwischen Leistung und Effizienz.",
            answer: "Leistung beschreibt, wie viel elektrische Leistung bereitgestellt werden kann. Effizienz beschreibt, wie wenig Energie verloren geht.",
            explanation: "Ein Netzteil kann viel Leistung haben, aber trotzdem weniger effizient sein."
          },
          {
            question: "Warum ist eine Leistungsreserve sinnvoll?",
            answer: "Damit das Netzteil nicht dauerhaft am Limit arbeitet.",
            explanation: "Reserve kann Stabilität und Zuverlässigkeit unterstützen."
          },
          {
            question: "Nenne zwei mögliche Symptome eines Netzteilproblems.",
            answer: "Plötzliche Neustarts und Abstürze unter Last.",
            explanation: "Diese Symptome können auch andere Ursachen haben, aber Stromversorgung ist eine mögliche Ursache."
          }
        ],
        ap1Style: [
          {
            question: "Ein PC soll eine neue leistungsstarke Grafikkarte erhalten. Nennen Sie zwei Punkte, die am Netzteil geprüft werden müssen.",
            answer: "Leistung in Watt und passende Stromanschlüsse.",
            explanation: "Die GPU benötigt ausreichend elektrische Leistung und oft zusätzliche PCIe-Stromanschlüsse."
          },
          {
            question: "Ein Auszubildender sagt: Ein 1000-Watt-Netzteil macht jeden Büro-PC schneller. Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "Mehr Watt erhöht nicht automatisch die Geschwindigkeit. Ein Büro-PC nutzt nur die Leistung, die seine Komponenten benötigen."
          },
          {
            question: "Ein PC stürzt nur beim Rendern ab, im normalen Betrieb aber nicht. Nennen Sie eine mögliche Hardware-Ursache und begründen Sie.",
            answer: "Ein zu schwaches oder defektes Netzteil kann eine Ursache sein.",
            explanation: "Beim Rendern arbeiten Komponenten stärker und benötigen mehr Leistung. Wenn die Stromversorgung nicht reicht, kann das System instabil werden."
          },
          {
            question: "Erklären Sie, warum Effizienz bei vielen Büro-PCs im Unternehmen relevant sein kann.",
            answer: "Effizientere Netzteile verlieren weniger Energie und können langfristig Stromkosten und Wärmeentwicklung reduzieren.",
            explanation: "Bei vielen Geräten summieren sich Energieverbrauch und Wärme."
          },
          {
            question: "Ordnen Sie zu: Watt, Effizienz, Anschluss. Was beschreibt die Leistung, was beschreibt Energieverlust, was beschreibt die physische Verbindung?",
            answer: "Watt beschreibt Leistung. Effizienz beschreibt Energieverlust beziehungsweise Energienutzung. Anschluss beschreibt die physische Verbindung.",
            explanation: "Diese Begriffe werden in Hardware-Aufgaben häufig getrennt geprüft."
          }
        ]
      },
      related: {
        previous: "Mainboard",
        next: "GPU"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Netzteil ist.",
        "Ich weiß, warum ein Computer ein Netzteil braucht.",
        "Ich verstehe Leistung in Watt auf AP1-Niveau.",
        "Ich kann Effizienz und Leistung unterscheiden.",
        "Ich weiß, warum Anschlüsse wichtig sind.",
        "Ich kann einfache Netzteil-Probleme in AP1-Szenarien erkennen.",
        "Ich kenne wichtige deutsche Begriffe zum Netzteil."
      ]
    }
  },
  {
    id: "gpu",
    title: "GPU",
    description: "Die GPU verarbeitet Grafikdaten und kann bei bestimmten Aufgaben viele Berechnungen parallel ausführen.",
    text: [
      "GPU bedeutet Graphics Processing Unit. Auf Deutsch sagt man oft Grafikkarte oder Grafikprozessor.",
      "Für AP1 musst du verstehen, dass die GPU vor allem für Bildausgabe, Grafik, 3D-Anwendungen und mehrere Monitore wichtig ist. Außerdem musst du CPU und GPU unterscheiden können."
    ],
    ihk: "Wichtig für AP1: GPU verarbeitet Grafikdaten. Unterscheide integrierte und dedizierte GPU sowie CPU und GPU.",
    summary: "GPU é o processador gráfico. Ela cuida de gráficos, vídeo, 3D e múltiplos monitores. Pode ser integrada ou dedicada.",
    example: "Ein Büro-PC kann oft eine integrierte GPU nutzen. Ein CAD-Arbeitsplatz kann eine dedizierte Grafikkarte benötigen.",
    exercises: [
      {
        question: "Wofür ist eine GPU hauptsächlich zuständig?",
        answer: "Für die Verarbeitung und Ausgabe von Grafikdaten."
      }
    ],
    studyTime: "60-75 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "60-75 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★☆☆",
        explanation: [
          "Die GPU ist für AP1 weniger zentral als CPU, RAM oder Massenspeicher, aber sie ist trotzdem wichtig für Hardware-Verständnis und Arbeitsplatz-Auswahl.",
          "Die IHK kann fragen, welche Komponente für Grafik, mehrere Monitore oder 3D-Anwendungen relevant ist. Außerdem kann die Unterscheidung zwischen CPU und GPU geprüft werden.",
          "Português de apoio: GPU não substitui CPU. A GPU é especializada em gráficos e certas tarefas paralelas. Para trabalho de escritório simples, uma GPU integrada geralmente basta."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a GPU is.",
        "After this chapter the student will be able to distinguish CPU and GPU.",
        "After this chapter the student will be able to explain integrated and dedicated graphics.",
        "After this chapter the student will be able to identify when a dedicated GPU may be useful.",
        "After this chapter the student will be able to understand GPU relevance for monitors and graphics.",
        "After this chapter the student will be able to solve AP1-style questions about GPU basics."
      ],
      introduction: [
        "Ein Computer muss nicht nur rechnen und speichern. Er muss auch Bilder anzeigen: Fenster, Texte, Webseiten, Videos, Diagramme oder 3D-Modelle.",
        "Für diese grafische Ausgabe ist die GPU zuständig. GPU bedeutet Graphics Processing Unit. Im Deutschen hört man häufig Grafikkarte oder Grafikprozessor.",
        "Nicht jeder Computer braucht eine starke dedizierte Grafikkarte. Für Büroarbeit reicht oft eine integrierte Grafiklösung. Für CAD, 3D, Videobearbeitung oder mehrere hochauflösende Monitore kann eine stärkere GPU sinnvoll sein.",
        "Für AP1 ist wichtig: Du musst die Rolle der GPU verstehen und sie von CPU, RAM und Massenspeicher unterscheiden."
      ],
      explanation: [
        {
          title: "Was ist eine GPU?",
          paragraphs: [
            "Die GPU ist eine Verarbeitungseinheit für Grafikdaten. Sie hilft dabei, Bilder, Videos, Benutzeroberflächen und 3D-Grafiken darzustellen.",
            "Eine GPU kann viele ähnliche Berechnungen parallel ausführen. Das ist besonders nützlich für Grafik, weil sehr viele Bildpunkte gleichzeitig verarbeitet werden müssen.",
            "Für AP1 reicht: Die GPU ist vor allem für Grafikverarbeitung und Bildausgabe wichtig."
          ]
        },
        {
          title: "CPU und GPU im Unterschied",
          paragraphs: [
            "Die CPU ist der allgemeine Prozessor. Sie verarbeitet viele verschiedene Arten von Befehlen und steuert wichtige Abläufe im System.",
            "Die GPU ist spezialisierter. Sie ist besonders gut bei Grafikberechnungen und vielen parallelen Rechenoperationen.",
            "Ein häufiger Fehler ist zu denken, die GPU ersetzt die CPU. Das stimmt nicht. Beide haben unterschiedliche Aufgaben und arbeiten zusammen."
          ]
        },
        {
          title: "Integrierte GPU",
          paragraphs: [
            "Eine integrierte GPU ist in die CPU oder den Chipsatz integriert. Sie ist keine separate große Grafikkarte.",
            "Integrierte Grafik reicht oft für Büroarbeit, Web, E-Mail, einfache Videos und normale Benutzeroberflächen.",
            "Sie verbraucht meist weniger Strom und ist günstiger, aber sie ist nicht so leistungsstark wie eine dedizierte Grafikkarte."
          ]
        },
        {
          title: "Dedizierte Grafikkarte",
          paragraphs: [
            "Eine dedizierte Grafikkarte ist eine separate Erweiterungskarte. Sie wird häufig über PCIe mit dem Mainboard verbunden.",
            "Sie besitzt oft eigenen Grafikspeicher, also VRAM, und braucht manchmal zusätzliche Stromanschlüsse vom Netzteil.",
            "Dedizierte GPUs sind sinnvoll für 3D-Anwendungen, CAD, Videobearbeitung, Spiele, Simulationen oder mehrere hochauflösende Monitore."
          ]
        },
        {
          title: "Grafikspeicher / VRAM",
          paragraphs: [
            "VRAM ist spezieller Speicher für Grafikdaten. Er wird von der GPU genutzt, zum Beispiel für Texturen, Bilddaten oder 3D-Informationen.",
            "Für AP1 musst du VRAM nicht tief technisch erklären. Wichtig ist: Dedizierte Grafikkarten haben oft eigenen Grafikspeicher.",
            "VRAM ist nicht dasselbe wie normaler Arbeitsspeicher, auch wenn beide Speicherarten sind."
          ]
        },
        {
          title: "Monitore und Anschlüsse",
          paragraphs: [
            "Die GPU oder Grafikeinheit stellt Anschlüsse für Monitore bereit. Beispiele sind HDMI, DisplayPort oder ältere Anschlüsse wie VGA oder DVI.",
            "Wenn ein Arbeitsplatz mehrere Monitore nutzen soll, muss geprüft werden, ob die Grafiklösung genug Anschlüsse und Leistung unterstützt.",
            "Für AP1 ist relevant: Die GPU ist nicht nur für Spiele wichtig, sondern auch für Bildausgabe im Arbeitsalltag."
          ]
        },
        {
          title: "GPU und Netzteil",
          paragraphs: [
            "Eine leistungsstarke dedizierte GPU kann viel Strom benötigen. Deshalb muss das Netzteil ausreichend Leistung und passende Anschlüsse bieten.",
            "Das verbindet die Kapitel GPU und Netzteil. Bei einer Aufrüstung reicht es nicht, nur die GPU zu betrachten.",
            "Auch Gehäusegröße und Mainboard-Steckplatz können relevant sein."
          ]
        },
        {
          title: "Wann braucht man keine starke GPU?",
          paragraphs: [
            "Für einfache Büroarbeit, E-Mail, Browser, Textverarbeitung und viele Ausbildungsaufgaben reicht oft integrierte Grafik.",
            "Eine teure dedizierte GPU wäre in solchen Fällen oft unnötig und würde Kosten sowie Energieverbrauch erhöhen.",
            "AP1 prüft oft, ob du eine angemessene Lösung wählen kannst, nicht die teuerste Lösung."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Büroarbeitsplatz nutzt Browser, Office und E-Mail. Eine integrierte GPU reicht meistens aus.",
        "Ein Arbeitsplatz für CAD-Software braucht häufig eine dedizierte Grafikkarte, weil 3D-Modelle dargestellt werden müssen.",
        "Ein Entwickler nutzt zwei oder drei Monitore. Die Grafiklösung muss genügend passende Monitoranschlüsse unterstützen.",
        "Ein PC wird mit einer starken GPU aufgerüstet. Das Netzteil muss genug Leistung und passende Stromanschlüsse haben."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Büro-PC auswählen",
          paragraphs: [
            "Ein Unternehmen kauft PCs für Verwaltungstätigkeiten. Die Mitarbeiter nutzen Browser, Office, E-Mail und ein ERP-System.",
            "Eine dedizierte High-End-GPU ist hier meistens nicht notwendig. Integrierte Grafik kann ausreichend sein."
          ],
          steps: [
            "Anwendungen prüfen.",
            "Grafikanforderungen bewerten.",
            "Anzahl der Monitore prüfen.",
            "Integrierte Grafik als kostengünstige Lösung bewerten.",
            "Nur bei speziellen Anforderungen dedizierte GPU einplanen."
          ]
        },
        {
          title: "Szenario 2: CAD-Arbeitsplatz",
          paragraphs: [
            "Ein technischer Arbeitsplatz nutzt CAD-Software mit 3D-Modellen. Die Darstellung ist langsam und ruckelt.",
            "Hier kann eine dedizierte GPU sinnvoll sein, weil die Anwendung starke Grafikleistung benötigt."
          ],
          steps: [
            "Softwareanforderungen prüfen.",
            "Aktuelle GPU prüfen.",
            "Monitorauflösung und 3D-Anforderungen prüfen.",
            "Dedizierte GPU auswählen.",
            "Netzteil, Mainboard-Steckplatz und Gehäuse prüfen."
          ]
        }
      ],
      diagrams: [
        {
          title: "CPU und GPU arbeiten zusammen",
          code: "flowchart LR\n  APP[Anwendung] --> CPU[CPU: allgemeine Verarbeitung]\n  CPU --> RAM[RAM]\n  CPU --> GPU[GPU: Grafikverarbeitung]\n  GPU --> VRAM[VRAM / Grafikspeicher]\n  GPU --> MON[Monitor]\n  SSD[SSD/HDD] --> RAM"
        },
        {
          title: "Integrierte vs dedizierte GPU",
          code: "flowchart TD\n  A[Grafiklösung auswählen] --> B{Anforderung?}\n  B -->|Büro, Browser, Office| C[Integrierte GPU]\n  B -->|3D, CAD, Video, viele Monitore| D[Dedizierte GPU]\n  D --> E[PCIe-Steckplatz prüfen]\n  D --> F[Netzteil prüfen]\n  D --> G[Monitoranschlüsse prüfen]\n  C --> H[Kostengünstig und stromsparend]"
        }
      ],
      ihkFocus: {
        appears: [
          "Funktion der GPU.",
          "Unterscheidung CPU und GPU.",
          "Integrierte vs dedizierte Grafik.",
          "Hardware-Auswahl für Büro-PC oder CAD-Arbeitsplatz.",
          "Monitoranschlüsse und mehrere Bildschirme.",
          "Zusammenhang zwischen GPU und Netzteil."
        ],
        commonMistakes: [
          "GPU und CPU verwechseln.",
          "Für jeden PC eine starke dedizierte GPU empfehlen.",
          "Netzteilanforderungen bei GPU-Aufrüstung vergessen.",
          "VRAM mit normalem RAM gleichsetzen.",
          "Grafikleistung nur mit Spielen verbinden und Arbeitsanwendungen vergessen."
        ],
        importantDetails: [
          "GPU verarbeitet Grafikdaten.",
          "Integrierte GPU reicht oft für Büroarbeit.",
          "Dedizierte GPU ist für hohe Grafikleistung sinnvoll.",
          "Dedizierte GPU kann eigenen VRAM haben.",
          "Leistungsstarke GPU kann zusätzliche Stromanschlüsse benötigen."
        ],
        confusedConcepts: [
          "CPU vs GPU.",
          "RAM vs VRAM.",
          "Integrierte GPU vs dedizierte GPU.",
          "Grafikkarte vs Monitor.",
          "Grafikleistung vs allgemeine Systemleistung."
        ],
        vocabulary: [
          "GPU = Graphics Processing Unit.",
          "Grafikkarte = oft dedizierte GPU als Erweiterungskarte.",
          "Grafikprozessor = deutscher Begriff für GPU.",
          "VRAM = Grafikspeicher.",
          "integriert = in CPU oder Chipsatz eingebaut.",
          "dediziert = separate Komponente."
        ]
      },
      commonMistakes: [
        "Zu sagen: Eine GPU ist immer wichtiger als eine CPU. Das ist falsch; die Aufgabe entscheidet.",
        "Eine dedizierte GPU für einfache Büroarbeit empfehlen, obwohl integrierte Grafik reicht.",
        "Bei einer GPU-Aufrüstung Netzteil und Stromanschlüsse nicht prüfen.",
        "VRAM mit normalem RAM verwechseln.",
        "Zu glauben, dass eine starke GPU jedes Programm schneller macht. Viele Programme sind eher CPU-, RAM- oder SSD-abhängig."
      ],
      vocabulary: [
        {
          de: "GPU",
          pt: "GPU / processador gráfico",
          explanation: "Verarbeitungseinheit für Grafikdaten.",
          example: "Die GPU berechnet die Bildausgabe für den Monitor."
        },
        {
          de: "Grafikkarte",
          pt: "placa de vídeo",
          explanation: "Separate Karte mit GPU, oft für höhere Grafikleistung.",
          example: "Eine CAD-Workstation kann eine dedizierte Grafikkarte benötigen."
        },
        {
          de: "Grafikprozessor",
          pt: "processador gráfico",
          explanation: "Deutscher Begriff für GPU.",
          example: "Der Grafikprozessor verarbeitet 3D-Daten."
        },
        {
          de: "integrierte Grafik",
          pt: "gráfico integrado",
          explanation: "Grafikeinheit, die in CPU oder Chipsatz integriert ist.",
          example: "Für Büroarbeit reicht oft integrierte Grafik."
        },
        {
          de: "dedizierte Grafikkarte",
          pt: "placa de vídeo dedicada",
          explanation: "Separate Grafikkarte mit eigener Leistung und oft eigenem Speicher.",
          example: "Für 3D-Anwendungen ist eine dedizierte Grafikkarte sinnvoll."
        },
        {
          de: "VRAM",
          pt: "memória de vídeo",
          explanation: "Speicher, den die GPU für Grafikdaten nutzt.",
          example: "Eine dedizierte Grafikkarte besitzt oft eigenen VRAM."
        },
        {
          de: "Bildausgabe",
          pt: "saída de imagem",
          explanation: "Darstellung von Bildern auf einem Monitor.",
          example: "Die GPU ist für die Bildausgabe zuständig."
        },
        {
          de: "Monitoranschluss",
          pt: "conector de monitor",
          explanation: "Anschluss für einen Bildschirm, zum Beispiel HDMI oder DisplayPort.",
          example: "Der PC braucht zwei Monitoranschlüsse."
        },
        {
          de: "PCIe",
          pt: "PCIe",
          explanation: "Schnittstelle für Erweiterungskarten wie Grafikkarten.",
          example: "Eine dedizierte Grafikkarte wird oft in einen PCIe-Steckplatz eingesetzt."
        },
        {
          de: "3D-Anwendung",
          pt: "aplicação 3D",
          explanation: "Software, die dreidimensionale Grafik verarbeitet.",
          example: "CAD-Software ist häufig eine 3D-Anwendung."
        }
      ],
      summary: [
        "Die GPU ist eine Verarbeitungseinheit für Grafikdaten. Sie ist wichtig für Bildausgabe, Videos, 3D-Grafik, CAD-Anwendungen und mehrere Monitore.",
        "Die CPU ist der allgemeine Prozessor. Die GPU ist spezialisiert auf Grafik und parallele Berechnungen. Beide Komponenten haben unterschiedliche Aufgaben.",
        "Integrierte Grafik reicht oft für Büroarbeit. Eine dedizierte Grafikkarte ist sinnvoll, wenn mehr Grafikleistung benötigt wird, zum Beispiel bei CAD, 3D, Videobearbeitung oder vielen hochauflösenden Monitoren.",
        "Für AP1 ist wichtig: Nicht jeder PC braucht eine starke GPU. Die Hardware-Auswahl muss zum Einsatzzweck passen. Bei dedizierter GPU müssen Mainboard, Netzteil, Gehäuse und Monitoranschlüsse geprüft werden."
      ],
      mindMap: {
        title: "Mindmap: GPU",
        code: "mindmap\n  root((GPU))\n    Aufgabe\n      Grafikdaten\n      Bildausgabe\n      3D\n      Videos\n    Arten\n      integrierte Grafik\n      dedizierte Grafikkarte\n    Begriffe\n      Grafikkarte\n      VRAM\n      PCIe\n      Monitoranschluss\n    AP1 Fokus\n      CPU vs GPU\n      Einsatzbereich prüfen\n      Netzteil beachten\n      Büro vs CAD"
      },
      exercises: {
        easy: [
          {
            question: "Wofür ist eine GPU hauptsächlich zuständig?",
            answer: "Für Grafikverarbeitung und Bildausgabe.",
            explanation: "Die GPU verarbeitet Grafikdaten und hilft bei der Darstellung auf dem Monitor."
          },
          {
            question: "Was bedeutet GPU?",
            answer: "Graphics Processing Unit.",
            explanation: "Auf Deutsch sagt man oft Grafikprozessor oder Grafikkarte."
          },
          {
            question: "Ist eine GPU dasselbe wie eine CPU?",
            answer: "Nein.",
            explanation: "Die CPU ist allgemeiner Prozessor. Die GPU ist besonders für Grafikdaten geeignet."
          },
          {
            question: "Was ist integrierte Grafik?",
            answer: "Eine Grafikeinheit, die in CPU oder Chipsatz integriert ist.",
            explanation: "Sie ist keine separate dedizierte Grafikkarte."
          },
          {
            question: "Nenne einen Anschluss für Monitore.",
            answer: "HDMI oder DisplayPort.",
            explanation: "Solche Anschlüsse verbinden den Computer mit einem Monitor."
          }
        ],
        intermediate: [
          {
            question: "Wann reicht integrierte Grafik oft aus?",
            answer: "Bei Büroarbeit, Browser, E-Mail, Office und einfachen Anwendungen.",
            explanation: "Diese Aufgaben benötigen normalerweise keine hohe 3D-Grafikleistung."
          },
          {
            question: "Wann kann eine dedizierte Grafikkarte sinnvoll sein?",
            answer: "Bei CAD, 3D-Anwendungen, Videobearbeitung oder mehreren hochauflösenden Monitoren.",
            explanation: "Diese Aufgaben können mehr Grafikleistung und eigenen VRAM benötigen."
          },
          {
            question: "Warum muss bei einer GPU-Aufrüstung das Netzteil geprüft werden?",
            answer: "Eine starke GPU kann mehr Leistung und zusätzliche Stromanschlüsse benötigen.",
            explanation: "Ohne ausreichende Stromversorgung kann das System instabil werden oder die GPU nicht betrieben werden."
          },
          {
            question: "Was ist VRAM?",
            answer: "Grafikspeicher, den die GPU für Grafikdaten nutzt.",
            explanation: "VRAM ist nicht dasselbe wie normaler Arbeitsspeicher."
          },
          {
            question: "Warum macht eine starke GPU nicht jedes Programm schneller?",
            answer: "Viele Programme sind eher CPU-, RAM- oder SSD-abhängig.",
            explanation: "Eine GPU hilft vor allem, wenn die Aufgabe Grafikleistung oder passende parallele Berechnungen nutzt."
          }
        ],
        ap1Style: [
          {
            question: "Ein Unternehmen kauft PCs für einfache Büroarbeit. Ein Azubi empfiehlt teure dedizierte Grafikkarten. Beurteilen Sie die Empfehlung.",
            answer: "Die Empfehlung ist wahrscheinlich nicht wirtschaftlich sinnvoll.",
            explanation: "Für Browser, Office und E-Mail reicht oft integrierte Grafik. Eine dedizierte GPU würde Kosten und Energieverbrauch erhöhen."
          },
          {
            question: "Ein CAD-Arbeitsplatz stellt 3D-Modelle sehr langsam dar. Welche Hardware-Komponente kann relevant sein? Begründen Sie.",
            answer: "Die GPU beziehungsweise Grafikkarte kann relevant sein.",
            explanation: "CAD und 3D-Darstellung benötigen oft Grafikleistung. Eine dedizierte GPU kann die Darstellung verbessern."
          },
          {
            question: "Ein PC soll eine neue dedizierte Grafikkarte erhalten. Nennen Sie zwei andere Komponenten oder Faktoren, die geprüft werden müssen.",
            answer: "Netzteil und Mainboard-Steckplatz.",
            explanation: "Die GPU braucht genug Strom und einen passenden PCIe-Steckplatz. Auch Gehäusegröße und Monitoranschlüsse können wichtig sein."
          },
          {
            question: "Ordnen Sie zu: CPU, GPU, VRAM. Welche Komponente verarbeitet allgemeine Befehle, welche Grafikdaten, welcher Speicher wird für Grafikdaten genutzt?",
            answer: "CPU verarbeitet allgemeine Befehle. GPU verarbeitet Grafikdaten. VRAM speichert Grafikdaten.",
            explanation: "Diese Unterscheidung ist für AP1-Hardwarefragen wichtig."
          },
          {
            question: "Ein Arbeitsplatz benötigt drei Monitore. Warum muss die Grafiklösung geprüft werden?",
            answer: "Sie muss genügend passende Monitoranschlüsse und Unterstützung für mehrere Bildschirme bieten.",
            explanation: "Nicht jede integrierte oder dedizierte Grafiklösung unterstützt jede Monitoranzahl und Anschlusskombination."
          }
        ]
      },
      related: {
        previous: "Netzteil",
        next: "Peripheriegeräte"
      },
      revisionChecklist: [
        "Ich kann erklären, was eine GPU ist.",
        "Ich kann CPU und GPU unterscheiden.",
        "Ich kann integrierte und dedizierte Grafik erklären.",
        "Ich weiß, wann eine dedizierte GPU sinnvoll sein kann.",
        "Ich verstehe VRAM auf AP1-Niveau.",
        "Ich kann GPU-Aufrüstung mit Netzteil und Mainboard verbinden.",
        "Ich kann AP1-Fragen zur GPU beantworten."
      ]
    }
  },
  {
    id: "perifericos",
    title: "Peripheriegeräte",
    description: "Peripheriegeräte sind Geräte, die mit einem Computer verbunden werden und Eingabe, Ausgabe oder Datenaustausch ermöglichen.",
    text: [
      "Peripheriegeräte sind Geräte, die an einen Computer angeschlossen werden. Beispiele sind Tastatur, Maus, Monitor, Drucker, Scanner, Webcam, Headset oder externe Laufwerke.",
      "Für die AP1 musst du Eingabegeräte, Ausgabegeräte und Geräte für Ein- und Ausgabe unterscheiden können. Außerdem sind Schnittstellen und Treiber wichtig."
    ],
    ihk: "Wichtig für AP1: Eingabegerät, Ausgabegerät, Ein-/Ausgabegerät, Schnittstelle, Anschluss und Treiber unterscheiden.",
    summary: "Periféricos são dispositivos conectados ao computador. Eles podem servir para entrada, saída ou ambos. Exemplos: teclado, mouse, monitor, impressora, scanner e webcam.",
    example: "Eine Tastatur ist ein Eingabegerät. Ein Monitor ist ein Ausgabegerät. Ein Touchscreen kann Eingabe und Ausgabe sein.",
    exercises: [
      {
        question: "Was ist ein Peripheriegerät?",
        answer: "Ein Gerät, das mit einem Computer verbunden wird, zum Beispiel Tastatur, Monitor oder Drucker."
      }
    ],
    studyTime: "60-75 Minuten",
    difficulty: "Easy",
    fullContent: {
      studyTime: "60-75 Minuten",
      difficulty: "Easy",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Peripheriegeräte sind für AP1 wichtig, weil sie in einfachen Zuordnungsaufgaben, Arbeitsplatz-Szenarien und Fehleranalysen vorkommen.",
          "Die IHK kann prüfen, ob du Eingabe, Ausgabe, Schnittstellen und Treiber unterscheiden kannst. Diese Begriffe sind Grundlagen für spätere Themen wie Betriebssysteme und Benutzerarbeitsplätze.",
          "Português de apoio: periféricos parecem simples, mas aparecem muito em perguntas de classificação e troubleshooting."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what Peripheriegeräte are.",
        "After this chapter the student will be able to distinguish input devices and output devices.",
        "After this chapter the student will be able to identify devices that support both input and output.",
        "After this chapter the student will be able to explain Schnittstelle, Anschluss and Treiber at AP1 level.",
        "After this chapter the student will be able to solve simple troubleshooting scenarios with peripherals.",
        "After this chapter the student will be able to use German vocabulary for workplace hardware."
      ],
      introduction: [
        "Ein Computer allein ist oft nicht genug. Menschen müssen Daten eingeben, Ergebnisse sehen, Dokumente drucken, Ton hören oder Geräte anschließen.",
        "Dafür nutzt man Peripheriegeräte. Das Wort Peripherie bedeutet: Geräte am Rand des Computersystems. Sie gehören zur Hardware, sind aber oft nicht die zentrale Recheneinheit.",
        "Für AP1 ist wichtig, dass du Geräte nach ihrer Funktion einordnen kannst: Eingabe, Ausgabe oder beides.",
        "Außerdem musst du verstehen, dass ein Gerät nicht nur physisch angeschlossen werden muss. Es braucht oft eine passende Schnittstelle, manchmal einen Treiber und manchmal Berechtigungen oder Netzwerkeinstellungen."
      ],
      explanation: [
        {
          title: "Was sind Peripheriegeräte?",
          paragraphs: [
            "Peripheriegeräte sind Geräte, die mit einem Computer verbunden werden, um Eingabe, Ausgabe, Speicherung, Kommunikation oder zusätzliche Funktionen zu ermöglichen.",
            "Viele Peripheriegeräte sind extern, zum Beispiel Tastatur, Maus, Monitor oder Drucker. Manche können auch intern oder eingebaut sein, zum Beispiel eine Webcam im Notebook.",
            "Peripheriegeräte sind Hardware, weil sie physische Geräte sind."
          ]
        },
        {
          title: "Eingabegeräte",
          paragraphs: [
            "Eingabegeräte bringen Daten in den Computer. Der Benutzer gibt Informationen ein oder steuert das System.",
            "Beispiele sind Tastatur, Maus, Scanner, Mikrofon, Webcam, Touchpad oder Barcode-Scanner.",
            "Für AP1 ist wichtig: Eingabe bedeutet, dass Daten vom Benutzer oder aus der Umgebung in das System gelangen."
          ]
        },
        {
          title: "Ausgabegeräte",
          paragraphs: [
            "Ausgabegeräte geben Informationen aus dem Computer an den Benutzer oder an die Umgebung aus.",
            "Beispiele sind Monitor, Drucker, Lautsprecher, Beamer oder Kopfhörer.",
            "Ausgabe kann sichtbar, hörbar oder als physisches Dokument erfolgen."
          ]
        },
        {
          title: "Ein- und Ausgabegeräte",
          paragraphs: [
            "Manche Geräte können Eingabe und Ausgabe gleichzeitig unterstützen.",
            "Ein Touchscreen zeigt Informationen an und nimmt Berührungen als Eingabe entgegen.",
            "Ein Multifunktionsdrucker kann drucken, scannen und manchmal faxen. Deshalb kann er je nach Funktion Eingabe und Ausgabe sein."
          ]
        },
        {
          title: "Schnittstelle und Anschluss",
          paragraphs: [
            "Eine Schnittstelle beschreibt, wie Geräte miteinander kommunizieren. Ein Anschluss ist der physische Verbindungspunkt.",
            "USB ist eine sehr häufige Schnittstelle für Peripheriegeräte. HDMI und DisplayPort werden häufig für Monitore genutzt. Netzwerkanschlüsse können Drucker oder andere Geräte verbinden.",
            "Für AP1 reicht: Gerät und Computer brauchen eine passende Schnittstelle oder Verbindung."
          ]
        },
        {
          title: "Treiber",
          paragraphs: [
            "Ein Treiber ist Software, die dem Betriebssystem hilft, mit einem Gerät zu kommunizieren.",
            "Viele Geräte funktionieren heute automatisch, weil das Betriebssystem passende Treiber mitbringt. Bei speziellen Geräten muss ein Treiber installiert werden.",
            "Wenn ein Gerät angeschlossen ist, aber nicht funktioniert, kann ein fehlender oder falscher Treiber eine Ursache sein."
          ]
        },
        {
          title: "Peripheriegeräte im Netzwerk",
          paragraphs: [
            "Nicht alle Peripheriegeräte sind direkt per Kabel mit einem PC verbunden. Drucker oder Scanner können auch über das Netzwerk genutzt werden.",
            "Dann sind zusätzliche Themen wichtig: Netzwerkverbindung, IP-Adresse, Freigabe, Berechtigungen und Druckertreiber.",
            "Für AP1 ist wichtig: Ein Druckerproblem kann am Gerät, am Kabel, am Netzwerk, am Treiber oder an Berechtigungen liegen."
          ]
        },
        {
          title: "Ergonomie und Arbeitsplatz",
          paragraphs: [
            "Peripheriegeräte beeinflussen auch Ergonomie. Ergonomie bedeutet: Der Arbeitsplatz soll gesund und angenehm nutzbar sein.",
            "Ein externer Monitor, eine gute Tastatur und eine passende Maus können die Arbeit erleichtern.",
            "Für Ausbildung und Berufsalltag ist das praktisch wichtig, auch wenn AP1 meist technische Grundlagen fokussiert."
          ]
        }
      ],
      realWorldExamples: [
        "Ein neuer Arbeitsplatz braucht Monitor, Tastatur, Maus, Headset und Dockingstation. Diese Geräte ermöglichen Eingabe, Ausgabe und Kommunikation.",
        "Ein Scanner digitalisiert Papierdokumente. Er ist ein Eingabegerät, weil Daten in den Computer gelangen.",
        "Ein Netzwerkdrucker wird von mehreren Mitarbeitern genutzt. Neben Hardware sind Treiber, Netzwerk und Berechtigungen wichtig.",
        "Ein Touchscreen in einem Kassensystem zeigt Informationen an und nimmt Eingaben entgegen."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Drucker funktioniert nicht",
          paragraphs: [
            "Ein Mitarbeiter kann nicht drucken. Der Drucker ist eingeschaltet, aber der Druckauftrag bleibt hängen.",
            "Die Ursache kann unterschiedlich sein: falscher Drucker, fehlender Treiber, keine Netzwerkverbindung, Papierstau oder fehlende Berechtigung."
          ],
          steps: [
            "Prüfen, ob der richtige Drucker ausgewählt wurde.",
            "Prüfen, ob der Drucker eingeschaltet und bereit ist.",
            "Verbindung prüfen: USB oder Netzwerk.",
            "Treiberstatus prüfen.",
            "Druckerwarteschlange und Fehlermeldung prüfen."
          ]
        },
        {
          title: "Szenario 2: Externer Monitor zeigt kein Bild",
          paragraphs: [
            "Ein Azubi schließt einen Monitor an ein Notebook an, aber es erscheint kein Bild.",
            "Mögliche Ursachen sind falscher Eingang am Monitor, defektes Kabel, falscher Anschluss, nicht aktivierte Anzeige oder Treiberproblem."
          ],
          steps: [
            "Kabel und Anschluss prüfen.",
            "Monitor-Eingangsquelle prüfen.",
            "Anzeigeeinstellungen im Betriebssystem prüfen.",
            "Anderes Kabel oder anderen Anschluss testen.",
            "Grafiktreiber prüfen, wenn nötig."
          ]
        }
      ],
      diagrams: [
        {
          title: "Arten von Peripheriegeräten",
          code: "flowchart TD\n  P[Peripheriegeräte] --> E[Eingabe]\n  P --> A[Ausgabe]\n  P --> EA[Ein- und Ausgabe]\n  E --> T[Tastatur]\n  E --> M[Maus]\n  E --> S[Scanner]\n  A --> MON[Monitor]\n  A --> D[Drucker]\n  A --> L[Lautsprecher]\n  EA --> TS[Touchscreen]\n  EA --> MF[Multifunktionsgerät]"
        },
        {
          title: "Gerät funktioniert nicht",
          code: "flowchart TD\n  A[Peripheriegerät funktioniert nicht] --> B{Strom/Status ok?}\n  B -->|Nein| C[Gerät einschalten oder Fehler beheben]\n  B -->|Ja| D{Verbindung ok?}\n  D -->|Nein| E[Kabel, USB, Netzwerk prüfen]\n  D -->|Ja| F{Treiber ok?}\n  F -->|Nein| G[Treiber installieren oder aktualisieren]\n  F -->|Ja| H[Berechtigung, Einstellungen oder Gerät prüfen]"
        }
      ],
      ihkFocus: {
        appears: [
          "Zuordnung von Geräten zu Eingabe, Ausgabe oder Ein-/Ausgabe.",
          "Begriffe Schnittstelle, Anschluss und Treiber.",
          "Einfache Fehlersuche bei Drucker, Monitor, Tastatur oder Scanner.",
          "Arbeitsplatz-Ausstattung in Unternehmen.",
          "Unterscheidung direkt angeschlossener Geräte und Netzwerkgeräte."
        ],
        commonMistakes: [
          "Peripheriegeräte nicht als Hardware erkennen.",
          "Scanner als Ausgabegerät einordnen.",
          "Touchscreen nur als Ausgabegerät betrachten.",
          "Treiber und Schnittstelle verwechseln.",
          "Druckerprobleme nur dem Drucker selbst zuschreiben."
        ],
        importantDetails: [
          "Eingabegeräte bringen Daten in das System.",
          "Ausgabegeräte geben Informationen aus.",
          "Manche Geräte können beides.",
          "Treiber sind Software für Gerätekommunikation.",
          "Schnittstellen ermöglichen Verbindung und Kommunikation."
        ],
        confusedConcepts: [
          "Eingabe vs Ausgabe.",
          "Anschluss vs Schnittstelle.",
          "Treiber vs Gerät.",
          "Lokaler Drucker vs Netzwerkdrucker.",
          "Monitor vs GPU."
        ],
        vocabulary: [
          "Eingabegerät = Gerät für Dateneingabe.",
          "Ausgabegerät = Gerät für Informationsausgabe.",
          "Schnittstelle = Art der Verbindung/Kommunikation.",
          "Treiber = Software für Hardware-Kommunikation.",
          "Peripheriegerät = angeschlossenes Zusatzgerät."
        ]
      },
      commonMistakes: [
        "Zu sagen: Ein Scanner ist ein Ausgabegerät. Ein Scanner bringt Daten in den Computer und ist daher ein Eingabegerät.",
        "Einen Touchscreen nur als Monitor zu betrachten. Er zeigt Informationen an und nimmt Eingaben entgegen.",
        "Bei einem nicht funktionierenden Gerät nur das Kabel zu prüfen und Treiber oder Einstellungen zu vergessen.",
        "Schnittstelle und Anschluss gleichzusetzen. Sie hängen zusammen, sind aber nicht exakt dasselbe.",
        "Einen Netzwerkdrucker wie einen direkt per USB angeschlossenen Drucker zu behandeln und Netzwerk/Berechtigungen zu ignorieren."
      ],
      vocabulary: [
        {
          de: "Peripheriegerät",
          pt: "periférico",
          explanation: "Gerät, das mit einem Computer verbunden wird.",
          example: "Eine Tastatur ist ein Peripheriegerät."
        },
        {
          de: "Eingabegerät",
          pt: "dispositivo de entrada",
          explanation: "Gerät, mit dem Daten in den Computer gelangen.",
          example: "Ein Scanner ist ein Eingabegerät."
        },
        {
          de: "Ausgabegerät",
          pt: "dispositivo de saída",
          explanation: "Gerät, das Informationen aus dem Computer ausgibt.",
          example: "Ein Monitor ist ein Ausgabegerät."
        },
        {
          de: "Ein- und Ausgabegerät",
          pt: "dispositivo de entrada e saída",
          explanation: "Gerät, das Daten aufnehmen und ausgeben kann.",
          example: "Ein Touchscreen ist ein Ein- und Ausgabegerät."
        },
        {
          de: "Schnittstelle",
          pt: "interface",
          explanation: "Standard oder Art, wie Geräte miteinander kommunizieren.",
          example: "USB ist eine häufige Schnittstelle."
        },
        {
          de: "Anschluss",
          pt: "conector / porta física",
          explanation: "Physischer Verbindungspunkt für ein Kabel oder Gerät.",
          example: "Der HDMI-Anschluss verbindet den Monitor mit dem Computer."
        },
        {
          de: "Treiber",
          pt: "driver",
          explanation: "Software, die dem Betriebssystem die Kommunikation mit Hardware ermöglicht.",
          example: "Der Drucker benötigt einen passenden Treiber."
        },
        {
          de: "Druckerwarteschlange",
          pt: "fila de impressão",
          explanation: "Liste von Druckaufträgen, die verarbeitet werden sollen.",
          example: "Der Druckauftrag hängt in der Druckerwarteschlange."
        },
        {
          de: "Netzwerkdrucker",
          pt: "impressora de rede",
          explanation: "Drucker, der über ein Netzwerk erreichbar ist.",
          example: "Mehrere Mitarbeiter nutzen denselben Netzwerkdrucker."
        },
        {
          de: "Ergonomie",
          pt: "ergonomia",
          explanation: "Gestaltung des Arbeitsplatzes für gesundes und angenehmes Arbeiten.",
          example: "Ein externer Monitor kann die Ergonomie verbessern."
        }
      ],
      summary: [
        "Peripheriegeräte sind Geräte, die mit einem Computer verbunden werden. Sie gehören zur Hardware und ermöglichen Eingabe, Ausgabe oder zusätzliche Funktionen.",
        "Eingabegeräte bringen Daten in das System, zum Beispiel Tastatur, Maus, Scanner oder Mikrofon. Ausgabegeräte geben Informationen aus, zum Beispiel Monitor, Drucker oder Lautsprecher.",
        "Manche Geräte sind Ein- und Ausgabegeräte, zum Beispiel Touchscreens oder Multifunktionsgeräte. Für AP1 ist die korrekte Zuordnung wichtig.",
        "Schnittstellen, Anschlüsse und Treiber sind zentrale Begriffe. Wenn ein Gerät nicht funktioniert, sollte man Strom/Status, Verbindung, Treiber, Einstellungen und Berechtigungen prüfen."
      ],
      mindMap: {
        title: "Mindmap: Peripheriegeräte",
        code: "mindmap\n  root((Peripheriegeräte))\n    Eingabe\n      Tastatur\n      Maus\n      Scanner\n      Mikrofon\n    Ausgabe\n      Monitor\n      Drucker\n      Lautsprecher\n      Beamer\n    Ein und Ausgabe\n      Touchscreen\n      Multifunktionsgerät\n    Verbindung\n      USB\n      HDMI\n      DisplayPort\n      Netzwerk\n    AP1 Fokus\n      Zuordnung\n      Treiber\n      Schnittstelle\n      Fehlersuche"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Peripheriegerät?",
            answer: "Ein Gerät, das mit einem Computer verbunden wird.",
            explanation: "Beispiele sind Tastatur, Monitor, Drucker, Scanner oder Maus."
          },
          {
            question: "Ist eine Tastatur ein Eingabe- oder Ausgabegerät?",
            answer: "Eingabegerät.",
            explanation: "Mit der Tastatur gibt der Benutzer Daten in den Computer ein."
          },
          {
            question: "Ist ein Monitor ein Eingabe- oder Ausgabegerät?",
            answer: "Ausgabegerät.",
            explanation: "Der Monitor zeigt Informationen aus dem Computer an."
          },
          {
            question: "Was macht ein Treiber?",
            answer: "Er ermöglicht dem Betriebssystem die Kommunikation mit einem Gerät.",
            explanation: "Ohne passenden Treiber funktionieren manche Geräte nicht korrekt."
          },
          {
            question: "Nenne eine häufige Schnittstelle für Peripheriegeräte.",
            answer: "USB.",
            explanation: "USB wird sehr häufig für Tastaturen, Mäuse, Drucker und andere Geräte genutzt."
          }
        ],
        intermediate: [
          {
            question: "Warum ist ein Touchscreen ein Ein- und Ausgabegerät?",
            answer: "Er zeigt Informationen an und nimmt Berührungen als Eingabe entgegen.",
            explanation: "Er kombiniert Ausgabefunktion und Eingabefunktion."
          },
          {
            question: "Erkläre den Unterschied zwischen Anschluss und Schnittstelle.",
            answer: "Ein Anschluss ist der physische Verbindungspunkt. Eine Schnittstelle beschreibt die Art oder den Standard der Kommunikation.",
            explanation: "Zum Beispiel ist USB ein Schnittstellenstandard und der USB-Port der physische Anschluss."
          },
          {
            question: "Warum kann ein Drucker trotz Verbindung nicht funktionieren?",
            answer: "Mögliche Ursachen sind fehlender Treiber, falscher Drucker, Papierstau, Netzwerkproblem oder fehlende Berechtigung.",
            explanation: "Peripherieprobleme haben oft mehrere mögliche Ursachen."
          },
          {
            question: "Warum ist ein Scanner ein Eingabegerät?",
            answer: "Er digitalisiert Papierdokumente und bringt Daten in den Computer.",
            explanation: "Die Richtung der Daten ist entscheidend: vom Gerät in das System."
          },
          {
            question: "Warum sind Peripheriegeräte für Arbeitsplatzplanung wichtig?",
            answer: "Sie bestimmen, wie Benutzer mit dem System arbeiten und welche Ein-/Ausgabe möglich ist.",
            explanation: "Monitor, Tastatur, Maus und Headset beeinflussen Produktivität und Ergonomie."
          }
        ],
        ap1Style: [
          {
            question: "Ordnen Sie zu: Tastatur, Monitor, Touchscreen. Welche Geräte sind Eingabe, Ausgabe oder Ein-/Ausgabe?",
            answer: "Tastatur: Eingabe. Monitor: Ausgabe. Touchscreen: Ein-/Ausgabe.",
            explanation: "Die Zuordnung basiert darauf, ob Daten in den Computer gelangen, aus ihm herauskommen oder beides passiert."
          },
          {
            question: "Ein Mitarbeiter kann mit einem Netzwerkdrucker nicht drucken. Nennen Sie drei mögliche Ursachen.",
            answer: "Falscher Drucker ausgewählt, Netzwerkverbindung gestört, Treiberproblem.",
            explanation: "Auch Papierstau, Berechtigungen oder Druckerwarteschlange wären mögliche Ursachen."
          },
          {
            question: "Ein Scanner wird in einer Arztpraxis genutzt, um Papierdokumente zu digitalisieren. Begründen Sie, warum er ein Eingabegerät ist.",
            answer: "Der Scanner bringt Informationen vom Papier in den Computer.",
            explanation: "Die Datenrichtung ist von außen in das IT-System hinein."
          },
          {
            question: "Ein externer Monitor zeigt kein Bild. Nennen Sie zwei sinnvolle Prüfschritte.",
            answer: "Kabel/Anschluss prüfen und richtige Eingangsquelle am Monitor wählen.",
            explanation: "Auch Anzeigeeinstellungen oder Grafiktreiber können geprüft werden."
          },
          {
            question: "Ein neues Spezialgerät wird per USB angeschlossen, funktioniert aber nicht. Das Gerät wird im Betriebssystem unbekannt angezeigt. Welche Ursache ist wahrscheinlich?",
            answer: "Ein fehlender oder falscher Treiber.",
            explanation: "Wenn Hardware erkannt, aber nicht korrekt verwendet wird, ist der Treiber eine typische Ursache."
          }
        ]
      },
      related: {
        previous: "GPU",
        next: "Was ist ein Betriebssystem?"
      },
      revisionChecklist: [
        "Ich kann erklären, was Peripheriegeräte sind.",
        "Ich kann Eingabegeräte und Ausgabegeräte unterscheiden.",
        "Ich kann Ein- und Ausgabegeräte erkennen.",
        "Ich verstehe Schnittstelle, Anschluss und Treiber.",
        "Ich kann einfache Fehler bei Peripheriegeräten systematisch prüfen.",
        "Ich kenne wichtige deutsche Begriffe zu Peripheriegeräten.",
        "Ich kann AP1-Fragen zu Peripheriegeräten beantworten."
      ]
    }
  },
  {
    id: "kernel",
    title: "Kernel",
    description: "Der Kernel ist der zentrale Kern des Betriebssystems und kontrolliert den Zugriff auf Hardware und Systemressourcen.",
    text: [
      "Der Kernel ist der zentrale Teil eines Betriebssystems. Er verwaltet wichtige Ressourcen wie CPU, Arbeitsspeicher, Geräte und Systemzugriffe.",
      "Für die AP1 musst du verstehen, dass Anwendungen nicht einfach direkt alles mit der Hardware machen. Sie nutzen Dienste des Betriebssystems, und der Kernel kontrolliert viele dieser Zugriffe."
    ],
    ihk: "Wichtig für AP1: Kernel = Kern des Betriebssystems. Er verwaltet Ressourcen, kontrolliert Hardwarezugriff und stellt Systemdienste bereit.",
    summary: "Kernel é o núcleo do sistema operacional. Ele controla acesso a hardware e recursos, como CPU, memória, dispositivos e chamadas de sistema.",
    example: "Wenn ein Programm eine Datei öffnen möchte, nutzt es Systemdienste des Betriebssystems. Der Kernel kontrolliert den Zugriff.",
    exercises: [
      {
        question: "Was ist der Kernel?",
        answer: "Der Kernel ist der zentrale Kern des Betriebssystems."
      }
    ],
    studyTime: "75-90 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "75-90 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Der Kernel ist für AP1 wichtig, weil er erklärt, wie das Betriebssystem zentrale Ressourcen kontrolliert. Er verbindet viele spätere Themen: Prozesse, Speicherverwaltung, Treiber, Rechte und Sicherheit.",
          "Die IHK erwartet normalerweise keine tiefe Kernel-Architektur. Wichtig ist das Grundverständnis: Der Kernel ist der Kern des Betriebssystems und schützt sowie verwaltet Ressourcen.",
          "Português de apoio: pense no Kernel como a parte central do sistema operacional que controla recursos críticos. Aplicativos normais não devem acessar tudo diretamente."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what the Kernel is.",
        "After this chapter the student will be able to describe why the Kernel is central to an operating system.",
        "After this chapter the student will be able to explain the difference between application and Kernel at AP1 level.",
        "After this chapter the student will be able to explain system calls in simple words.",
        "After this chapter the student will be able to connect Kernel, drivers, hardware access and security.",
        "After this chapter the student will be able to solve AP1-style questions about Kernel basics."
      ],
      introduction: [
        "Im letzten Kapitel hast du gelernt: Das Betriebssystem verwaltet Hardware, Programme, Dateien, Speicher, Geräte und Benutzer. Aber welcher Teil des Betriebssystems ist besonders nah an den wichtigsten Ressourcen?",
        "Dieser zentrale Teil heißt Kernel. Auf Deutsch kann man sagen: der Kern des Betriebssystems.",
        "Der Kernel arbeitet im Hintergrund. Benutzer sehen ihn normalerweise nicht direkt. Trotzdem ist er sehr wichtig, weil er kontrolliert, wie Programme auf CPU, RAM, Geräte und andere Ressourcen zugreifen.",
        "Für AP1 ist wichtig: Der Kernel ist kein normales Anwendungsprogramm. Er hat eine besondere Rolle und besondere Rechte im System."
      ],
      explanation: [
        {
          title: "Was ist der Kernel?",
          paragraphs: [
            "Der Kernel ist der zentrale Kern eines Betriebssystems. Er verwaltet grundlegende Systemressourcen.",
            "Zu diesen Ressourcen gehören CPU-Zeit, Arbeitsspeicher, Geräte, Prozesse und Systemzugriffe.",
            "Der Kernel sorgt dafür, dass Programme kontrolliert arbeiten und nicht beliebig auf Hardware oder Speicherbereiche zugreifen."
          ]
        },
        {
          title: "Warum gibt es einen Kernel?",
          paragraphs: [
            "Ohne Kernel müssten Programme direkt mit der Hardware arbeiten. Das wäre kompliziert und gefährlich.",
            "Ein fehlerhaftes Programm könnte wichtige Speicherbereiche überschreiben, Geräte falsch ansprechen oder das ganze System blockieren.",
            "Der Kernel schafft Ordnung: Er stellt Regeln und Dienste bereit, über die Programme Ressourcen nutzen dürfen."
          ]
        },
        {
          title: "Kernel und Anwendungen",
          paragraphs: [
            "Anwendungen wie Browser, Textverarbeitung oder Entwicklungsumgebungen laufen normalerweise nicht mit vollständigem Zugriff auf die Hardware.",
            "Wenn eine Anwendung eine Datei öffnen, Speicher anfordern oder Daten über das Netzwerk senden möchte, nutzt sie Dienste des Betriebssystems.",
            "Der Kernel prüft und koordiniert viele dieser Anfragen."
          ]
        },
        {
          title: "Systemaufrufe",
          paragraphs: [
            "Ein Systemaufruf ist eine Anfrage eines Programms an das Betriebssystem beziehungsweise den Kernel.",
            "Beispiel: Ein Programm möchte eine Datei öffnen. Es macht das nicht direkt auf der SSD, sondern ruft eine Betriebssystemfunktion auf.",
            "Der Kernel prüft dann, ob der Zugriff erlaubt ist und führt die notwendige Operation kontrolliert aus.",
            "Für AP1 reicht: Systemaufrufe sind kontrollierte Wege, über die Programme Kernel-Dienste nutzen."
          ],
          steps: [
            "1. Programm möchte eine Aktion ausführen.",
            "2. Programm nutzt einen Systemaufruf.",
            "3. Kernel prüft Zugriff und Ressourcen.",
            "4. Kernel führt die Operation aus oder lehnt sie ab.",
            "5. Programm erhält ein Ergebnis oder eine Fehlermeldung."
          ]
        },
        {
          title: "Kernel und Prozessverwaltung",
          paragraphs: [
            "Der Kernel unterstützt die Prozessverwaltung. Er hilft dabei, Prozesse zu starten, zu stoppen und CPU-Zeit zu verteilen.",
            "Wenn mehrere Programme gleichzeitig laufen, muss das System entscheiden, welcher Prozess wann arbeiten darf.",
            "Diese Kontrolle ist wichtig, damit ein einzelnes Programm nicht das gesamte System blockiert."
          ]
        },
        {
          title: "Kernel und Speicherverwaltung",
          paragraphs: [
            "Der Kernel spielt auch eine zentrale Rolle in der Speicherverwaltung.",
            "Er sorgt dafür, dass Prozesse Speicher bekommen und dass Speicherbereiche geschützt werden.",
            "Ein Programm soll normalerweise nicht einfach den Speicher eines anderen Programms lesen oder verändern dürfen. Das ist wichtig für Stabilität und Sicherheit."
          ]
        },
        {
          title: "Kernel und Treiber",
          paragraphs: [
            "Treiber ermöglichen die Kommunikation mit Hardware. Viele Treiber arbeiten sehr nah am Kernel oder im Kernel-Kontext.",
            "Beispiele sind Treiber für Grafikkarten, Drucker, Netzwerkkarten oder Speichercontroller.",
            "Wenn ein Treiber fehlerhaft ist, kann das System instabil werden, weil Treiber oft mit wichtigen Systembereichen arbeiten."
          ]
        },
        {
          title: "Kernel Mode und User Mode",
          paragraphs: [
            "Viele Betriebssysteme unterscheiden zwischen Kernel Mode und User Mode.",
            "Im User Mode laufen normale Anwendungen mit eingeschränkten Rechten. Im Kernel Mode läuft besonders vertrauenswürdiger Systemcode mit mehr Rechten.",
            "Für AP1 musst du diese Begriffe nicht tief technisch erklären. Wichtig ist die Idee: Normale Programme sollen nicht unbegrenzt auf alles zugreifen können."
          ]
        },
        {
          title: "Kernel und Sicherheit",
          paragraphs: [
            "Der Kernel hilft, das System zu schützen. Er kontrolliert Zugriffe auf Speicher, Dateien, Geräte und Systemfunktionen.",
            "Wenn ein Programm etwas tun möchte, das nicht erlaubt ist, kann das Betriebssystem den Zugriff verweigern.",
            "Deshalb ist der Kernel auch für Stabilität und Sicherheit wichtig."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Programm möchte eine Datei öffnen. Der Kernel prüft über Betriebssystemdienste, ob der Zugriff erlaubt ist.",
        "Ein Druckertreiber ermöglicht dem Betriebssystem, mit dem Drucker zu kommunizieren. Fehlerhafte Treiber können Geräteprobleme verursachen.",
        "Ein Programm stürzt ab, aber das Betriebssystem läuft weiter. Speicher- und Prozessschutz helfen, solche Fehler zu begrenzen.",
        "Ein Benutzer ohne Rechte versucht, eine Systemdatei zu ändern. Das Betriebssystem verhindert den Zugriff."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Datei öffnen",
          paragraphs: [
            "Eine Anwendung möchte eine Datei öffnen. Sie greift nicht einfach direkt auf die SSD zu.",
            "Stattdessen nutzt sie Systemdienste. Der Kernel und das Betriebssystem prüfen Pfad, Dateisystem und Berechtigungen."
          ],
          steps: [
            "Anwendung fordert Datei an.",
            "Systemaufruf wird genutzt.",
            "Kernel prüft Zugriff.",
            "Dateisystem wird angesprochen.",
            "Anwendung erhält Daten oder Fehlermeldung."
          ]
        },
        {
          title: "Szenario 2: Programmfehler",
          paragraphs: [
            "Ein Programm hat einen Fehler und versucht, auf einen Speicherbereich zuzugreifen, der nicht erlaubt ist.",
            "Das Betriebssystem kann den Zugriff blockieren und das Programm beenden, statt das gesamte System abstürzen zu lassen."
          ],
          steps: [
            "Programm führt fehlerhaften Zugriff aus.",
            "Kernel erkennt unerlaubten Zugriff.",
            "Zugriff wird blockiert.",
            "Programm erhält Fehler oder wird beendet.",
            "System bleibt stabil."
          ]
        }
      ],
      diagrams: [
        {
          title: "Kernel zwischen Anwendungen und Hardware",
          code: "flowchart TD\n  APP[Anwendungen im User Mode] --> SC[Systemaufrufe]\n  SC --> K[Kernel]\n  K --> CPU[CPU]\n  K --> RAM[Arbeitsspeicher]\n  K --> FS[Dateisystem]\n  K --> DRV[Treiber]\n  DRV --> HW[Hardware]"
        },
        {
          title: "Systemaufruf vereinfacht",
          code: "flowchart LR\n  A[Programm möchte Datei öffnen] --> B[Systemaufruf]\n  B --> C[Kernel prüft Rechte]\n  C --> D{Erlaubt?}\n  D -->|Ja| E[Datei wird geöffnet]\n  D -->|Nein| F[Zugriff verweigert]"
        }
      ],
      ihkFocus: {
        appears: [
          "Definition des Kernels.",
          "Rolle des Kernels im Betriebssystem.",
          "Zusammenhang zwischen Kernel, Hardware und Anwendungen.",
          "Systemaufrufe als kontrollierter Zugriff.",
          "Kernel, Treiber und Gerätezugriff.",
          "Speicher- und Prozessschutz auf Grundniveau."
        ],
        commonMistakes: [
          "Kernel mit grafischer Oberfläche verwechseln.",
          "Kernel als normales Anwendungsprogramm beschreiben.",
          "Zu tief in technische Details gehen und die Grundfunktion vergessen.",
          "Treiber als reine Hardware beschreiben.",
          "Annehmen, dass Anwendungen immer direkt auf Hardware zugreifen."
        ],
        importantDetails: [
          "Kernel ist Kern des Betriebssystems.",
          "Kernel verwaltet zentrale Ressourcen.",
          "Programme nutzen Systemaufrufe.",
          "Kernel kontrolliert Zugriffe.",
          "Treiber ermöglichen Hardwarekommunikation.",
          "Kernel ist wichtig für Stabilität und Sicherheit."
        ],
        confusedConcepts: [
          "Kernel vs Betriebssystem.",
          "Kernel vs Benutzeroberfläche.",
          "User Mode vs Kernel Mode.",
          "Treiber vs Gerät.",
          "Systemaufruf vs normaler Funktionsaufruf."
        ],
        vocabulary: [
          "Kernel = Kern des Betriebssystems.",
          "Systemaufruf = Anfrage an das Betriebssystem.",
          "User Mode = eingeschränkter Modus für Anwendungen.",
          "Kernel Mode = privilegierter Modus für Systemcode.",
          "Treiber = Software für Hardwarekommunikation."
        ]
      },
      commonMistakes: [
        "Zu sagen: Der Kernel ist die grafische Oberfläche. Die Oberfläche ist nur ein Teil des Systems, der Kernel arbeitet tiefer im Betriebssystem.",
        "Zu sagen: Der Kernel ist dasselbe wie das gesamte Betriebssystem. Der Kernel ist ein zentraler Teil, aber nicht alles.",
        "Zu glauben, dass normale Anwendungen direkt und unbegrenzt auf Hardware zugreifen sollten. Das wäre unsicher und instabil.",
        "Systemaufrufe zu kompliziert zu erklären. Für AP1 reicht: Programme nutzen Systemaufrufe, um Dienste des Kernels zu verwenden.",
        "Treiber als Gerät zu verstehen. Ein Treiber ist Software, die Kommunikation mit Hardware ermöglicht."
      ],
      vocabulary: [
        {
          de: "Kernel",
          pt: "núcleo do sistema operacional",
          explanation: "Zentraler Teil des Betriebssystems, der Ressourcen verwaltet.",
          example: "Der Kernel kontrolliert den Zugriff auf Hardware."
        },
        {
          de: "Kern",
          pt: "núcleo",
          explanation: "Zentraler innerer Teil eines Systems.",
          example: "Der Kernel ist der Kern des Betriebssystems."
        },
        {
          de: "Systemaufruf",
          pt: "chamada de sistema",
          explanation: "Anfrage eines Programms an das Betriebssystem.",
          example: "Ein Programm nutzt einen Systemaufruf, um eine Datei zu öffnen."
        },
        {
          de: "Ressource",
          pt: "recurso",
          explanation: "Etwas, das ein System nutzen und verwalten muss, zum Beispiel CPU oder RAM.",
          example: "Der Kernel verwaltet wichtige Ressourcen."
        },
        {
          de: "User Mode",
          pt: "modo usuário",
          explanation: "Ausführungsmodus mit eingeschränkten Rechten für normale Anwendungen.",
          example: "Ein Browser läuft normalerweise im User Mode."
        },
        {
          de: "Kernel Mode",
          pt: "modo kernel",
          explanation: "Privilegierter Modus für zentralen Systemcode.",
          example: "Kernel-Code läuft im Kernel Mode."
        },
        {
          de: "Treiber",
          pt: "driver",
          explanation: "Software, die Kommunikation mit Hardware ermöglicht.",
          example: "Der Netzwerktreiber ermöglicht die Kommunikation mit der Netzwerkkarte."
        },
        {
          de: "Hardwarezugriff",
          pt: "acesso ao hardware",
          explanation: "Nutzung oder Steuerung von Hardwarekomponenten.",
          example: "Der Kernel kontrolliert Hardwarezugriff."
        },
        {
          de: "Speicherschutz",
          pt: "proteção de memória",
          explanation: "Mechanismus, der Speicherbereiche vor unerlaubtem Zugriff schützt.",
          example: "Speicherschutz verhindert, dass ein Programm fremden Speicher verändert."
        },
        {
          de: "privilegiert",
          pt: "privilegiado",
          explanation: "Mit besonderen Rechten ausgestattet.",
          example: "Der Kernel läuft mit privilegierten Rechten."
        }
      ],
      summary: [
        "Der Kernel ist der zentrale Kern eines Betriebssystems. Er verwaltet wichtige Ressourcen wie CPU, Arbeitsspeicher, Geräte, Prozesse und Systemzugriffe.",
        "Normale Anwendungen greifen nicht einfach direkt und unbegrenzt auf Hardware zu. Sie nutzen Systemdienste und Systemaufrufe. Der Kernel kontrolliert viele dieser Zugriffe.",
        "Der Kernel ist wichtig für Stabilität und Sicherheit. Er hilft dabei, Prozesse zu kontrollieren, Speicher zu schützen und Hardware über Treiber anzusprechen.",
        "Für AP1 musst du nicht tiefe Kernel-Architektur kennen. Wichtig ist: Kernel = Kern des Betriebssystems, Ressourcenverwaltung, kontrollierter Zugriff, Systemaufrufe, Treiber und Schutz."
      ],
      mindMap: {
        title: "Mindmap: Kernel",
        code: "mindmap\n  root((Kernel))\n    Rolle\n      Kern des Betriebssystems\n      Ressourcen verwalten\n      Zugriffe kontrollieren\n    Ressourcen\n      CPU\n      RAM\n      Geräte\n      Prozesse\n      Dateien\n    Konzepte\n      Systemaufruf\n      User Mode\n      Kernel Mode\n      Treiber\n    AP1 Fokus\n      Definition\n      Anwendungen vs Kernel\n      Sicherheit\n      Stabilität"
      },
      exercises: {
        easy: [
          {
            question: "Was ist der Kernel?",
            answer: "Der Kernel ist der zentrale Kern des Betriebssystems.",
            explanation: "Er verwaltet wichtige Ressourcen und kontrolliert Zugriffe."
          },
          {
            question: "Ist der Kernel ein normales Anwendungsprogramm?",
            answer: "Nein.",
            explanation: "Der Kernel ist Systemcode mit besonderer Rolle und besonderen Rechten."
          },
          {
            question: "Was ist ein Systemaufruf?",
            answer: "Eine Anfrage eines Programms an das Betriebssystem.",
            explanation: "Programme nutzen Systemaufrufe, um Dienste des Kernels zu verwenden."
          },
          {
            question: "Nenne zwei Ressourcen, die der Kernel verwaltet.",
            answer: "CPU und Arbeitsspeicher.",
            explanation: "Auch Geräte, Prozesse und Systemzugriffe gehören dazu."
          },
          {
            question: "Was macht ein Treiber?",
            answer: "Er ermöglicht Kommunikation mit Hardware.",
            explanation: "Treiber helfen dem Betriebssystem, Geräte zu nutzen."
          }
        ],
        intermediate: [
          {
            question: "Warum sollten Anwendungen nicht direkt unbegrenzt auf Hardware zugreifen?",
            answer: "Das wäre unsicher und könnte das System instabil machen.",
            explanation: "Der Kernel kontrolliert Zugriffe, damit Programme Ressourcen geordnet und geschützt nutzen."
          },
          {
            question: "Erkläre den Unterschied zwischen Kernel und Betriebssystem.",
            answer: "Der Kernel ist der zentrale Kern des Betriebssystems, aber das Betriebssystem umfasst mehr als nur den Kernel.",
            explanation: "Zum Betriebssystem gehören auch Dienste, Werkzeuge, Benutzeroberflächen und Verwaltungsfunktionen."
          },
          {
            question: "Warum ist Speicherschutz wichtig?",
            answer: "Er verhindert, dass Programme unerlaubt auf fremde Speicherbereiche zugreifen.",
            explanation: "Das schützt Stabilität und Sicherheit."
          },
          {
            question: "Was ist der Unterschied zwischen User Mode und Kernel Mode?",
            answer: "User Mode hat eingeschränkte Rechte für normale Anwendungen. Kernel Mode hat privilegierte Rechte für Systemcode.",
            explanation: "Diese Trennung schützt wichtige Systemfunktionen."
          },
          {
            question: "Wie hängt ein Treiber mit dem Kernel zusammen?",
            answer: "Treiber arbeiten oft nah am Kernel und ermöglichen Hardwarekommunikation.",
            explanation: "Fehlerhafte Treiber können daher Systemprobleme verursachen."
          }
        ],
        ap1Style: [
          {
            question: "Ein Programm möchte eine geschützte Systemdatei ändern. Das Betriebssystem verweigert den Zugriff. Welche Rolle spielt der Kernel dabei?",
            answer: "Der Kernel kontrolliert den Zugriff und kann die Aktion verweigern.",
            explanation: "Zugriffe auf wichtige Ressourcen werden nicht beliebig erlaubt. Rechte und Schutzmechanismen verhindern unerlaubte Änderungen."
          },
          {
            question: "Ein Azubi sagt: Der Kernel ist einfach die grafische Oberfläche des Betriebssystems. Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "Die grafische Oberfläche ist nur eine Benutzeroberfläche. Der Kernel ist der zentrale Systemkern im Hintergrund."
          },
          {
            question: "Ein Programm öffnet eine Datei. Beschreiben Sie vereinfacht, warum dabei ein Systemaufruf genutzt wird.",
            answer: "Das Programm fragt das Betriebssystem an, damit der Kernel den Zugriff kontrolliert ausführt.",
            explanation: "Der Kernel prüft Berechtigungen und arbeitet mit Dateisystem und Speichergerät zusammen."
          },
          {
            question: "Ordnen Sie zu: Kernel, Treiber, Anwendung. Wer kontrolliert zentrale Ressourcen, wer ermöglicht Hardwarekommunikation, wer löst Benutzeraufgaben?",
            answer: "Kernel kontrolliert zentrale Ressourcen. Treiber ermöglicht Hardwarekommunikation. Anwendung löst Benutzeraufgaben.",
            explanation: "Diese Rollen sind für AP1-Grundverständnis wichtig."
          },
          {
            question: "Ein fehlerhafter Gerätetreiber verursacht Systemabstürze. Warum kann ein Treiber so starke Auswirkungen haben?",
            answer: "Treiber arbeiten oft sehr nah am Kernel und an Hardwarezugriffen.",
            explanation: "Fehler in systemnaher Software können Stabilität stärker beeinflussen als normale Anwendungsfehler."
          }
        ]
      },
      related: {
        previous: "Was ist ein Betriebssystem?",
        next: "Boot-Prozess"
      },
      revisionChecklist: [
        "Ich kann erklären, was der Kernel ist.",
        "Ich kann Kernel und Betriebssystem unterscheiden.",
        "Ich verstehe, warum Programme Systemaufrufe nutzen.",
        "Ich kann User Mode und Kernel Mode einfach erklären.",
        "Ich verstehe die Verbindung zwischen Kernel, Treibern und Hardware.",
        "Ich kann erklären, warum der Kernel für Sicherheit und Stabilität wichtig ist.",
        "Ich kann AP1-Fragen zum Kernel beantworten."
      ]
    }
  },
  {
    id: "boot",
    title: "Boot-Prozess",
    description: "Der Boot-Prozess beschreibt, wie ein Computer vom Einschalten bis zum geladenen Betriebssystem startet.",
    text: [
      "Der Boot-Prozess ist der Startvorgang eines Computers. Dabei werden Hardware, Firmware, Bootloader und Betriebssystem Schritt für Schritt vorbereitet.",
      "Für die AP1 ist wichtig: Du musst die Reihenfolge verstehen und zentrale Begriffe wie BIOS, UEFI, Bootloader, Bootmedium und Betriebssystem laden erklären können."
    ],
    ihk: "Wichtig für AP1: Boot-Prozess = Startvorgang. Firmware prüft Hardware, sucht ein Bootmedium, startet den Bootloader und lädt das Betriebssystem.",
    summary: "Boot-Prozess é o processo de inicialização do computador: firmware, teste básico de hardware, escolha do dispositivo de boot, bootloader e carregamento do sistema operacional.",
    example: "Wenn ein PC nicht startet, kann eine falsche Boot-Reihenfolge, ein defektes Bootmedium oder ein beschädigter Bootloader die Ursache sein.",
    exercises: [
      {
        question: "Was bedeutet Boot-Prozess?",
        answer: "Der Boot-Prozess ist der Startvorgang eines Computers bis zum geladenen Betriebssystem."
      }
    ],
    studyTime: "75-90 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "75-90 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Der Boot-Prozess ist für AP1 wichtig, weil er zeigt, wie Hardware und Betriebssystem zusammenkommen. Ohne diesen Ablauf kann ein Computer nicht sinnvoll genutzt werden.",
          "Die IHK fragt meistens keine tiefen Firmware-Details. Wichtig ist die verständliche Reihenfolge: Einschalten, Firmware, Hardwareprüfung, Bootmedium, Bootloader, Betriebssystem.",
          "Português de apoio: Boot é o caminho entre apertar o botão de ligar e o sistema operacional estar pronto para uso."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain the Boot-Prozess in simple German.",
        "After this chapter the student will be able to describe the roles of BIOS, UEFI, Bootmedium and Bootloader.",
        "After this chapter the student will be able to explain why a computer needs a bootable storage device.",
        "After this chapter the student will be able to identify common boot errors at AP1 level.",
        "After this chapter the student will be able to distinguish Firmware, Bootloader and Betriebssystem.",
        "After this chapter the student will be able to solve AP1-style questions about startup problems."
      ],
      introduction: [
        "Ein Computer ist nach dem Einschalten nicht sofort bereit. Zuerst muss das System herausfinden, welche Hardware vorhanden ist und von welchem Speichermedium gestartet werden soll.",
        "Dieser Startvorgang heißt Boot-Prozess. Das Wort Boot kommt vom englischen Begriff bootstrapping. Im Alltag sagt man einfach: Der Computer startet.",
        "Der Boot-Prozess ist ein gutes AP1-Thema, weil er viele Grundlagen verbindet: Hardware, Firmware, Speicher, Betriebssystem und Fehlerdiagnose.",
        "Du musst nicht jeden internen Spezialschritt auswendig kennen. Wichtig ist, dass du die Hauptstationen und ihre Aufgaben sicher erklären kannst."
      ],
      explanation: [
        {
          title: "Was ist der Boot-Prozess?",
          paragraphs: [
            "Der Boot-Prozess ist der Ablauf vom Einschalten eines Computers bis zum Start des Betriebssystems.",
            "In dieser Zeit wird die Hardware vorbereitet, ein startfähiges Speichermedium gesucht und das Betriebssystem geladen.",
            "Der Computer braucht diesen Ablauf, weil sich das Betriebssystem zuerst auf einem Speichermedium befindet, zum Beispiel auf einer SSD. Es muss in den Arbeitsspeicher geladen und gestartet werden."
          ]
        },
        {
          title: "Warum ist Booten notwendig?",
          paragraphs: [
            "Die CPU kann nicht einfach von selbst ein vollständiges Betriebssystem starten. Nach dem Einschalten braucht sie erste Anweisungen.",
            "Diese ersten Anweisungen kommen aus der Firmware. Die Firmware ist dauerhaft auf dem Mainboard gespeichert.",
            "Sie startet den grundlegenden Ablauf, prüft wichtige Hardware und sucht ein Gerät, von dem das Betriebssystem gestartet werden kann."
          ]
        },
        {
          title: "Firmware: BIOS und UEFI",
          paragraphs: [
            "Firmware ist spezielle Software, die fest mit Hardware verbunden ist. Beim PC befindet sie sich auf dem Mainboard.",
            "BIOS ist die ältere Firmware-Variante. UEFI ist der modernere Nachfolger und bietet mehr Funktionen, zum Beispiel grafischere Einstellungen, Unterstützung großer Datenträger und Secure Boot.",
            "Für AP1 ist wichtig: BIOS und UEFI starten den Computer nicht als normales Betriebssystem, sondern bereiten den Start des Betriebssystems vor."
          ]
        },
        {
          title: "Hardwareprüfung",
          paragraphs: [
            "Nach dem Einschalten prüft die Firmware grundlegende Hardware. Dazu gehören zum Beispiel CPU, RAM, Tastatur, Datenträger oder andere wichtige Komponenten.",
            "Diese Prüfung wird oft POST genannt. POST bedeutet Power-On Self-Test.",
            "Wenn ein schwerer Fehler erkannt wird, kann der Start abbrechen. Manchmal zeigt der Computer Fehlermeldungen, Signalton-Codes oder Diagnose-LEDs an."
          ]
        },
        {
          title: "Boot-Reihenfolge und Bootmedium",
          paragraphs: [
            "Die Firmware muss wissen, von welchem Gerät gestartet werden soll. Dieses Gerät nennt man Bootmedium.",
            "Ein Bootmedium kann zum Beispiel eine SSD, ein USB-Stick, eine DVD oder ein Netzwerkstart sein.",
            "Die Boot-Reihenfolge legt fest, welches Gerät zuerst geprüft wird. Wenn ein USB-Stick vor der SSD steht, kann der Computer versuchen, zuerst vom USB-Stick zu starten."
          ]
        },
        {
          title: "Bootloader",
          paragraphs: [
            "Der Bootloader ist ein kleines Programm, das den Start des Betriebssystems vorbereitet.",
            "Er wird vom Bootmedium geladen und startet dann das eigentliche Betriebssystem beziehungsweise den Betriebssystemkern.",
            "Ohne funktionierenden Bootloader kann das Betriebssystem auf dem Datenträger vorhanden sein, aber trotzdem nicht starten."
          ]
        },
        {
          title: "Betriebssystem laden",
          paragraphs: [
            "Nach dem Bootloader wird das Betriebssystem geladen. Dabei wird wichtiger Systemcode in den Arbeitsspeicher gebracht.",
            "Der Kernel wird gestartet und beginnt, zentrale Ressourcen zu verwalten.",
            "Danach werden weitere Dienste, Treiber und Benutzeroberflächen geladen, bis der Benutzer sich anmelden oder arbeiten kann."
          ]
        },
        {
          title: "Boot-Prozess vereinfacht",
          paragraphs: [
            "Für AP1 kannst du dir die Reihenfolge so merken: Strom an, Firmware startet, Hardware wird geprüft, Bootmedium wird gesucht, Bootloader startet, Betriebssystem wird geladen.",
            "Diese einfache Reihenfolge reicht für die meisten Grundlagenfragen.",
            "Wichtig ist, dass du die Begriffe nicht verwechselst: Firmware ist nicht das Betriebssystem, der Bootloader ist nicht der Kernel, und das Bootmedium ist der Datenträger, von dem gestartet wird."
          ],
          steps: [
            "1. Computer wird eingeschaltet.",
            "2. Firmware startet.",
            "3. Hardware wird grundlegend geprüft.",
            "4. Bootmedium wird nach Boot-Reihenfolge gesucht.",
            "5. Bootloader wird geladen.",
            "6. Betriebssystem und Kernel starten.",
            "7. Dienste, Treiber und Benutzeranmeldung werden vorbereitet."
          ]
        },
        {
          title: "Typische Boot-Probleme",
          paragraphs: [
            "Wenn ein Computer nicht startet, kann der Fehler an verschiedenen Stellen liegen.",
            "Eine falsche Boot-Reihenfolge kann dazu führen, dass der PC vom falschen Gerät starten möchte.",
            "Ein defekter Datenträger, ein beschädigter Bootloader oder fehlende Betriebssystemdateien können ebenfalls den Start verhindern.",
            "Für AP1 ist wichtig, Fehler logisch dem richtigen Teil des Boot-Prozesses zuzuordnen."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Büro-PC startet nach einem Update nicht mehr. Die Ursache kann ein beschädigter Bootloader oder ein Problem mit Systemdateien sein.",
        "Ein Azubi installiert ein Betriebssystem von einem USB-Stick. Dafür muss der USB-Stick als Bootmedium ausgewählt werden.",
        "Ein Computer zeigt beim Start eine Meldung wie 'No bootable device'. Das bedeutet oft, dass kein startfähiges Medium gefunden wurde.",
        "In einem Unternehmen wird über Netzwerk gebootet, damit mehrere Clients zentral installiert oder gewartet werden können."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: PC startet vom falschen Medium",
          paragraphs: [
            "Ein Mitarbeiter lässt einen USB-Stick im Computer. Beim Start versucht der PC, vom USB-Stick zu booten, obwohl Windows auf der SSD liegt.",
            "Das Problem liegt nicht unbedingt am Betriebssystem. Es kann an der Boot-Reihenfolge liegen."
          ],
          steps: [
            "PC wird eingeschaltet.",
            "Firmware prüft die Boot-Reihenfolge.",
            "USB-Stick steht vor der SSD.",
            "Firmware versucht vom USB-Stick zu starten.",
            "Wenn der USB-Stick nicht bootfähig ist, erscheint eine Fehlermeldung.",
            "Lösung: Boot-Reihenfolge anpassen oder USB-Stick entfernen."
          ]
        },
        {
          title: "Szenario 2: Betriebssystem vorhanden, startet aber nicht",
          paragraphs: [
            "Auf einer SSD ist ein Betriebssystem installiert. Trotzdem startet der Computer nicht.",
            "Eine mögliche Ursache ist ein beschädigter Bootloader. Dann findet der Startvorgang das Betriebssystem nicht korrekt."
          ],
          steps: [
            "Firmware findet die SSD.",
            "Bootloader soll gestartet werden.",
            "Bootloader ist beschädigt oder fehlt.",
            "Betriebssystem wird nicht geladen.",
            "Fehlersuche konzentriert sich auf Bootloader, Datenträger und Systemstart."
          ]
        }
      ],
      diagrams: [
        {
          title: "Boot-Prozess als Ablauf",
          code: "flowchart TD\n  A[Computer einschalten] --> B[Firmware startet: BIOS oder UEFI]\n  B --> C[Hardwareprüfung / POST]\n  C --> D[Boot-Reihenfolge prüfen]\n  D --> E[Bootmedium finden]\n  E --> F[Bootloader laden]\n  F --> G[Betriebssystem und Kernel starten]\n  G --> H[Dienste, Treiber, Anmeldung]"
        },
        {
          title: "Rollen im Boot-Prozess",
          code: "flowchart LR\n  FW[Firmware] --> BM[Bootmedium]\n  BM --> BL[Bootloader]\n  BL --> OS[Betriebssystem]\n  OS --> K[Kernel]\n  K --> S[System ist nutzbar]"
        }
      ],
      ihkFocus: {
        appears: [
          "Reihenfolge des Boot-Prozesses beschreiben.",
          "BIOS und UEFI als Firmware einordnen.",
          "Bootmedium und Boot-Reihenfolge erklären.",
          "Aufgabe des Bootloaders nennen.",
          "Fehlermeldungen wie 'No bootable device' einordnen.",
          "Unterschied zwischen Firmware, Bootloader und Betriebssystem erklären."
        ],
        commonMistakes: [
          "BIOS oder UEFI mit dem Betriebssystem verwechseln.",
          "Bootloader und Kernel gleichsetzen.",
          "Bootmedium als Arbeitsspeicher beschreiben.",
          "Bei Startproblemen sofort das Betriebssystem verantwortlich machen.",
          "Die Reihenfolge Firmware -> Bootloader -> Betriebssystem falsch erklären."
        ],
        importantDetails: [
          "Firmware startet zuerst.",
          "POST prüft grundlegende Hardware.",
          "Boot-Reihenfolge bestimmt, welches Medium zuerst geprüft wird.",
          "Bootloader startet das Betriebssystem.",
          "Der Kernel wird beim Betriebssystemstart geladen.",
          "Boot-Probleme lassen sich oft durch logische Reihenfolge eingrenzen."
        ],
        confusedConcepts: [
          "BIOS vs UEFI.",
          "Firmware vs Betriebssystem.",
          "Bootloader vs Kernel.",
          "Bootmedium vs Speichermedium allgemein.",
          "POST vs vollständige Hardwarediagnose."
        ],
        vocabulary: [
          "Boot-Prozess = Startvorgang des Computers.",
          "Firmware = hardwarenahe Software auf dem Mainboard.",
          "BIOS/UEFI = Firmware für den Systemstart.",
          "Bootmedium = startfähiger Datenträger.",
          "Bootloader = Programm, das das Betriebssystem startet."
        ]
      },
      commonMistakes: [
        "Zu sagen: UEFI ist Windows. UEFI ist Firmware auf dem Mainboard, nicht das Betriebssystem.",
        "Zu sagen: Der Bootloader ist der Kernel. Der Bootloader startet das Betriebssystem; der Kernel ist der zentrale Betriebssystemkern.",
        "Zu glauben, dass jeder USB-Stick automatisch ein Bootmedium ist. Ein Bootmedium muss startfähig vorbereitet sein.",
        "Boot-Reihenfolge und Dateisystem zu verwechseln. Die Boot-Reihenfolge legt nur fest, welches Gerät zuerst geprüft wird.",
        "POST als vollständigen Langzeittest der Hardware zu verstehen. POST ist eine grundlegende Startprüfung."
      ],
      vocabulary: [
        {
          de: "Boot-Prozess",
          pt: "processo de inicialização",
          explanation: "Ablauf vom Einschalten bis zum gestarteten Betriebssystem.",
          example: "Der Boot-Prozess lädt das Betriebssystem."
        },
        {
          de: "Firmware",
          pt: "firmware",
          explanation: "Spezielle Software, die fest mit Hardware verbunden ist.",
          example: "Die Firmware startet direkt nach dem Einschalten."
        },
        {
          de: "BIOS",
          pt: "BIOS",
          explanation: "Ältere Firmware-Variante für den Start eines PCs.",
          example: "Das BIOS prüft beim Start grundlegende Hardware."
        },
        {
          de: "UEFI",
          pt: "UEFI",
          explanation: "Moderner Nachfolger des BIOS mit erweiterten Funktionen.",
          example: "UEFI kann Secure Boot unterstützen."
        },
        {
          de: "POST",
          pt: "autoteste ao ligar",
          explanation: "Grundlegende Hardwareprüfung nach dem Einschalten.",
          example: "Beim POST wird unter anderem geprüft, ob RAM vorhanden ist."
        },
        {
          de: "Bootmedium",
          pt: "mídia de boot",
          explanation: "Startfähiges Gerät, von dem ein Betriebssystem geladen werden kann.",
          example: "Eine SSD oder ein USB-Stick kann ein Bootmedium sein."
        },
        {
          de: "Boot-Reihenfolge",
          pt: "ordem de boot",
          explanation: "Reihenfolge, in der die Firmware nach startfähigen Medien sucht.",
          example: "Wenn USB zuerst steht, prüft die Firmware zuerst den USB-Stick."
        },
        {
          de: "Bootloader",
          pt: "carregador de inicialização",
          explanation: "Kleines Programm, das den Start des Betriebssystems vorbereitet.",
          example: "Der Bootloader lädt das Betriebssystem."
        },
        {
          de: "Startvorgang",
          pt: "processo de partida",
          explanation: "Allgemeiner Begriff für den Ablauf beim Starten eines Systems.",
          example: "Der Startvorgang kann durch falsche Einstellungen gestört werden."
        },
        {
          de: "No bootable device",
          pt: "nenhum dispositivo inicializável",
          explanation: "Fehlermeldung, wenn kein startfähiges Medium gefunden wird.",
          example: "Die Meldung 'No bootable device' weist auf ein Problem mit dem Bootmedium hin."
        }
      ],
      summary: [
        "Der Boot-Prozess ist der Startvorgang eines Computers. Er beginnt beim Einschalten und endet, wenn das Betriebssystem geladen ist und das System benutzt werden kann.",
        "Zuerst startet die Firmware. Bei PCs sind BIOS und UEFI wichtige Firmware-Begriffe. Die Firmware prüft grundlegende Hardware und sucht nach einem startfähigen Bootmedium.",
        "Die Boot-Reihenfolge bestimmt, welches Gerät zuerst geprüft wird. Ein Bootmedium kann zum Beispiel eine SSD oder ein USB-Stick sein. Danach startet der Bootloader das Betriebssystem.",
        "Der Bootloader ist nicht der Kernel. Er bereitet den Start des Betriebssystems vor. Danach wird der Kernel geladen, und weitere Dienste, Treiber und Benutzerfunktionen starten.",
        "Für AP1 ist besonders wichtig, die Reihenfolge und die Begriffe sicher zu erklären: Firmware, POST, Boot-Reihenfolge, Bootmedium, Bootloader und Betriebssystem."
      ],
      mindMap: {
        title: "Mindmap: Boot-Prozess",
        code: "mindmap\n  root((Boot-Prozess))\n    Start\n      Einschalten\n      Firmware\n      BIOS\n      UEFI\n    Prüfung\n      POST\n      Hardware grundlegend prüfen\n    Medium\n      Boot-Reihenfolge\n      SSD\n      USB-Stick\n      Netzwerk\n    Laden\n      Bootloader\n      Betriebssystem\n      Kernel\n    AP1 Fokus\n      Reihenfolge erklären\n      Begriffe unterscheiden\n      Fehler einordnen"
      },
      exercises: {
        easy: [
          {
            question: "Was ist der Boot-Prozess?",
            answer: "Der Boot-Prozess ist der Startvorgang eines Computers bis zum geladenen Betriebssystem.",
            explanation: "Er umfasst Firmware, Hardwareprüfung, Bootmedium, Bootloader und Betriebssystemstart."
          },
          {
            question: "Was startet direkt nach dem Einschalten eines PCs?",
            answer: "Die Firmware, zum Beispiel BIOS oder UEFI.",
            explanation: "Die Firmware befindet sich auf dem Mainboard und startet vor dem Betriebssystem."
          },
          {
            question: "Was ist ein Bootmedium?",
            answer: "Ein startfähiges Gerät, von dem ein Betriebssystem geladen werden kann.",
            explanation: "Beispiele sind SSD, USB-Stick oder Netzwerkstart."
          },
          {
            question: "Was macht der Bootloader?",
            answer: "Er bereitet den Start des Betriebssystems vor und lädt es.",
            explanation: "Der Bootloader ist ein Zwischenschritt zwischen Firmware und Betriebssystem."
          },
          {
            question: "Wofür steht POST?",
            answer: "Power-On Self-Test.",
            explanation: "POST ist eine grundlegende Hardwareprüfung beim Start."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen UEFI und Betriebssystem.",
            answer: "UEFI ist Firmware auf dem Mainboard. Das Betriebssystem ist die grundlegende Software, die nach dem Booten die Arbeit des Computers verwaltet.",
            explanation: "UEFI startet den Computer und bereitet den Betriebssystemstart vor, ist aber nicht selbst Windows oder Linux."
          },
          {
            question: "Warum ist die Boot-Reihenfolge wichtig?",
            answer: "Sie bestimmt, welches Gerät zuerst als Bootmedium geprüft wird.",
            explanation: "Eine falsche Reihenfolge kann dazu führen, dass der Computer vom falschen Medium starten möchte."
          },
          {
            question: "Warum kann ein PC trotz vorhandener SSD nicht starten?",
            answer: "Mögliche Ursachen sind falsche Boot-Reihenfolge, defekter Bootloader, defekter Datenträger oder fehlende Systemdateien.",
            explanation: "Das Problem muss logisch im Boot-Prozess eingeordnet werden."
          },
          {
            question: "Warum ist der Bootloader nicht dasselbe wie der Kernel?",
            answer: "Der Bootloader startet das Betriebssystem. Der Kernel ist der zentrale Kern des Betriebssystems.",
            explanation: "Der Bootloader kommt im Startablauf vor dem laufenden Kernel."
          },
          {
            question: "Welche Aufgabe hat POST beim Start?",
            answer: "POST prüft grundlegende Hardwarefunktionen.",
            explanation: "Wenn schwere Fehler erkannt werden, kann der Start abbrechen oder eine Fehlermeldung erscheinen."
          }
        ],
        ap1Style: [
          {
            question: "Ein Computer zeigt beim Start die Meldung 'No bootable device'. Nennen Sie zwei mögliche Ursachen.",
            answer: "Mögliche Ursachen sind: kein startfähiges Medium vorhanden, falsche Boot-Reihenfolge, defekter Datenträger oder beschädigter Bootloader.",
            explanation: "Die Meldung zeigt, dass die Firmware kein geeignetes Medium für den Betriebssystemstart gefunden hat."
          },
          {
            question: "Bringen Sie die Schritte in die richtige Reihenfolge: Betriebssystem laden, Firmware startet, Bootloader starten, Computer einschalten, Bootmedium suchen.",
            answer: "Computer einschalten -> Firmware startet -> Bootmedium suchen -> Bootloader starten -> Betriebssystem laden.",
            explanation: "Diese Reihenfolge beschreibt den vereinfachten Boot-Prozess auf AP1-Niveau."
          },
          {
            question: "Ein Azubi sagt: 'Das BIOS ist das gleiche wie Windows, nur vor dem Login.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "BIOS beziehungsweise UEFI ist Firmware. Windows ist ein Betriebssystem, das erst später gestartet wird."
          },
          {
            question: "Ein Unternehmen möchte neue PCs per USB-Stick installieren. Welche Einstellung kann im UEFI wichtig sein?",
            answer: "Die Boot-Reihenfolge oder die Auswahl des USB-Sticks als Bootmedium.",
            explanation: "Damit der PC vom Installationsstick startet, muss dieser als startfähiges Medium verwendet werden."
          },
          {
            question: "Erklären Sie den Zusammenhang zwischen Bootloader und Betriebssystemstart.",
            answer: "Der Bootloader wird vom Bootmedium geladen und startet beziehungsweise lädt das Betriebssystem.",
            explanation: "Er ist ein kleiner, aber wichtiger Zwischenschritt im Startvorgang."
          }
        ]
      },
      related: {
        previous: "Kernel",
        next: "Dateisysteme"
      },
      revisionChecklist: [
        "Ich kann den Boot-Prozess in der richtigen Reihenfolge erklären.",
        "Ich kann BIOS und UEFI als Firmware einordnen.",
        "Ich kann Bootmedium, Boot-Reihenfolge und Bootloader unterscheiden.",
        "Ich verstehe, warum der Computer ein startfähiges Medium braucht.",
        "Ich kann typische Boot-Probleme logisch zuordnen.",
        "Ich kann erklären, warum Firmware nicht dasselbe wie Betriebssystem ist.",
        "Ich kann AP1-Fragen zum Boot-Prozess beantworten."
      ]
    }
  },
  {
    id: "dateisysteme",
    title: "Dateisysteme",
    description: "Dateisysteme organisieren, wie Dateien auf Speichermedien gespeichert, gefunden, benannt und geschützt werden.",
    text: [
      "Ein Dateisystem legt fest, wie Daten auf einem Speichermedium als Dateien und Ordner organisiert werden.",
      "Für die AP1 musst du verstehen, was Dateien, Verzeichnisse, Pfade, Metadaten, Rechte und typische Dateisysteme wie NTFS, FAT32 und ext4 bedeuten."
    ],
    ihk: "Wichtig für AP1: Dateisysteme strukturieren Daten auf Datenträgern. Zentrale Begriffe sind Datei, Verzeichnis, Pfad, Metadaten, Rechte, Partition und Formatierung.",
    summary: "Sistema de arquivos define como arquivos e pastas são organizados, encontrados, nomeados e protegidos em um armazenamento como SSD, HDD ou USB-Stick.",
    example: "Wenn ein Benutzer eine Datei im Ordner Dokumente speichert, sorgt das Dateisystem dafür, dass Name, Speicherort, Größe, Rechte und Inhalt verwaltet werden.",
    exercises: [
      {
        question: "Was ist ein Dateisystem?",
        answer: "Ein Dateisystem organisiert Dateien und Verzeichnisse auf einem Speichermedium."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Dateisysteme sind für AP1 wichtig, weil fast jedes Betriebssystem Dateien speichern, finden und schützen muss. Viele praktische Aufgaben im IT-Alltag hängen davon ab.",
          "Die IHK fragt meistens keine tiefen internen Details wie Inodes oder Dateisystemtreiber. Wichtig sind Grundbegriffe, Unterschiede, Pfade, Rechte und typische Einsatzbereiche.",
          "Português de apoio: pense no Dateisystem como a regra de organização do armazenamento. Sem ele, o sistema não saberia onde um arquivo começa, onde termina e quem pode acessá-lo."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Dateisystem is.",
        "After this chapter the student will be able to distinguish Datei, Verzeichnis, Pfad and Laufwerk.",
        "After this chapter the student will be able to explain why metadata and permissions are important.",
        "After this chapter the student will be able to compare NTFS, FAT32 and ext4 at AP1 level.",
        "After this chapter the student will be able to explain formatting and partitions in simple words.",
        "After this chapter the student will be able to solve AP1-style questions about file organization and access problems."
      ],
      introduction: [
        "Ein Computer speichert viele Daten: Programme, Bilder, Dokumente, Logdateien, Konfigurationen und Betriebssystemdateien.",
        "Damit diese Daten nicht als unstrukturierte Masse auf SSD oder HDD liegen, braucht das Betriebssystem eine Ordnung. Diese Ordnung liefert das Dateisystem.",
        "Ein Dateisystem beantwortet grundlegende Fragen: Wie heißt eine Datei? In welchem Ordner liegt sie? Wie groß ist sie? Wer darf sie öffnen? Wo liegen ihre Daten auf dem Datenträger?",
        "Für AP1 ist Dateisysteme ein wichtiges Grundlagenkapitel, weil es Betriebssysteme, Speicher, Rechte, Datensicherung und Fehlersuche verbindet."
      ],
      explanation: [
        {
          title: "Was ist ein Dateisystem?",
          paragraphs: [
            "Ein Dateisystem ist eine Struktur, mit der ein Betriebssystem Dateien auf einem Speichermedium organisiert.",
            "Es legt fest, wie Dateien benannt, gespeichert, gefunden, geändert und gelöscht werden.",
            "Ohne Dateisystem könnte ein Betriebssystem nicht sinnvoll mit Dokumenten, Ordnern und Programmen arbeiten."
          ]
        },
        {
          title: "Datei",
          paragraphs: [
            "Eine Datei ist eine benannte Einheit von Daten. Beispiele sind ein Textdokument, ein Bild, ein Programm oder eine Konfigurationsdatei.",
            "Eine Datei hat normalerweise einen Namen, einen Speicherort, eine Größe, einen Typ und bestimmte Rechte.",
            "Für Benutzer wirkt eine Datei wie ein einzelnes Objekt. Technisch kann der Inhalt aber auf dem Speichermedium in Blöcken organisiert sein."
          ]
        },
        {
          title: "Verzeichnis und Ordner",
          paragraphs: [
            "Ein Verzeichnis ist eine Struktur, die Dateien und weitere Verzeichnisse enthalten kann.",
            "Im Alltag sagt man oft Ordner. In der IT und in Prüfungen ist Verzeichnis ein wichtiger Fachbegriff.",
            "Verzeichnisse helfen, Daten logisch zu gruppieren, zum Beispiel nach Projekt, Benutzer oder Anwendung."
          ]
        },
        {
          title: "Pfad",
          paragraphs: [
            "Ein Pfad beschreibt den Ort einer Datei oder eines Verzeichnisses im Dateisystem.",
            "Unter Windows kann ein Pfad zum Beispiel so aussehen: C:\\Users\\Mira\\Dokumente\\bericht.docx.",
            "Unter Linux kann ein Pfad zum Beispiel so aussehen: /home/mira/dokumente/bericht.txt.",
            "Für AP1 ist wichtig: Ein Pfad zeigt, wo etwas liegt. Er ist nicht der Inhalt der Datei."
          ]
        },
        {
          title: "Absolute und relative Pfade",
          paragraphs: [
            "Ein absoluter Pfad beginnt an einem festen Startpunkt. Unter Windows ist das oft ein Laufwerk wie C:\\. Unter Linux beginnt ein absoluter Pfad mit /.",
            "Ein relativer Pfad beginnt vom aktuellen Arbeitsverzeichnis aus.",
            "Relative Pfade sind nützlich in Programmen, Skripten und Projekten, können aber zu Fehlern führen, wenn das aktuelle Verzeichnis nicht das erwartete ist."
          ]
        },
        {
          title: "Metadaten",
          paragraphs: [
            "Metadaten sind Daten über eine Datei. Sie beschreiben die Datei, ohne unbedingt ihr eigentlicher Inhalt zu sein.",
            "Beispiele sind Dateiname, Größe, Erstellungsdatum, Änderungsdatum, Besitzer und Rechte.",
            "Metadaten sind wichtig für Suche, Verwaltung, Sortierung, Sicherheit und Backup."
          ]
        },
        {
          title: "Rechte und Berechtigungen",
          paragraphs: [
            "Viele Dateisysteme speichern Rechte. Rechte legen fest, wer eine Datei lesen, ändern, ausführen oder löschen darf.",
            "In Unternehmen ist das wichtig, damit nicht jeder Benutzer alle Daten sehen oder verändern kann.",
            "Für AP1 reicht die Grundidee: Berechtigungen schützen Daten und unterstützen das Prinzip der minimalen Rechte."
          ]
        },
        {
          title: "Partition und Formatierung",
          paragraphs: [
            "Ein physischer Datenträger kann in Partitionen aufgeteilt werden. Eine Partition ist ein logisch abgegrenzter Bereich eines Datenträgers.",
            "Formatieren bedeutet, eine Partition mit einem Dateisystem vorzubereiten.",
            "Wichtig: Beim Formatieren können vorhandene Daten gelöscht oder überschrieben werden. Deshalb ist Formatieren keine harmlose Aktion."
          ]
        },
        {
          title: "Typische Dateisysteme",
          paragraphs: [
            "NTFS wird häufig unter Windows verwendet. Es unterstützt Rechte, große Dateien und viele Funktionen für moderne Systeme.",
            "FAT32 ist älter und sehr kompatibel, hat aber wichtige Grenzen, zum Beispiel bei der maximalen Dateigröße.",
            "exFAT wird oft für USB-Sticks und externe Datenträger genutzt, wenn größere Dateien und Kompatibilität wichtig sind.",
            "ext4 ist ein häufiges Dateisystem unter Linux."
          ]
        },
        {
          title: "Warum Dateisysteme für Fehleranalyse wichtig sind",
          paragraphs: [
            "Viele IT-Probleme wirken zuerst allgemein, haben aber eine Dateisystem-Ursache.",
            "Beispiele: Ein Benutzer kann eine Datei nicht öffnen, weil Rechte fehlen. Ein USB-Stick nimmt eine große Datei nicht an, weil FAT32 eine Größenbegrenzung hat.",
            "Ein Programm findet eine Datei nicht, weil der Pfad falsch ist. Ein Datenträger erscheint leer, weil die Partition oder das Dateisystem beschädigt ist."
          ]
        }
      ],
      realWorldExamples: [
        "Eine Firma nutzt NTFS auf Windows-Clients, damit Benutzerrechte für Projektordner sauber gesetzt werden können.",
        "Ein Azubi kann eine Datei nicht speichern, weil er im Zielordner keine Schreibrechte hat.",
        "Ein USB-Stick mit FAT32 kann eine sehr große Videodatei nicht speichern, obwohl insgesamt genug Speicherplatz frei ist.",
        "Ein Linux-Server verwendet ext4 für Datenpartitionen und speichert Konfigurationsdateien in Verzeichnissen wie /etc.",
        "Ein Backup-System nutzt Metadaten wie Änderungsdatum, um zu entscheiden, welche Dateien neu gesichert werden müssen."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Datei kann nicht gespeichert werden",
          paragraphs: [
            "Eine Mitarbeiterin möchte einen Bericht in einem Projektordner speichern. Das System meldet, dass der Zugriff verweigert wurde.",
            "Der Datenträger ist nicht unbedingt defekt. Häufig fehlen Schreibrechte im Zielverzeichnis."
          ],
          steps: [
            "Benutzer wählt Zielordner.",
            "Betriebssystem prüft Rechte.",
            "Dateisystem enthält Berechtigungsinformationen.",
            "Benutzer hat kein Schreibrecht.",
            "Speichern wird verweigert.",
            "Lösung: Rechte prüfen oder passenden Ordner verwenden."
          ]
        },
        {
          title: "Szenario 2: Große Datei passt nicht auf USB-Stick",
          paragraphs: [
            "Ein USB-Stick zeigt 20 GB freien Speicher an. Trotzdem kann eine Datei mit 6 GB nicht kopiert werden.",
            "Eine mögliche Ursache ist FAT32. Dieses Dateisystem ist kompatibel, unterstützt aber keine einzelnen Dateien über einer bestimmten Größenbegrenzung."
          ],
          steps: [
            "Freier Speicherplatz wird geprüft.",
            "Dateigröße wird geprüft.",
            "Dateisystem des USB-Sticks wird geprüft.",
            "FAT32-Grenze wird erkannt.",
            "Lösung: anderes Dateisystem wie exFAT oder NTFS verwenden, wenn passend."
          ]
        }
      ],
      diagrams: [
        {
          title: "Dateisystem als Ordnungsschicht",
          code: "flowchart TD\n  U[Benutzer / Programm] --> OS[Betriebssystem]\n  OS --> FS[Dateisystem]\n  FS --> M[Metadaten]\n  FS --> D[Dateien und Verzeichnisse]\n  FS --> R[Rechte]\n  FS --> S[Speichermedium: SSD / HDD / USB]"
        },
        {
          title: "Pfadstruktur",
          code: "flowchart TD\n  ROOT[Root / Laufwerk] --> USERS[Users oder home]\n  USERS --> USER[Mira]\n  USER --> DOCS[Dokumente]\n  DOCS --> FILE[bericht.docx]"
        }
      ],
      ihkFocus: {
        appears: [
          "Grundfunktion eines Dateisystems erklären.",
          "Datei, Verzeichnis und Pfad unterscheiden.",
          "Absolute und relative Pfade erkennen.",
          "Metadaten und Berechtigungen nennen.",
          "Typische Dateisysteme wie NTFS, FAT32, exFAT und ext4 einordnen.",
          "Einfache Fehlerfälle zu Speicher, Pfad oder Rechten analysieren."
        ],
        commonMistakes: [
          "Dateisystem mit Betriebssystem verwechseln.",
          "Ordner und Datei nicht klar unterscheiden.",
          "Pfad als Dateiinhalt verstehen.",
          "Nur freien Speicherplatz betrachten und Dateisystemgrenzen vergessen.",
          "Formatieren als ungefährliche Aktion beschreiben."
        ],
        importantDetails: [
          "Dateisysteme organisieren Daten auf Speichermedien.",
          "Pfade zeigen Speicherorte.",
          "Metadaten beschreiben Dateien.",
          "Berechtigungen schützen Zugriff.",
          "FAT32 ist kompatibel, aber begrenzt.",
          "NTFS unterstützt Rechte und große Dateien.",
          "Formatieren bereitet eine Partition mit einem Dateisystem vor."
        ],
        confusedConcepts: [
          "Dateisystem vs Betriebssystem.",
          "Partition vs Dateisystem.",
          "Formatieren vs Löschen.",
          "Datei vs Verzeichnis.",
          "Absoluter Pfad vs relativer Pfad.",
          "Speicherplatz frei vs maximale Dateigröße."
        ],
        vocabulary: [
          "Dateisystem = Struktur zur Organisation von Dateien.",
          "Verzeichnis = Ordnerstruktur.",
          "Pfad = Ort einer Datei oder eines Ordners.",
          "Metadaten = Informationen über eine Datei.",
          "Berechtigungen = Regeln für Zugriff."
        ]
      },
      commonMistakes: [
        "Zu sagen: Das Dateisystem ist das gleiche wie Windows. Windows ist ein Betriebssystem; NTFS ist ein Dateisystem.",
        "Zu glauben, dass freier Speicherplatz allein entscheidet, ob eine Datei kopiert werden kann. Dateisystemgrenzen können ebenfalls eine Rolle spielen.",
        "Formatieren mit normalem Löschen gleichzusetzen. Formatieren bereitet ein Dateisystem vor und kann Daten unbrauchbar machen.",
        "Pfade ungenau zu beschreiben. In AP1-Aufgaben muss klar sein, ob ein absoluter oder relativer Pfad gemeint ist.",
        "Berechtigungen zu vergessen. Viele Zugriffsprobleme entstehen nicht durch defekte Dateien, sondern durch fehlende Rechte."
      ],
      vocabulary: [
        {
          de: "Dateisystem",
          pt: "sistema de arquivos",
          explanation: "Struktur zur Organisation von Dateien und Verzeichnissen auf einem Speichermedium.",
          example: "NTFS ist ein Dateisystem."
        },
        {
          de: "Datei",
          pt: "arquivo",
          explanation: "Benannte Einheit von Daten.",
          example: "Der Bericht wird als Datei gespeichert."
        },
        {
          de: "Verzeichnis",
          pt: "diretório / pasta",
          explanation: "Struktur, die Dateien und weitere Verzeichnisse enthalten kann.",
          example: "Das Verzeichnis enthält mehrere Projektdateien."
        },
        {
          de: "Pfad",
          pt: "caminho",
          explanation: "Angabe des Speicherortes einer Datei oder eines Verzeichnisses.",
          example: "Der Pfad zeigt, wo die Datei liegt."
        },
        {
          de: "Metadaten",
          pt: "metadados",
          explanation: "Informationen über eine Datei, zum Beispiel Größe oder Änderungsdatum.",
          example: "Das Änderungsdatum ist eine Metadatei-Information."
        },
        {
          de: "Berechtigung",
          pt: "permissão",
          explanation: "Regel, die festlegt, wer etwas lesen, ändern oder ausführen darf.",
          example: "Der Benutzer hat keine Schreibberechtigung."
        },
        {
          de: "Partition",
          pt: "partição",
          explanation: "Logisch abgegrenzter Bereich eines Datenträgers.",
          example: "Die SSD hat eine Systempartition und eine Datenpartition."
        },
        {
          de: "formatieren",
          pt: "formatar",
          explanation: "Eine Partition mit einem Dateisystem vorbereiten.",
          example: "Der USB-Stick wird mit exFAT formatiert."
        },
        {
          de: "Laufwerk",
          pt: "unidade",
          explanation: "Logischer oder physischer Speicherbereich, der im System angesprochen wird.",
          example: "Unter Windows ist C: meistens das Systemlaufwerk."
        },
        {
          de: "Zugriff verweigert",
          pt: "acesso negado",
          explanation: "Meldung, wenn ein Benutzer oder Programm keine ausreichenden Rechte hat.",
          example: "Beim Speichern erscheint die Meldung Zugriff verweigert."
        }
      ],
      summary: [
        "Ein Dateisystem organisiert Daten auf Speichermedien. Es sorgt dafür, dass Dateien und Verzeichnisse gespeichert, gefunden, geändert und geschützt werden können.",
        "Wichtige Begriffe sind Datei, Verzeichnis, Pfad, Metadaten, Berechtigungen, Partition und Formatierung. Diese Begriffe erscheinen häufig in praktischen IT-Situationen.",
        "Ein Pfad beschreibt den Ort einer Datei. Absolute Pfade beginnen an einem festen Startpunkt, relative Pfade vom aktuellen Arbeitsverzeichnis.",
        "Metadaten beschreiben Dateien, zum Beispiel Name, Größe, Erstellungsdatum, Änderungsdatum, Besitzer und Rechte. Berechtigungen steuern, wer lesen, schreiben oder ausführen darf.",
        "Typische Dateisysteme sind NTFS, FAT32, exFAT und ext4. Für AP1 musst du sie grob einordnen und typische Grenzen oder Einsatzbereiche kennen."
      ],
      mindMap: {
        title: "Mindmap: Dateisysteme",
        code: "mindmap\n  root((Dateisysteme))\n    Aufgabe\n      Dateien organisieren\n      Verzeichnisse strukturieren\n      Zugriff verwalten\n    Begriffe\n      Datei\n      Verzeichnis\n      Pfad\n      Metadaten\n      Rechte\n    Datenträger\n      Partition\n      Formatierung\n      Laufwerk\n    Typen\n      NTFS\n      FAT32\n      exFAT\n      ext4\n    AP1 Fokus\n      Unterschiede erklären\n      Fehler analysieren\n      Rechte beachten"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Dateisystem?",
            answer: "Ein Dateisystem organisiert Dateien und Verzeichnisse auf einem Speichermedium.",
            explanation: "Es legt fest, wie Daten gespeichert, gefunden und verwaltet werden."
          },
          {
            question: "Was ist ein Verzeichnis?",
            answer: "Ein Verzeichnis ist eine Struktur, die Dateien und weitere Verzeichnisse enthalten kann.",
            explanation: "Im Alltag wird dafür oft das Wort Ordner verwendet."
          },
          {
            question: "Was beschreibt ein Pfad?",
            answer: "Ein Pfad beschreibt den Speicherort einer Datei oder eines Verzeichnisses.",
            explanation: "Der Pfad zeigt, wo etwas im Dateisystem liegt."
          },
          {
            question: "Nenne zwei Beispiele für Metadaten einer Datei.",
            answer: "Dateigröße und Änderungsdatum.",
            explanation: "Auch Name, Besitzer, Erstellungsdatum und Rechte sind Metadaten."
          },
          {
            question: "Nenne ein Dateisystem, das häufig unter Windows verwendet wird.",
            answer: "NTFS.",
            explanation: "NTFS ist ein modernes Windows-Dateisystem mit Unterstützung für Rechte und große Dateien."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen Datei und Verzeichnis.",
            answer: "Eine Datei enthält Daten. Ein Verzeichnis organisiert Dateien und kann weitere Verzeichnisse enthalten.",
            explanation: "Diese Unterscheidung ist wichtig für Pfade und Dateiverwaltung."
          },
          {
            question: "Warum sind Berechtigungen im Dateisystem wichtig?",
            answer: "Sie steuern, wer Dateien lesen, ändern, ausführen oder löschen darf.",
            explanation: "Berechtigungen schützen Daten vor unerlaubtem Zugriff."
          },
          {
            question: "Was bedeutet Formatieren?",
            answer: "Formatieren bedeutet, eine Partition mit einem Dateisystem vorzubereiten.",
            explanation: "Dabei können vorhandene Daten verloren gehen oder unbrauchbar werden."
          },
          {
            question: "Warum kann eine große Datei nicht auf einen USB-Stick kopiert werden, obwohl genug Speicher frei ist?",
            answer: "Das Dateisystem kann eine maximale Dateigröße begrenzen, zum Beispiel bei FAT32.",
            explanation: "Freier Speicherplatz ist nicht das einzige Kriterium."
          },
          {
            question: "Was ist der Unterschied zwischen absolutem und relativem Pfad?",
            answer: "Ein absoluter Pfad beginnt an einem festen Startpunkt. Ein relativer Pfad beginnt vom aktuellen Arbeitsverzeichnis.",
            explanation: "Relative Pfade hängen vom aktuellen Kontext ab."
          }
        ],
        ap1Style: [
          {
            question: "Ein Benutzer kann eine Datei in einem Projektordner lesen, aber nicht ändern. Nennen Sie eine wahrscheinliche Ursache.",
            answer: "Der Benutzer hat Leserechte, aber keine Schreibrechte.",
            explanation: "Dateisystem-Berechtigungen können unterschiedliche Zugriffsarten erlauben oder verweigern."
          },
          {
            question: "Ein USB-Stick mit 32 GB freiem Speicher kann eine einzelne 6-GB-Datei nicht speichern. Erklären Sie eine mögliche Ursache.",
            answer: "Der USB-Stick könnte mit FAT32 formatiert sein, das einzelne große Dateien begrenzt.",
            explanation: "Hier reicht der freie Speicherplatz nicht als Erklärung. Das Dateisystem muss beachtet werden."
          },
          {
            question: "Ordnen Sie zu: Datei, Verzeichnis, Pfad. Was enthält Daten, was strukturiert Dateien, was beschreibt den Speicherort?",
            answer: "Datei enthält Daten. Verzeichnis strukturiert Dateien. Pfad beschreibt den Speicherort.",
            explanation: "Diese drei Begriffe gehören zu den wichtigsten Grundlagen der Dateisysteme."
          },
          {
            question: "Ein Azubi sagt: 'Formatieren bedeutet nur, alle Dateien normal zu löschen.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist ungenau beziehungsweise falsch.",
            explanation: "Formatieren bereitet eine Partition mit einem Dateisystem vor und kann Daten unbrauchbar machen. Es ist mehr als normales Löschen."
          },
          {
            question: "Ein Programm findet eine Konfigurationsdatei nicht. Nennen Sie zwei mögliche Dateisystem-bezogene Ursachen.",
            answer: "Der Pfad kann falsch sein oder die Datei wurde verschoben, gelöscht oder durch fehlende Rechte nicht zugänglich.",
            explanation: "Bei solchen Problemen sollten Pfad, Existenz der Datei und Berechtigungen geprüft werden."
          }
        ]
      },
      related: {
        previous: "Boot-Prozess",
        next: "Prozesse"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Dateisystem ist.",
        "Ich kann Datei, Verzeichnis und Pfad unterscheiden.",
        "Ich verstehe absolute und relative Pfade.",
        "Ich kann Metadaten und Berechtigungen erklären.",
        "Ich kann Partition und Formatierung einfach unterscheiden.",
        "Ich kenne NTFS, FAT32, exFAT und ext4 auf AP1-Niveau.",
        "Ich kann typische AP1-Fehlerfälle zu Dateisystemen lösen."
      ]
    }
  },
  {
    id: "prozesse",
    title: "Prozesse",
    description: "Ein Prozess ist ein laufendes Programm mit eigenen Ressourcen, zum Beispiel Speicher, Prozess-ID und Ausführungszustand.",
    text: [
      "Ein Prozess entsteht, wenn ein Programm gestartet wird. Das Betriebssystem verwaltet Prozesse, damit mehrere Programme scheinbar gleichzeitig laufen können.",
      "Für die AP1 musst du den Unterschied zwischen Programm und Prozess, Prozesszustände, CPU-Zeit, Speicher und Prozessverwaltung verstehen."
    ],
    ihk: "Wichtig für AP1: Programm = gespeicherter Code, Prozess = laufende Ausführung. Das Betriebssystem verwaltet Prozesse, CPU-Zeit, Speicher und Zustände.",
    summary: "Processo é um programa em execução. O sistema operacional controla processos, memória, tempo de CPU, estados e encerramento.",
    example: "Wenn du einen Browser startest, wird aus dem Programm ein laufender Prozess. Der Task-Manager zeigt diesen Prozess mit Speicher- und CPU-Nutzung an.",
    exercises: [
      {
        question: "Was ist ein Prozess?",
        answer: "Ein Prozess ist ein laufendes Programm."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Prozesse sind für AP1 sehr wichtig, weil sie erklären, wie ein Betriebssystem laufende Programme organisiert. Dieses Wissen ist Grundlage für Threads, Speicherverwaltung und Fehlersuche.",
          "Die IHK kann Prozesse in Situationen mit Task-Manager, CPU-Auslastung, Speicherverbrauch, Programmabsturz oder paralleler Arbeit prüfen.",
          "Português de apoio: um processo é o programa enquanto ele está rodando. O arquivo do programa está no armazenamento; o processo vive durante a execução."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Prozess is.",
        "After this chapter the student will be able to distinguish Programm and Prozess.",
        "After this chapter the student will be able to describe basic process resources such as PID, memory and CPU time.",
        "After this chapter the student will be able to explain simple process states.",
        "After this chapter the student will be able to understand why the operating system needs process management.",
        "After this chapter the student will be able to solve AP1-style questions about running programs and process problems."
      ],
      introduction: [
        "Du klickst auf ein Programmsymbol. Einen Moment später öffnet sich ein Fenster. Für den Benutzer sieht das einfach aus. Im Betriebssystem passiert aber mehr.",
        "Das Programm liegt zuerst als Datei auf SSD oder HDD. Wenn es gestartet wird, lädt das Betriebssystem es in den Arbeitsspeicher und erzeugt eine laufende Ausführung. Diese laufende Ausführung heißt Prozess.",
        "Prozesse sind zentral für moderne Betriebssysteme. Ohne Prozessverwaltung könnte das System nicht sauber entscheiden, welche Programme laufen, wie viel Speicher sie bekommen und wann sie CPU-Zeit nutzen dürfen.",
        "Für AP1 ist besonders wichtig: Ein Programm ist nicht dasselbe wie ein Prozess."
      ],
      explanation: [
        {
          title: "Was ist ein Prozess?",
          paragraphs: [
            "Ein Prozess ist ein Programm in Ausführung. Das bedeutet: Der Programmcode wird gerade vom System ausgeführt oder ist bereit, ausgeführt zu werden.",
            "Ein Prozess besitzt eigene Informationen und Ressourcen. Dazu gehören zum Beispiel eine Prozess-ID, Speicherbereiche, geöffnete Dateien und ein Zustand.",
            "Das Betriebssystem verwaltet diese Prozesse, damit mehrere Aufgaben geordnet nebeneinander laufen können."
          ]
        },
        {
          title: "Programm vs Prozess",
          paragraphs: [
            "Ein Programm ist gespeicherter Code, zum Beispiel eine Datei auf einer SSD.",
            "Ein Prozess entsteht erst, wenn dieses Programm gestartet wird.",
            "Ein Programm kann sogar mehrere Prozesse erzeugen. Moderne Browser nutzen oft mehrere Prozesse für Tabs, Erweiterungen oder Sicherheitsbereiche."
          ]
        },
        {
          title: "Warum braucht das Betriebssystem Prozesse?",
          paragraphs: [
            "Ein Computer führt viele Aufgaben gleichzeitig aus: Browser, Editor, Hintergrunddienste, Virenschutz, Netzwerkdienste und Benutzeroberfläche.",
            "Die CPU kann zwar sehr schnell zwischen Aufgaben wechseln, aber sie muss geordnet gesteuert werden.",
            "Die Prozessverwaltung sorgt dafür, dass Prozesse gestartet, pausiert, fortgesetzt und beendet werden können."
          ]
        },
        {
          title: "Prozess-ID (PID)",
          paragraphs: [
            "Jeder Prozess bekommt normalerweise eine eindeutige Prozess-ID. Diese ID hilft dem Betriebssystem, Prozesse zu unterscheiden.",
            "Im Task-Manager oder in Systemwerkzeugen kann man Prozesse oft mit ihrer PID sehen.",
            "Für AP1 reicht: Die PID ist eine Nummer zur Identifikation eines laufenden Prozesses."
          ]
        },
        {
          title: "Ressourcen eines Prozesses",
          paragraphs: [
            "Ein Prozess braucht Ressourcen. Dazu gehören CPU-Zeit, Arbeitsspeicher, Dateien, Netzwerkverbindungen oder Gerätezugriffe.",
            "Das Betriebssystem entscheidet, welche Ressourcen ein Prozess bekommt und kontrolliert Zugriffe.",
            "Wenn ein Prozess zu viel Speicher nutzt oder nicht mehr reagiert, kann das System langsam werden oder der Prozess muss beendet werden."
          ]
        },
        {
          title: "CPU-Zeit und Scheduler",
          paragraphs: [
            "Mehrere Prozesse möchten die CPU benutzen. Der Scheduler ist der Teil des Betriebssystems, der entscheidet, welcher Prozess wann CPU-Zeit erhält.",
            "Der Wechsel zwischen Prozessen passiert sehr schnell. Deshalb wirkt es für Benutzer oft so, als würden viele Programme gleichzeitig laufen.",
            "Für AP1 musst du nicht die Algorithmen kennen. Wichtig ist: Der Scheduler verteilt CPU-Zeit."
          ]
        },
        {
          title: "Prozesszustände",
          paragraphs: [
            "Ein Prozess kann verschiedene Zustände haben. Sehr vereinfacht kann er neu, bereit, laufend, wartend oder beendet sein.",
            "Bereit bedeutet: Der Prozess könnte laufen, wartet aber auf CPU-Zeit. Laufend bedeutet: Er wird gerade ausgeführt.",
            "Wartend bedeutet: Der Prozess wartet zum Beispiel auf eine Datei, eine Netzwerkantwort oder Benutzereingabe."
          ],
          steps: [
            "Neu: Prozess wird erzeugt.",
            "Bereit: Prozess wartet auf CPU-Zeit.",
            "Laufend: Prozess nutzt gerade die CPU.",
            "Wartend: Prozess wartet auf ein Ereignis.",
            "Beendet: Prozess ist abgeschlossen."
          ]
        },
        {
          title: "Prozess beenden",
          paragraphs: [
            "Ein Prozess kann normal beendet werden, wenn das Programm fertig ist oder der Benutzer es schließt.",
            "Ein Prozess kann aber auch abstürzen oder nicht mehr reagieren. Dann kann der Benutzer oder das Betriebssystem ihn beenden.",
            "Das Beenden eines Prozesses sollte bewusst passieren, weil ungespeicherte Daten verloren gehen können."
          ]
        },
        {
          title: "Task-Manager und Prozessanalyse",
          paragraphs: [
            "Unter Windows zeigt der Task-Manager laufende Prozesse, CPU-Auslastung, Speicherverbrauch und weitere Informationen.",
            "Unter Linux gibt es Werkzeuge wie ps, top oder htop.",
            "Für AP1 ist wichtig, dass Prozessinformationen bei Fehlersuche helfen: Welches Programm verbraucht viel CPU? Welcher Prozess reagiert nicht? Wie viel Speicher wird genutzt?"
          ]
        },
        {
          title: "Prozesse und Sicherheit",
          paragraphs: [
            "Prozesse laufen normalerweise mit den Rechten des Benutzers oder Dienstkontos, das sie gestartet hat.",
            "Ein Prozess sollte nicht automatisch alles dürfen. Rechte und Schutzmechanismen verhindern, dass ein Prozess fremde Daten oder Systembereiche unkontrolliert verändert.",
            "Das verbindet Prozesse mit den Themen Benutzer, Rechte, Kernel und Speicherverwaltung."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Browser öffnet mehrere Prozesse, damit ein einzelner fehlerhafter Tab nicht den ganzen Browser beendet.",
        "Ein Backup-Programm läuft als Hintergrundprozess und sichert regelmäßig Dateien.",
        "Ein Entwickler startet eine IDE. Das Programm wird von der SSD geladen und als Prozess im Arbeitsspeicher ausgeführt.",
        "Ein Prozess verbraucht 100 Prozent CPU. Im Task-Manager kann der IT-Support den Prozess erkennen und untersuchen.",
        "Ein Dienst auf einem Server läuft ohne sichtbares Fenster als Prozess im Hintergrund."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Anwendung reagiert nicht",
          paragraphs: [
            "Eine Anwendung zeigt 'Keine Rückmeldung'. Der Benutzer kann nicht weiterarbeiten.",
            "Im Task-Manager sieht der Support den Prozess und prüft CPU- und Speicherverbrauch."
          ],
          steps: [
            "Task-Manager öffnen.",
            "Betroffenen Prozess suchen.",
            "CPU- und Speichernutzung prüfen.",
            "Wenn nötig Prozess beenden.",
            "Anwendung neu starten.",
            "Ursache später prüfen, zum Beispiel fehlerhafte Datei oder zu wenig RAM."
          ]
        },
        {
          title: "Szenario 2: Mehrere Prozesse eines Programms",
          paragraphs: [
            "Ein Benutzer öffnet den Browser und sieht im Task-Manager viele Prozesse mit ähnlichem Namen.",
            "Das ist nicht automatisch ein Fehler. Moderne Browser nutzen mehrere Prozesse für Stabilität und Sicherheit."
          ],
          steps: [
            "Browser starten.",
            "Task-Manager öffnen.",
            "Mehrere Browser-Prozesse erkennen.",
            "Tabs, Erweiterungen und Hintergrunddienste als mögliche Ursachen verstehen.",
            "Nicht vorschnell alle Prozesse als Malware bewerten."
          ]
        }
      ],
      diagrams: [
        {
          title: "Vom Programm zum Prozess",
          code: "flowchart TD\n  P[Programmdatei auf SSD/HDD] --> S[Benutzer startet Programm]\n  S --> OS[Betriebssystem lädt Programm]\n  OS --> RAM[Speicher wird zugewiesen]\n  RAM --> PR[Prozess entsteht]\n  PR --> CPU[CPU-Zeit durch Scheduler]"
        },
        {
          title: "Vereinfachte Prozesszustände",
          code: "flowchart LR\n  N[Neu] --> B[Bereit]\n  B --> L[Laufend]\n  L --> W[Wartend]\n  W --> B\n  L --> E[Beendet]\n  L --> B"
        }
      ],
      ihkFocus: {
        appears: [
          "Unterschied zwischen Programm und Prozess erklären.",
          "Aufgabe der Prozessverwaltung nennen.",
          "PID als Identifikation eines Prozesses verstehen.",
          "CPU-Zeit und Scheduler auf Grundniveau erklären.",
          "Prozesszustände erkennen und beschreiben.",
          "Task-Manager-Ausgaben einfach interpretieren.",
          "Fehlerfälle wie 'Programm reagiert nicht' einordnen."
        ],
        commonMistakes: [
          "Programm und Prozess gleichsetzen.",
          "Den Prozess als Datei auf der SSD beschreiben.",
          "Scheduler mit Benutzerkalender verwechseln.",
          "Jeden Hintergrundprozess als Fehler ansehen.",
          "Prozess beenden, ohne Datenverlust zu bedenken."
        ],
        importantDetails: [
          "Ein Prozess ist ein laufendes Programm.",
          "Ein Programm kann mehrere Prozesse erzeugen.",
          "Prozesse haben Ressourcen wie Speicher und CPU-Zeit.",
          "Der Scheduler verteilt CPU-Zeit.",
          "Prozesszustände helfen beim Verständnis der Ausführung.",
          "Task-Manager und Systemtools helfen bei der Fehlersuche."
        ],
        confusedConcepts: [
          "Programm vs Prozess.",
          "Prozess vs Thread.",
          "Prozess vs Dienst.",
          "CPU-Auslastung vs Speichernutzung.",
          "Bereit vs laufend vs wartend."
        ],
        vocabulary: [
          "Prozess = laufendes Programm.",
          "Programm = gespeicherter Code.",
          "PID = eindeutige Prozessnummer.",
          "Scheduler = verteilt CPU-Zeit.",
          "Task-Manager = Werkzeug zur Prozessanzeige."
        ]
      },
      commonMistakes: [
        "Zu sagen: Ein Prozess ist einfach eine Datei. Eine Datei kann ein Programm enthalten; ein Prozess ist die laufende Ausführung.",
        "Zu glauben, dass ein Programm immer nur einen Prozess hat. Viele moderne Programme erzeugen mehrere Prozesse.",
        "CPU-Zeit und Arbeitsspeicher zu verwechseln. CPU-Zeit beschreibt Rechenzeit; Arbeitsspeicher speichert aktuelle Daten und Programmzustände.",
        "Einen Prozess sofort zu beenden, ohne ungespeicherte Daten zu beachten.",
        "Threads vor Prozessen erklären zu wollen. Für AP1 ist zuerst wichtig: Threads gehören zu Prozessen und werden im nächsten Kapitel genauer behandelt."
      ],
      vocabulary: [
        {
          de: "Prozess",
          pt: "processo",
          explanation: "Laufende Ausführung eines Programms.",
          example: "Der Browser läuft als Prozess."
        },
        {
          de: "Programm",
          pt: "programa",
          explanation: "Gespeicherter Code, der gestartet werden kann.",
          example: "Das Programm liegt als Datei auf der SSD."
        },
        {
          de: "Prozess-ID",
          pt: "ID do processo",
          explanation: "Eindeutige Nummer zur Identifikation eines Prozesses.",
          example: "Der Task-Manager zeigt die Prozess-ID an."
        },
        {
          de: "CPU-Zeit",
          pt: "tempo de CPU",
          explanation: "Zeit, in der ein Prozess die CPU verwenden darf.",
          example: "Der Scheduler verteilt CPU-Zeit."
        },
        {
          de: "Scheduler",
          pt: "escalonador",
          explanation: "Teil des Betriebssystems, der CPU-Zeit an Prozesse verteilt.",
          example: "Der Scheduler entscheidet, welcher Prozess als nächstes läuft."
        },
        {
          de: "Prozesszustand",
          pt: "estado do processo",
          explanation: "Aktuelle Situation eines Prozesses, zum Beispiel laufend oder wartend.",
          example: "Ein Prozess kann im Zustand wartend sein."
        },
        {
          de: "Task-Manager",
          pt: "gerenciador de tarefas",
          explanation: "Werkzeug zur Anzeige und Verwaltung laufender Prozesse.",
          example: "Im Task-Manager sieht man CPU- und Speichernutzung."
        },
        {
          de: "Hintergrundprozess",
          pt: "processo em segundo plano",
          explanation: "Prozess, der ohne sichtbares Hauptfenster arbeitet.",
          example: "Ein Backup-Dienst läuft als Hintergrundprozess."
        },
        {
          de: "Ressource",
          pt: "recurso",
          explanation: "Etwas, das ein Prozess benötigt, zum Beispiel CPU, RAM oder Dateien.",
          example: "Ein Prozess nutzt mehrere Ressourcen."
        },
        {
          de: "Absturz",
          pt: "falha / crash",
          explanation: "Unerwartetes Beenden oder Fehlverhalten eines Programms.",
          example: "Nach dem Absturz muss der Prozess neu gestartet werden."
        }
      ],
      summary: [
        "Ein Prozess ist ein Programm in Ausführung. Das Programm liegt als gespeicherter Code auf einem Datenträger; der Prozess entsteht erst beim Start.",
        "Das Betriebssystem verwaltet Prozesse, damit mehrere Programme geordnet laufen können. Es weist Ressourcen zu, kontrolliert Speicher und verteilt CPU-Zeit.",
        "Eine Prozess-ID identifiziert einen Prozess eindeutig. Der Scheduler entscheidet, welcher Prozess wann CPU-Zeit bekommt.",
        "Prozesse können verschiedene Zustände haben, zum Beispiel neu, bereit, laufend, wartend oder beendet. Diese Zustände helfen, das Verhalten laufender Programme zu verstehen.",
        "Für AP1 musst du Programm und Prozess unterscheiden, einfache Prozesszustände erklären und Task-Manager-Situationen verstehen können."
      ],
      mindMap: {
        title: "Mindmap: Prozesse",
        code: "mindmap\n  root((Prozesse))\n    Grundlage\n      Programm starten\n      laufende Ausführung\n      PID\n    Ressourcen\n      CPU-Zeit\n      Arbeitsspeicher\n      Dateien\n      Rechte\n    Verwaltung\n      Betriebssystem\n      Scheduler\n      Task-Manager\n    Zustände\n      Neu\n      Bereit\n      Laufend\n      Wartend\n      Beendet\n    AP1 Fokus\n      Programm vs Prozess\n      Fehleranalyse\n      Ressourcen verstehen"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Prozess?",
            answer: "Ein Prozess ist ein laufendes Programm.",
            explanation: "Er entsteht, wenn ein Programm gestartet und vom Betriebssystem ausgeführt wird."
          },
          {
            question: "Was ist der Unterschied zwischen Programm und Prozess?",
            answer: "Ein Programm ist gespeicherter Code. Ein Prozess ist die laufende Ausführung dieses Codes.",
            explanation: "Das Programm liegt zum Beispiel auf der SSD; der Prozess läuft im System."
          },
          {
            question: "Wofür steht PID?",
            answer: "PID steht für Prozess-ID.",
            explanation: "Sie identifiziert einen Prozess eindeutig."
          },
          {
            question: "Welches Werkzeug zeigt unter Windows laufende Prozesse an?",
            answer: "Der Task-Manager.",
            explanation: "Er zeigt Prozesse, CPU-Auslastung, Speichernutzung und weitere Informationen."
          },
          {
            question: "Was verteilt der Scheduler?",
            answer: "CPU-Zeit.",
            explanation: "Der Scheduler entscheidet, welcher Prozess wann die CPU nutzen darf."
          }
        ],
        intermediate: [
          {
            question: "Warum braucht ein Betriebssystem Prozessverwaltung?",
            answer: "Damit mehrere Programme geordnet gestartet, ausgeführt, pausiert und beendet werden können.",
            explanation: "Ohne Prozessverwaltung könnten Ressourcen wie CPU und RAM nicht sauber verteilt werden."
          },
          {
            question: "Warum ist ein Prozess nicht einfach eine Datei?",
            answer: "Eine Datei ist gespeichert. Ein Prozess ist aktiv und nutzt Ressourcen während der Ausführung.",
            explanation: "Der Prozess hat zum Beispiel Speicher, Zustand und PID."
          },
          {
            question: "Was bedeutet der Prozesszustand wartend?",
            answer: "Der Prozess wartet auf ein Ereignis, zum Beispiel Datei, Netzwerkantwort oder Benutzereingabe.",
            explanation: "In dieser Zeit nutzt er nicht aktiv die CPU für seine Hauptarbeit."
          },
          {
            question: "Warum kann ein Programm mehrere Prozesse haben?",
            answer: "Zur besseren Stabilität, Sicherheit oder Aufgabenverteilung.",
            explanation: "Browser nutzen oft mehrere Prozesse für Tabs, Erweiterungen oder Hintergrundaufgaben."
          },
          {
            question: "Warum sollte man einen Prozess nicht vorschnell beenden?",
            answer: "Ungespeicherte Daten können verloren gehen.",
            explanation: "Ein Prozessabbruch kann notwendig sein, sollte aber bewusst erfolgen."
          }
        ],
        ap1Style: [
          {
            question: "Ein Benutzer meldet, dass ein Programm nicht reagiert. Nennen Sie zwei Informationen, die im Task-Manager hilfreich sein können.",
            answer: "CPU-Auslastung und Speichernutzung.",
            explanation: "Diese Werte helfen zu erkennen, ob ein Prozess sehr viele Ressourcen nutzt oder möglicherweise hängt."
          },
          {
            question: "Ein Azubi sagt: 'Das Programm auf der SSD ist schon ein Prozess.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "Das Programm auf der SSD ist gespeicherter Code. Erst beim Start entsteht ein Prozess."
          },
          {
            question: "Ordnen Sie zu: Programm, Prozess, PID. Was ist gespeicherter Code, was ist laufende Ausführung, was identifiziert den Prozess?",
            answer: "Programm = gespeicherter Code. Prozess = laufende Ausführung. PID = Identifikation des Prozesses.",
            explanation: "Diese Zuordnung ist eine typische AP1-Grundlage."
          },
          {
            question: "Ein Browser erscheint mehrfach im Task-Manager. Ist das immer ein Fehler? Begründen Sie.",
            answer: "Nein, nicht unbedingt.",
            explanation: "Moderne Browser verwenden oft mehrere Prozesse für Tabs, Erweiterungen und Stabilität."
          },
          {
            question: "Erklären Sie, warum der Scheduler für Multitasking wichtig ist.",
            answer: "Der Scheduler verteilt CPU-Zeit auf Prozesse, damit mehrere Programme scheinbar gleichzeitig laufen können.",
            explanation: "Ohne diese Steuerung würde keine geordnete Ausführung mehrerer Prozesse stattfinden."
          }
        ]
      },
      related: {
        previous: "Dateisysteme",
        next: "Threads"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Prozess ist.",
        "Ich kann Programm und Prozess unterscheiden.",
        "Ich kenne PID, CPU-Zeit, Scheduler und Prozesszustand.",
        "Ich kann einfache Prozesszustände erklären.",
        "Ich verstehe, warum Prozessverwaltung wichtig ist.",
        "Ich kann Task-Manager-Situationen auf AP1-Niveau interpretieren.",
        "Ich kann AP1-Fragen zu Prozessen beantworten."
      ]
    }
  },
  {
    id: "threads",
    title: "Threads",
    description: "Threads sind Ausführungsstränge innerhalb eines Prozesses und ermöglichen mehrere Aufgaben innerhalb desselben Programms.",
    text: [
      "Ein Thread ist ein Ausführungsstrang innerhalb eines Prozesses. Ein Prozess kann einen oder mehrere Threads besitzen.",
      "Für die AP1 musst du verstehen, dass Threads Aufgaben innerhalb eines Prozesses aufteilen können, aber gemeinsame Ressourcen sorgfältig behandelt werden müssen."
    ],
    ihk: "Wichtig für AP1: Prozess = laufendes Programm, Thread = Ausführungsstrang innerhalb eines Prozesses. Threads teilen oft Ressourcen und können Parallelität ermöglichen.",
    summary: "Thread é uma linha de execução dentro de um processo. Threads ajudam a dividir tarefas, mas podem causar problemas quando acessam recursos compartilhados sem controle.",
    example: "Ein Texteditor kann einen Thread für die Benutzeroberfläche nutzen und einen anderen Thread, um im Hintergrund automatisch zu speichern.",
    exercises: [
      {
        question: "Was ist ein Thread?",
        answer: "Ein Thread ist ein Ausführungsstrang innerhalb eines Prozesses."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "Threads sind für AP1 wichtig, weil sie direkt auf Prozesse aufbauen. Wer Prozesse versteht, kann mit Threads erklären, wie ein Programm mehrere Aufgaben gleichzeitig oder scheinbar gleichzeitig bearbeiten kann.",
          "Die IHK erwartet normalerweise keine tiefe Synchronisations-Theorie. Wichtig sind Prozess vs Thread, gemeinsame Ressourcen, Parallelität, Responsivität und typische Risiken.",
          "Português de apoio: processo é o programa rodando; thread é uma linha de execução dentro desse processo. Um processo pode ter várias threads."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Thread is.",
        "After this chapter the student will be able to distinguish Prozess and Thread.",
        "After this chapter the student will be able to explain why programs use multiple threads.",
        "After this chapter the student will be able to describe shared resources at beginner level.",
        "After this chapter the student will be able to recognize simple risks such as race conditions.",
        "After this chapter the student will be able to solve AP1-style questions about threads and processes."
      ],
      introduction: [
        "Im letzten Kapitel hast du gelernt: Ein Prozess ist ein laufendes Programm. Jetzt gehen wir eine Ebene tiefer.",
        "Ein Prozess kann intern mehrere Ausführungsstränge haben. Diese Ausführungsstränge heißen Threads.",
        "Threads helfen Programmen, mehrere Aufgaben zu bearbeiten. Zum Beispiel kann ein Programm gleichzeitig eine Datei speichern, eine Oberfläche anzeigen und auf Benutzereingaben reagieren.",
        "Für AP1 ist wichtig: Threads sind kein Ersatz für Prozesse. Sie gehören zu einem Prozess und teilen sich häufig Ressourcen dieses Prozesses."
      ],
      explanation: [
        {
          title: "Was ist ein Thread?",
          paragraphs: [
            "Ein Thread ist ein Ausführungsstrang innerhalb eines Prozesses.",
            "Man kann vereinfacht sagen: Ein Prozess ist der Rahmen eines laufenden Programms, ein Thread ist ein Arbeitsstrang in diesem Rahmen.",
            "Jeder Prozess hat mindestens einen Thread. Ein Prozess kann aber auch mehrere Threads besitzen."
          ]
        },
        {
          title: "Prozess vs Thread",
          paragraphs: [
            "Ein Prozess besitzt eigene Ressourcen, zum Beispiel einen Speicherbereich, eine Prozess-ID und geöffnete Dateien.",
            "Threads laufen innerhalb eines Prozesses. Sie können sich viele Ressourcen des Prozesses teilen.",
            "Der wichtigste AP1-Satz lautet: Ein Prozess ist ein laufendes Programm; ein Thread ist ein Ausführungsstrang innerhalb dieses Prozesses."
          ]
        },
        {
          title: "Warum gibt es Threads?",
          paragraphs: [
            "Threads ermöglichen, dass ein Programm mehrere Aufgaben strukturierter bearbeiten kann.",
            "Ein Programm kann zum Beispiel eine Benutzeroberfläche anzeigen und gleichzeitig Daten laden.",
            "Ohne separate Threads könnte eine lange Aufgabe die ganze Anwendung blockieren. Dann reagiert die Oberfläche möglicherweise nicht mehr."
          ]
        },
        {
          title: "Responsivität",
          paragraphs: [
            "Responsivität bedeutet, dass ein Programm weiterhin auf Benutzereingaben reagiert.",
            "Wenn ein Programm eine große Datei speichert und dabei die Oberfläche einfriert, ist die Benutzererfahrung schlecht.",
            "Mit Threads kann eine Aufgabe im Hintergrund laufen, während ein anderer Thread die Oberfläche bedient."
          ]
        },
        {
          title: "Parallelität und Nebenläufigkeit",
          paragraphs: [
            "Threads werden oft mit paralleler Ausführung verbunden. Parallelität bedeutet, dass Aufgaben wirklich gleichzeitig auf mehreren CPU-Kernen laufen können.",
            "Nebenläufigkeit bedeutet, dass mehrere Aufgaben so organisiert werden, dass sie sich zeitlich überlappen oder abwechseln.",
            "Für AP1 reicht: Threads können helfen, mehrere Aufgaben innerhalb eines Programms gleichzeitig oder scheinbar gleichzeitig zu bearbeiten."
          ]
        },
        {
          title: "Gemeinsame Ressourcen",
          paragraphs: [
            "Threads eines Prozesses teilen sich häufig Ressourcen, zum Beispiel Speicher, geöffnete Dateien oder Datenstrukturen.",
            "Das ist praktisch, weil Threads schnell auf gemeinsame Daten zugreifen können.",
            "Es ist aber auch gefährlich, wenn mehrere Threads dieselben Daten gleichzeitig verändern."
          ]
        },
        {
          title: "Race Condition einfach erklärt",
          paragraphs: [
            "Eine Race Condition entsteht, wenn das Ergebnis davon abhängt, welcher Thread zuerst auf eine gemeinsame Ressource zugreift.",
            "Beispiel: Zwei Threads erhöhen gleichzeitig denselben Zähler. Wenn die Zugriffe nicht kontrolliert werden, kann ein falscher Wert entstehen.",
            "Für AP1 musst du den Begriff nicht auf Programmierlevel beweisen. Wichtig ist die Idee: Gemeinsame Ressourcen brauchen Kontrolle."
          ]
        },
        {
          title: "Synchronisation",
          paragraphs: [
            "Synchronisation bedeutet, Zugriffe mehrerer Threads auf gemeinsame Ressourcen zu ordnen.",
            "Dadurch soll verhindert werden, dass Threads gleichzeitig kritische Daten verändern.",
            "Für AP1 reicht die Grundidee: Wenn mehrere Threads gemeinsame Daten nutzen, muss der Zugriff geregelt werden."
          ]
        },
        {
          title: "Threads im Betriebssystem",
          paragraphs: [
            "Das Betriebssystem hilft dabei, Threads auszuführen und CPU-Zeit zu verteilen.",
            "Threads werden geplant, ähnlich wie Prozesse. Der Scheduler spielt auch hier eine Rolle.",
            "Ein Programmierer nutzt Threads, aber das Betriebssystem verwaltet die tatsächliche Ausführung auf der Hardware."
          ]
        },
        {
          title: "Wann sind Threads sinnvoll?",
          paragraphs: [
            "Threads sind sinnvoll, wenn ein Programm mehrere Aufgaben gleichzeitig bearbeiten soll, zum Beispiel Oberfläche, Hintergrundberechnung und Netzwerkkommunikation.",
            "Threads sind nicht automatisch immer besser. Sie erhöhen die Komplexität und können Fehler schwerer auffindbar machen.",
            "Für AP1 ist wichtig: Threads verbessern Organisation und Reaktionsfähigkeit, müssen aber bei gemeinsamen Ressourcen sorgfältig eingesetzt werden."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Texteditor nutzt einen Thread für die Oberfläche und einen anderen Thread für automatisches Speichern.",
        "Ein Browser nutzt mehrere Prozesse und Threads, um Tabs, Rendering, Netzwerk und Benutzereingaben zu organisieren.",
        "Ein Musikplayer spielt Audio ab, während die Benutzeroberfläche weiterhin bedienbar bleibt.",
        "Ein Entwicklungswerkzeug indexiert Projektdateien im Hintergrund, während der Entwickler weiter Code schreibt.",
        "Ein Server nutzt mehrere Threads, um Anfragen mehrerer Benutzer effizienter zu bearbeiten."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Oberfläche bleibt bedienbar",
          paragraphs: [
            "Ein Programm lädt eine große Datei aus dem Netzwerk. Ohne gute Aufgabenaufteilung könnte die Oberfläche blockieren.",
            "Mit Threads kann ein Hintergrundthread die Datei laden, während der Hauptthread die Benutzeroberfläche bedient."
          ],
          steps: [
            "Benutzer klickt auf Download.",
            "Hauptthread bleibt für die Oberfläche zuständig.",
            "Hintergrundthread lädt die Datei.",
            "Fortschritt wird angezeigt.",
            "Benutzer kann weiter mit dem Programm arbeiten.",
            "Nach Abschluss meldet der Hintergrundthread das Ergebnis."
          ]
        },
        {
          title: "Szenario 2: Gemeinsamer Zähler",
          paragraphs: [
            "Zwei Threads sollen denselben Zähler erhöhen. Beide greifen auf dieselbe Variable zu.",
            "Wenn der Zugriff nicht geregelt wird, kann ein falsches Ergebnis entstehen."
          ],
          steps: [
            "Thread A liest den Zähler.",
            "Thread B liest fast gleichzeitig denselben Wert.",
            "Beide erhöhen den Wert.",
            "Beide schreiben zurück.",
            "Eine Erhöhung kann verloren gehen.",
            "Synchronisation wäre nötig, um den Zugriff zu ordnen."
          ]
        }
      ],
      diagrams: [
        {
          title: "Prozess mit mehreren Threads",
          code: "flowchart TD\n  P[Prozess: Texteditor] --> M[Gemeinsamer Speicher]\n  P --> F[Geöffnete Dateien]\n  P --> T1[Thread 1: Benutzeroberfläche]\n  P --> T2[Thread 2: Auto-Speichern]\n  P --> T3[Thread 3: Rechtschreibprüfung]"
        },
        {
          title: "Threads und gemeinsame Ressource",
          code: "flowchart LR\n  T1[Thread A] --> R[Gemeinsame Ressource]\n  T2[Thread B] --> R\n  R --> P[Problem ohne geregelten Zugriff]\n  P --> S[Synchronisation ordnet Zugriffe]"
        }
      ],
      ihkFocus: {
        appears: [
          "Unterschied zwischen Prozess und Thread erklären.",
          "Vorteile von Threads nennen.",
          "Gemeinsame Ressourcen beschreiben.",
          "Risiken bei gleichzeitigem Zugriff erkennen.",
          "Responsivität von Anwendungen erklären.",
          "Einfache Szenarien mit Hintergrundaufgaben einordnen."
        ],
        commonMistakes: [
          "Thread und Prozess gleichsetzen.",
          "Threads als vollständig unabhängige Programme beschreiben.",
          "Nur Vorteile nennen und gemeinsame Ressourcen vergessen.",
          "Parallelität immer als garantiert echte Gleichzeitigkeit erklären.",
          "Race Conditions zu tief oder falsch erklären."
        ],
        importantDetails: [
          "Threads laufen innerhalb eines Prozesses.",
          "Threads teilen sich häufig Ressourcen des Prozesses.",
          "Threads können Responsivität verbessern.",
          "Mehrere Threads können komplexe Fehler verursachen.",
          "Gemeinsame Ressourcen brauchen geregelten Zugriff.",
          "Der Scheduler ist für die Ausführung relevant."
        ],
        confusedConcepts: [
          "Prozess vs Thread.",
          "Parallelität vs Nebenläufigkeit.",
          "Hauptthread vs Hintergrundthread.",
          "Gemeinsamer Speicher vs eigener Prozessspeicher.",
          "Responsivität vs Geschwindigkeit."
        ],
        vocabulary: [
          "Thread = Ausführungsstrang innerhalb eines Prozesses.",
          "Prozess = laufendes Programm.",
          "Hauptthread = wichtiger Thread für Hauptaufgabe oder Oberfläche.",
          "Hintergrundthread = Thread für Aufgaben im Hintergrund.",
          "Synchronisation = geregelter Zugriff auf gemeinsame Ressourcen."
        ]
      },
      commonMistakes: [
        "Zu sagen: Ein Thread ist ein eigenes Programm. Richtig ist: Ein Thread gehört zu einem Prozess.",
        "Zu sagen: Mehr Threads machen ein Programm immer schneller. Threads können helfen, erhöhen aber auch die Komplexität.",
        "Zu vergessen, dass Threads gemeinsame Ressourcen nutzen können. Genau dort entstehen viele Fehler.",
        "Parallelität und Nebenläufigkeit ohne Unterschied zu verwenden. Für AP1 genügt die einfache Idee, aber die Formulierung sollte vorsichtig bleiben.",
        "Race Conditions als Hardwaredefekt zu verstehen. Es handelt sich um ein Problem der zeitlichen Reihenfolge bei Zugriffen."
      ],
      vocabulary: [
        {
          de: "Thread",
          pt: "thread / linha de execução",
          explanation: "Ausführungsstrang innerhalb eines Prozesses.",
          example: "Ein Prozess kann mehrere Threads haben."
        },
        {
          de: "Ausführungsstrang",
          pt: "fluxo de execução",
          explanation: "Abfolge von Befehlen, die ausgeführt wird.",
          example: "Ein Thread ist ein Ausführungsstrang."
        },
        {
          de: "Hauptthread",
          pt: "thread principal",
          explanation: "Thread, der oft die Hauptlogik oder Benutzeroberfläche steuert.",
          example: "Der Hauptthread verarbeitet Benutzereingaben."
        },
        {
          de: "Hintergrundthread",
          pt: "thread em segundo plano",
          explanation: "Thread, der eine Aufgabe im Hintergrund erledigt.",
          example: "Ein Hintergrundthread speichert automatisch eine Datei."
        },
        {
          de: "gemeinsame Ressource",
          pt: "recurso compartilhado",
          explanation: "Ressource, auf die mehrere Threads zugreifen können.",
          example: "Mehrere Threads nutzen eine gemeinsame Datenstruktur."
        },
        {
          de: "Parallelität",
          pt: "paralelismo",
          explanation: "Tatsächlich gleichzeitige Ausführung mehrerer Aufgaben.",
          example: "Auf mehreren CPU-Kernen kann echte Parallelität möglich sein."
        },
        {
          de: "Nebenläufigkeit",
          pt: "concorrência",
          explanation: "Organisation mehrerer Aufgaben, die sich zeitlich überlappen können.",
          example: "Nebenläufigkeit sorgt dafür, dass Aufgaben nicht streng nacheinander wirken."
        },
        {
          de: "Synchronisation",
          pt: "sincronização",
          explanation: "Geregelter Zugriff mehrerer Threads auf gemeinsame Ressourcen.",
          example: "Synchronisation verhindert falsche Ergebnisse beim gemeinsamen Zähler."
        },
        {
          de: "Race Condition",
          pt: "condição de corrida",
          explanation: "Fehler, bei dem das Ergebnis von der zeitlichen Reihenfolge mehrerer Threads abhängt.",
          example: "Eine Race Condition kann entstehen, wenn zwei Threads denselben Wert gleichzeitig ändern."
        },
        {
          de: "Responsivität",
          pt: "capacidade de resposta",
          explanation: "Fähigkeit eines Programms, weiterhin auf Eingaben zu reagieren.",
          example: "Threads können die Responsivität einer Anwendung verbessern."
        }
      ],
      summary: [
        "Ein Thread ist ein Ausführungsstrang innerhalb eines Prozesses. Ein Prozess ist ein laufendes Programm; ein Thread ist eine Arbeitseinheit in diesem Prozess.",
        "Jeder Prozess hat mindestens einen Thread. Ein Prozess kann mehrere Threads besitzen, um Aufgaben aufzuteilen.",
        "Threads können helfen, Programme responsiver zu machen. Eine Oberfläche kann bedienbar bleiben, während im Hintergrund eine Datei geladen oder gespeichert wird.",
        "Threads teilen sich oft Ressourcen wie Speicher oder Datenstrukturen. Das ist praktisch, kann aber Fehler verursachen, wenn mehrere Threads gleichzeitig dieselben Daten verändern.",
        "Für AP1 musst du Prozess und Thread unterscheiden, Vorteile nennen und Risiken gemeinsamer Ressourcen einfach erklären können."
      ],
      mindMap: {
        title: "Mindmap: Threads",
        code: "mindmap\n  root((Threads))\n    Grundlage\n      Ausführungsstrang\n      innerhalb eines Prozesses\n      mindestens ein Thread\n    Nutzen\n      Aufgaben aufteilen\n      Responsivität\n      Hintergrundarbeit\n    Risiken\n      gemeinsame Ressourcen\n      Race Condition\n      Synchronisation nötig\n    Vergleich\n      Prozess\n      Thread\n      Hauptthread\n      Hintergrundthread\n    AP1 Fokus\n      Begriffe unterscheiden\n      Szenarien erklären\n      Fehler erkennen"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Thread?",
            answer: "Ein Thread ist ein Ausführungsstrang innerhalb eines Prozesses.",
            explanation: "Er gehört zu einem Prozess und führt eine Aufgabe oder Befehlsfolge aus."
          },
          {
            question: "Kann ein Prozess mehrere Threads haben?",
            answer: "Ja.",
            explanation: "Ein Prozess hat mindestens einen Thread, kann aber mehrere Threads besitzen."
          },
          {
            question: "Was ist ein Hauptthread?",
            answer: "Ein Thread, der oft die Hauptaufgabe oder Benutzeroberfläche eines Programms steuert.",
            explanation: "Bei vielen Anwendungen verarbeitet der Hauptthread wichtige Benutzereingaben."
          },
          {
            question: "Was ist ein Hintergrundthread?",
            answer: "Ein Thread, der eine Aufgabe im Hintergrund ausführt.",
            explanation: "Zum Beispiel automatisches Speichern oder Laden von Daten."
          },
          {
            question: "Nenne eine gemeinsame Ressource.",
            answer: "Gemeinsamer Speicher.",
            explanation: "Auch Dateien oder Datenstrukturen können gemeinsame Ressourcen sein."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen Prozess und Thread.",
            answer: "Ein Prozess ist ein laufendes Programm. Ein Thread ist ein Ausführungsstrang innerhalb dieses Prozesses.",
            explanation: "Threads teilen sich häufig Ressourcen des Prozesses."
          },
          {
            question: "Warum nutzen Programme mehrere Threads?",
            answer: "Um Aufgaben aufzuteilen, Hintergrundarbeit zu erledigen und die Anwendung responsiv zu halten.",
            explanation: "So kann zum Beispiel eine Oberfläche bedienbar bleiben, während Daten geladen werden."
          },
          {
            question: "Warum können gemeinsame Ressourcen problematisch sein?",
            answer: "Mehrere Threads können gleichzeitig darauf zugreifen und dadurch falsche Ergebnisse verursachen.",
            explanation: "Der Zugriff muss geregelt werden, wenn Daten verändert werden."
          },
          {
            question: "Was ist eine Race Condition in einfachen Worten?",
            answer: "Ein Fehler, bei dem das Ergebnis davon abhängt, welcher Thread zuerst zugreift.",
            explanation: "Das passiert typischerweise bei unkontrolliertem Zugriff auf gemeinsame Daten."
          },
          {
            question: "Was bedeutet Synchronisation bei Threads?",
            answer: "Synchronisation ordnet den Zugriff mehrerer Threads auf gemeinsame Ressourcen.",
            explanation: "Sie soll verhindern, dass gleichzeitig ungültige Änderungen entstehen."
          }
        ],
        ap1Style: [
          {
            question: "Ein Texteditor bleibt bedienbar, während im Hintergrund automatisch gespeichert wird. Erklären Sie, wie Threads dabei helfen können.",
            answer: "Ein Thread kann die Benutzeroberfläche bedienen, während ein anderer Thread im Hintergrund speichert.",
            explanation: "Dadurch muss die Anwendung während des Speicherns nicht vollständig blockieren."
          },
          {
            question: "Ein Azubi sagt: 'Ein Thread ist einfach ein zweiter Prozess.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch oder ungenau.",
            explanation: "Ein Thread läuft innerhalb eines Prozesses. Ein zweiter Prozess wäre eine eigene laufende Programmeinheit mit eigenen Ressourcen."
          },
          {
            question: "Zwei Threads ändern gleichzeitig denselben Zähler. Nennen Sie ein mögliches Problem.",
            answer: "Es kann eine Race Condition entstehen und der Zähler kann einen falschen Wert bekommen.",
            explanation: "Ohne geregelten Zugriff kann eine Änderung verloren gehen."
          },
          {
            question: "Nennen Sie zwei Vorteile von Threads in einer Anwendung.",
            answer: "Bessere Responsivität und Aufteilung von Hintergrundaufgaben.",
            explanation: "Threads können helfen, Aufgaben parallel oder nebenläufig zu organisieren."
          },
          {
            question: "Warum sind Threads komplexer als eine rein sequenzielle Programmausführung?",
            answer: "Weil mehrere Ausführungsstränge gemeinsame Ressourcen nutzen und zeitliche Reihenfolgen schwerer kontrollierbar sind.",
            explanation: "Das kann zu schwer auffindbaren Fehlern führen, wenn Zugriffe nicht synchronisiert werden."
          }
        ]
      },
      related: {
        previous: "Prozesse",
        next: "Speicherverwaltung"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Thread ist.",
        "Ich kann Prozess und Thread unterscheiden.",
        "Ich verstehe, warum Programme mehrere Threads nutzen.",
        "Ich kann Hauptthread und Hintergrundthread einfach erklären.",
        "Ich verstehe gemeinsame Ressourcen und Synchronisation auf AP1-Niveau.",
        "Ich kann eine Race Condition einfach beschreiben.",
        "Ich kann AP1-Fragen zu Threads beantworten."
      ]
    }
  },
  {
    id: "speicherverwaltung",
    title: "Speicherverwaltung",
    description: "Speicherverwaltung beschreibt, wie das Betriebssystem Arbeitsspeicher an Prozesse verteilt, schützt und bei Bedarf durch virtuellen Speicher ergänzt.",
    text: [
      "Die Speicherverwaltung ist eine zentrale Aufgabe des Betriebssystems. Sie entscheidet, welcher Prozess welchen Speicher nutzen darf.",
      "Für die AP1 musst du Arbeitsspeicher, virtuellen Speicher, Paging, Auslagerung und Speicherschutz auf Grundniveau erklären können."
    ],
    ihk: "Wichtig für AP1: Speicherverwaltung verteilt RAM, schützt Speicherbereiche von Prozessen und kann virtuellen Speicher nutzen, wenn der physische RAM knapp wird.",
    summary: "Gerenciamento de memória é a função do sistema operacional que distribui RAM para processos, protege áreas de memória e usa memória virtual quando necessário.",
    example: "Wenn viele Programme geöffnet sind und der RAM knapp wird, kann das Betriebssystem Daten auslagern. Das System bleibt nutzbar, wird aber oft langsamer.",
    exercises: [
      {
        question: "Was verwaltet die Speicherverwaltung?",
        answer: "Sie verwaltet den Arbeitsspeicher und Speicherbereiche von Prozessen."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Speicherverwaltung ist für AP1 sehr wichtig, weil sie Betriebssysteme, Prozesse, RAM, Performance und Sicherheit verbindet.",
          "Die IHK kann typische Situationen prüfen: Ein PC ist langsam, viele Programme laufen, RAM ist knapp, ein Prozess darf nicht auf fremden Speicher zugreifen oder virtueller Speicher wird genutzt.",
          "Português de apoio: Speicherverwaltung é como o sistema operacional organiza a memória para que cada processo tenha espaço e não invada a área de outro processo."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what Speicherverwaltung means.",
        "After this chapter the student will be able to describe why processes need memory.",
        "After this chapter the student will be able to explain Speicherschutz at AP1 level.",
        "After this chapter the student will be able to distinguish RAM and virtueller Speicher.",
        "After this chapter the student will be able to explain Paging and Auslagerung in simple words.",
        "After this chapter the student will be able to solve AP1-style questions about memory problems."
      ],
      introduction: [
        "Wenn du ein Programm startest, braucht es nicht nur CPU-Zeit. Es braucht auch Arbeitsspeicher.",
        "Im Arbeitsspeicher liegen aktuelle Daten, Programmzustände und Teile des Programms, während es läuft.",
        "Da mehrere Prozesse gleichzeitig Speicher benötigen, muss das Betriebssystem Ordnung schaffen. Diese Aufgabe heißt Speicherverwaltung.",
        "Für AP1 ist besonders wichtig: Speicherverwaltung ist nicht nur Performance. Sie schützt auch Prozesse voneinander."
      ],
      explanation: [
        {
          title: "Was ist Speicherverwaltung?",
          paragraphs: [
            "Speicherverwaltung ist die Aufgabe des Betriebssystems, Arbeitsspeicher zu verteilen, zu überwachen und zu schützen.",
            "Jeder laufende Prozess benötigt Speicher. Das Betriebssystem entscheidet, welcher Prozess wie viel Speicher bekommt.",
            "Außerdem verhindert die Speicherverwaltung, dass ein Prozess einfach den Speicher eines anderen Prozesses verändert."
          ]
        },
        {
          title: "Warum brauchen Prozesse Speicher?",
          paragraphs: [
            "Ein Prozess enthält nicht nur Programmcode. Er arbeitet auch mit aktuellen Daten.",
            "Ein Texteditor braucht Speicher für den geöffneten Text. Ein Browser braucht Speicher für Tabs, Bilder, Skripte und Zwischendaten.",
            "Wenn nicht genug Speicher vorhanden ist, kann das Programm langsamer werden, nicht mehr reagieren oder abstürzen."
          ]
        },
        {
          title: "Physischer Arbeitsspeicher",
          paragraphs: [
            "Physischer Arbeitsspeicher ist der echte RAM im Computer.",
            "RAM ist schnell und wird für aktuell benötigte Daten genutzt.",
            "RAM ist flüchtig. Das bedeutet: Nach dem Ausschalten sind die Daten im RAM normalerweise weg."
          ]
        },
        {
          title: "Speicherbereiche",
          paragraphs: [
            "Das Betriebssystem teilt Speicher in Bereiche ein. Prozesse erhalten eigene Speicherbereiche.",
            "Diese Trennung ist wichtig, damit Programme stabil und sicher arbeiten können.",
            "Wenn ein Programm einen Fehler hat, soll es nicht einfach Daten eines anderen Programms überschreiben."
          ]
        },
        {
          title: "Speicherschutz",
          paragraphs: [
            "Speicherschutz bedeutet, dass Speicherbereiche vor unerlaubtem Zugriff geschützt werden.",
            "Ein normaler Prozess darf nicht beliebig in den Speicher eines anderen Prozesses schreiben.",
            "Speicherschutz erhöht Stabilität und Sicherheit. Er verhindert viele schwere Systemfehler."
          ]
        },
        {
          title: "Virtueller Speicher",
          paragraphs: [
            "Virtueller Speicher ist ein Konzept, bei dem Prozesse so arbeiten können, als hätten sie einen eigenen großen Speicherbereich.",
            "Das Betriebssystem bildet diesen virtuellen Speicher auf echten RAM und bei Bedarf auf Speicherplatz auf SSD oder HDD ab.",
            "Für AP1 reicht: Virtueller Speicher hilft bei der Verwaltung von Speicher und kann RAM durch Auslagerung ergänzen."
          ]
        },
        {
          title: "Paging und Auslagerung",
          paragraphs: [
            "Paging bedeutet, dass Speicher in kleine Bereiche aufgeteilt wird, die Seiten genannt werden.",
            "Wenn RAM knapp wird, können Teile des Speichers auf ein Speichermedium ausgelagert werden. Unter Windows spricht man oft von Auslagerungsdatei, unter Linux von Swap.",
            "Auslagerung ist langsamer als echter RAM, weil SSD oder HDD langsamer als RAM sind. Deshalb wird ein System bei starkem Auslagern oft spürbar langsamer."
          ]
        },
        {
          title: "Warum wird der Computer langsam?",
          paragraphs: [
            "Wenn viele Programme laufen, kann der RAM knapp werden.",
            "Das Betriebssystem muss dann stärker verwalten, Daten verschieben oder auslagern.",
            "Die Folge kann hohe Datenträgeraktivität, lange Wartezeit und schlechte Reaktionsfähigkeit sein."
          ]
        },
        {
          title: "Speicherleck",
          paragraphs: [
            "Ein Speicherleck entsteht, wenn ein Programm Speicher anfordert, ihn aber nicht korrekt wieder freigibt.",
            "Mit der Zeit kann der Speicherverbrauch steigen, obwohl das Programm nicht mehr Arbeit erledigt.",
            "Für AP1 reicht die Grundidee: Ein Speicherleck kann dazu führen, dass ein System langsam wird oder Programme abstürzen."
          ]
        },
        {
          title: "Zusammenhang mit Prozessen und Threads",
          paragraphs: [
            "Prozesse erhalten eigene Speicherbereiche. Threads innerhalb eines Prozesses teilen sich häufig Speicher dieses Prozesses.",
            "Deshalb ist Speicherverwaltung eng mit Prozessen und Threads verbunden.",
            "Bei Threads sind gemeinsame Daten nützlich, aber auch riskant. Bei Prozessen ist Schutz zwischen Speicherbereichen besonders wichtig."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Büro-PC wird langsam, weil Browser, Teams, IDE und mehrere große Dateien gleichzeitig geöffnet sind.",
        "Ein Serverprozess verbraucht über Stunden immer mehr RAM. Ein Speicherleck ist eine mögliche Ursache.",
        "Ein Programm stürzt ab, aber andere Programme laufen weiter, weil Speicherschutz die Auswirkungen begrenzt.",
        "Ein Laptop mit wenig RAM nutzt stark die Auslagerungsdatei. Das System reagiert deutlich langsamer.",
        "Ein Administrator prüft im Task-Manager, welcher Prozess besonders viel Arbeitsspeicher verwendet."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: PC wird bei vielen Programmen langsam",
          paragraphs: [
            "Ein Azubi öffnet Browser, Entwicklungsumgebung, Videokonferenz und mehrere Dokumente. Der PC reagiert langsam.",
            "Eine wahrscheinliche Ursache ist knapper Arbeitsspeicher. Das Betriebssystem nutzt mehr Auslagerung."
          ],
          steps: [
            "Task-Manager öffnen.",
            "Speichernutzung prüfen.",
            "Prozesse mit hohem RAM-Verbrauch identifizieren.",
            "Nicht benötigte Programme schließen.",
            "Prüfen, ob das System wieder schneller reagiert.",
            "Langfristig RAM-Erweiterung oder weniger parallele Programme prüfen."
          ]
        },
        {
          title: "Szenario 2: Prozess darf fremden Speicher nicht ändern",
          paragraphs: [
            "Ein fehlerhaftes Programm versucht, auf einen Speicherbereich zuzugreifen, der nicht zu ihm gehört.",
            "Das Betriebssystem blockiert den Zugriff oder beendet den Prozess, damit das System stabil bleibt."
          ],
          steps: [
            "Prozess führt fehlerhaften Speicherzugriff aus.",
            "Speicherschutz erkennt unerlaubten Zugriff.",
            "Zugriff wird verhindert.",
            "Prozess erhält Fehler oder wird beendet.",
            "Andere Prozesse bleiben geschützt."
          ]
        }
      ],
      diagrams: [
        {
          title: "Speicherverwaltung zwischen Prozessen und RAM",
          code: "flowchart TD\n  P1[Prozess A] --> OS[Speicherverwaltung]\n  P2[Prozess B] --> OS\n  P3[Prozess C] --> OS\n  OS --> RAM[Physischer RAM]\n  OS --> VS[Virtueller Speicher]\n  VS --> SSD[Auslagerungsdatei / Swap auf SSD]"
        },
        {
          title: "Speicherschutz vereinfacht",
          code: "flowchart LR\n  A[Prozess A Speicherbereich] -->|erlaubt| A1[Eigene Daten]\n  B[Prozess B Speicherbereich] -->|erlaubt| B1[Eigene Daten]\n  A -->|unerlaubter Zugriff| X[Blockiert durch Speicherschutz]\n  X --> B"
        }
      ],
      ihkFocus: {
        appears: [
          "Aufgabe der Speicherverwaltung beschreiben.",
          "RAM und virtuellen Speicher unterscheiden.",
          "Speicherschutz erklären.",
          "Paging oder Auslagerung auf Grundniveau einordnen.",
          "Performance-Probleme durch knappen RAM analysieren.",
          "Zusammenhang zwischen Prozessen und Speicher erklären."
        ],
        commonMistakes: [
          "Virtuellen Speicher als genauso schnell wie RAM beschreiben.",
          "Speicherverwaltung nur als Speicherplatz auf SSD verstehen.",
          "RAM und Massenspeicher verwechseln.",
          "Speicherschutz vergessen und Prozesse als ungeschützt betrachten.",
          "Auslagerung als dauerhafte Lösung für zu wenig RAM darstellen."
        ],
        importantDetails: [
          "RAM ist schnell und flüchtig.",
          "Prozesse brauchen Speicherbereiche.",
          "Speicherschutz verhindert unerlaubte Zugriffe.",
          "Virtueller Speicher erleichtert Speicherverwaltung.",
          "Auslagerung auf SSD/HDD ist langsamer als RAM.",
          "Hoher Speicherverbrauch kann Systeme verlangsamen."
        ],
        confusedConcepts: [
          "RAM vs SSD/HDD.",
          "Physischer Speicher vs virtueller Speicher.",
          "Paging vs Datei kopieren.",
          "Speicherverbrauch vs CPU-Auslastung.",
          "Prozessspeicher vs gemeinsam genutzter Thread-Speicher."
        ],
        vocabulary: [
          "Speicherverwaltung = Verwaltung von Arbeitsspeicher.",
          "Arbeitsspeicher = schneller flüchtiger Speicher.",
          "Virtueller Speicher = verwalteter Speicherbereich für Prozesse.",
          "Paging = Aufteilung in Speicherseiten.",
          "Speicherschutz = Schutz vor unerlaubtem Speicherzugriff."
        ]
      },
      commonMistakes: [
        "Zu sagen: Speicherverwaltung bedeutet nur Dateien auf der SSD verwalten. Das ist Dateiverwaltung; Speicherverwaltung betrifft vor allem Arbeitsspeicher von Prozessen.",
        "Virtuellen Speicher als kostenlosen zusätzlichen RAM zu verstehen. Er hilft, ist aber bei Auslagerung auf SSD oder HDD langsamer.",
        "RAM und Festplattenspeicher zu verwechseln. RAM ist schneller und flüchtig; SSD/HDD speichern langfristig.",
        "Speicherschutz als unwichtig zu sehen. Ohne Schutz könnte ein fehlerhaftes Programm andere Programme beschädigen.",
        "Bei langsamem System nur an CPU zu denken. Auch knapper RAM und starke Auslagerung können die Ursache sein."
      ],
      vocabulary: [
        {
          de: "Speicherverwaltung",
          pt: "gerenciamento de memória",
          explanation: "Aufgabe des Betriebssystems, Arbeitsspeicher zu verteilen und zu schützen.",
          example: "Die Speicherverwaltung weist einem Prozess RAM zu."
        },
        {
          de: "Arbeitsspeicher",
          pt: "memória RAM",
          explanation: "Schneller flüchtiger Speicher für aktuell benötigte Daten.",
          example: "Programme nutzen Arbeitsspeicher während der Ausführung."
        },
        {
          de: "Speicherbereich",
          pt: "área de memória",
          explanation: "Abgegrenzter Bereich im Speicher, der einem Prozess zugeordnet sein kann.",
          example: "Der Prozess nutzt seinen eigenen Speicherbereich."
        },
        {
          de: "Speicherschutz",
          pt: "proteção de memória",
          explanation: "Schutz vor unerlaubtem Zugriff auf Speicherbereiche.",
          example: "Speicherschutz verhindert fremde Schreibzugriffe."
        },
        {
          de: "virtueller Speicher",
          pt: "memória virtual",
          explanation: "Vom Betriebssystem verwalteter Speicherbereich, der RAM und Auslagerung kombinieren kann.",
          example: "Virtueller Speicher hilft bei knappen RAM-Ressourcen."
        },
        {
          de: "Paging",
          pt: "paginação",
          explanation: "Aufteilung von Speicher in Seiten.",
          example: "Paging ist ein Grundkonzept virtueller Speicherverwaltung."
        },
        {
          de: "Auslagerung",
          pt: "swap / paginação para disco",
          explanation: "Verschieben von Speicherinhalten auf ein Speichermedium, wenn RAM knapp ist.",
          example: "Starke Auslagerung kann den PC verlangsamen."
        },
        {
          de: "Auslagerungsdatei",
          pt: "arquivo de paginação",
          explanation: "Datei, die unter anderem für ausgelagerte Speicherinhalte genutzt werden kann.",
          example: "Windows kann eine Auslagerungsdatei verwenden."
        },
        {
          de: "Swap",
          pt: "swap",
          explanation: "Bereich oder Datei zur Auslagerung von Speicherinhalten, häufig unter Linux erwähnt.",
          example: "Linux kann Swap verwenden, wenn RAM knapp wird."
        },
        {
          de: "Speicherleck",
          pt: "vazamento de memória",
          explanation: "Fehler, bei dem ein Programm Speicher nicht korrekt freigibt.",
          example: "Ein Speicherleck kann den RAM-Verbrauch ständig erhöhen."
        }
      ],
      summary: [
        "Speicherverwaltung ist eine zentrale Aufgabe des Betriebssystems. Sie verteilt Arbeitsspeicher an Prozesse, überwacht Speicherbereiche und schützt Prozesse voreinander.",
        "RAM ist schneller, flüchtiger Speicher für aktuell benötigte Daten. Prozesse benötigen RAM, damit Programmcode, Daten und Zustände während der Ausführung verfügbar sind.",
        "Speicherschutz verhindert, dass ein Prozess unerlaubt auf Speicher eines anderen Prozesses zugreift. Das verbessert Stabilität und Sicherheit.",
        "Virtueller Speicher hilft dem Betriebssystem, Speicher für Prozesse zu organisieren. Wenn RAM knapp wird, können Daten ausgelagert werden. Das ist langsamer als echter RAM.",
        "Für AP1 musst du RAM, virtuellen Speicher, Paging, Auslagerung, Speicherschutz und typische Performance-Probleme sicher erklären können."
      ],
      mindMap: {
        title: "Mindmap: Speicherverwaltung",
        code: "mindmap\n  root((Speicherverwaltung))\n    Aufgabe\n      RAM verteilen\n      Speicher schützen\n      Prozesse verwalten\n    Konzepte\n      Arbeitsspeicher\n      Speicherbereich\n      virtueller Speicher\n      Paging\n      Auslagerung\n    Sicherheit\n      Speicherschutz\n      Prozessgrenzen\n      unerlaubter Zugriff\n    Performance\n      RAM knapp\n      Swap\n      System langsam\n      Speicherleck\n    AP1 Fokus\n      Begriffe unterscheiden\n      Fehler analysieren\n      Beispiele erklären"
      },
      exercises: {
        easy: [
          {
            question: "Was ist Speicherverwaltung?",
            answer: "Speicherverwaltung ist die Verwaltung des Arbeitsspeichers durch das Betriebssystem.",
            explanation: "Sie verteilt Speicher an Prozesse und schützt Speicherbereiche."
          },
          {
            question: "Was ist Arbeitsspeicher?",
            answer: "Arbeitsspeicher ist schneller flüchtiger Speicher für aktuell benötigte Daten.",
            explanation: "Er wird auch RAM genannt."
          },
          {
            question: "Was bedeutet Speicherschutz?",
            answer: "Speicherschutz verhindert unerlaubte Zugriffe auf Speicherbereiche.",
            explanation: "Ein Prozess soll nicht einfach fremden Speicher verändern."
          },
          {
            question: "Ist Auslagerung so schnell wie RAM?",
            answer: "Nein.",
            explanation: "Auslagerung auf SSD oder HDD ist langsamer als echter RAM."
          },
          {
            question: "Was ist ein Speicherleck?",
            answer: "Ein Fehler, bei dem ein Programm Speicher nicht korrekt freigibt.",
            explanation: "Dadurch kann der Speicherverbrauch mit der Zeit steigen."
          }
        ],
        intermediate: [
          {
            question: "Warum braucht jeder Prozess Speicher?",
            answer: "Ein Prozess braucht Speicher für Programmcode, aktuelle Daten und seinen Ausführungszustand.",
            explanation: "Ohne Speicher kann ein Prozess nicht sinnvoll arbeiten."
          },
          {
            question: "Warum ist virtueller Speicher nützlich?",
            answer: "Er hilft dem Betriebssystem, Speicherbereiche für Prozesse zu organisieren und bei knappem RAM Auslagerung zu nutzen.",
            explanation: "Er macht Speicherverwaltung flexibler, ersetzt aber RAM nicht ohne Nachteile."
          },
          {
            question: "Warum wird ein PC langsam, wenn zu wenig RAM vorhanden ist?",
            answer: "Das Betriebssystem muss stärker auslagern, und Zugriff auf SSD oder HDD ist langsamer als RAM.",
            explanation: "Dadurch steigen Wartezeiten und die Reaktionsfähigkeit sinkt."
          },
          {
            question: "Wie hängen Prozesse und Speicherverwaltung zusammen?",
            answer: "Prozesse benötigen eigene Speicherbereiche, die vom Betriebssystem zugewiesen und geschützt werden.",
            explanation: "Speicherverwaltung ist deshalb Teil der Prozessverwaltung."
          },
          {
            question: "Warum ist Speicherschutz auch ein Sicherheitsthema?",
            answer: "Er verhindert, dass Prozesse unerlaubt fremde Daten lesen oder verändern.",
            explanation: "Das schützt vertrauliche Daten und Systemstabilität."
          }
        ],
        ap1Style: [
          {
            question: "Ein PC mit vielen geöffneten Programmen reagiert langsam. Im Task-Manager ist die Speicherauslastung sehr hoch. Erklären Sie eine mögliche Ursache.",
            answer: "Der RAM ist knapp, und das Betriebssystem muss Daten auslagern.",
            explanation: "Auslagerung auf SSD oder HDD ist langsamer als RAM und kann das System verlangsamen."
          },
          {
            question: "Ein Azubi sagt: 'Virtueller Speicher ist einfach genauso schneller zusätzlicher RAM.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "Virtueller Speicher kann Auslagerung auf Speichermedien nutzen. Das ist deutlich langsamer als physischer RAM."
          },
          {
            question: "Warum darf ein Prozess nicht einfach den Speicher eines anderen Prozesses verändern?",
            answer: "Das würde Stabilität und Sicherheit gefährden.",
            explanation: "Speicherschutz verhindert solche unerlaubten Zugriffe."
          },
          {
            question: "Ordnen Sie zu: RAM, Auslagerung, Speicherschutz. Was ist schneller flüchtiger Speicher, was nutzt Speichermedien bei knappem RAM, was verhindert fremde Zugriffe?",
            answer: "RAM = schneller flüchtiger Speicher. Auslagerung = Nutzung von Speichermedien bei knappem RAM. Speicherschutz = verhindert unerlaubte Zugriffe.",
            explanation: "Diese Begriffe werden in AP1-Aufgaben häufig verwechselt."
          },
          {
            question: "Ein Serverprozess verbraucht über mehrere Stunden immer mehr RAM. Nennen Sie eine mögliche Software-Ursache.",
            answer: "Ein Speicherleck.",
            explanation: "Bei einem Speicherleck gibt ein Programm Speicher nicht korrekt frei, wodurch der Verbrauch steigen kann."
          }
        ]
      },
      related: {
        previous: "Threads",
        next: "Benutzer und Gruppen"
      },
      revisionChecklist: [
        "Ich kann erklären, was Speicherverwaltung ist.",
        "Ich kann RAM und virtuellen Speicher unterscheiden.",
        "Ich verstehe Speicherschutz auf AP1-Niveau.",
        "Ich kann Paging und Auslagerung einfach erklären.",
        "Ich kann erklären, warum knapper RAM ein System verlangsamen kann.",
        "Ich kann Speicherleck als mögliche Ursache für steigenden RAM-Verbrauch nennen.",
        "Ich kann AP1-Fragen zur Speicherverwaltung beantworten."
      ]
    }
  },
  {
    id: "benutzer",
    title: "Benutzer und Gruppen",
    description: "Benutzer und Gruppen helfen Betriebssystemen, Identitäten, Zugriffe, Dateien und administrative Aufgaben sauber zu verwalten.",
    text: [
      "Ein Benutzerkonto steht für eine Identität im System. Gruppen fassen mehrere Benutzer zusammen, damit Rechte einfacher verwaltet werden können.",
      "Für die AP1 musst du verstehen, warum Unternehmen getrennte Benutzerkonten, Gruppen, Rollen und administrative Rechte brauchen."
    ],
    ihk: "Wichtig für AP1: Benutzer = Identität im System, Gruppe = Zusammenfassung von Benutzern. Gruppen vereinfachen Berechtigungen und unterstützen das Prinzip der minimalen Rechte.",
    summary: "Usuários representam identidades no sistema. Grupos reúnem usuários para administrar permissões de forma mais simples, segura e organizada.",
    example: "In einer Firma bekommt jeder Mitarbeiter ein eigenes Benutzerkonto. Entwickler können zusätzlich Mitglied der Gruppe Entwicklung sein.",
    exercises: [
      {
        question: "Was ist ein Benutzerkonto?",
        answer: "Ein Benutzerkonto ist eine Identität im System."
      }
    ],
    studyTime: "80-100 Minuten",
    difficulty: "Easy",
    fullContent: {
      studyTime: "80-100 Minuten",
      difficulty: "Easy",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Benutzer und Gruppen sind für AP1 sehr wichtig, weil sie die Grundlage für Rechte, Datenschutz, Sicherheit und Administration bilden.",
          "Die IHK prüft oft praktische Situationen: Wer darf auf einen Ordner zugreifen? Warum sollte nicht jeder Administrator sein? Wie verwaltet man Rechte für mehrere Personen effizient?",
          "Português de apoio: usuário é a identidade; grupo é uma forma de organizar várias identidades para aplicar permissões de maneira simples."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Benutzerkonto is.",
        "After this chapter the student will be able to explain why companies use separate user accounts.",
        "After this chapter the student will be able to describe the purpose of Gruppen.",
        "After this chapter the student will be able to distinguish normal users and administrators.",
        "After this chapter the student will be able to explain the principle of least privilege.",
        "After this chapter the student will be able to solve AP1-style questions about user and group management."
      ],
      introduction: [
        "In einem Unternehmen arbeiten viele Menschen an denselben IT-Systemen. Trotzdem darf nicht jeder alles sehen, ändern oder löschen.",
        "Deshalb arbeiten Betriebssysteme mit Benutzerkonten. Ein Benutzerkonto verbindet eine Person oder einen Dienst mit einer Identität im System.",
        "Gruppen machen die Verwaltung einfacher. Statt jedem Benutzer einzeln Rechte zu geben, kann man Rechte einer Gruppe geben und Benutzer dieser Gruppe hinzufügen.",
        "Für AP1 ist wichtig: Benutzer und Gruppen sind nicht nur Verwaltung. Sie sind ein Sicherheitskonzept."
      ],
      explanation: [
        {
          title: "Was ist ein Benutzer?",
          paragraphs: [
            "Ein Benutzer ist eine Identität, die sich an einem System anmelden und damit arbeiten kann.",
            "In einem Betriebssystem wird diese Identität meistens durch ein Benutzerkonto dargestellt.",
            "Ein Benutzerkonto kann Einstellungen, Dateien, Berechtigungen und Anmeldeinformationen besitzen."
          ]
        },
        {
          title: "Warum braucht jeder ein eigenes Konto?",
          paragraphs: [
            "Eigene Konten schaffen Nachvollziehbarkeit. Das System kann erkennen, wer welche Aktion ausgeführt hat.",
            "Sie schützen persönliche Dateien und Einstellungen. Jeder Benutzer kann einen eigenen Arbeitsbereich haben.",
            "Sie verbessern Sicherheit, weil Rechte gezielt vergeben und entzogen werden können."
          ]
        },
        {
          title: "Benutzerkonto und Profil",
          paragraphs: [
            "Ein Benutzerkonto ist die Identität im System. Ein Benutzerprofil enthält persönliche Einstellungen und oft benutzerspezifische Dateien.",
            "Unter Windows gehören dazu zum Beispiel Desktop, Dokumente, Downloads und persönliche Anwendungseinstellungen.",
            "Für AP1 reicht: Konto = Identität und Anmeldung; Profil = persönliche Umgebung des Benutzers."
          ]
        },
        {
          title: "Was ist eine Gruppe?",
          paragraphs: [
            "Eine Gruppe fasst mehrere Benutzer zusammen.",
            "Gruppen vereinfachen die Verwaltung von Berechtigungen. Man vergibt Rechte an die Gruppe, nicht an jede Person einzeln.",
            "Wenn ein neuer Mitarbeiter in ein Team kommt, wird er der passenden Gruppe hinzugefügt und erhält dadurch die benötigten Rechte."
          ]
        },
        {
          title: "Beispiel: Abteilungsgruppen",
          paragraphs: [
            "Eine Firma kann Gruppen wie Entwicklung, Buchhaltung, Support oder Personalabteilung verwenden.",
            "Der Ordner für die Buchhaltung bekommt Rechte für die Gruppe Buchhaltung.",
            "Mitarbeiter aus anderen Gruppen haben keinen Zugriff, wenn sie die Daten nicht benötigen."
          ]
        },
        {
          title: "Normale Benutzer und Administratoren",
          paragraphs: [
            "Normale Benutzer arbeiten mit Anwendungen, Dateien und freigegebenen Ressourcen.",
            "Administratoren dürfen Systeme konfigurieren, Benutzer verwalten, Software installieren und wichtige Einstellungen ändern.",
            "Nicht jeder Benutzer sollte Administratorrechte haben. Zu viele Administratorrechte erhöhen das Risiko von Fehlkonfigurationen, Malware und Datenverlust."
          ]
        },
        {
          title: "Prinzip der minimalen Rechte",
          paragraphs: [
            "Das Prinzip der minimalen Rechte bedeutet: Ein Benutzer bekommt nur die Rechte, die er für seine Aufgabe wirklich braucht.",
            "Dieses Prinzip reduziert Schäden, wenn ein Konto missbraucht wird oder ein Benutzer versehentlich etwas Falsches tut.",
            "Für AP1 ist das ein sehr wichtiger Sicherheitsgedanke."
          ]
        },
        {
          title: "Lokale Konten und Domänenkonten",
          paragraphs: [
            "Ein lokales Konto existiert auf einem einzelnen Computer.",
            "Ein Domänenkonto oder zentral verwaltetes Konto kann in einer Unternehmensumgebung auf mehreren Systemen genutzt werden.",
            "Für AP1 reicht die Grundidee: Lokale Konten sind einzeln auf einem Gerät; zentrale Konten erleichtern Verwaltung in Unternehmen."
          ]
        },
        {
          title: "Dienstkonten",
          paragraphs: [
            "Nicht nur Menschen können Konten haben. Auch Dienste oder Anwendungen können eigene Konten nutzen.",
            "Ein Dienstkonto sollte nur die Rechte besitzen, die der Dienst für seine Aufgabe braucht.",
            "Dadurch wird verhindert, dass ein kompromittierter Dienst automatisch sehr viele Rechte im System hat."
          ]
        },
        {
          title: "Lebenszyklus eines Benutzerkontos",
          paragraphs: [
            "Benutzerkonten haben einen Lebenszyklus: anlegen, verwenden, ändern, sperren und löschen oder deaktivieren.",
            "Wenn ein Mitarbeiter die Firma verlässt, sollte sein Konto nicht aktiv bleiben.",
            "Konten, die nicht mehr gebraucht werden, sind ein Sicherheitsrisiko."
          ]
        }
      ],
      realWorldExamples: [
        "Ein neuer Azubi bekommt ein eigenes Konto und wird der Gruppe Ausbildung hinzugefügt.",
        "Die Buchhaltung hat Zugriff auf Rechnungsordner, die Entwicklung nicht.",
        "Ein normaler Mitarbeiter kann keine Systemsoftware installieren, weil er keine Administratorrechte hat.",
        "Ein ausgeschiedener Mitarbeiter wird deaktiviert, damit niemand das Konto weiter nutzen kann.",
        "Ein Backup-Dienst läuft mit einem Dienstkonto, das nur Zugriff auf benötigte Backup-Verzeichnisse hat."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Neuer Mitarbeiter",
          paragraphs: [
            "Ein neuer Mitarbeiter beginnt in der Entwicklungsabteilung. Er braucht Zugriff auf Projektordner, aber nicht auf Buchhaltungsdaten.",
            "Die IT erstellt ein Benutzerkonto und fügt es der Gruppe Entwicklung hinzu."
          ],
          steps: [
            "Benutzerkonto anlegen.",
            "Starkes Startpasswort oder Anmeldeverfahren festlegen.",
            "Benutzer der Gruppe Entwicklung hinzufügen.",
            "Zugriff auf Projektordner prüfen.",
            "Keinen Zugriff auf unnötige Abteilungen geben.",
            "Dokumentieren, welche Gruppen zugewiesen wurden."
          ]
        },
        {
          title: "Szenario 2: Zu viele Administratorrechte",
          paragraphs: [
            "Ein Benutzer arbeitet täglich mit Administratorrechten. Er öffnet versehentlich eine schädliche Datei.",
            "Der Schaden kann größer sein, weil das Konto viele Rechte hat."
          ],
          steps: [
            "Risiko erkennen.",
            "Normales Benutzerkonto für tägliche Arbeit verwenden.",
            "Administratorrechte nur bei Bedarf nutzen.",
            "Prinzip der minimalen Rechte anwenden.",
            "Berechtigungen regelmäßig prüfen."
          ]
        }
      ],
      diagrams: [
        {
          title: "Benutzer, Gruppen und Rechte",
          code: "flowchart TD\n  U1[Benutzer: Mira] --> G1[Gruppe: Entwicklung]\n  U2[Benutzer: Alex] --> G1\n  U3[Benutzer: Sofia] --> G2[Gruppe: Buchhaltung]\n  G1 --> P1[Rechte auf Projektordner]\n  G2 --> P2[Rechte auf Rechnungsordner]"
        },
        {
          title: "Prinzip der minimalen Rechte",
          code: "flowchart LR\n  A[Aufgabe des Benutzers] --> B[Benötigte Rechte bestimmen]\n  B --> C[Nur diese Rechte vergeben]\n  C --> D[Regelmäßig prüfen]\n  D --> E[Risiko reduzieren]"
        }
      ],
      ihkFocus: {
        appears: [
          "Benutzerkonto als Identität erklären.",
          "Zweck von Gruppen beschreiben.",
          "Benutzer und Gruppen zur Rechteverwaltung nutzen.",
          "Administratorrechte und normale Benutzerrechte unterscheiden.",
          "Prinzip der minimalen Rechte erklären.",
          "Praktische Zugriffssituationen in Unternehmen bewerten."
        ],
        commonMistakes: [
          "Benutzerkonto und Benutzerprofil verwechseln.",
          "Jede Berechtigung einzeln pro Benutzer vergeben statt Gruppen zu nutzen.",
          "Allen Benutzern Administratorrechte geben.",
          "Ausgeschiedene Mitarbeiterkonten aktiv lassen.",
          "Dienstkonten mit zu vielen Rechten ausstatten."
        ],
        importantDetails: [
          "Benutzerkonten schaffen Identität und Nachvollziehbarkeit.",
          "Gruppen vereinfachen Rechteverwaltung.",
          "Administratoren haben besondere Rechte.",
          "Minimale Rechte reduzieren Risiken.",
          "Konten müssen verwaltet, geändert und deaktiviert werden.",
          "Benutzer und Gruppen sind Grundlage für Berechtigungen."
        ],
        confusedConcepts: [
          "Benutzer vs Gruppe.",
          "Konto vs Profil.",
          "Authentifizierung vs Autorisierung.",
          "Normales Konto vs Administratorkonto.",
          "Lokales Konto vs zentrales Konto.",
          "Personenkonto vs Dienstkonto."
        ],
        vocabulary: [
          "Benutzerkonto = Identität im System.",
          "Gruppe = Zusammenfassung von Benutzern.",
          "Administrator = Benutzer mit erweiterten Rechten.",
          "Profil = persönliche Umgebung eines Benutzers.",
          "Minimale Rechte = nur notwendige Rechte vergeben."
        ]
      },
      commonMistakes: [
        "Zu sagen: Eine Gruppe ist ein einzelner Benutzer. Eine Gruppe fasst mehrere Benutzer zusammen.",
        "Zu glauben, dass Administratorrechte für normale tägliche Arbeit praktisch und deshalb immer gut sind. Sie erhöhen das Risiko.",
        "Benutzerkonto und Profil gleichzusetzen. Das Konto ist die Identität; das Profil enthält persönliche Einstellungen und Daten.",
        "Rechte direkt an viele einzelne Benutzer zu vergeben. In Unternehmen ist Gruppenverwaltung oft übersichtlicher.",
        "Inaktive Konten zu ignorieren. Nicht mehr benötigte Konten sind ein Sicherheitsrisiko."
      ],
      vocabulary: [
        {
          de: "Benutzer",
          pt: "usuário",
          explanation: "Person oder Identität, die ein System verwenden kann.",
          example: "Der Benutzer meldet sich am Computer an."
        },
        {
          de: "Benutzerkonto",
          pt: "conta de usuário",
          explanation: "Systemidentität mit Anmeldeinformationen und zugeordneten Rechten.",
          example: "Jeder Mitarbeiter hat ein eigenes Benutzerkonto."
        },
        {
          de: "Gruppe",
          pt: "grupo",
          explanation: "Zusammenfassung mehrerer Benutzer zur einfacheren Verwaltung.",
          example: "Die Gruppe Entwicklung hat Zugriff auf den Projektordner."
        },
        {
          de: "Administrator",
          pt: "administrador",
          explanation: "Benutzer mit erweiterten Rechten zur Systemverwaltung.",
          example: "Der Administrator kann Benutzerkonten anlegen."
        },
        {
          de: "Benutzerprofil",
          pt: "perfil de usuário",
          explanation: "Persönliche Umgebung und Einstellungen eines Benutzers.",
          example: "Im Benutzerprofil liegen Desktop und Dokumente."
        },
        {
          de: "Dienstkonto",
          pt: "conta de serviço",
          explanation: "Konto, das von einem Dienst oder einer Anwendung genutzt wird.",
          example: "Der Backup-Dienst nutzt ein Dienstkonto."
        },
        {
          de: "Domänenkonto",
          pt: "conta de domínio",
          explanation: "Zentral verwaltetes Konto in einer Unternehmensumgebung.",
          example: "Mit einem Domänenkonto kann sich der Mitarbeiter an verschiedenen Firmen-PCs anmelden."
        },
        {
          de: "lokales Konto",
          pt: "conta local",
          explanation: "Konto, das auf einem einzelnen Gerät existiert.",
          example: "Das lokale Konto gilt nur auf diesem Computer."
        },
        {
          de: "minimale Rechte",
          pt: "privilégios mínimos",
          explanation: "Nur die Rechte vergeben, die für eine Aufgabe nötig sind.",
          example: "Nach dem Prinzip der minimalen Rechte bekommt der Benutzer keine Administratorrechte."
        },
        {
          de: "Nachvollziehbarkeit",
          pt: "rastreabilidade",
          explanation: "Möglichkeit zu erkennen, wer eine Aktion ausgeführt hat.",
          example: "Eigene Benutzerkonten verbessern die Nachvollziehbarkeit."
        }
      ],
      summary: [
        "Benutzer und Gruppen helfen Betriebssystemen und Unternehmen, Identitäten und Zugriffe sauber zu verwalten.",
        "Ein Benutzerkonto steht für eine Identität im System. Es ermöglicht Anmeldung, persönliche Einstellungen, Zuordnung von Dateien und Vergabe von Rechten.",
        "Eine Gruppe fasst mehrere Benutzer zusammen. Rechte werden in Unternehmen häufig an Gruppen vergeben, weil das einfacher und übersichtlicher ist.",
        "Normale Benutzer und Administratoren haben unterschiedliche Rechte. Administratorrechte sollten nur vergeben werden, wenn sie wirklich nötig sind.",
        "Das Prinzip der minimalen Rechte bedeutet: Jeder Benutzer und jedes Dienstkonto bekommt nur die Rechte, die für die jeweilige Aufgabe notwendig sind."
      ],
      mindMap: {
        title: "Mindmap: Benutzer und Gruppen",
        code: "mindmap\n  root((Benutzer und Gruppen))\n    Benutzer\n      Identität\n      Konto\n      Profil\n      Anmeldung\n    Gruppen\n      Benutzer zusammenfassen\n      Rechte einfacher verwalten\n      Abteilungen\n    Rollen\n      normaler Benutzer\n      Administrator\n      Dienstkonto\n    Sicherheit\n      minimale Rechte\n      Nachvollziehbarkeit\n      Konten deaktivieren\n    AP1 Fokus\n      Begriffe unterscheiden\n      Zugriffsszenarien lösen\n      Risiken erkennen"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Benutzerkonto?",
            answer: "Ein Benutzerkonto ist eine Identität im System.",
            explanation: "Es ermöglicht Anmeldung, persönliche Einstellungen und Zuordnung von Rechten."
          },
          {
            question: "Was ist eine Gruppe?",
            answer: "Eine Gruppe fasst mehrere Benutzer zusammen.",
            explanation: "Dadurch können Rechte einfacher verwaltet werden."
          },
          {
            question: "Warum sollte jeder Mitarbeiter ein eigenes Konto haben?",
            answer: "Für Sicherheit, persönliche Einstellungen und Nachvollziehbarkeit.",
            explanation: "Das System kann besser erkennen, wer was gemacht hat."
          },
          {
            question: "Was ist ein Administrator?",
            answer: "Ein Benutzer mit erweiterten Rechten zur Systemverwaltung.",
            explanation: "Administratoren können zum Beispiel Benutzer verwalten oder Systemeinstellungen ändern."
          },
          {
            question: "Was bedeutet minimale Rechte?",
            answer: "Ein Benutzer bekommt nur die Rechte, die er wirklich braucht.",
            explanation: "Das reduziert Sicherheitsrisiken."
          }
        ],
        intermediate: [
          {
            question: "Warum sind Gruppen in Unternehmen praktisch?",
            answer: "Weil Rechte für viele Benutzer zentral und übersichtlich verwaltet werden können.",
            explanation: "Man gibt Rechte an die Gruppe und fügt Benutzer der Gruppe hinzu."
          },
          {
            question: "Erkläre den Unterschied zwischen Benutzerkonto und Benutzerprofil.",
            answer: "Das Benutzerkonto ist die Identität. Das Benutzerprofil enthält persönliche Einstellungen und Dateien.",
            explanation: "Beides gehört zusammen, ist aber nicht dasselbe."
          },
          {
            question: "Warum sollten normale Benutzer nicht dauerhaft Administratorrechte haben?",
            answer: "Weil dadurch Risiken durch Fehler, Malware und falsche Änderungen steigen.",
            explanation: "Administratorrechte sollten nur bei Bedarf genutzt werden."
          },
          {
            question: "Warum sind inaktive Konten gefährlich?",
            answer: "Sie können missbraucht werden, wenn sie nicht deaktiviert oder gelöscht werden.",
            explanation: "Besonders Konten ehemaliger Mitarbeiter müssen kontrolliert werden."
          },
          {
            question: "Was ist ein Dienstkonto?",
            answer: "Ein Konto, das von einem Dienst oder einer Anwendung genutzt wird.",
            explanation: "Auch Dienstkonten sollten nur notwendige Rechte besitzen."
          }
        ],
        ap1Style: [
          {
            question: "Ein neuer Mitarbeiter kommt in die Buchhaltung. Wie sollte der Zugriff auf den Rechnungsordner sinnvoll verwaltet werden?",
            answer: "Das Benutzerkonto wird der Gruppe Buchhaltung hinzugefügt, und die Gruppe hat Rechte auf den Rechnungsordner.",
            explanation: "Gruppen vereinfachen die Rechteverwaltung und vermeiden viele Einzelberechtigungen."
          },
          {
            question: "Ein Unternehmen gibt allen Mitarbeitern Administratorrechte, damit weniger Support-Anfragen entstehen. Beurteilen Sie diese Maßnahme.",
            answer: "Die Maßnahme ist aus Sicherheitssicht schlecht.",
            explanation: "Zu viele Administratorrechte erhöhen Risiken. Das Prinzip der minimalen Rechte sollte angewendet werden."
          },
          {
            question: "Ein Mitarbeiter verlässt die Firma. Nennen Sie eine wichtige Maßnahme für sein Benutzerkonto.",
            answer: "Das Konto sollte deaktiviert oder gelöscht werden.",
            explanation: "Aktive Konten ehemaliger Mitarbeiter sind ein Sicherheitsrisiko."
          },
          {
            question: "Ordnen Sie zu: Benutzerkonto, Gruppe, Administrator. Was ist Identität, was fasst Benutzer zusammen, wer hat erweiterte Rechte?",
            answer: "Benutzerkonto = Identität. Gruppe = fasst Benutzer zusammen. Administrator = erweiterte Rechte.",
            explanation: "Diese Begriffe sind Grundlage für Rechteverwaltung."
          },
          {
            question: "Warum ist ein eigenes Benutzerkonto besser als ein gemeinsames Team-Konto?",
            answer: "Es verbessert Nachvollziehbarkeit, individuelle Rechte und Sicherheit.",
            explanation: "Bei einem gemeinsamen Konto ist schwer erkennbar, wer eine Aktion ausgeführt hat."
          }
        ]
      },
      related: {
        previous: "Speicherverwaltung",
        next: "Rechte und Berechtigungen"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Benutzerkonto ist.",
        "Ich kann Benutzerkonto und Benutzerprofil unterscheiden.",
        "Ich kann erklären, wozu Gruppen dienen.",
        "Ich verstehe den Unterschied zwischen normalem Benutzer und Administrator.",
        "Ich kann das Prinzip der minimalen Rechte erklären.",
        "Ich kann lokale Konten, Domänenkonten und Dienstkonten grob einordnen.",
        "Ich kann AP1-Fragen zu Benutzern und Gruppen beantworten."
      ]
    }
  },
  {
    id: "rechte",
    title: "Rechte und Berechtigungen",
    description: "Rechte und Berechtigungen legen fest, welche Benutzer oder Gruppen auf Dateien, Ordner und Systemfunktionen zugreifen dürfen.",
    text: [
      "Berechtigungen bestimmen, was ein Benutzer oder eine Gruppe mit einer Ressource tun darf: lesen, schreiben, ausführen, ändern oder verwalten.",
      "Für die AP1 musst du Rechte als Sicherheits- und Organisationskonzept verstehen, besonders in Verbindung mit Benutzern, Gruppen und Dateisystemen."
    ],
    ihk: "Wichtig für AP1: Rechte steuern Zugriff. Typische Berechtigungen sind Lesen, Schreiben, Ausführen, Ändern und Vollzugriff. Gruppen vereinfachen die Vergabe.",
    summary: "Permissões definem quem pode acessar, ler, alterar, executar ou administrar arquivos, pastas e recursos do sistema.",
    example: "Ein Benutzer darf einen Projektordner lesen, aber keine Dateien löschen. Die Berechtigung ist bewusst eingeschränkt.",
    exercises: [
      {
        question: "Was legen Berechtigungen fest?",
        answer: "Sie legen fest, was Benutzer oder Gruppen mit Ressourcen tun dürfen."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Rechte und Berechtigungen sind für AP1 sehr wichtig, weil sie Betriebssysteme, Dateisysteme, Sicherheit, Datenschutz und Unternehmenspraxis verbinden.",
          "Die IHK prüft häufig praktische Zugriffssituationen: Ein Benutzer darf lesen, aber nicht schreiben; eine Gruppe braucht Zugriff; Administratorrechte sind zu weit gefasst.",
          "Português de apoio: permissões são regras de acesso. Elas definem quem pode fazer o quê com um arquivo, pasta, sistema ou recurso."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what Rechte and Berechtigungen are.",
        "After this chapter the student will be able to distinguish Lesen, Schreiben, Ausführen, Ändern and Vollzugriff.",
        "After this chapter the student will be able to explain why permissions are often assigned to groups.",
        "After this chapter the student will be able to describe the principle of least privilege.",
        "After this chapter the student will be able to interpret simple access denied situations.",
        "After this chapter the student will be able to solve AP1-style questions about permissions."
      ],
      introduction: [
        "Nicht jeder Benutzer darf alles tun. In einem Unternehmen wäre das gefährlich: Daten könnten gelesen, geändert oder gelöscht werden, obwohl die Person sie nicht braucht.",
        "Deshalb arbeiten Betriebssysteme und Dateisysteme mit Rechten und Berechtigungen.",
        "Berechtigungen legen fest, wer auf eine Ressource zugreifen darf und welche Aktion erlaubt ist.",
        "Dieses Kapitel baut direkt auf Benutzer und Gruppen auf. Ohne Benutzer und Gruppen kann man Rechte nicht sinnvoll verstehen."
      ],
      explanation: [
        {
          title: "Was sind Rechte und Berechtigungen?",
          paragraphs: [
            "Rechte und Berechtigungen sind Regeln für den Zugriff auf Ressourcen.",
            "Eine Ressource kann eine Datei, ein Ordner, ein Programm, ein Drucker, ein Serverdienst oder eine Systemeinstellung sein.",
            "Berechtigungen beantworten die Frage: Wer darf was tun?"
          ]
        },
        {
          title: "Lesen",
          paragraphs: [
            "Lesen bedeutet, dass ein Benutzer den Inhalt einer Datei anzeigen oder einen Ordnerinhalt sehen darf.",
            "Wer nur Leserechte hat, darf normalerweise nichts verändern.",
            "Beispiel: Ein Mitarbeiter darf eine Richtlinie lesen, aber nicht bearbeiten."
          ]
        },
        {
          title: "Schreiben",
          paragraphs: [
            "Schreiben bedeutet, dass ein Benutzer Daten erstellen oder verändern darf.",
            "In einem Ordner kann Schreiben bedeuten, neue Dateien anzulegen oder vorhandene Dateien zu ändern.",
            "Schreibrechte sind stärker als reine Leserechte und müssen deshalb sorgfältig vergeben werden."
          ]
        },
        {
          title: "Ausführen",
          paragraphs: [
            "Ausführen bedeutet, dass ein Benutzer ein Programm oder Skript starten darf.",
            "Diese Berechtigung ist besonders wichtig bei Programmen, Skripten und ausführbaren Dateien.",
            "Ein Benutzer kann eine Datei vielleicht lesen, aber nicht ausführen dürfen."
          ]
        },
        {
          title: "Ändern und Löschen",
          paragraphs: [
            "Ändern bedeutet, Inhalte oder Eigenschaften einer Ressource zu bearbeiten.",
            "Je nach System kann Ändern auch das Löschen oder Umbenennen von Dateien einschließen.",
            "In AP1-Aufgaben musst du genau lesen, welche Aktion erlaubt oder nicht erlaubt sein soll."
          ]
        },
        {
          title: "Vollzugriff",
          paragraphs: [
            "Vollzugriff bedeutet sehr weitgehende Rechte auf eine Ressource.",
            "Wer Vollzugriff hat, kann meistens lesen, schreiben, ändern, löschen und Berechtigungen verwalten.",
            "Vollzugriff sollte nur vergeben werden, wenn er wirklich notwendig ist."
          ]
        },
        {
          title: "Benutzerrechte und Gruppenrechte",
          paragraphs: [
            "Berechtigungen können direkt an Benutzer oder an Gruppen vergeben werden.",
            "In Unternehmen ist es oft besser, Rechte an Gruppen zu vergeben. Dann wird die Verwaltung einfacher.",
            "Beispiel: Die Gruppe Buchhaltung bekommt Rechte auf den Rechnungsordner. Neue Mitarbeiter werden nur der Gruppe hinzugefügt."
          ]
        },
        {
          title: "ACL: Access Control List",
          paragraphs: [
            "Eine ACL ist eine Zugriffskontrollliste. Sie beschreibt, welche Benutzer oder Gruppen welche Rechte auf eine Ressource haben.",
            "Du musst für AP1 keine komplexe ACL-Konfiguration auswendig können.",
            "Wichtig ist die Idee: In einer Liste steht, wer welchen Zugriff bekommt."
          ]
        },
        {
          title: "Vererbung von Berechtigungen",
          paragraphs: [
            "Berechtigungen können von einem übergeordneten Ordner an Unterordner und Dateien vererbt werden.",
            "Das spart Arbeit, weil nicht jede Datei einzeln konfiguriert werden muss.",
            "Vererbung kann aber auch zu Verwirrung führen, wenn ein Benutzer Rechte aus einer übergeordneten Struktur erhält."
          ]
        },
        {
          title: "Prinzip der minimalen Rechte",
          paragraphs: [
            "Das Prinzip der minimalen Rechte bedeutet: Benutzer, Gruppen und Dienste bekommen nur die Rechte, die sie für ihre Aufgabe brauchen.",
            "Dieses Prinzip reduziert Schäden durch Fehler, Malware oder missbrauchte Konten.",
            "Für AP1 ist das einer der wichtigsten Sicherheitsgedanken bei Berechtigungen."
          ]
        },
        {
          title: "Zugriff verweigert",
          paragraphs: [
            "Wenn ein Benutzer eine Aktion ausführen möchte, aber die nötigen Rechte fehlen, erscheint oft eine Meldung wie Zugriff verweigert.",
            "Das bedeutet nicht automatisch, dass die Datei defekt ist.",
            "Häufig muss geprüft werden: Benutzerkonto, Gruppenzugehörigkeit, Berechtigung, Vererbung und Zielressource."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Praktikant darf Dokumentationen lesen, aber keine produktiven Konfigurationsdateien ändern.",
        "Die Gruppe Support darf Logdateien lesen, aber keine Benutzerkonten löschen.",
        "Die Personalabteilung hat Zugriff auf Mitarbeiterdaten, andere Abteilungen nicht.",
        "Ein Entwickler darf Quellcode ändern, aber keine Berechtigungen am Repository verwalten.",
        "Ein Dienstkonto darf Backups lesen, hat aber keinen Vollzugriff auf alle Servereinstellungen."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Zugriff verweigert beim Speichern",
          paragraphs: [
            "Ein Benutzer kann eine Datei im Projektordner öffnen, aber Änderungen nicht speichern.",
            "Wahrscheinlich besitzt er Leserechte, aber keine Schreibrechte."
          ],
          steps: [
            "Prüfen, welcher Benutzer angemeldet ist.",
            "Gruppenzugehörigkeit prüfen.",
            "Berechtigungen des Ordners prüfen.",
            "Lesen und Schreiben unterscheiden.",
            "Nur notwendige Rechte vergeben.",
            "Speichern erneut testen."
          ]
        },
        {
          title: "Szenario 2: Rechte für ein neues Team",
          paragraphs: [
            "Ein neues Projektteam braucht Zugriff auf einen gemeinsamen Ordner.",
            "Statt jedem Benutzer einzeln Rechte zu geben, wird eine Projektgruppe erstellt."
          ],
          steps: [
            "Gruppe Projekt-Team erstellen.",
            "Benutzer zur Gruppe hinzufügen.",
            "Berechtigung für den Ordner an die Gruppe vergeben.",
            "Lesen oder Schreiben je nach Aufgabe festlegen.",
            "Zugriff mit einem normalen Benutzerkonto testen.",
            "Rechte dokumentieren."
          ]
        }
      ],
      diagrams: [
        {
          title: "Berechtigungen beantworten: Wer darf was?",
          code: "flowchart TD\n  U[Benutzer oder Gruppe] --> P[Berechtigung]\n  P --> A[Aktion: Lesen / Schreiben / Ausführen]\n  A --> R[Ressource: Datei / Ordner / System]\n  R --> E{Erlaubt?}\n  E -->|Ja| OK[Zugriff möglich]\n  E -->|Nein| NO[Zugriff verweigert]"
        },
        {
          title: "Gruppenrechte statt Einzelrechte",
          code: "flowchart LR\n  U1[Mira] --> G[Gruppe: Projekt]\n  U2[Alex] --> G\n  U3[Noah] --> G\n  G --> R[Ordner: Projektdateien]\n  R --> P[Lesen und Schreiben]"
        }
      ],
      ihkFocus: {
        appears: [
          "Lesen, Schreiben, Ausführen und Vollzugriff unterscheiden.",
          "Berechtigungen für Benutzer und Gruppen erklären.",
          "Prinzip der minimalen Rechte anwenden.",
          "Zugriff-verweigert-Situationen analysieren.",
          "Gruppenrechte als bessere Verwaltung begründen.",
          "Berechtigungen mit Dateisystem, Benutzern und Sicherheit verbinden."
        ],
        commonMistakes: [
          "Lesen und Schreiben nicht sauber unterscheiden.",
          "Allen Benutzern Vollzugriff geben.",
          "Berechtigungen direkt an viele einzelne Benutzer vergeben.",
          "Zugriff verweigert sofort als Dateifehler interpretieren.",
          "Administratorrechte mit normalen Zugriffsrechten verwechseln."
        ],
        importantDetails: [
          "Berechtigungen steuern Zugriff auf Ressourcen.",
          "Gruppen vereinfachen Rechteverwaltung.",
          "Vollzugriff ist weitreichend und riskant.",
          "Minimale Rechte sind ein Sicherheitsprinzip.",
          "Vererbung kann Rechte aus übergeordneten Ordnern weitergeben.",
          "Fehlende Rechte führen oft zu Zugriff verweigert."
        ],
        confusedConcepts: [
          "Lesen vs Schreiben.",
          "Ausführen vs Öffnen.",
          "Ändern vs Vollzugriff.",
          "Benutzerrechte vs Gruppenrechte.",
          "Authentifizierung vs Autorisierung.",
          "Administratorrechte vs Dateiberechtigungen."
        ],
        vocabulary: [
          "Recht = erlaubte Aktion.",
          "Berechtigung = Zugriffsregel für eine Ressource.",
          "Lesen = Inhalt anzeigen.",
          "Schreiben = Inhalt erstellen oder ändern.",
          "Vollzugriff = sehr weitgehende Rechte."
        ]
      },
      commonMistakes: [
        "Zu sagen: Wer eine Datei lesen kann, kann sie automatisch ändern. Lesen und Schreiben sind unterschiedliche Berechtigungen.",
        "Vollzugriff als Standard zu vergeben. Das widerspricht dem Prinzip der minimalen Rechte.",
        "Gruppen zu ignorieren und Rechte einzeln an viele Benutzer zu vergeben. Das wird schnell unübersichtlich.",
        "Bei Zugriff verweigert sofort die Datei zu löschen oder neu zu erstellen. Zuerst sollten Berechtigungen geprüft werden.",
        "Ausführen mit Lesen gleichzusetzen. Ein Skript kann lesbar sein, aber nicht ausführbar."
      ],
      vocabulary: [
        {
          de: "Recht",
          pt: "direito / privilégio",
          explanation: "Erlaubnis, eine bestimmte Aktion auszuführen.",
          example: "Der Benutzer hat das Recht, die Datei zu lesen."
        },
        {
          de: "Berechtigung",
          pt: "permissão",
          explanation: "Regel, die Zugriff auf eine Ressource erlaubt oder einschränkt.",
          example: "Die Berechtigung erlaubt Schreiben im Projektordner."
        },
        {
          de: "Lesen",
          pt: "ler",
          explanation: "Inhalt anzeigen oder abrufen.",
          example: "Der Benutzer darf die Datei lesen."
        },
        {
          de: "Schreiben",
          pt: "escrever",
          explanation: "Daten erstellen oder ändern.",
          example: "Mit Schreibrechten kann der Benutzer eine Datei speichern."
        },
        {
          de: "Ausführen",
          pt: "executar",
          explanation: "Ein Programm oder Skript starten.",
          example: "Das Skript darf nur von Administratoren ausgeführt werden."
        },
        {
          de: "Ändern",
          pt: "alterar",
          explanation: "Inhalte oder Eigenschaften einer Ressource bearbeiten.",
          example: "Die Gruppe darf Dokumente ändern."
        },
        {
          de: "Vollzugriff",
          pt: "controle total",
          explanation: "Sehr weitgehende Berechtigung mit vielen Zugriffsmöglichkeiten.",
          example: "Vollzugriff sollte nur gezielt vergeben werden."
        },
        {
          de: "Zugriff verweigert",
          pt: "acesso negado",
          explanation: "Meldung, wenn eine Aktion wegen fehlender Rechte nicht erlaubt ist.",
          example: "Beim Speichern erscheint Zugriff verweigert."
        },
        {
          de: "Vererbung",
          pt: "herança",
          explanation: "Weitergabe von Berechtigungen an Unterordner oder Dateien.",
          example: "Der Unterordner erbt die Rechte des Hauptordners."
        },
        {
          de: "Access Control List",
          pt: "lista de controle de acesso",
          explanation: "Liste, die festlegt, wer welche Rechte auf eine Ressource hat.",
          example: "Die ACL enthält Rechte für Benutzer und Gruppen."
        }
      ],
      summary: [
        "Rechte und Berechtigungen legen fest, welche Benutzer oder Gruppen welche Aktionen auf Ressourcen ausführen dürfen.",
        "Wichtige Berechtigungen sind Lesen, Schreiben, Ausführen, Ändern und Vollzugriff. Diese Begriffe müssen sauber unterschieden werden.",
        "In Unternehmen werden Rechte häufig über Gruppen vergeben. Das ist übersichtlicher und leichter zu verwalten als viele Einzelberechtigungen.",
        "Das Prinzip der minimalen Rechte bedeutet: Jede Person, Gruppe und jeder Dienst bekommt nur die Rechte, die wirklich benötigt werden.",
        "Für AP1 musst du Zugriffssituationen analysieren können: Wer ist der Benutzer, in welcher Gruppe ist er, welche Rechte gelten, und warum wird Zugriff erlaubt oder verweigert?"
      ],
      mindMap: {
        title: "Mindmap: Rechte und Berechtigungen",
        code: "mindmap\n  root((Rechte und Berechtigungen))\n    Aktionen\n      Lesen\n      Schreiben\n      Ausführen\n      Ändern\n      Vollzugriff\n    Zuweisung\n      Benutzer\n      Gruppen\n      ACL\n      Vererbung\n    Sicherheit\n      minimale Rechte\n      Zugriff verweigert\n      Vollzugriff vermeiden\n    Ressourcen\n      Datei\n      Ordner\n      Programm\n      Systemfunktion\n    AP1 Fokus\n      Situationen analysieren\n      Begriffe unterscheiden\n      Risiken begründen"
      },
      exercises: {
        easy: [
          {
            question: "Was legen Berechtigungen fest?",
            answer: "Sie legen fest, wer welche Aktionen auf eine Ressource ausführen darf.",
            explanation: "Zum Beispiel Lesen, Schreiben oder Ausführen."
          },
          {
            question: "Was bedeutet Lesen?",
            answer: "Inhalt anzeigen oder abrufen.",
            explanation: "Lesen erlaubt normalerweise noch keine Änderung."
          },
          {
            question: "Was bedeutet Schreiben?",
            answer: "Daten erstellen oder ändern.",
            explanation: "Schreibrechte sind stärker als reine Leserechte."
          },
          {
            question: "Was bedeutet Vollzugriff?",
            answer: "Sehr weitgehende Rechte auf eine Ressource.",
            explanation: "Vollzugriff kann Lesen, Schreiben, Ändern, Löschen und Rechteverwaltung umfassen."
          },
          {
            question: "Warum sind Gruppen für Berechtigungen nützlich?",
            answer: "Weil Rechte für mehrere Benutzer einfacher verwaltet werden können.",
            explanation: "Man vergibt Rechte an die Gruppe und verwaltet Mitgliedschaften."
          }
        ],
        intermediate: [
          {
            question: "Warum sollte Vollzugriff nicht standardmäßig vergeben werden?",
            answer: "Weil dadurch das Risiko von Fehlern, Missbrauch und Datenverlust steigt.",
            explanation: "Das Prinzip der minimalen Rechte verlangt nur notwendige Rechte."
          },
          {
            question: "Was bedeutet Zugriff verweigert?",
            answer: "Die gewünschte Aktion ist wegen fehlender Berechtigung nicht erlaubt.",
            explanation: "Das ist nicht automatisch ein Hinweis auf eine defekte Datei."
          },
          {
            question: "Warum sind Gruppenrechte oft besser als Einzelrechte?",
            answer: "Sie sind übersichtlicher, leichter zu pflegen und besser für Teams geeignet.",
            explanation: "Neue Benutzer erhalten Rechte durch Gruppenzugehörigkeit."
          },
          {
            question: "Was ist Vererbung bei Berechtigungen?",
            answer: "Berechtigungen werden von einem übergeordneten Ordner an Unterordner oder Dateien weitergegeben.",
            explanation: "Das spart Arbeit, kann aber auch unerwartete Rechte erklären."
          },
          {
            question: "Was ist der Unterschied zwischen Ausführen und Lesen?",
            answer: "Lesen erlaubt das Anzeigen des Inhalts. Ausführen erlaubt das Starten eines Programms oder Skripts.",
            explanation: "Eine Datei kann lesbar sein, ohne ausführbar zu sein."
          }
        ],
        ap1Style: [
          {
            question: "Ein Benutzer kann eine Datei öffnen, aber Änderungen nicht speichern. Welche Berechtigung fehlt wahrscheinlich?",
            answer: "Schreibberechtigung.",
            explanation: "Lesen reicht zum Anzeigen, aber nicht zum Speichern von Änderungen."
          },
          {
            question: "Ein Unternehmen vergibt Vollzugriff auf alle Projektordner an alle Mitarbeiter. Beurteilen Sie diese Maßnahme.",
            answer: "Die Maßnahme ist aus Sicherheitssicht schlecht.",
            explanation: "Sie widerspricht dem Prinzip der minimalen Rechte und erhöht das Risiko von Datenverlust oder Missbrauch."
          },
          {
            question: "Ein neues Team mit fünf Personen braucht Schreibrechte auf einen Ordner. Warum ist eine Gruppe sinnvoll?",
            answer: "Die Rechte können einmal an die Gruppe vergeben werden, und die fünf Personen werden der Gruppe hinzugefügt.",
            explanation: "Das ist übersichtlicher und einfacher zu pflegen als fünf Einzelberechtigungen."
          },
          {
            question: "Ordnen Sie zu: Lesen, Schreiben, Ausführen. Was bedeutet Inhalt anzeigen, Daten ändern, Programm starten?",
            answer: "Lesen = Inhalt anzeigen. Schreiben = Daten ändern. Ausführen = Programm starten.",
            explanation: "Diese Grundberechtigungen werden in AP1 häufig geprüft."
          },
          {
            question: "Ein Unterordner hat unerwartet dieselben Rechte wie der Hauptordner. Nennen Sie eine mögliche Ursache.",
            answer: "Berechtigungsvererbung.",
            explanation: "Unterordner können Rechte vom übergeordneten Ordner erben."
          }
        ]
      },
      related: {
        previous: "Benutzer und Gruppen",
        next: "Netzwerke Grundlagen"
      },
      revisionChecklist: [
        "Ich kann erklären, was Rechte und Berechtigungen sind.",
        "Ich kann Lesen, Schreiben, Ausführen, Ändern und Vollzugriff unterscheiden.",
        "Ich verstehe, warum Gruppenrechte praktisch sind.",
        "Ich kann das Prinzip der minimalen Rechte anwenden.",
        "Ich kann Zugriff-verweigert-Situationen analysieren.",
        "Ich verstehe Vererbung und ACL auf AP1-Grundniveau.",
        "Ich kann AP1-Fragen zu Berechtigungen beantworten."
      ]
    }
  },
  {
    id: "netzwerke-grundlagen",
    title: "Netzwerke Grundlagen",
    description: "Netzwerke verbinden Geräte, damit sie Daten austauschen, Dienste nutzen und gemeinsam auf Ressourcen zugreifen können.",
    text: [
      "Ein Netzwerk verbindet mehrere Geräte miteinander. Dadurch können Computer, Server, Drucker, Smartphones und andere Systeme Daten austauschen.",
      "Für die AP1 musst du verstehen, warum Netzwerke existieren, welche Grundbegriffe wichtig sind und wie Geräte in einem einfachen Netzwerk zusammenarbeiten."
    ],
    ihk: "Wichtig für AP1: Netzwerk = Verbindung von Geräten zum Datenaustausch. Zentrale Begriffe sind Client, Server, Host, Netzwerkgerät, IP-Adresse, Protokoll, Dienst und Ressource.",
    summary: "Rede é a conexão entre dispositivos para trocar dados e usar recursos compartilhados, como servidores, impressoras, internet e serviços.",
    example: "In einem Büro greifen mehrere PCs über das Netzwerk auf einen Datei-Server, einen Drucker und das Internet zu.",
    exercises: [
      {
        question: "Was ist ein Netzwerk?",
        answer: "Ein Netzwerk verbindet Geräte, damit sie Daten austauschen können."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Easy",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Easy",
      importance: {
        stars: "★★★★★",
        explanation: [
          "Netzwerkgrundlagen sind für AP1 sehr wichtig, weil viele spätere Themen darauf aufbauen: LAN, WAN, WLAN, Switch, Router, IP-Adressen, DNS, DHCP, Ports, TCP, UDP und Sicherheit.",
          "Die IHK prüft oft praktische Situationen: Geräte erreichen einen Server nicht, ein Client bekommt keine IP-Adresse, DNS funktioniert nicht oder ein Dienst ist nicht erreichbar.",
          "Português de apoio: redes são a base da comunicação em TI. Antes de entender DNS, DHCP ou TCP, você precisa saber o que dispositivos trocam e por que protocolos existem."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a Netzwerk is.",
        "After this chapter the student will be able to describe why companies use networks.",
        "After this chapter the student will be able to distinguish Client, Server, Host and Dienst.",
        "After this chapter the student will be able to explain the role of protocols in simple words.",
        "After this chapter the student will be able to identify common network components.",
        "After this chapter the student will be able to solve AP1-style questions about basic network communication."
      ],
      introduction: [
        "Ein einzelner Computer kann lokal arbeiten. Aber in Unternehmen müssen Geräte miteinander sprechen: PCs brauchen Dateien vom Server, Benutzer drucken im Netzwerk, Programme greifen auf Datenbanken zu, und fast alle Systeme nutzen das Internet.",
        "Diese Kommunikation passiert über Netzwerke.",
        "Ein Netzwerk ist nicht nur ein Kabel oder WLAN. Es ist ein Zusammenspiel aus Geräten, Adressen, Regeln, Diensten und Übertragungswegen.",
        "Dieses Kapitel ist der Einstieg in das Netzwerkmodul. Es schafft die Grundlage, damit LAN, WAN, WLAN, Switch, Router, DNS, DHCP und TCP später verständlich werden."
      ],
      explanation: [
        {
          title: "Was ist ein Netzwerk?",
          paragraphs: [
            "Ein Netzwerk ist eine Verbindung mehrerer Geräte, damit sie Daten austauschen können.",
            "Diese Geräte können Computer, Server, Drucker, Smartphones, Router, Switches oder andere IT-Systeme sein.",
            "Das Ziel ist Kommunikation: Daten senden, Daten empfangen, Dienste nutzen und Ressourcen teilen."
          ]
        },
        {
          title: "Warum gibt es Netzwerke?",
          paragraphs: [
            "Ohne Netzwerk müsste jeder Computer alles lokal speichern und jedes Gerät einzeln angeschlossen werden.",
            "Netzwerke ermöglichen gemeinsame Nutzung von Ressourcen. Dazu gehören Dateien, Drucker, Internetzugang, Datenbanken und Anwendungen.",
            "In Unternehmen sind Netzwerke notwendig, damit Teams zusammenarbeiten und zentrale Dienste nutzen können."
          ]
        },
        {
          title: "Client und Server",
          paragraphs: [
            "Ein Client ist ein Gerät oder Programm, das einen Dienst nutzt oder eine Anfrage stellt.",
            "Ein Server stellt einen Dienst bereit. Das kann ein Datei-Server, Webserver, DNS-Server oder Datenbankserver sein.",
            "Beispiel: Ein Browser ist ein Client. Eine Webseite wird von einem Webserver bereitgestellt."
          ]
        },
        {
          title: "Host",
          paragraphs: [
            "Ein Host ist ein Gerät in einem Netzwerk, das kommunizieren kann.",
            "Ein PC, Server, Drucker oder Smartphone kann ein Host sein.",
            "Für AP1 ist wichtig: Host ist ein allgemeiner Begriff für ein Netzwerkgerät mit Kommunikationsfähigkeit."
          ]
        },
        {
          title: "Ressourcen und Dienste",
          paragraphs: [
            "Eine Ressource ist etwas, das im Netzwerk genutzt werden kann, zum Beispiel ein Drucker oder ein freigegebener Ordner.",
            "Ein Dienst ist eine Funktion, die über das Netzwerk bereitgestellt wird, zum Beispiel Web, DNS, DHCP oder Dateiablage.",
            "Clients nutzen Dienste. Server stellen Dienste bereit."
          ]
        },
        {
          title: "Warum braucht man Protokolle?",
          paragraphs: [
            "Ein Protokoll ist eine Regel oder ein Satz von Regeln für Kommunikation.",
            "Geräte müssen dieselben Regeln verwenden, damit sie sich verstehen.",
            "Beispiele sind HTTP für Webseiten, DNS für Namensauflösung, DHCP für automatische IP-Konfiguration, TCP und UDP für Transport."
          ]
        },
        {
          title: "Adressen im Netzwerk",
          paragraphs: [
            "Damit Daten zum richtigen Ziel kommen, brauchen Geräte Adressen.",
            "In IP-Netzwerken ist die IP-Adresse besonders wichtig. Sie identifiziert ein Gerät logisch im Netzwerk.",
            "Später lernst du IP-Adressen genauer. Für dieses Kapitel reicht: Ohne Adresse kann Kommunikation nicht sinnvoll zugestellt werden."
          ]
        },
        {
          title: "Netzwerkgeräte",
          paragraphs: [
            "Netzwerkgeräte verbinden und steuern Kommunikation.",
            "Ein Switch verbindet Geräte in einem lokalen Netzwerk. Ein Router verbindet unterschiedliche Netzwerke miteinander.",
            "Ein Access Point ermöglicht WLAN-Zugriff. Eine Firewall kontrolliert Netzwerkverkehr nach Regeln."
          ]
        },
        {
          title: "Datenübertragung vereinfacht",
          paragraphs: [
            "Wenn ein Client Daten an einen Server sendet, werden diese Daten in kleinere Einheiten zerlegt, übertragen und beim Ziel verarbeitet.",
            "Dabei arbeiten mehrere technische Ebenen zusammen: Anwendung, Adressierung, Transport, Netzwerkgeräte und physische Übertragung.",
            "Für AP1 musst du nicht jedes Detail sofort kennen. Wichtig ist das Grundbild: Geräte senden Daten nach Regeln über ein Netzwerk."
          ]
        },
        {
          title: "Typische Netzwerkprobleme",
          paragraphs: [
            "Netzwerkprobleme können viele Ursachen haben: kein Kabel, schlechtes WLAN, falsche IP-Adresse, defekter Switch, falscher DNS-Eintrag oder blockierte Firewall.",
            "Gute Fehlersuche beginnt mit einfachen Fragen: Ist das Gerät verbunden? Hat es eine IP-Adresse? Ist das Ziel erreichbar? Funktioniert der Name oder nur die Adresse?",
            "Diese Denkweise ist für AP1 sehr nützlich."
          ]
        }
      ],
      realWorldExamples: [
        "Ein Büro-PC greift auf einen Datei-Server zu, um Projektdateien zu öffnen.",
        "Ein Mitarbeiter druckt über einen Netzwerkdrucker im Flur.",
        "Ein Webbrowser ruft eine interne Firmenwebseite von einem Webserver ab.",
        "Ein Notebook bekommt über DHCP automatisch eine IP-Adresse.",
        "Ein Router verbindet das lokale Firmennetz mit dem Internet.",
        "Eine Firewall blockiert unerlaubten Zugriff von außen."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Client nutzt Serverdienst",
          paragraphs: [
            "Ein Benutzer öffnet im Browser eine interne Webseite. Sein PC ist der Client, der Webserver stellt die Seite bereit.",
            "Damit das funktioniert, müssen Netzwerkverbindung, Adresse, Protokoll und Dienst zusammenpassen."
          ],
          steps: [
            "Benutzer gibt Adresse im Browser ein.",
            "Client sucht das Ziel im Netzwerk.",
            "Verbindung zum Server wird aufgebaut.",
            "Client fragt die Webseite an.",
            "Server sendet Antwortdaten.",
            "Browser zeigt die Webseite an."
          ]
        },
        {
          title: "Szenario 2: Netzwerkdrucker nicht erreichbar",
          paragraphs: [
            "Ein Benutzer kann nicht drucken. Das bedeutet nicht automatisch, dass der Drucker defekt ist.",
            "Die Ursache kann Netzwerkverbindung, IP-Adresse, Druckdienst, Berechtigung oder Warteschlange sein."
          ],
          steps: [
            "Prüfen, ob der PC Netzwerkzugang hat.",
            "Prüfen, ob der Drucker eingeschaltet und verbunden ist.",
            "Prüfen, ob die IP-Adresse erreichbar ist.",
            "Prüfen, ob der Druckdienst verfügbar ist.",
            "Prüfen, ob der Benutzer den Drucker verwenden darf.",
            "Fehler Schritt für Schritt eingrenzen."
          ]
        }
      ],
      diagrams: [
        {
          title: "Einfaches Unternehmensnetzwerk",
          code: "flowchart TD\n  PC1[Client PC] --> SW[Switch]\n  PC2[Notebook] --> SW\n  PR[Drucker] --> SW\n  SW --> SRV[Server]\n  SW --> R[Router]\n  R --> INET[Internet]\n  R --> FW[Firewall]"
        },
        {
          title: "Client nutzt einen Serverdienst",
          code: "sequenceDiagram\n  participant C as Client\n  participant N as Netzwerk\n  participant S as Server\n  C->>N: Anfrage senden\n  N->>S: Anfrage weiterleiten\n  S->>N: Antwort senden\n  N->>C: Antwort zustellen"
        }
      ],
      ihkFocus: {
        appears: [
          "Grundbegriff Netzwerk erklären.",
          "Client und Server unterscheiden.",
          "Host, Dienst und Ressource einordnen.",
          "Warum Protokolle notwendig sind.",
          "Grundrollen von Switch, Router, Access Point und Firewall nennen.",
          "Einfache Netzwerkprobleme logisch eingrenzen."
        ],
        commonMistakes: [
          "Netzwerk nur als Internet verstehen.",
          "Client und Server verwechseln.",
          "Router und Switch gleichsetzen.",
          "DNS, DHCP und IP-Adresse ohne Grundverständnis durcheinanderwerfen.",
          "Bei Netzwerkproblemen sofort ein Gerät austauschen statt systematisch zu prüfen."
        ],
        importantDetails: [
          "Netzwerke verbinden Geräte zum Datenaustausch.",
          "Clients nutzen Dienste, Server stellen Dienste bereit.",
          "Protokolle sind Kommunikationsregeln.",
          "Adressen ermöglichen Zustellung.",
          "Switches verbinden lokale Geräte.",
          "Router verbinden Netzwerke.",
          "Firewalls kontrollieren Verkehr nach Regeln."
        ],
        confusedConcepts: [
          "Netzwerk vs Internet.",
          "Client vs Server.",
          "Host vs Benutzer.",
          "Dienst vs Gerät.",
          "Switch vs Router.",
          "Adresse vs Name."
        ],
        vocabulary: [
          "Netzwerk = Verbindung mehrerer Geräte.",
          "Client = nutzt einen Dienst.",
          "Server = stellt einen Dienst bereit.",
          "Host = kommunikationsfähiges Gerät.",
          "Protokoll = Kommunikationsregel."
        ]
      },
      commonMistakes: [
        "Zu sagen: Netzwerk bedeutet immer Internet. Ein Netzwerk kann auch ein kleines lokales Firmennetz ohne direkten Internetzugang sein.",
        "Client und Server als feste Gerätetypen zu verstehen. Die Rolle hängt vom Dienst ab: Wer anfragt, ist Client; wer bereitstellt, ist Server.",
        "Switch und Router gleichzusetzen. Ein Switch verbindet Geräte im lokalen Netzwerk; ein Router verbindet unterschiedliche Netzwerke.",
        "Protokolle als Programme zu beschreiben. Protokolle sind Regeln für Kommunikation.",
        "Bei Problemen nur einen Teil zu prüfen. Netzwerkkommunikation hängt von Verbindung, Adresse, Dienst, Protokoll und Berechtigungen ab."
      ],
      vocabulary: [
        {
          de: "Netzwerk",
          pt: "rede",
          explanation: "Verbindung mehrerer Geräte zum Datenaustausch.",
          example: "Das Firmennetzwerk verbindet PCs, Server und Drucker."
        },
        {
          de: "Client",
          pt: "cliente",
          explanation: "Gerät oder Programm, das einen Dienst nutzt oder eine Anfrage stellt.",
          example: "Der Browser ist ein Client für Webseiten."
        },
        {
          de: "Server",
          pt: "servidor",
          explanation: "System oder Programm, das einen Dienst bereitstellt.",
          example: "Der Webserver liefert die Webseite aus."
        },
        {
          de: "Host",
          pt: "host / dispositivo na rede",
          explanation: "Gerät, das in einem Netzwerk kommunizieren kann.",
          example: "Ein Notebook kann ein Host im Netzwerk sein."
        },
        {
          de: "Dienst",
          pt: "serviço",
          explanation: "Funktion, die über ein System oder Netzwerk bereitgestellt wird.",
          example: "DNS ist ein wichtiger Netzwerkdienst."
        },
        {
          de: "Ressource",
          pt: "recurso",
          explanation: "Etwas, das im Netzwerk genutzt werden kann.",
          example: "Ein Netzwerkdrucker ist eine Ressource."
        },
        {
          de: "Protokoll",
          pt: "protocolo",
          explanation: "Regelwerk für Kommunikation zwischen Systemen.",
          example: "HTTP ist ein Protokoll für Webseiten."
        },
        {
          de: "IP-Adresse",
          pt: "endereço IP",
          explanation: "Logische Adresse eines Geräts in einem IP-Netzwerk.",
          example: "Der Server hat eine IP-Adresse."
        },
        {
          de: "Switch",
          pt: "switch",
          explanation: "Netzwerkgerät, das Geräte in einem lokalen Netzwerk verbindet.",
          example: "Mehrere Büro-PCs sind mit einem Switch verbunden."
        },
        {
          de: "Router",
          pt: "roteador",
          explanation: "Netzwerkgerät, das unterschiedliche Netzwerke verbindet.",
          example: "Der Router verbindet das LAN mit dem Internet."
        }
      ],
      summary: [
        "Ein Netzwerk verbindet Geräte, damit sie Daten austauschen und gemeinsame Ressourcen nutzen können.",
        "Wichtige Grundbegriffe sind Client, Server, Host, Dienst, Ressource, Protokoll und IP-Adresse.",
        "Clients nutzen Dienste. Server stellen Dienste bereit. Ein Host ist ein Gerät, das im Netzwerk kommunizieren kann.",
        "Protokolle sind Regeln für Kommunikation. Ohne gemeinsame Regeln könnten Geräte Daten nicht sinnvoll austauschen.",
        "Switches verbinden Geräte in lokalen Netzwerken, Router verbinden unterschiedliche Netzwerke, Access Points ermöglichen WLAN, und Firewalls kontrollieren Verkehr nach Regeln.",
        "Für AP1 ist wichtig, Netzwerkprobleme logisch zu betrachten: Verbindung, Adresse, Name, Dienst, Protokoll und Berechtigung."
      ],
      mindMap: {
        title: "Mindmap: Netzwerke Grundlagen",
        code: "mindmap\n  root((Netzwerke Grundlagen))\n    Zweck\n      Daten austauschen\n      Ressourcen teilen\n      Dienste nutzen\n    Rollen\n      Client\n      Server\n      Host\n    Begriffe\n      Dienst\n      Ressource\n      Protokoll\n      IP-Adresse\n    Geräte\n      Switch\n      Router\n      Access Point\n      Firewall\n    AP1 Fokus\n      Begriffe unterscheiden\n      Probleme eingrenzen\n      Kommunikation erklären"
      },
      exercises: {
        easy: [
          {
            question: "Was ist ein Netzwerk?",
            answer: "Ein Netzwerk verbindet mehrere Geräte, damit sie Daten austauschen können.",
            explanation: "Zum Beispiel PCs, Server, Drucker und Smartphones."
          },
          {
            question: "Was ist ein Client?",
            answer: "Ein Client nutzt einen Dienst oder stellt eine Anfrage.",
            explanation: "Ein Browser ist zum Beispiel ein Client für Webseiten."
          },
          {
            question: "Was ist ein Server?",
            answer: "Ein Server stellt einen Dienst bereit.",
            explanation: "Ein Webserver stellt Webseiten bereit."
          },
          {
            question: "Was ist ein Protokoll?",
            answer: "Ein Protokoll ist ein Regelwerk für Kommunikation.",
            explanation: "Geräte brauchen gemeinsame Regeln, damit sie sich verstehen."
          },
          {
            question: "Was macht ein Router auf Grundniveau?",
            answer: "Er verbindet unterschiedliche Netzwerke.",
            explanation: "Zum Beispiel ein lokales Netzwerk mit dem Internet."
          }
        ],
        intermediate: [
          {
            question: "Warum nutzen Unternehmen Netzwerke?",
            answer: "Damit Geräte Daten austauschen, Ressourcen teilen und zentrale Dienste nutzen können.",
            explanation: "Das ermöglicht Zusammenarbeit, zentrale Verwaltung und gemeinsamen Zugriff."
          },
          {
            question: "Erkläre den Unterschied zwischen Netzwerk und Internet.",
            answer: "Ein Netzwerk ist allgemein eine Verbindung von Geräten. Das Internet ist ein weltweites Netz vieler Netzwerke.",
            explanation: "Nicht jedes Netzwerk ist automatisch das Internet."
          },
          {
            question: "Warum sind Protokolle notwendig?",
            answer: "Sie legen Regeln fest, damit Geräte Daten korrekt austauschen können.",
            explanation: "Ohne gemeinsame Regeln würden Sender und Empfänger einander nicht verstehen."
          },
          {
            question: "Was ist der Unterschied zwischen Dienst und Gerät?",
            answer: "Ein Gerät ist Hardware oder ein System. Ein Dienst ist eine bereitgestellte Funktion.",
            explanation: "Ein Servergerät kann mehrere Dienste bereitstellen."
          },
          {
            question: "Warum ist systematische Fehlersuche im Netzwerk wichtig?",
            answer: "Weil Netzwerkprobleme viele Ursachen haben können.",
            explanation: "Man prüft Verbindung, Adresse, Dienst, Protokoll und Berechtigungen Schritt für Schritt."
          }
        ],
        ap1Style: [
          {
            question: "Ein PC kann eine interne Webseite nicht öffnen. Nennen Sie drei mögliche Ursachen auf Netzwerk-Grundniveau.",
            answer: "Mögliche Ursachen sind fehlende Netzwerkverbindung, falsche Adresse, DNS-Problem, Serverdienst nicht erreichbar oder Firewall blockiert.",
            explanation: "Bei Netzwerkproblemen sollte man mehrere Ebenen prüfen, nicht nur den Client."
          },
          {
            question: "Ein Azubi sagt: 'Ein Netzwerk ist einfach das Internet.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch oder zu ungenau.",
            explanation: "Das Internet ist ein großes Netzwerk aus vielen Netzwerken. Ein lokales Firmennetz ist ebenfalls ein Netzwerk."
          },
          {
            question: "Ordnen Sie zu: Client, Server, Protokoll. Was stellt eine Anfrage, was stellt einen Dienst bereit, was definiert Kommunikationsregeln?",
            answer: "Client stellt Anfrage. Server stellt Dienst bereit. Protokoll definiert Kommunikationsregeln.",
            explanation: "Diese Zuordnung ist Grundlage für viele AP1-Netzwerkfragen."
          },
          {
            question: "Ein Unternehmen möchte mehrere PCs, einen Drucker und einen Server im selben Büro verbinden. Welches Netzwerkgerät ist dafür typisch?",
            answer: "Ein Switch.",
            explanation: "Ein Switch verbindet Geräte innerhalb eines lokalen Netzwerks."
          },
          {
            question: "Warum ist eine IP-Adresse für Netzwerkkommunikation wichtig?",
            answer: "Sie hilft, ein Gerät logisch im Netzwerk zu adressieren.",
            explanation: "Daten müssen an ein Ziel zugestellt werden können."
          }
        ]
      },
      related: {
        previous: "Rechte und Berechtigungen",
        next: "LAN"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein Netzwerk ist.",
        "Ich kann Client, Server und Host unterscheiden.",
        "Ich verstehe Dienst, Ressource und Protokoll.",
        "Ich kann erklären, warum Adressen wichtig sind.",
        "Ich kenne die Grundrollen von Switch, Router, Access Point und Firewall.",
        "Ich kann einfache Netzwerkprobleme logisch eingrenzen.",
        "Ich kann AP1-Fragen zu Netzwerkgrundlagen beantworten."
      ]
    }
  },
  {
    id: "lan",
    title: "LAN",
    description: "Ein LAN ist ein lokales Netzwerk in einem begrenzten Bereich, zum Beispiel in einem Büro, Raum, Gebäude oder Firmengelände.",
    text: [
      "LAN bedeutet Local Area Network. Es verbindet Geräte in einem räumlich begrenzten Bereich.",
      "Für die AP1 musst du LAN als lokales Netzwerk verstehen und es von WAN und WLAN unterscheiden können."
    ],
    ihk: "Wichtig für AP1: LAN = lokales Netzwerk. Typisch sind PCs, Server, Drucker und Switches innerhalb eines Gebäudes oder Unternehmensbereichs.",
    summary: "LAN é uma rede local em uma área limitada, como uma sala, escritório ou prédio. Normalmente usa switches e cabos Ethernet, mas pode trabalhar junto com WLAN.",
    example: "Mehrere Büro-PCs, ein Server und ein Netzwerkdrucker sind über einen Switch verbunden. Das ist ein typisches LAN.",
    exercises: [
      {
        question: "Wofür steht LAN?",
        answer: "LAN steht für Local Area Network."
      }
    ],
    studyTime: "80-100 Minuten",
    difficulty: "Easy",
    fullContent: {
      studyTime: "80-100 Minuten",
      difficulty: "Easy",
      importance: {
        stars: "★★★★★",
        explanation: [
          "LAN ist für AP1 sehr wichtig, weil viele Netzwerkaufgaben mit lokalen Netzen beginnen. Switch, Router, IP-Adressen, DHCP, DNS und Firewall werden oft in LAN-Szenarien geprüft.",
          "Die IHK erwartet, dass du LAN von WAN und WLAN unterscheiden kannst und einfache LAN-Situationen in Unternehmen verstehst.",
          "Português de apoio: LAN é a rede local. Pense nos dispositivos dentro de um escritório conectados entre si para acessar servidor, impressora e internet."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a LAN is.",
        "After this chapter the student will be able to describe where LANs are used.",
        "After this chapter the student will be able to identify typical LAN components.",
        "After this chapter the student will be able to distinguish LAN, WAN and WLAN.",
        "After this chapter the student will be able to explain why switches are central in many LANs.",
        "After this chapter the student will be able to solve AP1-style questions about local networks."
      ],
      introduction: [
        "Nach den Netzwerkgrundlagen schauen wir uns jetzt den häufigsten Netzwerktyp in Unternehmen an: das LAN.",
        "Ein LAN verbindet Geräte in einem begrenzten Bereich. Das kann ein Raum, ein Büro, eine Etage, ein Gebäude oder ein Firmengelände sein.",
        "In einem LAN können Benutzer auf Server, Drucker, Dateiablagen, interne Webseiten und andere Ressourcen zugreifen.",
        "Für AP1 ist LAN ein Basisbegriff. Viele spätere Themen wie Switch, IP-Adresse, DHCP und DNS werden in einem LAN besonders anschaulich."
      ],
      explanation: [
        {
          title: "Was ist ein LAN?",
          paragraphs: [
            "LAN steht für Local Area Network. Auf Deutsch sagt man lokales Netzwerk.",
            "Ein LAN verbindet Geräte in einem räumlich begrenzten Bereich.",
            "Typische Geräte in einem LAN sind PCs, Notebooks, Server, Drucker, Switches, Access Points und manchmal Router."
          ]
        },
        {
          title: "Warum nutzen Unternehmen LANs?",
          paragraphs: [
            "Ein LAN ermöglicht gemeinsame Nutzung von Ressourcen. Mitarbeiter können auf Serverdateien, Drucker und interne Anwendungen zugreifen.",
            "Ein LAN erlaubt auch zentrale Verwaltung, zum Beispiel Benutzerverwaltung, Softwareverteilung und Backup.",
            "Ohne LAN müssten viele Daten lokal kopiert oder Geräte einzeln angeschlossen werden."
          ]
        },
        {
          title: "Räumliche Begrenzung",
          paragraphs: [
            "Das Wort local bedeutet: Das Netzwerk ist auf einen begrenzten Bereich beschränkt.",
            "Ein LAN kann in einem Raum, einer Wohnung, einem Büro oder einem Gebäude liegen.",
            "Wenn Netzwerke über große geografische Entfernungen verbunden werden, spricht man eher von WAN."
          ]
        },
        {
          title: "Ethernet und Kabel",
          paragraphs: [
            "Viele LANs nutzen Ethernet. Ethernet ist eine sehr verbreitete Technik für kabelgebundene lokale Netzwerke.",
            "Typisch sind Netzwerkkabel mit RJ45-Steckern, die Geräte mit einem Switch verbinden.",
            "Kabelgebundene LAN-Verbindungen sind oft stabil, schnell und weniger störanfällig als Funkverbindungen."
          ]
        },
        {
          title: "Switch im LAN",
          paragraphs: [
            "Ein Switch ist ein zentrales Gerät in vielen LANs. Er verbindet mehrere Geräte im lokalen Netzwerk.",
            "PCs, Server und Drucker werden häufig mit dem Switch verbunden.",
            "Der Switch leitet Daten innerhalb des lokalen Netzwerks an das passende Ziel weiter. Das Thema Switch wird später noch genauer behandelt."
          ]
        },
        {
          title: "Router im LAN",
          paragraphs: [
            "Ein Router verbindet das LAN mit anderen Netzwerken, zum Beispiel mit dem Internet oder einer anderen Filiale.",
            "Der Router ist nicht dasselbe wie der Switch. Ein Switch verbindet Geräte im LAN; ein Router verbindet Netzwerke.",
            "In kleinen Umgebungen kann ein Gerät mehrere Rollen haben, zum Beispiel Router, Switch und WLAN-Access-Point in einem Heimrouter."
          ]
        },
        {
          title: "LAN und WLAN",
          paragraphs: [
            "LAN meint allgemein das lokale Netzwerk. WLAN ist ein drahtloses lokales Netzwerk über Funk.",
            "Ein kabelgebundenes LAN nutzt oft Ethernet-Kabel. Ein WLAN nutzt Funk über Access Points.",
            "In Unternehmen arbeiten LAN und WLAN oft zusammen: Access Points sind per Kabel mit dem LAN verbunden und stellen drahtlosen Zugang bereit."
          ]
        },
        {
          title: "LAN und WAN",
          paragraphs: [
            "Ein LAN ist lokal begrenzt. Ein WAN verbindet Netzwerke über größere Entfernungen.",
            "Beispiel: Das Netzwerk in einer Filiale ist ein LAN. Die Verbindung zwischen zwei Filialen ist Teil eines WAN.",
            "Für AP1 ist diese Unterscheidung besonders wichtig."
          ]
        },
        {
          title: "IP-Adressen im LAN",
          paragraphs: [
            "Geräte im LAN brauchen meist IP-Adressen, damit sie logisch erreichbar sind.",
            "Diese Adressen können manuell gesetzt oder automatisch durch DHCP vergeben werden.",
            "Für dieses Kapitel reicht: Im LAN müssen Geräte eine passende Netzwerkadresse haben, um miteinander kommunizieren zu können."
          ]
        },
        {
          title: "Typische LAN-Probleme",
          paragraphs: [
            "Typische LAN-Probleme sind: Kabel nicht verbunden, Switch-Port defekt, falsche IP-Adresse, DHCP-Problem, DNS-Problem oder falsche Netzwerkeinstellung.",
            "Bei der Fehlersuche prüft man zuerst einfache Dinge: Link-LED, Kabel, Netzwerkadapter, IP-Adresse und Erreichbarkeit anderer Geräte.",
            "AP1-Aufgaben beschreiben oft solche Alltagssituationen."
          ]
        }
      ],
      realWorldExamples: [
        "In einem Büro sind PCs, Drucker und ein Datei-Server über einen Switch verbunden.",
        "Ein Azubi verbindet einen neuen Arbeitsplatz-PC per Ethernet-Kabel mit einer Netzwerkdose.",
        "Ein Unternehmen nutzt ein LAN für interne Anwendungen und verbindet es über einen Router mit dem Internet.",
        "Ein Access Point hängt per Kabel am LAN und bietet WLAN für Notebooks an.",
        "Ein Server im LAN stellt eine interne Webseite bereit, die nur Mitarbeiter erreichen können."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Neuer Arbeitsplatz im LAN",
          paragraphs: [
            "Ein neuer Mitarbeiter bekommt einen PC. Der PC soll auf Server, Drucker und Internet zugreifen.",
            "Dafür muss der PC mit dem LAN verbunden und korrekt adressiert sein."
          ],
          steps: [
            "PC mit Netzwerkdose oder Switch verbinden.",
            "Prüfen, ob die Link-LED leuchtet.",
            "IP-Adresse prüfen oder per DHCP beziehen.",
            "Verbindung zum Gateway testen.",
            "Zugriff auf Server oder Drucker testen.",
            "Dokumentieren, an welchem Anschluss der PC verbunden ist."
          ]
        },
        {
          title: "Szenario 2: Kein Zugriff auf Server",
          paragraphs: [
            "Ein Benutzer meldet, dass er den Datei-Server nicht erreicht.",
            "Die Ursache kann lokal am PC, am Kabel, am Switch, an der IP-Konfiguration oder am Server liegen."
          ],
          steps: [
            "Prüfen, ob andere Benutzer den Server erreichen.",
            "Prüfen, ob der PC Netzwerkverbindung hat.",
            "IP-Adresse und Gateway prüfen.",
            "Server per IP-Adresse testen.",
            "Namenauflösung prüfen, wenn IP funktioniert, Name aber nicht.",
            "Fehler schrittweise eingrenzen."
          ]
        }
      ],
      diagrams: [
        {
          title: "Typisches LAN im Büro",
          code: "flowchart TD\n  PC1[PC Arbeitsplatz 1] --> SW[Switch]\n  PC2[PC Arbeitsplatz 2] --> SW\n  NB[Notebook Dockingstation] --> SW\n  PR[Netzwerkdrucker] --> SW\n  SRV[Datei-Server] --> SW\n  AP[Access Point] --> SW\n  SW --> R[Router]\n  R --> INET[Internet]"
        },
        {
          title: "LAN, WLAN und WAN unterscheiden",
          code: "flowchart LR\n  LAN[LAN: lokales kabelgebundenes Netzwerk] --> R[Router]\n  WLAN[WLAN: drahtloser Zugang zum lokalen Netzwerk] --> LAN\n  R --> WAN[WAN: Verbindung zu entfernten Netzwerken]\n  WAN --> FIL[Filiale oder Internet]"
        }
      ],
      ihkFocus: {
        appears: [
          "LAN als lokales Netzwerk definieren.",
          "LAN von WAN und WLAN unterscheiden.",
          "Typische LAN-Komponenten nennen.",
          "Rolle von Switch und Router grob erklären.",
          "Einfache LAN-Fehlerfälle analysieren.",
          "LAN-Szenarien mit Servern, Druckern und Clients verstehen."
        ],
        commonMistakes: [
          "LAN mit WLAN gleichsetzen.",
          "LAN mit Internet verwechseln.",
          "Switch und Router gleich beschreiben.",
          "Räumliche Begrenzung des LAN vergessen.",
          "Bei LAN-Problemen DNS, DHCP oder IP-Konfiguration nicht prüfen."
        ],
        importantDetails: [
          "LAN bedeutet Local Area Network.",
          "Ein LAN ist räumlich begrenzt.",
          "Ethernet ist typisch für kabelgebundene LANs.",
          "Switches verbinden Geräte im LAN.",
          "Router verbinden das LAN mit anderen Netzwerken.",
          "WLAN kann Teil des lokalen Netzwerks sein, nutzt aber Funk."
        ],
        confusedConcepts: [
          "LAN vs WLAN.",
          "LAN vs WAN.",
          "Switch vs Router.",
          "Netzwerkdose vs Switch-Port.",
          "Kabelproblem vs IP-Problem.",
          "Server nicht erreichbar vs Name nicht auflösbar."
        ],
        vocabulary: [
          "LAN = Local Area Network.",
          "Ethernet = verbreitete LAN-Technik.",
          "Switch = verbindet Geräte im LAN.",
          "Router = verbindet Netzwerke.",
          "Netzwerkdose = Anschluss an die Gebäudeverkabelung."
        ]
      },
      commonMistakes: [
        "Zu sagen: LAN ist immer WLAN. WLAN ist drahtlos; LAN beschreibt allgemein ein lokales Netzwerk.",
        "Zu sagen: LAN ist dasselbe wie Internet. Ein LAN kann auch ohne Internet funktionieren.",
        "Switch und Router zu verwechseln. Der Switch arbeitet im lokalen Netzwerk, der Router verbindet verschiedene Netzwerke.",
        "Nur den Server zu prüfen, wenn ein einzelner PC keinen Zugriff hat. Oft liegt das Problem am Client, Kabel, Switch-Port oder der IP-Konfiguration.",
        "LAN nur als Kabel zu verstehen. Das LAN umfasst Geräte, Adressen, Dienste und Netzwerkkomponenten."
      ],
      vocabulary: [
        {
          de: "LAN",
          pt: "rede local",
          explanation: "Lokales Netzwerk in einem begrenzten Bereich.",
          example: "Die PCs im Büro sind Teil eines LANs."
        },
        {
          de: "Local Area Network",
          pt: "rede de área local",
          explanation: "Englische Langform von LAN.",
          example: "LAN bedeutet Local Area Network."
        },
        {
          de: "Ethernet",
          pt: "Ethernet",
          explanation: "Sehr verbreitete Technik für kabelgebundene lokale Netzwerke.",
          example: "Der PC ist per Ethernet mit dem Switch verbunden."
        },
        {
          de: "Netzwerkkabel",
          pt: "cabo de rede",
          explanation: "Kabel zur Verbindung von Netzwerkgeräten.",
          example: "Das Netzwerkkabel steckt in der Netzwerkdose."
        },
        {
          de: "Switch",
          pt: "switch",
          explanation: "Gerät, das mehrere Geräte im LAN verbindet.",
          example: "Der Switch verbindet PCs und Server."
        },
        {
          de: "Router",
          pt: "roteador",
          explanation: "Gerät, das unterschiedliche Netzwerke verbindet.",
          example: "Der Router verbindet das LAN mit dem Internet."
        },
        {
          de: "Netzwerkdose",
          pt: "tomada de rede",
          explanation: "Anschluss an die Gebäudeverkabelung.",
          example: "Der Arbeitsplatz-PC ist an der Netzwerkdose angeschlossen."
        },
        {
          de: "Patchkabel",
          pt: "cabo patch",
          explanation: "Kurzes Netzwerkkabel zum Verbinden von Geräten oder Anschlüssen.",
          example: "Ein Patchkabel verbindet PC und Netzwerkdose."
        },
        {
          de: "lokales Netzwerk",
          pt: "rede local",
          explanation: "Deutsche Beschreibung für ein LAN.",
          example: "Das lokale Netzwerk ist auf das Gebäude begrenzt."
        },
        {
          de: "Link-LED",
          pt: "LED de link",
          explanation: "Anzeige, ob eine physische Netzwerkverbindung besteht.",
          example: "Die Link-LED am Switch-Port leuchtet."
        }
      ],
      summary: [
        "LAN steht für Local Area Network und bedeutet lokales Netzwerk.",
        "Ein LAN verbindet Geräte in einem räumlich begrenzten Bereich, zum Beispiel in einem Büro, Gebäude oder Firmengelände.",
        "Typische LAN-Komponenten sind PCs, Server, Drucker, Switches, Router, Access Points, Netzwerkdosen und Netzwerkkabel.",
        "Ethernet ist eine sehr verbreitete Technik für kabelgebundene LANs. Ein Switch verbindet viele Geräte innerhalb des LANs.",
        "LAN, WAN und WLAN müssen unterschieden werden: LAN ist lokal, WAN verbindet große Entfernungen, WLAN ist drahtlose lokale Kommunikation.",
        "Für AP1 musst du LAN-Szenarien verstehen und einfache Fehler systematisch prüfen können."
      ],
      mindMap: {
        title: "Mindmap: LAN",
        code: "mindmap\n  root((LAN))\n    Bedeutung\n      Local Area Network\n      lokales Netzwerk\n      begrenzter Bereich\n    Komponenten\n      PCs\n      Server\n      Drucker\n      Switch\n      Router\n      Access Point\n    Technik\n      Ethernet\n      Netzwerkkabel\n      Netzwerkdose\n      IP-Adresse\n    Abgrenzung\n      WAN\n      WLAN\n      Internet\n    AP1 Fokus\n      Begriffe unterscheiden\n      Szenarien erklären\n      Fehler eingrenzen"
      },
      exercises: {
        easy: [
          {
            question: "Wofür steht LAN?",
            answer: "LAN steht für Local Area Network.",
            explanation: "Auf Deutsch: lokales Netzwerk."
          },
          {
            question: "Was ist ein LAN?",
            answer: "Ein lokales Netzwerk in einem begrenzten Bereich.",
            explanation: "Zum Beispiel in einem Büro, Raum oder Gebäude."
          },
          {
            question: "Nenne zwei typische Geräte in einem LAN.",
            answer: "PC und Switch.",
            explanation: "Auch Server, Drucker, Router und Access Points sind typisch."
          },
          {
            question: "Was macht ein Switch im LAN?",
            answer: "Er verbindet mehrere Geräte im lokalen Netzwerk.",
            explanation: "Switches sind zentrale Komponenten vieler LANs."
          },
          {
            question: "Ist ein LAN automatisch das Internet?",
            answer: "Nein.",
            explanation: "Ein LAN ist ein lokales Netzwerk und kann auch ohne Internet existieren."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen LAN und WAN.",
            answer: "Ein LAN ist lokal begrenzt. Ein WAN verbindet Netzwerke über größere Entfernungen.",
            explanation: "Eine Filiale hat ein LAN; die Verbindung zwischen Filialen ist WAN."
          },
          {
            question: "Erkläre den Unterschied zwischen LAN und WLAN.",
            answer: "LAN beschreibt das lokale Netzwerk allgemein. WLAN ist drahtlose lokale Kommunikation per Funk.",
            explanation: "WLAN kann Teil eines LANs sein."
          },
          {
            question: "Warum ist Ethernet in LANs häufig?",
            answer: "Es ist verbreitet, stabil, schnell und für kabelgebundene lokale Netzwerke geeignet.",
            explanation: "Viele Büroarbeitsplätze werden per Ethernet angebunden."
          },
          {
            question: "Warum braucht ein LAN oft einen Router?",
            answer: "Um das lokale Netzwerk mit anderen Netzwerken, zum Beispiel dem Internet, zu verbinden.",
            explanation: "Der Router verbindet Netzwerke, nicht nur lokale Geräte."
          },
          {
            question: "Welche einfachen Dinge prüfst du, wenn ein LAN-PC keine Verbindung hat?",
            answer: "Kabel, Link-LED, Netzwerkadapter, IP-Adresse und Switch-Port.",
            explanation: "Fehlersuche beginnt bei einfachen Ursachen."
          }
        ],
        ap1Style: [
          {
            question: "Ein Unternehmen möchte zehn PCs und einen Netzwerkdrucker in einem Büro verbinden. Welches Netzwerk liegt vor und welches Gerät ist zentral?",
            answer: "Es liegt ein LAN vor. Ein Switch ist ein typisches zentrales Gerät.",
            explanation: "Das Netzwerk ist lokal begrenzt und verbindet Geräte im Büro."
          },
          {
            question: "Ein Azubi sagt: 'LAN und WLAN sind genau dasselbe.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "LAN ist das lokale Netzwerk allgemein. WLAN ist die drahtlose Variante beziehungsweise drahtloser Zugang zum lokalen Netzwerk."
          },
          {
            question: "Ein einzelner PC im Büro erreicht den Server nicht, andere PCs aber schon. Nennen Sie zwei wahrscheinliche Ursachen.",
            answer: "Mögliche Ursachen sind defektes Kabel, falsche IP-Konfiguration, deaktivierter Netzwerkadapter oder defekter Switch-Port.",
            explanation: "Wenn andere PCs den Server erreichen, liegt die Ursache wahrscheinlich beim betroffenen Client oder seinem Anschluss."
          },
          {
            question: "Ordnen Sie zu: LAN, WAN, WLAN. Was ist lokal, was verbindet große Entfernungen, was nutzt Funk?",
            answer: "LAN = lokal. WAN = große Entfernungen. WLAN = Funk.",
            explanation: "Diese Abgrenzung ist eine typische AP1-Grundlage."
          },
          {
            question: "Warum ist ein Switch für ein kabelgebundenes LAN wichtiger als ein Access Point?",
            answer: "Der Switch verbindet kabelgebundene Geräte im lokalen Netzwerk.",
            explanation: "Ein Access Point ist für drahtlose Geräte zuständig und hängt oft selbst am LAN."
          }
        ]
      },
      related: {
        previous: "Netzwerke Grundlagen",
        next: "WAN"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein LAN ist.",
        "Ich weiß, wofür LAN steht.",
        "Ich kann typische LAN-Komponenten nennen.",
        "Ich kann LAN, WAN und WLAN unterscheiden.",
        "Ich verstehe die Grundrolle von Switch und Router im LAN.",
        "Ich kann einfache LAN-Probleme systematisch eingrenzen.",
        "Ich kann AP1-Fragen zu LAN beantworten."
      ]
    }
  },
  {
    id: "wan",
    title: "WAN",
    description: "Ein WAN verbindet Netzwerke über größere geografische Entfernungen, zum Beispiel Filialen, Rechenzentren oder Standorte in verschiedenen Städten.",
    text: [
      "WAN bedeutet Wide Area Network. Ein WAN verbindet entfernte Netzwerke miteinander.",
      "Für die AP1 musst du WAN von LAN unterscheiden und verstehen, dass WAN-Verbindungen oft über Provider, Router, VPNs oder das Internet laufen."
    ],
    ihk: "Wichtig für AP1: WAN = Netzwerk über große Entfernungen. Typisch sind Standortvernetzung, Internetzugang, Provider, Router, VPN, Bandbreite und Latenz.",
    summary: "WAN é uma rede de longa distância que conecta redes locais distantes, como filiais, data centers e conexões via internet/provedor.",
    example: "Eine Firma verbindet das LAN der Zentrale mit dem LAN einer Filiale über eine WAN-Verbindung.",
    exercises: [
      {
        question: "Wofür steht WAN?",
        answer: "WAN steht für Wide Area Network."
      }
    ],
    studyTime: "80-100 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "80-100 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★☆",
        explanation: [
          "WAN ist für AP1 wichtig, weil Unternehmen nicht nur ein lokales Netzwerk haben. Filialen, Rechenzentren, Cloud-Dienste und Homeoffice müssen oft über größere Entfernungen verbunden werden.",
          "Die IHK prüft WAN häufig als Abgrenzung zu LAN und WLAN oder in Szenarien mit Standortvernetzung, Internet, VPN, Bandbreite und Latenz.",
          "Português de apoio: LAN é local; WAN liga redes em distâncias maiores. A internet pode ser entendida como o maior exemplo de WAN."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what a WAN is.",
        "After this chapter the student will be able to distinguish WAN from LAN and WLAN.",
        "After this chapter the student will be able to describe typical WAN use cases in companies.",
        "After this chapter the student will be able to explain the roles of provider, router and VPN at basic level.",
        "After this chapter the student will be able to explain bandwidth and latency in WAN scenarios.",
        "After this chapter the student will be able to solve AP1-style questions about WAN connections."
      ],
      introduction: [
        "Im LAN-Kapitel hast du gelernt: Ein LAN verbindet Geräte in einem begrenzten Bereich, zum Beispiel in einem Büro oder Gebäude.",
        "Viele Unternehmen arbeiten aber nicht nur an einem Ort. Es gibt Filialen, Homeoffice, Cloud-Dienste, externe Rechenzentren und mobile Mitarbeiter.",
        "Damit entfernte Standorte miteinander kommunizieren können, braucht man Netzwerke über größere Entfernungen. Genau hier kommt WAN ins Spiel.",
        "WAN ist kein einzelnes Gerät. Es beschreibt eine Netzwerkart: die Verbindung über große geografische Bereiche."
      ],
      explanation: [
        {
          title: "Was ist ein WAN?",
          paragraphs: [
            "WAN steht für Wide Area Network. Auf Deutsch kann man Weitverkehrsnetz sagen.",
            "Ein WAN verbindet Netzwerke oder Standorte über größere Entfernungen.",
            "Beispiele sind die Verbindung zwischen zwei Firmenfilialen, ein Zugang zum Rechenzentrum oder die Nutzung des Internets."
          ]
        },
        {
          title: "Warum braucht man WANs?",
          paragraphs: [
            "Unternehmen müssen oft mehrere Standorte verbinden. Die Zentrale, Filialen, Lager, Rechenzentren und Cloud-Dienste sollen miteinander kommunizieren.",
            "Ein WAN ermöglicht Zugriff auf zentrale Dienste, auch wenn Benutzer nicht im selben Gebäude arbeiten.",
            "Ohne WAN wären entfernte Standorte technisch isoliert oder müssten Daten umständlich manuell austauschen."
          ]
        },
        {
          title: "WAN vs LAN",
          paragraphs: [
            "Ein LAN ist lokal begrenzt. Es befindet sich typischerweise in einem Raum, Gebäude oder Firmengelände.",
            "Ein WAN verbindet Netzwerke über größere Entfernungen, zum Beispiel zwischen Städten oder Ländern.",
            "Für AP1 ist diese Abgrenzung sehr wichtig: LAN = lokal, WAN = weit entfernt."
          ]
        },
        {
          title: "WAN vs WLAN",
          paragraphs: [
            "WLAN ist ein drahtloses lokales Netzwerk oder drahtloser Zugang zu einem lokalen Netzwerk.",
            "WAN beschreibt dagegen die Verbindung über große geografische Entfernungen.",
            "Die Begriffe klingen ähnlich, meinen aber völlig unterschiedliche Dinge."
          ]
        },
        {
          title: "Provider und Leitungen",
          paragraphs: [
            "WAN-Verbindungen laufen häufig über externe Anbieter. Diese Anbieter nennt man Provider oder Internet Service Provider.",
            "Der Provider stellt die Verbindung zwischen Standorten oder zum Internet bereit.",
            "Unternehmen nutzen dafür zum Beispiel Glasfaser, DSL, Mobilfunk, Standleitungen oder andere Zugangstechniken."
          ]
        },
        {
          title: "Router im WAN",
          paragraphs: [
            "Router verbinden Netzwerke miteinander. Deshalb sind sie für WAN-Verbindungen sehr wichtig.",
            "Ein Router kann das lokale Netzwerk mit dem Internet oder mit einem anderen Standort verbinden.",
            "Im AP1-Kontext reicht: Der Router ist das Gerät, das Daten zwischen Netzwerken weiterleitet."
          ]
        },
        {
          title: "Internet als WAN",
          paragraphs: [
            "Das Internet ist das größte bekannte WAN. Es verbindet weltweit viele Netzwerke miteinander.",
            "Wenn ein Unternehmen Cloud-Dienste nutzt, kommuniziert das eigene LAN oft über das Internet mit entfernten Servern.",
            "Das Internet ist öffentlich. Deshalb müssen Sicherheit und Verschlüsselung beachtet werden."
          ]
        },
        {
          title: "VPN im WAN-Kontext",
          paragraphs: [
            "Ein VPN kann eine geschützte Verbindung über ein unsicheres oder öffentliches Netzwerk aufbauen.",
            "Zum Beispiel kann eine Filiale per VPN mit der Zentrale verbunden werden.",
            "Für AP1 reicht: VPN schützt Kommunikation über entfernte Netzwerke durch einen verschlüsselten Tunnel."
          ]
        },
        {
          title: "Bandbreite und Latenz",
          paragraphs: [
            "Bandbreite beschreibt, wie viele Daten pro Zeit übertragen werden können.",
            "Latenz beschreibt die Verzögerung, bis Daten beim Ziel ankommen oder eine Antwort zurückkommt.",
            "WAN-Verbindungen haben oft höhere Latenz als LAN-Verbindungen, weil die Entfernung größer ist und mehrere Netzwerke beteiligt sein können."
          ]
        },
        {
          title: "Typische WAN-Probleme",
          paragraphs: [
            "WAN-Probleme können durch Provider-Störungen, Routerprobleme, falsche VPN-Konfiguration, hohe Latenz oder zu geringe Bandbreite entstehen.",
            "Wenn eine Filiale keine Verbindung zur Zentrale hat, kann das lokale LAN funktionieren und trotzdem die WAN-Verbindung gestört sein.",
            "Für AP1 ist wichtig, lokal und extern zu unterscheiden: Funktioniert nur ein PC nicht, das LAN nicht oder die Verbindung zu einem entfernten Standort nicht?"
          ]
        }
      ],
      realWorldExamples: [
        "Eine Zentrale in Berlin ist mit einer Filiale in Hamburg verbunden.",
        "Ein Unternehmen nutzt Cloud-Dienste, die über das Internet erreichbar sind.",
        "Ein Homeoffice-Mitarbeiter verbindet sich per VPN mit dem Firmennetz.",
        "Ein Rechenzentrum stellt Anwendungen für mehrere Standorte bereit.",
        "Eine Filiale hat funktionierendes LAN, aber keine Verbindung zur Zentrale, weil die Providerleitung gestört ist."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Filiale erreicht Zentrale nicht",
          paragraphs: [
            "Eine Filiale kann den Server in der Zentrale nicht erreichen. Lokale Drucker und lokale PCs funktionieren aber.",
            "Das deutet darauf hin, dass das LAN der Filiale funktioniert, aber die WAN-Verbindung oder VPN-Verbindung gestört sein könnte."
          ],
          steps: [
            "Prüfen, ob lokale Geräte in der Filiale erreichbar sind.",
            "Prüfen, ob der Router online ist.",
            "Prüfen, ob Internet oder Providerverbindung funktioniert.",
            "VPN-Status prüfen, falls VPN genutzt wird.",
            "Verbindung zur Zentrale testen.",
            "Provider oder zentrale IT informieren, wenn die WAN-Störung bestätigt ist."
          ]
        },
        {
          title: "Szenario 2: Anwendung ist langsam",
          paragraphs: [
            "Mitarbeiter in einer entfernten Filiale nutzen eine Anwendung im Rechenzentrum. Die Anwendung reagiert langsam.",
            "Mögliche Ursachen sind geringe Bandbreite, hohe Latenz oder viele gleichzeitige Benutzer."
          ],
          steps: [
            "Prüfen, ob lokale Anwendungen schnell reagieren.",
            "WAN-Verbindung und Auslastung prüfen.",
            "Latenz zum Rechenzentrum messen.",
            "Bandbreitennutzung prüfen.",
            "Zeitpunkt und betroffene Benutzer vergleichen.",
            "Maßnahmen wie bessere Leitung oder optimierte Anwendung prüfen."
          ]
        }
      ],
      diagrams: [
        {
          title: "WAN verbindet entfernte LANs",
          code: "flowchart LR\n  subgraph A[Zentrale LAN]\n    PC1[PCs]\n    SRV[Server]\n    SW1[Switch]\n    PC1 --> SW1\n    SRV --> SW1\n  end\n  SW1 --> R1[Router Zentrale]\n  R1 --> WAN[WAN / Provider / Internet]\n  WAN --> R2[Router Filiale]\n  R2 --> SW2[Switch Filiale]\n  SW2 --> PC2[PCs Filiale]"
        },
        {
          title: "LAN, WAN und VPN",
          code: "flowchart TD\n  LAN1[LAN Zentrale] --> R1[Router]\n  R1 --> I[Internet / WAN]\n  I --> R2[Router Filiale]\n  R2 --> LAN2[LAN Filiale]\n  I --> VPN[VPN-Tunnel schützt Daten]\n  VPN --> LAN1"
        }
      ],
      ihkFocus: {
        appears: [
          "WAN als Netzwerk über große Entfernungen definieren.",
          "LAN, WAN und WLAN unterscheiden.",
          "Standortvernetzung erklären.",
          "Rolle von Provider und Router beschreiben.",
          "VPN als sichere Verbindung über WAN einordnen.",
          "Bandbreite und Latenz in WAN-Situationen verstehen.",
          "Fehler zwischen LAN-Problem und WAN-Problem unterscheiden."
        ],
        commonMistakes: [
          "WAN mit WLAN verwechseln.",
          "WAN als einzelnes Gerät beschreiben.",
          "Internet und WAN ungenau gleichsetzen, ohne den Netzwerkverbund zu erklären.",
          "Bei Filialproblemen sofort den lokalen Switch verdächtigen, obwohl nur entfernte Ziele betroffen sind.",
          "Bandbreite und Latenz verwechseln."
        ],
        importantDetails: [
          "WAN bedeutet Wide Area Network.",
          "WAN verbindet entfernte Netzwerke.",
          "Provider stellen häufig WAN-Verbindungen bereit.",
          "Router verbinden LANs mit WANs.",
          "VPN kann Kommunikation über WAN absichern.",
          "WAN hat oft höhere Latenz als LAN."
        ],
        confusedConcepts: [
          "WAN vs WLAN.",
          "WAN vs LAN.",
          "Bandbreite vs Latenz.",
          "Provider vs Router.",
          "Internet vs privates WAN.",
          "Lokales Problem vs Standortverbindungsproblem."
        ],
        vocabulary: [
          "WAN = Wide Area Network.",
          "Provider = Anbieter der Verbindung.",
          "Bandbreite = Datenmenge pro Zeit.",
          "Latenz = Verzögerung.",
          "VPN = geschützter Tunnel über ein Netzwerk."
        ]
      },
      commonMistakes: [
        "WAN und WLAN zu verwechseln. WAN bedeutet große Entfernung; WLAN bedeutet drahtlose lokale Verbindung.",
        "WAN als Kabel im Büro zu beschreiben. Ein WAN verbindet entfernte Netzwerke oder Standorte.",
        "Zu sagen, Bandbreite und Latenz seien dasselbe. Bandbreite beschreibt Datenmenge, Latenz beschreibt Verzögerung.",
        "Bei einer Filialstörung nur das lokale LAN zu prüfen. Wenn lokale Dienste funktionieren, kann die WAN-Verbindung betroffen sein.",
        "VPN als eigenes physisches Netz zu verstehen. VPN ist eine geschützte Verbindung, oft über ein bestehendes Netzwerk."
      ],
      vocabulary: [
        {
          de: "WAN",
          pt: "rede de longa distância",
          explanation: "Netzwerk, das entfernte Netzwerke oder Standorte verbindet.",
          example: "Das WAN verbindet die Zentrale mit der Filiale."
        },
        {
          de: "Wide Area Network",
          pt: "rede de área ampla",
          explanation: "Englische Langform von WAN.",
          example: "WAN bedeutet Wide Area Network."
        },
        {
          de: "Provider",
          pt: "provedor",
          explanation: "Anbieter, der eine Netzwerk- oder Internetverbindung bereitstellt.",
          example: "Der Provider meldet eine Störung der Leitung."
        },
        {
          de: "Internet Service Provider",
          pt: "provedor de internet",
          explanation: "Anbieter für Internetzugang.",
          example: "Der Internet Service Provider stellt den Anschluss bereit."
        },
        {
          de: "Standortvernetzung",
          pt: "conexão entre localidades",
          explanation: "Verbindung mehrerer Unternehmensstandorte.",
          example: "Die Standortvernetzung verbindet Filiale und Zentrale."
        },
        {
          de: "Bandbreite",
          pt: "largura de banda",
          explanation: "Mögliche Datenmenge pro Zeit.",
          example: "Eine höhere Bandbreite kann mehr Daten übertragen."
        },
        {
          de: "Latenz",
          pt: "latência",
          explanation: "Verzögerung bei der Datenübertragung.",
          example: "Hohe Latenz macht Anwendungen träge."
        },
        {
          de: "Standleitung",
          pt: "linha dedicada",
          explanation: "Dauerhafte Verbindung zwischen Standorten oder zum Provider.",
          example: "Das Unternehmen nutzt eine Standleitung zum Rechenzentrum."
        },
        {
          de: "VPN-Tunnel",
          pt: "túnel VPN",
          explanation: "Geschützte Verbindung über ein Netzwerk.",
          example: "Die Filiale nutzt einen VPN-Tunnel zur Zentrale."
        },
        {
          de: "Rechenzentrum",
          pt: "data center",
          explanation: "Standort mit Servern und IT-Infrastruktur.",
          example: "Die Anwendung läuft im Rechenzentrum."
        }
      ],
      summary: [
        "WAN steht für Wide Area Network. Ein WAN verbindet Netzwerke über größere geografische Entfernungen.",
        "Ein LAN ist lokal begrenzt, ein WAN verbindet entfernte Standorte oder Netzwerke. WLAN ist drahtlose lokale Kommunikation und darf nicht mit WAN verwechselt werden.",
        "WAN-Verbindungen laufen häufig über Provider, Internetzugänge, Standleitungen, Router oder VPN-Verbindungen.",
        "Router verbinden lokale Netzwerke mit anderen Netzwerken. Ein VPN kann Kommunikation über ein WAN absichern.",
        "Bandbreite und Latenz sind wichtige Begriffe: Bandbreite beschreibt Datenmenge pro Zeit, Latenz beschreibt Verzögerung.",
        "Für AP1 musst du WAN-Szenarien mit Filialen, Zentrale, Provider, VPN und Internet logisch erklären können."
      ],
      mindMap: {
        title: "Mindmap: WAN",
        code: "mindmap\n  root((WAN))\n    Bedeutung\n      Wide Area Network\n      große Entfernung\n      entfernte Netzwerke\n    Beispiele\n      Filialen\n      Rechenzentrum\n      Cloud\n      Internet\n    Komponenten\n      Router\n      Provider\n      VPN\n      Standleitung\n    Begriffe\n      Bandbreite\n      Latenz\n      Standortvernetzung\n    AP1 Fokus\n      LAN abgrenzen\n      WLAN abgrenzen\n      Störungen einordnen"
      },
      exercises: {
        easy: [
          {
            question: "Wofür steht WAN?",
            answer: "WAN steht für Wide Area Network.",
            explanation: "Auf Deutsch kann man Weitverkehrsnetz sagen."
          },
          {
            question: "Was verbindet ein WAN?",
            answer: "Ein WAN verbindet entfernte Netzwerke oder Standorte.",
            explanation: "Zum Beispiel Zentrale und Filiale."
          },
          {
            question: "Ist WAN dasselbe wie WLAN?",
            answer: "Nein.",
            explanation: "WAN beschreibt große Entfernungen. WLAN beschreibt drahtlose lokale Kommunikation."
          },
          {
            question: "Nenne ein typisches WAN-Beispiel.",
            answer: "Verbindung zwischen Zentrale und Filiale.",
            explanation: "Das ist ein klassisches Unternehmensszenario."
          },
          {
            question: "Was macht ein Provider?",
            answer: "Er stellt eine Netzwerk- oder Internetverbindung bereit.",
            explanation: "WAN-Verbindungen laufen oft über Provider."
          }
        ],
        intermediate: [
          {
            question: "Erkläre den Unterschied zwischen LAN und WAN.",
            answer: "LAN ist lokal begrenzt. WAN verbindet Netzwerke über größere Entfernungen.",
            explanation: "LAN ist zum Beispiel ein Büro; WAN verbindet mehrere Standorte."
          },
          {
            question: "Warum kann WAN eine höhere Latenz als LAN haben?",
            answer: "Weil größere Entfernungen und mehr beteiligte Netzwerke Verzögerung verursachen können.",
            explanation: "Die Daten müssen weiter und über mehr Zwischenstationen übertragen werden."
          },
          {
            question: "Warum wird VPN häufig im WAN-Kontext genutzt?",
            answer: "Weil VPN Kommunikation über entfernte oder öffentliche Netzwerke schützen kann.",
            explanation: "Ein VPN-Tunnel verschlüsselt die Verbindung."
          },
          {
            question: "Was ist der Unterschied zwischen Bandbreite und Latenz?",
            answer: "Bandbreite beschreibt Datenmenge pro Zeit. Latenz beschreibt Verzögerung.",
            explanation: "Beide beeinflussen die wahrgenommene Netzwerkqualität."
          },
          {
            question: "Warum ist ein Router bei WAN-Verbindungen wichtig?",
            answer: "Weil ein Router Netzwerke miteinander verbindet.",
            explanation: "Er verbindet zum Beispiel ein LAN mit dem Internet oder einer Filiale."
          }
        ],
        ap1Style: [
          {
            question: "Eine Filiale kann lokale Drucker erreichen, aber keine Server in der Zentrale. Welche Verbindung ist wahrscheinlich betroffen?",
            answer: "Die WAN-Verbindung oder VPN-Verbindung zur Zentrale.",
            explanation: "Das lokale LAN funktioniert offenbar, aber entfernte Ziele sind nicht erreichbar."
          },
          {
            question: "Ein Azubi sagt: 'WAN bedeutet WLAN mit größerer Reichweite.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "WAN verbindet Netzwerke über große Entfernungen. WLAN ist drahtlose lokale Kommunikation."
          },
          {
            question: "Ordnen Sie zu: LAN, WAN, WLAN. Was ist lokal kabelgebunden oder lokal allgemein, was verbindet entfernte Netzwerke, was nutzt Funk?",
            answer: "LAN = lokales Netzwerk. WAN = Verbindung entfernter Netzwerke. WLAN = drahtlose lokale Kommunikation.",
            explanation: "Diese Unterscheidung ist AP1-Grundwissen."
          },
          {
            question: "Eine Anwendung im Rechenzentrum reagiert aus der Filiale langsam. Nennen Sie zwei mögliche WAN-bezogene Ursachen.",
            answer: "Hohe Latenz und zu geringe Bandbreite.",
            explanation: "Beides kann entfernte Anwendungen langsamer wirken lassen."
          },
          {
            question: "Warum sollte eine Verbindung zwischen Filiale und Zentrale über das Internet zusätzlich geschützt werden?",
            answer: "Weil das Internet ein öffentliches Netzwerk ist und Daten geschützt übertragen werden sollten.",
            explanation: "Ein VPN kann dafür einen verschlüsselten Tunnel bereitstellen."
          }
        ]
      },
      related: {
        previous: "LAN",
        next: "WLAN"
      },
      revisionChecklist: [
        "Ich kann erklären, was ein WAN ist.",
        "Ich weiß, wofür WAN steht.",
        "Ich kann LAN, WAN und WLAN unterscheiden.",
        "Ich verstehe die Rolle von Provider, Router und VPN.",
        "Ich kann Bandbreite und Latenz unterscheiden.",
        "Ich kann typische WAN-Probleme logisch einordnen.",
        "Ich kann AP1-Fragen zu WAN beantworten."
      ]
    }
  },
  {
    id: "wlan",
    title: "WLAN",
    description: "Ein WLAN ist ein drahtloses lokales Netzwerk, das Geräte über Funk mit einem Netzwerk verbindet.",
    text: [
      "WLAN bedeutet Wireless Local Area Network. Es ermöglicht Netzwerkzugang ohne Netzwerkkabel.",
      "Für die AP1 musst du WLAN von LAN und WAN unterscheiden und Begriffe wie Access Point, SSID, Reichweite, Verschlüsselung, WPA2 und WPA3 kennen."
    ],
    ihk: "Wichtig für AP1: WLAN = drahtloses lokales Netzwerk. Zentrale Begriffe sind Access Point, SSID, Funkverbindung, Reichweite, Verschlüsselung und WPA2/WPA3.",
    summary: "WLAN é uma rede local sem fio. Dispositivos se conectam por rádio a um Access Point, usando SSID e criptografia como WPA2 ou WPA3.",
    example: "Ein Notebook verbindet sich über WLAN mit einem Access Point und erhält danach Zugriff auf das Firmennetzwerk.",
    exercises: [
      {
        question: "Wofür steht WLAN?",
        answer: "WLAN steht für Wireless Local Area Network."
      }
    ],
    studyTime: "90-110 Minuten",
    difficulty: "Medium",
    fullContent: {
      studyTime: "90-110 Minuten",
      difficulty: "Medium",
      importance: {
        stars: "★★★★★",
        explanation: [
          "WLAN ist für AP1 sehr wichtig, weil drahtlose Netzwerke in Unternehmen, Schulen und Homeoffice alltäglich sind.",
          "Die IHK prüft WLAN oft über Begriffe, Sicherheit, Reichweite, Störungen und Abgrenzung zu LAN und WAN.",
          "Português de apoio: WLAN é a parte sem fio da rede local. Ele é prático, mas precisa de boa segurança e bom sinal."
        ]
      },
      objectives: [
        "After this chapter the student will be able to explain what WLAN is.",
        "After this chapter the student will be able to distinguish WLAN, LAN and WAN.",
        "After this chapter the student will be able to explain the roles of Access Point and SSID.",
        "After this chapter the student will be able to describe why encryption is important.",
        "After this chapter the student will be able to identify common WLAN problems.",
        "After this chapter the student will be able to solve AP1-style questions about wireless networks."
      ],
      introduction: [
        "Ein LAN kann Geräte per Kabel verbinden. In der Praxis möchten Benutzer aber oft mit Notebook, Smartphone oder Tablet ohne Kabel arbeiten.",
        "Dafür nutzt man WLAN. WLAN ist ein drahtloses lokales Netzwerk.",
        "WLAN ist bequem und flexibel. Gleichzeitig ist es anfälliger für Störungen und braucht gute Sicherheitsmaßnahmen.",
        "Für AP1 ist wichtig: WLAN ist nicht dasselbe wie WAN. WLAN ist lokal und drahtlos; WAN verbindet entfernte Netzwerke."
      ],
      explanation: [
        {
          title: "Was ist WLAN?",
          paragraphs: [
            "WLAN steht für Wireless Local Area Network.",
            "Es ist ein drahtloses lokales Netzwerk, das Geräte über Funk verbindet.",
            "Ein WLAN gehört häufig zu einem LAN. Der drahtlose Zugang führt über einen Access Point in das lokale Netzwerk."
          ]
        },
        {
          title: "WLAN vs LAN",
          paragraphs: [
            "LAN beschreibt ein lokales Netzwerk allgemein. Oft meint man damit kabelgebundene Verbindungen über Ethernet.",
            "WLAN ist drahtloser Zugang zu einem lokalen Netzwerk.",
            "Ein Unternehmen kann gleichzeitig kabelgebundenes LAN und WLAN nutzen."
          ]
        },
        {
          title: "WLAN vs WAN",
          paragraphs: [
            "WLAN und WAN werden oft verwechselt, weil die Begriffe ähnlich aussehen.",
            "WLAN ist Wireless Local Area Network, also drahtlos lokal.",
            "WAN ist Wide Area Network, also ein Netzwerk über große Entfernungen."
          ]
        },
        {
          title: "Access Point",
          paragraphs: [
            "Ein Access Point ist ein Gerät, das drahtlosen Zugang zum Netzwerk bereitstellt.",
            "Clients wie Notebooks oder Smartphones verbinden sich per Funk mit dem Access Point.",
            "Der Access Point ist meistens per Kabel mit dem LAN verbunden."
          ]
        },
        {
          title: "SSID",
          paragraphs: [
            "Die SSID ist der Name eines WLANs.",
            "Benutzer sehen die SSID in der Liste verfügbarer Funknetzwerke.",
            "Beispiel: Eine Firma kann eine SSID für Mitarbeiter und eine separate SSID für Gäste betreiben."
          ]
        },
        {
          title: "Funkverbindung und Reichweite",
          paragraphs: [
            "WLAN nutzt Funk. Deshalb hängt die Qualität von Entfernung, Wänden, Störungen und Access-Point-Position ab.",
            "Je weiter ein Gerät vom Access Point entfernt ist, desto schwächer kann das Signal werden.",
            "Auch andere Funkquellen oder viele Geräte im selben Bereich können die Verbindung beeinflussen."
          ]
        },
        {
          title: "Frequenzbänder",
          paragraphs: [
            "WLAN arbeitet häufig in Frequenzbereichen wie 2,4 GHz und 5 GHz. Moderne Systeme können auch weitere Bereiche nutzen.",
            "2,4 GHz hat oft größere Reichweite, ist aber häufiger überlastet. 5 GHz bietet oft mehr Leistung, hat aber geringere Reichweite durch Hindernisse.",
            "Für AP1 reicht: Frequenzbereich beeinflusst Reichweite, Geschwindigkeit und Störanfälligkeit."
          ]
        },
        {
          title: "Verschlüsselung",
          paragraphs: [
            "Da WLAN über Funk sendet, können Signale außerhalb eines Raums oder Gebäudes empfangbar sein.",
            "Deshalb ist Verschlüsselung sehr wichtig. Sie schützt Daten und verhindert einfachen unbefugten Zugriff.",
            "WPA2 und WPA3 sind wichtige Sicherheitsstandards. Offene WLANs ohne Verschlüsselung sind riskant."
          ]
        },
        {
          title: "Gastnetz",
          paragraphs: [
            "Viele Unternehmen trennen Mitarbeiter-WLAN und Gäste-WLAN.",
            "Ein Gastnetz erlaubt Internetzugang, aber keinen Zugriff auf interne Systeme.",
            "Das verbessert Sicherheit, weil private Geräte von Besuchern nicht direkt im internen Netz arbeiten."
          ]
        },
        {
          title: "Typische WLAN-Probleme",
          paragraphs: [
            "Typische Probleme sind schwaches Signal, falsches Passwort, falsche SSID, Störungen, überlasteter Access Point oder fehlende IP-Adresse.",
            "Bei WLAN-Fehlersuche prüft man Signalstärke, SSID, Passwort, Entfernung, Access Point und IP-Konfiguration.",
            "Man muss unterscheiden: Ist nur WLAN betroffen oder auch das kabelgebundene LAN?"
          ]
        }
      ],
      realWorldExamples: [
        "Ein Mitarbeiter verbindet sein Notebook über das Mitarbeiter-WLAN mit dem Firmennetz.",
        "Besucher nutzen ein Gäste-WLAN, das nur Internetzugang erlaubt.",
        "Ein Access Point in einem Besprechungsraum ist schlecht positioniert, deshalb ist das Signal schwach.",
        "Ein Lager nutzt WLAN für mobile Scanner.",
        "Eine Schule betreibt mehrere Access Points, damit Klassenräume drahtlos abgedeckt sind."
      ],
      practicalExamples: [
        {
          title: "Szenario 1: Notebook findet das WLAN nicht",
          paragraphs: [
            "Ein Notebook zeigt die Firmen-SSID nicht an. Andere Geräte im Raum sehen das WLAN aber.",
            "Die Ursache kann am Notebook, Funkadapter, Standort oder an einer Einstellung liegen."
          ],
          steps: [
            "Prüfen, ob WLAN am Notebook aktiviert ist.",
            "Prüfen, ob andere Geräte die SSID sehen.",
            "Entfernung zum Access Point verringern.",
            "Notebook neu verbinden oder Funkadapter prüfen.",
            "Access Point und SSID-Konfiguration prüfen.",
            "Wenn nötig IT-Support informieren."
          ]
        },
        {
          title: "Szenario 2: Gäste sollen nur Internet haben",
          paragraphs: [
            "Ein Unternehmen möchte Gästen WLAN anbieten, aber interne Server schützen.",
            "Dafür wird ein separates Gäste-WLAN eingerichtet."
          ],
          steps: [
            "Separate Gäste-SSID erstellen.",
            "Gastnetz vom internen Netz trennen.",
            "Nur Internetzugang erlauben.",
            "Sicheres Passwort oder Portal verwenden.",
            "Zugriff auf interne Server blockieren.",
            "Regelmäßig prüfen, ob Trennung funktioniert."
          ]
        }
      ],
      diagrams: [
        {
          title: "WLAN-Zugang zum LAN",
          code: "flowchart TD\n  NB[Notebook] -. Funk .-> AP[Access Point]\n  SP[Smartphone] -. Funk .-> AP\n  AP --> SW[Switch im LAN]\n  SW --> SRV[Server]\n  SW --> R[Router]\n  R --> INET[Internet]"
        },
        {
          title: "Mitarbeiter-WLAN und Gäste-WLAN",
          code: "flowchart LR\n  AP[Access Point] --> SSID1[SSID: Firma]\n  AP --> SSID2[SSID: Gast]\n  SSID1 --> LAN[Internes LAN]\n  SSID2 --> NET[Nur Internet]\n  LAN --> SRV[Interne Server]\n  NET --> INET[Internet]"
        }
      ],
      ihkFocus: {
        appears: [
          "WLAN als drahtloses lokales Netzwerk definieren.",
          "WLAN von LAN und WAN unterscheiden.",
          "Access Point und SSID erklären.",
          "Bedeutung von Verschlüsselung nennen.",
          "WPA2 und WPA3 grob einordnen.",
          "Reichweite und Störungen als WLAN-Faktoren erkennen.",
          "Gastnetz als Sicherheitsmaßnahme erklären."
        ],
        commonMistakes: [
          "WLAN mit WAN verwechseln.",
          "SSID als Passwort beschreiben.",
          "Offenes WLAN als sicher ansehen.",
          "Access Point und Router immer gleichsetzen.",
          "Bei WLAN-Problemen nur das Passwort prüfen und Signalqualität vergessen."
        ],
        importantDetails: [
          "WLAN bedeutet Wireless Local Area Network.",
          "WLAN nutzt Funk.",
          "Access Points stellen drahtlosen Zugang bereit.",
          "SSID ist der Netzwerkname.",
          "Verschlüsselung schützt drahtlose Kommunikation.",
          "WPA2/WPA3 sind wichtige Sicherheitsstandards.",
          "Reichweite und Störungen beeinflussen Verbindungsqualität."
        ],
        confusedConcepts: [
          "WLAN vs WAN.",
          "WLAN vs LAN.",
          "SSID vs Passwort.",
          "Access Point vs Router.",
          "Signalstärke vs Internetgeschwindigkeit.",
          "Gastnetz vs internes Netz."
        ],
        vocabulary: [
          "WLAN = Wireless Local Area Network.",
          "Access Point = drahtloser Zugangspunkt.",
          "SSID = Name des WLANs.",
          "Verschlüsselung = Schutz der übertragenen Daten.",
          "WPA2/WPA3 = WLAN-Sicherheitsstandards."
        ]
      },
      commonMistakes: [
        "Zu sagen: WLAN ist WAN. WLAN ist drahtlos lokal; WAN ist weit entfernt.",
        "SSID und Passwort zu verwechseln. Die SSID ist der Name des WLANs; das Passwort schützt den Zugang.",
        "Ein offenes WLAN als sicher zu bewerten. Ohne Verschlüsselung können Daten und Zugriff leichter gefährdet sein.",
        "Access Point immer mit Router gleichzusetzen. In Heimgeräten sind Rollen oft kombiniert, in Unternehmen sind sie häufig getrennt.",
        "Nur die Internetverbindung zu prüfen. Man muss unterscheiden, ob WLAN, LAN, Router, DNS oder Internet betroffen ist."
      ],
      vocabulary: [
        {
          de: "WLAN",
          pt: "rede local sem fio",
          explanation: "Drahtloses lokales Netzwerk.",
          example: "Das Notebook verbindet sich mit dem WLAN."
        },
        {
          de: "Wireless Local Area Network",
          pt: "rede local sem fio",
          explanation: "Englische Langform von WLAN.",
          example: "WLAN bedeutet Wireless Local Area Network."
        },
        {
          de: "Access Point",
          pt: "ponto de acesso",
          explanation: "Gerät, das drahtlosen Zugang zu einem Netzwerk bereitstellt.",
          example: "Der Access Point ist mit dem LAN verbunden."
        },
        {
          de: "SSID",
          pt: "nome da rede Wi-Fi",
          explanation: "Name eines WLANs.",
          example: "Die SSID des Gäste-WLANs lautet Firma-Gast."
        },
        {
          de: "Funkverbindung",
          pt: "conexão por rádio",
          explanation: "Drahtlose Verbindung über Funksignale.",
          example: "WLAN nutzt eine Funkverbindung."
        },
        {
          de: "Reichweite",
          pt: "alcance",
          explanation: "Bereich, in dem ein WLAN-Signal nutzbar ist.",
          example: "Wände können die Reichweite verringern."
        },
        {
          de: "Verschlüsselung",
          pt: "criptografia",
          explanation: "Schutz von Daten durch Umwandlung in eine nicht einfach lesbare Form.",
          example: "WPA3 bietet WLAN-Verschlüsselung."
        },
        {
          de: "WPA2",
          pt: "WPA2",
          explanation: "WLAN-Sicherheitsstandard.",
          example: "Viele WLANs nutzen WPA2."
        },
        {
          de: "WPA3",
          pt: "WPA3",
          explanation: "Moderner WLAN-Sicherheitsstandard.",
          example: "WPA3 verbessert die Sicherheit moderner WLANs."
        },
        {
          de: "Gastnetz",
          pt: "rede de convidados",
          explanation: "Separates Netzwerk für Gäste, oft nur mit Internetzugang.",
          example: "Besucher nutzen das Gastnetz statt des internen WLANs."
        }
      ],
      summary: [
        "WLAN steht für Wireless Local Area Network. Es ist ein drahtloses lokales Netzwerk.",
        "WLAN nutzt Funk, damit Geräte wie Notebooks, Smartphones oder Tablets ohne Netzwerkkabel verbunden werden können.",
        "Ein Access Point stellt den drahtlosen Zugang bereit. Die SSID ist der Name des WLANs.",
        "WLAN muss klar von LAN und WAN unterschieden werden: LAN ist lokal, WLAN ist drahtlos lokal, WAN verbindet entfernte Netzwerke.",
        "Sicherheit ist bei WLAN besonders wichtig, weil Funksignale auch außerhalb eines Raums empfangbar sein können. WPA2 und WPA3 sind wichtige Sicherheitsstandards.",
        "Typische WLAN-Probleme sind schwaches Signal, falsches Passwort, falsche SSID, Störungen, überlastete Access Points oder fehlende IP-Konfiguration."
      ],
      mindMap: {
        title: "Mindmap: WLAN",
        code: "mindmap\n  root((WLAN))\n    Bedeutung\n      Wireless Local Area Network\n      drahtlos lokal\n      Funk\n    Komponenten\n      Access Point\n      Client\n      SSID\n    Sicherheit\n      Verschlüsselung\n      WPA2\n      WPA3\n      Gastnetz\n    Qualität\n      Reichweite\n      Störungen\n      Frequenzband\n      Signalstärke\n    AP1 Fokus\n      LAN abgrenzen\n      WAN abgrenzen\n      Probleme analysieren"
      },
      exercises: {
        easy: [
          {
            question: "Wofür steht WLAN?",
            answer: "WLAN steht für Wireless Local Area Network.",
            explanation: "Auf Deutsch: drahtloses lokales Netzwerk."
          },
          {
            question: "Was ist eine SSID?",
            answer: "Die SSID ist der Name eines WLANs.",
            explanation: "Benutzer sehen sie in der Liste verfügbarer Netzwerke."
          },
          {
            question: "Was macht ein Access Point?",
            answer: "Er stellt drahtlosen Zugang zu einem Netzwerk bereit.",
            explanation: "Clients verbinden sich per Funk mit dem Access Point."
          },
          {
            question: "Nenne zwei WLAN-Sicherheitsstandards.",
            answer: "WPA2 und WPA3.",
            explanation: "Sie werden zur Absicherung von WLAN-Verbindungen genutzt."
          },
          {
            question: "Ist WLAN dasselbe wie WAN?",
            answer: "Nein.",
            explanation: "WLAN ist drahtlos lokal, WAN verbindet entfernte Netzwerke."
          }
        ],
        intermediate: [
          {
            question: "Warum ist Verschlüsselung bei WLAN wichtig?",
            answer: "Weil WLAN über Funk sendet und Signale auch außerhalb eines Raums empfangbar sein können.",
            explanation: "Verschlüsselung schützt Daten und Zugang."
          },
          {
            question: "Erkläre den Unterschied zwischen WLAN und LAN.",
            answer: "LAN beschreibt ein lokales Netzwerk allgemein; WLAN ist drahtloser Zugang zu einem lokalen Netzwerk.",
            explanation: "WLAN kann Teil eines LANs sein."
          },
          {
            question: "Warum kann WLAN langsamer oder instabiler als Kabel sein?",
            answer: "Funk kann durch Entfernung, Wände, Störungen und viele Geräte beeinflusst werden.",
            explanation: "Kabelverbindungen sind oft stabiler."
          },
          {
            question: "Warum ist ein Gäste-WLAN sinnvoll?",
            answer: "Es trennt Besuchergeräte vom internen Netzwerk.",
            explanation: "Gäste bekommen Internetzugang, aber keinen Zugriff auf interne Server."
          },
          {
            question: "Was ist der Unterschied zwischen SSID und Passwort?",
            answer: "Die SSID ist der Netzwerkname. Das Passwort schützt den Zugang.",
            explanation: "Beide Begriffe werden in der Praxis oft verwechselt."
          }
        ],
        ap1Style: [
          {
            question: "Ein Notebook hat im Besprechungsraum schlechten WLAN-Empfang. Nennen Sie zwei mögliche Ursachen.",
            answer: "Große Entfernung zum Access Point und Störungen oder Wände.",
            explanation: "WLAN-Qualität hängt stark von Funkbedingungen und Position ab."
          },
          {
            question: "Ein Unternehmen möchte Besuchern Internet anbieten, aber interne Server schützen. Welche WLAN-Maßnahme ist sinnvoll?",
            answer: "Ein separates Gäste-WLAN.",
            explanation: "Das Gastnetz kann vom internen Netzwerk getrennt werden."
          },
          {
            question: "Ein Azubi sagt: 'Die SSID ist das WLAN-Passwort.' Beurteilen Sie diese Aussage.",
            answer: "Die Aussage ist falsch.",
            explanation: "Die SSID ist der Name des WLANs. Das Passwort ist eine Zugangsinformation."
          },
          {
            question: "Ordnen Sie zu: WLAN, WAN, Access Point. Was ist drahtlos lokal, was verbindet entfernte Netzwerke, was stellt WLAN-Zugang bereit?",
            answer: "WLAN = drahtlos lokal. WAN = verbindet entfernte Netzwerke. Access Point = stellt WLAN-Zugang bereit.",
            explanation: "Diese Begriffe sind typische AP1-Abgrenzungen."
          },
          {
            question: "Warum ist ein offenes WLAN in einem Unternehmen problematisch?",
            answer: "Es bietet keinen ausreichenden Schutz für Zugang und Datenübertragung.",
            explanation: "Unternehmen sollten WLAN mit geeigneter Verschlüsselung und Zugriffskontrolle absichern."
          }
        ]
      },
      related: {
        previous: "WAN",
        next: "Switch"
      },
      revisionChecklist: [
        "Ich kann erklären, was WLAN ist.",
        "Ich weiß, wofür WLAN steht.",
        "Ich kann WLAN, LAN und WAN unterscheiden.",
        "Ich kann Access Point und SSID erklären.",
        "Ich verstehe, warum Verschlüsselung wichtig ist.",
        "Ich kenne WPA2, WPA3 und Gastnetz auf AP1-Niveau.",
        "Ich kann AP1-Fragen zu WLAN beantworten."
      ]
    }
  },
  createAp1Chapter("nat", "NAT", "NAT traduz endereços IP privados para endereços públicos e vice-versa.", "NAT significa Network Address Translation.", "NAT permite que vários dispositivos internos compartilhem um IP público.", "Um roteador doméstico usa NAT para conectar a rede privada à internet."),
  createAp1Chapter("vpn", "VPN", "VPN cria uma conexão criptografada entre redes ou entre usuário remoto e rede da empresa.", "VPN significa Virtual Private Network. Termos: Tunnel, Verschlüsselung, Remote Access.", "VPN protege comunicação e permite acesso remoto seguro.", "Um funcionário em home office acessa recursos internos usando VPN."),
  createAp1Chapter("ports", "Ports", "Portas identificam serviços de rede dentro de um dispositivo.", "Port em alemão também é Port. Exemplos: 80 HTTP, 443 HTTPS, 53 DNS.", "IP identifica o host; porta identifica o serviço.", "Um servidor web pode escutar HTTPS na porta 443."),
  createAp1Chapter("tcp", "TCP", "TCP é um protocolo de transporte orientado à conexão e confiável.", "TCP garante Reihenfolge, Bestätigung e erneute Übertragung.", "TCP prioriza entrega confiável dos dados.", "HTTPS usa TCP para garantir que os dados cheguem corretamente."),
  createAp1Chapter("udp", "UDP", "UDP é um protocolo de transporte sem conexão, rápido e com menos controle.", "UDP não garante entrega. Atenção a Geschwindigkeit e Echtzeit.", "UDP é útil quando velocidade importa mais que retransmissão.", "Streaming e chamadas de voz podem usar UDP."),
  createAp1Chapter("osi-camada-1", "Camada 1", "A camada física trata sinais, cabos, conectores, rádio e transmissão de bits.", "OSI Layer 1: Bitübertragungsschicht.", "Camada 1 é o meio físico da comunicação.", "Cabo desconectado é problema típico de camada 1."),
  createAp1Chapter("osi-camada-2", "Camada 2", "A camada de enlace organiza quadros e endereços MAC na rede local.", "OSI Layer 2: Sicherungsschicht. Switch atua aqui.", "Camada 2 trabalha com Frames e MAC-Adressen.", "Um switch encaminha quadros para a porta correta."),
  createAp1Chapter("osi-camada-3", "Camada 3", "A camada de rede trabalha com endereços IP e roteamento entre redes.", "OSI Layer 3: Vermittlungsschicht. Router atua aqui.", "Camada 3 decide caminhos entre redes.", "Um roteador encaminha pacotes para outra rede."),
  createAp1Chapter("osi-camada-4", "Camada 4", "A camada de transporte usa TCP ou UDP para comunicação entre aplicações.", "OSI Layer 4: Transportschicht. TCP e UDP.", "Camada 4 controla portas e transporte de dados.", "TCP 443 indica tráfego HTTPS em transporte TCP."),
  createAp1Chapter("osi-camada-5", "Camada 5", "A camada de sessão gerencia sessões de comunicação entre sistemas.", "OSI Layer 5: Sitzungsschicht.", "Camada 5 organiza início, manutenção e fim de sessões.", "Uma sessão autenticada precisa ser mantida enquanto o usuário usa um serviço."),
  createAp1Chapter("osi-camada-6", "Camada 6", "A camada de apresentação trata formato, codificação, compressão e criptografia de dados.", "OSI Layer 6: Darstellungsschicht.", "Camada 6 prepara dados para a aplicação entender.", "Codificação UTF-8 e criptografia podem ser associadas a esta camada em modelo conceitual."),
  createAp1Chapter("osi-camada-7", "Camada 7", "A camada de aplicação contém protocolos próximos do usuário, como HTTP, DNS e SMTP.", "OSI Layer 7: Anwendungsschicht.", "Camada 7 é onde serviços de aplicação se comunicam.", "DNS e HTTP são exemplos comuns de camada 7.")
];

const AZUBIFORGE_CHAPTERS_BY_ID = new Map(
  [...AZUBIFORGE_DATA.chapters, ...AZUBIFORGE_NEW_CHAPTERS].map((chapter) => [chapter.id, chapter])
);
const AZUBIFORGE_MODULE_CHAPTER_IDS = AZUBIFORGE_DATA.modules.flatMap((module) => module.chapterIds);

AZUBIFORGE_DATA.chapters = [
  ...AZUBIFORGE_MODULE_CHAPTER_IDS.map((id) => AZUBIFORGE_CHAPTERS_BY_ID.get(id)).filter(Boolean),
  ...AZUBIFORGE_DATA.chapters.filter((chapter) => !AZUBIFORGE_MODULE_CHAPTER_IDS.includes(chapter.id))
];

function createWestermannChapter(id, title, description, focus, summary, example, terms = []) {
  const fullContent = buildGuidedFullContent(title, description, focus, summary, example, terms, {
    studyTime: "45-60 Minuten",
    difficulty: "Medium"
  });
  const vocabulary = terms.length ? terms.join(", ") : "wichtige Fachbegriffe aus dem Lernfeld";

  return {
    id,
    title,
    description,
    text: [
      `${title} gehoert zur Grundstufe LF 1-5. Der Fokus liegt auf Verstehen, beruflicher Handlung und sicherem Umgang mit Fachwoertern.`,
      description,
      `Portuguese support: este capitulo resume o tema em linguagem propria para estudo. Palavras-chave: ${vocabulary}.`
    ],
    ihk: focus,
    summary,
    example,
    studyTime: fullContent.studyTime,
    difficulty: fullContent.difficulty,
    exercises: [
      ...fullContent.exercises.easy.slice(0, 2),
      ...fullContent.exercises.intermediate.slice(0, 1)
    ],
    fullContent
  };
}

const AZUBIFORGE_WESTERMANN_CHAPTERS = [
  createWestermannChapter(
    "duales-system",
    "Duales Ausbildungssystem",
    "Die Ausbildung findet an zwei Lernorten statt: im Betrieb und in der Berufsschule. Beide Orte haben eigene Aufgaben und muessen zusammenwirken.",
    "Achte auf die Rollen von Ausbildungsbetrieb, Berufsschule, IHK, Ausbildungsvertrag, Ausbildungsordnung und Rahmenlehrplan.",
    "Das duale System verbindet Praxis im Betrieb mit Theorie in der Berufsschule. Fuer AP1 musst du Beteiligte, Dokumente und Verantwortlichkeiten unterscheiden.",
    "Ein Azubi lernt im Betrieb Kundenprozesse kennen und vertieft in der Berufsschule die fachlichen Grundlagen.",
    ["Ausbildungsbetrieb", "Berufsschule", "IHK", "Ausbildungsverordnung", "Rahmenlehrplan"]
  ),
  createWestermannChapter(
    "rechte-pflichten",
    "Rechte und Pflichten in der Ausbildung",
    "Auszubildende und Ausbildende haben klare Rechte und Pflichten. Dazu gehoeren Ausbildungsmittel, Berufsschule, Ausbildungsnachweis, Verguetung, Probezeit und Kuendigung.",
    "Typische Pruefungsfragen verlangen, richtige und falsche Aussagen zu BBiG, Probezeit, Ausbildungsnachweis und Verguetung zu beurteilen.",
    "Du musst erklaeren koennen, was Azubis tun muessen und was der Betrieb sicherstellen muss. Wichtig ist die saubere Unterscheidung zwischen Pflicht, Recht und Nachweis.",
    "Ein Azubi fuehrt den Ausbildungsnachweis regelmaessig und bekommt dafuer im Betrieb Gelegenheit.",
    ["Ausbildungsnachweis", "Probezeit", "Verguetung", "Kuendigung", "BBiG"]
  ),
  createWestermannChapter(
    "mitbestimmung",
    "Arbeitsrechte und Mitbestimmung",
    "Mitbestimmung beschreibt, wie Mitarbeitende ueber Betriebsrat, Jugend- und Auszubildendenvertretung und betriebliche Regelungen beteiligt werden.",
    "Merke dir, welche Aufgabe Betriebsrat und Jugendvertretung haben und wann Beteiligung im Betrieb wichtig ist.",
    "Mitbestimmung bedeutet nicht, dass jeder allein entscheidet. Sie schafft geregelte Beteiligung und Schutz von Interessen im Betrieb.",
    "Ein Jugendvertreter sammelt Anliegen von Auszubildenden und bringt sie in Abstimmung mit dem Betriebsrat ein.",
    ["Betriebsrat", "Jugendvertretung", "Mitbestimmung", "Interessenvertretung"]
  ),
  createWestermannChapter(
    "berufsplanung",
    "Berufs- und Lebensplanung",
    "Berufsplanung bedeutet, die eigene Ausbildung aktiv zu steuern: Ziele setzen, Kompetenzen pruefen, Lernschritte planen und Entwicklung reflektieren.",
    "AP1-relevant ist die Verbindung aus Selbstkompetenz, Lernkompetenz, Teamarbeit und beruflicher Handlung.",
    "Ein guter Azubi wartet nicht nur auf Aufgaben. Er plant Lernen, fragt gezielt nach Feedback und dokumentiert Fortschritt.",
    "Nach einem Lernfeld notierst du, was du sicher kannst, was unklar ist und welcher naechste Schritt sinnvoll ist.",
    ["Selbstkompetenz", "Lernkompetenz", "Feedback", "Reflexion"]
  ),
  createWestermannChapter(
    "modellunternehmen-jiku",
    "Modellunternehmen JIKU IT-Solutions",
    "Die Westermann-Buecher arbeiten mit einem Modellunternehmen. Es dient als realistischer Rahmen fuer IT-Service, Beratung, Beschaffung, Betrieb und Softwareentwicklung.",
    "Nutze JIKU als Denkmodell: Wer ist Kunde, welche Leistung wird benoetigt, welcher Prozess fuehrt zum Ergebnis?",
    "Das Modellunternehmen macht aus Theorie eine berufliche Situation. Fuer AzubiForge bedeutet das: jede Lerneinheit soll in einem Unternehmenskontext anwendbar sein.",
    "Ein Kunde moechte neue Arbeitsplaetze ausstatten. JIKU analysiert Bedarf, waehlt Komponenten, erstellt Angebot und plant Lieferung.",
    ["Systemhaus", "Kunde", "IT-Service", "Leistungsportfolio"]
  ),
  createWestermannChapter(
    "betriebsziele",
    "Betriebe, Unternehmen und Ziele",
    "Betriebe erstellen Leistungen oder Gueter. Unternehmen verfolgen wirtschaftliche, soziale und oekologische Ziele und muessen Entscheidungen begruenden.",
    "Unterscheide Betrieb und Unternehmen sowie Zielarten wie Gewinn, Kundenzufriedenheit, Qualitaet und Nachhaltigkeit.",
    "Ein Unternehmen trifft Entscheidungen nicht nur technisch, sondern auch wirtschaftlich und organisatorisch.",
    "Ein guenstiger PC kann technisch reichen, aber wegen Support, Garantie oder Energieverbrauch langfristig unpassend sein.",
    ["Betrieb", "Unternehmen", "Sachziel", "Formalziel", "Nachhaltigkeit"]
  ),
  createWestermannChapter(
    "organisation-rechtsformen",
    "Aufbauorganisation und Rechtsformen",
    "Aufbauorganisation beschreibt Stellen, Abteilungen und Verantwortlichkeiten. Rechtsformen beschreiben den rechtlichen Rahmen eines Unternehmens.",
    "AP1 fragt oft nach Organigramm, Abteilung, Verantwortung, Einzelunternehmen, GmbH oder anderen Rechtsformen auf Grundniveau.",
    "Organisation klaert, wer wofuer zustaendig ist. Rechtsform beeinflusst Haftung, Kapital und Vertretung.",
    "In einem Organigramm erkennst du, ob Helpdesk, Vertrieb und Entwicklung getrennte Abteilungen sind.",
    ["Organigramm", "Stelle", "Abteilung", "GmbH", "Haftung"]
  ),
  createWestermannChapter(
    "geschaeftsprozesse",
    "Wertschoepfung und Geschaeftsprozesse",
    "Geschaeftsprozesse beschreiben wiederholbare Ablaeufe vom Ausloeser bis zum Ergebnis. Wertschoepfung entsteht, wenn ein Ergebnis fuer Kunden Nutzen schafft.",
    "Unterscheide Kernprozess, Unterstuetzungsprozess und Fuehrungsprozess. Achte auf Input, Output, Rolle und Kundennutzen.",
    "Ein Prozess ist mehr als eine Liste von Aufgaben. Er hat Ziel, Beteiligte, Reihenfolge und Ergebnis.",
    "Vom Kundenwunsch bis zur Uebergabe eines Notebooks entsteht ein Prozess mit Beratung, Angebot, Beschaffung, Installation und Abnahme.",
    ["Geschaeftsprozess", "Kernprozess", "Input", "Output", "Wertschoepfung"]
  ),
  createWestermannChapter(
    "marktumfeld",
    "Marktumfeld und Wirtschaftskreislaeufe",
    "Unternehmen handeln in einem Marktumfeld mit Kunden, Lieferanten, Wettbewerbern und gesetzlichen Rahmenbedingungen.",
    "Erkenne Angebot, Nachfrage, Marktform, Wettbewerb und einfache wirtschaftliche Beziehungen im IT-Systemhaus.",
    "Technische Entscheidungen entstehen in einem wirtschaftlichen Umfeld. Nachfrage, Preis, Lieferbarkeit und Wettbewerb beeinflussen Angebote.",
    "Wenn ein bestimmter Laptop knapp ist, kann der Anbieter eine Alternative mit aehnlicher Leistung anbieten.",
    ["Markt", "Angebot", "Nachfrage", "Wettbewerb", "Lieferant"]
  ),
  createWestermannChapter(
    "praesentation-teamarbeit",
    "Praesentation und Teamarbeit",
    "Praesentationen, Ergebnisprotokolle und Reflexion sind zentrale Handlungsprodukte in den Lernfeldern.",
    "Wichtig sind klare Zielgruppe, kurzer Aufbau, Rollen im Team, Zeitplanung und reflektiertes Feedback.",
    "Eine gute Praesentation zeigt nicht alles, sondern das Wesentliche fuer die Zielgruppe.",
    "Ein Team stellt das Ausbildungsunternehmen in wenigen Folien vor und reflektiert danach Ablauf, Rollen und Ergebnis.",
    ["Praesentation", "Teamarbeit", "Protokoll", "Reflexion", "Zielgruppe"]
  ),
  createWestermannChapter(
    "eva-prinzip",
    "EVA-Prinzip und Grundfunktionen",
    "Das EVA-Prinzip beschreibt Eingabe, Verarbeitung und Ausgabe. Es hilft, Computerfunktionen einfach zu ordnen.",
    "Nutze EVA, um Hardware, Peripherie und Datenverarbeitung sauber zu erklaeren.",
    "Eingabe liefert Daten, Verarbeitung veraendert oder berechnet sie, Ausgabe stellt Ergebnisse bereit.",
    "Tastatur = Eingabe, CPU/RAM = Verarbeitung, Monitor = Ausgabe, SSD = Speicherung.",
    ["Eingabe", "Verarbeitung", "Ausgabe", "Speicherung", "Peripherie"]
  ),
  createWestermannChapter(
    "it-systeme-portfolio",
    "IT-Systeme und Leistungsportfolio",
    "Ein IT-Systemhaus bietet Leistungen wie Beratung, Beschaffung, Installation, Support, Hosting, Cloud und Security an.",
    "Ordne Kundenbedarf passenden Leistungen zu und unterscheide Produkt, Service und Loesung.",
    "Ein Leistungsportfolio zeigt, was ein IT-Dienstleister anbieten kann. Kunden kaufen oft nicht nur Hardware, sondern eine passende Gesamtlösung.",
    "Ein Kunde benoetigt nicht nur Notebooks, sondern auch Einrichtung, Benutzerkonten, Backup und Support.",
    ["Leistungsportfolio", "IT-Service", "IT-Loesung", "Support", "Hosting"]
  ),
  createWestermannChapter(
    "auswahlkriterien",
    "Auswahlkriterien fuer IT-Produkte",
    "IT-Produkte werden nach Anforderungen, Qualitaet, Leistungsfaehigkeit, Sicherheit, Kosten, Energieverbrauch und Service bewertet.",
    "Pruefungsaufgaben verlangen oft eine begruendete Auswahl statt nur die technisch staerkste Option.",
    "Eine gute Auswahl passt zur Aufgabe. Teuer, schnell oder neu bedeutet nicht automatisch sinnvoll.",
    "Fuer Office-Arbeit reicht ein anderes Notebook als fuer CAD, Virtualisierung oder Softwareentwicklung.",
    ["Anforderung", "Qualitaet", "Leistungsfaehigkeit", "Kosten", "Service"]
  ),
  createWestermannChapter(
    "green-it",
    "Green IT und Umweltschutz",
    "Green IT betrachtet Energieverbrauch, Lebensdauer, Reparierbarkeit, Recycling und ressourcenschonende Nutzung von IT-Systemen.",
    "AP1 kann Green IT mit Beschaffung, Betriebskosten und Nachhaltigkeit verbinden.",
    "Green IT ist kein Zusatzthema. Sie beeinflusst Kosten, Image, gesetzliche Anforderungen und technische Entscheidungen.",
    "Ein sparsamer Monitor senkt Stromkosten und kann ueber viele Arbeitsplaetze hinweg relevant werden.",
    ["Green IT", "Energieverbrauch", "Recycling", "Nachhaltigkeit", "Lebensdauer"]
  ),
  createWestermannChapter(
    "wirtschaftlichkeit-it",
    "Wirtschaftlichkeit von IT-Systemen",
    "Wirtschaftlichkeit vergleicht Nutzen und Kosten. Dazu gehoeren Anschaffung, Betrieb, Wartung, Ausfallzeiten und Lebensdauer.",
    "Unterscheide Anschaffungspreis, laufende Kosten, TCO und ROI auf Grundniveau.",
    "Das billigste Angebot ist nicht automatisch wirtschaftlich. Entscheidend sind Gesamtkosten und Nutzen ueber die Nutzungsdauer.",
    "Ein teurerer Server kann wirtschaftlicher sein, wenn er weniger Ausfallzeit und besseren Support bietet.",
    ["Wirtschaftlichkeit", "Kosten", "Nutzen", "TCO", "ROI"]
  ),
  createWestermannChapter(
    "arbeitsplatzsoftware",
    "Arbeitsplatzsoftware",
    "Arbeitsplatzsoftware umfasst Betriebssystem, Office-Anwendungen, Fachanwendungen, Browser, Sicherheitssoftware und Kollaborationstools.",
    "Achte auf Lizenz, Kompatibilitaet, Datenschutz, Support und Anforderungen der Nutzer.",
    "Softwareauswahl gehoert zur Arbeitsplatzgestaltung. Sie muss technisch, rechtlich und organisatorisch passen.",
    "Ein neuer Arbeitsplatz braucht Betriebssystem, Office-Paket, VPN-Client, Virenschutz und Zugriff auf Fachanwendungen.",
    ["Software", "Lizenz", "Kompatibilitaet", "Support", "Datenschutz"]
  ),
  createWestermannChapter(
    "kundenanforderungen",
    "Kundenanforderungen und Leistungsprozess",
    "Kundenanforderungen beschreiben, was gebraucht wird. Sie muessen aufgenommen, geklaert, dokumentiert und in Loesungen uebersetzt werden.",
    "Typisch sind Muss-, Soll- und Kann-Anforderungen sowie technische, wirtschaftliche und organisatorische Anforderungen.",
    "Ohne saubere Anforderungen wird eine Loesung schnell falsch. Fragen stellen ist deshalb Teil professioneller IT-Arbeit.",
    "Ein Kunde sagt 'schneller PC'. Der Azubi klaert Aufgabe, Programme, Budget, Mobilitaet, Sicherheit und Liefertermin.",
    ["Kundenanforderung", "Muss-Anforderung", "Soll-Anforderung", "Leistungsprozess"]
  ),
  createWestermannChapter(
    "projektmanagement-iperka",
    "Projektmanagement und IPERKA",
    "IPERKA strukturiert vollstaendige Handlungen: Informieren, Planen, Entscheiden, Realisieren, Kontrollieren und Auswerten.",
    "AP1-relevant ist, Aufgaben nicht sofort zu loesen, sondern planvoll und nachvollziehbar zu bearbeiten.",
    "IPERKA hilft, berufliche Aufgaben geordnet zu bearbeiten und Ergebnisse zu reflektieren.",
    "Bei einer Arbeitsplatzinstallation sammelst du zuerst Anforderungen, planst Ablauf und kontrollierst danach die Funktion.",
    ["IPERKA", "Informieren", "Planen", "Kontrollieren", "Reflektieren"]
  ),
  createWestermannChapter(
    "anforderungsanalyse",
    "Bedarfs- und Anforderungsanalyse",
    "Die Anforderungsanalyse ermittelt, welche fachlichen, technischen und organisatorischen Bedingungen eine Loesung erfuellen muss.",
    "Pruefe Zielgruppe, Ist-Zustand, Soll-Zustand, Rahmenbedingungen, Prioritaeten und Risiken.",
    "Bedarf beschreibt das Problem oder Ziel. Anforderungen machen daraus pruefbare Kriterien.",
    "Fuer neue Laptops werden Anzahl, Software, Leistung, Sicherheit, Docking, Budget und Liefertermin dokumentiert.",
    ["Bedarf", "Anforderung", "Ist-Zustand", "Soll-Zustand", "Prioritaet"]
  ),
  createWestermannChapter(
    "pflichtenheft",
    "Lastenheft und Pflichtenheft",
    "Das Lastenheft beschreibt aus Kundensicht, was gebraucht wird. Das Pflichtenheft beschreibt aus Anbietersicht, wie die Anforderungen umgesetzt werden.",
    "Diese Unterscheidung ist ein Klassiker: Was will der Auftraggeber, und wie realisiert der Auftragnehmer es?",
    "Lastenheft = Was und wofuer. Pflichtenheft = Wie und womit.",
    "Der Kunde fordert sichere mobile Arbeitsplaetze. Der Anbieter beschreibt Notebookmodell, VPN, Verschluesselung und Supportprozess.",
    ["Lastenheft", "Pflichtenheft", "Auftraggeber", "Auftragnehmer"]
  ),
  createWestermannChapter(
    "kalkulation",
    "Angebote, Stundensaetze und Kalkulation",
    "Kalkulation betrachtet Kosten, Zuschlaege, Verkaufspreis, Arbeitszeit, Gewinn und Wirtschaftlichkeit von Dienstleistungen.",
    "Rechne sauber mit Netto, Brutto, Rabatt, Skonto, Stunden und Stundensatz. Begruende Ergebnisse.",
    "IT-Leistungen kosten nicht nur Material. Arbeitszeit, Support und Risiko muessen ebenfalls kalkuliert werden.",
    "Eine Installation dauert drei Stunden. Mit Stundensatz, Hardwarepreis und Umsatzsteuer entsteht ein Angebotspreis.",
    ["Kalkulation", "Stundensatz", "Netto", "Brutto", "Gewinn"]
  ),
  createWestermannChapter(
    "angebotsvergleich",
    "Beschaffung und Angebotsvergleich",
    "Beschaffung umfasst Bedarfsermittlung, Anfrage, Angebotsvergleich, Bestellung, Lieferung und Kontrolle.",
    "Unterscheide quantitativen Angebotsvergleich und Nutzwertanalyse mit qualitativen Kriterien.",
    "Beim Angebotsvergleich zaehlen nicht nur Preise. Lieferzeit, Garantie, Service und Qualitaet koennen entscheidend sein.",
    "Anbieter A ist billiger, Anbieter B liefert schneller und bietet besseren Vor-Ort-Service. Eine Nutzwertanalyse macht die Entscheidung sichtbar.",
    ["Beschaffung", "Anfrage", "Angebot", "Nutzwertanalyse", "Lieferzeit"]
  ),
  createWestermannChapter(
    "lieferung-abnahme",
    "Lieferung, Installation, Uebergabe und Abnahme",
    "Nach Beschaffung folgen Wareneingang, Installation, Funktionstest, Dokumentation, Uebergabe und Abnahme durch den Kunden.",
    "Achte auf Abnahmeprotokoll, Arbeitssicherheit, Datenschutz, Recycling und nachvollziehbare Dokumentation.",
    "Ein IT-Auftrag ist erst fertig, wenn die Leistung funktioniert, dokumentiert und vom Kunden abgenommen ist.",
    "Bei der Uebergabe eines Arbeitsplatzes pruefst du Login, Netzwerk, Drucker, Software und dokumentierst offene Punkte.",
    ["Wareneingang", "Installation", "Uebergabe", "Abnahme", "Dokumentation"]
  ),
  createWestermannChapter(
    "topologien",
    "Netzwerktopologien",
    "Topologien beschreiben die Struktur eines Netzwerks, zum Beispiel Stern, Bus, Ring oder vermaschte Strukturen.",
    "AP1 fragt haeufig nach Vorteilen, Nachteilen und Ausfallfolgen einfacher Topologien.",
    "In modernen LANs ist die Sterntopologie besonders wichtig, weil Clients typischerweise ueber Switches verbunden werden.",
    "Faellt bei einer Sterntopologie ein einzelnes Kabel aus, ist meist nur ein Client betroffen. Faellt der zentrale Switch aus, sind viele betroffen.",
    ["Topologie", "Stern", "Bus", "Ring", "Switch"]
  ),
  createWestermannChapter(
    "verkabelung",
    "Strukturierte Verkabelung",
    "Strukturierte Verkabelung plant Netzwerkverkabelung uebersichtlich, erweiterbar und normnah mit Verteiler, Patchpanel, Dosen und Kabelwegen.",
    "Verstehe Patchpanel, Netzwerkschrank, Twisted Pair, Glasfaser und Dokumentation der Anschluesse.",
    "Gute Verkabelung reduziert Fehler und erleichtert Wartung. Unbeschriftete Kabel kosten spaeter viel Zeit.",
    "Ein Buero wird ueber Netzwerkdosen an ein Patchpanel angeschlossen. Im Netzwerkschrank verbindet man Ports mit dem Switch.",
    ["Patchpanel", "Netzwerkdose", "Netzwerkschrank", "Twisted Pair", "Glasfaser"]
  ),
  createWestermannChapter(
    "netzwerkmedien",
    "Netzwerkmedien",
    "Netzwerkmedien transportieren Daten: Kupferkabel, Glasfaser oder Funk. Sie unterscheiden sich bei Reichweite, Geschwindigkeit, Kosten und Stoeranfaelligkeit.",
    "Ordne Medium, Einsatzfall und typische Eigenschaft zu. WLAN ist flexibel, Glasfaser ist stark bei Distanz und Bandbreite.",
    "Das passende Medium haengt vom Einsatzort ab. Serverraum, Buero und Lager koennen unterschiedliche Medien brauchen.",
    "Zwischen Gebaeuden kann Glasfaser sinnvoll sein, waehrend Arbeitsplaetze im Buero ueber Twisted Pair angebunden werden.",
    ["Kupferkabel", "Glasfaser", "Funk", "Bandbreite", "Reichweite"]
  ),
  createWestermannChapter(
    "tcp-ip-modell",
    "TCP/IP-Modell",
    "Das TCP/IP-Modell beschreibt praktische Internetkommunikation mit Schichten fuer Netzzugang, Internet, Transport und Anwendung.",
    "Vergleiche TCP/IP mit OSI auf Grundniveau und ordne IP, TCP, UDP, DNS und HTTP sinnvoll zu.",
    "TCP/IP ist praxisnaeher als das OSI-Modell. Beide Modelle helfen, Kommunikation und Fehler einzuordnen.",
    "Wenn DNS funktioniert, aber HTTPS nicht, kann der Fehler eher bei Anwendung, Transport, Firewall oder Server liegen.",
    ["TCP/IP", "IP", "TCP", "UDP", "HTTP", "DNS"]
  ),
  createWestermannChapter(
    "ip-adressen",
    "IP-Adressen und Adressierung",
    "IP-Adressen identifizieren Hosts logisch im Netzwerk. Wichtige Zusatzbegriffe sind Subnetzmaske, Gateway, private Adresse und oeffentliche Adresse.",
    "AP1 verlangt oft Zuordnung von IP-Adresse, Subnetz, Gateway, DNS und Fehlerursache.",
    "Eine IP-Adresse allein reicht nicht. Fuer Kommunikation braucht ein Client passende Netzmaske, Gateway und DNS-Konfiguration.",
    "Ein Client hat eine IP im falschen Netz und erreicht deshalb den Server nicht.",
    ["IP-Adresse", "Subnetzmaske", "Gateway", "private Adresse", "DNS"]
  ),
  createWestermannChapter(
    "cloud-edge",
    "Cloud, Fog und Edge Computing",
    "Cloud, Fog und Edge beschreiben, wo Daten verarbeitet werden: zentral im Rechenzentrum, naeher am Netzwerk oder direkt nahe am Geraet.",
    "Unterscheide zentrale Dienste, Latenz, Bandbreite, Datenschutz und Ausfallsicherheit.",
    "Nicht jede Aufgabe muss in die Cloud. Manche Daten werden besser nah am Entstehungsort verarbeitet.",
    "Sensoren in einer Produktion senden Daten an Edge-Systeme, damit Entscheidungen schnell vor Ort getroffen werden.",
    ["Cloud", "Fog Computing", "Edge Computing", "Latenz", "Rechenzentrum"]
  ),
  createWestermannChapter(
    "client-integration",
    "Clients ins Netzwerk integrieren",
    "Clientintegration umfasst Anforderungen pruefen, Anschluss herstellen, IP-Konfiguration setzen, Benutzer anmelden, Dienste testen und Ergebnis dokumentieren.",
    "Arbeite strukturiert: physische Verbindung, IP-Konfiguration, Namensaufloesung, Anmeldung, Rechte und Dienste.",
    "Ein Client ist erst integriert, wenn er die benoetigten Dienste nutzen kann und die Konfiguration dokumentiert ist.",
    "Ein neuer Laptop wird mit WLAN, Benutzerkonto, VPN, Drucker und Netzlaufwerk eingerichtet.",
    ["Client", "IP-Konfiguration", "Benutzeranmeldung", "Netzlaufwerk", "Dokumentation"]
  ),
  createWestermannChapter(
    "verbindungstest",
    "Verbindungstest und Fehlersuche",
    "Verbindungstests pruefen, ob ein Client andere Systeme erreichen kann. Typische Werkzeuge sind ping, ipconfig, nslookup und traceroute.",
    "Fehlersuche beginnt unten: Kabel oder WLAN, IP, Gateway, DNS, Dienst, Firewall und Server.",
    "Gute Fehlersuche ist geordnet. Erst pruefen, dann entscheiden.",
    "Ein Browser zeigt einen Fehler. Du pruefst zuerst IP-Konfiguration, dann DNS-Aufloesung und danach Erreichbarkeit des Servers.",
    ["ping", "ipconfig", "nslookup", "traceroute", "Fehlersuche"]
  ),
  createWestermannChapter(
    "namensaufloesung",
    "Namensaufloesung pruefen",
    "Namensaufloesung uebersetzt Namen in IP-Adressen. DNS-Probleme fuehren dazu, dass Namen nicht erreichbar sind, obwohl IP-Kommunikation moeglich sein kann.",
    "Unterscheide Fehler bei IP-Verbindung und Fehler bei DNS. Das ist ein haeufiger AP1-Denkpunkt.",
    "Wenn eine IP erreichbar ist, aber der Name nicht, liegt der Verdacht auf DNS nahe.",
    "Der Server ist per IP erreichbar, aber intranet.local oeffnet nicht. Dann pruefst du DNS-Server und DNS-Eintrag.",
    ["DNS", "Namensaufloesung", "Hostname", "DNS-Server", "nslookup"]
  ),
  createWestermannChapter(
    "netzwerk-wartung",
    "Management und vorbeugende Wartung",
    "Netzwerkmanagement sorgt fuer Ueberwachung, Dokumentation, Updates, Backups von Konfigurationen und fruehes Erkennen von Stoerungen.",
    "AP1-relevant sind Monitoring, Dokumentation, Wartungsfenster, Updates und klare Verantwortlichkeiten.",
    "Vorbeugende Wartung verhindert Ausfaelle, bevor sie gross werden.",
    "Ein Switch wird dokumentiert, Firmware wird geplant aktualisiert und Konfigurationen werden gesichert.",
    ["Monitoring", "Wartung", "Firmware", "Dokumentation", "Konfigurationsbackup"]
  ),
  createWestermannChapter(
    "stromversorgung-it",
    "Stromversorgung von IT-Geraeten",
    "IT-Geraete brauchen passende Leistung, sichere Stromversorgung und Schutz vor Ausfall. Wichtige Begriffe sind Netzteil, Watt, USV und Energiebedarf.",
    "Berechne einfache Leistungsbedarfe und begruende USV-Einsatz fuer kritische Systeme.",
    "Stromversorgung ist Teil von Verfuegbarkeit. Ohne Strom funktioniert auch das beste IT-System nicht.",
    "Ein kleiner Server und Switch werden an eine USV angeschlossen, damit kurze Stromausfaelle ueberbrueckt werden.",
    ["Netzteil", "Watt", "USV", "Leistungsbedarf", "Verfuegbarkeit"]
  ),
  createWestermannChapter(
    "informationssicherheit",
    "Grundlagen der Informationssicherheit",
    "Informationssicherheit schuetzt Informationen und IT-Systeme vor Verlust, Manipulation, Ausfall und unbefugtem Zugriff.",
    "Die Schutzziele Vertraulichkeit, Integritaet und Verfuegbarkeit sind zentral.",
    "Sicherheit ist nicht nur Technik. Menschen, Prozesse, Organisation und Dokumentation gehoeren dazu.",
    "Ein Unternehmen schuetzt Kundendaten durch Rechte, Verschluesselung, Backups, Schulung und klare Prozesse.",
    ["Informationssicherheit", "Vertraulichkeit", "Integritaet", "Verfuegbarkeit"]
  ),
  createWestermannChapter(
    "datenschutz",
    "Datenschutz und rechtliche Grundlagen",
    "Datenschutz schuetzt personenbezogene Daten. In IT-Aufgaben geht es um Zweckbindung, Zugriff, Loeschung, Einwilligung und technische Schutzmassnahmen.",
    "Unterscheide Datenschutz von Datensicherheit: personenbezogene Daten vs allgemeiner Schutz von Daten und Systemen.",
    "Datenschutz fragt: Duerfen wir diese Daten verarbeiten, wer darf sie sehen und wie lange werden sie benoetigt?",
    "Ein Helpdesk darf Kundendaten nur nutzen, wenn sie fuer den Supportfall erforderlich sind.",
    ["Datenschutz", "personenbezogene Daten", "DSGVO", "Zweckbindung", "Loeschung"]
  ),
  createWestermannChapter(
    "it-grundschutz",
    "IT-Grundschutz und Sicherheitsprozess",
    "IT-Grundschutz beschreibt eine systematische Vorgehensweise fuer Informationssicherheit mit Leitlinie, Analyse, Massnahmen und Kontrolle.",
    "AP1 erwartet Grundidee und Begriffe, keine tiefe BSI-Spezialisierung.",
    "Ein Sicherheitsprozess ist dauerhaft. Risiken werden erfasst, Massnahmen umgesetzt und regelmaessig geprueft.",
    "Ein Unternehmen definiert eine Sicherheitsleitlinie und prueft danach Schutzbedarf fuer Anwendungen und Systeme.",
    ["IT-Grundschutz", "Sicherheitsleitlinie", "Sicherheitsprozess", "Massnahme"]
  ),
  createWestermannChapter(
    "schutzbedarf",
    "Schutzbedarfsfeststellung",
    "Schutzbedarf bewertet, wie schlimm ein Schaden fuer Informationen, Anwendungen oder Systeme waere.",
    "Bewerte Auswirkungen auf Vertraulichkeit, Integritaet und Verfuegbarkeit und ordne normal, hoch oder sehr hoch ein.",
    "Schutzbedarf beschreibt nicht die Wahrscheinlichkeit, sondern die moegliche Schadenshoehe.",
    "Eine Kundendatenbank hat hohen Schutzbedarf bei Vertraulichkeit, weil unbefugter Zugriff schwere Folgen haette.",
    ["Schutzbedarf", "normal", "hoch", "sehr hoch", "Schadensauswirkung"]
  ),
  createWestermannChapter(
    "bedrohungen",
    "Bedrohungen und Schadensszenarien",
    "Bedrohungen koennen technisch, organisatorisch, menschlich oder naturbedingt sein. Schadensszenarien beschreiben moegliche Folgen.",
    "Verbinde Bedrohung, Schwachstelle, Risiko, Schaden und passende Massnahme.",
    "Ein Risiko entsteht, wenn eine Bedrohung eine Schwachstelle ausnutzen kann und Schaden moeglich ist.",
    "Ein ungepatchter Server ist eine Schwachstelle. Schadsoftware kann daraus Datenverlust oder Ausfall verursachen.",
    ["Bedrohung", "Schwachstelle", "Risiko", "Schaden", "Massnahme"]
  ),
  createWestermannChapter(
    "social-engineering",
    "Identitaetsdiebstahl und Social Engineering",
    "Social Engineering nutzt menschliches Vertrauen, Druck oder Taeuschung, um Informationen oder Zugang zu erhalten.",
    "AP1 fragt gern nach Erkennungsmerkmalen, Risiken und Gegenmassnahmen wie Schulung, MFA und klare Prozesse.",
    "Nicht jeder Angriff ist technisch. Viele Angriffe beginnen mit einer Nachricht oder einem Telefonat.",
    "Ein Anrufer gibt sich als Admin aus und fragt nach einem Passwort. Die richtige Reaktion ist Verifikation und keine Weitergabe.",
    ["Social Engineering", "Phishing", "Identitaetsdiebstahl", "MFA", "Sensibilisierung"]
  ),
  createWestermannChapter(
    "tom",
    "Technisch-organisatorische Massnahmen",
    "TOM sind technische und organisatorische Massnahmen zum Schutz von Daten und Systemen.",
    "Ordne Beispiele: Zugriffskontrolle, Verschluesselung, Backup, Schulung, Rollen, Protokollierung und Zutrittskontrolle.",
    "Technik allein reicht nicht. Regeln, Schulung und Verantwortlichkeiten machen Schutz wirksam.",
    "Eine Dateiablage wird durch Berechtigungen, Backup, Protokollierung und Benutzeranweisungen abgesichert.",
    ["TOM", "Zugriffskontrolle", "Verschluesselung", "Backup", "Protokollierung"]
  ),
  createWestermannChapter(
    "sicherheitskonzept",
    "Sicherheitskonzept erstellen",
    "Ein Sicherheitskonzept fasst Ziele, Schutzbedarf, Risiken, Massnahmen, Verantwortlichkeiten und Kontrollen zusammen.",
    "Wichtig ist der Zusammenhang: Schutzbedarf fuehrt zu passenden Massnahmen, die dokumentiert und geprueft werden.",
    "Ein Sicherheitskonzept ist ein Arbeitsdokument, kein reiner Text. Es hilft, Entscheidungen nachvollziehbar zu machen.",
    "Fuer mobile Datentraeger werden Verschluesselung, Ausgabeprozess, Verlustmeldung und Rueckgabe geregelt.",
    ["Sicherheitskonzept", "Verantwortlichkeit", "Kontrolle", "Massnahmenplan"]
  ),
  createWestermannChapter(
    "softwareentwicklung-umfeld",
    "Umfeld der Softwareentwicklung",
    "Softwareentwicklung findet in Projekten statt. Beteiligte analysieren Anforderungen, entwerfen Loesungen, implementieren, testen und dokumentieren.",
    "Unterscheide Rollen, Aufgaben, Neuentwicklung, Anpassung und Zusammenarbeit im Projekt.",
    "Software entsteht nicht nur durch Programmieren. Analyse, Kommunikation, Test und Dokumentation sind genauso Teil der Arbeit.",
    "Ein Entwickler passt eine bestehende Anwendung an, weil ein Kunde neue Auswertungen benoetigt.",
    ["Softwareentwicklung", "Projekt", "Rolle", "Anpassung", "Neuentwicklung"]
  ),
  createWestermannChapter(
    "daten-informationen",
    "Daten und Informationen",
    "Daten sind Zeichen oder Werte. Informationen entstehen, wenn Daten in einem Kontext Bedeutung bekommen.",
    "Diese Unterscheidung ist wichtig fuer Datenbanken, Dateien, Datenschutz und Auswertungen.",
    "Daten allein koennen bedeutungslos sein. Erst Kontext macht daraus eine nutzbare Information.",
    "Der Wert 42 ist ein Datum. Als Lagerbestand von 42 Monitoren wird er zur Information.",
    ["Daten", "Information", "Kontext", "Auswertung"]
  ),
  createWestermannChapter(
    "zahlensysteme",
    "Zahlensysteme",
    "IT nutzt verschiedene Zahlensysteme wie binaer, dezimal und hexadezimal. Sie helfen, Speicher, Farben, Adressen und Maschinennaehe zu verstehen.",
    "AP1 kann einfache Umrechnungen und Begriffe wie Bit, Byte, binaer und hexadezimal abfragen.",
    "Computer arbeiten intern mit binaeren Zustaenden. Menschen nutzen oft dezimal oder hexadezimal zur besseren Lesbarkeit.",
    "Die binaere Zahl 1010 entspricht dezimal 10.",
    ["Bit", "Byte", "binaer", "dezimal", "hexadezimal"]
  ),
  createWestermannChapter(
    "codierung",
    "Darstellung und Codierung von Daten",
    "Daten muessen codiert werden, damit Computer Text, Zahlen, Bilder oder Zeichen speichern und verarbeiten koennen.",
    "Wichtig sind Zeichenkodierung, Dateigroesse, Einheiten und einfache Beispiele fuer Datenrepraesentation.",
    "Codierung legt fest, wie Bedeutung als Daten dargestellt wird.",
    "Ein Text wird mit einer Zeichenkodierung wie UTF-8 gespeichert, damit Zeichen korrekt gelesen werden koennen.",
    ["Codierung", "UTF-8", "Zeichen", "Dateigroesse", "Datenrepraesentation"]
  ),
  createWestermannChapter(
    "datenarten",
    "Datenarten und Datenherkunft",
    "Daten koennen strukturiert, semistrukturiert oder unstrukturiert sein und aus internen oder externen Quellen stammen.",
    "Ordne Datenart, Quelle, Qualitaet und Datenschutzrisiko ein.",
    "Nicht alle Daten sind gleich gut nutzbar. Struktur, Herkunft und Qualitaet entscheiden ueber Verarbeitung.",
    "Eine Kundentabelle ist strukturiert. Eine freie E-Mail ist eher unstrukturiert.",
    ["strukturierte Daten", "unstrukturierte Daten", "Datenquelle", "Datenqualitaet"]
  ),
  createWestermannChapter(
    "speicherung-daten",
    "Speicherung von Daten",
    "Datenspeicherung betrachtet Speicherort, Zugriff, Sicherheit, Backup, Datenformat und Lebensdauer.",
    "Verbinde Speicherung mit Datenschutz, Verfuegbarkeit, Dateisystem, Datenbank und Backup.",
    "Daten muessen nicht nur gespeichert, sondern auffindbar, geschuetzt und wiederherstellbar sein.",
    "Eine Anwendung speichert Kundendaten in einer Datenbank und erzeugt regelmaessige Backups.",
    ["Speicherung", "Speicherort", "Backup", "Dateisystem", "Datenbank"]
  ),
  createWestermannChapter(
    "softwareprozess",
    "Prozess der Softwareentwicklung",
    "Der Softwareprozess umfasst Analyse, Planung, Entwurf, Implementierung, Test, Einfuehrung und Wartung.",
    "AP1-relevant sind Phasen, Ergebnisse und warum Tests und Dokumentation nicht erst am Ende gedacht werden sollten.",
    "Ein Softwareprozess macht Arbeit planbar und pruefbar.",
    "Vor dem Programmieren wird geklaert, welche Eingaben, Ausgaben und Regeln die Anwendung haben muss.",
    ["Analyse", "Entwurf", "Implementierung", "Test", "Wartung"]
  ),
  createWestermannChapter(
    "vorgehensmodelle",
    "Vorgehensmodelle",
    "Vorgehensmodelle strukturieren Softwareprojekte. Beispiele sind Wasserfall, V-Modell und agile Vorgehensweisen.",
    "Unterscheide lineare und iterative Arbeit sowie typische Vor- und Nachteile.",
    "Das passende Vorgehen haengt von Stabilitaet der Anforderungen, Risiko und Zusammenarbeit ab.",
    "Wenn Anforderungen unklar sind, kann iteratives Arbeiten mit Feedback sinnvoller sein als ein starrer Plan.",
    ["Wasserfall", "V-Modell", "agil", "Iteration", "Feedback"]
  ),
  createWestermannChapter(
    "anforderungsspezifikation",
    "Anforderungsspezifikation und Softwareentwurf",
    "Anforderungen werden praezisiert und im Entwurf in Strukturen, Datenmodelle, Abläufe und Schnittstellen uebersetzt.",
    "Achte auf funktionale und nichtfunktionale Anforderungen sowie klare, pruefbare Formulierungen.",
    "Gute Spezifikation verhindert Missverstaendnisse zwischen Kunde und Entwicklerteam.",
    "Die Anforderung 'schnell' wird messbar, zum Beispiel: Suchergebnisse werden in weniger als zwei Sekunden angezeigt.",
    ["funktionale Anforderung", "nichtfunktionale Anforderung", "Entwurf", "Schnittstelle"]
  ),
  createWestermannChapter(
    "python-grundlagen",
    "Python Grundlagen",
    "Python wird im Lernfeld als einfache Sprache genutzt, um Datenverarbeitung praktisch zu verstehen.",
    "Wichtig sind Variable, Datentyp, Eingabe, Ausgabe, Operator, Kommentar und Fehlermeldung.",
    "Programmiergrundlagen helfen, algorithmisches Denken zu lernen. Syntax ist Mittel zum Zweck.",
    "Ein kleines Programm liest einen Namen ein und gibt eine personalisierte Begruessung aus.",
    ["Python", "Variable", "Datentyp", "Eingabe", "Ausgabe"]
  ),
  createWestermannChapter(
    "python-kontrollstrukturen",
    "Verzweigungen, Schleifen und Listen in Python",
    "Kontrollstrukturen steuern den Ablauf eines Programms. Verzweigungen treffen Entscheidungen, Schleifen wiederholen Schritte, Listen speichern mehrere Werte.",
    "AP1 kann einfache Codeausschnitte lesen lassen: Was passiert, welche Ausgabe entsteht, wo ist der Fehler?",
    "Du musst nicht nur Code schreiben, sondern Code verstehen und erklären koennen.",
    "Eine Schleife prueft alle Bestellungen in einer Liste und summiert die Preise.",
    ["if", "else", "for", "while", "Liste"]
  ),
  createWestermannChapter(
    "dateien-datenstroeme",
    "Dateien und Datenstroeme",
    "Programme koennen Daten aus Dateien lesen und in Dateien schreiben. Datenstroeme beschreiben den gerichteten Datenfluss.",
    "Unterscheide Lesen, Schreiben, Anhaengen, Dateipfad, Fehlerbehandlung und Schliessen von Dateien.",
    "Dateizugriff macht Programme dauerhaft nutzbar, weil Daten nach Programmende erhalten bleiben.",
    "Ein Python-Programm liest Kundennummern aus einer CSV-Datei und schreibt Fehler in eine Logdatei.",
    ["Datei", "Datenstrom", "lesen", "schreiben", "Dateipfad"]
  ),
  createWestermannChapter(
    "dateiformate",
    "Dateiformate",
    "Dateiformate legen fest, wie Daten in Dateien strukturiert sind. Beispiele sind TXT, CSV, JSON, XML und PDF.",
    "Ordne Format, Struktur, Einsatzfall und Vor- oder Nachteil ein.",
    "Das Format entscheidet, wie leicht Daten von Programmen gelesen, ausgetauscht oder Menschen angezeigt werden koennen.",
    "CSV eignet sich fuer tabellarische Daten, JSON fuer strukturierte Daten in Webanwendungen.",
    ["TXT", "CSV", "JSON", "XML", "PDF"]
  ),
  createWestermannChapter(
    "er-modell",
    "ER-Modell",
    "Das Entity-Relationship-Modell beschreibt Entitaeten, Attribute und Beziehungen, bevor eine relationale Datenbank umgesetzt wird.",
    "AP1 fragt haeufig nach Entitaet, Attribut, Beziehung und Kardinalitaet.",
    "Ein ER-Modell hilft, Daten fachlich zu verstehen, bevor Tabellen erstellt werden.",
    "Kunde und Bestellung sind Entitaeten. Ein Kunde kann mehrere Bestellungen haben.",
    ["Entitaet", "Attribut", "Beziehung", "Kardinalitaet", "ER-Modell"]
  ),
  createWestermannChapter(
    "relationales-modell",
    "Relationales Datenmodell",
    "Das relationale Modell speichert Daten in Tabellen. Primaerschluessel identifizieren Datensaetze, Fremdschluessel bilden Beziehungen ab.",
    "Unterscheide Tabelle, Datensatz, Attribut, Primaerschluessel und Fremdschluessel.",
    "Das relationale Modell macht Beziehungen zwischen Daten strukturiert und abfragbar.",
    "Eine Tabelle Bestellung enthaelt eine KundenID als Fremdschluessel zur Tabelle Kunde.",
    ["Tabelle", "Datensatz", "Primaerschluessel", "Fremdschluessel", "Relation"]
  ),
  createWestermannChapter(
    "sqlite-python",
    "SQLite mit Python",
    "SQLite ist eine einfache relationale Datenbankdatei, die Programme lokal nutzen koennen. Python kann per Bibliothek SQL-Befehle ausfuehren.",
    "Verstehe Verbindung, Cursor, SQL-Befehl, commit und Ergebnisabfrage auf Grundniveau.",
    "SQLite verbindet Programmierung und Datenbanken in einem kleinen, praktischen Rahmen.",
    "Ein Python-Skript speichert Lernfortschritt in einer SQLite-Datenbank und liest offene Kapitel wieder aus.",
    ["SQLite", "SQL", "Connection", "Cursor", "commit"]
  ),
  createWestermannChapter(
    "softwaretests",
    "Software testen",
    "Tests pruefen, ob Software die erwarteten Ergebnisse liefert. Sie helfen, Fehler frueh zu finden und Aenderungen abzusichern.",
    "Unterscheide Testfall, Testdaten, erwartetes Ergebnis, Ist-Ergebnis und Fehlerdokumentation.",
    "Testen ist nicht Misstrauen, sondern Qualitaetssicherung.",
    "Ein Test prueft, ob eine Funktion fuer Nettopreis und Mehrwertsteuer den richtigen Bruttopreis berechnet.",
    ["Testfall", "Testdaten", "Soll-Ergebnis", "Ist-Ergebnis", "Fehler"]
  ),
  createWestermannChapter(
    "tdd",
    "Testgetriebene Entwicklung",
    "Testgetriebene Entwicklung bedeutet: zuerst Test formulieren, dann Code schreiben, dann verbessern.",
    "AP1-relevant ist die Grundidee, nicht ein komplexes Framework.",
    "TDD zwingt dazu, erwartetes Verhalten klar zu beschreiben, bevor die Loesung entsteht.",
    "Vor einer Rabattfunktion wird ein Test geschrieben, der den erwarteten Endpreis prueft.",
    ["TDD", "Test zuerst", "Refactoring", "Qualitaet"]
  ),
  createWestermannChapter(
    "softwaredokumentation",
    "Software dokumentieren",
    "Dokumentation beschreibt Anforderungen, Entwurf, Bedienung, Installation, Schnittstellen, Tests und Aenderungen.",
    "Unterscheide Benutzerdokumentation, technische Dokumentation, Kommentare und Projektdokumentation.",
    "Dokumentation hilft anderen, Software zu nutzen, zu warten und zu pruefen.",
    "Eine Installationsanleitung beschreibt Voraussetzungen, Setup-Schritte und typische Fehler.",
    ["Dokumentation", "Benutzerdokumentation", "technische Dokumentation", "Kommentar"]
  )
];

AZUBIFORGE_DATA.course = {
  ...AZUBIFORGE_DATA.course,
  id: "westermann-grundstufe-lf1-5",
  title: "AzubiForge - Westermann Grundstufe LF 1-5",
  description: "Forge your Ausbildung. Trilha offline baseada na estrutura dos livros Westermann Grundstufe Lernfelder 1-5 e Arbeitsbuch: empresa, Arbeitsplatz, redes, Schutzbedarf e software/dados.",
  basis: [
    "Westermann Grundstufe LF 1-5: estrutura do Schuelerbuch e ordem dos capitulos.",
    "Westermann Arbeitsbuch Grundstufe_Lernfelder: Lernsituationen, IPERKA, Handlungsprodukte e Kompetenzchecks."
  ],
  copyrightNote: "Conteudo autoral de estudo: alinhado aos livros, sem copiar os textos do material."
};

AZUBIFORGE_DATA.modules = [
  {
    id: "start",
    title: "Start",
    subtitle: "AzubiForge Methode",
    description: "Como estudar com os livros, com alemao tecnico, exemplos de trabalho e revisao AP1.",
    chapterIds: ["introducao", "glossario-capitulo"]
  },
  {
    id: "lf1",
    title: "Lernfeld 1",
    subtitle: "Das Unternehmen und die eigene Rolle im Betrieb beschreiben",
    description: "Sistema dual, papel do Azubi, direitos e deveres, empresa, mercado, processos e apresentacao.",
    chapterIds: [
      "duales-system",
      "rechte-pflichten",
      "mitbestimmung",
      "berufsplanung",
      "modellunternehmen-jiku",
      "betriebsziele",
      "organisation-rechtsformen",
      "geschaeftsprozesse",
      "marktumfeld",
      "praesentation-teamarbeit"
    ]
  },
  {
    id: "lf2",
    title: "Lernfeld 2",
    subtitle: "Arbeitsplaetze nach Kundenwunsch ausstatten",
    description: "Arbeitsplatz-IT, Hardware, Software, Kundenanforderungen, Pflichtenheft, Kalkulation, Beschaffung e Abnahme.",
    chapterIds: [
      "eva-prinzip",
      "it-systeme-portfolio",
      "auswahlkriterien",
      "green-it",
      "wirtschaftlichkeit-it",
      "hardware",
      "mainboard",
      "cpu",
      "ram",
      "speicher-ssd-hdd",
      "netzteil",
      "gpu",
      "perifericos",
      "sistemas-operacionais",
      "kernel",
      "boot",
      "dateisysteme",
      "prozesse",
      "threads",
      "speicherverwaltung",
      "benutzer",
      "rechte",
      "arbeitsplatzsoftware",
      "kundenanforderungen",
      "projektmanagement-iperka",
      "anforderungsanalyse",
      "pflichtenheft",
      "kalkulation",
      "angebotsvergleich",
      "lieferung-abnahme"
    ]
  },
  {
    id: "lf3",
    title: "Lernfeld 3",
    subtitle: "Clients in Rechnernetzwerke einbinden",
    description: "Redes, topologias, meios, TCP/IP, enderecos, servicos, WLAN, client integration, troubleshooting e disponibilidade.",
    chapterIds: [
      "netzwerke-grundlagen",
      "lan",
      "wan",
      "wlan",
      "topologien",
      "verkabelung",
      "netzwerkmedien",
      "switch",
      "router",
      "firewall",
      "tcp-ip-modell",
      "osi",
      "osi-camada-1",
      "osi-camada-2",
      "osi-camada-3",
      "osi-camada-4",
      "osi-camada-5",
      "osi-camada-6",
      "osi-camada-7",
      "ip-adressen",
      "ipv4",
      "dns",
      "dhcp",
      "nat",
      "vpn",
      "ports",
      "tcp",
      "udp",
      "cloud-edge",
      "client-integration",
      "verbindungstest",
      "namensaufloesung",
      "netzwerk-wartung",
      "raid",
      "backup",
      "stromversorgung-it"
    ]
  },
  {
    id: "lf4",
    title: "Lernfeld 4",
    subtitle: "Schutzbedarfsanalyse im eigenen Arbeitsbereich durchfuehren",
    description: "Informationssicherheit, Datenschutz, IT-Grundschutz, Schutzbedarf, Bedrohungen, TOM e Sicherheitskonzept.",
    chapterIds: [
      "informationssicherheit",
      "datenschutz",
      "it-grundschutz",
      "schutzbedarf",
      "bedrohungen",
      "social-engineering",
      "tom",
      "sicherheitskonzept",
      "seguranca"
    ]
  },
  {
    id: "lf5",
    title: "Lernfeld 5",
    subtitle: "Software zur Verwaltung von Daten anpassen",
    description: "Softwareentwicklung, Daten, Zahlensysteme, Python, Dateien, Datenbanken, SQL, Tests e Dokumentation.",
    chapterIds: [
      "softwareentwicklung-umfeld",
      "daten-informationen",
      "zahlensysteme",
      "codierung",
      "datenarten",
      "speicherung-daten",
      "softwareprozess",
      "vorgehensmodelle",
      "anforderungsspezifikation",
      "uml",
      "programacao",
      "python-grundlagen",
      "python-kontrollstrukturen",
      "dateien-datenstroeme",
      "dateiformate",
      "banco-de-dados",
      "er-modell",
      "relationales-modell",
      "sql",
      "sqlite-python",
      "softwaretests",
      "tdd",
      "softwaredokumentation"
    ]
  }
];

const AZUBIFORGE_WESTERMANN_BY_ID = new Map(
  [...AZUBIFORGE_DATA.chapters, ...AZUBIFORGE_WESTERMANN_CHAPTERS].map((chapter) => [chapter.id, chapter])
);
const AZUBIFORGE_WESTERMANN_IDS = AZUBIFORGE_DATA.modules.flatMap((module) => module.chapterIds);
const AZUBIFORGE_WESTERMANN_ID_SET = new Set(AZUBIFORGE_WESTERMANN_IDS);
const AZUBIFORGE_HIDE_FROM_WESTERMANN_TRAIL = new Set(["redes"]);

AZUBIFORGE_DATA.chapters = [
  ...AZUBIFORGE_WESTERMANN_IDS.map((id) => AZUBIFORGE_WESTERMANN_BY_ID.get(id)).filter(Boolean),
  ...AZUBIFORGE_DATA.chapters.filter((chapter) => (
    !AZUBIFORGE_WESTERMANN_ID_SET.has(chapter.id) && !AZUBIFORGE_HIDE_FROM_WESTERMANN_TRAIL.has(chapter.id)
  ))
];

const AZUBIFORGE_WESTERMANN_GLOSSARY = [
  { word: "Ausbildungsbetrieb", translation: "empresa formadora", explanation: "Empresa onde o Azubi aprende a pratica profissional." },
  { word: "Berufsschule", translation: "escola profissional", explanation: "Escola que complementa a pratica da empresa com fundamentos teoricos." },
  { word: "IHK", translation: "camara de industria e comercio", explanation: "Instituicao responsavel por registro, acompanhamento e exames em muitos cursos duales." },
  { word: "Ausbildungsnachweis", translation: "relatorio de formacao", explanation: "Registro regular das atividades e conteudos aprendidos na Ausbildung." },
  { word: "Lastenheft", translation: "caderno de encargos do cliente", explanation: "Documento que descreve o que o cliente quer e quais objetivos devem ser atingidos." },
  { word: "Pflichtenheft", translation: "especificacao da solucao", explanation: "Documento que descreve como o fornecedor pretende realizar as exigencias do cliente." },
  { word: "Nutzwertanalyse", translation: "analise de valor util", explanation: "Metodo de comparacao que pondera criterios qualitativos e quantitativos." },
  { word: "Schutzbedarf", translation: "necessidade de protecao", explanation: "Classificacao do dano possivel para informacoes, sistemas ou processos." },
  { word: "TOM", translation: "medidas tecnicas e organizacionais", explanation: "Medidas que protegem dados e sistemas por tecnologia e regras de organizacao." },
  { word: "ER-Modell", translation: "modelo entidade-relacionamento", explanation: "Modelo para representar entidades, atributos e relacoes antes da criacao de tabelas." },
  { word: "Testfall", translation: "caso de teste", explanation: "Situacao definida para verificar se uma funcao produz o resultado esperado." }
];
const AZUBIFORGE_GLOSSARY_BY_WORD = new Map(
  [...AZUBIFORGE_DATA.glossary, ...AZUBIFORGE_WESTERMANN_GLOSSARY].map((term) => [term.word.toLowerCase(), term])
);

AZUBIFORGE_DATA.glossary = [...AZUBIFORGE_GLOSSARY_BY_WORD.values()];

function enrichChapterGuidedContent(chapter) {
  if (chapter.fullContent) return chapter;

  const terms = (chapter.ihk || "")
    .split(/[,;:]/g)
    .flatMap((part) => part.match(/[A-ZÄÖÜ][A-Za-zäöüß\-/]+/g) || [])
    .slice(0, 8);

  chapter.fullContent = buildGuidedFullContent(
    chapter.title,
    chapter.description,
    chapter.ihk || chapter.summary,
    chapter.summary,
    chapter.example,
    terms
  );
  chapter.studyTime = chapter.studyTime || chapter.fullContent.studyTime;
  chapter.difficulty = chapter.difficulty || chapter.fullContent.difficulty;

  if (!chapter.exercises?.length) {
    chapter.exercises = [
      ...chapter.fullContent.exercises.easy.slice(0, 2),
      ...chapter.fullContent.exercises.intermediate.slice(0, 1)
    ];
  }

  return chapter;
}

AZUBIFORGE_DATA.chapters = AZUBIFORGE_DATA.chapters.map(enrichChapterGuidedContent);

const AZUBIFORGE_AUTO_GLOSSARY = [];
AZUBIFORGE_DATA.chapters.forEach((chapter) => {
  (chapter.fullContent?.vocabulary || []).forEach((row) => {
    const key = row.de.toLowerCase();
    if (!AZUBIFORGE_GLOSSARY_BY_WORD.has(key)) {
      AZUBIFORGE_AUTO_GLOSSARY.push({
        word: row.de,
        translation: row.pt,
        explanation: row.explanation
      });
    }
  });
});

if (AZUBIFORGE_AUTO_GLOSSARY.length) {
  AZUBIFORGE_AUTO_GLOSSARY.forEach((term) => {
    AZUBIFORGE_GLOSSARY_BY_WORD.set(term.word.toLowerCase(), term);
  });
  AZUBIFORGE_DATA.glossary = [...AZUBIFORGE_GLOSSARY_BY_WORD.values()];
}

AZUBIFORGE_DATA.learningSituations = {
  start: [
    {
      id: "start-method",
      title: "Methode und Orientierung",
      description: "Rotina curta para estudar com os livros, revisar vocabulario e preparar AP1.",
      chapterIds: ["introducao", "glossario-capitulo"]
    }
  ],
  lf1: [
    {
      id: "lf1-rolle",
      title: "Wir beschreiben unsere Rolle im Betrieb",
      description: "Sistema dual, direitos, deveres, Mitbestimmung e planejamento pessoal.",
      chapterIds: ["duales-system", "rechte-pflichten", "mitbestimmung", "berufsplanung"]
    },
    {
      id: "lf1-betrieb",
      title: "Wir beschreiben und praesentieren unseren Ausbildungsbetrieb",
      description: "JIKU, objetivos empresariais, organizacao, processos, mercado e apresentacao.",
      chapterIds: [
        "modellunternehmen-jiku",
        "betriebsziele",
        "organisation-rechtsformen",
        "geschaeftsprozesse",
        "marktumfeld",
        "praesentation-teamarbeit"
      ]
    }
  ],
  lf2: [
    {
      id: "lf2-portfolio",
      title: "Wir erkunden das Leistungsportfolio",
      description: "Grundfunktionen, IT-Systeme, Services e escolhas orientadas ao cliente.",
      chapterIds: ["eva-prinzip", "it-systeme-portfolio"]
    },
    {
      id: "lf2-komponenten",
      title: "Wir unterscheiden Arbeitsplatzkomponenten",
      description: "Critérios, sustentabilidade, economia, hardware, Betriebssysteme e software.",
      chapterIds: [
        "auswahlkriterien",
        "green-it",
        "wirtschaftlichkeit-it",
        "hardware",
        "mainboard",
        "cpu",
        "ram",
        "speicher-ssd-hdd",
        "netzteil",
        "gpu",
        "perifericos",
        "sistemas-operacionais",
        "kernel",
        "boot",
        "dateisysteme",
        "prozesse",
        "threads",
        "speicherverwaltung",
        "benutzer",
        "rechte",
        "arbeitsplatzsoftware"
      ]
    },
    {
      id: "lf2-analyse",
      title: "Wir fuehren Anforderungsanalysen durch",
      description: "Kundenbedarf, IPERKA, Lastenheft, Pflichtenheft e calculo de servicos.",
      chapterIds: ["kundenanforderungen", "projektmanagement-iperka", "anforderungsanalyse", "pflichtenheft", "kalkulation"]
    },
    {
      id: "lf2-beschaffung",
      title: "Wir beschaffen, liefern und uebergeben",
      description: "Angebotsvergleich, Lieferung, Installation, Uebergabe e Abnahme.",
      chapterIds: ["angebotsvergleich", "lieferung-abnahme"]
    }
  ],
  lf3: [
    {
      id: "lf3-ueberblick",
      title: "Wir erarbeiten einen Netzwerkueberblick",
      description: "LAN, WAN, WLAN, Topologien, Verkabelung e Medien.",
      chapterIds: ["netzwerke-grundlagen", "lan", "wan", "wlan", "topologien", "verkabelung", "netzwerkmedien"]
    },
    {
      id: "lf3-protokolle",
      title: "Wir verstehen Datenuebertragung",
      description: "Komponenten, Modelle, Adressen, Dienste e Protokolle.",
      chapterIds: [
        "switch",
        "router",
        "firewall",
        "tcp-ip-modell",
        "osi",
        "osi-camada-1",
        "osi-camada-2",
        "osi-camada-3",
        "osi-camada-4",
        "osi-camada-5",
        "osi-camada-6",
        "osi-camada-7",
        "ip-adressen",
        "ipv4",
        "dns",
        "dhcp",
        "nat",
        "vpn",
        "ports",
        "tcp",
        "udp",
        "cloud-edge"
      ]
    },
    {
      id: "lf3-client",
      title: "Wir binden Clients ein und pruefen die Funktion",
      description: "Client integration, Verbindungstest, Namensaufloesung, Wartung e Dokumentation.",
      chapterIds: ["client-integration", "verbindungstest", "namensaufloesung", "netzwerk-wartung"]
    },
    {
      id: "lf3-verfuegbarkeit",
      title: "Wir sichern Daten und Stromversorgung",
      description: "RAID, Backup e Leistungsbedarf fuer IT-Geraete.",
      chapterIds: ["raid", "backup", "stromversorgung-it"]
    }
  ],
  lf4: [
    {
      id: "lf4-grundlagen",
      title: "Wir erarbeiten Grundlagen zur Informationssicherheit",
      description: "Schutzziele, Datenschutz, IT-Grundschutz e Sicherheitsprozess.",
      chapterIds: ["informationssicherheit", "datenschutz", "it-grundschutz"]
    },
    {
      id: "lf4-schutzbedarf",
      title: "Wir stellen Schutzbedarf fest",
      description: "Schutzbedarf, Bedrohungen, Schwachstellen, Risiko e Schadensszenarien.",
      chapterIds: ["schutzbedarf", "bedrohungen"]
    },
    {
      id: "lf4-massnahmen",
      title: "Wir planen Massnahmen und Sicherheitskonzept",
      description: "Social Engineering, TOM, Sicherheitskonzept e AP1-Security-Grundlagen.",
      chapterIds: ["social-engineering", "tom", "sicherheitskonzept", "seguranca"]
    }
  ],
  lf5: [
    {
      id: "lf5-daten",
      title: "Wir analysieren Daten und Softwareumfeld",
      description: "Softwareentwicklung, Daten, Informationen, Zahlensysteme, Codierung e Speicherung.",
      chapterIds: [
        "softwareentwicklung-umfeld",
        "daten-informationen",
        "zahlensysteme",
        "codierung",
        "datenarten",
        "speicherung-daten"
      ]
    },
    {
      id: "lf5-prozess",
      title: "Wir entwerfen Softwareloesungen",
      description: "Softwareprozess, Vorgehensmodelle, Spezifikation e UML.",
      chapterIds: ["softwareprozess", "vorgehensmodelle", "anforderungsspezifikation", "uml"]
    },
    {
      id: "lf5-python",
      title: "Wir programmieren einfache Anwendungen",
      description: "Programmierlogik, Python, Kontrollstrukturen, Dateien e Dateiformate.",
      chapterIds: ["programacao", "python-grundlagen", "python-kontrollstrukturen", "dateien-datenstroeme", "dateiformate"]
    },
    {
      id: "lf5-datenbanken",
      title: "Wir verwalten Daten mit Datenbanken",
      description: "Datenbanksysteme, ER-Modell, relationales Modell, SQL e SQLite mit Python.",
      chapterIds: ["banco-de-dados", "er-modell", "relationales-modell", "sql", "sqlite-python"]
    },
    {
      id: "lf5-test-doku",
      title: "Wir testen und dokumentieren Software",
      description: "Testfaelle, TDD, Fehlerdokumentation e technische Dokumentation.",
      chapterIds: ["softwaretests", "tdd", "softwaredokumentation"]
    }
  ]
};

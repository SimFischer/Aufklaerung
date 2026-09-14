# Aufklärung

Zwei Unterrichtseinheiten für die Jahrgangsstufe 11, als statische Website.
Kein Server, keine Datenbank, keine externen Anfragen, keine Cookies. Es werden
keine Daten der Lernenden gespeichert oder übertragen.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit den Links zu beiden Einheiten |
| `lernstrecke.html` | Drei Kapitel: Bürgertum, Tugend und Moral, Rolle der Frau — je Fachtext und Aufgaben |
| `zitate-puzzle.html` | Zuordnungsübung mit vierzehn Zitaten der Aufklärung |
| `lernnotizen-pdf.js` | PDF-Download für Texte, Antworten, Lösungen und eigene Notizen; lokal ohne externe Bibliotheken |
| `.nojekyll` | leere Datei; verhindert, dass GitHub die Dateien durch Jekyll schickt |

---

## Veröffentlichen über GitHub Pages

Einmalig etwa fünf Minuten. Danach funktioniert der Link dauerhaft auf jedem
Gerät, auch auf dem iPad.

1. Auf [github.com](https://github.com) anmelden. Ein kostenloses Konto genügt.
2. Oben rechts auf **+** → **New repository**.
3. Namen vergeben, zum Beispiel `aufklaerung`.
   Sichtbarkeit auf **Public** stellen — Pages ist für private Repositories nur
   in kostenpflichtigen Tarifen verfügbar.
4. **Create repository**.
5. Auf der folgenden Seite auf **uploading an existing file** klicken. Der Link
   steht mitten im Text. Dann alle Dateien dieses Ordners hineinziehen.
6. Unten auf **Commit changes**.
7. Im Repository auf **Settings**, links auf **Pages**.
8. Bei *Source* **Deploy from a branch**, bei *Branch* **main** und **/ (root)**,
   dann **Save**.
9. Ein bis zwei Minuten warten, **Settings → Pages** neu laden. Oben steht die
   Adresse, etwa `https://deinbenutzername.github.io/aufklaerung/`

Diese Adresse in itslearning als Ressource **Link zu einer Website** eintragen.

### Wichtig beim Hochladen

Die Datei `.nojekyll` beginnt mit einem Punkt und wird auf dem Mac im Finder
und unter Windows im Explorer standardmäßig ausgeblendet. Auf dem Mac mit
`Cmd + Shift + .` einblenden, unter Windows über *Ansicht → Ausgeblendete
Elemente*. Fehlt die Datei, funktioniert die Seite in aller Regel trotzdem.

Die Datei `index.html` muss genau so heißen, sonst zeigt Pages keine Startseite.

### Später etwas ändern

Im Repository auf die Datei klicken, dann auf das Stiftsymbol. Nach
**Commit changes** ist die Änderung nach ein bis zwei Minuten online.

---

## Ohne GitHub

Auf einem Rechner genügt ein Doppelklick auf `index.html`; die Links zwischen
den Seiten funktionieren, solange alle Dateien im selben Ordner liegen.

Auf dem iPad ist das **nicht** zuverlässig: Die Vorschau der Dateien-App führt
kein JavaScript aus, die Übungen bleiben dann unbedienbar. Für Tablet-Klassen
deshalb der Weg über einen Link — oder über ein SCORM-Paket in itslearning.

Für Papier: auf jeder Seite die Druckfunktion des Browsers verwenden. Es
erscheint eine reduzierte Schwarz-Weiß-Fassung ohne Bedienelemente.

---

## Inhalte anpassen

Alle Inhalte stehen in den HTML-Dateien selbst, jeweils im `<script>`-Block am
Ende beziehungsweise im Text darüber.

**Lernstrecke.** Die Fachtexte stehen als normaler HTML-Text in den drei
`<article class="fachtext">`-Bereichen. Ein erklärbedürftiger Begriff wird so
ausgezeichnet:

```html
<button class="wort" data-erk="Hier steht die Erklärung.">Begriff</button>
```

Die Aufgaben stehen im Objekt `AUFGABEN`, sortiert nach `k1`, `k2`, `k3`. Jede
Aufgabe hat ein Feld `typ`; verfügbar sind `zuordnen`, `reihenfolge`, `auswahl`,
`luecke`, `quiz` und `wege`. Eine Aufgabe zu löschen oder zu ergänzen heißt,
einen Eintrag aus der Liste zu entfernen oder hinzuzufügen — Nummerierung und
Fortschrittsanzeige passen sich selbst an.

**Zitate-Puzzle.** Die Paare stehen in `PAARE`, jeweils mit `a` (Anfang),
`b` (Schluss), `q` (Quelle) und `t` (Tipp). Auch hier rechnet die Seite mit der
Länge der Liste, nicht mit der festen Zahl vierzehn.

---

## Quellen und Rechte

Die drei Fachtexte der Lernstrecke sind eigens für dieses Material geschrieben
und geben den Forschungsstand in eigener Formulierung wieder. Sie enthalten
keine Zitate aus geschützten Darstellungen.

Die Zitate im Puzzle stammen von Kant, Lichtenberg, Montesquieu, Rousseau und
Schiller und sind gemeinfrei; sie sind im Puzzle mit Werk und Jahr ausgewiesen.
Fünf Einträge sind dort als *Sekundärtext zur Aufklärung* gekennzeichnet. Sie
stammen aus dem Arbeitsblatt, aus dem das Puzzle entstanden ist, und ihre
Herkunft ist nicht vermerkt. Für ein öffentliches Repository empfiehlt sich
eines von dreien: die Quelle im Feld `q` nachtragen, die Einträge aus `PAARE`
löschen, oder das Material nicht öffentlich, sondern über itslearning verteilen.

Der Modellfall im dritten Kapitel der Lernstrecke ist erfunden und bildet die
Verhältnisse typisierend ab. Er ist kein überliefertes Einzelschicksal.

---

## Technisches

Statische HTML-Dateien mit einem lokalen JavaScript-Modul für den PDF-Export, ohne externe Abhängigkeiten. Systemschriften,
also keine Verbindung zu Google Fonts. Responsiv bis Handybreite, Bedienung per
Tastatur mit sichtbarem Fokus, `prefers-reduced-motion` wird beachtet, eigene
Druckansicht je Seite.

Im Zitate-Puzzle ist zusätzlich eine optionale SCORM-1.2-Anbindung enthalten. In
einem LMS meldet die Seite Fortschritt und Abschluss zurück; außerhalb eines LMS
bleibt dieser Teil wirkungslos.

## Lernnotizen als PDF

Am Ende beider Einheiten gibt es den Button **Texte und Ergebnisse als PDF herunterladen**. Die Lernstrecke exportiert alle drei Fachtexte, Begriffserklärungen, den aktuellen Antwortstand aller Aufgaben, getrennt bezeichnete Lösungen und Quellen. Das Zitate-Puzzle enthält alle vollständigen Texte samt Quellen und den aktuellen Zuordnungsstand. Ein optionales Textfeld ergänzt eigene Notizen und offene Fragen.

Der Download funktioniert auch vor Abschluss. Die PDF-Erzeugung erfolgt lokal, ohne Server oder externe Bibliothek. Eingaben werden nicht dauerhaft gespeichert: PDF vor Neuladen oder Schließen sichern. Beim erneuten Hochladen müssen die HTML-Dateien und `lernnotizen-pdf.js` zusammen im selben Ordner liegen. Auf iPads kann das PDF über die Download-/Teilen-Funktion in „Dateien“ gesichert werden.

Technik: A4 mit automatischem Zeilen- und Seitenumbruch sowie Seitenzahlen. Der deutsche Text bleibt markierbar; Zeilen mit Zeichen außerhalb von WinAnsi werden zur vollständigen Zeichendarstellung als hochauflösende Bilder eingebettet.

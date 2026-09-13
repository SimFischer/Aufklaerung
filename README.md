# Zitate-Puzzle: Aufklärung

Interaktives Zuordnungs-Arbeitsblatt für den Deutschunterricht, Jahrgangsstufe 11.
Vierzehn Zitate zur Epoche der Aufklärung (Kant, Lichtenberg, Montesquieu,
Rousseau, Schiller sowie Sekundärtexte) sind in Anfang und Schluss zerlegt und
müssen wieder zusammengesetzt werden.

Die Seite läuft vollständig im Browser. Es gibt keinen Server, keine Datenbank,
keine externen Anfragen und keine Cookies. Es werden keine Daten der Lernenden
gespeichert oder übertragen.

---

## Auf GitHub Pages veröffentlichen

Einmalig etwa fünf Minuten, danach funktioniert der Link dauerhaft auf jedem
Gerät — auch auf dem iPad.

1. Auf [github.com](https://github.com) anmelden (kostenloses Konto genügt).
2. Oben rechts auf **+** → **New repository**.
3. Einen Namen vergeben, zum Beispiel `zitate-puzzle`.
   Sichtbarkeit auf **Public** stellen — GitHub Pages ist für private
   Repositories nur in kostenpflichtigen Tarifen verfügbar.
4. **Create repository**.
5. Auf der nächsten Seite auf **uploading an existing file** klicken
   (der Link steht mitten im Text) und die drei Dateien aus diesem Ordner
   hineinziehen: `index.html`, `README.md`, `.nojekyll`.
6. Unten auf **Commit changes** klicken.
7. Im Repository oben auf **Settings**, links in der Leiste auf **Pages**.
8. Unter *Build and deployment* bei *Source* **Deploy from a branch** wählen,
   bei *Branch* **main** und den Ordner **/ (root)**, dann **Save**.
9. Ein bis zwei Minuten warten, dann die Seite **Settings → Pages** neu laden.
   Oben steht jetzt die Adresse, ungefähr so:
   `https://deinbenutzername.github.io/zitate-puzzle/`

Diese Adresse kommt in itslearning als Ressource **Link zu einer Website**.
Die Lernenden tippen darauf und das Puzzle öffnet sich direkt im Safari.

### Später etwas ändern

Im Repository auf `index.html` klicken, dann auf das Stiftsymbol. Nach
**Commit changes** ist die Änderung nach ein bis zwei Minuten online. Neue
Zitate stehen ganz unten im Skript im Block `const PAARE = [ … ]`, jeweils als
`a` (Anfang), `b` (Schluss), `q` (Quelle) und `t` (Tipp).

---

## Ohne GitHub verwenden

Die Datei `index.html` läuft auch offline. Auf einem Rechner genügt ein
Doppelklick. Auf dem iPad ist das nicht zuverlässig: Die Vorschau der
Dateien-App führt kein JavaScript aus, das Puzzle bleibt dann unbedienbar.
Deshalb für Tablet-Klassen der Weg über einen Link.

Für Papier: im Puzzle auf **Drucken** klicken. Es erscheint eine reduzierte
Schwarz-Weiß-Fassung ohne Bedienelemente und ohne Lösungen — als klassisches
Arbeitsblatt oder, aufgeschnitten, als Legespiel für Gruppenarbeit.

---

## Bedienung

Links einen Satzanfang antippen, dann rechts den passenden Schluss. Das Paar
wird mit Nummer und Buchstabe markiert. Ein erneuter Tipp auf den Satzanfang
löst das Paar wieder.

**Prüfen** rastet richtige Paare ein, blendet erst dann die Quelle ein und löst
falsche Paare auf. **Tipp geben** liefert einen inhaltlichen Denkanstoß zu einem
offenen Zitat, nicht die Lösung. **Neu mischen** startet von vorn.

Der Balken oben zeigt den Fortschritt.

---

## Hinweis zur Aufgabe

Die beiden Montesquieu-Zitate beginnen fast gleich und beide Schlüsse handeln
von „Beziehungen". Das ist Absicht: Hier merken die Lernenden, dass
grammatische Anschlussfähigkeit nicht genügt. Das Pronomen „ihr" im einen
Schluss braucht die „ursprüngliche Vernunft" aus dem Anfang als Bezugswort.

---

## Technisches

Eine einzelne HTML-Datei, rund 19 KB, ohne Abhängigkeiten. Systemschriften,
also keine Verbindung zu Google Fonts. Responsiv bis zur Handybreite,
Tastaturbedienung mit sichtbarem Fokus, `prefers-reduced-motion` wird beachtet,
eigene Druckansicht.

Eingebaut ist außerdem eine optionale SCORM-1.2-Anbindung. In einem LMS meldet
die Seite Fortschritt und Abschluss zurück; außerhalb eines LMS bleibt dieser
Teil wirkungslos. Für die Nutzung als SCORM-Paket braucht es zusätzlich eine
`imsmanifest.xml` — auf GitHub Pages wird sie nicht benötigt.

Die Zitate sind gemeinfrei. Die Sekundärtexte stammen aus dem ursprünglichen
Arbeitsblatt und sollten vor einer Weitergabe über den Unterricht hinaus
belegt werden.

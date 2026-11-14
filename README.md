# Studyraf

Leerplatform voor PXL-studenten: per vak een leerpad met korte lessen, oefeningen en directe feedback van **Raf**, de giraf. Inloggen via Firebase, voortgang per gebruiker.

## Raf

| Pose | Bestand | Gebruik |
|---|---|---|
| Neutral confident | `assets/raf/raf-neutral.png` | Startscherm, vakkenoverzicht |
| Celebrating | `assets/raf/raf-celebrating.png` | Juist antwoord, les afgerond |
| Thinking | `assets/raf/raf-thinking.png` | Laden, hint |
| Unimpressed | `assets/raf/raf-unimpressed.png` | Fout antwoord |

`assets/raf/raf-sheet.jpg` is het originele ontwerpblad.

## Branches

- `main`: stabiel
- `dev`: integratie
- `feature/*`: werk in uitvoering

## Een vak offline halen

In `js/vakken.js` heeft elk vak `online: true`. Zet je dat op `online: false`:

- **Live site** (GitHub Pages, vanaf `main`): het vak staat als "Binnenkort" in de hub, en de pagina's van het vak sturen terug naar de hub.
- **Lokaal** (localhost, bv. WebStorm op `dev`): het vak blijft bruikbaar, met het label "Offline op main".

Terug online zetten: `online: true`, mergen naar `main`.

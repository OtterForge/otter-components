# Otter Components

Tokenbasierte, zugängliche React-/TypeScript-Komponentenbibliothek mit Light-, Dark- und System-Theme, globaler Dichte, Kontrastvarianten und abschaltbaren Animationen.

## Entwicklung

```bash
npm install
npm run dev
```

Die Preview läuft standardmäßig unter `http://localhost:5173` und dient gleichzeitig als Entwicklungsumgebung und Grundlage der späteren Dokumentation.

## Scripts

- `npm run dev` – startet die interaktive Komponenten-Preview
- `npm run build:lib` – erzeugt das veröffentlichbare Package in `dist/`
- `npm run build:preview` – erzeugt die statische Preview in `preview-dist/`
- `npm run build` – baut Library und Preview
- `npm run typecheck` – prüft sämtliche TypeScript-Typen
- `npm test` – führt Tests einmalig aus
- `npm run test:watch` – startet Tests im Watch-Modus

## Verwendung

```tsx
import { Button, ThemeProvider, TooltipProvider } from '@otter/components';
import '@otter/components/styles.css';

export const App = () => {
  return (
    <ThemeProvider primaryColor="#20ada4" secondaryColor="#8b5cf6">
      <TooltipProvider>
        <Button title="Änderungen speichern">Speichern</Button>
      </TooltipProvider>
    </ThemeProvider>
  );
};
```

Der `TooltipProvider` übernimmt native `title`-Attribute automatisch und ersetzt sie durch ein einheitlich gestaltetes Tooltip-Popup.

`primaryColor` und `secondaryColor` sind verpflichtend. Der Provider berechnet daraus automatisch die vollständigen Farbskalen von `50` bis `900`, setzt alle zugehörigen CSS Custom Properties und bestimmt kontrastgerechte Textfarben für Aktionsflächen. Unterstützt werden drei- und sechsstellige Hex-Farben.

Die Schriftfamilien lassen sich ebenfalls zentral setzen:

```tsx
<ThemeProvider
  primaryColor="#20ada4"
  secondaryColor="#8b5cf6"
  fontFamily="Inter, sans-serif"
  monoFontFamily="Roboto Mono, monospace"
>
  <App />
</ThemeProvider>
```

Die Textrollen `display`, `h1`, `h2`, `bodyLarge`, `body`, `meta`, `caption` und `micro` skalieren automatisch mit der globalen Dichte. `S` verwendet 90 %, `M` 100 % und `L` 112,5 % der definierten Basisgrößen. Komponenten greifen ausschließlich auf diese Rollen beziehungsweise deren Alias-Tokens zurück.

## Struktur

```text
src/
  components/       eine Komponente pro Ordner
  constants/        stabile Schlüssel und Konfiguration
  hooks/            wiederverwendbare React-Logik
  providers/        Theme- und Tooltip-Kontext
  styles/           globale Tokens und Basisregeln
  types/            gemeinsam verwendete Typen
  utils/            frameworknahe Hilfsfunktionen
preview/
  components/       Preview-spezifische Bausteine
  App.tsx            Komponentenübersicht und Demos
```

Subcomponents wie `AccordionItem`, `ListItem`, `ToastItem`, `ComboBoxOption` und `DropdownOption` liegen jeweils in eigenen Unterordnern ihrer übergeordneten Komponente.

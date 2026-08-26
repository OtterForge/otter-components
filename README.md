# Otter Components

An accessible, token-driven React and TypeScript component library with light, dark, and system themes, responsive density settings, contrast modes, and optional motion.

## Features

- React 18+ and TypeScript
- CSS Custom Properties for colors, typography, spacing, radii, motion, and component states
- Runtime-generated primary and secondary color scales from `50` to `900`
- Light, dark, and system themes
- Small, medium, and large density modes that scale typography, spacing, controls, icons, and supporting UI
- Standard, high-contrast, and color-vision-deficiency modes
- Motion can be disabled globally and respects `prefers-reduced-motion`
- Keyboard-accessible custom ComboBox, Dropdown, Accordion, sliders, and form controls
- Styled tooltips that replace native `title` popups
- Font Awesome class-based icons
- Interactive documentation and component preview

## Installation

```bash
npm install @otterforge/components
```

React and React DOM are peer dependencies and must be available in the consuming application.

## Basic usage

```tsx
import { Button, ThemeProvider, ToastProvider, TooltipProvider } from '@otterforge/components';
import '@otterforge/components/styles.css';

export const App = () => (
  <ThemeProvider primaryColor="#20ada4" secondaryColor="#8b5cf6">
    <TooltipProvider>
      <ToastProvider>
        <Button title="Saves all changes">Save changes</Button>
      </ToastProvider>
    </TooltipProvider>
  </ThemeProvider>
);
```

`primaryColor` and `secondaryColor` are required. Both accept three- or six-digit hexadecimal colors. The provider generates complete color scales and readable foreground colors at runtime.

Interactive states such as focus, hover, active, selected, sliders, progress, and form controls are derived from the primary palette. The secondary palette is reserved for complementary and decorative accents.

## Theme provider

```tsx
<ThemeProvider
  primaryColor="#20ada4"
  secondaryColor="#8b5cf6"
  fontFamily="Inter, sans-serif"
  monoFontFamily="Roboto Mono, monospace"
  defaultTheme="system"
  defaultDensity="m"
  defaultContrast="standard"
  defaultMotion="on"
  persist
>
  <App />
</ThemeProvider>
```

Available settings:

| Setting     | Values                    | Default    |
| ----------- | ------------------------- | ---------- |
| Theme       | `light`, `dark`, `system` | `system`   |
| Density     | `s`, `m`, `l`             | `m`        |
| Contrast    | `standard`, `high`, `cvd` | `standard` |
| Motion      | `on`, `off`               | `on`       |
| Persistence | `true`, `false`           | `true`     |

Settings can be changed at runtime with `useTheme`:

```tsx
import { Button, useTheme } from '@otterforge/components';

export const ThemeControls = () => {
  const { theme, setTheme, density, setDensity } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle theme</Button>
      <Button variant="secondary" onClick={() => setDensity(density === 'l' ? 'm' : 'l')}>
        Toggle density
      </Button>
    </div>
  );
};
```

## Typography and density

Components use semantic typography roles instead of fixed font sizes:

- `--otter-fs-display`
- `--otter-fs-h1`
- `--otter-fs-h2`
- `--otter-fs-body-lg`
- `--otter-fs-body`
- `--otter-fs-meta`
- `--otter-fs-caption`
- `--otter-fs-micro`

Density affects the complete interface rather than only form controls:

- `s`: 90% typography scale and compact controls
- `m`: 100% typography scale and standard controls
- `l`: 112.5% typography scale and larger controls

Spacing, avatars, icons, spinners, status indicators, slider tracks, lists, tables, and documentation examples scale with the same setting.

## CSS tokens and utilities

Application styles can consume the public tokens directly:

```css
.custom-panel {
  padding: var(--otter-space-4);
  border: 1px solid var(--otter-border);
  border-radius: var(--otter-radius-lg);
  background: var(--otter-surface);
  color: var(--otter-text);
}
```

Use semantic tokens such as `--otter-action`, `--otter-focus`, `--otter-success`, or `--otter-surface` before choosing a palette shade directly.

Scrollable containers can use the included scrollbar utility:

```tsx
export const ScrollablePanel = () => (
  <div className="otter-scrollbar" style={{ maxHeight: 320, overflow: 'auto' }}>
    Content
  </div>
);
```

The scrollbar has a transparent track, rounded thumb, and no scrollbar buttons.

## Icons

Font Awesome is included and icons are selected through CSS class names:

```tsx
import { IconButton } from '@otterforge/components';

export const SettingsButton = () => (
  <IconButton label="Open settings" icon={<i className="fas fa-gear" />} />
);
```

Use `fas`, `far`, or another supported Font Awesome style together with the glyph class. Icon-only controls must always provide an accessible label.

## Toasts

Wrap the application in `ToastProvider` and call `useToast` from a descendant:

```tsx
import { Button, useToast } from '@otterforge/components';

export const SaveButton = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Changes saved',
          description: 'Everything is up to date.',
          variant: 'success',
        })
      }
    >
      Save changes
    </Button>
  );
};
```

Toast variants are `default`, `info`, `success`, `warning`, and `error`. The legacy `danger` value remains supported for compatibility.

## Components

### Foundations

- `ThemeProvider`
- `TooltipProvider`
- `Heading`
- `Text`

### Actions

- `Button`
- `IconButton`

### Inputs

- `Input`
- `Textarea`
- `Checkbox`
- `Radio`
- `Switch`
- `ComboBox`
- `Dropdown`
- `Slider`
- `RangeSlider`

### Data display

- `Accordion` and `AccordionItem`
- `List` and `ListItem`
- `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeader`, and `TableCell`
- `Card`
- `Avatar`
- `AvatarStack`
- `ImageGrid`
- `Separator`

### Feedback and navigation

- `Alert`
- `StatusIndicator`
- `Progress`
- `Spinner`
- `ToastProvider` and `useToast`
- `Pagination`

## Accessibility

- Visible keyboard focus states use primary-derived semantic tokens.
- Custom selection controls support expected arrow, Enter, and Escape behavior.
- Icon buttons require accessible labels.
- Status is never communicated through color alone.
- Motion can be disabled and respects the operating system preference.
- `TooltipProvider` converts native `title` attributes into consistently styled, keyboard-accessible tooltips.

## Development

```bash
npm install
npm run dev
```

The interactive documentation is available at `http://localhost:5173` by default. Every component has its own documentation route with examples, usage guidance, and previous/next navigation.

## Scripts

| Command                 | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Start the interactive documentation in development mode |
| `npm run preview`       | Preview the production documentation build              |
| `npm run build:lib`     | Build the publishable package into `dist/`              |
| `npm run build:preview` | Build the documentation into `preview-dist/`            |
| `npm run build`         | Build both the library and documentation                |
| `npm run lint`          | Run ESLint                                              |
| `npm run lint:fix`      | Run ESLint and apply safe fixes                         |
| `npm run format`        | Format the project with Prettier                        |
| `npm run format:check`  | Check formatting without modifying files                |
| `npm run typecheck`     | Validate TypeScript types                               |
| `npm test`              | Run the test suite once                                 |
| `npm run test:watch`    | Run tests in watch mode                                 |

## Project structure

```text
src/
  components/       One folder per component
  constants/        Stable keys and configuration
  hooks/            Reusable React behavior
  providers/        Theme and tooltip context
  styles/           Tokens, base styles, and utilities
  types/            Shared TypeScript types
  utils/            Framework-independent helpers
preview/
  components/       Documentation-specific components
  content/          Component documentation metadata
  hooks/            Documentation routing hooks
  App.tsx            Documentation application
```

Subcomponents such as `AccordionItem`, `ListItem`, `ToastItem`, `ComboBoxOption`, and `DropdownOption` live in dedicated folders below their parent component.

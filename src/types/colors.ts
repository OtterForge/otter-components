export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ColorScale = Record<ColorShade, string>;

export type ThemeColorVariables = Record<
  | `--otter-primary-${ColorShade}`
  | `--otter-secondary-${ColorShade}`
  | '--otter-on-primary-400'
  | '--otter-on-primary-600'
  | '--otter-on-secondary-500',
  string
>;

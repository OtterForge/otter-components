import type { ColorScale, ColorShade, ThemeColorVariables } from '../types/colors';

interface RgbColor {
  red: number;
  green: number;
  blue: number;
}

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const MIXES: Record<ColorShade, { target: '#ffffff' | '#000000'; amount: number }> = {
  50: { target: '#ffffff', amount: 0.94 },
  100: { target: '#ffffff', amount: 0.86 },
  200: { target: '#ffffff', amount: 0.7 },
  300: { target: '#ffffff', amount: 0.48 },
  400: { target: '#ffffff', amount: 0.23 },
  500: { target: '#ffffff', amount: 0 },
  600: { target: '#000000', amount: 0.12 },
  700: { target: '#000000', amount: 0.26 },
  800: { target: '#000000', amount: 0.4 },
  900: { target: '#000000', amount: 0.54 },
};

const normalizeHex = (color: string): string => {
  const value = color.trim().replace(/^#/, '');
  const expanded =
    value.length === 3
      ? value
          .split('')
          .map((character) => character.repeat(2))
          .join('')
      : value;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) {
    throw new Error(`Invalid theme color "${color}". Use a three- or six-digit hexadecimal color.`);
  }

  return `#${expanded.toLowerCase()}`;
};

const hexToRgb = (color: string): RgbColor => {
  const hex = normalizeHex(color).slice(1);
  return {
    red: Number.parseInt(hex.slice(0, 2), 16),
    green: Number.parseInt(hex.slice(2, 4), 16),
    blue: Number.parseInt(hex.slice(4, 6), 16),
  };
};

const toHexPart = (value: number): string => Math.round(value).toString(16).padStart(2, '0');

const rgbToHex = ({ red, green, blue }: RgbColor): string =>
  `#${toHexPart(red)}${toHexPart(green)}${toHexPart(blue)}`;

const mixColors = (color: string, target: string, amount: number): string => {
  const sourceRgb = hexToRgb(color);
  const targetRgb = hexToRgb(target);
  return rgbToHex({
    red: sourceRgb.red + (targetRgb.red - sourceRgb.red) * amount,
    green: sourceRgb.green + (targetRgb.green - sourceRgb.green) * amount,
    blue: sourceRgb.blue + (targetRgb.blue - sourceRgb.blue) * amount,
  });
};

const relativeLuminance = (color: string): number => {
  const channels = Object.values(hexToRgb(color)).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

export const createColorScale = (color: string): ColorScale => {
  const baseColor = normalizeHex(color);
  return Object.fromEntries(
    SHADES.map((shade) => {
      const { target, amount } = MIXES[shade];
      return [shade, mixColors(baseColor, target, amount)];
    }),
  ) as ColorScale;
};

export const getReadableTextColor = (background: string): '#ffffff' | '#101719' =>
  relativeLuminance(background) > 0.42 ? '#101719' : '#ffffff';

export const createThemeColorVariables = (
  primaryColor: string,
  secondaryColor: string,
): ThemeColorVariables => {
  const primary = createColorScale(primaryColor);
  const secondary = createColorScale(secondaryColor);
  const variables = {} as ThemeColorVariables;

  SHADES.forEach((shade) => {
    variables[`--otter-primary-${shade}`] = primary[shade];
    variables[`--otter-secondary-${shade}`] = secondary[shade];
  });
  variables['--otter-on-primary-400'] = getReadableTextColor(primary[400]);
  variables['--otter-on-primary-600'] = getReadableTextColor(primary[600]);
  variables['--otter-on-secondary-500'] = getReadableTextColor(secondary[500]);

  return variables;
};

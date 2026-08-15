import {
  createContext,
  type CSSProperties,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { STORAGE_KEYS } from '../../constants/storage';
import type { ContrastMode, Density, MotionMode, ThemeMode } from '../../types/theme';
import { createThemeColorVariables } from '../../utils/colors';

interface ThemeContextValue {
  theme: ThemeMode;
  density: Density;
  contrast: ContrastMode;
  motion: MotionMode;
  setTheme: (value: ThemeMode) => void;
  setDensity: (value: Density) => void;
  setContrast: (value: ContrastMode) => void;
  setMotion: (value: MotionMode) => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);
export interface ThemeProviderProps extends PropsWithChildren {
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  monoFontFamily?: string;
  defaultTheme?: ThemeMode;
  defaultDensity?: Density;
  defaultContrast?: ContrastMode;
  defaultMotion?: MotionMode;
  persist?: boolean;
  className?: string;
}

export const ThemeProvider = ({
  children,
  primaryColor,
  secondaryColor,
  fontFamily = "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
  monoFontFamily = "'Roboto Mono', 'SFMono-Regular', Consolas, monospace",
  defaultTheme = 'system',
  defaultDensity = 'm',
  defaultContrast = 'standard',
  defaultMotion = 'on',
  persist = true,
  className,
}: ThemeProviderProps) => {
  const read = <T,>(key: string, fallback: T): T =>
    persist && typeof localStorage !== 'undefined'
      ? ((localStorage.getItem(key) as T) ?? fallback)
      : fallback;
  const [theme, setTheme] = useState<ThemeMode>(() => read(STORAGE_KEYS.theme, defaultTheme));
  const [density, setDensity] = useState<Density>(() => read(STORAGE_KEYS.density, defaultDensity));
  const [contrast, setContrast] = useState<ContrastMode>(() =>
    read(STORAGE_KEYS.contrast, defaultContrast),
  );
  const [motion, setMotion] = useState<MotionMode>(() => read(STORAGE_KEYS.motion, defaultMotion));
  useEffect(() => {
    if (!persist) return;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    localStorage.setItem(STORAGE_KEYS.density, density);
    localStorage.setItem(STORAGE_KEYS.contrast, contrast);
    localStorage.setItem(STORAGE_KEYS.motion, motion);
  }, [contrast, density, motion, persist, theme]);
  const value = useMemo(
    () => ({ theme, density, contrast, motion, setTheme, setDensity, setContrast, setMotion }),
    [contrast, density, motion, theme],
  );
  const colorVariables = useMemo(
    () => createThemeColorVariables(primaryColor, secondaryColor),
    [primaryColor, secondaryColor],
  );
  const providerStyle = useMemo(
    () =>
      ({
        ...colorVariables,
        '--otter-font': fontFamily,
        '--otter-font-mono': monoFontFamily,
      }) as CSSProperties,
    [colorVariables, fontFamily, monoFontFamily],
  );
  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`otter-root${className ? ` ${className}` : ''}`}
        data-otter-theme={theme}
        data-otter-density={density}
        data-otter-contrast={contrast}
        data-otter-motion={motion}
        style={providerStyle}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside ThemeProvider');
  return value;
};

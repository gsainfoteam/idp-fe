import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  setTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (typeof window !== 'undefined' &&
        (localStorage.getItem('theme') as Theme)) ||
      'system',
  );

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  const applyTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      root.classList.add(systemTheme);
      localStorage.removeItem('theme');
    } else {
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, systemTheme]);

  const updateSystemTheme = useCallback(() => {
    const newSystemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    setSystemTheme(newSystemTheme);
    applyTheme();
  }, [theme, applyTheme]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme();
  };

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateSystemTheme();

    handler();

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [updateSystemTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, systemTheme, setTheme: updateTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, systemTheme } = context;

  const isDark = useMemo(
    () => theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
    [theme, systemTheme],
  );

  return { isDark, ...context };
}

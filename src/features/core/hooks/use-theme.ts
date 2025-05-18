import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.theme as Theme) || 'system',
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      localStorage.removeItem('theme');
    } else {
      root.classList.add(theme);
      localStorage.theme = theme;
    }
  }, [theme]);

  const isDark = () =>
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const isLight = () => !isDark();

  return { theme, setTheme, isDark, isLight };
};

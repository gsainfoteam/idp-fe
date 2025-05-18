import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.theme as Theme) || 'system',
  );
  const [systemTheme, setSystemTheme] = useState<Exclude<Theme, 'system'>>(
    () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (resolvedTheme: Exclude<Theme, 'system'>) => {
      root.classList.remove('light', 'dark');
      root.classList.add(resolvedTheme);
    };

    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      applyTheme(mediaQuery.matches ? 'dark' : 'light');
      localStorage.removeItem('theme');
    } else {
      applyTheme(theme);
      localStorage.theme = theme;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, systemTheme, setTheme };
};

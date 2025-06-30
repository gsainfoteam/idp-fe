import { useLayoutEffect, useMemo } from 'react';
import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  systemTheme: 'light' | 'dark';
  setTheme: (newTheme: Theme) => void;
  updateSystemTheme: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'system',
  systemTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',

  setTheme: (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (newTheme === 'system') {
      const systemPref = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemPref);
      localStorage.removeItem('theme');
      set({ theme: 'system', systemTheme: systemPref });
    } else {
      root.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
      set({ theme: newTheme });
    }
  },

  updateSystemTheme: () => {
    const newSystemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    set({ systemTheme: newSystemTheme });

    const theme = localStorage.getItem('theme') as Theme;
    if (!theme || theme === 'system') {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newSystemTheme);
    }
  },
}));

export function useTheme() {
  const { theme, systemTheme, setTheme, updateSystemTheme } = useThemeStore();

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateSystemTheme();

    handler();

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [updateSystemTheme]);

  const isDark = useMemo(
    () => theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
    [theme, systemTheme],
  );

  return { theme, systemTheme, setTheme, isDark };
}

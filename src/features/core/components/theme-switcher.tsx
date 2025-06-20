import { Theme, useTheme } from '../hooks/use-theme';

import AutoModeIcon from '@/assets/icons/solid/auto-mode.svg?react';
import LightModeIcon from '@/assets/icons/line/light-mode.svg?react';
import DarkModeIcon from '@/assets/icons/line/dark-mode.svg?react';
import { cn } from '../utils/cn';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, isDark } = useTheme();

  const handleClick = () => {
    const themes: Theme[] = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]!);
  };

  const color = isDark ? 'text-[#ffffff]' : 'text-[#000000]';

  return (
    <button
      type="button"
      className={cn('h-fit w-fit cursor-pointer', className)}
      onClick={handleClick}
    >
      {theme === 'system' ? (
        <AutoModeIcon width={30} height={30} className={color} />
      ) : theme === 'light' ? (
        <LightModeIcon width={30} height={30} className={color} />
      ) : (
        <DarkModeIcon width={30} height={30} className={color} />
      )}
    </button>
  );
}

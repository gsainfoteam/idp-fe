import { Theme, useTheme } from '../hooks/use-theme';

import AutoLightIcon from '@/assets/icons/line/auto-light-mode.svg?react';
import AutoDarkIcon from '@/assets/icons/line/auto-dark-mode.svg?react';
import LightIcon from '@/assets/icons/line/light-mode.svg?react';
import DarkIcon from '@/assets/icons/line/dark-mode.svg?react';
import { cn } from '../utils/cn';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme, isDark } = useTheme();

  const handleClick = () => {
    const themes: Theme[] = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]!);
  };

  return (
    <div
      className={cn('h-fit w-fit cursor-pointer', className)}
      onClick={handleClick}
    >
      {theme === 'system' ? (
        isDark() ? (
          <AutoDarkIcon width={30} height={30} className="text-[#ffffff]" />
        ) : (
          <AutoLightIcon width={30} height={30} className="text-[#000000]" />
        )
      ) : theme === 'light' ? (
        <DarkIcon width={30} height={30} className="text-[#000000]" />
      ) : (
        <LightIcon width={30} height={30} className="text-[#ffffff]" />
      )}
    </div>
  );
}

import { useState } from 'react';

import i18n from '../../../locales/i18n';

import { Button } from './button';

// TODO: 이건 필요 없고 dark mode switcher로 개량, 토글 버튼으로 만들 것임

export function LanguageSwitcher() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-sm font-medium">
      <Button
        variant="default"
        onClick={() => setShowDropdown((prev) => !prev)}
        className="px-3 py-2"
      >
        {`${i18n.language === 'en' ? 'English' : '한국어'} ${showDropdown ? '▲' : '▼'}`}
      </Button>
      {showDropdown && (
        <div className="absolute right-0 bottom-full z-20 mb-2 w-30 rounded-lg border border-neutral-300 bg-white px-3 py-2">
          <Button
            variant="text"
            onClick={() => handleLanguageChange('en')}
            className={i18n.language !== 'en' ? 'text-neutral-400' : ''}
          >
            English
          </Button>
          <div className="h-1" />
          <Button
            variant="text"
            onClick={() => handleLanguageChange('ko')}
            className={i18n.language !== 'ko' ? 'text-neutral-400' : ''}
          >
            한국어
          </Button>
        </div>
      )}
    </div>
  );
}

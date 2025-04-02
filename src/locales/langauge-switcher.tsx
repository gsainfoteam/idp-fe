import React, { useState } from 'react';

import i18n from './i18n';

export function LanguageSwitcher() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-sm font-medium">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 px-3 py-2 transition-colors hover:bg-gray-200"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="capitalize">
          {i18n.language === 'en' ? 'English' : '한국어'}
        </span>
        <span className="text-xs">{showDropdown ? '▲' : '▼'}</span>
      </div>
      {showDropdown && (
        <div className="absolute right-0 bottom-full z-20 mb-2 w-32 rounded-xl border bg-white py-1">
          <div
            className={`cursor-pointer px-4 py-2 transition-colors duration-150 ${
              i18n.language === 'en'
                ? 'text-primary-600 hover:text-primary-700 font-semibold'
                : 'hover:text-gray-700'
            }`}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </div>
          <div
            className={`cursor-pointer px-4 py-2 transition-colors duration-150 ${
              i18n.language === 'ko'
                ? 'text-primary-600 hover:text-primary-700 font-semibold'
                : 'hover:text-gray-700'
            }`}
            onClick={() => handleLanguageChange('ko')}
          >
            한국어
          </div>
        </div>
      )}
    </div>
  );
}

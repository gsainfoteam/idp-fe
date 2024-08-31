import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import * as en from "./en-US";
import * as ko from "./ko-KR";

const resources = {
  "ko-KR": { ...ko },
  "en-US": { ...en },
} as const;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["ko-KR", "en-US", "ko", "en"],
    detection: {
      // LanguageDetector options
      order: ["navigator"],
    },
    resources,
    fallbackLng: {
      "ko-KR": ["ko-KR"],
      ko: ["ko-KR"],
      default: ["en-US"],
    },
    interpolation: {
      escapeValue: false,
    },
    ns: ["main"],
    defaultNS: "main",
  });

export default i18next;

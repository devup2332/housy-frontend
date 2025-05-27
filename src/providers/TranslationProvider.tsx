import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import es from "@/translations/es/index.json";
import en from "@/translations/en/index.json";
import i18n from "i18next";

export const LANGUAGE_KEY = "language_app";

const currentLang = localStorage.getItem(LANGUAGE_KEY);

interface Props {
  children: React.ReactNode;
}

i18n.init({
  fallbackLng: currentLang ? currentLang : "en",
  debug: true,
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
});

const TranslationProvider = ({ children }: Props) => {
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, currentLang ? currentLang : "en");
  }, []);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationProvider;

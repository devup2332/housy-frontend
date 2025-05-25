import React from "react";
import { I18nextProvider } from "react-i18next";
import es from "@/translations/es/index.json";
import en from "@/translations/en/index.json";
import i18n from "i18next";

interface Props {
  children: React.ReactNode;
}

i18n.init({
  fallbackLng: "en",
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
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationProvider;

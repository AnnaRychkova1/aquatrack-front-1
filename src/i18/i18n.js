import { use } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import uk from './uk.json';
import en from './en.json';

const i18n = use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: en,
      },
      uk: {
        translation: uk,
      },
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

console.log(i18n);

export default i18n;

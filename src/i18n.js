import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  }
};

i18n
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Detect user language
  .use(LanguageDetector)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: 'fr', // Default to French
    debug: false,
    lng: 'fr', // Force initial language to ensure resources are loaded
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false // React already protects from XSS
    },

    react: {
      useSuspense: false, // Disable suspense to avoid loading issues
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '', // Show empty string instead of key when translation is missing
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
    }
  })
  .then(() => {
    // i18n initialized successfully - silent in production
  })
  .catch(() => {
    // i18n initialization failed - handled silently
  });

export default i18n;
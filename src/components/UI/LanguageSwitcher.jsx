import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 surface-glass rounded-lg shadow-sm hover:shadow-lg transition-all duration-200"
      >
        <Globe className="w-4 h-4 text-tertiary-color" />
        <span className="text-2xl">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-secondary-color hidden sm:inline">
          {currentLanguage.name}
        </span>
        <motion.svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-tertiary-color"
        >
          <path
            fill="currentColor"
            d="M2.5 4.5L6 8L9.5 4.5"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.3 }}
              className="absolute right-0 mt-2 w-48 surface-glass-strong rounded-xl shadow-xl overflow-hidden z-50"
            >
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => changeLanguage(lang.code)}
                  className="w-full px-4 py-3 flex items-center gap-3 transition-colors group hover:bg-surface-soft"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {lang.flag}
                  </span>
                  <span className="flex-1 text-left text-sm font-medium text-secondary-color">
                    {lang.name}
                  </span>
                  {currentLanguage.code === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.3 }}
                    >
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;

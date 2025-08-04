import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

/**
 * Hook optimisé pour éviter les warnings pendant le chargement des traductions
 * Retourne un placeholder vide pendant le chargement au lieu de la clé brute
 */
export const useTranslationOptimized = () => {
  const { t, i18n, ready } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkReady = () => {
      const isInitialized = i18n.isInitialized;
      const hasResources = i18n.hasResourceBundle(i18n.language, 'translation');
      setIsReady(ready && isInitialized && hasResources);
    };

    checkReady();

    const onInitialized = () => checkReady();
    const onLoaded = () => checkReady();
    const onLanguageChanged = () => checkReady();

    i18n.on('initialized', onInitialized);
    i18n.on('loaded', onLoaded);
    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('initialized', onInitialized);
      i18n.off('loaded', onLoaded);
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n, ready]);

  // Fonction de traduction optimisée
  const tOptimized = (key, options = {}) => {
    if (!isReady) {
      return ''; // Retourne une chaîne vide au lieu de la clé pour éviter les warnings
    }
    return t(key, options);
  };

  return {
    t: tOptimized,
    i18n,
    ready: isReady,
    isLoading: !isReady
  };
};

export default useTranslationOptimized;
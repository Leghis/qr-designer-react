// Template lazy loading manager
import { safeDynamicImport } from '../../utils/extensionErrorHandler';

// Cache for loaded templates
const templateCache = new Map();

// Lazy load templates by category with caching
export const loadTemplatesByCategory = async (category) => {
  // Check cache first
  if (templateCache.has(category)) {
    return templateCache.get(category);
  }
  try {
    switch (category) {
      case 'spectacular': {
        const spectacularModule = await safeDynamicImport(() => import('./spectacular'));
        const spectacularTemplates = spectacularModule?.spectacularTemplates || [];
        templateCache.set(category, spectacularTemplates);
        return spectacularTemplates;
    }
      case 'professional': {
        const professionalModule = await safeDynamicImport(() => import('./professional'));
        const professionalTemplates = professionalModule?.professionalTemplates || [];
        templateCache.set(category, professionalTemplates);
        return professionalTemplates;
    }
      case 'creative': {
        const creativeModule = await safeDynamicImport(() => import('./creative'));
        const creativeTemplates = creativeModule?.creativeTemplates || [];
        templateCache.set(category, creativeTemplates);
        return creativeTemplates;
    }
      case 'event': {
        const eventModule = await safeDynamicImport(() => import('./event'));
        const eventTemplates = eventModule?.eventTemplates || [];
        templateCache.set(category, eventTemplates);
        return eventTemplates;
    }
      case 'hospitality': {
        const hospitalityModule = await safeDynamicImport(() => import('./hospitality'));
        const hospitalityTemplates = hospitalityModule?.hospitalityTemplates || [];
        templateCache.set(category, hospitalityTemplates);
        return hospitalityTemplates;
    }
      case 'retail': {
        const retailModule = await safeDynamicImport(() => import('./retail'));
        const retailTemplates = retailModule?.retailTemplates || [];
        templateCache.set(category, retailTemplates);
        return retailTemplates;
    }
      case 'health': {
        const healthModule = await safeDynamicImport(() => import('./health'));
        const healthTemplates = healthModule?.healthTemplates || [];
        templateCache.set(category, healthTemplates);
        return healthTemplates;
    }
      case 'education': {
        const educationModule = await safeDynamicImport(() => import('./education'));
        const educationTemplates = educationModule?.educationTemplates || [];
        templateCache.set(category, educationTemplates);
        return educationTemplates;
    }
      case 'social': {
        const socialModule = await safeDynamicImport(() => import('./social'));
        const socialTemplates = socialModule?.socialTemplates || [];
        templateCache.set(category, socialTemplates);
        return socialTemplates;
    }
      case 'all': {
        // Load all templates concurrently with safe imports
        const results = await Promise.all([
          safeDynamicImport(() => import('./spectacular')).then(m => m?.spectacularTemplates || []),
          safeDynamicImport(() => import('./professional')).then(m => m?.professionalTemplates || []),
          safeDynamicImport(() => import('./creative')).then(m => m?.creativeTemplates || []),
          safeDynamicImport(() => import('./event')).then(m => m?.eventTemplates || []),
          safeDynamicImport(() => import('./hospitality')).then(m => m?.hospitalityTemplates || []),
          safeDynamicImport(() => import('./retail')).then(m => m?.retailTemplates || []),
          safeDynamicImport(() => import('./health')).then(m => m?.healthTemplates || []),
          safeDynamicImport(() => import('./education')).then(m => m?.educationTemplates || []),
          safeDynamicImport(() => import('./social')).then(m => m?.socialTemplates || [])
        ]);
        const allTemplates = results.flat();
        templateCache.set(category, allTemplates);
        return allTemplates;
    }
      default:
        return [];
    }
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

// Get template count for each category (without loading the templates)
export const templateCounts = {
  spectacular: 18,
  professional: 21,
  creative: 20,
  event: 18,
  hospitality: 18,
  retail: 18,
  health: 18,
  education: 17,
  social: 18,
  all: 166
};

// Categories configuration
export const CATEGORIES = [
  { id: 'all', name: 'Tous', gradient: 'from-gray-500 to-gray-600' },
  { id: 'spectacular', name: 'Spectaculaire', gradient: 'from-purple-500 to-pink-600' },
  { id: 'professional', name: 'Professionnel', gradient: 'from-blue-500 to-blue-700' },
  { id: 'creative', name: 'Créatif', gradient: 'from-orange-500 to-red-600' },
  { id: 'event', name: 'Événement', gradient: 'from-green-500 to-teal-600' },
  { id: 'hospitality', name: 'Hospitalité', gradient: 'from-amber-500 to-orange-600' },
  { id: 'retail', name: 'Commerce', gradient: 'from-pink-500 to-rose-600' },
  { id: 'health', name: 'Santé', gradient: 'from-cyan-500 to-blue-600' },
  { id: 'education', name: 'Éducation', gradient: 'from-indigo-500 to-purple-600' },
  { id: 'social', name: 'Réseaux sociaux', gradient: 'from-red-500 to-pink-600' }
];
// Template lazy loading manager
import { lazy } from 'react';
import { safeDynamicImport } from '../../utils/extensionErrorHandler';

// Lazy load templates by category
export const loadTemplatesByCategory = async (category) => {
  try {
    switch (category) {
      case 'spectacular':
        const spectacularModule = await safeDynamicImport(() => import('./spectacular'));
        return spectacularModule?.spectacularTemplates || [];
      case 'professional':
        const professionalModule = await safeDynamicImport(() => import('./professional'));
        return professionalModule?.professionalTemplates || [];
      case 'creative':
        const creativeModule = await safeDynamicImport(() => import('./creative'));
        return creativeModule?.creativeTemplates || [];
      case 'event':
        const eventModule = await safeDynamicImport(() => import('./event'));
        return eventModule?.eventTemplates || [];
      case 'hospitality':
        const hospitalityModule = await safeDynamicImport(() => import('./hospitality'));
        return hospitalityModule?.hospitalityTemplates || [];
      case 'retail':
        const retailModule = await safeDynamicImport(() => import('./retail'));
        return retailModule?.retailTemplates || [];
      case 'health':
        const healthModule = await safeDynamicImport(() => import('./health'));
        return healthModule?.healthTemplates || [];
      case 'education':
        const educationModule = await safeDynamicImport(() => import('./education'));
        return educationModule?.educationTemplates || [];
      case 'social':
        const socialModule = await safeDynamicImport(() => import('./social'));
        return socialModule?.socialTemplates || [];
      case 'all':
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
        return results.flat();
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
  spectacular: 17,
  professional: 11,
  creative: 10,
  event: 8,
  hospitality: 8,
  retail: 8,
  health: 8,
  education: 8,
  social: 8,
  all: 85
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
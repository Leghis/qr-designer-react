// Template lazy loading manager
import { lazy } from 'react';

// Lazy load templates by category
export const loadTemplatesByCategory = async (category) => {
  switch (category) {
    case 'spectacular':
      return import('./spectacular').then(module => module.spectacularTemplates);
    case 'professional':
      return import('./professional').then(module => module.professionalTemplates);
    case 'creative':
      return import('./creative').then(module => module.creativeTemplates);
    case 'event':
      return import('./event').then(module => module.eventTemplates);
    case 'hospitality':
      return import('./hospitality').then(module => module.hospitalityTemplates);
    case 'retail':
      return import('./retail').then(module => module.retailTemplates);
    case 'health':
      return import('./health').then(module => module.healthTemplates);
    case 'education':
      return import('./education').then(module => module.educationTemplates);
    case 'social':
      return import('./social').then(module => module.socialTemplates);
    case 'all':
      // Load all templates concurrently
      const results = await Promise.all([
        import('./spectacular').then(m => m.spectacularTemplates),
        import('./professional').then(m => m.professionalTemplates),
        import('./creative').then(m => m.creativeTemplates),
        import('./event').then(m => m.eventTemplates),
        import('./hospitality').then(m => m.hospitalityTemplates),
        import('./retail').then(m => m.retailTemplates),
        import('./health').then(m => m.healthTemplates),
        import('./education').then(m => m.educationTemplates),
        import('./social').then(m => m.socialTemplates)
      ]);
      return results.flat();
    default:
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
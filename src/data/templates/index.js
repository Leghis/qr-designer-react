// Template lazy loading manager
import { safeDynamicImport } from '../../utils/extensionErrorHandler';

// Cache for loaded templates with expiration
const templateCache = new Map();
const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// Cache entry structure: { data, timestamp }
const getCachedTemplate = (category) => {
  const cached = templateCache.get(category);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_EXPIRY_TIME) {
    templateCache.delete(category);
    return null;
  }
  
  return cached.data;
};

const setCachedTemplate = (category, data) => {
  templateCache.set(category, {
    data,
    timestamp: Date.now()
  });
};

// Lazy load templates by category with intelligent caching
export const loadTemplatesByCategory = async (category) => {
  // Check cache first
  const cachedTemplates = getCachedTemplate(category);
  if (cachedTemplates) {
    return cachedTemplates;
  }

  try {
    let templates = [];
    
    switch (category) {
      case 'spectacular': {
        const spectacularModule = await safeDynamicImport(() => import('./spectacular'));
        templates = spectacularModule?.spectacularTemplates || [];
        break;
      }
      case 'professional': {
        const professionalModule = await safeDynamicImport(() => import('./professional'));
        templates = professionalModule?.professionalTemplates || [];
        break;
      }
      case 'creative': {
        const creativeModule = await safeDynamicImport(() => import('./creative'));
        templates = creativeModule?.creativeTemplates || [];
        break;
      }
      case 'event': {
        const eventModule = await safeDynamicImport(() => import('./event'));
        templates = eventModule?.eventTemplates || [];
        break;
      }
      case 'hospitality': {
        const hospitalityModule = await safeDynamicImport(() => import('./hospitality'));
        templates = hospitalityModule?.hospitalityTemplates || [];
        break;
      }
      case 'retail': {
        const retailModule = await safeDynamicImport(() => import('./retail'));
        templates = retailModule?.retailTemplates || [];
        break;
      }
      case 'health': {
        const healthModule = await safeDynamicImport(() => import('./health'));
        templates = healthModule?.healthTemplates || [];
        break;
      }
      case 'education': {
        const educationModule = await safeDynamicImport(() => import('./education'));
        templates = educationModule?.educationTemplates || [];
        break;
      }
      case 'social': {
        const socialModule = await safeDynamicImport(() => import('./social'));
        templates = socialModule?.socialTemplates || [];
        break;
      }
      case 'all': {
        // For 'all' category, check if individual categories are cached first
        const categoryNames = ['spectacular', 'professional', 'creative', 'event', 'hospitality', 'retail', 'health', 'education', 'social'];
        const cachedResults = [];
        const uncachedCategories = [];
        
        // Collect cached templates and identify what needs loading
        categoryNames.forEach(catName => {
          const cached = getCachedTemplate(catName);
          if (cached) {
            cachedResults.push(...cached);
          } else {
            uncachedCategories.push(catName);
          }
        });
        
        // Load uncached categories concurrently
        if (uncachedCategories.length > 0) {
          const loadPromises = uncachedCategories.map(async (catName) => {
            const result = await loadTemplatesByCategory(catName);
            return result;
          });
          
          const uncachedResults = await Promise.all(loadPromises);
          templates = [...cachedResults, ...uncachedResults.flat()];
        } else {
          templates = cachedResults;
        }
        break;
      }
      default:
        templates = [];
    }
    
    // Cache the results
    setCachedTemplate(category, templates);
    return templates;
    
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
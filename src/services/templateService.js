// Service pour charger les templates à la demande
import { loadTemplatesByCategory } from '../data/templates';
import { qrTemplates } from './qrService';

// Cache pour éviter de recharger les templates
const templateCache = new Map();

// Charger un template spécifique par ID
export const loadTemplateById = async (templateId) => {
  // Vérifier d'abord dans le cache
  if (templateCache.has(templateId)) {
    return templateCache.get(templateId);
  }
  
  // Chercher dans les templates de base
  const basicTemplate = Object.entries(qrTemplates).find(([key]) => key === templateId);
  if (basicTemplate) {
    const template = {
      id: basicTemplate[0],
      name: basicTemplate[1].name,
      isPremium: basicTemplate[1].isPremium,
      options: {
        dotsOptions: { 
          color: basicTemplate[1].dotsColor,
          type: basicTemplate[1].dotsType
        },
        backgroundOptions: { 
          color: basicTemplate[1].bgColor 
        },
        cornersSquareOptions: { 
          color: basicTemplate[1].cornersColor,
          type: basicTemplate[1].cornersType
        },
        cornersDotOptions: { 
          color: basicTemplate[1].cornersColor,
          type: basicTemplate[1].cornersType
        }
      }
    };
    templateCache.set(templateId, template);
    return template;
  }
  
  // Sinon, charger tous les templates premium et chercher
  try {
    const allTemplates = await loadTemplatesByCategory('all');
    
    // Mettre tous les templates dans le cache
    allTemplates.forEach(t => {
      templateCache.set(t.id, t);
    });
    
    // Retourner le template demandé
    return templateCache.get(templateId) || null;
  } catch (error) {
    console.error('Error loading template:', error);
    return null;
  }
};

// Charger tous les templates (avec cache)
export const loadAllTemplates = async () => {
  // Si on a déjà beaucoup de templates en cache, les retourner
  if (templateCache.size > 50) {
    return Array.from(templateCache.values());
  }
  
  try {
    const allTemplates = await loadTemplatesByCategory('all');
    
    // Mettre tous les templates dans le cache
    allTemplates.forEach(t => {
      templateCache.set(t.id, t);
    });
    
    return allTemplates;
  } catch (error) {
    console.error('Error loading all templates:', error);
    return [];
  }
};

// Vider le cache si nécessaire
export const clearTemplateCache = () => {
  templateCache.clear();
};
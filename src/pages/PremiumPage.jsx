import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { loadTemplatesByCategory, templateCounts } from '../data/templates';
import PremiumTemplateCard from '../components/Templates/PremiumTemplateCard';


const PremiumPage = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = [
    { id: 'all', name: t('templates.categories.all'), icon: '🌟' },
    { id: 'spectacular', name: t('templates.categories.spectacular'), icon: '✨' },
    { id: 'professional', name: t('templates.categories.professional'), icon: '💼' },
    { id: 'creative', name: t('templates.categories.creative'), icon: '🎨' },
    { id: 'event', name: t('templates.categories.event'), icon: '🎉' },
    { id: 'hospitality', name: t('templates.categories.hospitality'), icon: '🏨' },
    { id: 'retail', name: t('templates.categories.retail'), icon: '🛍️' },
    { id: 'health', name: t('templates.categories.health'), icon: '🏥' },
    { id: 'education', name: t('templates.categories.education'), icon: '🎓' },
    { id: 'social', name: t('templates.categories.social'), icon: '📱' }
  ];
  
  // Load templates when category changes
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await loadTemplatesByCategory(activeCategory);
        setTemplates(loadedTemplates);
      } catch (error) {
        console.error('Error loading templates:', error);
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTemplates();
  }, [activeCategory]);

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-dark-900 dark:to-primary-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('premium.hero.title')} <span className="gradient-text">{t('premium.hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('premium.hero.subtitle')}
            </p>
            
            {/* Templates counter */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('templates.gallery.loading')}
                  </span>
                ) : (
                  t('premium.templatesCount', { count: templates.length })
                )}
              </p>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => {
                const categoryCount = templateCounts[category.id] || 0;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      activeCategory === category.id
                        ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                    <span className={`text-xs ${
                      activeCategory === category.id 
                        ? 'bg-white/20' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    } px-2 py-0.5 rounded-full`}>
                      {categoryCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            // Loading state with skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: templateCounts[activeCategory] || 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="aspect-square bg-gray-200 dark:bg-slate-700" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : templates.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3) }}
                >
                  <PremiumTemplateCard template={template} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                {t('templates.gallery.noTemplates')}
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {t('templates.gallery.tryOtherCategory')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
};

export default PremiumPage;
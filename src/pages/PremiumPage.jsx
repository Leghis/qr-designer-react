import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { premiumTemplates } from '../services/qrService';
import PremiumTemplateCard from '../components/Templates/PremiumTemplateCard';

const categories = [
  { id: 'all', name: 'Tous', icon: '🌟' },
  { id: 'spectacular', name: 'Spectaculaire', icon: '✨' },
  { id: 'professional', name: 'Professionnel', icon: '💼' },
  { id: 'creative', name: 'Créatif', icon: '🎨' },
  { id: 'event', name: 'Événement', icon: '🎉' },
  { id: 'hospitality', name: 'Hospitality', icon: '🏨' },
  { id: 'retail', name: 'Commerce', icon: '🛍️' },
  { id: 'health', name: 'Santé', icon: '🏥' },
  { id: 'education', name: 'Éducation', icon: '🎓' },
  { id: 'social', name: 'Réseaux Sociaux', icon: '📱' }
];

const PremiumPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredTemplates = activeCategory === 'all' 
    ? premiumTemplates 
    : premiumTemplates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-dark-900 dark:to-primary-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Templates QR Codes <span className="gradient-text">Premium</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Des designs exclusifs conçus par des professionnels pour donner à vos QR codes un impact maximal
            </p>
            
            {/* Templates counter */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredTemplates.length} templates disponibles
              </p>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => {
                const categoryCount = category.id === 'all' 
                  ? premiumTemplates.length 
                  : premiumTemplates.filter(t => t.category === category.id).length;
                
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
          {filteredTemplates.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredTemplates.map((template, index) => (
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
                Aucun template trouvé
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Essayez une autre catégorie
              </p>
            </motion.div>
          )}
        </div>
      </section>

    </div>
  );
};

export default PremiumPage;
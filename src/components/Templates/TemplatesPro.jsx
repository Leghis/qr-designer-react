import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription.jsx';
import QRCodeStyling from 'qr-code-styling';
import { loadTemplatesByCategory, templateCounts, CATEGORIES } from '../../data/templates';
import TemplateSkeletonLoader from './TemplateSkeletonLoader';

const TemplatesPro = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isPremium, canUsePremiumTemplate } = useSubscription();
  const [usedPremiumTemplates, setUsedPremiumTemplates] = useState([]);
  
  // Load templates when category changes
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await loadTemplatesByCategory(selectedCategory);
        setTemplates(loadedTemplates);
      } catch (error) {
        console.error('Error loading templates:', error);
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTemplates();
  }, [selectedCategory]);
  
  return (
    <div>
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t('templates.gallery.title')} <span className="gradient-text">{t('templates.gallery.titleHighlight')}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          {t('templates.gallery.subtitle', { count: templateCounts.all })}
        </motion.p>
      </div>
      
      {/* Category Filter - Mobile Dropdown */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 md:hidden"
      >
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-between"
          >
            <span className="font-medium">
              {t(`templates.categories.${selectedCategory}`)}
            </span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden z-20"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors
                    ${selectedCategory === category.id ? 'bg-gray-50 dark:bg-slate-700' : ''}
                  `}
                >
                  <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent font-medium`}>
                    {t(`templates.categories.${category.id}`)}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Category Filter - Desktop */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden md:flex flex-wrap justify-center gap-3 mb-12"
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-6 py-3 rounded-full font-medium transition-all
              ${selectedCategory === category.id 
                ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg transform scale-105` 
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105'
              }
            `}
          >
            {t(`templates.categories.${category.id}`)}
            {category.id !== 'all' && (
              <span className="ml-2 opacity-60">
                ({templateCounts[category.id] || 0})
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Templates Grid or Skeleton Loader */}
      {isLoading ? (
        <TemplateSkeletonLoader 
          count={selectedCategory === 'all' ? 12 : templateCounts[selectedCategory] || 8} 
        />
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {templates.map((template, index) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              index={index}
              isPremium={isPremium}
              canUse={isPremium || canUsePremiumTemplate(template.id)}
              isUsed={usedPremiumTemplates && usedPremiumTemplates.includes(template.id)}
            />
          ))}
        </motion.div>
      )}
      
      {/* Premium CTA */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <Crown className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              {t('templates.cta.unlockAll')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('templates.cta.description', { count: templateCounts.all })}
            </p>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              <Crown className="w-5 h-5" />
{t('templates.cta.upgrade')}
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template, index, isPremium, canUse, isUsed }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const qrRef = useRef(null);
  const qrContainerRef = useRef(null);
  
  // Generate QR preview
  useEffect(() => {
    if (!qrContainerRef.current) return;
    
    // Clear existing QR
    qrContainerRef.current.innerHTML = '';
    
    // Create QR with template options
    const qrOptions = {
      width: 200,
      height: 200,
      type: "svg",
      data: "https://qr-designer.com",
      margin: 10,
      ...template.options,
      imageOptions: {
        hideBackgroundDots: true,
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: 0.3,
        ...template.options?.imageOptions
      }
    };
    
    qrRef.current = new QRCodeStyling(qrOptions);
    qrRef.current.append(qrContainerRef.current);
  }, [template]);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className={`
        relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden transition-all duration-300
        ${isHovered ? 'shadow-2xl transform -translate-y-2' : 'shadow-lg'}
      `}>
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm
            bg-gradient-to-r ${CATEGORIES.find(c => c.id === template.category)?.gradient || 'from-gray-500 to-gray-600'}
            bg-clip-text text-transparent
          `}>
            {template.category}
          </span>
        </div>
        
        {/* Used/Premium Badge */}
        {isUsed && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" />
{t('templates.card.used')}
            </span>
          </div>
        )}
        
        {/* QR Preview */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5"></div>
          <div 
            ref={qrContainerRef}
            className="w-full h-full flex items-center justify-center"
          />
          
          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-6"
          >
            <Link
              to={`/templates/${template.id}`}
              className="px-6 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl font-medium hover:bg-white dark:hover:bg-slate-900 transition-all transform hover:scale-105"
            >
{canUse ? t('templates.card.customize') : t('templates.card.view')}
            </Link>
          </motion.div>
        </div>
        
        {/* Template Info */}
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            {template.name}
            {template.isPremium && !isPremium && (
              <Crown className="w-4 h-4 text-yellow-500" />
            )}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {template.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatesPro;
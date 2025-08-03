import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [usedPremiumTemplates] = useState([]);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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
        ref={dropdownRef}
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
          
          <AnimatePresence mode="wait">
            {isDropdownOpen && (
              <motion.div
                key="dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
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
          </AnimatePresence>
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
                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg' 
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {t(`templates.categories.${category.id}`)}
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {templateCounts[category.id] || 0}
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>
      
      {/* Templates Grid with Loading State */}
      {isLoading ? (
        <TemplateSkeletonLoader count={templateCounts[selectedCategory] || 8} />
      ) : (
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
              isPremium={template.isPremium}
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
  const [isInView, setIsInView] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const qrRef = useRef(null);
  const qrContainerRef = useRef(null);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);
  
  // Observe when card comes into view
  useEffect(() => {
    const currentCardRef = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !qrGenerated) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }
    
    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, [qrGenerated]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Clean up QR instance
      if (qrRef.current) {
        try {
          // Remove QR element from DOM if it exists
          if (qrRef.current._element && qrRef.current._element.parentNode) {
            qrRef.current._element.parentNode.removeChild(qrRef.current._element);
          }
          qrRef.current = null;
        } catch (error) {
          console.debug('QR cleanup error:', error);
        }
      }
    };
  }, []);
  
  // Generate QR preview only when in view
  useEffect(() => {
    if (!isInView || qrGenerated) return;
    
    // Small delay to stagger QR generation
    timeoutRef.current = setTimeout(() => {
      if (!qrContainerRef.current) return;
      
      // Clear existing QR safely
      while (qrContainerRef.current.firstChild) {
        qrContainerRef.current.removeChild(qrContainerRef.current.firstChild);
      }
      
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
      
      try {
        qrRef.current = new QRCodeStyling(qrOptions);
        if (qrContainerRef.current) {
          qrRef.current.append(qrContainerRef.current);
          setQrGenerated(true);
        }
      } catch (error) {
        console.error('Error generating QR preview:', error);
      }
    }, index * 20); // Stagger by 20ms per card
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInView, template, index, qrGenerated]);
  
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
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
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-8">
          {/* Premium Badge for Premium Templates */}
          {template.isPremium && !canUse && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="text-center">
                <Crown className="w-12 h-12 text-white mb-2 mx-auto" />
                <p className="text-white font-medium">{t('templates.card.premiumOnly')}</p>
              </div>
            </div>
          )}
          
          <div 
            ref={qrContainerRef}
            className="w-full h-full flex items-center justify-center"
          />
        </div>
        
        {/* Template Info */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            {template.name}
            {template.isPremium && (
              <Crown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            )}
          </h3>
          
          {/* Use Template Button */}
          {canUse ? (
            <Link
              to={`/templates/${template.id}`}
              className="w-full py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 transform hover:scale-105"
            >
              {t('templates.card.useTemplate')}
            </Link>
          ) : (
            <Link
              to="/premium"
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 transform hover:scale-105"
            >
              <Crown className="w-4 h-4" />
              {t('templates.card.unlockPremium')}
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatesPro;
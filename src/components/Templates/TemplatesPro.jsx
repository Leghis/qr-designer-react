import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QRCodeStyling from 'qr-code-styling';
import { loadTemplatesByCategory, templateCounts, CATEGORIES } from '../../data/templates';
import TemplateSkeletonLoader from './TemplateSkeletonLoader';

const TemplatesPro = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const dropdownRef = useRef(null);
  const categoryChangeTimeoutRef = useRef(null);
  
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
  
  // Preload popular templates on mount for better UX
  useEffect(() => {
    const preloadPopularTemplates = async () => {
      try {
        // Preload the most popular categories in background
        const popularCategories = ['professional', 'creative', 'spectacular'];
        const preloadPromises = popularCategories.map(category => 
          loadTemplatesByCategory(category)
        );
        await Promise.allSettled(preloadPromises);
      } catch (error) {
        console.debug('Preload templates error:', error);
      }
    };

    if (isInitialLoad) {
      preloadPopularTemplates();
    }
  }, [isInitialLoad]);

  // Load templates when category changes with debouncing
  useEffect(() => {
    // Clear any pending category change
    if (categoryChangeTimeoutRef.current) {
      clearTimeout(categoryChangeTimeoutRef.current);
    }

    const loadTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await loadTemplatesByCategory(selectedCategory);
        setTemplates(loadedTemplates);
        if (isInitialLoad) {
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Error loading templates:', error);
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce category changes for better UX (except initial load)
    if (isInitialLoad) {
      loadTemplates();
    } else {
      categoryChangeTimeoutRef.current = setTimeout(loadTemplates, 150);
    }

    return () => {
      if (categoryChangeTimeoutRef.current) {
        clearTimeout(categoryChangeTimeoutRef.current);
      }
    };
  }, [selectedCategory, isInitialLoad]);
  
  return (
    <div>
      {/* Header Section - Mobile Optimized */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4"
        >
          {t('templates.gallery.title')} <span className="gradient-text">{t('templates.gallery.titleHighlight')}</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4"
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
        className="mb-6 sm:mb-8 md:hidden px-4"
      >
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-between min-h-[52px]"
          >
            <span className="font-medium text-sm sm:text-base">
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
                      w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors min-h-[48px] flex items-center
                      ${selectedCategory === category.id ? 'bg-gray-50 dark:bg-slate-700' : ''}
                    `}
                  >
                    <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent font-medium text-sm sm:text-base`}>
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
        className="hidden md:flex flex-wrap justify-center gap-3 mb-8 lg:mb-12 px-4"
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 lg:px-6 py-2.5 lg:py-3 rounded-full font-medium transition-all text-sm lg:text-base min-h-[44px] flex items-center
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4"
        >
          {templates.map((template, index) => (
            <TemplateCard
              key={template.id}
              template={template}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template, index }) => {
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
  
  // Generate QR preview only when in view with optimized timing
  useEffect(() => {
    if (!isInView || qrGenerated) return;
    
    // Intelligent staggering: first 6 cards render quickly, others with more delay
    const baseDelay = index < 6 ? 50 : 150;
    const staggerDelay = index < 6 ? index * 50 : (index - 6) * 100 + 300;
    
    timeoutRef.current = setTimeout(() => {
      if (!qrContainerRef.current) return;
      
      // Clear existing QR safely
      while (qrContainerRef.current.firstChild) {
        qrContainerRef.current.removeChild(qrContainerRef.current.firstChild);
      }
      
      // Optimized QR options for faster rendering
      const qrOptions = {
        width: 180,
        height: 180,
        type: "svg",
        data: "https://qr-designer.com",
        margin: 8,
        ...template.options,
        imageOptions: {
          hideBackgroundDots: true,
          crossOrigin: "anonymous",
          margin: 8,
          imageSize: 0.25,
          ...template.options?.imageOptions
        },
        // Optimize for performance
        qrOptions: {
          errorCorrectionLevel: 'M', // Medium error correction for better performance
          ...template.options?.qrOptions
        }
      };
      
      try {
        qrRef.current = new QRCodeStyling(qrOptions);
        if (qrContainerRef.current) {
          // Use requestAnimationFrame for smoother rendering
          requestAnimationFrame(() => {
            if (qrRef.current && qrContainerRef.current) {
              qrRef.current.append(qrContainerRef.current);
              setQrGenerated(true);
            }
          });
        }
      } catch (error) {
        console.error('Error generating QR preview:', error);
        setQrGenerated(true); // Mark as generated to prevent retries
      }
    }, baseDelay + staggerDelay);
    
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
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)} // Keep visible for 2s on touch
      className="group"
    >
      <div className={`
        relative bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300
        ${isHovered ? 'shadow-xl sm:shadow-2xl transform -translate-y-1 sm:-translate-y-2' : 'shadow-md sm:shadow-lg'}
      `}>
        {/* Category Badge - Mobile Optimized */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <span className={`
            px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm
            bg-gradient-to-r ${CATEGORIES.find(c => c.id === template.category)?.gradient || 'from-gray-500 to-gray-600'}
            bg-clip-text text-transparent
          `}>
            {template.category}
          </span>
        </div>
        
        {/* QR Preview - Mobile Optimized */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 dark:to-white/5"></div>
          <div 
            ref={qrContainerRef}
            className="w-full h-full flex items-center justify-center"
          />
          
          {/* Mobile-friendly Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4 sm:p-6"
          >
            <Link
              to={`/templates/${template.id}`}
              className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium hover:bg-white dark:hover:bg-slate-900 transition-all transform hover:scale-105 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {t('templates.card.customize')}
            </Link>
          </motion.div>
        </div>
        
        {/* Template Info - Mobile Optimized */}
        <div className="p-4 sm:p-6">
          <h3 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2 line-clamp-1">
            {template.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {template.description || 'Template personnalisable'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatesPro;
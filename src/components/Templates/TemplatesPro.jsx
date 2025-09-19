import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QRCodeStyling from 'qr-code-styling';
import { loadTemplatesByCategory, templateCounts, CATEGORIES } from '../../data/templates';
import TemplateSkeletonLoader from './TemplateSkeletonLoader';
import { cn } from '../../utils/cn';

// Lightweight concurrency controller and preview cache (module scoped)
let __maxConcurrentQR = (() => {
  try {
    const n = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
    return Math.max(2, Math.min(3, Math.floor(n / 2))); // 2 on low-end, 3 max
  } catch {
    return 3;
  }
})();
let __activeQRTasks = 0;
const __qrTaskQueue = [];
const __previewCache = new Map(); // key: template.id, value: SVG outerHTML string

const enqueueQRTask = (fn) => {
  return new Promise((resolve, reject) => {
    const run = async () => {
      try {
        await fn();
        resolve();
      } catch (e) {
        reject(e);
      } finally {
        __activeQRTasks = Math.max(0, __activeQRTasks - 1);
        if (typeof queueMicrotask === 'function') {
          queueMicrotask(runNext);
        } else {
          setTimeout(runNext, 0);
        }
      }
    };
    __qrTaskQueue.push(run);
    runNext();
  });
};

function runNext() {
  if (__activeQRTasks >= __maxConcurrentQR) return;
  const next = __qrTaskQueue.shift();
  if (!next) return;
  __activeQRTasks++;
  next();
}

const requestIdle = (cb) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const id = window.requestIdleCallback(() => cb(), { timeout: 250 });
    return { type: 'idle', id };
  }
  const id = setTimeout(() => cb(), 16);
  return { type: 'timeout', id };
};

const cancelIdle = (token) => {
  if (!token) return;
  if (token.type === 'idle' && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(token.id);
  } else if (token.type === 'timeout') {
    clearTimeout(token.id);
  }
};

const TemplatesPro = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listVersion, setListVersion] = useState(0);
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
    if (categoryChangeTimeoutRef.current) {
      clearTimeout(categoryChangeTimeoutRef.current);
      categoryChangeTimeoutRef.current = null;
    }

    const loadTemplates = async () => {
      setIsLoading(true);
      try {
        const loadedTemplates = await loadTemplatesByCategory(selectedCategory);
        setTemplates(loadedTemplates);
        // Bump list version so cards can cancel stale tasks
        setListVersion(v => v + 1);
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
    let timeoutId = null;
    if (isInitialLoad) {
      loadTemplates();
    } else {
      timeoutId = setTimeout(loadTemplates, 150);
      categoryChangeTimeoutRef.current = timeoutId;
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
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
                className="absolute top-full left-0 right-0 mt-2 surface-glass-strong rounded-xl shadow-xl overflow-hidden z-20"
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`
                      w-full px-4 sm:px-6 py-3 sm:py-4 text-left transition-colors min-h-[48px] flex items-center
                      ${selectedCategory === category.id ? 'bg-surface-soft' : 'hover:bg-surface-soft'}
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
                : 'bg-surface-soft text-secondary-color hover:bg-surface'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {t(`templates.categories.${category.id}`)}
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'rgba(var(--color-primary-50, 240 248 255), 0.35)',
                  color: 'var(--text-tertiary)'
                }}
              >
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
              listVersion={listVersion}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

// Template Card Component
const TemplateCard = ({ template, index, listVersion }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const qrRef = useRef(null);
  const qrContainerRef = useRef(null);
  const cardRef = useRef(null);
  const timeoutRef = useRef(null);
  const clearTouchTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  
  // Observe when card comes into view
  useEffect(() => {
    const currentCardRef = cardRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
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
      clearTouchTimeout();
      
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
  }, [clearTouchTimeout]);
  
  // Generate QR preview only when in view, with concurrency limiting, caching and idle scheduling
  useEffect(() => {
    if (!isInView || qrGenerated) return;

    let canceled = false;
    let idleToken = null;
    const currentVersion = listVersion;

    const container = qrContainerRef.current;
    if (!container) return;

    // Cache hit: render instantly
    const cached = __previewCache.get(template.id);
    if (cached) {
      container.innerHTML = cached;
      setQrGenerated(true);
      return;
    }

    // Otherwise, queue a generation task (limited concurrency)
    enqueueQRTask(async () => {
      if (canceled) return;
      // Skip if went out of view or version changed
      if (!isInView || currentVersion !== listVersion) return;
      // Wait for idle time slice to avoid jank
      await new Promise((res) => {
        idleToken = requestIdle(res);
      });
      if (canceled || !isInView || currentVersion !== listVersion) return;

      // Safety: container may have unmounted
      if (!qrContainerRef.current) return;

      // Clear existing QR safely
      while (qrContainerRef.current.firstChild) {
        qrContainerRef.current.removeChild(qrContainerRef.current.firstChild);
      }

      const qrOptions = {
        width: 180,
        height: 180,
        type: 'svg',
        data: 'https://qr-designer.com',
        margin: 8,
        ...template.options,
        imageOptions: {
          hideBackgroundDots: true,
          crossOrigin: 'anonymous',
          margin: 8,
          imageSize: 0.25,
          ...template.options?.imageOptions
        },
        qrOptions: {
          errorCorrectionLevel: 'M',
          ...template.options?.qrOptions
        }
      };

      try {
        qrRef.current = new QRCodeStyling(qrOptions);
        if (!qrContainerRef.current || canceled || !isInView || currentVersion !== listVersion) return;
        await new Promise((r) => requestAnimationFrame(r));
        if (canceled || !qrRef.current || !qrContainerRef.current || !isInView || currentVersion !== listVersion) return;
        qrRef.current.append(qrContainerRef.current);
        setQrGenerated(true);
        // Cache the SVG outerHTML for instant reuse
        const svg = qrContainerRef.current.querySelector('svg');
        if (svg) {
          __previewCache.set(template.id, svg.outerHTML);
        }
      } catch (error) {
        console.error('Error generating QR preview:', error);
        setQrGenerated(true);
      }
    });

    return () => {
      canceled = true;
      if (idleToken) cancelIdle(idleToken);
    };
  }, [isInView, qrGenerated, template, listVersion]);
  
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => {
        clearTouchTimeout();
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        clearTouchTimeout();
        setIsHovered(false);
      }}
      onTouchStart={() => {
        clearTouchTimeout();
        setIsHovered(true);
      }}
      onTouchEnd={() => {
        clearTouchTimeout();
        timeoutRef.current = setTimeout(() => {
          setIsHovered(false);
          timeoutRef.current = null;
        }, 2000);
      }} // Keep visible for 2s on touch
      className="group"
    >
      <div
        className={cn(
          'relative bg-surface border border-surface-subtle rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300',
          isHovered
            ? 'shadow-strong transform -translate-y-1 sm:-translate-y-2'
            : 'shadow-soft'
        )}
      >
        {/* Category Badge - Mobile Optimized */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <span className={`
            px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium surface-glass
            bg-gradient-to-r ${CATEGORIES.find(c => c.id === template.category)?.gradient || 'from-gray-500 to-gray-600'}
            bg-clip-text text-transparent
          `}>
            {template.category}
          </span>
        </div>
        
        {/* QR Preview - Mobile Optimized */}
        <div
          className="relative aspect-square p-4 sm:p-6 lg:p-8 border-b border-surface-subtle"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--bg-secondary) 96%, transparent), color-mix(in srgb, var(--bg-tertiary) 88%, transparent))'
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 10%, color-mix(in srgb, var(--brand-glow, rgba(59,130,246,0.18)) 28%, transparent) 100%)'
            }}
          ></div>
          <div 
            ref={qrContainerRef}
            className="w-full h-full flex items-center justify-center"
          />
          
          {/* Mobile-friendly Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-end justify-center p-4 sm:p-6"
            style={{
              background: 'linear-gradient(to top, color-mix(in srgb, var(--overlay) 85%, transparent), color-mix(in srgb, var(--overlay) 55%, transparent), transparent)'
            }}
          >
            <Link
              to={`/templates/${template.id}`}
              className="px-4 py-2.5 sm:px-6 sm:py-3 surface-glass-strong rounded-lg sm:rounded-xl font-medium transition-all transform hover:scale-105 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {t('templates.card.customize')}
            </Link>
          </motion.div>
        </div>
        
        {/* Template Info - Mobile Optimized */}
        <div className="p-4 sm:p-6">
          <h3 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2 line-clamp-1 text-primary-color">
            {template.name}
          </h3>
          <p className="text-xs sm:text-sm text-secondary-color opacity-80 line-clamp-2">
            {template.description || 'Template personnalisable'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplatesPro;

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Clock, Star, Zap, Rocket, CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslationOptimized } from '../../hooks/useTranslationOptimized';

const ComingSoonModal = ({ isOpen, onClose, type = 'feature', title, description }) => {
  const { t, ready } = useTranslationOptimized();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'premium':
        return <Star className="w-8 h-8 text-yellow-500" />;
      case 'api':
        return <Zap className="w-8 h-8 text-blue-500" />;
      case 'page':
        return <Rocket className="w-8 h-8 text-purple-500" />;
      case 'support':
        return <Sparkles className="w-8 h-8 text-pink-500" />;
      default:
        return <Clock className="w-8 h-8 text-primary-500" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'premium':
        return 'from-yellow-500 to-orange-500';
      case 'api':
        return 'from-blue-500 to-cyan-500';
      case 'page':
        return 'from-purple-500 to-pink-500';
      case 'support':
        return 'from-pink-500 to-rose-500';
      default:
        return 'from-primary-500 to-blue-500';
    }
  };

  const getBgGradient = () => {
    switch (type) {
      case 'premium':
        return 'from-yellow-50/80 to-orange-50/80 dark:from-yellow-900/20 dark:to-orange-900/20';
      case 'api':
        return 'from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20';
      case 'page':
        return 'from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20';
      case 'support':
        return 'from-pink-50/80 to-rose-50/80 dark:from-pink-900/20 dark:to-rose-900/20';
      default:
        return 'from-primary-50/80 to-blue-50/80 dark:from-primary-900/20 dark:to-blue-900/20';
    }
  };

  // Afficher un loader si les traductions ne sont pas prêtes
  if (isOpen && !ready) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">Loading translations...</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && ready && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.4 
            }}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100/80 dark:bg-slate-700/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors group z-10"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
            </motion.button>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-200/20 to-purple-200/20 rounded-full"
              />
              <motion.div 
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-yellow-200/20 rounded-full"
              />
            </div>

            {/* Content */}
            <div className="relative p-8">
              {/* Icon with sophisticated animation */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  delay: 0.2 
                }}
                className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradient()} flex items-center justify-center mb-6 shadow-lg`}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {getIcon()}
                </motion.div>
              </motion.div>

              {/* Title with stagger animation */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3"
              >
                {title || t('comingSoon.title')}
              </motion.h2>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                {description || t('comingSoon.description')}
              </motion.p>

              {/* Enhanced Features Preview */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 mb-8"
              >
                {[1, 2, 3].map((num, index) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`flex items-center gap-4 p-4 bg-gradient-to-r ${getBgGradient()} rounded-xl border border-gray-200/50 dark:border-slate-700/50`}
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle className={`w-5 h-5 ${
                        index === 0 ? 'text-primary-500' : 
                        index === 1 ? 'text-purple-500' : 'text-pink-500'
                      }`} />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t(`comingSoon.feature${num}`)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className={`bg-gradient-to-r ${getGradient()} rounded-2xl p-6 text-center text-white shadow-lg`}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <p className="font-semibold mb-2">
                    {t('comingSoon.stayTuned')}
                  </p>
                  <p className="text-sm text-white/90">
                    {t('comingSoon.thankYou')}
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom decoration with animation */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className={`h-1 bg-gradient-to-r ${getGradient()} origin-left`}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(ComingSoonModal);
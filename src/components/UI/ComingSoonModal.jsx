import { useState, useEffect } from 'react';
import { X, Sparkles, Clock, Star, Zap, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ComingSoonModal = ({ isOpen, onClose, type = 'feature', title, description }) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'premium':
        return <Star className="w-12 h-12 text-yellow-500" />;
      case 'api':
        return <Zap className="w-12 h-12 text-blue-500" />;
      case 'page':
        return <Rocket className="w-12 h-12 text-purple-500" />;
      case 'support':
        return <Sparkles className="w-12 h-12 text-pink-500" />;
      default:
        return <Clock className="w-12 h-12 text-primary-500" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'premium':
        return 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20';
      case 'api':
        return 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20';
      case 'page':
        return 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20';
      case 'support':
        return 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20';
      default:
        return 'from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 flex items-center justify-center transition-colors group z-10"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
        </button>

        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-purple-200/30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-yellow-200/30 rounded-full animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative p-8">
          {/* Icon with animation */}
          <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-br ${getGradient()} flex items-center justify-center mb-6 animate-bounce`}>
            {getIcon()}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-3">
            {title || t('comingSoon.title')}
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {description || t('comingSoon.description')}
          </p>

          {/* Features Preview */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('comingSoon.feature1')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('comingSoon.feature2')}
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {t('comingSoon.feature3')}
              </span>
            </div>
          </div>

          {/* Newsletter signup mockup */}
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-6 text-center text-white">
            <p className="text-sm font-medium mb-3">
              {t('comingSoon.notify')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('comingSoon.emailPlaceholder')}
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled
              />
              <button
                className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-colors disabled:opacity-50"
                disabled
              >
                {t('comingSoon.notifyMe')}
              </button>
            </div>
            <p className="text-xs text-white/80 mt-2">
              {t('comingSoon.comingSoonText')}
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
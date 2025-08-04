import { motion } from 'framer-motion';
import { ArrowRight, Check, Gift, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QRGeneratorAdvanced from '../components/QRGenerator/QRGeneratorAdvanced';
import Features from '../components/Features/Features';
import Templates from '../components/Templates/Templates';
import Pricing from '../components/Pricing/Pricing';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Testimonials from '../components/Testimonials/Testimonials';
import CTA from '../components/CTA/CTA';

const HomePage = () => {
  const { t } = useTranslation();
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden">
        {/* Background animé */}
        <div className="absolute inset-0 animated-gradient-bg opacity-10 dark:opacity-20"></div>
        
        {/* Floating shapes - Smaller on mobile */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-5 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 sm:opacity-20"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 sm:opacity-20"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-20 left-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 sm:opacity-20"
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            {/* Badge Gratuit - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full mb-4 sm:mb-6 font-medium"
            >
              <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">{t('hero.badge')}</span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight px-2">
              {t('hero.title')} <span className="gradient-text">{t('hero.titleHighlight')}</span><br className="hidden sm:block"/>
              <span className="sm:hidden"> </span>{t('hero.titleEnd')} <span className="relative inline-block">
                {t('hero.titleUnderline')}
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" height="8" viewBox="0 0 200 10">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="url(#gradient)" strokeWidth="2" fill="none"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#667eea', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'#764ba2', stopOpacity:1}} />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-slate-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex justify-center mb-6 sm:mb-8">
              <button
                onClick={scrollToGenerator}
                className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 sm:gap-3 min-h-[52px]"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features rapides - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-slate-300 mb-8 sm:mb-12 px-2"
            >
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span className="text-center sm:text-left">{t('hero.features.noSignup')}</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span className="text-center sm:text-left">{t('hero.features.hdExport')}</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span className="text-center sm:text-left">{t('hero.features.allTemplates')}</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span className="text-center sm:text-left">{t('hero.features.unlimited')}</span>
              </div>
            </motion.div>
            
            {/* Stats - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-xl px-4 py-3 sm:px-6 sm:py-4"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text">1M+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">{t('hero.stats.qrCreated')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-xl px-4 py-3 sm:px-6 sm:py-4"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text">50K+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">{t('hero.stats.activeUsers')}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-xl px-4 py-3 sm:px-6 sm:py-4"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-300">100%</div>
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-slate-300">{t('hero.stats.freeAndFast')}</div>
              </motion.div>
            </div>
          </motion.div>

          {/* QR Generator Section - Mobile Optimized */}
          <motion.div
            id="generator"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 sm:mt-16"
          >
            {/* Section Header - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mb-6 sm:mb-8 px-4"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                {t('hero.generator.title')} <span className="gradient-text">{t('hero.generator.titleHighlight')}</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-slate-200 max-w-2xl mx-auto">
                {t('hero.generator.subtitle')}
              </p>
            </motion.div>
            
            {/* Animated Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="relative"
            >
              {/* Glowing effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              
              {/* Pulsing rings */}
              <div className="absolute -inset-4 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              </div>
              
              {/* Main content */}
              <div className="relative">
                <QRGeneratorAdvanced 
                  template={null}
                  templateOptions={null}
                  onDataChange={() => {}}
                  initialData="https://qr-designer.com"
                />
              </div>
            </motion.div>
            
            {/* Features badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>{t('hero.generator.features.instant')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{t('hero.generator.features.contentTypes')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                <Gift className="w-4 h-4" />
                <span>{t('hero.generator.features.freeTemplates')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Templates Section */}
      <Templates />

      {/* Features Section */}
      <Features />

      {/* How it Works */}
      <HowItWorks />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default HomePage;

import { motion } from 'framer-motion';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-700 text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6"
          >
            <Gift className="w-5 h-5" />
            <span className="font-medium">{t('cta.badge')}</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <button
            onClick={scrollToGenerator}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            <Sparkles className="w-6 h-6" />
            {t('cta.button')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-sm text-white/70 mt-6">
            {t('cta.disclaimer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
import { CheckCircle, Gift, Zap, Shield, Sparkles, Heart, Users } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const getFeatures = (t) => [
  {
    icon: Zap,
    title: t('pricing.free.features.fastGeneration.title'),
    description: t('pricing.free.features.fastGeneration.description')
  },
  {
    icon: Sparkles,
    title: t('pricing.free.features.basicTemplates.title'),
    description: t('pricing.free.features.basicTemplates.description')
  },
  {
    icon: Shield,
    title: t('pricing.free.features.standardExport.title'),
    description: t('pricing.free.features.standardExport.description')
  },
  {
    icon: CheckCircle,
    title: t('pricing.free.features.noSignup.title'),
    description: t('pricing.free.features.noSignup.description')
  }
];

const getWhyFree = (t) => [
  {
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    title: t('pricing.commitment.mission.title'),
    description: t('pricing.commitment.mission.description')
  },
  {
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    title: t('pricing.commitment.community.title'),
    description: t('pricing.commitment.community.description')
  },
  {
    icon: Gift,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    title: t('pricing.commitment.alwaysFree.title'),
    description: t('pricing.commitment.alwaysFree.description')
  }
];

const Pricing = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);
  const whyFree = getWhyFree(t);
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-dark-900 dark:to-dark-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-medium">{t('pricing.startFree.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('pricing.title')} <span className="gradient-text">{t('pricing.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-1">
            <div className="bg-white dark:bg-dark-900 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-2xl mb-6">
                  <Sparkles className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-3xl font-bold mb-2">{t('pricing.free.name')}</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-gray-600 dark:text-gray-400">{t('pricing.free.period')}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('pricing.free.description')}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <button
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  {t('pricing.free.cta')}
                  <CheckCircle className="inline w-5 h-5 ml-2" />
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  {t('pricing.free.noCreditCard')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Why Free Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-8">{t('pricing.commitment.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyFree.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-dark-800 rounded-full">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-gray-700 dark:text-gray-300">
              <Trans 
                i18nKey="pricing.security.badge" 
                components={{ strong: <strong /> }}
              />
            </span>
          </div>
        </motion.div>

        {/* Future Plans Teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {t('pricing.comingSoon.message')}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

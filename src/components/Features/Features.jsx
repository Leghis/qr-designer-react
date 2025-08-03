import { Palette, Zap, Smartphone, Image, ShieldCheck, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Palette,
      titleKey: 'features.items.totalCustomization.title',
      descriptionKey: 'features.items.totalCustomization.description',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      titleKey: 'features.items.instantGeneration.title',
      descriptionKey: 'features.items.instantGeneration.description',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Smartphone,
      titleKey: 'features.items.responsive.title',
      descriptionKey: 'features.items.responsive.description',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Image,
      titleKey: 'features.items.hdExport.title',
      descriptionKey: 'features.items.hdExport.description',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: ShieldCheck,
      titleKey: 'features.items.secure.title',
      descriptionKey: 'features.items.secure.description',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Heart,
      titleKey: 'features.items.freeForever.title',
      descriptionKey: 'features.items.freeForever.description',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('features.mainTitle')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('features.mainSubtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6 hover-lift"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(feature.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t(feature.descriptionKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

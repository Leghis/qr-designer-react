import { Briefcase, Utensils, Calendar, Share2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const getTemplates = (t) => [
  {
    id: 'business',
    name: t('templates.examples.business.name'),
    description: t('templates.examples.business.description'),
    icon: Briefcase,
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600'
  },
  {
    id: 'restaurant',
    name: t('templates.examples.restaurant.name'),
    description: t('templates.examples.restaurant.description'),
    icon: Utensils,
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600'
  },
  {
    id: 'event',
    name: t('templates.examples.event.name'),
    description: t('templates.examples.event.description'),
    icon: Calendar,
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600'
  },
  {
    id: 'social',
    name: t('templates.examples.social.name'),
    description: t('templates.examples.social.description'),
    icon: Share2,
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    iconColor: 'text-pink-600'
  }
];

const Templates = () => {
  const { t } = useTranslation();
  const templates = getTemplates(t);
  
  const handleTemplateClick = () => {
    // Scroll to generator and apply template
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    // TODO: Apply template to generator
  };

  return (
    <section id="templates" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('templates.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('templates.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleTemplateClick(template.id)}
                className="bg-white dark:bg-dark-900 rounded-xl p-6 hover-lift cursor-pointer template-card"
              >
                <div className={`${template.bgColor} rounded-lg p-8 mb-4 flex items-center justify-center`}>
                  <Icon className={`w-16 h-16 ${template.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {template.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
{t('templates.viewAll')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;

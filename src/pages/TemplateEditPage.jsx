import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Crown, Sparkles, Palette, Type, Image, Settings } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import QRGeneratorAdvanced from '../components/QRGenerator/QRGeneratorAdvanced';
import { useSubscription } from '../hooks/useSubscription';
import { useNotification } from '../hooks/useNotification';
import { useState, useEffect } from 'react';
import Badge from '../components/UI/Badge';
import { loadTemplateById } from '../services/templateService';

const TemplateEditPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPremium, canUsePremiumTemplate } = useSubscription();
  const { showNotification } = useNotification();
  const [template, setTemplate] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Charger le template de manière asynchrone
    const fetchTemplate = async () => {
      setIsLoading(true);
      try {
        const loadedTemplate = await loadTemplateById(id);
        
        if (loadedTemplate) {
          setTemplate(loadedTemplate);
        } else {
          // Template non trouvé
          showNotification(t('templateEdit.errors.notFound'), 'error');
          navigate('/templates');
        }
      } catch (error) {
        console.error('Error loading template:', error);
        showNotification(t('templateEdit.errors.loadError'), 'error');
        navigate('/templates');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTemplate();
  }, [id, navigate, showNotification, t]);

  // Vérifier l'accès au template premium
  useEffect(() => {
    if (template && template.isPremium && !canUsePremiumTemplate(template.id)) {
      showNotification(t('templateEdit.premium.accessRequired'), 'info');
      navigate('/premium');
    }
  }, [template, canUsePremiumTemplate, navigate, showNotification, t]);

  // Scroll automatiquement vers le générateur de QR code après le chargement
  useEffect(() => {
    if (template) {
      // D'abord, s'assurer qu'on est en haut de la page
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Attendre un peu pour que la page soit complètement rendue
      setTimeout(() => {
        const generatorSection = document.getElementById('qr-generator-section');
        if (generatorSection) {
          // Calculer la position avec un offset pour tenir compte du header fixe et ajouter une marge
          const headerHeight = 100; // Hauteur du header + marge supplémentaire
          const elementPosition = generatorSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Ajouter un effet de highlight temporaire
          setTimeout(() => {
            setIsHighlighted(true);
            // Retirer le highlight après 2 secondes
            setTimeout(() => {
              setIsHighlighted(false);
            }, 2000);
          }, 600); // Après la fin du scroll
        }
      }, 500);
    }
  }, [template]);

  const handleQrDataChange = () => {
    // Data is handled by the QRGeneratorTemplateEditor component
  };

  // Features for display
  const features = [
    {
      icon: Palette,
      title: t('templateEdit.features.customization.title'),
      description: t('templateEdit.features.customization.description')
    },
    {
      icon: Type,
      title: t('templateEdit.features.data.title'),
      description: t('templateEdit.features.data.description')
    },
    {
      icon: Image,
      title: t('templateEdit.features.logo.title'),
      description: t('templateEdit.features.logo.description')
    },
    {
      icon: Settings,
      title: t('templateEdit.features.options.title'),
      description: t('templateEdit.features.options.description')
    }
  ];

  // Steps
  const steps = [
    {
      number: '1',
      title: t('templateEdit.steps.select.title'),
      description: t('templateEdit.steps.select.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '2',
      title: t('templateEdit.steps.customize.title'),
      description: t('templateEdit.steps.customize.description'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '3',
      title: t('templateEdit.steps.download.title'),
      description: t('templateEdit.steps.download.description'),
      color: 'from-green-500 to-green-600'
    }
  ];

  if (isLoading || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section avec Template Info */}
      <section className="relative overflow-hidden pb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-purple-50/30 to-pink-50/50 dark:from-primary-900/20 dark:via-purple-900/10 dark:to-pink-900/20"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/templates" 
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {t('templateEdit.navigation.backToGallery')}
            </Link>
          </motion.div>

          {/* Template Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                {t('templateEdit.header.title')} <span className="gradient-text">{template.name}</span>
              </h1>
              {template.isPremium && (
                <Badge type="premium" className="flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  Premium
                </Badge>
              )}
            </div>
            {template.description && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {template.description}
              </p>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section id="qr-generator-section" className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isHighlighted ? 'ring-4 ring-primary-500 ring-opacity-50 scale-[1.01]' : ''
          }`}
        >
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">{t('templateEdit.generator.title')}</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <Trans 
                        i18nKey="templateEdit.generator.description" 
                        values={{ templateName: template.name }}
                        components={{ strong: <strong /> }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <QRGeneratorAdvanced 
              template={template}
              templateOptions={template.options}
              onDataChange={handleQrDataChange}
              initialData="https://qr-designer.com"
            />
          </div>
        </motion.div>

        {/* Steps Process */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('templateEdit.steps.title')} <span className="gradient-text">{t('templateEdit.steps.titleHighlight')}</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700"></div>
                )}
                
                <div className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto transform hover:scale-110 transition-transform`}>
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        {template.isPremium && !isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 shadow-lg">
              <Sparkles className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                {t('templateEdit.premium.unlockTitle')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {t('templateEdit.premium.unlockDescription')}
              </p>
              <Link
                to="/premium"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                <Crown className="w-5 h-5" />
                {t('templateEdit.premium.discoverOffers')}
              </Link>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default TemplateEditPage;

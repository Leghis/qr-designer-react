import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Sparkles, Palette, Type, Image, Settings } from 'lucide-react';
import { premiumTemplates, qrTemplates } from '../services/qrService';
import QRGeneratorTemplateEditor from '../components/QRGenerator/QRGeneratorTemplateEditor';
import { useSubscription } from '../hooks/useSubscription.jsx';
import { useNotification } from '../context/NotificationContext';
import { useState, useEffect } from 'react';
import Badge from '../components/UI/Badge';

const TemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPremium, canUsePremiumTemplate } = useSubscription();
  const { showNotification } = useNotification();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    // Rechercher le template dans les templates premium
    const premiumTemplate = premiumTemplates.find(t => t.id === id);
    
    if (premiumTemplate) {
      setTemplate(premiumTemplate);
    } else {
      // Si pas trouvé dans premium, chercher dans les templates de base
      const basicTemplate = Object.entries(qrTemplates).find(([key]) => key === id);
      if (basicTemplate) {
        setTemplate({
          id: basicTemplate[0],
          name: basicTemplate[1].name,
          isPremium: basicTemplate[1].isPremium,
          options: {
            dotsOptions: { 
              color: basicTemplate[1].dotsColor,
              type: basicTemplate[1].dotsType
            },
            backgroundOptions: { 
              color: basicTemplate[1].bgColor 
            },
            cornersSquareOptions: { 
              color: basicTemplate[1].cornersColor,
              type: basicTemplate[1].cornersType
            },
            cornersDotOptions: { 
              color: basicTemplate[1].cornersColor,
              type: basicTemplate[1].cornersType
            }
          }
        });
      } else {
        // Template non trouvé
        showNotification('Template non trouvé', 'error');
        navigate('/templates');
      }
    }
  }, [id, navigate, showNotification]);

  // Vérifier l'accès au template premium
  useEffect(() => {
    if (template && template.isPremium && !canUsePremiumTemplate(template.id)) {
      showNotification('Passez au plan Premium pour utiliser ce template', 'info');
      navigate('/premium');
    }
  }, [template, canUsePremiumTemplate, navigate, showNotification]);

  const handleQrDataChange = () => {
    // Data is handled by the QRGeneratorTemplateEditor component
  };

  // Features for display
  const features = [
    {
      icon: Palette,
      title: 'Personnalisation',
      description: 'Couleurs et styles'
    },
    {
      icon: Type,
      title: 'Données',
      description: 'URL, texte, contact'
    },
    {
      icon: Image,
      title: 'Logo',
      description: 'Ajoutez votre marque'
    },
    {
      icon: Settings,
      title: 'Options',
      description: 'Finitions avancées'
    }
  ];

  // Steps
  const steps = [
    {
      number: '1',
      title: 'Sélectionnez',
      description: 'Choisissez votre template',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: '2',
      title: 'Personnalisez',
      description: 'Adaptez les couleurs et le style',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: '3',
      title: 'Téléchargez',
      description: 'Exportez en haute qualité',
      color: 'from-green-500 to-green-600'
    }
  ];

  if (!template) {
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
              Retour à la galerie
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
                Template <span className="gradient-text">{template.name}</span>
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
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Personnalisez votre QR Code</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Vous éditez le template <strong>{template.name}</strong>. 
                      L'aperçu se met à jour en temps réel à droite.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <QRGeneratorTemplateEditor 
              template={template}
              templateOptions={template.options}
              onDataChange={handleQrDataChange}
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
            Créez votre QR Code en <span className="gradient-text">3 étapes simples</span>
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
                Débloquez ce template Premium
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Accédez à tous nos templates exclusifs et créez des QR codes uniques qui marquent les esprits
              </p>
              <Link
                to="/premium"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
              >
                <Crown className="w-5 h-5" />
                Découvrir les offres Premium
              </Link>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default TemplateEditPage;
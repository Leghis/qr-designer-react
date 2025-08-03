import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Sparkles, Download, Eye, Palette, Type, Image, Settings, CheckCircle } from 'lucide-react';
import { premiumTemplates, qrTemplates } from '../services/qrService';
import QRGenerator from '../components/QRGenerator/QRGenerator';
import { useSubscription } from '../hooks/useSubscription.jsx';
import { useNotification } from '../context/NotificationContext';
import { useState, useEffect, useRef } from 'react';
import Badge from '../components/UI/Badge';
import QRCodeStyling from 'qr-code-styling';

const TemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isPremium, canUsePremiumTemplate } = useSubscription();
  const { showNotification } = useNotification();
  const [template, setTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('customize');
  const [qrData, setQrData] = useState('https://qr-designer.com');
  const previewQrRef = useRef(null);
  const previewContainerRef = useRef(null);

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

  // Générer l'aperçu QR code
  useEffect(() => {
    if (activeTab === 'preview' && template && previewContainerRef.current) {
      // Clear existing QR code
      previewContainerRef.current.innerHTML = '';
      
      // Generate preview QR code
      const qrOptions = {
        width: 300,
        height: 300,
        type: "svg",
        data: qrData,
        margin: 20,
        ...template.options,
        dotsOptions: {
          ...template.options.dotsOptions
        },
        backgroundOptions: {
          ...template.options.backgroundOptions
        },
        cornersSquareOptions: {
          ...template.options.cornersSquareOptions
        },
        cornersDotOptions: {
          ...template.options.cornersDotOptions
        }
      };
      
      previewQrRef.current = new QRCodeStyling(qrOptions);
      previewQrRef.current.append(previewContainerRef.current);
    }
  }, [activeTab, template, qrData]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Chargement du template...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Palette,
      title: 'Personnalisation Complète',
      description: 'Modifiez les couleurs, formes et styles'
    },
    {
      icon: Image,
      title: 'Logo & Image',
      description: 'Ajoutez votre logo ou une image au centre'
    },
    {
      icon: Type,
      title: 'Contenu Dynamique',
      description: 'URL, texte, vCard, WiFi et plus encore'
    },
    {
      icon: Download,
      title: 'Export HD',
      description: 'Téléchargez en PNG ou SVG haute qualité'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Choisissez votre contenu',
      description: 'URL, texte, contact, WiFi...',
      color: 'from-blue-400 to-blue-600'
    },
    {
      number: '02',
      title: 'Personnalisez le design',
      description: 'Couleurs, formes, logo...',
      color: 'from-purple-400 to-purple-600'
    },
    {
      number: '03',
      title: 'Téléchargez & Utilisez',
      description: 'PNG, SVG haute qualité',
      color: 'from-green-400 to-green-600'
    }
  ];

  const handleDownloadPreview = async (format) => {
    if (previewQrRef.current) {
      try {
        if (format === 'png') {
          await previewQrRef.current.download({ name: `qr-${template.name}`, extension: 'png' });
        } else {
          await previewQrRef.current.download({ name: `qr-${template.name}`, extension: 'svg' });
        }
        showNotification(`QR code téléchargé en ${format.toUpperCase()}`, 'success');
      } catch (err) {
        showNotification('Erreur lors du téléchargement', 'error');
      }
    }
  };

  const handleQrDataChange = (newData) => {
    setQrData(newData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800">
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

      {/* Main Content avec marge appropriée */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('customize')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'customize'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  Personnaliser
                </div>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Aperçu
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'customize' ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">Personnalisez votre QR Code</h2>
                <QRGenerator 
                  preSelectedTemplate={template.id}
                  templateOptions={template.options}
                  onDataChange={handleQrDataChange}
                />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Aperçu en temps réel</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Voici votre QR code avec le template {template.name} appliqué
                  </p>
                </div>

                {/* QR Code Preview */}
                <div className="flex justify-center">
                  <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-8 inline-block">
                    <div 
                      ref={previewContainerRef} 
                      className="qr-preview"
                      style={{ minHeight: '300px', minWidth: '300px' }}
                    />
                  </div>
                </div>

                {/* Download Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleDownloadPreview('png')}
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger PNG
                  </button>
                  <button
                    onClick={() => handleDownloadPreview('svg')}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger SVG
                  </button>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    QR Code prêt à être téléchargé
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Steps Process avec marge appropriée */}
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

        {/* Call to Action avec marge appropriée */}
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
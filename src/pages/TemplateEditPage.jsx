import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Info } from 'lucide-react';
import { premiumTemplates, qrTemplates } from '../services/qrService';
import QRGenerator from '../components/QRGenerator/QRGenerator';
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

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header avec navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to="/templates" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la galerie
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                Template : <span className="gradient-text">{template.name}</span>
              </h1>
              {template.isPremium && (
                <Badge type="premium" className="flex items-center gap-1">
                  <Crown className="w-4 h-4" />
                  Premium
                </Badge>
              )}
            </div>
          </div>

          {template.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-4 flex items-start gap-2">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              {template.description}
            </p>
          )}
        </motion.div>

        {/* Générateur QR avec template pré-appliqué */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Personnalisez votre QR Code</h2>
            <QRGenerator 
              preSelectedTemplate={template.id}
              templateOptions={template.options}
            />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Saisissez vos données</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Entrez l'URL, le texte ou les informations que vous souhaitez encoder dans votre QR code.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Personnalisez le design</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ajustez les couleurs, ajoutez votre logo et modifiez le style selon vos préférences.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Téléchargez votre QR</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Exportez votre QR code en haute qualité (PNG ou SVG) pour l'utiliser partout.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateEditPage;
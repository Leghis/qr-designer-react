import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Crown, ArrowRight, Lock } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { defaultQROptions } from '../../services/qrService';
import { useSubscription } from '../../hooks/useSubscription';
import { useNotification } from '../../hooks/useNotification';

const PremiumTemplateCard = ({ template }) => {
  const { t } = useTranslation();
  const [isInView, setIsInView] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const qrRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { isPremium, canUsePremiumTemplate } = useSubscription();
  const { showNotification } = useNotification();

  // Lazy load QR code when card comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !qrGenerated) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = cardRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [qrGenerated]);

  // Generate QR code when in view
  useEffect(() => {
    if (isInView && !qrGenerated && qrRef.current) {
      const qrOptions = {
        ...defaultQROptions,
        ...template.options,
        width: 200,
        height: 200,
        data: `https://qr-designer.com/template/${template.id}`
      };

      const qrCode = new QRCodeStyling(qrOptions);
      qrCode.append(qrRef.current);
      setQrGenerated(true);
    }
  }, [isInView, qrGenerated, template]);

  const handleUseTemplate = () => {
    if (template.isPremium && !canUsePremiumTemplate(template.id)) {
      showNotification(t('templateEdit.premium.accessRequired'), 'info');
      // Redirect to pricing section
      navigate('/#pricing');
      return;
    }
    
    // Navigate to template edit page
    navigate(`/templates/${template.id}`);
  };

  const categoryColors = {
    spectacular: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-amber-300',
    professional: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    creative: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    event: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    hospitality: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    retail: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    health: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    education: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    social: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
  };

  const isLocked = template.isPremium && !isPremium;

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{template.name}</h3>
          <Crown className="w-5 h-5" />
        </div>
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[template.category]}`}>
          {template.category}
        </span>
      </div>

      {/* QR Preview */}
      <div className="p-6">
        <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4 mb-4 flex items-center justify-center h-[250px] relative">
          {isInView ? (
            <>
              <div ref={qrRef} className={`qr-preview max-w-[200px] max-h-[200px] ${isLocked ? 'blur-md' : ''}`}></div>
              {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/20 rounded-lg">
                  <div className="bg-white dark:bg-dark-900 rounded-full p-4 shadow-lg">
                    <Lock className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-[200px] h-[200px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {template.description}
        </p>

        {/* Action Button */}
        <button
          onClick={handleUseTemplate}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group ${
            isLocked
              ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700'
              : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              Débloquer ce template
            </>
          ) : (
            <>
              Utiliser ce template
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default PremiumTemplateCard;

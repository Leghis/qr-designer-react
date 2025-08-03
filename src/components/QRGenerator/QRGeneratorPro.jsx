import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link2, 
  Type, 
  Wifi, 
  User, 
  Calendar,
  Mail,
  MessageSquare,
  MapPin,
  CreditCard,
  UtensilsCrossed,
  ArrowRight,
  ArrowLeft,
  Check,
  Download,
  Share2,
  Sparkles
} from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import historyService from '../../services/historyService';

// Steps configuration
const STEPS = [
  { id: 1, title: 'Type de contenu', icon: Link2 },
  { id: 2, title: 'Style du QR', icon: Sparkles },
  { id: 3, title: 'Couleurs', icon: null }, // Will use color circles
  { id: 4, title: 'Finitions', icon: null }, // Will use custom icon
  { id: 5, title: 'Télécharger', icon: Download }
];

// Content types
const CONTENT_TYPES = [
  { id: 'url', name: 'URL / Lien', icon: Link2, color: 'from-blue-500 to-blue-600', description: 'Site web, page, lien' },
  { id: 'text', name: 'Texte', icon: Type, color: 'from-gray-500 to-gray-600', description: 'Message simple' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, color: 'from-purple-500 to-purple-600', description: 'Configuration réseau' },
  { id: 'vcard', name: 'Contact', icon: User, color: 'from-pink-500 to-pink-600', description: 'Carte de visite' },
  { id: 'event', name: 'Événement', icon: Calendar, color: 'from-orange-500 to-orange-600', description: 'Calendrier' },
  { id: 'email', name: 'Email', icon: Mail, color: 'from-red-500 to-red-600', description: 'Message pré-rempli' },
  { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'from-teal-500 to-teal-600', description: 'SMS préconfiguré' },
  { id: 'location', name: 'Lieu', icon: MapPin, color: 'from-green-500 to-green-600', description: 'Coordonnées GPS' }
];

// Premium content types
const PREMIUM_TYPES = [
  { id: 'payment', name: 'Paiement', icon: CreditCard, color: 'from-indigo-500 to-indigo-600', description: 'PayPal, Stripe' },
  { id: 'menu', name: 'Menu', icon: UtensilsCrossed, color: 'from-amber-500 to-amber-600', description: 'Menu restaurant' }
];

// QR Styles
export const QR_STYLES = [
  { 
    id: 'classic', 
    name: 'Classique', 
    preview: { dotsType: 'square', cornersType: 'square' },
    description: 'Style traditionnel'
  },
  { 
    id: 'rounded', 
    name: 'Arrondi', 
    preview: { dotsType: 'rounded', cornersType: 'extra-rounded' },
    description: 'Coins doux'
  },
  { 
    id: 'dots', 
    name: 'Points', 
    preview: { dotsType: 'dots', cornersType: 'dot' },
    description: 'Style moderne'
  },
  { 
    id: 'elegant', 
    name: 'Élégant', 
    preview: { dotsType: 'classy', cornersType: 'square' },
    description: 'Sophistiqué'
  },
  { 
    id: 'smooth', 
    name: 'Fluide', 
    preview: { dotsType: 'classy-rounded', cornersType: 'extra-rounded' },
    description: 'Organique'
  },
  { 
    id: 'extra', 
    name: 'Extra', 
    preview: { dotsType: 'extra-rounded', cornersType: 'dot' },
    description: 'Ultra moderne'
  }
];

// Color palettes
export const COLOR_PALETTES = [
  { 
    id: 'classic', 
    name: 'Classique', 
    colors: { dots: '#000000', background: '#FFFFFF', corners: '#000000' },
    preview: ['#000000', '#FFFFFF']
  },
  { 
    id: 'ocean', 
    name: 'Océan', 
    colors: { dots: '#0EA5E9', background: '#F0F9FF', corners: '#0284C7' },
    preview: ['#0EA5E9', '#F0F9FF', '#0284C7']
  },
  { 
    id: 'sunset', 
    name: 'Coucher de soleil', 
    colors: { dots: '#F97316', background: '#FFF7ED', corners: '#DC2626' },
    preview: ['#F97316', '#FFF7ED', '#DC2626']
  },
  { 
    id: 'forest', 
    name: 'Forêt', 
    colors: { dots: '#10B981', background: '#ECFDF5', corners: '#059669' },
    preview: ['#10B981', '#ECFDF5', '#059669']
  },
  { 
    id: 'lavender', 
    name: 'Lavande', 
    colors: { dots: '#8B5CF6', background: '#FAF5FF', corners: '#7C3AED' },
    preview: ['#8B5CF6', '#FAF5FF', '#7C3AED']
  },
  { 
    id: 'midnight', 
    name: 'Minuit', 
    colors: { dots: '#1E293B', background: '#F8FAFC', corners: '#334155' },
    preview: ['#1E293B', '#F8FAFC', '#334155']
  },
  { 
    id: 'coral', 
    name: 'Corail', 
    colors: { dots: '#F472B6', background: '#FDF2F8', corners: '#EC4899' },
    preview: ['#F472B6', '#FDF2F8', '#EC4899']
  },
  { 
    id: 'custom', 
    name: 'Personnalisé', 
    colors: null,
    preview: ['?', '?', '?']
  }
];

const QRGeneratorPro = () => {
  const { showNotification } = useNotification();
  const { isAuthenticated } = useAuth();
  const { isPremium } = useSubscription();
  
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrOptions, setQrOptions] = useState({
    contentType: null,
    contentData: {},
    style: null,
    colors: null,
    customColors: { dots: '#000000', background: '#FFFFFF', corners: '#000000' },
    shape: 'square',
    logo: null,
    logoSize: 0.3
  });
  
  // Refs
  const qrCodeRef = useRef(null);
  const previewRef = useRef(null);
  
  // Generate QR code
  const generateQR = () => {
    if (!previewRef.current || !qrOptions.contentType) return;
    
    setIsGenerating(true);
    
    try {
      // Clear previous QR
      previewRef.current.innerHTML = '';
      
      // Get content data
      const data = getQRData();
      if (!data && currentStep === 5) {
        showNotification('Veuillez remplir tous les champs requis', 'error');
        return;
      }
      
      // Use default data if empty for preview
      const qrData = data || 'https://qr-designer.com';
      
      // Build QR options
      const colors = qrOptions.colors === 'custom' ? qrOptions.customColors : COLOR_PALETTES.find(p => p.id === qrOptions.colors)?.colors;
      const style = QR_STYLES.find(s => s.id === qrOptions.style)?.preview || {};
      
      const options = {
        width: 300,
        height: 300,
        type: 'svg',
        data: qrData,
        margin: 20,
        dotsOptions: {
          color: colors?.dots || '#000000',
          type: style.dotsType || 'square'
        },
        backgroundOptions: {
          color: colors?.background || '#FFFFFF'
        },
        cornersSquareOptions: {
          color: colors?.corners || '#000000',
          type: style.cornersType || 'square'
        },
        cornersDotOptions: {
          color: colors?.corners || '#000000',
          type: style.cornersType || 'square'
        },
        imageOptions: {
          hideBackgroundDots: true,
          crossOrigin: 'anonymous',
          margin: 10,
          imageSize: qrOptions.logoSize || 0.3
        },
        image: qrOptions.logo || undefined
      };
      
      // Apply shape
      if (qrOptions.shape === 'circle') {
        options.shape = 'circle';
      }
      
      qrCodeRef.current = new QRCodeStyling(options);
      qrCodeRef.current.append(previewRef.current);
      
      // Save to history
      if (isAuthenticated && currentStep >= 3) {
        historyService.addQRCode({
          data,
          type: qrOptions.contentType,
          template: qrOptions.style,
          options: {
            colors,
            shape: qrOptions.shape,
            logo: qrOptions.logo ? 'custom' : null
          }
        });
      }
      
    } catch (error) {
      console.error('Error generating QR:', error);
      showNotification('Erreur lors de la génération', 'error');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Generate QR data based on content type
  const getQRData = () => {
    const { contentType, contentData } = qrOptions;
    
    switch (contentType) {
      case 'url':
        return contentData.url || '';
        
      case 'text':
        return contentData.text || '';
        
      case 'wifi':
        return `WIFI:T:${contentData.security || 'WPA'};S:${contentData.ssid || ''};P:${contentData.password || ''};H:${contentData.hidden ? 'true' : 'false'};;`;
        
      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${contentData.firstName || ''} ${contentData.lastName || ''}
N:${contentData.lastName || ''};${contentData.firstName || ''};;;
${contentData.phone ? `TEL:${contentData.phone}` : ''}
${contentData.email ? `EMAIL:${contentData.email}` : ''}
${contentData.company ? `ORG:${contentData.company}` : ''}
${contentData.title ? `TITLE:${contentData.title}` : ''}
${contentData.website ? `URL:${contentData.website}` : ''}
END:VCARD`;
        
      case 'email': {
        const emailParams = [];
        if (contentData.subject) emailParams.push(`subject=${encodeURIComponent(contentData.subject)}`);
        if (contentData.body) emailParams.push(`body=${encodeURIComponent(contentData.body)}`);
        return `mailto:${contentData.to || ''}${emailParams.length > 0 ? '?' + emailParams.join('&') : ''}`;
      }
        
      case 'sms':
        return `sms:${contentData.phone || ''}${contentData.message ? `?body=${encodeURIComponent(contentData.message)}` : ''}`;
        
      case 'location':
        return `geo:${contentData.latitude || 0},${contentData.longitude || 0}${contentData.name ? `?q=${encodeURIComponent(contentData.name)}` : ''}`;
        
      case 'event': {
        const startDate = contentData.startDate ? new Date(contentData.startDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') : '';
        const endDate = contentData.endDate ? new Date(contentData.endDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') : startDate;
        return `BEGIN:VEVENT
SUMMARY:${contentData.title || ''}
LOCATION:${contentData.location || ''}
DTSTART:${startDate}
DTEND:${endDate}
${contentData.description ? `DESCRIPTION:${contentData.description}` : ''}
END:VEVENT`;
      }
        
      case 'payment':
        if (contentData.provider === 'PayPal') {
          return `https://paypal.me/demo/${contentData.amount || '10'}${contentData.currency || 'EUR'}`;
        } else {
          return `https://checkout.stripe.com/demo/${contentData.amount || '10'}${contentData.currency || 'EUR'}`;
        }
        
      case 'menu':
        return `https://qr-designer.com/menu/${contentData.menuId || 'demo'}`;
        
      default:
        return '';
    }
  };
  
  // Update QR when options change
  useEffect(() => {
    if (currentStep >= 2 && qrOptions.style) {
      generateQR();
    }
  }, [qrOptions.style, qrOptions.colors, qrOptions.customColors, qrOptions.shape, qrOptions.logo, qrOptions.logoSize, currentStep]);
  
  // Navigation
  const goToStep = (step) => {
    if (step >= 1 && step <= STEPS.length) {
      setCurrentStep(step);
    }
  };
  
  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Download QR
  const downloadQR = async (format) => {
    if (!qrCodeRef.current) {
      showNotification('Veuillez d\'abord générer un QR code', 'error');
      return;
    }
    
    // Check if all required fields are filled for final download
    const data = getQRData();
    if (!data) {
      showNotification('Veuillez remplir tous les champs requis avant de télécharger', 'error');
      return;
    }
    
    try {
      // Regenerate with final data before download
      generateQR();
      
      // Wait a bit for QR to regenerate
      setTimeout(async () => {
        if (format === 'png') {
          await qrCodeRef.current.download({
            name: 'qr-code',
            extension: 'png'
          });
        } else {
          const blob = await qrCodeRef.current.getRawData('svg');
          const url = URL.createObjectURL(new Blob([blob], { type: 'image/svg+xml' }));
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qr-code.svg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        
        showNotification(`QR code téléchargé en ${format.toUpperCase()}`, 'success');
      }, 100);
    } catch (error) {
      showNotification('Erreur lors du téléchargement', 'error');
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToStep(step.id)}
                className={`relative cursor-pointer ${
                  currentStep >= step.id ? 'z-10' : 'z-0'
                }`}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all
                  ${currentStep === step.id 
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg' 
                    : currentStep > step.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : step.icon ? (
                    <step.icon className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                
                {/* Step Title */}
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`
                    absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap
                    ${currentStep === step.id 
                      ? 'text-primary-600 dark:text-primary-400 font-semibold' 
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                >
                  {step.title}
                </motion.span>
              </motion.div>
              
              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="flex-1 h-1 mx-3">
                  <div className="h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-gradient-to-r from-primary-600 to-purple-600"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Step Content */}
        <div className="lg:col-span-2">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Content Type */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Que souhaitez-vous encoder ?</h2>
                  
                  {/* Free Types */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {CONTENT_TYPES.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setQrOptions({ ...qrOptions, contentType: type.id, contentData: {} });
                          nextStep();
                        }}
                        className={`
                          relative p-6 rounded-xl border-2 transition-all group
                          ${qrOptions.contentType === type.id 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`
                            w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} 
                            flex items-center justify-center text-white
                            group-hover:scale-110 transition-transform
                          `}>
                            <type.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {type.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Premium Types */}
                  {!isPremium && (
                    <>
                      <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white dark:bg-dark-800 text-gray-500 dark:text-gray-400">
                            Types Premium
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {PREMIUM_TYPES.map((type) => (
                          <motion.button
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => showNotification('Passez au plan Premium pour utiliser ce type', 'info')}
                            className="relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed group"
                          >
                            <div className="absolute top-2 right-2">
                              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full">
                                Premium
                              </span>
                            </div>
                            <div className="flex items-start gap-4">
                              <div className={`
                                w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} 
                                flex items-center justify-center text-white
                              `}>
                                <type.icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 text-left">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                  {type.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}
              
              {/* Step 2: Style */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Choisissez un style</h2>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {QR_STYLES.map((style) => (
                      <motion.button
                        key={style.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setQrOptions({ ...qrOptions, style: style.id });
                          generateQR(); // Generate preview immediately
                          nextStep();
                        }}
                        className={`
                          p-6 rounded-xl border-2 transition-all
                          ${qrOptions.style === style.id 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                      >
                        {/* Mini QR Preview */}
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <div className="text-3xl">◫</div>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {style.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {style.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Content Form */}
                  {qrOptions.contentType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-8 p-6 bg-gray-50 dark:bg-dark-900 rounded-xl"
                    >
                      <h3 className="font-semibold mb-4">Informations à encoder (optionnel pour l'aperçu)</h3>
                      <ContentForm 
                        type={qrOptions.contentType} 
                        data={qrOptions.contentData}
                        onChange={(data) => {
                          setQrOptions({ ...qrOptions, contentData: data });
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {/* Step 3: Colors */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Palette de couleurs</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {COLOR_PALETTES.map((palette) => (
                      <motion.button
                        key={palette.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setQrOptions({ ...qrOptions, colors: palette.id });
                          if (palette.id !== 'custom') {
                            setTimeout(() => generateQR(), 100); // Small delay to let state update
                            nextStep();
                          }
                        }}
                        className={`
                          p-6 rounded-xl border-2 transition-all
                          ${qrOptions.colors === palette.id 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          {/* Color Preview */}
                          <div className="flex gap-1">
                            {palette.preview.map((color, index) => (
                              <div
                                key={index}
                                className="w-8 h-8 rounded-lg shadow-sm"
                                style={{ backgroundColor: color === '?' ? '#E5E7EB' : color }}
                              >
                                {color === '?' && (
                                  <span className="flex items-center justify-center h-full text-gray-500">?</span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {palette.name}
                            </h3>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Custom Color Picker */}
                  {qrOptions.colors === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 p-6 bg-gray-50 dark:bg-dark-900 rounded-xl"
                    >
                      <h3 className="font-semibold mb-4">Couleurs personnalisées</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Points
                          </label>
                          <input
                            type="color"
                            value={qrOptions.customColors.dots}
                            onChange={(e) => setQrOptions({
                              ...qrOptions,
                              customColors: { ...qrOptions.customColors, dots: e.target.value }
                            })}
                            className="w-full h-12 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Fond
                          </label>
                          <input
                            type="color"
                            value={qrOptions.customColors.background}
                            onChange={(e) => setQrOptions({
                              ...qrOptions,
                              customColors: { ...qrOptions.customColors, background: e.target.value }
                            })}
                            className="w-full h-12 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Coins
                          </label>
                          <input
                            type="color"
                            value={qrOptions.customColors.corners}
                            onChange={(e) => setQrOptions({
                              ...qrOptions,
                              customColors: { ...qrOptions.customColors, corners: e.target.value }
                            })}
                            className="w-full h-12 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setTimeout(() => generateQR(), 100);
                          nextStep();
                        }}
                        className="mt-6 w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all"
                      >
                        Continuer
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {/* Step 4: Finishing */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Touches finales</h2>
                  
                  {/* Shape Selection */}
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Forme du QR Code</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setQrOptions({ ...qrOptions, shape: 'square' });
                          setTimeout(() => generateQR(), 100);
                        }}
                        className={`
                          p-4 rounded-xl border-2 transition-all
                          ${qrOptions.shape === 'square' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700'
                          }
                        `}
                      >
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                        <span className="font-medium">Carré</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setQrOptions({ ...qrOptions, shape: 'circle' });
                          setTimeout(() => generateQR(), 100);
                        }}
                        className={`
                          p-4 rounded-xl border-2 transition-all
                          ${qrOptions.shape === 'circle' 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                            : 'border-gray-200 dark:border-gray-700'
                          }
                        `}
                      >
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        <span className="font-medium">Cercle</span>
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Logo Upload */}
                  <div>
                    <h3 className="font-semibold mb-4">Logo (optionnel)</h3>
                    <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setQrOptions({ ...qrOptions, logo: e.target?.result });
                              setTimeout(() => generateQR(), 100);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex flex-col items-center"
                      >
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3">
                          {qrOptions.logo ? (
                            <img src={qrOptions.logo} alt="Logo" className="w-full h-full object-contain rounded-lg" />
                          ) : (
                            <Sparkles className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <span className="text-primary-600 dark:text-primary-400 font-medium">
                          {qrOptions.logo ? 'Changer le logo' : 'Ajouter un logo'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG (max 2MB)
                        </span>
                      </label>
                    </div>
                    
                    {qrOptions.logo && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Taille du logo
                        </label>
                        <input
                          type="range"
                          min="0.2"
                          max="0.5"
                          step="0.05"
                          value={qrOptions.logoSize}
                          onChange={(e) => {
                            setQrOptions({ ...qrOptions, logoSize: parseFloat(e.target.value) });
                            setTimeout(() => generateQR(), 100);
                          }}
                          className="w-full"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round(qrOptions.logoSize * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTimeout(() => generateQR(), 100);
                      nextStep();
                    }}
                    className="mt-8 w-full py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all"
                  >
                    Finaliser
                  </motion.button>
                </motion.div>
              )}
              
              {/* Step 5: Download */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">QR Code créé avec succès !</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Votre QR code est prêt à être téléchargé et partagé
                  </p>
                  
                  {/* Download Options */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadQR('png')}
                      className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger PNG
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => downloadQR('svg')}
                      className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger SVG
                    </motion.button>
                  </div>
                  
                  {/* Share Options */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <h3 className="font-semibold mb-4">Partager</h3>
                    <div className="flex justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Create Another */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentStep(1);
                      setQrOptions({
                        contentType: null,
                        contentData: {},
                        style: null,
                        colors: null,
                        customColors: { dots: '#000000', background: '#FFFFFF', corners: '#000000' },
                        shape: 'square',
                        logo: null,
                        logoSize: 0.3
                      });
                    }}
                    className="mt-8 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    Créer un autre QR Code
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`
                    px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
                    ${currentStep === 1 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Précédent
                </motion.button>
                
                {currentStep < 4 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    disabled={!qrOptions.contentType || (currentStep === 2 && !qrOptions.style) || (currentStep === 3 && !qrOptions.colors)}
                    className={`
                      px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2
                      ${(!qrOptions.contentType || (currentStep === 2 && !qrOptions.style) || (currentStep === 3 && !qrOptions.colors))
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white hover:from-primary-700 hover:to-purple-700'
                      }
                    `}
                  >
                    Suivant
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Right: Preview */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sticky top-24"
          >
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-semibold mb-4 text-center">Aperçu en temps réel</h3>
              
              {/* QR Preview Container */}
              <div className="relative">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl opacity-50"></div>
                
                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-8 shadow-inner">
                  <div 
                    ref={previewRef}
                    className="mx-auto flex items-center justify-center"
                    style={{ minHeight: '300px', minWidth: '300px' }}
                  >
                    {!qrOptions.contentType && (
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          Votre QR code apparaîtra ici
                        </p>
                      </div>
                    )}
                    
                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 rounded-xl flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* QR Info */}
              {qrOptions.contentType && currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gray-50 dark:bg-dark-900 rounded-lg"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="font-medium">
                      {CONTENT_TYPES.find(t => t.id === qrOptions.contentType)?.name}
                    </span>
                  </div>
                  {qrOptions.style && (
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600 dark:text-gray-400">Style:</span>
                      <span className="font-medium">
                        {QR_STYLES.find(s => s.id === qrOptions.style)?.name}
                      </span>
                    </div>
                  )}
                  {qrOptions.colors && (
                    <div className="flex items-center justify-between text-sm mt-2">
                      <span className="text-gray-600 dark:text-gray-400">Palette:</span>
                      <span className="font-medium">
                        {COLOR_PALETTES.find(p => p.id === qrOptions.colors)?.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Content Form Component
const ContentForm = ({ type, data, onChange }) => {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };
  
  switch (type) {
    case 'url':
      return (
        <input
          type="url"
          placeholder="https://example.com"
          value={data.url || ''}
          onChange={(e) => updateField('url', e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
        />
      );
      
    case 'text':
      return (
        <textarea
          placeholder="Votre message..."
          value={data.text || ''}
          onChange={(e) => updateField('text', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white resize-none"
        />
      );
      
    case 'wifi':
      return (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom du réseau (SSID)"
            value={data.ssid || ''}
            onChange={(e) => updateField('ssid', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={data.password || ''}
            onChange={(e) => updateField('password', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <select
            value={data.security || 'WPA'}
            onChange={(e) => updateField('security', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          >
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Aucune</option>
          </select>
        </div>
      );
      
    case 'vcard':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              value={data.firstName || ''}
              onChange={(e) => updateField('firstName', e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Nom"
              value={data.lastName || ''}
              onChange={(e) => updateField('lastName', e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
            />
          </div>
          <input
            type="tel"
            placeholder="Téléphone"
            value={data.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={data.email || ''}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={data.company || ''}
            onChange={(e) => updateField('company', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
        </div>
      );
      
    case 'email':
      return (
        <div className="space-y-4">
          <input
            type="email"
            placeholder="destinataire@example.com"
            value={data.to || ''}
            onChange={(e) => updateField('to', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Sujet"
            value={data.subject || ''}
            onChange={(e) => updateField('subject', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <textarea
            placeholder="Message"
            value={data.body || ''}
            onChange={(e) => updateField('body', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white resize-none"
          />
        </div>
      );
      
    case 'sms':
      return (
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="+33 6 12 34 56 78"
            value={data.phone || ''}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <textarea
            placeholder="Message"
            value={data.message || ''}
            onChange={(e) => updateField('message', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white resize-none"
          />
        </div>
      );
      
    case 'location':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Latitude"
              value={data.latitude || ''}
              onChange={(e) => updateField('latitude', e.target.value)}
              step="0.000001"
              className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
            />
            <input
              type="number"
              placeholder="Longitude"
              value={data.longitude || ''}
              onChange={(e) => updateField('longitude', e.target.value)}
              step="0.000001"
              className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
            />
          </div>
          <input
            type="text"
            placeholder="Nom du lieu (optionnel)"
            value={data.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
        </div>
      );
      
    case 'event':
      return (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Titre de l'événement"
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Lieu"
            value={data.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de début
              </label>
              <input
                type="datetime-local"
                value={data.startDate || ''}
                onChange={(e) => updateField('startDate', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date de fin
              </label>
              <input
                type="datetime-local"
                value={data.endDate || ''}
                onChange={(e) => updateField('endDate', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};

export default QRGeneratorPro;
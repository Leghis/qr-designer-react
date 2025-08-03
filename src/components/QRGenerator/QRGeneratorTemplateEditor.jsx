import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Palette, 
  Square, 
  Circle, 
  Upload,
  Sparkles,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import historyService from '../../services/historyService';

// Import reusable components from QRGeneratorPro
import { COLOR_PALETTES, QR_STYLES } from './QRGeneratorPro';

const QRGeneratorTemplateEditor = ({ template, templateOptions, onDataChange }) => {
  const { showNotification } = useNotification();
  const { isAuthenticated } = useAuth();
  
  // State
  const [qrData, setQrData] = useState('https://qr-designer.com');
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrOptions, setQrOptions] = useState({
    style: 'classic',
    colors: 'classic',
    customColors: { dots: '#000000', background: '#FFFFFF', corners: '#000000' },
    shape: 'square',
    logo: null,
    logoSize: 0.3,
    ...templateOptions
  });
  
  // Refs
  const qrCodeRef = useRef(null);
  const previewRef = useRef(null);
  
  // Initialize with template options
  useEffect(() => {
    if (templateOptions) {
      // Extract style from template
      const style = templateOptions.dotsOptions?.type || 'square';
      const cornersType = templateOptions.cornersSquareOptions?.type || 'square';
      
      // Find matching style
      const matchingStyle = QR_STYLES.find(s => 
        s.preview.dotsType === style && s.preview.cornersType === cornersType
      );
      
      // Extract colors
      const colors = {
        dots: templateOptions.dotsOptions?.color || 
              templateOptions.dotsOptions?.gradient?.colorStops?.[0]?.color || 
              '#000000',
        background: templateOptions.backgroundOptions?.color || 
                   templateOptions.backgroundOptions?.gradient?.colorStops?.[0]?.color || 
                   '#FFFFFF',
        corners: templateOptions.cornersSquareOptions?.color || 
                templateOptions.cornersSquareOptions?.gradient?.colorStops?.[0]?.color || 
                '#000000'
      };
      
      setQrOptions(prev => ({
        ...prev,
        style: matchingStyle?.id || 'classic',
        customColors: colors,
        colors: 'custom',
        shape: templateOptions.shape || 'square',
        templateOptions: templateOptions
      }));
    }
  }, [templateOptions]);
  
  // Generate QR code
  const generateQR = useCallback(() => {
    if (!previewRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Clear previous QR
      previewRef.current.innerHTML = '';
      
      // Use template options as base
      const baseOptions = qrOptions.templateOptions || templateOptions || {};
      
      // Override with current selections
      const options = {
        width: 400,
        height: 400,
        type: 'svg',
        data: qrData,
        margin: 20,
        ...baseOptions
      };
      
      // Apply current style if changed
      if (qrOptions.style !== 'template') {
        const selectedStyle = QR_STYLES.find(s => s.id === qrOptions.style);
        if (selectedStyle) {
          options.dotsOptions = {
            ...options.dotsOptions,
            type: selectedStyle.preview.dotsType
          };
          options.cornersSquareOptions = {
            ...options.cornersSquareOptions,
            type: selectedStyle.preview.cornersType
          };
          options.cornersDotOptions = {
            ...options.cornersDotOptions,
            type: selectedStyle.preview.cornersType
          };
        }
      }
      
      // Apply colors if changed
      if (qrOptions.colors === 'custom') {
        options.dotsOptions = {
          ...options.dotsOptions,
          color: qrOptions.customColors.dots
        };
        options.backgroundOptions = {
          ...options.backgroundOptions,
          color: qrOptions.customColors.background
        };
        options.cornersSquareOptions = {
          ...options.cornersSquareOptions,
          color: qrOptions.customColors.corners
        };
        options.cornersDotOptions = {
          ...options.cornersDotOptions,
          color: qrOptions.customColors.corners
        };
      } else if (qrOptions.colors !== 'template') {
        const palette = COLOR_PALETTES.find(p => p.id === qrOptions.colors);
        if (palette?.colors) {
          options.dotsOptions = { ...options.dotsOptions, color: palette.colors.dots };
          options.backgroundOptions = { ...options.backgroundOptions, color: palette.colors.background };
          options.cornersSquareOptions = { ...options.cornersSquareOptions, color: palette.colors.corners };
          options.cornersDotOptions = { ...options.cornersDotOptions, color: palette.colors.corners };
        }
      }
      
      // Apply shape
      if (qrOptions.shape === 'circle') {
        options.shape = 'circle';
      }
      
      // Apply logo
      if (qrOptions.logo) {
        options.image = qrOptions.logo;
        options.imageOptions = {
          crossOrigin: 'anonymous',
          margin: 10,
          imageSize: qrOptions.logoSize
        };
      }
      
      qrCodeRef.current = new QRCodeStyling(options);
      qrCodeRef.current.append(previewRef.current);
      
      // Save to history
      if (isAuthenticated && qrData) {
        historyService.addQRCode({
          data: qrData,
          template: template?.id || 'custom',
          options: options
        });
      }
      
    } catch (error) {
      console.error('Error generating QR:', error);
      showNotification('Erreur lors de la génération', 'error');
    } finally {
      setIsGenerating(false);
    }
  }, [qrData, qrOptions, template, templateOptions, isAuthenticated, showNotification]);
  
  // Update QR when options change
  useEffect(() => {
    generateQR();
  }, [generateQR]);
  
  // Update parent with data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(qrData);
    }
  }, [qrData, onDataChange]);
  
  // Download QR
  const downloadQR = async (format) => {
    if (!qrCodeRef.current) return;
    
    try {
      if (format === 'png') {
        await qrCodeRef.current.download({
          name: `qr-code-${template?.id || 'custom'}`,
          extension: 'png'
        });
      } else {
        const blob = await qrCodeRef.current.getRawData('svg');
        const url = URL.createObjectURL(new Blob([blob], { type: 'image/svg+xml' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `qr-code-${template?.id || 'custom'}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      
      showNotification(`QR code téléchargé en ${format.toUpperCase()}`, 'success');
    } catch (error) {
      showNotification('Erreur lors du téléchargement', 'error');
    }
  };
  
  // Reset to template defaults
  const resetToTemplate = () => {
    if (templateOptions) {
      setQrOptions(prev => ({
        ...prev,
        style: 'template',
        colors: 'template',
        shape: templateOptions.shape || 'square',
        logo: null,
        logoSize: 0.3,
        templateOptions: templateOptions
      }));
    }
  };
  
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Controls */}
      <div className="space-y-6">
        {/* QR Data Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Contenu du QR Code
          </label>
          <input
            type="text"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder="Entrez votre URL, texte ou données..."
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
          />
        </div>
        
        {/* Style Selection */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Style des points
            </label>
            {qrOptions.style !== 'template' && (
              <button
                onClick={resetToTemplate}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Réinitialiser
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setQrOptions({ ...qrOptions, style: 'template' })}
              className={`p-3 rounded-lg border-2 transition-all ${
                qrOptions.style === 'template'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
              }`}
            >
              <div className="text-2xl mb-1">🎨</div>
              <span className="text-xs">Template</span>
            </button>
            {QR_STYLES.slice(0, 5).map((style) => (
              <button
                key={style.id}
                onClick={() => setQrOptions({ ...qrOptions, style: style.id })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  qrOptions.style === style.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="text-2xl mb-1">◫</div>
                <span className="text-xs">{style.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Couleurs
          </label>
          <div className="space-y-3">
            {/* Preset Colors */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setQrOptions({ ...qrOptions, colors: 'template' })}
                className={`p-2 rounded-lg border-2 transition-all ${
                  qrOptions.colors === 'template'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <span className="text-xs">Template</span>
              </button>
              {COLOR_PALETTES.slice(0, 7).map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => setQrOptions({ ...qrOptions, colors: palette.id })}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    qrOptions.colors === palette.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                  title={palette.name}
                >
                  <div className="flex gap-0.5 justify-center">
                    {palette.preview.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Custom Colors */}
            {(qrOptions.colors === 'custom' || qrOptions.colors === 'template') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700"
              >
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Points</label>
                  <input
                    type="color"
                    value={qrOptions.customColors.dots}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      colors: 'custom',
                      customColors: { ...qrOptions.customColors, dots: e.target.value }
                    })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Fond</label>
                  <input
                    type="color"
                    value={qrOptions.customColors.background}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      colors: 'custom',
                      customColors: { ...qrOptions.customColors, background: e.target.value }
                    })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Coins</label>
                  <input
                    type="color"
                    value={qrOptions.customColors.corners}
                    onChange={(e) => setQrOptions({
                      ...qrOptions,
                      colors: 'custom',
                      customColors: { ...qrOptions.customColors, corners: e.target.value }
                    })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Shape & Logo */}
        <div className="grid grid-cols-2 gap-6">
          {/* Shape */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Forme
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setQrOptions({ ...qrOptions, shape: 'square' })}
                className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                  qrOptions.shape === 'square'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Square className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Carré</span>
              </button>
              <button
                onClick={() => setQrOptions({ ...qrOptions, shape: 'circle' })}
                className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                  qrOptions.shape === 'circle'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Circle className="w-6 h-6 mx-auto mb-1" />
                <span className="text-xs">Cercle</span>
              </button>
            </div>
          </div>
          
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setQrOptions({ ...qrOptions, logo: e.target?.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="block w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              {qrOptions.logo ? (
                <img src={qrOptions.logo} alt="Logo" className="w-12 h-12 mx-auto object-contain" />
              ) : (
                <Upload className="w-6 h-6 mx-auto text-gray-400" />
              )}
              <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 block">
                {qrOptions.logo ? 'Changer' : 'Ajouter'}
              </span>
            </label>
          </div>
        </div>
        
        {/* Logo Size */}
        {qrOptions.logo && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Taille du logo
            </label>
            <input
              type="range"
              min="0.2"
              max="0.5"
              step="0.05"
              value={qrOptions.logoSize}
              onChange={(e) => setQrOptions({ ...qrOptions, logoSize: parseFloat(e.target.value) })}
              className="w-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(qrOptions.logoSize * 100)}%
            </span>
          </div>
        )}
      </div>
      
      {/* Right: Preview */}
      <div className="lg:sticky lg:top-24">
        <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl p-8">
          {/* Preview Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Aperçu en temps réel</h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
            >
              {showPreview ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          
          {/* QR Preview */}
          <div className={`transition-all ${showPreview ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 rounded-xl p-8">
              <div 
                ref={previewRef}
                className="mx-auto flex items-center justify-center"
                style={{ minHeight: '400px', minWidth: '400px' }}
              />
              
              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 dark:bg-dark-900/80 rounded-xl flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Download Buttons */}
            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadQR('png')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                PNG
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadQR('svg')}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                SVG
              </motion.button>
            </div>
          </div>
          
          {/* Template Info */}
          {template && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-50 dark:bg-dark-900 rounded-lg"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Template: <span className="font-medium text-gray-900 dark:text-white">{template.name}</span>
              </p>
              {template.category && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Catégorie: <span className="font-medium">{template.category}</span>
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRGeneratorTemplateEditor;
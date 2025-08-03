import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Download, 
  Palette, 
  Square, 
  Circle, 
  Upload,
  Sparkles,
  Eye,
  EyeOff,
  RefreshCw,
  Type,
  Settings2,
  Image as ImageIcon,
  Sliders,
  Crown,
  Loader2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QRCodeStyling from 'qr-code-styling';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import historyService from '../../services/historyService';
import QRContentEditor from './QRContentEditor';

// Import constants
import { COLOR_PALETTES, QR_STYLES } from './constants';
import { qrTemplates } from '../../services/qrService';
import { featuredPremiumTemplates } from '../../data/templates/featured';
import { 
  extractTemplateColors, 
  applyThemeToTemplate, 
  generateColorScheme,
  isGradient,
  extractPrimaryColor,
  hexToHSL,
  hslToHex
} from './colorUtils';

const QRGeneratorAdvanced = ({ template, templateOptions, onDataChange, initialData }) => {
  const { t } = useTranslation();
  const { showNotification } = useNotification();
  const { isAuthenticated } = useAuth();
  
  // Generate color suggestions based on primary color
  const generateColorSuggestions = (primaryColor) => {
    const suggestions = [];
    
    // Monochromatic
    suggestions.push(generateColorScheme(primaryColor));
    
    // Complementary
    const hsl = hexToHSL(primaryColor);
    const complementary = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
    suggestions.push(generateColorScheme(complementary));
    
    // Triadic
    const triadic1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
    suggestions.push(generateColorScheme(triadic1));
    
    // Analogous
    const analogous = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
    suggestions.push(generateColorScheme(analogous));
    
    return suggestions;
  };
  
  // Apply suggested color scheme
  const applySuggestedColors = (colorScheme) => {
    setQrOptions(prev => ({
      ...prev,
      colors: 'custom',
      customColors: colorScheme
    }));
  };
  
  // State
  const [qrData, setQrData] = useState(initialData || 'https://qr-designer.com');
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // 'content', 'style', 'logo', 'advanced'
  const [selectedTemplate, setSelectedTemplate] = useState(template || null);
  const [qrOptions, setQrOptions] = useState({
    style: 'classic',
    colors: 'classic',
    customColors: { 
      dots: '#000000', 
      background: '#FFFFFF', 
      corners: '#000000',
      cornersAlt: '#000000'
    },
    shape: 'square',
    logo: null,
    logoSize: 0.3,
    errorCorrectionLevel: 'M',
    margin: 20,
    dotsOptions: {},
    cornersSquareOptions: {},
    cornersDotOptions: {},
    backgroundOptions: {},
    ...templateOptions
  });
  
  // Popular templates for home page
  const popularTemplates = !template ? [
    { 
      id: 'basic', 
      name: t('qrGenerator.templates.basic'),
      options: {
        dotsOptions: { color: '#000000', type: 'square' },
        backgroundOptions: { color: '#FFFFFF' },
        cornersSquareOptions: { color: '#000000', type: 'square' },
        cornersDotOptions: { color: '#000000', type: 'square' }
      },
      isPremium: false 
    },
    { 
      id: 'modern', 
      name: t('qrGenerator.templates.modern'),
      options: {
        dotsOptions: { color: '#3B82F6', type: 'rounded' },
        backgroundOptions: { color: '#EFF6FF' },
        cornersSquareOptions: { color: '#1E40AF', type: 'extra-rounded' },
        cornersDotOptions: { color: '#1E40AF', type: 'dot' }
      },
      isPremium: false 
    },
    ...featuredPremiumTemplates
  ] : [];
  
  // Refs
  const qrCodeRef = useRef(null);
  const previewRef = useRef(null);
  const prevLogoRef = useRef(null);
  const prevLogoSizeRef = useRef(null);
  const qrOptionsRef = useRef(qrOptions);
  const qrDataRef = useRef(qrData);
  const templateRef = useRef(template);
  const templateOptionsRef = useRef(templateOptions);
  
  // Update refs when values change
  useEffect(() => {
    qrOptionsRef.current = qrOptions;
  }, [qrOptions]);
  
  useEffect(() => {
    qrDataRef.current = qrData;
  }, [qrData]);
  
  useEffect(() => {
    templateRef.current = template;
  }, [template]);
  
  useEffect(() => {
    templateOptionsRef.current = templateOptions;
  }, [templateOptions]);
  
  // Initialize with template options
  useEffect(() => {
    if (templateOptions && template) {
      // Extract style from template
      const dotsType = templateOptions.dotsOptions?.type || 'square';
      const cornersType = templateOptions.cornersSquareOptions?.type || 'square';
      
      // Find matching style
      const matchingStyle = QR_STYLES.find(s => 
        s.preview.dotsType === dotsType && s.preview.cornersType === cornersType
      ) || QR_STYLES[0];
      
      // Extract colors from template (including gradients)
      const colors = extractTemplateColors(templateOptions);
      
      setQrOptions(prev => ({
        ...prev,
        style: matchingStyle.id,
        customColors: colors,
        colors: 'template',  // Use 'template' instead of 'custom' when loading a template
        shape: templateOptions.shape || 'square',
        errorCorrectionLevel: templateOptions.qrOptions?.errorCorrectionLevel || 'M',
        margin: templateOptions.margin || 20,
        templateOptions: templateOptions
      }));
      
      // Set selected template
      setSelectedTemplate(template);
    }
  }, [templateOptions, template]);
  
  // Generate QR code - stable function reference
  const generateQR = useCallback(() => {
    if (!previewRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const currentQrOptions = qrOptionsRef.current;
      const currentQrData = qrDataRef.current;
      const currentTemplate = templateRef.current;
      const currentTemplateOptions = templateOptionsRef.current;
      
      // Use template options as base, or create default structure
      const baseOptions = currentQrOptions.templateOptions || currentTemplateOptions || {
        dotsOptions: { type: 'square', color: '#000000' },
        backgroundOptions: { color: '#FFFFFF' },
        cornersSquareOptions: { type: 'square', color: '#000000' },
        cornersDotOptions: { type: 'square', color: '#000000' }
      };
      
      // Start with base options and override with current selections
      const options = {
        ...baseOptions,
        width: 400,
        height: 400,
        type: 'svg',
        data: currentQrData,
        margin: currentQrOptions.margin,
        qrOptions: {
          ...baseOptions.qrOptions,
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: currentQrOptions.errorCorrectionLevel
        },
        // Ensure these options exist even if not in baseOptions
        dotsOptions: baseOptions.dotsOptions || { type: 'square' },
        backgroundOptions: baseOptions.backgroundOptions || { color: '#FFFFFF' },
        cornersSquareOptions: baseOptions.cornersSquareOptions || { type: 'square' },
        cornersDotOptions: baseOptions.cornersDotOptions || { type: 'square' }
      };
      
      // Apply current style
      const selectedStyle = QR_STYLES.find(s => s.id === currentQrOptions.style);
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
      
      // Apply colors
      if (currentQrOptions.colors === 'template') {
        // Keep the template's original colors (already in baseOptions)
        // No need to do anything, colors are already set from template
      } else if (currentQrOptions.colors === 'custom') {
        // Apply custom colors intelligently preserving gradients
        const customTheme = {
          dots: currentQrOptions.customColors.dots,
          background: currentQrOptions.customColors.background,
          corners: currentQrOptions.customColors.corners,
          cornersAlt: currentQrOptions.customColors.cornersAlt || currentQrOptions.customColors.corners
        };
        
        const themedOptions = applyThemeToTemplate(baseOptions, customTheme);
        // Merge themed options with existing options to preserve type and other properties
        options.dotsOptions = { ...options.dotsOptions, ...themedOptions.dotsOptions };
        options.backgroundOptions = { ...options.backgroundOptions, ...themedOptions.backgroundOptions };
        options.cornersSquareOptions = { ...options.cornersSquareOptions, ...themedOptions.cornersSquareOptions };
        options.cornersDotOptions = { ...options.cornersDotOptions, ...themedOptions.cornersDotOptions };
      } else {
        // Apply predefined color palette intelligently
        const palette = COLOR_PALETTES.find(p => p.id === currentQrOptions.colors);
        if (palette?.colors) {
          const themeColors = {
            dots: palette.colors.dots,
            background: palette.colors.background,
            corners: palette.colors.corners,
            cornersAlt: palette.colors.cornersAlt || palette.colors.corners
          };
          
          const themedOptions = applyThemeToTemplate(baseOptions, themeColors);
          // Merge themed options with existing options to preserve type and other properties
          options.dotsOptions = { ...options.dotsOptions, ...themedOptions.dotsOptions };
          options.backgroundOptions = { ...options.backgroundOptions, ...themedOptions.backgroundOptions };
          options.cornersSquareOptions = { ...options.cornersSquareOptions, ...themedOptions.cornersSquareOptions };
          options.cornersDotOptions = { ...options.cornersDotOptions, ...themedOptions.cornersDotOptions };
        }
      }
      
      // Apply shape
      if (currentQrOptions.shape === 'circle') {
        options.shape = 'circle';
      }
      
      // Ensure imageOptions exists with hideBackgroundDots
      options.imageOptions = {
        ...options.imageOptions,
        hideBackgroundDots: true,
        crossOrigin: 'anonymous',
        margin: 10,
        imageSize: currentQrOptions.logoSize || 0.3
      };
      
      // Apply logo
      if (currentQrOptions.logo) {
        options.image = currentQrOptions.logo;
      } else {
        // Ensure no logo is displayed when logo is removed
        delete options.image;
      }
      
      // Create or update QR code
      // Force recreation when logo or size changes for better reliability
      const logoChanged = currentQrOptions.logo !== prevLogoRef.current;
      const logoSizeChanged = currentQrOptions.logoSize !== prevLogoSizeRef.current;
      const shouldRecreate = !qrCodeRef.current || logoChanged || logoSizeChanged;
      
      if (shouldRecreate) {
        // Clear previous instance
        if (previewRef.current) {
          previewRef.current.innerHTML = '';
        }
        qrCodeRef.current = new QRCodeStyling(options);
        qrCodeRef.current.append(previewRef.current);
      } else {
        // Update existing QR code with new options
        qrCodeRef.current.update(options);
      }
      
      // Update refs for next comparison
      prevLogoRef.current = currentQrOptions.logo;
      prevLogoSizeRef.current = currentQrOptions.logoSize;
      
      // Save to history
      if (isAuthenticated && currentQrData) {
        historyService.addQRCode({
          data: currentQrData,
          template: currentTemplate?.id || 'custom',
          options: options
        });
      }
      
    } catch (error) {
      console.error('Error generating QR:', error);
      showNotification(t('common.error'), 'error');
    } finally {
      setIsGenerating(false);
    }
  }, [isAuthenticated, showNotification, t]); // Minimal stable dependencies
  
  // Update QR when data or options change
  useEffect(() => {
    generateQR();
  }, [qrData, qrOptions.style, qrOptions.colors, qrOptions.customColors.dots, 
      qrOptions.customColors.background, qrOptions.customColors.corners, 
      qrOptions.customColors.cornersAlt, qrOptions.shape, qrOptions.logo, 
      qrOptions.logoSize, qrOptions.errorCorrectionLevel, qrOptions.margin, 
      template?.id, templateOptions]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (qrCodeRef.current && previewRef.current) {
        previewRef.current.innerHTML = '';
        qrCodeRef.current = null;
      }
    };
  }, []);
  
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
      const downloadOptions = {
        name: `qr-code-${template?.id || 'custom'}`,
        extension: format
      };
      
      if (format === 'png') {
        // High quality PNG
        downloadOptions.width = 1024;
        downloadOptions.height = 1024;
        await qrCodeRef.current.download(downloadOptions);
      } else if (format === 'svg') {
        const blob = await qrCodeRef.current.getRawData('svg');
        const url = URL.createObjectURL(new Blob([blob], { type: 'image/svg+xml' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `${downloadOptions.name}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else if (format === 'pdf') {
        // Generate PDF with QR code
        showNotification(t('qrGenerator.actions.pdfComingSoon'), 'info');
        return;
      }
      
      showNotification(t('qrGenerator.actions.downloadSuccess', { format: format.toUpperCase() }), 'success');
    } catch (error) {
      showNotification(t('qrGenerator.actions.downloadError'), 'error');
    }
  };
  
  // Apply template
  const applyTemplate = (template) => {
    setSelectedTemplate(template);
    
    // Extract style from template
    const dotsType = template.options?.dotsOptions?.type || 'square';
    const cornersType = template.options?.cornersSquareOptions?.type || 'square';
    
    // Find matching style
    const matchingStyle = QR_STYLES.find(s => 
      s.preview.dotsType === dotsType && s.preview.cornersType === cornersType
    ) || QR_STYLES[0];
    
    // Extract colors from template
    const customColors = extractTemplateColors(template.options);
    
    setQrOptions(prev => ({
      ...prev,
      style: matchingStyle.id,
      colors: 'template',  // Use 'template' instead of 'custom' when applying a template
      customColors: customColors,
      shape: template.options?.shape || 'square',
      margin: template.options?.margin || 20,
      errorCorrectionLevel: template.options?.qrOptions?.errorCorrectionLevel || 'M',
      templateOptions: template.options || null
    }));
  };
  
  // Reset to template defaults
  const resetToTemplate = () => {
    if (templateOptions) {
      // Extract style from template
      const dotsType = templateOptions.dotsOptions?.type || 'square';
      const cornersType = templateOptions.cornersSquareOptions?.type || 'square';
      
      // Find matching style
      const matchingStyle = QR_STYLES.find(s => 
        s.preview.dotsType === dotsType && s.preview.cornersType === cornersType
      ) || QR_STYLES[0];
      
      // Extract colors from template
      const customColors = extractTemplateColors(templateOptions);
      
      setQrOptions(prev => ({
        ...prev,
        style: matchingStyle.id,
        colors: 'template',  // Reset to template colors
        customColors: customColors,
        shape: templateOptions.shape || 'square',
        logo: null,
        logoSize: 0.3,
        templateOptions: templateOptions
      }));
    }
  };
  
  // Tab configuration
  const tabs = [
    { id: 'content', label: t('qrGenerator.tabs.content'), icon: Type },
    { id: 'style', label: t('qrGenerator.tabs.style'), icon: Palette },
    { id: 'logo', label: t('qrGenerator.tabs.logo'), icon: ImageIcon },
    { id: 'advanced', label: t('qrGenerator.tabs.advanced'), icon: Sliders }
  ];
  
  // Add beautifulBackground prop to enable/disable the background styling
  const showBeautifulBackground = !template; // Only on home page (no template)
  
  return (
    <div className={showBeautifulBackground ? "relative" : ""}>
      {/* Beautiful Background - Only on home page */}
      {showBeautifulBackground && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-purple-50/20 to-pink-50/30 dark:from-primary-950/30 dark:via-purple-950/20 dark:to-pink-950/30 rounded-3xl"></div>
          <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm rounded-3xl"></div>
        </div>
      )}
      
      <div className={showBeautifulBackground ? "relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8" : ""}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: Controls */}
          <div className="space-y-6">
            {/* Enhanced Tab Selector */}
            <div className="relative">
              {showBeautifulBackground && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100/30 to-purple-100/30 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl blur"></div>
              )}
              <div className={showBeautifulBackground 
                ? 'relative flex gap-1 p-1 bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl' 
                : 'flex gap-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg'
              }>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 rounded-lg font-medium transition-all ${
                        showBeautifulBackground ? 'py-2.5' : 'py-2'
                      } ${
                        activeTab === tab.id
                          ? `bg-white dark:bg-slate-900 text-primary-600 dark:text-primary-400 ${showBeautifulBackground ? 'shadow-md' : 'shadow-sm'}`
                          : 'text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
        
        <AnimatePresence mode="wait">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <QRContentEditor
                initialData={qrData}
                onDataChange={setQrData}
              />
            </motion.div>
          )}
          
          {/* Style Tab */}
          {activeTab === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Templates Section - Only on home page when no template is preselected */}
              {!template && popularTemplates.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {t('qrGenerator.style.templates')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {popularTemplates.map((tmpl) => (
                      <motion.button
                        key={tmpl.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => applyTemplate(tmpl)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          selectedTemplate?.id === tmpl.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {tmpl.isPremium && (
                          <Crown className="absolute top-1 right-1 w-3 h-3 text-yellow-500" />
                        )}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-1 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <div className="w-full h-full relative" style={{ 
                            backgroundColor: tmpl.options?.backgroundOptions?.color || '#FFFFFF' 
                          }}>
                            <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-0.5">
                              {[...Array(9)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className="rounded-sm" 
                                  style={{ 
                                    backgroundColor: i === 0 || i === 2 || i === 6 
                                      ? tmpl.options?.cornersSquareOptions?.color || '#000000'
                                      : tmpl.options?.dotsOptions?.color || '#000000' 
                                  }} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium">{tmpl.name}</span>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Link to see more templates */}
                  <div className="mt-3 text-center">
                    <Link
                      to="/templates"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                      className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      {t('qrGenerator.style.viewMore')}
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Style Selection */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('qrGenerator.style.dotsStyle')}
                  </label>
                  {qrOptions.style !== 'template' && template && (
                    <button
                      onClick={resetToTemplate}
                      className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {t('common.reset')}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {template && (
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
                  )}
                  {QR_STYLES.slice(0, template ? 5 : 6).map((style) => (
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
                  {t('qrGenerator.style.colors')}
                </label>
                <div className="space-y-3">
                  {/* Preset Colors */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {template && (
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
                    )}
                    {COLOR_PALETTES.slice(0, template ? 7 : 8).map((palette) => (
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
                        {palette.id === 'custom' ? (
                          <div className="text-xs font-medium">{t('qrGenerator.style.custom')}</div>
                        ) : (
                          <div className="flex justify-center items-center gap-0.5 p-1">
                            {/* Background */}
                            <div 
                              className="w-8 h-8 rounded border border-gray-300 relative overflow-hidden"
                              style={{ backgroundColor: palette.preview[1] }}
                            >
                              {/* Dots preview */}
                              <div className="absolute inset-1 grid grid-cols-2 grid-rows-2 gap-0.5">
                                <div className="rounded-sm" style={{ backgroundColor: palette.preview[0] }}></div>
                                <div className="rounded-sm" style={{ backgroundColor: palette.preview[0] }}></div>
                                <div className="rounded-sm" style={{ backgroundColor: palette.preview[0] }}></div>
                                <div className="rounded-sm" style={{ backgroundColor: palette.preview[2] }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Colors */}
                  {qrOptions.colors === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{t('qrGenerator.style.dotsColor')}</label>
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
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{t('qrGenerator.style.backgroundColor')}</label>
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
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{t('qrGenerator.style.cornersColor')}</label>
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
                        <div>
                          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">{t('qrGenerator.style.cornerDotsColor')}</label>
                          <input
                            type="color"
                            value={qrOptions.customColors.cornersAlt || qrOptions.customColors.corners}
                            onChange={(e) => setQrOptions({
                              ...qrOptions,
                              colors: 'custom',
                              customColors: { ...qrOptions.customColors, cornersAlt: e.target.value }
                            })}
                            className="w-full h-10 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                      
                      {/* Color harmony suggestions */}
                      <div className="pt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{t('qrGenerator.style.colorSuggestions')}:</p>
                        <div className="flex gap-2">
                          {generateColorSuggestions(qrOptions.customColors.dots).map((color, index) => (
                            <button
                              key={index}
                              onClick={() => applySuggestedColors(color)}
                              className="w-8 h-8 rounded border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                              style={{ backgroundColor: color.dots }}
                              title={t('qrGenerator.style.applyPalette')}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Shape */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('qrGenerator.style.shape')}
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
                    <span className="text-xs">{t('qrGenerator.style.shapes.square')}</span>
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
                    <span className="text-xs">{t('qrGenerator.style.shapes.circle')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Logo Tab */}
          {activeTab === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('qrGenerator.logo.title')}
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
                  className="block w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  {qrOptions.logo ? (
                    <div className="space-y-4">
                      <img src={qrOptions.logo} alt="Logo" className="w-24 h-24 mx-auto object-contain" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('qrGenerator.logo.clickToChange')}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('qrGenerator.logo.upload')}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {t('qrGenerator.logo.uploadHint')}
                        </p>
                      </div>
                    </div>
                  )}
                </label>
                
                {qrOptions.logo && (
                  <button
                    onClick={() => setQrOptions({ ...qrOptions, logo: null })}
                    className="mt-3 w-full px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    {t('qrGenerator.logo.remove')}
                  </button>
                )}
              </div>
              
              {/* Logo Size */}
              {qrOptions.logo && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('qrGenerator.logo.size')}
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
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span>{t('qrGenerator.logo.sizeSmall')}</span>
                    <span>{Math.round(qrOptions.logoSize * 100)}%</span>
                    <span>{t('qrGenerator.logo.sizeLarge')}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Advanced Tab */}
          {activeTab === 'advanced' && (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Error Correction Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('qrGenerator.advanced.errorCorrection')}
                </label>
                <select
                  value={qrOptions.errorCorrectionLevel}
                  onChange={(e) => setQrOptions({ ...qrOptions, errorCorrectionLevel: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 transition-all"
                >
                  <option value="L">{t('qrGenerator.advanced.levels.L')}</option>
                  <option value="M">{t('qrGenerator.advanced.levels.M')}</option>
                  <option value="Q">{t('qrGenerator.advanced.levels.Q')}</option>
                  <option value="H">{t('qrGenerator.advanced.levels.H')}</option>
                </select>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {t('qrGenerator.advanced.errorCorrectionHelp')}
                </p>
              </div>
              
              {/* Margin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('qrGenerator.advanced.margin')}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={qrOptions.margin}
                  onChange={(e) => setQrOptions({ ...qrOptions, margin: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>{t('qrGenerator.advanced.marginNone')}</span>
                  <span>{qrOptions.margin}px</span>
                  <span>{t('qrGenerator.advanced.marginLarge')}</span>
                </div>
              </div>
              
              {/* Export Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {t('qrGenerator.advanced.exportOptions')}
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {t('qrGenerator.advanced.optimizeForPrint')}
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {t('qrGenerator.advanced.includeMetadata')}
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Info Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg transition-all ${
            showBeautifulBackground 
              ? 'bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50' 
              : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
          }`}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {activeTab === 'content' && t('qrGenerator.help.content')}
                {activeTab === 'style' && !template && t('qrGenerator.help.styleNoTemplate')}
                {activeTab === 'style' && template && t('qrGenerator.help.styleWithTemplate')}
                {activeTab === 'logo' && t('qrGenerator.help.logo')}
                {activeTab === 'advanced' && t('qrGenerator.help.advanced')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Right: Preview */}
      <div className="lg:sticky lg:top-24">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-slate-900/50 p-4 sm:p-6 lg:p-8">
          {/* Preview Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">{t('qrGenerator.preview.title')}</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 py-1.5 flex items-center gap-2 rounded-lg transition-all ${
                showPreview 
                  ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700' 
                  : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50'
              }`}
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('qrGenerator.actions.hidePreview')}</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('qrGenerator.actions.showPreview')}</span>
                </>
              )}
            </motion.button>
          </div>
          
          {/* QR Preview */}
          <motion.div 
            animate={{ 
              scale: showPreview ? 1 : 0.98,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden">
              {/* Blur overlay when hidden */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: showPreview ? 0 : 1,
                  backdropFilter: showPreview ? 'blur(0px)' : 'blur(20px)'
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 bg-white/30 dark:bg-slate-900/30"
                style={{ 
                  display: showPreview ? 'none' : 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  onClick={() => setShowPreview(true)}
                  className="px-6 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 border border-gray-200 dark:border-slate-700"
                >
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">{t('qrGenerator.actions.showPreview')}</span>
                </motion.button>
              </motion.div>
              
              {/* QR Code content with blur effect */}
              <div 
                ref={previewRef}
                className={`mx-auto flex items-center justify-center w-full transition-all duration-300 ${
                  showPreview ? '' : 'blur-xl scale-95'
                }`}
                style={{ minHeight: '250px', maxWidth: '400px' }}
              >
                {isGenerating && (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('qrGenerator.preview.generating')}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadQR('png')}
                className="flex-1 px-4 sm:px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('qrGenerator.actions.downloadPNG')}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadQR('svg')}
                className="flex-1 px-4 sm:px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('qrGenerator.actions.downloadSVG')}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => downloadQR('pdf')}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                PDF
              </motion.button>
            </div>
          
          {/* Template Info */}
          {template && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-50 dark:bg-slate-850 rounded-lg"
            >
              <p className="text-sm text-gray-600 dark:text-slate-300">
                {t('qrGenerator.template.name')}: <span className="font-medium text-gray-900 dark:text-slate-100">{template.name}</span>
              </p>
              {template.category && (
                <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                  {t('qrGenerator.template.category')}: <span className="font-medium">{template.category}</span>
                </p>
              )}
            </motion.div>
          )}
          
          {/* Premium CTA - Only on home page for premium templates */}
          {!template && selectedTemplate?.isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {t('qrGenerator.premium.upgradeMessage')}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default QRGeneratorAdvanced;
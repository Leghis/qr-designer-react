import { useState, useEffect, useRef, useCallback } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import qrService, { defaultQROptions } from '../../services/qrService';
import TemplateSelector from './TemplateSelector';
import QRControls from './QRControls';
import { useNotification } from '../../context/NotificationContext';
import { useDebounce } from '../../hooks/useDebounce';
import historyService from '../../services/historyService';
import { useAuth } from '../../context/AuthContext';

const QRGenerator = ({ preSelectedTemplate, templateOptions, onDataChange }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [qrData, setQrData] = useState(defaultQROptions.data);

  // Notify parent component when data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(qrData);
    }
  }, [qrData, onDataChange]);
  const [qrOptions, setQrOptions] = useState({
    dotsColor: defaultQROptions.dotsOptions.color,
    dotsType: defaultQROptions.dotsOptions.type,
    bgColor: defaultQROptions.backgroundOptions.color,
    cornersColor: defaultQROptions.cornersSquareOptions.color,
    cornersType: defaultQROptions.cornersSquareOptions.type
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(preSelectedTemplate || 'default');
  
  const qrContainerRef = useRef(null);
  const qrCodeRef = useRef(null);
  const { showNotification } = useNotification();
  
  // Debounce QR data input
  const debouncedQrData = useDebounce(qrData, 750);

  // Generate QR code
  const generateQR = useCallback(() => {
    if (!qrContainerRef.current || isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Clear existing QR code
      qrContainerRef.current.innerHTML = '';
      
      // Generate new QR code
      const options = {
        data: debouncedQrData || 'https://qr-designer.com',
        dotsOptions: {
          color: qrOptions.dotsColor,
          type: qrOptions.dotsType
        },
        backgroundOptions: {
          color: qrOptions.bgColor
        },
        cornersSquareOptions: {
          color: qrOptions.cornersColor,
          type: qrOptions.cornersType
        },
        cornersDotOptions: {
          color: qrOptions.cornersColor,
          type: qrOptions.cornersType
        }
      };
      
      qrCodeRef.current = qrService.generateQRCode(options);
      qrCodeRef.current.append(qrContainerRef.current);
      
      // Save to history if user is authenticated
      if (isAuthenticated && debouncedQrData) {
        historyService.addQRCode({
          data: debouncedQrData,
          template: currentTemplate,
          options: qrOptions,
          type: 'text' // Could be enhanced to detect URL, email, etc.
        });
      }
      
    } catch (error) {
      console.error('Error generating QR code:', error);
      showNotification('Erreur lors de la génération du QR code', 'error');
    } finally {
      setIsGenerating(false);
    }
  }, [debouncedQrData, qrOptions, isGenerating, showNotification, isAuthenticated, currentTemplate]);

  // Generate QR on mount and when options change
  useEffect(() => {
    generateQR();
  }, [generateQR]);

  // Handle template selection from navigation or props
  useEffect(() => {
    if (location.state?.templateId) {
      const templateOptions = qrService.applyPremiumTemplate(location.state.templateId);
      if (templateOptions) {
        handleTemplateSelect(templateOptions);
        showNotification('Template appliqué avec succès !', 'success');
      }
    } else if (preSelectedTemplate && templateOptions) {
      // Apply template from props without scrolling
      handleTemplateSelect(templateOptions, preSelectedTemplate);
    }
  }, [location.state, showNotification, preSelectedTemplate, templateOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle template selection
  const handleTemplateSelect = (templateOptions, templateName = 'default') => {
    setCurrentTemplate(templateName);
    
    // For complex templates with gradients, we need to apply the full options
    if (templateOptions.dotsOptions?.gradient || 
        templateOptions.backgroundOptions?.gradient ||
        templateOptions.cornersSquareOptions?.gradient ||
        templateOptions.shape) {
      
      // Clear existing QR code
      if (qrContainerRef.current) {
        qrContainerRef.current.innerHTML = '';
        
        // Generate new QR code with full template options
        const options = {
          ...defaultQROptions,
          ...templateOptions,
          data: qrData || 'https://qr-designer.com'
        };
        
        qrCodeRef.current = qrService.generateQRCode(options);
        qrCodeRef.current.append(qrContainerRef.current);
      }
    } else {
      // Simple template without gradients
      setQrOptions({
        dotsColor: templateOptions.dotsOptions.color || defaultQROptions.dotsOptions.color,
        dotsType: templateOptions.dotsOptions.type || defaultQROptions.dotsOptions.type,
        bgColor: templateOptions.backgroundOptions.color || defaultQROptions.backgroundOptions.color,
        cornersColor: templateOptions.cornersSquareOptions.color || defaultQROptions.cornersSquareOptions.color,
        cornersType: templateOptions.cornersSquareOptions.type || defaultQROptions.cornersSquareOptions.type
      });
    }
  };

  // Handle downloads
  const handleDownload = async (format) => {
    try {
      await qrService.downloadQR(format, 'qr-designer');
      showNotification(`QR code téléchargé en ${format.toUpperCase()}`, 'success');
    } catch (err) {
      showNotification('Erreur lors du téléchargement', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Générateur Express</h3>
            
            {/* Template Selector */}
            <TemplateSelector onSelectTemplate={handleTemplateSelect} />
            
            {/* QR Controls */}
            <QRControls
              qrData={qrData}
              setQrData={setQrData}
              qrOptions={qrOptions}
              setQrOptions={setQrOptions}
            />
          </div>
          
          {/* Right: Preview */}
          <div>
            <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-8 flex flex-col items-center justify-center h-full min-h-[500px]">
              <motion.div
                ref={qrContainerRef}
                className="qr-container relative max-w-[400px] max-h-[400px]"
                animate={isGenerating ? { scale: 0.95 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                style={{ width: '100%' }}
              >
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-dark-900/80 rounded-xl">
                    <div className="loading-spinner"></div>
                  </div>
                )}
              </motion.div>
              
              {/* Download Buttons */}
              <div className="mt-6 flex gap-3 w-full max-w-xs">
                <button
                  onClick={() => handleDownload('png')}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  PNG
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="flex-1 px-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500 rounded-xl font-medium transition-all hover-lift flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  SVG
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRGenerator;
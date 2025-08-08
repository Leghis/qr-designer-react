import QRCodeStyling from 'qr-code-styling';

// Default QR code styling options
export const defaultQROptions = {
  width: 300,
  height: 300,
  type: 'svg',
  data: 'https://qr-designer.com',
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'H' // Highest error correction for better scanning
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: 'anonymous'
  },
  dotsOptions: {
    color: '#3b82f6',
    type: 'square'
  },
  backgroundOptions: {
    color: '#ffffff'
  },
  cornersSquareOptions: {
    color: '#3b82f6',
    type: 'square'
  },
  cornersDotOptions: {
    color: '#3b82f6',
    type: 'square'
  }
};

// Export quality settings
export const exportSettings = {
  png: {
    width: 1024,
    height: 1024,
    quality: 1.0
  },
  svg: {
    width: 1024,
    height: 1024
  },
  jpg: {
    width: 1024,
    height: 1024,
    quality: 0.95
  }
};

// Basic QR code templates (free)
export const qrTemplates = {
  basic: {
    name: 'Basique',
    dotsColor: '#000000',
    dotsType: 'square',
    bgColor: '#ffffff',
    cornersColor: '#000000',
    cornersType: 'square',
    isPremium: false
  },
  business: {
    name: 'Business',
    dotsColor: '#1e40af',
    dotsType: 'classy',
    bgColor: '#f8fafc',
    cornersColor: '#1e40af',
    cornersType: 'square',
    isPremium: false
  },
  colorful: {
    name: 'Coloré',
    dotsColor: '#7c3aed',
    dotsType: 'dots',
    bgColor: '#faf5ff',
    cornersColor: '#ec4899',
    cornersType: 'dot',
    isPremium: false
  },
  modern: {
    name: 'Moderne',
    dotsColor: '#0ea5e9',
    dotsType: 'rounded',
    bgColor: '#f0f9ff',
    cornersColor: '#0284c7',
    cornersType: 'extra-rounded',
    isPremium: false
  },
  minimal: {
    name: 'Minimal',
    dotsColor: '#64748b',
    dotsType: 'classy-rounded',
    bgColor: '#f8fafc',
    cornersColor: '#475569',
    cornersType: 'dot',
    isPremium: false
  },
  gradient: {
    name: 'Gradient',
    dotsColor: '#8b5cf6',
    dotsType: 'extra-rounded',
    bgColor: '#faf5ff',
    cornersColor: '#7c3aed',
    cornersType: 'extra-rounded',
    isPremium: false
  }
};

// Note: Premium templates live under src/data/templates/* and are lazy-loaded
// via loadTemplatesByCategory/templateService to keep this service lightweight.

// Factory that returns a fresh QRCodeStyling instance per call
export const generateQRCode = (options = {}) => {
  const finalOptions = { ...defaultQROptions, ...options };
  return new QRCodeStyling(finalOptions);
};


import QRCodeStyling from 'qr-code-styling';

// Default QR code styling options
export const defaultQROptions = {
  width: 300,
  height: 300,
  type: "svg",
  data: "https://qr-designer.com",
  qrOptions: {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "H" // Highest error correction for better scanning
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 0,
    crossOrigin: "anonymous"
  },
  dotsOptions: {
    color: "#3b82f6",
    type: "square"
  },
  backgroundOptions: {
    color: "#ffffff"
  },
  cornersSquareOptions: {
    color: "#3b82f6",
    type: "square"
  },
  cornersDotOptions: {
    color: "#3b82f6",
    type: "square"
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

// QR code templates (Free - Max 6)
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

// Premium templates with advanced styles
export const premiumTemplates = [
  // SPECTACULAR Category - Designs élégants et uniques
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    category: 'spectacular',
    description: 'Dégradé coucher de soleil aux teintes chaudes',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF6B6B' },
            { offset: 0.5, color: '#FFE66D' },
            { offset: 1, color: '#FF6B9D' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFF5F5' },
            { offset: 1, color: '#FFE0E0' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6B9D' },
            { offset: 1, color: '#C44569' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFE66D'
      }
    }
  },
  {
    id: 'ocean-depth',
    name: 'Ocean Depth',
    category: 'spectacular',
    description: 'Dégradé océanique aux nuances profondes',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#0077BE' },
            { offset: 0.5, color: '#00A8CC' },
            { offset: 1, color: '#5EB3D6' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#E8F4F8' },
            { offset: 1, color: '#D0E9F2' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#0077BE' },
            { offset: 1, color: '#005A8B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#00A8CC'
      }
    }
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    category: 'spectacular',
    description: 'Inspiré des aurores boréales',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#A8E063' },
            { offset: 0.33, color: '#56AB2F' },
            { offset: 0.66, color: '#00B4DB' },
            { offset: 1, color: '#0083B0' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#F0FFF0' },
            { offset: 1, color: '#E6F7FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#56AB2F' },
            { offset: 1, color: '#00B4DB' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#A8E063'
      }
    }
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'spectacular',
    description: 'Effet néon lumineux et moderne',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FF006E' },
            { offset: 0.5, color: '#8338EC' },
            { offset: 1, color: '#3A86FF' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#0A0A0A' // Dark background for neon effect
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFBE0B' },
            { offset: 0.5, color: '#FB5607' },
            { offset: 1, color: '#FF006E' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#3A86FF'
      }
    }
  },
  {
    id: 'crystal-ice',
    name: 'Crystal Ice',
    category: 'spectacular',
    description: 'Effet cristallin glacé',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#E0E7FF' },
            { offset: 0.5, color: '#C7D2FE' },
            { offset: 1, color: '#A5B4FC' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.7, color: '#F0F4FF' },
            { offset: 1, color: '#E0E7FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#818CF8' },
            { offset: 1, color: '#6366F1' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#4F46E5'
      }
    }
  },
  {
    id: 'fire-phoenix',
    name: 'Fire Phoenix',
    category: 'spectacular',
    description: 'Dégradé de feu ardent',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 0.3, color: '#FFA500' },
            { offset: 0.6, color: '#FF6347' },
            { offset: 1, color: '#DC143C' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFF5E6' },
            { offset: 1, color: '#FFE4CC' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF8C00' },
            { offset: 1, color: '#B22222' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFD700'
      }
    }
  },
  {
    id: 'galaxy-spiral',
    name: 'Galaxy Spiral',
    category: 'spectacular',
    description: 'Spirale galactique mystérieuse',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#667EEA' },
            { offset: 0.3, color: '#764BA2' },
            { offset: 0.6, color: '#F093FB' },
            { offset: 1, color: '#4FACFE' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 225,
          colorStops: [
            { offset: 0, color: '#0F0C29' },
            { offset: 0.5, color: '#302B63' },
            { offset: 1, color: '#24243E' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F093FB' },
            { offset: 1, color: '#764BA2' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#4FACFE'
      }
    }
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest',
    category: 'spectacular',
    description: 'Forêt émeraude luxuriante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#134E5E' },
            { offset: 0.5, color: '#71B280' },
            { offset: 1, color: '#659999' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F0FFF4' },
            { offset: 1, color: '#DCFCE7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#16A34A' },
            { offset: 1, color: '#15803D' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#166534'
      }
    }
  },
  {
    id: 'rainbow-prism',
    name: 'Rainbow Prism',
    category: 'spectacular',
    description: 'Arc-en-ciel prismatique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 0.17, color: '#FF7F00' },
            { offset: 0.33, color: '#FFFF00' },
            { offset: 0.5, color: '#00FF00' },
            { offset: 0.67, color: '#0000FF' },
            { offset: 0.83, color: '#4B0082' },
            { offset: 1, color: '#9400D3' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF1493' },
            { offset: 0.5, color: '#00CED1' },
            { offset: 1, color: '#FFD700' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF69B4' },
            { offset: 1, color: '#4169E1' }
          ]
        }
      }
    }
  },
  {
    id: 'cosmic-dust',
    name: 'Cosmic Dust',
    category: 'spectacular',
    description: 'Poussière cosmique scintillante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#E94057' },
            { offset: 0.5, color: '#8A2387' },
            { offset: 1, color: '#F27121' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#1A1A2E' },
            { offset: 0.5, color: '#16213E' },
            { offset: 1, color: '#0F3460' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F79533' },
            { offset: 1, color: '#F37055' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFD89B'
      }
    }
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    category: 'spectacular',
    description: 'Rêve lavande apaisant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D8B5FF' },
            { offset: 0.5, color: '#C8A8E9' },
            { offset: 1, color: '#B8A9C9' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FAF5FF' },
            { offset: 1, color: '#F3E8FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#9D4EDD' },
            { offset: 1, color: '#7B2CBF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#C77DFF'
      }
    }
  },
  {
    id: 'circular-aurora',
    name: 'Circular Aurora',
    category: 'spectacular',
    description: 'Aurore circulaire dynamique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00F5FF' },
            { offset: 0.3, color: '#00D4FF' },
            { offset: 0.6, color: '#00A6FF' },
            { offset: 1, color: '#0078FF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#001F3F' },
            { offset: 1, color: '#000A1F' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00FF88' },
            { offset: 1, color: '#00CC70' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#00F5FF'
      }
    }
  },

  // PROFESSIONAL Category - Business et Corporate
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'professional',
    description: 'Bleu corporate professionnel',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#1E3A8A'
      },
      backgroundOptions: { 
        color: '#F8FAFC'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#1E3A8A'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1E3A8A'
      }
    }
  },
  {
    id: 'executive-gold',
    name: 'Executive Gold',
    category: 'professional',
    description: 'Or exécutif prestigieux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D4A574' },
            { offset: 0.5, color: '#B8860B' },
            { offset: 1, color: '#996515' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFEF7'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#B8860B'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#996515'
      }
    }
  },
  {
    id: 'minimal-black',
    name: 'Minimal Black',
    category: 'professional',
    description: 'Noir minimaliste élégant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#000000'
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#000000'
      }
    }
  },
  {
    id: 'tech-grid',
    name: 'Tech Grid',
    category: 'professional',
    description: 'Grille technologique moderne',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        color: '#4C1D95'
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#F3F4F6' },
            { offset: 1, color: '#E5E7EB' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#7C3AED'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#6D28D9'
      }
    }
  },
  {
    id: 'finance-green',
    name: 'Finance Green',
    category: 'professional',
    description: 'Vert finance institutionnel',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#14532D'
      },
      backgroundOptions: { 
        color: '#F0FDF4'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#166534'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#14532D'
      }
    }
  },
  {
    id: 'consulting-navy',
    name: 'Consulting Navy',
    category: 'professional',
    description: 'Bleu marine consulting',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        color: '#1E293B'
      },
      backgroundOptions: { 
        color: '#F8FAFC'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#0F172A'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1E293B'
      }
    }
  },

  // CREATIVE Category - Artistique et Original
  {
    id: 'watercolor-splash',
    name: 'Watercolor Splash',
    category: 'creative',
    description: 'Éclaboussures aquarelle',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6B6B' },
            { offset: 0.5, color: '#4ECDC4' },
            { offset: 1, color: '#45B7D1' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFF5F5' },
            { offset: 1, color: '#F5FFFF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#FF6B6B'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#45B7D1'
      }
    }
  },
  {
    id: 'pastel-dreams',
    name: 'Pastel Dreams',
    category: 'creative',
    description: 'Rêves en couleurs pastel',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFE5E5' },
            { offset: 0.33, color: '#FFE5F1' },
            { offset: 0.66, color: '#FFF0F5' },
            { offset: 1, color: '#FFE5EC' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFAFA'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#FFB6C1'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFC0CB'
      }
    }
  },
  {
    id: 'retro-wave',
    name: 'Retro Wave',
    category: 'creative',
    description: 'Vague rétro synthwave',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF006E' },
            { offset: 0.5, color: '#8338EC' },
            { offset: 1, color: '#3A86FF' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#1A1A2E'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#FFBE0B'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#FB5607'
      }
    }
  },
  {
    id: 'minimalist-art',
    name: 'Minimalist Art',
    category: 'creative',
    description: 'Art minimaliste épuré',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        color: '#374151'
      },
      backgroundOptions: { 
        color: '#FAFAFA'
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#111827'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#6B7280'
      }
    }
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    category: 'creative',
    description: 'Style pop art vibrant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF1744' },
            { offset: 0.25, color: '#FFEA00' },
            { offset: 0.5, color: '#00E676' },
            { offset: 0.75, color: '#2979FF' },
            { offset: 1, color: '#E91E63' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#FF1744'
      }
    }
  },

  // EVENT Category - Événements spéciaux
  {
    id: 'wedding-elegant',
    name: 'Wedding Elegant',
    category: 'event',
    description: 'Élégance pour mariages',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F9A8D4' },
            { offset: 0.5, color: '#F472B6' },
            { offset: 1, color: '#EC4899' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFF1F2'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#BE185D'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#F9A8D4'
      }
    }
  },
  {
    id: 'birthday-fun',
    name: 'Birthday Fun',
    category: 'event',
    description: 'Amusant pour anniversaires',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FCD34D' },
            { offset: 0.33, color: '#F59E0B' },
            { offset: 0.66, color: '#EF4444' },
            { offset: 1, color: '#8B5CF6' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FEF3C7' },
            { offset: 1, color: '#FDE68A' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#DC2626'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#7C3AED'
      }
    }
  },
  {
    id: 'christmas-magic',
    name: 'Christmas Magic',
    category: 'event',
    description: 'Magie de Noël festive',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#DC2626' },
            { offset: 0.5, color: '#B91C1C' },
            { offset: 1, color: '#991B1B' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F0FDF4' },
            { offset: 1, color: '#DCFCE7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#15803D'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#DC2626'
      }
    }
  },

  // HOSPITALITY Category - Hôtellerie et Restauration
  {
    id: 'restaurant-chic',
    name: 'Restaurant Chic',
    category: 'hospitality',
    description: 'Chic pour restaurants haut de gamme',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        color: '#7F1D1D'
      },
      backgroundOptions: { 
        color: '#FFFBEB'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#991B1B'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#7F1D1D'
      }
    }
  },
  {
    id: 'cafe-warm',
    name: 'Café Warm',
    category: 'hospitality',
    description: 'Chaleureux pour cafés',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#92400E' },
            { offset: 0.5, color: '#78350F' },
            { offset: 1, color: '#451A03' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FEF3C7'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#92400E'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#D97706'
      }
    }
  },
  {
    id: 'hotel-luxury',
    name: 'Hotel Luxury',
    category: 'hospitality',
    description: 'Luxe pour hôtels prestigieux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#713F12' },
            { offset: 0.5, color: '#854D0E' },
            { offset: 1, color: '#A16207' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFEF0'
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#B45309' },
            { offset: 1, color: '#92400E' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#78350F'
      }
    }
  },

  // RETAIL Category - Commerce et Vente
  {
    id: 'fashion-bold',
    name: 'Fashion Bold',
    category: 'retail',
    description: 'Audacieux pour la mode',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#18181B'
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FAFAFA' },
            { offset: 1, color: '#F4F4F5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#3F3F46'
      }
    }
  },
  {
    id: 'boutique-soft',
    name: 'Boutique Soft',
    category: 'retail',
    description: 'Doux pour boutiques',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F9A8D4' },
            { offset: 0.5, color: '#F472B6' },
            { offset: 1, color: '#DB2777' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FDF4FF'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#BE185D'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#EC4899'
      }
    }
  },
  {
    id: 'store-modern',
    name: 'Store Modern',
    category: 'retail',
    description: 'Moderne pour magasins',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#2563EB' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#EFF6FF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#1E40AF'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1D4ED8'
      }
    }
  },

  // HEALTH Category - Santé et Bien-être
  {
    id: 'medical-clean',
    name: 'Medical Clean',
    category: 'health',
    description: 'Propre pour médical',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#0891B2'
      },
      backgroundOptions: { 
        color: '#F0FDFA'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#0E7490'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#0891B2'
      }
    }
  },
  {
    id: 'wellness-zen',
    name: 'Wellness Zen',
    category: 'health',
    description: 'Zen pour bien-être',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#86EFAC' },
            { offset: 0.5, color: '#4ADE80' },
            { offset: 1, color: '#22C55E' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F0FDF4' },
            { offset: 1, color: '#DCFCE7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#16A34A'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#22C55E'
      }
    }
  },
  {
    id: 'pharmacy-trust',
    name: 'Pharmacy Trust',
    category: 'health',
    description: 'Confiance pour pharmacies',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#059669'
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#047857'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#059669'
      }
    }
  },

  // EDUCATION Category - Éducation et Formation
  {
    id: 'university-classic',
    name: 'University Classic',
    category: 'education',
    description: 'Classique universitaire',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        color: '#1F2937'
      },
      backgroundOptions: { 
        color: '#F9FAFB'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#111827'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#374151'
      }
    }
  },
  {
    id: 'school-fun',
    name: 'School Fun',
    category: 'education',
    description: 'Amusant pour écoles',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F59E0B' },
            { offset: 0.33, color: '#EF4444' },
            { offset: 0.66, color: '#8B5CF6' },
            { offset: 1, color: '#3B82F6' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFBEB'
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#DC2626'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#7C3AED'
      }
    }
  },

  // SOCIAL Category - Réseaux sociaux
  {
    id: 'instagram-gradient',
    name: 'Instagram Gradient',
    category: 'social',
    description: 'Gradient Instagram iconique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#833AB4' },
            { offset: 0.5, color: '#FD1D1D' },
            { offset: 1, color: '#FCAF45' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#833AB4' },
            { offset: 0.5, color: '#E1306C' },
            { offset: 1, color: '#F77737' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#C13584'
      }
    }
  },
  {
    id: 'linkedin-pro',
    name: 'LinkedIn Pro',
    category: 'social',
    description: 'Professionnel LinkedIn',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#0A66C2'
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#0A66C2'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#0A66C2'
      }
    }
  },
  {
    id: 'youtube-play',
    name: 'YouTube Play',
    category: 'social',
    description: 'Style YouTube dynamique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        color: '#FF0000'
      },
      backgroundOptions: { 
        color: '#FFFFFF'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#CC0000'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FF0000'
      }
    }
  }
];

// QR Service Class
class QRService {
  constructor() {
    this.qrCode = null;
  }

  generateQRCode(options = {}) {
    const finalOptions = { ...defaultQROptions, ...options };
    this.qrCode = new QRCodeStyling(finalOptions);
    return this.qrCode;
  }
}

// Create singleton instance
const qrService = new QRService();

export default qrService;
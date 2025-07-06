import QRCodeStyling from 'qr-code-styling';

// Default QR code options
export const defaultQROptions = {
  width: 400, // Doubled size for better quality
  height: 400, // Doubled size for better quality
  type: "svg",
  data: "https://qr-designer.com",
  margin: 20, // Increased margin for better scanning
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
    width: 1000, // Export at 1000x1000 for high quality
    height: 1000,
    quality: 1.0, // Maximum quality
    type: "png"
  },
  svg: {
    width: 1000,
    height: 1000,
    type: "svg"
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

// Premium templates (40+ designs)
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
    description: 'Profondeurs océaniques aux nuances de bleu',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#1E3A8A' },
            { offset: 0.5, color: '#2563EB' },
            { offset: 1, color: '#60A5FA' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#F0F9FF' },
            { offset: 1, color: '#E0F2FE' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#1E3A8A'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#60A5FA'
      }
    }
  },
  {
    id: 'northern-lights',
    name: 'Northern Lights',
    category: 'spectacular',
    description: 'Aurore boréale aux teintes mystiques',
    isPremium: true,
    options: {
      shape: 'circle',
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#10B981' },
            { offset: 0.5, color: '#3B82F6' },
            { offset: 1, color: '#8B5CF6' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F3F4F6' },
            { offset: 1, color: '#E5E7EB' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#10B981'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#8B5CF6'
      }
    }
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    category: 'spectacular',
    description: 'Or rose métallique luxueux et raffiné',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#B76E79' },
            { offset: 0.5, color: '#F4C2C2' },
            { offset: 1, color: '#E8A49C' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FEFEFE' },
            { offset: 1, color: '#FDF5F5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#B76E79'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F4C2C2' },
            { offset: 1, color: '#B76E79' }
          ]
        }
      }
    }
  },
  {
    id: 'midnight-sky',
    name: 'Midnight Sky',
    category: 'spectacular',
    description: 'Ciel nocturne étoilé profond et mystérieux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#1E293B' },
            { offset: 0.7, color: '#334155' },
            { offset: 1, color: '#475569' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#F8FAFC' },
            { offset: 1, color: '#F1F5F9' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#1E293B'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#60A5FA' },
            { offset: 1, color: '#3B82F6' }
          ]
        }
      }
    }
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald Luxury',
    category: 'spectacular',
    description: 'Vert émeraude luxueux avec accents dorés',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#047857' },
            { offset: 0.5, color: '#10B981' },
            { offset: 1, color: '#059669' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#F0FDF4'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FCD34D' },
            { offset: 1, color: '#F59E0B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#047857'
      }
    }
  },
  {
    id: 'lavender-dreams',
    name: 'Lavender Dreams',
    category: 'spectacular',
    description: 'Lavande douce et rêverie apaisante',
    isPremium: true,
    options: {
      shape: 'circle',
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#C084FC' },
            { offset: 0.5, color: '#E9D5FF' },
            { offset: 1, color: '#DDD6FE' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FEFEFE' },
            { offset: 1, color: '#FAF5FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#A855F7'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F3E8FF' },
            { offset: 1, color: '#C084FC' }
          ]
        }
      }
    }
  },
  {
    id: 'copper-shine',
    name: 'Copper Shine',
    category: 'spectacular',
    description: 'Cuivre brillant aux reflets chaleureux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#B87333' },
            { offset: 0.5, color: '#E3A857' },
            { offset: 1, color: '#CD853F' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFAF0' },
            { offset: 1, color: '#FFF8DC' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#B87333'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#B87333' }
          ]
        }
      }
    }
  },
  {
    id: 'arctic-ice',
    name: 'Arctic Ice',
    category: 'spectacular',
    description: 'Glace arctique cristalline et pure',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#E0F2FE' },
            { offset: 0.5, color: '#BAE6FD' },
            { offset: 1, color: '#93C5FD' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#F0F9FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#60A5FA' },
            { offset: 1, color: '#3B82F6' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#DBEAFE'
      }
    }
  },
  {
    id: 'sakura-bloom',
    name: 'Sakura Bloom',
    category: 'spectacular',
    description: 'Fleurs de cerisier japonais délicates',
    isPremium: true,
    options: {
      shape: 'circle',
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFC0CB' },
            { offset: 0.5, color: '#FFB6C1' },
            { offset: 1, color: '#FF69B4' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFF5F7' },
            { offset: 1, color: '#FFEFF1' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#FF1493'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#FFC0CB' }
          ]
        }
      }
    }
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    category: 'spectacular',
    description: 'Lumière dorée de l\'heure magique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#F59E0B' },
            { offset: 0.5, color: '#FCD34D' },
            { offset: 1, color: '#FCA311' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFBEB' },
            { offset: 1, color: '#FEF3C7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D97706' },
            { offset: 1, color: '#B45309' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FEF3C7'
      }
    }
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    category: 'spectacular',
    description: 'Forêt profonde aux nuances naturelles',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#064E3B' },
            { offset: 0.5, color: '#047857' },
            { offset: 1, color: '#065F46' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F9FAFB' },
            { offset: 1, color: '#ECFDF5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#064E3B'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#34D399' },
            { offset: 1, color: '#10B981' }
          ]
        }
      }
    }
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    category: 'spectacular',
    description: 'Violet royal majestueux et noble',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#6B21A8' },
            { offset: 0.5, color: '#9333EA' },
            { offset: 1, color: '#7C3AED' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FEFEFE' },
            { offset: 1, color: '#FAF5FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#C4B5FD' },
            { offset: 1, color: '#A78BFA' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#6B21A8'
      }
    }
  },
  {
    id: 'coral-reef',
    name: 'Coral Reef',
    category: 'spectacular',
    description: 'Récif corallien aux couleurs vivantes',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6347' },
            { offset: 0.5, color: '#FF7F50' },
            { offset: 1, color: '#FFA07A' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#E6FFFA' },
            { offset: 1, color: '#CCFBF1' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#14B8A6' },
            { offset: 1, color: '#0D9488' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FF6347'
      }
    }
  },
  {
    id: 'titanium',
    name: 'Titanium',
    category: 'spectacular',
    description: 'Titane métallique sophistiqué',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#6B7280' },
            { offset: 0.5, color: '#9CA3AF' },
            { offset: 1, color: '#6B7280' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F9FAFB' },
            { offset: 1, color: '#F3F4F6' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#374151'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#D1D5DB' },
            { offset: 1, color: '#9CA3AF' }
          ]
        }
      }
    }
  },
  {
    id: 'mystic-teal',
    name: 'Mystic Teal',
    category: 'spectacular',
    description: 'Bleu-vert mystique et envoutant',
    isPremium: true,
    options: {
      shape: 'circle',
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#0F766E' },
            { offset: 0.5, color: '#14B8A6' },
            { offset: 1, color: '#0D9488' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F0FDFA' },
            { offset: 1, color: '#E6FFFA' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#0F766E'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#5EEAD4' },
            { offset: 1, color: '#2DD4BF' }
          ]
        }
      }
    }
  },
  {
    id: 'champagne',
    name: 'Champagne',
    category: 'spectacular',
    description: 'Doré champagne pétillant et élégant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D4AF37' },
            { offset: 0.5, color: '#F4E4BC' },
            { offset: 1, color: '#DAA520' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFEF7' },
            { offset: 1, color: '#FFF9E6' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#B8860B'
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFE4B5' },
            { offset: 1, color: '#D4AF37' }
          ]
        }
      }
    }
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    category: 'spectacular',
    description: 'Noir obsidienne profond et mystérieux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#18181B' },
            { offset: 0.5, color: '#27272A' },
            { offset: 1, color: '#09090B' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
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
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#52525B' },
            { offset: 1, color: '#18181B' }
          ]
        }
      }
    }
  },

  // Professional Category (8 templates)
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    category: 'professional',
    description: 'Design sophistiqué pour dirigeants et cadres supérieurs',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#1f2937', 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#1f2937' },
            { offset: 1, color: '#374151' }
          ]
        }
      },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#1f2937', type: 'square' },
      cornersDotOptions: { color: '#1f2937', type: 'square' }
    }
  },
  {
    id: 'corporate-pro',
    name: 'Corporate Pro',
    category: 'professional',
    description: 'Style corporate moderne et professionnel',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0f172a', type: 'classy-rounded' },
      backgroundOptions: { color: '#f8fafc' },
      cornersSquareOptions: { color: '#0f172a', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0f172a', type: 'dot' }
    }
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    category: 'professional',
    description: 'Design futuriste pour startups technologiques',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#0ea5e9', 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#0ea5e9' },
            { offset: 1, color: '#0284c7' }
          ]
        }
      },
      backgroundOptions: { color: '#f0f9ff' },
      cornersSquareOptions: { color: '#0ea5e9', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0284c7', type: 'extra-rounded' }
    }
  },
  {
    id: 'consulting-expert',
    name: 'Consulting Expert',
    category: 'professional',
    description: 'Design premium pour cabinets de conseil',
    isPremium: true,
    options: {
      dotsOptions: { color: '#4338ca', type: 'classy' },
      backgroundOptions: { color: '#eef2ff' },
      cornersSquareOptions: { color: '#4338ca', type: 'square' },
      cornersDotOptions: { color: '#4338ca', type: 'square' }
    }
  },
  {
    id: 'finance-master',
    name: 'Finance Master',
    category: 'professional',
    description: 'Design sobre pour institutions financières',
    isPremium: true,
    options: {
      dotsOptions: { color: '#059669', type: 'square' },
      backgroundOptions: { color: '#f0fdf4' },
      cornersSquareOptions: { color: '#059669', type: 'square' },
      cornersDotOptions: { color: '#059669', type: 'square' }
    }
  },
  {
    id: 'real-estate-luxury',
    name: 'Real Estate Luxury',
    category: 'professional',
    description: 'Design élégant pour l\'immobilier de prestige',
    isPremium: true,
    options: {
      dotsOptions: { color: '#b91c1c', type: 'classy-rounded' },
      backgroundOptions: { color: '#fef2f2' },
      cornersSquareOptions: { color: '#b91c1c', type: 'extra-rounded' },
      cornersDotOptions: { color: '#991b1b', type: 'dot' }
    }
  },
  {
    id: 'law-firm',
    name: 'Law Firm',
    category: 'professional',
    description: 'Design traditionnel pour cabinets d\'avocats',
    isPremium: true,
    options: {
      dotsOptions: { color: '#1e293b', type: 'square' },
      backgroundOptions: { color: '#f1f5f9' },
      cornersSquareOptions: { color: '#1e293b', type: 'square' },
      cornersDotOptions: { color: '#1e293b', type: 'square' }
    }
  },
  {
    id: 'insurance-trust',
    name: 'Insurance Trust',
    category: 'professional',
    description: 'Design rassurant pour compagnies d\'assurance',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0369a1', type: 'rounded' },
      backgroundOptions: { color: '#e0f2fe' },
      cornersSquareOptions: { color: '#0369a1', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0369a1', type: 'extra-rounded' }
    }
  },

  // Creative Category (8 templates)
  {
    id: 'artist-palette',
    name: 'Artist Palette',
    category: 'creative',
    description: 'Design coloré pour artistes et créatifs',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#7c3aed',
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#7c3aed' },
            { offset: 0.5, color: '#ec4899' },
            { offset: 1, color: '#f59e0b' }
          ]
        }
      },
      backgroundOptions: { color: '#faf5ff' },
      cornersSquareOptions: { color: '#7c3aed', type: 'dot' },
      cornersDotOptions: { color: '#ec4899', type: 'dot' }
    }
  },
  {
    id: 'designer-chic',
    name: 'Designer Chic',
    category: 'creative',
    description: 'Style minimaliste pour designers graphiques',
    isPremium: true,
    options: {
      dotsOptions: { color: '#000000', type: 'classy' },
      backgroundOptions: { color: '#fafafa' },
      cornersSquareOptions: { color: '#000000', type: 'square' },
      cornersDotOptions: { color: '#000000', type: 'square' }
    }
  },
  {
    id: 'photo-pro',
    name: 'Photography Pro',
    category: 'creative',
    description: 'Design élégant pour photographes professionnels',
    isPremium: true,
    options: {
      dotsOptions: { color: '#525252', type: 'rounded' },
      backgroundOptions: { color: '#fafafa' },
      cornersSquareOptions: { color: '#262626', type: 'extra-rounded' },
      cornersDotOptions: { color: '#262626', type: 'extra-rounded' }
    }
  },
  {
    id: 'video-production',
    name: 'Video Production',
    category: 'creative',
    description: 'Design dynamique pour studios vidéo',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#dc2626',
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#dc2626' },
            { offset: 1, color: '#991b1b' }
          ]
        }
      },
      backgroundOptions: { color: '#fef2f2' },
      cornersSquareOptions: { color: '#dc2626', type: 'extra-rounded' },
      cornersDotOptions: { color: '#dc2626', type: 'dot' }
    }
  },
  {
    id: 'music-vibes',
    name: 'Music Vibes',
    category: 'creative',
    description: 'Design rythmé pour musiciens et DJ',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#9333ea',
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#9333ea' },
            { offset: 1, color: '#6b21a8' }
          ]
        }
      },
      backgroundOptions: { color: '#1e1b4b' },
      cornersSquareOptions: { color: '#9333ea', type: 'dot' },
      cornersDotOptions: { color: '#a855f7', type: 'dot' }
    }
  },
  {
    id: 'fashion-forward',
    name: 'Fashion Forward',
    category: 'creative',
    description: 'Design avant-gardiste pour le monde de la mode',
    isPremium: true,
    options: {
      dotsOptions: { color: '#be185d', type: 'classy' },
      backgroundOptions: { color: '#fdf2f8' },
      cornersSquareOptions: { color: '#be185d', type: 'square' },
      cornersDotOptions: { color: '#be185d', type: 'square' }
    }
  },
  {
    id: 'architect-blueprint',
    name: 'Architecture Blueprint',
    category: 'creative',
    description: 'Design structuré pour architectes',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0c4a6e', type: 'square' },
      backgroundOptions: { color: '#f0f9ff' },
      cornersSquareOptions: { color: '#0c4a6e', type: 'square' },
      cornersDotOptions: { color: '#0c4a6e', type: 'square' }
    }
  },
  {
    id: 'gallery-modern',
    name: 'Gallery Modern',
    category: 'creative',
    description: 'Design contemporain pour galeries d\'art',
    isPremium: true,
    options: {
      dotsOptions: { color: '#71717a', type: 'extra-rounded' },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#18181b', type: 'extra-rounded' },
      cornersDotOptions: { color: '#18181b', type: 'extra-rounded' }
    }
  },

  // Event Category (6 templates)
  {
    id: 'wedding-elegant',
    name: 'Wedding Elegant',
    category: 'event',
    description: 'Design romantique pour mariages',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#f472b6',
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#f472b6' },
            { offset: 1, color: '#ec4899' }
          ]
        }
      },
      backgroundOptions: { color: '#fdf2f8' },
      cornersSquareOptions: { color: '#ec4899', type: 'dot' },
      cornersDotOptions: { color: '#f472b6', type: 'dot' }
    }
  },
  {
    id: 'concert-live',
    name: 'Concert Live',
    category: 'event',
    description: 'Design énergique pour concerts et festivals',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#ef4444',
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#ef4444' },
            { offset: 0.5, color: '#f97316' },
            { offset: 1, color: '#f59e0b' }
          ]
        }
      },
      backgroundOptions: { color: '#1f2937' },
      cornersSquareOptions: { color: '#ef4444', type: 'extra-rounded' },
      cornersDotOptions: { color: '#f97316', type: 'extra-rounded' }
    }
  },
  {
    id: 'conference-pro',
    name: 'Conference Pro',
    category: 'event',
    description: 'Design professionnel pour conférences',
    isPremium: true,
    options: {
      dotsOptions: { color: '#2563eb', type: 'classy' },
      backgroundOptions: { color: '#eff6ff' },
      cornersSquareOptions: { color: '#2563eb', type: 'square' },
      cornersDotOptions: { color: '#2563eb', type: 'square' }
    }
  },
  {
    id: 'festival-fun',
    name: 'Festival Fun',
    category: 'event',
    description: 'Design festif et coloré',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#10b981',
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#10b981' },
            { offset: 0.33, color: '#3b82f6' },
            { offset: 0.66, color: '#8b5cf6' },
            { offset: 1, color: '#ec4899' }
          ]
        }
      },
      backgroundOptions: { color: '#fafaf9' },
      cornersSquareOptions: { color: '#10b981', type: 'dot' },
      cornersDotOptions: { color: '#3b82f6', type: 'dot' }
    }
  },
  {
    id: 'birthday-party',
    name: 'Birthday Party',
    category: 'event',
    description: 'Design joyeux pour anniversaires',
    isPremium: true,
    options: {
      dotsOptions: { color: '#f59e0b', type: 'extra-rounded' },
      backgroundOptions: { color: '#fefce8' },
      cornersSquareOptions: { color: '#f59e0b', type: 'extra-rounded' },
      cornersDotOptions: { color: '#f97316', type: 'extra-rounded' }
    }
  },
  {
    id: 'gala-luxury',
    name: 'Gala Luxury',
    category: 'event',
    description: 'Design luxueux pour galas et soirées VIP',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#d4af37',
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#d4af37' },
            { offset: 1, color: '#b8860b' }
          ]
        }
      },
      backgroundOptions: { color: '#0f172a' },
      cornersSquareOptions: { color: '#d4af37', type: 'square' },
      cornersDotOptions: { color: '#d4af37', type: 'square' }
    }
  },

  // Hospitality Category (6 templates)
  {
    id: 'restaurant-gourmet',
    name: 'Restaurant Gourmet',
    category: 'hospitality',
    description: 'Élégance pour restaurants haut de gamme',
    isPremium: true,
    options: {
      dotsOptions: { color: '#dc2626', type: 'rounded' },
      backgroundOptions: { color: '#fef2f2' },
      cornersSquareOptions: { color: '#dc2626', type: 'extra-rounded' },
      cornersDotOptions: { color: '#dc2626', type: 'extra-rounded' }
    }
  },
  {
    id: 'hotel-prestige',
    name: 'Hotel Prestige',
    category: 'hospitality',
    description: 'Design raffiné pour hôtels de luxe',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#78350f',
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#78350f' },
            { offset: 1, color: '#92400e' }
          ]
        }
      },
      backgroundOptions: { color: '#fffbeb' },
      cornersSquareOptions: { color: '#78350f', type: 'square' },
      cornersDotOptions: { color: '#78350f', type: 'square' }
    }
  },
  {
    id: 'cafe-cozy',
    name: 'Café Cozy',
    category: 'hospitality',
    description: 'Design chaleureux pour cafés et bistros',
    isPremium: true,
    options: {
      dotsOptions: { color: '#7c2d12', type: 'dots' },
      backgroundOptions: { color: '#fef3c7' },
      cornersSquareOptions: { color: '#7c2d12', type: 'dot' },
      cornersDotOptions: { color: '#7c2d12', type: 'dot' }
    }
  },
  {
    id: 'bar-cocktail',
    name: 'Bar & Cocktail',
    category: 'hospitality',
    description: 'Design moderne pour bars et lounges',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#7e22ce',
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#7e22ce' },
            { offset: 1, color: '#581c87' }
          ]
        }
      },
      backgroundOptions: { color: '#1e1b4b' },
      cornersSquareOptions: { color: '#7e22ce', type: 'extra-rounded' },
      cornersDotOptions: { color: '#a855f7', type: 'extra-rounded' }
    }
  },
  {
    id: 'spa-wellness',
    name: 'Spa Wellness',
    category: 'hospitality',
    description: 'Design zen pour spas et centres de bien-être',
    isPremium: true,
    options: {
      dotsOptions: { color: '#14b8a6', type: 'rounded' },
      backgroundOptions: { color: '#f0fdfa' },
      cornersSquareOptions: { color: '#14b8a6', type: 'extra-rounded' },
      cornersDotOptions: { color: '#14b8a6', type: 'extra-rounded' }
    }
  },
  {
    id: 'tourism-adventure',
    name: 'Tourism Adventure',
    category: 'hospitality',
    description: 'Design dynamique pour agences de voyage',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0891b2', type: 'extra-rounded' },
      backgroundOptions: { color: '#ecfeff' },
      cornersSquareOptions: { color: '#0891b2', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0891b2', type: 'dot' }
    }
  },

  // Retail Category (6 templates)
  {
    id: 'boutique-chic',
    name: 'Boutique Chic',
    category: 'retail',
    description: 'Design élégant pour boutiques exclusives',
    isPremium: true,
    options: {
      dotsOptions: { color: '#e11d48', type: 'classy' },
      backgroundOptions: { color: '#fff1f2' },
      cornersSquareOptions: { color: '#e11d48', type: 'square' },
      cornersDotOptions: { color: '#e11d48', type: 'square' }
    }
  },
  {
    id: 'ecommerce-modern',
    name: 'E-commerce Modern',
    category: 'retail',
    description: 'Design moderne pour boutiques en ligne',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0ea5e9', type: 'rounded' },
      backgroundOptions: { color: '#f0f9ff' },
      cornersSquareOptions: { color: '#0ea5e9', type: 'extra-rounded' },
      cornersDotOptions: { color: '#0ea5e9', type: 'extra-rounded' }
    }
  },
  {
    id: 'luxury-brand',
    name: 'Luxury Brand',
    category: 'retail',
    description: 'Design premium pour marques de luxe',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#000000',
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#000000' },
            { offset: 1, color: '#262626' }
          ]
        }
      },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#000000', type: 'square' },
      cornersDotOptions: { color: '#000000', type: 'square' }
    }
  },
  {
    id: 'sale-promo',
    name: 'Sale & Promo',
    category: 'retail',
    description: 'Design attractif pour promotions',
    isPremium: true,
    options: {
      dotsOptions: { color: '#ef4444', type: 'dots' },
      backgroundOptions: { color: '#fef2f2' },
      cornersSquareOptions: { color: '#ef4444', type: 'dot' },
      cornersDotOptions: { color: '#ef4444', type: 'dot' }
    }
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'retail',
    description: 'Design innovant pour lancements produits',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#8b5cf6',
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#8b5cf6' },
            { offset: 1, color: '#7c3aed' }
          ]
        }
      },
      backgroundOptions: { color: '#faf5ff' },
      cornersSquareOptions: { color: '#8b5cf6', type: 'extra-rounded' },
      cornersDotOptions: { color: '#7c3aed', type: 'extra-rounded' }
    }
  },
  {
    id: 'fashion-store',
    name: 'Fashion Store',
    category: 'retail',
    description: 'Design tendance pour magasins de mode',
    isPremium: true,
    options: {
      dotsOptions: { color: '#db2777', type: 'extra-rounded' },
      backgroundOptions: { color: '#fce7f3' },
      cornersSquareOptions: { color: '#db2777', type: 'extra-rounded' },
      cornersDotOptions: { color: '#db2777', type: 'dot' }
    }
  },

  // Health Category (4 templates)
  {
    id: 'medical-clinic',
    name: 'Medical Clinic',
    category: 'health',
    description: 'Design professionnel pour cliniques médicales',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0369a1', type: 'square' },
      backgroundOptions: { color: '#f0f9ff' },
      cornersSquareOptions: { color: '#0369a1', type: 'square' },
      cornersDotOptions: { color: '#0369a1', type: 'square' }
    }
  },
  {
    id: 'wellness-center',
    name: 'Wellness Center',
    category: 'health',
    description: 'Design apaisant pour centres de bien-être',
    isPremium: true,
    options: {
      dotsOptions: { color: '#10b981', type: 'rounded' },
      backgroundOptions: { color: '#ecfdf5' },
      cornersSquareOptions: { color: '#10b981', type: 'extra-rounded' },
      cornersDotOptions: { color: '#10b981', type: 'extra-rounded' }
    }
  },
  {
    id: 'fitness-energy',
    name: 'Fitness Energy',
    category: 'health',
    description: 'Design dynamique pour salles de sport',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#f97316',
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#f97316' },
            { offset: 1, color: '#ea580c' }
          ]
        }
      },
      backgroundOptions: { color: '#fff7ed' },
      cornersSquareOptions: { color: '#f97316', type: 'extra-rounded' },
      cornersDotOptions: { color: '#ea580c', type: 'dot' }
    }
  },
  {
    id: 'pharmacy-care',
    name: 'Pharmacy Care',
    category: 'health',
    description: 'Design rassurant pour pharmacies',
    isPremium: true,
    options: {
      dotsOptions: { color: '#059669', type: 'classy' },
      backgroundOptions: { color: '#ecfdf5' },
      cornersSquareOptions: { color: '#059669', type: 'square' },
      cornersDotOptions: { color: '#059669', type: 'square' }
    }
  },

  // Education Category (4 templates)
  {
    id: 'university-classic',
    name: 'University Classic',
    category: 'education',
    description: 'Design traditionnel pour universités',
    isPremium: true,
    options: {
      dotsOptions: { color: '#7c2d12', type: 'square' },
      backgroundOptions: { color: '#fef3c7' },
      cornersSquareOptions: { color: '#7c2d12', type: 'square' },
      cornersDotOptions: { color: '#7c2d12', type: 'square' }
    }
  },
  {
    id: 'course-online',
    name: 'Course Online',
    category: 'education',
    description: 'Design moderne pour cours en ligne',
    isPremium: true,
    options: {
      dotsOptions: { color: '#4f46e5', type: 'rounded' },
      backgroundOptions: { color: '#eef2ff' },
      cornersSquareOptions: { color: '#4f46e5', type: 'extra-rounded' },
      cornersDotOptions: { color: '#4f46e5', type: 'extra-rounded' }
    }
  },
  {
    id: 'workshop-creative',
    name: 'Workshop Creative',
    category: 'education',
    description: 'Design créatif pour ateliers et formations',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#a855f7',
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#a855f7' },
            { offset: 1, color: '#9333ea' }
          ]
        }
      },
      backgroundOptions: { color: '#faf5ff' },
      cornersSquareOptions: { color: '#a855f7', type: 'dot' },
      cornersDotOptions: { color: '#9333ea', type: 'dot' }
    }
  },
  {
    id: 'library-knowledge',
    name: 'Library Knowledge',
    category: 'education',
    description: 'Design académique pour bibliothèques',
    isPremium: true,
    options: {
      dotsOptions: { color: '#475569', type: 'classy' },
      backgroundOptions: { color: '#f8fafc' },
      cornersSquareOptions: { color: '#475569', type: 'square' },
      cornersDotOptions: { color: '#475569', type: 'square' }
    }
  },

  // Social Category (3 templates)
  {
    id: 'instagram-style',
    name: 'Instagram Style',
    category: 'social',
    description: 'Design optimisé pour Instagram',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#e1306c',
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#f77737' },
            { offset: 0.5, color: '#e1306c' },
            { offset: 1, color: '#833ab4' }
          ]
        }
      },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#e1306c', type: 'extra-rounded' },
      cornersDotOptions: { color: '#833ab4', type: 'extra-rounded' }
    }
  },
  {
    id: 'linkedin-pro',
    name: 'LinkedIn Professional',
    category: 'social',
    description: 'Design professionnel pour LinkedIn',
    isPremium: true,
    options: {
      dotsOptions: { color: '#0077b5', type: 'classy' },
      backgroundOptions: { color: '#f3f2ef' },
      cornersSquareOptions: { color: '#0077b5', type: 'square' },
      cornersDotOptions: { color: '#0077b5', type: 'square' }
    }
  },
  {
    id: 'tiktok-viral',
    name: 'TikTok Viral',
    category: 'social',
    description: 'Design tendance pour TikTok',
    isPremium: true,
    options: {
      dotsOptions: { 
        color: '#000000',
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#00f2ea' },
            { offset: 0.5, color: '#ff0050' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      backgroundOptions: { color: '#ffffff' },
      cornersSquareOptions: { color: '#000000', type: 'extra-rounded' },
      cornersDotOptions: { color: '#ff0050', type: 'dot' }
    }
  }
];

// QR Code generation service
class QRService {
  constructor() {
    this.qrCode = null;
  }

  generateQRCode(options = {}) {
    const finalOptions = { ...defaultQROptions, ...options };
    this.qrCode = new QRCodeStyling(finalOptions);
    return this.qrCode;
  }

  // Generate spectacular QR code with advanced options
  generateSpectacularQRCode(templateId, data) {
    const template = premiumTemplates.find(t => t.id === templateId);
    if (!template || template.category !== 'spectacular') {
      return this.generateQRCode({ data });
    }

    const spectacularOptions = {
      ...defaultQROptions,
      data,
      width: 600, // Larger size for spectacular effect
      height: 600,
      ...template.options,
      margin: 30 // Extra margin for visual impact
    };

    // Apply special effects based on template
    if (templateId === 'circular-aurora' || templateId === 'galaxy-spiral' || templateId === 'rainbow-prism') {
      spectacularOptions.shape = 'circle';
    }

    this.qrCode = new QRCodeStyling(spectacularOptions);
    return this.qrCode;
  }

  updateQRCode(options) {
    if (this.qrCode) {
      this.qrCode.update(options);
    }
  }

  async downloadQR(format = 'png', filename = 'qrcode') {
    if (!this.qrCode) return;

    try {
      // Update QR code size for high quality export
      const exportOptions = exportSettings[format] || exportSettings.png;
      
      this.qrCode.update({
        width: exportOptions.width,
        height: exportOptions.height
      });

      if (format === 'svg') {
        const blob = await this.qrCode.getRawData('svg');
        this.downloadBlob(blob, `${filename}.svg`, 'image/svg+xml');
      } else {
        await this.qrCode.download({
          name: filename,
          extension: format
        });
      }

      // Reset to default size after download
      this.qrCode.update({
        width: defaultQROptions.width,
        height: defaultQROptions.height
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
      throw error;
    }
  }

  downloadBlob(blob, filename, mimeType) {
    const url = URL.createObjectURL(new Blob([blob], { type: mimeType }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  applyTemplate(templateKey) {
    const template = qrTemplates[templateKey];
    if (!template) return null;

    const options = {
      dotsOptions: {
        color: template.dotsColor,
        type: template.dotsType
      },
      backgroundOptions: {
        color: template.bgColor
      },
      cornersSquareOptions: {
        color: template.cornersColor,
        type: template.cornersType
      },
      cornersDotOptions: {
        color: template.cornersColor,
        type: template.cornersType
      }
    };

    return options;
  }

  applyPremiumTemplate(templateId) {
    const template = premiumTemplates.find(t => t.id === templateId);
    if (!template) return null;
    return template.options;
  }
}

export default new QRService();
export const spectacularTemplates = [
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
  {
    id: 'diamond-sparkle',
    name: 'Diamond Sparkle',
    category: 'spectacular',
    description: 'Éclat de diamant scintillant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.3, color: '#E5E7EB' },
            { offset: 0.6, color: '#9CA3AF' },
            { offset: 1, color: '#6B7280' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#1F2937' },
            { offset: 1, color: '#111827' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F3F4F6' },
            { offset: 1, color: '#D1D5DB' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFFFFF'
      }
    }
  },
  {
    id: 'mystic-twilight',
    name: 'Mystic Twilight',
    category: 'spectacular',
    description: 'Crépuscule mystique enchanteur',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 225,
          colorStops: [
            { offset: 0, color: '#4C1D95' },
            { offset: 0.3, color: '#7C3AED' },
            { offset: 0.6, color: '#A78BFA' },
            { offset: 1, color: '#C4B5FD' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#1E1B4B' },
            { offset: 0.7, color: '#312E81' },
            { offset: 1, color: '#4C1D95' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#DDD6FE' },
            { offset: 1, color: '#A78BFA' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#E9D5FF'
      }
    }
  },
  {
    id: 'electric-plasma',
    name: 'Electric Plasma',
    category: 'spectacular',
    description: 'Plasma électrique futuriste',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00F5FF' },
            { offset: 0.25, color: '#00D9FF' },
            { offset: 0.5, color: '#0099FF' },
            { offset: 0.75, color: '#0066FF' },
            { offset: 1, color: '#0033FF' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#000814'
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#7209B7' },
            { offset: 0.5, color: '#B5179E' },
            { offset: 1, color: '#F72585' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#00F5FF'
      }
    }
  },
  {
    id: 'golden-sunset',
    name: 'Golden Sunset',
    category: 'spectacular',
    description: 'Coucher de soleil doré majestueux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#FCD34D' },
            { offset: 0.25, color: '#FDE047' },
            { offset: 0.5, color: '#FACC15' },
            { offset: 0.75, color: '#F59E0B' },
            { offset: 1, color: '#D97706' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FEF3C7' },
            { offset: 0.5, color: '#FED7AA' },
            { offset: 1, color: '#FDBA74' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#DC2626' },
            { offset: 0.5, color: '#EA580C' },
            { offset: 1, color: '#F97316' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FCD34D'
      }
    }
  },
  {
    id: 'holographic-dream',
    name: 'Holographic Dream',
    category: 'spectacular',
    description: 'Rêve holographique iridescent',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 315,
          colorStops: [
            { offset: 0, color: '#A8EDEA' },
            { offset: 0.2, color: '#FED6E3' },
            { offset: 0.4, color: '#C3F0CA' },
            { offset: 0.6, color: '#D5AAFF' },
            { offset: 0.8, color: '#FFB5E8' },
            { offset: 1, color: '#B5DEFF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFF5F7' },
            { offset: 1, color: '#F5F7FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6B6B' },
            { offset: 0.5, color: '#4ECDC4' },
            { offset: 1, color: '#45B7D1' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FECA57' },
            { offset: 1, color: '#FF9FF3' }
          ]
        }
      }
    }
  }
];
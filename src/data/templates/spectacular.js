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
    id: 'holographic-spectacular',
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
  },
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    category: 'spectacular',
    description: 'Nébuleuse cosmique aux teintes intergalactiques',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF00FF' },
            { offset: 0.2, color: '#9400D3' },
            { offset: 0.4, color: '#4B0082' },
            { offset: 0.6, color: '#0000FF' },
            { offset: 0.8, color: '#00CED1' },
            { offset: 1, color: '#9370DB' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#0A0A0A' },
            { offset: 0.7, color: '#1A1A2E' },
            { offset: 1, color: '#16213E' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF1493' },
            { offset: 0.5, color: '#8A2BE2' },
            { offset: 1, color: '#4169E1' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#FF69B4' }
          ]
        }
      }
    }
  },
  {
    id: 'liquid-metal',
    name: 'Liquid Metal',
    category: 'spectacular',
    description: 'Métal liquide chromé aux reflets holographiques',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#C0C0C0' },
            { offset: 0.2, color: '#B8B8B8' },
            { offset: 0.4, color: '#E5E5E5' },
            { offset: 0.6, color: '#FFFFFF' },
            { offset: 0.8, color: '#D3D3D3' },
            { offset: 1, color: '#A9A9A9' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#1C1C1C' },
            { offset: 0.5, color: '#2D2D2D' },
            { offset: 1, color: '#0A0A0A' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#C0C0C0' },
            { offset: 1, color: '#808080' }
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
    id: 'phoenix-flame',
    name: 'Phoenix Flame',
    category: 'spectacular',
    description: 'Flammes du phénix renaissant de ses cendres',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 0.2, color: '#FFD700' },
            { offset: 0.4, color: '#FFA500' },
            { offset: 0.6, color: '#FF6347' },
            { offset: 0.8, color: '#DC143C' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 315,
          colorStops: [
            { offset: 0, color: '#2D1810' },
            { offset: 0.5, color: '#1A0A00' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#FF4500' },
            { offset: 0.5, color: '#FF6347' },
            { offset: 1, color: '#DC143C' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 1, color: '#FF8C00' }
          ]
        }
      }
    }
  },
  {
    id: 'quantum-wave',
    name: 'Quantum Wave',
    category: 'spectacular',
    description: 'Ondes quantiques en superposition',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#00FFFF' },
            { offset: 0.16, color: '#00BFFF' },
            { offset: 0.33, color: '#1E90FF' },
            { offset: 0.5, color: '#0000FF' },
            { offset: 0.66, color: '#4169E1' },
            { offset: 0.83, color: '#8A2BE2' },
            { offset: 1, color: '#9400D3' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#E6F3FF' },
            { offset: 0.5, color: '#CCE7FF' },
            { offset: 1, color: '#B3DBFF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#00CED1' },
            { offset: 0.5, color: '#0080FF' },
            { offset: 1, color: '#0040FF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#0000CD'
      }
    }
  },
  {
    id: 'emerald-aurora',
    name: 'Emerald Aurora',
    category: 'spectacular',
    description: 'Aurore émeraude dansant dans le ciel nordique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 270,
          colorStops: [
            { offset: 0, color: '#00FF00' },
            { offset: 0.2, color: '#00FA9A' },
            { offset: 0.4, color: '#00CED1' },
            { offset: 0.6, color: '#20B2AA' },
            { offset: 0.8, color: '#48D1CC' },
            { offset: 1, color: '#00FFFF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#001F1F' },
            { offset: 0.5, color: '#002626' },
            { offset: 1, color: '#003333' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#50C878' },
            { offset: 0.5, color: '#00A86B' },
            { offset: 1, color: '#008B8B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#7FFFD4' },
            { offset: 1, color: '#40E0D0' }
          ]
        }
      }
    }
  },
  {
    id: 'dragon-scale',
    name: 'Dragon Scale',
    category: 'spectacular',
    description: 'Écailles de dragon iridescentes',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#4B0082' },
            { offset: 0.2, color: '#6A0DAD' },
            { offset: 0.4, color: '#7B68EE' },
            { offset: 0.6, color: '#9370DB' },
            { offset: 0.8, color: '#8B008B' },
            { offset: 1, color: '#4B0082' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#1A0033' },
            { offset: 0.5, color: '#220044' },
            { offset: 1, color: '#2D0055' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#8B008B' },
            { offset: 0.5, color: '#9932CC' },
            { offset: 1, color: '#BA55D3' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#FFA500' }
          ]
        }
      }
    }
  },
  {
    id: 'plasma-energy',
    name: 'Plasma Energy',
    category: 'spectacular',
    description: 'Énergie plasma électrisante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF00FF' },
            { offset: 0.2, color: '#FF1493' },
            { offset: 0.4, color: '#FF69B4' },
            { offset: 0.6, color: '#FFC0CB' },
            { offset: 0.8, color: '#FFB6C1' },
            { offset: 1, color: '#FFFFFF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#0A0014' },
            { offset: 0.5, color: '#14001F' },
            { offset: 1, color: '#1F0029' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'classy',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF1493' },
            { offset: 0.5, color: '#FF00FF' },
            { offset: 1, color: '#8B008B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#FF69B4' }
          ]
        }
      }
    }
  },
  {
    id: 'diamond-prism',
    name: 'Diamond Prism',
    category: 'spectacular',
    description: 'Prisme de diamant aux mille reflets',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#E0E0E0' },
            { offset: 0.14, color: '#87CEEB' },
            { offset: 0.28, color: '#ADD8E6' },
            { offset: 0.42, color: '#B0E0E6' },
            { offset: 0.57, color: '#AFEEEE' },
            { offset: 0.71, color: '#E0FFFF' },
            { offset: 0.85, color: '#F0FFFF' },
            { offset: 1, color: '#FFFFFF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#F5F5F5' },
            { offset: 1, color: '#FFFFFF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#E0E0E0' },
            { offset: 1, color: '#C0C0C0' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#87CEEB' },
            { offset: 1, color: '#4682B4' }
          ]
        }
      }
    }
  },
  {
    id: 'volcano-burst',
    name: 'Volcano Burst',
    category: 'spectacular',
    description: 'Éruption volcanique explosive',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 0.15, color: '#FFD700' },
            { offset: 0.3, color: '#FFA500' },
            { offset: 0.45, color: '#FF8C00' },
            { offset: 0.6, color: '#FF4500' },
            { offset: 0.75, color: '#DC143C' },
            { offset: 0.9, color: '#8B0000' },
            { offset: 1, color: '#4B0000' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#1A0000' },
            { offset: 0.5, color: '#0D0000' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 0.5, color: '#DC143C' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 0.5, color: '#FFA500' },
            { offset: 1, color: '#FF4500' }
          ]
        }
      }
    }
  },
  {
    id: 'mystic-crystal',
    name: 'Mystic Crystal',
    category: 'spectacular',
    description: 'Cristal mystique aux pouvoirs envoûtants',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 315,
          colorStops: [
            { offset: 0, color: '#E0AAFF' },
            { offset: 0.16, color: '#C77DFF' },
            { offset: 0.33, color: '#9D4EDD' },
            { offset: 0.5, color: '#7B2CBF' },
            { offset: 0.66, color: '#5A189A' },
            { offset: 0.83, color: '#3C096C' },
            { offset: 1, color: '#240046' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#10002B' },
            { offset: 0.7, color: '#240046' },
            { offset: 1, color: '#3C096C' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#E0AAFF' },
            { offset: 0.5, color: '#9D4EDD' },
            { offset: 1, color: '#5A189A' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#FFB6FF' },
            { offset: 1, color: '#E0AAFF' }
          ]
        }
      }
    }
  }
];
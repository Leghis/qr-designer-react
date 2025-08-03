export const eventTemplates = [
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
  {
    id: 'carnival-fiesta',
    name: 'Carnival Fiesta',
    category: 'event',
    description: 'Fiesta carnaval festive',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF0080' },
            { offset: 0.2, color: '#FF8C00' },
            { offset: 0.4, color: '#FFD700' },
            { offset: 0.6, color: '#00CED1' },
            { offset: 0.8, color: '#9370DB' },
            { offset: 1, color: '#FF1493' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFACD' },
            { offset: 1, color: '#FFE4B5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF69B4' },
            { offset: 1, color: '#FF1493' }
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
    id: 'gala-night',
    name: 'Gala Night',
    category: 'event',
    description: 'Soirée de gala prestigieuse',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 0.5, color: '#FFA500' },
            { offset: 1, color: '#FF8C00' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#000000' },
            { offset: 1, color: '#1C1C1C' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#B8860B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#FFD700'
      }
    }
  },
  {
    id: 'summer-festival',
    name: 'Summer Festival',
    category: 'event',
    description: 'Festival d\'été ensoleillé',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFEB3B' },
            { offset: 0.3, color: '#FFC107' },
            { offset: 0.6, color: '#FF9800' },
            { offset: 1, color: '#FF5722' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#87CEEB' },
            { offset: 1, color: '#98D8E8' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#FF5722'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFEB3B'
      }
    }
  },
  {
    id: 'halloween-spooky',
    name: 'Halloween Spooky',
    category: 'event',
    description: 'Halloween effrayant et amusant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF6600' },
            { offset: 0.5, color: '#FF4500' },
            { offset: 1, color: '#FF8C00' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#2D0A4E' },
            { offset: 0.7, color: '#1A0033' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#9400D3'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FF6600'
      }
    }
  },
  {
    id: 'spring-bloom',
    name: 'Spring Bloom',
    category: 'event',
    description: 'Floraison printanière romantique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFB6C1' },
            { offset: 0.3, color: '#FFC0CB' },
            { offset: 0.6, color: '#FFDAB9' },
            { offset: 1, color: '#FFE4E1' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#F0FFF0' },
            { offset: 1, color: '#F5FFFA' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#98FB98' },
            { offset: 1, color: '#90EE90' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFB6C1'
      }
    }
  },
  {
    id: 'new-year-sparkle',
    name: 'New Year Sparkle',
    category: 'event',
    description: 'Nouvel an étincelant avec feux d\'artifice',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 0.2, color: '#FFA500' },
            { offset: 0.4, color: '#FF6347' },
            { offset: 0.6, color: '#FF1493' },
            { offset: 0.8, color: '#9370DB' },
            { offset: 1, color: '#4169E1' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#000033' },
            { offset: 0.5, color: '#000066' },
            { offset: 1, color: '#000099' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#FFD700' },
            { offset: 1, color: '#FFA500' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#C0C0C0' },
            { offset: 1, color: '#FFD700' }
          ]
        }
      }
    }
  },
  {
    id: 'baby-shower-soft',
    name: 'Baby Shower Soft',
    category: 'event',
    description: 'Douche de bébé aux tons doux et tendres',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFE4E1' },
            { offset: 0.33, color: '#E6E6FA' },
            { offset: 0.66, color: '#F0E68C' },
            { offset: 1, color: '#98FB98' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFAFA' },
            { offset: 1, color: '#F5FFFA' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFB6C1' },
            { offset: 1, color: '#87CEEB' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#F0E68C'
      }
    }
  },
  {
    id: 'graduation-honor',
    name: 'Graduation Honor',
    category: 'event',
    description: 'Remise de diplômes prestigieuse et solennelle',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#000080' },
            { offset: 0.5, color: '#191970' },
            { offset: 1, color: '#000033' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#F5F5F5'
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#B8860B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#000080'
      }
    }
  },
  {
    id: 'anniversary-gold',
    name: 'Anniversary Gold',
    category: 'event',
    description: 'Anniversaire doré romantique et élégant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 0.3, color: '#FFC700' },
            { offset: 0.6, color: '#FFB300' },
            { offset: 1, color: '#FF8C00' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFF8DC' },
            { offset: 1, color: '#FAEBD7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#B8860B' },
            { offset: 1, color: '#8B7355' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#FFD700' }
          ]
        }
      }
    }
  },
  {
    id: 'corporate-launch',
    name: 'Corporate Launch',
    category: 'event',
    description: 'Lancement corporate dynamique et moderne',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#0066CC' },
            { offset: 0.5, color: '#0052A3' },
            { offset: 1, color: '#003D7A' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#F0F4F8' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#00BCD4' },
            { offset: 1, color: '#0097A7' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#003D7A'
      }
    }
  },
  {
    id: 'music-festival',
    name: 'Music Festival',
    category: 'event',
    description: 'Festival de musique vibrant et électrisant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#FF00FF' },
            { offset: 0.16, color: '#00FFFF' },
            { offset: 0.33, color: '#00FF00' },
            { offset: 0.5, color: '#FFFF00' },
            { offset: 0.66, color: '#FF8C00' },
            { offset: 0.83, color: '#FF0000' },
            { offset: 1, color: '#FF00FF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#1A1A1A' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#00FFFF' },
            { offset: 1, color: '#FF00FF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 1, color: '#FFFF00' }
          ]
        }
      }
    }
  },
  {
    id: 'valentine-romance',
    name: 'Valentine Romance',
    category: 'event',
    description: 'Saint-Valentin romantique et passionnée',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF69B4' },
            { offset: 0.3, color: '#FF1493' },
            { offset: 0.6, color: '#C71585' },
            { offset: 1, color: '#8B008B' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFE4E1' },
            { offset: 0.5, color: '#FFF0F5' },
            { offset: 1, color: '#FFF5EE' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FFB6C1' },
            { offset: 1, color: '#FF69B4' }
          ]
        }
      }
    }
  },
  {
    id: 'easter-pastel',
    name: 'Easter Pastel',
    category: 'event',
    description: 'Pâques aux couleurs pastel printanières',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFCCFF' },
            { offset: 0.2, color: '#CCFFCC' },
            { offset: 0.4, color: '#FFFFCC' },
            { offset: 0.6, color: '#CCCCFF' },
            { offset: 0.8, color: '#FFCCCC' },
            { offset: 1, color: '#CCFFFF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFFEF7' },
            { offset: 1, color: '#F7FFF7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF99CC' },
            { offset: 1, color: '#CC99FF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#99CCFF' },
            { offset: 1, color: '#99FFCC' }
          ]
        }
      }
    }
  },
  {
    id: 'conference-tech',
    name: 'Conference Tech',
    category: 'event',
    description: 'Conférence technologique moderne et innovante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#00D4FF' },
            { offset: 0.33, color: '#0099FF' },
            { offset: 0.66, color: '#0066FF' },
            { offset: 1, color: '#0033FF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#0A0A0A' },
            { offset: 0.5, color: '#1A1A1A' },
            { offset: 1, color: '#2A2A2A' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00FFFF' },
            { offset: 1, color: '#00CCCC' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#00D4FF' }
          ]
        }
      }
    }
  },
  {
    id: 'charity-gala',
    name: 'Charity Gala',
    category: 'event',
    description: 'Gala de charité élégant et bienveillant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#C9302C' },
            { offset: 0.5, color: '#D9534F' },
            { offset: 1, color: '#E74C3C' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.7, color: '#F9F9F9' },
            { offset: 1, color: '#F0F0F0' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FF69B4' },
            { offset: 1, color: '#FF1493' }
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
  }
];
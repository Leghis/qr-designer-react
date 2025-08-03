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
  }
];
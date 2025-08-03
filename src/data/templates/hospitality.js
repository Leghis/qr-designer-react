export const hospitalityTemplates = [
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
  {
    id: 'bistro-charm',
    name: 'Bistro Charm',
    category: 'hospitality',
    description: 'Charme bistrot parisien',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#8B4513' },
            { offset: 0.5, color: '#A0522D' },
            { offset: 1, color: '#CD853F' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FAEBD7'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#8B0000'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#8B4513'
      }
    }
  },
  {
    id: 'spa-zen',
    name: 'Spa Zen',
    category: 'hospitality',
    description: 'Zen spa relaxant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#B2DFDB' },
            { offset: 0.5, color: '#80CBC4' },
            { offset: 1, color: '#4DB6AC' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#F1F8E9' },
            { offset: 1, color: '#E8F5E9' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#00897B'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#26A69A'
      }
    }
  },
  {
    id: 'cocktail-lounge',
    name: 'Cocktail Lounge',
    category: 'hospitality',
    description: 'Lounge cocktail sophistiqué',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#E91E63' },
            { offset: 0.5, color: '#C2185B' },
            { offset: 1, color: '#AD1457' }
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
            { offset: 0, color: '#FFD54F' },
            { offset: 1, color: '#FFC107' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#E91E63'
      }
    }
  },
  {
    id: 'beach-resort',
    name: 'Beach Resort',
    category: 'hospitality',
    description: 'Resort plage paradisiaque',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#00BCD4' },
            { offset: 0.5, color: '#00ACC1' },
            { offset: 1, color: '#0097A7' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFF9C4' },
            { offset: 0.7, color: '#FFF59D' },
            { offset: 1, color: '#FFF176' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#00838F'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FFD54F'
      }
    }
  },
  {
    id: 'mountain-lodge',
    name: 'Mountain Lodge',
    category: 'hospitality',
    description: 'Lodge montagne chaleureux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#5D4037' },
            { offset: 0.5, color: '#6D4C41' },
            { offset: 1, color: '#795548' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#EFEBE9' },
            { offset: 1, color: '#D7CCC8' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#4E342E'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#3E2723'
      }
    }
  }
];
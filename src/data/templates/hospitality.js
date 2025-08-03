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
  },
  {
    id: 'wine-bar-elegant',
    name: 'Wine Bar Elegant',
    category: 'hospitality',
    description: 'Bar à vin élégant aux teintes bordeaux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#722F37' },
            { offset: 0.3, color: '#6B2737' },
            { offset: 0.6, color: '#5C1A1B' },
            { offset: 1, color: '#4A0E0E' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFFBF7' },
            { offset: 1, color: '#F5E6E0' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#B8860B' },
            { offset: 1, color: '#8B6914' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#722F37'
      }
    }
  },
  {
    id: 'sushi-master',
    name: 'Sushi Master',
    category: 'hospitality',
    description: 'Maître sushi minimaliste japonais',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#1A1A1A'
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#FAFAFA' },
            { offset: 1, color: '#F5F5F5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#B71C1C' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1A1A1A'
      }
    }
  },
  {
    id: 'rooftop-terrace',
    name: 'Rooftop Terrace',
    category: 'hospitality',
    description: 'Terrasse rooftop urbaine sophistiquée',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#1565C0' },
            { offset: 0.5, color: '#1976D2' },
            { offset: 1, color: '#1E88E5' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFF3E0' },
            { offset: 0.5, color: '#FFE0B2' },
            { offset: 1, color: '#FFCC80' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6F00' },
            { offset: 1, color: '#E65100' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#1565C0'
      }
    }
  },
  {
    id: 'bakery-fresh',
    name: 'Bakery Fresh',
    category: 'hospitality',
    description: 'Boulangerie artisanale fraîche et gourmande',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#D4A574' },
            { offset: 0.3, color: '#C19A6B' },
            { offset: 0.6, color: '#A0826D' },
            { offset: 1, color: '#8B7355' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFF8E1' },
            { offset: 0.5, color: '#FFECB3' },
            { offset: 1, color: '#FFE082' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#F57C00' },
            { offset: 1, color: '#E65100' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#795548'
      }
    }
  },
  {
    id: 'steakhouse-premium',
    name: 'Steakhouse Premium',
    category: 'hospitality',
    description: 'Steakhouse premium luxueux et masculin',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#3E2723' },
            { offset: 0.5, color: '#4E342E' },
            { offset: 1, color: '#5D4037' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#212121' },
            { offset: 0.7, color: '#1A1A1A' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#8B0000' },
            { offset: 1, color: '#660000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#D4A574' },
            { offset: 1, color: '#B8860B' }
          ]
        }
      }
    }
  },
  {
    id: 'ice-cream-parlor',
    name: 'Ice Cream Parlor',
    category: 'hospitality',
    description: 'Glacier coloré et gourmand pour enfants',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFB6C1' },
            { offset: 0.2, color: '#87CEEB' },
            { offset: 0.4, color: '#98FB98' },
            { offset: 0.6, color: '#DDA0DD' },
            { offset: 0.8, color: '#F0E68C' },
            { offset: 1, color: '#FFA07A' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFF5EE' },
            { offset: 1, color: '#FFFACD' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
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
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#00CED1' },
            { offset: 1, color: '#48D1CC' }
          ]
        }
      }
    }
  },
  {
    id: 'boutique-hotel',
    name: 'Boutique Hotel',
    category: 'hospitality',
    description: 'Hôtel boutique design contemporain',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#424242' },
            { offset: 0.5, color: '#616161' },
            { offset: 1, color: '#757575' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#FAFAFA' },
            { offset: 1, color: '#F5F5F5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6F00' },
            { offset: 1, color: '#E65100' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#212121'
      }
    }
  },
  {
    id: 'tea-house-garden',
    name: 'Tea House Garden',
    category: 'hospitality',
    description: 'Maison de thé jardin zen apaisant',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#689F38' },
            { offset: 0.3, color: '#558B2F' },
            { offset: 0.6, color: '#33691E' },
            { offset: 1, color: '#1B5E20' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F1F8E9' },
            { offset: 0.5, color: '#E8F5E9' },
            { offset: 1, color: '#C8E6C9' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#8D6E63' },
            { offset: 1, color: '#6D4C41' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#AED581' },
            { offset: 1, color: '#9CCC65' }
          ]
        }
      }
    }
  },
  {
    id: 'pizzeria-rustic',
    name: 'Pizzeria Rustic',
    category: 'hospitality',
    description: 'Pizzeria rustique italienne authentique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D32F2F' },
            { offset: 0.33, color: '#FFFFFF' },
            { offset: 0.66, color: '#388E3C' },
            { offset: 1, color: '#D32F2F' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFF8E1' },
            { offset: 1, color: '#FFECB3' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#F57C00' },
            { offset: 1, color: '#E65100' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1B5E20'
      }
    }
  },
  {
    id: 'wellness-retreat',
    name: 'Wellness Retreat',
    category: 'hospitality',
    description: 'Retraite bien-être naturelle et régénérante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#81C784' },
            { offset: 0.2, color: '#66BB6A' },
            { offset: 0.4, color: '#4CAF50' },
            { offset: 0.6, color: '#43A047' },
            { offset: 0.8, color: '#388E3C' },
            { offset: 1, color: '#2E7D32' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#E3F2FD' },
            { offset: 0.5, color: '#BBDEFB' },
            { offset: 1, color: '#90CAF9' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#26C6DA' },
            { offset: 1, color: '#00ACC1' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#A5D6A7' },
            { offset: 1, color: '#81C784' }
          ]
        }
      }
    }
  }
];
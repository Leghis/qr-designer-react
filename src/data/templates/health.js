export const healthTemplates = [
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
  {
    id: 'dental-care',
    name: 'Dental Care',
    category: 'health',
    description: 'Soins dentaires professionnels',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#0277BD'
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#E1F5FE' },
            { offset: 1, color: '#B3E5FC' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#01579B'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#0277BD'
      }
    }
  },
  {
    id: 'yoga-wellness',
    name: 'Yoga Wellness',
    category: 'health',
    description: 'Yoga bien-être harmonieux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#CE93D8' },
            { offset: 0.5, color: '#BA68C8' },
            { offset: 1, color: '#AB47BC' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#F3E5F5' },
            { offset: 1, color: '#E1BEE7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#9C27B0' },
            { offset: 1, color: '#7B1FA2' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#CE93D8'
      }
    }
  },
  {
    id: 'medical-tech',
    name: 'Medical Tech',
    category: 'health',
    description: 'Technologie médicale avancée',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#00838F' },
            { offset: 0.5, color: '#00ACC1' },
            { offset: 1, color: '#00BCD4' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#E0F7FA'
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#006064' },
            { offset: 1, color: '#004D40' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#00695C'
      }
    }
  },
  {
    id: 'nutrition-fresh',
    name: 'Nutrition Fresh',
    category: 'health',
    description: 'Nutrition fraîche et saine',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#AED581' },
            { offset: 0.3, color: '#9CCC65' },
            { offset: 0.6, color: '#8BC34A' },
            { offset: 1, color: '#7CB342' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFF9C4' },
            { offset: 1, color: '#F0F4C3' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#689F38'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#AFB42B'
      }
    }
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    category: 'health',
    description: 'Santé mentale apaisante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#81C784' },
            { offset: 0.5, color: '#66BB6A' },
            { offset: 1, color: '#4CAF50' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#E8F5E9' },
            { offset: 1, color: '#C8E6C9' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#43A047' },
            { offset: 1, color: '#388E3C' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#2E7D32'
      }
    }
  }
];
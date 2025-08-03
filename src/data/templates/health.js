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
  },
  {
    id: 'hospital-care',
    name: 'Hospital Care',
    category: 'health',
    description: 'Soins hospitaliers professionnels et sécurisants',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#1976D2' },
            { offset: 0.5, color: '#1565C0' },
            { offset: 1, color: '#0D47A1' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#E3F2FD' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D32F2F' },
            { offset: 1, color: '#B71C1C' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#0D47A1'
      }
    }
  },
  {
    id: 'pediatric-fun',
    name: 'Pediatric Fun',
    category: 'health',
    description: 'Pédiatrie amusante et colorée pour enfants',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFB74D' },
            { offset: 0.2, color: '#FF8A65' },
            { offset: 0.4, color: '#A1887F' },
            { offset: 0.6, color: '#90CAF9' },
            { offset: 0.8, color: '#80CBC4' },
            { offset: 1, color: '#AED581' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFF9C4' },
            { offset: 1, color: '#E1F5FE' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFAB91' },
            { offset: 1, color: '#FF7043' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#81D4FA' },
            { offset: 1, color: '#4FC3F7' }
          ]
        }
      }
    }
  },
  {
    id: 'optometry-vision',
    name: 'Optometry Vision',
    category: 'health',
    description: 'Vision optométrie claire et précise',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#424242' },
            { offset: 0.5, color: '#616161' },
            { offset: 1, color: '#757575' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#F5F5F5' },
            { offset: 1, color: '#E0E0E0' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#03A9F4' },
            { offset: 1, color: '#0288D1' }
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
    id: 'cardiology-heart',
    name: 'Cardiology Heart',
    category: 'health',
    description: 'Cardiologie cœur vital et dynamique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#F44336' },
            { offset: 0.5, color: '#E53935' },
            { offset: 1, color: '#C62828' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFEBEE' },
            { offset: 1, color: '#FFCDD2' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#E91E63' },
            { offset: 1, color: '#C2185B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#B71C1C'
      }
    }
  },
  {
    id: 'physical-therapy',
    name: 'Physical Therapy',
    category: 'health',
    description: 'Kinésithérapie dynamique et énergique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF7043' },
            { offset: 0.5, color: '#FF5722' },
            { offset: 1, color: '#F4511E' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFF3E0' },
            { offset: 1, color: '#FFE0B2' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#5C6BC0' },
            { offset: 1, color: '#3F51B5' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#E64A19'
      }
    }
  },
  {
    id: 'laboratory-tech',
    name: 'Laboratory Tech',
    category: 'health',
    description: 'Laboratoire technologique haute précision',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#4A148C' },
            { offset: 0.33, color: '#6A1B9A' },
            { offset: 0.66, color: '#8E24AA' },
            { offset: 1, color: '#AB47BC' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#F3E5F5' },
            { offset: 1, color: '#E1BEE7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00BCD4' },
            { offset: 1, color: '#00ACC1' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#4A148C'
      }
    }
  },
  {
    id: 'emergency-response',
    name: 'Emergency Response',
    category: 'health',
    description: 'Urgences réactives et efficaces',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#D32F2F' },
            { offset: 0.5, color: '#FFFFFF' },
            { offset: 1, color: '#D32F2F' }
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
            { offset: 0, color: '#FFC107' },
            { offset: 1, color: '#FFA000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#B71C1C'
      }
    }
  },
  {
    id: 'senior-care',
    name: 'Senior Care',
    category: 'health',
    description: 'Soins seniors bienveillants et chaleureux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#795548' },
            { offset: 0.3, color: '#6D4C41' },
            { offset: 0.6, color: '#5D4037' },
            { offset: 1, color: '#4E342E' }
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
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFB74D' },
            { offset: 1, color: '#FF9800' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#A1887F' },
            { offset: 1, color: '#8D6E63' }
          ]
        }
      }
    }
  },
  {
    id: 'alternative-medicine',
    name: 'Alternative Medicine',
    category: 'health',
    description: 'Médecine alternative holistique et naturelle',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#9CCC65' },
            { offset: 0.2, color: '#8BC34A' },
            { offset: 0.4, color: '#7CB342' },
            { offset: 0.6, color: '#689F38' },
            { offset: 0.8, color: '#558B2F' },
            { offset: 1, color: '#33691E' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#E8F5E9' },
            { offset: 0.5, color: '#C8E6C9' },
            { offset: 1, color: '#A5D6A7' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#CDDC39' },
            { offset: 1, color: '#C0CA33' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#827717' },
            { offset: 1, color: '#9E9D24' }
          ]
        }
      }
    }
  },
  {
    id: 'fitness-health',
    name: 'Fitness Health',
    category: 'health',
    description: 'Santé fitness énergique et motivante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 270,
          colorStops: [
            { offset: 0, color: '#FF6F00' },
            { offset: 0.25, color: '#FF8F00' },
            { offset: 0.5, color: '#FFA000' },
            { offset: 0.75, color: '#FFB300' },
            { offset: 1, color: '#FFC107' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#263238' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00E676' },
            { offset: 1, color: '#00C853' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF5252' },
            { offset: 1, color: '#F44336' }
          ]
        }
      }
    }
  }
];
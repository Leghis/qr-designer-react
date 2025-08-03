export const creativeTemplates = [
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
  {
    id: 'graffiti-burst',
    name: 'Graffiti Burst',
    category: 'creative',
    description: 'Explosion graffiti urbain',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF006E' },
            { offset: 0.2, color: '#FFBE0B' },
            { offset: 0.4, color: '#FB5607' },
            { offset: 0.6, color: '#8338EC' },
            { offset: 0.8, color: '#3A86FF' },
            { offset: 1, color: '#06FFA5' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#1A1A1A'
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF006E' },
            { offset: 1, color: '#FFBE0B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#06FFA5'
      }
    }
  },
  {
    id: 'abstract-flow',
    name: 'Abstract Flow',
    category: 'creative',
    description: 'Flux abstrait contemporain',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 270,
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
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FDFBFB' },
            { offset: 1, color: '#EBEDEE' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
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
    id: 'neon-punk',
    name: 'Neon Punk',
    category: 'creative',
    description: 'Punk néon rebelle',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FF10F0' },
            { offset: 0.5, color: '#00FF88' },
            { offset: 1, color: '#04D9FF' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#0A0A0A'
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 1, color: '#FF00FF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#00FF88'
      }
    }
  },
  {
    id: 'organic-nature',
    name: 'Organic Nature',
    category: 'creative',
    description: 'Nature organique fluide',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#84CC16' },
            { offset: 0.3, color: '#65A30D' },
            { offset: 0.6, color: '#4D7C0F' },
            { offset: 1, color: '#365314' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F7FEE7' },
            { offset: 0.5, color: '#ECFCCB' },
            { offset: 1, color: '#D9F99D' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#A3E635' },
            { offset: 1, color: '#65A30D' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#BEF264'
      }
    }
  },
  {
    id: 'geometric-maze',
    name: 'Geometric Maze',
    category: 'creative',
    description: 'Labyrinthe géométrique complexe',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#1F2937' },
            { offset: 0.25, color: '#F59E0B' },
            { offset: 0.5, color: '#1F2937' },
            { offset: 0.75, color: '#F59E0B' },
            { offset: 1, color: '#1F2937' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#F3F4F6'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#F59E0B'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1F2937'
      }
    }
  }
];
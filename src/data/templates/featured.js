// Curated Top 9 featured templates for the Home generator
export const featuredPremiumTemplates = [
  // Spectacular
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    category: 'spectacular',
    description: 'Éruption solaire néon sur fond cosmique',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFE259' },
            { offset: 0.4, color: '#FFA751' },
            { offset: 1, color: '#FF512F' }
          ]
        }
      },
      backgroundOptions: {
        gradient: {
          type: 'linear',
          rotation: 225,
          colorStops: [
            { offset: 0, color: '#0B0F25' },
            { offset: 1, color: '#1A1A3B' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#FF8C00' }
          ]
        }
      },
      cornersDotOptions: { type: 'dot', color: '#FF6A00' }
    }
  },
  {
    id: 'iridescent-void',
    name: 'Iridescent Void',
    category: 'spectacular',
    description: 'Irisé futuriste dans le vide profond',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'classy',
        gradient: {
          type: 'linear', rotation: 135,
          colorStops: [
            { offset: 0, color: '#00F5D4' },
            { offset: 0.5, color: '#7B2CBF' },
            { offset: 1, color: '#F15BB5' }
          ]
        }
      },
      backgroundOptions: {
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#0A0A0A' },
            { offset: 1, color: '#1B032E' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'square',
        gradient: {
          type: 'linear', rotation: 90,
          colorStops: [
            { offset: 0, color: '#00BBF9' },
            { offset: 1, color: '#F72585' }
          ]
        }
      },
      cornersDotOptions: {
        type: 'square',
        gradient: {
          type: 'linear', rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFD166' },
            { offset: 1, color: '#06D6A0' }
          ]
        }
      }
    }
  },

  // Professional
  {
    id: 'deep-navy-glass',
    name: 'Deep Navy Glass',
    category: 'professional',
    description: 'Verre bleu marine, sobre et premium',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'classy',
        gradient: {
          type: 'linear', rotation: 0,
          colorStops: [
            { offset: 0, color: '#0B1B34' },
            { offset: 1, color: '#1F3A5F' }
          ]
        }
      },
      backgroundOptions: {
        gradient: {
          type: 'linear', rotation: 180,
          colorStops: [
            { offset: 0, color: '#F8FAFC' },
            { offset: 1, color: '#EEF2F7' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        gradient: {
          type: 'linear', rotation: 45,
          colorStops: [
            { offset: 0, color: '#274060' },
            { offset: 1, color: '#0D2847' }
          ]
        }
      },
      cornersDotOptions: { type: 'dot', color: '#2C3E50' }
    }
  },

  // Creative
  {
    id: 'kaleido-morph',
    name: 'Kaleido Morph',
    category: 'creative',
    description: 'Morphing kaléidoscopique très contrasté',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'square',
        gradient: {
          type: 'linear', rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF006E' },
            { offset: 0.2, color: '#FB5607' },
            { offset: 0.4, color: '#FFBE0B' },
            { offset: 0.6, color: '#3A86FF' },
            { offset: 0.8, color: '#8338EC' },
            { offset: 1, color: '#06D6A0' }
          ]
        }
      },
      backgroundOptions: { color: '#0A0A0A' },
      cornersSquareOptions: {
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#12C2E9' },
            { offset: 0.5, color: '#C471ED' },
            { offset: 1, color: '#F64F59' }
          ]
        }
      },
      cornersDotOptions: { type: 'square', color: '#00FF88' }
    }
  },

  // Event
  {
    id: 'opal-gala',
    name: 'Opal Gala',
    category: 'event',
    description: 'Gala opalin, nacré et raffiné',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'classy-rounded',
        gradient: {
          type: 'linear', rotation: 135,
          colorStops: [
            { offset: 0, color: '#A8EDEA' },
            { offset: 0.5, color: '#FED6E3' },
            { offset: 1, color: '#D0D1FF' }
          ]
        }
      },
      backgroundOptions: {
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#F7F8FF' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        gradient: {
          type: 'linear', rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFAFBD' },
            { offset: 1, color: '#C9FFBF' }
          ]
        }
      },
      cornersDotOptions: {
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#B8C0FF' },
            { offset: 1, color: '#FFC6FF' }
          ]
        }
      }
    }
  },

  // Retail
  {
    id: 'neon-window',
    name: 'Neon Window',
    category: 'retail',
    description: 'Vitrine néon ultra contrastée',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'square',
        gradient: {
          type: 'linear', rotation: 135,
          colorStops: [
            { offset: 0, color: '#00F5FF' },
            { offset: 0.5, color: '#00FFC6' },
            { offset: 1, color: '#FF2E63' }
          ]
        }
      },
      backgroundOptions: { color: '#121212' },
      cornersSquareOptions: { type: 'square', color: '#FFFFFF' },
      cornersDotOptions: {
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#00F5D4' },
            { offset: 1, color: '#F15BB5' }
          ]
        }
      }
    }
  },

  // Health
  {
    id: 'aqua-serenity',
    name: 'Aqua Serenity',
    category: 'health',
    description: 'Sérénité aquatique, bien-être moderne',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#B2FEFA' },
            { offset: 0.5, color: '#0ED2F7' },
            { offset: 1, color: '#00C6FB' }
          ]
        }
      },
      backgroundOptions: {
        gradient: {
          type: 'linear', rotation: 135,
          colorStops: [
            { offset: 0, color: '#F5FFFE' },
            { offset: 1, color: '#E6FFFB' }
          ]
        }
      },
      cornersSquareOptions: {
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#34D399' },
            { offset: 1, color: '#059669' }
          ]
        }
      },
      cornersDotOptions: { type: 'dot', color: '#A7F3D0' }
    }
  },

  // Education
  {
    id: 'quantum-chalk',
    name: 'Quantum Chalk',
    category: 'education',
    description: 'Craie quantique sur tableau, esprit scientifique',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'square',
        gradient: {
          type: 'linear', rotation: 90,
          colorStops: [
            { offset: 0, color: '#E5E7EB' },
            { offset: 1, color: '#CBD5E1' }
          ]
        }
      },
      backgroundOptions: {
        gradient: {
          type: 'linear', rotation: 180,
          colorStops: [
            { offset: 0, color: '#0F5132' },
            { offset: 1, color: '#052E16' }
          ]
        }
      },
      cornersSquareOptions: { type: 'square', color: '#F8FAFC' },
      cornersDotOptions: {
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FDE68A' },
            { offset: 1, color: '#F59E0B' }
          ]
        }
      }
    }
  },

  // Social
  {
    id: 'neon-orbit',
    name: 'Neon Orbit',
    category: 'social',
    description: 'Orbites néon rose/cyan hyper modernes',
    isPremium: true,
    options: {
      dotsOptions: {
        type: 'classy',
        gradient: {
          type: 'linear', rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF2E63' },
            { offset: 1, color: '#08D9D6' }
          ]
        }
      },
      backgroundOptions: { color: '#0A0A0A' },
      cornersSquareOptions: { type: 'extra-rounded', color: '#FFFFFF' },
      cornersDotOptions: {
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF2E63' },
            { offset: 1, color: '#08D9D6' }
          ]
        }
      }
    }
  }
];

export const creativeTemplates = [
  {
    id: 'watercolor-splash',
    name: 'Watercolor Splash',
    category: 'creative',
    description: 'Éclaboussures aquarelle',
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
  },
  {
    id: 'impressionist-garden',
    name: 'Impressionist Garden',
    category: 'creative',
    description: 'Jardin impressionniste aux touches de couleurs',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF6B9D' },
            { offset: 0.2, color: '#FFC8DD' },
            { offset: 0.4, color: '#C9E4CA' },
            { offset: 0.6, color: '#55A3FF' },
            { offset: 0.8, color: '#766EC8' },
            { offset: 1, color: '#E57A44' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 25,
          colorStops: [
            { offset: 0, color: '#FFF8E1' },
            { offset: 0.5, color: '#F5FFFA' },
            { offset: 1, color: '#F0F8FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#87CEEB' },
            { offset: 1, color: '#4682B4' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#DA70D6'
      }
    }
  },
  {
    id: 'digital-glitch',
    name: 'Digital Glitch',
    category: 'creative',
    description: 'Glitch numérique cyberpunk',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF0080' },
            { offset: 0.1, color: '#00FFFF' },
            { offset: 0.2, color: '#FF0080' },
            { offset: 0.3, color: '#FFFF00' },
            { offset: 0.4, color: '#00FF00' },
            { offset: 0.5, color: '#FF0080' },
            { offset: 0.6, color: '#00FFFF' },
            { offset: 0.7, color: '#FF00FF' },
            { offset: 0.8, color: '#00FF00' },
            { offset: 0.9, color: '#FFFF00' },
            { offset: 1, color: '#FF0080' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#0A0A0A'
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#00FFFF' },
            { offset: 0.5, color: '#FF00FF' },
            { offset: 1, color: '#FFFF00' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#00FF00'
      }
    }
  },
  {
    id: 'canvas-splash',
    name: 'Canvas Splash',
    category: 'creative',
    description: 'Éclaboussures de toile artistique',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF1744' },
            { offset: 0.15, color: '#FF6F00' },
            { offset: 0.3, color: '#FFAB00' },
            { offset: 0.45, color: '#00C853' },
            { offset: 0.6, color: '#00B8D4' },
            { offset: 0.75, color: '#2962FF' },
            { offset: 0.9, color: '#AA00FF' },
            { offset: 1, color: '#D500F9' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFEF7' },
            { offset: 1, color: '#FAF9F6' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FF1744' },
            { offset: 0.5, color: '#2962FF' },
            { offset: 1, color: '#AA00FF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFAB00' },
            { offset: 1, color: '#FF6F00' }
          ]
        }
      }
    }
  },
  {
    id: 'psychedelic-trip',
    name: 'Psychedelic Trip',
    category: 'creative',
    description: 'Voyage psychédélique coloré',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF00FF' },
            { offset: 0.125, color: '#FF007F' },
            { offset: 0.25, color: '#FF0000' },
            { offset: 0.375, color: '#FF7F00' },
            { offset: 0.5, color: '#FFFF00' },
            { offset: 0.625, color: '#7FFF00' },
            { offset: 0.75, color: '#00FF00' },
            { offset: 0.875, color: '#00FF7F' },
            { offset: 1, color: '#00FFFF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#0D0221' },
            { offset: 0.5, color: '#1A0338' },
            { offset: 1, color: '#27044F' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 0.5, color: '#FF00FF' },
            { offset: 1, color: '#00FFFF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 0.5, color: '#00FF00' },
            { offset: 1, color: '#0000FF' }
          ]
        }
      }
    }
  },
  {
    id: 'origami-fold',
    name: 'Origami Fold',
    category: 'creative',
    description: 'Pliage origami géométrique',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F48FB1' },
            { offset: 0.25, color: '#CE93D8' },
            { offset: 0.5, color: '#B39DDB' },
            { offset: 0.75, color: '#9FA8DA' },
            { offset: 1, color: '#90CAF9' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FAFAFA' },
            { offset: 0.5, color: '#F5F5F5' },
            { offset: 1, color: '#EEEEEE' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#E91E63' },
            { offset: 1, color: '#9C27B0' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#673AB7'
      }
    }
  },
  {
    id: 'street-art',
    name: 'Street Art',
    category: 'creative',
    description: 'Art urbain expressif',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#FF4081' },
            { offset: 0.2, color: '#FFAB40' },
            { offset: 0.4, color: '#EEFF41' },
            { offset: 0.6, color: '#69F0AE' },
            { offset: 0.8, color: '#40C4FF' },
            { offset: 1, color: '#E040FB' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#212121' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FFAB40' },
            { offset: 1, color: '#FF4081' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#EEFF41'
      }
    }
  },
  {
    id: 'holographic-dream',
    name: 'Holographic Dream',
    category: 'creative',
    description: 'Rêve holographique futuriste',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#A8EDEA' },
            { offset: 0.2, color: '#FED6E3' },
            { offset: 0.4, color: '#F5D0FE' },
            { offset: 0.6, color: '#D0D1FF' },
            { offset: 0.8, color: '#A8F3FF' },
            { offset: 1, color: '#FFE4E6' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.5, color: '#F8F9FF' },
            { offset: 1, color: '#E8E9FF' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#C3F0CA' },
            { offset: 0.5, color: '#FFE5EC' },
            { offset: 1, color: '#E8DAFF' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFCCE5' },
            { offset: 1, color: '#D0D1FF' }
          ]
        }
      }
    }
  },
  {
    id: 'vintage-comic',
    name: 'Vintage Comic',
    category: 'creative',
    description: 'Bande dessinée vintage',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#000000' },
            { offset: 0.5, color: '#333333' },
            { offset: 1, color: '#000000' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFACD' },
            { offset: 0.5, color: '#FFE4B5' },
            { offset: 1, color: '#FFDAB9' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#DC143C' },
            { offset: 0.5, color: '#FF0000' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#1E90FF' },
            { offset: 1, color: '#000080' }
          ]
        }
      }
    }
  },
  {
    id: 'crystal-prism',
    name: 'Crystal Prism',
    category: 'creative',
    description: 'Prisme cristallin arc-en-ciel',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 0.17, color: '#FF8C00' },
            { offset: 0.33, color: '#FFD700' },
            { offset: 0.5, color: '#00FF00' },
            { offset: 0.67, color: '#00CED1' },
            { offset: 0.83, color: '#0000FF' },
            { offset: 1, color: '#8B008B' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#F0F0F0' },
            { offset: 0.5, color: '#E0E0E0' },
            { offset: 1, color: '#D0D0D0' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
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
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF1493' },
            { offset: 0.5, color: '#00BFFF' },
            { offset: 1, color: '#32CD32' }
          ]
        }
      }
    }
  },
  {
    id: 'fluid-dynamics',
    name: 'Fluid Dynamics',
    category: 'creative',
    description: 'Dynamique fluide hypnotique',
    isPremium: false,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#5E60CE' },
            { offset: 0.2, color: '#5390D9' },
            { offset: 0.4, color: '#4EA8DE' },
            { offset: 0.6, color: '#48BFE3' },
            { offset: 0.8, color: '#56CFE1' },
            { offset: 1, color: '#64DFDF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FBFFFE' },
            { offset: 0.5, color: '#F0FFFE' },
            { offset: 1, color: '#E6FFFD' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#6930C3' },
            { offset: 0.5, color: '#5E60CE' },
            { offset: 1, color: '#5390D9' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#80FFDB' },
            { offset: 1, color: '#72EFDD' }
          ]
        }
      }
    }
  }
];
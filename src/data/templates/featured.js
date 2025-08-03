// Featured templates for home page preview (lightweight subset)
export const featuredPremiumTemplates = [
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
    id: 'corporate-blue',
    name: 'Corporate Blue',
    category: 'professional',
    description: 'Design professionnel en nuances de bleu',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        color: '#1E40AF'
      },
      backgroundOptions: { 
        color: '#F0F9FF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#172554'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1E3A8A'
      }
    }
  },
  {
    id: 'watercolor-splash',
    name: 'Watercolor Splash',
    category: 'creative',
    description: 'Effet aquarelle artistique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#667EEA' },
            { offset: 0.5, color: '#764BA2' },
            { offset: 1, color: '#F093FB' }
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
        type: 'dot',
        color: '#667EEA'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#764BA2'
      }
    }
  },
  {
    id: 'wedding-elegant',
    name: 'Wedding Elegant',
    category: 'event',
    description: 'Élégance romantique pour mariages',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#E0C3FC' },
            { offset: 1, color: '#8EC5FC' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FEFEFE'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#FFB6C1'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#DDA0DD'
      }
    }
  }
];
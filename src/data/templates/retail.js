export const retailTemplates = [
  {
    id: 'fashion-bold',
    name: 'Fashion Bold',
    category: 'retail',
    description: 'Audacieux pour la mode',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        color: '#18181B'
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FAFAFA' },
            { offset: 1, color: '#F4F4F5' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#000000'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#3F3F46'
      }
    }
  },
  {
    id: 'boutique-soft',
    name: 'Boutique Soft',
    category: 'retail',
    description: 'Doux pour boutiques',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F9A8D4' },
            { offset: 0.5, color: '#F472B6' },
            { offset: 1, color: '#DB2777' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#FDF4FF'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        color: '#BE185D'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#EC4899'
      }
    }
  },
  {
    id: 'store-modern',
    name: 'Store Modern',
    category: 'retail',
    description: 'Moderne pour magasins',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#3B82F6' },
            { offset: 1, color: '#2563EB' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#EFF6FF'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#1E40AF'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#1D4ED8'
      }
    }
  },
  {
    id: 'luxury-brand',
    name: 'Luxury Brand',
    category: 'retail',
    description: 'Marque de luxe exclusive',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#212121' },
            { offset: 0.5, color: '#424242' },
            { offset: 1, color: '#616161' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FAFAFA' },
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
            { offset: 0, color: '#BF9000' },
            { offset: 1, color: '#997300' }
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
    id: 'tech-store',
    name: 'Tech Store',
    category: 'retail',
    description: 'Magasin tech futuriste',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#00BFA5' },
            { offset: 0.5, color: '#00ACC1' },
            { offset: 1, color: '#0097A7' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#E0F2F1'
      },
      cornersSquareOptions: { 
        type: 'square',
        color: '#00897B'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#00695C'
      }
    }
  },
  {
    id: 'eco-shop',
    name: 'Eco Shop',
    category: 'retail',
    description: 'Boutique éco-responsable',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#8BC34A' },
            { offset: 0.5, color: '#7CB342' },
            { offset: 1, color: '#689F38' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#F1F8E9' },
            { offset: 1, color: '#DCEDC8' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        color: '#558B2F'
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#33691E'
      }
    }
  },
  {
    id: 'vintage-boutique',
    name: 'Vintage Boutique',
    category: 'retail',
    description: 'Boutique vintage rétro',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D4A76A' },
            { offset: 0.5, color: '#C19A5B' },
            { offset: 1, color: '#B8924F' }
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
        color: '#8D6E63'
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#6D4C41'
      }
    }
  },
  {
    id: 'sport-dynamic',
    name: 'Sport Dynamic',
    category: 'retail',
    description: 'Sport dynamique énergique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 270,
          colorStops: [
            { offset: 0, color: '#FF5722' },
            { offset: 0.5, color: '#F44336' },
            { offset: 1, color: '#E53935' }
          ]
        }
      },
      backgroundOptions: { 
        color: '#263238'
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFEB3B' },
            { offset: 1, color: '#FFC107' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        color: '#FF5722'
      }
    }
  }
];
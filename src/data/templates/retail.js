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
  },
  {
    id: 'jewelry-sparkle',
    name: 'Jewelry Sparkle',
    category: 'retail',
    description: 'Bijouterie étincelante aux reflets diamantés',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.2, color: '#F0F0F0' },
            { offset: 0.4, color: '#E0E0E0' },
            { offset: 0.6, color: '#D0D0D0' },
            { offset: 0.8, color: '#C0C0C0' },
            { offset: 1, color: '#B0B0B0' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#1A1A1A' },
            { offset: 0.5, color: '#2D2D2D' },
            { offset: 1, color: '#1A1A1A' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 0.5, color: '#FFA500' },
            { offset: 1, color: '#FF8C00' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#C0C0C0' }
          ]
        }
      }
    }
  },
  {
    id: 'bookstore-cozy',
    name: 'Bookstore Cozy',
    category: 'retail',
    description: 'Librairie chaleureuse et accueillante',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#6F4E37' },
            { offset: 0.5, color: '#8B5A3C' },
            { offset: 1, color: '#A0522D' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFF8DC' },
            { offset: 0.5, color: '#FAEBD7' },
            { offset: 1, color: '#F5DEB3' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#4B0000' },
            { offset: 1, color: '#800000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#654321'
      }
    }
  },
  {
    id: 'beauty-glam',
    name: 'Beauty Glam',
    category: 'retail',
    description: 'Beauté glamour féminine et sophistiquée',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF69B4' },
            { offset: 0.3, color: '#FF1493' },
            { offset: 0.6, color: '#C71585' },
            { offset: 1, color: '#8B008B' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFF0F5' },
            { offset: 0.5, color: '#FFE4E1' },
            { offset: 1, color: '#FFF5EE' }
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
            { offset: 1, color: '#FFA500' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 1, color: '#FFB6C1' }
          ]
        }
      }
    }
  },
  {
    id: 'kids-paradise',
    name: 'Kids Paradise',
    category: 'retail',
    description: 'Paradis enfants coloré et joyeux',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 0.14, color: '#FF7F00' },
            { offset: 0.28, color: '#FFFF00' },
            { offset: 0.42, color: '#00FF00' },
            { offset: 0.56, color: '#0000FF' },
            { offset: 0.70, color: '#4B0082' },
            { offset: 0.84, color: '#9400D3' },
            { offset: 1, color: '#FF1493' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#87CEEB' },
            { offset: 1, color: '#98FB98' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFD700' },
            { offset: 1, color: '#FFA500' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#FF69B4' },
            { offset: 1, color: '#00CED1' }
          ]
        }
      }
    }
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    category: 'retail',
    description: 'Décoration intérieure élégante et raffinée',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#D2B48C' },
            { offset: 0.5, color: '#BC9A6A' },
            { offset: 1, color: '#A0826D' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FAF0E6' },
            { offset: 1, color: '#E6D4C1' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#8B7355' },
            { offset: 1, color: '#6B5B45' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#5C4033'
      }
    }
  },
  {
    id: 'gourmet-market',
    name: 'Gourmet Market',
    category: 'retail',
    description: 'Marché gourmet artisanal et authentique',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#8B4513' },
            { offset: 0.3, color: '#A0522D' },
            { offset: 0.6, color: '#CD853F' },
            { offset: 1, color: '#DEB887' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#FFFAF0' },
            { offset: 0.5, color: '#FDF5E6' },
            { offset: 1, color: '#FAF0E6' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#228B22' },
            { offset: 1, color: '#006400' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#DC143C' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      }
    }
  },
  {
    id: 'electronics-hub',
    name: 'Electronics Hub',
    category: 'retail',
    description: 'Hub électronique high-tech futuriste',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#00FFFF' },
            { offset: 0.33, color: '#00E5FF' },
            { offset: 0.66, color: '#00BFFF' },
            { offset: 1, color: '#0080FF' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#0A0A0A' },
            { offset: 0.5, color: '#1A1A1A' },
            { offset: 1, color: '#0A0A0A' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'square',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF00FF' },
            { offset: 1, color: '#8B008B' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#00FF00' },
            { offset: 1, color: '#008000' }
          ]
        }
      }
    }
  },
  {
    id: 'streetwear-urban',
    name: 'Streetwear Urban',
    category: 'retail',
    description: 'Streetwear urbain tendance et moderne',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'classy',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 0.5, color: '#000000' },
            { offset: 1, color: '#FFFFFF' }
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
        type: 'square',
        gradient: {
          type: 'linear',
          rotation: 135,
          colorStops: [
            { offset: 0, color: '#FFFF00' },
            { offset: 1, color: '#FFA500' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'square',
        color: '#FF0000'
      }
    }
  },
  {
    id: 'art-gallery',
    name: 'Art Gallery',
    category: 'retail',
    description: 'Galerie d\'art sophistiquée et minimaliste',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'dots',
        gradient: {
          type: 'linear',
          rotation: 180,
          colorStops: [
            { offset: 0, color: '#1A1A1A' },
            { offset: 0.5, color: '#4A4A4A' },
            { offset: 1, color: '#1A1A1A' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FFFFFF' },
            { offset: 0.7, color: '#FAFAFA' },
            { offset: 1, color: '#F0F0F0' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'dot',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF0000' },
            { offset: 1, color: '#8B0000' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#0000FF' },
            { offset: 1, color: '#000080' }
          ]
        }
      }
    }
  },
  {
    id: 'outlet-mall',
    name: 'Outlet Mall',
    category: 'retail',
    description: 'Centre commercial dynamique et attractif',
    isPremium: true,
    options: {
      dotsOptions: { 
        type: 'rounded',
        gradient: {
          type: 'linear',
          rotation: 0,
          colorStops: [
            { offset: 0, color: '#FF6B6B' },
            { offset: 0.25, color: '#FFE66D' },
            { offset: 0.5, color: '#4ECDC4' },
            { offset: 0.75, color: '#95E1D3' },
            { offset: 1, color: '#FF6B6B' }
          ]
        }
      },
      backgroundOptions: { 
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: '#F7F7F7' },
            { offset: 1, color: '#E8E8E8' }
          ]
        }
      },
      cornersSquareOptions: { 
        type: 'extra-rounded',
        gradient: {
          type: 'radial',
          colorStops: [
            { offset: 0, color: '#FF4757' },
            { offset: 1, color: '#C44569' }
          ]
        }
      },
      cornersDotOptions: { 
        type: 'dot',
        gradient: {
          type: 'linear',
          rotation: 90,
          colorStops: [
            { offset: 0, color: '#5F27CD' },
            { offset: 1, color: '#341F97' }
          ]
        }
      }
    }
  }
];
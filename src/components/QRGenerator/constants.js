// QR Code style constants
export const QR_STYLES = [
  {
    id: 'classic',
    name: 'Classique',
    preview: {
      dotsType: 'square',
      cornersType: 'square'
    }
  },
  {
    id: 'rounded',
    name: 'Arrondi',
    preview: {
      dotsType: 'rounded',
      cornersType: 'extra-rounded'
    }
  },
  {
    id: 'dots',
    name: 'Points',
    preview: {
      dotsType: 'dots',
      cornersType: 'dot'
    }
  },
  {
    id: 'classy',
    name: 'Élégant',
    preview: {
      dotsType: 'classy',
      cornersType: 'square'
    }
  },
  {
    id: 'modern',
    name: 'Moderne',
    preview: {
      dotsType: 'extra-rounded',
      cornersType: 'extra-rounded'
    }
  },
  {
    id: 'sharp',
    name: 'Angulaire',
    preview: {
      dotsType: 'square',
      cornersType: 'square'
    }
  }
];

// Color palette constants
export const COLOR_PALETTES = [
  {
    id: 'classic',
    name: 'Classique',
    colors: {
      dots: '#000000',
      background: '#FFFFFF',
      corners: '#000000'
    },
    preview: ['#000000', '#FFFFFF', '#000000']
  },
  {
    id: 'blue',
    name: 'Bleu',
    colors: {
      dots: '#3B82F6',
      background: '#EFF6FF',
      corners: '#1E40AF'
    },
    preview: ['#3B82F6', '#EFF6FF', '#1E40AF']
  },
  {
    id: 'green',
    name: 'Vert',
    colors: {
      dots: '#10B981',
      background: '#F0FDF4',
      corners: '#059669'
    },
    preview: ['#10B981', '#F0FDF4', '#059669']
  },
  {
    id: 'purple',
    name: 'Violet',
    colors: {
      dots: '#8B5CF6',
      background: '#FAF5FF',
      corners: '#7C3AED'
    },
    preview: ['#8B5CF6', '#FAF5FF', '#7C3AED']
  },
  {
    id: 'red',
    name: 'Rouge',
    colors: {
      dots: '#EF4444',
      background: '#FEF2F2',
      corners: '#DC2626'
    },
    preview: ['#EF4444', '#FEF2F2', '#DC2626']
  },
  {
    id: 'orange',
    name: 'Orange',
    colors: {
      dots: '#F97316',
      background: '#FFF7ED',
      corners: '#EA580C'
    },
    preview: ['#F97316', '#FFF7ED', '#EA580C']
  },
  {
    id: 'pink',
    name: 'Rose',
    colors: {
      dots: '#EC4899',
      background: '#FDF2F8',
      corners: '#DB2777'
    },
    preview: ['#EC4899', '#FDF2F8', '#DB2777']
  },
  {
    id: 'custom',
    name: 'Personnalisé',
    colors: null,
    preview: ['#667EEA', '#F3F4F6', '#5A67D8']
  }
];
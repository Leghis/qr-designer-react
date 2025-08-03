// QR Code Types Configuration
export const QR_TYPES = {
  URL: {
    id: 'url',
    name: 'URL',
    icon: '🔗',
    description: 'Lien vers un site web',
    color: 'from-blue-500 to-blue-600',
    fields: [
      { name: 'url', label: 'URL', type: 'url', placeholder: 'https://example.com', required: true }
    ],
    premium: false
  },
  MENU: {
    id: 'menu',
    name: 'Menu Restaurant',
    icon: '🍽️',
    description: 'Menu interactif pour restaurant',
    color: 'from-green-500 to-green-600',
    fields: [], // Complex editor
    premium: true,
    customEditor: true
  },
  PAYMENT: {
    id: 'payment',
    name: 'Paiement',
    icon: '💳',
    description: 'Lien de paiement PayPal ou Stripe',
    color: 'from-purple-500 to-purple-600',
    fields: [
      { name: 'provider', label: 'Fournisseur', type: 'select', options: ['PayPal', 'Stripe'], required: true },
      { name: 'amount', label: 'Montant', type: 'number', placeholder: '10.00', required: true },
      { name: 'currency', label: 'Devise', type: 'select', options: ['EUR', 'USD', 'GBP'], required: true },
      { name: 'description', label: 'Description', type: 'text', placeholder: 'Paiement pour...', required: true }
    ],
    premium: true
  },
  VCARD: {
    id: 'vcard',
    name: 'Carte de visite',
    icon: '👤',
    description: 'Contact professionnel',
    color: 'from-pink-500 to-pink-600',
    fields: [
      { name: 'firstName', label: 'Prénom', type: 'text', required: true },
      { name: 'lastName', label: 'Nom', type: 'text', required: true },
      { name: 'phone', label: 'Téléphone', type: 'tel', placeholder: '+33 6 12 34 56 78' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'contact@example.com' },
      { name: 'company', label: 'Entreprise', type: 'text' },
      { name: 'title', label: 'Fonction', type: 'text' },
      { name: 'website', label: 'Site web', type: 'url' }
    ],
    premium: true
  },
  WIFI: {
    id: 'wifi',
    name: 'WiFi',
    icon: '📶',
    description: 'Configuration réseau WiFi',
    color: 'from-indigo-500 to-indigo-600',
    fields: [
      { name: 'ssid', label: 'Nom du réseau (SSID)', type: 'text', required: true },
      { name: 'password', label: 'Mot de passe', type: 'password', required: true },
      { name: 'security', label: 'Sécurité', type: 'select', options: ['WPA/WPA2', 'WEP', 'Aucune'], required: true },
      { name: 'hidden', label: 'Réseau caché', type: 'checkbox' }
    ],
    premium: false
  },
  EVENT: {
    id: 'event',
    name: 'Événement',
    icon: '📅',
    description: 'Invitation à un événement',
    color: 'from-orange-500 to-orange-600',
    fields: [
      { name: 'title', label: 'Titre', type: 'text', required: true },
      { name: 'location', label: 'Lieu', type: 'text', required: true },
      { name: 'startDate', label: 'Date de début', type: 'datetime-local', required: true },
      { name: 'endDate', label: 'Date de fin', type: 'datetime-local' },
      { name: 'description', label: 'Description', type: 'textarea' }
    ],
    premium: true
  },
  TEXT: {
    id: 'text',
    name: 'Texte',
    icon: '📝',
    description: 'Message simple',
    color: 'from-gray-500 to-gray-600',
    fields: [
      { name: 'text', label: 'Texte', type: 'textarea', placeholder: 'Votre message...', required: true }
    ],
    premium: false
  },
  EMAIL: {
    id: 'email',
    name: 'Email',
    icon: '✉️',
    description: 'Email pré-rempli',
    color: 'from-red-500 to-red-600',
    fields: [
      { name: 'to', label: 'Destinataire', type: 'email', placeholder: 'contact@example.com', required: true },
      { name: 'subject', label: 'Sujet', type: 'text' },
      { name: 'body', label: 'Message', type: 'textarea' }
    ],
    premium: false
  },
  SMS: {
    id: 'sms',
    name: 'SMS',
    icon: '💬',
    description: 'SMS préconfiguré',
    color: 'from-teal-500 to-teal-600',
    fields: [
      { name: 'phone', label: 'Numéro', type: 'tel', placeholder: '+33 6 12 34 56 78', required: true },
      { name: 'message', label: 'Message', type: 'textarea' }
    ],
    premium: false
  },
  LOCATION: {
    id: 'location',
    name: 'Localisation',
    icon: '📍',
    description: 'Coordonnées GPS',
    color: 'from-cyan-500 to-cyan-600',
    fields: [
      { name: 'latitude', label: 'Latitude', type: 'number', placeholder: '48.8566', required: true },
      { name: 'longitude', label: 'Longitude', type: 'number', placeholder: '2.3522', required: true },
      { name: 'name', label: 'Nom du lieu', type: 'text' }
    ],
    premium: false
  }
};

class QRTypesService {
  // Get all QR types
  getAllTypes() {
    return Object.values(QR_TYPES);
  }

  // Get QR types based on user plan
  getAvailableTypes(isPremium = false) {
    return this.getAllTypes().filter(type => !type.premium || isPremium);
  }

  // Get a specific type by ID
  getTypeById(typeId) {
    return Object.values(QR_TYPES).find(type => type.id === typeId);
  }

  // Generate QR data based on type and form values
  generateQRData(typeId, formData) {
    const type = this.getTypeById(typeId);
    if (!type) return null;

    switch (typeId) {
      case 'url':
        return formData.url;

      case 'wifi':
        return `WIFI:T:${formData.security};S:${formData.ssid};P:${formData.password};H:${formData.hidden ? 'true' : 'false'};;`;

      case 'vcard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName} ${formData.lastName}
N:${formData.lastName};${formData.firstName};;;
${formData.phone ? `TEL:${formData.phone}` : ''}
${formData.email ? `EMAIL:${formData.email}` : ''}
${formData.company ? `ORG:${formData.company}` : ''}
${formData.title ? `TITLE:${formData.title}` : ''}
${formData.website ? `URL:${formData.website}` : ''}
END:VCARD`;

      case 'email': {
        const emailParams = [];
        if (formData.subject) emailParams.push(`subject=${encodeURIComponent(formData.subject)}`);
        if (formData.body) emailParams.push(`body=${encodeURIComponent(formData.body)}`);
        return `mailto:${formData.to}${emailParams.length > 0 ? '?' + emailParams.join('&') : ''}`;
      }

      case 'sms':
        return `sms:${formData.phone}${formData.message ? `?body=${encodeURIComponent(formData.message)}` : ''}`;

      case 'location':
        return `geo:${formData.latitude},${formData.longitude}${formData.name ? `?q=${encodeURIComponent(formData.name)}` : ''}`;

      case 'event': {
        // Simple calendar event format
        const startDate = new Date(formData.startDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const endDate = formData.endDate ? new Date(formData.endDate).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') : startDate;
        return `BEGIN:VEVENT
SUMMARY:${formData.title}
LOCATION:${formData.location}
DTSTART:${startDate}
DTEND:${endDate}
${formData.description ? `DESCRIPTION:${formData.description}` : ''}
END:VEVENT`;
      }

      case 'text':
        return formData.text;

      case 'menu':
        // Menu will have a special URL to our platform
        return `https://qr-designer.com/menu/${formData.menuId || 'demo'}`;

      case 'payment':
        // Payment links (simplified for demo)
        if (formData.provider === 'PayPal') {
          return `https://paypal.me/demo/${formData.amount}${formData.currency}`;
        } else {
          return `https://checkout.stripe.com/demo/${formData.amount}${formData.currency}`;
        }

      default:
        return null;
    }
  }

  // Validate form data for a specific type
  validateFormData(typeId, formData) {
    const type = this.getTypeById(typeId);
    if (!type) return { valid: false, errors: ['Type invalide'] };

    const errors = [];

    type.fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors.push(`${field.label} est requis`);
      }

      // Type-specific validation
      if (formData[field.name]) {
        switch (field.type) {
          case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.name])) {
              errors.push(`${field.label} n'est pas un email valide`);
            }
            break;
          case 'url':
            if (!/^https?:\/\/.+/.test(formData[field.name])) {
              errors.push(`${field.label} doit commencer par http:// ou https://`);
            }
            break;
          case 'number':
            if (isNaN(formData[field.name])) {
              errors.push(`${field.label} doit être un nombre`);
            }
            break;
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default new QRTypesService();
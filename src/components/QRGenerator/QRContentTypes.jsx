import { 
  Globe, 
  Type, 
  Wifi, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  MapPin,
  MessageSquare,
  CreditCard,
  Music,
  Bitcoin,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Coins
} from 'lucide-react';

// Types de contenu QR disponibles
export const getQRContentTypes = (t) => [
  {
    id: 'url',
    name: t('qrGenerator.content.types.url'),
    icon: Globe,
    fields: ['url'],
    example: 'https://example.com',
    validator: (data) => {
      try {
        new URL(data.url);
        return true;
      } catch {
        return false;
      }
    }
  },
  {
    id: 'text',
    name: t('qrGenerator.content.types.text'),
    icon: Type,
    fields: ['text'],
    example: 'Votre message ici',
    validator: (data) => data.text && data.text.length > 0
  },
  {
    id: 'wifi',
    name: t('qrGenerator.content.types.wifi'),
    icon: Wifi,
    fields: ['ssid', 'password', 'security', 'hidden'],
    example: 'WIFI:T:WPA;S:MonWiFi;P:MotDePasse;H:false;;',
    validator: (data) => data.ssid && data.ssid.length > 0
  },
  {
    id: 'phone',
    name: t('qrGenerator.content.types.phone'),
    icon: Phone,
    fields: ['phone'],
    example: 'tel:+33123456789',
    validator: (data) => data.phone && /^[\d\s+\-()]+$/.test(data.phone)
  },
  {
    id: 'sms',
    name: t('qrGenerator.content.types.sms'),
    icon: MessageSquare,
    fields: ['phone', 'message'],
    example: 'sms:+33123456789?body=Hello',
    validator: (data) => data.phone && /^[\d\s+\-()]+$/.test(data.phone)
  },
  {
    id: 'email',
    name: t('qrGenerator.content.types.email'),
    icon: Mail,
    fields: ['email', 'subject', 'body'],
    example: 'mailto:contact@example.com?subject=Sujet&body=Message',
    validator: (data) => data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  },
  {
    id: 'vcard',
    name: t('qrGenerator.content.types.vcard'),
    icon: User,
    fields: ['firstName', 'lastName', 'phone', 'email', 'organization', 'title', 'url', 'address'],
    example: 'BEGIN:VCARD...',
    validator: (data) => data.firstName || data.lastName || data.phone || data.email
  },
  {
    id: 'event',
    name: t('qrGenerator.content.types.event'),
    icon: Calendar,
    fields: ['title', 'location', 'startDate', 'endDate', 'description'],
    example: 'BEGIN:VEVENT...',
    validator: (data) => data.title && data.startDate
  },
  {
    id: 'location',
    name: t('qrGenerator.content.types.location'),
    icon: MapPin,
    fields: ['latitude', 'longitude', 'query'],
    example: 'geo:48.8566,2.3522',
    validator: (data) => (data.latitude && data.longitude) || data.query
  },
  {
    id: 'paypal',
    name: t('qrGenerator.content.types.paypal'),
    icon: CreditCard,
    fields: ['email', 'amount', 'currency', 'itemName'],
    example: 'https://paypal.me/example',
    validator: (data) => data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  },
  {
    id: 'bitcoin',
    name: t('qrGenerator.content.types.bitcoin'),
    icon: Bitcoin,
    fields: ['address', 'amount', 'label', 'message'],
    example: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001',
    validator: (data) => data.address && data.address.length > 25
  },
  {
    id: 'spotify',
    name: t('qrGenerator.content.types.spotify'),
    icon: Music,
    fields: ['spotifyUri'],
    example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
    validator: (data) => data.spotifyUri && data.spotifyUri.startsWith('spotify:')
  },
  {
    id: 'whatsapp',
    name: t('qrGenerator.content.types.whatsapp'),
    icon: MessageSquare,
    fields: ['phone', 'message'],
    example: 'https://wa.me/33123456789?text=Hello',
    validator: (data) => data.phone && /^[\d\s+\-()]+$/.test(data.phone)
  },
  {
    id: 'linkedin',
    name: t('qrGenerator.content.types.linkedin'),
    icon: Linkedin,
    fields: ['profileUrl'],
    example: 'https://linkedin.com/in/username',
    validator: (data) => data.profileUrl && data.profileUrl.includes('linkedin.com')
  },
  {
    id: 'instagram',
    name: t('qrGenerator.content.types.instagram'),
    icon: Instagram,
    fields: ['username'],
    example: 'https://instagram.com/username',
    validator: (data) => data.username && data.username.length > 0
  },
  {
    id: 'facebook',
    name: t('qrGenerator.content.types.facebook'),
    icon: Facebook,
    fields: ['pageUrl'],
    example: 'https://facebook.com/pagename',
    validator: (data) => data.pageUrl && data.pageUrl.includes('facebook.com')
  },
  {
    id: 'twitter',
    name: t('qrGenerator.content.types.twitter'),
    icon: Twitter,
    fields: ['username'],
    example: 'https://twitter.com/username',
    validator: (data) => data.username && data.username.length > 0
  },
  {
    id: 'youtube',
    name: t('qrGenerator.content.types.youtube'),
    icon: Youtube,
    fields: ['videoUrl'],
    example: 'https://youtube.com/watch?v=videoId',
    validator: (data) => data.videoUrl && (data.videoUrl.includes('youtube.com') || data.videoUrl.includes('youtu.be'))
  },
  {
    id: 'ethereum',
    name: t('qrGenerator.content.types.ethereum'),
    icon: Coins,
    fields: ['address', 'amount'],
    example: 'ethereum:0x89205A3...?amount=0.05',
    validator: (data) => data.address && data.address.startsWith('0x') && data.address.length === 42
  }
];

// Legacy export for backward compatibility - returns untranslated keys
// Note: This should only be used for internal purposes where raw keys are needed
// For UI components, always use getQRContentTypes(t) with proper translation function
// COMMENTED OUT - This was causing translation issues
// export const QR_CONTENT_TYPES = getQRContentTypes((key) => key);

// Fonctions pour générer le contenu QR selon le type
export const generateQRContent = (type, data) => {
  switch (type) {
    case 'url':
      return data.url || '';
      
    case 'text':
      return data.text || '';
      
    case 'wifi': {
      const security = data.security || 'WPA';
      const hidden = data.hidden ? 'true' : 'false';
      return `WIFI:T:${security};S:${data.ssid || ''};P:${data.password || ''};H:${hidden};;`;
    }
      
    case 'phone':
      return `tel:${data.phone || ''}`;
      
    case 'sms':
      return `sms:${data.phone || ''}${data.message ? `?body=${encodeURIComponent(data.message)}` : ''}`;
      
    case 'email': {
      let mailto = `mailto:${data.email || ''}`;
      const params = [];
      if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
      if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
      if (params.length > 0) mailto += `?${params.join('&')}`;
      return mailto;
    }
      
    case 'vcard': {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${data.firstName || ''} ${data.lastName || ''}`,
        data.firstName ? `N:${data.lastName || ''};${data.firstName};;;` : '',
        data.phone ? `TEL:${data.phone}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.organization ? `ORG:${data.organization}` : '',
        data.title ? `TITLE:${data.title}` : '',
        data.url ? `URL:${data.url}` : '',
        data.address ? `ADR:;;${data.address};;;;` : '',
        'END:VCARD'
      ].filter(line => line).join('\n');
      return vcard;
    }
      
    case 'event': {
      const formatDate = (date) => {
        return new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      };
      const vevent = [
        'BEGIN:VEVENT',
        `SUMMARY:${data.title || ''}`,
        data.location ? `LOCATION:${data.location}` : '',
        data.startDate ? `DTSTART:${formatDate(data.startDate)}` : '',
        data.endDate ? `DTEND:${formatDate(data.endDate)}` : '',
        data.description ? `DESCRIPTION:${data.description}` : '',
        'END:VEVENT'
      ].filter(line => line).join('\n');
      return vevent;
    }
      
    case 'location': {
      if (data.latitude && data.longitude) {
        return `geo:${data.latitude},${data.longitude}`;
      } else if (data.query) {
        return `https://maps.google.com/?q=${encodeURIComponent(data.query)}`;
      }
      return '';
    }
      
    case 'paypal': {
      let paypalUrl = `https://paypal.me/${data.email}`;
      if (data.amount) {
        paypalUrl += `/${data.amount}${data.currency || 'EUR'}`;
      }
      return paypalUrl;
    }
      
    case 'bitcoin': {
      let bitcoinUri = `bitcoin:${data.address || ''}`;
      const bitcoinParams = [];
      if (data.amount) bitcoinParams.push(`amount=${data.amount}`);
      if (data.label) bitcoinParams.push(`label=${encodeURIComponent(data.label)}`);
      if (data.message) bitcoinParams.push(`message=${encodeURIComponent(data.message)}`);
      if (bitcoinParams.length > 0) bitcoinUri += `?${bitcoinParams.join('&')}`;
      return bitcoinUri;
    }
      
    case 'spotify':
      return data.spotifyUri || '';
      
    case 'whatsapp': {
      const cleanPhone = (data.phone || '').replace(/[^\d]/g, '');
      let waUrl = `https://wa.me/${cleanPhone}`;
      if (data.message) {
        waUrl += `?text=${encodeURIComponent(data.message)}`;
      }
      return waUrl;
    }
      
    case 'linkedin':
      return data.profileUrl || '';
      
    case 'instagram':
      return `https://instagram.com/${data.username || ''}`;
      
    case 'facebook':
      return data.pageUrl || '';
      
    case 'twitter':
      return `https://twitter.com/${data.username || ''}`;
      
    case 'youtube':
      return data.videoUrl || '';
      
    case 'ethereum': {
      let ethUri = `ethereum:${data.address || ''}`;
      if (data.amount) {
        ethUri += `?amount=${data.amount}`;
      }
      return ethUri;
    }
      
    default:
      return '';
  }
};

// Fonction pour détecter le type de contenu depuis une chaîne
export const detectQRContentType = (content) => {
  if (!content) return { type: 'text', data: { text: '' } };
  
  // URL
  if (content.match(/^https?:\/\//i)) {
    // Check for special URLs
    if (content.includes('paypal.me')) {
      const match = content.match(/paypal\.me\/([^/?]+)(?:\/(\d+(?:\.\d+)?)([\w]+)?)?/);
      if (match) {
        return {
          type: 'paypal',
          data: {
            email: match[1],
            amount: match[2] || '',
            currency: match[3] || 'EUR'
          }
        };
      }
    }
    if (content.includes('maps.google.com')) {
      const match = content.match(/q=([^&]+)/);
      if (match) {
        return {
          type: 'location',
          data: { query: decodeURIComponent(match[1]) }
        };
      }
    }
    return { type: 'url', data: { url: content } };
  }
  
  // WiFi
  if (content.startsWith('WIFI:')) {
    const ssidMatch = content.match(/S:([^;]+);/);
    const passMatch = content.match(/P:([^;]+);/);
    const secMatch = content.match(/T:([^;]+);/);
    const hiddenMatch = content.match(/H:([^;]+);/);
    
    return {
      type: 'wifi',
      data: {
        ssid: ssidMatch ? ssidMatch[1] : '',
        password: passMatch ? passMatch[1] : '',
        security: secMatch ? secMatch[1] : 'WPA',
        hidden: hiddenMatch ? hiddenMatch[1] === 'true' : false
      }
    };
  }
  
  // Phone
  if (content.startsWith('tel:')) {
    return {
      type: 'phone',
      data: { phone: content.substring(4) }
    };
  }
  
  // SMS
  if (content.startsWith('sms:')) {
    const parts = content.substring(4).split('?body=');
    return {
      type: 'sms',
      data: {
        phone: parts[0],
        message: parts[1] ? decodeURIComponent(parts[1]) : ''
      }
    };
  }
  
  // Email
  if (content.startsWith('mailto:')) {
    const [email, queryString] = content.substring(7).split('?');
    const params = new URLSearchParams(queryString || '');
    return {
      type: 'email',
      data: {
        email,
        subject: params.get('subject') || '',
        body: params.get('body') || ''
      }
    };
  }
  
  // vCard
  if (content.includes('BEGIN:VCARD')) {
    const data = {};
    const fnMatch = content.match(/FN:(.+)/);
    if (fnMatch) {
      const names = fnMatch[1].split(' ');
      data.firstName = names[0] || '';
      data.lastName = names.slice(1).join(' ') || '';
    }
    const telMatch = content.match(/TEL:(.+)/);
    if (telMatch) data.phone = telMatch[1];
    const emailMatch = content.match(/EMAIL:(.+)/);
    if (emailMatch) data.email = emailMatch[1];
    const orgMatch = content.match(/ORG:(.+)/);
    if (orgMatch) data.organization = orgMatch[1];
    const titleMatch = content.match(/TITLE:(.+)/);
    if (titleMatch) data.title = titleMatch[1];
    const urlMatch = content.match(/URL:(.+)/);
    if (urlMatch) data.url = urlMatch[1];
    const adrMatch = content.match(/ADR:;;(.+);;;;/);
    if (adrMatch) data.address = adrMatch[1];
    
    return { type: 'vcard', data };
  }
  
  // Event
  if (content.includes('BEGIN:VEVENT')) {
    const data = {};
    const summaryMatch = content.match(/SUMMARY:(.+)/);
    if (summaryMatch) data.title = summaryMatch[1];
    const locationMatch = content.match(/LOCATION:(.+)/);
    if (locationMatch) data.location = locationMatch[1];
    const dtstartMatch = content.match(/DTSTART:(.+)/);
    if (dtstartMatch) data.startDate = dtstartMatch[1];
    const dtendMatch = content.match(/DTEND:(.+)/);
    if (dtendMatch) data.endDate = dtendMatch[1];
    const descMatch = content.match(/DESCRIPTION:(.+)/);
    if (descMatch) data.description = descMatch[1];
    
    return { type: 'event', data };
  }
  
  // Location
  if (content.startsWith('geo:')) {
    const coords = content.substring(4).split(',');
    return {
      type: 'location',
      data: {
        latitude: coords[0] || '',
        longitude: coords[1] || ''
      }
    };
  }
  
  // Bitcoin
  if (content.startsWith('bitcoin:')) {
    const [address, queryString] = content.substring(8).split('?');
    const params = new URLSearchParams(queryString || '');
    return {
      type: 'bitcoin',
      data: {
        address,
        amount: params.get('amount') || '',
        label: params.get('label') || '',
        message: params.get('message') || ''
      }
    };
  }
  
  // Spotify
  if (content.startsWith('spotify:')) {
    return {
      type: 'spotify',
      data: { spotifyUri: content }
    };
  }
  
  // WhatsApp
  if (content.includes('wa.me/')) {
    const match = content.match(/wa\.me\/(\d+)(?:\?text=(.+))?/);
    if (match) {
      return {
        type: 'whatsapp',
        data: {
          phone: match[1],
          message: match[2] ? decodeURIComponent(match[2]) : ''
        }
      };
    }
  }
  
  // LinkedIn
  if (content.includes('linkedin.com/')) {
    return {
      type: 'linkedin',
      data: { profileUrl: content }
    };
  }
  
  // Instagram
  if (content.includes('instagram.com/')) {
    const match = content.match(/instagram\.com\/([^/?]+)/);
    if (match) {
      return {
        type: 'instagram',
        data: { username: match[1] }
      };
    }
  }
  
  // Facebook
  if (content.includes('facebook.com/')) {
    return {
      type: 'facebook',
      data: { pageUrl: content }
    };
  }
  
  // Twitter
  if (content.includes('twitter.com/') || content.includes('x.com/')) {
    const match = content.match(/(?:twitter|x)\.com\/([^/?]+)/);
    if (match) {
      return {
        type: 'twitter',
        data: { username: match[1] }
      };
    }
  }
  
  // YouTube
  if (content.includes('youtube.com/') || content.includes('youtu.be/')) {
    return {
      type: 'youtube',
      data: { videoUrl: content }
    };
  }
  
  // Ethereum
  if (content.startsWith('ethereum:')) {
    const [address, queryString] = content.substring(9).split('?');
    const params = new URLSearchParams(queryString || '');
    return {
      type: 'ethereum',
      data: {
        address,
        amount: params.get('amount') || ''
      }
    };
  }
  
  // Default to text
  return { type: 'text', data: { text: content } };
};
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QR_CONTENT_TYPES, generateQRContent, detectQRContentType } from './QRContentTypes';

const QRContentEditor = ({ initialData, onDataChange }) => {
  const [contentType, setContentType] = useState('url');
  const [contentData, setContentData] = useState({});
  const [errors, setErrors] = useState({});

  // Initialize with detected content type
  useEffect(() => {
    if (initialData) {
      const detected = detectQRContentType(initialData);
      setContentType(detected.type);
      setContentData(detected.data);
    }
  }, [initialData]);

  // Update parent when data changes
  useEffect(() => {
    const contentConfig = QR_CONTENT_TYPES.find(t => t.id === contentType);
    if (contentConfig) {
      const isValid = contentConfig.validator(contentData);
      if (isValid) {
        const qrContent = generateQRContent(contentType, contentData);
        onDataChange(qrContent);
      }
    }
  }, [contentType, contentData, onDataChange]);

  const handleFieldChange = (field, value) => {
    setContentData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    setErrors(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const renderField = (field) => {
    switch (field) {
      case 'url':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL du site web
            </label>
            <input
              type="url"
              value={contentData.url || ''}
              onChange={(e) => handleFieldChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'text':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Texte
            </label>
            <textarea
              value={contentData.text || ''}
              onChange={(e) => handleFieldChange('text', e.target.value)}
              placeholder="Entrez votre texte ici..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all resize-none"
            />
          </div>
        );

      case 'ssid':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom du réseau WiFi (SSID)
            </label>
            <input
              type="text"
              value={contentData.ssid || ''}
              onChange={(e) => handleFieldChange('ssid', e.target.value)}
              placeholder="MonWiFi"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'password':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={contentData.password || ''}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'security':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type de sécurité
            </label>
            <select
              value={contentData.security || 'WPA'}
              onChange={(e) => handleFieldChange('security', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Aucune</option>
            </select>
          </div>
        );

      case 'hidden':
        return (
          <div key={field} className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hidden-network"
              checked={contentData.hidden || false}
              onChange={(e) => handleFieldChange('hidden', e.target.checked)}
              className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="hidden-network" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Réseau masqué
            </label>
          </div>
        );

      case 'phone':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              value={contentData.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'message':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={contentData.message || ''}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              placeholder="Votre message..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all resize-none"
            />
          </div>
        );

      case 'email':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Adresse email
            </label>
            <input
              type="email"
              value={contentData.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="contact@example.com"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'subject':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sujet
            </label>
            <input
              type="text"
              value={contentData.subject || ''}
              onChange={(e) => handleFieldChange('subject', e.target.value)}
              placeholder="Objet du message"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'body':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Corps du message
            </label>
            <textarea
              value={contentData.body || ''}
              onChange={(e) => handleFieldChange('body', e.target.value)}
              placeholder="Contenu du message..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all resize-none"
            />
          </div>
        );

      // vCard fields
      case 'firstName':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={contentData.firstName || ''}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              placeholder="Jean"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'lastName':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              value={contentData.lastName || ''}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              placeholder="Dupont"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'organization':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Entreprise
            </label>
            <input
              type="text"
              value={contentData.organization || ''}
              onChange={(e) => handleFieldChange('organization', e.target.value)}
              placeholder="Mon Entreprise"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'title':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fonction
            </label>
            <input
              type="text"
              value={contentData.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Directeur Commercial"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'address':
        // Check if we're in bitcoin context
        if (contentType === 'bitcoin') {
          return (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse Bitcoin
              </label>
              <input
                type="text"
                value={contentData.address || ''}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all font-mono text-sm"
              />
            </div>
          );
        }
        // Otherwise it's vCard address
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Adresse
            </label>
            <textarea
              value={contentData.address || ''}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              placeholder="123 Rue de la Paix, 75001 Paris"
              rows={2}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all resize-none"
            />
          </div>
        );

      // Event fields
      case 'location':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lieu
            </label>
            <input
              type="text"
              value={contentData.location || ''}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="Salle de conférence, Paris"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'startDate':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date de début
            </label>
            <input
              type="datetime-local"
              value={contentData.startDate || ''}
              onChange={(e) => handleFieldChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'endDate':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date de fin
            </label>
            <input
              type="datetime-local"
              value={contentData.endDate || ''}
              onChange={(e) => handleFieldChange('endDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'description':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={contentData.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Description de l'événement..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all resize-none"
            />
          </div>
        );

      // Location fields
      case 'latitude':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={contentData.latitude || ''}
              onChange={(e) => handleFieldChange('latitude', e.target.value)}
              placeholder="48.8566"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'longitude':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={contentData.longitude || ''}
              onChange={(e) => handleFieldChange('longitude', e.target.value)}
              placeholder="2.3522"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'query':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recherche d'adresse
            </label>
            <input
              type="text"
              value={contentData.query || ''}
              onChange={(e) => handleFieldChange('query', e.target.value)}
              placeholder="Tour Eiffel, Paris"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      // Payment fields
      case 'amount':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Montant
            </label>
            <input
              type="number"
              step="0.01"
              value={contentData.amount || ''}
              onChange={(e) => handleFieldChange('amount', e.target.value)}
              placeholder="10.00"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      case 'currency':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Devise
            </label>
            <select
              value={contentData.currency || 'EUR'}
              onChange={(e) => handleFieldChange('currency', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CHF">CHF</option>
            </select>
          </div>
        );

      case 'itemName':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description du paiement
            </label>
            <input
              type="text"
              value={contentData.itemName || ''}
              onChange={(e) => handleFieldChange('itemName', e.target.value)}
              placeholder="Paiement pour..."
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );


      case 'label':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Libellé
            </label>
            <input
              type="text"
              value={contentData.label || ''}
              onChange={(e) => handleFieldChange('label', e.target.value)}
              placeholder="Don pour..."
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all"
            />
          </div>
        );

      // Spotify field
      case 'spotifyUri':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URI Spotify
            </label>
            <input
              type="text"
              value={contentData.spotifyUri || ''}
              onChange={(e) => handleFieldChange('spotifyUri', e.target.value)}
              placeholder="spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-all font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Cliquez droit sur une chanson/playlist dans Spotify → Partager → Copier l'URI Spotify
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const currentType = QR_CONTENT_TYPES.find(t => t.id === contentType);

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Type de contenu
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {QR_CONTENT_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setContentType(type.id);
                  setContentData({});
                  setErrors({});
                }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  contentType === type.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">{type.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content Fields */}
      {currentType && (
        <motion.div
          key={contentType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {currentType.fields.map(field => renderField(field))}
        </motion.div>
      )}

      {/* Preview of generated content */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-dark-800 rounded-lg">
          <p className="text-xs font-mono text-gray-600 dark:text-gray-400 break-all">
            {generateQRContent(contentType, contentData) || 'Aucun contenu généré'}
          </p>
        </div>
      )}
    </div>
  );
};

export default QRContentEditor;
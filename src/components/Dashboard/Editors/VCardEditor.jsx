import { useState, useEffect, useRef } from 'react';
import { User, Phone, Mail, Briefcase, Globe, MapPin } from 'lucide-react';
import Input from '../../UI/Input';

const VCardEditor = ({ data, onChange, onPreviewUpdate }) => {
  const [vcard, setVcard] = useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    phone: data.phone || '',
    email: data.email || '',
    company: data.company || '',
    title: data.title || '',
    website: data.website || '',
    address: data.address || '',
    linkedin: data.linkedin || '',
    twitter: data.twitter || ''
  });

  // Use refs to store the latest callback functions to avoid infinite loops
  const onChangeRef = useRef(onChange);
  const onPreviewUpdateRef = useRef(onPreviewUpdate);
  
  // Update refs when props change
  useEffect(() => {
    onChangeRef.current = onChange;
    onPreviewUpdateRef.current = onPreviewUpdate;
  }, [onChange, onPreviewUpdate]);

  useEffect(() => {
    // Generate vCard data
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${vcard.firstName} ${vcard.lastName}
N:${vcard.lastName};${vcard.firstName};;;
${vcard.phone ? `TEL:${vcard.phone}` : ''}
${vcard.email ? `EMAIL:${vcard.email}` : ''}
${vcard.company ? `ORG:${vcard.company}` : ''}
${vcard.title ? `TITLE:${vcard.title}` : ''}
${vcard.website ? `URL:${vcard.website}` : ''}
${vcard.address ? `ADR:;;${vcard.address};;;;` : ''}
END:VCARD`.trim();

    // Debounce updates to prevent excessive re-renders
    const timeoutId = setTimeout(() => {
      onPreviewUpdateRef.current(vcardData);
      onChangeRef.current(vcard);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [vcard]); // Only depend on vcard data

  const handleChange = (field, value) => {
    setVcard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          Informations personnelles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            placeholder="Jean"
            value={vcard.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
          <Input
            label="Nom"
            placeholder="Dupont"
            value={vcard.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary-600" />
          Contact
        </h3>
        <div className="space-y-4">
          <Input
            type="tel"
            label="Téléphone"
            placeholder="+33 6 12 34 56 78"
            icon={Phone}
            value={vcard.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <Input
            type="email"
            label="Email"
            placeholder="jean.dupont@example.com"
            icon={Mail}
            value={vcard.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
      </div>

      {/* Professional Info */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary-600" />
          Informations professionnelles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Entreprise"
            placeholder="Ma Société"
            icon={Briefcase}
            value={vcard.company}
            onChange={(e) => handleChange('company', e.target.value)}
          />
          <Input
            label="Fonction"
            placeholder="Directeur Commercial"
            value={vcard.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-600" />
          Informations supplémentaires
        </h3>
        <div className="space-y-4">
          <Input
            type="url"
            label="Site web"
            placeholder="https://monsite.com"
            icon={Globe}
            value={vcard.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
          <Input
            label="Adresse"
            placeholder="123 Rue de la Paix, 75001 Paris"
            icon={MapPin}
            value={vcard.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>
      </div>

      {/* Social Networks */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
          Réseaux sociaux
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="LinkedIn"
            placeholder="linkedin.com/in/jeandupont"
            value={vcard.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
          <Input
            label="Twitter"
            placeholder="@jeandupont"
            value={vcard.twitter}
            onChange={(e) => handleChange('twitter', e.target.value)}
          />
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Aperçu de la carte
        </h4>
        <div className="bg-white dark:bg-dark-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {vcard.firstName?.[0]}{vcard.lastName?.[0]}
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900 dark:text-white">
                {vcard.firstName} {vcard.lastName}
              </h5>
              {vcard.title && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {vcard.title} {vcard.company && `• ${vcard.company}`}
                </p>
              )}
              {vcard.email && (
                <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                  {vcard.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCardEditor;
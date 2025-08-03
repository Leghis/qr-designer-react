import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getQRContentTypes, generateQRContent, detectQRContentType } from './QRContentTypes';

const QRContentEditor = ({ initialData, onDataChange }) => {
  const { t, i18n } = useTranslation();
  const [contentType, setContentType] = useState('url');
  const [contentData, setContentData] = useState({});
  const [, setErrors] = useState({});
  const formRef = useRef(null);
  
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
    const qrContentTypes = getQRContentTypes(t);
    const contentConfig = qrContentTypes.find(type => type.id === contentType);
    if (contentConfig) {
      const isValid = contentConfig.validator(contentData);
      if (isValid) {
        const qrContent = generateQRContent(contentType, contentData);
        onDataChange(qrContent);
      }
    }
  }, [contentType, contentData, onDataChange, t]);

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
  
  // Handle input events (works better with autofill)
  const handleFieldInput = (field) => (e) => {
    handleFieldChange(field, e.target.value);
  };
  
  // Monitor form for autofill changes
  useEffect(() => {
    if (!formRef.current || contentType !== 'vcard') return;
    
    // Check form values periodically to catch autofill
    const checkAutofill = () => {
      const inputs = formRef.current.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        const fieldName = input.getAttribute('data-field');
        if (fieldName && input.value !== (contentData[fieldName] || '')) {
          handleFieldChange(fieldName, input.value);
        }
      });
    };
    
    // Check immediately and then periodically
    checkAutofill();
    const interval = setInterval(checkAutofill, 100);
    
    // Stop checking after 2 seconds
    const timeout = setTimeout(() => clearInterval(interval), 2000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [contentType]);

  const renderField = (field) => {
    switch (field) {
      case 'url':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.websiteUrl')}
            </label>
            <input
              type="url"
              name="url"
              autoComplete="url"
              data-field="url"
              value={contentData.url || ''}
              onChange={handleFieldInput('url')}
              onInput={handleFieldInput('url')}
              placeholder={t('qrGenerator.content.placeholders.url')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'text':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.text')}
            </label>
            <textarea
              value={contentData.text || ''}
              onChange={(e) => handleFieldChange('text', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.text')}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all resize-none"
            />
          </div>
        );

      case 'ssid':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.wifiName')}
            </label>
            <input
              type="text"
              value={contentData.ssid || ''}
              onChange={(e) => handleFieldChange('ssid', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.wifiName')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'password':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.password')}
            </label>
            <input
              type="password"
              value={contentData.password || ''}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder={t('auth.passwordPlaceholder')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'security':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.securityType')}
            </label>
            <select
              value={contentData.security || 'WPA'}
              onChange={(e) => handleFieldChange('security', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            >
              <option value="WPA">{t('qrGenerator.content.security.wpa')}</option>
              <option value="WEP">{t('qrGenerator.content.security.wep')}</option>
              <option value="nopass">{t('qrGenerator.content.security.none')}</option>
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
              className="w-5 h-5 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-slate-600"
            />
            <label htmlFor="hidden-network" className="text-sm font-medium text-gray-700 dark:text-slate-200">
              {t('qrGenerator.content.fields.hiddenNetwork')}
            </label>
          </div>
        );

      case 'phone':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.phoneNumber')}
            </label>
            <input
              type="tel"
              name="tel"
              autoComplete="tel"
              data-field="phone"
              value={contentData.phone || ''}
              onChange={handleFieldInput('phone')}
              onInput={handleFieldInput('phone')}
              placeholder={t('qrGenerator.content.placeholders.phone')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'message':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.message')}
            </label>
            <textarea
              value={contentData.message || ''}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.message')}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all resize-none"
            />
          </div>
        );

      case 'email':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.emailAddress')}
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              data-field="email"
              value={contentData.email || ''}
              onChange={handleFieldInput('email')}
              onInput={handleFieldInput('email')}
              placeholder={t('qrGenerator.content.placeholders.email')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'subject':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.subject')}
            </label>
            <input
              type="text"
              value={contentData.subject || ''}
              onChange={(e) => handleFieldChange('subject', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.subject')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'body':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.messageBody')}
            </label>
            <textarea
              value={contentData.body || ''}
              onChange={(e) => handleFieldChange('body', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.messageBody')}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all resize-none"
            />
          </div>
        );

      // vCard fields
      case 'firstName':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.firstName')}
            </label>
            <input
              type="text"
              name="given-name"
              autoComplete="given-name"
              data-field="firstName"
              value={contentData.firstName || ''}
              onChange={handleFieldInput('firstName')}
              onInput={handleFieldInput('firstName')}
              placeholder={t('qrGenerator.content.placeholders.firstName')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'lastName':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.lastName')}
            </label>
            <input
              type="text"
              name="family-name"
              autoComplete="family-name"
              data-field="lastName"
              value={contentData.lastName || ''}
              onChange={handleFieldInput('lastName')}
              onInput={handleFieldInput('lastName')}
              placeholder={t('qrGenerator.content.placeholders.lastName')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'organization':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.company')}
            </label>
            <input
              type="text"
              name="organization"
              autoComplete="organization"
              data-field="organization"
              value={contentData.organization || ''}
              onChange={handleFieldInput('organization')}
              onInput={handleFieldInput('organization')}
              placeholder={t('qrGenerator.content.placeholders.company')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'title':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.jobTitle')}
            </label>
            <input
              type="text"
              name="organization-title"
              autoComplete="organization-title"
              data-field="title"
              value={contentData.title || ''}
              onChange={handleFieldInput('title')}
              onInput={handleFieldInput('title')}
              placeholder={t('qrGenerator.content.placeholders.jobTitle')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'address':
        // Check if we're in bitcoin context
        if (contentType === 'bitcoin') {
          return (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                {t('qrGenerator.content.fields.bitcoinAddress')}
              </label>
              <input
                type="text"
                value={contentData.address || ''}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                placeholder={t('qrGenerator.content.placeholders.bitcoinAddress')}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all font-mono text-sm"
              />
            </div>
          );
        }
        // Check if we're in ethereum context
        if (contentType === 'ethereum') {
          return (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
                {t('qrGenerator.content.fields.ethereumAddress')}
              </label>
              <input
                type="text"
                value={contentData.address || ''}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                placeholder={t('qrGenerator.content.placeholders.ethereumAddress')}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all font-mono text-sm"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                {t('qrGenerator.content.hints.ethereumAddress')}
              </p>
            </div>
          );
        }
        // Otherwise it's vCard address
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.address')}
            </label>
            <textarea
              name="street-address"
              autoComplete="street-address"
              data-field="address"
              value={contentData.address || ''}
              onChange={handleFieldInput('address')}
              onInput={handleFieldInput('address')}
              placeholder={t('qrGenerator.content.placeholders.address')}
              rows={2}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all resize-none"
            />
          </div>
        );

      // Event fields
      case 'location':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.location')}
            </label>
            <input
              type="text"
              value={contentData.location || ''}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.location')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'startDate':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.startDate')}
            </label>
            <input
              type="datetime-local"
              value={contentData.startDate || ''}
              onChange={(e) => handleFieldChange('startDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'endDate':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.endDate')}
            </label>
            <input
              type="datetime-local"
              value={contentData.endDate || ''}
              onChange={(e) => handleFieldChange('endDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'description':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.description')}
            </label>
            <textarea
              value={contentData.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.description')}
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all resize-none"
            />
          </div>
        );

      // Location fields
      case 'latitude':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.latitude')}
            </label>
            <input
              type="number"
              step="0.000001"
              value={contentData.latitude || ''}
              onChange={(e) => handleFieldChange('latitude', e.target.value)}
              placeholder="48.8566"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'longitude':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.longitude')}
            </label>
            <input
              type="number"
              step="0.000001"
              value={contentData.longitude || ''}
              onChange={(e) => handleFieldChange('longitude', e.target.value)}
              placeholder="2.3522"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'query':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.addressSearch')}
            </label>
            <input
              type="text"
              value={contentData.query || ''}
              onChange={(e) => handleFieldChange('query', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.addressSearch')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      // Payment fields
      case 'amount':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.amount')}
            </label>
            <input
              type="number"
              step="0.01"
              value={contentData.amount || ''}
              onChange={(e) => handleFieldChange('amount', e.target.value)}
              placeholder="10.00"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      case 'currency':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.currency')}
            </label>
            <select
              value={contentData.currency || 'EUR'}
              onChange={(e) => handleFieldChange('currency', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            >
              <option value="EUR">{t('qrGenerator.content.currencies.eur')}</option>
              <option value="USD">{t('qrGenerator.content.currencies.usd')}</option>
              <option value="GBP">{t('qrGenerator.content.currencies.gbp')}</option>
              <option value="CHF">{t('qrGenerator.content.currencies.chf')}</option>
            </select>
          </div>
        );

      case 'itemName':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.paymentDescription')}
            </label>
            <input
              type="text"
              value={contentData.itemName || ''}
              onChange={(e) => handleFieldChange('itemName', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.paymentDescription')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );


      case 'label':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.label')}
            </label>
            <input
              type="text"
              value={contentData.label || ''}
              onChange={(e) => handleFieldChange('label', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.label')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      // Spotify field
      case 'spotifyUri':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.spotifyUri')}
            </label>
            <input
              type="text"
              value={contentData.spotifyUri || ''}
              onChange={(e) => handleFieldChange('spotifyUri', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.spotifyUri')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all font-mono text-sm"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
              {t('qrGenerator.content.hints.spotifyUri')}
            </p>
          </div>
        );

      // LinkedIn field
      case 'profileUrl':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.linkedinUrl')}
            </label>
            <input
              type="url"
              value={contentData.profileUrl || ''}
              onChange={(e) => handleFieldChange('profileUrl', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.linkedinUrl')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      // Instagram/Twitter username field
      case 'username':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.username')}
            </label>
            <input
              type="text"
              value={contentData.username || ''}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              placeholder={contentType === 'instagram' ? 'instagram_user' : 'twitter_user'}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
              {t('qrGenerator.content.hints.username')}
            </p>
          </div>
        );

      // Facebook page URL field
      case 'pageUrl':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.facebookUrl')}
            </label>
            <input
              type="url"
              value={contentData.pageUrl || ''}
              onChange={(e) => handleFieldChange('pageUrl', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.facebookUrl')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
          </div>
        );

      // YouTube video URL field
      case 'videoUrl':
        return (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-2">
              {t('qrGenerator.content.fields.youtubeUrl')}
            </label>
            <input
              type="url"
              value={contentData.videoUrl || ''}
              onChange={(e) => handleFieldChange('videoUrl', e.target.value)}
              placeholder={t('qrGenerator.content.placeholders.youtubeUrl')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-all"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
              {t('qrGenerator.content.hints.youtubeUrl')}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Attendre que les traductions soient chargées
  if (!i18n.isInitialized) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  const qrContentTypes = getQRContentTypes(t);
  const currentType = qrContentTypes.find(type => type.id === contentType);

  return (
    <div className="space-y-6">
      {/* Content Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-200 mb-3">
          {t('qrGenerator.content.contentType')}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {qrContentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setContentType(type.id);
                  setContentData({});
                  setErrors({});
                }}
                className={`p-3 rounded-lg border-2 transition-all hover:scale-105 active:scale-95 ${
                  contentType === type.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-slate-600 hover:border-gray-400'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs block">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Fields */}
      {currentType && (
        <div
          ref={formRef}
          key={contentType}
          className="space-y-4 animate-fadeIn"
        >
          {currentType.fields.map(field => renderField(field))}
        </div>
      )}

      {/* Preview of generated content */}
      {import.meta.env.DEV && (
        <div className="mt-6 p-4 bg-gray-100 dark:bg-slate-800 rounded-lg">
          <p className="text-xs font-mono text-gray-600 dark:text-slate-400 break-all">
            {generateQRContent(contentType, contentData) || t('qrGenerator.content.noContent')}
          </p>
        </div>
      )}
    </div>
  );
};

export default QRContentEditor;

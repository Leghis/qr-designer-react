import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import { useNotification } from '../../hooks/useNotification';
import qrTypesService from '../../services/qrTypesService';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import QRTypeSelector from '../../components/Dashboard/QRTypeSelector';
import MenuEditor from '../../components/Dashboard/Editors/MenuEditor';
import VCardEditor from '../../components/Dashboard/Editors/VCardEditor';
import PaymentEditor from '../../components/Dashboard/Editors/PaymentEditor';
import QRPreview from '../../components/Dashboard/QRPreview';
import historyService from '../../services/historyService';

const CreateQRCode = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isPremium } = useSubscription();
  const { showNotification } = useNotification();
  
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'url');
  const [formData, setFormData] = useState({});
  const [qrName, setQrName] = useState('');
  const [isDynamic, setIsDynamic] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState('');

  // Get QR type info
  const qrType = qrTypesService.getTypeById(selectedType);
  const availableTypes = qrTypesService.getAvailableTypes(isPremium);

  // Update preview when form data changes
  useEffect(() => {
    if (qrType && !qrType.customEditor) {
      const data = qrTypesService.generateQRData(selectedType, formData);
      setPreviewData(data || '');
    }
  }, [selectedType, formData, qrType]);

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setFormData({});
    setErrors({});
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const handleSave = () => {
    // Validate form
    const validation = qrTypesService.validateFormData(selectedType, formData);
    if (!validation.valid) {
      const fieldErrors = {};
      validation.errors.forEach(error => {
        const fieldName = error.split(' ')[0].toLowerCase();
        fieldErrors[fieldName] = error;
      });
      setErrors(fieldErrors);
      showNotification(t('dashboard.createQRCode.validation.pleaseCorrect'), 'error');
      return;
    }

    // Generate QR data
    const qrData = qrTypesService.generateQRData(selectedType, formData);
    if (!qrData) {
      showNotification(t('dashboard.createQRCode.validation.generationError'), 'error');
      return;
    }

    // Save to history
    historyService.addQRCode({
      name: qrName || `${qrType.name} - ${new Date().toLocaleDateString()}`,
      data: qrData,
      type: selectedType,
      isDynamic,
      formData, // Save original form data for editing
      template: 'modern' // Default template
    });

    showNotification(t('dashboard.createQRCode.validation.success'), 'success');
    navigate('/dashboard/qr-codes');
  };

  // Memoize callbacks to prevent infinite loops in editors
  const handleEditorChange = useCallback((newData) => {
    setFormData(newData);
  }, []);

  const handlePreviewUpdate = useCallback((data) => {
    setPreviewData(data);
  }, []);

  const renderEditor = () => {
    if (qrType?.customEditor) {
      switch (selectedType) {
        case 'menu':
          return (
            <MenuEditor 
              data={formData} 
              onChange={handleEditorChange}
              onPreviewUpdate={handlePreviewUpdate}
            />
          );
        case 'vcard':
          return (
            <VCardEditor 
              data={formData} 
              onChange={handleEditorChange}
              onPreviewUpdate={handlePreviewUpdate}
            />
          );
        case 'payment':
          return (
            <PaymentEditor 
              data={formData} 
              onChange={handleEditorChange}
              onPreviewUpdate={handlePreviewUpdate}
            />
          );
        default:
          return null;
      }
    }

    // Default form fields
    return (
      <div className="space-y-4">
        {qrType?.fields.map(field => (
          <div key={field.name}>
            {field.type === 'select' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label} {field.required && <span className="text-red-500">{t('dashboard.createQRCode.formFields.required')}</span>}
                </label>
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                >
                  <option value="">{t('dashboard.createQRCode.formFields.select')}</option>
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ) : field.type === 'textarea' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label} {field.required && <span className="text-red-500">{t('dashboard.createQRCode.formFields.required')}</span>}
                </label>
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                />
                {errors[field.name] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                )}
              </div>
            ) : field.type === 'checkbox' ? (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[field.name] || false}
                  onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-gray-700 dark:text-gray-300">{field.label}</span>
              </label>
            ) : (
              <Input
                type={field.type}
                label={field.label + (field.required ? ' *' : '')}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                error={errors[field.name]}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard/qr-codes')}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('dashboard.createQRCode.back')}
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.createQRCode.title')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* QR Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('dashboard.createQRCode.typeSelection.title')}
            </h2>
            <QRTypeSelector
              selectedType={selectedType}
              onChange={handleTypeChange}
              availableTypes={availableTypes}
            />
          </motion.div>

          {/* QR Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg"
          >
            <Input
              label={t('dashboard.createQRCode.qrName.label')}
              placeholder={t('dashboard.createQRCode.qrName.placeholder')}
              value={qrName}
              onChange={(e) => setQrName(e.target.value)}
            />
            
            {isPremium && (
              <label className="flex items-center gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDynamic}
                  onChange={(e) => setIsDynamic(e.target.checked)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {t('dashboard.createQRCode.dynamicQR.title')}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('dashboard.createQRCode.dynamicQR.subtitle')}
                  </p>
                </div>
              </label>
            )}
          </motion.div>

          {/* Type-specific form */}
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('dashboard.createQRCode.information.title')}
            </h2>
            {renderEditor()}
          </motion.div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              className="flex-1"
            >
              <Save className="w-5 h-5 mr-2" />
              {t('dashboard.createQRCode.actions.create')}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/dashboard/qr-codes')}
            >
              {t('dashboard.createQRCode.actions.cancel')}
            </Button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:sticky lg:top-8 h-fit">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t('dashboard.createQRCode.preview.title')}
            </h2>
            <QRPreview 
              data={previewData} 
              type={selectedType}
              qrType={qrType}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateQRCode;

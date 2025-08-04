import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Edit2, 
  Trash2,
  BarChart3,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Smartphone,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQRHistory } from '../../hooks/useQRHistory';
import { useNotification } from '../../hooks/useNotification';
import { useSubscription } from '../../hooks/useSubscription';
import Button from '../../components/UI/Button';
import qrTypesService from '../../services/qrTypesService';
import QRPreview from '../../components/Dashboard/QRPreview';
import analyticsService from '../../services/analyticsService';

const QRCodeDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { history, deleteItem } = useQRHistory();
  const { showNotification } = useNotification();
  const { isPremium } = useSubscription();
  
  const [qrCode, setQrCode] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find QR code in history
    const found = history.find(qr => qr.id === id);
    if (found) {
      setQrCode(found);
      // Simulate analytics data
      setAnalytics({
        totalScans: Math.floor(Math.random() * 1000),
        todayScans: Math.floor(Math.random() * 50),
        weekScans: Math.floor(Math.random() * 200),
        scansByDevice: {
          mobile: 75,
          desktop: 20,
          tablet: 5
        },
        scansByLocation: [
          { country: 'France', scans: 450 },
          { country: 'Belgique', scans: 120 },
          { country: 'Suisse', scans: 80 },
          { country: 'Canada', scans: 50 }
        ],
        scansByTime: analyticsService.getHourlyDistribution()
      });
    } else {
      showNotification(t('dashboard.qrDetail.notifications.notFound'), 'error');
      navigate('/dashboard/qr-codes');
    }
  }, [id, history, navigate, showNotification]);

  if (!qrCode) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const qrType = qrTypesService.getTypeById(qrCode.type);

  const handleDelete = () => {
    if (window.confirm(t('dashboard.qrDetail.confirmDelete'))) {
      deleteItem(qrCode.id);
      showNotification(t('dashboard.qrDetail.notifications.deleted'), 'success');
      navigate('/dashboard/qr-codes');
    }
  };

  const handleDownload = () => {
    showNotification(t('dashboard.qrDetail.notifications.downloading'), 'info');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: qrCode.name || 'QR Code',
        text: t('dashboard.qrDetail.shareText'),
        url: qrCode.data
      });
    } else {
      navigator.clipboard.writeText(qrCode.data);
      showNotification(t('dashboard.qrDetail.notifications.linkCopied'), 'success');
    }
  };

  const tabs = [
    { id: 'overview', label: t('dashboard.qrDetail.tabs.overview'), icon: Eye },
    { id: 'analytics', label: t('dashboard.qrDetail.tabs.analytics'), icon: BarChart3, premium: true }
  ];

  const filteredTabs = tabs.filter(tab => !tab.premium || isPremium);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard/qr-codes')}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('dashboard.qrDetail.back')}
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {qrCode.name || t('dashboard.qrDetail.unnamed')}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {t('dashboard.qrDetail.createdOn')} {new Date(qrCode.createdAt).toLocaleDateString('fr-FR')}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${qrType?.color || 'from-gray-400 to-gray-600'} text-white`}>
                {qrType?.name || 'URL'}
              </span>
              {qrCode.isDynamic && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                  {t('dashboard.qrDetail.dynamic')}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => navigate(`/dashboard/qr-codes/edit/${qrCode.id}`)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {t('dashboard.qrDetail.actions.edit')}
            </Button>
            <Button
              variant="secondary"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t('dashboard.qrDetail.actions.share')}
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('dashboard.qrDetail.actions.delete')}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {filteredTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all relative ${
              activeTab === tab.id
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeTab === 'overview' ? (
          <>
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="w-8 h-8 text-primary-600" />
                    <span className="text-xs text-green-600 font-medium">+12%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics?.totalScans || 0}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('dashboard.qrDetail.stats.totalScans')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="w-8 h-8 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">+25%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics?.todayScans || 0}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('dashboard.qrDetail.stats.today')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <span className="text-xs text-green-600 font-medium">+18%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {analytics?.weekScans || 0}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('dashboard.qrDetail.stats.thisWeek')}
                  </p>
                </motion.div>
              </div>

              {/* QR Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('dashboard.qrDetail.qrData.title')}
                </h2>
                <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
                  <p className="text-sm text-gray-800 dark:text-gray-200 break-all">
                    {qrCode.data}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(qrCode.data);
                    showNotification(t('dashboard.qrDetail.notifications.dataCopied'), 'success');
                  }}
                  className="mt-3 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {t('dashboard.qrDetail.qrData.copyData')}
                </button>
              </motion.div>

              {/* Quick Analytics */}
              {isPremium && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg"
                >
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('dashboard.qrDetail.devicesUsed.title')}
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Smartphone className="w-4 h-4" />
                          {t('dashboard.qrDetail.devicesUsed.mobile')}
                        </span>
                        <span className="text-sm font-medium">
                          {analytics?.scansByDevice.mobile}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                          style={{ width: `${analytics?.scansByDevice.mobile}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <Globe className="w-4 h-4" />
                          {t('dashboard.qrDetail.devicesUsed.desktop')}
                        </span>
                        <span className="text-sm font-medium">
                          {analytics?.scansByDevice.desktop}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${analytics?.scansByDevice.desktop}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Preview */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg sticky top-8"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('dashboard.qrDetail.preview.title')}
                </h2>
                <QRPreview 
                  data={qrCode.data} 
                  type={qrCode.type}
                  qrType={qrType}
                />
                <Button
                  variant="primary"
                  className="w-full mt-4"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('dashboard.qrDetail.preview.downloadQR')}
                </Button>
              </motion.div>
            </div>
          </>
        ) : (
          /* Analytics Tab */
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.qrDetail.analytics.title')}
              </h2>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {t('dashboard.qrDetail.analytics.comingSoon')}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeDetail;

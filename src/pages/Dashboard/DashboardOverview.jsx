import { motion } from 'framer-motion';
import { 
  QrCode, 
  TrendingUp, 
  Clock, 
  Zap,
  ArrowRight,
  Plus,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useQRHistory } from '../../hooks/useQRHistory';
import { useSubscription } from '../../hooks/useSubscription';

const DashboardOverview = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { statistics, history } = useQRHistory();
  const { isPremium } = useSubscription();

  // Quick stats
  const stats = [
    {
      title: t('dashboard.overview.stats.totalQRCodes'),
      value: statistics?.total || 0,
      icon: QrCode,
      color: 'from-blue-500 to-blue-600',
      trend: '+12%',
      trendUp: true
    },
    {
      title: t('dashboard.overview.stats.todayScans'),
      value: '1,234',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      trend: '+23%',
      trendUp: true
    },
    {
      title: t('dashboard.overview.stats.activeQRCodes'),
      value: statistics?.total || 0,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      trend: '100%',
      trendUp: true
    },
    {
      title: t('dashboard.overview.stats.averageTime'),
      value: '2.5s',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      trend: '-15%',
      trendUp: false
    }
  ];

  // Recent QR codes
  const recentQRCodes = history.slice(0, 3);

  // QR Types for quick create
  const qrTypes = [
    { name: 'URL', icon: '🔗', color: 'from-blue-500 to-blue-600' },
    { name: 'Menu', icon: '🍽️', color: 'from-green-500 to-green-600' },
    { name: 'WiFi', icon: '📶', color: 'from-purple-500 to-purple-600' },
    { name: 'vCard', icon: '👤', color: 'from-pink-500 to-pink-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">
          {t('dashboard.overview.welcome', { name: user?.name || t('dashboard.user.user') })}
        </h1>
        <p className="text-white/80 mb-6">
          {t('dashboard.overview.welcomeSubtitle')}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/qr-codes/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition-all"
          >
            <Plus className="w-5 h-5" />
            {t('dashboard.overview.createQRCode')}
          </Link>
          {!isPremium && (
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 rounded-xl font-medium transition-all"
            >
              <Sparkles className="w-5 h-5" />
              {t('dashboard.overview.goToPremium')}
            </Link>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 ${!stat.trendUp && 'rotate-180'}`} />
                {stat.trend}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Create */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {t('dashboard.overview.quickCreate.title')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {qrTypes.map((type, index) => (
              <motion.button
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = `/dashboard/qr-codes/new?type=${type.name.toLowerCase()}`}
                className={`p-4 rounded-xl bg-gradient-to-r ${type.color} text-white font-medium flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all`}
              >
                <span className="text-2xl">{type.icon}</span>
                <span>{type.name}</span>
              </motion.button>
            ))}
          </div>
          <Link
            to="/dashboard/qr-codes/new"
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 transition-all"
          >
            {t('dashboard.overview.quickCreate.moreOptions')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Recent QR Codes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.overview.recentQRCodes.title')}
            </h2>
            <Link
              to="/dashboard/qr-codes"
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-1"
            >
              {t('dashboard.overview.recentQRCodes.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentQRCodes.length > 0 ? (
            <div className="space-y-3">
              {recentQRCodes.map((qr, index) => (
                <motion.div
                  key={qr.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-800 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/dashboard/qr-codes/${qr.id}`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {qr.data?.substring(0, 30) || 'QR Code'}...
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('dashboard.overview.recentQRCodes.created')} {new Date(qr.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {qr.usageCount || 0} {t('dashboard.overview.recentQRCodes.scans')}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {qr.template || 'Standard'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('dashboard.overview.recentQRCodes.noQRCodes')}
              </p>
              <Link
                to="/dashboard/qr-codes/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('dashboard.overview.recentQRCodes.createFirst')}
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Upgrade Banner for Free Users */}
      {!isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border-2 border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {t('dashboard.overview.upgrade.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('dashboard.overview.upgrade.subtitle')}
              </p>
            </div>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              {t('dashboard.overview.upgrade.discoverPremium')}
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardOverview;

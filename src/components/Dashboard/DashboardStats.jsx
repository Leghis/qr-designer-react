import { motion } from 'framer-motion';
import { QrCode, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useQRHistory } from '../../hooks/useQRHistory';
import analyticsService from '../../services/analyticsService';

const DashboardStats = () => {
  const { statistics } = useQRHistory();
  const trends = analyticsService.getUsageTrends();

  const stats = [
    {
      title: 'QR Codes Total',
      value: statistics?.total || 0,
      icon: QrCode,
      color: 'from-blue-500 to-blue-600',
      description: 'Tous les QR codes créés'
    },
    {
      title: "Aujourd'hui",
      value: statistics?.today || 0,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      description: 'QR codes créés aujourd\'hui'
    },
    {
      title: 'Cette semaine',
      value: statistics?.thisWeek || 0,
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
      description: '7 derniers jours'
    },
    {
      title: 'Tendance',
      value: `${trends.isPositive ? '+' : ''}${trends.growth}%`,
      icon: TrendingUp,
      color: trends.isPositive ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600',
      description: 'vs semaine dernière'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {stat.value}
            </motion.span>
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
            {stat.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
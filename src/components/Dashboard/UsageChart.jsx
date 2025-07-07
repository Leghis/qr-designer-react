import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';
import analyticsService from '../../services/analyticsService';
import { useQRHistory } from '../../hooks/useQRHistory';

const UsageChart = ({ detailed = false }) => {
  const { statistics } = useQRHistory();
  const usageData = analyticsService.getUsageOverTime(detailed ? 30 : 7);
  const templateData = analyticsService.getTemplateUsage();
  const peakTimes = analyticsService.getPeakUsageTimes();

  const maxCount = Math.max(...usageData.map(d => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Usage Over Time */}
      <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            Utilisation dans le temps
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {detailed ? '30 derniers jours' : '7 derniers jours'}
          </span>
        </div>

        {/* Chart */}
        <div className="relative h-48">
          <div className="absolute inset-0 flex items-end justify-between gap-2">
            {usageData.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ height: 0 }}
                animate={{ height: `${(day.count / maxCount) * 100}%` }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-primary-600 to-purple-600 rounded-t-lg relative group cursor-pointer"
                title={`${day.count} QR codes`}
              >
                {day.count > 0 && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.count}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
            <span>{maxCount}</span>
            <span>{Math.floor(maxCount / 2)}</span>
            <span>0</span>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
          {usageData.map(day => (
            <span key={day.date} className="flex-1 text-center">
              {detailed ? day.date.split('-')[2] : day.dayName}
            </span>
          ))}
        </div>
      </div>

      {/* Template Usage */}
      {detailed && templateData.length > 0 && (
        <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <PieChart className="w-6 h-6 text-primary-600" />
            Utilisation par template
          </h3>

          <div className="space-y-3">
            {templateData.slice(0, 5).map((template, index) => (
              <motion.div
                key={template.template}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {template.template}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {template.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${template.percentage}%` }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12 text-right">
                  {template.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Peak Usage Times */}
      {detailed && (
        <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Heures de pointe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Plus actif</p>
              <div className="space-y-1">
                {peakTimes.peakHours.map(hour => (
                  <div key={hour.hour} className="flex justify-between text-sm">
                    <span className="font-medium">{hour.hour}</span>
                    <span className="text-gray-600 dark:text-gray-400">{hour.count} QR codes</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Moins actif</p>
              <div className="space-y-1">
                {peakTimes.quietHours.map(hour => (
                  <div key={hour.hour} className="flex justify-between text-sm">
                    <span className="font-medium">{hour.hour}</span>
                    <span className="text-gray-600 dark:text-gray-400">{hour.count} QR codes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageChart;
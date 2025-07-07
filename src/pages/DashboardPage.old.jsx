import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { useQRHistory } from '../hooks/useQRHistory';
import DashboardStats from '../components/Dashboard/DashboardStats';
import QRHistory from '../components/Dashboard/QRHistory';
import QuickActions from '../components/Dashboard/QuickActions';
import UsageChart from '../components/Dashboard/UsageChart';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isPremium, plan } = useSubscription();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
    { id: 'history', label: 'Historique', icon: '📜' },
    { id: 'analytics', label: 'Analytics', icon: '📈', premium: true }
  ];

  const filteredTabs = tabs.filter(tab => !tab.premium || isPremium);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-800 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bienvenue, {user?.name || 'Utilisateur'} !
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos QR codes et suivez vos statistiques d'utilisation.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {filteredTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-dark-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <DashboardStats />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <QuickActions />
                {isPremium && <UsageChart />}
              </div>
              <QRHistory limit={5} />
            </div>
          )}

          {activeTab === 'history' && (
            <QRHistory />
          )}

          {activeTab === 'analytics' && isPremium && (
            <div className="space-y-8">
              <UsageChart detailed />
              <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4">Analytics avancés</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Les fonctionnalités d'analytics détaillées arrivent bientôt...
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
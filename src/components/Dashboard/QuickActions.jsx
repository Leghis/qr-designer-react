import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, FileText, Image, Sparkles, Palette, Download } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Nouveau QR Code',
      description: 'Créer un QR code personnalisé',
      icon: Plus,
      link: '/',
      color: 'from-primary-500 to-purple-500'
    },
    {
      title: 'Templates',
      description: 'Explorer les modèles',
      icon: Palette,
      link: '/templates',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Premium',
      description: 'Débloquer plus de fonctionnalités',
      icon: Sparkles,
      link: '/premium',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const quickTemplates = [
    { name: 'URL', icon: '🔗' },
    { name: 'Contact', icon: '👤' },
    { name: 'WiFi', icon: '📶' },
    { name: 'Email', icon: '✉️' }
  ];

  return (
    <div className="bg-white dark:bg-dark-900 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Actions rapides
      </h2>

      {/* Main Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={action.link}
              className="block p-4 rounded-xl bg-gradient-to-r hover:shadow-lg transition-all"
              style={{
                background: `linear-gradient(135deg, ${action.color.split(' ')[1]} 0%, ${action.color.split(' ')[3]} 100%)`
              }}
            >
              <action.icon className="w-8 h-8 text-white mb-2" />
              <h3 className="font-semibold text-white">{action.title}</h3>
              <p className="text-white/80 text-sm">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Templates */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Créer rapidement
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickTemplates.map((template, index) => (
            <motion.button
              key={template.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-dark-800 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors"
              onClick={() => window.location.href = `/?template=${template.name.toLowerCase()}`}
            >
              <span className="text-2xl">{template.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {template.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
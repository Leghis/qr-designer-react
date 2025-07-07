import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const QRTypeSelector = ({ selectedType, onChange, availableTypes }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {availableTypes.map((type, index) => {
        const isLocked = type.premium && !availableTypes.includes(type);
        
        return (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: isLocked ? 1 : 1.05 }}
            whileTap={{ scale: isLocked ? 1 : 0.95 }}
            onClick={() => !isLocked && onChange(type.id)}
            disabled={isLocked}
            className={`relative p-4 rounded-xl border-2 transition-all ${
              selectedType === type.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : isLocked
                ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 opacity-60 cursor-not-allowed'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{type.icon}</div>
              <p className={`text-sm font-medium ${
                selectedType === type.id
                  ? 'text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {type.name}
              </p>
            </div>
            
            {isLocked && (
              <div className="absolute top-2 right-2">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            )}
            
            {type.premium && !isLocked && (
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium rounded-full">
                  Premium
                </span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default QRTypeSelector;
import { Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PremiumBadge = ({ text = 'PREMIUM', showIcon = true, size = 'sm' }) => {
  const sizes = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-1.5',
    lg: 'text-lg px-5 py-2'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-white rounded-full font-bold shadow-lg ${sizes[size]} animated-gradient-bg`}
    >
      {showIcon && (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Crown className={iconSizes[size]} />
        </motion.div>
      )}
      <span>{text}</span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -right-1 -top-1"
      >
        <Sparkles className="w-3 h-3 text-yellow-300" />
      </motion.div>
    </motion.div>
  );
};

export default PremiumBadge;
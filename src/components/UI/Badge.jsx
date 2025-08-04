
import { motion } from 'framer-motion';

const Badge = ({ type = 'default', children, className = '', animate = true }) => {
  const variants = {
    free: 'bg-gradient-to-r from-green-400 to-green-600 text-white',
    premium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    pro: 'bg-gradient-to-r from-purple-400 to-pink-500 text-white',
    new: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white',
    hot: 'bg-gradient-to-r from-red-400 to-orange-500 text-white',
    limited: 'bg-gradient-to-r from-pink-400 to-rose-500 text-white',
    default: 'bg-gray-500 text-white'
  };

  const Component = animate ? motion.span : 'span';
  const props = animate ? {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    whileHover: { scale: 1.05 },
    transition: { type: 'spring', stiffness: 300 }
  } : {};

  return (
    <Component
      {...props}
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${variants[type]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Badge;
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { QrCode, Crown, Star, User, LogOut, LogIn, LayoutDashboard } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription.jsx';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import Badge from '../UI/Badge';
import ThemeToggle from '../UI/ThemeToggle';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

const Header = () => {
  const { isPremium, plan } = useSubscription();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="gradient-text">QR Designer</span>
              </h1>
            </Link>
            
            {/* User Status Badge */}
            {isPremium && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-3"
              >
                <Badge type={plan === 'premium' ? 'premium' : 'pro'} className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {plan === 'premium' ? 'Premium' : 'Enterprise'}
                </Badge>
              </motion.div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-6"
          >
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/templates"
                className={`font-medium transition-colors ${
                  isActive('/templates') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                Templates
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors flex items-center gap-1 ${
                    isActive('/dashboard') 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
            </nav>
            
            <Link
              to="/premium"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105 shadow-lg"
            >
              <Crown className="w-4 h-4" />
              <span>Premium</span>
            </Link>
            
            {/* Authentication Section */}
            <div className="flex items-center space-x-3">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-dark-800 rounded-lg">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </Link>
              )}
              
              <ThemeToggle />
            </div>
          </motion.div>
        </div>
      </nav>
      
      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        title=""
        showCloseButton={false}
        size="sm"
        footer={
          <div className="flex gap-3 w-full">
            <Button
              variant="ghost"
              onClick={handleLogoutCancel}
              className="flex-1"
            >
              Rester connecté
            </Button>
            <Button
              variant="primary"
              onClick={handleLogoutConfirm}
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        }
      >
        <div className="text-center">
          {/* Animated logout icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-full"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ 
                duration: 0.5,
                delay: 0.3,
                ease: "easeInOut"
              }}
            >
              <LogOut className="w-10 h-10 text-red-500 dark:text-red-400" />
            </motion.div>
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Déconnexion
          </h3>
          
          {user && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connecté en tant que
              </p>
              <p className="font-medium text-gray-700 dark:text-gray-300">
                {user.email}
              </p>
            </div>
          )}
          
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vous pourrez vous reconnecter à tout moment.
          </p>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
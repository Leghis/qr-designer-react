import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, Star, LayoutDashboard, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../UI/Badge';
import ThemeToggle from '../UI/ThemeToggle';
import LanguageSwitcher from '../UI/LanguageSwitcher';
// import Modal from '../UI/Modal';
// import Button from '../UI/Button';

const Header = () => {
  const { t } = useTranslation();
  const { isPremium, plan } = useSubscription();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location.pathname === path;
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        // Check if the click is not on the menu button itself
        const menuButton = document.querySelector('[aria-label="Toggle mobile menu"]');
        if (!menuButton || !menuButton.contains(event.target)) {
          closeMobileMenu();
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Logout functions commented out since authentication is hidden
  // const handleLogoutClick = () => {
  //   setShowLogoutModal(true);
  // };

  // const handleLogoutConfirm = () => {
  //   logout();
  //   setShowLogoutModal(false);
  //   navigate('/');
  // };

  // const handleLogoutCancel = () => {
  //   setShowLogoutModal(false);
  // };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-slate-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMobileMenu}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">
                <span className="gradient-text">{t('header.brand')}</span>
              </h1>
            </Link>
            
            {/* User Status Badge - Hidden on small screens */}
            {isPremium && (
              <div className="ml-2 hidden sm:block">
                <Badge type={plan === 'premium' ? 'premium' : 'pro'} className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {plan === 'premium' ? t('common.premium') : t('common.enterprise')}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {t('header.home')}
              </Link>
              <Link
                to="/templates"
                className={`font-medium transition-colors ${
                  isActive('/templates') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {t('header.templates')}
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors flex items-center gap-1 ${
                    isActive('/dashboard') 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('header.dashboard')}
                </Link>
              )}
            </nav>
            
            {/* Desktop Controls */}
            <div className="hidden sm:flex items-center space-x-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            
            {/* Mobile Controls - Only theme and language switcher on very small screens */}
            <div className="flex sm:hidden items-center space-x-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-slate-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-[85px] left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transform transition-all duration-300 ease-out z-40 md:hidden ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            {/* User Status Badge - Visible on mobile */}
            {isPremium && (
              <div className="flex justify-center">
                <Badge type={plan === 'premium' ? 'premium' : 'pro'} className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {plan === 'premium' ? t('common.premium') : t('common.enterprise')}
                </Badge>
              </div>
            )}
            
            {/* Navigation Links */}
            <div className="space-y-4">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block py-3 px-4 rounded-lg text-center font-medium transition-all ${
                  isActive('/') 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {t('header.home')}
              </Link>
              <Link
                to="/templates"
                onClick={closeMobileMenu}
                className={`block py-3 px-4 rounded-lg text-center font-medium transition-all ${
                  isActive('/templates') 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                }`}
              >
                {t('header.templates')}
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                    isActive('/dashboard') 
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('header.dashboard')}
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
      
      {/* Logout Confirmation Modal - Hidden for now */}
      {/* <Modal
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
      > */}
        {/* <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-full">
            <div>
              <LogOut className="w-10 h-10 text-red-500 dark:text-red-400" />
            </div>
          </div>

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
      </Modal> */}
    </header>
  );
};

export default Header;
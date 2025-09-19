import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, Star, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import ThemeToggle from '../UI/ThemeToggle';
import LanguageSwitcher from '../UI/LanguageSwitcher';
// import Modal from '../UI/Modal';
// import Button from '../UI/Button';

const Header = () => {
  const { t } = useTranslation();
  const { isPremium, plan } = useSubscription();
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={closeMobileMenu}>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative">
                <h1 className="text-xl sm:text-2xl font-bold gradient-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-purple-600 transition-all duration-300">
                  {t('header.brand')}
                </h1>
                <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
            
            {/* User Status Badge - Enhanced */}
            {isPremium && (
              <div className="ml-2 hidden sm:block group">
                <div className="relative px-3 py-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <div className="flex items-center gap-1.5 text-white font-medium text-sm">
                    <Star className="w-3.5 h-3.5 animate-pulse" />
                    <span>{plan === 'premium' ? t('common.premium') : t('common.enterprise')}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none group ${
                  isActive('/') 
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                    : 'text-gray-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="relative z-10">{t('header.home')}</span>
                {isActive('/') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl" />
                )}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
              <Link
                to="/templates"
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none group ${
                  isActive('/templates') 
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                    : 'text-gray-600 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className="relative z-10">{t('header.templates')}</span>
                {isActive('/templates') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl" />
                )}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </nav>
            
            {/* Desktop Controls - Enhanced */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="p-1 rounded-xl bg-gray-50 dark:bg-slate-800/50 backdrop-blur-sm">
                <LanguageSwitcher />
              </div>
              <div className="p-1 rounded-xl bg-gray-50 dark:bg-slate-800/50 backdrop-blur-sm">
                <ThemeToggle />
              </div>
            </div>
            
            {/* Mobile Controls - Enhanced */}
            <div className="flex sm:hidden items-center space-x-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-300 group backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50"
              aria-label="Toggle mobile menu"
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700 dark:text-slate-200 transition-all duration-300 rotate-90" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700 dark:text-slate-200 transition-all duration-300 group-hover:scale-110" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay - Enhanced */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 backdrop-blur-md z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Mobile Menu - Enhanced */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-[85px] left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 shadow-xl transform transition-all duration-500 ease-out z-40 md:hidden ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 via-transparent to-purple-50/30 dark:from-primary-950/30 dark:via-transparent dark:to-purple-950/30" />
        <nav className="relative container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* User Status Badge - Enhanced Mobile */}
            {isPremium && (
              <div className="flex justify-center">
                <div className="relative px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full shadow-lg">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Star className="w-4 h-4 animate-pulse" />
                    <span>{plan === 'premium' ? t('common.premium') : t('common.enterprise')}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                </div>
              </div>
            )}
            
            {/* Navigation Links - Enhanced */}
            <div className="space-y-3">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`relative block py-4 px-6 rounded-2xl text-center font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-slate-800 dark:hover:to-slate-700'
                }`}
              >
                <span className="relative z-10">{t('header.home')}</span>
                {!isActive('/') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
              <Link
                to="/templates"
                onClick={closeMobileMenu}
                className={`relative block py-4 px-6 rounded-2xl text-center font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive('/templates') 
                    ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-slate-800 dark:hover:to-slate-700'
                }`}
              >
                <span className="relative z-10">{t('header.templates')}</span>
                {!isActive('/templates') && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
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

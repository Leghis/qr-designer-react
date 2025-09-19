import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, Star, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
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
    <header
      className="fixed top-0 left-0 right-0 z-50 surface-glass-strong shadow-sm border-b"
      style={{ borderBottomColor: 'color-mix(in srgb, var(--border-primary) 45%, transparent)' }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={closeMobileMenu}>
              <div className="header-brand-icon relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-all duration-300">
                <div className="header-brand-inner">
                  <QrCode className="w-6 h-6 sm:w-7 sm:h-7 text-primary-color transition-transform group-hover:scale-110" />
                </div>
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
                className={`nav-link relative px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none group border ${
                  isActive('/') ? 'nav-link--active' : ''
                }`}
              >
                <span className="relative z-10">{t('header.home')}</span>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
              <Link
                to="/templates"
                className={`nav-link relative px-4 py-2 rounded-xl font-medium transition-all duration-300 focus:outline-none group border ${
                  isActive('/templates') ? 'nav-link--active' : ''
                }`}
              >
                <span className="relative z-10">{t('header.templates')}</span>
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </nav>
            
            {/* Desktop Controls - Enhanced */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="p-1 rounded-xl bg-surface-soft">
                <LanguageSwitcher />
              </div>
            </div>
            
            {/* Mobile Controls - Enhanced */}
            <div className="flex sm:hidden items-center space-x-2">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative p-2.5 rounded-xl surface-glass transition-all duration-300 group"
              aria-label="Toggle mobile menu"
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X
                    className="w-5 h-5 transition-all duration-300 rotate-90"
                    style={{ color: 'var(--text-primary)' }}
                  />
                ) : (
                  <Menu
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                    style={{ color: 'var(--text-primary)' }}
                  />
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
          className="fixed inset-0 z-40 md:hidden"
          style={{
            backdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(var(--color-slate-900, 15 23 42), 0.55)'
          }}
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Mobile Menu - Enhanced */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-[85px] left-0 right-0 surface-glass-strong shadow-xl transform transition-all duration-500 ease-out z-40 md:hidden ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ borderBottomColor: 'color-mix(in srgb, var(--border-primary) 40%, transparent)' }}
      >
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-primary-500-hex) 12%, transparent), transparent 60%, color-mix(in srgb, var(--color-accent-500-hex) 12%, transparent))'
        }} />
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
                className={`relative block py-4 px-6 rounded-2xl text-center font-semibold transition-all duration-300 transform hover:scale-[1.02] border ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white border-transparent shadow-strong' 
                    : 'text-secondary-color bg-[color:color-mix(in_srgb,var(--bg-secondary) 94%,transparent)] border-[color:color-mix(in_srgb,var(--border-primary) 32%,transparent)] hover:text-primary-color hover:bg-[var(--bg-tertiary)] hover:border-[color:var(--border-secondary)]'
                }`}
              >
                <span className="relative z-10">{t('header.home')}</span>
              </Link>
              <Link
                to="/templates"
                onClick={closeMobileMenu}
                className={`relative block py-4 px-6 rounded-2xl text-center font-semibold transition-all duration-300 transform hover:scale-[1.02] border ${
                  isActive('/templates') 
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white border-transparent shadow-strong' 
                    : 'text-secondary-color bg-[color:color-mix(in_srgb,var(--bg-secondary) 94%,transparent)] border-[color:color-mix(in_srgb,var(--border-primary) 32%,transparent)] hover:text-primary-color hover:bg-[var(--bg-tertiary)] hover:border-[color:var(--border-secondary)]'
                }`}
              >
                <span className="relative z-10">{t('header.templates')}</span>
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

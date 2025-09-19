import { Link, useLocation } from 'react-router-dom';
import { QrCode, Star, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '../../hooks/useSubscription';
import LanguageSwitcher from '../UI/LanguageSwitcher';
// import Modal from '../UI/Modal';
// import Button from '../UI/Button';
import { useState } from 'react';

const Header = () => {
  const { t } = useTranslation();
  const { isPremium, plan } = useSubscription();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

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
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="header-brand-icon relative w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-purple-600 rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-all duration-300">
                <div className="header-brand-inner">
                  <QrCode className="w-7 h-7 text-primary-color transition-transform group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="relative">
                <h1 className="text-2xl font-bold gradient-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-purple-600 transition-all duration-300">
                  {t('header.brand')}
                </h1>
                <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
            
            {/* User Status Badge - Enhanced */}
            {isPremium && (
              <div className="ml-2 group">
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

          {/* Desktop Nav + Language */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Navigation */}
            <nav className="flex items-center space-x-1">
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

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-xl bg-surface-soft">
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              aria-label={mobileOpen ? t('common.close') || 'Close menu' : t('common.menu') || 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border/50 bg-surface-soft text-text-primary focus:outline-none focus:ring-2 focus:ring-ring-primary"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="container mx-auto px-4 pb-4">
          <div className="surface-glass-strong border rounded-2xl p-3 shadow-sm">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={`nav-link w-full text-base px-4 py-3 rounded-xl border ${isActive('/') ? 'nav-link--active' : ''}`}
              >
                {t('header.home')}
              </Link>
              <Link
                to="/templates"
                onClick={() => setMobileOpen(false)}
                className={`nav-link w-full text-base px-4 py-3 rounded-xl border ${isActive('/templates') ? 'nav-link--active' : ''}`}
              >
                {t('header.templates')}
              </Link>

              <div className="pt-2">
                <div className="p-1 rounded-xl bg-surface-soft inline-flex">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
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

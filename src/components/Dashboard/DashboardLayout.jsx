import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  QrCode, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  Plus
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      path: '/dashboard',
      label: t('dashboard.navigation.dashboard'),
      icon: LayoutDashboard,
      exact: true
    },
    {
      path: '/dashboard/qr-codes',
      label: t('dashboard.navigation.myQRCodes'),
      icon: QrCode,
      badge: null // Could show count
    },
    {
      path: '/dashboard/settings',
      label: t('dashboard.navigation.settings'),
      icon: Settings
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? (isMobile ? 280 : 280) : 80,
          x: isMobile && !isSidebarOpen ? -280 : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed md:relative h-full bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 z-50 flex flex-col`}
        style={{ height: '100vh' }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <motion.div
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-3 ${!isSidebarOpen && 'md:hidden'}`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-slate-100">QR Designer</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400">{t('common.dashboard')}</p>
              </div>
            </motion.div>
            
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              {isMobile ? (
                <X className="w-5 h-5 text-gray-600 dark:text-slate-400" />
              ) : (
                <motion.div
                  animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-slate-400" />
                </motion.div>
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 text-primary-600 dark:text-primary-400'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200'
                }`}
              >
                <item.icon className={`w-5 h-5 ${!isSidebarOpen && 'md:mx-auto'}`} />
                
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {item.badge && isSidebarOpen && (
                  <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed sidebar */}
                {!isSidebarOpen && !isMobile && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-gray-900 dark:border-r-gray-700"></div>
                  </div>
                )}
              </NavLink>
            );
          })}

          {/* Quick Create Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/dashboard/qr-codes/new'}
            className={`w-full flex items-center gap-3 px-4 py-3 mt-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all shadow-lg ${
              !isSidebarOpen && 'md:px-3'
            }`}
          >
            <Plus className={`w-5 h-5 ${!isSidebarOpen && 'md:mx-auto'}`} />
            {isSidebarOpen && <span>{t('dashboard.navigation.createQRCode')}</span>}
          </motion.button>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'md:justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                    {user?.name || t('dashboard.user.user')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">
                    {user?.email}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-slate-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              QR Designer
            </h1>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
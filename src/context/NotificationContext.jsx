import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

const Notification = ({ notification, onClose }) => {
  const bgColor = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
  };

  const textColor = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    info: 'text-blue-800 dark:text-blue-200'
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 ${bgColor[notification.type]} ${textColor[notification.type]} max-w-sm`}
    >
      <div className="flex items-center justify-between">
        <p className="font-medium">{notification.message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-current opacity-50 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <div key={notification.id} style={{ top: `${(index + 1) * 70}px` }}>
            <Notification
              notification={notification}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};
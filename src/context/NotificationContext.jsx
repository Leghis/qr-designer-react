import { createContext, useState, useCallback, useRef, useEffect } from 'react';

export const NotificationContext = createContext();

const Notification = ({ notification, onClose, isExiting }) => {
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

  // Safe close handler
  const handleClose = useCallback(() => {
    try {
      onClose();
    } catch (error) {
      console.warn('Notification close error:', error);
    }
  }, [onClose]);

  return (
    <div
      className={`p-4 rounded-lg shadow-lg border-l-4 ${bgColor[notification.type]} ${textColor[notification.type]} max-w-sm notification-enter ${
        isExiting ? 'notification-exit' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="font-medium">{notification.message}</p>
        <button
          onClick={handleClose}
          className="ml-4 text-current opacity-50 hover:opacity-100 transition-opacity"
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [exitingIds, setExitingIds] = useState(new Set());
  const timeoutRefs = useRef(new Map()); // Track all active timeouts
  const isMountedRef = useRef(true); // Track component mount status

  const removeNotification = useCallback((id) => {
    // Trigger exit animation
    setExitingIds(prev => new Set([...prev, id]));
    
    // Remove after animation completes
    setTimeout(() => {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
        setExitingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    }, 300); // Match CSS animation duration
    
    // Clear any associated timeout
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    // Don't add notifications if component is unmounted
    if (!isMountedRef.current) return;
    
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const notification = { id, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds with safe timeout handling
    const timeoutId = setTimeout(() => {
      // Double-check component is still mounted before removing
      if (isMountedRef.current) {
        removeNotification(id);
      }
    }, 5000);
    
    // Track this timeout for cleanup
    timeoutRefs.current.set(id, timeoutId);
  }, [removeNotification]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Mark component as unmounted
      isMountedRef.current = false;
      
      // Clear all active timeouts
      for (const timeoutId of timeoutRefs.current.values()) {
        clearTimeout(timeoutId);
      }
      timeoutRefs.current.clear();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-4 right-4 z-50 pointer-events-none">
        {notifications.map((notification, index) => (
          <div 
            key={notification.id} 
            className="pointer-events-auto mb-2"
            style={{ 
              transform: `translateY(${index * 70}px)`,
              position: 'relative',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <Notification
              notification={notification}
              onClose={() => removeNotification(notification.id)}
              isExiting={exitingIds.has(notification.id)}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
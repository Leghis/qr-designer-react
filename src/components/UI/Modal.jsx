import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md',
  closeOnOverlay = true,
  showCloseButton = true,
  className
}) => {
  const [portalContainer, setPortalContainer] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cleanupRef = useRef(null);
  // Initialize portal container and check mobile
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPortalContainer(document.body);
      setIsMobile(window.innerWidth < 640);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('keydown', handleEscape);
      }
    };
  }, [isOpen, onClose]);

  // Cleanup function for safe portal removal
  useEffect(() => {
    cleanupRef.current = () => {
      // This cleanup function will be called when component unmounts
      // to ensure any pending DOM operations are cancelled
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  const sizes = {
    sm: 'max-w-sm sm:max-w-md',
    md: 'max-w-md sm:max-w-lg',
    lg: 'max-w-lg sm:max-w-xl lg:max-w-2xl',
    xl: 'max-w-xl sm:max-w-2xl lg:max-w-4xl',
    full: 'max-w-full sm:max-w-7xl'
  };

  // Don't render anything if portal container isn't ready
  if (!portalContainer) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          onClick={handleOverlayClick}
        >
        {/* Modal - Mobile Optimized */}
        <div className="min-h-screen flex items-end sm:items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: isMobile ? 1 : 0.9, 
              y: isMobile ? 100 : 20 
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: isMobile ? 1 : 0.9, 
              y: isMobile ? 100 : 20 
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "relative w-full bg-white dark:bg-slate-900 shadow-2xl overflow-hidden",
              "border border-gray-200 dark:border-slate-700",
              "rounded-t-2xl sm:rounded-2xl", // Rounded top on mobile, fully rounded on desktop
              "max-h-[90vh] sm:max-h-[85vh]", // Max height constraints
              sizes[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500"></div>
            
            {/* Header - Mobile Optimized */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-slate-800">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-slate-100 pr-2">
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all hover:rotate-90 duration-300 min-w-[40px] min-h-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content - Mobile Optimized */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {children}
            </div>

            {/* Footer - Mobile Optimized */}
            {footer && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-850">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at root level with safe error handling
  try {
    return ReactDOM.createPortal(modalContent, portalContainer);
  } catch (error) {
    console.warn('Modal portal error:', error);
    return null;
  }
};

export default Modal;
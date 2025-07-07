import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            onClick={handleOverlayClick}
          >
            {/* Modal */}
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "relative w-full bg-white dark:bg-dark-900 rounded-2xl shadow-2xl overflow-hidden",
                  "border border-gray-200/50 dark:border-gray-700/50",
                  sizes[size],
                  className
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Gradient decoration */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500"></div>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-all hover:rotate-90 duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {children}
                </div>

                {/* Footer */}
                {footer && (
                  <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-800/50">
                    {footer}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at root level
  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(modalContent, document.body);
  }

  return null;
};

export default Modal;
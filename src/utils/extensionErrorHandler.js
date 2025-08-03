// Utility to handle extension-related errors and prevent them from crashing the app

// Check if the error is from a browser extension
export const isExtensionError = (error) => {
  const errorString = error?.toString() || '';
  const errorMessage = error?.message || '';
  
  return (
    errorString.includes('message channel closed') ||
    errorString.includes('Extension context invalidated') ||
    errorMessage.includes('message channel closed') ||
    errorMessage.includes('Extension context invalidated') ||
    errorMessage.includes('listener indicated an asynchronous response')
  );
};

// Wrapper to catch and suppress extension errors
export const suppressExtensionErrors = () => {
  const originalConsoleError = console.error;
  
  console.error = (...args) => {
    const firstArg = args[0];
    
    // Check if it's an extension error
    if (firstArg && isExtensionError(firstArg)) {
      // Silently ignore extension errors
      return;
    }
    
    // Otherwise, log normally
    originalConsoleError.apply(console, args);
  };
  
  // Also catch unhandled promise rejections from extensions
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && isExtensionError(event.reason)) {
      event.preventDefault();
    }
  });
};

// Safe dynamic import wrapper
export const safeDynamicImport = async (importFn) => {
  try {
    return await importFn();
  } catch (error) {
    // If it's an extension error, ignore it
    if (isExtensionError(error)) {
      console.warn('Extension error ignored during dynamic import');
      return null;
    }
    // Otherwise, throw the error
    throw error;
  }
};
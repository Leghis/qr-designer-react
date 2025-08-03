import React from 'react';
import { AlertCircle } from 'lucide-react';
import { isExtensionError } from '../../utils/extensionErrorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Ignore extension errors
    if (isExtensionError(error)) {
      console.log('Extension error ignored by ErrorBoundary');
      this.setState({ hasError: false, error: null });
      return;
    }
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-900 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Oops! Une erreur est survenue</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nous sommes désolés, mais quelque chose s'est mal passé.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
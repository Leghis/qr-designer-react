import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const TemplateEditPage = lazy(() => import('./pages/TemplateEditPage'));
const PremiumPage = lazy(() => import('./pages/PremiumPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300">Chargement...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SubscriptionProvider>
          <NotificationProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={
                    <Suspense fallback={<PageLoader />}>
                      <HomePage />
                    </Suspense>
                  } />
                  <Route path="templates" element={
                    <Suspense fallback={<PageLoader />}>
                      <TemplatesPage />
                    </Suspense>
                  } />
                  <Route path="templates/:id" element={
                    <Suspense fallback={<PageLoader />}>
                      <TemplateEditPage />
                    </Suspense>
                  } />
                  <Route path="premium" element={
                    <Suspense fallback={<PageLoader />}>
                      <PremiumPage />
                    </Suspense>
                  } />
                </Route>
              </Routes>
            </Router>
          </NotificationProvider>
        </SubscriptionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

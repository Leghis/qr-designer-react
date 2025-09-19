/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext } from 'react';

// Context for subscription state
export const SubscriptionContext = createContext(null);

// Provider component
export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    isPremium: false,
    plan: 'free',
    dailyUsage: 0,
    dailyLimit: 10,
    features: {
      customStyles: false,
      advancedTemplates: false,
      bulkGeneration: false,
      analytics: false,
      dynamicQR: false
    },
    expiresAt: null
  });

  // Simulate loading subscription data from API
  useEffect(() => {
    const loadSubscription = async () => {
      // In a real app, this would fetch from an API
      const savedSubscription = localStorage.getItem('qr-designer-subscription');
      
      if (savedSubscription) {
        try {
          const parsed = JSON.parse(savedSubscription);
          setSubscription(parsed);
        } catch {
          console.error('Failed to parse subscription data');
        }
      }
    };

    loadSubscription();
  }, []);

  // Check if user can create more QR codes
  const canCreateQR = () => {
    if (subscription.isPremium) return true;
    return subscription.dailyUsage < subscription.dailyLimit;
  };

  // Increment usage
  const incrementUsage = () => {
    setSubscription(prev => ({
      ...prev,
      dailyUsage: prev.dailyUsage + 1
    }));
  };

  // Upgrade to premium
  const upgradeToPremium = (plan = 'monthly') => {
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + (plan === 'yearly' ? 12 : 1));

    const premiumSubscription = {
      isPremium: true,
      plan,
      dailyUsage: subscription.dailyUsage,
      dailyLimit: -1, // Unlimited
      features: {
        customStyles: true,
        advancedTemplates: true,
        bulkGeneration: true,
        analytics: true,
        dynamicQR: true
      },
      expiresAt: expiresAt.toISOString()
    };

    setSubscription(premiumSubscription);
    localStorage.setItem('qr-designer-subscription', JSON.stringify(premiumSubscription));
  };

  const value = {
    ...subscription,
    canCreateQR,
    incrementUsage,
    upgradeToPremium
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

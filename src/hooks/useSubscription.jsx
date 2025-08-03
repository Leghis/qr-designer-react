import { useState, useEffect, createContext, useContext } from 'react';

// Context for subscription state
const SubscriptionContext = createContext(null);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

// Provider component
export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    isPremium: false,
    plan: 'free',
    dailyUsage: 0,
    dailyLimit: 10,
    features: {
      unlimitedQR: false,
      premiumTemplates: false,
      customLogo: false,
      analytics: false,
      apiAccess: false
    }
  });

  // Check subscription status from localStorage
  useEffect(() => {
    const savedSubscription = localStorage.getItem('subscription');
    if (savedSubscription) {
      try {
        const parsedSub = JSON.parse(savedSubscription);
        setSubscription(parsedSub);
      } catch (error) {
        console.error('Error parsing subscription:', error);
      }
    }

    // Check daily usage
    const today = new Date().toDateString();
    const usageData = localStorage.getItem('qr-usage');
    if (usageData) {
      const usage = JSON.parse(usageData);
      if (usage.date !== today) {
        // Reset daily usage
        localStorage.setItem('qr-usage', JSON.stringify({ date: today, count: 0 }));
      } else {
        setSubscription(prev => ({ ...prev, dailyUsage: usage.count }));
      }
    } else {
      localStorage.setItem('qr-usage', JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  // Update subscription
  const updateSubscription = (newPlan) => {
    const plans = {
      free: {
        isPremium: false,
        plan: 'free',
        dailyLimit: 10,
        features: {
          unlimitedQR: false,
          premiumTemplates: false,
          customLogo: false,
          analytics: false,
          apiAccess: false
        }
      },
      premium: {
        isPremium: true,
        plan: 'premium',
        dailyLimit: null,
        features: {
          unlimitedQR: true,
          premiumTemplates: true,
          customLogo: true,
          analytics: true,
          apiAccess: false
        }
      },
      enterprise: {
        isPremium: true,
        plan: 'enterprise',
        dailyLimit: null,
        features: {
          unlimitedQR: true,
          premiumTemplates: true,
          customLogo: true,
          analytics: true,
          apiAccess: true
        }
      }
    };

    const newSubscription = {
      ...subscription,
      ...plans[newPlan]
    };

    setSubscription(newSubscription);
    localStorage.setItem('subscription', JSON.stringify(newSubscription));
  };

  // Track QR code generation
  const trackQRGeneration = () => {
    if (!subscription.isPremium && subscription.dailyUsage >= subscription.dailyLimit) {
      return false; // Limit reached
    }

    const today = new Date().toDateString();
    const usageData = JSON.parse(localStorage.getItem('qr-usage') || '{}');
    
    if (usageData.date !== today) {
      usageData.date = today;
      usageData.count = 0;
    }

    usageData.count += 1;
    localStorage.setItem('qr-usage', JSON.stringify(usageData));
    
    setSubscription(prev => ({ ...prev, dailyUsage: usageData.count }));
    return true;
  };

  // Check if user can use premium template
  const canUsePremiumTemplate = () => {
    return subscription.isPremium && subscription.features.premiumTemplates;
  };

  // Check if daily limit reached
  const isLimitReached = () => {
    return !subscription.isPremium && subscription.dailyUsage >= subscription.dailyLimit;
  };

  const value = {
    ...subscription,
    updateSubscription,
    trackQRGeneration,
    canUsePremiumTemplate,
    isLimitReached,
    remainingQR: subscription.isPremium ? 'Illimité' : Math.max(0, subscription.dailyLimit - subscription.dailyUsage)
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
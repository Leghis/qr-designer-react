import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('qr-designer-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('qr-designer-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('qr-designer-user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - Replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password
      // In production, this would validate against a backend
      if (email && password) {
        const userData = {
          id: '1',
          email,
          name: email.split('@')[0],
          subscription: 'free',
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        return { success: true, user: userData };
      } else {
        throw new Error('Please provide email and password');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call - Replace with actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password && name) {
        const userData = {
          id: Date.now().toString(),
          email,
          name,
          subscription: 'free',
          createdAt: new Date().toISOString()
        };
        setUser(userData);
        return { success: true, user: userData };
      } else {
        throw new Error('Please provide all required fields');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  const updateSubscription = (newSubscription) => {
    if (user) {
      const updatedUser = { ...user, subscription: newSubscription };
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateSubscription
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
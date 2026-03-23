import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'u_1',
    name: 'عمرو جلال',
    email: 'amr@example.com',
    role: 'admin',
    subscription_plan: 'pro',
    available_credits: 1500,
  });

  const [stats, setStats] = useState({
    totalCreativesGenerated: 342,
    topPerformingCreatives: 12,
  });

  const deductCredits = (amount) => {
    setUser(prev => ({ ...prev, available_credits: prev.available_credits - amount }));
  };

  return (
    <AppContext.Provider value={{ user, stats, deductCredits }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);



import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserData } from '../types';

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  isOnboardingComplete: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useLocalStorage<UserData>('userData', null);

  const isOnboardingComplete = !!userData;

  return (
    <UserContext.Provider value={{ userData, setUserData, isOnboardingComplete }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

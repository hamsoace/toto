
import React from 'react';
import OnboardingPage from './pages/OnboardingPage';
import MainLayout from './pages/MainLayout';
import { useUser } from './context/UserContext';

const AppContent: React.FC = () => {
  const { isOnboardingComplete, setUserData } = useUser();

  if (isOnboardingComplete) {
    return <MainLayout />;
  }
  
  return <OnboardingPage onOnboardingComplete={setUserData} />;
};


const App: React.FC = () => {
  return <AppContent />;
};

export default App;
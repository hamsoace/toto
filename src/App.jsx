import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { OfflineProvider } from './contexts/OfflineContext';
import usePWAInstall from './hooks/usePWAInstall';
import { Download } from 'lucide-react';

// Analytics utility functions
const recordVisit = async (userId, page) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "https://toto-backend-bw80.onrender.com/api/v1";
    await fetch(`${API_URL}/analytics/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        page,
        device: navigator.userAgent,
        browser: navigator.vendor || "Unknown",
      }),
    });
  } catch (err) {
    console.warn("Failed to record visit:", err);
  }
};

const recordInstall = async (userId) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || "https://toto-backend-bw80.onrender.com/api/v1";
    await fetch(`${API_URL}/analytics/install`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        device: navigator.userAgent,
        browser: navigator.vendor || "Unknown",
      }),
    });
  } catch (err) {
    console.warn("Failed to record install:", err);
  }
};

// Pages
import PhoneAuth from './pages/PhoneAuth';
import Dashboard from './pages/Dashboard';
import VaccinationTracker from './pages/VaccinationTracker';
import MilestoneTracker from './pages/MilestoneTracker';
import MentalHealth from './pages/MentalHealth';
import CHPDirectory from './pages/CHPDirectory';
import Profile from './pages/Profile';

// Components
import LoadingSpinner from './components/LoadingSpinner';
import OfflineIndicator from './components/OfflineIndicator';

function AppRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (user?.id) {
      recordVisit(user.id, location.pathname);
    }
  }, [location, user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route 
        path="/auth" 
        element={!user ? <PhoneAuth /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/vaccinations" 
        element={user ? <VaccinationTracker /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/milestones" 
        element={user ? <MilestoneTracker /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/mental-health" 
        element={user ? <MentalHealth /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/chp-directory" 
        element={user ? <CHPDirectory /> : <Navigate to="/auth" />} 
      />
      <Route 
        path="/profile" 
        element={user ? <Profile /> : <Navigate to="/auth" />} 
      />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
    </Routes>
  );
}

function App() {
  const { isInstallable, promptInstall } = usePWAInstall();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  // Automatically show install modal after load
  useEffect(() => {
    if (isInstallable) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2000); // show 2s after app opens
      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  const handleInstall = async () => {
    await promptInstall();
    setShowInstallPrompt(false);
    
    // Record install when app is installed
    const handleAppInstalled = (e) => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user?.id) {
        recordInstall(user.id);
      }
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
    
    window.addEventListener('appinstalled', handleAppInstalled);
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <OfflineProvider>
          <Router>
            <div className="app">
              <OfflineIndicator />
              <AppRoutes />

              {/* Auto Install Prompt Modal */}
              {showInstallPrompt && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
                    <h2 className="text-lg font-semibold mb-2">Install TotoCare App</h2>
                    <p className="text-gray-600 mb-4">
                      Install TotoCare on your device for faster access and offline use.
                    </p>
                    <button
                      onClick={handleInstall}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto mb-3"
                    >
                      <Download size={18} />
                      Install Now
                    </button>
                    <button
                      onClick={() => setShowInstallPrompt(false)}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Router>
        </OfflineProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
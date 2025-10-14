import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { OfflineProvider } from './contexts/OfflineContext';

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
  return (
    <LanguageProvider>
      <AuthProvider>
        <OfflineProvider>
          <Router>
            <div className="app">
              <OfflineIndicator />
              <AppRoutes />
            </div>
          </Router>
        </OfflineProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
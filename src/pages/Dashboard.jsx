import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Syringe, TrendingUp, Heart, Users } from 'lucide-react';

const translations = {
  en: {
    welcome: "Hello",
    subtitle: "How are you and your little one today?",
    quickActions: "Quick Actions",
    vaccinations: "Vaccinations",
    milestones: "Milestones", 
    mentalHealth: "Mental Health",
    chpDirectory: "Find Support"
  },
  sw: {
    welcome: "Habari",
    subtitle: "Habari yako na ya mtoto wako leo?",
    quickActions: "Vitendo Vya Haraka",
    vaccinations: "Chanjo",
    milestones: "Maendeleo",
    mentalHealth: "Afya Ya Akili", 
    chpDirectory: "Tafuta Msaada"
  }
};

function Dashboard() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="dashboard-container">
      <div className="welcome-banner">
        <h1 className="welcome-title">
          {t.welcome}, {user?.profile?.name || (user?.profileType === 'mum' ? 'Mama' : 'Dad')}!
        </h1>
        <p className="welcome-subtitle">{t.subtitle}</p>
      </div>

      <div className="quick-actions">
        <Link to="/vaccinations" className="action-card">
          <Syringe className="action-icon" />
          <span>{t.vaccinations}</span>
        </Link>
        <Link to="/milestones" className="action-card">
          <TrendingUp className="action-icon" />
          <span>{t.milestones}</span>
        </Link>
        <Link to="/mental-health" className="action-card">
          <Heart className="action-icon" />
          <span>{t.mentalHealth}</span>
        </Link>
        <Link to="/chp-directory" className="action-card">
          <Users className="action-icon" />
          <span>{t.chpDirectory}</span>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
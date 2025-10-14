import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useOffline } from '../contexts/OfflineContext';
import { milestoneService } from '../services/api';
import { CheckCircle, Circle, TrendingUp, Star, Calendar, Baby } from 'lucide-react';

const translations = {
  en: {
    title: "Development Milestones",
    subtitle: "Track your baby's growth and development",
    categories: {
      motor: "Motor Skills",
      language: "Language & Communication", 
      social: "Social & Emotional",
      cognitive: "Cognitive & Learning"
    },
    achieved: "Achieved",
    notYet: "Not yet",
    typicalAge: "Typical age",
    markAchieved: "Mark as achieved",
    markNotYet: "Mark as not achieved",
    noMilestones: "No milestones tracked yet",
    addBaby: "Add your baby's birth date to see developmental milestones",
    progress: "Progress",
    milestonesAchieved: "milestones achieved",
    celebrating: "Celebrating your little one's progress!",
    keepGoing: "Every small step is a big achievement!",
    offlineNote: "Working offline - changes will sync when you're back online"
  },
  sw: {
    title: "Maendeleo ya Mtoto",
    subtitle: "Fuatilia ukuaji na maendeleo ya mtoto wako",
    categories: {
      motor: "Ujuzi wa Mwili",
      language: "Lugha na Mawasiliano",
      social: "Kijamii na Kihemko", 
      cognitive: "Akili na Kujifunza"
    },
    achieved: "Imefanikiwa",
    notYet: "Bado",
    typicalAge: "Umri wa kawaida",
    markAchieved: "Weka kama imefanikiwa",
    markNotYet: "Weka kama haijafanikiwa",
    noMilestones: "Hakuna maendeleo yaliyofuatiliwa bado",
    addBaby: "Weka tarehe ya kuzaliwa kwa mtoto wako kuona maendeleo",
    progress: "Maendeleo",
    milestonesAchieved: "maendeleo yamefanikiwa",
    celebrating: "Tunasisitiza maendeleo ya mtoto wako!",
    keepGoing: "Kila hatua ndogo ni mafanikio makubwa!",
    offlineNote: "Unafanya kazi nje ya mtandao - mabadiliko yatasawazisha ukiwa umerudishwa mtandaoni"
  }
};

function MilestoneTracker() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { isOffline } = useOffline();
  const t = translations[language];
  
  const [milestones, setMilestones] = useState({
    achieved: [],
    upcoming: [],
    all: []
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMilestones();
  }, []);

  const loadMilestones = async () => {
    try {
      setLoading(true);
      const response = await milestoneService.getMilestones();
      setMilestones(response.data);
    } catch (err) {
      setError('Failed to load milestones');
      console.error('Error loading milestones:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAchieved = async (milestoneId, milestoneTitle) => {
    try {
      const achievedDate = new Date().toISOString().split('T')[0];
      await milestoneService.markAchieved(milestoneId, { achievedDate });
      
      // Update local state optimistically
      setMilestones(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(m => m.id !== milestoneId),
        achieved: [...prev.achieved, { 
          ...prev.upcoming.find(m => m.id === milestoneId),
          achieved: true,
          achievedDate 
        }]
      }));

    } catch (err) {
      setError(`Failed to mark ${milestoneTitle} as achieved`);
      console.error('Error marking milestone achieved:', err);
    }
  };

  const handleMarkPending = async (milestoneId, milestoneTitle) => {
    try {
      await milestoneService.markPending(milestoneId);
      
      // Update local state optimistically
      const milestoneToMove = milestones.achieved.find(m => m.id === milestoneId);
      setMilestones(prev => ({
        ...prev,
        achieved: prev.achieved.filter(m => m.id !== milestoneId),
        upcoming: [...prev.upcoming, { ...milestoneToMove, achieved: false, achievedDate: null }]
      }));

    } catch (err) {
      setError(`Failed to mark ${milestoneTitle} as pending`);
      console.error('Error marking milestone pending:', err);
    }
  };

  const filteredMilestones = activeCategory === 'all' 
    ? milestones.upcoming 
    : milestones.upcoming.filter(m => m.category === activeCategory);

  const totalMilestones = milestones.achieved.length + milestones.upcoming.length;
  const progressPercentage = totalMilestones > 0 
    ? Math.round((milestones.achieved.length / totalMilestones) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!user?.profile?.babyBirthDate) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <Baby size={48} className="empty-icon" />
          <h2>{t.addBaby}</h2>
          <p>Add your baby's birth date in profile settings to see their developmental milestones.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
        {isOffline && (
          <div className="offline-banner">
            <AlertCircle size={16} />
            {t.offlineNote}
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Progress Summary */}
      <div className="progress-card">
        <div className="progress-header">
          <div className="progress-stats">
            <div className="stat">
              <span className="stat-number">{milestones.achieved.length}</span>
              <span className="stat-label">{t.milestonesAchieved}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{progressPercentage}%</span>
              <span className="stat-label">{t.progress}</span>
            </div>
          </div>
          <Star className="progress-icon" />
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="progress-message">
          {milestones.achieved.length > 0 ? t.celebrating : t.keepGoing}
        </p>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        <button
          className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {Object.entries(t.categories).map(([key, label]) => (
          <button
            key={key}
            className={`filter-btn ${activeCategory === key ? 'active' : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Upcoming Milestones */}
      <section className="section">
        <h2 className="section-title">
          <TrendingUp className="section-icon" />
          {activeCategory === 'all' ? 'All Milestones' : t.categories[activeCategory]} 
          ({filteredMilestones.length})
        </h2>
        
        {filteredMilestones.length === 0 ? (
          <div className="empty-section">
            <CheckCircle size={32} className="success-icon" />
            <p>Amazing! No more milestones in this category to track right now.</p>
          </div>
        ) : (
          <div className="milestone-list">
            {filteredMilestones.map(milestone => (
              <div key={milestone.id} className="milestone-card">
                <div className="milestone-info">
                  <h3 className="milestone-title">{milestone.title}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                  <div className="milestone-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>{t.typicalAge}: {milestone.typicalAge}</span>
                    </div>
                    <div className="meta-item">
                      <Circle size={14} className="pending-icon" />
                      <span>{t.notYet}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleMarkAchieved(milestone.id, milestone.title)}
                  className="btn btn-success"
                  disabled={isOffline}
                >
                  <CheckCircle size={16} />
                  {t.markAchieved}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Achieved Milestones */}
      {milestones.achieved.length > 0 && (
        <section className="section">
          <h2 className="section-title">
            <CheckCircle className="section-icon" />
            {t.achieved} ({milestones.achieved.length})
          </h2>
          <div className="milestone-list achieved">
            {milestones.achieved.map(milestone => (
              <div key={milestone.id} className="milestone-card achieved">
                <div className="milestone-info">
                  <h3 className="milestone-title">{milestone.title}</h3>
                  <p className="milestone-description">{milestone.description}</p>
                  <div className="milestone-meta">
                    <div className="meta-item success">
                      <CheckCircle size={14} />
                      <span>
                        {t.achieved}: {new Date(milestone.achievedDate).toLocaleDateString(language)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleMarkPending(milestone.id, milestone.title)}
                  className="btn btn-secondary"
                  disabled={isOffline}
                >
                  {t.markNotYet}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MilestoneTracker;
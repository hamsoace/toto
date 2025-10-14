import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useOffline } from '../contexts/OfflineContext';
import { vaccinationService } from '../services/api';
import { CheckCircle, Clock, AlertCircle, Calendar, Syringe } from 'lucide-react';

const translations = {
  en: {
    title: "Vaccination Schedule",
    subtitle: "Keep track of your baby's immunizations",
    upcoming: "Upcoming Vaccines",
    completed: "Completed Vaccines",
    due: "Due",
    completedStatus: "Completed",
    overdue: "Overdue",
    markCompleted: "Mark as completed",
    markPending: "Mark as pending",
    noVaccines: "No vaccines scheduled yet",
    addBaby: "Add your baby's birth date to see the vaccination schedule",
    lastUpdated: "Last updated",
    offlineNote: "Working offline - changes will sync when you're back online"
  },
  sw: {
    title: "Ratiba ya Chanjo",
    subtitle: "Fuatilia chanjo za mtoto wako",
    upcoming: "Chanjo Zijazo",
    completed: "Chanjo Zilizokwisha",
    due: "Inapaswa",
    completedStatus: "Imekwisha",
    overdue: "Imechelewa",
    markCompleted: "Weka kama imekwisha",
    markPending: "Weka kama inasubiri",
    noVaccines: "Hakuna chanjo zilizopangwa bado",
    addBaby: "Weka tarehe ya kuzaliwa kwa mtoto wako kuona ratiba ya chanjo",
    lastUpdated: "Imesasishwa mwisho",
    offlineNote: "Unafanya kazi nje ya mtandao - mabadiliko yatasawazisha ukiwa umerudishwa mtandaoni"
  }
};

function VaccinationTracker() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { isOffline } = useOffline();
  const t = translations[language];
  
  const [vaccinations, setVaccinations] = useState({
    upcoming: [],
    completed: [],
    schedule: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadVaccinations();
  }, []);

  const loadVaccinations = async () => {
    try {
      setLoading(true);
      const response = await vaccinationService.getSchedule();
      setVaccinations(response.data);
    } catch (err) {
      setError('Failed to load vaccination schedule');
      console.error('Error loading vaccinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (vaccineId, vaccineName) => {
    try {
      const completedDate = new Date().toISOString().split('T')[0];
      await vaccinationService.markCompleted(vaccineId, { completedDate });
      
      // Update local state optimistically
      setVaccinations(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(v => v.id !== vaccineId),
        completed: [...prev.completed, { 
          ...prev.upcoming.find(v => v.id === vaccineId),
          completed: true,
          completedDate 
        }]
      }));

    } catch (err) {
      setError(`Failed to mark ${vaccineName} as completed`);
      console.error('Error marking vaccine completed:', err);
    }
  };

  const handleMarkPending = async (vaccineId, vaccineName) => {
    try {
      await vaccinationService.markPending(vaccineId);
      
      // Update local state optimistically
      const vaccineToMove = vaccinations.completed.find(v => v.id === vaccineId);
      setVaccinations(prev => ({
        ...prev,
        completed: prev.completed.filter(v => v.id !== vaccineId),
        upcoming: [...prev.upcoming, { ...vaccineToMove, completed: false, completedDate: null }]
      }));

    } catch (err) {
      setError(`Failed to mark ${vaccineName} as pending`);
      console.error('Error marking vaccine pending:', err);
    }
  };

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
          <Syringe size={48} className="empty-icon" />
          <h2>{t.addBaby}</h2>
          <p>Add your baby's birth date in profile settings to see their personalized vaccination schedule.</p>
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

      {/* Upcoming Vaccinations */}
      <section className="section">
        <h2 className="section-title">
          <Clock className="section-icon" />
          {t.upcoming} ({vaccinations.upcoming.length})
        </h2>
        
        {vaccinations.upcoming.length === 0 ? (
          <div className="empty-section">
            <CheckCircle size={32} className="success-icon" />
            <p>All caught up! No upcoming vaccines at the moment.</p>
          </div>
        ) : (
          <div className="vaccination-list">
            {vaccinations.upcoming.map(vaccine => (
              <div key={vaccine.id} className={`vaccine-card ${vaccine.isOverdue ? 'overdue' : ''}`}>
                <div className="vaccine-info">
                  <h3 className="vaccine-name">{vaccine.name}</h3>
                  <p className="vaccine-description">{vaccine.description}</p>
                  <div className="vaccine-meta">
                    <div className="meta-item">
                      <Calendar size={14} />
                      <span>
                        {vaccine.isOverdue ? t.overdue : t.due}:{' '}
                        {new Date(vaccine.dueDate).toLocaleDateString(language)}
                      </span>
                    </div>
                    {vaccine.notes && (
                      <div className="meta-item">
                        <span className="notes">{vaccine.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleMarkCompleted(vaccine.id, vaccine.name)}
                  className="btn btn-success"
                  disabled={isOffline}
                >
                  <CheckCircle size={16} />
                  {t.markCompleted}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Completed Vaccinations */}
      <section className="section">
        <h2 className="section-title">
          <CheckCircle className="section-icon" />
          {t.completed} ({vaccinations.completed.length})
        </h2>
        
        {vaccinations.completed.length === 0 ? (
          <div className="empty-section">
            <p>No vaccines completed yet. They'll appear here once you mark them as done.</p>
          </div>
        ) : (
          <div className="vaccination-list completed">
            {vaccinations.completed.map(vaccine => (
              <div key={vaccine.id} className="vaccine-card completed">
                <div className="vaccine-info">
                  <h3 className="vaccine-name">{vaccine.name}</h3>
                  <p className="vaccine-description">{vaccine.description}</p>
                  <div className="vaccine-meta">
                    <div className="meta-item success">
                      <CheckCircle size={14} />
                      <span>
                        {t.completedStatus}: {new Date(vaccine.completedDate).toLocaleDateString(language)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleMarkPending(vaccine.id, vaccine.name)}
                  className="btn btn-secondary"
                  disabled={isOffline}
                >
                  {t.markPending}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default VaccinationTracker;
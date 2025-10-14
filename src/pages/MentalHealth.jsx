import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useOffline } from '../contexts/OfflineContext';
import { checklistService } from '../services/api';
import { Heart, Users, AlertTriangle, Phone, ExternalLink, CheckCircle } from 'lucide-react';

const translations = {
  en: {
    title: "Mental Health Check-in",
    subtitle: "Your wellbeing matters as much as your baby's",
    ppdChecklist: {
      title: "How Are You Feeling?",
      description: "Postpartum Depression Self-Check (Based on WHO guidelines)",
      instruction: "Over the past 2 weeks, how often have you been bothered by:",
      submit: "Submit Checklist",
      retake: "Retake Checklist"
    },
    partnerChecklist: {
      title: "Partner Support Check-in",
      description: "How are you supporting and being supported?",
      instruction: "Rate how consistently you've been able to:",
      submit: "Submit Check-in",
      retake: "Retake Check-in"
    },
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    partnerOptions: ["Not at all", "Sometimes", "Often", "Always"],
    resources: {
      title: "Support Resources",
      emergency: "Emergency Support",
      hotlines: "Hotlines",
      supportGroups: "Support Groups",
      selfHelp: "Self-Help Tools",
      callNow: "Call Now"
    },
    results: {
      title: "Your Results",
      score: "Total Score",
      riskLevel: "Risk Level",
      recommendation: "Recommendation",
      supportLevel: "Support Level",
      feedback: "Feedback"
    }
  },
  sw: {
    title: "Kukagua Afya Ya Akili", 
    subtitle: "Ustawi wako ni muhimu kama ule wa mtoto wako",
    ppdChecklist: {
      title: "Unahisi Vipi?",
      description: "Kujikagulia kwa Unyogovu Baada Ya Kuzalia (Kulingana na miongozo ya WHO)",
      instruction: "Kwa wiki 2 zilizopita, umewezeshwa na mara ngapi na:",
      submit: "Wasilisha Ukaguzi",
      retake: "Fanya Upya Ukaguzi"
    },
    partnerChecklist: {
      title: "Ukaguzi wa Msaada wa Mwenzi",
      description: "Unawezaje kusaidia na kupata msaada?",
      instruction: "Kadiria jinsi umeweza kuthibitisha:",
      submit: "Wasilisha Ukaguzi", 
      retake: "Fanya Upya Ukaguzi"
    },
    options: ["Sana sana", "Siku kadhaa", "Zaidi ya nusu ya siku", "Karibu kila siku"],
    partnerOptions: ["Sana sana", "Mara kwa mara", "Mara nyingi", "Kila mara"],
    resources: {
      title: "Rasilimali za Msaada",
      emergency: "Msaada wa Dharura",
      hotlines: "Nambari za Msaada",
      supportGroups: "Vikundi vya Msaada", 
      selfHelp: "Vifaa vya Kujisaidia",
      callNow: "Piga Sasa"
    },
    results: {
      title: "Matokeo Yako",
      score: "Jumla ya Alama",
      riskLevel: "Kiwango cha Hatari",
      recommendation: "Mapendekezo",
      supportLevel: "Kiwango cha Msaada",
      feedback: "Maoni"
    }
  }
};

function MentalHealth() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { isOffline } = useOffline();
  const t = translations[language];
  
  const [activeTab, setActiveTab] = useState(user?.profileType === 'dad' ? 'partner' : 'ppd');
  const [ppdScores, setPpdScores] = useState([]);
  const [partnerScores, setPartnerScores] = useState([]);
  const [resources, setResources] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const response = await checklistService.getPPDResources();
      setResources(response.data.resources);
    } catch (err) {
      console.error('Error loading resources:', err);
    }
  };

  const handlePpdScoreChange = (questionIndex, score) => {
    const newScores = [...ppdScores];
    newScores[questionIndex] = score;
    setPpdScores(newScores);
  };

  const handlePartnerScoreChange = (questionIndex, score) => {
    const newScores = [...partnerScores];
    newScores[questionIndex] = score;
    setPartnerScores(newScores);
  };

  const submitPpdChecklist = async () => {
    if (ppdScores.length < 9 || ppdScores.some(score => score === undefined)) {
      setError('Please answer all questions before submitting');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await checklistService.submitPPDChecklist(ppdScores);
      setResults(response.data);
    } catch (err) {
      setError('Failed to submit checklist');
      console.error('Error submitting PPD checklist:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitPartnerChecklist = async () => {
    if (partnerScores.length < 9 || partnerScores.some(score => score === undefined)) {
      setError('Please answer all questions before submitting');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await checklistService.submitPartnerChecklist(partnerScores);
      setResults(response.data);
    } catch (err) {
      setError('Failed to submit checklist');
      console.error('Error submitting partner checklist:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetChecklist = () => {
    setPpdScores([]);
    setPartnerScores([]);
    setResults(null);
    setError('');
  };

  // PPD questions (WHO-based)
  const ppdQuestions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless", 
    "Trouble falling/staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself",
    "Trouble concentrating",
    "Moving/speaking slowly or too fast/restlessly",
    "Thoughts of harming yourself"
  ];

  // Partner questions
  const partnerQuestions = [
    "Checking in with your partner's emotional state",
    "Taking on baby care tasks without being asked",
    "Making time for your own mental health", 
    "Noticing changes in your partner's behavior",
    "Creating space for honest conversations",
    "Managing stress in healthy ways",
    "Building your support network",
    "Balancing work and family time",
    "Celebrating small parenting wins"
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
        {isOffline && (
          <div className="offline-banner">
            <AlertTriangle size={16} />
            Working offline - checklists can be completed later
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'ppd' ? 'active' : ''}`}
          onClick={() => setActiveTab('ppd')}
        >
          <Heart size={16} />
          {t.ppdChecklist.title}
        </button>
        <button
          className={`tab-btn ${activeTab === 'partner' ? 'active' : ''}`}
          onClick={() => setActiveTab('partner')}
        >
          <Users size={16} />
          {t.partnerChecklist.title}
        </button>
      </div>

      {/* Results Display */}
      {results && (
        <div className={`results-card ${results.riskLevel || 'support'}`}>
          <h3 className="results-title">{t.results.title}</h3>
          <div className="results-content">
            {results.totalScore && (
              <div className="result-item">
                <span className="result-label">{t.results.score}:</span>
                <span className="result-value">{results.totalScore}</span>
              </div>
            )}
            {results.riskLevel && (
              <div className="result-item">
                <span className="result-label">{t.results.riskLevel}:</span>
                <span className={`result-value risk-${results.riskLevel}`}>
                  {results.riskLevel.replace('_', ' ')}
                </span>
              </div>
            )}
            {results.supportLevel && (
              <div className="result-item">
                <span className="result-label">{t.results.supportLevel}:</span>
                <span className="result-value">{results.supportLevel}%</span>
              </div>
            )}
            <div className="result-recommendation">
              <strong>
                {results.riskLevel ? t.results.recommendation : t.results.feedback}:
              </strong>
              <p>{results.recommendation || results.feedback}</p>
            </div>
            {results.encouragement && (
              <div className="result-encouragement">
                <p>{results.encouragement}</p>
              </div>
            )}
          </div>
          <button onClick={resetChecklist} className="btn btn-secondary">
            {activeTab === 'ppd' ? t.ppdChecklist.retake : t.partnerChecklist.retake}
          </button>
        </div>
      )}

      {/* Checklist Forms */}
      {!results && (
        <div className="checklist-container">
          {activeTab === 'ppd' ? (
            <div className="checklist-form">
              <h2 className="checklist-title">{t.ppdChecklist.title}</h2>
              <p className="checklist-description">{t.ppdChecklist.description}</p>
              <p className="checklist-instruction">{t.ppdChecklist.instruction}</p>
              
              <div className="questions-list">
                {ppdQuestions.map((question, index) => (
                  <div key={index} className="question-item">
                    <p className="question-text">{question}</p>
                    <div className="options-grid">
                      {t.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="option-label">
                          <input
                            type="radio"
                            name={`ppd-${index}`}
                            value={optionIndex}
                            checked={ppdScores[index] === optionIndex}
                            onChange={() => handlePpdScoreChange(index, optionIndex)}
                            className="option-input"
                          />
                          <span className="option-text">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitPpdChecklist}
                disabled={loading || ppdScores.length < 9 || ppdScores.some(s => s === undefined)}
                className="btn btn-primary"
              >
                {loading ? 'Submitting...' : t.ppdChecklist.submit}
              </button>
            </div>
          ) : (
            <div className="checklist-form">
              <h2 className="checklist-title">{t.partnerChecklist.title}</h2>
              <p className="checklist-description">{t.partnerChecklist.description}</p>
              <p className="checklist-instruction">{t.partnerChecklist.instruction}</p>
              
              <div className="questions-list">
                {partnerQuestions.map((question, index) => (
                  <div key={index} className="question-item">
                    <p className="question-text">{question}</p>
                    <div className="options-grid">
                      {t.partnerOptions.map((option, optionIndex) => (
                        <label key={optionIndex} className="option-label">
                          <input
                            type="radio"
                            name={`partner-${index}`}
                            value={optionIndex}
                            checked={partnerScores[index] === optionIndex}
                            onChange={() => handlePartnerScoreChange(index, optionIndex)}
                            className="option-input"
                          />
                          <span className="option-text">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitPartnerChecklist}
                disabled={loading || partnerScores.length < 9 || partnerScores.some(s => s === undefined)}
                className="btn btn-primary"
              >
                {loading ? 'Submitting...' : t.partnerChecklist.submit}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Resources Section */}
      {resources && (
        <section className="resources-section">
          <h2 className="section-title">
            <Heart className="section-icon" />
            {t.resources.title}
          </h2>
          
          <div className="resources-grid">
            {/* Emergency Resources */}
            <div className="resource-category">
              <h3 className="resource-category-title">
                <AlertTriangle size={16} />
                {t.resources.emergency}
              </h3>
              {resources.emergency.map((resource, index) => (
                <div key={index} className="resource-item emergency">
                  <h4>{resource.name}</h4>
                  <p>{resource.description}</p>
                  <a href={`tel:${resource.phone}`} className="btn btn-danger">
                    <Phone size={16} />
                    {t.resources.callNow} {resource.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* Support Groups */}
            <div className="resource-category">
              <h3 className="resource-category-title">
                <Users size={16} />
                {t.resources.supportGroups}
              </h3>
              {resources.support.map((resource, index) => (
                <div key={index} className="resource-item">
                  <h4>{resource.name}</h4>
                  <p>{resource.description}</p>
                  {resource.phone && (
                    <a href={`tel:${resource.phone}`} className="btn btn-secondary">
                      <Phone size={16} />
                      Call {resource.phone}
                    </a>
                  )}
                  {resource.website && (
                    <a href={resource.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      <ExternalLink size={16} />
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default MentalHealth;
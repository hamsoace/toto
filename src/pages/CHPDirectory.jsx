import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useOffline } from '../contexts/OfflineContext';
import { chpService } from '../services/api';
import { Search, MapPin, Phone, MessageCircle, Users, Shield, Clock } from 'lucide-react';

const translations = {
  en: {
    title: "Find Community Health Support",
    subtitle: "Connect with verified Community Health Promoters in your area",
    searchPlaceholder: "Search by ward or location...",
    searchButton: "Find CHPs",
    useMyLocation: "Use my location",
    nearbyCHPs: "CHPs Near You",
    allCHPs: "All CHPs in",
    contact: "Contact via WhatsApp",
    specialties: "Specialties",
    languages: "Languages spoken",
    availability: "Availability",
    emergency: "Emergency response available",
    verified: "Verified CHP",
    noCHPs: "No CHPs found in this area",
    tryDifferent: "Try a different ward or location",
    loading: "Finding CHPs in your area...",
    error: "Unable to load CHPs. Please check your connection.",
    contactMessage: "Hello! I'm a TotoCare user and I need some parenting support. Can you help me?"
  },
  sw: {
    title: "Tafuta Msaada wa Afya ya Jamii",
    subtitle: "Wasiliana na Wahamasishaji wa Afya wa Jamii waliohakikiwa eneo lako",
    searchPlaceholder: "Tafuta kwa kata au eneo...",
    searchButton: "Tafuta Wahamasishaji",
    useMyLocation: "Tumia eneo langu",
    nearbyCHPs: "Wahamasishaji Karibu Nawe",
    allCHPs: "Wahamasishaji Wote",
    contact: "Wasiliana kupitia WhatsApp",
    specialties: "Ujuzi Maalum",
    languages: "Lugha unazozungumza",
    availability: "Upataji",
    emergency: "Inajibu dharura",
    verified: "Mhamasishaji aliyehakikiwa",
    noCHPs: "Hakuna Wahamasishaji walipatikana eneo hili",
    tryDifferent: "Jaribu kata au eneo tofauti",
    loading: "Inatafuta Wahamasishaji eneo lako...",
    error: "Haikuweza kupakua Wahamasishaji. Tafadhali angalia muunganisho wako.",
    contactMessage: "Habari! Mimi ni mtumiaji wa TotoCare na nahitaji msaada wa ulezi. Unaweza kunisaidia?"
  }
};

function CHPDirectory() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { isOffline } = useOffline();
  const t = translations[language];
  
  const [chps, setChps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [counties, setCounties] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedSubCounty, setSelectedSubCounty] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCounties();
    // Load CHPs for user's location if available
    if (user?.profile?.location) {
      searchByWard(user.profile.location);
    }
  }, []);

  const loadCounties = async () => {
    try {
      const response = await chpService.getAllCounties();
      setCounties(response.data.counties);
    } catch (err) {
      console.error('Error loading counties:', err);
    }
  };

  const searchByWard = async (ward) => {
    if (!ward.trim()) return;

    try {
      setLoading(true);
      setError('');
      const response = await chpService.getCHPByWard(ward);
      setChps(response.data.chps);
      setSearchQuery(ward);
    } catch (err) {
      setError(t.error);
      console.error('Error searching CHPs:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await chpService.getNearbyCHPs({ latitude, longitude });
          setChps(response.data.chps);
          setSearchQuery(response.data.searchArea);
        } catch (err) {
          setError(t.error);
          console.error('Error getting nearby CHPs:', err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  const contactCHP = async (chp) => {
    try {
      const response = await chpService.contactCHP(chp.id, t.contactMessage);
      // Open WhatsApp with pre-filled message
      window.open(response.data.whatsappUrl, '_blank');
    } catch (err) {
      // Fallback: direct WhatsApp link
      const whatsappUrl = `https://wa.me/${chp.phone.replace('+', '')}?text=${encodeURIComponent(t.contactMessage)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
        {isOffline && (
          <div className="offline-banner">
            <AlertTriangle size={16} />
            Working offline - CHP directory unavailable
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="search-input"
            onKeyPress={(e) => e.key === 'Enter' && searchByWard(searchQuery)}
          />
          <button
            onClick={() => searchByWard(searchQuery)}
            disabled={!searchQuery.trim() || loading}
            className="btn btn-primary"
          >
            {loading ? '...' : t.searchButton}
          </button>
        </div>
        
        <button
          onClick={searchByLocation}
          disabled={loading || isOffline}
          className="btn btn-secondary location-btn"
        >
          <MapPin size={16} />
          {t.useMyLocation}
        </button>
      </div>

      {/* Location Filters */}
      <div className="location-filters">
        <select
          value={selectedCounty}
          onChange={(e) => setSelectedCounty(e.target.value)}
          className="filter-select"
        >
          <option value="">Select County</option>
          {counties.map(county => (
            <option key={county.name} value={county.name}>
              {county.name} ({county.chpCount})
            </option>
          ))}
        </select>

        {selectedCounty && (
          <select
            value={selectedSubCounty}
            onChange={(e) => setSelectedSubCounty(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Sub-County</option>
            {/* Sub-counties would be loaded dynamically */}
          </select>
        )}

        {selectedSubCounty && (
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Ward</option>
            {/* Wards would be loaded dynamically */}
          </select>
        )}
      </div>

      {error && (
        <div className="error-message">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {/* CHPs List */}
      <div className="chp-list">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>{t.loading}</p>
          </div>
        ) : chps.length === 0 ? (
          <div className="empty-state">
            <Users size={48} className="empty-icon" />
            <h3>{t.noCHPs}</h3>
            <p>{t.tryDifferent}</p>
          </div>
        ) : (
          <>
            <h2 className="results-title">
              {searchQuery === 'Your location' ? t.nearbyCHPs : `${t.allCHPs} ${searchQuery}`}
              <span className="results-count">({chps.length})</span>
            </h2>

            {chps.map(chp => (
              <div key={chp.id} className="chp-card">
                <div className="chp-header">
                  <div className="chp-basic-info">
                    <h3 className="chp-name">{chp.name}</h3>
                    <div className="chp-verification">
                      <Shield size={14} className="verified-icon" />
                      <span>{t.verified}</span>
                    </div>
                  </div>
                  <div className="chp-contact">
                    <button
                      onClick={() => contactCHP(chp)}
                      className="btn btn-success"
                      disabled={isOffline}
                    >
                      <MessageCircle size={16} />
                      {t.contact}
                    </button>
                  </div>
                </div>

                <div className="chp-details">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>
                      {chp.location.ward}, {chp.location.subCounty}, {chp.location.county}
                    </span>
                  </div>
                  
                  {chp.healthUnit && (
                    <div className="detail-item">
                      <Users size={14} />
                      <span>Health Unit: {chp.healthUnit}</span>
                    </div>
                  )}

                  {chp.specialties && chp.specialties.length > 0 && (
                    <div className="detail-item">
                      <strong>{t.specialties}:</strong>
                      <span>{chp.specialties.join(', ')}</span>
                    </div>
                  )}

                  {chp.languages && chp.languages.length > 0 && (
                    <div className="detail-item">
                      <strong>{t.languages}:</strong>
                      <span>{chp.languages.join(', ')}</span>
                    </div>
                  )}

                  <div className="detail-item availability">
                    <Clock size={14} />
                    <span>
                      {t.availability}: {chp.availability?.days?.join(', ') || 'Flexible'}
                      {chp.availability?.emergencyResponse && (
                        <span className="emergency-badge">
                          <AlertTriangle size={12} />
                          {t.emergency}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Information Section */}
      <div className="info-section">
        <h3>About Community Health Promoters</h3>
        <p>
          Community Health Promoters (CHPs) are trained local health workers who provide 
          essential health services and education in their communities. They can help with:
        </p>
        <ul>
          <li>Maternal and child health advice</li>
          <li>Vaccination information and reminders</li>
          <li>Postpartum care guidance</li>
          <li>Basic health assessments</li>
          <li>Referrals to health facilities when needed</li>
        </ul>
      </div>
    </div>
  );
}

export default CHPDirectory;
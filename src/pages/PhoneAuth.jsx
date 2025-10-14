import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Smartphone, Shield } from 'lucide-react';

const translations = {
  en: {
    title: "Welcome to TotoCare",
    subtitle: "Your parenting companion for healthier families",
    phoneLabel: "WhatsApp Number",
    phonePlaceholder: "+254712345678",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name",
    parentType: "I am a",
    mum: "Mum",
    dad: "Dad",
    continue: "Continue with WhatsApp",
    benefits: [
      "Secure WhatsApp verification",
      "Join local parenting communities", 
      "24/7 support access",
      "Your data stays private"
    ],
    privacy: "We never share your number. This connects you to local parenting support.",
    verificationTitle: "Check Your WhatsApp",
    verificationSubtitle: "We sent a 6-digit code to",
    codePlaceholder: "Enter 6-digit code",
    verify: "Verify & Continue",
    resend: "Resend Code",
    codeSent: "Code sent!",
    invalidCode: "Please enter a valid 6-digit code"
  },
  sw: {
    title: "Karibu TotoCare", 
    subtitle: "Msaidizi wako wa ulezi wa familia wenye afya bora",
    phoneLabel: "Nambari ya WhatsApp",
    phonePlaceholder: "+254712345678", 
    nameLabel: "Jina Lako",
    namePlaceholder: "Weka jina lako",
    parentType: "Mimi ni",
    mum: "Mama",
    dad: "Baba", 
    continue: "Endelea na WhatsApp",
    benefits: [
      "Uhakiki salama wa WhatsApp",
      "Jiunge na jamii za wazazi",
      "Msaada wa kila wakati",
      "Data yako inabaki faragha"
    ],
    privacy: "Hatushi nambari yako. Hii inakuunganisha na msaada wa wazazi wa kienyeji.",
    verificationTitle: "Angalia WhatsApp Yako",
    verificationSubtitle: "Tumetuma msimbo wa tarakimu 6 kwa",
    codePlaceholder: "Weka msimbo wa tarakimu 6",
    verify: "Hakiki & Endelea",
    resend: "Tuma tena msimbo", 
    codeSent: "Msimbo umetumwa!",
    invalidCode: "Tafadhali weka msimbo halali wa tarakimu 6"
  }
};

function PhoneAuth() {
  const { login, verifyCode } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [step, setStep] = useState('phone');
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    profileType: 'mum'
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.phone, formData.profileType, formData.name);
      setStep('verification');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setError(t.invalidCode);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyCode(formData.phone, verificationCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verification') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="app-logo">
            <Heart className="logo-icon" />
            TotoCare
          </div>
          
          <h1 className="auth-title">{t.verificationTitle}</h1>
          <p className="auth-subtitle">
            {t.verificationSubtitle} <strong>{formData.phone}</strong>
          </p>

          <form onSubmit={handleVerificationSubmit} className="auth-form">
            <div className="input-group">
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                placeholder={t.codePlaceholder}
                className="verification-input"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              disabled={loading || verificationCode.length !== 6}
              className="btn btn-primary"
            >
              {loading ? 'Verifying...' : t.verify}
            </button>

            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => setStep('phone')}
            >
              {t.resend}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="app-logo">
          <Heart className="logo-icon" />
          TotoCare
        </div>
        
        <h1 className="auth-title">{t.title}</h1>
        <p className="auth-subtitle">{t.subtitle}</p>

        <div className="benefits-list">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <Shield className="benefit-icon" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handlePhoneSubmit} className="auth-form">
          <div className="input-group">
            <label>{t.nameLabel}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t.namePlaceholder}
              required
            />
          </div>

          <div className="input-group">
            <label>{t.parentType}</label>
            <div className="parent-options">
              <button
                type="button"
                className={`parent-option ${formData.profileType === 'mum' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, profileType: 'mum' })}
              >
                <span className="parent-icon">👩</span>
                {t.mum}
              </button>
              <button
                type="button"
                className={`parent-option ${formData.profileType === 'dad' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, profileType: 'dad' })}
              >
                <span className="parent-icon">👨</span>
                {t.dad}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label>{t.phoneLabel}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t.phonePlaceholder}
              required
            />
            <small>We'll send a verification code via WhatsApp</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={loading || !formData.phone || !formData.name}
            className="btn btn-whatsapp"
          >
            <Smartphone className="btn-icon" />
            {loading ? 'Sending...' : t.continue}
          </button>

          <div className="privacy-notice">
            {t.privacy}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhoneAuth;
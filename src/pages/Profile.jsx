import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useOffline } from '../contexts/OfflineContext';
import { babyService } from '../services/api';
import { User, Baby, Settings, Globe, Bell, Moon, LogOut, Save } from 'lucide-react';

const translations = {
  en: {
    title: "Profile & Settings",
    profile: "Your Profile",
    babyInfo: "Baby Information",
    preferences: "Preferences",
    name: "Name",
    phone: "Phone Number",
    parentType: "I am a",
    mum: "Mum",
    dad: "Dad",
    babyName: "Baby's Name",
    babyBirthDate: "Baby's Birth Date",
    babyGender: "Baby's Gender",
    male: "Male",
    female: "Female",
    unknown: "Prefer not to say",
    location: "Your Location",
    language: "Language",
    english: "English",
    swahili: "Swahili",
    notifications: "Push Notifications",
    darkMode: "Dark Mode",
    save: "Save Changes",
    saving: "Saving...",
    saved: "Changes saved successfully!",
    logout: "Log Out",
    confirmLogout: "Are you sure you want to log out?",
    addBaby: "Add Baby Information",
    updateBaby: "Update Baby Information",
    required: "Required",
    optional: "Optional"
  },
  sw: {
    title: "Wasifu na Mipangilio",
    profile: "Wasifu Wako",
    babyInfo: "Taarifa za Mtoto",
    preferences: "Mapendeleo",
    name: "Jina",
    phone: "Nambari ya Simu",
    parentType: "Mimi ni",
    mum: "Mama",
    dad: "Baba",
    babyName: "Jina la Mtoto",
    babyBirthDate: "Tarehe ya Kuzaliwa kwa Mtoto",
    babyGender: "Jinsia ya Mtoto",
    male: "Mwanaume",
    female: "Mwanamke",
    unknown: "Sipendi kusema",
    location: "Eneo Lako",
    language: "Lugha",
    english: "Kiingereza",
    swahili: "Kiswahili",
    notifications: "Arifa za Kusukuma",
    darkMode: "Hali ya Giza",
    save: "Hifadhi Mabadiliko",
    saving: "Inahifadhi...",
    saved: "Mabadiliko yamehifadhiwa kwa mafanikio!",
    logout: "Toka",
    confirmLogout: "Je, una uhakika unataka kutoka?",
    addBaby: "Ongeza Taarifa za Mtoto",
    updateBaby: "Sasisha Taarifa za Mtoto",
    required: "Inahitajika",
    optional: "Hiari"
  }
}  

const Profile = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <div className="profile-page">
      <h1>{t.title}</h1>

      <section>
        <h2>{t.profile}</h2>
        <p>{t.name}: {user?.name || "—"}</p>
        <p>{t.phone}: {user?.phone || "—"}</p>
      </section>

      <section>
        <h2>{t.preferences}</h2>
        <button onClick={logout}>{t.logout}</button>
      </section>
    </div>
  );
};

export default Profile;

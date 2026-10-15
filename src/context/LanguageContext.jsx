import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default ke bahasa saat ini (Bahasa Indonesia: 'id')
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem('user_language');
      return saved === 'en' ? 'en' : 'id';
    } catch {
      return 'id';
    }
  });

  const setLanguage = (lang) => {
    const validLang = lang === 'en' ? 'en' : 'id';
    setLanguageState(validLang);
    try {
      localStorage.setItem('user_language', validLang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  // Helper untuk mengambil data terjemahan berdasarkan bahasa aktif
  const t = translations[language] || translations.id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

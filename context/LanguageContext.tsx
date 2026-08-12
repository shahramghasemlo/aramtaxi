
import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.FA);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (lang === Language.EN) {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    } else {
      document.documentElement.lang = 'fa';
      document.documentElement.dir = 'rtl';
    }
  };

  const t = useCallback((key: string): string => {
    return translations[key]?.[language] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Language } from '../types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslations();

  const toggleLanguage = () => {
    const newLang = language === Language.FA ? Language.EN : Language.FA;
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 text-sm font-medium text-[#FFFFFF] bg-[#333333] hover:bg-[#444444] rounded-[12px] transition-all min-h-[44px]"
    >
      {language === Language.FA ? 'English' : 'فارسی'}
    </button>
  );
};

export default LanguageSwitcher;

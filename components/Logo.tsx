
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Page } from '../types';

interface LogoProps {
  onNavigate: (page: Page) => void;
}

const Logo: React.FC<LogoProps> = ({ onNavigate }) => {
    const { language } = useTranslations();
    const isRTL = language === 'fa';
  
  return (
    <button onClick={() => onNavigate(Page.Home)} className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 transition-colors hover:text-blue-600">
      <div className="flex items-center gap-2">
        <span className={isRTL ? 'font-bold' : 'font-light'}>آرام تاکسی</span>
        <span className="text-slate-400 font-sans text-xl md:text-2xl">Aram Taxi</span>
      </div>
    </button>
  );
};

export default Logo;


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
    <button onClick={() => onNavigate(Page.Home)} className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#FFFFFF] transition-colors hover:text-[#FFC107] max-w-full">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
        <span className={`truncate ${isRTL ? 'font-bold' : 'font-light'}`}>آرام تاکسی</span>
        <span className="hidden sm:inline text-[#BDBDBD] font-sans text-base md:text-xl whitespace-nowrap">Aram Taxi</span>
      </div>
    </button>
  );
};

export default Logo;

import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Page } from '../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslations();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold">آرام تاکسی | Aram Taxi</h3>
            <p className="mt-4 text-slate-300">{t('hero_subtitle')}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t('nav_home')}</h3>
            <ul className="mt-4 space-y-2">
              <li><button onClick={() => onNavigate(Page.Booking)} className="hover:text-blue-400 transition-colors">{t('nav_booking')}</button></li>
              <li><button onClick={() => onNavigate(Page.Services)} className="hover:text-blue-400 transition-colors">{t('nav_services')}</button></li>
              <li><button onClick={() => onNavigate(Page.About)} className="hover:text-blue-400 transition-colors">{t('nav_about')}</button></li>
              <li><button onClick={() => onNavigate(Page.Contact)} className="hover:text-blue-400 transition-colors">{t('nav_contact')}</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t('contact_info')}</h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>09123891181 (WhatsApp)</li>
              <li>09372800282</li>
              <li>ghasemloshahram@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Aram Taxi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
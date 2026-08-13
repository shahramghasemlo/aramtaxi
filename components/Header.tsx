import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Page } from '../types';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from '../hooks/useTranslations';
import { IconMenu } from './icons/IconMenu';
import { IconClose } from './icons/IconClose';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { page: Page.Home, label: t('nav_home') },
    { page: Page.Booking, label: t('nav_booking') },
    { page: Page.Services, label: t('nav_services') },
    { page: Page.About, label: t('nav_about') },
    { page: Page.Contact, label: t('nav_contact') },
  ];
  
  const handleMobileNavClick = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const mobileMenu = isMenuOpen
    ? createPortal(
        <div className="md:hidden fixed inset-0 z-[9999]" id="mobile-menu" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#1E1E1E] rounded-t-[20px] shadow-2xl pb-safe max-h-[85vh] overflow-y-auto">
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-[#444444]" />
            </div>
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleMobileNavClick(item.page)}
                  className={`block w-full text-start px-4 py-4 rounded-[16px] text-base font-medium transition-colors min-h-[56px] flex items-center ${
                    activePage === item.page ? 'bg-[#FFC107]/20 text-[#FFC107]' : 'text-[#BDBDBD] hover:bg-[#333333] hover:text-[#FFFFFF]'
                  }`}
                  aria-current={activePage === item.page ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-4 pb-6 border-t border-[#333333] px-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header className="sticky top-0 z-[100] bg-[#1E1E1E]/95 backdrop-blur-md border-b border-[#333333] pt-safe">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            <div className="flex-shrink min-w-0">
              <Logo onNavigate={onNavigate} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:space-x-8 md:rtl:space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`text-base font-medium transition-colors whitespace-nowrap ${
                    activePage === item.page ? 'text-[#FFC107]' : 'text-[#BDBDBD] hover:text-[#FFFFFF]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center flex-shrink-0">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-[12px] text-[#FFFFFF] bg-[#333333] hover:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                  aria-controls="mobile-menu"
                  aria-expanded={isMenuOpen}
                  aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
                >
                  {isMenuOpen ? (
                    <IconClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <IconMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
};

export default Header;

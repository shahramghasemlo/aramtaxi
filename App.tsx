import React, { useState, useCallback, useEffect } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);

  // Check URL hash for admin access
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setActivePage(Page.Admin);
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
    // Clear hash when navigating away from admin
    if (page !== Page.Admin && window.location.hash === '#admin') {
      window.location.hash = '';
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case Page.Home:
        return <HomePage onNavigate={handleNavigate} />;
      case Page.Booking:
        return <BookingPage />;
      case Page.Services:
        return <ServicesPage onNavigate={handleNavigate} />;
      case Page.About:
        return <AboutPage onNavigate={handleNavigate} />;
      case Page.Contact:
        return <ContactPage onNavigate={handleNavigate} />;
      case Page.Admin:
        return <AdminPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Admin page has its own layout without header/footer
  if (activePage === Page.Admin) {
    return (
      <LanguageProvider>
        <AdminPage onNavigate={handleNavigate} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen min-h-[100dvh] overflow-x-hidden">
        <Header activePage={activePage} onNavigate={handleNavigate} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </LanguageProvider>
  );
};

export default App;
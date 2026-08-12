import React from 'react';
import BookingForm from '../components/BookingForm';
import { useTranslations } from '../hooks/useTranslations';
import { Page } from '../types';
import { IconMap } from '../components/icons/IconMap';
import { IconClock } from '../components/icons/IconClock';
import { IconShield } from '../components/icons/IconShield';

// Image paths - using absolute paths from the public directory
const interiorImage = '/images/camry-taxi-interior.jpg';

// Premium hero video background
const heroVideoUrl = 'https://plugin-assets.open-design.ai/plugins/skyelite-private-jets/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238-86655b.mp4';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-[#1E1E1E] p-6 rounded-[20px] shadow-sm text-center min-h-[110px]">
    <div className="flex justify-center items-center mb-4">
      <div className="bg-[#FFC107]/20 text-[#FFC107] p-3 rounded-full">{icon}</div>
    </div>
    <h3 className="text-[18px] font-semibold text-[#FFFFFF] mb-2">{title}</h3>
    <p className="text-[#BDBDBD] text-[16px]">{description}</p>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslations();

  return (
    <div className="bg-transparent">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero Content */}
        <div className="relative h-full flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4 -mt-80">
              {/* Small uppercase label */}
              <p className="text-[14px] font-semibold text-[#BDBDBD] tracking-wider mb-4 uppercase">
                {t('hero_label') || 'AIRPORT TAXI'}
              </p>

              {/* Subtitle */}
              <p className="text-[18px] md:text-[20px] text-[#BDBDBD] mb-6 max-w-2xl mx-auto mt-6">
                {t('hero_subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate(Page.Services)}
                  className="w-full sm:w-auto h-[56px] px-8 rounded-[16px] bg-[#333333] text-[#FFFFFF] font-bold text-[16px] hover:bg-[#444444] transition-colors"
                >
                  {t('discover') || 'Discover'}
                </button>
                <button
                  onClick={() => onNavigate(Page.Booking)}
                  className="w-full sm:w-auto h-[56px] px-8 rounded-[16px] bg-[#FFC107] text-[#121212] font-bold text-[16px] hover:bg-[#FFB300] transition-colors"
                >
                  {t('book_now')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Booking Section */}
      <section className="py-16 md:py-24 -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <BookingForm isQuickForm={true} />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#121212] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-[#FFFFFF]">{t('features_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon={<IconShield className="w-8 h-8" />} title={t('feature_1_title')} description={t('feature_1_desc')} />
            <FeatureCard icon={<IconClock className="w-8 h-8" />} title={t('feature_2_title')} description={t('feature_2_desc')} />
            <FeatureCard icon={<IconMap className="w-8 h-8" />} title={t('feature_3_title')} description={t('feature_3_desc')} />
          </div>
        </div>
      </section>

      {/* About Us Section - Airport Taxi Services */}
      <section className="py-16 md:py-24 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="order-2 lg:order-1">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                درباره ما
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                سرویس تاکسی فرودگاه امام خمینی (ره)
                <br />
                <span className="text-blue-600">تجربه‌ای ایمن و راحت</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                ما در آرام تاکسی با سال‌ها تجربه در زمینه حمل و نقل فرودگاهی، تلاش می‌کنیم تا با ارائه خدمات تاکسی فرودگاه، تجربه‌ای ایمن، راحت و بی‌دغدغه را برای شما فراهم آوریم. سرویس ما به صورت شبانه‌روزی و در تمامی ۳۶۵ روز سال آماده خدمت‌رسانی است.
              </p>

              {/* Advantages */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">رانندگان مجرب و آموزش‌دیده</h4>
                    <p className="text-slate-600 text-sm">تمامی رانندگان دارای سابقه، کارت بهداشت و گواهینامه معتبر هستند</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">بیمه کامل مسافر و اموال</h4>
                    <p className="text-slate-600 text-sm">مسافران و اموال آن‌ها تحت پوشش بیمه کامل قرار دارند</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">نرخ شفاف و از پیش اعلام شده</h4>
                    <p className="text-slate-600 text-sm">هزینه‌ها شفاف هستند و هیچ هزینه پنهانی وجود ندارد</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">پایش لحظه‌ای پروازها</h4>
                    <p className="text-slate-600 text-sm">در صورت تأخیر یا زودتر رسیدن پرواز، زمان سرویس به‌روز می‌شود</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate(Page.Booking)}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                <span>رزرو آنلاین تاکسی</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Image/Cards Side */}
            <div className="order-1 lg:order-2">
              <div className="relative group perspective-1000">
                {/* Decorative background */}
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6" />

                {/* Main image container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
                  <img
                    src={interiorImage}
                    alt="کابین راحت تویوتا کمری"
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                    <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-white text-2xl font-bold mb-3">کابین لوکس و مدرن</h3>
                      <p className="text-white/90 text-lg mb-4">
                        تجربه‌ای متفاوت از آرامش و راحتی در طول سفر با تویوتا کمری
                      </p>

                      {/* Features badges */}
                      <div className="flex flex-wrap gap-3">
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          <span>❄️</span> تهویه مطبوع
                        </span>
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          <span>🎵</span> سیستم صوتی
                        </span>
                        <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          <span>✨</span> نظافت عالی
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

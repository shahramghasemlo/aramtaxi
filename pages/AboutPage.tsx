import React, { useEffect, useState } from 'react';
import { Page } from '../types';

interface AboutPageProps {
  onNavigate?: (page: Page) => void;
}

const aboutImages = [
  { src: '/images/logo5.jpeg', alt: 'آرام تاکسی' },
  { src: '/images/camry-taxi-interior.jpg', alt: 'کابین تاکسی آرام تاکسی' },
];

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-transparent font-sans">
      {/* Hero Banner */}
      <div className="relative bg-slate-900 text-white py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/logo3.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/80"></div>
        </div>
        <div className="relative container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            داستان ما، <span className="text-amber-400">تعهد به آرامش شماست</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            آرام تاکسی، پیشرو در ارائه خدمات لوکس و مطمئن فرودگاهی. ما فقط یک تاکسی نیستیم؛ همراه مطمئن سفرهای شما هستیم.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-amber-400">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-2xl">⚡</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">سرعت و دقت</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              زمان شما ارزشمندترین دارایی است. سیستم هوشمند ما و رانندگان متعهد، دقیق‌ترین زمان‌بندی را برای رسیدن به پرواز یا مقصد تضمین می‌کنند.
            </p>
          </div>

          {/* Value Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-blue-500">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-2xl">🛡️</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">امنیت مطلق</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              تمامی خودروها از نظر فنی به طور کامل چک می‌شوند و رانندگان ما از فیلترهای سخت‌گیرانه امنیتی و اخلاقی عبور کرده‌اند.
            </p>
          </div>

          {/* Value Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-green-500">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 text-2xl">💎</div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">کیفیت ممتاز</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              خودروهای لوکس، کابین تمیز و خوشبو، و برخورد محترمانه رانندگان، استانداردهای جدیدی از خدمت‌رسانی را تعریف می‌کنند.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold mb-6">درباره ما</div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight">
              چرا آرام تاکسی انتخاب اول مسافران حرفه‌ای است؟
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-loose text-justify">
              <p>
                آرام تاکسی با درک عمیق از دغدغه‌های مسافران فرودگاهی تاسیس شد. ما می‌دانیم که استرس رسیدن به موقع به پرواز یا خستگی پس از یک سفر طولانی، نیاز به راه‌حلی دارد که فراتر از یک جابجایی ساده باشد.
              </p>
              <p>
                ما مجموعه‌ای از بهترین‌ها را گرد هم آورده‌ایم: <strong>تویوتا کمری، رافور و ون‌های VIP</strong> برای راحتی شما، و رانندگانی که به اصول تشریفات و مهمان‌نوازی مسلط هستند. هدف ما این است که مسیر فرودگاه تا مقصد، آرام‌ترین بخش سفر شما باشد.
              </p>
              <p>
                با پشتیبانی ۲۴ ساعته واقعی، هیچ‌گاه شما را تنها نمی‌گذاریم. در هر ساعت از شبانه‌روز، در سرما و گرما، آرام تاکسی در کنار شماست.
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => onNavigate?.(Page.Contact)}
                className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-lg hover:shadow-xl"
              >
                تماس با ما
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-amber-200 rounded-3xl transform rotate-2"></div>
            <div className="relative rounded-2xl shadow-2xl w-full h-[500px] overflow-hidden">
              {aboutImages.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    index === activeImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            {/* Stats Overlay */}
            <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-xs">
              <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-4">
                <div className="text-4xl font-bold text-blue-600">۱۰+</div>
                <div className="text-sm font-semibold text-slate-600">سال تجربه درخشان</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-amber-500">۹۸٪</div>
                <div className="text-sm font-semibold text-slate-600">رضایت مشتریان</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

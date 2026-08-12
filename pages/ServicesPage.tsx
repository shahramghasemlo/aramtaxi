import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Page } from '../types';

interface ServiceItemProps {
  title: string;
  description: string;
  price?: string;
  luggageInfo?: string;
  features?: string[];
  image?: string;
  onBook?: () => void;
  isSpecial?: boolean;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, description, price, luggageInfo, features, image, onBook, isSpecial }) => {
  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${isSpecial ? 'shadow-2xl ring-2 ring-amber-400' : 'shadow-lg border border-slate-100'}`}>
      {isSpecial && (
        <div className="absolute top-0 right-0 bg-amber-400 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          پیشنهاد ویژه
        </div>
      )}

      {/* Image Placeholder or Icon Area */}
      <div className={`h-32 ${isSpecial ? 'bg-slate-800' : 'bg-slate-100'} flex items-center justify-center relative overflow-hidden`}>
        <div className={`text-5xl ${isSpecial ? 'text-amber-400' : 'text-slate-400'} group-hover:scale-110 transition-transform duration-500`}>
          {image || '🚖'}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 min-h-[40px]">{description}</p>

        {/* Features List */}
        {features && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-xs text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100">
          {price && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-slate-500">قیمت (تهران/فرودگاه):</span>
              <span className="text-lg font-bold text-blue-600">{price}</span>
            </div>
          )}

          {luggageInfo && (
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg">
              <span>🧳</span>
              <span>{luggageInfo}</span>
            </div>
          )}

          {onBook ? (
            <button
              onClick={onBook}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 ${isSpecial
                ? 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
            >
              رزرو آنلاین
            </button>
          ) : (
            <div className="text-center py-2 text-slate-400 text-sm font-medium">تماس جهت هماهنگی</div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ServicesPageProps {
  onNavigate: (page: Page) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { t } = useTranslations();

  return (
    <div className="bg-transparent min-h-screen">
      {/* Header */}
      <div className="relative bg-slate-900 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/logo1.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[2px]"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">خدمات ممتاز آرام تاکسی</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">انتخاب خودروی متناسب با نیاز شما، با تعرفه‌های شفاف و خدمات VIP</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 -mt-10">

        {/* Main Fleet Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-800">ناوگان حمل و نقل</h2>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceItem
              title="تویوتا کمری / رافور"
              description="محبوب‌ترین انتخاب مسافران فرودگاهی، ترکیبی از نرمی، سکوت و ایمنی بالا."
              price="۲،۰۰۰،۰۰۰ تومان"
              luggageInfo="۳ چمدان + ۲ کیف دستی"
              image="🚗"
              features={['تهویه مطبوع عالی', 'سیستم صوتی باکیفیت', 'صندلی‌های ارگونومیک']}
              onBook={() => onNavigate(Page.Booking)}
              isSpecial={true}
            />

            <ServiceItem
              title="رنو سفران"
              description="سدان اقتصادی و راحت برای سفرهای کم‌جمعیت."
              price="۱،۸۰۰،۰۰۰ تومان"
              luggageInfo="۲ چمدان + ۱ کیف دستی"
              image="🚙"
              features={['سواری نرم', 'فضای پای مناسب']}
              onBook={() => onNavigate(Page.Booking)}
            />

            <ServiceItem
              title="ون هیوندای / تویوتا"
              description="مناسب برای خانواده‌ها و گروه‌های پرجمعیت با بار زیاد."
              price="۲،۳۰۰،۰۰۰ تومان"
              luggageInfo="تا ۱۰ چمدان بزرگ"
              image="🚐"
              features={['ظرفیت تا ۱۰ نفر', 'سقف بلند', 'فضای بار اختصاصی']}
              onBook={() => onNavigate(Page.Booking)}
            />

            <ServiceItem
              title="سرویس تشریفات VIP"
              description="خودروهای لوکس (بنز، بی ام و) برای مهمانان ویژه."
              price="تماس بگیرید"
              luggageInfo="ظرفیت متغیر"
              image="✨"
              features={['راننده با لباس فرم', 'پذیرایی داخل خودرو', 'استقبال ویژه']}
              onBook={() => onNavigate(Page.Booking)}
            />
          </div>
          <p className="text-center mt-6 text-sm text-slate-500 bg-amber-50 inline-block px-4 py-2 rounded-full mx-auto border border-amber-100">
            ⚠️ هزینه طرح ترافیک و عوارض اتوبان بر عهده مسافر نمی‌باشد و در نرخ‌ها لحاظ شده است.
          </p>
        </div>

        {/* Special Services Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 center">خدمات جانبی</h2>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceItem
              title="استقبال با تابلو (CIP)"
              description="راننده با تابلوی نام شما در سالن پروازهای ورودی منتظر خواهد بود."
              price="۶۵۰،۰۰۰ تومان"
              image="👋"
              isSpecial={false}
            />
            <ServiceItem
              title="صندلی کودک"
              description="صندلی استاندارد ایزوفیکس برای ایمنی فرزند دلبند شما."
              price="۶۰۰،۰۰۰ تومان"
              image="👶"
            />
            <ServiceItem
              title="توقف در مسیر"
              description="امکان توقف کوتاه در مسیر یا چند مقصده بودن سفر."
              price="توافقی"
              image="📍"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
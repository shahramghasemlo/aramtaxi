
import React from 'react';
import BookingForm from '../components/BookingForm';

const BookingPage: React.FC = () => {
  return (
    <div className="bg-transparent min-h-screen font-sans">
      {/* Header */}
      <div className="relative bg-slate-900 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/logo2.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px]"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">رزرو آنلاین تاکسی فرودگاه</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            رزرو سریع و آسان در کمتر از ۲ دقیقه. تایید آنی و بدون معطلی.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Trust Indicators */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-sm text-amber-900 text-center">
            <div className="flex items-center justify-center gap-2">
              <span>✓</span>
              <span className="font-bold">تضمین کمترین قیمت</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-amber-300"></div>
            <div className="flex items-center justify-center gap-2">
              <span>✓</span>
              <span className="font-bold">کنسلی رایگان ۵ ساعت قبل ساعت حرکت</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-amber-300"></div>
            <div className="flex items-center justify-center gap-2">
              <span>✓</span>
              <span className="font-bold">پشتیبانی ۲۴ ساعته</span>
            </div>
          </div>

          <BookingForm />

          <p className="text-center mt-6 text-slate-500 text-sm">
            نیاز به راهنمایی دارید؟ با پشتیبانی ما تماس بگیرید: <a href="tel:09123891181" className="text-blue-600 font-bold dir-ltr">09123891181</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

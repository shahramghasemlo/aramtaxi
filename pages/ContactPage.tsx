import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { Page } from '../types';

interface ContactPageProps {
    onNavigate?: (page: Page) => void;
}

const ContactPage: React.FC<ContactPageProps> = () => {
    const { t } = useTranslations();

    return (
        <div className="relative min-h-screen font-sans">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: 'url(/images/logo4.jpeg)' }} />
            {/* Header */}
            <div className="relative bg-slate-900/95 text-white py-16 backdrop-blur-sm">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">تماس با آرام تاکسی</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        پشتیبان شما در ۲۴ ساعت شبانه‌روز، ۷ روز هفته. صدای شما برای ما ارزشمند است.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Contact Info Card */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-8 border-b border-blue-400/30 pb-4">راه‌های ارتباطی مستقیم</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">📞</div>
                                    <div>
                                        <h3 className="font-semibold text-blue-100 mb-1">تلفن‌های رزرو فوری</h3>
                                        <p className="font-mono text-lg dir-ltr text-right"><a href="tel:09123891181" className="hover:text-amber-300 transition-colors">0912-389-1181</a></p>
                                        <p className="font-mono text-lg dir-ltr text-right"><a href="tel:09372800282" className="hover:text-amber-300 transition-colors">0937-280-0282</a></p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">💬</div>
                                    <div>
                                        <h3 className="font-semibold text-blue-100 mb-1">پیام‌رسان‌ها (واتساپ/تلگرام)</h3>
                                        <p className="text-sm text-blue-200 mb-2">برای ارسال لوکیشن یا هماهنگی آنلاین</p>
                                        <a href="https://wa.me/989123891181" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                            ارسال پیام در واتساپ
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">📧</div>
                                    <div>
                                        <h3 className="font-semibold text-blue-100 mb-1">پست الکترونیک</h3>
                                        <a href="mailto:ghasemloshahram@gmail.com" className="font-mono text-sm hover:text-amber-300 transition-colors">ghasemloshahram@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 bg-white/5 p-4 rounded-xl">
                            <p className="text-sm text-blue-100 text-center">
                                "پاسخگویی به تماس‌ها در تمام ساعات شبانه‌روز انجام می‌شود."
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">ارسال پیام یا انتقاد</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">نام و نام خانوادگی</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" placeholder="مثال: علی محمدی" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">شماره تماس</label>
                                    <input type="tel" id="phone" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" placeholder="مثال: ۰۹۱۲xxxxxxx" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">موضوع پیام</label>
                                <select id="subject" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-600">
                                    <option value="general">سوال عمومی</option>
                                    <option value="booking">پیگیری رزرو</option>
                                    <option value="complaint">انتقاد یا شکایت</option>
                                    <option value="cooperation">پیشنهاد همکاری</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">متن پیام</label>
                                <textarea id="message" rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" placeholder="پیام خود را اینجا بنویسید..."></textarea>
                            </div>

                            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                                ارسال پیام
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
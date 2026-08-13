import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';

const BookingForm: React.FC<{ isQuickForm?: boolean }> = ({ isQuickForm = false }) => {
  const { t } = useTranslations();

  // State for form fields
  const [tripType, setTripType] = useState('tehran_to_airport');
  const [address, setAddress] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [flightTime, setFlightTime] = useState('');
  const [carType, setCarType] = useState(t('car_safrane'));
  const [passengers, setPassengers] = useState('1');
  const [luggageCount, setLuggageCount] = useState('1');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tripTypeDisplay = tripType === 'tehran_to_airport' ? t('tehran_to_airport') : t('airport_to_tehran');

    let message = `*درخواست رزرو جدید از وب‌سایت آرام تاکسی*\n\n`;
    message += `*مسیر سفر:* ${tripTypeDisplay}\n`;
    message += `*آدرس دقیق:* ${address || '---'}\n`;
    const formattedDate = flightDate || '---';

    message += `*تاریخ پرواز:* ${formattedDate}\n`;
    message += `*ساعت حرکت:* ${flightTime || '---'}\n`;
    message += `*نوع خودرو:* ${carType}\n`;
    message += `*تعداد مسافر:* ${passengers}\n`;
    message += `*تعداد چمدان:* ${luggageCount}\n`;

    if (!isQuickForm) {
        message += `\n-------------------\n\n`;
        message += `*نام مسافر:* ${fullName || '---'}\n`;
        message += `*شماره تماس:* ${phoneNumber || '---'}\n`;
        message += `*درخواست‌های ویژه:* ${specialRequests || 'ندارد'}\n`;
    }
    
    message += `\n\n_این پیام به صورت خودکار از وب‌سایت آرام تاکسی ارسال شده است._`;

    const whatsappNumber = "989123891181"; // Iran country code + number without leading 0
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className={`bg-[#1E1E1E] p-4 sm:p-6 rounded-[20px] shadow-lg ${isQuickForm ? '' : 'w-full max-w-4xl mx-auto'}`}>
      <h2 className="text-[22px] font-semibold text-[#FFFFFF] mb-6 text-center">{t('booking_title')}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1: Trip Type */}
        <div className="md:col-span-2">
          <label htmlFor="trip_type" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('trip_type')}</label>
          <select 
            id="trip_type" 
            value={tripType} 
            onChange={(e) => setTripType(e.target.value)} 
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors"
          >
            <option value="tehran_to_airport">{t('tehran_to_airport')}</option>
            <option value="airport_to_tehran">{t('airport_to_tehran')}</option>
          </select>
        </div>

        {/* Row 2: Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('address_tehran')}</label>
          <input 
            type="text" 
            id="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder={t('address_placeholder')} 
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] placeholder-[#BDBDBD] focus:outline-none focus:border-[#FFC107] transition-colors" 
          />
        </div>
        
        {/* Row 3 */}
        <div>
          <label htmlFor="flight_date" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('flight_date')}</label>
          <input
            type="date"
            id="flight_date"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="flight_time" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('flight_time')}</label>
          <input 
            type="time" 
            id="flight_time" 
            value={flightTime} 
            onChange={(e) => setFlightTime(e.target.value)} 
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors" 
          />
        </div>

        <div className="md:col-span-2">
          <p className="text-[13px] text-[#FFC107]/90 flex items-center gap-2">
            <span>✓</span>
            <span>{t('free_cancellation_note')}</span>
          </p>
        </div>

        {/* Row 4 */}
        <div>
          <label htmlFor="passengers" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('passengers')}</label>
          <input 
            type="number" 
            id="passengers" 
            min="1" 
            value={passengers} 
            onChange={(e) => setPassengers(e.target.value)} 
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors" 
          />
        </div>
        <div>
          <label htmlFor="luggage_count" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('luggage_count')}</label>
          <input 
            type="number" 
            id="luggage_count" 
            min="0" 
            value={luggageCount} 
            onChange={(e) => setLuggageCount(e.target.value)} 
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors" 
          />
        </div>

        {/* Row 5: Car Type */}
        <div className="md:col-span-2">
          <label htmlFor="car_type" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('car_type')}</label>
          <select 
            id="car_type" 
            value={carType} 
            onChange={(e) => setCarType(e.target.value)} 
            className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors"
          >
            <option>{t('car_safrane')}</option>
            <option>{t('car_camry')}</option>
            <option>{t('car_rav4')}</option>
            <option>{t('car_van')}</option>
          </select>
        </div>
        
        {!isQuickForm && (
          <>
            <div className="md:col-span-1">
              <label htmlFor="full_name" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('full_name')}</label>
              <input 
                type="text" 
                id="full_name" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors" 
              />
            </div>
            <div className="md:col-span-1">
              <label htmlFor="phone_number" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('phone_number')}</label>
              <input 
                type="tel" 
                id="phone_number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] focus:outline-none focus:border-[#FFC107] transition-colors" 
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="special_requests" className="block text-[14px] font-medium text-[#BDBDBD] mb-2">{t('special_requests')}</label>
              <textarea 
                id="special_requests" 
                rows={3} 
                placeholder={t('request_placeholder')} 
                value={specialRequests} 
                onChange={(e) => setSpecialRequests(e.target.value)} 
                className="w-full min-h-[56px] px-4 py-3 bg-[#1E1E1E] border border-[#333333] rounded-[16px] text-[16px] text-[#FFFFFF] placeholder-[#BDBDBD] focus:outline-none focus:border-[#FFC107] transition-colors resize-none"
              ></textarea>
            </div>
          </>
        )}
        
        {/* Submit */}
        <div className="md:col-span-2">
          <button 
            type="submit" 
            className="w-full h-[56px] mt-4 bg-[#FFC107] hover:bg-[#FFB300] text-[#121212] font-bold text-[16px] rounded-[16px] shadow-md transition-colors"
          >
            {t('submit_booking')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
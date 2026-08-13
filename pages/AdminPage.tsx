import React, { useState } from 'react';
import { Page } from '../types';

// Types
interface Trip {
  id: string;
  passengerName: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  time: string;
  carType: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  carModel: string;
  plateNumber: string;
  status: 'active' | 'inactive';
  totalTrips: number;
  rating: number;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
}

// Mock Data
const mockTrips: Trip[] = [
  { id: '1', passengerName: 'علی محمدی', phone: '09121234567', from: 'تهران', to: 'فرودگاه امام', date: '1403/05/15', time: '08:30', carType: 'تویوتا کمری', status: 'confirmed', price: 2000000 },
  { id: '2', passengerName: 'مریم احمدی', phone: '09129876543', from: 'فرودگاه امام', to: 'تهران', date: '1403/05/15', time: '14:00', carType: 'رنو سفران', status: 'pending', price: 1800000 },
  { id: '3', passengerName: 'رضا کریمی', phone: '09125556677', from: 'تهران', to: 'فرودگاه امام', date: '1403/05/14', time: '22:15', carType: 'ون', status: 'completed', price: 2300000 },
];

const mockDrivers: Driver[] = [
  { id: '1', name: 'حسن رضایی', phone: '09121112233', carModel: 'تویوتا کمری', plateNumber: '12 ب 345 ایران 67', status: 'active', totalTrips: 156, rating: 4.8 },
  { id: '2', name: 'محمد حسینی', phone: '09124445566', carModel: 'رنو سفران', plateNumber: '34 ج 567 ایران 89', status: 'active', totalTrips: 89, rating: 4.5 },
  { id: '3', name: 'احمد موسوی', phone: '09127778899', carModel: 'ون تویوتا', plateNumber: '56 د 789 ایران 12', status: 'inactive', totalTrips: 234, rating: 4.9 },
];

const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 2000000, description: 'سفر تهران به فرودگاه - علی محمدی', date: '1403/05/15', category: 'سفر' },
  { id: '2', type: 'expense', amount: 500000, description: 'بنزین خودرو 12 ب 345', date: '1403/05/15', category: 'سوخت' },
  { id: '3', type: 'income', amount: 1800000, description: 'سفر فرودگاه به تهران - مریم احمدی', date: '1403/05/14', category: 'سفر' },
];

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: 'bg-[#FF9800]/20', text: 'text-[#FF9800]', label: 'در انتظار' },
    confirmed: { bg: 'bg-[#4CAF50]/20', text: 'text-[#4CAF50]', label: 'تأیید شده' },
    completed: { bg: 'bg-[#2196F3]/20', text: 'text-[#2196F3]', label: 'تکمیل شده' },
    cancelled: { bg: 'bg-[#F44336]/20', text: 'text-[#F44336]', label: 'لغو شده' },
    active: { bg: 'bg-[#4CAF50]/20', text: 'text-[#4CAF50]', label: 'فعال' },
    inactive: { bg: 'bg-[#F44336]/20', text: 'text-[#F44336]', label: 'غیرفعال' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-[14px] font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Stat Card Component
const StatCard: React.FC<{ title: string; value: string; icon: string; trend?: string; trendUp?: boolean }> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-[#1E1E1E] rounded-[20px] p-6 min-h-[110px]">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[#BDBDBD] text-[14px] mb-2">{title}</p>
        <p className="text-[#FFFFFF] text-[32px] font-bold">{value}</p>
        {trend && (
          <p className={`text-[14px] mt-2 ${trendUp ? 'text-[#4CAF50]' : 'text-[#F44336]'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="text-[40px]">{icon}</div>
    </div>
  </div>
);

// Quick Action Button
const QuickAction: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#1E1E1E] rounded-[20px] p-6 min-h-[110px] flex flex-col items-center justify-center gap-3 hover:bg-[#2A2A2A] transition-colors w-full"
  >
    <span className="text-[40px]">{icon}</span>
    <span className="text-[#FFFFFF] text-[16px] font-medium">{label}</span>
  </button>
);

// Tab Button
const TabButton: React.FC<{ active: boolean; label: string; icon: string; onClick: () => void }> = ({ active, label, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-4 py-2 sm:py-3 rounded-[12px] sm:rounded-[16px] transition-colors min-h-[56px] flex-1 min-w-0 ${
      active ? 'bg-[#FFC107] text-[#121212]' : 'text-[#BDBDBD] hover:bg-[#2A2A2A] hover:text-[#FFFFFF]'
    }`}
  >
    <span className="text-[20px] sm:text-[24px] leading-none">{icon}</span>
    <span className="font-medium text-[10px] sm:text-[14px] leading-tight text-center truncate w-full">{label}</span>
  </button>
);

const ADMIN_PASSWORD = '135600';

const AdminPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trips' | 'drivers' | 'finance' | 'settings'>('dashboard');
  const [showAddTrip, setShowAddTrip] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('رمز عبور اشتباه است');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <div className="bg-[#1E1E1E] rounded-[20px] p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-[64px] mb-4">🔐</div>
            <h1 className="text-[28px] font-bold text-[#FFFFFF]">پنل مدیریت</h1>
            <p className="text-[#BDBDBD] text-[16px] mt-2">آرام تاکسی</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[14px] text-[#BDBDBD] mb-2">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107] text-center tracking-widest"
                placeholder="••••••"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-[#F44336] text-[14px] text-center">{error}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full h-[56px] bg-[#FFC107] text-[#121212] rounded-[16px] font-bold text-[16px] hover:bg-[#FFB300] transition-colors"
            >
              ورود به پنل
            </button>

            <button
              onClick={() => onNavigate(Page.Home)}
              className="w-full h-[56px] bg-[#333333] text-[#FFFFFF] rounded-[16px] font-medium text-[16px] hover:bg-[#444444] transition-colors"
            >
              بازگشت به سایت
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const todayRevenue = mockTransactions
    .filter(t => t.type === 'income' && t.date === '1403/05/15')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthRevenue = mockTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const activeTrips = mockTrips.filter(t => t.status === 'confirmed' || t.status === 'pending').length;
  const activeDrivers = mockDrivers.filter(d => d.status === 'active').length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  return (
    <div className="min-h-screen bg-[#121212] pb-24">
      {/* Header */}
      <div className="bg-[#1E1E1E] border-b border-[#333333] px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold text-[#FFFFFF]">پنل مدیریت</h1>
            <p className="text-[#BDBDBD] text-[14px] mt-1">آرام تاکسی - داشبورد مدیریت</p>
          </div>
          <button
            onClick={() => onNavigate(Page.Home)}
            className="px-4 py-2 bg-[#333333] text-[#FFFFFF] rounded-[16px] text-[14px] hover:bg-[#444444] transition-colors"
          >
            مشاهده سایت
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-l from-[#FFC107]/20 to-[#FFC107]/5 rounded-[20px] p-6">
              <h2 className="text-[22px] font-semibold text-[#FFFFFF]">خوش آمدید، مدیر عزیز 👋</h2>
              <p className="text-[#BDBDBD] text-[16px] mt-2">امروز {new Date().toLocaleDateString('fa-IR')} است</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="درآمد امروز"
                value={formatPrice(todayRevenue)}
                icon="💰"
                trend="12% نسبت به دیروز"
                trendUp={true}
              />
              <StatCard
                title="درآمد این ماه"
                value={formatPrice(monthRevenue)}
                icon="📊"
                trend="8% نسبت به ماه قبل"
                trendUp={true}
              />
              <StatCard
                title="سفرهای فعال"
                value={activeTrips.toString()}
                icon="🚗"
              />
              <StatCard
                title="رانندگان فعال"
                value={activeDrivers.toString()}
                icon="👨‍✈️"
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-[22px] font-semibold text-[#FFFFFF] mb-4">دسترسی سریع</h3>
              <div className="grid grid-cols-2 gap-4">
                <QuickAction icon="➕" label="ثبت سرویس" onClick={() => setShowAddTrip(true)} />
                <QuickAction icon="👤" label="ثبت راننده" onClick={() => setShowAddDriver(true)} />
                <QuickAction icon="💵" label="ثبت هزینه" onClick={() => {}} />
                <QuickAction icon="🧾" label="چاپ رسید" onClick={() => {}} />
                <QuickAction icon="📈" label="گزارش روزانه" onClick={() => {}} />
                <QuickAction icon="📉" label="گزارش ماهانه" onClick={() => {}} />
              </div>
            </div>

            {/* Active Trips */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[22px] font-semibold text-[#FFFFFF]">سفرهای فعال</h3>
                <button className="text-[#FFC107] text-[14px]">مشاهده همه</button>
              </div>
              <div className="space-y-3">
                {mockTrips.filter(t => t.status !== 'completed').map((trip) => (
                  <div key={trip.id} className="bg-[#1E1E1E] rounded-[20px] p-4 min-h-[64px]">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#FFFFFF] font-medium text-[16px]">{trip.passengerName}</span>
                          <StatusBadge status={trip.status} />
                        </div>
                        <p className="text-[#BDBDBD] text-[14px]">{trip.from} ← {trip.to}</p>
                        <p className="text-[#BDBDBD] text-[14px]">{trip.date} - {trip.time}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-[#FFC107] font-bold text-[18px]">{formatPrice(trip.price)}</p>
                        <p className="text-[#BDBDBD] text-[14px]">{trip.carType}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[22px] font-semibold text-[#FFFFFF]">تراکنش‌های اخیر</h3>
                <button className="text-[#FFC107] text-[14px]">مشاهده همه</button>
              </div>
              <div className="space-y-3">
                {mockTransactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="bg-[#1E1E1E] rounded-[20px] p-4 min-h-[64px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[24px] ${
                        transaction.type === 'income' ? 'bg-[#4CAF50]/20' : 'bg-[#F44336]/20'
                      }`}>
                        {transaction.type === 'income' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="text-[#FFFFFF] font-medium text-[16px]">{transaction.description}</p>
                        <p className="text-[#BDBDBD] text-[14px]">{transaction.date} - {transaction.category}</p>
                      </div>
                    </div>
                    <p className={`font-bold text-[18px] ${transaction.type === 'income' ? 'text-[#4CAF50]' : 'text-[#F44336]'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatPrice(transaction.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trips Tab */}
        {activeTab === 'trips' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-[#FFFFFF]">مدیریت سفرها</h2>
              <button
                onClick={() => setShowAddTrip(true)}
                className="px-6 py-3 bg-[#FFC107] text-[#121212] rounded-[16px] font-bold text-[16px] hover:bg-[#FFB300] transition-colors"
              >
                + ثبت سفر جدید
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['همه', 'در انتظار', 'تأیید شده', 'تکمیل شده', 'لغو شده'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-[#1E1E1E] text-[#BDBDBD] rounded-full text-[14px] whitespace-nowrap hover:bg-[#2A2A2A] transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Trips List */}
            <div className="space-y-3">
              {mockTrips.map((trip) => (
                <div key={trip.id} className="bg-[#1E1E1E] rounded-[20px] p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-[#FFFFFF] font-semibold text-[18px]">{trip.passengerName}</h4>
                      <p className="text-[#BDBDBD] text-[14px]">{trip.phone}</p>
                    </div>
                    <StatusBadge status={trip.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[14px]">
                    <div>
                      <p className="text-[#BDBDBD]">مبدا</p>
                      <p className="text-[#FFFFFF]">{trip.from}</p>
                    </div>
                    <div>
                      <p className="text-[#BDBDBD]">مقصد</p>
                      <p className="text-[#FFFFFF]">{trip.to}</p>
                    </div>
                    <div>
                      <p className="text-[#BDBDBD]">تاریخ و ساعت</p>
                      <p className="text-[#FFFFFF]">{trip.date} - {trip.time}</p>
                    </div>
                    <div>
                      <p className="text-[#BDBDBD]">خودرو</p>
                      <p className="text-[#FFFFFF]">{trip.carType}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#333333]">
                    <p className="text-[#FFC107] font-bold text-[20px]">{formatPrice(trip.price)}</p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#333333] text-[#FFFFFF] rounded-[12px] text-[14px]">ویرایش</button>
                      <button className="px-4 py-2 bg-[#4CAF50] text-[#FFFFFF] rounded-[12px] text-[14px]">تأیید</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-[#FFFFFF]">مدیریت رانندگان</h2>
              <button
                onClick={() => setShowAddDriver(true)}
                className="px-6 py-3 bg-[#FFC107] text-[#121212] rounded-[16px] font-bold text-[16px] hover:bg-[#FFB300] transition-colors"
              >
                + ثبت راننده جدید
              </button>
            </div>

            <div className="space-y-3">
              {mockDrivers.map((driver) => (
                <div key={driver.id} className="bg-[#1E1E1E] rounded-[20px] p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#333333] rounded-full flex items-center justify-center text-[28px]">
                        👨‍✈️
                      </div>
                      <div>
                        <h4 className="text-[#FFFFFF] font-semibold text-[18px]">{driver.name}</h4>
                        <p className="text-[#BDBDBD] text-[14px]">{driver.phone}</p>
                      </div>
                    </div>
                    <StatusBadge status={driver.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[14px] mt-4">
                    <div>
                      <p className="text-[#BDBDBD]">خودرو</p>
                      <p className="text-[#FFFFFF]">{driver.carModel}</p>
                    </div>
                    <div>
                      <p className="text-[#BDBDBD]">پلاک</p>
                      <p className="text-[#FFFFFF]">{driver.plateNumber}</p>
                    </div>
                    <div>
                      <p className="text-[#BDBDBD]">تعداد سفر</p>
                      <p className="text-[#FFFFFF]">{driver.totalTrips} سفر</p>
                    </div>
                    <div>
                      <p className="text-[#BDBDBD]">امتیاز</p>
                      <p className="text-[#FFC107]">⭐ {driver.rating}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[#333333]">
                    <button className="flex-1 py-3 bg-[#333333] text-[#FFFFFF] rounded-[12px] text-[14px]">ویرایش</button>
                    <button className="flex-1 py-3 bg-[#2196F3] text-[#FFFFFF] rounded-[12px] text-[14px]">تماس</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finance Tab */}
        {activeTab === 'finance' && (
          <div className="space-y-4">
            <h2 className="text-[22px] font-semibold text-[#FFFFFF]">مدیریت مالی</h2>

            {/* Finance Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#4CAF50]/20 rounded-[20px] p-4">
                <p className="text-[#4CAF50] text-[14px]">درآمد کل</p>
                <p className="text-[#FFFFFF] text-[24px] font-bold mt-1">{formatPrice(monthRevenue)}</p>
              </div>
              <div className="bg-[#F44336]/20 rounded-[20px] p-4">
                <p className="text-[#F44336] text-[14px]">هزینه کل</p>
                <p className="text-[#FFFFFF] text-[24px] font-bold mt-1">{formatPrice(500000)}</p>
              </div>
            </div>

            {/* Transactions */}
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="bg-[#1E1E1E] rounded-[20px] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[24px] ${
                      transaction.type === 'income' ? 'bg-[#4CAF50]/20' : 'bg-[#F44336]/20'
                    }`}>
                      {transaction.type === 'income' ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="text-[#FFFFFF] font-medium text-[16px]">{transaction.description}</p>
                      <p className="text-[#BDBDBD] text-[14px]">{transaction.date} - {transaction.category}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-[18px] ${transaction.type === 'income' ? 'text-[#4CAF50]' : 'text-[#F44336]'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatPrice(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h2 className="text-[22px] font-semibold text-[#FFFFFF]">تنظیمات</h2>

            <div className="space-y-3">
              {[
                { icon: '🔔', label: 'اعلان‌ها', desc: 'مدیریت اعلان‌های پیامکی و ایمیلی' },
                { icon: '💰', label: 'تعرفه‌ها', desc: 'تغییر قیمت‌های سفر' },
                { icon: '🚗', label: 'خودروها', desc: 'مدیریت ناوگان خودرویی' },
                { icon: '👥', label: 'کاربران', desc: 'مدیریت دسترسی کاربران' },
                { icon: '📊', label: 'گزارش‌ها', desc: 'تنظیمات گزارش‌گیری خودکار' },
                { icon: '🔒', label: 'امنیت', desc: 'تغییر رمز عبور و امنیت' },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full bg-[#1E1E1E] rounded-[20px] p-4 flex items-center gap-4 hover:bg-[#2A2A2A] transition-colors min-h-[64px]"
                >
                  <span className="text-[32px]">{item.icon}</span>
                  <div className="text-right flex-1">
                    <p className="text-[#FFFFFF] font-medium text-[16px]">{item.label}</p>
                    <p className="text-[#BDBDBD] text-[14px]">{item.desc}</p>
                  </div>
                  <span className="text-[#BDBDBD]">←</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1E1E1E] border-t border-[#333333] px-2 sm:px-4 py-2 pb-safe">
        <div className="flex gap-1 sm:gap-2 max-w-3xl mx-auto">
          <TabButton
            active={activeTab === 'dashboard'}
            label="داشبورد"
            icon="📊"
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton
            active={activeTab === 'trips'}
            label="سفرها"
            icon="🚗"
            onClick={() => setActiveTab('trips')}
          />
          <TabButton
            active={activeTab === 'drivers'}
            label="رانندگان"
            icon="👨‍✈️"
            onClick={() => setActiveTab('drivers')}
          />
          <TabButton
            active={activeTab === 'finance'}
            label="مالی"
            icon="💰"
            onClick={() => setActiveTab('finance')}
          />
          <TabButton
            active={activeTab === 'settings'}
            label="تنظیمات"
            icon="⚙️"
            onClick={() => setActiveTab('settings')}
          />
        </div>
      </div>

      {/* Add Trip Modal */}
      {showAddTrip && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddTrip(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[#1E1E1E] rounded-t-[20px] p-6 pb-safe max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[22px] font-semibold text-[#FFFFFF]">ثبت سفر جدید</h3>
              <button onClick={() => setShowAddTrip(false)} className="text-[#BDBDBD] text-[24px]">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">نام مسافر</label>
                <input type="text" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">شماره تماس</label>
                <input type="tel" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#BDBDBD] mb-2">مبدا</label>
                  <input type="text" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
                </div>
                <div>
                  <label className="block text-[14px] text-[#BDBDBD] mb-2">مقصد</label>
                  <input type="text" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#BDBDBD] mb-2">تاریخ</label>
                  <input type="date" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
                </div>
                <div>
                  <label className="block text-[14px] text-[#BDBDBD] mb-2">ساعت</label>
                  <input type="time" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
                </div>
              </div>
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">نوع خودرو</label>
                <select className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]">
                  <option>تویوتا کمری</option>
                  <option>رنو سفران</option>
                  <option>ون</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">قیمت (تومان)</label>
                <input type="number" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <button className="w-full h-[56px] bg-[#FFC107] text-[#121212] rounded-[16px] font-bold text-[16px] hover:bg-[#FFB300] transition-colors mt-4">
                ثبت سفر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddDriver && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddDriver(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[#1E1E1E] rounded-t-[20px] p-6 pb-safe max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[22px] font-semibold text-[#FFFFFF]">ثبت راننده جدید</h3>
              <button onClick={() => setShowAddDriver(false)} className="text-[#BDBDBD] text-[24px]">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">نام و نام خانوادگی</label>
                <input type="text" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">شماره تماس</label>
                <input type="tel" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">مدل خودرو</label>
                <input type="text" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <div>
                <label className="block text-[14px] text-[#BDBDBD] mb-2">شماره پلاک</label>
                <input type="text" className="w-full min-h-[56px] px-4 bg-[#121212] border border-[#333333] rounded-[16px] text-[#FFFFFF] text-[16px] focus:outline-none focus:border-[#FFC107]" />
              </div>
              <button className="w-full h-[56px] bg-[#FFC107] text-[#121212] rounded-[16px] font-bold text-[16px] hover:bg-[#FFB300] transition-colors mt-4">
                ثبت راننده
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

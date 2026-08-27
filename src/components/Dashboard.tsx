import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { vipTiers } from '../data/mockData';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Zap, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  Send, 
  Smartphone, 
  SlidersHorizontal, 
  Crown, 
  TrendingUp, 
  Volume2, 
  ChevronRight, 
  Clock, 
  Award,
  Sparkles,
  CheckCircle2,
  Percent,
  RefreshCw,
  Gift
} from 'lucide-react';

interface DashboardProps {
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenApkModal: () => void;
  onOpenAuthModal?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onOpenDeposit,
  onOpenWithdraw,
  onOpenApkModal,
  onOpenAuthModal,
}) => {
  const { currentUser, products, systemSettings, lang, setActiveTab, completeTask } = useApp();

  const [tickerIndex, setTickerIndex] = useState(0);

  // Live real-time payouts activity ticker
  const liveActivities = [
    { phone: '01712***', action: lang === 'bn' ? 'বিকাশে ৳২,৫০০ উইথড্র সম্পন্ন করেছে' : 'withdrew ৳2,500 via bKash', time: '1 min ago' },
    { phone: '01631***', action: lang === 'bn' ? 'Sony Headphone অর্ডারে ৳১৯২ কমিশন পেয়েছে' : 'earned ৳192 on Sony Order', time: '2 mins ago' },
    { phone: '01995***', action: lang === 'bn' ? 'নগদে ৳৫,০০০ ডিপোজিট সম্পন্ন করেছে' : 'deposited ৳5,000 via Nagad', time: '3 mins ago' },
    { phone: '01844***', action: lang === 'bn' ? 'Apple Watch অর্ডারে ৳১১২ কমিশন পেয়েছে' : 'earned ৳112 on Apple Watch', time: '4 mins ago' },
    { phone: '01533***', action: lang === 'bn' ? 'রকেটে ৳৩,০০০ উইথড্র পেয়েছে' : 'withdrew ৳3,000 via Rocket', time: '6 mins ago' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % liveActivities.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentVip = vipTiers.find(v => v.level === (currentUser?.vipLevel || 1)) || vipTiers[0];
  const nextVip = vipTiers.find(v => v.level === (currentUser?.vipLevel || 1) + 1);

  return (
    <div className="space-y-4 pb-20 max-w-5xl mx-auto">
      
      {/* Notice Board Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs text-slate-300 shadow-sm overflow-hidden">
        <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
        <div className="overflow-hidden whitespace-nowrap w-full">
          <p className="animate-marquee font-medium text-slate-200">
            {lang === 'bn' ? systemSettings.noticeTextBn : systemSettings.noticeText}
          </p>
        </div>
      </div>

      {/* Prominent Quick App Install & Share Card for Users */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/40 border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/30 shrink-0">
            <Smartphone className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-100">
                {lang === 'bn' ? 'ফোনে ১-ক্লিকে অ্যাপ সেট করুন' : 'Install Onlineshopearning App'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                EASY
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'bn' 
                ? 'কোনো জটিল ডাউনলোড ছাড়াই সরাসরি আপনার ফোনের হোম স্ক্রিনে অ্যাপ আকারে যুক্ত করুন।'
                : '1-tap install directly on your Android phone home screen.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('apk')}
          id="dashboard-install-app-banner-btn"
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 stroke-[3]" />
          <span>{lang === 'bn' ? 'অ্যাপ ডাউনলোড ও ইনস্টল' : 'Install App on Phone'}</span>
        </button>
      </div>

      {/* Hero Wallet Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-750 p-5 sm:p-6 shadow-2xl">
        
        {/* Glow backdrop decorative */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          
          {/* Top Bar inside wallet: User Greeting & VIP Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
                {currentUser ? (currentUser.role === 'admin' ? '👑' : currentUser.name?.charAt(0) || 'U') : '👤'}
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-100 flex items-center gap-1.5">
                  <span>{currentUser ? currentUser.name : (lang === 'bn' ? 'লগইন করা নেই' : 'Not Logged In')}</span>
                </h2>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{currentUser ? currentUser.phone : (lang === 'bn' ? 'একাউন্টে প্রবেশ করুন' : 'Sign in to your account')}</span>
                  {currentUser?.kycStatus === 'verified' && (
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      KYC Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Login Button or VIP Tier Badge */}
            {currentUser ? (
              <div 
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1 rounded-xl bg-gradient-to-r ${currentVip.badgeColor} text-white font-black text-xs shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>VIP {currentVip.level}</span>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 animate-pulse transition-all"
              >
                <span>{lang === 'bn' ? '🔑 লগইন করুন' : '🔑 Log In'}</span>
              </button>
            )}
          </div>

          {/* Balance Numbers */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 block mb-0.5">
              {lang === 'bn' ? 'মোট উত্তোলনযোগ্য ব্যালেন্স (Available Balance)' : 'Total Available Balance'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                ৳{(currentUser?.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold text-slate-400">BDT</span>
            </div>
          </div>

          {/* Income Highlights Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'আজকের আয়:' : "Today's Income:"}</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                +৳{(currentUser?.todayEarning || 0).toFixed(2)}
              </span>
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'সর্বমোট আয়:' : 'Total Earned:'}</span>
              <span className="text-xs sm:text-sm font-extrabold text-teal-300">
                ৳{(currentUser?.totalEarning || 0).toFixed(2)}
              </span>
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'মোট উত্তোলন:' : 'Withdrawn:'}</span>
              <span className="text-xs sm:text-sm font-extrabold text-cyan-300">
                ৳{(currentUser?.totalWithdrawn || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {/* Deposit */}
            <button
              id="dashboard-deposit-btn"
              onClick={onOpenDeposit}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98"
            >
              <ArrowDownLeft className="w-4 h-4 stroke-[3]" />
              <span>{lang === 'bn' ? 'ডিপোজিট করুন' : 'Deposit Money'}</span>
            </button>

            {/* Withdraw */}
            <button
              id="dashboard-withdraw-btn"
              onClick={onOpenWithdraw}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              <span>{lang === 'bn' ? 'টাকা উত্তোলন' : 'Withdraw Funds'}</span>
            </button>

            {/* Grab Task */}
            <button
              onClick={() => setActiveTab('grab')}
              className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center justify-center gap-1.5 transition-all hover:scale-102"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{lang === 'bn' ? 'টাস্ক গ্র্যাব' : 'Grab Tasks'}</span>
            </button>

            {/* History */}
            <button
              onClick={() => setActiveTab('transactions')}
              className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs border border-slate-700/80 flex items-center justify-center gap-1.5 transition-all hover:scale-102"
            >
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{lang === 'bn' ? 'হিস্ট্রি' : 'History'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Live Payout Ticker Bar */}
      <div className="bg-slate-900 border border-slate-800/90 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
          <span className="text-[11px] font-bold text-emerald-400 shrink-0">
            {lang === 'bn' ? 'লাইভ পেমেন্ট:' : 'Live Payout:'}
          </span>
          <span className="text-xs text-slate-300 truncate font-medium">
            User {liveActivities[tickerIndex].phone} {liveActivities[tickerIndex].action}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-semibold shrink-0 ml-2">
          {liveActivities[tickerIndex].time}
        </span>
      </div>

      {/* VIP Level & Task Progress Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-200">
              {currentVip.name} ({lang === 'bn' ? 'কমিশন রেট:' : 'Rebate Rate:'} {currentVip.commissionBonus})
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            {lang === 'bn' 
              ? `আজকের টাস্ক সম্পন্ন হয়েছে: ${currentUser?.dailyTasksCompleted || 0}/${currentUser?.dailyTaskLimit || 10} টি`
              : `Daily tasks used: ${currentUser?.dailyTasksCompleted || 0}/${currentUser?.dailyTaskLimit || 10} completed`}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('vip')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'VIP প্যাকেজ কিনুন' : 'Buy VIP Plan'}</span>
          </button>
          <button
            onClick={() => setActiveTab('grab')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <span>{lang === 'bn' ? 'টাস্ক সেন্টার' : 'Tasks'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Feature Grid Icons */}
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
        
        {/* VIP Packages */}
        <button
          onClick={() => setActiveTab('vip')}
          className="bg-slate-900 border border-amber-500/30 hover:border-amber-500/60 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all group hover:scale-102 shadow-md shadow-amber-500/5"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-1.5 border border-amber-500/30 group-hover:scale-110 transition-transform">
            <Crown className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-amber-300">
            {lang === 'bn' ? 'VIP প্যাকেজ' : 'VIP Plans'}
          </span>
          <span className="text-[10px] text-amber-400/90 font-bold">
            {lang === 'bn' ? '৳৪০০ থেকে শুরু' : 'Starts at ৳400'}
          </span>
        </button>

        {/* Products */}
        <button
          onClick={() => setActiveTab('products')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all group hover:scale-102"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-1.5 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">
            {lang === 'bn' ? 'প্রডাক্ট শপ' : 'Products'}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">3-8% Rebate</span>
        </button>

        {/* Referral Team */}
        <button
          onClick={() => setActiveTab('team')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all group hover:scale-102"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1.5 border border-purple-500/20 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">
            {lang === 'bn' ? 'রেফার টিম' : 'Referral Team'}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">10% + 5% + 2%</span>
        </button>

        {/* Telegram Support */}
        <button
          onClick={() => setActiveTab('support')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all group hover:scale-102"
        >
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-1.5 border border-sky-500/20 group-hover:scale-110 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-200">
            {lang === 'bn' ? 'টেলিগ্রাম' : 'Telegram'}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">24/7 Support</span>
        </button>
      </div>

      {/* Featured Daily Products Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-200">
              {lang === 'bn' ? 'আজকের শীর্ষ কমিশন পণ্য' : 'Top Daily Commission Products'}
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সব পণ্য' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {products.slice(0, 4).map(product => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl flex items-center gap-3.5 transition-all group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-cover border border-slate-750 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-200 truncate">
                  {lang === 'bn' ? product.titleBn : product.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span>৳{product.price.toLocaleString()}</span>
                  <span className="text-emerald-400 font-extrabold">+{product.commissionPercent}% (৳{product.commissionAmount})</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium">
                    ⭐ {product.rating} • {product.soldCount} sold
                  </span>
                  <button
                    onClick={() => {
                      completeTask(product.id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 transition-colors"
                  >
                    {lang === 'bn' ? 'গ্র্যাব' : 'Grab'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

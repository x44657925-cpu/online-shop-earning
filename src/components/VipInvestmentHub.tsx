import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VipPackage, InvestmentPlan } from '../types';
import { 
  Crown, 
  TrendingUp, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowDownLeft, 
  Clock, 
  Coins, 
  Gift, 
  Percent,
  Check
} from 'lucide-react';

interface VipInvestmentHubProps {
  onOpenDeposit: () => void;
}

export const VipInvestmentHub: React.FC<VipInvestmentHubProps> = ({ onOpenDeposit }) => {
  const { 
    currentUser, 
    vipPackages, 
    investmentPlans, 
    buyVipPackage, 
    investInPlan, 
    claimDailyInvestmentProfit, 
    lang, 
    showToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'vip' | 'investments' | 'my_investments'>('vip');
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [investAmount, setInvestAmount] = useState<number>(1000);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentVipLevel = currentUser?.vipLevel || 1;
  const currentBalance = currentUser?.balance || 0;
  const activeInvestments = currentUser?.activeInvestments || [];
  const totalDailyProfitFromInvestments = activeInvestments
    .filter(i => i.status === 'active')
    .reduce((sum, item) => sum + item.dailyReturn, 0);

  const handleBuyVip = (pkg: VipPackage) => {
    if (currentBalance < pkg.price) {
      showToast(
        lang === 'bn' 
          ? `অপর্যাপ্ত ব্যালেন্স! ${pkg.nameBn} কিনতে আগে ৳${pkg.price.toLocaleString()} ডিপোজিট করুন।` 
          : `Insufficient balance! Deposit ৳${pkg.price.toLocaleString()} first.`, 
        'error'
      );
      onOpenDeposit();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      buyVipPackage(pkg.id);
      setIsProcessing(false);
    }, 500);
  };

  const handleInvestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    if (currentBalance < investAmount) {
      showToast(
        lang === 'bn' 
          ? `অপর্যাপ্ত ব্যালেন্স! এই প্ল্যানে বিনিয়োগ করতে আগে ৳${investAmount.toLocaleString()} ডিপোজিট করুন।` 
          : `Insufficient balance! Please deposit ৳${investAmount.toLocaleString()} first.`, 
        'error'
      );
      onOpenDeposit();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const res = investInPlan(selectedPlan.id, Number(investAmount));
      setIsProcessing(false);
      if (res) {
        setSelectedPlan(null);
        setActiveSubTab('my_investments');
      }
    }, 500);
  };

  return (
    <div className="space-y-5 pb-20 max-w-5xl mx-auto animate-in fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/60 border-2 border-amber-500/30 p-5 sm:p-6 shadow-2xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                👑
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                {lang === 'bn' ? 'ভিআইপি মেম্বারশিপ ও ডেইলি ইনভেস্টমেন্ট' : 'VIP Membership & Daily Yield Plans'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'bn' 
                ? 'ডিপোজিট করে ভিআইপি প্যাকেজ কিনুন অথবা ডেইলি প্ল্যানে বিনিয়োগ করে প্রতিদিন ১০%-১৮০% নিশ্চিত মুনাফা আয় করুন।' 
                : 'Upgrade VIP tier or stake in fixed yield contracts for guaranteed daily returns.'}
            </p>
          </div>

          {/* Quick Balance & Deposit Action */}
          <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-2xl flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">{lang === 'bn' ? 'ওয়ালেট ব্যালেন্স:' : 'Wallet Balance:'}</span>
              <span className="text-base sm:text-lg font-black text-emerald-400">৳{currentBalance.toFixed(2)}</span>
            </div>
            <button
              onClick={onOpenDeposit}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1 active:scale-95"
            >
              <ArrowDownLeft className="w-3.5 h-3.5 stroke-[3]" />
              <span>{lang === 'bn' ? '+ ডিপোজিট করুন' : '+ Deposit Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveSubTab('vip')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'vip'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>{lang === 'bn' ? 'VIP প্যাকেজসমূহ' : 'VIP Packages'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('investments')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'investments'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ডেইলি প্রফিট প্ল্যান' : 'Daily Profit Plans'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('my_investments')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'my_investments'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>
            {lang === 'bn' ? 'আমার সক্রিয় প্ল্যান' : 'My Plans'}
            {activeInvestments.length > 0 && ` (${activeInvestments.length})`}
          </span>
        </button>
      </div>

      {/* 1. VIP PACKAGES TAB */}
      {activeSubTab === 'vip' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'ভিআইপি প্যাকেজ বেছে নিন (দৈনিক নিশ্চিত আয়):' : 'Select a VIP Package (Guaranteed Daily Income):'}</span>
            </h3>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              {lang === 'bn' ? `আপনার লেভেল: VIP ${currentVipLevel}` : `Current Level: VIP ${currentVipLevel}`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vipPackages.map(pkg => {
              const isCurrent = currentVipLevel === pkg.level;
              const isUnlocked = currentVipLevel >= pkg.level;

              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl border transition-all p-5 flex flex-col justify-between overflow-hidden group ${
                    pkg.popular
                      ? 'border-amber-500 bg-gradient-to-b from-slate-900 via-amber-950/20 to-slate-950 shadow-xl shadow-amber-500/10'
                      : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <div className={`absolute top-4 right-4 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      pkg.popular
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {pkg.badge}
                    </div>
                  )}

                  <div className="space-y-3.5">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                        {pkg.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-100 text-base">
                          {lang === 'bn' ? pkg.nameBn : pkg.name}
                        </h4>
                        <div className="text-xs text-slate-400">
                          {pkg.validityDays} {lang === 'bn' ? 'দিন মেয়াদ' : 'Days Validity'}
                        </div>
                      </div>
                    </div>

                    {/* Price Card */}
                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold">{lang === 'bn' ? 'প্যাকেজ মূল্য:' : 'Package Price:'}</span>
                      <div className="text-xl font-black text-amber-400">
                        ৳{pkg.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Income Highlights */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                        <span className="font-semibold">{lang === 'bn' ? 'দৈনিক নিশ্চিত আয়:' : 'Daily Guaranteed Earning:'}</span>
                        <span className="font-black text-sm">৳{pkg.dailyIncome} / দিন</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 text-slate-300">
                        <span className="font-medium">{lang === 'bn' ? '৩০ দিনে মোট আয়:' : 'Total 30-Day Income:'}</span>
                        <span className="font-extrabold text-cyan-300">৳{pkg.monthlyIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 text-slate-400">
                        <span>{lang === 'bn' ? 'দৈনিক টাস্ক লিমিট:' : 'Daily Task Limit:'}</span>
                        <span className="font-bold text-slate-200">{pkg.dailyTasks} {lang === 'bn' ? 'টি' : 'Tasks'}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                      {pkg.descriptionBn}
                    </p>
                  </div>

                  {/* Buy / Active Button */}
                  <div className="pt-5">
                    {isCurrent ? (
                      <div className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{lang === 'bn' ? 'আপনার বর্তমান লেভেল' : 'Currently Active'}</span>
                      </div>
                    ) : isUnlocked ? (
                      <div className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs text-center">
                        {lang === 'bn' ? 'আনলক করা হয়েছে' : 'Already Unlocked'}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBuyVip(pkg)}
                        disabled={isProcessing}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        <Crown className="w-4 h-4" />
                        <span>{lang === 'bn' ? `৳${pkg.price.toLocaleString()} ডিপোজিটে কিনুন` : `Purchase for ৳${pkg.price.toLocaleString()}`}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. DAILY INVESTMENT PLANS TAB */}
      {activeSubTab === 'investments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'bn' ? 'ডেইলি ফিক্সড মুনাফা প্ল্যানসমূহ:' : 'Daily Fixed Yield Investment Plans:'}</span>
            </h3>
            <span className="text-xs text-slate-400">
              {lang === 'bn' ? 'প্রতিদিন নির্দিষ্ট হারে লাভ পান' : 'Instant Daily Returns'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {investmentPlans.map(plan => (
              <div
                key={plan.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-slate-750 p-5 flex flex-col justify-between space-y-4 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{plan.icon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-black text-xs border border-emerald-500/30">
                      +{plan.dailyReturnPercent}% / {lang === 'bn' ? 'দিন' : 'Day'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-100 text-base">
                      {lang === 'bn' ? plan.titleBn : plan.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {plan.durationDays} {lang === 'bn' ? 'দিনের মেয়াদে মোট লাভ' : 'Days Contract with'} {plan.totalReturnPercent}% {lang === 'bn' ? 'মুনাফা' : 'Total'}
                    </p>
                  </div>

                  {/* Range and details */}
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>{lang === 'bn' ? 'বিনিয়োগ সীমা:' : 'Investment Limit:'}</span>
                      <span className="font-bold text-slate-200">৳{plan.minAmount.toLocaleString()} - ৳{plan.maxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>{lang === 'bn' ? 'দৈনিক রিটার্ন:' : 'Daily Profit:'}</span>
                      <span className="font-bold text-emerald-400">৳{((1000 * plan.dailyReturnPercent) / 100).toFixed(0)} (প্রতি ১ হাজারে)</span>
                    </div>
                    <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                      <span>{lang === 'bn' ? 'মোট ফেরত পাবেন:' : 'Total Return:'}</span>
                      <span className="font-black text-cyan-300">{plan.totalReturnPercent}%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setInvestAmount(plan.minAmount);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Coins className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'এখনই ইনভেস্ট করুন' : 'Invest in this Plan'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MY ACTIVE INVESTMENTS TAB */}
      {activeSubTab === 'my_investments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div>
              <h4 className="font-black text-slate-100 text-sm">
                {lang === 'bn' ? 'দৈনিক বিনিয়োগ মুনাফা ক্লেইম করুন' : 'Claim Daily Investment Profit'}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' 
                  ? `আপনার দৈনিক মোট সম্ভাব্য মুনাফা: ৳${totalDailyProfitFromInvestments.toFixed(2)}` 
                  : `Total daily yield ready: ৳${totalDailyProfitFromInvestments.toFixed(2)}`}
              </p>
            </div>

            <button
              onClick={claimDailyInvestmentProfit}
              disabled={activeInvestments.filter(i => i.status === 'active').length === 0}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{lang === 'bn' ? 'আজকের মুনাফা ব্যালেন্সে নিন' : 'Claim Profit to Balance'}</span>
            </button>
          </div>

          {activeInvestments.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                🌱
              </div>
              <h4 className="font-bold text-slate-300 text-sm">
                {lang === 'bn' ? 'আপনার কোনো সক্রিয় বিনিয়োগ প্ল্যান নেই' : 'No active investment contracts'}
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {lang === 'bn' 
                  ? 'ডিপোজিট করে যেকোনো ডেইলি প্রফিট প্ল্যানে বিনিয়োগ করুন এবং প্রতিদিন স্বয়ংক্রিয় মুনাফা আয় করুন।' 
                  : 'Deposit and stake in a daily yield plan to start earning daily compound profits.'}
              </p>
              <button
                onClick={() => setActiveSubTab('investments')}
                className="px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/25 transition-colors"
              >
                {lang === 'bn' ? 'প্ল্যানসমূহ দেখুন' : 'Explore Plans'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeInvestments.map(inv => (
                <div
                  key={inv.id}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-200 block">{inv.planTitle}</span>
                      <span className="text-[10px] text-slate-500">{inv.startDate} • ID: {inv.id}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      inv.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {inv.status === 'active' ? (lang === 'bn' ? 'সক্রিয়' : 'Active') : (lang === 'bn' ? 'সম্পন্ন' : 'Completed')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'বিনিয়োগ:' : 'Invested:'}</span>
                      <span className="font-bold text-slate-200">৳{inv.amountInvested.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'দৈনিক লাভ:' : 'Daily Yield:'}</span>
                      <span className="font-bold text-emerald-400">৳{inv.dailyReturn.toFixed(1)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">{lang === 'bn' ? 'বাকি দিন:' : 'Days Left:'}</span>
                      <span className="font-bold text-cyan-300">{inv.daysRemaining} / {inv.totalDays}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Investment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedPlan.icon}</span>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    {lang === 'bn' ? selectedPlan.titleBn : selectedPlan.title}
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    +{selectedPlan.dailyReturnPercent}% / {lang === 'bn' ? 'প্রতিদিন লাভ' : 'Daily Profit'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlan(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {lang === 'bn' ? 'বিনিয়োগের পরিমাণ (টাকা):' : 'Investment Amount (BDT):'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                  <input
                    type="number"
                    min={selectedPlan.minAmount}
                    max={selectedPlan.maxAmount}
                    value={investAmount}
                    onChange={(e) => setInvestAmount(Number(e.target.value))}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Min: ৳{selectedPlan.minAmount.toLocaleString()}</span>
                  <span>Max: ৳{selectedPlan.maxAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  selectedPlan.minAmount,
                  selectedPlan.minAmount === 400 ? 1000 : selectedPlan.minAmount * 2,
                  selectedPlan.minAmount === 400 ? 2000 : selectedPlan.minAmount * 3,
                  selectedPlan.maxAmount
                ].map((amt, idx) => (
                  <button
                    key={`${amt}-${idx}`}
                    type="button"
                    onClick={() => setInvestAmount(amt)}
                    className={`py-1.5 px-1 rounded-lg border text-[11px] font-bold transition-all ${
                      investAmount === amt
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-500/50'
                    }`}
                  >
                    ৳{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Calculation Preview */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{lang === 'bn' ? 'দৈনিক লাভ পাবেন:' : 'Daily Profit:'}</span>
                  <span className="font-bold text-emerald-400">+৳{((investAmount * selectedPlan.dailyReturnPercent) / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{lang === 'bn' ? 'মোট মেয়াদ:' : 'Duration:'}</span>
                  <span className="font-bold text-slate-200">{selectedPlan.durationDays} {lang === 'bn' ? 'দিন' : 'Days'}</span>
                </div>
                <div className="flex justify-between font-black text-slate-100 pt-1.5 border-t border-slate-800">
                  <span>{lang === 'bn' ? 'মোট সর্বমোট রিটার্ন:' : 'Total Payout:'}</span>
                  <span className="text-cyan-300">৳{((investAmount * selectedPlan.totalReturnPercent) / 100).toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                <Coins className="w-4 h-4" />
                <span>{isProcessing ? 'প্রসেস হচ্ছে...' : (lang === 'bn' ? `৳${investAmount.toLocaleString()} কনফার্ম করুন` : `Confirm ৳${investAmount.toLocaleString()}`)}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

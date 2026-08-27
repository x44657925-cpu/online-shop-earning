import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck, 
  Flame,
  ArrowRight,
  RefreshCw,
  Award
} from 'lucide-react';

export const EarningCenter: React.FC = () => {
  const { currentUser, products, completeTask, lang, setActiveTab } = useApp();
  
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [grabStep, setGrabStep] = useState<number>(0);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  const [taskResult, setTaskResult] = useState<{ earned: number; product: Product } | null>(null);

  const completed = currentUser?.dailyTasksCompleted || 0;
  const limit = currentUser?.dailyTaskLimit || 10;
  const remaining = Math.max(0, limit - completed);
  const percentUsed = Math.min(100, Math.round((completed / limit) * 100));

  const handleStartGrab = () => {
    if (remaining <= 0) return;

    setIsGrabbing(true);
    setGrabStep(1);
    setTaskResult(null);

    // Pick a high commission product from catalog
    const eligibleProducts = products.filter(p => p.inStock && p.vipRequired <= (currentUser?.vipLevel || 1));
    const targetProduct = eligibleProducts.length > 0
      ? eligibleProducts[Math.floor(Math.random() * eligibleProducts.length)]
      : products[0];

    setMatchedProduct(targetProduct);

    // Step 1: Matching order (800ms)
    setTimeout(() => {
      setGrabStep(2);
      
      // Step 2: Generating commission & verifying with platform merchant (900ms)
      setTimeout(() => {
        setGrabStep(3);

        // Step 3: Completing grab
        setTimeout(() => {
          const res = completeTask(targetProduct.id);
          if (res.success) {
            setTaskResult({
              earned: res.earned,
              product: targetProduct,
            });
          }
          setIsGrabbing(false);
          setGrabStep(0);
        }, 800);
      }, 900);
    }, 800);
  };

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/50 via-slate-900 to-slate-950 border border-emerald-500/20 p-5 sm:p-6 shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              {lang === 'bn' ? 'দৈনিক স্বয়ংক্রিয় কমিশন গ্র্যাব' : 'Daily Automatic Commission Grab'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              {lang === 'bn' ? 'টাস্ক সম্পূর্ণ করে প্রতিদিন আয় করুন' : 'Grab Orders & Earn Instant Commissions'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
              {lang === 'bn' 
                ? 'ই-কমার্স মার্চেন্ট প্রডাক্ট অর্ডার ম্যাচিংয়ের মাধ্যমে প্রতি ক্লিকে ৩% থেকে ৮% পর্যন্ত নিশ্চিত মুনাফা পান।'
                : 'Match e-commerce product orders to earn 3% to 8% guaranteed commission per task instantly.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 sm:text-right w-full sm:w-auto">
            <span className="text-[11px] text-slate-400 font-medium">
              {lang === 'bn' ? 'আজকের মোট আয়:' : "Today's Earnings:"}
            </span>
            <div className="text-xl font-black text-emerald-400">
              ৳{(currentUser?.todayEarning || 0).toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">
              {lang === 'bn' ? 'সর্বমোট আয়:' : 'Total Earned:'} ৳{(currentUser?.totalEarning || 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Task Engine Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Task Counter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'দৈনিক টাস্ক কোটা (Daily Task Quota):' : 'Daily Task Progress:'}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-slate-100">{completed}</span>
              <span className="text-slate-500 font-bold text-lg">/ {limit} {lang === 'bn' ? 'টি' : 'Tasks'}</span>
              <span className="text-xs font-bold text-emerald-400 ml-2 px-2 py-0.5 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                {remaining} {lang === 'bn' ? 'টি বাকি' : 'remaining'}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-48">
            <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1">
              <span>{percentUsed}% {lang === 'bn' ? 'সম্পন্ন' : 'Done'}</span>
              <span>VIP {currentUser?.vipLevel || 1} Tier</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${percentUsed}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Center Grab Button / Interactive Stage */}
        <div className="my-6 flex flex-col items-center justify-center text-center">
          
          {/* Active Grabbing Animation */}
          {isGrabbing ? (
            <div className="py-8 flex flex-col items-center space-y-4 animate-in fade-in">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-4 border-t-emerald-400 border-r-transparent border-b-teal-500 border-l-transparent animate-spin"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Zap className="w-8 h-8 text-slate-950 animate-bounce" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-extrabold text-base text-slate-100 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  {grabStep === 1 && (lang === 'bn' ? 'ই-কমার্স অর্ডার অনুসন্ধান হচ্ছে...' : 'Scanning Merchant Orders...')}
                  {grabStep === 2 && (lang === 'bn' ? 'কমিশন রেট ও প্রডাক্ট ম্যাচিং...' : 'Matching Product & Commission...')}
                  {grabStep === 3 && (lang === 'bn' ? 'মুনাফা ব্যালেন্সে যোগ হচ্ছে...' : 'Crediting Commission to Wallet...')}
                </div>
                {matchedProduct && (
                  <p className="text-xs text-slate-400 max-w-xs truncate">
                    {lang === 'bn' ? matchedProduct.titleBn : matchedProduct.title}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="py-4 flex flex-col items-center">
              
              {/* Grab Trigger Button */}
              <button
                id="main-grab-order-btn"
                onClick={handleStartGrab}
                disabled={remaining <= 0}
                className={`relative group p-1 rounded-full transition-all duration-300 ${
                  remaining > 0
                    ? 'hover:scale-105 active:scale-95'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full blur-md opacity-70 group-hover:opacity-100 animate-pulse"></div>
                
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 border-4 border-emerald-500/50 flex flex-col items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/40 mb-1">
                    <Zap className="w-9 h-9 fill-slate-950 stroke-slate-950" />
                  </div>
                  <span className="font-black text-sm text-slate-100 tracking-wide uppercase">
                    {lang === 'bn' ? 'অর্ডার গ্র্যাব' : 'GRAB ORDER'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    {remaining > 0 ? (lang === 'bn' ? 'ট্যাপ করুন' : 'Tap to Earn') : (lang === 'bn' ? 'কোটা শেষ' : 'Limit Over')}
                  </span>
                </div>
              </button>

              {remaining <= 0 && (
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>
                    {lang === 'bn' 
                      ? 'আজকের সকল টাস্ক শেষ! আরো বেশি টাস্ক পেতে ভিআইপি আপগ্রেড করতে ডিপোজিট করুন।' 
                      : 'All tasks completed for today! Upgrade your VIP level for higher daily limits.'}
                  </span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Task Result Card Popup */}
        {taskResult && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={taskResult.product.image} 
                  alt={taskResult.product.title} 
                  className="w-12 h-12 rounded-lg object-cover border border-slate-700" 
                />
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {lang === 'bn' ? 'টাস্ক সফলভাবে সম্পন্ন!' : 'Task Completed!'}
                  </div>
                  <h4 className="text-xs font-bold text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                    {lang === 'bn' ? taskResult.product.titleBn : taskResult.product.title}
                  </h4>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'bn' ? 'প্রডাক্ট মূল্য:' : 'Price:'} ৳{taskResult.product.price} ({taskResult.product.commissionPercent}%)
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  {lang === 'bn' ? 'অর্জিত কমিশন' : 'Commission'}
                </span>
                <div className="text-lg font-black text-emerald-300">
                  +৳{taskResult.earned.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Featured Products Catalog Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-slate-200">
              {lang === 'bn' ? 'আজকের হাই-কমিশন প্রডাক্টসমূহ' : "Today's High-Commission Products"}
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সবগুলো দেখুন' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {products.slice(0, 4).map(product => (
            <div
              key={product.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 flex items-center gap-3 transition-all"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-lg object-cover border border-slate-750 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-200 truncate">
                  {lang === 'bn' ? product.titleBn : product.title}
                </h4>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {lang === 'bn' ? 'মূল্য:' : 'Price:'} <strong className="text-slate-200">৳{product.price.toLocaleString()}</strong>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    +{product.commissionPercent}% (৳{product.commissionAmount})
                  </span>
                  <button
                    onClick={handleStartGrab}
                    disabled={remaining <= 0}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 disabled:opacity-40"
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

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  UserPlus, 
  LogIn, 
  Smartphone, 
  Lock, 
  User, 
  Gift, 
  ShieldCheck, 
  Crown,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register, lang, showToast } = useApp();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (isLoginTab) {
        const res = login(phone, pin);
        setIsSubmitting(false);
        if (res.success) onClose();
      } else {
        const res = register({
          name,
          phone,
          pin,
          referralCode,
        });
        setIsSubmitting(false);
        if (res.success) onClose();
      }
    }, 500);
  };

  const handleDemoUserLogin = () => {
    login('01631218185', '123456');
    onClose();
  };

  const handleDemoAdminLogin = () => {
    login('01995732924', '778899', true);
    onClose();
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header with Switcher */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              {isLoginTab ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <h3 className="font-extrabold text-slate-100 text-base">
              {isLoginTab 
                ? (lang === 'bn' ? 'অ্যাকাউন্টে লগইন করুন' : 'Login to Account')
                : (lang === 'bn' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'Create Free Account')}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-3 bg-slate-950/50 border-b border-slate-800 gap-2">
          <button
            type="button"
            onClick={() => setIsLoginTab(true)}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              isLoginTab 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'bn' ? 'লগইন (Sign In)' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => setIsLoginTab(false)}
            className={`py-2 rounded-xl text-xs font-bold transition-all ${
              !isLoginTab 
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang === 'bn' ? 'রেজিস্ট্রেশন (Sign Up)' : 'Register (+৳150)'}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          
          {!isLoginTab && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'আপনার পূর্ণ নাম:' : 'Full Name:'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
            </label>
            <div className="relative">
              <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 01631218185"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'bn' ? 'সিকিউরিটি পিন / পাসওয়ার্ড:' : 'Security PIN / Password:'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="e.g. 123456"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'রেফারাল কোড (ঐচ্ছিক):' : 'Referral Code (Optional):'}
              </label>
              <div className="relative">
                <Gift className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="e.g. EZ8821"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm uppercase text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span>{isLoginTab ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In Now') : (lang === 'bn' ? 'রেজিস্ট্রেশন সম্পূর্ণ করুন' : 'Complete Registration')}</span>
            )}
          </button>
        </form>

        {/* 1-Click Fast Login for Demo */}
        <div className="px-5 pb-5 pt-2 border-t border-slate-800 bg-slate-950/40 space-y-2">
          <div className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            {lang === 'bn' ? 'দ্রুত ডেমো ইউজার লগইন:' : '1-Click Quick User Demo:'}
          </div>
          
          <button
            type="button"
            onClick={handleDemoUserLogin}
            className="w-full p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <User className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'bn' ? 'ডেমো ইউজার অ্যাকাউন্টে প্রবেশ করুন (Tanvir)' : 'Quick Login as Demo User'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

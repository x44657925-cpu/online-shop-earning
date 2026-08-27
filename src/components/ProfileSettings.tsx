import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User as UserIcon, 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Globe, 
  LogOut, 
  Crown, 
  SlidersHorizontal, 
  ChevronRight, 
  Copy, 
  Check, 
  CheckCircle2, 
  RefreshCw,
  Bell,
  Lock,
  Edit3,
  Camera,
  Mail,
  Phone,
  Save,
  X
} from 'lucide-react';

interface ProfileSettingsProps {
  onOpenApkModal: () => void;
  onOpenAuthModal?: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onOpenApkModal, onOpenAuthModal }) => {
  const { 
    currentUser, 
    lang, 
    setLang, 
    logout, 
    switchRole, 
    setActiveTab, 
    updateUserProfile, 
    showToast,
    resetAllData 
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [newPin, setNewPin] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAvatarUrl, setEditAvatarUrl] = useState(currentUser?.avatarUrl || '');

  const handleOpenEdit = () => {
    setEditName(currentUser?.name || '');
    setEditEmail(currentUser?.email || '');
    setEditPhone(currentUser?.phone || '');
    setEditAvatarUrl(currentUser?.avatarUrl || '');
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      showToast(lang === 'bn' ? 'সঠিক নাম লিখুন' : 'Please enter your name', 'error');
      return;
    }
    updateUserProfile({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      avatarUrl: editAvatarUrl.trim()
    });
    setShowEditProfileModal(false);
    showToast(lang === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!', 'success');
  };

  const handleAvatarPreset = (url: string) => {
    setEditAvatarUrl(url);
  };

  const handleCopyCode = () => {
    if (!currentUser?.referralCode) return;
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      showToast(lang === 'bn' ? 'কমপক্ষে ৪-৬ সংখ্যার পিন দিন' : 'PIN must be 4-6 digits', 'error');
      return;
    }
    updateUserProfile({ pinCode: newPin });
    setShowPinModal(false);
    setNewPin('');
    showToast(lang === 'bn' ? 'সিকিউরিটি পিন আপডেট হয়েছে' : 'Security PIN updated', 'success');
  };

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
  ];

  if (!currentUser) {
    return (
      <div className="space-y-5 pb-20 max-w-md mx-auto text-center py-10">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-5">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-3xl shadow-xl shadow-emerald-500/30">
            <Lock className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'আপনি লগইন করা নেই' : 'You are not logged in'}
            </h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              {lang === 'bn' 
                ? 'আপনার টাস্ক কমিশন, ওয়ালেট ব্যালেন্স এবং এডমিন প্যানেল দেখতে লগইন করুন।' 
                : 'Please sign in to view your task commissions, balance and admin portal.'}
            </p>
          </div>

          <button
            onClick={onOpenAuthModal}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Key className="w-4 h-4 stroke-[3]" />
            <span>{lang === 'bn' ? '🔑 লগইন / রেজিস্টার করুন' : '🔑 Log In / Register'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-20 max-w-2xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-750 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            {currentUser?.avatarUrl ? (
              <img 
                src={currentUser.avatarUrl} 
                alt={currentUser.name} 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg shadow-emerald-500/20" 
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center font-black text-2xl text-slate-950 shadow-lg shadow-emerald-500/20">
                {currentUser?.role === 'admin' ? '👑' : currentUser?.name?.charAt(0) || 'U'}
              </div>
            )}
            <button
              onClick={handleOpenEdit}
              className="absolute -bottom-1.5 -right-1.5 p-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-transform active:scale-95"
              title="Edit Profile"
            >
              <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <h2 className="text-base sm:text-lg font-black text-slate-100 truncate">
                  {currentUser?.name || 'User'}
                </h2>
                {currentUser?.kycStatus === 'verified' && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              <button
                onClick={handleOpenEdit}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-slate-700 text-xs font-bold flex items-center gap-1 shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'bn' ? 'প্রোফাইল এডিট' : 'Edit'}</span>
              </button>
            </div>
            
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {currentUser?.phone}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] text-slate-400">{lang === 'bn' ? 'ইনভাইট কোড:' : 'Referral:'}</span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-400 hover:underline"
              >
                <span>{currentUser?.referralCode}</span>
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        {/* Balance Snapshot */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'বর্তমান ব্যালেন্স:' : 'Wallet Balance:'}</span>
            <span className="text-base font-black text-emerald-400">৳{(currentUser?.balance || 0).toFixed(2)}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'সর্বমোট আয়:' : 'Total Earned:'}</span>
            <span className="text-base font-black text-slate-200">৳{(currentUser?.totalEarning || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Settings Menu List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800/80 overflow-hidden shadow-xl">
        
        {/* KYC Status */}
        <button
          onClick={() => setActiveTab('kyc')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-850 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                {lang === 'bn' ? 'আইডি ভেরিফিকেশন (KYC)' : 'KYC Verification'}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentUser?.kycStatus === 'verified' 
                  ? (lang === 'bn' ? 'ভেরিফাইড' : 'Verified') 
                  : (lang === 'bn' ? 'ডকুমেন্ট সাবমিট করুন' : 'Submit NID Documents')}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Change Transaction PIN */}
        <button
          onClick={() => setShowPinModal(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-850 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                {lang === 'bn' ? 'সিকিউরিটি পিন কোড' : 'Security / Transaction PIN'}
              </div>
              <div className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'উইথড্রয়াল ট্রানজেকশন পিন পরিবর্তন করুন' : 'Set or update withdrawal PIN'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Download Android APK */}
        <button
          onClick={() => setActiveTab('apk')}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-850 transition-colors text-left cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-200">
                  {lang === 'bn' ? 'অ্যান্ড্রয়েড অ্যাপ (APK) ও WebView' : 'Download Android App & WebView'}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  v2.4.0
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'মোবাইলে ইনস্টল, ZIP প্যাকেজ ও লাইভ লিঙ্ক' : 'Install on device, ZIP package & Live URL'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Language Switch */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                {lang === 'bn' ? 'ভাষা (Language)' : 'Language'}
              </div>
              <div className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'বাংলা সিলেক্ট করা আছে' : 'English Selected'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setLang('bn')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'bn' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Switch to Admin Mode Shortcut (Strictly Admin only) */}
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-850 transition-colors text-left bg-amber-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300">
                  {lang === 'bn' ? '🔐 এডমিন কন্ট্রোল প্যানেল' : '🔐 Admin Control Portal'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'প্রডাক্ট, মূল্য, কমিশন ও ডিপোজিট/উইথড্র অনুমোদন' : 'Manage Products, Prices, Commissions & Payments'}
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </button>
        )}

      </div>

      {/* Danger Zone: Reset Data & Logout */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          onClick={resetAllData}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'ডেমো ডাটা রিসেট' : 'Reset Demo Data'}</span>
        </button>

        <button
          onClick={logout}
          className="flex-1 py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'লগআউট করুন' : 'Log Out'}</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-100 text-sm sm:text-base">
                  {lang === 'bn' ? 'প্রোফাইল পরিবর্তন করুন' : 'Edit Profile Information'}
                </h3>
              </div>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              {/* Avatar Preset Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {lang === 'bn' ? 'প্রোফাইল ছবি (Avatar) সিলেক্ট করুন:' : 'Choose Profile Picture:'}
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {avatarPresets.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAvatarPreset(imgUrl)}
                      className={`relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                        editAvatarUrl === imgUrl ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="avatar" className="w-full h-full object-cover" />
                      {editAvatarUrl === imgUrl && (
                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="url"
                    value={editAvatarUrl}
                    onChange={(e) => setEditAvatarUrl(e.target.value)}
                    placeholder={lang === 'bn' ? 'অথবা ছবির লিঙ্ক (Image URL) দিন...' : 'Or enter custom image URL...'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {lang === 'bn' ? 'আপনার পূর্ণ নাম:' : 'Full Name:'}
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {lang === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="01631218185"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-mono font-semibold text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {lang === 'bn' ? 'ইমেইল এড্রেস (ঐচ্ছিক):' : 'Email Address (Optional):'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="tanvir@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition-colors"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সেভ করুন' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PIN Change Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm">
              {lang === 'bn' ? 'নতুন ট্রানজেকশন পিন সেট করুন' : 'Set New Security PIN'}
            </h3>
            <form onSubmit={handleSavePin} className="space-y-3">
              <input
                type="password"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter 4-6 digit PIN"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-center text-lg font-bold tracking-widest text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-extrabold"
                >
                  {lang === 'bn' ? 'সংরক্ষণ' : 'Save PIN'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

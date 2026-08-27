import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  UserCheck, 
  Crown, 
  Bell, 
  Sparkles,
  Send,
  LogOut,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  onOpenApkModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApkModal, onOpenAuthModal }) => {
  const { currentUser, lang, setLang, activeTab, setActiveTab, switchRole, logout } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xl font-black text-slate-950 tracking-tighter">OSE</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                Onlineshopearning
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {lang === 'bn' ? 'অনলাইন শপ টাস্ক ও কমিশন আর্নিং' : 'Online Shop Task & Commission Hub'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* APK Download Button */}
          <button
            id="navbar-apk-btn"
            onClick={() => setActiveTab('apk')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all hover:scale-102 cursor-pointer"
            title="Download Android APK"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'APK ডাউনলোড' : 'APK App'}</span>
            <span className="sm:hidden text-[11px]">APK</span>
          </button>

          {/* Telegram Support Link */}
          <button
            id="navbar-telegram-btn"
            onClick={() => setActiveTab('support')}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700/60 transition-colors"
            title="Telegram 24/7 Support"
          >
            <Send className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            id="navbar-lang-btn"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700/60 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* User Status / Role Switcher */}
          {currentUser ? (
            <div className="relative">
              <button
                id="navbar-user-profile-btn"
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700/80 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-xs text-white shadow-inner">
                  {currentUser.role === 'admin' ? '👑' : currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-200 truncate max-w-[100px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    ৳{currentUser.balance.toFixed(2)}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2.5 border-b border-slate-800 mb-1">
                    <div className="text-xs font-bold text-slate-200">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400">{currentUser.phone}</div>
                    <div className="mt-1 flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                      <span className="text-slate-400">{lang === 'bn' ? 'ব্যালেন্স:' : 'Balance:'}</span>
                      <span className="font-bold text-emerald-400">৳{currentUser.balance.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lang === 'bn' ? 'আমার প্রোফাইল' : 'My Profile'}</span>
                  </button>

                  {/* Admin Only Options */}
                  {currentUser.role === 'admin' && (
                    <>
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setShowRoleMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-amber-300 hover:bg-amber-500/10 rounded-lg flex items-center gap-2 font-medium"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lang === 'bn' ? '🔐 এডমিন কন্ট্রোল প্যানেল' : '🔐 Admin Control Panel'}</span>
                      </button>

                      <div className="my-1 border-t border-slate-800"></div>

                      <button
                        onClick={() => {
                          switchRole('user');
                          setShowRoleMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-cyan-300 hover:bg-cyan-500/10 rounded-lg flex items-center gap-2"
                      >
                        <Crown className="w-3.5 h-3.5 text-cyan-400" />
                        <span>
                          {lang === 'bn' ? 'ইউজার মোডে যান' : 'Switch to User View'}
                        </span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="navbar-login-btn"
              onClick={onOpenAuthModal}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/25 transition-all"
            >
              {lang === 'bn' ? 'লগইন / রেজিস্টার' : 'Login / Sign Up'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

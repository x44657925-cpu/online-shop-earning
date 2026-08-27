import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Zap, 
  Crown,
  ShoppingBag, 
  Users, 
  User, 
  SlidersHorizontal 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, lang, currentUser, transactions } = useApp();

  const pendingCount = transactions.filter(t => t.status === 'pending').length;

  const navItems = [
    { id: 'dashboard', label: lang === 'bn' ? 'হোম' : 'Home', icon: Home },
    { id: 'vip', label: lang === 'bn' ? 'ভিআইপি প্ল্যান' : 'VIP Plans', icon: Crown },
    { id: 'grab', label: lang === 'bn' ? 'টাস্ক আর্নিং' : 'Grab Task', icon: Zap, highlight: true },
    { id: 'team', label: lang === 'bn' ? 'টিম' : 'Team', icon: Users },
    { id: 'profile', label: lang === 'bn' ? 'প্রোফাইল' : 'Profile', icon: User },
  ];

  return (
    <nav id="bottom-navigation-bar" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/90 max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto md:rounded-t-2xl shadow-2xl">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.highlight) {
            return (
              <button
                key={item.id}
                id={`bottom-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 scale-110 shadow-emerald-500/40 ring-4 ring-emerald-500/20' 
                    : 'bg-gradient-to-tr from-emerald-600 to-cyan-600 text-white hover:scale-105 shadow-emerald-600/30'
                }`}>
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className={`text-[10px] font-bold mt-1 tracking-tight ${isActive ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'text-emerald-400 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-medium tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* If user is admin, show Admin badge shortcut */}
        {currentUser?.role === 'admin' && (
          <button
            id="bottom-nav-admin"
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 relative ${
              activeTab === 'admin' ? 'text-amber-400 font-bold' : 'text-amber-500/80 hover:text-amber-300'
            }`}
          >
            <div className="relative">
              <SlidersHorizontal className="w-5 h-5 mb-0.5" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce">
                  {pendingCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight">Admin</span>
          </button>
        )}
      </div>
    </nav>
  );
};

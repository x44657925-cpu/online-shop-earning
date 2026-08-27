import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { EarningCenter } from './components/EarningCenter';
import { ProductList } from './components/ProductList';
import { ReferralTeam } from './components/ReferralTeam';
import { TransactionHistory } from './components/TransactionHistory';
import { KYCVerification } from './components/KYCVerification';
import { TelegramSupport } from './components/TelegramSupport';
import { ProfileSettings } from './components/ProfileSettings';
import { AdminPanel } from './components/AdminPanel';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { AuthModal } from './components/AuthModal';
import { VipInvestmentHub } from './components/VipInvestmentHub';
import { ApkDownloadPage } from './components/ApkDownloadPage';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, toast, lang, currentUser } = useApp();

  // Modals state
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isApkOpen, setIsApkOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onOpenDeposit={() => setIsDepositOpen(true)}
            onOpenWithdraw={() => setIsWithdrawOpen(true)}
            onOpenApkModal={() => setIsApkOpen(true)}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        );
      case 'vip':
        return <VipInvestmentHub onOpenDeposit={() => setIsDepositOpen(true)} />;
      case 'grab':
        return <EarningCenter />;
      case 'products':
        return <ProductList onGrabTask={() => setActiveTab('grab')} />;
      case 'team':
        return <ReferralTeam />;
      case 'transactions':
        return <TransactionHistory />;
      case 'kyc':
        return <KYCVerification />;
      case 'apk':
        return <ApkDownloadPage />;
      case 'support':
        return <TelegramSupport />;
      case 'profile':
        return (
          <ProfileSettings 
            onOpenApkModal={() => setIsApkOpen(true)} 
            onOpenAuthModal={() => setIsAuthOpen(true)} 
          />
        );
      case 'admin':
        return <AdminPanel />;
      default:
        return (
          <Dashboard
            onOpenDeposit={() => setIsDepositOpen(true)}
            onOpenWithdraw={() => setIsWithdrawOpen(true)}
            onOpenApkModal={() => setIsApkOpen(true)}
            onOpenAuthModal={() => setIsAuthOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenApkModal={() => setIsApkOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6">
        {renderActiveView()}
      </main>

      {/* Mobile-first Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300 px-4 w-full max-w-md">
          <div className={`p-3.5 rounded-2xl shadow-2xl backdrop-blur-md border flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : toast.type === 'error'
              ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
              : 'bg-slate-900/90 border-slate-750 text-slate-200'
          }`}>
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0" />}
            <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Modals */}
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
      <ApkDownloadModal isOpen={isApkOpen} onClose={() => setIsApkOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;

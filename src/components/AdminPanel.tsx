import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, PaymentMethod } from '../types';
import { 
  SlidersHorizontal, 
  ShoppingBag, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Users, 
  ShieldCheck, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Search, 
  DollarSign, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Save,
  AlertTriangle,
  Smartphone,
  Send,
  DownloadCloud,
  Globe,
  Copy,
  Code,
  Lock,
  ShieldAlert,
  KeyRound,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    currentUser,
    products, 
    transactions, 
    users, 
    systemSettings, 
    lang, 
    switchRole,
    setActiveTab,
    adminApproveDeposit, 
    adminRejectDeposit, 
    adminApproveWithdraw, 
    adminRejectWithdraw, 
    adminApproveKyc, 
    adminRejectKyc, 
    adminAddProduct, 
    adminUpdateProduct, 
    adminDeleteProduct, 
    adminUpdateSettings, 
    adminUpdateUserBalance, 
    adminToggleUserBan,
    adminToggleUserVerification,
    showToast
  } = useApp();

  const [adminPinInput, setAdminPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'deposits' | 'withdrawals' | 'users' | 'kyc' | 'settings' | 'app_export'>('products');
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // If user is not admin, show strict Admin Security Lock Screen
  if (currentUser?.role !== 'admin') {
    const handleAdminUnlock = (e: React.FormEvent) => {
      e.preventDefault();
      // Admin master pins: 778899, 112233, 01995732924
      if (adminPinInput === '778899' || adminPinInput === '112233' || adminPinInput === 'admin888') {
        switchRole('admin');
        showToast(lang === 'bn' ? 'অ্যাডমিন প্যানেলে স্বাগতম!' : 'Admin Panel Unlocked!', 'success');
      } else {
        setPinError(true);
        showToast(lang === 'bn' ? 'ভুল অ্যাডমিন সিকিউরিটি পিন!' : 'Invalid Admin Security PIN!', 'error');
      }
    };

    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/10">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 text-[11px] font-bold border border-rose-500/20">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'শুধুমাত্র অ্যাডমিন ব্যবহারের জন্য' : 'Admin Restricted Area'}</span>
            </div>
            <h2 className="text-xl font-black text-slate-100">
              {lang === 'bn' ? 'অ্যাডমিন এক্সেস সংরক্ষিত' : 'Admin Access Required'}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'এই প্যানেলটি সাধারণ ইউজারদের জন্য সম্পূর্ণ বন্ধ ও লক করা। শুধুমাত্র অনুমোদিত অ্যাডমিন মাস্টার পিন দিয়ে প্রবেশ করতে পারেন।'
                : 'This panel is strictly restricted from regular users. Please enter Admin Master PIN to authenticate.'}
            </p>
          </div>

          <form onSubmit={handleAdminUnlock} className="space-y-3.5 pt-2">
            <div className="space-y-1 text-left">
              <label className="block text-xs font-bold text-slate-300">
                {lang === 'bn' ? 'অ্যাডমিন মাস্টার পিন কোড:' : 'Admin Master PIN:'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={adminPinInput}
                  onChange={(e) => {
                    setAdminPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter Secret Admin PIN (778899)"
                  required
                  className={`w-full bg-slate-950 border rounded-xl pl-10 pr-3.5 py-2.5 text-center text-base tracking-widest font-mono font-bold text-slate-100 focus:outline-none transition-all ${
                    pinError ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-slate-800 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{lang === 'bn' ? '🔒 অ্যাডমিন প্যানেল আনলক করুন' : '🔒 Unlock Admin Portal'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'হোম ড্যাশবোর্ডে ফিরে যান' : 'Back to Home Dashboard'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const liveAppUrl = 'https://ais-pre-q67jelfywocs5sat2sg42b-320128088775.asia-east1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveAppUrl);
    setCopiedUrl(true);
    showToast(lang === 'bn' ? 'লাইভ লিঙ্ক কপি হয়েছে!' : 'Live App URL Copied!', 'success');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      const response = await fetch('/webview_app.zip');
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Onlineshopearning_webview_build.zip';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 2000);
      showToast(lang === 'bn' ? 'ZIP ফাইল ডাউনলোড সম্পন্ন হয়েছে!' : 'ZIP downloaded successfully!', 'success');
    } catch (e) {
      window.location.href = '/webview_app.zip';
    } finally {
      setDownloadingZip(false);
    }
  };

  // Product Add/Edit Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    titleBn: '',
    price: 1000,
    commissionPercent: 3.5,
    image: '',
    category: 'Audio & Gadgets',
    rating: 4.8,
    soldCount: 500,
    vipRequired: 1,
    inStock: true,
  });

  // Balance Adjustment Modal State
  const [adjustUserModal, setAdjustUserModal] = useState<{ id: string; name: string; balance: number } | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(500);
  const [adjustNote, setAdjustNote] = useState<string>('Daily Bonus / Promotion');

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...systemSettings });

  // Filter queues
  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending');
  const pendingWithdrawals = transactions.filter(t => t.type === 'withdraw' && t.status === 'pending');
  const pendingKycUsers = users.filter(u => u.kycStatus === 'pending');

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: '',
      titleBn: '',
      price: 2500,
      commissionPercent: 4.0,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      category: 'Audio & Gadgets',
      rating: 4.9,
      soldCount: 120,
      vipRequired: 1,
      inStock: true,
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title,
      titleBn: prod.titleBn,
      price: prod.price,
      commissionPercent: prod.commissionPercent,
      image: prod.image,
      category: prod.category,
      rating: prod.rating,
      soldCount: prod.soldCount,
      vipRequired: prod.vipRequired,
      inStock: prod.inStock,
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title) return;

    if (editingProduct) {
      adminUpdateProduct(editingProduct.id, {
        ...productForm,
        commissionAmount: Math.round((productForm.price * productForm.commissionPercent) / 100 * 10) / 10,
      });
    } else {
      adminAddProduct({
        ...productForm,
        commissionAmount: Math.round((productForm.price * productForm.commissionPercent) / 100 * 10) / 10,
      });
    }
    setShowProductModal(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminUpdateSettings(settingsForm);
  };

  const handleApplyBalanceAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustUserModal) return;
    adminUpdateUserBalance(adjustUserModal.id, Number(adjustAmount), adjustNote);
    setAdjustUserModal(null);
  };

  return (
    <div className="space-y-5 pb-20 max-w-6xl mx-auto">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-1.5 border border-amber-500/30">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {lang === 'bn' ? 'এডমিন সুপার কন্ট্রোল প্যানেল' : 'Admin Control Hub'}
          </div>
          <h2 className="text-xl font-black text-slate-100">
            {lang === 'bn' ? 'দৈনিক প্রডাক্ট, কমিশন ও ট্রানজেকশন ম্যানেজমেন্ট' : 'Daily Products, Commissions & Financial Approval'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'bn' 
              ? 'প্রতিদিন নতুন প্রডাক্ট যোগ, দাম ও কমিশন পরিবর্তন, এবং বিকাশ/নগদ/রকেট পেমেন্ট অনুমোদন করুন।'
              : 'Add/update daily products with custom prices and commission rates, verify deposits & process withdrawals.'}
          </p>
        </div>

        {/* Pending Badges */}
        <div className="flex items-center gap-2">
          {pendingDeposits.length > 0 && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              {pendingDeposits.length} {lang === 'bn' ? 'ডিপোজিট বাকি' : 'Deposits'}
            </div>
          )}
          {pendingWithdrawals.length > 0 && (
            <div className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
              {pendingWithdrawals.length} {lang === 'bn' ? 'উইথড্র বাকি' : 'Withdrawals'}
            </div>
          )}
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-800">
        {[
          { id: 'products', label: lang === 'bn' ? '🛒 প্রডাক্ট ও কমিশন' : '🛒 Products & Pricing', count: products.length },
          { id: 'deposits', label: lang === 'bn' ? '💳 ডিপোজিট অনুমোদন' : '💳 Deposits Queue', count: pendingDeposits.length },
          { id: 'withdrawals', label: lang === 'bn' ? '💸 উইথড্রয়াল প্রসেসিং' : '💸 Withdraw Queue', count: pendingWithdrawals.length },
          { id: 'users', label: lang === 'bn' ? '👥 ইউজার লিস্ট' : '👥 Users & Balances', count: users.length },
          { id: 'kyc', label: lang === 'bn' ? '🛡️ কেওয়াইসি রিভিউ' : '🛡️ KYC Reviews', count: pendingKycUsers.length },
          { id: 'settings', label: lang === 'bn' ? '⚙️ পেমেন্ট নম্বর ও সেটিংস' : '⚙️ Payment Gateways & Rates' },
          { id: 'app_export', label: lang === 'bn' ? '📱 WebView ও APK কোড' : '📱 WebView & APK Export' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeAdminTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                activeAdminTab === tab.id ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: Products & Commission Management */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">
              {lang === 'bn' ? 'দৈনিক পণ্য, মূল্য ও কমিশন তালিকা' : 'Daily Products & Commission Rates'}
            </h3>
            <button
              onClick={handleOpenAddProduct}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Product'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-3 bg-slate-950">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-xs">
                      +{product.commissionPercent}% Commission
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-200 line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                    {product.titleBn}
                  </p>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'মূল্য:' : 'Price:'}</span>
                      <span className="font-extrabold text-slate-100">৳{product.price.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-400 block">{lang === 'bn' ? 'কমিশন:' : 'Per Task:'}</span>
                      <span className="font-black text-emerald-400">৳{product.commissionAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleOpenEditProduct(product)}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'bn' ? 'সম্পাদনা' : 'Edit'}</span>
                  </button>

                  <button
                    onClick={() => adminDeleteProduct(product.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Deposits Queue */}
      {activeAdminTab === 'deposits' && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">
            {lang === 'bn' ? 'অপেক্ষমাণ বিকাশ / নগদ / রকেট ডিপোজিট' : 'Pending Deposits Approval Queue'}
          </h3>

          {pendingDeposits.length > 0 ? (
            <div className="space-y-3">
              {pendingDeposits.map(tx => (
                <div
                  key={tx.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{tx.userName}</span>
                      <span className="text-[11px] text-slate-400">({tx.userPhone})</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {tx.method}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">TrxID: </span>
                      <strong className="font-mono text-emerald-300 font-bold tracking-wider">{tx.trxId}</strong>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      {lang === 'bn' ? 'প্রেরক নম্বর:' : 'Sender Phone:'} {tx.accountNo} • {tx.createdAt}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'ডিপোজিট পরিমাণ:' : 'Amount:'}</span>
                      <span className="text-lg font-black text-emerald-400">৳{tx.amount.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adminApproveDeposit(tx.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-md shadow-emerald-500/20 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{lang === 'bn' ? 'অনুমোদন' : 'Approve'}</span>
                      </button>

                      <button
                        onClick={() => adminRejectDeposit(tx.id)}
                        className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-xs font-bold"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'কোনো অপেক্ষমাণ ডিপোজিট নেই।' : 'No pending deposits to verify right now.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Withdrawals Queue */}
      {activeAdminTab === 'withdrawals' && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">
            {lang === 'bn' ? 'উইথড্রয়াল প্রসেসিং ও পেমেন্ট ডেলিভারি' : 'Pending Withdrawals Processing'}
          </h3>

          {pendingWithdrawals.length > 0 ? (
            <div className="space-y-3">
              {pendingWithdrawals.map(tx => (
                <div
                  key={tx.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-500/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{tx.userName}</span>
                      <span className="text-[11px] text-slate-400">({tx.userPhone})</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {tx.method}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      <span className="text-slate-400">{lang === 'bn' ? 'প্রাপক নম্বর:' : 'Target Account:'} </span>
                      <strong className="font-mono text-cyan-300 font-bold">{tx.accountNo}</strong>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      {tx.createdAt} {tx.fee ? `• Fee: ৳${tx.fee}` : ''}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'পাঠাতে হবে:' : 'Send Net:'}</span>
                      <span className="text-lg font-black text-cyan-300">৳{((tx.amount || 0) - (tx.fee || 0)).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adminApproveWithdraw(tx.id)}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black shadow-md shadow-cyan-500/20 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{lang === 'bn' ? 'পেমেন্ট সম্পন্ন' : 'Mark Paid'}</span>
                      </button>

                      <button
                        onClick={() => adminRejectWithdraw(tx.id, 'Account info incorrect')}
                        className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-xs font-bold"
                        title="Reject & Refund balance"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'কোনো অপেক্ষমাণ উইথড্রয়াল নেই।' : 'No pending withdrawals to process.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Users Management */}
      {activeAdminTab === 'users' && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">
            {lang === 'bn' ? 'নিবন্ধিত ইউজার তালিকা ও ব্যালেন্স সমন্বয়' : 'Registered Users & Balance Manager'}
          </h3>

          <div className="space-y-2.5">
            {users.map(u => (
              <div
                key={u.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-200">
                    {u.role === 'admin' ? '👑' : u.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{u.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                        VIP {u.vipLevel}
                      </span>
                      {u.isBanned && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-bold">
                          BANNED
                        </span>
                      )}
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        u.isVerificationFeePaid 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                      }`}>
                        {u.isVerificationFeePaid ? (lang === 'bn' ? 'উইথড্র সক্রিয়' : 'Verified') : (lang === 'bn' ? 'ফি বকেয়া' : 'Unverified')}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {u.phone} • {lang === 'bn' ? 'ব্যালেন্স:' : 'Balance:'} <strong className="text-emerald-400 font-bold">৳{u.balance.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adminToggleUserVerification(u.id)}
                    title={lang === 'bn' ? 'উইথড্র ভেরিফিকেশন ফি অন/অফ করুন' : 'Toggle Verification Status'}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      u.isVerificationFeePaid
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                    }`}
                  >
                    {u.isVerificationFeePaid ? (lang === 'bn' ? '✓ ভেরিফাইড' : '✓ Verified') : (lang === 'bn' ? 'ভেরিফাই করুন' : 'Verify')}
                  </button>

                  <button
                    onClick={() => {
                      setAdjustUserModal({ id: u.id, name: u.name, balance: u.balance });
                      setAdjustAmount(500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'ব্যালেন্স অ্যাড/কাট' : 'Adjust Balance'}</span>
                  </button>

                  {u.role !== 'admin' && (
                    <button
                      onClick={() => adminToggleUserBan(u.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        u.isBanned 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                          : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {u.isBanned ? (lang === 'bn' ? 'আনব্যান' : 'Unban') : (lang === 'bn' ? 'ব্যান' : 'Ban')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: KYC Reviews */}
      {activeAdminTab === 'kyc' && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-200">
            {lang === 'bn' ? 'কেওয়াইসি ডকুমেন্ট ভেরিফিকেশন' : 'KYC Verification Review Queue'}
          </h3>

          {pendingKycUsers.length > 0 ? (
            <div className="space-y-3">
              {pendingKycUsers.map(u => (
                <div key={u.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm">{u.name}</h4>
                      <p className="text-xs text-slate-400">{u.phone}</p>
                      <div className="mt-1 text-xs text-slate-300">
                        {lang === 'bn' ? 'ডকুমেন্ট নম্বর:' : 'Doc Number:'} <strong className="font-mono text-emerald-400">{u.kycData?.docNumber}</strong> ({u.kycData?.docType?.toUpperCase()})
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => adminApproveKyc(u.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                      >
                        {lang === 'bn' ? 'অনুমোদন' : 'Verify'}
                      </button>
                      <button
                        onClick={() => adminRejectKyc(u.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-400 font-bold text-xs"
                      >
                        {lang === 'bn' ? 'বাতিল' : 'Reject'}
                      </button>
                    </div>
                  </div>

                  {u.kycData?.frontImage && (
                    <div className="grid grid-cols-2 gap-2">
                      <img src={u.kycData.frontImage} alt="Front" className="h-28 w-full object-cover rounded-lg border border-slate-750" />
                      {u.kycData.backImage && (
                        <img src={u.kycData.backImage} alt="Back" className="h-28 w-full object-cover rounded-lg border border-slate-750" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-slate-900/50 border border-slate-800 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400">
                {lang === 'bn' ? 'কোনো অপেক্ষমাণ কেওয়াইসি রিকোয়েস্ট নেই।' : 'All KYC submissions verified.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: Settings & Payment Numbers */}
      {activeAdminTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            {lang === 'bn' ? 'অফিসিয়াল ডিপোজিট নম্বরসমূহ (বিকাশ / নগদ / রকেট):' : 'Official Deposit Numbers (bKash / Nagad / Rocket):'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-pink-400 mb-1">
                bKash Number:
              </label>
              <input
                type="text"
                value={settingsForm.bkashNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, bkashNumber: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono font-bold text-pink-300 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-orange-400 mb-1">
                Nagad Number:
              </label>
              <input
                type="text"
                value={settingsForm.nagadNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, nagadNumber: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono font-bold text-orange-300 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-400 mb-1">
                Rocket Number:
              </label>
              <input
                type="text"
                value={settingsForm.rocketNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, rocketNumber: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-mono font-bold text-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'সর্বনিম্ন ডিপোজিট সীমা (৳):' : 'Min Deposit Limit (BDT):'}
              </label>
              <input
                type="number"
                value={settingsForm.minDeposit}
                onChange={(e) => setSettingsForm({ ...settingsForm, minDeposit: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {lang === 'bn' ? 'সর্বনিম্ন উইথড্র সীমা (৳):' : 'Min Withdraw Limit (BDT):'}
              </label>
              <input
                type="number"
                value={settingsForm.minWithdraw}
                onChange={(e) => setSettingsForm({ ...settingsForm, minWithdraw: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-slate-200"
              />
            </div>
          </div>

          {/* Fast Withdrawal Verification Fee Settings */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300 block">
                  {lang === 'bn' ? 'ফাস্ট উত্তোলন ভেরিফিকেশন ফি (Security Fee):' : 'Fast Withdrawal Verification Fee:'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? 'উইথড্র করার আগে ইউজারকে এই ফি প্রদান করতে হবে' : 'Users must pay this verification fee before first withdrawal'}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.fastWithdrawVerificationRequired ?? true}
                  onChange={(e) => setSettingsForm({ ...settingsForm, fastWithdrawVerificationRequired: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                {lang === 'bn' ? 'ভেরিফিকেশন ফি এর পরিমাণ (টাকা):' : 'Verification Fee Amount (BDT):'}
              </label>
              <input
                type="number"
                value={settingsForm.fastWithdrawVerificationFee ?? 228}
                onChange={(e) => setSettingsForm({ ...settingsForm, fastWithdrawVerificationFee: Number(e.target.value) })}
                placeholder="228"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-amber-300 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {lang === 'bn' ? 'হোমপেজ নোটিশ ব্যানার (বাংলা):' : 'Announcement Banner Text (Bangla):'}
            </label>
            <input
              type="text"
              value={settingsForm.noticeTextBn}
              onChange={(e) => setSettingsForm({ ...settingsForm, noticeTextBn: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{lang === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save System Settings'}</span>
          </button>
        </form>
      )}

      {/* TAB 7: WebView & APK Developer Hub (Admin Only) */}
      {activeAdminTab === 'app_export' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-750 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                📱
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-100">
                  {lang === 'bn' ? 'অ্যাডমিন WebView ও মোবাইল অ্যাপ এক্সপোর্ট হাব' : 'Admin WebView & Mobile App Export Hub'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'bn' 
                    ? 'এই পেজটি সম্পূর্ণ সুরক্ষিত এবং শুধুমাত্র অ্যাডমিন প্যানেলেই উপলব্ধ। সাধারণ ইউজাররা এই কোড বা ZIP দেখতে পারবে না।' 
                    : 'This page is strictly private to the Admin Panel. Regular users cannot see or download this source code.'}
                </p>
              </div>
            </div>
          </div>

          {/* 1. Live Internet WebView Integration */}
          <div className="bg-slate-900 border border-sky-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-sky-400" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                {lang === 'bn' ? '১. লাইভ অনলাইন WebView লিঙ্ক (সেরা পদ্ধতি)' : '1. Live Online WebView URL (Recommended)'}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার Android Studio বা Web-to-APK মেকারে সরাসরি এই লিঙ্কটি যুক্ত করুন। এতে ভবিষ্যতে যেকোনো আপডেট স্বয়ংক্রিয়ভাবে কার্যকর হবে।'
                : 'Use this live URL inside your Android WebView app for instant real-time over-the-air updates.'}
            </p>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs text-sky-300 font-mono select-all truncate">
                {liveAppUrl}
              </span>
              <button
                onClick={handleCopyUrl}
                className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি লিঙ্ক' : 'Copy URL')}</span>
              </button>
            </div>
          </div>

          {/* 2. Complete Offline Ready ZIP Package & Direct Download */}
          <div className="bg-slate-900 border border-cyan-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <DownloadCloud className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                {lang === 'bn' ? '২. সম্পূর্ণ ওয়েবসাইট বিল্ড ZIP ফাইল (Web Hosting / Tiiny / Netlify)' : '2. Production Website Build ZIP (Web Hosting / Tiiny / Netlify)'}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'এই ZIP ফাইলটির ভেতর সম্পূর্ণ রেডি কোড রয়েছে। এটি সরাসরি Netlify Drop বা Tiiny.host এ আপলোড করলে সাথে সাথে ফ্রি ওয়েবসাইট চালু হবে।'
                : 'Production compiled bundle ready to upload to Tiiny.host, Netlify, or cPanel.'}
            </p>

            <div className="flex flex-wrap gap-2.5">
              <a
                href="/website_live_build.zip"
                download="website_live_build.zip"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>
                  {lang === 'bn' ? '📥 সরাসরি ZIP ডাউনলোড করুন (website_live_build.zip)' : '📥 Download Ready Website ZIP (520 KB)'}
                </span>
              </a>

              <a
                href="/dist/index.html"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>
                  {lang === 'bn' ? '🌐 সরাসরি ব্রাউজারে খুলুন' : '🌐 Open Build Page'}
                </span>
              </a>
            </div>
          </div>

          {/* 3. Android Studio Setup Code */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 font-mono text-[11px]">
            <div className="flex items-center gap-2 text-slate-400 font-sans font-bold text-xs">
              <Code className="w-3.5 h-3.5 text-amber-400" />
              <span>Android Studio MainActivity.java Code:</span>
            </div>
            <pre className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 text-emerald-300 overflow-x-auto text-[10px] leading-relaxed">
{`webView.getSettings().setJavaScriptEnabled(true);
webView.getSettings().setDomStorageEnabled(true);
webView.setWebViewClient(new WebViewClient());
webView.loadUrl("${liveAppUrl}");`}
            </pre>
          </div>
        </div>
      )}

      {/* Product Create / Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl p-5 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-base">
                {editingProduct 
                  ? (lang === 'bn' ? 'পণ্য ও কমিশন সম্পাদনা করুন' : 'Edit Product & Commission')
                  : (lang === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Commission Product')}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title (English):</label>
                <input
                  type="text"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM5 ANC Headphones"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">পণ্যের নাম (বাংলা):</label>
                <input
                  type="text"
                  value={productForm.titleBn}
                  onChange={(e) => setProductForm({ ...productForm, titleBn: e.target.value })}
                  placeholder="e.g. সোনি ওয়্যারলেস হেডফোন"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">{lang === 'bn' ? 'মূল্য (টাকা):' : 'Price (BDT):'}</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-400 mb-1">{lang === 'bn' ? 'কমিশন শতকরা (%):' : 'Commission (%):'}</label>
                  <input
                    type="number"
                    step="0.1"
                    value={productForm.commissionPercent}
                    onChange={(e) => setProductForm({ ...productForm, commissionPercent: Number(e.target.value) })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-emerald-300"
                  />
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                {lang === 'bn' ? 'ব্যবহারকারী প্রতি টাস্কে পাবে:' : 'User earns per task:'} <strong>৳{Math.round((productForm.price * productForm.commissionPercent) / 100 * 10) / 10}</strong> BDT
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL:</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="https://..."
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category:</label>
                <select
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                >
                  <option value="Smart Wearables">Smart Wearables</option>
                  <option value="Audio & Gadgets">Audio & Gadgets</option>
                  <option value="Cameras & Drones">Cameras & Drones</option>
                  <option value="Computer Accessories">Computer Accessories</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Fashion & Footwear">Fashion & Footwear</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black"
                >
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust User Balance Modal */}
      {adjustUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm">
              {lang === 'bn' ? 'ইউজার ব্যালেন্স সমন্বয় করুন' : 'Adjust User Balance'}
            </h3>
            <p className="text-xs text-slate-400">
              User: <strong className="text-slate-200">{adjustUserModal.name}</strong> (Current: ৳{adjustUserModal.balance.toFixed(2)})
            </p>

            <form onSubmit={handleApplyBalanceAdjust} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">{lang === 'bn' ? 'যোগ/বিয়োগ পরিমাণ (+ বা -):' : 'Amount to add (+ or -):'}</label>
                <input
                  type="number"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm font-bold text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">{lang === 'bn' ? 'কারণ / নোট:' : 'Reason / Note:'}</label>
                <input
                  type="text"
                  value={adjustNote}
                  onChange={(e) => setAdjustNote(e.target.value)}
                  placeholder="e.g. Deposit Manual Fix"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustUserModal(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

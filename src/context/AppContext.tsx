import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, SystemSettings, Transaction, User, ReferralMember, PaymentMethod, VipPackage, InvestmentPlan, UserInvestment } from '../types';
import { initialAdmin, initialProducts, initialReferrals, initialSettings, initialTransactions, initialUser, vipPackagesList, investmentPlansList } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  products: Product[];
  transactions: Transaction[];
  referrals: ReferralMember[];
  vipPackages: VipPackage[];
  investmentPlans: InvestmentPlan[];
  userInvestments: UserInvestment[];
  systemSettings: SystemSettings;
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  
  // Auth
  login: (phone: string, pin: string, asAdmin?: boolean) => { success: boolean; message: string };
  register: (data: { name: string; phone: string; email?: string; pin: string; referralCode?: string }) => { success: boolean; message: string };
  logout: () => void;
  switchRole: (role: 'user' | 'admin') => void;
  updateUserProfile: (updates: Partial<User>) => void;
  
  // Actions
  submitDeposit: (data: { amount: number; method: PaymentMethod; accountNo: string; trxId: string; proofImage?: string }) => boolean;
  submitWithdraw: (data: { amount: number; method: PaymentMethod; accountNo: string; pin: string }) => { success: boolean; message: string };
  submitKyc: (data: { docType: 'nid' | 'passport' | 'driving_license'; docNumber: string; fullName: string; frontImage?: string; backImage?: string }) => void;
  completeTask: (productId: string) => { success: boolean; earned: number; message: string };
  payVerificationFee: (method: PaymentMethod, accountNo: string, trxId: string) => boolean;
  payVerificationFeeWithBalance: () => boolean;
  buyVipPackage: (packageId: string) => boolean;
  investInPlan: (planId: string, amount: number) => boolean;
  claimDailyInvestmentProfit: () => void;
  
  // Admin Operations
  adminApproveDeposit: (id: string) => void;
  adminRejectDeposit: (id: string, reason?: string) => void;
  adminApproveWithdraw: (id: string) => void;
  adminRejectWithdraw: (id: string, reason?: string) => void;
  adminApproveKyc: (userId: string) => void;
  adminRejectKyc: (userId: string) => void;
  adminToggleUserVerification: (userId: string) => void;
  adminAddProduct: (product: Omit<Product, 'id'>) => void;
  adminUpdateProduct: (id: string, updates: Partial<Product>) => void;
  adminDeleteProduct: (id: string) => void;
  adminUpdateSettings: (settings: Partial<SystemSettings>) => void;
  adminUpdateUserBalance: (userId: string, amount: number, note: string) => void;
  adminToggleUserBan: (userId: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'earnzone_bd_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or fall back
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_all_users`);
    return saved ? JSON.parse(saved) : [initialUser, initialAdmin];
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [referrals, setReferrals] = useState<ReferralMember[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_referrals`);
    return saved ? JSON.parse(saved) : initialReferrals;
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [lang, setLang] = useState<'bn' | 'en'>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_lang`);
    return (saved as 'bn' | 'en') || 'bn';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Synchronize to localStorage
  useEffect(() => {
    if (currentUser) localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_all_users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_transactions`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_referrals`, JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_settings`, JSON.stringify(systemSettings));
  }, [systemSettings]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_lang`, lang);
  }, [lang]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const login = (phone: string, pin: string, asAdmin: boolean = false) => {
    if (asAdmin) {
      setCurrentUser(initialAdmin);
      showToast(lang === 'bn' ? 'এডমিন হিসেবে লগইন সফল হয়েছে' : 'Admin Login Successful', 'success');
      return { success: true, message: 'Logged in as Admin' };
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const found = users.find(u => u.phone.replace(/[^0-9]/g, '') === cleanPhone);

    if (found) {
      if (found.isBanned) {
        showToast(lang === 'bn' ? 'এই অ্যাকাউন্টটি স্থগিত করা হয়েছে' : 'This account has been banned by Admin', 'error');
        return { success: false, message: 'Account is banned' };
      }
      if (found.pinCode && found.pinCode !== pin) {
        showToast(lang === 'bn' ? 'ভুল পিন কোড প্রবেশ করেছেন' : 'Invalid PIN Code', 'error');
        return { success: false, message: 'Invalid PIN' };
      }
      setCurrentUser(found);
      showToast(lang === 'bn' ? `স্বাগতম, ${found.name}!` : `Welcome back, ${found.name}!`, 'success');
      return { success: true, message: 'Login successful' };
    } else {
      // Create quick user if phone is valid bangladeshi format
      if (cleanPhone.length >= 10) {
        const newUser: User = {
          id: `usr-${Date.now().toString().slice(-4)}`,
          name: `User ${cleanPhone.slice(-4)}`,
          phone: cleanPhone,
          email: `${cleanPhone}@earnzone.bd`,
          balance: 100.00, // ৳100 Welcome bonus
          todayEarning: 0,
          totalEarning: 100.00,
          totalWithdrawn: 0,
          totalDeposited: 0,
          vipLevel: 1,
          dailyTasksCompleted: 0,
          dailyTaskLimit: 10,
          referralCode: `EZ${cleanPhone.slice(-4)}`,
          kycStatus: 'unverified',
          role: 'user',
          pinCode: pin || '123456',
          createdAt: new Date().toISOString().split('T')[0],
          isBanned: false,
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        showToast(lang === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি হয়েছে! ৳১০০ ওয়েলকাম বোনাস যুক্ত করা হয়েছে।' : 'New account created with ৳100 Welcome Bonus!', 'success');
        return { success: true, message: 'Account created with bonus' };
      }
      showToast(lang === 'bn' ? 'সঠিক মোবাইল নম্বর দিন' : 'Please provide a valid phone number', 'error');
      return { success: false, message: 'User not found' };
    }
  };

  const register = (data: { name: string; phone: string; email?: string; pin: string; referralCode?: string }) => {
    const cleanPhone = data.phone.replace(/[^0-9]/g, '');
    const exists = users.some(u => u.phone.replace(/[^0-9]/g, '') === cleanPhone);

    if (exists) {
      showToast(lang === 'bn' ? 'এই নম্বরে ইতিমধ্যে অ্যাকাউন্ট রয়েছে। লগইন করুন।' : 'Account already exists for this number. Please login.', 'error');
      return { success: false, message: 'Account exists' };
    }

    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: data.name || `User ${cleanPhone.slice(-4)}`,
      phone: cleanPhone,
      email: data.email || `${cleanPhone}@earnzone.bd`,
      balance: 150.00, // ৳150 Registration Bonus
      todayEarning: 0,
      totalEarning: 150.00,
      totalWithdrawn: 0,
      totalDeposited: 0,
      vipLevel: 1,
      dailyTasksCompleted: 0,
      dailyTaskLimit: 10,
      referralCode: `EZ${Math.floor(1000 + Math.random() * 9000)}`,
      referredBy: data.referralCode,
      kycStatus: 'unverified',
      role: 'user',
      pinCode: data.pin,
      createdAt: new Date().toISOString().split('T')[0],
      isBanned: false,
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    
    // Add Welcome Transaction
    const welcomeTrx: Transaction = {
      id: `TRX-${Date.now().toString().slice(-5)}`,
      userId: newUser.id,
      userName: newUser.name,
      userPhone: newUser.phone,
      type: 'admin_adjustment',
      amount: 150,
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: 'New Member Registration Bonus (৳150)',
    };
    setTransactions(prev => [welcomeTrx, ...prev]);

    showToast(lang === 'bn' ? 'রেজিস্ট্রেশন সফল হয়েছে! ৳১৫০ বোনাস পেয়ে গেছেন।' : 'Registration successful! ৳150 bonus credited.', 'success');
    return { success: true, message: 'Success' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    showToast(lang === 'bn' ? 'লগআউট করা হয়েছে' : 'Logged out successfully', 'info');
  };

  const switchRole = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(initialAdmin);
      setActiveTab('admin');
      showToast(lang === 'bn' ? 'এডমিন মোডে স্যুইচ করা হয়েছে' : 'Switched to Admin Mode', 'info');
    } else {
      const standardUser = users.find(u => u.role === 'user') || initialUser;
      setCurrentUser(standardUser);
      setActiveTab('dashboard');
      showToast(lang === 'bn' ? 'ইউজার মোডে স্যুইচ করা হয়েছে' : 'Switched to User Mode', 'info');
    }
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    showToast(lang === 'bn' ? 'প্রোফাইল আপডেট সম্পন্ন হয়েছে' : 'Profile updated successfully', 'success');
  };

  const submitDeposit = (data: { amount: number; method: PaymentMethod; accountNo: string; trxId: string; proofImage?: string }) => {
    if (!currentUser) return false;

    if (data.amount < systemSettings.minDeposit) {
      showToast(lang === 'bn' ? `সর্বনিম্ন ডিপোজিট ৳${systemSettings.minDeposit}` : `Minimum deposit is ৳${systemSettings.minDeposit}`, 'error');
      return false;
    }

    if (!data.trxId || data.trxId.trim().length < 5) {
      showToast(lang === 'bn' ? 'সঠিক ট্রানজেকশন আইডি (TrxID) দিন' : 'Please provide a valid Transaction ID', 'error');
      return false;
    }

    const newTx: Transaction = {
      id: `DEP-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'deposit',
      amount: data.amount,
      method: data.method,
      accountNo: data.accountNo,
      trxId: data.trxId.toUpperCase().trim(),
      status: 'pending',
      createdAt: new Date().toLocaleString(),
      proofImage: data.proofImage,
      note: `Deposit via ${data.method.toUpperCase()} to ${data.method === 'rocket' ? systemSettings.rocketNumber : data.method === 'nagad' ? systemSettings.nagadNumber : systemSettings.bkashNumber}`,
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(lang === 'bn' ? 'ডিপোজিট আবেদন জমা হয়েছে। এডমিন ভেরিফাই করে ৫-১৫ মিনিটে ব্যালেন্স যোগ করবেন।' : 'Deposit submitted! Balance will be credited after admin verification (5-15 mins).', 'success');
    return true;
  };

  const submitWithdraw = (data: { amount: number; method: PaymentMethod; accountNo: string; pin: string }) => {
    if (!currentUser) return { success: false, message: 'Not logged in' };

    if (data.amount < systemSettings.minWithdraw) {
      const msg = lang === 'bn' ? `সর্বনিম্ন উইথড্র ৳${systemSettings.minWithdraw}` : `Minimum withdrawal is ৳${systemSettings.minWithdraw}`;
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    if (data.amount > currentUser.balance) {
      const msg = lang === 'bn' ? 'অপর্যাপ্ত ব্যালেন্স রয়েছে' : 'Insufficient balance';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    if (currentUser.pinCode && data.pin !== currentUser.pinCode) {
      const msg = lang === 'bn' ? 'ভুল সিকিউরিটি পিন নম্বর' : 'Invalid Security PIN';
      showToast(msg, 'error');
      return { success: false, message: msg };
    }

    const fee = (data.amount * systemSettings.withdrawFeePercent) / 100;
    const totalDeduct = data.amount;

    // Deduct user balance immediately
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance - totalDeduct,
      totalWithdrawn: currentUser.totalWithdrawn + data.amount,
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `WTH-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'withdraw',
      amount: data.amount,
      fee: fee,
      method: data.method,
      accountNo: data.accountNo,
      status: 'pending',
      createdAt: new Date().toLocaleString(),
      note: `Withdrawal request to ${data.method.toUpperCase()} (${data.accountNo}). Fee: ৳${fee}`,
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(lang === 'bn' ? 'উইথড্র আবেদন সফলভাবে সম্পন্ন হয়েছে। এডমিন শীঘ্রই টাকা পাঠিয়ে দিবেন।' : 'Withdrawal request submitted! Admin will send payment shortly.', 'success');
    return { success: true, message: 'Withdrawal requested' };
  };

  const submitKyc = (data: { docType: 'nid' | 'passport' | 'driving_license'; docNumber: string; fullName: string; frontImage?: string; backImage?: string }) => {
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      kycStatus: 'pending',
      kycData: {
        ...data,
        submittedAt: new Date().toLocaleString(),
      },
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    showToast(lang === 'bn' ? 'কেওয়াইসি ডকুমেন্ট জমা হয়েছে। এডমিন অনুমোদনের অপেক্ষায় রয়েছে।' : 'KYC verification submitted. Awaiting admin review.', 'success');
  };

  const completeTask = (productId: string) => {
    if (!currentUser) return { success: false, earned: 0, message: 'Not logged in' };

    if (currentUser.dailyTasksCompleted >= currentUser.dailyTaskLimit) {
      const msg = lang === 'bn' ? 'আজকের জন্য আপনার টাস্ক লিমিট শেষ হয়ে গেছে। কাল আবার চেষ্টা করুন অথবা ভিআইপি আপগ্রেড করুন।' : 'Daily task limit reached for your VIP tier!';
      showToast(msg, 'error');
      return { success: false, earned: 0, message: msg };
    }

    const product = products.find(p => p.id === productId) || products[0];
    if (!product) return { success: false, earned: 0, message: 'Product not found' };

    const commission = (product.price * product.commissionPercent) / 100;
    const earned = Math.round(commission * 100) / 100;

    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance + earned,
      todayEarning: currentUser.todayEarning + earned,
      totalEarning: currentUser.totalEarning + earned,
      dailyTasksCompleted: currentUser.dailyTasksCompleted + 1,
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const taskTrx: Transaction = {
      id: `COMM-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'commission',
      amount: earned,
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: `Task Commission: ${product.title.slice(0, 30)}... (+${product.commissionPercent}%)`,
    };

    setTransactions(prev => [taskTrx, ...prev]);

    return {
      success: true,
      earned,
      message: lang === 'bn' ? `অভিনন্দন! আপনি ৳${earned.toFixed(2)} কমিশন পেয়েছেন!` : `Success! You earned ৳${earned.toFixed(2)} commission!`,
    };
  };

  const payVerificationFee = (method: PaymentMethod, accountNo: string, trxId: string) => {
    if (!currentUser) return false;
    if (!trxId || trxId.trim().length < 5) {
      showToast(lang === 'bn' ? 'সঠিক ট্রানজেকশন আইডি (TrxID) দিন' : 'Please provide a valid Transaction ID', 'error');
      return false;
    }

    const newTx: Transaction = {
      id: `VER-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'deposit',
      amount: systemSettings.fastWithdrawVerificationFee || 228,
      method: method,
      accountNo: accountNo,
      trxId: trxId.toUpperCase().trim(),
      status: 'pending',
      createdAt: new Date().toLocaleString(),
      note: `Fast Withdrawal Account Verification Fee (৳${systemSettings.fastWithdrawVerificationFee || 228}) via ${method.toUpperCase()}`,
    };

    setTransactions(prev => [newTx, ...prev]);

    // Mark verification request submitted
    const updated = { ...currentUser, isVerificationFeePaid: true };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));

    showToast(lang === 'bn' ? `৳${systemSettings.fastWithdrawVerificationFee || 228} ভেরিফিকেশন ফি সফলভাবে জমা হয়েছে! এখন দ্রুত উইথড্র করতে পারবেন।` : 'Verification fee submitted! You can now request fast withdrawals.', 'success');
    return true;
  };

  const payVerificationFeeWithBalance = () => {
    if (!currentUser) return false;
    const fee = systemSettings.fastWithdrawVerificationFee || 228;
    if (currentUser.balance < fee) {
      showToast(lang === 'bn' ? `অপর্যাপ্ত ব্যালেন্স! আপনার ওয়ালেটে ৳${fee} থাকতে হবে অথবা বিকাশ/নগদে ফি দিন।` : `Insufficient balance! You need ৳${fee} in wallet.`, 'error');
      return false;
    }

    const updated = {
      ...currentUser,
      balance: currentUser.balance - fee,
      isVerificationFeePaid: true,
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));

    const newTx: Transaction = {
      id: `VER-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'commission',
      amount: -fee,
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: `Fast Withdrawal Verification Fee paid from wallet balance (-৳${fee})`,
    };
    setTransactions(prev => [newTx, ...prev]);

    showToast(lang === 'bn' ? `৳${fee} ব্যালেন্স থেকে কেটে একাউন্ট ভেরিফিকেশন সম্পন্ন হয়েছে!` : `Account verified with ৳${fee} from balance!`, 'success');
    return true;
  };

  const buyVipPackage = (packageId: string) => {
    if (!currentUser) {
      showToast(lang === 'bn' ? 'দয়া করে প্রথমে একাউন্টে লগইন করুন' : 'Please log in first', 'error');
      return false;
    }
    const pkg = vipPackagesList.find(p => p.id === packageId);
    if (!pkg) return false;

    if (currentUser.vipLevel >= pkg.level) {
      showToast(lang === 'bn' ? `আপনি ইতিমধ্যে VIP ${currentUser.vipLevel} বা তার বেশি লেভেলে আছেন!` : `You are already at VIP ${currentUser.vipLevel} or higher!`, 'info');
      return false;
    }

    if (currentUser.balance < pkg.price) {
      showToast(lang === 'bn' ? `অপর্যাপ্ত ব্যালেন্স! ${pkg.nameBn} কিনতে ৳${pkg.price.toLocaleString()} প্রয়োজন। আগে ডিপোজিট করুন।` : `Insufficient balance! You need ৳${pkg.price.toLocaleString()} for ${pkg.name}. Please deposit.`, 'error');
      return false;
    }

    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance - pkg.price,
      vipLevel: pkg.level,
      dailyTaskLimit: pkg.dailyTasks,
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `VIP-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'vip_upgrade',
      amount: -pkg.price,
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: `Upgraded to ${pkg.name} (-৳${pkg.price})`,
    };
    setTransactions(prev => [newTx, ...prev]);

    showToast(lang === 'bn' ? `অভিনন্দন! আপনার অ্যাকাউন্ট সফলভাবে ${pkg.nameBn}-এ আপগ্রেড হয়েছে! দৈনিক আয় ৳${pkg.dailyIncome}।` : `Congratulations! Upgraded to ${pkg.name}. Daily profit ৳${pkg.dailyIncome}.`, 'success');
    return true;
  };

  const investInPlan = (planId: string, amount: number) => {
    if (!currentUser) {
      showToast(lang === 'bn' ? 'দয়া করে প্রথমে একাউন্টে লগইন করুন' : 'Please log in first', 'error');
      return false;
    }
    const plan = investmentPlansList.find(p => p.id === planId);
    if (!plan) return false;

    if (amount < plan.minAmount || amount > plan.maxAmount) {
      showToast(lang === 'bn' ? `বিনিয়োগের পরিমাণ ৳${plan.minAmount} থেকে ৳${plan.maxAmount} এর মধ্যে হতে হবে` : `Amount must be between ৳${plan.minAmount} and ৳${plan.maxAmount}`, 'error');
      return false;
    }

    if (currentUser.balance < amount) {
      showToast(lang === 'bn' ? `অপর্যাপ্ত ব্যালেন্স! আপনার অ্যাকাউন্টে ৳${amount.toLocaleString()} নেই। আগে ডিপোজিট করুন।` : `Insufficient balance! You need ৳${amount.toLocaleString()}. Please deposit.`, 'error');
      return false;
    }

    const dailyReturn = (amount * plan.dailyReturnPercent) / 100;
    const totalReturn = (amount * plan.totalReturnPercent) / 100;

    const newInvestment: UserInvestment = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      planId: plan.id,
      planTitle: plan.titleBn,
      amountInvested: amount,
      dailyReturn,
      totalReturn,
      daysRemaining: plan.durationDays,
      totalDays: plan.durationDays,
      startDate: new Date().toLocaleDateString(),
      status: 'active',
    };

    const currentInvestments = currentUser.activeInvestments || [];
    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance - amount,
      activeInvestments: [newInvestment, ...currentInvestments],
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'investment_profit',
      amount: -amount,
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: `Invested ৳${amount} in ${plan.titleBn} (${plan.durationDays} Days, ${plan.dailyReturnPercent}% Daily)`,
    };
    setTransactions(prev => [newTx, ...prev]);

    showToast(lang === 'bn' ? `সফলভাবে ৳${amount.toLocaleString()} বিনিয়োগ করা হয়েছে! প্রতিদিন ৳${dailyReturn.toFixed(2)} লাভ পাবেন।` : `Successfully invested ৳${amount}! You will earn ৳${dailyReturn.toFixed(2)} daily.`, 'success');
    return true;
  };

  const claimDailyInvestmentProfit = () => {
    if (!currentUser || !currentUser.activeInvestments || currentUser.activeInvestments.length === 0) {
      showToast(lang === 'bn' ? 'আপনার কোনো সক্রিয় বিনিয়োগ প্ল্যান নেই' : 'No active investment plans found', 'info');
      return;
    }

    const activeList = currentUser.activeInvestments.filter(i => i.status === 'active');
    if (activeList.length === 0) {
      showToast(lang === 'bn' ? 'সকল বিনিয়োগ ইতিমধ্যে সম্পন্ন হয়েছে' : 'All investments already completed', 'info');
      return;
    }

    let totalProfitToday = 0;
    const updatedInvestments = currentUser.activeInvestments.map(inv => {
      if (inv.status === 'active' && inv.daysRemaining > 0) {
        totalProfitToday += inv.dailyReturn;
        const nextDays = inv.daysRemaining - 1;
        return {
          ...inv,
          daysRemaining: nextDays,
          status: nextDays <= 0 ? ('completed' as const) : ('active' as const),
        };
      }
      return inv;
    });

    if (totalProfitToday <= 0) {
      showToast(lang === 'bn' ? 'আজকের জন্য কোনো মুনাফা বাকি নেই' : 'No profit to claim right now', 'info');
      return;
    }

    const updatedUser: User = {
      ...currentUser,
      balance: currentUser.balance + totalProfitToday,
      todayEarning: currentUser.todayEarning + totalProfitToday,
      totalEarning: currentUser.totalEarning + totalProfitToday,
      activeInvestments: updatedInvestments,
    };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const newTx: Transaction = {
      id: `PRF-${Date.now().toString().slice(-6)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      type: 'commission',
      amount: totalProfitToday,
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: `Daily Investment Profit Claimed (+৳${totalProfitToday.toFixed(2)})`,
    };
    setTransactions(prev => [newTx, ...prev]);

    showToast(lang === 'bn' ? `🎉 ৳${totalProfitToday.toFixed(2)} বিনিয়োগ মুনাফা আপনার অ্যাকাউন্টে যোগ হয়েছে!` : `🎉 ৳${totalProfitToday.toFixed(2)} daily profit added to balance!`, 'success');
  };

  // Admin Actions
  const adminApproveDeposit = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx || tx.status !== 'pending') return;

    // Credit user balance
    setUsers(prev => prev.map(u => {
      if (u.id === tx.userId) {
        return {
          ...u,
          balance: u.balance + tx.amount,
          totalDeposited: u.totalDeposited + tx.amount,
          // Upgrade VIP tier automatically if threshold crossed
          vipLevel: u.totalDeposited + tx.amount >= 15000 ? 4 : u.totalDeposited + tx.amount >= 5000 ? 3 : u.totalDeposited + tx.amount >= 2000 ? 2 : u.vipLevel,
        };
      }
      return u;
    }));

    if (currentUser && currentUser.id === tx.userId) {
      setCurrentUser(prev => prev ? {
        ...prev,
        balance: prev.balance + tx.amount,
        totalDeposited: prev.totalDeposited + tx.amount,
      } : null);
    }

    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'approved', note: 'Approved by Admin' } : t));
    showToast(lang === 'bn' ? `ডিপোজিট ৳${tx.amount} অনুমোদন করা হয়েছে` : `Deposit of ৳${tx.amount} approved!`, 'success');
  };

  const adminRejectDeposit = (id: string, reason: string = 'Invalid TrxID or receipt') => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected', note: `Rejected: ${reason}` } : t));
    showToast(lang === 'bn' ? 'ডিপোজিট বাতিল করা হয়েছে' : 'Deposit request rejected', 'info');
  };

  const adminApproveWithdraw = (id: string) => {
    const tx = transactions.find(t => t.id === id);
    if (!tx || tx.status !== 'pending') return;

    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'approved', note: 'Payment sent via Agent' } : t));
    showToast(lang === 'bn' ? `উইথড্র ৳${tx.amount} পেমেন্ট পাঠানো হয়েছে` : `Withdrawal of ৳${tx.amount} approved & disbursed!`, 'success');
  };

  const adminRejectWithdraw = (id: string, reason: string = 'Account number error') => {
    const tx = transactions.find(t => t.id === id);
    if (!tx || tx.status !== 'pending') return;

    // Refund balance to user
    setUsers(prev => prev.map(u => {
      if (u.id === tx.userId) {
        return {
          ...u,
          balance: u.balance + tx.amount,
          totalWithdrawn: Math.max(0, u.totalWithdrawn - tx.amount),
        };
      }
      return u;
    }));

    if (currentUser && currentUser.id === tx.userId) {
      setCurrentUser(prev => prev ? {
        ...prev,
        balance: prev.balance + tx.amount,
        totalWithdrawn: Math.max(0, prev.totalWithdrawn - tx.amount),
      } : null);
    }

    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'rejected', note: `Refunded: ${reason}` } : t));
    showToast(lang === 'bn' ? 'উইথড্র বাতিল এবং ব্যবহারকারীর ব্যালেন্স রিফান্ড হয়েছে' : 'Withdrawal rejected & refunded to user balance', 'info');
  };

  const adminApproveKyc = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, kycStatus: 'verified' } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, kycStatus: 'verified' } : null);
    }
    showToast(lang === 'bn' ? 'কেওয়াইসি ভেরিফিকেশন অনুমোদিত হয়েছে' : 'KYC verified successfully', 'success');
  };

  const adminRejectKyc = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, kycStatus: 'rejected' } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, kycStatus: 'rejected' } : null);
    }
    showToast(lang === 'bn' ? 'কেওয়াইসি বাতিল করা হয়েছে' : 'KYC rejected', 'info');
  };

  const adminAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now().toString().slice(-4)}`,
      commissionAmount: Math.round((product.price * product.commissionPercent) / 100 * 10) / 10,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(lang === 'bn' ? 'নতুন প্রডাক্ট যোগ করা হয়েছে' : 'New product added successfully', 'success');
  };

  const adminUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const merged = { ...p, ...updates };
        merged.commissionAmount = Math.round((merged.price * merged.commissionPercent) / 100 * 10) / 10;
        return merged;
      }
      return p;
    }));
    showToast(lang === 'bn' ? 'প্রডাক্ট ও কমিশন আপডেট করা হয়েছে' : 'Product updated successfully', 'success');
  };

  const adminDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(lang === 'bn' ? 'প্রডাক্ট মুছে ফেলা হয়েছে' : 'Product deleted', 'info');
  };

  const adminUpdateSettings = (settings: Partial<SystemSettings>) => {
    setSystemSettings(prev => ({ ...prev, ...settings }));
    showToast(lang === 'bn' ? 'সিস্টেম সেটিংস ও পেমেন্ট নম্বর আপডেট হয়েছে' : 'System Settings updated', 'success');
  };

  const adminUpdateUserBalance = (userId: string, amount: number, note: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, balance: Math.max(0, u.balance + amount) };
      }
      return u;
    }));

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, balance: Math.max(0, prev.balance + amount) } : null);
    }

    const tx: Transaction = {
      id: `ADJ-${Date.now().toString().slice(-6)}`,
      userId,
      userName: users.find(u => u.id === userId)?.name || 'User',
      userPhone: users.find(u => u.id === userId)?.phone || '',
      type: 'admin_adjustment',
      amount: Math.abs(amount),
      method: 'system',
      status: 'approved',
      createdAt: new Date().toLocaleString(),
      note: `Admin Adjustment: ${note} (${amount > 0 ? '+' : ''}${amount} BDT)`,
    };
    setTransactions(prev => [tx, ...prev]);
    showToast(lang === 'bn' ? `ব্যালেন্স সমন্বয় করা হয়েছে (${amount > 0 ? '+' : ''}৳${amount})` : `Balance adjusted: ${amount > 0 ? '+' : ''}৳${amount}`, 'success');
  };

  const adminToggleUserBan = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextBanned = !u.isBanned;
        showToast(nextBanned ? 'ইউজার ব্যান করা হয়েছে' : 'ইউজার আনব্যান করা হয়েছে', 'info');
        return { ...u, isBanned: nextBanned };
      }
      return u;
    }));
  };

  const adminToggleUserVerification = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const next = !u.isVerificationFeePaid;
        showToast(next ? 'উইথড্র ভেরিফিকেশন সম্পন্ন করা হয়েছে' : 'উইথড্র ভেরিফিকেশন বাতিল করা হয়েছে', 'success');
        return { ...u, isVerificationFeePaid: next };
      }
      return u;
    }));

    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, isVerificationFeePaid: !prev.isVerificationFeePaid } : null);
    }
  };

  const resetAllData = () => {
    localStorage.clear();
    setCurrentUser(initialUser);
    setUsers([initialUser, initialAdmin]);
    setProducts(initialProducts);
    setTransactions(initialTransactions);
    setReferrals(initialReferrals);
    setSystemSettings(initialSettings);
    showToast('All data reset to initial demo state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        products,
        transactions,
        referrals,
        vipPackages: vipPackagesList,
        investmentPlans: investmentPlansList,
        userInvestments: currentUser?.activeInvestments || [],
        systemSettings,
        lang,
        setLang,
        activeTab,
        setActiveTab,
        toast,
        showToast,
        login,
        register,
        logout,
        switchRole,
        updateUserProfile,
        submitDeposit,
        submitWithdraw,
        submitKyc,
        completeTask,
        payVerificationFee,
        payVerificationFeeWithBalance,
        buyVipPackage,
        investInPlan,
        claimDailyInvestmentProfit,
        adminApproveDeposit,
        adminRejectDeposit,
        adminApproveWithdraw,
        adminRejectWithdraw,
        adminApproveKyc,
        adminRejectKyc,
        adminToggleUserVerification,
        adminAddProduct,
        adminUpdateProduct,
        adminDeleteProduct,
        adminUpdateSettings,
        adminUpdateUserBalance,
        adminToggleUserBan,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

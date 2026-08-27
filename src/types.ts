export type UserRole = 'user' | 'admin';

export type KycStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'bank';

export type TransactionType = 'deposit' | 'withdraw' | 'commission' | 'referral_bonus' | 'admin_adjustment' | 'vip_upgrade' | 'investment_profit';

export type TransactionStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  todayEarning: number;
  totalEarning: number;
  totalWithdrawn: number;
  totalDeposited: number;
  vipLevel: number; // 1 to 5
  dailyTasksCompleted: number;
  dailyTaskLimit: number;
  referralCode: string;
  referredBy?: string;
  kycStatus: KycStatus;
  kycData?: {
    docType: 'nid' | 'passport' | 'driving_license';
    docNumber: string;
    fullName: string;
    frontImage?: string;
    backImage?: string;
    submittedAt: string;
  };
  role: UserRole;
  pinCode?: string;
  createdAt: string;
  isBanned: boolean;
  avatarUrl?: string;
  isVerificationFeePaid?: boolean;
  activeInvestments?: UserInvestment[];
}

export interface VipPackage {
  id: string;
  level: number;
  name: string;
  nameBn: string;
  price: number; // Price to purchase VIP package in BDT
  dailyIncome: number; // Guaranteed daily income in BDT
  monthlyIncome: number;
  dailyTasks: number;
  validityDays: number;
  popular?: boolean;
  icon: string;
  gradient: string;
  textColor: string;
  badge: string;
  descriptionBn: string;
}

export interface InvestmentPlan {
  id: string;
  title: string;
  titleBn: string;
  minAmount: number;
  maxAmount: number;
  dailyReturnPercent: number; // e.g., 8% daily
  durationDays: number; // e.g., 3 days, 7 days, 15 days
  totalReturnPercent: number; // e.g., 124%
  icon: string;
  color: string;
  popular?: boolean;
}

export interface UserInvestment {
  id: string;
  planId: string;
  planTitle: string;
  amountInvested: number;
  dailyReturn: number;
  totalReturn: number;
  daysRemaining: number;
  totalDays: number;
  startDate: string;
  status: 'active' | 'completed';
}

export interface Product {
  id: string;
  title: string;
  titleBn: string;
  price: number;
  commissionPercent: number; // e.g. 3.5%
  commissionAmount: number; // calculated price * commissionPercent / 100
  image: string;
  category: string;
  rating: number;
  soldCount: number;
  inStock: boolean;
  vipRequired: number;
  createdAt?: string;
}

export interface TaskLog {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  commissionEarned: number;
  completedAt: string;
  status: 'completed';
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  type: TransactionType;
  amount: number;
  method?: PaymentMethod | 'system';
  accountNo?: string;
  trxId?: string;
  status: TransactionStatus;
  createdAt: string;
  note?: string;
  proofImage?: string;
  fee?: number;
}

export interface ReferralMember {
  id: string;
  name: string;
  phone: string;
  joinDate: string;
  level: 1 | 2 | 3;
  totalDeposited: number;
  commissionEarnedForYou: number;
  vipLevel: number;
  status: 'active' | 'inactive';
}

export interface SystemSettings {
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  minDeposit: number;
  minWithdraw: number;
  withdrawFeePercent: number;
  maxDailyTasksVip1: number;
  maxDailyTasksVip2: number;
  maxDailyTasksVip3: number;
  telegramSupportUrl: string;
  telegramChannelUrl: string;
  whatsappNumber: string;
  noticeText: string;
  noticeTextBn: string;
  level1CommissionRate: number; // %
  level2CommissionRate: number; // %
  level3CommissionRate: number; // %
  fastWithdrawVerificationRequired: boolean;
  fastWithdrawVerificationFee: number;
  directApkDownloadUrl?: string;
}

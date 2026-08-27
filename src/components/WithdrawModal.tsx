import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { 
  X, 
  ArrowDownToLine, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Banknote,
  Lock,
  ShieldCheck,
  Zap,
  Copy,
  Check
} from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
  const { 
    systemSettings, 
    submitWithdraw, 
    payVerificationFee, 
    payVerificationFeeWithBalance,
    lang, 
    currentUser, 
    showToast 
  } = useApp();

  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [amount, setAmount] = useState<number>(500);
  const [accountNo, setAccountNo] = useState<string>(currentUser?.phone || '');
  const [pin, setPin] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Verification Fee states
  const [verMethod, setVerMethod] = useState<PaymentMethod>('bkash');
  const [verAccountNo, setVerAccountNo] = useState<string>(currentUser?.phone || '');
  const [verTrxId, setVerTrxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isPayingVerFee, setIsPayingVerFee] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentBalance = currentUser?.balance || 0;
  const fee = (amount * systemSettings.withdrawFeePercent) / 100;
  const netAmount = Math.max(0, amount - fee);

  const verificationRequired = 
    systemSettings.fastWithdrawVerificationRequired && 
    !currentUser?.isVerificationFeePaid && 
    currentUser?.role !== 'admin';

  const verificationFeeAmount = systemSettings.fastWithdrawVerificationFee || 228;

  const getAgentNumber = (m: PaymentMethod) => {
    if (m === 'rocket') return systemSettings.rocketNumber;
    if (m === 'nagad') return systemSettings.nagadNumber;
    return systemSettings.bkashNumber;
  };

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    showToast(lang === 'bn' ? 'নম্বর কপি করা হয়েছে' : 'Number copied!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayVerificationFee = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPayingVerFee(true);
    setTimeout(() => {
      const res = payVerificationFee(verMethod, verAccountNo, verTrxId);
      setIsPayingVerFee(false);
      if (res) {
        setVerTrxId('');
      }
    }, 600);
  };

  const handlePayWithBalance = () => {
    setIsPayingVerFee(true);
    setTimeout(() => {
      payVerificationFeeWithBalance();
      setIsPayingVerFee(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = submitWithdraw({
        amount: Number(amount),
        method,
        accountNo,
        pin,
      });

      setIsSubmitting(false);
      if (res.success) {
        setPin('');
        onClose();
      }
    }, 600);
  };

  return (
    <div id="withdraw-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/30">
              💸
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                {lang === 'bn' ? 'টাকা উত্তোলন (Withdraw)' : 'Withdraw Funds'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'বিকাশ, নগদ, রকেট অথবা ব্যাংক ট্রান্সফার' : 'bKash, Nagad, Rocket or Bank Account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          
          {/* Balance Preview Card */}
          <div className="bg-gradient-to-r from-slate-850 to-slate-900 border border-slate-750 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-medium">
                {lang === 'bn' ? 'বর্তমান উত্তোলনযোগ্য ব্যালেন্স:' : 'Available Balance:'}
              </span>
              <div className="text-xl font-extrabold text-emerald-400">
                ৳{currentBalance.toFixed(2)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAmount(Math.floor(currentBalance))}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all"
            >
              {lang === 'bn' ? 'সব ব্যালেন্স' : 'All Funds'}
            </button>
          </div>

          {/* Verification Fee Requirement Section (If not verified) */}
          {verificationRequired ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3.5 animate-in slide-in-from-top-2">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                    <span>{lang === 'bn' ? 'ফাস্ট টাকা উত্তোলনের জন্য ভেরিফিকেশন ফি' : 'Fast Withdrawal Verification Fee'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-[11px] font-mono font-bold">
                      ৳{verificationFeeAmount}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {lang === 'bn' 
                      ? `প্রথমবার বা দ্রুত টাকা তোলার জন্য আপনার একাউন্ট সিকিউরিটি ভেরিফিকেশন ফি ৳${verificationFeeAmount} প্রদান করতে হবে। এই ফি জমা দিলে সাথে সাথে আপনার উত্তোলন সক্রিয় হবে।` 
                      : `To enable instant withdrawals, a one-time verification fee of ৳${verificationFeeAmount} is required.`}
                  </p>
                </div>
              </div>

              {/* Pay with Available Balance Button if user has sufficient funds */}
              {currentBalance >= verificationFeeAmount && (
                <div className="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-200">
                      {lang === 'bn' ? 'ওয়ালেট ব্যালেন্স থেকে সরাসরি ফি দিন:' : 'Pay directly from Wallet Balance:'}
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold">
                      {lang === 'bn' ? `ব্যালেন্স থেকে ৳${verificationFeeAmount} কেটে এখনই সক্রিয় করুন` : `Deduct ৳${verificationFeeAmount} and activate instantly`}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePayWithBalance}
                    disabled={isPayingVerFee}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{isPayingVerFee ? '...' : (lang === 'bn' ? 'ব্যালেন্সে ফি দিন' : 'Pay ৳' + verificationFeeAmount)}</span>
                  </button>
                </div>
              )}

              {/* Pay via bKash / Nagad / Rocket */}
              <form onSubmit={handlePayVerificationFee} className="space-y-3 pt-1 border-t border-amber-500/20">
                <label className="block text-xs font-bold text-slate-200">
                  {lang === 'bn' ? `বিকাশ / নগদ / রকেটে ৳${verificationFeeAmount} সেন্ড মানি করুন:` : `Send ৳${verificationFeeAmount} via bKash/Nagad/Rocket:`}
                </label>
                
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'bkash', label: 'bKash' },
                    { id: 'nagad', label: 'Nagad' },
                    { id: 'rocket', label: 'Rocket' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setVerMethod(item.id as PaymentMethod)}
                      className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all ${
                        verMethod === item.id
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Number Card */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{verMethod} Personal Number</span>
                    <div className="text-sm font-mono font-black text-amber-300">
                      {getAgentNumber(verMethod)}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyNumber(getAgentNumber(verMethod))}
                    className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30 text-xs font-bold flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {/* Input TrxID & Account */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {lang === 'bn' ? 'আপনার প্রেরক নম্বর:' : 'Sender Phone No:'}
                    </label>
                    <input
                      type="text"
                      value={verAccountNo}
                      onChange={(e) => setVerAccountNo(e.target.value)}
                      placeholder="017xxxxxxxx"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      {lang === 'bn' ? 'ট্রানজেকশন আইডি (TrxID):' : 'Transaction ID (TrxID):'}
                    </label>
                    <input
                      type="text"
                      value={verTrxId}
                      onChange={(e) => setVerTrxId(e.target.value)}
                      placeholder="e.g. BKH8829182"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono font-bold uppercase"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPayingVerFee || !verTrxId}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isPayingVerFee ? 'যাচাই করা হচ্ছে...' : (lang === 'bn' ? `৳${verificationFeeAmount} ফি জমা দিন ও উত্তোলন আনলক করুন` : `Submit ৳${verificationFeeAmount} & Unlock Withdrawal`)}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{lang === 'bn' ? '✅ আপনার একাউন্ট ফাস্ট উত্তোলনের জন্য ভেরিফাইড!' : '✅ Your account is verified for Instant Withdrawals!'}</span>
            </div>
          )}

          {/* Standard Withdrawal Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Withdrawal Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {lang === 'bn' ? '১. উত্তোলনের মাধ্যম নির্বাচন করুন:' : '1. Select Receiving Method:'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'bkash', label: 'bKash', color: 'pink' },
                  { id: 'nagad', label: 'Nagad', color: 'orange' },
                  { id: 'rocket', label: 'Rocket', color: 'purple' },
                  { id: 'bank', label: 'Bank', color: 'cyan' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id as PaymentMethod)}
                    className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all ${
                      method === item.id
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-2 ring-emerald-500/30'
                        : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {lang === 'bn' ? '২. উত্তোলনের পরিমাণ (টাকা):' : '2. Withdrawal Amount:'}
                </label>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? `সর্বনিম্ন ৳${systemSettings.minWithdraw}` : `Min: ৳${systemSettings.minWithdraw}`}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  min={systemSettings.minWithdraw}
                  max={currentBalance}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  required
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Fee Breakdown */}
              <div className="mt-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>{lang === 'bn' ? 'প্রসেসিং ফি (২%):' : 'Processing Fee (2%):'}</span>
                  <span>-৳{fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-200 pt-1 border-t border-slate-800/60">
                  <span>{lang === 'bn' ? 'আপনি পাবেন (Net Amount):' : 'You will receive:'}</span>
                  <span className="text-cyan-300">৳{netAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Receiving Account Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' 
                  ? `৩. আপনার ${method.toUpperCase()} অ্যাকাউন্ট নম্বর:` 
                  : `3. Your ${method.toUpperCase()} Account Number:`}
              </label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="e.g. 01712345678"
                required
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* 6-Digit Security PIN */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  {lang === 'bn' ? '৪. ট্রানজেকশন পিন কোড:' : '4. Security PIN Code:'}
                </label>
                <span className="text-[10px] text-slate-400">
                  {lang === 'bn' ? 'ডিফল্ট: 123456' : 'Default: 123456'}
                </span>
              </div>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter 6-digit PIN"
                required
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-center tracking-widest text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Notice */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/40 p-2.5 rounded-lg">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {lang === 'bn' 
                  ? 'উইথড্র রিকোয়েস্ট পাঠানোর ৫-৩০ মিনিটের মধ্যে টাকা চলে আসবে।' 
                  : 'Withdrawals are processed within 5-30 minutes 24/7.'}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || amount > currentBalance || amount < systemSettings.minWithdraw || (verificationRequired && !currentUser?.isVerificationFeePaid)}
              id="submit-withdraw-btn"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>
                    {verificationRequired 
                      ? (lang === 'bn' ? `প্রথমে ৳${verificationFeeAmount} ভেরিফিকেশন ফি প্রদান করুন` : `Pay ৳${verificationFeeAmount} Verification Fee First`)
                      : (lang === 'bn' ? `উইথড্র রিকোয়েস্ট পাঠান (৳${amount.toLocaleString()})` : `Submit Withdrawal (৳${amount.toLocaleString()})`)}
                  </span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

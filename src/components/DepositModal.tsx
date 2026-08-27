import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  UploadCloud, 
  Smartphone,
  ExternalLink,
  Info
} from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const { systemSettings, submitDeposit, lang, currentUser } = useApp();
  
  const [method, setMethod] = useState<PaymentMethod>('bkash');
  const [amount, setAmount] = useState<number>(1000);
  const [accountNo, setAccountNo] = useState<string>(currentUser?.phone || '');
  const [trxId, setTrxId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [proofImage, setProofImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const getMethodNumber = () => {
    switch (method) {
      case 'bkash': return systemSettings.bkashNumber;
      case 'nagad': return systemSettings.nagadNumber;
      case 'rocket': return systemSettings.rocketNumber;
      default: return systemSettings.bkashNumber;
    }
  };

  const currentNumber = getMethodNumber();

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const presetAmounts = [300, 500, 1000, 2500, 5000, 10000, 25000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const success = submitDeposit({
        amount: Number(amount),
        method,
        accountNo: accountNo || currentUser?.phone || '',
        trxId,
        proofImage,
      });

      setIsSubmitting(false);
      if (success) {
        setTrxId('');
        onClose();
      }
    }, 600);
  };

  return (
    <div id="deposit-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
              💳
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                {lang === 'bn' ? 'ব্যালেন্স ডিপোজিট করুন' : 'Deposit Funds'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'বিকাশ, নগদ ও রকেট পেমেন্ট গেটওয়ে' : 'Instant bKash, Nagad & Rocket Gateway'}
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

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 space-y-4 flex-1">
          
          {/* Method Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {lang === 'bn' ? '১. পেমেন্ট মেথড নির্বাচন করুন:' : '1. Select Payment Method:'}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* bKash */}
              <button
                type="button"
                onClick={() => setMethod('bkash')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                  method === 'bkash'
                    ? 'border-pink-500 bg-pink-500/10 text-pink-300 ring-2 ring-pink-500/30'
                    : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-black text-sm tracking-wider text-pink-400">bKash</span>
                <span className="text-[10px] text-slate-400 mt-0.5">বিকাশ (Personal)</span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setMethod('nagad')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                  method === 'nagad'
                    ? 'border-orange-500 bg-orange-500/10 text-orange-300 ring-2 ring-orange-500/30'
                    : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-black text-sm tracking-wider text-orange-400">Nagad</span>
                <span className="text-[10px] text-slate-400 mt-0.5">নগদ (Personal)</span>
              </button>

              {/* Rocket */}
              <button
                type="button"
                onClick={() => setMethod('rocket')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center ${
                  method === 'rocket'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-300 ring-2 ring-purple-500/30'
                    : 'border-slate-800 bg-slate-800/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-black text-sm tracking-wider text-purple-400">Rocket</span>
                <span className="text-[10px] text-slate-400 mt-0.5">রকেট (Personal)</span>
              </button>
            </div>
          </div>

          {/* Official Number Copy Box */}
          <div className="bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-750 p-4 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                {lang === 'bn' 
                  ? `আমাদের অফিসিয়াল ${method.toUpperCase()} নম্বর (Send Money):`
                  : `Official ${method.toUpperCase()} Number (Send Money):`}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                Active 24/7
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-950/80 px-3.5 py-2.5 rounded-lg border border-slate-800">
              <span className="font-mono text-base sm:text-lg font-extrabold text-emerald-300 tracking-wider">
                {currentNumber}
              </span>
              <button
                type="button"
                id="deposit-copy-number-btn"
                onClick={handleCopyNumber}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'bn' ? 'কপি হয়েছে' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'নম্বর কপি' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Instruction Callout */}
            <div className="mt-3 p-2.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-[11px] text-blue-200/90 leading-relaxed flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                {lang === 'bn' ? (
                  <span>
                    উপরের নম্বরে আপনার {method.toUpperCase()} অ্যাপ বা *247# / *167# / *322# ডায়াল করে <strong>Send Money</strong> করুন। সফল ট্রানজেকশনের পর পাওয়া <strong>TrxID</strong> নিচে দিন।
                  </span>
                ) : (
                  <span>
                    Send money to the number above via your {method.toUpperCase()} App. Once done, copy and paste the <strong>TrxID</strong> below for instant crediting.
                  </span>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Amount Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {lang === 'bn' ? '২. ডিপোজিট পরিমাণ (টাকা):' : '2. Deposit Amount (BDT):'}
                </label>
                <span className="text-[11px] text-slate-400">
                  {lang === 'bn' ? `সর্বনিম্ন ৳${systemSettings.minDeposit}` : `Min: ৳${systemSettings.minDeposit}`}
                </span>
              </div>

              {/* Amount Presets */}
              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {presetAmounts.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                      amount === val
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700/60'
                    }`}
                  >
                    ৳{val.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                <input
                  type="number"
                  min={systemSettings.minDeposit}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                  required
                  className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-bold text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Sender Account Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? '৩. আপনার যে নম্বর থেকে টাকা পাঠিয়েছেন:' : '3. Your Sender Phone Number:'}
              </label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="e.g. 01712345678"
                required
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Transaction ID (TrxID) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {lang === 'bn' ? '৪. ট্রানজেকশন আইডি (TrxID):' : '4. Transaction ID (TrxID):'}
                </label>
                <span className="text-[10px] text-amber-400 font-semibold">
                  {lang === 'bn' ? '৮-১০ অক্ষরের কোড' : '8-10 Character Code'}
                </span>
              </div>
              <input
                type="text"
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder={method === 'bkash' ? 'e.g. BKH8892718' : method === 'nagad' ? 'e.g. NGD7718294' : 'e.g. RCK9928174'}
                required
                className="w-full uppercase tracking-wider font-mono bg-slate-950/70 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-emerald-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !trxId}
              id="submit-deposit-btn"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'ডিপোজিট নিশ্চিত করুন' : 'Confirm Deposit'} (৳{amount.toLocaleString()})</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

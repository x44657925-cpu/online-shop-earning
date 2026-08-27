import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TransactionType } from '../types';
import { 
  FileText, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Zap, 
  Users, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Filter
} from 'lucide-react';

export const TransactionHistory: React.FC = () => {
  const { transactions, currentUser, lang } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | TransactionType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter transactions for current user (or all if admin)
  const userTransactions = currentUser?.role === 'admin'
    ? transactions
    : transactions.filter(t => t.userId === currentUser?.id);

  const filteredList = userTransactions.filter(t => {
    if (activeFilter === 'all') return true;
    return t.type === activeFilter;
  });

  const handleCopyTrx = (trxId?: string) => {
    if (!trxId) return;
    navigator.clipboard.writeText(trxId);
    setCopiedId(trxId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            {lang === 'bn' ? 'অনুমোদিত' : 'Approved'}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            {lang === 'bn' ? 'অপেক্ষমাণ' : 'Pending'}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3" />
            {lang === 'bn' ? 'বাতিল' : 'Rejected'}
          </span>
        );
    }
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />;
      case 'withdraw':
        return <ArrowUpRight className="w-4 h-4 text-cyan-400" />;
      case 'commission':
        return <Zap className="w-4 h-4 text-amber-400" />;
      case 'referral_bonus':
        return <Users className="w-4 h-4 text-purple-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-black text-slate-100">
            {lang === 'bn' ? 'লেনদেন ও আয়ের ইতিহাস' : 'Transaction & Earnings History'}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {lang === 'bn' ? 'আপনার সকল ডিপোজিট, উত্তোলন ও অর্জিত কমিশনের রিয়েল-টাইম হিসাব।' : 'Real-time record of all your deposits, withdrawals, commissions, and bonuses.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: lang === 'bn' ? 'সকল' : 'All' },
          { id: 'deposit', label: lang === 'bn' ? 'ডিপোজিট' : 'Deposits' },
          { id: 'withdraw', label: lang === 'bn' ? 'উইথড্র' : 'Withdrawals' },
          { id: 'commission', label: lang === 'bn' ? 'টাস্ক কমিশন' : 'Commissions' },
          { id: 'referral_bonus', label: lang === 'bn' ? 'টিম বোনাস' : 'Referral' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveFilter(item.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === item.id
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      {filteredList.length > 0 ? (
        <div className="space-y-2.5">
          {filteredList.map(tx => (
            <div
              key={tx.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-4 hover:border-slate-750 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center shrink-0 mt-0.5">
                  {getTypeIcon(tx.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-200 capitalize">
                      {tx.type.replace('_', ' ')}
                    </span>
                    {getStatusBadge(tx.status)}
                    {tx.method && (
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {tx.method}
                      </span>
                    )}
                  </div>
                  
                  {tx.note && (
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {tx.note}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                    <span>{tx.createdAt}</span>
                    {tx.trxId && (
                      <button
                        onClick={() => handleCopyTrx(tx.trxId)}
                        className="inline-flex items-center gap-1 font-mono text-emerald-400 hover:underline"
                        title="Copy TrxID"
                      >
                        <span>TrxID: {tx.trxId}</span>
                        {copiedId === tx.trxId ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Amount side */}
              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/80 flex sm:flex-col justify-between items-center sm:items-end">
                <span className="text-[10px] text-slate-400 sm:hidden">
                  {lang === 'bn' ? 'পরিমাণ:' : 'Amount:'}
                </span>
                <div className={`text-base font-black ${
                  tx.type === 'withdraw' 
                    ? 'text-rose-400' 
                    : 'text-emerald-400'
                }`}>
                  {tx.type === 'withdraw' ? '-' : '+'}৳{tx.amount.toLocaleString()}
                </div>
                {tx.fee ? (
                  <span className="text-[10px] text-slate-500">
                    Fee: ৳{tx.fee}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <FileText className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-300">
            {lang === 'bn' ? 'কোনো লেনদেন রেকর্ড পাওয়া যায়নি' : 'No transactions recorded yet'}
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn' ? 'ডিপোজিট বা টাস্ক সম্পন্ন করলে এখানে হিস্ট্রি দেখতে পাবেন।' : 'Complete tasks or make a deposit to see activity here.'}
          </p>
        </div>
      )}

    </div>
  );
};

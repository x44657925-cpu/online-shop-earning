import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Copy, 
  Check, 
  Share2, 
  TrendingUp, 
  Award, 
  Gift, 
  UserPlus,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const ReferralTeam: React.FC = () => {
  const { currentUser, referrals, systemSettings, lang } = useApp();
  
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTierTab, setActiveTierTab] = useState<1 | 2 | 3>(1);

  const referralCode = currentUser?.referralCode || 'EZ8821';
  const referralLink = `${window.location.origin}/?ref=${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredMembers = referrals.filter(r => r.level === activeTierTab);
  const totalTeamCommission = referrals.reduce((acc, curr) => acc + curr.commissionEarnedForYou, 0);
  const totalTeamMembers = referrals.length;

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-black text-slate-100">
            {lang === 'bn' ? 'রেফারাল টিম ও কমিশন নেটওয়ার্ক' : 'Referral Team & Commissions'}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {lang === 'bn' 
            ? '৩-টিয়ার টিম রেফারাল সিস্টেমের মাধ্যমে বন্ধুদের ইনভাইট করে আজীবন প্যাসিভ কমিশন আয় করুন।'
            : 'Invite friends to earn lifetime 3-Tier passive commissions on their deposits and task activities.'}
        </p>
      </div>

      {/* Referral Code & Link Box */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-750 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'আপনার ব্যক্তিগত ইনভাইটেশন কোড:' : 'Your Personal Invitation Code:'}
            </span>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-mono text-2xl font-black text-emerald-400 tracking-wider">
                {referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 transition-all"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'কোড কপি' : 'Copy Code')}</span>
              </button>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-extrabold text-xs shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? (lang === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (lang === 'bn' ? 'ইনভাইট লিংক কপি করুন' : 'Copy Invite Link')}</span>
            </button>
          </div>
        </div>

        {/* 3-Tier Commission Levels Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              {lang === 'bn' ? 'লেভেল ১ (সরাসরি)' : 'Level 1 (Direct)'}
            </div>
            <div className="text-lg font-black text-slate-100 my-0.5">
              {systemSettings.level1CommissionRate}%
            </div>
            <div className="text-[10px] text-slate-400">
              {lang === 'bn' ? 'কমিশন রিবেট' : 'Rebate Bonus'}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
              {lang === 'bn' ? 'লেভেল ২ (সাব-টিম)' : 'Level 2 (Sub-Team)'}
            </div>
            <div className="text-lg font-black text-slate-100 my-0.5">
              {systemSettings.level2CommissionRate}%
            </div>
            <div className="text-[10px] text-slate-400">
              {lang === 'bn' ? 'কমিশন রিবেট' : 'Rebate Bonus'}
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl text-center">
            <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
              {lang === 'bn' ? 'লেভেল ৩ (টিম রিবেট)' : 'Level 3 (Rebate)'}
            </div>
            <div className="text-lg font-black text-slate-100 my-0.5">
              {systemSettings.level3CommissionRate}%
            </div>
            <div className="text-[10px] text-slate-400">
              {lang === 'bn' ? 'কমিশন রিবেট' : 'Rebate Bonus'}
            </div>
          </div>
        </div>

        {/* Team Overview Banner */}
        <div className="flex items-center justify-between bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">
              {lang === 'bn' ? 'মোট টিম সদস্য:' : 'Total Team Members:'}
            </span>
            <div className="text-base font-bold text-slate-200">
              {totalTeamMembers} {lang === 'bn' ? 'জন' : 'Users'}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-medium">
              {lang === 'bn' ? 'টিম থেকে মোট আয়:' : 'Total Team Earnings:'}
            </span>
            <div className="text-base font-extrabold text-emerald-400">
              ৳{totalTeamCommission.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Tier Filter Tabs & Members List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          {([1, 2, 3] as const).map(tier => (
            <button
              key={tier}
              onClick={() => setActiveTierTab(tier)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTierTab === tier
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {lang === 'bn' ? `লেভেল ${tier} টিম` : `Level ${tier} Members`} ({referrals.filter(r => r.level === tier).length})
            </button>
          ))}
        </div>

        {/* Members Cards */}
        {filteredMembers.length > 0 ? (
          <div className="space-y-2.5">
            {filteredMembers.map(member => (
              <div
                key={member.id}
                className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between hover:border-slate-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-200">{member.name}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        VIP {member.vipLevel}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {member.phone} • {lang === 'bn' ? 'যোগদান:' : 'Joined:'} {member.joinDate}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">
                    {lang === 'bn' ? 'আপনার কমিশন' : 'Commission Earned'}
                  </span>
                  <span className="text-sm font-black text-emerald-400">
                    +৳{member.commissionEarnedForYou.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-900/50 border border-slate-800 rounded-xl">
            <UserPlus className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400">
              {lang === 'bn' ? 'এই লেভেলে এখনও কোনো সদস্য নেই। বন্ধুদের ইনভাইট করুন!' : 'No members in this tier yet. Share your invitation link!'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

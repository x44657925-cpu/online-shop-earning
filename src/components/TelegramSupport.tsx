import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  PhoneCall, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  ShieldCheck,
  Headphones,
  Sparkles
} from 'lucide-react';

export const TelegramSupport: React.FC = () => {
  const { systemSettings, lang } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      qBn: 'কিভাবে বিকাশ/নগদ/রকেটে ডিপোজিট করব?',
      qEn: 'How to deposit via bKash, Nagad, or Rocket?',
      aBn: 'ডিপোজিট পেইজে গিয়ে বিকাশ (01631218185), নগদ (01631218185) অথবা রকেট (01995732924) নম্বরে Send Money করুন। এরপর TrxID কপি করে ডিপোজিট ফর্মে সাবমিট করলেই ৫-১৫ মিনিটের মধ্যে ব্যালেন্স যুক্ত হবে।',
      aEn: 'Go to the Deposit section, Send Money to our official number (bKash: 01631218185, Nagad: 01631218185, Rocket: 01995732924). Then enter your TrxID in the form. Balance is credited in 5-15 mins.'
    },
    {
      qBn: 'প্রতিদিনের টাস্ক থেকে কিভাবে আয় করব?',
      qEn: 'How to earn daily profit from tasks?',
      aBn: 'টাস্ক আর্নিং (Grab Task) সেকশনে গিয়ে "Grab Order" বাটনে ক্লিক করুন। প্রতিদিন আপনার ভিআইপি লেভেল অনুযায়ী ১০ থেকে ৫০টি পর্যন্ত টাস্ক সম্পন্ন করে প্রতিটি প্রডাক্ট মূল্যের উপর ৩% থেকে ৮% পর্যন্ত নগদ কমিশন পাবেন।',
      aEn: 'Visit the Grab Task page and tap "Grab Order". Complete your daily task quota based on your VIP level to earn 3% - 8% instant commission on each product.'
    },
    {
      qBn: 'সর্বনিম্ন উইথড্র কত এবং টাকা পেতে কত সময় লাগে?',
      qEn: 'What is the minimum withdrawal and processing time?',
      aBn: 'সর্বনিম্ন উইথড্র সীমা মাত্র ৫০০ টাকা। উইথড্র রিকোয়েস্ট দেওয়ার পর সাধারণত ৫ থেকে ৩০ মিনিটের মধ্যে আপনার বিকাশ, নগদ বা রকেট নম্বরে টাকা পৌঁছে যায়।',
      aEn: 'Minimum withdrawal is only ৳500. Withdrawals are processed 24/7 and delivered within 5 to 30 minutes.'
    },
    {
      qBn: 'টিম রেফারাল থেকে কি পরিমাণ কমিশন পাওয়া যায়?',
      qEn: 'How much do I earn from Team Referrals?',
      aBn: 'লেভেল ১ (সরাসরি রেফার) থেকে ১০%, লেভেল ২ থেকে ৫% এবং লেভেল ৩ থেকে ২% আজীবন রিবেট কমিশন স্বয়ংক্রিয়ভাবে আপনার একাউন্টে জমা হয়।',
      aEn: 'You earn 10% from Level 1, 5% from Level 2, and 2% from Level 3 lifetime rebate commissions credited instantly to your wallet.'
    }
  ];

  return (
    <div className="space-y-5 pb-20 max-w-3xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Headphones className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-black text-slate-100">
            {lang === 'bn' ? '২৪/৭ টেলিগ্রাম ও কাস্টমার সাপোর্ট' : '24/7 Telegram & Live Support'}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {lang === 'bn' 
            ? 'যেকোনো ডিপোজিট, উইথড্রয়াল বা প্রশ্ন সংক্রান্ত সহায়তায় আমাদের সাথে যোগাযোগ করুন।' 
            : 'Get instant assistance with deposits, withdrawals, or general queries.'}
        </p>
      </div>

      {/* Support Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Telegram 1-on-1 Agent */}
        <a
          href={systemSettings.telegramSupportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-sky-950/40 to-slate-900 border border-sky-500/30 hover:border-sky-400 p-4 rounded-2xl flex items-center justify-between transition-all group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40 group-hover:scale-105 transition-transform">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-100">
                  {lang === 'bn' ? 'টেলিগ্রাম লাইভ এজেন্ট' : 'Telegram Live Agent'}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                @EarnZoneBD_Support
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* Telegram Official Channel */}
        <a
          href={systemSettings.telegramChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 hover:border-indigo-400 p-4 rounded-2xl flex items-center justify-between transition-all group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100">
                {lang === 'bn' ? 'অফিসিয়াল টেলিগ্রাম চ্যানেল' : 'Official Telegram Channel'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'bn' ? 'দৈনিক পেমেন্ট প্রুফ ও নোটিশ' : 'Payment Proofs & Daily Updates'}
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

        {/* WhatsApp Helpline */}
        <a
          href={`https://wa.me/${systemSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 hover:border-emerald-400 p-4 rounded-2xl flex items-center justify-between transition-all group shadow-lg sm:col-span-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-100">
                  {lang === 'bn' ? 'হোয়াটসঅ্যাপ হেল্পলাইন' : 'WhatsApp Hotline Support'}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                  24/7 Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {systemSettings.whatsappNumber} ({lang === 'bn' ? 'সরাসরি চ্যাট করুন' : 'Direct Support Chat'})
              </p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
        </a>

      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'bn' ? 'সাধারণ জিজ্ঞাসাসমূহ (FAQ)' : 'Frequently Asked Questions'}</span>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-slate-850 transition-colors"
                >
                  <span className="text-xs font-bold text-slate-200">
                    {lang === 'bn' ? faq.qBn : faq.qEn}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {lang === 'bn' ? faq.aBn : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

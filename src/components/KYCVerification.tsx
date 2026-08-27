import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  UploadCloud, 
  FileCheck, 
  Lock,
  UserCheck,
  Camera
} from 'lucide-react';

export const KYCVerification: React.FC = () => {
  const { currentUser, submitKyc, lang } = useApp();

  const [docType, setDocType] = useState<'nid' | 'passport' | 'driving_license'>('nid');
  const [fullName, setFullName] = useState(currentUser?.kycData?.fullName || currentUser?.name || '');
  const [docNumber, setDocNumber] = useState(currentUser?.kycData?.docNumber || '');
  const [frontImage, setFrontImage] = useState(currentUser?.kycData?.frontImage || '');
  const [backImage, setBackImage] = useState(currentUser?.kycData?.backImage || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const status = currentUser?.kycStatus || 'unverified';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitKyc({
        docType,
        fullName,
        docNumber,
        frontImage: frontImage || 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400&auto=format&fit=crop&q=80',
        backImage: backImage || 'https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?w=400&auto=format&fit=crop&q=80',
      });
      setIsSubmitting(false);
    }, 600);
  };

  const handleSimulateUpload = (side: 'front' | 'back') => {
    // Demo image simulator
    if (side === 'front') {
      setFrontImage('https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400&auto=format&fit=crop&q=80');
    } else {
      setBackImage('https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?w=400&auto=format&fit=crop&q=80');
    }
  };

  return (
    <div className="space-y-5 pb-20 max-w-2xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-black text-slate-100">
            {lang === 'bn' ? 'অ্যাকাউন্ট ভেরিফিকেশন (KYC)' : 'Identity Verification (KYC)'}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {lang === 'bn' 
            ? 'জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট ভেরিফিকেশনের মাধ্যমে আপনার অ্যাকাউন্ট সুরক্ষিত ও উইথড্রয়াল লিমিট আনলক করুন।'
            : 'Verify your NID or Passport to unlock fast VIP withdrawals and secure your balance.'}
        </p>
      </div>

      {/* Verification Status Card */}
      {status === 'verified' && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-emerald-300">
                {lang === 'bn' ? 'অ্যাকাউন্ট সম্পূর্ণ ভেরিফাইড' : 'Account Fully Verified'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                KYC PASSED
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'bn' 
                ? `ভেরিফাইড নাম: ${currentUser?.kycData?.fullName || currentUser?.name} (NID: ${currentUser?.kycData?.docNumber || '1998547896321'})`
                : `Verified Name: ${currentUser?.kycData?.fullName || currentUser?.name} (Doc: ${currentUser?.kycData?.docNumber || '1998547896321'})`}
            </p>
          </div>
        </div>
      )}

      {status === 'pending' && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-amber-300">
              {lang === 'bn' ? 'কেওয়াইসি পর্যালোচনাধীন রয়েছে' : 'KYC Verification Under Review'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'bn' 
                ? 'আপনার সাবমিট করা জাতীয় পরিচয়পত্র এডমিন টিম যাচাই করছে। সাধারণত ২-৪ ঘণ্টার মধ্যে ভেরিফিকেশন সম্পন্ন হয়।'
                : 'Our admin compliance team is reviewing your documents. Verification takes between 2-4 hours.'}
            </p>
          </div>
        </div>
      )}

      {/* KYC Submission Form */}
      {status !== 'verified' && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {lang === 'bn' ? '১. ডকুমেন্টের ধরন নির্বাচন করুন:' : '1. Select Document Type:'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'nid', label: lang === 'bn' ? 'NID কার্ড' : 'National ID' },
                { id: 'passport', label: lang === 'bn' ? 'পাসপোর্ট' : 'Passport' },
                { id: 'driving_license', label: lang === 'bn' ? 'ড্রাইভিং লাইসেন্স' : 'Driving License' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDocType(item.id as any)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                    docType === item.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-800 bg-slate-800/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {lang === 'bn' ? '২. আইডি কার্ড অনুযায়ী পূর্ণ নাম:' : '2. Full Legal Name (as on ID):'}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Tanvir Ahmed"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {lang === 'bn' ? '৩. ডকুমেন্ট / এনআইডি নম্বর:' : '3. NID / Document Number:'}
            </label>
            <input
              type="text"
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              placeholder="e.g. 1998547896321"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Front & Back Photo Upload Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Front */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? 'আইডি কার্ডের সামনের ছবি (Front):' : 'ID Front Side Photo:'}
              </label>
              <div 
                onClick={() => handleSimulateUpload('front')}
                className="border-2 border-dashed border-slate-750 hover:border-emerald-500/60 rounded-xl p-4 text-center cursor-pointer bg-slate-950/50 transition-colors"
              >
                {frontImage ? (
                  <div className="space-y-1">
                    <img src={frontImage} alt="Front" className="h-20 w-full object-cover rounded-lg mx-auto" />
                    <span className="text-[10px] text-emerald-400 font-bold block">{lang === 'bn' ? 'ছবি আপলোড হয়েছে (পরিবর্তন করতে ক্লিক করুন)' : 'Uploaded (Click to change)'}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Camera className="w-6 h-6 text-slate-500 mx-auto" />
                    <span className="text-xs text-slate-300 font-medium block">{lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Front Image'}</span>
                    <span className="text-[10px] text-slate-500 block">JPG, PNG (Max 5MB)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Back */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'bn' ? 'আইডি কার্ডের পেছনের ছবি (Back):' : 'ID Back Side Photo:'}
              </label>
              <div 
                onClick={() => handleSimulateUpload('back')}
                className="border-2 border-dashed border-slate-750 hover:border-emerald-500/60 rounded-xl p-4 text-center cursor-pointer bg-slate-950/50 transition-colors"
              >
                {backImage ? (
                  <div className="space-y-1">
                    <img src={backImage} alt="Back" className="h-20 w-full object-cover rounded-lg mx-auto" />
                    <span className="text-[10px] text-emerald-400 font-bold block">{lang === 'bn' ? 'ছবি আপলোড হয়েছে (পরিবর্তন করতে ক্লিক করুন)' : 'Uploaded (Click to change)'}</span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Camera className="w-6 h-6 text-slate-500 mx-auto" />
                    <span className="text-xs text-slate-300 font-medium block">{lang === 'bn' ? 'ছবি আপলোড করুন' : 'Upload Back Image'}</span>
                    <span className="text-[10px] text-slate-500 block">JPG, PNG (Max 5MB)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              {lang === 'bn' ? 'আপনার তথ্য 256-bit এনক্রিপশনের মাধ্যমে সম্পূর্ণ সুরক্ষিত ও গোপনীয়।' : 'Your data is protected under strict 256-bit bank-grade encryption.'}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !fullName || !docNumber}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কেওয়াইসি ডকুমেন্ট জমা দিন' : 'Submit KYC Documents'}</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
};

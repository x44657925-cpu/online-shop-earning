import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Smartphone, 
  DownloadCloud, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  HardDrive, 
  Layers,
  ArrowRight,
  PlusCircle,
  MoreVertical,
  Share2,
  Copy,
  Check,
  Globe,
  Code
} from 'lucide-react';

export const ApkDownloadPage: React.FC = () => {
  const { currentUser, lang, showToast } = useApp();
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast(lang === 'bn' ? 'অ্যাপটি আপনার ফোনে ইনস্টল হয়েছে!' : 'App installed successfully!', 'success');
        setDeferredPrompt(null);
      }
    } else {
      showToast(
        lang === 'bn' 
          ? 'ব্রাউজারের ৩-ডট (⋮) মেন্যু থেকে "Install app" বা "Add to Home screen" চাপুন' 
          : 'Tap Chrome menu (⋮) -> Select "Install app" or "Add to Home screen"', 
        'info'
      );
    }
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

  const liveAppUrl = 'https://ais-pre-q67jelfywocs5sat2sg42b-320128088775.asia-east1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(liveAppUrl);
    setCopiedUrl(true);
    showToast(lang === 'bn' ? 'লাইভ লিঙ্ক কপি হয়েছে!' : 'Live App URL Copied!', 'success');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div id="apk-download-fullpage" className="space-y-5 pb-16 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-750 p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/30 shrink-0">
          OSE
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-100">Onlineshopearning</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[10px] border border-emerald-500/30">
              OFFICIAL APP
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {lang === 'bn' 
              ? 'মোবাইল অ্যাপ ইনস্টলেশন, ওয়েবভিউ (WebView) প্যাকেজ এবং লাইভ অনলাইন ইন্টিগ্রেশন সেন্টার' 
              : 'Mobile App Installation, WebView Package & Live Online Integration Center'}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-3 text-[11px] text-slate-400 mt-2 font-medium">
            <span>📦 Version 2.4.0</span>
            <span>•</span>
            <span>📱 Android & Web Ready</span>
            <span>•</span>
            <span>⚡ Ultra Fast</span>
          </div>
        </div>
      </div>

      {/* 🌟 Option 1: Direct 1-Click Install on Phone (PWA) */}
      <div className="bg-gradient-to-br from-emerald-950/50 via-slate-900 to-teal-950/40 border-2 border-emerald-500/50 p-5 rounded-2xl space-y-3.5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
              {lang === 'bn' ? 'পদ্ধতি ১: সরাসরি ফোনে ইনস্টল' : 'Method 1: Direct Phone Install'}
            </span>
            <span className="text-xs text-emerald-400 font-bold">100% Working</span>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">Recommended</span>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed">
          {lang === 'bn'
            ? 'কোনো জটিল প্যাকেজ এরর ছাড়াই ব্রাউজার থেকে সরাসরি আপনার ফোনের হোম স্ক্রিনে অ্যাপ আকারে যুক্ত করুন।'
            : 'Install directly onto your Android device home screen with full screen app experience.'}
        </p>

        <button
          onClick={handleInstallPWA}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 stroke-[3]" />
          <span>{lang === 'bn' ? 'ফোনে ইনস্টল করুন (Install App)' : 'Install on Android Phone'}</span>
        </button>
      </div>

      {/* 🔒 Developer / Admin Only Section */}
      {isAdmin && (
        <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                🔒 ADMIN ONLY
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-100">
                {lang === 'bn' ? 'অ্যাডমিন ডেভেলপার ও WebView টুলস' : 'Admin Developer & WebView Tools'}
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">
              {lang === 'bn' ? 'সাধারণ ইউজাররা এটি দেখতে পাবে না' : 'Hidden from regular users'}
            </span>
          </div>

          {/* 🌐 Option 2: Live Internet URL for WebView App */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    {lang === 'bn' ? 'লাইভ ইন্টারনেট WebView লিঙ্ক' : 'Live WebView URL'}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {lang === 'bn' ? 'Android Studio, Kodular বা WebIntoApp-এ ব্যবহার করার জন্য' : 'For Android Studio, Kodular, WebIntoApp'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between gap-2">
              <span className="text-xs text-sky-300 font-mono truncate select-all">
                {liveAppUrl}
              </span>
              <button
                onClick={handleCopyUrl}
                className="px-3 py-1 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all active:scale-95 cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি লিঙ্ক' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* 📦 Option 3: Download Complete Offline ZIP Package */}
          <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  📦
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    {lang === 'bn' ? 'Android WebView বিল্ড (ZIP ফাইল)' : 'WebView Ready ZIP Package'}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {lang === 'bn' ? 'Android Studio-র assets ফোল্ডারে চালানোর জন্য সোর্স বান্ডেল' : 'Extract into Android Studio app/src/main/assets/'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="w-full py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <DownloadCloud className={`w-4 h-4 ${downloadingZip ? 'animate-bounce' : ''}`} />
              <span>
                {downloadingZip 
                  ? (lang === 'bn' ? 'ডাউনলোড হচ্ছে...' : 'Downloading...')
                  : (lang === 'bn' ? 'WebView ZIP ফাইল ডাউনলোড করুন (188 KB)' : 'Download WebView ZIP (188 KB)')}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Step by Step Guide */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
        <h3 className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === 'bn' ? 'ফোনে ইনস্টল করার ৩টি সহজ ধাপ' : '3 Easy Steps to Install on Mobile'}</span>
        </h3>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
            <div>
              <p className="font-semibold text-slate-200">
                {lang === 'bn' ? 'ব্রাউজারের ৩-ডট (⋮) অপশনে চাপ দিন' : 'Tap the 3-dots (⋮) in Chrome Browser'}
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'আপনার মোবাইলের Chrome বা ব্রাউজারের একদম উপরে ডানপাশে থাকা মেন্যু বাটনে চাপুন।' : 'Located at top-right corner of your browser.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
            <div>
              <p className="font-semibold text-slate-200">
                {lang === 'bn' ? '"Install app" বা "Add to Home screen" নির্বাচন করুন' : 'Select "Install app" or "Add to Home screen"'}
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'মেন্যু লিস্ট থেকে ইনস্টল অ্যাপ অপশনে চাপ দিন।' : 'Tap the install option from the menu list.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
            <div>
              <p className="font-semibold text-slate-200">
                {lang === 'bn' ? 'ইনস্টল বাটনে চাপ দিন' : 'Tap Install'}
              </p>
              <p className="text-[11px] text-slate-400">
                {lang === 'bn' ? 'কয়েক সেকেন্ডের মধ্যে আপনার ফোনের হোম স্ক্রিনে Onlineshopearning অ্যাপ যুক্ত হয়ে যাবে!' : 'The app will appear on your phone home screen within seconds.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

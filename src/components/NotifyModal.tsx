import React from 'react';
import { X, Bell } from 'lucide-react';

const NotifyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-800/90 to-emerald-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl w-[95%] max-w-lg p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Bell className="w-4 h-4 mr-2" />
            Launch Updates
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Get Notified at Launch
          </h2>
          <p className="text-slate-300 mb-8 text-base">
            Enter your details and be the first to know when <span className="text-emerald-400 font-semibold">Bonkeez NFTs</span> go live.
          </p>
        </div>

        {/* Basin Form */}
        <form
          action="https://usebasin.com/f/0203a63d9e46"
          method="POST"
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-emerald-500/25 transition-all"
          >
            Notify Me 
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotifyModal;

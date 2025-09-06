import React from 'react';
import { X, Bell } from 'lucide-react';

const NotifyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-xl border border-purple-700/30 rounded-2xl shadow-2xl w-[95%] max-w-lg p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-300 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-purple-700/20 text-purple-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Bell className="w-4 h-4 mr-2" />
            Marketplace Access
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Marketplace Access
          </h2>
          <p className="text-slate-300 mb-8 text-base">
            Get exclusive access to the <span className="text-purple-300 font-semibold">Bonkeez Marketplace</span> and trade your NFTs.
          </p>
        </div>

        {/* Basin Form */}
        <form
          action="https://usebasin.com/f/3e4df5558353"
          method="POST"
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50 outline-none transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/10 focus:border-purple-700 focus:ring-2 focus:ring-purple-700/50 outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-700 to-purple-800 text-white py-3 rounded-xl font-bold hover:from-purple-800 hover:to-purple-900 shadow-lg hover:shadow-purple-700/25 transition-all"
          >
            Access Marketplace 
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotifyModal;

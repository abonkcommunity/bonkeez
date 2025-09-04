import React from 'react'
import { X } from 'lucide-react'

const NotifyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-[90%] md:w-[60%] relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Get Notified at Launch
        </h2>
        <p className="text-slate-300 mb-6 text-center">
          Enter your details and be the first to know when Bonkeez NFTs go live.
        </p>

        {/* Tally Form Embed */}
        <div className="mt-4">
          <iframe
            src="https://tally.so/r/wAEgZk"
            width="100%"
            height="450"
            frameBorder="0"
            className="rounded-lg"
            title="Notify Me Form"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default NotifyModal
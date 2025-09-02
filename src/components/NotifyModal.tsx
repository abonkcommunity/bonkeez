import React, { useState } from 'react'
import { supabase } from "../utils/supabaseClient";
import { Bell, X } from 'lucide-react'

const NotifyModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase
      .from('launch_signups')
      .insert([{ name, email }])

    if (error) {
      setMessage('❌ ' + error.message)
    } else {
      setMessage('✅ You’re signed up! We’ll notify you at launch 🚀')
      setName('')
      setEmail('')
    }
    setLoading(false)
  }

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-slate-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-lg font-bold hover:from-emerald-700 hover:to-emerald-800 transition"
          >
            {loading ? 'Saving...' : 'Notify Me'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-emerald-400">{message}</p>
        )}
      </div>
    </div>
  )
}

export default NotifyModal

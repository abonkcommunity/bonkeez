import React from 'react'

function AppTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Bonkeez Exchange</h1>
        <p className="text-xl text-slate-300">Test Component Loading Successfully!</p>
        <div className="mt-8 bg-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">✅ App is Working</h2>
          <p className="text-slate-200">This means the issue is with a specific component</p>
        </div>
      </div>
    </div>
  )
}

export default AppTest
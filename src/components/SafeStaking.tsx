
import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import Staking from './Staking'

const SafeStaking: React.FC = () => {
  return (
    <ErrorBoundary fallback={
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
        <h3 className="text-white text-xl font-bold mb-2">Staking Temporarily Unavailable</h3>
        <p className="text-slate-300">The staking feature is currently experiencing issues. Please try again later.</p>
      </div>
    }>
      <Staking />
    </ErrorBoundary>
  )
}

export default SafeStaking

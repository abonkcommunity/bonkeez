import React, { useEffect, useState } from 'react'
import { Shield, AlertTriangle, ExternalLink, CheckCircle } from 'lucide-react'
import { validateSecureContext, isSecureForWallet, initializeSecurity } from '../utils/security'

const SecurityCheck = () => {
  const [securityStatus, setSecurityStatus] = useState({
    isSecure: true,
    isWalletReady: true,
    showWarning: false,
    showSuccess: false
  })

  useEffect(() => {
    // Initialize security measures
    initializeSecurity()
    
    const checkSecurity = () => {
      const secure = validateSecureContext()
      const walletSecure = isSecureForWallet()
      const isProduction = window.location.hostname.includes('bonkeez.com')
      const isHTTPS = window.location.protocol === 'https:'
      
      setSecurityStatus({
        isSecure: secure,
        isWalletReady: walletSecure,
        showWarning: isProduction && !isHTTPS,
        showSuccess: isProduction && isHTTPS && secure && walletSecure
      })
    }

    checkSecurity()
    
    // Check again after a short delay to catch any redirects
    const timeoutId = setTimeout(checkSecurity, 1000)
    
    return () => clearTimeout(timeoutId)
  }, [])

  // Success notification for secure connection
  if (securityStatus.showSuccess) {
    return (
      <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-green-400 font-medium text-sm mb-1">
                Secure Connection
              </h3>
              <p className="text-green-300 text-xs mb-3">
                Your connection is secure. Wallet operations are fully protected.
              </p>
              <button 
                onClick={() => setSecurityStatus(prev => ({ ...prev, showSuccess: false }))}
                className="text-green-400 hover:text-green-300 text-xs underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Warning for insecure connection
  if (securityStatus.showWarning) {
    return (
      <div className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto">
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-red-400 font-medium text-sm mb-1">
                Insecure Connection
              </h3>
              <p className="text-red-300 text-xs mb-3">
                This site is not served over HTTPS. Redirecting to secure connection...
              </p>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSecurityStatus(prev => ({ ...prev, showWarning: false }))}
                  className="text-red-400 hover:text-red-300 text-xs underline cursor-pointer"
                >
                  Dismiss
                </button>
                <a 
                  href="https://www.bonkeez.com" 
                  className="flex items-center space-x-1 text-red-400 hover:text-red-300 text-xs underline"
                >
                  <span>Go to HTTPS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default SecurityCheck

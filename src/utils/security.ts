// Enhanced security utilities for production deployment
export const enforceHTTPS = () => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname, href } = window.location
    
    // Force HTTPS in production (not localhost)
    if (protocol !== 'https:' && 
        hostname !== 'localhost' && 
        hostname !== '127.0.0.1' && 
        !hostname.includes('192.168.') &&
        !hostname.includes('10.0.') &&
        !hostname.includes('172.')) {
      window.location.replace(`https:${href.substring(protocol.length)}`)
    }
  }
}

export const validateSecureContext = () => {
  if (typeof window !== 'undefined') {
    const { hostname, protocol } = window.location
    
    // Allow localhost and local IPs for development
    const isLocalDev = hostname === 'localhost' || 
                      hostname === '127.0.0.1' ||
                      hostname.includes('192.168.') ||
                      hostname.includes('10.0.') ||
                      hostname.includes('172.')
    
    return window.isSecureContext || isLocalDev || protocol === 'https:'
  }
  return true
}

export const getSecureHeaders = () => {
  return {
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()'
  }
}

// Enhanced security check for wallet operations
export const isSecureForWallet = () => {
  if (typeof window === 'undefined') return true
  
  const { hostname, protocol } = window.location
  
  // Allow localhost and local development
  const isLocalDev = hostname === 'localhost' || 
                    hostname === '127.0.0.1' ||
                    hostname.includes('192.168.') ||
                    hostname.includes('10.0.') ||
                    hostname.includes('172.')
  
  // Production must be HTTPS
  const isProductionSecure = protocol === 'https:' && 
                            (hostname === 'www.bonkeez.com' || 
                             hostname === 'bonkeez.com')
  
  return validateSecureContext() && (isLocalDev || isProductionSecure)
}

// Initialize security on app load
export const initializeSecurity = () => {
  // Enforce HTTPS redirect
  enforceHTTPS()
  
  // Set security headers if possible
  if (typeof document !== 'undefined') {
    // Add meta tags for additional security
    const metaTags = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
      { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' }
    ]
    
    metaTags.forEach(tag => {
      const existing = document.querySelector(`meta[name="${tag.name}"], meta[http-equiv="${tag['http-equiv']}"]`)
      if (!existing) {
        const meta = document.createElement('meta')
        if (tag.name) meta.setAttribute('name', tag.name)
        if (tag['http-equiv']) meta.setAttribute('http-equiv', tag['http-equiv'])
        meta.setAttribute('content', tag.content)
        document.head.appendChild(meta)
      }
    })
  }
}

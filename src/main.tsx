import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Buffer } from 'buffer'

// Make Buffer available globally for Solana/Metaplex libraries
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

console.log('🚀 Starting Bonkeez Exchange...')
console.log('📦 React version:', React.version)
console.log('🎨 CSS loaded, DOM ready')

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('❌ Root element not found!')
  throw new Error('Root element not found')
}

console.log('✅ Root element found, creating React root...')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

console.log('✅ React app rendered successfully')
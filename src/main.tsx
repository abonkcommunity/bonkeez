
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'

// Ensure createPortal is available globally for wallet adapter components
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.ReactDOM = { createPortal }
}
import App from './App.tsx'
import './index.css'
import { WalletContextProvider } from "./context/WalletContextProvider"
import { Buffer } from 'buffer'

// Polyfill Buffer for browser compatibility
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>,
)

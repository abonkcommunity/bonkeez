import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WalletContextProvider } from './context/WalletContextProvider.tsx'
import App from './App.tsx'
import './index.css'
import { Buffer } from 'buffer'

// Make Buffer available globally for Solana/Metaplex libraries
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

const rootElement = document.getElementById('root') as HTMLElement

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>
)



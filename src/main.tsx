import './polyfills'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletContextProvider } from './context/WalletContextProvider.tsx'
import { Buffer } from 'buffer'

// Make Buffer available globally for Solana/Metaplex libraries
window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>,
)
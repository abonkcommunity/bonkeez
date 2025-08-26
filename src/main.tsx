import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletContextProvider } from "./context/WalletContextProvider";
import { Buffer } from 'buffer'

// Polyfill Buffer for browser compatibility
window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <WalletContextProvider>
    <App />
        </WalletContextProvider>
  </React.StrictMode>,
)
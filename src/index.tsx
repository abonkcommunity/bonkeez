import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


// WordPress compatibility check
const isWordPress = typeof window !== 'undefined' && 
  (window.location.pathname.includes('/wp-') || 
   document.querySelector('body.wordpress') !== null)

if (isWordPress) {
  console.log('WordPress environment detected')
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

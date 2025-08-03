import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n' // Initialize i18n
import App from './App.jsx'
import { suppressExtensionErrors } from './utils/extensionErrorHandler'

// Suppress browser extension errors
suppressExtensionErrors()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

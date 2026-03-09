// React 18 imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles import
import './index.css'
// Main App component with all routing and providers
import App from './App.jsx'

// React 18 createRoot API for better performance and concurrent features
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential issues in development
  <StrictMode>
    <App />
  </StrictMode>,
)

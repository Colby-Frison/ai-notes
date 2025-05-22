import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('React main.jsx executing')

// Get the root element
const rootElement = document.getElementById('root')
console.log('Root element found:', rootElement)

// Create root and render app
try {
  const root = createRoot(rootElement)
  console.log('React root created successfully')
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  console.log('React app rendered successfully')
} catch (error) {
  console.error('Error rendering React app:', error)
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminAuthProvider } from './admin/contexts/AdminAuthProvider'
import { ThemeProvider } from './admin/contexts/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AdminAuthProvider>
  </StrictMode>,
)

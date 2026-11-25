import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initTagManager } from './lib/analytics'
import './index.css'

initTagManager()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

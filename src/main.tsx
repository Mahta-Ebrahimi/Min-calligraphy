import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initClickTracking } from './lib/analytics'
import './index.css'

initClickTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

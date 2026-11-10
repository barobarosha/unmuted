import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LangProvider } from './i18n/LangContext.jsx'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/sections.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
)

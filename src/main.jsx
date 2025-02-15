import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthContextProvider from '../contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

import AppRouter from './AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

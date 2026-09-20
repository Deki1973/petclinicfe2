import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import './styles/index.scss'
import App from './App.jsx'
import { JwtProvider } from './contexts/JwtContext.jsx'
import { OwnerDetailsProvider } from './contexts/OwnerDetailsContext.jsx'
import { PetDetailsProvider } from './contexts/PetDetailsContext.jsx'
import { VetDetailsProvider } from './contexts/VetDetailsContext.jsx'
import { AppointmentDetailsProvider } from './contexts/AppointmentDetailsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JwtProvider>
      <OwnerDetailsProvider>
        <PetDetailsProvider>
          <VetDetailsProvider>
            <AppointmentDetailsProvider>
              <App />
            </AppointmentDetailsProvider>
          </VetDetailsProvider>
        </PetDetailsProvider>
      </OwnerDetailsProvider>
    </JwtProvider>
  </StrictMode>,
)

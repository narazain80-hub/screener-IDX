import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { neutralizeFullscreenOverlays } from './utils/detectOverlay'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
      gcTime: 1000 * 60 * 30,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)

// run detection shortly after load to auto-neutralize accidental overlays
window.addEventListener('load', () => {
  // delay slightly to allow SPA hydration/modals to mount
  setTimeout(() => {
    neutralizeFullscreenOverlays()
  }, 200)
})

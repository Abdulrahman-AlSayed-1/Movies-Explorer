import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./Styles/global.css" 
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './Redux/store.js'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
)

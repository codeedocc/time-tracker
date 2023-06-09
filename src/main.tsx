import { AuthContextProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
)

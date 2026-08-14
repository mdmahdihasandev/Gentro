import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MainLayout from './layouts/MainLayout'
import AppRoutes from './routes/AppRoutes'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App

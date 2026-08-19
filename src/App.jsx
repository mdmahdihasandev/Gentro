import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import MainLayout from './layouts/MainLayout'
import AppRoutes from './routes/AppRoutes'
import SupabaseTest from './components/SupabaseTest'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <MainLayout>
          <AppRoutes />
          <SupabaseTest />
        </MainLayout>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
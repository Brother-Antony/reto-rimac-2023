import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from './context/AuthContext'

import Login from './pages/Login'
import Plans from './pages/Plans'
import Summary from './pages/Summary'
import NotFound from './pages/NotFound'

import ProtectedRoute from './ProtectedRoute'

import "./sass/style.scss"
import "./sass/tailwind.scss"

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/plans" element={<Plans />} />
            <Route path="/summary" element={<Summary />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />)

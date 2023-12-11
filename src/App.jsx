import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from './ProtectedRoute'

import Login from './pages/login/LoginContainer'
import Plans from './pages/Plans'
import Summary from './pages/Summary'
import NotFound from './pages/NotFound'

export default function App() {
  return (
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
  )
}

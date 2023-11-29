import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth()

    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAuthenticated) return <Navigate to="/" replace />
    
    return <Outlet />
    // return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute

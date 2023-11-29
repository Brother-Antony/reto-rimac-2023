import { useEffect, createContext, useContext, useState } from "react"
import { loginRequest } from "../api/auth"

// import jwtDecode from "jwt-decode"
// import { decode } from "jsonwebtoken"
import Cookies from "js-cookie"

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("useAuth must be used within an AuthProvider")
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) 

    useEffect(() => {
        const checkLogin = async () => {
            const storedToken = Cookies.get('token')

            if (!storedToken) {
                setIsAuthenticated(false)
                setLoading(false)
                return
            }

            try {
                const res = await loginRequest()
                
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                
                setUser(res.data)
                setIsAuthenticated(true)
                setLoading(false)
                console.log("".concat(String.fromCodePoint(9989), " %cUser logged in. Viewing plans."), "color: springgreen")
            } catch (error) {
                console.error(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    const clearErrorUser = () => {
        setError(null)
    }

    const signin = async (user) => {
         try {
            const res = await loginRequest(user)

            if (res && user.documentType === res.data.documentType && user.documentNumber === res.data.documentNumber && user.phoneNumber === res.data.phoneNumber) {
                setError(null)
                setUser(res.data)
                setIsAuthenticated(true)
                Cookies.set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
            } else {
                setError("El usuario ingresado no existe")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        Cookies.remove("token")
        Cookies.remove("plansNombre")
        Cookies.remove("plansPrice")
    }

    return (
        <AuthContext.Provider value={{ user, signin, isAuthenticated, loading, error, clearErrorUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

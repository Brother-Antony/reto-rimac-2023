import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"

import { AuthProvider } from './context/AuthContext'

import "./sass/style.scss"
import "./sass/tailwind.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
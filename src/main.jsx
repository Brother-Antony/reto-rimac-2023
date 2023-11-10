import React from 'react'
import ReactDOM from 'react-dom/client'

import { router } from "./index"
import { RouterProvider } from "react-router-dom"

import "./sass/style.scss"
import "./sass/tailwind.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

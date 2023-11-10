import { createBrowserRouter } from "react-router-dom"

import LayoutPublic from "./layout/LayoutPublic"

import Login from "./pages/login"
import Plans from "./pages/plans"
import Summary from "./pages/summary"
import NotFound from "./pages/notfound"

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound />,
        element: <LayoutPublic />,
        children: [
            {
                errorElement: <NotFound />,
                children: [
                    {
                        index: true,
                        element: <Login />
                    },
                    {
                        path: "/plans",
                        element: <Plans />
                    },
                    {
                        path: "/summary",
                        element: <Summary />
                    }
                ]
            }
        ]
    }
])

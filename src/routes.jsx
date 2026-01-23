import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./layout/rootLayout"

import NotFound from "./components/notFound"
import Portfolio from "./pages/portfolio"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {path: "/", element: <Portfolio />},
      
      {path: "*", element: <NotFound />}
    ]
  }
])
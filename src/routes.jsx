import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./layout/rootLayout"
import Hero from "./pages/hero"
import Welcome from "./pages/welcome"
import NotFound from "./components/notFound"
import Portfolio from "./pages/portfolio"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {path: "/", element: <Welcome />},
      {path: "/hero", element: <Hero />},
      { path: "/portfolio", 
        async lazy() {
          const m = await import("./pages/portfolio")
          return {Component: m.default}
      } }, 
      {path: "*", element: <NotFound />}
    ]
  }
])
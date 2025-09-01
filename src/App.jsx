// import Welcome from "./pages/welcome"
// import Hero from "./pages/hero"
// import { AnimatePresence } from "framer-motion"
// import CustomCursor from "./components/lottieCursor"
// import { useState } from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
function App() {
  // const [showWelcome, setShowWelcome] = useState(true)
  


  return  <RouterProvider router={router} />
    // <>
    //   <CustomCursor />
    //   <AnimatePresence mode="wait" className="w-screen he-screen">
    //     {showWelcome ? (
    //       <Welcome key="welcome" onEnter={() => setShowWelcome(false)} /> 
    //     ) : (
    //       <Hero key="hero" />
    //     )}
    //   </AnimatePresence>
    // </>
  
}

export default App

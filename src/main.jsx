import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.scss'
import App from './App.jsx'
import "./index.css"
import "./tailwind.css"
// import { defineElement } from '@lordicon/element'
// import lottie from 'lottie-web'

// defineElement(lottie.loadAnimation)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

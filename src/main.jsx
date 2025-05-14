import { createRoot } from "react-dom/client"
import { useState, useEffect } from "react"
import App from "./App.jsx"
import "./index.css"
import { PlayerProvider } from "./context/PlayerContext"
import { ToastProvider } from "./hooks/use-toast"
import Loader from "./components/Loader.jsx"

const Root = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // Show loader for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <ToastProvider>
      <PlayerProvider>
        {loading ? <Loader /> : <App />}
      </PlayerProvider>
    </ToastProvider>
  )
}

createRoot(document.getElementById("root")).render(<Root />)

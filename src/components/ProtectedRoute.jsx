import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />
  }

  // If children is a function, pass the user object
  if (typeof children === "function") {
    return children({ user })
  }

  // If children is a component, render it
  return children
}

export default ProtectedRoute

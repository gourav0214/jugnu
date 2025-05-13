"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "../components/ui/sonner"

// Create the auth context
const AuthContext = createContext(null)

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@jugnu.com",
    phone: "+91 98765 43210",
    password: "admin123",
    role: "admin",
    bio: "System Administrator",
    profileImage: "/artist3.svg",
  },
  {
    id: "2",
    name: "Aditya Singh",
    email: "aditya@example.com",
    phone: "+91 98765 43211",
    password: "artist123",
    role: "artist",
    bio: "Professional Singer",
    profileImage: "/Lead-image.svg",
  },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("jugnu_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])
console.log(user)
  // Login function
  const login = (credentials) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const { phoneNumber, password } = credentials

      // Find user by phone number
      const foundUser = MOCK_USERS.find((u) => u.phone.replace(/\s+/g, "").includes(phoneNumber.replace(/\s+/g, "")))

      if (foundUser && foundUser.password === password) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("jugnu_user", JSON.stringify(userWithoutPassword))
        toast.success("Login successful!")
        setLoading(false)
        return true
      } else {
        toast.error("Invalid credentials")
        setLoading(false)
        return false
      }
    }, 800)
  }

  // Register function
  const register = (userData) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Check if user already exists
      const userExists = MOCK_USERS.some((u) =>
        u.phone.replace(/\s+/g, "").includes(userData.phoneNumber.replace(/\s+/g, "")),
      )

      if (userExists) {
        toast.error("User with this phone number already exists")
        setLoading(false)
        return false
      }

      // Create new user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        name: userData.name,
        email: userData.email || `user${MOCK_USERS.length + 1}@example.com`,
        phone: userData.phoneNumber,
        password: userData.password,
        bio: "",
        profileImage: "/Lead-image.svg",
      }

      // Add to mock users (in a real app, this would be an API call)
      MOCK_USERS.push(newUser)

      // Log in the new user
      const { password, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem("jugnu_user", JSON.stringify(userWithoutPassword))

      toast.success("Registration successful!")
      setLoading(false)
      return true
    }, 800)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("jugnu_user")
    toast.success("Logged out successfully")
  }

  // Update user profile
  const updateProfile = (updatedData) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Update user data
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      localStorage.setItem("jugnu_user", JSON.stringify(updatedUser))

      // Update in mock users array (in a real app, this would be an API call)
      const userIndex = MOCK_USERS.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updatedData }
      }

      toast.success("Profile updated successfully")
      setLoading(false)
      return true
    }, 800)
  }

  // Reset password
  const resetPassword = (phoneNumber) => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const userExists = MOCK_USERS.some((u) => u.phone.replace(/\s+/g, "").includes(phoneNumber.replace(/\s+/g, "")))

      if (userExists) {
        toast.success("Password reset link sent to your phone")
        setLoading(false)
        return true
      } else {
        toast.error("No account found with this phone number")
        setLoading(false)
        return false
      }
    }, 800)
  }

  // Verify OTP
  const verifyOtp = (otp) => {
    // For demo purposes, any 5-digit OTP is valid
    if (otp.length === 5) {
      toast.success("OTP verified successfully")
      return true
    } else {
      toast.error("Invalid OTP")
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateProfile,
        resetPassword,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

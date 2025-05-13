"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PhoneInput from "../components/PhoneInput"
import PasswordInput from "../components/PasswordInput"
import Button from "../components/Button"
import { useAuth } from "../context/AuthContext"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Call the login function from auth context
    const success = login({ phoneNumber, password })

    setTimeout(() => {
      setIsSubmitting(false)
      if (success) {
        navigate("/dashboard")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-jugnu-navy flex items-center justify-center p-4 ">
      <div className="w-full max-w-4xl bg-[#040249] rounded-3xl overflow-hidden shadow-lg border p-10">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 bg-[#040249] p-4 flex items-center justify-end">
            <img
              src="public/login-artist.svg"
              alt="Artist with microphone"
              className="max-w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 bg-white p-8 rounded-3xl">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">Welcome To</h2>
              <h1 className="text-3xl font-bold text-gray-900">Artist Login</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <PasswordInput value={password} onChange={setPassword} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-jugnu-purple focus:ring-jugnu-purple border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-jugnu-red hover:text-jugnu-pink">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  "Enter"
                )}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-jugnu-purple hover:text-jugnu-pink">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

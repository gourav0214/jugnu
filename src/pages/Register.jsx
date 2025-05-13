"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PhoneInput from "../components/PhoneInput"
import PasswordInput from "../components/PasswordInput"
import Button from "../components/Button"
import OtpVerification from "../components/OtpVerification"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/sonner"

const Register = () => {
  const navigate = useNavigate()
  const { register, verifyOtp } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.phoneNumber || !formData.password) {
      toast.error("Please fill in all required fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    // Show OTP verification after a delay (simulating API call)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowOtpModal(true)
    }, 1000)
  }

  const handleVerifyOtp = (otp) => {
    const success = verifyOtp(otp)

    if (success) {
      // Register the user
      register(formData)

      // Navigate to dashboard
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-jugnu-navy flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-jugnu-navy rounded-3xl overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 bg-jugnu-navy p-4 flex items-center justify-center">
            <img
              src="/Lead-image.svg"
              alt="Artist with microphone"
              className="max-w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 bg-white p-8 rounded-3xl">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">Join JUGNU</h2>
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jugnu-purple"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jugnu-purple"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <PhoneInput value={formData.phoneNumber} onChange={(value) => handleChange("phoneNumber", value)} />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <PasswordInput value={formData.password} onChange={(value) => handleChange("password", value)} />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <PasswordInput
                  value={formData.confirmPassword}
                  onChange={(value) => handleChange("confirmPassword", value)}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-jugnu-purple hover:text-jugnu-pink">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OtpVerification
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleVerifyOtp}
        phoneNumber={formData.phoneNumber}
      />
    </div>
  )
}

export default Register

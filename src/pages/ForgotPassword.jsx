"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PhoneInput from "../components/PhoneInput"
import Button from "../components/Button"
import OtpVerification from "../components/OtpVerification"
import { useAuth } from "../context/AuthContext"
import { toast } from "../components/ui/sonner"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { resetPassword, verifyOtp } = useAuth()

  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)

  const handleResetPassword = (e) => {
    e.preventDefault()

    if (!phoneNumber) {
      toast.error("Please enter your phone number")
      return
    }

    setIsSubmitting(true)

    // Call the resetPassword function from auth context
    const success = resetPassword(phoneNumber)

    setTimeout(() => {
      setIsSubmitting(false)
      if (success) {
        setShowOtpModal(true)
      }
    }, 1000)
  }

  const handleVerifyOtp = (otp) => {
    const success = verifyOtp(otp)

    if (success) {
      // In a real app, you would redirect to a password reset page
      // For this demo, we'll just redirect to login
      toast.success("Password reset link sent to your phone")
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen bg-jugnu-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your phone number to reset your password</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-jugnu-purple hover:text-jugnu-pink">
              Login
            </Link>
          </p>
        </div>

        {/* OTP Verification Modal */}
        <OtpVerification
          isOpen={showOtpModal}
          onClose={() => setShowOtpModal(false)}
          onVerify={handleVerifyOtp}
          phoneNumber={phoneNumber}
        />
      </div>
    </div>
  )
}

export default ForgotPassword

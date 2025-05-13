"use client"

import { useState } from "react"
import OtpInput from "./OtpInput"
import Button from "./Button"

const OtpVerification = ({ isOpen, onClose, onVerify, phoneNumber }) => {
  const [otp, setOtp] = useState("")

  const handleVerify = () => {
    onVerify(otp)
    onClose()
  }

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-4">OTP Verification</h2>
            <p className="text-gray-600">Enter OTP received on your phone number.</p>
            <p className="text-sm text-gray-500 mt-2">{phoneNumber}</p>
          </div>

          <div className="mb-8">
            <OtpInput length={5} onChange={setOtp} />
          </div>

          <Button variant="primary" fullWidth onClick={handleVerify} disabled={otp.length < 5}>
            Verify
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button className="font-medium text-jugnu-purple hover:text-jugnu-pink">Resend</button>
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default OtpVerification

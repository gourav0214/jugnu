"use client"

export const toast = {
  success: (message) => {
    console.log("Success:", message)
  },
  error: (message) => {
    console.log("Error:", message)
  },
  warning: (message) => {
    console.log("Warning:", message)
  },
  info: (message) => {
    console.log("Info:", message)
  },
}

export function Toaster() {
  return null
}

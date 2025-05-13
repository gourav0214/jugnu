"use client"

// Adapted from shadcn/ui toast hook
import { useState, createContext, useContext } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export const ToastActionType = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}

const toastTimeouts = new Map()

export const ToastContext = createContext({
  toasts: [],
  addToast: () => {},
  dismissToast: () => {},
})

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return {
    ...context,
    toast: (props) => {
      context.addToast({ ...props, id: genId() })
    },
    success: (description, props) => {
      context.addToast({ ...props, description, type: "success", id: genId() })
    },
    error: (description, props) => {
      context.addToast({ ...props, description, type: "error", id: genId() })
    },
    warning: (description, props) => {
      context.addToast({ ...props, description, type: "warning", id: genId() })
    },
    dismiss: (id) => {
      context.dismissToast(id)
    },
  }
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (toast) => {
    setToasts((prevToasts) => {
      const newToast = {
        ...toast,
        dismiss: () => dismissToast(toast.id),
      }

      return [...prevToasts, newToast].slice(-TOAST_LIMIT)
    })
  }

  const dismissToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>{children}</ToastContext.Provider>
}

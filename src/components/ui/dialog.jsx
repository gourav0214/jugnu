"use client"

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">{children}</div>
    </div>
  )
}

export const DialogContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-6 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

export const DialogHeader = ({ children, className, ...props }) => {
  return (
    <div className={`mb-4 ${className || ""}`} {...props}>
      {children}
    </div>
  )
}

export const DialogTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={`text-xl font-semibold ${className || ""}`} {...props}>
      {children}
    </h2>
  )
}

"use client"
import React from 'react'

type Toast = { id: string; message: string; type: 'success' | 'error' }

const ToastContext = React.createContext<{
  toasts: Toast[]
  push: (t: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
} | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  function push(t: Omit<Toast, 'id'>) {
    const id = Math.random().toString(36).slice(2)
    setToasts((arr) => [...arr, { ...t, id }])
    setTimeout(() => remove(id), 4000)
  }

  function remove(id: string) {
    setToasts((arr) => arr.filter((x) => x.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>{children}</ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

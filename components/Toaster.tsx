"use client"
import { useToast } from '@/context/ToastContext'

export default function Toaster() {
  const { toasts } = useToast()
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((t) => (
        <div key={t.id} className={`px-4 py-2 rounded-md shadow-lg text-white ${t.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>{t.message}</div>
      ))}
    </div>
  )
}

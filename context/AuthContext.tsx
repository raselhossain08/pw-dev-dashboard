"use client"
import React from 'react'
import { login as loginApi, getProfile, logout as logoutApi, register as registerApi } from '@/services/auth.service'
import type { AuthUser, LoginPayload, RegisterPayload } from '@/types/auth'

type AuthContextValue = {
  user: AuthUser | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<{ success: boolean; message?: string; error?: string }>
  logout: () => Promise<void>
  register: (payload: RegisterPayload) => Promise<{ success: boolean; message?: string; error?: string }>
  refreshProfile: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    ;(async () => {
      const res = await getProfile()
      if (res.success && res.data) setUser(res.data as any)
    })()
  }, [])

  async function login(payload: LoginPayload) {
    setLoading(true)
    const res = await loginApi(payload)
    if (res.success && res.data) {
      const prof = await getProfile()
      if (prof.success && prof.data) setUser(prof.data as any)
    }
    setLoading(false)
    return { success: !!res.success, message: res.message, error: res.error }
  }

  async function logout() {
    await logoutApi()
    setUser(null)
  }

  async function register(payload: RegisterPayload) {
    const res = await registerApi(payload)
    return { success: !!res.success, message: res.message, error: res.error }
  }

  async function refreshProfile() {
    const res = await getProfile()
    if (res.success && res.data) setUser(res.data as any)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

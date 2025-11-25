export type ApiResponse<T> = {
  success: boolean
  data?: T
  message?: string
  error?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  try {
    const { getAccessToken } = await import('./cookies')
    const token = getAccessToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
  } catch { }

  try {
    let res = await fetch(url, { ...options, headers, credentials: 'include' })
    let json = await res.json().catch(() => ({}))

    if (res.status === 401) {
      const { refresh } = await import('@/services/auth.service')
      const refreshed = await refresh()
      if (refreshed.success) {
        const { getAccessToken } = await import('./cookies')
        const token = getAccessToken()
        if (token) headers['Authorization'] = `Bearer ${token}`
        res = await fetch(url, { ...options, headers, credentials: 'include' })
        json = await res.json().catch(() => ({}))
      }
    }

    if (!res.ok) {
      return { success: false, error: json?.message || `HTTP ${res.status}` }
    }
    return { success: true, data: json?.data ?? json, message: json?.message }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Network error' }
  }
}

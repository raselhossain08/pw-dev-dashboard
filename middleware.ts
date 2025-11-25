import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = new Set([
  '/login',
  '/register',
  '/forgot-password',
  '/activate-account',
  '/favicon.ico',
])

function decodeJwtPayload(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const json = Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/assets')) {
    return NextResponse.next()
  }

  const access = req.cookies.get('pw_access_token')?.value || ''
  if (!access) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const payload = decodeJwtPayload(access)
  if (!payload || !payload.role) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const adminOnly = new Set([
    '/analytics',
    '/users',
    '/orders',
    '/payments',
    '/cms',
    '/categories',
    '/discounts',
    '/support-tickets',
    '/integrations',
    '/activity-logs',
  ])

  if (adminOnly.has(pathname)) {
    if (!['admin', 'super_admin'].includes(String(payload.role))) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api).*)'],
}

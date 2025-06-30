import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value

  // This is a simplified secret token for demonstration.
  // In a real application, you should use a more secure session management strategy.
  if (!authToken || authToken !== 'QAIU_ADMIN_TOKEN_SECRET_2025') {
    const loginUrl = new URL('/login', request.url)
    // You can add a 'from' query parameter to redirect back after login
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}

// This file has been migrated to /client/src/middleware.ts

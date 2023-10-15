import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/sikundi-admin') || request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/sikundi-login', request.url))
    }
}
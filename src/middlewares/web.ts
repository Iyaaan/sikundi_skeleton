import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from 'next/server'
import { headers } from 'next/headers'

export function webMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        if(!request.nextUrl.pathname.startsWith("/sikundi-login") && !request.nextUrl.pathname.startsWith("/sikundi-admin")) {
            const headersList = headers()
            const csrf = headersList.get('X-CSRF-Token')
            if(String(request.method).toUpperCase() !== "GET" && csrf !== process.env.CSRF_SECRET) return NextResponse.json({ 
                error: { name: "Authentication Error", detail: "CSRF Missing" },
                notification: { title: 'Auth error', description: 'your csrf token is missing. please reload and try again' }
            }, { status: 401 })
            

            if (
                request.nextUrl.pathname === "/" 
            ) {
                return NextResponse.redirect(new URL('/dv', request.url))
            }
        }
        return middleware(request, event)
    }
}
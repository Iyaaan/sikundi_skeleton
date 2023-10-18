import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from 'next/server'
import { headers } from 'next/headers'

export function csrfMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const csrf = headers().get('X-CSRF-Token')
        if(String(request.method).toUpperCase() !== "GET" && csrf !== process.env.CSRF_SECRET) return NextResponse.json({ 
            error: { name: "Authentication Error", detail: "CSRF Missing" },
            notification: { title: 'Auth error', description: 'your csrf token is missing. please reload and try again' }
        }, { status: 401 })
        return middleware(request, event)
    }
}
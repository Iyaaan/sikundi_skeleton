import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

export function webMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        if(!request.nextUrl.pathname.startsWith("/sikundi-login") && !request.nextUrl.pathname.startsWith("/sikundi-admin")) {
            





            
        }
        return middleware(request, event)
    }
}
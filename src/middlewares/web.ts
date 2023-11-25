import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from 'next/server'

export function webMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        if(!request.nextUrl.pathname.startsWith("/sikundi-login") && !request.nextUrl.pathname.startsWith("/sikundi-admin")) {
            if (
                request.nextUrl.pathname === "/" 
            ) {
                return NextResponse.redirect(new URL('/dv', request.url))
            }

            const regex = /^\/\d+$/;
            if(regex.test(request.nextUrl.pathname)) {
                return NextResponse.redirect(new URL(`/dv${request.nextUrl.pathname.match(regex)}`, request.url))
            }
        }
        return middleware(request, event)
    }
}
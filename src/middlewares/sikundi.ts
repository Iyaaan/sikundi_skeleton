import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from 'next/server'
import { cookies, headers } from 'next/headers'
import * as jose from 'jose'
import getUser from '@sikundi/lib/server/utils/getUser'

export function sikundiMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        if (request.nextUrl.pathname.startsWith("/sikundi-login") || request.nextUrl.pathname.startsWith("/sikundi-admin")) {
            const expectsJson = headers().get('Accept') === "application/json"
            const user = await getUser()
            
            if(request.nextUrl.pathname.startsWith("/sikundi-admin")) {
                if (!user) {
                    if(expectsJson) {
                        return NextResponse.json({ 
                            error: {
                                name: "Authentication Error",
                                detail: "jwt mismatch"
                            },
                            notification: {
                                title: 'Authentication error',
                                description: 'Your authentication is wrong. please log in to continue'
                            }
                        }, { status: 401 })
                    }
                    return NextResponse.redirect(new URL('/sikundi-login', request.url))
                }
            }

            
            if(request.nextUrl.pathname.startsWith("/sikundi-login") && request.nextUrl.pathname !== "/sikundi-login/log-out") {
                if (user) {
                    if(expectsJson) {
                        return NextResponse.json({ 
                            data: {
                                token: request.cookies.get('token')
                            },
                            notification: {
                                title: 'Login Successfully',
                                description: 'welcome to your workspace'
                            }
                        }, { status: 200 })
                    }
                    return NextResponse.redirect(new URL('/sikundi-admin', request.url))
                }
            }
        }
        return middleware(request, event)
    }
}
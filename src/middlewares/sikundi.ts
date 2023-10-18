import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from 'next/server'
import { cookies, headers } from 'next/headers'
import jwt from 'jsonwebtoken'

export function sikundiMiddleware(middleware: NextMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        const headersList = headers()
        const cookieStore = cookies()
        const csrf = headersList.get('X-CSRF-Token')
        const token = cookieStore.get('token')
        if(request.nextUrl.pathname.startsWith("/sikundi-login")) {


            
        }
        if(request.nextUrl.pathname.startsWith("/sikundi-admin")) {
            try {
                jwt.verify(String(token?.value), String(process.env.ACCESS_TOKEN_SECRET))
            } catch (error) {
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


        }
        if(String(request.method).toUpperCase() !== "GET" && csrf !== process.env.CSRF_SECRET) {
            return NextResponse.json({ 
                error: {
                    name: "Authentication Error",
                    detail: "CSRF Missing"
                },
                notification: {
                    title: 'Auth error',
                    description: 'your csrf token is missing. please reload and try again'
                }
            }, { status: 401 })

        }
        return middleware(request, event)
    }
}
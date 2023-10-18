import { NextResponse, type NextRequest } from 'next/server'
import LogInSchema, { LogInSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/ErrorHandlerWrapper'
import bcrypt from 'bcrypt'
import { prisma } from '@sikundi/lib/server/prisma'
import * as jose from 'jose'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, LogInSchema, async (data:LogInSchemaType) => {
        const user = await prisma.user.findUnique({where: {
            email: data.email,
            status: "active"
        }})
        
        if (!user?.email) throw {
            notification: {
                title: "user not found",
                description: `there is no active account under ${data.email}.`
            },
            statusCode: 404
        }

        if (await bcrypt.compare(data.password, user.password)) {
            const token = await (new jose.SignJWT({ ...user, password:undefined })
                .setProtectedHeader({ alg: "HS256" })
                .setSubject("sikundi")
                .setIssuedAt()
                .setIssuer(`${process.env.SITE_NAME}`)
                .setAudience(`${process.env.SITE_NAME}/sikundi-admin`)
                .setExpirationTime("30d")
                .sign(new TextEncoder().encode(`${process.env.ACCESS_TOKEN_SECRET}`)))
            
            cookies().set({
                name: 'token',
                value: token,
                httpOnly: true,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                secure: true
            })
            return NextResponse.json({ 
                data: {
                    token: token
                },
                notification: {
                    title: 'Login Successfully',
                    description: 'welcome to your workspace'
                }
            }, { status: 200 })
        }
        throw {
            notification: {
                title: "password incorrect",
                description: `Please try again with the corrent password. if you forgot, please reset your password.`
            },
            statusCode: 401
        }
    }))
}
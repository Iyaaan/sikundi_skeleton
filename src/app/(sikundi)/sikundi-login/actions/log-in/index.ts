"use server"

import LogInSchema, { LogInSchemaType } from './schema'
import bcrypt from 'bcrypt'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { sessionMaxDays } from '@sikundi/sikundi.config'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'

export default async function LogIn(data:LogInSchemaType) {
    return (await ErrorHandler<LogInSchemaType, { token: string }>(data, LogInSchema, async (data:LogInSchemaType) => {
        const user = await prisma.user.findUnique({where: {
            email: data.email,
            status: "active"
        }})
        
        if (!user?.email) throw {
            notification: {
                title: "user not found",
                description: `there is no active account under ${data.email}.`,
                variant: "destructive"
            }
        }

        if (await bcrypt.compare(data.password, user.password)) {
            const token = await (new jose.SignJWT({ ...user, password:undefined })
                .setProtectedHeader({ alg: "HS256" })
                .setSubject("sikundi")
                .setIssuedAt()
                .setIssuer(`${process.env.SITE_NAME}`)
                .setAudience(`${process.env.SITE_NAME}/sikundi-admin`)
                .setExpirationTime(`${sessionMaxDays}d`)
                .sign(new TextEncoder().encode(`${process.env.ACCESS_TOKEN_SECRET}`)))

            
            cookies().set({
                name: 'token',
                value: token,
                httpOnly: true,
                maxAge: sessionMaxDays * 24 * 60 * 60,
                secure: true
            })
            return ({ 
                data: {
                    token: token
                },
                notification: {
                    title: 'Login Successfully',
                    description: 'welcome to your workspace'
                }
            })
        }
        throw {
            notification: {
                title: "password incorrect",
                description: `Please try again with the corrent password. if you forgot, please reset your password.`,
                variant: "destructive"
            }
        }
    }))
}
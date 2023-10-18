import { NextResponse, type NextRequest } from 'next/server'
import LogInSchema, { LogInSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/ErrorHandlerWrapper'
import bcrypt from 'bcrypt'
import { prisma } from '@sikundi/lib/server/prisma'

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
            return NextResponse.json({ 
                data: {
                    
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
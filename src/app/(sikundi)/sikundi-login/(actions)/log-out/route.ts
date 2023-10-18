import { NextResponse, type NextRequest } from 'next/server'
import LogOutSchema, { LogOutSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/ErrorHandlerWrapper'
import { prisma } from '@sikundi/lib/server/prisma'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, LogOutSchema, async (data:LogOutSchemaType) => {
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
        
        cookies().delete({
            name: 'token'
        })
        return NextResponse.json({ 
            data: {
                
            },
            notification: {
                title: 'Log Out Successfully',
                description: 'Have a great day'
            }
        }, { status: 200 })
    }))
}
import { NextResponse, type NextRequest } from 'next/server'
import LogOutSchema, { LogOutSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { cookies } from 'next/headers'
import getUser from '@sikundi/lib/server/utils/getUser'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, LogOutSchema, async (data:LogOutSchemaType) => {
        const user:any = await getUser()
        
        if (!user) throw {
            notification: {
                title: "user not found",
                description: `there is no active account under ${user?.email}.`
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
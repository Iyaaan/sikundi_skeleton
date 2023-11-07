"use server"

import LogOutSchema, { LogOutSchemaType } from './schema'
import { cookies } from 'next/headers'
import getUser from '@sikundi/lib/server/utils/getUser'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'

export default async function LogOut(data: LogOutSchemaType) {
    return (await ErrorHandler<LogOutSchemaType, {}>(data, LogOutSchema, async (data:LogOutSchemaType) => {
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
        return ({ 
            data: {
                
            },
            notification: {
                title: 'Log Out Successfully',
                description: 'Have a great day'
            }
        })
    }))
}
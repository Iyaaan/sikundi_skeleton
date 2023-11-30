"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import UserSchema, { UserSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function index(data: UserSchemaType) {
    return (await ErrorHandler(data, UserSchema, async ({createdBy, profilePictureUrl, action, id, role, ...data}:UserSchemaType) => {
        const usr = await getUser()

        const user = await prisma.user.update({
            data: {
                ...data,
                profilePicture: profilePictureUrl ? {
                    connect: {
                        url: profilePictureUrl
                    }
                } : {
                    disconnect: true
                },
                // @ts-ignore
                status: "active"
            },
            where: {    
                email: usr?.payload.email
            }
        })
        console.log(user)

        revalidatePath('/sikundi-admin/profile')
        return {
            notification: {
                title: `Profile Successfully ${action}`,
                description: `Your user profile have been ${action}.`
            }
        }
    }))
}
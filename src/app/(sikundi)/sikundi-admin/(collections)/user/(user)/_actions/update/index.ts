"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import UserSchema, { UserSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

const statusFromActions = {
    active: "active",
    blocked: "blocked",
}

export default async function POST(data: UserSchemaType) {
    return (await ErrorHandler(data, UserSchema, async ({createdBy, profilePictureUrl, action, id, role, ...data}:UserSchemaType) => {
        const usr = await getUser()

        const user = await prisma.user.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy?.value || usr?.payload.userName
                    }
                },
                role: {
                    connect: {
                        name: role?.value
                    }
                },
                profilePicture: profilePictureUrl ? {
                    connect: {
                        url: profilePictureUrl
                    }
                } : {
                    disconnect: true
                },
                // @ts-ignore
                status: action ? statusFromActions[action] : "active"
            },
            where: {    
                id: id
            }
        })

        revalidatePath('/sikundi-admin/user')
        return {
            notification: {
                title: `User Successfully ${action}`,
                description: `a user have ${action}, under the name ${user.userName}`
            }
        }
    }))
}
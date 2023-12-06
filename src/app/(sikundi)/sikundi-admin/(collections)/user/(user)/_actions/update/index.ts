"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import UserSchema, { UserSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { redis } from '@sikundi/lib/server/utils/redis'
import { revalidatePath } from 'next/cache'
import getPermission from '@sikundi/lib/server/utils/getPermission'

const statusFromActions = {
    active: "active",
    blocked: "blocked",
}

export default async function POST(data: UserSchemaType) {
    return (await ErrorHandler(data, UserSchema, async ({createdBy, profilePictureUrl, action, id, role, ...data}:UserSchemaType) => {
        const usr = await getUser()
        const permission = await getPermission({
            user: [
                "create",
                "block",
                "update"
            ]
        })

        if(!permission?.user?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} users.`,
                    variant: "destructive"
                }
            })
        }

        const user = await prisma.user.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy?.value || usr?.payload?.userName
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

        await redis.del(`user:${user.id}`)
        revalidatePath('/sikundi-admin/user')
        return {
            notification: {
                title: `User Successfully ${action}`,
                description: `a user have ${action}, under the name ${user.userName}`
            }
        }
    }))
}
"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import UserSchema, { UserSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: UserSchemaType) {
    return (await ErrorHandler(data, UserSchema, async ({createdBy, profilePictureUrl, action, id, role, ...data}:UserSchemaType) => {
        const usr = await getUser()

        const user = await prisma.user.create({
            // @ts-ignore
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy?.value || usr?.email
                    }
                },
                role: {
                    connect: {
                        name: role?.value
                    }
                },
                password: `${data.userName}@sikundi`,
                profilePicture: profilePictureUrl ? {
                    connect: {
                        url: profilePictureUrl
                    }
                } : undefined,
                // @ts-ignore
                status: "active"
            }
        })

        revalidatePath('/sikundi-admin/user')
        return ({ 
            data: {
                user: user
            },
            notification: {
                title: `User Successfully Created`,
                description: `a user have created under the name ${user.userName}`
            }
        })
    }))
}
"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import RoleSchema, { RoleSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'
import getPermission from '@sikundi/lib/server/utils/getPermission'

export default async function POST(data: RoleSchemaType) {
    return (await ErrorHandler(data, RoleSchema, async ({id, action, createdBy, ...data}:RoleSchemaType) => {
        const user = await getUser()
        const permission = await getPermission({
            role: [
                "view",
                "delete",
                "create",
                "update"
            ]
        })

        if(!permission?.role?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} role.`,
                    variant: "destructive"
                }
            })
        }

        const role = await prisma.role.create({
            data: {
                ...data,
                name: data.name,
                createdBy: {
                    connect: {
                        userName: createdBy.value || user?.payload?.userName
                    }
                },
            }
        })

        revalidatePath('/sikundi-admin/user/role')
        return ({ 
            data: {
                role: role
            },
            notification: {
                title: `Role Successfully Created`,
                description: `a role have created under the name ${role.name}`
            }
        })
    }))
}
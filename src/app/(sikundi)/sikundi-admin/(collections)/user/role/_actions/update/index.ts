"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import RoleSchema, { RoleSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { redis } from '@sikundi/lib/server/utils/redis'
import { revalidatePath } from 'next/cache'
import getPermission from '@sikundi/lib/server/utils/getPermission'

export default async function POST(data: RoleSchemaType) {
    return (await ErrorHandler(data, RoleSchema, async ({action, id, ...data}:RoleSchemaType) => {
        if (!id) throw({
            notification: {
                title: "Role doesn't exist",
                description: `Please try again with a role that exists`
            }
        })

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

        const role = action === "update" ? (await prisma.role.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                }
            },
            where: {
                id: id
            }
        })) : (await prisma.role.delete({
            select: {
                id: true,
                name: true
            },
            where: {
                id: id
            }
        }))

        await redis.del(`role:${role.id}`)
        revalidatePath('/sikundi-admin/user/role')
        return ({ 
            data: {
                role: role
            },
            notification: {
                title: `Role Successfully ${action === "update" ? "updated" : "deleted"}`,
                description: `a role have created under the name ${role.name}`
            }
        })
    }))
}
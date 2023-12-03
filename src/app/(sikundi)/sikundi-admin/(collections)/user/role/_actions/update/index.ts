"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import RoleSchema, { RoleSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: RoleSchemaType) {
    return (await ErrorHandler(data, RoleSchema, async ({action, id, ...data}:RoleSchemaType) => {
        if (!id) throw({
            notification: {
                title: "Role doesn't exist",
                description: `Please try again with a role that exists`
            }
        })

        const user = await getUser()

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
                name: true
            },
            where: {
                id: id
            }
        }))

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
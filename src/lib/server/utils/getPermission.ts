import { prisma } from "@sikundi/lib/server/utils/prisma"
import { redis } from "@sikundi/lib/server/utils/redis"
import getUser from '@sikundi/lib/server/utils/getUser'

interface PermissionStructure {[name: string]: string[]}

export default async function getPermission(request:PermissionStructure) {
    try {
        const user = await getUser()

        const roles = await prisma.role.findFirst({
            select: {
                permissions: true
            },
            where: {
                users: {
                    some: {
                        id: user?.payload.id
                    }
                }
            }
        })

        if (!roles?.permissions) throw(false)
        // @ts-ignore
        const allowed:PermissionStructure = roles.permissions

        Object.entries(request).map(([name, permissions])=> {
            permissions.map((permit) => {
                if(!allowed[name].includes(permit)) {
                    throw(false)
                }
            })
        })


        return true
    } catch (error) {
        return false
    }
}
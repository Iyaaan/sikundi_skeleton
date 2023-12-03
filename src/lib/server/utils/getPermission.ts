import getUser from '@sikundi/lib/server/utils/getUser'
import { redis } from '@sikundi/lib/server/utils/redis'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { Role, User } from '@prisma/client'

interface PermissionStructure {[name: string]: string[]}

export default async function getPermission(request:PermissionStructure) {
    let allowedPermits:any = {}
    try {
        const jwtUsr = await getUser()
        const user = await getUserById(jwtUsr?.payload.id)
        if(!user) throw(false)
        const role = await getRoleById(user.id)
        if(!role.id) throw(false)

        // @ts-ignore
        const allowed:{[name:string]: { label: string; value: string }[]} = role.permissions

        Object.entries(request).map(([name, permissions])=> {
            permissions.map((permit) => {
                if(allowed[name]?.filter(({value}) => value===permit).length > 0) {
                    allowedPermits[name] = {
                        ...allowedPermits[name],
                        [permit]: true
                    }
                }
            })
        })
        allowedPermits.active = true
    } catch (error) {

    } finally {
        return allowedPermits
    }
}

async function getUserById(id?:number):Promise<User | null> {
    const cachedUser = await redis.get(`user:${id}`)
    if (cachedUser) {
      return JSON.parse(cachedUser)
    }
    const user:any = await prisma.user.findUnique({
        select: {
            id: true,
            roleId: true,
            email: true
        },
        where: {
            id: id,
            status: "active"
        }
    })

    await redis.set(`user:${user?.id}`, JSON.stringify(user))
    return user
}

async function getRoleById(id?:number):Promise<Role> {
    const cachedRole = await redis.get(`role:${id}`)
    if (cachedRole) {
      return JSON.parse(cachedRole)
    }
    const role:any = await prisma.role.findUnique({
        select: {
            id: true,
            permissions: true,
            name: true
        },
        where: {
            id: id
        }
    })
    await redis.setex(`role:${role?.id}`, 3600, JSON.stringify(role))
    return role
}
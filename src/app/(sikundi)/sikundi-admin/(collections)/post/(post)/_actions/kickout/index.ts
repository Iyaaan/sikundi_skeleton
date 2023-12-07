"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import getPermission from '@sikundi/lib/server/utils/getPermission'
import { redis } from '@sikundi/lib/server/utils/redis'

export default async function Ping(data:{id: number}) {
    return (await ErrorHandler(null, null, async () => {
        const user = await getUser()
        const permission = await getPermission({
            post: [
                "draft",
                "delete",
                "soft_delete",
                "publish",
                "pending"
            ]
        })

        if(
            !data.id && (
                !permission?.post?.draft || 
                !permission?.post?.delete || 
                !permission?.post?.soft_delete || 
                !permission?.post?.publish || 
                !permission?.post?.pending
            )
        ) {
            throw({
                data: {
                    redirect: '/sikundi-admin'
                }
            })
        }

        await redis.psetex(`post:${data?.id}:editing`, 1300, JSON.stringify(user?.payload))
        
        return ({ 
            data: {
                ok: true
            }
        })
    }))
}
import { notFound } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import { User } from '@prisma/client'

export default async function Edit (user: User) {
    const userSingle = await prisma.user.findUnique({
        select: {
            id: true,
            userName: true,
            userNameEn: true,
            email: true,
            password: true,
            description: true,
            status: true,
            profilePicture: true,
            role: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
        },
        where: {
            email: String(user.email)
        }
    })

    if (userSingle === null) return notFound()
    return {
        ...userSingle,
        createdBy: userSingle?.createdBy ? {
            value: userSingle?.createdBy?.userName,
            label: userSingle?.createdBy?.userName
        } : undefined,
        profilePictureUrl: userSingle.profilePicture?.url,
        role: {
            value: userSingle?.role?.name,
            label: userSingle?.role?.name
        },
    }
}
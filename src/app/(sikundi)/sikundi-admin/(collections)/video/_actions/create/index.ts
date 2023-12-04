"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import VideoSchema, { VideoSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'
import getPermission from '@sikundi/lib/server/utils/getPermission'

const statusFromActions = {
    draft: "drafted",
    soft_delete: "soft_deleted",
    publish: "published",
    pending: "pending"
}

export default async function POST(data: VideoSchemaType) {
    return (await ErrorHandler(data, VideoSchema, async ({action, id, push, ...data}:VideoSchemaType) => {
        const user = await getUser()
        const permission = await getPermission({
            video: [
                "draft",
                "delete",
                "soft_delete",
                "publish",
                "pending"
            ]
        })

        if(!permission?.video?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} videos.`,
                    variant: "destructive"
                }
            })
        }

        const video = await prisma.video.create({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            }
        })

        revalidatePath('/sikundi-admin/video')
        return ({ 
            data: {
                video: video
            },
            notification: {
                title: `Video Successfully Created`,
                description: `a video have created under the name ${video.title}`
            }
        })
    }))
}
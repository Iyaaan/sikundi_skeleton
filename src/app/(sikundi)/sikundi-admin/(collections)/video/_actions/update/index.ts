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
    return (await ErrorHandler(data, VideoSchema, async ({createdBy, language, push, action, id, ...data}:VideoSchemaType) => {
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

        if (action === "delete") {
            const video = await prisma.video.delete({
                where: {
                    id: id
                }
            })

            revalidatePath('/sikundi-admin/video')
            return ({ 
                data: {
                    video: video
                },
                notification: {
                    title: `Photo Successfully Deleted`,
                    description: `a video have deleted under the name ${video.title}`
                }
            })
        }


        const video = await prisma.video.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy.value || user?.payload?.email
                    }
                },
                // @ts-ignore
                language: language?.value,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            },
            where: {    
                id: id
            }
        })

        revalidatePath('/sikundi-admin/video')
        return {
            notification: {
                title: `Video Successfully ${action}`,
                description: `a video have ${action}, under the name ${video.title}`
            }
        }
    }))
}
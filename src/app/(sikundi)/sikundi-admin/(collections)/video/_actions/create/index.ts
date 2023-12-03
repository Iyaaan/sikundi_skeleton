"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import VideoSchema, { VideoSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: VideoSchemaType) {
    return (await ErrorHandler(data, VideoSchema, async (data:VideoSchemaType) => {
        const user = await getUser()

        const video = await prisma.video.create({
            data: {
                ...{...data, action: undefined, id: undefined, push: undefined, tags: undefined, featureImageUrl: undefined},
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value
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
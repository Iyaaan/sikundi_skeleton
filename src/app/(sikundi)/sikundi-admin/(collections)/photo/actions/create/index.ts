"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import PhotoSchema, { PhotoSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: PhotoSchemaType) {
    return (await ErrorHandler(data, PhotoSchema, async (data:PhotoSchemaType) => {
        const user = await getUser()

        const photo = await prisma.photo.create({
            data: {
                ...{...data, action: undefined, id: undefined, push: undefined, tags: undefined, featureImageUrl: undefined},
                lead: data.lead,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                featureImage: data?.featureImageUrl ? {
                    connect: {
                        url: data?.featureImageUrl
                    }
                } : undefined,
            }
        })

        revalidatePath('/sikundi-admin/photo')
        return ({ 
            data: {
                photo: photo
            },
            notification: {
                title: `Photo Successfully Created`,
                description: `a photo have created under the name ${photo.title}`
            }
        })
    }))
}
"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import PhotoSchema, { PhotoSchemaType } from './schema'
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

export default async function POST(data: PhotoSchemaType) {
    return (await ErrorHandler<any, any>(data, PhotoSchema, async ({action, id, push, featureImageUrl, ...data}:PhotoSchemaType) => {
        const user = await getUser()
        const permission = await getPermission({
            photo: [
                "draft",
                "delete",
                "soft_delete",
                "publish",
                "pending"
            ]
        })

        if(!permission?.photo?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} photos.`,
                    variant: "destructive"
                }
            })
        }

        const photo = await prisma.photo.create({
            data: {
                ...data,
                lead: data.lead,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                featureImage: featureImageUrl ? {
                    connect: {
                        url: featureImageUrl
                    }
                } : undefined,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            }
        })

        revalidatePath('/sikundi-admin/photo')
        revalidatePath(`/${photo.language.toLowerCase()}`)
        revalidatePath(`/${photo.language.toLowerCase()}/gaafu-gallery`)
        revalidatePath(`/${photo.language.toLowerCase()}/gallery/${photo.id}`)
        return ({ 
            data: {
                photo: photo,
                action: action
            },
            notification: {
                title: `Photo Successfully Created`,
                description: `a photo have created under the name ${photo.title}`
            }
        })
    }))
}
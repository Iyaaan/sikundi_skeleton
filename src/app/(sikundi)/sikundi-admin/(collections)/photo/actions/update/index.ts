"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import PhotoSchema, { PhotoSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

const statusFromActions = {
    draft: "drafted",
    soft_delete: "soft_deleted",
    publish: "published",
    pending: "pending"
}

export default async function POST(data: PhotoSchemaType) {
    return (await ErrorHandler(data, PhotoSchema, async ({createdBy, featureImageUrl, language, push, action, id, ...data}:PhotoSchemaType) => {
        const user = await getUser()

        if (action === "delete") {
            const photo = await prisma.photo.delete({
                where: {
                    id: id
                }
            })

            revalidatePath('/sikundi-admin/photo')
            return ({ 
                data: {
                    photo: photo
                },
                notification: {
                    title: `Photo Successfully Deleted`,
                    description: `a photo have deleted under the name ${photo.title}`
                }
            })
        }


        const photo = await prisma.photo.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy.value || user?.payload.email
                    }
                },
                featureImage: featureImageUrl ? {
                    connect: {
                        url: featureImageUrl
                    }
                } : undefined,
                // @ts-ignore
                language: language?.value,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            },
            where: {    
                id: id
            }
        })

        revalidatePath('/sikundi-admin/photo')
        return {
            notification: {
                title: `Photo Successfully ${action}`,
                description: `a photo have ${action}, under the name ${photo.title}`
            }
        }
    }))
}
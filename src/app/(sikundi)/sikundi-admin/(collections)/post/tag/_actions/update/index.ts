"use server"

import TagSchema, { TagSchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'
import getUser from '@sikundi/lib/server/utils/getUser'

export default async function UpdateTag(data:TagSchemaType) {
    return (await ErrorHandler<TagSchemaType, { tag: any }>(data, TagSchema, async (data:TagSchemaType) => {
        if (!data.id) throw({
            notification: {
                title: "Tag doesn't exist",
                description: `Please try again with a tag that exists`
            }
        })

        const user = await getUser()

        const tag = data.action === "update" ? (await prisma.tag.update({
            data: {
                ...{...data, action: undefined, id: undefined},
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload.email
                    }
                },
            },
            where: {
                id: data.id
            }
        })) : (await prisma.tag.delete({
            select: {
                name: true
            },
            where: {
                id: data.id
            }
        }))

        revalidatePath('/sikundi-admin/post/tag')
        return ({ 
            data: {
                tag: tag
            },
            notification: {
                title: `Tag Successfully ${data.action === "update" ? "updated" : "deleted"}`,
                description: `a tag have created under the name ${tag.name}`
            }
        })
    }))
}
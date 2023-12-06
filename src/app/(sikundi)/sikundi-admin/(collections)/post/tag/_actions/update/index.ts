"use server"

import TagSchema, { TagSchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'
import getUser from '@sikundi/lib/server/utils/getUser'
import getPermission from '@sikundi/lib/server/utils/getPermission'

export default async function UpdateTag(data:TagSchemaType) {
    return (await ErrorHandler<TagSchemaType, { tag: any }>(data, TagSchema, async ({action, id, ...data}:TagSchemaType) => {
        if (!id) throw({
            notification: {
                title: "Tag doesn't exist",
                description: `Please try again with a tag that exists`
            }
        })

        const user = await getUser()
        const permission = await getPermission({
            tag: [
                "view",
                "delete",
                "create",
                "update"
            ]
        })

        if(!permission?.tag?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} tags.`,
                    variant: "destructive"
                }
            })
        }

        const tag = action === "update" ? (await prisma.tag.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.email
                    }
                },
            },
            where: {
                id: id
            }
        })) : (await prisma.tag.delete({
            select: {
                name: true
            },
            where: {
                id: id
            }
        }))

        revalidatePath('/sikundi-admin/post/tag')
        return ({ 
            data: {
                tag: tag
            },
            notification: {
                title: `Tag Successfully ${action === "update" ? "updated" : "deleted"}`,
                description: `a tag have created under the name ${tag.name}`
            }
        })
    }))
}
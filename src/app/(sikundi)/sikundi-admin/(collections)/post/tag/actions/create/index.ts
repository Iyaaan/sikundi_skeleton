"use server"

import TagSchema, { TagSchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'

export default async function TagCreate(data:TagSchemaType) {
    return (await ErrorHandler<TagSchemaType, { tag: any }>(data, TagSchema, async (data:TagSchemaType) => {
        const tag = await prisma.tag.create({
            data: {
                ...{...data, action: undefined, id: undefined},
                createdBy: {
                    connect: {
                        email: data.createdBy.value
                    }
                },
                
            }
        })

        revalidatePath('/sikundi-admin/post/tag')
        return ({ 
            data: {
                tag: tag
            },
            notification: {
                title: `Tag Successfully Created`,
                description: `a tag have created under the name ${tag.name}`
            }
        })
    }))
}
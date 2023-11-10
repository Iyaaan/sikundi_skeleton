"use server"

import CategorySchema, { CategorySchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'
import getUser from '@sikundi/lib/server/utils/getUser'

export default async function POST(data: CategorySchemaType) {
    return (await ErrorHandler(data, CategorySchema, async (data:CategorySchemaType) => {
        const user = await getUser()

        const category = await prisma.category.create({
            data: {
                ...{...data, action: undefined, id: undefined},
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload.userName
                    }
                },
                // @ts-ignore
                language: data.language.value
            }
        })

        revalidatePath('/sikundi-admin/post/category')
        return ({ 
            data: {
                category: category
            },
            notification: {
                title: `Category Successfully Created`,
                description: `a category have created under the name ${category.name}`
            }
        })
    }))
}
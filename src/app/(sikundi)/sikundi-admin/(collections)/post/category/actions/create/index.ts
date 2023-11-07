"use client"

import CategorySchema, { CategorySchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'

export default async function POST(data: CategorySchemaType) {
    return (await ErrorHandler(data, CategorySchema, async (data:CategorySchemaType) => {
        const category = await prisma.category.create({
            data: {
                ...{...data, action: undefined, id: undefined},
                createdBy: {
                    connect: {
                        email: data.createdBy.value
                    }
                },
                
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
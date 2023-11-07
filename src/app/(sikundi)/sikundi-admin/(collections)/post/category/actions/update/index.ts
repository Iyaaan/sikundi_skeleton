"use server"

import CategorySchema, { CategorySchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'

export default async function POST(data: CategorySchemaType) {
    return (await ErrorHandler(data, CategorySchema, async (data:CategorySchemaType) => {
        if (!data.id) throw({
            notification: {
                title: "Category doesn't exist",
                description: `Please try again with a category that exists`
            }
        })

        const category = data.action === "update" ? (await prisma.category.update({
            data: {
                ...{...data, action: undefined, id: undefined},
                createdBy: {
                    connect: {
                        email: data.createdBy.value
                    }
                },
                
            },
            where: {
                id: data.id
            }
        })) : (await prisma.category.delete({
            select: {
                name: true
            },
            where: {
                id: data.id
            }
        }))

        revalidatePath('/sikundi-admin/post/category')
        return ({ 
            data: {
                category: category
            },
            notification: {
                title: `Category Successfully ${data.action === "update" ? "updated" : "deleted"}`,
                description: `a category have created under the name ${category.name}`
            }
        })
    }))
}
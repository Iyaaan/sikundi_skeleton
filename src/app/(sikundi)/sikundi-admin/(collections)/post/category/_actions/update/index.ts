"use server"

import CategorySchema, { CategorySchemaType } from './schema'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { revalidatePath } from 'next/cache'
import getUser from '@sikundi/lib/server/utils/getUser'
import getPermission from '@sikundi/lib/server/utils/getPermission'

export default async function POST(data: CategorySchemaType) {
    return (await ErrorHandler(data, CategorySchema, async ({action, id, ...data}:CategorySchemaType) => {
        if (!id) throw({
            notification: {
                title: "Category doesn't exist",
                description: `Please try again with a category that exists`
            }
        })

        const user = await getUser()
        const permission = await getPermission({
            category: [
                "view",
                "delete",
                "create",
                "update"
            ]
        })

        if(!permission?.category?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} posts.`,
                    variant: "destructive"
                }
            })
        }

        const category = action === "update" ? (await prisma.category.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value
            },
            where: {
                id: id
            }
        })) : (await prisma.category.delete({
            select: {
                name: true,
                language: true,
                slug: true
            },
            where: {
                id: id
            }
        }))

        revalidatePath('/sikundi-admin/post/category')
        revalidatePath(`/${category.language.toLowerCase()}/${category.slug}`)
        return ({ 
            data: {
                category: category
            },
            notification: {
                title: `Category Successfully ${action === "update" ? "updated" : "deleted"}`,
                description: `a category have created under the name ${category.name}`
            }
        })
    }))
}
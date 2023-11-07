import { NextResponse, type NextRequest } from 'next/server'
import CategorySchema, { CategorySchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from "@sikundi/lib/server/utils/prisma"

export async function POST(request: NextRequest, { params }: {params:{id: string}}) {
    return (await ErrorHandlerWrapper(request, CategorySchema, async (data:CategorySchemaType) => {
        if (!parseInt(params.id)) throw({
            notification: {
                title: "Category doesn't exist",
                description: `Please try again with a category that exists`
            },
            statusCode: 404
        })

        const category = data.action === "update" ? (await prisma.category.update({
            data: {
                ...{...data, action: undefined},
                createdBy: {
                    connect: {
                        email: data.createdBy.value
                    }
                },
                
            },
            where: {
                id: parseInt(params.id)
            }
        })) : (await prisma.category.delete({
            select: {
                name: true
            },
            where: {
                id: parseInt(params.id)
            }
        }))
        return NextResponse.json({ 
            data: {
                category: category
            },
            notification: {
                title: `Category Successfully ${data.action === "update" ? "updated" : "deleted"}`,
                description: `a category have created under the name ${category.name}`
            }
        }, { status: 200 })
    }))
}
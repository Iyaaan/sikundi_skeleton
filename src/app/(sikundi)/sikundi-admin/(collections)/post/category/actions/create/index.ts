import { NextResponse, type NextRequest } from 'next/server'
import CategorySchema, { CategorySchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from "@sikundi/lib/server/utils/prisma"

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, CategorySchema, async (data:CategorySchemaType) => {
        const category = await prisma.category.create({
            data: {
                ...{...data, action: undefined},
                createdBy: {
                    connect: {
                        email: data.createdBy.value
                    }
                },
                
            }
        })
        return NextResponse.json({ 
            data: {
                category: category
            },
            notification: {
                title: `Category Successfully Created`,
                description: `a category have created under the name ${category.name}`
            }
        }, { status: 200 })
    }))
}
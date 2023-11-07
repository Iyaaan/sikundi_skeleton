import { NextResponse, type NextRequest } from 'next/server'
import TagSchema, { TagSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from "@sikundi/lib/server/utils/prisma"

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, TagSchema, async (data:TagSchemaType) => {
        const tag = await prisma.tag.create({
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
                tag: tag
            },
            notification: {
                title: `Tag Successfully Created`,
                description: `a tag have created under the name ${tag.name}`
            }
        }, { status: 200 })
    }))
}
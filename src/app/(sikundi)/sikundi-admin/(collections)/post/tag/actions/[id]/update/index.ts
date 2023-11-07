import { NextResponse, type NextRequest } from 'next/server'
import TagSchema, { TagSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from "@sikundi/lib/server/utils/prisma"

export async function POST(request: NextRequest, { params }: {params:{id: string}}) {
    return (await ErrorHandlerWrapper(request, TagSchema, async (data:TagSchemaType) => {
        if (!parseInt(params.id)) throw({
            notification: {
                title: "Tag doesn't exist",
                description: `Please try again with a tag that exists`
            },
            statusCode: 404
        })

        const tag = data.action === "update" ? (await prisma.tag.update({
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
        })) : (await prisma.tag.delete({
            select: {
                name: true
            },
            where: {
                id: parseInt(params.id)
            }
        }))
        return NextResponse.json({ 
            data: {
                tag: tag
            },
            notification: {
                title: `Tag Successfully ${data.action === "update" ? "updated" : "deleted"}`,
                description: `a tag have created under the name ${tag.name}`
            }
        }, { status: 200 })
    }))
}
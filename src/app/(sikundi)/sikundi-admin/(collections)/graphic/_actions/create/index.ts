"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import GraphicSchema, { GraphicSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: GraphicSchemaType) {
    return (await ErrorHandler(data, GraphicSchema, async (data:GraphicSchemaType) => {
        const user = await getUser()

        const graphic = await prisma.graphic.create({
            data: {
                ...{...data, action: undefined, id: undefined, push: undefined, tags: undefined, graphicsUrl: undefined},
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                graphics: data?.graphicsUrl ? {
                    connect: {
                        url: data?.graphicsUrl
                    }
                } : undefined,
            }
        })

        revalidatePath('/sikundi-admin/graphic')
        return ({ 
            data: {
                graphic: graphic
            },
            notification: {
                title: `Graphic Successfully Created`,
                description: `a graphic have created under the name ${graphic.title}`
            }
        })
    }))
}
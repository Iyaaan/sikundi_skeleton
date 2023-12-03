"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import GraphicSchema, { GraphicSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

const statusFromActions = {
    draft: "drafted",
    soft_delete: "soft_deleted",
    publish: "published",
    pending: "pending"
}

export default async function POST(data: GraphicSchemaType) {
    return (await ErrorHandler(data, GraphicSchema, async ({createdBy, graphicsUrl, language, push, action, id, ...data}:GraphicSchemaType) => {
        const user = await getUser()

        if (action === "delete") {
            const graphic = await prisma.graphic.delete({
                where: {
                    id: id
                }
            })

            revalidatePath('/sikundi-admin/graphic')
            return ({ 
                data: {
                    graphic: graphic
                },
                notification: {
                    title: `Graphic Successfully Deleted`,
                    description: `a graphic have deleted under the name ${graphic.title}`
                }
            })
        }


        const graphic = await prisma.graphic.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy.value || user?.email
                    }
                },
                graphics: graphicsUrl ? {
                    connect: {
                        url: graphicsUrl
                    }
                } : undefined,
                // @ts-ignore
                language: language?.value,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            },
            where: {    
                id: id
            }
        })

        revalidatePath('/sikundi-admin/graphic')
        return {
            notification: {
                title: `Graphic Successfully ${action}`,
                description: `a graphic have ${action}, under the name ${graphic.title}`
            }
        }
    }))
}
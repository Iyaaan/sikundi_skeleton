"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import GraphicSchema, { GraphicSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'
import getPermission from '@sikundi/lib/server/utils/getPermission'

const statusFromActions = {
    draft: "drafted",
    soft_delete: "soft_deleted",
    publish: "published",
    pending: "pending"
}

export default async function POST(data: GraphicSchemaType) {
    return (await ErrorHandler(data, GraphicSchema, async ({action, id, push, graphicsUrl, ...data}:GraphicSchemaType) => {
        const user = await getUser()
        const permission = await getPermission({
            graphic: [
                "draft",
                "delete",
                "soft_delete",
                "publish",
                "pending"
            ]
        })

        if(!permission?.graphic?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} graphics.`,
                    variant: "destructive"
                }
            })
        }

        const graphic = await prisma.graphic.create({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted",
                graphics: graphicsUrl ? {
                    connect: {
                        url: graphicsUrl
                    }
                } : undefined,
            }
        })

        revalidatePath('/sikundi-admin/graphic')
        revalidatePath(`/${graphic.language.toLowerCase()}`)
        revalidatePath(`/${graphic.language.toLowerCase()}/gaafu_graphics`)
        revalidatePath(`/${graphic.language.toLowerCase()}/gaafu_graphics/${graphic.id}`)
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
"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import AdSchema, { AdSchemaType } from './schema'
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

export default async function POST(data: AdSchemaType) {
    return (await ErrorHandler(data, AdSchema, async ({action, id, adsUrl, ...data}:AdSchemaType) => {
        const user = await getUser()
        const permission = await getPermission({
            adBanner: [
                "draft",
                "delete",
                "soft_delete",
                "publish",
                "pending"
            ]
        })

        if(!permission?.adBanner?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} adBanners.`,
                    variant: "destructive"
                }
            })
        }

        const adBanner = await prisma.adBanner.create({
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
                adBanner: adsUrl ? {
                    connect: {
                        url: adsUrl
                    }
                } : undefined,
                // @ts-ignore
                adType: data.adType.value
            }
        })

        revalidatePath('/sikundi-admin/ad-banner')
        return ({ 
            data: {
                adBanner: adBanner
            },
            notification: {
                title: `Ad banner Successfully Created`,
                description: `a ad banner have created under the name ${adBanner.altTxt}`
            }
        })
    }))
}
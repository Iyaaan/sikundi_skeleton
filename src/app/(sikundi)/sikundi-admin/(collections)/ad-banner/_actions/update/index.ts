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
    return (await ErrorHandler(data, AdSchema, async ({createdBy, adsUrl, language, action, id, ...data}:AdSchemaType) => {
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

        if (action === "delete") {
            const adBanner = await prisma.adBanner.delete({
                where: {
                    id: id
                }
            })

            revalidatePath('/sikundi-admin/adBanner')
            return ({ 
                data: {
                    adBanner: adBanner
                },
                notification: {
                    title: `Ad banner Successfully Deleted`,
                    description: `a ad banner have deleted under the name ${adBanner.altTxt}`
                }
            })
        }

        
        const adBanner = await prisma.adBanner.update({
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy.value || user?.payload?.email
                    }
                },
                adBanner: adsUrl ? {
                    connect: {
                        url: adsUrl
                    }
                } : undefined,
                // @ts-ignore
                language: language?.value,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted",
                // @ts-ignore
                adType: data.adType.value
            },
            where: {    
                id: id
            }
        })

        revalidatePath('/sikundi-admin/ad-banner')
        return {
            notification: {
                title: `Ad Banner Successfully ${action}`,
                description: `a ad Banner have ${action}, under the name ${adBanner.altTxt}`
            }
        }
    }))
}
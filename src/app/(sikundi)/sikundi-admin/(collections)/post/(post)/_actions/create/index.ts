"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import PostSchema, { PostSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { ThaanaLatin } from '@sikundi/lib/transliterate'
import { revalidatePath } from 'next/cache'
import getPermission from '@sikundi/lib/server/utils/getPermission'

const statusFromActions = {
    draft: "drafted",
    soft_delete: "soft_deleted",
    publish: "published",
    pending: "pending"
}

export default async function POST(data: PostSchemaType) {
    return (await ErrorHandler(data, PostSchema, async ({action, id, push, tags, featureImageUrl, ...data}:PostSchemaType) => {
        const user = await getUser()
        let tagss:any = []
        const permission = await getPermission({
            post: [
                "draft",
                "delete",
                "soft_delete",
                "publish",
                "pending"
            ]
        })

        if(!permission?.post?.[String(action)]) {
            throw({
                notification: {
                    title: 'Authorization Error',
                    description: `You are not allowed to ${action} posts.`,
                    variant: "destructive"
                }
            })
        }

        try {
            if (tags) {
                await Promise.all(tags?.map(async (tag) => {
                    tagss.push(await prisma.tag.upsert({
                        update: {
                            name: tag.label,
                            slug: ThaanaLatin(tag.label),
                            createdBy: {
                                connect: {
                                    email: user?.payload?.email
                                }
                            }
                        },
                        create: {
                            name: tag.label,
                            slug: ThaanaLatin(tag.label),
                            createdBy: {
                                connect: {
                                    email: user?.payload?.email
                                }
                            }
                        },
                        where: {
                            slug: ThaanaLatin(tag.label)
                        },
                    }))
                }))
            }
        } catch (error) {
            
        }

        const post = await prisma.post.create({
            data: {
                ...data,
                lead: data.lead,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.payload?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                category: data.category?.value ? {
                    connect: {
                        slug: data.category?.value
                    }
                } : undefined,
                featureImage: featureImageUrl ? {
                    connect: {
                        url: featureImageUrl
                    }
                } : undefined,
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            }
        })

        try {
            if(tagss.length > 0) {
                await prisma.postsTags.createMany({
                    data: tagss.map((tag:any) => ({
                        postId: post.id,
                        tagId: tag.id
                    }))
                })
            }
        } catch (error) {
            
        }

        revalidatePath('/sikundi-admin/post')
        return ({ 
            data: {
                post: post,
                action: action
            },
            notification: {
                title: `Post Successfully Created`,
                description: `a post have created under the name ${post.title}`
            }
        })
    }))
}
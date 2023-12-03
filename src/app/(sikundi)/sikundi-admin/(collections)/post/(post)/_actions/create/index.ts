"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import PostSchema, { PostSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { ThaanaLatin } from '@sikundi/lib/transliterate'
import { revalidatePath } from 'next/cache'

export default async function POST(data: PostSchemaType) {
    return (await ErrorHandler(data, PostSchema, async (data:PostSchemaType) => {
        const user = await getUser()
        let tags:any = []

        try {
            if (data.tags) {
                await Promise.all(data.tags?.map(async (tag) => {
                    tags.push(await prisma.tag.upsert({
                        update: {
                            name: tag.label,
                            slug: ThaanaLatin(tag.label),
                            createdBy: {
                                connect: {
                                    email: user?.email
                                }
                            }
                        },
                        create: {
                            name: tag.label,
                            slug: ThaanaLatin(tag.label),
                            createdBy: {
                                connect: {
                                    email: user?.email
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
                ...{...data, action: undefined, id: undefined, push: undefined, tags: undefined, featureImageUrl: undefined},
                lead: data.lead,
                createdBy: {
                    connect: {
                        userName: data.createdBy.value || user?.userName
                    }
                },
                // @ts-ignore
                language: data.language.value,
                category: data.category?.value ? {
                    connect: {
                        slug: data.category?.value
                    }
                } : undefined,
                featureImage: data?.featureImageUrl ? {
                    connect: {
                        url: data?.featureImageUrl
                    }
                } : undefined,
            }
        })

        try {
            if(tags.length > 0) {
                await prisma.postsTags.createMany({
                    data: tags.map((tag:any) => ({
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
                post: post
            },
            notification: {
                title: `Post Successfully Created`,
                description: `a post have created under the name ${post.title}`
            }
        })
    }))
}
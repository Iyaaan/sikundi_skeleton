"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import PostSchema, { PostSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { ThaanaLatin } from '@sikundi/lib/transliterate'
import { revalidatePath } from 'next/cache'

export default async function POST(data: PostSchemaType) {
    return (await ErrorHandler(data, PostSchema, async (data:PostSchemaType) => {
        if (!data.id) throw({
            notification: {
                title: "Post doesn't exist",
                description: `Please try again with a post that exists`
            }
        })

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
                                    email: user?.payload.email
                                }
                            }
                        },
                        create: {
                            name: tag.label,
                            slug: ThaanaLatin(tag.label),
                            createdBy: {
                                connect: {
                                    email: user?.payload.email
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

        const post = (data.action === "draft" || data.action === "publish" || data.action === "pending" || data.action === "soft_delete") ? await prisma.post.update({
            data: {
                ...{...data, action: undefined, id: undefined, push: undefined, tags: undefined, featureImageUrl: undefined},
                lead: data.lead,
                createdBy: {
                    connect: {
                        email: data.createdBy.value
                    }
                },
                // @ts-ignore
                language: data.language.value,
                category: {
                    connect: {
                        slug: data.category?.value
                    }
                },
                featureImage: {
                    connect: {
                        url: data?.featureImageUrl
                    }
                },
                status: data.action === "pending" ? "pending" : data.action === "soft_delete" ? "soft_deleted" : data.action === "publish" ? "published" : "drafted"
            },
            where: {
                id: data.id
            }
        }) : data.action === "delete" ? await prisma.post.delete({
            where: {
                id: data.id
            }
        }) : null

        if(!post) {
            throw {
                
            }
        }

        try {
            if(tags.length > 0) {
                const init = tags.map((tag:any) => ({
                    postId: post.id,
                    tagId: tag.id
                }))

                const dirty = await prisma.postsTags.findMany({
                    where: {
                        OR: init
                    }
                })

                const cleaned = [...init, dirty].filter((obj, index, self) => 
                    index === self.findIndex((t) => (t.tagId === obj.tagId || t.postId === obj.postId))
                )

                await prisma.postsTags.createMany({
                    data: cleaned.map((tag:any) => ({
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
                title: `Post Successfully ${data.action}`,
                description: `a post have ${data.action} under the name ${post.title}`
            }
        })
    }))
}
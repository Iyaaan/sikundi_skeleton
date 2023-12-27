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
    return (await ErrorHandler<any, any>(data, PostSchema, async ({createdBy, category, featureImageUrl, language, tags, push, action, id, ...data}:PostSchemaType) => {
        const user = await getUser()
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
            await prisma.postsTags.deleteMany({
                where: {
                    postId: id
                }
            })
        } catch (error) {
            console.error(error)
        }

        if (action === "delete") {
            const post = await prisma.post.delete({
                where: {
                    id: id
                }
            })

            revalidatePath('/sikundi-admin/post')
            return ({ 
                data: {
                    post: post,
                    action: "delete"
                },
                notification: {
                    title: `Post Successfully Deleted`,
                    description: `a post have deleted under the name ${post.title}`
                }
            })
        }



        const cleanedTags: {id:number}[] = []
        try {
            tags && await Promise.all(tags?.map(async (tag) => cleanedTags.push(await prisma.tag.upsert({
                select: {
                    id: true,
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
                update: {
                    name: tag.label,
                    slug: ThaanaLatin(tag.label),
                    createdBy: {
                        connect: {
                            email: user?.payload?.email
                        }
                    }
                },
                where: { slug: ThaanaLatin(tag.label) }
            }))))
        } catch (error) {
            console.error(error)
        }

        const post = await prisma.post.update({
            select: {
                id: true,
                title: true,
                language: true,
                category: {
                    select: {
                        slug: true
                    }
                }
            },
            data: {
                ...data,
                createdBy: {
                    connect: {
                        userName: createdBy.value || user?.payload?.email
                    }
                },
                category: category?.value ? {
                    connect: {
                        slug: category?.value
                    }
                } : undefined,
                featureImage: featureImageUrl ? {
                    connect: {
                        url: featureImageUrl
                    }
                } : undefined,
                // @ts-ignore
                language: language?.value,
                postsTags: {
                    createMany: {data: cleanedTags.map((tag)=>({
                        tagId: tag.id
                    }))},
                },
                // @ts-ignore
                status: action ? statusFromActions[action] : "drafted"
            },
            where: {    
                id: id
            }
        })

        revalidatePath('/sikundi-admin/post')
        revalidatePath(`/${post.language.toLowerCase()}`)
        // @ts-ignore
        if (post?.category?.slug) {
            // @ts-ignore
            revalidatePath(`/${post.language.toLowerCase()}/${post.category.slug}`)
        }
        revalidatePath(`/${post.language.toLowerCase()}/${post.id}`)
        return {
            data: {
                action: action
            },
            notification: {
                title: `Post Successfully ${action}`,
                description: `a post have ${action}, under the name ${post.title}.`
            }
        }
    }))
}
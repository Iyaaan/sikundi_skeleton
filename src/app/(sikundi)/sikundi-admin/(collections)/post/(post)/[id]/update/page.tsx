import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import { notFound, redirect } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import getPermission from '@sikundi/lib/server/utils/getPermission'
import { redis } from '@sikundi/lib/server/utils/redis'

interface Props {
    params: {
        [name:string]: string
    }
    searchParams: { 
        
    }

}

export default async function page({params, searchParams}: Props) {
    const permission = await getPermission({
        post: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.post?.draft || 
        permission?.post?.delete || 
        permission?.post?.soft_delete || 
        permission?.post?.publish || 
        permission?.post?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const editingUser = JSON.parse(String(await redis.get(`post:${params.id}:editing`)))
    const data = await post({params, searchParams})
    const categories = (await prisma.category.findMany({
        orderBy: {
            posts: {
                _count: "asc"
            }
        },
        select: {
            id: true,
            name: true,
            slug: true
        },
        take: 5
    })).map((tag)=>({
        label: tag.name,
        value: tag.slug
    }))
    const tags = (await prisma.tag.findMany({
        orderBy: {
            tagsPosts: {
                _count: "asc"
            }
        },
        select: {
            id: true,
            name: true,
            slug: true
        },
        take: 5
    })).map((tag)=>({
        label: tag.name,
        value: tag.slug
    }))

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' editingUser={editingUser} permission={{
            draft: permission?.post?.draft,
            delete: permission?.post?.delete, 
            soft_delete: permission?.post?.soft_delete, 
            publish: permission?.post?.publish,
            pending: permission?.post?.pending
        }} categories={categories} tags={tags} />
    )
}

export const dynamic = "force-dynamic"



const post = async (query: Props) => {
    const postSingle = await prisma.post.findUnique({
        select: {
            id: true,
            title: true,
            longTitle: true,
            latinTitle: true,
            description: true,
            status: true,
            lead: true,
            featureImage: true,
            featureImageCaption: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            language: true,
            breaking: true,
            liveblog: true,
            category: true,
            postsTags: {
                include: {
                    tag: {
                        select: {
                            name: true,
                            slug: true
                        }
                    }
                }
            },
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (postSingle === null) return notFound()
    return {
        ...postSingle,
        createdBy: {
            value: postSingle?.createdBy?.userName,
            label: postSingle?.createdBy?.userName
        },
        category: postSingle?.category?.name ? {
            value: postSingle?.category?.slug,
            label: postSingle?.category?.name
        } : undefined,
        tags: postSingle?.postsTags?.map((tag)=>({
            label: tag.tag?.name,
            value: tag.tag?.slug
        })),
        featureImageUrl: postSingle.featureImage?.url,
        language: {
            value: postSingle?.language,
            label: postSingle?.language === "EN" ? "English" : "Dhivehi"
        }
    }
}
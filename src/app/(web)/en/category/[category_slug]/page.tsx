import React, { Fragment } from 'react'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import VarientSix from '../../_components/blocks/VarientSix'

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 1000

interface Props { 
    params: { 
        category_slug: number 
    } 
}

export default async function Page(props:Props) {
    const { name, posts, nextPage } = await postsByCategory(String(props.params.category_slug))

    return (
        <Fragment>
            {/* @ts-ignore */}
            {posts?.length > 0 && <VarientSix title={name} className='my-12' posts={posts} />}
        </Fragment>
    )
}

async function postsByCategory(slug:string, page?: number) {
    "use server"

    const current = page || 1
    const per_page = 11
    const category = await prisma.category.findUnique({
        select: {
            name: true,
            posts: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    createdAt: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                    featureImage: {
                        select: {
                            url: true
                        }
                    }
                },
                where: {
                    status: "published",
                    language: "EN"
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: per_page,
                skip: Number(current)-1 < 0 ? 0 : (Number(current)-1)*per_page
            }
        },
        where: {
            slug: slug
        }
    })

    const totalPosts = await prisma.post.aggregate({
        _count: true,
        where: {
            category: {
                slug: slug
            },
            status: "published"
        }
    })

    return {
        name: category?.name,
        posts: category?.posts.map((post) => ({
            url: `/en/${post.id}`,
            title: post.title,
            description: post.description,
            createdAt: new Date(post.createdAt),
            category: post?.category?.name,
            featureImageUrl: post.featureImage?.url
        })),
        nextPage: Math.ceil((Number(totalPosts._count)/per_page)) >= (current + 1) ? (current + 1) : null
    }
}

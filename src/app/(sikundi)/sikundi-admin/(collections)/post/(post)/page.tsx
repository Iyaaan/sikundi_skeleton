import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import NotFound from './not-found'
import Paginator from '@sikundi/app/(sikundi)/_components/Paginator'
import { Badge } from '@sikundi/components/ui/badge'

export const dynamic = "force-dynamic"

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }
}

export default async function page({params, searchParams}: Props) {
    return (
        <Suspense key={JSON.stringify(searchParams) + params} fallback={<Loading />} >
            <List getData={posts({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {  [name:string]: any  }}) {
    const data = await getData
    if(data.posts.length === 0 || data.posts === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <div className='rounded-md grid grid-cols-4 mb-4 overflow-hidden border'>
                {data?.stats?.map((stat:any, index:number)=>(
                    <div key={index} className='border p-2 col-span-2 flex items-center gap-2 lg:gap-4 lg:col-span-1'>
                        {stat?.status}
                        <Badge variant={"secondary"}>{stat?._count}</Badge>
                    </div>
                ))}
            </div>
            {parseInt(data.total) > 1 && <Paginator
                className='lg:hidden mb-4'
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/post'
            />}
            <DataTable data={data.posts} />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/post'
            />}
        </div>
    )
}

const posts = async (query: Props) => {
    const current = query?.searchParams?.page || 1
    const per_page = 12
    const filters = {
        AND: [
            {
                OR: query.searchParams?.query ? [
                    {
                        title: {
                            contains: query.searchParams?.query,
                            mode: "insensitive"
                        }
                    },
                    {
                        latinTitle: {
                            contains: query.searchParams?.query,
                            mode: "insensitive"
                        }
                    }
                ] : undefined
            },
            {
                createdBy: query.searchParams?.createdBy ? {
                    userName: query.searchParams?.createdBy
                } : undefined
            },
            {
                // @ts-ignore
                OR: query.searchParams?.status ? [
                    {
                        status: query.searchParams?.status
                    }
                ] : [
                    {
                        status: "drafted"
                    },
                    {
                        status: "published"
                    }
                ]
            },
            {
                // @ts-ignore
                OR: query.searchParams?.language ? [
                    {
                        language: query.searchParams?.language
                    }
                ] : undefined
            }
        ]
    }

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true,
            status: true,
            language: true,
            createdBy: {
                select: {
                    userName: true
                }
            },
            views: true
        },
        // @ts-ignore
        where: filters,
        orderBy: {
            createdAt: "desc"
        },
        take: per_page,
        skip: Number(current)-1 < 0 ? 0 : (Number(current)-1)*per_page
    })

    const totalPosts = await prisma.post.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })

    const stats = await prisma.post.groupBy({
        by: ['status'],
        _count: true
    })

    // if (posts.length === 0) return notFound()
    

    return {
        posts: posts.map((post)=>({
            title: post.title,
            status: post.status,
            views: post?.views,
            language: post.language === "DV" ? 'Dhivehi' : "English",
            "created at": new Date(post.createdAt).toLocaleString(),
            // @ts-ignore
            "created by": `${post.createdBy?.userName}`,
            href: `/sikundi-admin/post/${post.id}/update`,
        })) || [],
        total: Math.ceil((Number(totalPosts._count)/per_page)),
        current: current,
        stats: stats
    }
}
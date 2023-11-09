import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import { notFound } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'

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
            <List getData={posts({params, searchParams})} />
        </Suspense>
    )
}

async function List({getData}: {getData: Promise<{ [name:string]: any }[]>}) {
    const data = await getData

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={JSON.parse(JSON.stringify(data))} />
        </div>
    )
}

const posts = async (query: Props) => {
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            latinTitle: true,
            createdAt: true,
            status: true,
            createdBy: {
                select: {
                    userName: true
                }
            }
        },
        where: {
            OR: query.searchParams?.query ? [
                {
                    title: {
                        contains: query.searchParams?.query
                    }
                },
                {
                    latinTitle: {
                        contains: query.searchParams?.query
                    }
                }
            ] : undefined
        },
        orderBy: {
            id: "asc"
        }
    })

    if (posts.length === 0) return notFound()
    
    return posts.map((post)=>({
        title: post.title,
        latinTitle: post.latinTitle,
        status: post.status,
        "created at": new Date(post.createdAt).toLocaleString(),
        "created by": `${post.createdBy?.userName}`,
        href: `/sikundi-admin/post/${post.id}/update`
    }))
}
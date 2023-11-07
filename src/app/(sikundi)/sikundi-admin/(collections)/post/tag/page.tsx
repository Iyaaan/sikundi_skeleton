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
            <List getData={tags({params, searchParams})} />
        </Suspense>
    )
}

async function List({getData}: {getData: Promise<{ [name:string]: string }[]>}) {
    const data = await getData

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={JSON.parse(JSON.stringify(data))} />
        </div>
    )
}

const tags = async (query: Props) => {
    const tags = await prisma.tag.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true
                }
            }
        },
        where: {
            OR: query.searchParams?.query ? [
                {
                    name: {
                        contains: query.searchParams?.query
                    }
                },
                {
                    slug: {
                        contains: query.searchParams?.query
                    }
                }
            ] : undefined
        },
        orderBy: {
            id: "asc"
        }
    })

    if (tags.length === 0) return notFound()
    
    return tags.map((tag)=>({
        name: tag.name,
        slug: tag.slug,
        "created at": new Date(tag.createdAt).toLocaleString(),
        "created by": `${tag.createdBy?.userName}`,
        href: `/sikundi-admin/post/tag/${tag.id}/update`
    }))
}
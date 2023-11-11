import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import NotFound from './not-found'
import Paginator from '@sikundi/app/(sikundi)/_components/Paginator'

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
            <List getData={tags({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {[name:string]: string}}) {
    const data = await getData
    if(data?.tags?.length === 0 || data?.tags === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.tags} />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/post/tag'
            />}
        </div>
    )
}

const tags = async (query: Props) => {
    const current = query?.searchParams?.page || 1
    const per_page = 12
    const filters = {
        OR: query.searchParams?.query ? [
            {
                name: {
                    contains: query.searchParams?.query,
                    mode: "insensitive"
                }
            },
            {
                slug: {
                    contains: query.searchParams?.query,
                    mode: "insensitive"
                }
            }
        ] : undefined
    }

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
        // @ts-ignore
        where: filters,
        orderBy: {
            id: "asc"
        },
        take: per_page,
        skip: Number(current)-1 < 0 ? 0 : (Number(current)-1)*per_page
    })

    const totalTags = await prisma.tag.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })

    // if (tags.length === 0) return notFound()
    return {
        tags: tags.map((tag)=>({
            name: tag.name,
            slug: tag.slug,
            "created at": new Date(tag.createdAt).toLocaleString(),
            // @ts-ignore
            "created by": `${tag.createdBy?.userName}`,
            href: `/sikundi-admin/post/tag/${tag.id}/update`
        })) || [],
        total: Math.ceil((Number(totalTags._count)/per_page)),
        current: current
    }
}
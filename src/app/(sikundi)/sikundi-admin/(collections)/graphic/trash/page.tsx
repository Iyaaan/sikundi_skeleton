import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import NotFound from '../not-found'
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
            <List getData={graphics({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {  [name:string]: any  }}) {
    const data = await getData
    if(data.graphics.length === 0 || data.graphics === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.graphics} />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/graphic'
            />}
        </div>
    )
}

const graphics = async (query: Props) => {
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
                status: "soft_deleted"
            }
        ]
    }
    const graphics = await prisma.graphic.findMany({
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

    const totalGraphics = await prisma.graphic.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })
    // if (graphics.length === 0) return notFound()
    

    return {
        graphics: graphics.map((graphic)=>({
            title: graphic.title,
            status: graphic.status,
            language: graphic.language === "DV" ? 'Dhivehi' : "English",
            "created at": new Date(graphic.createdAt).toLocaleString(),
            // @ts-ignore
            "created by": `${graphic.createdBy?.userName}`,
            href: `/sikundi-admin/graphic/${graphic.id}/update`
        })) || [],
        total: Math.ceil((Number(totalGraphics._count)/per_page)),
        current: current
    }
}
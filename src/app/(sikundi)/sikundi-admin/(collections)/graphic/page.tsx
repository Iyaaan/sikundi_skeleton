import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import NotFound from './not-found'
import Paginator from '@sikundi/app/(sikundi)/_components/Paginator'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import getPermission from '@sikundi/lib/server/utils/getPermission'
import { redirect } from 'next/navigation'

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
            <List getData={Graphics({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {  [name:string]: any  }}) {
    const permission = await getPermission({
        graphic: [
            "view",
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!permission.graphic.view) {
        return redirect('/sikundi-admin')
    }
    const data = await getData
    if(data.graphics.length === 0 || data.graphics === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.graphics} edit={
                permission?.graphic?.draft || 
                permission?.graphic?.delete || 
                permission?.graphic?.soft_delete || 
                permission?.graphic?.publish || 
                permission?.graphic?.pending
            } />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/graphic'
            />}
        </div>
    )
}

async function Graphics(query: Props)  {
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
            createdAt: "desc"
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
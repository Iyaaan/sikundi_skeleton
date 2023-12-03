import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import NotFound from './not-found'
import Paginator from '@sikundi/app/(sikundi)/_components/Paginator'
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
            <List getData={categories({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {[name:string]: string}}) {
    const permission = await getPermission({
        category: [
            "view",
            "delete",
            "create",
            "update"
        ]
    })
    if(!permission?.category?.view) {
        return redirect('/sikundi-admin')
    }

    const data = await getData
    if(data?.categories.length === 0 || data?.categories === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.categories} edit={
                permission?.category?.delete || 
                permission?.category?.create || 
                permission?.category?.update
            } />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/post/category'
            />}
        </div>
    )
}

const categories = async (query: Props) => {
    const current = query?.searchParams?.page || 1
    const per_page = 12
    const filters = {
        AND: [
            {
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
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
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

    const totalCategories = await prisma.category.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })


    // if (categories.length === 0) return notFound()
    
    return {
        categories: categories.map((category)=>({
            name: category.name,
            language: category.language === "DV" ? "Dhivehi" : "English",
            "created at": new Date(category.createdAt).toLocaleString(),
            // @ts-ignore
            "created by": `${category.createdBy?.userName}`,
            href: `/sikundi-admin/post/category/${category.id}/update`
        })) || [],
        total: Math.ceil((Number(totalCategories._count)/per_page)),
        current: current
    }
}
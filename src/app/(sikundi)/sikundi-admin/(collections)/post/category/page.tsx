import React, { Suspense } from 'react'
import Loading from './loading'
import DataTable from '@sikundi/app/(sikundi)/sikundi-admin/_components/DataTable'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import NotFound from './not-found'

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
            <List getData={categories({params, searchParams})} />
        </Suspense>
    )
}

async function List({getData}: {getData: Promise<{ [name:string]: string }[]>}) {
    const data = await getData
    if(data.length === 0 || data === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={JSON.parse(JSON.stringify(data))} />
        </div>
    )
}

const categories = async (query: Props) => {
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
        where: {
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
        orderBy: {
            id: "asc"
        }
    })


    // if (categories.length === 0) return notFound()
    
    return categories.map((category)=>({
        name: category.name,
        language: category.language === "DV" ? "Dhivehi" : "English",
        "created at": new Date(category.createdAt).toLocaleString(),
        "created by": `${category.createdBy?.userName}`,
        href: `/sikundi-admin/post/category/${category.id}/update`
    })) || []
}
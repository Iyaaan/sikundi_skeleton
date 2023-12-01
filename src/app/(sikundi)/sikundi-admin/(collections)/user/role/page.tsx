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
            <List getData={roles({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {  [name:string]: any  }}) {
    const data = await getData
    if(data.users.length === 0 || data.users === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.users} />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/user'
            />}
        </div>
    )
}

const roles = async (query: Props) => {
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
                        },
                    }
                ] : undefined
            },
            {
                createdBy: query.searchParams?.createdBy ? {
                    userName: query.searchParams?.createdBy
                } : undefined
            }
        ]
    }


    const roles = await prisma.role.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            _count: {
                select: {
                    users: true
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


    const totalRoles = await prisma.role.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })

    // if (users.length === 0) return notFound()
    

    return {
        users: roles.map((role)=>({
            "name": role.name,
            "created at": new Date(role.createdAt).toLocaleString(),
            // @ts-ignore
            "users": role._count.users,
            // @ts-ignore
            href: `/sikundi-admin/user/role/${role.id}/update`
        })) || [],
        total: Math.ceil((Number(totalRoles._count)/per_page)),
        current: current
    }
}
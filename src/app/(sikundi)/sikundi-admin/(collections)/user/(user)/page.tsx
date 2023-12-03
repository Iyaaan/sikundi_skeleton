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
            <List getData={users({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {  [name:string]: any  }}) {
    const permission = await getPermission({
        user: [
            "view",
            "block",
            "create",
            "update"
        ]
    })
    if(!permission?.user?.view) {
        return redirect('/sikundi-admin')
    }

    const data = await getData
    if(data.users.length === 0 || data.users === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.users} edit={
                permission?.user?.block || 
                permission?.user?.create || 
                permission?.user?.update
            } />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/user'
            />}
        </div>
    )
}

const users = async (query: Props) => {
    const current = query?.searchParams?.page || 1
    const per_page = 12
    const filters = {
        AND: [
            {
                OR: query.searchParams?.query ? [
                    {
                        email: {
                            contains: query.searchParams?.query,
                            mode: "insensitive"
                        },
                    },
                    {
                        userName: {
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
                ] : undefined
            }
        ]
    }


    const users = await prisma.user.findMany({
        select: {
            id: true,
            userName: true,
            email: true,
            createdAt: true,
            status: true
        },
        // @ts-ignore
        where: filters,
        orderBy: {
            id: "asc"
        },
        take: per_page,
        skip: Number(current)-1 < 0 ? 0 : (Number(current)-1)*per_page
    })


    const totalUsers = await prisma.user.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })

    // if (users.length === 0) return notFound()
    

    return {
        users: users.map((user)=>({
            userName: user.userName,
            email: user.email,
            status: user.status,
            "created at": new Date(user.createdAt).toLocaleString(),
            // @ts-ignore
            href: `/sikundi-admin/user/${user.id}/update`
        })) || [],
        total: Math.ceil((Number(totalUsers._count)/per_page)),
        current: current
    }
}
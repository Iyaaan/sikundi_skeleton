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
            <List getData={AdBanners({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {  [name:string]: any  }}) {
    const permission = await getPermission({
        adBanner: [
            "view",
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!permission?.adBanner?.view) {
        return redirect('/sikundi-admin')
    }
    
    const data = await getData
    if(data.adBanner.length === 0 || data.adBanner === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <DataTable data={data.adBanner} edit={
                permission?.adBanner?.draft || 
                permission?.adBanner?.delete || 
                permission?.adBanner?.soft_delete || 
                permission?.adBanner?.publish || 
                permission?.adBanner?.pending
            } />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                searchParams={searchParams}
                url='/sikundi-admin/ad-banner'
            />}
        </div>
    )
}

async function AdBanners(query: Props)  {
    const current = query?.searchParams?.page || 1
    const per_page = 12
    const filters = {
        AND: [
            {
                OR: query.searchParams?.query ? [
                    {
                        altTxt: {
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

    const adBanner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            createdAt: true,
            adType: true,
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

    const totalAdBanner = await prisma.adBanner.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })

    // if (graphics.length === 0) return notFound()
    

    return {
        adBanner: adBanner.map((ad)=>({
            'alt text': ad.altTxt,
            status: ad.status,
            type: ad.adType,
            language: ad.language === "DV" ? 'Dhivehi' : "English",
            "created at": new Date(ad.createdAt).toLocaleString(),
            // @ts-ignore
            "created by": `${ad.createdBy?.userName}`,
            href: `/sikundi-admin/ad-banner/${ad.id}/update`
        })) || [],
        total: Math.ceil((Number(totalAdBanner._count)/per_page)),
        current: current
    }
}
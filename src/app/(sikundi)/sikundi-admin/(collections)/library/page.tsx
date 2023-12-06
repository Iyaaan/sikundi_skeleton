import React, { Suspense } from 'react'
import Loading from './loading'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import NotFound from './not-found'
import Paginator from '@sikundi/app/(sikundi)/_components/Paginator'
import MediaGrid from '../../_components/MediaGrid'
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
            <List getData={medias({params, searchParams})} searchParams={searchParams} />
        </Suspense>
    )
}

async function List({getData, searchParams}: {getData: Promise<{ [name:string]: any }>, searchParams: {[name:string]: string}}) {
    const permission = await getPermission({
        library: [
            "view",
            "delete",
            "create"
        ]
    })
    if(!permission?.library?.view) {
        return redirect('/sikundi-admin')
    }

    const data = await getData
    if(data?.medias.length === 0 || data?.medias === null) {
        return <NotFound />
    }

    return (
        <div className='relative overflow-x-auto max-w-[calc(100vw-16px-16px)]'>
            <MediaGrid data={data?.medias || []} permission={{
                delete: permission?.library?.delete
            }} />
            {parseInt(data.total) > 1 && <Paginator
                current={parseInt(data.current)}
                total={parseInt(data.total)}
                className='mt-4'
                searchParams={searchParams}
                url='/sikundi-admin/library'
            />}
        </div>
    )
}

const medias = async (query: Props) => {
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
                mediasTags: {
                    some: {
                        tag: {
                            name: {
                                contains: query.searchParams?.query
                            }
                        }
                    }
                }
            },
            {
                mediasTags: {
                    some: {
                        tag: {
                            slug: {
                                contains: query.searchParams?.query
                            }
                        }
                    }
                }
            },
        ] : undefined
    }
    const medias = await prisma.media.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            caption: true,
            url: true,
            createdBy: {
                select: {
                    userName: true
                }
            },
            mediasTags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
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

    const totalMedias = await prisma.media.aggregate({
        _count: true,
        // @ts-ignore
        where: filters
    })


    // if (medias.length === 0) return notFound()
    
    return {
        medias: medias.map((media)=>({
            name: media.name,
            caption: media.caption,
            url: media.url,
            "created at": new Date(media.createdAt).toLocaleString(),
            // @ts-ignore
            "created by": `${media.createdBy?.userName}`,
            // @ts-ignore
            tags: media.mediasTags
        })) || [],
        total: Math.ceil((Number(totalMedias._count)/per_page)),
        current: current
    }
}
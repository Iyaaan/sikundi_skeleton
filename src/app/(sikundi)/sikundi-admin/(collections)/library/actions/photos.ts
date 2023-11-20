"use server"

import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function photos(search:string, page:number) {
    return (await ErrorHandler(null, null, async () => {
        const current = page || 1
        const per_page = 12
        const filters = {
            OR: search?.length > 0 ? [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    mediasTags: {
                        some: {
                            tag: {
                                name: {
                                    contains: search
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
                                    contains: search
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
                url: true,
                name: true,
                caption: true
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

        return {
            data: {
                medias: medias.map((media)=>({
                    id: media.id,
                    url: media.url,
                    caption: media.caption
                })) || [],
                total: Math.ceil((Number(totalMedias._count)/per_page)),
                current: current
            }
        }
    }))
}
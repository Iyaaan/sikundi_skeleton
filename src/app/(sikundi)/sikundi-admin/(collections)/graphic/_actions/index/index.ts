import {prisma} from '@sikundi/lib/server/utils/prisma'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }
}

export default async function (query: Props) {
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
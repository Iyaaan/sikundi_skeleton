export const dynamic = "force-dynamic"

import { NextResponse, type NextRequest } from 'next/server'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function GET(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, null, async () => {
        const categories = await prisma.category.findMany({
            select: {
                name: true,
                slug: true
            },
            where: {
                OR: [
                    {
                        name: {
                            contains: String(request.nextUrl.searchParams.get("query")),
                            mode: "insensitive"
                        }
                    },
                    {
                        slug: {
                            contains: String(request.nextUrl.searchParams.get("query")),
                            mode: "insensitive"
                        }
                    }
                ]
            },
            take: 5
        })
        return NextResponse.json({
            data: categories.map((category) => ({
                label: category.name,
                value: category.slug
            }))
        })
    }))
}
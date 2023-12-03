export const dynamic = "force-dynamic"

import { NextResponse, type NextRequest } from 'next/server'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function GET(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, null, async () => {
        const roles = await prisma.role.findMany({
            select: {
                name: true
            },
            where: {
                OR: [
                    {
                        name: {
                            contains: String(request.nextUrl.searchParams.get("query")),
                            mode: "insensitive"
                        }
                    }
                ]
            },
            take: 5
        })
        return NextResponse.json({
            data: roles.map((role) => ({
                label: role.name,
                value: role.name
            }))
        })
    }))
}
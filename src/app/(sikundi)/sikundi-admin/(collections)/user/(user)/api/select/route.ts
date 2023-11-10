export const dynamic = "force-dynamic"

import { NextResponse, type NextRequest } from 'next/server'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function GET(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, null, async () => {
        const users = await prisma.user.findMany({
            select: {
                userName: true
            },
            where: {
                OR: [
                    {
                        userName: {
                            contains: String(request.nextUrl.searchParams.get("query"))
                        }
                    },
                    {
                        email: {
                            contains: String(request.nextUrl.searchParams.get("query"))
                        }
                    }
                ]
            },
            take: 5
        })
        return NextResponse.json({
            data: users.map((user) => ({
                label: user.userName,
                value: user.userName
            }))
        })
    }))
}
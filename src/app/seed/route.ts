import { NextResponse, type NextRequest } from 'next/server'
import seed from '@sikundi/seeders'

export async function POST(request: NextRequest) {
    if (process.env.NODE_ENV === "development") {
        await Promise.all([seed])
        return new NextResponse("seeded!!", {
            status: 200
        })
    } else {
        return new NextResponse("Environment should be in development to seed", {
            status: 500
        })
    }
}
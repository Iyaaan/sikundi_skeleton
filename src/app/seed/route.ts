import { NextResponse, type NextRequest } from 'next/server'
import seed from '@sikundi/seeders'

export async function GET(request: NextRequest) {
    await Promise.all([seed()])
    return new NextResponse("seeded!!", {
        status: 200
    })
}
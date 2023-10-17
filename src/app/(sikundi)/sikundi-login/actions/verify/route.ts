import { NextResponse, type NextRequest  } from 'next/server'
import verificationSchema from './schema'

export async function POST(request: NextRequest) {
    try {
        const data = await verificationSchema.safeParseAsync(await request.json())
        if (!data.success) return NextResponse.json({ 
            error: 'Validation Error',
            details: data.error
        }, { status: 403 })

        return NextResponse.json(data.data, { status: 200 })
    } catch (e) {
        return NextResponse.json({ 
            error: 'Internal Server Error',
            details: e
        }, { status: 500 })
    }
}
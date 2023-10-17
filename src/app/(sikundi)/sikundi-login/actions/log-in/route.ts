import * as z from 'zod'
import { NextResponse, type NextRequest } from 'next/server'

export const LogInSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})

export async function POST(request: NextRequest) {
    try {
        const data = await LogInSchema.safeParseAsync(await request.json())
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

export type LogInSchemaType = z.infer<typeof LogInSchema>
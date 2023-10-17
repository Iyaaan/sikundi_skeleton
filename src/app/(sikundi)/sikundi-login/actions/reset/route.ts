import { NextResponse, type NextRequest } from 'next/server'
import * as z from 'zod'

export const resetSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email')
})
export async function reset(request: NextRequest) {
    try {
        const data = await resetSchema.safeParseAsync(await request.json())
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
export type resetSchemaType = z.infer<typeof resetSchema>
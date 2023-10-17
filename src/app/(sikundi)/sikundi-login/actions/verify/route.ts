import { NextResponse, type NextRequest  } from 'next/server'
import * as z from 'zod'

export const verificationSchema = z.object({
    otp: z.string().min(1, 'Otp is required').min(4, 'Otp must have than 4 characters')
})
export async function verify(request: NextRequest) {
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
export type verificationSchemaType = z.infer<typeof verificationSchema>
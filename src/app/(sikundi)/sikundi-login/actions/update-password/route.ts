import { NextResponse, type NextRequest  } from 'next/server'
import * as z from 'zod'

export const updatePasswordSchema = z.object({
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
    confirm_password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters')
})
export async function updatePassword(request: NextRequest) {
    try {
        const data = await updatePasswordSchema.safeParseAsync(await request.json())
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
export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>
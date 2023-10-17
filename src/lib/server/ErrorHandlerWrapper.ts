import { NextResponse, type NextRequest } from 'next/server'
import { ZodSchema } from 'zod'

export default async function ErrorHandlerWrapper(request: NextRequest, schema: ZodSchema<any>, responseCallback: (data: any) => Promise<NextResponse>) {
    try {
        const data = await schema.safeParseAsync(await request.json())
        if (!data.success) {
            return NextResponse.json({ 
                error: 'Validation Error',
                details: data.error
            }, { status: 403 })
        }
    
        return await responseCallback(data.data)
    } catch (e) {
        return NextResponse.json({ 
            error: 'Internal Server Error',
            details: e
        }, { status: 500 })
    }
}
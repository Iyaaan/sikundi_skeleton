import { NextResponse, type NextRequest } from 'next/server'
import { ZodSchema } from 'zod'

export default async function ErrorHandlerWrapper(request: NextRequest, schema: ZodSchema<any>, responseCallback: (data: any) => Promise<NextResponse>) {
    try {
        const data = await schema.safeParseAsync(await request.json())
        if (!data.success) {
            return NextResponse.json({ 
                error: {
                    name: 'Validation Error',
                    details: data.error
                },
                notification: {
                    title: 'Validation Error',
                    description: 'Your submitted inputs are not valid'
                }
            }, { status: 403 })
        }
    
        return await responseCallback(data.data)
    } catch (e:any) {
        return NextResponse.json({ 
            error: {
                name: "Server Error",
                detail: e
            },
            notification: e?.notification || {
                title: 'Internal Server Error',
                description: 'An unidentified error has occured. please contact your sys-admin'
            }
        }, { status: 500 })
    }
}
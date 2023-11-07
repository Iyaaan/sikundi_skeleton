import { NextResponse, type NextRequest } from 'next/server'
import { ZodSchema } from 'zod'

export default async function ErrorHandlerWrapper(request: NextRequest, schema: ZodSchema<any> | null, responseCallback: (data?: any) => Promise<NextResponse>) {
    try {
        if (schema !== null) {
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
        }
        return await responseCallback()
    } catch (e:any) {
        if (e?.name === "PrismaClientKnownRequestError" && e?.code === "P2002") {
            return NextResponse.json({ 
                error: {
                    name: "Validation Error",
                    details: {
                        "issues": e?.meta?.target?.map((e:string) => ({
                            "code": "custom",
                            "type": "string",
                            "inclusive": true,
                            "exact": false,
                            "message": `${JSON.stringify(e).replaceAll(`"`, "")} must be unique`,
                            "path": [
                                `${JSON.stringify(e).replaceAll(`"`, "")}`
                            ]
                        })),
                        "name": "ZodError"
                    }
                },
                notification: e?.notification || {
                    title: 'Validation Error',
                    description: `${e?.meta?.target?.[0]} must be unique`
                }
            }, { status: 422 })
        }
        return NextResponse.json({ 
            error: {
                name: "Server Error",
                detail: e
            },
            notification: e?.notification || {
                title: 'Internal Server Error',
                description: 'An unidentified error has occured. please contact your sys-admin'
            }
        }, { status: e?.statusCode || 500 })
    }
}
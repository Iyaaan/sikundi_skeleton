import { ZodSchema } from 'zod'

export type response<T> = {
    data?: T;
    error?: {
        name: string;
        details: unknown;
    };
    notification?: {
        title: string;
        description?: string;
    }
}

export default async function ErrorHandler<INPUT, OUTPUT>(inputs: INPUT, schema: ZodSchema<INPUT> | null, responseCallback: (data: INPUT) => Promise<response<OUTPUT>>) {
    try {
        if (schema !== null) {
            const data = await schema.safeParseAsync(inputs)
            if (!data.success) {
                return({ 
                    error: {
                        name: 'Validation Error',
                        details: data.error
                    },
                    notification: {
                        title: 'Validation Error',
                        description: 'Your submitted inputs are not valid'
                    }
                })
            }
    
            return await responseCallback(data.data)
        }
        return await responseCallback(inputs)
    } catch (e:any) {
        if (e?.name === "PrismaClientKnownRequestError" && e?.code === "P2002") {
            return({ 
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
            })
        }
        return ({ 
            error: {
                name: "Server Error",
                detail: e
            },
            notification: e?.notification || {
                title: 'Internal Server Error',
                description: 'An unidentified error has occured. please contact your sys-admin'
            }
        })
    }
}
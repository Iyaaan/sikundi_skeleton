import { ZodSchema } from 'zod'

export type customResponse<T> = {
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

export default async function ErrorHandler<INPUT, OUTPUT>(inputs: INPUT, schema: ZodSchema<INPUT> | null, responseCallback: (data: INPUT) => Promise<customResponse<OUTPUT>>) {
    try {
        if (schema !== null) {
            const data = await schema.safeParseAsync(inputs)
            if (!data.success) {
                return({
                    data: null,
                    error: {
                        name: 'Validation Error',
                        details: data.error
                    },
                    notification: {
                        title: 'Validation Error',
                        description: 'Your submitted inputs are not valid',
                        variant: "destructive"
                    }
                })
            }
    
            return await responseCallback(data.data)
        }
        return await responseCallback(inputs)
    } catch (e:any) {
        console.error(e)
        if (e?.name === "PrismaClientKnownRequestError" && e?.code === "P2002") {
            return({ 
                data: null,
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
                    description: `${e?.meta?.target?.[0]} must be unique`,
                    variant: "destructive"
                }
            })
        }
        return ({ 
            data: null,
            error: {
                name: "Server Error",
                details: e
            },
            notification: e?.notification || {
                title: 'Internal Server Error',
                description: 'An unidentified error has occured. please contact your sys-admin',
                variant: "destructive"
            }
        })
    }
}
import { NextResponse, type NextRequest } from 'next/server'
import TagSchema, { TagSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, TagSchema, async (data:TagSchemaType) => {
        return NextResponse.json({
            data: data
        })
        throw {
            notification: {
                title: "password incorrect",
                description: `Please try again with the corrent password. if you forgot, please reset your password.`
            },
            statusCode: 401
        }
    }))
}
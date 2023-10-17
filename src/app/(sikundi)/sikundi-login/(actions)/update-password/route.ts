import { NextResponse, type NextRequest } from 'next/server'
import updatePasswordSchema, { updatePasswordSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/ErrorHandlerWrapper'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, updatePasswordSchema, async (data:updatePasswordSchemaType) => {
        throw "wrong user";
    }))
}
import { NextResponse, type NextRequest } from 'next/server'
import LogInSchema, { LogInSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/ErrorHandlerWrapper'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, LogInSchema, async (data:LogInSchemaType) => {
        throw "wrong user";
    }))
}
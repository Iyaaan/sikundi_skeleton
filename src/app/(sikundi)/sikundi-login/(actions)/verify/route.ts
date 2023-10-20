import { NextResponse, type NextRequest } from 'next/server'
import verificationSchema, { verificationSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, verificationSchema, async (data:verificationSchemaType) => {
        throw "wrong user";
    }))
}
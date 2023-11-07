import { type NextRequest } from 'next/server'
import resetSchema, { resetSchemaType } from './schema'
import ErrorHandlerWrapper from '@sikundi/lib/server/utils/ErrorHandlerWrapper'

export async function POST(request: NextRequest) {
    return (await ErrorHandlerWrapper(request, resetSchema, async (data:resetSchemaType) => {
        throw "wrong user";
    }))
}
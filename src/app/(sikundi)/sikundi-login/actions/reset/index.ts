"use server"

import resetSchema, { resetSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler';

export async function POST(data: resetSchemaType) {
    return (await ErrorHandler<resetSchemaType, {}>(data, resetSchema, async (data:resetSchemaType) => {
        throw "wrong user";
    }))
}
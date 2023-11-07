import updatePasswordSchema, { updatePasswordSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler';

export async function POST(request: updatePasswordSchemaType) {
    return (await ErrorHandler<updatePasswordSchemaType, {}>(request, updatePasswordSchema, async (data:updatePasswordSchemaType) => {
        throw "wrong user";
    }))
}
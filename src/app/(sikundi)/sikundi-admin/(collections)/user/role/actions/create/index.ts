"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import UserSchema, { UserSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: UserSchemaType) {
    return (await ErrorHandler(data, UserSchema, async (data:UserSchemaType) => {
        const usr = await getUser()
        
        throw({})
    }))
}
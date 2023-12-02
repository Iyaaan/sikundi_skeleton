"use server"

import getUser from '@sikundi/lib/server/utils/getUser'
import RoleSchema, { RoleSchemaType } from './schema'
import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import { revalidatePath } from 'next/cache'

export default async function POST(data: RoleSchemaType) {
    return (await ErrorHandler(data, RoleSchema, async (data:RoleSchemaType) => {
        const usr = await getUser()
        
        throw({})
    }))
}
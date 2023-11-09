"use server"

import ErrorHandler from '@sikundi/lib/server/utils/ErrorHandler'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function photos(search?:string, page?:number) {
    return (await ErrorHandler<null, {
        id: number;
        url: string;
    }[]>(null, null, async () => {
        const photos = await prisma.media.findMany({
            select: {
                url: true,
                id: true
            }
        })
        return {
            data: photos
        }
    }))
}
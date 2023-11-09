"use server"

import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function photos(search?:string, page?:number) {
    const photos = await prisma.media.findMany({
        select: {
            url: true,
            id: true
        }
    })
    return photos
}
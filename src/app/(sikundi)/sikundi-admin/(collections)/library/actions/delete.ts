'use server'

import { promises as fs } from "fs"
import { prisma } from "@sikundi/lib/server/utils/prisma"
import { revalidatePath } from "next/cache"
 
export async function deleteLibrary(fileNames:string[]) {
    try {
        await Promise.all(fileNames.map(async (name) => {
            await prisma.media.delete({
                where: {
                    url: name
                }
            })
            await fs.unlink(name.replace("/sikundi-content/", "storage/"))
        }))
        revalidatePath('/sikundi-admin/library')
        return {
            notification: {
                title: "Files Deleted",
                description: `Files Deleted successfully`,
            }
        }
    } catch (error) {
        return {
            notification: {
                title: "File Deletion failed",
                description: `File Deletion failed`,
                variant: "destructive"
            }
        }
    }
}
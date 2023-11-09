'use server'

import { File } from "buffer"
import { promises as fs } from "fs"
import { v4 as uuidv4 } from 'uuid'
import { prisma } from "@sikundi/lib/server/utils/prisma"
 
export async function uploadToLibrary(formData:FormData) {
    let files:any = {}
    const folder = formData.get("folder") || "hehe"
    formData.forEach((value, key) => {
        if (key !== "folder") {
            if(value instanceof File) {
                files[key] = {
                    ...files[key],
                    file: value
                }
            } else {
                files[`${key.replace("_data", "")}`] = {
                    ...files[key.replace("_data", "")],
                    data: JSON.parse(`${value}`)
                }
            }
        }
    })
    let output:any = []
    await Promise.all(Object.values(files).map(async (file) => {
        // @ts-ignore
        const fileBuffer = Buffer.from(await file.file.arrayBuffer());
        // @ts-ignore
        const fileName = `${uuidv4()}_${Date.now()}.${file.file.name.split(".").reverse()[0]}`
        await fs.writeFile(`./storage/` + fileName, fileBuffer)
        
    }))
    return {success: true}
}
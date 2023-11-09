'use server'

import { File } from "buffer"
import { promises as fs } from "fs"
import { v4 as uuidv4 } from 'uuid'
import { prisma } from "@sikundi/lib/server/utils/prisma"
import getUser from "@sikundi/lib/server/utils/getUser"
import { ThaanaLatin } from "@sikundi/lib/transliterate"
 
export async function uploadToLibrary(formData:FormData) {
    try {
        const user = await getUser()
        let files:any = {}
        const folder = formData.get("folder")?.toString() || "photos"
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
            let tags:any = []
            try {
                // @ts-ignore
                if(file?.data?.tags?.length > 0) {
                    // @ts-ignore
                    for (let index = 0; index < file?.data?.tags?.length; index++) {
                        // @ts-ignore
                        const name = file?.data?.tags[index].label
                        tags.push(await prisma.tag.upsert({
                            update: {
                                name: name,
                                slug: ThaanaLatin(name),
                                createdBy: {
                                    connect: {
                                        email: user?.payload.email
                                    }
                                }
                            },
                            create: {
                                name: name,
                                slug: ThaanaLatin(name),
                                createdBy: {
                                    connect: {
                                        email: user?.payload.email
                                    }
                                }
                            },
                            where: {
                                slug: ThaanaLatin(name)
                            }
                        }))
                    }
                }
            } catch (error) {
                
            }
            // @ts-ignore
            const fileBuffer = Buffer.from(await file.file.arrayBuffer());
            // @ts-ignore
            const fileName = `${uuidv4()}_${Date.now()}.${file.file.name.split(".").reverse()[0]}`
            await fs.writeFile(`./storage/` + fileName, fileBuffer)
            const media = await prisma.media.create({
                data: {
                    createdBy: {
                        connect: {
                            email: user?.payload.email
                        }
                    },
                    url: `/sikundi-content/${fileName}`,
                    // @ts-ignore
                    name: file.data.name,
                    libraryGroup: {
                        connectOrCreate: {
                            create: {
                                name: folder,
                                description: "This is for photos",
                            },
                            where: {
                                name: folder
                            }
                        }
                    }
                }
            })
            try {
                if(tags.length > 0) {
                    const tagsMedia = await prisma.mediasTags.createMany({
                        data: tags.map((tag:any) => ({
                            mediaId: media.id,
                            tagId: tag.id
                        }))
                    })
                }
            } catch (error) {
                
            }
            output.push(media)
        }))
        return {
            files: output,
            notification: {
                title: "Files uploaded",
                description: `Files you attached are successfully uploaded`,
            }
        }
    } catch (error) {
        return {
            notification: {
                title: "Upload failed",
                description: `file upload filed`,
                variant: "destructive"
            }
        }
    }
}
'use server'

import { File } from "buffer"
import { promises as fs } from "fs"
import { prisma } from "@sikundi/lib/server/utils/prisma"
import getUser from "@sikundi/lib/server/utils/getUser"
import { ThaanaLatin } from "@sikundi/lib/transliterate"
import { revalidatePath } from "next/cache"
import path from "path"
 
export async function uploadToLibrary(formData:FormData) {
    try {
        const user = await getUser()
        let files:any = {}
        const folder = formData.get("folder")?.toString() || "uploads"
        const directoryPath = `./storage/${folder}/${new Date().getFullYear()}/${new Date().getMonth()+1}`

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

            
            try {
                await fs.access(directoryPath)
            } catch (error) {
                await fs.mkdir(directoryPath, { recursive: true })
            }

            // @ts-ignore
            const fileBuffer = Buffer.from(await file.file.arrayBuffer());
            // @ts-ignore
            const fileName = await getUniqueName(file.file.name, directoryPath)
            console.log(fileName)
            await fs.writeFile(String(fileName), fileBuffer)
            const media = await prisma.media.create({
                data: {
                    createdBy: {
                        connect: {
                            email: user?.payload.email
                        }
                    },
                    url: fileName.replace("./storage", "/sikundi-content"),
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
                    await prisma.mediasTags.createMany({
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
        revalidatePath('/sikundi-admin/library')
        return {
            files: output,
            notification: {
                title: "Files uploaded",
                description: `Files you attached are successfully uploaded`,
            }
        }
    } catch (error) {
        // console.error(error, "error")
        return {
            notification: {
                title: "Upload failed",
                description: `file upload filed`,
                variant: "destructive"
            }
        }
    }
}


async function getUniqueName(fileName:string, directory:string):Promise<String> {
    return new Promise(async (resolve, reject) => {
        let index = 1;
        let newFileName = fileName;
      
        while (await fileExists(`${directory}/${newFileName}`)) {
            const ext = path.extname(fileName);
            const baseName = path.basename(fileName, ext);
        
            newFileName = `${baseName}(${index})${ext}`;
            index++;
        }
        
        resolve(`${directory}/${newFileName}`)
    })
}
  
async function fileExists(fileName:string) {
    try {
        await fs.access(fileName);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
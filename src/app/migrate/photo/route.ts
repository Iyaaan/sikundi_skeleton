import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import filestream, { promises as fs } from "fs"
import axios from 'axios'
import bcrypt from 'bcrypt'
import { ThaanaLatin } from '@sikundi/lib/transliterate'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
    for (let index = 1; index <= Array(140221).length; index++) {
        console.log(`${index} photo created`)
        await prisma.photo.create({
            data: {
                title: "deleted_post",
                status: "soft_deleted"
            }
        })
    }
}

export async function DELETE(request: NextRequest) {
    await prisma.photo.deleteMany({
        where: {
            title: "deleted_post",
            status: "soft_deleted"
        }
    })
    console.log("deleted")
}

export async function PATCH(request: NextRequest) {
    const { id, ...data } = await request.json()

    const photo = await prisma.photo.update({
        data: {
            ...data,
            createdBy: data?.createdBy ? {
                ...data?.createdBy,
                connectOrCreate: {
                    ...data?.createdBy?.connectOrCreate,
                    create: {
                        ...data?.createdBy?.connectOrCreate?.create,
                        password: String(await bcrypt.hash(data?.createdBy?.connectOrCreate?.create.password, 10)),
                        userNameEn: ThaanaLatin(data?.createdBy?.connectOrCreate?.create?.userName)?.split(' ')?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))?.join(' ')
                    },
                    where: {
                        ...data?.createdBy?.connectOrCreate?.where
                    }
                }
            } : undefined,
        },
        where: {
            id: id
        }
    })

    if(data?.featureImage?.connectOrCreate?.create?.url) {
        const directoryPath = data.featureImage.connectOrCreate.create.url?.split("/")?.slice(0, 5)?.join("/")?.replace("/sikundi-content/", "./storage/")
        const url = data.featureImage.connectOrCreate.create.url?.replace("/sikundi-content/", "https://gaafu.mv/wp-content/")
        try {
            await fs.access(directoryPath)
        } catch (error) {
            await fs.mkdir(directoryPath, { recursive: true })
        } finally {
            await downloadImage(url, directoryPath)
        }
    }

    try {
        await Promise?.all(JSON.parse(data?.lead)?.root?.children?.map(async (tag:any) => {
            if(tag?.type === "paragraph") {
                await Promise?.all(tag?.children?.map(async (sub:any)=>{
                    if(sub?.src) {
                        await prisma.media.create({
                            data: {
                                name: sub?.src,
                                url: sub?.src,
                                libraryGroup: {
                                    connectOrCreate: {
                                        create: {
                                            name: "upload",
                                            description: "upload"
                                        },
                                        where: {
                                            name: "upload"
                                        }
                                    }
                                }
                            }
                        })
                        const directoryPath = sub?.src?.split("/")?.slice(0, 5)?.join("/")?.replace("/sikundi-content/", "./storage/")
                        const url = sub?.src?.replace("/sikundi-content/", "https://gaafu.mv/wp-content/")
                        try {
                            await fs.access(directoryPath)
                        } catch (error) {
                            await fs.mkdir(directoryPath, { recursive: true })
                        } finally {
                            await downloadImage(url, directoryPath)
                        }
                    }
                }))
            }
        }))
    } catch (error) {
        
    }

    console.log(photo)
    revalidatePath(`/${photo.language.toLowerCase()}/gaafu-gallery/${photo.id}`)
    revalidatePath(`/${photo.language.toLowerCase()}`)

    return NextResponse.json({seed: true}, {
        status: 200
    })
}


async function downloadImage(url:string, directoryPath:string) {
    try {
        const response = await axios({
            method: 'GET',
            url,
            responseType: 'stream'  
        });
        const writer = filestream.createWriteStream(`${directoryPath}/${url.split('/')[url.split('/').length - 1]}`);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (err) {
        console.log(err);
    }
}
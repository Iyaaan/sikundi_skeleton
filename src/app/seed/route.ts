import { NextResponse, type NextRequest } from 'next/server'
import seed from '@sikundi/seeders'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import filestream, { promises as fs } from "fs"
import axios from 'axios'

export async function GET(request: NextRequest) {
    // if (process.env.NODE_ENV === "development") {
    //     await Promise.all([seed()])
    //     return new NextResponse("seeded!!", {
    //         status: 200
    //     })
    // } else {
    //     return new NextResponse("Environment should be in development to seed", {
    //         status: 500
    //     })
    // }
    await Promise.all([seed()])
    return new NextResponse("seeded!!", {
        status: 200
    })
}

export async function POST(request: NextRequest) {
    const data = await request.json()

    let tags:any = []

    if (data?.postsTags) {
        await Promise.all(data?.postsTags?.map(async (tag:any) => {
            tags.push(await prisma.tag.upsert({
                create: {
                    name: tag.name,
                    slug: tag.slug
                },
                update: {
                    name: tag.name,
                    slug: tag.slug
                },
                where: {
                    slug: tag.slug
                }
            }))
        }))
    }

    const post = await prisma.post.create({
        data: {
            ...data,
            postsTags: {
                createMany: {
                    data: tags?.map((tag:any) => ({
                        tagId: tag.id
                    }))
                }
            }
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

    console.log(post)
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
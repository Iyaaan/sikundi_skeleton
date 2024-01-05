import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@sikundi/lib/server/utils/prisma'
import filestream, { promises as fs } from "fs"
import axios from 'axios'
import bcrypt from 'bcrypt'
import { ThaanaLatin } from '@sikundi/lib/transliterate'
import { revalidatePath } from 'next/cache'

export async function PATCH(request: NextRequest) {
    const { id, ...data } = await request.json()

    const graphic = await prisma.graphic.update({
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

    if(data?.graphicsUrl?.connectOrCreate?.create?.url) {
        const directoryPath = data.graphicsUrl.connectOrCreate.create.url?.split("/")?.slice(0, 5)?.join("/")?.replace("/sikundi-content/", "./storage/")
        const url = data.graphicsUrl.connectOrCreate.create.url?.replace("/sikundi-content/", "https://gaafu.mv/wp-content/")
        try {
            await fs.access(directoryPath)
        } catch (error) {
            await fs.mkdir(directoryPath, { recursive: true })
        } finally {
            await downloadImage(url, directoryPath)
        }
    }

    console.log(graphic)
    revalidatePath(`/${graphic.language.toLowerCase()}/gaafu-graphics/${graphic.id}`)
    revalidatePath(`/${graphic.language.toLowerCase()}`)

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
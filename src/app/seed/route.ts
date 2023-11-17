import { NextResponse, type NextRequest } from 'next/server'
import seed from '@sikundi/seeders'
import { prisma } from '@sikundi/lib/server/utils/prisma'

export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV === "development") {
        await Promise.all([seed()])
        return new NextResponse("seeded!!", {
            status: 200
        })
    } else {
        return new NextResponse("Environment should be in development to seed", {
            status: 500
        })
    }
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

    console.log(post)
    return NextResponse.json({seed: true}, {
        status: 200
    })
}
import { prisma } from "@sikundi/lib/server/utils/prisma" 
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export const dynamicParams = true
export const revalidate = 3600

interface Props { 
    params: { 
        graphics_slug: string 
    } 
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const graphics_slug = String(params.graphics_slug)
    if(!graphics_slug) {
        return notFound()
    }
    const data = await prisma.graphic.findUnique({
        where: {
            slug: graphics_slug,
            language: "DV",
            status: "published"
        },
        select: {
            latinTitle: true,
            description: true,
            createdBy: {
                select: {
                    userName: true,
                    profilePictureUrl: true
                }
            },
            createdAt: true
        }
    })
    return {
        "title": data?.latinTitle,
        "authors": [
            // @ts-ignore
            {name: data?.createdBy?.userName, url: `/dv/author/${data?.createdBy?.userName}`}
        ],
        "applicationName": String(process.env.NEXT_PUBLIC_APP_NAME),
        "description": data?.description,
        "publisher": String(process.env.NEXT_PUBLIC_APP_NAME),
        "openGraph": {
            "title": String(data?.latinTitle),
            "authors": [
                // @ts-ignore
                {name: data?.createdBy?.userName, url: `/dv/author/${data?.createdBy?.userName}`}
            ],
            "countryName": "maldives",
            "description": String(data?.description),
            "locale": "dv",
            "siteName": String(process.env.NEXT_PUBLIC_APP_NAME)
        }
    }
}

export default async function SinglePage(props: Props) {
    const graphics_slug = decodeURIComponent(String(props.params.graphics_slug))
    if(!graphics_slug) {
        return notFound()
    }

    const { data, relatedGraphics } = await grahicData(graphics_slug)

    return (
        <div className="bg-web-secondary dark:bg-web-secondary-dark w-full min-h-screen">
            <div className="container grid grid-cols-12 lg:gap-x-8 lg:gap-y-4 px-4">
                <div className="lg:col-span-10 col-span-12 lg:col-start-2 lg:pt-8 pt-4">
                    <h1 className='text-center font-black text-6xl text-white mb-10'>
                        {String(data?.longTitle)}
                    </h1>
                    <div className="max-w-lg mx-auto">
                        <div className="w-full overflow-hidden aspect-square bg-web-tertiary dark:bg-web-tertiary-dark rounded-lg relative lg:mb-12 mb-8">
                            {data?.graphicsUrl && <Image
                                fill
                                src={data.graphicsUrl}
                                alt={String(data.longTitle)}
                                className="object-cover"
                            />}
                        </div>
                    </div>
                </div>
                <h4 className='text-center font-black text-3xl text-web-secondary dark:text-web-secondary-dark stroke-text-white lg:col-span-10 col-span-12 lg:col-start-2 mb-4'>
                    {"އިތުރު ގްރެފިކްސް"}
                </h4>
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 lg:col-span-10 col-span-12 lg:col-start-2 mb-12'>
                    {relatedGraphics?.map((post, index) => (
                        <Link href={post.href} className='aspect-square relative' key={index}>
                            {post.featureImage &&
                            <Image fill sizes="75vw" src={post.featureImage} alt={post.title} className='object-cover rounded-xl' />}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

async function grahicData(slug:string) {
    const data = await prisma.graphic.findUnique({
        where: {
            slug: slug,
            language: "DV",
            status: "published"
        },
        select: {
            longTitle: true,
            graphicsUrl: true,
            createdBy: {
                select: {
                    userName: true,
                    profilePictureUrl: true
                }
            },
            createdAt: true,
            description: true
        }
    })
    const relatedGraphics = await prisma.graphic.findMany({
        where: {
            language: "DV",
            status: "published"
        },
        select: {
            id: true,
            graphicsUrl: true,
            title: true,
            description: true,
            createdAt: true,
            slug: true
        },
        take: 4
    })
    return {
        data,
        relatedGraphics: relatedGraphics.map((graphic) => ({
            href: `/dv/gaafu_graphics/${graphic.slug}`,
            title: graphic.title,
            description: graphic.description,
            createdAt: graphic.createdAt,
            featureImage: graphic.graphicsUrl
        }))
    } 
}
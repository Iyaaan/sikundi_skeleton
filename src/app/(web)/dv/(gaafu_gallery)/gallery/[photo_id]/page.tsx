import Feature from "@sikundi/components/web/blocks/Feature"
import { prisma } from "@sikundi/lib/server/utils/prisma" 
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import Block from "@sikundi/components/web/blocks"
import { Fragment } from "react"
import PhotoFeature from "@sikundi/components/web/blocks/PhotoFeature"

export const dynamicParams = true
export const revalidate = 3600

interface Props { 
    params: { 
        photo_id: string 
    } 
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const photo_id = parseInt(params.photo_id)
    if(!photo_id) {
        return notFound()
    }
    const data = await prisma.photo.findUnique({
        where: {
            id: photo_id,
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
    const photo_id = parseInt(props.params.photo_id)
    if(!photo_id) {
        return notFound()
    }

    // @ts-ignore
    const { data } = await photoData(photo_id)

    return (
        <div className="bg-web-secondary dark:bg-web-secondary-dark w-full min-h-screen">
            <div className="container grid grid-cols-12 lg:gap-x-8 lg:gap-y-4 lg:px-4 px-0">
                <div className="lg:col-span-10 col-span-12 lg:col-start-2 lg:pt-8">
                    <PhotoFeature className="pb-12" data={{
                        title: `${data?.longTitle}`,
                        featureImage: data?.featureImageUrl,
                        description: data?.description,
                        published: {
                            by: {
                                // @ts-ignore
                                name: `${data?.createdBy?.userName}`,
                                // @ts-ignore
                                photo: `${data?.createdBy?.profilePictureUrl}`
                            },
                            date: new Date(`${data?.createdAt}`),
                        }
                    }} />
                    <div className="px-6 max-w-3xl mx-auto">
                        {data?.lead && JSON.parse(String(data?.lead))?.root?.children?.map((block:any, index: number) => (
                            <Fragment key={index}>
                                <Block block={block} className={"text-white"} />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function photoData(id:number) {
    return new Promise(async (resolve, reject) => {
        const data = await prisma.photo.findUnique({
            where: {
                id: id,
                language: "DV",
                status: "published"
            },
            select: {
                longTitle: true,
                featureImageUrl: true,
                createdBy: {
                    select: {
                        userName: true,
                        profilePictureUrl: true
                    }
                },
                createdAt: true,
                description: true,
                lead: true
            }
        })

        resolve ({
            data
        })
    })    
}
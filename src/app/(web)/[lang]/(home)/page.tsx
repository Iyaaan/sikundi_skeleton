import { Fragment } from "react";
import LandScapeAd from "@sikundi/components/web/ad/LandScapeAd";
import VarientOne from "@sikundi/components/web/blocks/VarientOne";
import VarientThree from "@sikundi/components/web/blocks/VarientThree";
import VarientTwo from "@sikundi/components/web/blocks/VarientTwo";
import VarientFour from "@sikundi/components/web/blocks/VarientFour";
import dynamicImport from 'next/dynamic'
import { prisma } from "@sikundi/lib/server/utils/prisma";

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = true
export const revalidate = 1000

interface Props { 
    params: { 
        lang: string 
    } 
}


export default async function Home(props: Props) {
    const {
        bodu,
        kuda,
        latestPosts,
        latestPhotos,
        latestReports,
        latestGraphics,
        latestSports,
        latestWorld
        // @ts-ignore
    } = await HomePage(props?.params?.lang)
    const VarientFive  = dynamicImport(() => import("@sikundi/components/web/blocks/VarientFive"), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-secondary dark:bg-web-secondary-dark w-full aspect-video">

                </div>
            )
        }
    })
    
    return (
        <Fragment>
            {(bodu && kuda.length > 0) && 
            // @ts-ignore
            <VarientOne data={[ bodu, ...kuda ]} className="mb-12" />}
            <LandScapeAd href={"https://bankofmaldives.com.mv"} 
                target="_blank"
                containerClass="container px-4 mb-10"
                data={{
                    coverImage: `/sample_media/ZWMyZTExMjNlNTBhZTVlYWQ1NWVkMGFiYTAyNGYzNzY=.png`,
                    alt: "Bank Of Maldives"
                }}
            />
            {(latestPosts?.length > 0) && 
            // @ts-ignore
            <VarientTwo className="mb-12" data={latestPosts} />}
            {(latestPhotos?.length > 0) && 
            // @ts-ignore
            <VarientThree title="ފޮޓޯ ގެލެރީ" className="mb-12" data={latestPhotos} />}
            
            <LandScapeAd href={"https://bankofmaldives.com.mv"} 
                target="_blank"
                containerClass="container px-4 mb-10"
                data={{
                    coverImage: `/sample_media/NzVkNTc1ZmM5MzViZTRiYzMwMDJkYTI2OWIxMjA5OGM=.gif`,
                    alt: "Bank Of Maldives"
                }}
            />
            {(latestReports?.length > 0) && 
            // @ts-ignore
            <VarientFour title="ރިޕޯޓް" className="mb-12" data={latestReports} />}
            {(latestGraphics?.length > 0) && 
            // @ts-ignore
            <VarientFive title="ގްރެފިކްސް" className="mb-12" data={latestGraphics} />}
            {(latestSports?.length > 0) && 
            // @ts-ignore
            <VarientOne title="ކުޅިވަރު" className="mb-12" data={latestSports} />}
            <LandScapeAd href={"https://bankofmaldives.com.mv"} 
                target="_blank"
                containerClass="container px-4 mb-10"
                data={{
                    coverImage: `/sample_media/ZWMyZTExMjNlNTBhZTVlYWQ1NWVkMGFiYTAyNGYzNzY=.png`,
                    alt: "Bank Of Maldives"
                }}
            />
            {(latestWorld?.length > 0) && 
            // @ts-ignore
            <VarientFour title="ދުނިޔެ" className="mb-12" data={latestWorld} />}

        </Fragment>
    )
}

async function HomePage (lang: string) {
    const language = lang.toUpperCase() === "EN" ? "EN" : "DV"
    const bodu = await prisma.post.findFirst({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            description: true,
            createdAt: true
        },
        where: {
            postsTags: {
                some: {
                    OR: [
                        {
                            tag: {
                                slug: "bodu"
                            }
                        },
                        {
                            tag: {
                                slug: "big"
                            }
                        }
                    ]
                }
            },
            status: "published",
            // @ts-ignore
            language: language
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    const kuda = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
        },
        where: {
            postsTags: {
                some: {
                    OR: [
                        {
                            tag: {
                                slug: "kuda"
                            }
                        },
                        {
                            tag: {
                                slug: "small"
                            }
                        }
                    ]
                }
            },
            status: "published",
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })
    const latestPosts = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
        },
        where: {
            status: "published",
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    const latestPhotos = await prisma.photo.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
            description: true
        },
        where: {
            status: "published",
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })

    const latestReports = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
        },
        where: {
            status: "published",
            category: {
                slug: "report"
            },
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    const latestGraphics = await prisma.graphic.findMany({
        select: {
            id: true,
            graphicsUrl: true,
            title: true,
        },
        where: {
            status: "published",
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })

    const latestSports = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
        },
        where: {
            status: "published",
            category: {
                slug: "sport"
            },
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    const latestWorld = await prisma.post.findMany({
        select: {
            id: true,
            featureImageUrl: true,
            title: true,
        },
        where: {
            status: "published",
            category: {
                slug: "world"
            },
            language: language
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    return {
        bodu: {
            href: `/${lang}/${bodu?.id}`,
            title: bodu?.title,
            featureImage: bodu?.featureImageUrl,
            description: bodu?.description,
            createdAt: bodu?.createdAt,
        },
        kuda: kuda?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestPosts: latestPosts?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestPhotos: latestPhotos?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestReports: latestReports?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestGraphics: latestGraphics?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.graphicsUrl,
            description: "",
            createdAt: "",
        })),
        latestSports: latestSports?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestWorld: latestWorld?.map((post) => ({
            href: `/${lang}/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
    }
}
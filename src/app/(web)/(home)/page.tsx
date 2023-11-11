import { Fragment } from "react";
import LandScapeAd from "@sikundi/components/web/ad/LandScapeAd";
import VarientOne from "@sikundi/components/web/blocks/VarientOne";
import VarientThree from "@sikundi/components/web/blocks/VarientThree";
import VarientTwo from "@sikundi/components/web/blocks/VarientTwo";
import VarientFour from "@sikundi/components/web/blocks/VarientFour";
import VarientFive from "@sikundi/components/web/blocks/VarientFive";
import { prisma } from "@sikundi/lib/server/utils/prisma";

export default async function Home() {
    const {
        bodu,
        kuda,
        latestPosts,
        latestPhotos,
        latestReports,
        latestGraphics,
        latestSports,
        latestWorld
    } = await HomePage()
    
    return (
        <Fragment>
            {(bodu || kuda) && 
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
            <VarientThree title="ފޮޓޯ ގެލެރީ" className="mb-12" data={latestPhotos} className="mb-12" />}
            
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

async function HomePage () {
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
                    tag: {
                        slug: "bodu"
                    }
                }
            },
            status: "published"
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
                    tag: {
                        slug: "kuda"
                    }
                }
            },
            status: "published"
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
            status: "published"
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
            status: "published"
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
            }
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
            status: "published"
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
            }
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
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    return {
        bodu: {
            href: `/${bodu?.id}`,
            title: bodu?.title,
            featureImage: bodu?.featureImageUrl,
            description: bodu?.description,
            createdAt: bodu?.createdAt,
        },
        kuda: kuda?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestPosts: latestPosts?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestPhotos: latestPhotos?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestReports: latestReports?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestGraphics: latestGraphics?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.graphicsUrl,
            description: "",
            createdAt: "",
        })),
        latestSports: latestSports?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
        latestWorld: latestWorld?.map((post) => ({
            href: `/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: "",
        })),
    }
}
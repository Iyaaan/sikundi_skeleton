import { Fragment } from "react";
import VarientOne from "@sikundi/app/(web)/dv/_components/blocks/VarientOne";
import VarientTwo from "@sikundi/app/(web)/dv/_components/blocks/VarientTwo";
import dynamicImport from 'next/dynamic'
import { prisma } from "@sikundi/lib/server/utils/prisma";
import MLBanner from "@sikundi/app/(web)/dv/_components/adBanner/MLBanner";
import MSLBanner from "@sikundi/app/(web)/dv/_components/adBanner/MSLBanner";

export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const revalidate = 1000

interface Props { 
    params: { 

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
    } = await HomePage()
    const {
        ss_banner,
        ml_banner,
        msl_banner
    } = await ads()
    
    const VarientThree = dynamicImport(() => import("@sikundi/app/(web)/dv/_components/blocks/VarientThree"), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientFour = dynamicImport(() => import("@sikundi/app/(web)/dv/_components/blocks/VarientFour"), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-tertiary dark:bg-web-tertiary-dark w-full aspect-video">

                </div>
            )
        }
    })
    const VarientFive = dynamicImport(() => import("@sikundi/app/(web)/dv/_components/blocks/VarientFive"), {
        loading: () => {
            return (
                <div className="lg:rounded-lg bg-web-secondary dark:bg-web-secondary-dark w-full aspect-video">

                </div>
            )
        }
    })
    
    return (
        <Fragment>
            {(bodu || kuda.length > 0) && 
            // @ts-ignore
            <VarientOne priority data={[ bodu, ...kuda ]} ads={ss_banner} className="mb-8" />}
            <MLBanner slides={ml_banner} className="mb-8" />
            {(latestPosts?.length > 0) && 
            // @ts-ignore
            <VarientTwo title="ފަހުގެ ޙަބަރު" className="mb-12" data={latestPosts} />}
            <MSLBanner slides={msl_banner} className="mb-8 max-w-[940px] mx-auto" />
            {(latestPhotos?.length > 0) && 
            // @ts-ignore
            <VarientThree title="ފޮޓޯ ގެލެރީ" className="mb-12" data={latestPhotos} />}
            {(latestReports?.length > 0) && 
            // @ts-ignore
            <VarientFour title="ރިޕޯޓް" className="mb-12" data={latestReports} />}
            <MSLBanner slides={[...msl_banner]?.reverse()} className="mb-8 max-w-[940px] mx-auto" />
            {(latestGraphics?.length > 0) && 
            // @ts-ignore
            <VarientFive title="ގްރެފިކްސް" className="mb-12" data={latestGraphics} />}
            {(latestSports?.length > 0) && 
            // @ts-ignore
            <VarientOne title="ކުޅިވަރު" className="mb-12" data={latestSports} ads={[...ss_banner]?.reverse()} />}
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
            language: "DV"
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
            createdAt: true,
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
            language: "DV"
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
            createdAt: true,
        },
        where: {
            status: "published",
            language: "DV"
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
            description: true,
            createdAt: true
        },
        where: {
            status: "published",
            language: "DV"
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
            createdAt: true,
        },
        where: {
            status: "published",
            category: {
                slug: "report"
            },
            language: "DV"
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
            slug: true,
            createdAt: true,
        },
        where: {
            status: "published",
            language: "DV"
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
            createdAt: true,
        },
        where: {
            status: "published",
            category: {
                slug: "sport"
            },
            language: "DV"
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
            createdAt: true,
        },
        where: {
            status: "published",
            category: {
                slug: "world"
            },
            language: "DV"
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 10
    })

    return {
        bodu: bodu && {
            href: `/dv/${bodu?.id}`,
            title: bodu?.title,
            featureImage: bodu?.featureImageUrl,
            description: bodu?.description,
            createdAt: bodu?.createdAt,
        },
        kuda: kuda?.map((post) => ({
            href: `/dv/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: post.createdAt,
        })),
        latestPosts: latestPosts?.map((post) => ({
            href: `/dv/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: post.createdAt,
        })),
        latestPhotos: latestPhotos?.map((post) => ({
            href: `/dv/gallery/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: post.createdAt,
        })),
        latestReports: latestReports?.map((post) => ({
            href: `/dv/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: post.createdAt,
        })),
        latestGraphics: latestGraphics?.map((post) => ({
            href: `/dv/gaafu_graphics/${post.slug}`,
            title: post.title,
            featureImage: post.graphicsUrl,
            description: "",
            createdAt: post.createdAt,
        })),
        latestSports: latestSports?.map((post) => ({
            href: `/dv/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: post.createdAt,
        })),
        latestWorld: latestWorld?.map((post) => ({
            href: `/dv/${post.id}`,
            title: post.title,
            featureImage: post.featureImageUrl,
            description: "",
            createdAt: post.createdAt,
        })),
    }
}

async function ads() {
    const ss_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "ss_banner"
        },
        orderBy: {
            id: "desc"
        }
    })
    const ml_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "ml_banner"
        },
        orderBy: {
            id: "desc"
        }
    })
    const msl_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "msl_banner"
        },
        orderBy: {
            id: "desc"
        }
    })

    return {
        ss_banner: ss_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        })),
        ml_banner: ml_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        })),
        msl_banner: msl_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        }))
    }
}
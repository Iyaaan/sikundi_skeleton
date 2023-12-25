import Feature from "@sikundi/components/web/blocks/Feature"
import RelatedPosts from "@sikundi/components/web/blocks/RelatedPosts"
import Comment from "@sikundi/components/web/blocks/Comment"
import { prisma } from "@sikundi/lib/server/utils/prisma" 
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import LSBanner from "@sikundi/components/web/adBanner/LSBanner"
import ESSBanner from "@sikundi/components/web/adBanner/ESSBanner"
import AEBanner from "@sikundi/components/web/adBanner/AEBanner"
import Block from "@sikundi/components/web/blocks"
import { Fragment } from "react"
import IABanner from "@sikundi/components/web/adBanner/IABanner"
import LatestPosts from "@sikundi/components/web/blocks/LatestPosts"

export const dynamicParams = true
export const revalidate = 1000

interface Props { 
    params: { 
        post_id: string 
    } 
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const post_id = parseInt(params.post_id)
    if(!post_id) {
        return notFound()
    }
    const data = await prisma.post.findUnique({
        where: {
            id: post_id,
            language: "DV",
            status: "published"
        },
        select: {
            latinTitle: true,
            postsTags: {
                select: {
                    tag: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            description: true,
            category: {
                select: {
                    name: true
                }
            },
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
        // @ts-ignore
        "category": String(data?.category?.name),
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
    const post_id = parseInt(props.params.post_id)
    if(!post_id) {
        return notFound()
    }

    // @ts-ignore
    const { relatedPosts, data } = await postData(post_id)
    const { 
        ls_banner,
        ess_banner,
        ia_banner,
        ae_banner
    } = await ads()

    return (
        <div className="container grid grid-cols-12 lg:gap-x-8 lg:gap-y-4 lg:px-4 px-0">
            <div className="lg:col-span-9 col-span-12">
                <Feature className="pb-12" data={{
                    title: `${data?.longTitle}`,
                    featureImage: data?.featureImageUrl,
                    // @ts-ignore
                    tags: data?.postsTags?.map((tag) => tag.tag?.name),
                    published: {
                        by: {
                            // @ts-ignore
                            name: `${data?.createdBy?.userName}`,
                            // @ts-ignore
                            photo: `${data?.createdBy?.profilePictureUrl}`
                        },
                        date: new Date(`${data?.createdAt}`),
                    },
                    social: {
                        facebook: "",
                        instagram: "",
                        youtube: "",
                        whatsapp: ""
                    }
                }} />
                <div className="px-6 max-w-3xl mx-auto">
                    {data?.lead && JSON.parse(String(data?.lead))?.root?.children?.map((block:any, index: number) => (
                        <Fragment key={index}>
                            <Block block={block} />
                            {index === 1 && <IABanner slides={ia_banner} className="lg:float-left lg:max-w-[304px] lg:mr-4 mb-6 lg:mb-0" />}
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-3 lg:row-span-2 col-span-12 px-4 lg:px-0">
                <div className="sticky top-28 pb-8 grid lg:gap-8 gap-6">
                    <LSBanner slides={ls_banner} />
                    <LatestPosts />
                    <ESSBanner slides={ess_banner} />
                </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
                {relatedPosts?.length > 0 && <RelatedPosts className="mb-8" data={relatedPosts} />}
                <div className="max-w-3xl mx-auto px-6 mb-8">
                    <AEBanner slides={ae_banner} className="" />
                </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
                <Comment />
            </div>
        </div>
    )
}

function postData(id:number) {
    return new Promise(async (resolve, reject) => {
        const data = await prisma.post.findUnique({
            where: {
                id: id,
                language: "DV",
                status: "published"
            },
            select: {
                longTitle: true,
                featureImageUrl: true,
                postsTags: {
                    select: {
                        tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                createdBy: {
                    select: {
                        userName: true,
                        profilePictureUrl: true
                    }
                },
                createdAt: true,
                lead: true
            }
        })

        const relatedPosts = await prisma.post.findMany({
            take: 4,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                title: true,
                featureImageUrl: true
            },
            where: {
                language: "DV",
                status: "published",
                postsTags: {
                    some: {
                        tag: {
                            name: {
                                // @ts-ignore
                                in: data?.postsTags?.map((tag)=>tag.tag?.name)
                            }
                        }
                    }
                },
            }
        })

        resolve ({
            data,
            relatedPosts: relatedPosts?.map((post) => ({
                href: `/dv/${post.id}`,
                title: `${post.title}`,
                featureImage: `${post.featureImageUrl}`
            }))
        })
    })    
}


async function ads() {
    const ls_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "ls_banner"
        },
        orderBy: {
            id: "desc"
        }
    })
    const ess_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "ess_banner"
        },
        orderBy: {
            id: "desc"
        }
    })
    const ia_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "ia_banner"
        },
        orderBy: {
            id: "desc"
        }
    })
    const ae_banner = await prisma.adBanner.findMany({
        select: {
            id: true,
            altTxt: true,
            adBannerUrl: true,
            url: true
        },
        where: {
            status: "published",
            language: "DV",
            adType: "ae_banner"
        },
        orderBy: {
            id: "desc"
        }
    })

    return {
        ls_banner: ls_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        })),
        ess_banner: ess_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        })),
        ia_banner: ia_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        })),
        ae_banner: ae_banner.map((ad)=>({
            src: ad.adBannerUrl,
            altText: ad.altTxt,
            href: ad.url
        }))
    }
}
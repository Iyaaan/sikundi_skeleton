import PortraitAd from "@sikundi/components/web/ad/PortraitAd"
import Feature from "@sikundi/app/(web)/[lang]/[post_id]/(blocks)/Feature"
import RelatedPosts from "@sikundi/app/(web)/[lang]/[post_id]/(blocks)/RelatedPosts"
import Comment from "@sikundi/app/(web)/[lang]/[post_id]/(blocks)/Comment"
import Paragraph from "./(blocks)/Paragraph"
import Heading from "./(blocks)/Heading"
import Quote from "./(blocks)/Quote"
import { prisma } from "@sikundi/lib/server/utils/prisma" 
import Tweet from "./(blocks)/Tweet"
import Youtube from "./(blocks)/Youtube"
import Facebook from "./(blocks)/Facebook"
import { Fragment } from "react"
import type { Metadata, ResolvingMetadata } from 'next'

interface Props { 
    params: { 
        post_id: string 
        lang: string 
    } 
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const language = params?.lang?.toUpperCase() === "EN" ? "EN" : "DV"
    const data = await prisma.post.findUnique({
        where: {
            id: parseInt(params.post_id),
            language: language,
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
            {name: data?.createdBy?.userName, url: `/${params.lang}/author/${data?.createdBy?.userName}`}
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
                {name: data?.createdBy?.userName, url: `/${params.lang}/author/${data?.createdBy?.userName}`}
            ],
            "countryName": "maldives",
            "description": String(data?.description),
            "locale": params.lang,
            "siteName": String(process.env.NEXT_PUBLIC_APP_NAME)
        }
    }
  }

export default async function SinglePage(props: Props) {
    // @ts-ignore
    const { relatedPosts, data } = await postData(parseInt(`${props.params.post_id}`), props?.params?.lang)

    return (
        <div className="container grid grid-cols-12 lg:gap-x-14 lg:gap-y-4 lg:px-4 px-0">
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
                    {data?.lead && JSON.parse(String(data?.lead))?.root?.children?.map((block:any, index: number) => {
                        if(block?.type === "paragraph") return <Paragraph key={index}>{
                            block?.children?.map(({text}:any, index:number) => {
                                return <Fragment key={index}>{text}</Fragment>
                            })    
                            // JSON.stringify(block?.children)
                        }</Paragraph>
                        if(block?.type === "heading") return <Heading key={index}>{
                            block?.children?.map(({text}:any, index:any) => {
                                return <Fragment key={index}>{text}</Fragment>
                            })    
                            // JSON.stringify(block?.children)
                        }</Heading>
                        if(block?.type === "list") return <Paragraph key={index}>{
                            block?.children?.map(({text}:any, index:any) => {
                                return <Fragment key={index}>{text}</Fragment>
                            })    
                            // JSON.stringify(block?.children)
                        }</Paragraph>
                        if(block?.type === "quote") return <Quote key={index}>{
                            block?.children?.map(({text}:any, index:any) => {
                                return <Fragment key={index}>{text}</Fragment>
                            })    
                            // JSON.stringify(block?.children)
                        }</Quote>
                        if(block?.type === "horizontalrule") return <hr key={index} className="h-[2px] bg-web-tertiary text-web-tertiary mb-8" />
                        if(block?.type === "layout-container") return <div key={index} className="flex">
                            {
                                block?.children?.map((text:any, index:any) => {
                                    return <Fragment key={index}>{text.children?.map((t:any, index:any) => {
                                        return <Paragraph key={index} className="border flex-1 p-4">{t?.children?.map(({text}:any, index:any) => {
                                            return <Fragment key={index}>{text}</Fragment>
                                        })}</Paragraph>
                                    })}</Fragment>
                                })    
                            }
                        </div>
                        // if(block?.type === "collapsible-container") return <Paragraph key={index}>{
                        //     block?.children?.map(({text}:any) => {
                        //         return <>{text}asd</>
                        //     })    
                        //     // JSON.stringify(block?.children)
                        // }</Paragraph>
                        if(block?.type === "tweet") return <Tweet id={block?.id} key={index} />
                          
                        if(block?.type === "youtube") return <Youtube id={block?.videoID} key={index} />
                        if(block?.type === "facebook") return <Facebook id={block.postID} key={index} />

                    })}
                </div>
            </div>
            <div className="lg:col-span-3 lg:row-span-2 col-span-12 px-4 lg:px-0">
                <div className="sticky top-28 pb-8">
                    <p dir="ltr">{"Advertisement"}</p>
                    <PortraitAd href={"https://sonee.com.mv"} 
                        target="_blank"
                        className="block mb-4"
                        data={{
                            coverImage: `/sample_media/OGQ2OWE4MDJkOGY5Y2Q4NzAzYzI2NGRkMTQ3YTFjZmE=.jpg`,
                            alt: "Sonnee Hardware"
                        }}
                    />
                    <p dir="ltr">{"Advertisement"}</p>
                    <PortraitAd href={"https://sonee.com.mv"} 
                        target="_blank"
                        className="block"
                        data={{
                            coverImage: `/sample_media/OGQ2OWE4MDJkOGY5Y2Q4NzAzYzI2NGRkMTQ3YTFjZmE=.jpg`,
                            alt: "Sonnee Hardware"
                        }}
                    />
                </div>
            </div>
            <div className="lg:col-span-9 col-span-12">
                {relatedPosts?.length > 0 && <RelatedPosts className="mb-12" data={relatedPosts} />}
            </div>
            <div className="lg:col-span-9 col-span-12">
                <Comment />
            </div>
        </div>
    )
}

async function postData(id:number, lang:string) {
    const language = lang?.toUpperCase() === "EN" ? "EN" : "DV"
    const data = await prisma.post.findUnique({
        where: {
            id: id,
            language: language,
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
            language: language,
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

    return {
        data,
        relatedPosts: relatedPosts?.map((post) => ({
            href: `/${language.toLowerCase()}/${post.id}`,
            title: `${post.title}`,
            featureImage: `${post.featureImageUrl}`
        }))
    }
}
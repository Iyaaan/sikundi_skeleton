import Image from 'next/image'
import React from 'react'
import PostCategoryCard from '@sikundi/app/(web)/en/_components/cards/PostCategoryCard'
import Comment from '@sikundi/app/(web)/dv/_components/richText/Comment'
import { prisma } from "@sikundi/lib/server/utils/prisma" 
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import Block from "@sikundi/app/(web)/dv/_components/richText"

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
            language: "EN",
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
                    userNameEn: true,
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
                {name: data?.createdBy?.userNameEn, url: `/dv/author/${data?.createdBy?.userName}`}
            ],
            "countryName": "maldives",
            "description": String(data?.description),
            "locale": "dv",
            "siteName": String(process.env.NEXT_PUBLIC_APP_NAME)
        }
    }
}

export default async function Page(props: Props) {
    const post_id = parseInt(props.params.post_id)
    if(!post_id) {
        return notFound()
    }

    // @ts-ignore
    const { relatedPosts, data } = await postData(post_id)

    return (
        <div className='container px-4 grid grid-cols-12 gap-4 items-start'>
            <div className='lg:col-span-9 col-span-12'>
                <h1 className='mt-6 mb-8 font-bold lg:text-5xl text-3xl'>
                    {data?.longTitle}
                </h1>
                <span className='relative w-full aspect-[1033/696] block lg:mb-3'>
                    <Image 
                        src={`${data?.featureImageUrl}`} 
                        alt=''
                        fill
                        className='object-cover'
                    />
                    <span className='bg-web-primary dark:bg-web-primary-dark text-white py-1 px-4 absolute -top-2 left-4'>
                        {data?.category?.name}    
                    </span>
                </span>
            </div>
            <div className='lg:col-span-2 lg:col-start-1 col-span-12 -mt-12 lg:mt-0 relative z-10'>
                <span className='bg-secondary block w-12 aspect-square rounded-full lg:mx-auto lg:mt-8 mb-1 mx-3'>

                </span>
                <h6 className='lg:text-center font-bold'>{data?.createdBy?.userNameEn}</h6>
            </div>
            <div className='lg:col-span-6 col-span-12'>
                {data?.lead && JSON.parse(String(data?.lead))?.root?.children?.map((block:any, index: number) => (
                    <Block block={block} key={index} />
                ))}
                
            </div>
            <div className='lg:col-span-4 col-span-12 flex flex-col gap-4 lg:sticky lg:top-24 lg:py-24'>
                {/* @ts-ignore */}
                {relatedPosts?.map(({ url, ...post }, index) => <PostCategoryCard key={index} 
                    href={url} 
                    // @ts-ignore
                    data={post} 
                />)}
            </div>
            <div className='lg:col-span-5 lg:col-start-4 col-span-12 mb-8'>
                <Comment lang="en" />
            </div>
        </div>
    )
}

function postData(id:number) {
    return new Promise(async (resolve, reject) => {
        const data = await prisma.post.findUnique({
            where: {
                id: id,
                language: "EN",
                status: "published"
            },
            select: {
                longTitle: true,
                featureImageUrl: true,
                category: {
                    select: {
                        name: true
                    }
                },
                createdBy: {
                    select: {
                        userNameEn: true,
                        profilePictureUrl: true
                    }
                },
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
                featureImageUrl: true,
                createdAt: true,
                category: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                language: "EN",
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
                url: `/en/${post.id}`,
                title: `${post.title}`,
                featureImageUrl: `${post.featureImageUrl}`,
                createdAt: new Date(post.createdAt),
                category: String(post.category?.name),
            }))
        })
    })    
}

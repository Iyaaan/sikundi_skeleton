import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import { notFound } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'

interface Props {
    params: {
        [name:string]: string
    }
    searchParams: { 
        
    }

}

export default async function page({params, searchParams}: Props) {
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await post({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' />
    )
}

export const dynamic = "force-dynamic"



const post = async (query: Props) => {
    const postSingle = await prisma.post.findUnique({
        select: {
            id: true,
            title: true,
            longTitle: true,
            latinTitle: true,
            description: true,
            status: true,
            lead: true,
            featureImage: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            language: true,
            breaking: true,
            liveblog: true,
            category: true,
            postsTags: {
                include: {
                    tag: {
                        select: {
                            name: true,
                            slug: true
                        }
                    }
                }
            },
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (postSingle === null) return notFound()
    return {
        ...postSingle,
        createdBy: {
            value: postSingle?.createdBy?.userName,
            label: postSingle?.createdBy?.userName
        },
        category: postSingle?.category?.name ? {
            value: postSingle?.category?.slug,
            label: postSingle?.category?.name
        } : undefined,
        tags: postSingle?.postsTags?.map((tag)=>({
            label: tag.tag?.name,
            value: tag.tag?.slug
        })),
        featureImageUrl: postSingle.featureImage?.url,
        language: {
            value: postSingle?.language,
            label: postSingle?.language === "EN" ? "English" : "Dhivehi"
        }
    }
}
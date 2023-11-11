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
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/video/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await video({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' />
    )
}

export const dynamic = "force-dynamic"



const video = async (query: Props) => {
    const videoSingle = await prisma.video.findUnique({
        select: {
            id: true,
            title: true,
            longTitle: true,
            latinTitle: true,
            description: true,
            status: true,
            YoutubeUrl: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            language: true,
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (videoSingle === null) return notFound()
    return {
        ...videoSingle,
        createdBy: {
            value: videoSingle?.createdBy?.userName,
            label: videoSingle?.createdBy?.userName
        },
        language: {
            value: videoSingle?.language,
            label: videoSingle?.language === "EN" ? "English" : "Dhivehi"
        }
    }
}
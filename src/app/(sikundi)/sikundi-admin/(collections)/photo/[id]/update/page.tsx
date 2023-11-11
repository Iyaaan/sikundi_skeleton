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
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/photo/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await photo({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' />
    )
}

export const dynamic = "force-dynamic"



const photo = async (query: Props) => {
    const photoSingle = await prisma.photo.findUnique({
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
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (photoSingle === null) return notFound()
    return {
        ...photoSingle,
        createdBy: {
            value: photoSingle?.createdBy?.userName,
            label: photoSingle?.createdBy?.userName
        },
        featureImageUrl: photoSingle.featureImage?.url,
        language: {
            value: photoSingle?.language,
            label: photoSingle?.language === "EN" ? "English" : "Dhivehi"
        }
    }
}
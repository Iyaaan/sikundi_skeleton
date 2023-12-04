import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import { notFound, redirect } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import getPermission from '@sikundi/lib/server/utils/getPermission'

interface Props {
    params: {
        [name:string]: string
    }
    searchParams: { 
        
    }

}

export default async function page({params, searchParams}: Props) {
    const permission = await getPermission({
        photo: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.photo?.draft || 
        permission?.photo?.delete || 
        permission?.photo?.soft_delete || 
        permission?.photo?.publish || 
        permission?.photo?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/photo/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await photo({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' permission={{
            draft: permission?.photo?.draft,
            delete: permission?.photo?.delete, 
            soft_delete: permission?.photo?.soft_delete, 
            publish: permission?.photo?.publish,
            pending: permission?.photo?.pending
        }} />
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
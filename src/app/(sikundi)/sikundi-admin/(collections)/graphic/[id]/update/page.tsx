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
        graphic: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.graphic?.draft || 
        permission?.graphic?.delete || 
        permission?.graphic?.soft_delete || 
        permission?.graphic?.publish || 
        permission?.graphic?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/graphic/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await graphic({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' permission={{
            draft: permission?.graphic?.draft,
            delete: permission?.graphic?.delete, 
            soft_delete: permission?.graphic?.soft_delete, 
            publish: permission?.graphic?.publish,
            pending: permission?.graphic?.pending
        }} />
    )
}

export const dynamic = "force-dynamic"



const graphic = async (query: Props) => {
    const graphicSingle = await prisma.graphic.findUnique({
        select: {
            id: true,
            title: true,
            longTitle: true,
            latinTitle: true,
            description: true,
            status: true,
            graphics: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            language: true,
            slug: true,
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (graphicSingle === null) return notFound()
    return {
        ...graphicSingle,
        createdBy: {
            value: graphicSingle?.createdBy?.userName,
            label: graphicSingle?.createdBy?.userName
        },
        graphicsUrl: graphicSingle.graphics?.url,
        language: {
            value: graphicSingle?.language,
            label: graphicSingle?.language === "EN" ? "English" : "Dhivehi"
        }
    }
}
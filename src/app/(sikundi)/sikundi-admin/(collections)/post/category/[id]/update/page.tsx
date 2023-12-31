import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import { notFound, redirect } from 'next/navigation'
import getPermission from '@sikundi/lib/server/utils/getPermission'

interface Props {
    params: {
        [name:string]: string
    }
    searchParams: {}

}

export default async function page({params, searchParams}: Props) {
    const permission = await getPermission({
        category: [
            "delete",
            "create",
            "update"
        ]
    })
    if(!(permission?.category?.delete || 
        permission?.category?.update
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await category({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' permission={{
            delete: permission?.category?.delete,
            create: permission?.category?.create, 
            update: permission?.category?.update
        }} />
    )
}

export const dynamic = "force-dynamic"



const category = async (query: Props) => {
    const categorySingle = await prisma.category.findUnique({
        select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
            description: true,
            icon: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            language: true
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (categorySingle === null) return notFound()
    
    return {
        ...categorySingle,
        createdBy: {
            value: categorySingle?.createdBy?.userName,
            label: categorySingle?.createdBy?.userName
        },
        language: {
            value: categorySingle?.language,
            label: categorySingle?.language === "EN" ? "English" : "Dhivehi"
        }
    }
}
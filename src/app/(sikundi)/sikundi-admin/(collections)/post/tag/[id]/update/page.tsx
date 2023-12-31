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
        tag: [
            "delete",
            "create",
            "update"
        ]
    })
    if(!(permission?.tag?.delete || 
        permission?.tag?.update
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/tag/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const data = await tag({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' permission={{
            delete: permission?.tag?.delete,
            create: permission?.tag?.create, 
            update: permission?.tag?.update
        }} />
    )
}

export const dynamic = "force-dynamic"



const tag = async (query: Props) => {
    const tagSingle = await prisma.tag.findUnique({
        select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            }
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (tagSingle === null) return notFound()
    
    return {
        ...tagSingle,
        createdBy: {
            value: tagSingle?.createdBy?.userName,
            label: tagSingle?.createdBy?.userName
        }
    }
}
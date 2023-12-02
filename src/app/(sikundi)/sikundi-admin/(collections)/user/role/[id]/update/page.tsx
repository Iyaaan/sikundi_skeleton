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
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/user/role/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const usr = await getUser()
    const data = await user({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(usr))} type='update' />
    )
}

export const dynamic = "force-dynamic"



const user = async (query: Props) => {
    const roleSingle = await prisma.role.findUnique({
        select: {
            id: true,
            name: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
            permissions: true
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (roleSingle === null) return notFound()
    return {
        ...roleSingle,
        createdBy: roleSingle?.createdBy ? {
            value: roleSingle?.createdBy?.userName,
            label: roleSingle?.createdBy?.userName
        } : undefined
    }
}
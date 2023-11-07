import React, { Suspense } from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import {prisma} from '@sikundi/lib/server/utils/prisma'
import { notFound } from 'next/navigation'

interface Props {
    params: {
        [name:string]: string
    }
    searchParams: {}

}

export default async function page({params, searchParams}: Props) {
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_component/form'), { ssr: false })
    const user = await getUser()
    const data = await category({params, searchParams})

    return (
        <Suspense fallback={<Loading />}>
            <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(user))} type='update' />
        </Suspense>
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

    if (categorySingle === null) return notFound()
    
    return {
        ...categorySingle,
        createdBy: {
            value: categorySingle?.createdBy?.email,
            label: categorySingle?.createdBy?.userName
        }
    }
}
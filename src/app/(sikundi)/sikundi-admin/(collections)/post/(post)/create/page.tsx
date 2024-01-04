import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import getPermission from '@sikundi/lib/server/utils/getPermission'
import { redirect } from 'next/navigation'
import {prisma} from '@sikundi/lib/server/utils/prisma'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    const permission = await getPermission({
        post: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.post?.draft || 
        permission?.post?.delete || 
        permission?.post?.soft_delete || 
        permission?.post?.publish || 
        permission?.post?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()
    const categories = (await prisma.category.findMany({
        orderBy: {
            posts: {
                _count: "desc"
            }
        },
        select: {
            id: true,
            name: true,
            slug: true
        },
        take: 5
    })).map((tag)=>({
        label: tag.name,
        value: tag.slug
    }))
    const tags = (await prisma.tag.findMany({
        orderBy: {
            tagsPosts: {
                _count: "desc"
            }
        },
        select: {
            id: true,
            name: true,
            slug: true
        },
        take: 5
    })).map((tag)=>({
        label: tag.name,
        value: tag.slug
    }))

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            draft: permission?.post?.draft,
            delete: permission?.post?.delete, 
            soft_delete: permission?.post?.soft_delete, 
            publish: permission?.post?.publish,
            pending: permission?.post?.pending
        }} categories={categories} tags={tags} />
    )
}

export const dynamic = "force-dynamic"
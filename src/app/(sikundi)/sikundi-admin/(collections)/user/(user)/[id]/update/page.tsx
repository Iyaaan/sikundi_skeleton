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
        user: [
            "create",
            "block",
            "update"
        ]
    })
    if(!(
        permission?.user?.block || 
        permission?.user?.update
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/user/(user)/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const usr = await getUser()
    const data = await user({params, searchParams})

    return (
        <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(usr))} type='update' permission={{
            block: permission?.user?.block,
            update: permission?.user?.update,
            create: permission?.user?.create
        }} />
    )
}

export const dynamic = "force-dynamic"



const user = async (query: Props) => {
    const userSingle = await prisma.user.findUnique({
        select: {
            id: true,
            userName: true,
            userNameEn: true,
            email: true,
            password: true,
            description: true,
            status: true,
            profilePicture: true,
            role: true,
            createdAt: true,
            createdBy: {
                select: {
                    userName: true,
                    email: true
                }
            },
        },
        where: {
            id: parseInt(query.params.id)
        }
    })

    if (userSingle === null) return notFound()
    return {
        ...userSingle,
        createdBy: userSingle?.createdBy ? {
            value: userSingle?.createdBy?.userName,
            label: userSingle?.createdBy?.userName
        } : undefined,
        profilePictureUrl: userSingle.profilePicture?.url,
        role: {
            value: userSingle?.role?.name,
            label: userSingle?.role?.name
        },
    }
}
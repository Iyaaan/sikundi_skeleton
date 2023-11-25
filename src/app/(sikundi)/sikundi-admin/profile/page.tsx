import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser, { UserType } from '@sikundi/lib/server/utils/getUser'
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
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/profile/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const usr = await getUser()
    // @ts-ignore
    const data = await user(usr)

    return (
        <div className='container p-4'>
            <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(usr))} />
        </div>
    )
}

export const dynamic = "force-dynamic"



const user = async (user: UserType) => {
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
            // @ts-ignore
            email: String(user.payload.email)
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
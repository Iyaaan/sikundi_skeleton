import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import { redirect } from 'next/navigation'
import getPermission from '@sikundi/lib/server/utils/getPermission'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    const permission = await getPermission({
        video: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.video?.draft || 
        permission?.video?.delete || 
        permission?.video?.soft_delete || 
        permission?.video?.publish || 
        permission?.video?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/video/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            draft: permission?.video?.draft,
            delete: permission?.video?.delete, 
            soft_delete: permission?.video?.soft_delete, 
            publish: permission?.video?.publish,
            pending: permission?.video?.pending
        }} />
    )
}

export const dynamic = "force-dynamic"
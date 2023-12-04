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

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            draft: permission?.photo?.draft,
            delete: permission?.photo?.delete, 
            soft_delete: permission?.photo?.soft_delete, 
            publish: permission?.photo?.publish,
            pending: permission?.photo?.pending
        }} />
    )
}

export const dynamic = "force-dynamic"
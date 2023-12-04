import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'
import getPermission from '@sikundi/lib/server/utils/getPermission'
import { redirect } from 'next/navigation'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
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

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            draft: permission?.graphic?.draft,
            delete: permission?.graphic?.delete, 
            soft_delete: permission?.graphic?.soft_delete, 
            publish: permission?.graphic?.publish,
            pending: permission?.graphic?.pending
        }} />
    )
}

export const dynamic = "force-dynamic"
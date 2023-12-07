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
        adBanner: [
            "draft",
            "delete",
            "soft_delete",
            "publish",
            "pending"
        ]
    })
    if(!(permission?.adBanner?.draft || 
        permission?.adBanner?.delete || 
        permission?.adBanner?.soft_delete || 
        permission?.adBanner?.publish || 
        permission?.adBanner?.pending
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/ad-banner/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            draft: permission?.adBanner?.draft,
            delete: permission?.adBanner?.delete, 
            soft_delete: permission?.adBanner?.soft_delete, 
            publish: permission?.adBanner?.publish,
            pending: permission?.adBanner?.pending
        }} />
    )
}

export const dynamic = "force-dynamic"
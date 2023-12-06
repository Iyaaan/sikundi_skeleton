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
        tag: [
            "delete",
            "create",
            "update"
        ]
    })
    if(!(
        permission?.tag?.create
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/tag/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            delete: permission?.tag?.delete,
            create: permission?.tag?.create, 
            update: permission?.tag?.update
        }} />
    )
}

export const dynamic = "force-dynamic"
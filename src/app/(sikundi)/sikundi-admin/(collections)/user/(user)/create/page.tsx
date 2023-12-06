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
        user: [
            "create",
            "block",
            "update"
        ]
    })
    if(!(
        permission?.user?.create
    )) {
        return redirect('/sikundi-admin')
    }

    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/user/(user)/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' permission={{
            block: permission?.user?.block,
            update: permission?.user?.update,
            create: permission?.user?.create
        }} />
    )
}

export const dynamic = "force-dynamic"
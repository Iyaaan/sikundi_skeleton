import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import getUser from '@sikundi/lib/server/utils/getUser'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    const Form = dynamicImport(() => import('@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_component/form'), { 
        ssr: false,
        loading: () => <Loading />
    })
    const user = await getUser()

    return (
        <Form user={JSON.parse(JSON.stringify(user))} type='create' />
    )
}

export const dynamic = "force-dynamic"
import React from 'react'
import dynamicImport from 'next/dynamic'
import Loading from './loading'
import user from '@sikundi/lib/server/utils/getUser'
import edit from '@sikundi/app/(sikundi)/sikundi-admin/profile/_actions/edit'

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
    const usr = await user()
    // @ts-ignore
    const data = await edit(usr)

    return (
        <div className='container p-4'>
            <Form data={JSON.parse(JSON.stringify(data))} user={JSON.parse(JSON.stringify(usr))} />
        </div>
    )
}

export const dynamic = "force-dynamic"
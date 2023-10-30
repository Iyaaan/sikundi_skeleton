import React from 'react'
import Form from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/(post)/_component/form'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    // await new Promise(r => setTimeout(r, 10000))
    return (
        <Form />
    )
}

export const dynamic = "force-dynamic"
import React from 'react'
import Form from '@sikundi/app/(sikundi)/sikundi-admin/(collections)/post/category/_component/form'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    return (
        <Form />
    )
}

export const dynamic = "force-dynamic"
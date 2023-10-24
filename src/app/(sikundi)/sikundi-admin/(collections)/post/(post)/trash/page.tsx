import React from 'react'
import { File } from 'lucide-react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams}: Props) {
    return (
        <EmptyPlaceholder data={{
            slug: "post",
            name: "posts",
            url: 'sikundi-admin/post',
            Icon: File,
            permissions: {
                create: false
            },
            deleted: true
        }} />
    )
}

export const dynamic = "force-dynamic"
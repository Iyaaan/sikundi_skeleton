import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { File } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "post",
            name: "posts",
            url: '/sikundi-admin/post',
            Icon: File,
            permissions: {
                create: true,
            }
        }} />
    )
}
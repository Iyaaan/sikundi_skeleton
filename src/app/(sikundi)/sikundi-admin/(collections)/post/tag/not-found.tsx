import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { Tag } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "tag",
            name: "tags",
            url: '/sikundi-admin/post/tag',
            Icon: Tag,
            permissions: {
                create: true,
            }
        }} />
    )
}
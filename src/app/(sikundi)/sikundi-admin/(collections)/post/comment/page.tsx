import React from 'react'
import EmptyPlaceholder from '../../../_components/EmptyPlaceHolder'
import { File } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "comment",
            name: "comments",
            url: 'sikundi-admin/post/comment',
            Icon: File,
            permissions: {
                create: false,
            }
        }} />
    )
}

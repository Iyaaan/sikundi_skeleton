import React from 'react'
import EmptyPlaceholder from '../../../_components/EmptyPlaceHolder'
import { Tag } from 'lucide-react'

export default async function page() {
    await new Promise(r => setTimeout(r, 2000))

    return (
        <EmptyPlaceholder data={{
            slug: "tag",
            name: "tags",
            url: 'sikundi-admin/post/tag',
            Icon: Tag,
            permissions: {
                create: true,
            }
        }} />
    )
}

export const dynamic = "force-dynamic"

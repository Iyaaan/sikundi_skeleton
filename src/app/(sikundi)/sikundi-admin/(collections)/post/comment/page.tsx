import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { MessageCircleIcon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "comment",
            name: "comments",
            url: 'sikundi-admin/post/comment',
            Icon: MessageCircleIcon,
            permissions: {
                create: false,
            }
        }} />
    )
}

export const dynamic = "force-dynamic"

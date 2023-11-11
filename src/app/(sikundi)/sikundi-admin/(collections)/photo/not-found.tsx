import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { ImageIcon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "photo",
            name: "photos",
            url: '/sikundi-admin/photo',
            Icon: ImageIcon,
            permissions: {
                create: true,
            }
        }} />
    )
}
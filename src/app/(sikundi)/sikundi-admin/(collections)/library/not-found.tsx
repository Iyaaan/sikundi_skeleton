import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { ImageIcon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "library",
            name: "Medias",
            url: 'sikundi-admin/post/library',
            Icon: ImageIcon,
            permissions: {
                create: false,
            }
        }} />
    )
}
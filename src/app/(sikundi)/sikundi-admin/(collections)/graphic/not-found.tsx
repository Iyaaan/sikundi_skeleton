import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { ImageIcon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "graphic",
            name: "graphics",
            url: '/sikundi-admin/graphic',
            Icon: ImageIcon,
            permissions: {
                create: true,
            }
        }} />
    )
}
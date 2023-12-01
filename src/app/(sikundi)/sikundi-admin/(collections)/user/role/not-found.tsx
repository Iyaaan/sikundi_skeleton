import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { ImageIcon, UserIcon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "user",
            name: "users",
            url: '/sikundi-admin/user',
            Icon: UserIcon,
            permissions: {
                create: true,
            }
        }} />
    )
}
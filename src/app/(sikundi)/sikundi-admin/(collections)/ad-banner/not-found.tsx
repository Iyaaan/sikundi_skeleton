import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { Table2Icon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "adBanner",
            name: "Ad banners",
            url: '/sikundi-admin/ad-banner',
            Icon: Table2Icon,
            permissions: {
                create: true,
            }
        }} />
    )
}
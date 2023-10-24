import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { Package } from 'lucide-react'

export default async function page() {

    return (
        <EmptyPlaceholder data={{
            slug: "category",
            name: "categories",
            url: 'sikundi-admin/post/category',
            Icon: Package,
            permissions: {
                create: true,
            }
        }} />
    )
}

export const dynamic = "force-dynamic"

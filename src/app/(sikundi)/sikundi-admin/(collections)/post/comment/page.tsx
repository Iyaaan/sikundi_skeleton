import React, { Suspense } from 'react'
import EmptyPlaceholder from '../../../_components/EmptyPlaceHolder'
import { File } from 'lucide-react'
import { Skeleton } from '@sikundi/components/ui/skeleton'

export default async function page() {
    await new Promise(r => setTimeout(r, 2000))

    return (
        <Suspense fallback={<Skeleton className="w-full aspect-video" />}>
            <EmptyPlaceholder data={{
                slug: "comment",
                name: "comments",
                url: 'sikundi-admin/post/comment',
                Icon: File,
                permissions: {
                    create: false,
                }
            }} />
        </Suspense>
    )
}

export const dynamic = "force-dynamic"

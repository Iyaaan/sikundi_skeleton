import React, { Suspense } from 'react'
import EmptyPlaceholder from '../../../_components/EmptyPlaceHolder'
import { File } from 'lucide-react'
import { Skeleton } from '@sikundi/components/ui/skeleton'

export default async function page() {
    await new Promise(r => setTimeout(r, 2000))
    
    return (
        <Suspense fallback={<Skeleton className="w-full aspect-video" />}>
            <EmptyPlaceholder data={{
                slug: "post",
                name: "posts",
                url: 'sikundi-admin/post',
                Icon: File,
                permissions: {
                    create: true,
                }
            }} />
        </Suspense>
    )
}

export const dynamic = "force-dynamic"
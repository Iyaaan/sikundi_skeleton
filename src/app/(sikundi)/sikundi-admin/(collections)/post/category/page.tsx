import React, { Suspense } from 'react'
import EmptyPlaceholder from '../../../_components/EmptyPlaceHolder'
import { Package } from 'lucide-react'
import { Skeleton } from '@sikundi/components/ui/skeleton'

interface Props {
    params: {}
    searchParams: { 
        [name:string]: string
    }

}

export default async function page({params, searchParams }: Props) {
    await new Promise(r => setTimeout(r, 2000))

    return (
        <Suspense key={JSON.stringify(searchParams)} fallback={<Skeleton className="w-full aspect-video" />}>
            <EmptyPlaceholder data={{
                slug: "category",
                name: "categories",
                url: 'sikundi-admin/post/category',
                Icon: Package,
                permissions: {
                    create: true,
                }
            }} />
        </Suspense>
    )
}

export const dynamic = "force-dynamic"
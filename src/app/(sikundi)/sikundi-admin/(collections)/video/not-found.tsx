import React from 'react'
import EmptyPlaceholder from '@sikundi/app/(sikundi)/sikundi-admin/_components/EmptyPlaceHolder'
import { VideoIcon } from 'lucide-react'

export default async function page() {
    return (
        <EmptyPlaceholder data={{
            slug: "video",
            name: "videos",
            url: '/sikundi-admin/video',
            Icon: VideoIcon,
            permissions: {
                create: true,
            }
        }} />
    )
}
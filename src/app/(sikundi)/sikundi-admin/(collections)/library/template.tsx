"use client"

import React, { ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import MediaLibraryModal from '../../_components/MediaLibraryModal'
import { useRouter } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const router = useRouter()

    return (
        <div className='container p-4'>
            <Header data={{
                url: "/sikundi-admin/library",
                name: "Medias",
                custom: {
                    create: <MediaLibraryModal disableList onComplete={() => router.refresh()}>
                        {"Add Media"}
                    </MediaLibraryModal>
                },
                slug: "library",
                filters: [],
                ui: {
                    search: true, 
                    filters: false, 
                    create: false,
                    trash: false,
                    copyDesk: false
                }
            }} />
            {children}
        </div>
    )
}

export default Template
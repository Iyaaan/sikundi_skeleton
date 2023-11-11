"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname, useSearchParams } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()
    const searchParams = useSearchParams()

    return (
        <div className='container p-4'>
            <Header data={{
                url: "/sikundi-admin/video",
                name: "videos",
                slug: "video",
                filters: [
                    // {type: "date", name: "createdAt", label: "created at"},
                    {type: "select", name: "status", options: [
                        {label: "drafted", value: "drafted",},
                        {label: "published", value: "published"},
                    ], hidden: ((path === "/sikundi-admin/video/trash") ||
                    (path === "/sikundi-admin/video/copydesk"))},
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"},
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/video") ||
                        (path === "/sikundi-admin/video/trash") ||
                        (path === "/sikundi-admin/video/copydesk"),
                    filters: 
                        (path === "/sikundi-admin/video") ||
                        (path === "/sikundi-admin/video/trash") ||
                        (path === "/sikundi-admin/video/copydesk"),
                    create: 
                        (path === "/sikundi-admin/video") ||
                        (path === "/sikundi-admin/video/trash") ||
                        (path === "/sikundi-admin/video/copydesk"),
                    trash: 
                        (path === "/sikundi-admin/video") ||
                        (path === "/sikundi-admin/video/copydesk"),
                    copyDesk: 
                        (path === "/sikundi-admin/video") ||
                        (path === "/sikundi-admin/video/trash"),
                }
            }} />
            {children}
        </div>
    )
}

export default Template
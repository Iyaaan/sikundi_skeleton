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
                filterUrl: path,
                url: "/sikundi-admin/photo",
                name: "photo gallery",
                slug: "photo",
                filters: [
                    // {type: "date", name: "createdAt", label: "created at"},
                    {type: "select", name: "status", options: [
                        {label: "drafted", value: "drafted",},
                        {label: "published", value: "published"},
                    ], hidden: ((path === "/sikundi-admin/photo/trash") ||
                    (path === "/sikundi-admin/photo/copydesk"))},
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"},
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/photo") ||
                        (path === "/sikundi-admin/photo/trash") ||
                        (path === "/sikundi-admin/photo/copydesk"),
                    filters: 
                        (path === "/sikundi-admin/photo") ||
                        (path === "/sikundi-admin/photo/trash") ||
                        (path === "/sikundi-admin/photo/copydesk"),
                    create: 
                        (path === "/sikundi-admin/photo") ||
                        (path === "/sikundi-admin/photo/trash") ||
                        (path === "/sikundi-admin/photo/copydesk"),
                    trash: 
                        (path === "/sikundi-admin/photo") ||
                        (path === "/sikundi-admin/photo/copydesk"),
                    copyDesk: 
                        (path === "/sikundi-admin/photo") ||
                        (path === "/sikundi-admin/photo/trash"),
                }
            }} />
            {children}
        </div>
    )
}

export default Template
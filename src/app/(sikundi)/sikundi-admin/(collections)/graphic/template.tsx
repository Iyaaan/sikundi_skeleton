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
                url: "/sikundi-admin/graphic",
                name: "graphics",
                slug: "graphic",
                filters: [
                    // {type: "date", name: "createdAt", label: "created at"},
                    {type: "select", name: "status", options: [
                        {label: "drafted", value: "drafted",},
                        {label: "published", value: "published"},
                    ], hidden: ((path === "/sikundi-admin/graphic/trash") ||
                    (path === "/sikundi-admin/graphic/copydesk"))},
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"},
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/graphic") ||
                        (path === "/sikundi-admin/graphic/trash") ||
                        (path === "/sikundi-admin/graphic/copydesk"),
                    filters: 
                        (path === "/sikundi-admin/graphic") ||
                        (path === "/sikundi-admin/graphic/trash") ||
                        (path === "/sikundi-admin/graphic/copydesk"),
                    create: 
                        (path === "/sikundi-admin/graphic") ||
                        (path === "/sikundi-admin/graphic/trash") ||
                        (path === "/sikundi-admin/graphic/copydesk"),
                    trash: 
                        (path === "/sikundi-admin/graphic") ||
                        (path === "/sikundi-admin/graphic/copydesk"),
                    copyDesk: 
                        (path === "/sikundi-admin/graphic") ||
                        (path === "/sikundi-admin/graphic/trash"),
                }
            }} />
            {children}
        </div>
    )
}

export default Template
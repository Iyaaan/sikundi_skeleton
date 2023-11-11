"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname, useSearchParams } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()

    return (
        <div className='container p-4'>
            <Header data={{
                url: "/sikundi-admin/user",
                name: "users",
                slug: "user",
                filters: [
                    // {type: "date", name: "createdAt", label: "created at"},
                    {type: "select", name: "status", options: [
                        {label: "active", value: "active",},
                        {label: "blocked", value: "blocked"},
                    ]},
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"},
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/user") ||
                        (path === "/sikundi-admin/user/trash") ||
                        (path === "/sikundi-admin/user/copydesk"),
                    filters: 
                        (path === "/sikundi-admin/user") ||
                        (path === "/sikundi-admin/user/trash") ||
                        (path === "/sikundi-admin/user/copydesk"),
                    create: 
                        (path === "/sikundi-admin/user") ||
                        (path === "/sikundi-admin/user/trash") ||
                        (path === "/sikundi-admin/user/copydesk"),
                    trash: false,
                    copyDesk: false
                }
            }} />
            {children}
        </div>
    )
}

export default Template
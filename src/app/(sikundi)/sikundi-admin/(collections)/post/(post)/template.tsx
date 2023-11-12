"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname, useSearchParams } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()
    const searchParams = useSearchParams()

    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post",
                filterUrl: path,
                name: "posts",
                slug: "post",
                filters: [
                    // {type: "date", name: "createdAt", label: "created at"},
                    {type: "select", name: "status", options: [
                        {label: "drafted", value: "drafted",},
                        {label: "published", value: "published"},
                    ], hidden: ((path === "/sikundi-admin/post/trash") ||
                    (path === "/sikundi-admin/post/copydesk"))},
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"},
                    {type: "select", name: "language", options: [
                        {label: "EN", value: "EN",},
                        {label: "DV", value: "DV"},
                    ]},
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/post") ||
                        (path === "/sikundi-admin/post/trash") ||
                        (path === "/sikundi-admin/post/copydesk"),
                    filters: 
                        (path === "/sikundi-admin/post") ||
                        (path === "/sikundi-admin/post/trash") ||
                        (path === "/sikundi-admin/post/copydesk"),
                    create: 
                        (path === "/sikundi-admin/post") ||
                        (path === "/sikundi-admin/post/trash") ||
                        (path === "/sikundi-admin/post/copydesk"),
                    trash: 
                        (path === "/sikundi-admin/post") ||
                        (path === "/sikundi-admin/post/copydesk"),
                    copyDesk: 
                        (path === "/sikundi-admin/post") ||
                        (path === "/sikundi-admin/post/trash"),
                }
            }} />
            {children}
        </Fragment>
    )
}

export default Template
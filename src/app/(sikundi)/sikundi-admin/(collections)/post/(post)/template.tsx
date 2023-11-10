"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname } from 'next/navigation'

const template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()

    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post",
                name: "posts",
                slug: "post",
                filters: [
                    {type: "date", name: "publishedAt", label: "published at"},
                    {type: "select", name: "status", options: [
                        {label: "draft", value: "draft"},
                        {label: "published", value: "published"},
                        {label: "rejected", value: "rejected"}
                    ]},
                    {type: "select", name: "publishedBy", label: "published by", url: "/sikundi-admin/users"},
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

export default template
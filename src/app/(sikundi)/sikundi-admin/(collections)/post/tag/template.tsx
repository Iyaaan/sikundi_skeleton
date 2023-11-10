"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()

    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post/tag",
                name: "tags",
                slug: "tag",
                filters: [
                    {type: "select", name: "status", options: [
                        {label: "draft", value: "draft"},
                        {label: "published", value: "published"}
                    ]},
                    {type: "date", name: "publishedAt", label: "published at"}
                ],
                ui: {
                    search: (path === "/sikundi-admin/post/tag"),
                    filters: false,
                    create: (path === "/sikundi-admin/post/tag"),
                    trash: false,
                    copyDesk: false
                }
            }} />
            {children}
        </Fragment>
    )
}

export default Template
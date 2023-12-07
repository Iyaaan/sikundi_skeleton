"use client"

import React, { ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()

    return (
        <div className='container p-4'>
            <Header data={{
                filterUrl: path,
                url: "/sikundi-admin/ad-banner",
                name: "Ad Manager",
                slug: "adBanner",
                filters: [
                    // {type: "date", name: "createdAt", label: "created at"},
                    {type: "select", name: "language", options: [
                        {label: "EN", value: "EN",},
                        {label: "DV", value: "DV"},
                    ]},
                    {type: "select", name: "status", options: [
                        {label: "drafted", value: "drafted",},
                        {label: "published", value: "published"},
                    ], hidden: ((path === "/sikundi-admin/ad-banner/trash") ||
                    (path === "/sikundi-admin/ad-banner/copydesk"))},
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"},
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/ad-banner") ||
                        (path === "/sikundi-admin/ad-banner/trash") ||
                        (path === "/sikundi-admin/ad-banner/copydesk"),
                    filters: 
                        (path === "/sikundi-admin/ad-banner") ||
                        (path === "/sikundi-admin/ad-banner/trash") ||
                        (path === "/sikundi-admin/ad-banner/copydesk"),
                    create: 
                        (path === "/sikundi-admin/ad-banner") ||
                        (path === "/sikundi-admin/ad-banner/trash") ||
                        (path === "/sikundi-admin/ad-banner/copydesk"),
                    trash: 
                        (path === "/sikundi-admin/ad-banner") ||
                        (path === "/sikundi-admin/ad-banner/copydesk"),
                    copyDesk: 
                        (path === "/sikundi-admin/ad-banner") ||
                        (path === "/sikundi-admin/ad-banner/trash"),
                }
            }} />
            {children}
        </div>
    )
}

export default Template
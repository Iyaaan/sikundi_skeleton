"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'
import { usePathname } from 'next/navigation'

const Template = ({ children }: {children: ReactNode}) => {
    const path = usePathname()

    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/user/role",
                name: "roles",
                slug: "role",
                filters: [
                    {type: "select", name: "createdBy", label: "created by", url: "/sikundi-admin/user/api/select"}
                ],
                ui: {
                    search: 
                        (path === "/sikundi-admin/user/role"),
                    filters: false,
                    create: 
                        (path === "/sikundi-admin/user/role"),
                    trash: false,
                    copyDesk: false
                }
            }} />
            {children}
        </Fragment>
    )
}

export default Template
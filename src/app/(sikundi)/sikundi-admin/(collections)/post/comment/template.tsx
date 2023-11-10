"use client"

import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'

const Template = ({ children }: {children: ReactNode}) => {
    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post/comment",
                name: "comments",
                slug: "comment",
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
        </Fragment>
    )
}

export default Template
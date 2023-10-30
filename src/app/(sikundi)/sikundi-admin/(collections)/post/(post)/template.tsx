import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'

const template = ({ children }: {children: ReactNode}) => {
    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post",
                softDeletable: true,
                publishable: true,
                name: "posts",
                slug: "post",
                hideFiltersOnTrash: true,
                permissions: {
                    create: true
                },
                filters: [
                    {type: "date", name: "publishedAt", label: "published at"},
                    {type: "select", name: "status", options: [
                        {label: "draft", value: "draft"},
                        {label: "published", value: "published"},
                        {label: "rejected", value: "rejected"}
                    ]},
                    {type: "select", name: "publishedBy", label: "published by", url: "/sikundi-admin/users"},
                ]
            }} />
            {children}
        </Fragment>
    )
}

export default template
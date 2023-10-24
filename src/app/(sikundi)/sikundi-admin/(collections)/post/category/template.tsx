import React, { Fragment, ReactNode } from 'react'
import Header from '@sikundi/app/(sikundi)/sikundi-admin/_components/Header'

const template = ({ children }: {children: ReactNode}) => {
    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post/category",
                name: "categories",
                slug: "category",
                permissions: {
                    create: true
                },
                filters: [
                    {type: "select", name: "status", options: [
                        {label: "draft", value: "draft"},
                        {label: "published", value: "published"}
                    ]},
                    {type: "date", name: "publishedAt", label: "published at"}
                ]
            }} />
            {children}
        </Fragment>
    )
}

export default template
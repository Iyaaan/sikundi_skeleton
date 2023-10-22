import React, { Fragment, ReactNode } from 'react'
import Header from '../../../_components/Header'

const template = ({ children }: {children: ReactNode}) => {
    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post/tag",
                name: "tags",
                slug: "tag",
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
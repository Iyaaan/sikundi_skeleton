import React, { Fragment, ReactNode } from 'react'
import Header from '../../../_components/Header'

const template = ({ children }: {children: ReactNode}) => {
    return (
        <Fragment>
            <Header data={{
                url: "/sikundi-admin/post/comment",
                name: "comments",
                slug: "comment",
                permissions: {
                    create: false
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
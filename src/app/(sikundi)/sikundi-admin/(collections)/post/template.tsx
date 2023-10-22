import React, { ReactNode } from 'react'
import Menu from '../../_components/Menu'

const template = ({ children }: {children: ReactNode}) => {
    return (
        <div className='container p-4'>
            <Menu menu={{items: [
                {url: "/sikundi-admin/post", name: "posts", slug: "post", permissions: {
                    create: true
                }},
                {url: "/sikundi-admin/post/category", name: "categories", slug: "category", permissions: {
                    create: true
                }},
                {url: "/sikundi-admin/post/tag", name: "tags", slug: "tag", permissions: {
                    create: true
                }},
                {url: "/sikundi-admin/post/comment", name: "comments", slug: "comment", permissions: {
                    create: true
                }}
            ]}} />
            {children}
        </div>
    )
}

export default template
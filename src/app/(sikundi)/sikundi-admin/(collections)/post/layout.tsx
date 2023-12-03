import React, { ReactNode } from 'react'
import Menu from '@sikundi/app/(sikundi)/sikundi-admin/_components/Menu'
import getPermission from '@sikundi/lib/server/utils/getPermission'

const Layout = async ({ children }: {children: ReactNode}) => {
    const permission = await getPermission({
        post: ['view'],
        category: ['view'],
        tag: ['view']
    })
    return (
        <div className='container p-4'>
            <Menu menu={{items: [
                {url: "/sikundi-admin/post", name: "posts", slug: "post", permissions: {
                    create: true,
                    view: permission?.post?.view
                }},
                {url: "/sikundi-admin/post/category", name: "categories", slug: "category", permissions: {
                    create: true,
                    view: permission?.category?.view
                }},
                {url: "/sikundi-admin/post/tag", name: "tags", slug: "tag", permissions: {
                    create: true,
                    view: permission?.tag?.view
                }},
                {url: "/sikundi-admin/post/comment", name: "comments", slug: "comment", permissions: {
                    create: true,
                    view: permission?.comment?.view
                }}
            ]}} />
            {children}
        </div>
    )
}

export default Layout
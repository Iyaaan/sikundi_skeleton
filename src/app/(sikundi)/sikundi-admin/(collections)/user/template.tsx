import React, { ReactNode } from 'react'
import Menu from '@sikundi/app/(sikundi)/sikundi-admin/_components/Menu'
import getPermission from '@sikundi/lib/server/utils/getPermission'

const Layout = async ({ children }: {children: ReactNode}) => {
    const permission = await getPermission({
        user: ['view'],
        role: ['view']
    })
    return (
        <div className='container p-4'>
            <Menu menu={{items: [
                {url: "/sikundi-admin/user", name: "users", slug: "user", permissions: {
                    create: true,
                    view: permission?.user?.view
                }},
                {url: "/sikundi-admin/user/role", name: "roles", slug: "role", permissions: {
                    create: true,
                    view: permission?.role?.view
                }}
            ]}} />
            {children}
        </div>
    )
}

export default Layout
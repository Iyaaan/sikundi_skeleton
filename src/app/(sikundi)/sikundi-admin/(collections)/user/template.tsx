import React, { ReactNode } from 'react'
import Menu from '@sikundi/app/(sikundi)/sikundi-admin/_components/Menu'

const Template = ({ children }: {children: ReactNode}) => {
    return (
        <div className='container p-4'>
            <Menu menu={{items: [
                {url: "/sikundi-admin/user", name: "users", slug: "user", permissions: {
                    create: true
                }},
                {url: "/sikundi-admin/user/role", name: "roles", slug: "role", permissions: {
                    create: true
                }}
            ]}} />
            {children}
        </div>
    )
}

export default Template
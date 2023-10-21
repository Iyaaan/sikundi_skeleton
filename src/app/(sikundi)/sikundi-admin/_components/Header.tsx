"use client"

import React, { FC, Fragment } from 'react'
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface Props {
    data: {
        url: string;
        name: string;
        slug: string;
        permissions: {
            create: boolean
        };
    }
}

const Header:FC<Props> = ({ data }) => {
    const path = usePathname()

    return (
        <Fragment>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight capitalize">
                    {data.name}
                </h2>
                {data.permissions.create && <Button className='capitalize'>
                    <PlusIcon className='me-2 h-4 w-4' /> {data.slug}
                </Button>}
            </div>
            <Separator className="my-4" />
        </Fragment>
    )
}

export default Header
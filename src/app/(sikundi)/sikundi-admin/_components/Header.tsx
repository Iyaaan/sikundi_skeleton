"use client"

import React, { FC, Fragment } from 'react'
import { TabsList, TabsTrigger, Tabs } from "@sikundi/components/ui/tabs"
import Link from "next/link"
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface Props {
    menu: {
        items: {
            url: string;
            name: string;
            slug: string;
            permissions: {
                create: boolean
            };
        }[]
    }
}

const Header:FC<Props> = ({ menu }) => {
    const path = usePathname()

    return (
        <Fragment>
            <Tabs defaultValue={path} className="h-full space-y-6 mb-4">
                <div className="space-between flex items-center">
                    <TabsList>
                        {menu.items.map((item, index) => (
                            <TabsTrigger asChild value={item.url} key={index} className="relative capitalize">
                                <Link href={item.url}>{item.name}</Link>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </Tabs>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight capitalize">
                    {menu.items.filter((item) => item.url === path)[0].name}
                </h2>
                {menu.items.filter((item) => item.url === path)[0].permissions.create && <Button className='capitalize'>
                    <PlusIcon className='me-2 h-4 w-4' /> {menu.items.filter((item) => item.url === path)[0].slug}
                </Button>}
            </div>
            <Separator className="my-4" />
        </Fragment>
    )
}

export default Header
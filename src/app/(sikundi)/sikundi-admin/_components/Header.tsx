import React, { FC, Fragment } from 'react'
import { TabsList, TabsTrigger, Tabs } from "@sikundi/components/ui/tabs"
import Link from "next/link"
import { Separator } from '@sikundi/components/ui/separator'
import { Button } from '@sikundi/components/ui/button'
import { PlusIcon } from 'lucide-react'

interface Props {
    menu: {
        items: {
            url: string;
            name: string;
            slug: string;
        }[];
        active: {
            url: string;
            slug: string;
            name: string;
            permissions: {
                create: boolean
            }
        };
    }
}

export default async function Header({ menu }:Props) {
    return (
        <Fragment>
            <Tabs defaultValue={menu.active.slug} className="h-full space-y-6 mb-4">
                <div className="space-between flex items-center">
                    <TabsList>
                        {menu.items.map((item, index) => (
                            <TabsTrigger asChild value={item.slug} key={index} className="relative capitalize">
                                <Link href={item.url}>{item.name}</Link>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </Tabs>
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight capitalize">
                    {menu.active.name}
                </h2>
                {menu.active.permissions.create && <Button className='capitalize'>
                    <PlusIcon className='me-2 h-4 w-4' /> {menu.active.slug}
                </Button>}
            </div>
            <Separator className="my-4" />
        </Fragment>
    )
}

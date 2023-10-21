"use client"

import React, { FC } from 'react'
import { TabsList, TabsTrigger, Tabs } from "@sikundi/components/ui/tabs"
import Link from "next/link"
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

const Menu:FC<Props> = ({ menu }) => {
    const path = usePathname()
    
    return (
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
    )
}

export default Menu
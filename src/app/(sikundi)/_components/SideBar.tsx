"use client"

import { Button } from '@sikundi/components/ui/button'
import { Sheet, SheetClose, SheetContent } from '@sikundi/components/ui/sheet'
import { cn } from '@sikundi/lib/client/utils'
import React, { Fragment, RefAttributes, useEffect, useRef } from 'react'
import { menuItems } from '@sikundi/sikundi.config'
import { ScrollArea } from '@sikundi/components/ui/scroll-area'
import Link from 'next/link'
import Image from 'next/image'
import H1 from '@sikundi/components/ui/typography/h1'
import { usePathname } from 'next/navigation'
import { useUpdateEffect } from 'usehooks-ts'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export default function SideBarContainer(props:SidebarProps) {
    const path = usePathname()
    const ref = useRef<HTMLButtonElement | null>(null)

    useUpdateEffect(() => {
        ref.current?.click()
    }, [path])

    return (
        <Fragment>
            <SheetClose ref={ref} className='hidden'>
                click
            </SheetClose>
            <SheetContent side={"left"}>
                <div className='items-center gap-3 flex'>
                    <Image src={"/sikundi.svg"} alt="sikundi logo" width={45} height={45} />
                    <H1 className="text-2xl text-center font-bold">Sikundi.io</H1>
                </div>
                <SideBar {...props} />
            </SheetContent>
            <SideBar {...props} className={cn(props.className, 'px-4 lg:max-w-[325px] hidden lg:block ')} />
        </Fragment>
    )
}

export function SideBar(props:SidebarProps) {
    const path = usePathname()

    return (
        <ScrollArea className={cn("h-full", props.className)}>
            <div className="space-y-4 py-4">
                {menuItems.map((item, index) => (
                    <div className="py-2" key={index}>
                        <h2 className="mb-2 text-lg font-semibold tracking-tight">
                            {item.title}
                        </h2>
                        <div className="space-y-1">
                            {item.items.map((child, key) => (
                                <Button asChild key={key} variant={(path === child.link) ? "secondary" : "ghost"} className="w-full justify-start">
                                    <Link href={child.link}>
                                        <child.Icon className='h-5 w-5 me-3' />
                                        {child.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
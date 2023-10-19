import { Button } from '@sikundi/components/ui/button'
import { SheetContent } from '@sikundi/components/ui/sheet'
import { cn } from '@sikundi/lib/client/utils'
import React, { Fragment } from 'react'
import { menuItems } from '@sikundi/sikundi.config'
import { ScrollArea } from '@sikundi/components/ui/scroll-area'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

export default function SideBarContainer(props:SidebarProps) {
    return (
        <Fragment>
            <SheetContent side={"left"}>
                <SideBar {...props} />
            </SheetContent>
            <SideBar {...props} className={cn(props.className, 'px-4 lg:max-w-[325px] hidden lg:block ')} />
        </Fragment>
    )
}

export function SideBar(props:SidebarProps) {
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
                                <Button key={key} variant={(index===0 && key === 0) ? "secondary" : "ghost"} className="w-full justify-start">
                                    <child.Icon className='h-5 w-5 me-3' />
                                    {child.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
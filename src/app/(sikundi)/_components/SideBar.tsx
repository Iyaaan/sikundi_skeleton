import { Button } from '@sikundi/components/ui/button'
import { SheetContent } from '@sikundi/components/ui/sheet'
import { cn } from '@sikundi/lib/client/utils'
import { File, Image, ImageIcon, LayoutDashboard, LibraryIcon, LucideIcon, MonitorPlay } from 'lucide-react'
import React, { Fragment } from 'react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

interface itemType {
    title: string
    items: {
        name: string
        link: string
        Icon: LucideIcon
    }[]
}
const items:itemType[] = [
    {
        title: "Dashboard",
        items: [
            { name: "Insights", link: "/", Icon: LayoutDashboard }
        ]
    },
    {
        title: "Collections",
        items: [
            { name: "Posts", link: "/", Icon: File },
            { name: "Photos", link: "/", Icon: ImageIcon },
            { name: "Videos", link: "/", Icon: MonitorPlay },
            { name: "Library", link: "/", Icon: LibraryIcon }
        ]
    }
]

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
        <div className={cn("pb-12", props.className)}>
            <div className="space-y-4 py-4">
                {items.map((item, index) => (
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
        </div>
    )
}
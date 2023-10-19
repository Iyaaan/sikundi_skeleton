import { Button } from '@sikundi/components/ui/button'
import { Input } from '@sikundi/components/ui/input'
import { Label } from '@sikundi/components/ui/label'
import { ScrollArea } from '@sikundi/components/ui/scroll-area'
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@sikundi/components/ui/sheet'
import { cn } from '@sikundi/lib/client/utils'
import { File, Image, LayoutDashboard, LibraryIcon, MonitorPlay } from 'lucide-react'
import React, { Fragment } from 'react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

const items:string[] = []

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
                <div className="py-2">
                    <h2 className="mb-2 text-lg font-semibold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="space-y-1">
                        <Button variant="secondary" className="w-full justify-start">
                            <LayoutDashboard className='h-5 w-5 me-3' />
                            Insights
                        </Button>
                    </div>
                </div>
                <div className="py-2">
                    <h2 className="mb-2 text-lg font-semibold tracking-tight">
                        Collections
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <File className='h-5 w-5 me-3' />
                            Posts
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Image className='h-5 w-5 me-3' />
                            Photos
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <MonitorPlay className='h-5 w-5 me-3' />
                            Videos
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <LibraryIcon className='h-5 w-5 me-3' />
                            Library
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
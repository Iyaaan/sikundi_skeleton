"use client"

import { Button } from '@sikundi/components/ui/button'
import { CommandDialog, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@sikundi/components/ui/command'
import { menuItems } from '@sikundi/sikundi.config'
import { CommandEmpty, CommandGroup } from 'cmdk'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'

export default function Search() {
    const [open, setOpen] = useState(false)
   
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
    
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <Fragment>
            <Button 
                variant="outline"
                className="md:w-[150px] lg:w-[400px] text-muted-foreground justify-between w-full text-start"
                onClick={()=>setOpen(true)}
            >
                Search for actions...
                <kbd className="hidden lg:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>J
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {menuItems.map((item, index) => (
                        <Fragment key={index}>
                            <CommandGroup heading={item.title} key={index} className='my-3'>
                                {item.items.map((child, key) => (
                                    <CommandItem key={key} className='my-1'>
                                        <Link href={child.link} className='flex'>
                                            <child.Icon className='h-5 w-5 me-3' />
                                            {child.name}
                                        </Link>
                                    </CommandItem>

                                ))}
                            </CommandGroup>
                            {index !== (menuItems.length - 1) && <CommandSeparator className='my-2' />}
                        </Fragment>
                    ))}
                </CommandList>
            </CommandDialog>
        </Fragment>
    )
}

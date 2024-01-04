"use client"

import { Button } from '@sikundi/components/ui/button'
import { CommandEmpty, CommandGroup, CommandDialog, CommandInput, CommandItem, CommandList, CommandSeparator } from '@sikundi/components/ui/command'
import { menuItems } from '@sikundi/sikundi.config'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

export default function Search() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
   
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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
                className="lg:w-[400px] text-muted-foreground justify-between w-full text-start"
                onClick={()=>setOpen(true)}
            >
                Search for actions...
                <kbd className="hidden lg:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {menuItems.map((item, index) => (
                        <Fragment key={index}>
                            <CommandGroup heading={item.title} key={index}>
                                {item.items.map((child, key) => (
                                    <CommandItem key={key} onSelect={() => router.push(child.link)}>
                                        <Link href={child.link} className='flex'>
                                            <child.Icon className='h-5 w-5 me-3' />
                                            {child.name}
                                        </Link>
                                    </CommandItem>

                                ))}
                            </CommandGroup>
                            {index !== (menuItems.length - 1) && <CommandSeparator />}
                        </Fragment>
                    ))}
                </CommandList>
            </CommandDialog>
        </Fragment>
    )
}
